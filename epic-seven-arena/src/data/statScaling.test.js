import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {parseMultipliers, createCatalog} from "./cecilia.js";
import {damage} from "../engine/battle.js";
const root = new URL("../../public/data/", import.meta.url);
const catalog = createCatalog(JSON.parse(fs.readFileSync(new URL("heroes.json",root))), JSON.parse(fs.readFileSync(new URL("cecilia.json",root))).heroes);
test("equivalent explicit HP/Defense source formats parse normal-cast coefficients", () => {
  for (const [line, key, value] of [
    ["Max Health scaling 12% (0.12 * self Max Health)","selfHpScaling",.12],
    ["Max Health Scaling: 10% self max Health (0.1 * Health)","selfHpScaling",.1],
    ["Health scaling: 14% caster's max Health","selfHpScaling",.14],
    ["20% self max Health","selfHpScaling",.2],
    ["12% self max Health (24% soulburn)","selfHpScaling",.12],
    ["100% self Defense (1 * Defense) (160% soulburn)","selfDefScaling",1],
    ["200% self Defense scaling (2 * Defense)","selfDefScaling",2],
    ["50% self Defense (60% soulburn)","selfDefScaling",.5],
  ]) {
    const d = parseMultipliers(`att_rate: 0.6\n!pow: 0.9\n${line}`);
    assert.equal(d.damageSupport,"supported",line);
    assert.equal(d[key],value,line);
  }
});
test("conditional, contradictory, duplicate and secondary-effect formulas remain blocked", () => {
  for (const line of [
    "10% self max Health (0.01 * Health)",
    "100% self Defense (1 * Health)",
    "11% self max Health (0.11 * Health), 15% with max Focus",
    "90% self Defense (120% if buffed by Skill 3)",
    "5% self max Health (8% soulburn) (6.25% < 75% hp)",
    "Heal strength: 20% self max Health",
    "Barrier Strength: 100% of Self Defense",
    "Additional damage: 15% caster's max Health",
    "10% self max Health\n10% self max Health",
  ]) assert.equal(parseMultipliers(`att_rate: 1\n!pow: 1\n${line}`).damageSupport,"unsupported",line);
  assert.equal(parseMultipliers("att_rate: 0\n!pow: 1").damageSupport,"unsupported");
  assert.equal(parseMultipliers("att_rate: 0\n!pow: 1\n1% self Speed").damageSupport,"unsupported");
  assert.equal(parseMultipliers("att_rate: 0\n!pow: 1\n20% self max Health").damageSupport,"supported");
});
test("real catalog enables explicit scaling while preserving passives and pending conditionals", () => {
  assert.equal(parseMultipliers(catalog.Abigail.skills.S1.sourceText).damageSupport,"supported");
  // Reviewed root correction distinguishes the attack from its nested non-attack effect.
  assert.equal(catalog.Abigail.skills.S1.damageSupport,"supported");
  assert.match(catalog.Abigail.skills.S1.sourceReview,/conditional Might effect remains pending/);
  assert.equal(catalog.Abigail.skills.S1.selfHpScaling,.12);
  assert.equal(catalog["Lionheart Cermia"].skills.S1.damageSupport,"supported");
  assert.equal(catalog["Lionheart Cermia"].skills.S1.selfDefScaling,1);
  assert.equal(catalog["Apocalypse Ravi"].skills.S3.damageSupport,"unsupported");
  assert.equal(catalog["Apocalypse Ravi"].skills.S2.damageSupport,"passive");
  assert.match(catalog.Aria.skills.S3.supportReason,/Non-damaging/);
});
test("HP/Defense terms use the existing enhancement and defense-mitigation formula", () => {
  const unit = stats => ({stats, buffs:[], currentHp:stats.hp});
  const a = unit({atk:1800,hp:20000,def:1500,spd:200,chd:250});
  const t = unit({atk:1000,hp:15000,def:1200,spd:150,chd:150});
  for (const [key, value] of [["selfHpScaling",20000*.12],["selfDefScaling",1500*1]]) {
    const d = {rate:.6,pow:.9,[key]:key==="selfHpScaling"?.12:1, enhancementDamage:.3};
    assert.equal(damage(a,t,d,"normal"),Math.floor((1800*.6+value)*.9*1.871*1.3*300/(1200+300)));
    assert.equal(damage(a,t,d,"crit"),Math.floor((1800*.6+value)*.9*1.871*1.3*2.5*300/(1200+300)));
  }
});
