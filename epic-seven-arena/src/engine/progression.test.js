import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createCatalog } from "../data/cecilia.js";
import { makeHero } from "./heroes.js";
import { equippedEE, equippedSkill, maxEnhancements } from "./progression.js";
import { damage } from "./battle.js";
const heroes = createCatalog(
  JSON.parse(
    fs.readFileSync(new URL("../../public/data/heroes.json", import.meta.url)),
  ),
  JSON.parse(
    fs.readFileSync(new URL("../../public/data/cecilia.json", import.meta.url)),
  ).heroes,
);
test("max enhancements sum damage, cooldown, souls and chance without discarding entries", () => {
  const m = maxEnhancements({
    enhancements: [
      { string: "enh_damage_dealt", value: 0.1 },
      { string: "enh_damage_dealt", value: 0.2 },
      { string: "enh_sk_cooldown", value: -1 },
      { string: "enh_soul_gain", value: 2 },
      { string: "enh_effect_chance", value: 0.2 },
    ],
  });
  assert.ok(Math.abs(m.damage - 0.3) < 1e-9);
  assert.equal(m.cooldown, -1);
  assert.equal(m.soulGain, 2);
  assert.equal(m.effectChance, 0.2);
  assert.equal(m.level, 5);
  assert.equal(heroes.Cermia.skills.S2.defaults.cd, 4);
  const d = heroes.Ras.skills.S1;
  assert.ok(Math.abs(d.enhancementDamage - 0.3) < 1e-9);
  const a = { stats: { atk: 1000, hp: 10000, spd: 100, def: 500, chd: 250 } },
    t = { stats: { def: 300, hp: 10000 } };
  assert.equal(
    damage(a, t, d, "normal"),
    Math.round(damage(a, t, { ...d, enhancementDamage: 0 }, "normal") * 1.3),
  );
});
test("Moonlight EE defaults to one option and changing it applies only selected skill", () => {
  const h = heroes["Tempest Surin"];
  assert.equal(makeHero(heroes, "Tempest Surin").eeEnabled, true);
  assert.equal(makeHero(heroes, "Cermia").eeEnabled, false);
  const unit = { eeEnabled: true, eeOption: 1 };
  assert.equal(h.exclusiveEquipment.options.length, 3);
  assert.equal(equippedEE(h, unit).option.index, 1);
  assert.equal(equippedSkill(h, unit, "S3").eeDamage, 0.1);
  assert.equal(
    equippedSkill(h, { ...unit, eeOption: 0 }, "S3").eeDamage,
    undefined,
  );
  assert.equal(equippedEE(h, { ...unit, eeEnabled: false }), null);
  assert.equal(heroes.Cermia.exclusiveEquipment, null);
});
