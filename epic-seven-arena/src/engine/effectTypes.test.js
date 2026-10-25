import test from "node:test";
import assert from "node:assert/strict";
import { BUFFS, grantBuff, hasBuff, dispelBuffs, cleanseDebuffs, changeBuff,
  setSanctuaryOfBattle, isEffectSuppressed, applySkillDebuffs } from "./buffs.js";
const fixture = () => ({turn: 1, time: 0, log: [], units: [
  {id: "left-0", side: "left", name: "Bearer", stats: {hp: 10000, atk: 1000, def: 1000, spd: 100}, currentHp: 10000, readyAt: 100, buffs: []},
  {id: "right-0", side: "right", name: "Caster", stats: {hp: 10000, atk: 1000, def: 1000, spd: 100}, currentHp: 10000, readyAt: 100, buffs: []},
]});
const uniques = ["stic_discharge_aura", "stic_mercedes_unstable_aura", "stic_crack_1_aura", "stic_trauma_aura"];
test("undispellable buffs remain buffs and Cannot Buff prevents granting them", () => {
  const b = fixture(), [u] = b.units;
  grantBuff(b, u, "stic_buf_impossible", 2);
  assert.equal(grantBuff(b, u, "stic_demonpower_keep", 2), false);
  u.buffs = [];
  assert.equal(grantBuff(b, u, "stic_demonpower_keep", 2), true);
  grantBuff(b, u, "stic_att_up", 2);
  assert.equal(dispelBuffs(b, u, Infinity), 1);
  assert.equal(hasBuff(u, "stic_demonpower_keep"), true);
  assert.equal(BUFFS.stic_demonpower_keep.effectType, "buff");
});
test("unique effects bypass Immunity, Cannot Buff and external Block suppression", () => {
  const b = fixture(), [u] = b.units;
  grantBuff(b, u, "stic_debuf_impossible", 2);
  grantBuff(b, u, "stic_buf_impossible", 2, "self", {casterId: u.id});
  // Immunity must be ignored to set up the separate Block test condition.
  grantBuff(b, u, "stic_isolation", 2, "test", {ignoreImmunity: true});
  for (const id of uniques) {
    assert.equal(grantBuff(b, u, id, 2, "foreign source", {casterId: "right-0"}), true);
    assert.equal(hasBuff(u, id), true);
    assert.equal(isEffectSuppressed(u, u.buffs.find(e=>e.id===id)), false);
    assert.equal(BUFFS[id].effectType, "unique");
    assert.equal(BUFFS[id].debuff, false);
    assert.equal(BUFFS[id].undispellable, true);
  }
  dispelBuffs(b, u, Infinity);
  cleanseDebuffs(b, u, u.id);
  for (const id of uniques) assert.equal(hasBuff(u, id), true);
});
test("Sanctuary blocks new buffs/debuffs including undispellable buffs, but admits unique effects", () => {
  const original = fixture(), b = setSanctuaryOfBattle(original, true), [u] = b.units;
  assert.equal(original.sanctuaryOfBattle, undefined);
  for (const id of ["stic_att_up", "stic_demonpower_keep", "stic_stun", "stic_death_0_keep"])
    assert.equal(grantBuff(b, u, id, 2, "test", {ignoreImmunity: true}), false);
  for (const id of uniques) assert.equal(grantBuff(b, u, id, 2), true);
  assert.equal(grantBuff(b, b.units[1], "stic_att_up", 2), false);
  const off = setSanctuaryOfBattle(b, false);
  assert.equal(grantBuff(off, off.units[0], "stic_att_up", 2, "self", {casterId:u.id}), true);
  assert.equal(b.sanctuaryOfBattle, true);
});
test("Sanctuary does not strip existing effects and only applies to heroes", () => {
  const b = fixture(), [u] = b.units;
  grantBuff(b, u, "stic_att_up", 2);
  const domain = setSanctuaryOfBattle(b, true);
  assert.equal(hasBuff(domain.units[0], "stic_att_up"), true);
  domain.units[1].isHero = false;
  assert.equal(grantBuff(domain, domain.units[1], "stic_att_up", 2), true);
});
test("unique manual grants skip ordinary debuff rolls and cannot be cleansed", () => {
  const b = setSanctuaryOfBattle(fixture(), true);
  const next = changeBuff(b, "left-0", "stic_crack_1_aura", 2, false,
    {casterId: "right-0", roll: true, procChance: 0}, () => {throw Error("unexpected roll");});
  assert.equal(hasBuff(next.units[0], "stic_crack_1_aura"), true);
  assert.equal(changeBuff(next, "left-0", "stic_crack_1_aura", 2, true), next);
});
test("automatic debuffs respect Sanctuary and are not logged as landed", () => {
  const b = setSanctuaryOfBattle(fixture(), true), [u, actor] = b.units;
  applySkillDebuffs(b, actor, u, "S1", {debuffRefs:["stic_stun"], automaticDebuffs:[
    {id: "stic_stun", turns: 1, chance: 100}]}, "normal", () => 0);
  assert.equal(hasBuff(u, "stic_stun"), false);
  assert.match(b.log[0].message, /immunity/);
});
