import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createCatalog } from "../data/cecilia.js";
import { defaultTeams, makeHero } from "./heroes.js";
import {
  createBattle,
  activeUnit,
  executeAttack,
  damage,
  detonateEffects,
  selectRandomDualAlly,
} from "./battle.js";
import {
  changeBuff,
  hasBuff,
  effectiveStats,
  cleanseDebuffs,
  expireBuffs,
  isEffectSuppressed,
  applySkillDebuffs,
  sufferDamage,
} from "./buffs.js";
import {
  RANDOM_DEBUFF_POOLS,
  resolveDebuffContainer,
  isDebuffContainer,
} from "./debuffContainers.js";
import { periodicDamage } from "./effects.js";
import { reviveUnit } from "./revival.js";
import { inflictInjury, injuryAmount, maxHp } from "./health.js";
import { equippedSkill } from "./progression.js";
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
const get = (b, id = "right-0") => b.units.find((u) => u.id === id),
  zero = () => 0;
test("Block suppresses foreign buffs, preserves them, allows self buffs and restores their effect after self cleanse", () => {
  let b = fixture();
  b = changeBuff(b, "left-0", "stic_att_up2", 3, false, { casterId: "left-1" });
  const atk = activeUnit(b).stats.atk;
  b = changeBuff(b, "left-0", "stic_isolation", 2, false, {
    casterId: "right-0",
  });
  assert.equal(effectiveStats(activeUnit(b)).atk, atk);
  assert.ok(
    isEffectSuppressed(
      activeUnit(b),
      activeUnit(b).buffs.find((e) => e.id === "stic_att_up2"),
    ),
  );
  assert.equal(
    changeBuff(b, "left-0", "stic_def_up", 2, false, { casterId: "left-1" }),
    b,
  );
  b = changeBuff(b, "left-0", "stic_att_up", 2, false, { casterId: "left-0" });
  assert.equal(effectiveStats(activeUnit(b)).atk, atk * 1.5);
  const removed = changeBuff(b, "left-0", "stic_isolation", 2, true, {
    casterId: "left-0",
  });
  assert.equal(effectiveStats(activeUnit(removed)).atk, atk * 1.75);
});
test("Block rejects outside cleanse, permits self cleanse, leaves undispellable statuses and injury", () => {
  let b = fixture();
  b = changeBuff(b, "left-0", "stic_isolation", 2, false, {
    casterId: "right-0",
  });
  b = changeBuff(b, "left-0", "stic_stun", 2);
  b = changeBuff(b, "left-0", "stic_death_0_keep", 2, false, {
    casterId: "right-0",
  });
  inflictInjury(activeUnit(b), 1000);
  assert.equal(cleanseDebuffs(b, activeUnit(b), "left-1"), 0);
  assert.equal(
    changeBuff(b, "left-0", "stic_stun", 2, true, { casterId: "left-1" }),
    b,
  );
  const clean = changeBuff(b, "left-0", "__cleanse_all__", 2, true, {
    casterId: "left-0",
  });
  assert.equal(hasBuff(activeUnit(clean), "stic_isolation"), false);
  assert.equal(hasBuff(activeUnit(clean), "stic_stun"), false);
  assert.equal(hasBuff(activeUnit(clean), "stic_death_0_keep"), true);
  assert.equal(injuryAmount(activeUnit(clean)), 1000);
});
test("native self buffs carry ownership and remain active under Block", () => {
  let b = fixture("Cermia");
  b = changeBuff(b, b.active, "stic_isolation", 2, false, {
    casterId: "right-0",
  });
  const next = executeAttack(heroes, b, "S2");
  assert.equal(hasBuff(activeUnit(next), "stic_att_up2"), true);
  assert.equal(
    activeUnit(next).buffs.find((e) => e.id === "stic_att_up2").casterId,
    b.active,
  );
});
test("every random pool produces one actual status and Class Debuff maps only known classes", () => {
  for (const [id, pool] of Object.entries(RANDOM_DEBUFF_POOLS)) {
    assert.equal(resolveDebuffContainer(id, {}, zero), pool[0]);
    assert.equal(
      resolveDebuffContainer(id, {}, () => 0.99999),
      pool.at(-1),
    );
    assert.equal(isDebuffContainer(pool[0]), false);
  }
  for (const role of ["warrior", "ranger", "mage", "assassin"])
    assert.equal(
      resolveDebuffContainer("stic_class_debuff_1", { role }),
      "stic_att_dn",
    );
  for (const role of ["knight", "manauser"])
    assert.equal(
      resolveDebuffContainer("stic_class_debuff_1", { role }),
      "stic_def_dn",
    );
  assert.equal(
    resolveDebuffContainer("stic_class_debuff_1", { role: "unknown" }),
    null,
  );
});
test("manual container and reviewed skill containers store real effects with source ownership", () => {
  const b = fixture();
  const manual = changeBuff(
    b,
    "right-0",
    "stic_random_debuff1",
    2,
    false,
    { casterId: b.active },
    () => 0.5,
  );
  assert.ok(hasBuff(get(manual), "stic_provoke"));
  assert.equal(
    get(manual).buffs.find((e) => e.id === "stic_provoke").casterId,
    b.active,
  );
  applySkillDebuffs(
    b,
    activeUnit(b),
    get(b),
    "S3",
    heroes["Dragon King Sharun"].skills.S3,
    "normal",
    zero,
  );
  assert.ok(hasBuff(get(b), "stic_att_dn"));
  assert.equal(
    get(b).buffs.some((e) => isDebuffContainer(e.id)),
    false,
  );
});
test("all-buff dispels remove Immunity before post-attack debuffs, preserve undispellable effects and respect resistance/misses", () => {
  let b = fixture("Romann");
  b = changeBuff(b, "right-0", "stic_debuf_impossible", 2);
  b = changeBuff(b, "right-0", "stic_att_up", 2);
  const next = executeAttack(heroes, b, "S3", "right-0", "normal", zero);
  assert.equal(hasBuff(get(next), "stic_debuf_impossible"), false);
  assert.equal(hasBuff(get(next), "stic_att_up"), false);
  assert.ok(hasBuff(get(next), "stic_ab_up_block"));
  assert.ok(hasBuff(get(next, "right-3"), "stic_demonpower_keep"));
  const missed = executeAttack(heroes, b, "S3", "right-0", "miss", zero);
  assert.ok(hasBuff(get(missed), "stic_debuf_impossible"));
  const resisted = executeAttack(
    heroes,
    b,
    "S3",
    "right-0",
    "normal",
    () => 0.99,
  );
  assert.ok(hasBuff(get(resisted), "stic_debuf_impossible"));
  const manual = executeAttack(heroes, b, "S3", "right-0", "normal", zero, {
    automaticDispels: false,
  });
  assert.ok(hasBuff(get(manual), "stic_debuf_impossible"));
});
test("dispel phase ordering changes defense before pre-attack damage, but not post-attack damage", () => {
  const h = structuredClone(heroes);
  h.Vildred.skills.S1 = {
    ...h.Vildred.skills.S1,
    targets: 1,
    automaticDispel: { timing: "beforeAttack" },
  };
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_def_up", 2);
  const actor = activeUnit(b),
    target = get(b),
    d = h.Vildred.skills.S1;
  const cleared = { ...target, buffs: [] };
  const next = executeAttack(h, b, "S1", "right-0", "normal", zero);
  assert.equal(
    get(next).currentHp,
    target.currentHp - damage(actor, cleared, d, "normal"),
  );
  h.Vildred.skills.S1.automaticDispel.timing = "afterAttack";
  const post = executeAttack(h, b, "S1", "right-0", "normal", zero);
  assert.equal(
    get(post).currentHp,
    target.currentHp - damage(actor, target, d, "normal"),
  );
});
test("Sigret penetration counts actual debuff instances and Extinction blocks native and shared revival", () => {
  let b = fixture("Sigret");
  const target = get(b, "right-3");
  target.currentHp = 1;
  assert.equal(heroes.Sigret.skills.S3.damageSupport, "supported");
  assert.equal(heroes.Sigret.skills.S3.inflictsExtinction, true);
  const next = executeAttack(heroes, b, "S3", "right-3", "normal", zero);
  const dead = get(next, "right-3");
  assert.equal(dead.currentHp, 0);
  assert.equal(dead.extinct, true);
  assert.equal(reviveUnit(next, dead, { fraction: 1 }), false);
  assert.equal(get(b, "right-3").extinct, false);
  const t = get(b);
  t.buffs = [
    { id: "stic_dot", turns: 2 },
    { id: "stic_dot", turns: 2 },
    { id: "stic_def_dn", turns: 2 },
  ];
  const d = heroes.Sigret.skills.S3;
  assert.equal(
    damage(activeUnit(b), t, d, "normal"),
    damage(
      activeUnit(b),
      t,
      { ...d, penetration: 0.6, penetrationPerDebuff: 0 },
      "normal",
    ),
  );
});
test("Faithless Lidica EE and Lilias select randomly among eligible allies rather than by ATK", () => {
  const t = defaultTeams(heroes);
  t.left = [
    makeHero(heroes, "Faithless Lidica"),
    makeHero(heroes, "Vildred"),
    makeHero(heroes, "Mercedes"),
    null,
  ];
  t.left[0].stats.spd = 350;
  t.left[1].stats.atk = 5000;
  t.left[2].stats.atk = 1000;
  for (const side of Object.values(t))
    for (const h of side.filter(Boolean)) h.stats.hp = 100000;
  let b = createBattle(t, { left: 0, right: 0 }, heroes);
  const d = equippedSkill(heroes["Faithless Lidica"], activeUnit(b), "S1");
  assert.equal(d.dualAttackSelection, "random");
  assert.equal(
    selectRandomDualAlly(heroes, b, activeUnit(b), () => 0.999).name,
    "Mercedes",
  );
  const next = executeAttack(heroes, b, "S1", "right-0", "normal", () => 0.999);
  assert.ok(next.log.some((e) => e.message.startsWith("Mercedes dual:")));
  b = changeBuff(b, "left-1", "stic_stun", 2);
  assert.equal(
    selectRandomDualAlly(heroes, b, activeUnit(b), zero).name,
    "Mercedes",
  );
  assert.equal(heroes.Lilias.skills.S1.dualAttackSelection, "random");
  assert.equal(heroes.Lilias.skills.S1.triggersDualAttack, true);
});
test("base detonation scales Burn by remaining turns, snapshots ATK and does not advance turns or mutate the old state", () => {
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_blaze", 3, false, { casterId: b.active });
  const effect = get(b).buffs.find((e) => e.id === "stic_blaze");
  activeUnit(b).stats.atk = 1;
  const amount =
    periodicDamage(
      "stic_blaze",
      effect.sourceAttack,
      get(b).stats.hp,
      get(b).stats.def,
    ) * 3;
  const next = detonateEffects(heroes, b, "right-0", "stic_blaze");
  assert.equal(get(next).currentHp, get(b).currentHp - amount);
  assert.equal(next.turn, b.turn);
  assert.equal(next.time, b.time);
  assert.ok(hasBuff(get(b), "stic_blaze"));
  assert.equal(hasBuff(get(next), "stic_blaze"), false);
});
test("Bomb detonation ignores remaining-turn count, stuns once and consumes all selected Bomb stacks", () => {
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_bomb", 3, false, { casterId: b.active });
  b = changeBuff(b, "right-0", "stic_bomb", 1, false, { casterId: b.active });
  const atk = activeUnit(b).stats.atk,
    amount =
      periodicDamage("stic_bomb", atk, get(b).stats.hp, get(b).stats.def) * 2;
  const next = detonateEffects(heroes, b, "right-0", "stic_bomb");
  assert.equal(get(next).currentHp, get(b).currentHp - amount);
  assert.equal(hasBuff(get(next), "stic_bomb"), false);
  assert.equal(get(next).buffs.find((e) => e.id === "stic_stun").turns, 1);
  const hp = get(next).currentHp;
  expireBuffs(next, get(next));
  assert.equal(get(next).currentHp, hp);
  assert.equal(detonateEffects(heroes, b, "right-0", "stic_venom"), b);
});

