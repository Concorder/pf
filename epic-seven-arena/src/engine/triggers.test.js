import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createCatalog } from "../data/cecilia.js";
import { defaultTeams, makeHero, validTeams } from "./heroes.js";
import {
  createBattle,
  activeUnit,
  executeAttack,
  executeReaction,
  resolveDeaths,
  selectHighestAttackDualAlly,
  canUse,
} from "./battle.js";
import {
  changeBuff,
  hasBuff,
  sufferDamage,
  effectiveStats,
  expireBuffs,
} from "./buffs.js";
import { canActivate, dispatchTrigger } from "./triggers.js";
import { reviveUnit } from "./revival.js";
import { inflictInjury, maxHp } from "./health.js";
const heroes = createCatalog(
  JSON.parse(
    fs.readFileSync(new URL("../../public/data/heroes.json", import.meta.url)),
  ),
  JSON.parse(
    fs.readFileSync(new URL("../../public/data/cecilia.json", import.meta.url)),
  ).heroes,
);
function fixture(ras = false) {
  const t = defaultTeams(heroes);
  if (ras)
    t.left = [
      makeHero(heroes, "Ras"),
      makeHero(heroes, "Vildred"),
      makeHero(heroes, "Mercedes"),
      null,
    ];
  for (const side of Object.values(t))
    for (const h of side.filter(Boolean)) h.stats.hp = 100000;
  t.left[0].stats.spd = 350;
  return createBattle(t, { left: 0, right: 0 }, heroes);
}
const get = (b, id) => b.units.find((u) => u.id === id);
const rng = () => 0.5;
test("shared activation gate separates action kind from passive/equipment origin and observes Bind timing", () => {
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_restrict", 2);
  const u = get(b, "right-0");
  for (const kind of ["additional", "counter", "dual"])
    assert.equal(canActivate(b, u, kind), false);
  b.active = u.id;
  for (const kind of ["additional", "counter", "dual"])
    assert.equal(canActivate(b, u, kind), true);
  b = changeBuff(b, u.id, "stic_nocounterattack", 2);
  assert.equal(canActivate(b, get(b, u.id), "counter"), false);
  assert.equal(canActivate(b, get(b, u.id), "dual"), true);
  b = changeBuff(b, u.id, "stic_dizzy", 2);
  let calls = 0;
  assert.equal(
    dispatchTrigger(b, get(b, u.id), { kind: "passive", run: () => calls++ })
      .activated,
    false,
  );
  assert.equal(
    dispatchTrigger(b, get(b, u.id), { kind: "equipment", run: () => calls++ })
      .activated,
    true,
  );
  assert.equal(calls, 1);
  assert.equal(canUse(heroes, b, get(b, u.id), "S1"), true);
});
test("counter uses a secondary attack without consuming the reactor turn, souls or durations, and cannot chain", () => {
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_att_up", 2);
  get(b, "right-0").counterChance = 100;
  activeUnit(b).counterChance = 100;
  const actorId = b.active,
    reactor = get(b, "right-0"),
    scheduled = reactor.readyAt,
    oldHP = activeUnit(b).currentHp;
  const next = executeAttack(heroes, b, "S1", reactor.id, "normal", rng);
  assert.ok(get(next, actorId).currentHp < oldHP);
  assert.equal(get(next, reactor.id).readyAt, scheduled);
  assert.equal(
    get(next, reactor.id).buffs.find((e) => e.id === "stic_att_up").turns,
    2,
  );
  assert.equal(next.souls.right, b.souls.right);
  assert.equal(next.turn, b.turn + 1);
  assert.equal(
    next.log.filter((e) => e.message.includes(" counter:")).length,
    1,
  );
  assert.equal(
    get(next, actorId).buffs.find((e) => e.id === "stic_heal_impossible").turns,
    1,
    "new counter-applied debuff must not expire at old turn end",
  );
  assert.equal(activeUnit(b).currentHp, oldHP);
});
test("Cannot Counterattack and out-of-turn Bind prevent configured counters; Seal does not suppress gear counters", () => {
  for (const id of ["stic_nocounterattack", "stic_restrict"]) {
    let b = fixture();
    get(b, "right-0").counterChance = 100;
    b = changeBuff(b, "right-0", id, 2);
    const hp = activeUnit(b).currentHp;
    const next = executeAttack(heroes, b, "S1", "right-0", "normal", () => {
      throw Error("blocked counter must not roll");
    });
    assert.equal(get(next, b.active).currentHp, hp);
    assert.ok(next.log.some((e) => e.message.includes("counter blocked")));
  }
  let b = fixture();
  get(b, "right-0").counterChance = 100;
  b = changeBuff(b, "right-0", "stic_dizzy", 2);
  assert.ok(
    executeAttack(heroes, b, "S1", "right-0", "normal", rng).log.some((e) =>
      e.message.includes(" counter:"),
    ),
  );
});
test("Ras S2 selects the highest-ATK eligible ally and skips a bound ally", () => {
  let b = fixture(true);
  get(b, "left-1").stats.atk = 4000;
  let next = executeAttack(heroes, b, "S2", "right-0", "normal", rng);
  assert.ok(next.log.some((e) => e.message.startsWith("Vildred dual:")));
  assert.equal(get(next, "left-1").readyAt, get(b, "left-1").readyAt);
  b = changeBuff(b, "left-1", "stic_restrict", 2);
  next = executeAttack(heroes, b, "S2", "right-0", "normal", rng);
  assert.ok(next.log.some((e) => e.message.startsWith("Mercedes dual:")));
  b = changeBuff(b, "left-1", "stic_restrict", 2, true);
  b = changeBuff(b, "left-1", "stic_dizzy", 2);
  assert.ok(
    executeAttack(heroes, b, "S2", "right-0", "normal", rng).log.some((e) =>
      e.message.startsWith("Vildred dual:"),
    ),
  );
});
test("explicit additional/counter/dual requests preserve time and resource state, reject invalid or blocked requests", () => {
  let b = fixture();
  const req = {
    kind: "additional",
    actorId: "right-0",
    targetId: "left-0",
    hit: "normal",
  };
  let next = executeReaction(heroes, b, req, rng);
  assert.notEqual(next, b);
  assert.equal(next.turn, b.turn);
  assert.equal(next.time, b.time);
  assert.equal(next.active, b.active);
  assert.deepEqual(next.souls, b.souls);
  b = changeBuff(b, "right-0", "stic_restrict", 2);
  assert.equal(executeReaction(heroes, b, req, rng), b);
  const own = { ...req, actorId: b.active, targetId: "right-0" };
  b = changeBuff(b, b.active, "stic_restrict", 2);
  assert.notEqual(executeReaction(heroes, b, own, rng), b);
  assert.equal(executeReaction(heroes, b, { ...req, kind: "unknown" }, rng), b);
});
test("revival cleanses ordinary effects and preserves exact Fracture stacks, injury, cooldowns and valid readiness", () => {
  let b = fixture();
  const id = "right-3";
  b = changeBuff(b, id, "stic_crack_1_aura", 3);
  b = changeBuff(b, id, "stic_crack_1_aura", 2);
  b = changeBuff(b, id, "stic_collapse", 2);
  b = changeBuff(b, id, "stic_att_up", 2);
  inflictInjury(get(b, id), 20000);
  const stack = structuredClone(
    get(b, id).buffs.find((e) => e.id === "stic_crack_1_aura"),
  );
  sufferDamage(b, get(b, id), 999999);
  resolveDeaths(heroes, b);
  const u = get(b, id);
  assert.equal(heroes[u.name].skills.S2.passiveRevival, 1);
  assert.equal(u.currentHp, 60000);
  assert.equal(maxHp(u), 60000);
  assert.equal(u.injuryFraction, 0.4);
  assert.deepEqual(
    u.buffs.find((e) => e.id === stack.id),
    stack,
  );
  assert.equal(hasBuff(u, "stic_att_up"), false);
  assert.equal(hasBuff(u, "stic_collapse"), false);
  assert.equal(hasBuff(u, "stic_demonpower_keep"), true);
  assert.equal(u.readyAt, b.time);
  assert.ok(u.cooldowns.S2 > 0);
  sufferDamage(b, u, 999999);
  resolveDeaths(heroes, b);
  assert.equal(u.currentHp, 0, "cooldown prevents a second native revival");
  assert.equal(reviveUnit(b, u, { fraction: 0.5 }), true);
  assert.equal(u.currentHp, 30000);
  assert.deepEqual(
    u.buffs.find((e) => e.id === stack.id),
    stack,
  );
});
test("Seal at death suppresses revival before cleanup and victory; unsealed last survivor revives before victory", () => {
  for (const sealed of [false, true]) {
    let b = fixture();
    for (const u of b.units.filter((u) => u.side === "right"))
      u.currentHp = u.id === "right-3" ? 1 : 0;
    if (sealed) b = changeBuff(b, "right-3", "stic_dizzy", 2);
    const next = executeAttack(heroes, b, "S1", "right-3", "normal", rng);
    assert.equal(get(next, "right-3").currentHp > 0, !sealed);
    assert.equal(next.winner, sealed ? "left" : null);
    if (!sealed) {
      assert.equal(next.active, "right-3");
      assert.equal(
        get(next, "right-3").buffs.find((e) => e.id === "stic_demonpower_keep")
          .turns,
        2,
      );
    } else
      assert.ok(
        next.log.some((e) =>
          e.message.includes("revival passive blocked by Seal"),
        ),
      );
  }
});
test("Seal death snapshot survives late cleansing; ordinary active/equipment revival is not itself suppressed by Seal", () => {
  let b = fixture();
  b = changeBuff(b, "right-3", "stic_dizzy", 1);
  const u = get(b, "right-3");
  sufferDamage(b, u, 999999);
  expireBuffs(b, u);
  resolveDeaths(heroes, b);
  assert.equal(u.currentHp, 0);
  assert.equal(reviveUnit(b, u, { fraction: 0.25 }), true);
  assert.equal(u.currentHp, 25000);
});
test("DoT death dispatches a passive during turn start without losing the revived actor or triggering victory early", () => {
  let b = fixture();
  get(b, "right-3").readyAt = b.time + 1;
  get(b, "right-3").currentHp = 1;
  b = changeBuff(b, "right-3", "stic_dot", 2, false, { casterId: b.active });
  const next = executeAttack(heroes, b, "wait");
  assert.equal(next.active, "right-3");
  assert.equal(get(next, "right-3").currentHp, 100000);
  assert.equal(hasBuff(get(next, "right-3"), "stic_dot"), false);
  assert.equal(next.winner, null);
});
test("source guards fail closed and counter chance remains optional for old saved builds", () => {
  const teams = defaultTeams(heroes);
  for (const side of Object.values(teams))
    for (const h of side.filter(Boolean)) delete h.counterChance;
  assert.equal(validTeams(teams, heroes), true);
  teams.left[0].counterChance = 101;
  assert.equal(validTeams(teams, heroes), false);
  const changed = structuredClone(heroes);
  changed.Vildred.skills.S1.canTriggerCounter = false;
  const b = fixture();
  get(b, "right-0").counterChance = 100;
  const next = executeAttack(changed, b, "S1", "right-0", "normal", () => {
    throw Error("counter forbidden by skill");
  });
  assert.equal(
    next.log.some((e) => e.message.includes(" counter:")),
    false,
  );
});

