import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  maxHp,
  originalMaxHp,
  injuryAmount,
  injuryFraction,
  uninjuredMaxHp,
  setMaxHpMultiplier,
  inflictInjury,
  reviveHealth,
} from "./health.js";
import {
  createBattle,
  damage,
  executeAttack,
  activeUnit,
  forcedTarget,
} from "./battle.js";
import {
  changeBuff,
  healUnit,
  sufferDamage,
  startTurnEffects,
  endTurnEffects,
  afterAttackEffects,
  effectiveStats,
  expireBuffs,
  hasBuff,
  applySkillDebuffs,
} from "./buffs.js";
import { defaultTeams, makeHero } from "./heroes.js";
import { createCatalog } from "../data/cecilia.js";
const heroes = createCatalog(
  JSON.parse(
    fs.readFileSync(new URL("../../public/data/heroes.json", import.meta.url)),
  ),
  JSON.parse(
    fs.readFileSync(new URL("../../public/data/cecilia.json", import.meta.url)),
  ).heroes,
);
function fixture(name = "Vildred") {
  const teams = defaultTeams(heroes);
  teams.left[0] = makeHero(heroes, name);
  teams.left[0].stats.spd = 350;
  for (const side of Object.values(teams))
    for (const h of side.filter(Boolean)) h.stats.hp = 10000;
  return createBattle(teams, { left: 0, right: 0 }, heroes);
}
const get = (b, id = "right-0") => b.units.find((u) => u.id === id);
const seq =
  (...v) =>
  () => {
    assert.ok(v.length, "unexpected roll");
    return v.shift();
  };
