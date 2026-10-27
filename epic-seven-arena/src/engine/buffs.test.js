import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { BUFFS, effectiveStats, changeBuff } from "./buffs.js";
import {
  createBattle,
  damage,
  executeAttack,
  readiness,
  canUse,
  activeUnit,
} from "./battle.js";
import { defaultTeams, clone } from "./heroes.js";
import { createCatalog } from "../data/cecilia.js";
const baseline = JSON.parse(
    fs.readFileSync(new URL("../../public/data/heroes.json", import.meta.url)),
  ),
  snapshot = JSON.parse(
    fs.readFileSync(new URL("../../public/data/cecilia.json", import.meta.url)),
  ),
  heroes = createCatalog(baseline, snapshot.heroes);
function fixture() {
  const teams = defaultTeams(heroes);
  teams.left[2].stats.spd = 300;
  return createBattle(teams, { left: 0, right: 0 });
}
test("buffs change effective stats and damage without editing the build", () => {
  const original = fixture(),
    actor = original.units[2],
    target = original.units[3],
    d = heroes.Ras.skills.S1,
    base = damage(actor, target, d, "normal");
  const b = changeBuff(original, actor.id, "stic_att_up", 2);
  assert.equal(original.units[2].buffs.length, 0);
  assert.equal(effectiveStats(b.units[2]).atk, actor.stats.atk * 1.5);
  assert.ok(damage(b.units[2], target, d, "normal") > base);
  const defense = changeBuff(b, target.id, "stic_def_up", 2);
  assert.ok(damage(actor, defense.units[3], d, "normal") < base);
  assert.deepEqual(actor.stats, b.units[2].stats);
});
test("normal and greater attack never stack; greater replaces weaker, same buffs refresh by max duration", () => {
  let b = changeBuff(fixture(), "left-2", "stic_att_up", 2);
  b = changeBuff(b, "left-2", "stic_att_up2", 1);
  assert.equal(b.units[2].buffs.length, 1);
  assert.equal(effectiveStats(b.units[2]).atk, b.units[2].stats.atk * 1.75);
  assert.equal(changeBuff(b, "left-2", "stic_att_up", 5), b);
  b = changeBuff(b, "left-2", "stic_att_up2", 3);
  assert.equal(b.units[2].buffs[0].turns, 3);
  assert.equal(
    changeBuff(b, "left-2", "stic_att_up2", 1).units[2].buffs[0].turns,
    3,
  );
});
test("speed changes preserve readiness and removing them restores pending turn time", () => {
  const b = fixture(),
    u = b.units[0],
    cr = readiness(u, b, b.units),
    before = u.readyAt;
  const faster = changeBuff(b, u.id, "stic_speed_up", 2),
    f = faster.units[0];
  assert.ok(Math.abs(readiness(f, faster, faster.units) - cr) < 1e-8);
  assert.ok(f.readyAt < before);
  const restored = changeBuff(faster, u.id, "stic_speed_up", 2, true);
  assert.ok(Math.abs(restored.units[0].readyAt - before) < 1e-8);
  assert.deepEqual(b.units[0].buffs, []);
});
test("durations tick only after bearer actions, including pass, and expiration restores stats", () => {
  let b = changeBuff(fixture(), "left-2", "stic_att_up", 1),
    snapshot = clone(b);
  b = executeAttack(heroes, b, "wait");
  assert.equal(b.units[2].buffs.length, 0);
  assert.equal(effectiveStats(b.units[2]).atk, b.units[2].stats.atk);
  assert.equal(snapshot.units[2].buffs[0].turns, 1);
  const other = changeBuff(fixture(), "right-0", "stic_def_up", 2),
    next = executeAttack(heroes, other, "wait");
  assert.equal(next.units[3].buffs[0].turns, 2);
});
test("Ras S3 grants 2-turn Defense to living allies after damage, no immediate self-expiration", () => {
  const b = fixture(),
    next = executeAttack(heroes, b, "S3", "right-0", "normal");
  for (const u of next.units.filter((u) => u.side === "left"))
    assert.deepEqual(
      u.buffs.map((x) => [x.id, x.turns]),
      [["stic_def_up", 2]],
    );
  for (const u of next.units.filter((u) => u.side === "right"))
    assert.equal(
      u.buffs.filter((b) => b.id !== "stic_demonpower_keep").length,
      0,
    );
  assert.equal(b.units[2].buffs.length, 0);
});
test("Mercedes S3 grants Attack; rules do not guess grants from changed source descriptions", () => {
  const teams = defaultTeams(heroes);
  teams.left[1].stats.spd = 350;
  const b = createBattle(teams, { left: 0, right: 0 }),
    after = executeAttack(heroes, b, "S3", "right-0", "normal");
  assert.ok(
    after.units
      .filter((u) => u.side === "left")
      .every((u) => u.buffs.some((x) => x.id === "stic_att_up")),
  );
  const changed = clone(heroes);
  changed.Mercedes.skills.S3.description = "No buff is granted.";
  assert.ok(
    executeAttack(changed, b, "S3", "right-0", "normal").units.every(
      (u) => !u.buffs.some((b) => b.id !== "stic_demonpower_keep"),
    ),
  );
});
test("critical buff stats are capped and invalid edits do nothing", () => {
  let b = changeBuff(fixture(), "left-2", "stic_cri_up", 2);
  b = changeBuff(b, "left-2", "stic_cridmg_up", 2);
  const stats = effectiveStats(b.units[2]);
  assert.equal(stats.chc, 65);
  assert.equal(stats.chd, 220);
  const capped = clone(b);
  capped.units[2].stats.chc = 80;
  capped.units[2].stats.chd = 330;
  assert.equal(effectiveStats(capped.units[2]).chc, 100);
  assert.equal(effectiveStats(capped.units[2]).chd, 350);
  assert.equal(changeBuff(b, "missing", "stic_att_up", 2), b);
  assert.equal(changeBuff(b, "left-2", "not-a-buff", 2), b);
  assert.equal(changeBuff(b, "left-2", "stic_att_up", 0), b);
  assert.equal(
    Object.values(BUFFS).filter((b) => b.manual !== false && b.effectType === "buff").length,
    9,
  );
});

