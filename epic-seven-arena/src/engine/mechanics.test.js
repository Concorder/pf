import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createCatalog } from "../data/cecilia.js";
import { defaultTeams, clone } from "./heroes.js";
import {
  createBattle,
  activeUnit,
  executeAttack,
  canUse,
  damage,
} from "./battle.js";
import { hasBuff, effectiveStats, changeBuff } from "./buffs.js";
const heroes = createCatalog(
  JSON.parse(
    fs.readFileSync(new URL("../../public/data/heroes.json", import.meta.url)),
  ),
  JSON.parse(
    fs.readFileSync(new URL("../../public/data/cecilia.json", import.meta.url)),
  ).heroes,
);
function fixture() {
  const teams = defaultTeams(heroes);
  teams.right[0].stats.spd = 350;
  return createBattle(teams, { left: 0, right: 0 }, heroes);
}
test("Cermia S2 is a targetless action: buff, soul gain, S3 reset and immediate extra turn", () => {
  const battle = fixture();
  battle.units.find((u) => u.id === battle.active).cooldowns.S3 = 4;
  const previous = clone(battle);
  assert.equal(activeUnit(battle).name, "Cermia");
  assert.equal(canUse(heroes, battle, activeUnit(battle), "S2"), true);
  const next = executeAttack(heroes, battle, "S2");
  assert.equal(next.turn, battle.turn + 1);
  assert.equal(next.time, battle.time);
  assert.equal(next.active, battle.active);
  const actor = activeUnit(next);
  assert.equal(actor.cooldowns.S3, 0);
  assert.equal(actor.cooldowns.S2, 5);
  assert.equal(hasBuff(actor, "stic_att_up2"), true);
  assert.equal(actor.buffs.find((b) => b.id === "stic_att_up2").turns, 2);
  assert.equal(effectiveStats(actor).atk, actor.stats.atk * 1.75);
  assert.equal(next.souls.right, 2);
  assert.deepEqual(
    next.units.map((u) => u.currentHp),
    battle.units.map((u) => u.currentHp),
  );
  assert.deepEqual(battle, previous);
});
test("Cermia extra turn uses increased S3 damage then returns to normal order; S2 stays on cooldown", () => {
  let b = fixture();
  const next = executeAttack(heroes, b, "S2"),
    actor = activeUnit(next),
    target = next.units.find((u) => u.id === "left-0"),
    d = heroes.Cermia.skills.S3;
  assert.ok(
    damage(actor, target, d, "normal") >
      damage(activeUnit(b), target, d, "normal"),
  );
  assert.equal(canUse(heroes, next, actor, "S2"), false);
  const done = executeAttack(heroes, next, "S3", "left-0", "normal");
  assert.notEqual(done.active, actor.id);
  assert.equal(
    done.units
      .find((u) => u.id === actor.id)
      .buffs.find((b) => b.id === "stic_att_up2").turns,
    1,
  );
  assert.equal(done.souls.right, 5);
});
test("Arbiter starts with permanent undispellable Archdemon’s Might, 70% evasion and light damage bonus", () => {
  const b = fixture(),
    arb = b.units.find((u) => u.name === "Arbiter Vildred"),
    buff = arb.buffs.find((x) => x.id === "stic_demonpower_keep");
  assert.equal(buff.turns, null);
  assert.equal(effectiveStats(arb).evasion, 70);
  assert.equal(changeBuff(b, arb.id, buff.id, 2, true), b);
  const attacker = {
      ...arb,
      stats: { atk: 1000, hp: 10000, def: 500, spd: 100, chc: 100, chd: 250 },
    },
    light = { attribute: "light", stats: { def: 300, hp: 10000 } },
    dark = { ...light, attribute: "dark" },
    d = { rate: 1, pow: 1 };
  assert.equal(damage(attacker, light, d, "normal"), 1496);
  assert.equal(damage(attacker, dark, d, "normal"), 935);
  let passed = b;
  for (let i = 0; i < 12; i++) passed = executeAttack(heroes, passed, "wait");
  assert.equal(
    passed.units
      .find((u) => u.id === arb.id)
      .buffs.find((x) => x.id === buff.id).turns,
    null,
  );
  assert.equal(
    b.log.filter((e) => e.message.includes("gains Archdemon")).length,
    1,
  );
});
test("source text changes do not accidentally enable an incomplete self skill", () => {
  const changed = clone(heroes);
  changed.Cermia.skills.S2.description = "Unknown self effect";
  const b = fixture();
  assert.equal(canUse(changed, b, activeUnit(b), "S2"), false);
  assert.equal(executeAttack(changed, b, "S2"), b);
});