test("injury is capped at half original HP, immutable build HP is retained, healing cannot restore capacity", () => {
  const b = fixture(),
    u = get(b);
  inflictInjury(u, 2000);
  assert.equal(maxHp(u), 8000);
  assert.equal(u.currentHp, 8000);
  assert.equal(u.stats.hp, 10000);
  assert.equal(originalMaxHp(u), 10000);
  sufferDamage(b, u, 1000);
  assert.equal(healUnit(b, u, 10000, "test"), 1000);
  assert.equal(u.currentHp, 8000);
  assert.equal(inflictInjury(u, 99999), 3000);
  assert.equal(injuryAmount(u), 5000);
  assert.equal(maxHp(u), 5000);
  assert.equal(healUnit(b, u, 10000, "test"), 0);
});
test("Collapse clamps hero HP to half and monster HP to three quarters, cleansing and expiry never heal", () => {
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_collapse", 1);
  assert.equal(maxHp(get(b)), 5000);
  assert.equal(get(b).currentHp, 5000);
  assert.equal(injuryAmount(get(b)), 0);
  const removed = changeBuff(b, "right-0", "stic_collapse", 2, true);
  assert.equal(maxHp(get(removed)), 10000);
  assert.equal(get(removed).currentHp, 5000);
  expireBuffs(b, get(b));
  assert.equal(maxHp(get(b)), 10000);
  assert.equal(get(b).currentHp, 5000);
  get(b).isHero = false;
  b = changeBuff(b, "right-0", "stic_collapse", 2);
  assert.equal(maxHp(get(b)), 7500);
  assert.equal(changeBuff(b, "right-0", "stic_laceration", 2), b);
  assert.equal(
    changeBuff(b, "right-0", "stic_venom", 2, false, { casterId: b.active }),
    b,
  );
  assert.equal(inflictInjury(get(b), 1000), 0);
});
test("explicit combined model: Collapse scales remaining capacity after permanent injury, never erases it", () => {
  let b = fixture();
  inflictInjury(get(b), 2000);
  b = changeBuff(b, "right-0", "stic_collapse", 2);
  assert.equal(maxHp(get(b)), 4000);
  assert.equal(get(b).currentHp, 4000);
  b = changeBuff(b, "right-0", "stic_collapse", 2, true);
  assert.equal(maxHp(get(b)), 8000);
  assert.equal(get(b).currentHp, 4000);
  assert.equal(injuryAmount(get(b)), 2000);
});
test("Venom stacks tick against the injury-limit max-HP basis and create capped persistent injury from actual damage", () => {
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_venom", 2, false, { casterId: b.active });
  b = changeBuff(b, "right-0", "stic_venom", 2, false, { casterId: b.active });
  startTurnEffects(b, get(b), seq());
  assert.equal(get(b).currentHp, 8000);
  assert.equal(injuryAmount(get(b)), 2000);
  assert.equal(maxHp(get(b)), 8000);
  const cleansed = changeBuff(b, "right-0", "stic_venom", 2, true);
  assert.equal(injuryAmount(get(cleansed)), 2000);
  assert.equal(maxHp(get(cleansed)), 8000);
  for (let i = 0; i < 20; i++) startTurnEffects(b, get(b), seq());
  assert.equal(injuryAmount(get(b)), 5000);
  assert.equal(maxHp(get(b)), 5000);
  assert.equal(get(b).currentHp, 0);
});
test("Laceration increases direct damage 15%, injuries use actual HP loss, immunity does not prevent existing injury", () => {
  let b = fixture(),
    actor = activeUnit(b),
    target = get(b),
    d = heroes.Vildred.skills.S1;
  const before = damage(actor, target, d, "normal");
  b = changeBuff(b, "right-0", "stic_laceration", 2);
  b = changeBuff(b, "right-0", "stic_debuf_impossible", 2);
  const after = damage(activeUnit(b), get(b), d, "normal");
  assert.ok(Math.abs(after - before * 1.15) < 2);
  get(b).currentHp = 100;
  assert.equal(sufferDamage(b, get(b), 99999), 100);
  assert.equal(injuryAmount(get(b)), 100);
  assert.equal(get(b).currentHp, 0);
});
test("Laceration covers DoT, Bomb and secondary health-damage hooks; capacity clamping is not damage", () => {
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_laceration", 2);
  b = changeBuff(b, "right-0", "stic_dot", 2, false, { casterId: b.active });
  startTurnEffects(b, get(b), seq());
  assert.equal(injuryAmount(get(b)), 500);
  b = changeBuff(b, "right-0", "stic_collapse", 2);
  assert.equal(injuryAmount(get(b)), 250);
  assert.equal(injuryFraction(get(b)), 0.05);
  const saved = injuryAmount(get(b));
  b = changeBuff(b, "right-0", "stic_bomb", 1, false, { casterId: b.active });
  expireBuffs(b, get(b));
  assert.ok(injuryAmount(get(b)) > saved);
  b = fixture();
  b = changeBuff(b, "right-0", "stic_laceration", 2);
  b = changeBuff(b, "right-2", "stic_deceptive", 2);
  endTurnEffects(b, get(b, "right-2"));
  assert.equal(injuryAmount(get(b)), 1000);
  b = fixture();
  b = changeBuff(b, "right-0", "stic_laceration", 2);
  afterAttackEffects(
    b,
    activeUnit(b),
    [{ id: "right-2", amount: 1000 }],
    ["right-0"],
  );
  assert.equal(injuryAmount(get(b)), 600);
});
test("separate Venom and Laceration sources add injury once each, capped globally without recursive HP-loss injury", () => {
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_laceration", 2);
  b = changeBuff(b, "right-0", "stic_venom", 2, false, { casterId: b.active });
  startTurnEffects(b, get(b), seq());
  assert.equal(injuryAmount(get(b)), 2000);
  assert.equal(maxHp(get(b)), 8000);
  assert.equal(get(b).currentHp, 8000);
});
test("shared maximum drives HP scaling, poison, Vampiric Touch, target ordering and resistance HP comparisons", () => {
  let b = fixture();
  inflictInjury(get(b), 2000);
  const a = activeUnit(b);
  inflictInjury(a, 1000);
  const d = { rate: 1, pow: 1, selfHpScaling: 0.1, targetHpScaling: 0.1 };
  const expected = Math.floor(
    ((a.stats.atk + 900 + 800) * 1.871) / (1 + get(b).stats.def / 300),
  );
  assert.equal(damage(a, get(b), d, "normal"), expected);
  assert.equal(effectiveStats(a).hp, 9000);
  b = changeBuff(b, "right-0", "stic_dot", 2, false, { casterId: b.active });
  startTurnEffects(b, get(b), seq());
  assert.equal(get(b).currentHp, 7600);
  a.currentHp = 1000;
  afterAttackEffects(b, a, [{ id: "right-0", amount: 0, vampiric: true }], []);
  assert.equal(a.currentHp, 1900);
  b = changeBuff(b, b.active, "stic_provoke_hp", 2);
  assert.notEqual(forcedTarget(b, activeUnit(b)).id, "right-0");
});
test("death, HP-only future revival, undo snapshots and new battles preserve or clear injury at correct boundaries", () => {
  const b = fixture();
  let applied = changeBuff(b, "right-0", "stic_laceration", 2);
  const next = executeAttack(heroes, applied, "S1", "right-0", "normal");
  assert.ok(injuryAmount(get(next)) > 0);
  assert.equal(injuryAmount(get(applied)), 0);
  assert.equal(injuryAmount(get(b)), 0);
  const u = get(next),
    injury = injuryAmount(u);
  sufferDamage(next, u, 999999);
  assert.equal(u.currentHp, 0);
  assert.equal(healUnit(next, u, 10000, "test"), 0);
  const retained = injuryAmount(u);
  assert.ok(retained >= injury);
  assert.equal(reviveHealth(u, 0.5), Math.floor(maxHp(u) * 0.5));
  assert.equal(injuryAmount(u), retained);
  assert.equal(reviveHealth(u, 1), 0);
  const fresh = fixture();
  assert.equal(injuryAmount(get(fresh)), 0);
  assert.equal(maxHp(get(fresh)), 10000);
});
test("automatic Venom and Laceration grants use reviewed fully enhanced chance values", () => {
  let b = fixture("Sharun");
  const next = executeAttack(heroes, b, "S1", "right-0", "normal", seq(0, 0));
  assert.equal(hasBuff(get(next), "stic_venom"), true);
  b = fixture("Ruiza");
  applySkillDebuffs(
    b,
    activeUnit(b),
    get(b),
    "S3",
    heroes.Ruiza.skills.S3,
    "normal",
    seq(0, 0, 0, 0),
  );
  assert.equal(hasBuff(get(b), "stic_laceration"), true);
  const pre = heroes["Genesis Ras"].skills.S2;
  applySkillDebuffs(
    b,
    activeUnit(b),
    get(b),
    "S2",
    pre,
    "normal",
    seq(0, 0),
    "beforeAttack",
  );
  assert.equal(maxHp(get(b)), 5000);
  assert.equal(hasBuff(get(b), "stic_collapse"), true);
});