test("counter death on the actor turn preserves revival readiness and fresh EE/Fracture durations", () => {
  const t = defaultTeams(heroes);
  t.left[0] = makeHero(heroes, "Arbiter Vildred");
  t.left[0].stats.spd = 350;
  for (const side of Object.values(t))
    for (const h of side.filter(Boolean)) h.stats.hp = 100000;
  let b = createBattle(t, { left: 0, right: 0 }, heroes);
  b = changeBuff(b, b.active, "stic_crack_1_aura", 3);
  activeUnit(b).currentHp = 1;
  get(b, "right-0").counterChance = 100;
  const next = executeAttack(heroes, b, "S1", "right-0", "normal", rng),
    u = get(next, b.active);
  assert.equal(next.active, b.active);
  assert.ok(u.currentHp > 0);
  assert.equal(u.buffs.find((e) => e.id === "stic_demonpower_keep").turns, 2);
  assert.equal(u.buffs.find((e) => e.id === "stic_crack_1_aura").turns, 3);
  assert.equal(next.time, b.time);
  assert.equal(u.cooldowns.S2, 5);
});

test("highest-ATK selector skips every disabled candidate and does not attack when all allies are disabled", () => {
  for (const status of [
    "stic_restrict",
    "stic_stun",
    "stic_sleep",
    "stic_fear",
  ]) {
    let b = fixture(true);
    get(b, "left-1").stats.atk = 5000;
    b = changeBuff(b, "left-1", status, 2);
    assert.equal(
      selectHighestAttackDualAlly(heroes, b, activeUnit(b)).id,
      "left-2",
      status,
    );
    b = changeBuff(b, "left-2", "stic_stun", 2);
    assert.equal(selectHighestAttackDualAlly(heroes, b, activeUnit(b)), null);
    const next = executeAttack(heroes, b, "S2", "right-0", "normal", rng);
    assert.equal(
      next.log.some((e) => e.message.includes(" dual:")),
      false,
    );
    assert.ok(next.log.some((e) => e.message.includes("no eligible ally")));
  }
});
test("highest-ATK selector uses effective ATK, ignores dead allies, and permits Seal or Cannot Counterattack on an active S1", () => {
  let b = fixture(true);
  get(b, "left-1").stats.atk = 5000;
  get(b, "left-2").stats.atk = 3500;
  b = changeBuff(b, "left-1", "stic_att_dn", 2);
  b = changeBuff(b, "left-2", "stic_dizzy", 2);
  b = changeBuff(b, "left-2", "stic_nocounterattack", 2);
  assert.equal(
    selectHighestAttackDualAlly(heroes, b, activeUnit(b)).id,
    "left-2",
  );
  get(b, "left-2").currentHp = 0;
  assert.equal(
    selectHighestAttackDualAlly(heroes, b, activeUnit(b)).id,
    "left-1",
  );
  get(b, "left-1").currentHp = 0;
  assert.equal(selectHighestAttackDualAlly(heroes, b, activeUnit(b)), null);
});
test("highest-ATK equipment Dual Attacks use the same eligible-ally fallback and require equipped EE", () => {
  const teams = defaultTeams(heroes);
  teams.left = [
    makeHero(heroes, "Archdemon's Shadow"),
    makeHero(heroes, "Vildred"),
    makeHero(heroes, "Mercedes"),
    null,
  ];
  teams.left[0].stats.spd = 350;
  teams.left[1].stats.atk = 5000;
  for (const side of Object.values(teams))
    for (const h of side.filter(Boolean)) h.stats.hp = 100000;
  let b = createBattle(teams, { left: 0, right: 0 }, heroes);
  b = changeBuff(b, "left-1", "stic_stun", 2);
  const next = executeAttack(heroes, b, "S1", "right-0", "normal", rng);
  assert.ok(next.log.some((e) => e.message.startsWith("Mercedes dual:")));
  teams.left[0].eeEnabled = false;
  const unequipped = createBattle(teams, { left: 0, right: 0 }, heroes);
  assert.equal(
    executeAttack(heroes, unequipped, "S1", "right-0", "normal", rng).log.some(
      (e) => e.message.includes(" dual:"),
    ),
    false,
  );
});
