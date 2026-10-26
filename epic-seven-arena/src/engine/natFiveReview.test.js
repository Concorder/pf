import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {createCatalog} from "../data/cecilia.js";
import {NAT5_DEBUFF_RULES} from "../data/natFiveSkillRules.js";
import {defaultTeams,makeHero} from "./heroes.js";
import {createBattle,executeAttack,executeReaction,activeUnit,canUse} from "./battle.js";
import {BUFFS,applySkillDebuffs,hasBuff} from "./buffs.js";
const root=new URL("../../public/data/",import.meta.url);
const baseline=JSON.parse(fs.readFileSync(new URL("heroes.json",root))),snapshot=JSON.parse(fs.readFileSync(new URL("cecilia.json",root)));
const heroes=createCatalog(baseline,snapshot.heroes),get=(b,id)=>b.units.find(u=>u.id===id);
const teams=(name="ae-KARINA")=>{
 const t=defaultTeams(heroes);t.left[0]=makeHero(heroes,name);t.left[0].stats.spd=350;
 for(const side of Object.values(t))for(const u of side.filter(Boolean))u.stats.hp=100000;
 return t;
};
const fixture=name=>createBattle(teams(name),{left:0,right:0},heroes);
const seq=(...values)=>()=>values.length?values.shift():.999;
test("28 reviewed natural-5-star grants resolve to valid max-enhanced effects without enabling lower-rarity kits",()=>{
 assert.equal(Object.keys(NAT5_DEBUFF_RULES).length,28);
 for(const code of Object.keys(NAT5_DEBUFF_RULES)){
  const h=Object.values(heroes).find(h=>h.code===code);assert.equal(h.rarity,5);
  const s=h.skills.S1;assert.equal(s.automaticDebuffs.length,1,h.name);
  const e=s.automaticDebuffs[0];assert.ok(BUFFS[e.id],h.name);assert.ok(e.chance>=0&&e.chance<=100);
 }
 assert.equal(heroes["ae-KARINA"].skills.S1.automaticDebuffs[0].chance,75);
});
test("ae-KARINA S1 applies one-turn Defense Down with normal proc/resistance checks",()=>{
 const b=fixture();
 const next=executeAttack(heroes,b,"S1","right-0","normal",seq(.74,.84),{automaticDualAttacks:false});
 assert.ok(hasBuff(get(next,"right-0"),"stic_def_dn"));
 assert.equal(get(next,"right-0").buffs.find(e=>e.id==="stic_def_dn").turns,1);
 const miss=executeAttack(heroes,b,"S1","right-0","miss",()=>.999,{automaticDualAttacks:false});
 assert.equal(hasBuff(get(miss,"right-0"),"stic_def_dn"),false);
});
test("Aria S1 receives its 20 percentage-point bonus only outside her own turn",()=>{
 const b=fixture("Aria"),actor=activeUnit(b),data=heroes.Aria.skills.S1;
 const roll=data.automaticDebuffs[0].chance/100+.1;
 applySkillDebuffs(b,actor,get(b,"right-0"),"S1",data,"normal",seq(roll,.5));
 assert.equal(hasBuff(get(b,"right-0"),"stic_blind"),false);
 b.active="left-1";
 applySkillDebuffs(b,actor,get(b,"right-0"),"S1",data,"normal",seq(roll,.5));
 assert.equal(hasBuff(get(b,"right-0"),"stic_blind"),true);
});
test("Violet gains one Focus on turn and double Focus plus 15% CR out of turn",()=>{
 let b=fixture("Violet");
 let next=executeAttack(heroes,b,"S1","right-0","normal",()=>.999,{automaticDualAttacks:false});
 assert.equal(get(next,b.active).resourceValue,1);
 const t=teams("Ras");t.left[1]=makeHero(heroes,"Violet");t.left[1].stats.hp=100000;
 b=createBattle(t,{left:0,right:0},heroes);
 const before=get(b,"left-1").readyAt;
 next=executeReaction(heroes,b,{kind:"dual",actorId:"left-1",targetId:"right-0",hit:"normal"},()=>.999);
 assert.equal(get(next,"left-1").resourceValue,2);assert.ok(get(next,"left-1").readyAt<before);
 assert.equal(next.turn,b.turn);assert.equal(next.active,b.active);
});
test("Choux critical-hit doubling is applied before fractional gain reduction",()=>{
 for(const [hit,value]of [["normal",.5],["crit",1]]){
  const t=teams("Choux");t.left[0].resourceGainMultiplier=.5;
  const b=createBattle(t,{left:0,right:0},heroes);
  const next=executeAttack(heroes,b,"S1","right-0",hit,()=>.999,{automaticDualAttacks:false});
  assert.equal(get(next,b.active).resourceValue,value);
 }
});
test("fixed penetration ignores unrelated scaling sentences; ranked/unspecified penetration stays blocked",()=>{
 assert.equal(heroes.Ran.skills.S1.damageSupport,"supported");assert.equal(heroes.Ran.skills.S1.penetration,.2);
 assert.equal(heroes["Lionheart Cermia"].skills.S3.damageSupport,"supported");assert.equal(heroes["Lionheart Cermia"].skills.S3.penetration,.5);
 assert.equal(heroes.Mort.skills.S3.damageSupport,"unsupported");assert.equal(heroes.Rinak.skills.S1.damageSupport,"unsupported");
 const b=fixture("Lionheart Cermia");assert.equal(activeUnit(b).cooldowns.S3,activeUnit(b).skills.S3.cd-1);assert.equal(canUse(heroes,b,activeUnit(b),"S3"),false);
});
test("resource costs gate casting and are spent once, with source guards on corrections and grants",()=>{
 const testHeroes=structuredClone(heroes);
 Object.assign(testHeroes.Ravi.skills.S3,{damageSupport:"supported",rate:1,pow:1});
 const b=createBattle(teams("Ravi"),{left:0,right:0},testHeroes);
 assert.equal(canUse(testHeroes,b,activeUnit(b),"S3"),false);
 activeUnit(b).resourceValue=100;assert.equal(canUse(testHeroes,b,activeUnit(b),"S3"),true);
 const next=executeAttack(testHeroes,b,"S3","right-0","normal",()=>.999,{automaticDualAttacks:false});assert.equal(get(next,b.active).resourceValue,0);
 const changed=structuredClone(snapshot.heroes);changed.aria.skills[0].description += " Changed.";
 // Aria S1 has no awakened override; all secondary source mappings must stop.
 let refreshed=createCatalog(baseline,changed);assert.equal(refreshed.Aria.skills.S1.automaticDebuffs.length,0);
 const changedAbigail=structuredClone(snapshot.heroes);changedAbigail.abigail.skills[0].multipliers += " Changed.";
 refreshed=createCatalog(baseline,changedAbigail);assert.equal(refreshed.Abigail.skills.S1.sourceReview,null);
 assert.equal(refreshed.Abigail.skills.S1.damageSupport,"unsupported");
});
