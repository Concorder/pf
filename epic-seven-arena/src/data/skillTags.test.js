import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {classifySkill, hasSkillTag, skillTags, skillTagLabels} from "./skillTags.js";
import {normalizeSkill} from "./cecilia.js";
const heroes = Object.values(JSON.parse(fs.readFileSync(new URL("../../public/data/cecilia.json", import.meta.url))).heroes);
const skill = (name, i) => {const h = heroes.find(h => h.name === name); return normalizeSkill(h, h.skills[i-1], i-1);};
test("normal casts distinguish attacks, non-attacks, passives and two-target attacks", () => {
  assert.deepEqual(skill("Cermia", 1).tags, ["attack", "singleAttack"]);
  assert.deepEqual(skill("Cermia", 2).tags, ["nonAttack", "extraTurn"]);
  assert.deepEqual(skill("Lilias", 3).tags, ["attack", "allEnemiesAttack"]);
  assert.deepEqual(skill("Lilias", 2).tags, ["passive"]);
  assert.deepEqual(skill("Vildred", 1).tags, ["attack", "multiTargetAttack"]);
  assert.deepEqual(skill("Spirit Eye Celine", 3).tags, ["nonAttack"]);
});
test("Soulburn-only extra turns and form-dependent targeting stay separate", () => {
  const lilias = skill("Lilias", 1);
  assert.equal(hasSkillTag(lilias, "extraTurn"), false);
  assert.equal(hasSkillTag(lilias, "extraTurn", {soulburn: true}), true);
  assert.equal(skill("Tamarinne", 1).targetScope, "variantDependent");
  assert.equal(hasSkillTag(skill("Tamarinne", 1), "allEnemiesAttack"), false);
  assert.equal(hasSkillTag(skill("Tamarinne", 3), "extraTurn"), true);
});
test("missing coefficients do not imply non-attack; unsupported coefficients do not erase attack", () => {
  assert.deepEqual(classifySkill({description:"Unknown", multipliers:""}).tags, ["unclassified"]);
  assert.deepEqual(classifySkill({description:"Attacks the enemy. Damage varies.", multipliers:"conditional formula"}).tags, ["attack", "singleAttack"]);
  assert.deepEqual(classifySkill({passive:true, description:"After an enemy uses a non-attack skill, attacks all enemies.", common:[{_id:"cmn_aoe"}]}).tags, ["passive"]);
});
test("catalog tags have no contradictory cast classifications or passive extra turns", () => {
  for (const h of heroes) for (const [i, raw] of h.skills.entries()) {
    const s = normalizeSkill(h, raw, i);
    assert.ok(s.tags.length, `${h.name} ${i}`);
    assert.ok(!(hasSkillTag(s,"attack") && hasSkillTag(s,"nonAttack")));
    if (s.passive) assert.deepEqual(s.tags, ["passive"]);
  }
});

test("selected Soulburn resolves extra-turn tags and cancellation restores normal tags", () => {
  const s = skill("Lilias", 1);
  const normal = skillTags(s);
  assert.ok(!normal.includes("extraTurn"));
  assert.ok(skillTags(s, {soulburn:true}).includes("extraTurn"));
  assert.ok(skillTagLabels(s, {soulburn:true}).includes("Extra turn"));
  assert.deepEqual(skillTags(s, {soulburn:false}), normal);
  const resolved = skillTags(s, {soulburn:true});
  resolved.push("mutation");
  assert.ok(!skillTags(s, {soulburn:true}).includes("mutation"));
  assert.ok(!skillTags(skill("Cermia", 3), {soulburn:true}).includes("extraTurn"));
});
