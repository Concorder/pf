import { inflictInjury, maxHp } from "./health.js";
import { normalizeSkill } from "../data/cecilia.js";
import { SKILL_PROTECTION_RULES } from "../data/skillProtectionRules.js";
import test from "node:test";
import assert from "node:assert/strict";
import { planProtectedDamage } from "./damageProtection.js";
import { sufferDamage } from "./buffs.js";
const fixture = () => {
  const target = { id: "left-0", side: "left", slot: 0, stats: {hp: 10000}, currentHp: 10000,
    damageReduction: 30, damageLimit: 50, damageShare: 20, damageShareSlot: "2", buffs: [] };
  const tank = { id: "left-2", side: "left", slot: 2, stats: {hp: 20000}, currentHp: 20000,
    damageReduction: 99, damageLimit: 1, damageShare: 100, damageShareSlot: "0", buffs: [] };
  return { units: [target, tank], log: [], turn: 1 };
};
test("reduction then limit then share preserves the user's 4000/1000 split", () => {
  const b = fixture(), [target, tank] = b.units;
  for (const incoming of [10000, 100000, 1000000]) {
    const p = planProtectedDamage(b, target, incoming);
    assert.equal(p.limited, 5000);
    assert.equal(p.targetDamage, 4000);
    assert.equal(p.transferred, 1000);
    assert.equal(p.recipient, tank);
  }
  const p = planProtectedDamage(b, target, 100000);
  sufferDamage(b, target, p.targetDamage);
  sufferDamage(b, tank, p.transferred);
  assert.equal(target.currentHp, 6000);
  assert.equal(tank.currentHp, 19000);
});
test("reduction happens before capping and transfer does not depend on actual HP lost", () => {
  const b = fixture(), target = b.units[0];
  target.currentHp = 100;
  const p = planProtectedDamage(b, target, 6000);
  assert.equal(p.reduced, 4200);
  assert.equal(p.targetDamage, 3360);
  assert.equal(p.transferred, 840);
});
test("dead, missing, self and enemy recipients do not reduce target damage", () => {
  for (const mode of ["dead", "missing", "self", "enemy"]) {
    const b = fixture(), [target, tank] = b.units;
    if (mode === "dead") tank.currentHp = 0;
    if (mode === "missing") target.damageShareSlot = "1";
    if (mode === "self") target.damageShareSlot = "0";
    if (mode === "enemy") tank.side = "right";
    const p = planProtectedDamage(b, target, 100000);
    assert.equal(p.targetDamage, 5000);
    assert.equal(p.transferred, 0);
  }
});
test("zero protection defaults preserve damage and integer splits conserve capped damage", () => {
  const b = fixture(), target = b.units[0];
  target.damageReduction = 0; target.damageLimit = 0; target.damageShare = 0;
  assert.equal(planProtectedDamage(b, target, 9999).targetDamage, 9999);
  target.damageShare = 33;
  const p = planProtectedDamage(b, target, 101);
  assert.equal(p.transferred, 33);
  assert.equal(p.targetDamage + p.transferred, 101);
});

test("Frostbite disables reduction and sharing but preserves the HP cap", () => {
  const b = fixture(), target = b.units[0];
  target.buffs = [{id: "stic_freezing", turns: 2}];
  const below = planProtectedDamage(b, target, 4000);
  assert.equal(below.reduced, 4000);
  assert.equal(below.targetDamage, 4000);
  assert.equal(below.transferred, 0);
  assert.equal(planProtectedDamage(b, target, 100000).targetDamage, 5000);
  target.buffs[0].turns = 0;
  assert.equal(planProtectedDamage(b, target, 4000).targetDamage, 2240);
});
test("sharing-only bypass retains reduction, reduction-only bypass retains sharing", () => {
  const b = fixture(), target = b.units[0];
  const sharing = planProtectedDamage(b, target, 4000, {attacker: {ignoreDamageSharing: true}});
  assert.equal(sharing.targetDamage, 2800);
  assert.equal(sharing.transferred, 0);
  const reduction = planProtectedDamage(b, target, 4000, {attacker: {ignoreDamageReduction: true}});
  assert.equal(reduction.targetDamage, 3200);
  assert.equal(reduction.transferred, 800);
  const both = planProtectedDamage(b, target, 100000, {attacker: {ignoreDamageReduction: true, ignoreDamageSharing: true}});
  assert.equal(both.targetDamage, 5000);
});
test("skill bypass scopes honor hero-only and non-Elite/Boss clauses", () => {
  const b = fixture(), target = b.units[0];
  const skill = {protectionBypass: {scope: "hero", ignoreDamageSharing: true, ignoreDamageReduction: true}};
  assert.equal(planProtectedDamage(b, target, 4000, {skill}).targetDamage, 4000);
  target.isHero = false;
  assert.equal(planProtectedDamage(b, target, 4000, {skill}).targetDamage, 2240);
  skill.protectionBypass.scope = "nonEliteBoss";
  assert.equal(planProtectedDamage(b, target, 4000, {skill}).targetDamage, 4000);
  target.isBoss = true;
  assert.equal(planProtectedDamage(b, target, 4000, {skill}).targetDamage, 2240);
  target.isBoss = false;target.isElite = true;
  assert.equal(planProtectedDamage(b, target, 4000, {skill}).targetDamage, 2240);
});


