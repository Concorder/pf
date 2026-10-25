import { inflictInjury } from "./health.js";
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createCatalog } from "../data/cecilia.js";
import { defaultTeams } from "./heroes.js";
import {
  createBattle,
  activeUnit,
  canUse,
  executeAttack,
  forcedTarget,
  damage,
  readiness,
} from "./battle.js";
import {
  changeBuff,
  hasBuff,
  effectiveStats,
  sufferDamage,
  startTurnEffects,
  endTurnEffects,
  applySkillDebuffs,
} from "./buffs.js";
import { hitChances } from "./hits.js";
const heroes = createCatalog(
  JSON.parse(
    fs.readFileSync(new URL("../../public/data/heroes.json", import.meta.url)),
  ),
  JSON.parse(
    fs.readFileSync(new URL("../../public/data/cecilia.json", import.meta.url)),
  ).heroes,
);
const fixture = () =>
  createBattle(defaultTeams(heroes), { left: 0, right: 0 }, heroes);
const seq =
  (...v) =>
  () => {
    assert.ok(v.length);
    return v.shift();
  };
test("Sleep blocks actions, removes evasion and critical resistance, wakes only from positive damage", () => {
  let b = fixture();
  const id = b.active;
  b = changeBuff(b, id, "stic_sleep", 2);
  assert.equal(canUse(heroes, b, activeUnit(b), "S1"), false);
  assert.equal(canUse(heroes, b, activeUnit(b), "wait"), true);
  assert.equal(
    hitChances(
      b.units.find((u) => u.id === "right-3"),
      activeUnit(b),
    ).critical,
    100,
  );
  sufferDamage(b, activeUnit(b), 0);
  assert.equal(hasBuff(activeUnit(b), "stic_sleep"), true);
  sufferDamage(b, activeUnit(b), 1);
  assert.equal(hasBuff(activeUnit(b), "stic_sleep"), false);
  assert.equal(canUse(heroes, b, activeUnit(b), "S1"), true);
});
test("Fear has exactly a 40% bearer start dispel roll and otherwise consumes a disabled turn", () => {
  let b = fixture();
  b = changeBuff(b, b.active, "stic_fear", 2);
  startTurnEffects(b, activeUnit(b), seq(0.4));
  assert.equal(hasBuff(activeUnit(b), "stic_fear"), true);
  assert.equal(canUse(heroes, b, activeUnit(b), "S1"), false);
  startTurnEffects(b, activeUnit(b), seq(0.3999));
  assert.equal(hasBuff(activeUnit(b), "stic_fear"), false);
});
test("Provoke enforces source target and S1, redirected uses highest max HP, dead source releases targeting", () => {
  let b = fixture();
  const id = b.active;
  b = changeBuff(b, id, "stic_provoke", 2, false, { casterId: "right-0" });
  assert.equal(forcedTarget(b, activeUnit(b)).id, "right-0");
  assert.equal(canUse(heroes, b, activeUnit(b), "S3"), false);
  assert.equal(canUse(heroes, b, activeUnit(b), "wait"), false);
  assert.equal(executeAttack(heroes, b, "S1", "right-2", "normal"), b);
  const attacked = executeAttack(heroes, b, "S1", "right-0", "normal");
  assert.notEqual(attacked, b);
  b.units.find((u) => u.id === "right-0").currentHp = 0;
  assert.equal(forcedTarget(b, activeUnit(b)), null);
  b = changeBuff(b, id, "stic_provoke_hp", 1);
  b.units.find((u) => u.id === "right-2").stats.hp = 30000;
  assert.equal(forcedTarget(b, activeUnit(b)).id, "right-2");
});
test("Curse causes 60% secondary damage without recursive triggers; damage wakes Sleep", () => {
  let b = fixture();
  b = changeBuff(b, "right-2", "stic_curse2", 2);
  b = changeBuff(b, "right-2", "stic_sleep", 2);
  const actor = activeUnit(b),
    target = b.units.find((u) => u.id === "right-0"),
    bearer = b.units.find((u) => u.id === "right-2");
  const amount = damage(actor, target, heroes[actor.name].skills.S1, "normal");
  const next = executeAttack(heroes, b, "S1", "right-0", "normal");
  assert.equal(
    next.units.find((u) => u.id === bearer.id).currentHp,
    bearer.currentHp - amount - Math.floor(amount * 0.6),
  );
  assert.equal(
    hasBuff(
      next.units.find((u) => u.id === bearer.id),
      "stic_sleep",
    ),
    false,
  );
  assert.equal(
    next.log.filter((e) => e.message.includes("Curse deals")).length,
    1,
  );
});
test("Beguile damages other allies once and disappears, including on a passed turn", () => {
  let b = fixture();
  b = changeBuff(b, b.active, "stic_deceptive", 2);
  const id = b.active,
    hp = activeUnit(b).currentHp,
    allies = b.units.filter(
      (u) => u.side === activeUnit(b).side && u.id !== id,
    );
  const next = executeAttack(heroes, b, "wait");
  for (const a of allies)
    assert.equal(
      next.units.find((u) => u.id === a.id).currentHp,
      a.currentHp - Math.floor(a.stats.hp * 0.1),
    );
  assert.equal(next.units.find((u) => u.id === id).currentHp, hp);
  assert.equal(
    hasBuff(
      next.units.find((u) => u.id === id),
      "stic_deceptive",
    ),
    false,
  );
});
test("Vampiric Touch heals attacker and respects Stigma, Unhealable, and max HP", () => {
  let b = fixture(),
    id = b.active;
  b.units.find((u) => u.id === id).currentHp = 1000;
  b = changeBuff(b, "right-0", "stic_vampire", 2);
  const max = activeUnit(b).stats.hp;
  let next = executeAttack(heroes, b, "S1", "right-0", "normal");
  assert.equal(next.units.find((u) => u.id === id).currentHp, 1000 + max * 0.1);
  let stigma = changeBuff(b, id, "stic_stigma", 2);
  next = executeAttack(heroes, stigma, "S1", "right-0", "normal");
  assert.equal(
    next.units.find((u) => u.id === id).currentHp,
    1000 + max * 0.05,
  );
  let blocked = changeBuff(b, id, "stic_heal_impossible", 2);
  next = executeAttack(heroes, blocked, "S1", "right-0", "normal");
  assert.equal(next.units.find((u) => u.id === id).currentHp, 1000);
});
test("Fracture caps at ten stacks; Trauma uses Defense before its own reduction; Energy Depletion preserves CR", () => {
  let b = fixture();
  const id = "right-0";
  for (let i = 0; i < 12; i++) b = changeBuff(b, id, "stic_crack_1_aura", 2);
  const unit = b.units.find((u) => u.id === id);
  assert.equal(unit.buffs.find((e) => e.id === "stic_crack_1_aura").stacks, 10);
  assert.equal(effectiveStats(unit).atk, unit.stats.atk * 3);
  assert.equal(effectiveStats(unit).def, unit.stats.def * 0.5);
  b = fixture();
  b.units.find((u) => u.id === id).stats.def = 2100;
  b = changeBuff(b, id, "stic_trauma_aura", 2);
  const trauma = b.units.find((u) => u.id === id);
  assert.equal(effectiveStats(trauma).atk, trauma.stats.atk * 3);
  assert.ok(Math.abs(effectiveStats(trauma).def - 630) < 1e-8);
  b = fixture();
  const before = readiness(
    b.units.find((u) => u.id === id),
    b,
    b.units,
  );
  b = changeBuff(b, id, "stic_discharge_aura", 2);
  const depleted = b.units.find((u) => u.id === id);
  assert.equal(effectiveStats(depleted).spd, depleted.stats.spd * 0.5);
  assert.ok(Math.abs(readiness(depleted, b, b.units) - before) < 1e-8);
});
test("explicit source exceptions: Melissa Curse lands on miss, Mort ignores ER only for lower HP targets", () => {
  const b = fixture(),
    actor = activeUnit(b),
    target = b.units.find((u) => u.id === "right-0");
  applySkillDebuffs(
    b,
    actor,
    target,
    "S3",
    heroes.Melissa.skills.S3,
    "miss",
    seq(0, 0),
  );
  assert.equal(hasBuff(target, "stic_curse2"), true);
  target.stats.efr = 500;
  inflictInjury(target, 1);
  applySkillDebuffs(
    b,
    actor,
    target,
    "S3",
    heroes.Mort.skills.S3,
    "normal",
    seq(0),
  );
  assert.equal(hasBuff(target, "stic_fear"), true);
});
