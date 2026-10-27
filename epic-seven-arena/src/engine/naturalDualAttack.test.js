import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {createCatalog} from "../data/cecilia.js";
import {createBattle,executeAttack,executeReaction,activeUnit,dualAttackChance,selectNaturalDualAlly} from "./battle.js";
import {defaultTeams,makeHero,validTeams} from "./heroes.js";
import {changeBuff} from "./buffs.js";
const root=new URL("../../public/data/",import.meta.url);
const heroes=createCatalog(JSON.parse(fs.readFileSync(new URL("heroes.json",root))),JSON.parse(fs.readFileSync(new URL("cecilia.json",root))).heroes);
const get=(b,id)=>b.units.find(u=>u.id===id);
const fixture=(name="Ras")=>{
 const teams=defaultTeams(heroes);teams.left=[makeHero(heroes,name),makeHero(heroes,"Vildred"),makeHero(heroes,"Mercedes"),null];
 for(const t of Object.values(teams))for(const u of t.filter(Boolean))u.stats.hp=100000;
 teams.left[0].stats.spd=350;teams.right[0].stats.spd=300;return createBattle(teams,{left:0,right:0},heroes);
};
const rng=(...values)=>()=>values.length?values.shift():.999;
const duals=b=>(b.skillUseEvents||[]).filter(e=>e.tags.includes("dual-attack"));
test("assisting hero chance defaults to 3%, clamps to 20%, and old builds remain valid",()=>{
 assert.equal(dualAttackChance({}),3);assert.equal(dualAttackChance({dualAttackChance:0}),3);
 assert.equal(dualAttackChance({dualAttackChance:99}),20);
 const teams=defaultTeams(heroes);for(const t of Object.values(teams))for(const u of t.filter(Boolean))delete u.dualAttackChance;
 assert.equal(validTeams(teams,heroes),true);teams.left[0].dualAttackChance=21;assert.equal(validTeams(teams,heroes),false);
});
test("each eligible ally rolls its own 3%/20% chance; the caller's chance is irrelevant",()=>{
 for(const [chance,roll,expected] of [[3,.03,1],[3,.030001,0],[20,.2,1],[20,.200001,0]]){
  const b=fixture();activeUnit(b).dualAttackChance=20;get(b,"left-1").dualAttackChance=chance;
  const next=executeAttack(heroes,b,"S1","right-0","normal",rng(roll,.999));
  assert.equal(duals(next).length,expected,`${chance}, ${roll}`);
 }
 let rolls=0;const b=fixture();const next=executeAttack(heroes,b,"S1","right-0","normal",()=>{rolls++;return .8;});
 assert.equal(rolls,2);assert.equal(duals(next).length,0);
 for(const callerChance of [5,20]){
  activeUnit(b).dualAttackChance=callerChance;
  assert.equal(selectNaturalDualAlly(heroes,b,activeUnit(b),rng(.06,.06)),null);
 }
});
test("only successful allies participate; multiple successes have an unbiased tie-break",()=>{
 for(const [rolls,id] of [[[.01,.99],"left-1"],[[.99,.01],"left-2"],[[.01,.01,0],"left-1"],[[.01,.01,.499999],"left-1"],[[.01,.01,.5],"left-2"],[[.01,.01,.999],"left-2"]]){
  const b=fixture();get(b,"left-1").dualAttackChance=9;get(b,"left-1").stats.atk=10000;
  const next=executeAttack(heroes,b,"S1","right-0","normal",rng(...rolls));
  assert.equal(duals(next)[0].actorId,id);
  assert.deepEqual(next.skillUseEvents.map(e=>e.kind),["active","dual"]);
  assert.equal(next.turn,b.turn+1);assert.equal(duals(next)[0].turnOwnerId,b.active);
 }
 for(const values of [[.01,.99],[.99,.01],[.99,.99]]){
  const b=fixture();let rolls=0;
  selectNaturalDualAlly(heroes,b,activeUnit(b),()=>{assert.ok(rolls<2,"no tie-break without multiple successes");return values[rolls++];});
  assert.equal(rolls,2);
 }
});
test("independent 3%/7% ally rolls give 9.79% total; two 3% allies give 5.91%",()=>{
 const b=fixture();
 for(const [secondChance,expected] of [[7,979],[3,591]]){
  get(b,"left-2").dualAttackChance=secondChance;let successes=0;
  // Exhaust all equally likely percent-bin pairs, avoiding probability boundaries.
  for(let a=0;a<100;a++)for(let c=0;c<100;c++){
   if(selectNaturalDualAlly(heroes,b,activeUnit(b),rng((a+.5)/100,(c+.5)/100,.5)))successes++;
  }
  assert.equal(successes,expected);
 }
});
test("disabled/transformed allies are excluded and no eligible ally means no natural rolls",()=>{
 for(const status of ["stic_stun","stic_sleep","stic_fear","stic_restrict"]){
  let b=fixture();b=changeBuff(b,"left-1",status,2);
  assert.equal(duals(executeAttack(heroes,b,"S1","right-0","normal",rng(0,0)))[0].actorId,"left-2");
  get(b,"left-2").canDualAttack=false;
  const next=executeAttack(heroes,b,"S1","right-0","normal",()=>{throw Error("no eligible ally must not roll");});
  assert.equal(duals(next).length,0);
 }
});
test("guaranteed calls bypass natural chance and never produce a second assist",()=>{
 const b=fixture();const next=executeAttack(heroes,b,"S2","right-0","normal",()=>.999);
 assert.equal(duals(next).length,1);assert.equal(duals(next)[0].actorId,"left-1");
 const third=executeAttack(heroes,b,"S3","right-0","normal",()=>{throw Error("S3 cannot roll natural dual");});
 assert.equal(duals(third).length,0);
});
test("explicit source prohibition, manual natural opt-out, and secondary attacks never roll natural assists",()=>{
 const forbidden=fixture("Tenebria");assert.equal(heroes.Tenebria.skills.S1.canTriggerDualAttack,false);
 const noRoll=()=>{throw Error("natural dual roll forbidden");};
 assert.equal(duals(executeAttack(heroes,forbidden,"S1","right-0","normal",noRoll,{automaticDebuffs:false})).length,0);
 const b=fixture();assert.equal(duals(executeAttack(heroes,b,"S1","right-0","normal",noRoll,{automaticDualAttacks:false})).length,0);
 for(const kind of ["counter","additional","dual"]){
  const next=executeReaction(heroes,b,{kind,actorId:"left-1",targetId:"right-0",hit:"normal"},noRoll);
  assert.equal(next.skillUseEvents.length,1);
 }
});
test("a lethal primary hit does not redirect a preselected assist or emit a dual skill use",()=>{
 const b=fixture();get(b,"right-0").currentHp=1;
 const next=executeAttack(heroes,b,"S1","right-0","normal",rng(0,0));
 assert.equal(duals(next).length,0);assert.equal(get(next,"right-0").currentHp,0);
});
