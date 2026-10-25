import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createCatalog } from "../data/cecilia.js";
import { defaultTeams, makeHero } from "./heroes.js";
import {
  createBattle,
  activeUnit,
  executeAttack,
  changeCombatReadiness,
  resumeStalledBattle,
  readiness,
  resolveDeaths,
} from "./battle.js";
import {
  changeBuff,
  hasBuff,
  effectiveStats,
  applyCRChange,
  globalTurnEffects,
  effectRemaining,
  expireBuffs,
  sufferDamage,
} from "./buffs.js";
import { currentCR, setCR } from "./combatReadiness.js";
const heroes = createCatalog(
  JSON.parse(
    fs.readFileSync(new URL("../../public/data/heroes.json", import.meta.url)),
  ),
  JSON.parse(
    fs.readFileSync(new URL("../../public/data/cecilia.json", import.meta.url)),
  ).heroes,
);
function fixture(name = "Vildred") {
  const t = defaultTeams(heroes);
  t.left[0] = makeHero(heroes, name);
  t.left[0].stats.spd = 350;
  for (const side of Object.values(t))
    for (const h of side.filter(Boolean)) h.stats.hp = 100000;
  return createBattle(t, { left: 0, right: 0 }, heroes);
}
const get = (b, id = "right-0") => b.units.find((u) => u.id === id);
const cr = (b, u = get(b)) => currentCR(u, b, effectiveStats(u).spd);
const rng = () => 0.5;
test("Restrict blocks positive pushes, Stigma halves them once, neither prevents setbacks or natural Speed progress", () => {
  let b = fixture();
  setCR(b, get(b), 20, get(b).stats.spd);
  b = changeBuff(b, "right-0", "stic_stigma", 2);
  applyCRChange(b, get(b), 40);
  assert.ok(Math.abs(cr(b) - 40) < 1e-8);
  b = changeBuff(b, "right-0", "stic_ab_up_block", 2);
  applyCRChange(b, get(b), 50);
  assert.ok(Math.abs(cr(b) - 40) < 1e-8);
  applyCRChange(b, get(b), -10);
  assert.ok(Math.abs(cr(b) - 30) < 1e-8);
  b.time += 5;
  assert.ok(cr(b) > 30);
});
test("Immobilize freezes natural readiness, allows direct pushes and Speed changes preserve the frozen gauge", () => {
  let b = fixture();
  setCR(b, get(b), 25, get(b).stats.spd);
  b = changeBuff(b, "right-0", "stic_danger_4", 2);
  const frozen = cr(b);
  b.time += 10;
  assert.equal(cr(b), frozen);
  assert.equal(get(b).readyAt, Infinity);
  b = changeBuff(b, "right-0", "stic_speed_up", 2);
  assert.equal(cr(b), frozen);
  applyCRChange(b, get(b), 25);
  assert.ok(Math.abs(cr(b) - 50) < 1e-8);
  const unfreeze = changeBuff(b, "right-0", "stic_danger_4", 2, true);
  assert.ok(Math.abs(cr(unfreeze) - 50) < 1e-8);
  assert.ok(Number.isFinite(get(unfreeze).readyAt));
  applyCRChange(b, get(b), 50);
  assert.equal(cr(b), 100);
  assert.equal(get(b).readyAt, b.time);
});
test("Immobilize uses four future global turn starts rather than bearer duration and retains exact CR on expiry", () => {
  let b = fixture();
  setCR(b, get(b), 33, get(b).stats.spd);
  b = changeBuff(b, "right-0", "stic_danger_4", 1);
  const effect = get(b).buffs.find((e) => e.id === "stic_danger_4"),
    deadline = effect.expiresAtGlobal;
  expireBuffs(b, get(b));
  assert.equal(effectRemaining(b, effect), 4);
  b.turn = deadline - 1;
  globalTurnEffects(b);
  assert.equal(hasBuff(get(b), "stic_danger_4"), true);
  b.turn++;
  globalTurnEffects(b);
  assert.equal(hasBuff(get(b), "stic_danger_4"), false);
  assert.ok(Math.abs(cr(b) - 33) < 1e-8);
});
test("all-frozen combat stalls without inventing turns or infinite time and can resume through a push or cleanse", () => {
  let b = fixture();
  for (const u of b.units) b = changeBuff(b, u.id, "stic_danger_4", 2);
  b = executeAttack(heroes, b, "wait", null, "normal", rng);
  const turn = b.turn,
    time = b.time;
  assert.equal(b.stalled, true);
  assert.equal(b.active, null);
  assert.ok(Number.isFinite(time));
  const pushed = changeCombatReadiness(heroes, b, "right-0", 100, rng);
  assert.equal(pushed.stalled, false);
  assert.equal(pushed.active, "right-0");
  assert.equal(pushed.turn, turn + 1);
  assert.equal(b.turn, turn);
  const cleaned = changeBuff(b, "left-0", "stic_danger_4", 2, true);
  resumeStalledBattle(heroes, cleaned, rng);
  assert.equal(cleaned.stalled, false);
  assert.ok(cleaned.active);
  assert.ok(Number.isFinite(cleaned.time));
});
test("Death Sentence is undispellable, fixed at twelve future starts and deals exactly 50000 without ordinary damage modifiers", () => {
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_death_0_keep", 2, false, {
    casterId: b.active,
  });
  b = changeBuff(b, "right-0", "stic_target", 2);
  const effect = get(b).buffs.find((e) => e.id === "stic_death_0_keep");
  assert.equal(effectRemaining(b, effect), 12);
  assert.equal(changeBuff(b, "right-0", "stic_death_0_keep", 2, true), b);
  assert.equal(
    changeBuff(b, "right-0", "stic_death_0_keep", 2, false, {
      casterId: b.active,
    }),
    b,
  );
  b.turn = effect.expiresAtGlobal - 1;
  globalTurnEffects(b);
  assert.equal(get(b).currentHp, 100000);
  b.turn++;
  globalTurnEffects(b);
  assert.equal(get(b).currentHp, 50000);
  assert.equal(hasBuff(get(b), "stic_death_0_keep"), false);
});
test("source death cleans Death Sentence even if the source immediately revives", () => {
  let b = fixture();
  b = changeBuff(b, "left-0", "stic_death_0_keep", 2, false, {
    casterId: "right-3",
  });
  sufferDamage(b, get(b, "right-3"), 999999);
  resolveDeaths(heroes, b);
  assert.ok(get(b, "right-3").currentHp > 0);
  assert.equal(hasBuff(get(b, "left-0"), "stic_death_0_keep"), false);
});
test("global fixed damage resolves death passives before victory and advances the timer only on normal/extra turn starts", () => {
  let b = fixture();
  get(b, "right-3").currentHp = 1;
  b = changeBuff(b, "right-3", "stic_death_0_keep", 2, false, {
    casterId: b.active,
  });
  get(b, "right-3").buffs.find(
    (e) => e.id === "stic_death_0_keep",
  ).expiresAtGlobal = b.turn + 1;
  const next = executeAttack(heroes, b, "wait", null, "normal", rng);
  assert.ok(get(next, "right-3").currentHp > 0);
  assert.equal(next.winner, null);
  assert.equal(hasBuff(get(next, "right-3"), "stic_death_0_keep"), false);
});
test("caster CR gains are retained after action consumption and respect Restrict/Stigma", () => {
  const b = fixture("Romann"),
    time = b.time,
    id = b.active;
  const boosted = executeAttack(heroes, b, "S3", "right-0", "normal", rng);
  assert.equal(boosted.active, id);
  assert.ok(Math.abs(boosted.time - time - 5000 / 350) < 1e-8);
  const restricted = changeBuff(b, id, "stic_ab_up_block", 2);
  const blocked = executeAttack(
    heroes,
    restricted,
    "S3",
    "right-0",
    "normal",
    rng,
  );
  assert.notEqual(blocked.active, id);
  assert.ok(blocked.log.some((e) => e.message.includes("CR +0% (Restrict)")));
  const stigma = changeBuff(b, id, "stic_stigma", 2);
  const halved = executeAttack(heroes, stigma, "S3", "right-0", "normal", rng);
  assert.ok(halved.log.some((e) => e.message.includes("CR +25% (Stigma)")));
});
test("reviewed enemy setbacks use enhanced amounts and skip misses, immunity and resisted checks", () => {
  assert.equal(heroes.Tenebria.skills.S2.automaticReadiness[0].amount, -30);
  const b = fixture("Tenebria");
  const hit = executeAttack(heroes, b, "S2", "right-0", "normal", rng);
  assert.ok(hit.log.some((e) => e.message.includes("CR -30%")));
  const miss = executeAttack(heroes, b, "S2", "right-0", "miss", rng);
  assert.equal(
    miss.log.some((e) => e.message.includes("CR -30%")),
    false,
  );
  let immune = changeBuff(b, "right-0", "stic_debuf_impossible", 2);
  const blocked = executeAttack(heroes, immune, "S2", "right-0", "normal", rng);
  assert.ok(
    blocked.log.some((e) => e.message === "Cermia: CR setback immunity."),
  );
});

test("Death Sentence detonates on the twelfth actual subsequent start and no earlier", () => {
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_death_0_keep", 2, false, {
    casterId: b.active,
  });
  for (let i = 0; i < 11; i++)
    b = executeAttack(heroes, b, "wait", null, "normal", rng);
  assert.equal(get(b).currentHp, 100000);
  assert.equal(
    effectRemaining(
      b,
      get(b).buffs.find((e) => e.id === "stic_death_0_keep"),
    ),
    1,
  );
  b = executeAttack(heroes, b, "wait", null, "normal", rng);
  assert.equal(get(b).currentHp, 50000);
  assert.equal(hasBuff(get(b), "stic_death_0_keep"), false);
});