test('pre-attack Collapse changes HP-scaled damage before damage is calculated and manual mode skips it', () => {
 const changed=structuredClone(heroes), b=fixture();
 changed.Vildred.skills.S1={...changed.Vildred.skills.S1,targets:1,targetHpScaling:.1,debuffRefs:['stic_collapse'],automaticDebuffs:[{id:'stic_collapse',turns:2,chance:100,count:1,timing:'beforeAttack'}]};
 const d=changed.Vildred.skills.S1, previewTarget={...get(b),buffs:[{id:'stic_collapse',turns:2}]};
 const expected=damage(activeUnit(b),previewTarget,d,'normal');
 const next=executeAttack(changed,b,'S1','right-0','normal',seq(0,0));
 assert.equal(maxHp(get(next)),5000);assert.equal(get(next).currentHp,5000-expected);
 const manual=executeAttack(changed,b,'S1','right-0','normal',seq(),{automaticDebuffs:false});
 assert.equal(maxHp(get(manual)),10000);assert.equal(get(manual).currentHp,10000-damage(activeUnit(b),get(b),d,'normal'));
 assert.equal(get(b).currentHp,10000);
});


test("Venom uses modified pre-injury max HP, including Collapse", () => {
  let b = fixture();
  inflictInjury(get(b), 2000);
  b = changeBuff(b, "right-0", "stic_collapse", 2);
  b = changeBuff(b, "right-0", "stic_venom", 2, false, { casterId: b.active });
  get(b).currentHp = 3000;
  startTurnEffects(b, get(b), seq());
  assert.equal(get(b).currentHp, 2500);
  assert.equal(injuryAmount(get(b)), 1500);
  assert.equal(maxHp(get(b)), 3500);
});