test("self cleansing Block plus Immobilize preserves the frozen gauge when suppressed Speed returns", () => {
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_speed_up", 3, false, {
    casterId: "left-0",
  });
  b = changeBuff(b, "right-0", "stic_isolation", 2, false, {
    casterId: "left-0",
  });
  b = changeBuff(b, "right-0", "stic_danger_4", 2);
  const before = get(b).frozenCR;
  const clean = changeBuff(b, "right-0", "__cleanse_all__", 2, true, {
    casterId: "right-0",
  });
  const after =
    100 -
    ((get(clean).readyAt - clean.time) * effectiveStats(get(clean)).spd) / 100;
  assert.ok(Math.abs(before - after) < 1e-8);
});


test("Venom detonation uses modified pre-injury HP after the preceding hit and Collapse", () => {
  let b = fixture();
  b = changeBuff(b, "right-0", "stic_laceration", 2);
  b = changeBuff(b, "right-0", "stic_venom", 2, false, { casterId: b.active });
  const target = get(b);
  target.currentHp = 60000;
  sufferDamage(b, target, 10000);
  assert.equal(injuryAmount(target), 10000);
  assert.equal(maxHp(target), 90000);
  b = changeBuff(b, "right-0", "stic_collapse", 2);
  assert.equal(maxHp(get(b)), 45000);
  get(b).currentHp = 40000;
  const next = detonateEffects(heroes, b, "right-0", "stic_venom");
  // 10% of the collapsed 50,000 HP basis × two remaining turns = 10,000.
  assert.equal(get(next).currentHp, 25000);
  assert.equal(injuryAmount(get(next)), 25000);
  assert.equal(hasBuff(get(next), "stic_venom"), false);
  assert.equal(get(b).currentHp, 40000);
  assert.equal(next.time, b.time);
});

