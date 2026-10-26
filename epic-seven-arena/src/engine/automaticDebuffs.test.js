import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createCatalog } from "../data/cecilia.js";
import { resolveDebuffRules } from "../data/skillDebuffs.js";
import { defaultTeams, makeHero } from "./heroes.js";
import { createBattle, executeAttack as executeBattleAttack, activeUnit } from "./battle.js";
import { hasBuff, applySkillDebuffs } from "./buffs.js";
const baseline = JSON.parse(
  fs.readFileSync(new URL("../../public/data/heroes.json", import.meta.url)),
);
const snapshot = JSON.parse(
  fs.readFileSync(new URL("../../public/data/cecilia.json", import.meta.url)),
);
const heroes = createCatalog(baseline, snapshot.heroes);
const seq =
  (...values) =>
  () => {
    assert.ok(values.length, "unexpected random draw");
    return values.shift();
  };
function fixture(name) {
  const teams = defaultTeams(heroes);
  teams.left[0] = makeHero(heroes, name);
  teams.left[0].stats.spd = 350;
  teams.right[0].stats.hp = 100000;
  return createBattle(teams, { left: 0, right: 0 }, heroes);
}
test("Cecilia max values produce reviewed probabilities without double-counting enhancements", () => {
  assert.equal(heroes.Cermia.skills.S1.automaticDebuffs[0].chance, 75);
  assert.equal(heroes.Sigret.skills.S1.automaticDebuffs[0].chance, 50);
  assert.equal(
    heroes["Researcher Carrot"].skills.S3.automaticDebuffs[0].chance,
    75,
  );
  assert.equal(heroes.Luna.skills.S3.automaticDebuffs[0].chance, 100);
  assert.equal(
    heroes["Roaming Warrior Leo"].skills.S3.automaticDebuffs[1].chance,
    100,
  );
});
test("Cermia skill automatically procs enhanced unhealable and applies resistance boundaries", () => {
  const b = fixture("Cermia");
  const landed = executeAttack(
    heroes,
    b,
    "S1",
    "right-0",
    "normal",
    seq(0.7499, 0.8499),
  );
  assert.equal(
    hasBuff(
      landed.units.find((u) => u.id === "right-0"),
      "stic_heal_impossible",
    ),
    true,
  );
  const failed = executeAttack(heroes, b, "S1", "right-0", "normal", seq(0.75));
  assert.equal(
    hasBuff(
      failed.units.find((u) => u.id === "right-0"),
      "stic_heal_impossible",
    ),
    false,
  );
  const resisted = executeAttack(
    heroes,
    b,
    "S1",
    "right-0",
    "normal",
    seq(0, 0.85),
  );
  assert.equal(
    hasBuff(
      resisted.units.find((u) => u.id === "right-0"),
      "stic_heal_impossible",
    ),
    false,
  );
  assert.equal(b.units.find((u) => u.id === "right-0").buffs.length, 0);
});
test("each Sigret bleed stack rolls independently and retains caster snapshot", () => {
  const b = fixture("Sigret");
  const one = executeAttack(
    heroes,
    b,
    "S1",
    "right-0",
    "normal",
    seq(0, 0, 0.5),
  );
  const effects = one.units
    .find((u) => u.id === "right-0")
    .buffs.filter((x) => x.id === "stic_blood");
  assert.equal(effects.length, 1);
  assert.equal(effects[0].sourceAttack, activeUnit(b).stats.atk);
  const two = executeAttack(
    heroes,
    b,
    "S1",
    "right-0",
    "normal",
    seq(0, 0, 0, 0),
  );
  assert.equal(
    two.units
      .find((u) => u.id === "right-0")
      .buffs.filter((x) => x.id === "stic_blood").length,
    2,
  );
});
test("manual mode skips all automatic effect rolls; miss and immunity prevent debuffs", () => {
  const b = fixture("Cermia");
  const manual = executeAttack(heroes, b, "S1", "right-0", "normal", seq(), {
    automaticDebuffs: false,
  });
  assert.equal(
    hasBuff(
      manual.units.find((u) => u.id === "right-0"),
      "stic_heal_impossible",
    ),
    false,
  );
  const missed = executeAttack(heroes, b, "S1", "right-0", "miss", seq());
  assert.equal(
    hasBuff(
      missed.units.find((u) => u.id === "right-0"),
      "stic_heal_impossible",
    ),
    false,
  );
  const immune = structuredClone(b);
  immune.units
    .find((u) => u.id === "right-0")
    .buffs.push({ id: "stic_debuf_impossible", turns: 2 });
  const blocked = executeAttack(
    heroes,
    immune,
    "S1",
    "right-0",
    "normal",
    seq(),
  );
  assert.equal(
    hasBuff(
      blocked.units.find((u) => u.id === "right-0"),
      "stic_heal_impossible",
    ),
    false,
  );
});
test("source description changes fail closed and changed chance values refresh safely", () => {
  const raw = structuredClone(snapshot.heroes.cermia.skills[0]);
  assert.equal(
    resolveDebuffRules({ id: "c1079" }, raw, 0).effects[0].chance,
    75,
  );
  raw.values[0][0] = 0.065;
  assert.equal(
    resolveDebuffRules({ id: "c1079" }, raw, 0).effects[0].chance,
    85,
  );
  raw.description = "Only when an ally dies, applies a different effect.";
  assert.equal(resolveDebuffRules({ id: "c1079" }, raw, 0).effects.length, 0);
  assert.equal(resolveDebuffRules({ id: "c1079" }, raw, 0).pending, true);
});
test("Bomb planting runs automatically and crit-only grants do not roll on normal hits", () => {
  const b = fixture("Roaming Warrior Leo"),
    actor = activeUnit(b),
    target = b.units.find((u) => u.id === "right-0");
  applySkillDebuffs(
    b,
    actor,
    target,
    "S3",
    heroes[actor.name].skills.S3,
    "normal",
    seq(0, 0, 0, 0),
  );
  assert.ok(hasBuff(target, "stic_bomb"));
  assert.ok(hasBuff(target, "stic_dodge_dn"));
  const haste = heroes.Haste.skills.S3;
  const copy = { ...target, buffs: [] };
  applySkillDebuffs(
    b,
    { ...actor, code: heroes.Haste.code, name: "Haste" },
    copy,
    "S3",
    haste,
    "normal",
    seq(0, 0, 0, 0),
  );
  assert.equal(copy.buffs.filter((e) => e.id === "stic_blood").length, 2);
  assert.equal(hasBuff(copy, "stic_def_dn"), false);
});

// These fixtures isolate debuffs/protection/guaranteed reactions from natural RNG.
function executeAttack(heroes, battle, skill, targetId, hit, random, options = {}) {
  return executeBattleAttack(heroes, battle, skill, targetId, hit, random, {...options, automaticDualAttacks: false});
}
