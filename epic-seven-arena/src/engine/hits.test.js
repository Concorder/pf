import test from "node:test";
import assert from "node:assert/strict";
import { elementRelation, hitChances, rollHit } from "./hits.js";
import { createBattle, executeAttack } from "./battle.js";
import { defaultTeams } from "./heroes.js";
import { createCatalog } from "../data/cecilia.js";
import fs from "node:fs";
const unit = (attribute, chc = 0, buffs = []) => ({
  attribute,
  stats: { atk: 1000, def: 500, hp: 10000, spd: 100, chc, chd: 250 },
  buffs,
});
const d = { hitTypes: ["normal", "miss", "crit", "crushing"] };
const sequence =
  (...values) =>
  () => {
    assert.ok(values.length, "unexpected random draw");
    return values.shift();
  };
test("full elemental matrix including aliases and reciprocal Light/Dark advantage", () => {
  const beats = { ice: "fire", fire: "wind", wind: "ice" };
  for (const a of ["ice", "fire", "wind", "light", "dark"])
    for (const b of ["ice", "fire", "wind", "light", "dark"]) {
      const expected =
        a === b
          ? "neutral"
          : beats[a] === b
            ? "advantage"
            : beats[b] === a
              ? "disadvantage"
              : ["light", "dark"].includes(a) && ["light", "dark"].includes(b)
                ? "advantage"
                : "neutral";
      assert.equal(elementRelation(a, b), expected, `${a} against ${b}`);
    }
  assert.equal(elementRelation("water", "fire"), "advantage");
  assert.equal(elementRelation("earth", "water"), "advantage");
});
test("50% disadvantage miss takes priority over 100% crit with exact boundary", () => {
  const a = unit("fire", 100),
    b = unit("ice");
  assert.equal(rollHit(a, b, d, sequence(0.49999)), "miss");
  assert.equal(rollHit(a, b, d, sequence(0.5, 0)), "crit");
  assert.equal(hitChances(unit("light"), b).miss, 0);
});
test("evasion and Blind add to miss chance and clamp; crit and crushing use separate checks", () => {
  const a = unit("fire", 100, [{ id: "stic_blind", turns: 2 }]),
    b = unit("ice", 0, [{ id: "stic_demonpower_keep", turns: 2 }]);
  assert.equal(hitChances(a, b).miss, 100);
  assert.equal(rollHit(a, b, d, sequence(0.99)), "miss");
  assert.equal(hitChances(unit("ice", 90), unit("fire")).critical, 100);
  assert.equal(
    rollHit(unit("fire"), unit("fire"), d, sequence(0.9, 0.9, 0.29)),
    "crushing",
  );
  assert.equal(
    rollHit(unit("fire"), unit("fire"), d, sequence(0.9, 0.9, 0.3)),
    "normal",
  );
  assert.equal(
    rollHit(unit("fire"), unit("ice"), { hitTypes: ["normal"] }, sequence()),
    "normal",
  );
});
test("automatic AoE rolls separately per target; manual override bypasses random; history stays immutable", () => {
  const heroes = createCatalog(
    JSON.parse(
      fs.readFileSync(
        new URL("../../public/data/heroes.json", import.meta.url),
      ),
    ),
    JSON.parse(
      fs.readFileSync(
        new URL("../../public/data/cecilia.json", import.meta.url),
      ),
    ).heroes,
  );
  const teams = defaultTeams(heroes);
  teams.left[0].stats.spd = 500;
  const b = createBattle(teams, { left: 0, right: 0 }, heroes);
  const original = structuredClone(b);
  for (const u of b.units.filter((u) => u.side === "right")) {
    u.attribute = "fire";
    u.buffs = [];
  }
  b.units.find((u) => u.id === b.active).stats.chc = 100;
  const auto = executeAttack(
    heroes,
    b,
    "S3",
    "right-0",
    "auto",
    sequence(0.1, 0.9, 0, 0.1),
  );
  assert.match(
    auto.log.find((e) => e.message.includes("uses S3")).message,
    /\(miss\).*\(crit\).*\(miss\)/,
  );
  const manual = executeAttack(heroes, b, "S3", "right-0", "normal", () => {
    throw Error("manual must not roll");
  });
  assert.ok(manual.log.some((e) => e.message.includes("(normal)")));
  assert.equal(b.turn, original.turn);
  assert.ok(b.units.every((u) => u.currentHp === u.stats.hp));
});
