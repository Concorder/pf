import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createCatalog, normalizeSkill } from "../data/cecilia.js";
import { defaultTeams, makeHero } from "./heroes.js";
import { createBattle, resolveDeaths, executeAttack, activeUnit } from "./battle.js";
import { grantBuff, hasBuff, sufferDamage, changeBuff, setSanctuaryOfBattle, dispelBuffs } from "./buffs.js";
import { planProtectedDamage } from "./damageProtection.js";
import { inflictInjury, maxHp } from "./health.js";
import { reviveUnit } from "./revival.js";
const cached = JSON.parse(fs.readFileSync(new URL("../../public/data/cecilia.json", import.meta.url)));
const heroes = createCatalog(JSON.parse(fs.readFileSync(new URL("../../public/data/heroes.json", import.meta.url))), cached.heroes);
function fixture(side = "right", hecate = false) {
  const t = defaultTeams(heroes);
  t[side][0] = makeHero(heroes, "Lady of the Scales");
  if (hecate) t[side === "right" ? "left" : "right"][1] = makeHero(heroes, "Hecate");
  for (const team of Object.values(t)) for (const h of team.filter(Boolean)) {
    h.stats.hp = 10000;
    h.damageShare = 0; h.damageLimit = 0; h.damageReduction = 0;
  }
  return createBattle(t, {left: 0, right: 0}, heroes);
}
const unit = (b,id) => b.units.find(u=>u.id===id);
function transfer(b, targetId, incoming) {
  const t = unit(b,targetId), p=planProtectedDamage(b,t,incoming);
  sufferDamage(b,t,p.targetDamage);
  if(p.transferred) sufferDamage(b,p.recipient,p.transferred);
  return p;
}
test("Lady grants Offering to the fixed foremost slot on either mirrored team, including herself", () => {
  for (const side of ["left","right"]) {
    const b=fixture(side);
    assert.equal(hasBuff(unit(b,`${side}-2`),"stic_sacrifice_aura"),true);
    assert.equal(hasBuff(unit(b,`${side}-0`),"stic_sacrifice_aura"),false);
    assert.equal(unit(b,`${side}-2`).buffs.find(e=>e.id==="stic_sacrifice_aura").casterId,`${side}-0`);
  }
  const t=defaultTeams(heroes);t.left[2]=makeHero(heroes,"Lady of the Scales");
  const b=createBattle(t,{left:0,right:0},heroes);
  assert.equal(hasBuff(unit(b,"left-2"),"stic_sacrifice_aura"),true);
  t.left[2]=null;
  assert.equal(createBattle(t,{left:0,right:0},heroes).units.some(u=>hasBuff(u,"stic_sacrifice_aura")),false);
});
test("Offering receives 70% from teammates without sharing itself recursively", () => {
  const b=fixture(), bearer=unit(b,"right-2");
  const p=transfer(b,"right-0",10000);
  assert.equal(p.targetDamage,3000); assert.equal(p.transferred,7000);
  assert.equal(p.recipient,bearer);assert.equal(bearer.currentHp,3000);
  assert.equal(unit(b,"right-0").currentHp,7000);
  assert.equal(planProtectedDamage(b,bearer,1000).transferred,0);
});
test("Frostbite and sharing bypass are checked on the original attack target", () => {
  let b=fixture();
  b=changeBuff(b,"right-2","stic_freezing",2);
  assert.equal(planProtectedDamage(b,unit(b,"right-0"),10000).transferred,7000);
  b=changeBuff(b,"right-0","stic_freezing",2);
  assert.equal(planProtectedDamage(b,unit(b,"right-0"),10000).transferred,0);
  const clean=fixture();
  assert.equal(planProtectedDamage(clean,unit(clean,"right-0"),10000,{attacker:{ignoreDamageSharing:true}}).transferred,0);
});
test("Offering shares after the original target's injury-based damage cap", () => {
  const b=fixture(), t=unit(b,"right-0");
  inflictInjury(t,5000);t.damageLimit=50;
  const p=planProtectedDamage(b,t,100000);
  assert.equal(p.limited,2500);assert.equal(p.targetDamage,750);assert.equal(p.transferred,1750);
});
test("lethal transferred damage triggers one Immortality and survives at 1% injured max HP", () => {
  let b=fixture(), bearer=unit(b,"right-2");
  inflictInjury(bearer,5000);
  const p=transfer(b,"right-0",20000);
  assert.equal(p.transferred,14000);assert.equal(maxHp(bearer),5000);
  assert.equal(bearer.currentHp,50);assert.equal(hasBuff(bearer,"stic_immortality"),true);
  assert.equal(bearer.buffs.find(e=>e.id==="stic_immortality").turns,1);
  assert.equal(bearer.buffs.find(e=>e.id==="stic_sacrifice_aura").immortalityUsed,true);
  assert.equal(bearer.deaths,0);
  sufferDamage(b,bearer,100000);assert.equal(bearer.currentHp,1);
  dispelBuffs(b,bearer,Infinity);
  sufferDamage(b,bearer,100000);assert.equal(bearer.currentHp,0);
  assert.equal(bearer.deaths,1);
});
test("Cannot Buff, Sanctuary and Hecate prevent Offering's grant and survival", () => {
  for (const mode of ["cannotBuff","sanctuary","hecate"]) {
    let b=fixture("right",mode==="hecate");
    if(mode==="cannotBuff") b=changeBuff(b,"right-2","stic_buf_impossible",2);
    if(mode==="sanctuary") b=setSanctuaryOfBattle(b,true);
    const bearer=unit(b,"right-2");
    assert.equal(hasBuff(bearer,"stic_sacrifice_aura"),true);
    transfer(b,"right-0",20000);
    assert.equal(bearer.currentHp,0,mode);
    assert.equal(hasBuff(bearer,"stic_immortality"),false,mode);
  }
});
test("Offering unique effect survives Block/Seal, while Hecate's native aura honors Seal and death", () => {
  let b=fixture("right",true);
  b=changeBuff(b,"left-1","stic_dizzy",2);
  b=changeBuff(b,"right-0","stic_dizzy",2);
  b=changeBuff(b,"right-2","stic_isolation",2);
  b=changeBuff(b,"right-2","stic_dizzy",2);
  transfer(b,"right-0",20000);
  assert.equal(unit(b,"right-2").currentHp,100);
  b=fixture("right",true);sufferDamage(b,unit(b,"left-1"),100000);
  transfer(b,"right-0",20000);
  assert.equal(unit(b,"right-2").currentHp,100);
});
test("Offering bearer death heals living allies by half max HP through normal healing restrictions", () => {
  let b=fixture();
  b=changeBuff(b,"right-2","stic_buf_impossible",2);
  const lady=unit(b,"right-0"), ally=unit(b,"right-3");lady.currentHp=1000;ally.currentHp=1000;
  grantBuff(b,ally,"stic_stigma",2);
  sufferDamage(b,unit(b,"right-2"),100000);resolveDeaths(heroes,b);
  assert.equal(lady.currentHp,6000);assert.equal(ally.currentHp,3500);
});
test("Hecate blocks shared revival, and no longer does so while sealed", () => {
  let b=fixture("right",true), victim=unit(b,"right-3");
  sufferDamage(b,victim,100000);resolveDeaths(heroes,b);
  assert.equal(victim.currentHp,0);
  assert.equal(reviveUnit(b,victim,{fraction:1}),false);
  b=changeBuff(b,"left-1","stic_dizzy",2);victim=unit(b,"right-3");
  assert.equal(reviveUnit(b,victim,{fraction:1}),true);
});
test("executed attacks transfer to Offering and keep the previous snapshot unchanged", () => {
  const b=fixture("left");
  // The default turn order can select the Lady; explicitly use a supported enemy skill.
  const enemy=unit(b,"right-0");b.active=enemy.id;enemy.stats.atk=10000;enemy.cooldowns.S1=0;
  const before=unit(b,"left-2").currentHp;
  const next=executeAttack(heroes,b,"S1","left-1","normal",()=>0.999,{automaticDebuffs:false,automaticReactions:false});
  assert.ok(unit(next,"left-2").currentHp<before);
  assert.equal(unit(b,"left-2").currentHp,before);
  assert.ok(next.log.some(e=>e.message.includes("shares")&&e.message.includes(unit(b,"left-2").name)));
});
test("changed source descriptions disable the native Offering and Hecate mappings", () => {
  for(const code of ["c6005","c1178"]){
    const rawHero=Object.values(cached.heroes).find(h=>h.id===code), raw=structuredClone(rawHero.skills[1]);
    if(raw.awakened)raw.awakened.description+=" Changed.";else raw.description+=" Changed.";
    const d=normalizeSkill(rawHero,raw,1);
    assert.equal(d.openingOffering,false);assert.equal(d.hecateRestrictions,false);
  }
});


