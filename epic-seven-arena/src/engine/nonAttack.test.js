import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {createCatalog} from "../data/cecilia.js";
import {createBattle,executeAttack,activeUnit,canUse,isValidSkillTarget} from "./battle.js";
import {defaultTeams,makeHero} from "./heroes.js";
import {changeBuff,hasBuff,effectiveStats} from "./buffs.js";
import {currentCR} from "./combatReadiness.js";
const root=new URL("../../public/data/",import.meta.url);
const baseline=JSON.parse(fs.readFileSync(new URL("heroes.json",root))),snapshot=JSON.parse(fs.readFileSync(new URL("cecilia.json",root)));
const heroes=createCatalog(baseline,snapshot.heroes),get=(b,id)=>b.units.find(u=>u.id===id);
const fixture=name=>{
 const t=defaultTeams(heroes);t.left[0]=makeHero(heroes,name);t.left[0].stats.spd=350;t.right[0].stats.spd=300;
 for(const side of Object.values(t))for(const h of side.filter(Boolean))h.stats.hp=100000;
 return createBattle(t,{left:0,right:0},heroes);
};
const noRoll=()=>{throw Error("beneficial non-attack skill must not roll hit, proc, resistance or dual");};
const ready=(u,b)=>currentCR(u,b,effectiveStats(u).spd);
test("Flan targets any living ally including herself, rejects enemies/dead allies before spending",()=>{
 const b=fixture("Flan"),actor=activeUnit(b);
 assert.ok(canUse(heroes,b,actor,"S2"));
 assert.ok(isValidSkillTarget(heroes,b,actor,"S2",actor));
 assert.ok(isValidSkillTarget(heroes,b,actor,"S2",get(b,"left-1")));
 assert.equal(isValidSkillTarget(heroes,b,actor,"S2",get(b,"right-0")),false);
 assert.equal(executeAttack(heroes,b,"S2","right-0","normal",noRoll),b);
 get(b,"left-1").currentHp=0;assert.equal(executeAttack(heroes,b,"S2","left-1","normal",noRoll),b);
 assert.equal(executeAttack(heroes,b,"S2",null,"normal",noRoll),b);
});
test("single-target support grants only the chosen ally buffs and CR; no hit or damage events",()=>{
 const b=fixture("Flan"),before=ready(get(b,"left-1"),b);
 const next=executeAttack(heroes,b,"S2","left-1","normal",noRoll);
 assert.ok(hasBuff(get(next,"left-1"),"stic_att_up"));assert.ok(hasBuff(get(next,"left-1"),"stic_cridmg_up"));
 assert.equal(hasBuff(get(next,"left-2"),"stic_att_up"),false);assert.equal(hasBuff(get(next,b.active),"stic_att_up"),false);
 assert.ok(ready(get(next,"left-1"),next)>=before+40);
 assert.ok(!next.damageEvents?.length);assert.equal(next.skillUseEvents.length,1);
 assert.ok(next.skillUseEvents[0].tags.includes("nonAttack"));assert.ok(!next.skillUseEvents[0].tags.includes("attack"));
 assert.equal(next.souls.left,b.souls.left+activeUnit(b).skills.S2.gain);
 assert.equal(get(b,"left-1").buffs.length,0);
});
test("Yuna buffs the whole team including caster, retains fresh durations, gains Focus and takes an extra turn",()=>{
 const b=fixture("Yuna");const next=executeAttack(heroes,b,"S2",null,"normal",noRoll);
 assert.equal(next.active,b.active);assert.equal(next.time,b.time);assert.equal(next.turn,b.turn+1);
 for(const u of next.units.filter(u=>u.side==="left")){
  assert.ok(hasBuff(u,"stic_att_up"));assert.ok(hasBuff(u,"stic_speed_up"));
  assert.equal(u.buffs.find(e=>e.id==="stic_att_up").turns,3);
 }
 assert.equal(get(next,b.active).resourceValue,3);assert.ok(next.skillUseEvents[0].tags.includes("extraTurn"));
 assert.equal(get(next,b.active).cooldowns.S2,activeUnit(b).skills.S2.cd);
});
test("Vivian applies Greater Attack only to herself, normal Attack to other allies, and Immunity to all",()=>{
 const b=fixture("Vivian");get(b,"left-2").currentHp=0;
 const next=executeAttack(heroes,b,"S3",b.active,"normal",noRoll);
 assert.ok(hasBuff(get(next,b.active),"stic_att_up2"));assert.equal(hasBuff(get(next,b.active),"stic_att_up"),false);
 assert.ok(hasBuff(get(next,"left-1"),"stic_att_up"));assert.equal(hasBuff(get(next,"left-1"),"stic_att_up2"),false);
 assert.ok(hasBuff(get(next,b.active),"stic_debuf_impossible"));assert.ok(hasBuff(get(next,"left-1"),"stic_debuf_impossible"));
 assert.equal(get(next,"left-2").buffs.length,0);assert.equal(hasBuff(get(next,"right-0"),"stic_att_up"),false);
});
test("Iseria excludes caster, resets selected ally cooldowns and grants Greater Attack with extra turn",()=>{
 const b=fixture("Iseria");get(b,"left-1").cooldowns={S1:2,S2:3,S3:4};
 assert.equal(executeAttack(heroes,b,"S2",b.active,"normal",noRoll),b);
 const next=executeAttack(heroes,b,"S2","left-1","normal",noRoll);
 assert.deepEqual(get(next,"left-1").cooldowns,{S1:0,S2:0,S3:0});assert.ok(hasBuff(get(next,"left-1"),"stic_att_up2"));
 assert.equal(next.active,b.active);assert.equal(next.time,b.time);
});
test("Emilia cleanses two debuffs on a selected non-caster ally and applies both separate CR grants",()=>{
 let b=fixture("Emilia");b=changeBuff(b,"left-1","stic_stun",3);b=changeBuff(b,"left-1","stic_blind",2);b=changeBuff(b,"left-1","stic_att_dn",1);
 const before=ready(get(b,"left-1"),b);
 const next=executeAttack(heroes,b,"S2","left-1","normal",noRoll);
 assert.equal(hasBuff(get(next,"left-1"),"stic_stun"),false);assert.equal(hasBuff(get(next,"left-1"),"stic_blind"),false);
 assert.ok(hasBuff(get(next,"left-1"),"stic_att_dn"));assert.ok(hasBuff(get(next,"left-1"),"stic_att_up"));
 assert.ok(ready(get(next,"left-1"),next)>=Math.min(100,before+50));assert.ok(ready(get(next,b.active),next)>=25);
});
test("Laia cleanses all allies, pushes the team and reduces only teammates' cooldowns, respecting Iseria S2 immunity",()=>{
 let b=fixture("Laia");get(b,"left-1").name="Iseria";get(b,"left-1").cooldowns={S1:2,S2:3,S3:4};
 b=changeBuff(b,"left-1","stic_stun",2);b=changeBuff(b,b.active,"stic_blind",2);
 const next=executeAttack(heroes,b,"S2",null,"normal",noRoll);
 assert.equal(hasBuff(get(next,"left-1"),"stic_stun"),false);assert.equal(hasBuff(get(next,b.active),"stic_blind"),false);
 assert.equal(get(next,"left-1").cooldowns.S1,1);assert.equal(get(next,"left-1").cooldowns.S2,3);assert.equal(get(next,"left-1").cooldowns.S3,3);
});
test("Cannot Buff, Sanctuary and Seal retain their correct behavior for beneficial active skills",()=>{
 let b=fixture("Flan");b=changeBuff(b,"left-1","stic_buf_impossible",2);b=changeBuff(b,b.active,"stic_dizzy",2);
 const next=executeAttack(heroes,b,"S2","left-1","normal",noRoll);
 assert.equal(hasBuff(get(next,"left-1"),"stic_att_up"),false);assert.ok(next!==b,"Seal does not stop active skills");
 b=fixture("Yuna");b.sanctuaryOfBattle=true;const blocked=executeAttack(heroes,b,"S2",null,"normal",noRoll);
 assert.equal(hasBuff(get(blocked,b.active),"stic_att_up"),false);assert.equal(blocked.active,b.active,"extra turn is not a buff");
});
test("unreviewed or changed non-attack descriptions remain blocked; reviewed effects respect Silence and Provoke",()=>{
 const changed=structuredClone(snapshot.heroes);changed.flan.skills[1].description+=" Changed.";
 if(changed.flan.skills[1].awakened)changed.flan.skills[1].awakened.description+=" Changed.";
 assert.equal(createCatalog(baseline,changed).Flan.skills.S2.nonAttack,null);
 let b=fixture("Flan");b=changeBuff(b,b.active,"stic_silence",2);assert.equal(canUse(heroes,b,activeUnit(b),"S2"),false);
 b=fixture("Vivian");b=changeBuff(b,b.active,"stic_provoke",2,false,{casterId:"right-0"});assert.equal(canUse(heroes,b,activeUnit(b),"S3"),false);
});