test("debuffs combine additively with buffs, change damage, and preserve CR", () => {
  let b = fixture();
  const id = "left-2",
    original = b.units.find((u) => u.id === id);
  const before = readiness(original, b, b.units);
  b = changeBuff(b, id, "stic_dodge_dn", 2);
  assert.ok(
    Math.abs(
      readiness(
        b.units.find((u) => u.id === id),
        b,
        b.units,
      ) - before,
    ) < 1e-8,
  );
  b = changeBuff(b, id, "stic_def_up", 2);
  b = changeBuff(b, id, "stic_def_dn", 2);
  const unit = b.units.find((u) => u.id === id);
  assert.ok(
    Math.abs(effectiveStats(unit).def - original.stats.def * 0.9) < 1e-8,
  );
  const d = { rate: 1, pow: 1 };
  const actor = b.units.find((u) => u.side === "right");
  assert.ok(
    damage(actor, unit, d, "normal") > damage(actor, original, d, "normal"),
  );
  const reduced = changeBuff(b, actor.id, "stic_att_dn", 2);
  assert.ok(
    damage(
      reduced.units.find((u) => u.id === actor.id),
      unit,
      d,
      "normal",
    ) < damage(actor, unit, d, "normal"),
  );
});
test("Stun blocks skills and expires on passing, without mutating previous snapshots", () => {
  const original = fixture(),
    id = original.active;
  const stunned = changeBuff(original, id, "stic_stun", 1);
  assert.equal(canUse(heroes, stunned, activeUnit(stunned), "S1"), false);
  assert.equal(
    executeAttack(heroes, stunned, "S1", "right-0", "normal"),
    stunned,
  );
  assert.equal(canUse(heroes, stunned, activeUnit(stunned), "wait"), true);
  const passed = executeAttack(heroes, stunned, "wait");
  assert.equal(passed.units.find((u) => u.id === id).buffs.length, 0);
  assert.equal(stunned.units.find((u) => u.id === id).buffs[0].turns, 1);
  assert.equal(original.units.find((u) => u.id === id).buffs.length, 0);
});
test("Silence allows S1 but blocks cooldown skills; Unbuffable prevents new buffs only", () => {
  let b = fixture(),
    id = b.active;
  b = changeBuff(b, id, "stic_silence", 2);
  assert.equal(canUse(heroes, b, activeUnit(b), "S1"), true);
  assert.equal(canUse(heroes, b, activeUnit(b), "S3"), false);
  b = changeBuff(b, id, "stic_att_up", 2);
  b = changeBuff(b, id, "stic_buf_impossible", 2);
  assert.equal(changeBuff(b, id, "stic_def_up", 2), b);
  assert.ok(activeUnit(b).buffs.some((x) => x.id === "stic_att_up"));
  const blind = changeBuff(b, id, "stic_blind", 2);
  assert.equal(effectiveStats(activeUnit(blind)).hitChancePenalty, 50);
  const removed = changeBuff(blind, id, "stic_silence", 2, true);
  assert.equal(canUse(heroes, removed, activeUnit(removed), "S3"), true);
});
