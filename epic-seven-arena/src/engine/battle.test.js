import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { defaultTeams, clone, roster, validTeams } from "./heroes.js";
import {
  createBattle,
  activeUnit,
  readiness,
  executeAttack,
  damage,
  setSouls,
} from "./battle.js";
const heroes = JSON.parse(
  readFileSync(new URL("../../public/data/heroes.json", import.meta.url)),
);
function fixture() {
  const teams = defaultTeams(heroes);
  const speeds = [300, 240, 150, 270, 210, 180];
  roster(teams).forEach(
    (u, i) => (teams[u.side][u.slot].stats.spd = speeds[i]),
  );
  return teams;
}
test("starting readiness is proportional to fastest hero on either side", () => {
  const teams = fixture(),
    units = roster(teams),
    battle = createBattle(teams, { left: 0, right: 0 });
  assert.deepEqual(
    units.map((u) => readiness(u, null, units)),
    [100, 80, 50, 90, 70, 60],
  );
  assert.deepEqual(
    battle.units.map(
      (u) => Math.round(readiness(u, battle, battle.units) * 1e9) / 1e9,
    ),
    [100, 80, 50, 90, 70, 60],
  );
  assert.equal(activeUnit(battle).name, "Vildred");
});
test("damage preserves existing coefficients and all four hit outcomes", () => {
  const a = { stats: { atk: 1000, hp: 10000, def: 500, spd: 100, chd: 250 } },
    t = { stats: { def: 300, hp: 12000 } },
    d = { rate: 1, pow: 1 };
  assert.deepEqual(
    ["normal", "crit", "miss", "crushing"].map((hit) => damage(a, t, d, hit)),
    [935, 2338, 701, 1216],
  );
  assert.equal(damage(a, t, { ...d, selfHpScaling: 0.1 }, "normal"), 1871);
  assert.equal(damage(a, t, { ...d, penetration: 0.5 }, "normal"), 1247);
});
test("attack and manual soul changes are immutable, enabling exact undo", () => {
  const teams = fixture();
  teams.left[0].artifactSouls = 20;
  teams.left[0].skills.S1 = { gain: 2, cost: 3, cd: 2 };
  const battle = createBattle(teams, { left: 5, right: 0 }),
    snapshot = clone(battle),
    next = executeAttack(heroes, battle, "S1", "right-0", "normal");
  assert.deepEqual(battle, snapshot);
  assert.equal(battle.souls.left, 25);
  assert.equal(next.souls.left, 24);
  assert.equal(next.units.find((u) => u.id === "left-0").cooldowns.S1, 3);
  assert.equal(activeUnit(next).name, "Cermia");
  assert.ok(next.units.find((u) => u.id === "right-0").currentHp < 12000);
  assert.ok(next.units.find((u) => u.id === "right-2").currentHp < 12000);
  assert.equal(next.units.find((u) => u.id === "right-3").currentHp, 12000);
  const adjusted = setSouls(next, "right", 999);
  assert.equal(adjusted.souls.right, 99);
  assert.equal(next.souls.right, 0);
});
test("invalid actions do not spend souls, damage units or advance turns", () => {
  const b = createBattle(fixture(), { left: 0, right: 0 });
  for (const [s, target, hit] of [
    ["S1", "left-1", "normal"],
    ["S1", "missing", "normal"],
    ["S1", "right-0", "invalid"],
    ["missing", "right-0", "normal"],
  ])
    assert.equal(executeAttack(heroes, b, s, target, hit), b);
});
test("pass advances speed scheduler and victory prevents further actions", () => {
  const b = createBattle(fixture(), { left: 0, right: 0 }),
    pass = executeAttack(heroes, b, "wait");
  assert.equal(activeUnit(pass).name, "Cermia");
  assert.equal(pass.turn, 2);
  assert.equal(pass.souls.left, 0);
  const vulnerable = clone(b);
  vulnerable.units
    .filter((u) => u.side === "right")
    .forEach((u) => (u.currentHp = 1));
  const won = executeAttack(heroes, vulnerable, "S3", "right-0", "crit");
  assert.equal(won.winner, "left");
  assert.equal(won.active, null);
  assert.equal(executeAttack(heroes, won, "wait"), won);
});
test("existing stored build schema remains valid and rejects duplicate heroes", () => {
  const teams = fixture();
  assert.ok(validTeams(teams, heroes));
  teams.left[1] = clone(teams.left[0]);
  assert.equal(validTeams(teams, heroes), false);
});
