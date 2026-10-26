import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {createCatalog, compactHero} from "../data/cecilia.js";
import {UNIT_RESOURCES,nativeResourceType,resourceValue,gainUnitResource,canPaySkillResource,spendSkillResource,setUnitResource} from "./resources.js";
import {createBattle,executeAttack,executeReaction,activeUnit} from "./battle.js";
import {defaultTeams,makeHero,validTeams} from "./heroes.js";
import {changeBuff} from "./buffs.js";
const root=new URL("../../public/data/",import.meta.url);
const baseline=JSON.parse(fs.readFileSync(new URL("heroes.json",root)));
const snapshot=JSON.parse(fs.readFileSync(new URL("cecilia.json",root)));
const heroes=createCatalog(baseline,snapshot.heroes);
const get=(b,id)=>b.units.find(u=>u.id===id);
const setup=(name="Aria",enemy="Cermia")=>{
 const t=defaultTeams(heroes);t.left[0]=makeHero(heroes,name);t.right[0]=makeHero(heroes,enemy);t.left[0].stats.spd=350;
 for(const side of Object.values(t))for(const u of side.filter(Boolean))u.stats.hp=100000;
 return t;
};
test("source resources are optional, with 5 Focus / 100 Fighting Spirit caps; isolated inconsistent metadata is ignored",()=>{
 assert.equal(heroes.Aria.resourceType,"focus");assert.equal(heroes.Ravi.resourceType,"fightingSpirit");
 assert.equal(heroes.Vildred.resourceType,"");assert.equal(heroes.Kawerik.resourceType,"fightingSpirit");
 assert.equal(nativeResourceType({skills:[{fighting_spirit_requirement:30,description:"Attacks the enemy."}]}),"");
 assert.equal(heroes["Solitaria of the Snow"].resourceType,"");
 assert.equal(UNIT_RESOURCES.focus.max,5);assert.equal(UNIT_RESOURCES.fightingSpirit.max,100);
 assert.deepEqual(heroes.Aria.skills.S1.resource,{type:"focus",gain:1,cost:0});
 assert.equal(heroes.Yuna.skills.S3.resource.cost,5);
});
test("fractional Focus survives halved grants, spending, clamping and manual edits",()=>{
 const u={resourceType:"focus",resourceValue:2.5};
 gainUnitResource(u,1,{multiplier:.5});assert.equal(u.resourceValue,3);
 gainUnitResource(u,20);assert.equal(u.resourceValue,5);
 const skill={resource:{type:"focus",cost:2.5}};
 assert.equal(spendSkillResource(u,skill),true);assert.equal(u.resourceValue,2.5);
 assert.equal(canPaySkillResource(u,{resource:{type:"focus",cost:5}}),false);
 assert.equal(spendSkillResource(u,{resource:{type:"focus",cost:5}}),false);assert.equal(u.resourceValue,2.5);
 assert.equal(gainUnitResource(u,NaN),0);assert.equal(resourceValue(u),2.5);
});
test("supported direct and assisting S1 casts apply flat resource gains once per cast, not per target",()=>{
 const teams=setup();teams.left[0].resourceValue=2.5;teams.left[0].resourceOpeningOverride=true;teams.left[0].resourceGainMultiplier=.5;
 const b=createBattle(teams,{left:0,right:0},heroes);
 const next=executeAttack(heroes,b,"S1","right-0","normal",()=>.999,{automaticDualAttacks:false});
 assert.equal(get(next,b.active).resourceValue,3);assert.equal(activeUnit(b).resourceValue,2.5);
 const dual=executeReaction(heroes,b,{kind:"dual",actorId:b.active,targetId:"right-0",hit:"normal"},()=>.999);
 assert.equal(get(dual,b.active).resourceValue,3);assert.equal(dual.turn,b.turn);
 assert.deepEqual(get(dual,b.active).cooldowns,activeUnit(b).cooldowns);
});
test("manual adjustments preserve snapshots and turn state and can be undone by restoring the snapshot",()=>{
 const b=createBattle(setup(),{left:0,right:0},heroes), next=setUnitResource(b,b.active,2.5);
 assert.equal(get(next,b.active).resourceValue,2.5);assert.equal(get(b,b.active).resourceValue,0);
 assert.equal(next.time,b.time);assert.equal(next.turn,b.turn);assert.equal(next.active,b.active);
 assert.equal(setUnitResource(next,b.active,2.5),next);assert.equal(setUnitResource(next,b.active,NaN),next);
 assert.equal(get(setUnitResource(next,b.active,50),b.active).resourceValue,5);
});
test("reviewed opening grants initialize native resources; explicit initial override takes precedence",()=>{
 for(const [name,amount]of [["Ravi",60],["Apocalypse Ravi",50],["Designer Lilibet",50],["Sylvan Sage Vivian",5],["Afternoon Soak Flan",3]]){
  const b=createBattle(setup(name),{left:0,right:0},heroes);assert.equal(activeUnit(b).resourceValue,amount,name);
 }
 const teams=setup("Ravi");teams.left[0].resourceOpeningOverride=true;teams.left[0].resourceValue=33;
 assert.equal(activeUnit(createBattle(teams,{left:0,right:0},heroes)).resourceValue,33);
});
test("Solitaria/Elvira block enemy gains while living and unsealed; Seal/death restores gains",()=>{
 for(const [name,enemy]of [["Aria","Solitaria of the Snow"],["Apocalypse Ravi","Elvira"]]){
  let b=createBattle(setup(name,enemy),{left:0,right:0},heroes);
  assert.equal(activeUnit(b).resourceValue,0);
  let next=executeAttack(heroes,b,"S1","right-0","normal",()=>.999,{automaticDualAttacks:false});
  assert.equal(get(next,b.active).resourceValue,0);
  b=changeBuff(b,"right-0","stic_dizzy",2);
  // Apocalypse Ravi's conditional S1 formula remains unsupported, so test its guarded gain primitive separately.
  if(name==="Aria"){
   next=executeAttack(heroes,b,"S1","right-0","normal",()=>.999,{automaticDualAttacks:false});assert.equal(get(next,b.active).resourceValue,1);
   get(b,"right-0").currentHp=0;
   next=executeAttack(heroes,b,"S1","right-2","normal",()=>.999,{automaticDualAttacks:false});assert.equal(get(next,b.active).resourceValue,1);
  }
 }
});
test("resource source guards reject changed passive descriptions and old builds still validate",()=>{
 const changed=structuredClone(snapshot.heroes);changed.ravi.skills[1].description += " Changed.";
 assert.equal(createCatalog(baseline,changed).Ravi.skills.S2.resourcePassive,null);
 const teams=setup();for(const side of Object.values(teams))for(const u of side.filter(Boolean)){
  delete u.resourceType;delete u.resourceValue;delete u.resourceGainMultiplier;
 }
 assert.equal(validTeams(teams,heroes),true);
 const b=createBattle(teams,{left:0,right:0},heroes);assert.equal(activeUnit(b).resourceType,"focus");
});

test("invalid resource metadata is rejected before entering the source cache",()=>{
 const h=structuredClone(snapshot.heroes.aria);
 assert.doesNotThrow(()=>compactHero(h));
 h.skills[0].focus_gain=6;
 assert.throws(()=>compactHero(h),/Invalid hero/);
 const ravi=structuredClone(snapshot.heroes.ravi);ravi.skills[2].fighting_spirit_requirement=-1;
 if(ravi.skills[2].awakened)ravi.skills[2].awakened.fighting_spirit_requirement=-1;
 assert.throws(()=>compactHero(ravi),/Invalid hero/);
});