test("injury inflicted during Collapse persists as a percentage after cleanse", () => {
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_collapse", 2);
  assert.equal(uninjuredMaxHp(get(b)), 5000);
  assert.equal(inflictInjury(get(b), 1000), 1000);
  assert.equal(injuryFraction(get(b)), 0.2);
  assert.equal(maxHp(get(b)), 4000);
  const restored = changeBuff(b, "right-0", "stic_collapse", 2, true);
  assert.equal(injuryFraction(get(restored)), 0.2);
  assert.equal(injuryAmount(get(restored)), 2000);
  assert.equal(maxHp(get(restored)), 8000);
  assert.equal(get(restored).currentHp, 4000);
  assert.equal(maxHp(get(b)), 4000);
});
test("up-to-15% injury caps use modified max HP and accumulate percentage points", () => {
  let b = fixture();
  inflictInjury(get(b), 2000);
  b = changeBuff(b, "right-0", "stic_collapse", 2);
  const u = get(b);
  assert.equal(inflictInjury(u, 99999, {maxFractionPerHit: 0.15}), 750);
  assert.equal(injuryFraction(u), 0.35);
  assert.equal(maxHp(u), 3250);
  inflictInjury(u, 99999, {maxFractionPerHit: 0.15});
  assert.equal(injuryFraction(u), 0.5);
  assert.equal(maxHp(u), 2500);
  const clean = changeBuff(b, u.id, "stic_collapse", 2, true);
  assert.equal(injuryFraction(get(clean)), 0.5);
  assert.equal(maxHp(get(clean)), 5000);
});
test("a later max-HP increase preserves injury percentage and never heals", () => {
  const b = fixture(), u = get(b);
  inflictInjury(u, 2000);
  const hp = u.currentHp;
  assert.equal(setMaxHpMultiplier(u, 2), true);
  assert.equal(injuryFraction(u), 0.2);
  assert.equal(injuryAmount(u), 4000);
  assert.equal(maxHp(u), 16000);
  assert.equal(u.currentHp, hp);
  inflictInjury(u, 3000, {maxFractionPerHit: 0.15});
  assert.equal(injuryFraction(u), 0.35);
  setMaxHpMultiplier(u, 1);
  assert.equal(maxHp(u), 6500);
  assert.equal(u.currentHp, 6500);
});
test("legacy amount snapshots migrate without changing their injury percentage", () => {
  const u = {stats: {hp: 10000}, injury: 2000, currentHp: 4000,
    buffs: [{id: "stic_collapse", turns: 2}]};
  assert.equal(injuryFraction(u), 0.2);
  assert.equal(maxHp(u), 4000);
  inflictInjury(u, 500);
  assert.ok(Math.abs(injuryFraction(u) - 0.3) < 1e-12);
  assert.equal(u.injury, undefined);
  assert.equal(maxHp(u), 3500);
});


test("an injury limit is a ceiling: smaller hits injure only by actual HP lost", () => {
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_collapse", 2);
  const u = get(b);
  const lost = sufferDamage(b, u, 500);
  assert.equal(inflictInjury(u, lost, {maxFractionPerHit: 0.15}), 500);
  assert.equal(injuryFraction(u), 0.1);
  assert.equal(maxHp(u), 4500);
  const clean = changeBuff(b, u.id, "stic_collapse", 2, true);
  assert.equal(injuryFraction(get(clean)), 0.1);
  assert.equal(maxHp(get(clean)), 9000);
  const overkill = get(clean);
  overkill.currentHp = 100;
  const actual = sufferDamage(clean, overkill, 99999);
  assert.equal(actual, 100);
  assert.equal(inflictInjury(overkill, actual, {maxFractionPerHit: 0.15}), 100);
  assert.equal(injuryAmount(overkill), 1100);
});


test("Venom follows max-HP increases using the same basis as injury limits", () => {
  let b = fixture();
  setMaxHpMultiplier(get(b), 2);
  b = changeBuff(b, "right-0", "stic_venom", 2, false, {casterId:b.active});
  startTurnEffects(b, get(b), seq());
  assert.equal(get(b).currentHp, 8000);
  assert.equal(injuryFraction(get(b)), 0.1);
  assert.equal(injuryAmount(get(b)), 2000);
  assert.equal(maxHp(get(b)), 18000);
});