test("all reviewed bypass rules require unchanged source wording and reference", () => {
  let count = 0;
  for (const [id, skills] of Object.entries(SKILL_PROTECTION_RULES)) {
    for (const [key, rule] of Object.entries(skills)) {
      const index = Number(key.slice(1)) - 1;
      const raw = {description: rule.description, common: [{_id: "cmn_ignore_dmg_sharing"}], multipliers: "att_rate: 1\n!pow: 1"};
      assert.equal(normalizeSkill({id}, raw, index).protectionBypass.ignoreDamageSharing, true);
      assert.equal(normalizeSkill({id}, {...raw, description: raw.description + " Changed."}, index).protectionBypass, null);
      assert.equal(normalizeSkill({id}, {...raw, common: []}, index).protectionBypass, null);
      count++;
    }
  }
  assert.equal(count, 14);
});

test("Frostbite is local to the damaged ally, not its tank or other protected allies", () => {
  const b = fixture(), [target, tank] = b.units;
  const otherAlly = {...target, id: "left-1", slot: 1, buffs: []};
  b.units.push(otherAlly);
  // Final configured reduction includes the tank's applicable passive/artifact benefit.
  target.buffs = [{id: "stic_freezing", turns: 2}];
  const frozen = planProtectedDamage(b, target, 4000);
  const unaffected = planProtectedDamage(b, otherAlly, 4000);
  assert.equal(frozen.targetDamage, 4000);
  assert.equal(frozen.transferred, 0);
  assert.equal(unaffected.targetDamage, 2240);
  assert.equal(unaffected.transferred, 560);
  assert.equal(unaffected.recipient, tank);
  // Frostbite on the provider alone does not remove protection from its allies.
  target.buffs = [];
  tank.buffs = [{id: "stic_freezing", turns: 2}];
  const protectedAlly = planProtectedDamage(b, target, 4000);
  assert.equal(protectedAlly.targetDamage, 2240);
  assert.equal(protectedAlly.transferred, 560);
});


test("damage limits use post-injury max HP, not original or currently remaining HP", () => {
  const b = fixture(), target = b.units[0];
  target.damageShare = 0;
  inflictInjury(target, 99999);
  assert.equal(maxHp(target), 5000);
  assert.equal(planProtectedDamage(b, target, 100000).targetDamage, 2500);
  target.currentHp = 3000;
  assert.equal(planProtectedDamage(b, target, 100000).targetDamage, 2500);
  target.damageShare = 20;
  const shared = planProtectedDamage(b, target, 100000);
  assert.equal(shared.limited, 2500);
  assert.equal(shared.targetDamage, 2000);
  assert.equal(shared.transferred, 500);
  target.buffs = [{id: "stic_freezing", turns: 2}];
  assert.equal(planProtectedDamage(b, target, 100000).targetDamage, 2500);
});

test("only the strongest personal/team reduction applies, including the provider itself", () => {
  const b=fixture(), [target,tank]=b.units;
  target.damageLimit=0;target.damageShare=0;target.damageReduction=20;
  tank.teamDamageReduction=30;
  b.units.push({...tank,id:"left-1",slot:1,teamDamageReduction:10});
  const p=planProtectedDamage(b,target,10000);
  assert.equal(p.reduction,30);assert.equal(p.targetDamage,7000);
  tank.damageReduction=0;
  assert.equal(planProtectedDamage(b,tank,10000).reduction,30);
  target.buffs=[{id:"stic_freezing",turns:2}];
  assert.equal(planProtectedDamage(b,target,10000).targetDamage,10000);
  target.buffs=[];tank.currentHp=0;
  assert.equal(planProtectedDamage(b,target,10000).reduction,20);
});
test("team sharing is target-relative and never chooses the attacked provider itself", () => {
  const b=fixture(), [target,tank]=b.units;
  target.damageShare=0;target.damageLimit=0;target.damageReduction=0;
  tank.teamDamageShare=20;tank.damageShare=0;tank.damageLimit=0;tank.damageReduction=0;
  const p=planProtectedDamage(b,target,10000);
  assert.equal(p.transferred,2000);assert.equal(p.targetDamage,8000);assert.equal(p.recipient,tank);
  assert.equal(planProtectedDamage(b,tank,10000).transferred,0);
  tank.currentHp=0;
  assert.equal(planProtectedDamage(b,target,10000).targetDamage,10000);
});