test("Offering does not stack sharing additively with manual protection", () => {
  const b=fixture(), t=unit(b,"right-0");
  t.damageShareSlot="3";t.damageShare=20;
  const offering=planProtectedDamage(b,t,10000);
  assert.equal(offering.transferred,7000);
  assert.equal(offering.recipient.id,"right-2");
  t.damageShare=80;
  const manual=planProtectedDamage(b,t,10000);
  assert.equal(manual.transferred,8000);
  assert.equal(manual.recipient.id,"right-3");
});


test("Offering's 1% survival uses the injured cap after the lethal damage event", () => {
  let b=fixture();
  b=changeBuff(b,"right-2","stic_laceration",2);
  transfer(b,"right-0",20000);
  const bearer=unit(b,"right-2");
  assert.equal(maxHp(bearer),5000);
  assert.equal(bearer.currentHp,50);
  assert.equal(bearer.deaths,0);
  assert.equal(hasBuff(bearer,"stic_immortality"),true);
});

test("Lady in foremost beats Aurius for the third ally, but her own direct hit shares to the tank", () => {
  const t=defaultTeams(heroes);
  t.right[0]=makeHero(heroes,"Ras");
  t.right[2]=makeHero(heroes,"Lady of the Scales");
  for(const team of Object.values(t))for(const h of team.filter(Boolean))h.stats.hp=100000;
  t.right[0].teamDamageShare=20;
  const b=createBattle(t,{left:0,right:0},heroes),lady=unit(b,"right-2"),tank=unit(b,"right-0"),third=unit(b,"right-3");
  const thirdHit=transfer(b,third.id,10000);
  assert.equal(thirdHit.recipient,lady);assert.equal(thirdHit.transferred,7000);
  assert.equal(third.currentHp,97000);assert.equal(lady.currentHp,93000);assert.equal(tank.currentHp,100000);
  const ladyHit=transfer(b,lady.id,10000);
  assert.equal(ladyHit.recipient,tank);assert.equal(ladyHit.transferred,2000);
  assert.equal(lady.currentHp,85000);assert.equal(tank.currentHp,98000);
  // Lady does not receive 70% of the tank's transferred 2,000 damage again.
  assert.equal(third.currentHp,97000);
});
