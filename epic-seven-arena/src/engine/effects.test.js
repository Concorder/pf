import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { resistancePassChance, rollEffect, periodicDamage } from "./effects.js";
import { createCatalog } from "../data/cecilia.js";
import { defaultTeams } from "./heroes.js";
import { createBattle, executeAttack, activeUnit } from "./battle.js";
import {
  changeBuff,
  effectiveStats,
  hasBuff,
  expireBuffs,
  applySkillDebuffs,
} from "./buffs.js";
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
  (...values) =>
  () => {
    assert.ok(values.length, "unexpected random draw");
    return values.shift();
  };
test("calculator resistance floor, cap, proc roll, missed hits, and ignore-resistance exceptions", () => {
  assert.equal(resistancePassChance(0, 0), 0.85);
  assert.equal(resistancePassChance(100, 150), 0.5);
  assert.equal(resistancePassChance(0, 200), 0);
  assert.equal(resistancePassChance(500, 0), 0.85);
  assert.equal(rollEffect({ procChance: 50 }, seq(0.49, 0.849)).landed, true);
  assert.equal(rollEffect({ procChance: 50 }, seq(0.5)).reason, "did not proc");
  assert.equal(rollEffect({}, seq(0, 0.85)).reason, "resisted");
  assert.equal(
    rollEffect({ ignoreResistance: true, resistance: 500 }, seq(0)).landed,
    true,
  );
  assert.equal(rollEffect({ hit: "miss" }, seq()).reason, "miss");
  assert.equal(
    rollEffect({ immunity: true, ignoreResistance: true }, seq()).reason,
    "immunity",
  );
});
test("calculator DOT coefficients and 70% penetration, poison ignores DEF", () => {
  assert.equal(periodicDamage("stic_blood", 1000, 10000, 1000), 280);
  assert.equal(periodicDamage("stic_blaze", 1000, 10000, 1000), 561);
  assert.equal(periodicDamage("stic_bomb", 1000, 10000, 1000), 1403);
  assert.equal(periodicDamage("stic_dot", 0, 10000, 9999), 500);
});
test("independent DoT stacks snapshot effective source ATK and tick at bearer start, not application", () => {
  let b = fixture(),
    caster = activeUnit(b),
    target = b.units.find((u) => u.id === "right-0"),
    hp = target.currentHp;
  b = changeBuff(b, caster.id, "stic_att_up", 2);
  const atk = effectiveStats(activeUnit(b)).atk;
  const opts = { casterId: caster.id };
  b = changeBuff(b, target.id, "stic_blaze", 2, false, opts);
  b = changeBuff(b, target.id, "stic_blaze", 2, false, opts);
  assert.equal(b.units.find((u) => u.id === target.id).currentHp, hp);
  const stacks = b.units
    .find((u) => u.id === target.id)
    .buffs.filter((x) => x.id === "stic_blaze");
  assert.equal(stacks.length, 2);
  assert.equal(stacks[0].sourceAttack, atk);
  assert.notEqual(stacks[0].instance, stacks[1].instance);
  b = changeBuff(b, caster.id, "stic_att_up", 2, true);
  for (let i = 0; i < 10 && activeUnit(b).id !== target.id; i++)
    b = executeAttack(heroes, b, "wait");
  assert.equal(activeUnit(b).id, target.id);
  const expected =
    periodicDamage("stic_blaze", atk, target.stats.hp, target.stats.def) * 2;
  assert.equal(activeUnit(b).currentHp, hp - expected);
  assert.ok(stacks.every((s) => s.turns === 2));
});
test("Bomb explodes only at expiry, independent source damage and new stun survives expiry tick", () => {
  let b = fixture(),
    id = "right-0",
    source = activeUnit(b);
  b = changeBuff(b, id, "stic_bomb", 2, false, { casterId: source.id });
  const target = b.units.find((u) => u.id === id),
    hp = target.currentHp;
  expireBuffs(b, target);
  assert.equal(target.currentHp, hp);
  assert.equal(hasBuff(target, "stic_stun"), false);
  expireBuffs(b, target);
  assert.equal(
    target.currentHp,
    hp -
      periodicDamage(
        "stic_bomb",
        source.stats.atk,
        target.stats.hp,
        target.stats.def,
      ),
  );
  assert.equal(hasBuff(target, "stic_bomb"), false);
  assert.equal(target.buffs.find((e) => e.id === "stic_stun").turns, 1);
});
test("lethal start-of-turn poison skips dead actor and determines victory", () => {
  let b = fixture();
  const victim = b.units.find((u) => u.id === "right-0");
  for (const u of b.units.filter((u) => u.side === "right"))
    if (u.id !== victim.id) u.currentHp = 0;
  victim.currentHp = 1;
  b = changeBuff(b, victim.id, "stic_dot", 2, false, { casterId: b.active });
  for (let i = 0; i < 10 && !b.winner; i++)
    b = executeAttack(heroes, b, "wait");
  assert.equal(b.winner, "left");
  assert.equal(b.active, null);
});
test("resisted applications log without mutation; Immunity blocks force and ignore-resistance", () => {
  const b = fixture(),
    target = "right-0";
  const resisted = changeBuff(
    b,
    target,
    "stic_stun",
    2,
    false,
    { casterId: b.active, roll: true, procChance: 100 },
    seq(0, 0.9),
  );
  assert.equal(
    hasBuff(
      resisted.units.find((u) => u.id === target),
      "stic_stun",
    ),
    false,
  );
  assert.match(resisted.log[0].message, /resisted/);
  assert.ok(!b.log[0].message.includes("resisted"));
  const immune = changeBuff(b, target, "stic_debuf_impossible", 2);
  assert.equal(changeBuff(immune, target, "stic_stun", 2), immune);
  const result = changeBuff(
    immune,
    target,
    "stic_stun",
    2,
    false,
    { casterId: b.active, roll: true, procChance: 100, ignoreResistance: true },
    seq(),
  );
  assert.match(result.log[0].message, /immunity/);
});
test("reviewed Arbiter S3 debuff requires a hit and its current source references", () => {
  const b = fixture(),
    actor = b.units.find((u) => u.name === "Arbiter Vildred"),
    target = b.units.find((u) => u.id === "left-0"),
    data = heroes[actor.name].skills.S3;
  applySkillDebuffs(b, actor, target, "S3", data, "miss", seq());
  assert.equal(hasBuff(target, "stic_blind"), false);
  applySkillDebuffs(b, actor, target, "S3", data, "normal", seq(0, 0));
  assert.equal(hasBuff(target, "stic_blind"), true);
});