test("executed attacks share capped damage once and preserve Undo snapshots", () => {
  const b = fixture("Cermia"), target = get(b), tank = get(b, "right-3");
  activeUnit(b).stats.atk = 100000;
  target.stats.hp = target.baseMaxHp = target.currentHp = 10000;
  Object.assign(target, { damageReduction: 30, damageLimit: 50, damageShare: 20, damageShareSlot: "3" });
  Object.assign(tank, { damageReduction: 99, damageLimit: 1, damageShare: 100, damageShareSlot: "0" });
  const hp = tank.currentHp;
  const next = executeAttack(heroes, b, "S1", target.id, "normal", () => 0.999,
    { automaticDebuffs: false });
  assert.equal(get(next).currentHp, 6000);
  assert.equal(get(next, tank.id).currentHp, hp - 1000);
  assert.equal(target.currentHp, 10000);
  assert.equal(tank.currentHp, hp);
  assert.ok(next.log.some((e) => e.message.includes("shares 1,000 damage")));
});

test("reviewed skill bypasses distinguish sharing from reduction", () => {
  assert.deepEqual(heroes.Pavel.skills.S3.protectionBypass, {
    scope: "nonEliteBoss", ignoreDamageSharing: true, ignoreDamageReduction: false,
  });
  assert.deepEqual(heroes["Midnight Gala Lilias"].skills.S3.protectionBypass, {
    scope: "hero", ignoreDamageSharing: true, ignoreDamageReduction: true,
  });
  assert.equal(heroes.Cermia.skills.S1.protectionBypass, null);
});
test("Frostbite changes executed damage without disabling limits; cleanse restores protection", () => {
  let b = fixture("Cermia");
  activeUnit(b).stats.atk = 100000;
  Object.assign(get(b), { baseMaxHp: 10000, currentHp: 10000, damageReduction: 30,
    damageLimit: 50, damageShare: 20, damageShareSlot: "3" });
  b = changeBuff(b, "right-0", "stic_freezing", 2);
  const hp = get(b, "right-3").currentHp;
  const next = executeAttack(heroes, b, "S1", "right-0", "normal", () => 0.999,
    { automaticDebuffs: false });
  assert.equal(get(next).currentHp, 5000);
  assert.equal(get(next, "right-3").currentHp, hp);
  const clean = changeBuff(b, "right-0", "stic_freezing", 2, true);
  const protectedHit = executeAttack(heroes, clean, "S1", "right-0", "normal", () => 0.999,
    { automaticDebuffs: false });
  assert.equal(get(protectedHit).currentHp, 6000);
  assert.equal(get(protectedHit, "right-3").currentHp, hp - 1000);
});
