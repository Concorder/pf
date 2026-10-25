import { currentCR, freezeCR, unfreezeCR, shiftCR } from "./combatReadiness.js";
import { maxHp, clampHealth, inflictInjury } from "./health.js";
import { rollEffect, periodicDamage } from "./effects.js";
import { clone } from "./heroes.js";
export const hasBuff = (unit, id) =>
  (unit.buffs || []).some(
    (b) => b.id === id && (b.turns === null || b.turns > 0),
  );
export const DEBUFFS = {
  stic_ab_up_block: {
    name: "Restrict",
    description:
      "Prevents non-Speed Combat Readiness increases. Does not prevent CR decreases.",
  },
  stic_danger_4: {
    name: "Immobilize",
    description:
      "Stops Speed-driven CR gains. Expires after four subsequent global turn starts; direct CR pushes still work.",
    globalTurns: 4,
  },
  stic_death_0_keep: {
    name: "Death Sentence",
    description:
      "Undispellable. After twelve subsequent global turn starts, deals 50,000 fixed damage. Removed when the source dies.",
    globalTurns: 12,
    undispellable: true,
    needsCaster: true,
  },
  stic_restrict: {
    name: "Bind",
    description:
      "Outside the bearer’s turn, blocks additional skills, counterattacks and Dual Attacks. Active skills on the bearer’s turn remain available.",
    heroOnly: true,
  },
  stic_nocounterattack: {
    name: "Cannot Counterattack",
    description:
      "Blocks counterattacks, including configured counter chance; does not block Dual Attacks or additional skills.",
    heroOnly: true,
  },
  stic_dizzy: {
    name: "Seal",
    description:
      "Suppresses implemented passive activation, including death passives. Does not suppress equipment effects or active skills.",
    heroOnly: true,
  },
  stic_venom: {
    name: "Venom",
    description:
      "At turn start: 10% current max HP damage and equal injury, up to 50% original max HP. Heroes only.",
    periodic: true,
    stackable: true,
    heroOnly: true,
  },
  stic_laceration: {
    name: "Laceration",
    description:
      "Attack damage received +15%; each actual HP damage event inflicts equal persistent injury. Heroes only.",
    heroOnly: true,
  },
  stic_collapse: {
    name: "Collapse",
    description:
      "Temporary max HP −50% on heroes (−25% otherwise). Applied after injury; capacity restoration does not heal.",
  },
  stic_sleep: {
    name: "Sleep",
    description:
      "Cannot act; Evasion and Critical Hit Resistance −100 percentage points. Any damage wakes the bearer.",
  },
  stic_fear: {
    name: "Fear",
    description: "Cannot act. At bearer turn start, 40% chance to remove Fear.",
  },
  stic_provoke: {
    name: "Provoke",
    description: "Must use S1 against the living enemy who applied Provoke.",
    needsCaster: true,
  },
  stic_provoke_hp: {
    name: "Redirected Provoke",
    description:
      "Must use S1 against the living enemy with the highest max Health.",
  },
  stic_curse2: {
    name: "Curse",
    description:
      "When another ally is attacked, suffers additional damage equal to 60% of that ally’s attack damage. Does not recursively trigger Curse.",
  },
  stic_deceptive: {
    name: "Beguile",
    description:
      "At bearer turn end, damages each other living ally for 10% of that ally’s max Health, then removes itself.",
  },
  stic_discharge_aura: {
    name: "Energy Depletion",
    description: "Attack and Speed −50%. Speed changes preserve CR.",
  },
  stic_mercedes_unstable_aura: {
    name: "Volatility",
    description: "Attack +15%; damage received from attacks +10%.",
  },
  stic_crack_1_aura: {
    name: "Fracture",
    description:
      "Each stack: Attack +20%, Defense −5%. Up to 10 stacks. Stacks survive revival.",
    maxStacks: 10,
    persistOnRevive: true,
  },
  stic_trauma_aura: {
    name: "Trauma",
    description:
      "Defense −70%; Attack and Speed +100%, or +200% if Defense before Trauma is at least 2000.",
  },
  stic_vampire: {
    name: "Vampiric Touch",
    description:
      "When attacked, heals the attacker by 10% of the attacker’s max HP. Unhealable and Stigma affect this healing.",
  },
  stic_stigma: {
    name: "Stigma",
    description: "Healing and Combat Readiness increases received −50%.",
  },
  stic_heal_impossible: {
    name: "Unhealable",
    description: "Prevents healing. Healing skills are not simulated yet.",
  },
  stic_target: {
    name: "Target",
    description: "Damage received +15%; Evasion −50 percentage points",
    stat: "evasion",
    amount: -50,
  },
  stic_blood: {
    name: "Bleed",
    description:
      "Start of turn: 30% source ATK × 1.871; 70% defense penetration. Stacks independently.",
    periodic: true,
    stackable: true,
  },
  stic_blaze: {
    name: "Burn",
    description:
      "Start of turn: 60% source ATK × 1.871; 70% defense penetration. Stacks independently.",
    periodic: true,
    stackable: true,
  },
  stic_dot: {
    name: "Poison",
    description:
      "Start of turn: 5% bearer max HP; ignores Defense. Stacks independently.",
    periodic: true,
    stackable: true,
  },
  stic_bomb: {
    name: "Bomb",
    description:
      "At expiry: 150% source ATK × 1.871; 70% defense penetration, then Stun for 1 turn. Independent fixed timers.",
    bomb: true,
    stackable: true,
  },
  stic_att_dn: {
    name: "Attack Down",
    description: "Attack −50%",
    stat: "atk",
    amount: -0.5,
  },
  stic_def_dn: {
    name: "Defense Down",
    description: "Defense −70%",
    stat: "def",
    amount: -0.7,
  },
  stic_dodge_dn: {
    name: "Speed Down",
    description: "Speed −30%; preserves current CR",
    stat: "spd",
    amount: -0.3,
  },
  stic_blind: {
    name: "Decreased Hit Chance",
    description: "Hit chance −50%; increases automatic miss chance",
    stat: "hitChancePenalty",
    amount: 50,
  },
  stic_stun: {
    name: "Stun",
    description: "Cannot use skills. Pass to consume the stunned turn.",
  },
  stic_silence: {
    name: "Silence",
    description: "Cannot use skills with a cooldown.",
  },
  stic_buf_impossible: {
    name: "Unbuffable",
    description: "Cannot receive buffs; existing buffs remain.",
  },
};
for (const [id, def] of Object.entries(DEBUFFS))
  Object.assign(def, { debuff: true, icon: id });
export const BUFFS = {
  ...DEBUFFS,
  stic_debuf_impossible: {
    name: "Immunity",
    description: "Prevents new debuffs; does not remove existing debuffs.",
  },
  stic_demonpower_keep: {
    name: "Archdemon’s Might",
    description:
      "Undispellable: Evasion +70%; damage against Light +60%. Included in automatic hit rolls.",
    stat: "evasion",
    amount: 70,
    icon: "stic_demonpower_keep",
    permanent: false,
    undispellable: true,
    manual: false,
  },
  stic_att_up: {
    name: "Attack Up",
    description: "Attack +50%",
    stat: "atk",
    amount: 0.5,
    family: "attack",
    icon: "stic_att_up",
  },
  stic_att_up2: {
    name: "Greater Attack Up",
    description: "Attack +75%",
    stat: "atk",
    amount: 0.75,
    family: "attack",
    icon: "stic_att_up2",
  },
  stic_def_up: {
    name: "Defense Up",
    description: "Defense +60%",
    stat: "def",
    amount: 0.6,
    icon: "stic_def_up",
  },
  stic_speed_up: {
    name: "Speed Up",
    description: "Speed +30%; preserves current CR",
    stat: "spd",
    amount: 0.3,
    icon: "stic_speed_up",
  },
  stic_cri_up: {
    name: "Critical Chance Up",
    description: "Critical chance +50 percentage points",
    stat: "chc",
    amount: 50,
    icon: "stic_cri_up",
  },
  stic_cridmg_up: {
    name: "Critical Damage Up",
    description: "Critical damage +70 percentage points",
    stat: "chd",
    amount: 70,
    icon: "stic_cridmg_up",
  },
};
export function effectiveStats(unit) {
  const s = {
    ...unit.stats,
    hp: maxHp(unit),
    evasion: unit.stats.evasion || 0,
    hitChancePenalty: 0,
    critResistance: unit.stats.critResistance || 0,
  };
  const modifiers = {};
  for (const [id, def] of Object.entries(BUFFS)) {
    if (!hasBuff(unit, id)) continue;
    if (
      def.family &&
      (unit.buffs || []).some(
        (b) =>
          b.turns > 0 &&
          BUFFS[b.id]?.family === def.family &&
          BUFFS[b.id].amount > def.amount,
      )
    )
      continue;
    if (!def.stat) continue;
    if (["chc", "chd", "evasion", "hitChancePenalty"].includes(def.stat))
      s[def.stat] += def.amount;
    else modifiers[def.stat] = (modifiers[def.stat] || 0) + def.amount;
  }
  if (hasBuff(unit, "stic_discharge_aura")) {
    modifiers.atk = (modifiers.atk || 0) - 0.5;
    modifiers.spd = (modifiers.spd || 0) - 0.5;
  }
  if (hasBuff(unit, "stic_mercedes_unstable_aura"))
    modifiers.atk = (modifiers.atk || 0) + 0.15;
  const fracture = (unit.buffs || []).find(
    (b) => b.id === "stic_crack_1_aura" && b.turns > 0,
  );
  if (fracture) {
    modifiers.atk = (modifiers.atk || 0) + 0.2 * (fracture.stacks || 1);
    modifiers.def = (modifiers.def || 0) - 0.05 * (fracture.stacks || 1);
  }
  if (hasBuff(unit, "stic_trauma_aura")) {
    const boost = unit.stats.def * (1 + (modifiers.def || 0)) >= 2000 ? 2 : 1;
    modifiers.atk = (modifiers.atk || 0) + boost;
    modifiers.spd = (modifiers.spd || 0) + boost;
    modifiers.def = (modifiers.def || 0) - 0.7;
  }
  if (hasBuff(unit, "stic_sleep")) {
    s.evasion -= 100;
    s.critResistance -= 100;
  }
  for (const [stat, amount] of Object.entries(modifiers))
    s[stat] *= Math.max(0.01, 1 + amount);
  s.evasion = Math.max(0, Math.min(100, s.evasion));
  s.chc = Math.min(100, s.chc);
  s.chd = Math.min(350, s.chd);
  return s;
}
function preserveReadiness(battle, unit, oldSpeed) {
  const speed = effectiveStats(unit).spd;
  if (unit.frozenCR !== undefined) {
    unit.readyAt = unit.frozenCR >= 100 ? battle.time : Infinity;
    return;
  }
  if (Number.isFinite(unit.readyAt) && speed !== oldSpeed)
    unit.readyAt =
      battle.time +
      (Math.max(0, unit.readyAt - battle.time) * oldSpeed) / speed;
}
export function grantBuff(
  battle,
  unit,
  id,
  turns,
  source = "manual",
  metadata = {},
) {
  const def = BUFFS[id];
  if (!def || unit.currentHp <= 0 || (def.heroOnly && unit.isHero === false))
    return false;
  if (!def.debuff && !def.undispellable && hasBuff(unit, "stic_buf_impossible"))
    return false;
  const oldSpeed = effectiveStats(unit).spd;
  unit.buffs ||= [];
  if (def.family) {
    if (
      unit.buffs.some(
        (b) =>
          BUFFS[b.id]?.family === def.family && BUFFS[b.id].amount > def.amount,
      )
    )
      return false;
    unit.buffs = unit.buffs.filter(
      (b) => b.id === id || BUFFS[b.id]?.family !== def.family,
    );
  }
  if (
    def.debuff &&
    hasBuff(unit, "stic_debuf_impossible") &&
    !metadata.ignoreImmunity
  )
    return false;
  const existing = !def.stackable && unit.buffs.find((b) => b.id === id);
  if (existing && def.globalTurns) return false;
  if (existing) {
    if (def.maxStacks)
      existing.stacks = Math.min(def.maxStacks, (existing.stacks || 1) + 1);
    existing.turns = def.permanent ? null : Math.max(existing.turns, turns);
    existing.source = source;
    existing.revision = (existing.revision || 0) + 1;
    Object.assign(existing, metadata);
  } else {
    battle.effectSerial = (battle.effectSerial || 0) + 1;
    unit.buffs.push({
      id,
      turns: def.permanent || def.globalTurns ? null : turns,
      ...(def.globalTurns
        ? { expiresAtGlobal: battle.turn + def.globalTurns }
        : {}),
      source,
      ...metadata,
      instance: battle.effectSerial,
      ...(def.maxStacks ? { stacks: 1 } : {}),
    });
  }
  if (id === "stic_danger_4") freezeCR(battle, unit, oldSpeed);
  clampHealth(unit);
  preserveReadiness(battle, unit, oldSpeed);
  return true;
}
export const buffTickKey = (effect) =>
  `${effect.instance ?? effect.id}:${effect.revision || 0}`;
export function expireBuffs(battle, unit, eligible = null) {
  const speed = effectiveStats(unit).spd,
    expired = [],
    bombs = [];
  unit.buffs = (unit.buffs || []).filter((b) => {
    if (b.turns === null || (eligible && !eligible.has(buffTickKey(b))))
      return true;
    b.turns--;
    if (b.turns <= 0) {
      expired.push(BUFFS[b.id]?.name || b.id);
      if (BUFFS[b.id]?.bomb) bombs.push(b);
      return false;
    }
    return true;
  });
  for (const bomb of bombs) {
    dealPeriodic(battle, unit, bomb);
    if (unit.currentHp > 0)
      grantBuff(battle, unit, "stic_stun", 1, "Bomb detonation");
  }
  clampHealth(unit);
  preserveReadiness(battle, unit, speed);
  return expired;
}
export function changeBuff(
  previous,
  targetId,
  id,
  turns = 2,
  remove = false,
  options = {},
  random = Math.random,
) {
  if (
    !previous ||
    previous.winner ||
    !BUFFS[id] ||
    BUFFS[id].manual === false ||
    !Number.isInteger(turns) ||
    turns < 1 ||
    turns > 10
  )
    return previous;
  const battle = clone(previous),
    unit = battle.units.find((u) => u.id === targetId && u.currentHp > 0);
  if (!unit || (BUFFS[id].heroOnly && unit.isHero === false)) return previous;
  const speed = effectiveStats(unit).spd;
  if (remove) {
    if (BUFFS[id].undispellable || !(unit.buffs || []).some((b) => b.id === id))
      return previous;
    unit.buffs = unit.buffs.filter((b) => b.id !== id);
    if (id === "stic_danger_4")
      unfreezeCR(battle, unit, effectiveStats(unit).spd);
    clampHealth(unit);
    preserveReadiness(battle, unit, speed);
  } else {
    const caster = battle.units.find(
      (u) => u.id === options.casterId && u.currentHp > 0,
    );
    const def = BUFFS[id];
    if (def.needsCaster && caster?.side === unit.side) return previous;
    if (
      (def.needsCaster ||
        def.periodic ||
        def.bomb ||
        (def.debuff && options.roll)) &&
      !caster
    )
      return previous;
    if (def.debuff && options.roll) {
      if (
        !Number.isFinite(options.procChance) ||
        options.procChance < 0 ||
        options.procChance > 100
      )
        return previous;
      const result = rollEffect(
        {
          procChance: options.procChance,
          effectiveness: effectiveStats(caster).eff || 0,
          resistance: effectiveStats(unit).efr || 0,
          ignoreResistance: !!options.ignoreResistance,
          immunity: hasBuff(unit, "stic_debuf_impossible"),
        },
        random,
      );
      if (!result.landed) {
        battle.log.unshift({
          message: `${unit.name}: ${def.name} ${result.reason}.`,
          details: `${caster.name} · ${options.procChance}% proc · EFF / ER check`,
          turn: battle.turn,
        });
        return battle;
      }
    }
    if (
      !grantBuff(
        battle,
        unit,
        id,
        turns,
        caster?.name || "manual",
        caster
          ? { casterId: caster.id, sourceAttack: effectiveStats(caster).atk }
          : {},
      )
    )
      return previous;
  }
  battle.log.unshift({
    message: `${unit.name}: ${BUFFS[id].name} ${
      remove
        ? "removed"
        : `applied / refreshed (${effectRemaining(
            battle,
            unit.buffs.find((b) => b.id === id),
          )} ${BUFFS[id].globalTurns ? "global turns" : "turns"})`
    }.`,
    details: "Manual effect change · no turn advanced",
    turn: battle.turn,
  });
  return battle;
}
function dealPeriodic(battle, unit, effect) {
  if (unit.currentHp <= 0) return;
  const amount = periodicDamage(
    effect.id,
    effect.sourceAttack || 0,
    maxHp(unit),
    effectiveStats(unit).def,
  );
  sufferDamage(battle, unit, amount, { venom: effect.id === "stic_venom" });
  battle.log.unshift({
    message: `${unit.name}: ${BUFFS[effect.id].name} deals ${amount.toLocaleString()} damage${unit.currentHp === 0 ? " · defeated" : ""}.`,
    details: `${effect.source} · source ATK ${effect.sourceAttack || 0}`,
    turn: battle.turn,
  });
}
export function tickPeriodic(battle, unit) {
  for (const effect of unit.buffs || [])
    if (BUFFS[effect.id]?.periodic) dealPeriodic(battle, unit, effect);
}
export function applySkillDebuffs(
  battle,
  actor,
  target,
  skill,
  data,
  hit,
  random,
  stage = "afterAttack",
) {
  for (const effect of data.automaticDebuffs || []) {
    if ((effect.timing || "afterAttack") !== stage) continue;
    if (
      !data.debuffRefs?.includes(effect.id) ||
      (BUFFS[effect.id]?.heroOnly && target.isHero === false)
    )
      continue;
    if (effect.requiresCrit && hit !== "crit") continue;
    for (let stack = 0; stack < (effect.count || 1); stack++) {
      const ignoreResistance =
        (!!effect.ignoreResistanceAgainst &&
          target.attribute === effect.ignoreResistanceAgainst) ||
        (effect.ignoreResistanceIfLowerHP && maxHp(target) < maxHp(actor));
      const result = rollEffect(
        {
          procChance: effect.chance,
          effectiveness: effectiveStats(actor).eff || 0,
          resistance: effectiveStats(target).efr || 0,
          hit,
          allowMiss: !!effect.ignoreMiss || stage === "beforeAttack",
          ignoreResistance,
          immunity: hasBuff(target, "stic_debuf_impossible"),
        },
        random,
      );
      if (result.landed)
        grantBuff(
          battle,
          target,
          effect.id,
          effect.turns,
          `${actor.name} ${skill}`,
          { casterId: actor.id, sourceAttack: effectiveStats(actor).atk },
        );
      battle.log.unshift({
        message: `${target.name}: ${BUFFS[effect.id]?.name || effect.id} ${result.reason}.`,
        details: `${actor.name} ${skill} · ${effect.chance}% MAX proc · ${ignoreResistance ? "ignores resistance" : "EFF / ER check"}${effect.count > 1 ? ` · stack ${stack + 1}/${effect.count}` : ""}`,
        turn: battle.turn,
      });
    }
  }
}
// Explicitly reviewed skill grants; free-text descriptions are never executed.
export const SKILL_BUFFS = {
  c1001: { S3: [{ id: "stic_def_up", turns: 2, target: "allies" }] },
  c1005: { S3: [{ id: "stic_att_up", turns: 2, target: "allies" }] },
};
export function applySkillBuffs(battle, actor, code, skill, data) {
  const grants = SKILL_BUFFS[code]?.[skill] || [];
  for (const effect of grants.filter(
    (e) =>
      data?.buffRefs?.includes(e.id) &&
      /all allies/i.test(data.description) &&
      new RegExp(`for ${e.turns} turns?`, "i").test(data.description),
  ))
    for (const unit of battle.units.filter(
      (u) => u.side === actor.side && u.currentHp > 0,
    )) {
      if (
        grantBuff(
          battle,
          unit,
          effect.id,
          effect.turns,
          `${actor.name} ${skill}`,
        )
      )
        battle.log.unshift({
          message: `${unit.name} gains ${BUFFS[effect.id].name} (${effect.turns} turns).`,
          details: `${actor.name} ${skill}`,
          turn: battle.turn,
        });
    }
}

export function sufferDamage(battle, unit, amount, options = {}) {
  const before = unit.currentHp;
  unit.currentHp = Math.max(0, before - Math.max(0, Math.floor(amount)));
  if (before > unit.currentHp && hasBuff(unit, "stic_sleep")) {
    unit.buffs = unit.buffs.filter((b) => b.id !== "stic_sleep");
    battle.log.unshift({
      message: `${unit.name} wakes from Sleep.`,
      details: "Damage received",
      turn: battle.turn,
    });
  }
  const lost = before - unit.currentHp;
  if (before > 0 && unit.currentHp === 0) {
    unit.deaths = (unit.deaths || 0) + 1;
    (battle.deathEvents ||= []).push({
      unitId: unit.id,
      serial: unit.deaths,
      sealed: hasBuff(unit, "stic_dizzy"),
    });
  }
  // Distinct injury sources add, each based on actual HP lost, with a shared 50% cap.
  const sources =
    (options.venom ? 1 : 0) +
    (unit.isHero !== false && hasBuff(unit, "stic_laceration") ? 1 : 0);
  if (sources && lost > 0) {
    const injury = inflictInjury(unit, lost * sources);
    if (injury > 0)
      battle.log.unshift({
        message: `${unit.name} suffers ${injury.toLocaleString()} injury.`,
        details: `Persistent max HP loss · ${sources > 1 ? "Venom + Laceration" : options.venom ? "Venom" : "Laceration"}`,
        turn: battle.turn,
      });
  }
  return lost;
}
export function healUnit(battle, unit, amount, source) {
  if (unit.currentHp <= 0 || hasBuff(unit, "stic_heal_impossible")) return 0;
  const actual = Math.min(
    maxHp(unit) - unit.currentHp,
    Math.floor(amount * (hasBuff(unit, "stic_stigma") ? 0.5 : 1)),
  );
  unit.currentHp += Math.max(0, actual);
  if (actual > 0)
    battle.log.unshift({
      message: `${unit.name} recovers ${actual.toLocaleString()} HP.`,
      details: source,
      turn: battle.turn,
    });
  return Math.max(0, actual);
}
export function receivedDamageMultiplier(unit) {
  return (
    1 +
    (hasBuff(unit, "stic_target") ? 0.15 : 0) +
    (hasBuff(unit, "stic_mercedes_unstable_aura") ? 0.1 : 0) +
    (unit.isHero !== false && hasBuff(unit, "stic_laceration") ? 0.15 : 0)
  );
}
export function startTurnEffects(battle, unit, random) {
  if (hasBuff(unit, "stic_fear") && random() < 0.4) {
    unit.buffs = unit.buffs.filter((b) => b.id !== "stic_fear");
    battle.log.unshift({
      message: `${unit.name} shakes off Fear.`,
      details: "40% start-of-turn chance",
      turn: battle.turn,
    });
  }
  tickPeriodic(battle, unit);
}
export function endTurnEffects(battle, unit) {
  if (unit.currentHp <= 0 || !hasBuff(unit, "stic_deceptive")) return;
  unit.buffs = unit.buffs.filter((b) => b.id !== "stic_deceptive");
  for (const ally of battle.units.filter(
    (u) => u.side === unit.side && u.id !== unit.id && u.currentHp > 0,
  )) {
    const amount = Math.floor(maxHp(ally) * 0.1);
    sufferDamage(battle, ally, amount);
    battle.log.unshift({
      message: `${ally.name}: Beguile deals ${amount.toLocaleString()} damage.`,
      details: `${unit.name} end of turn`,
      turn: battle.turn,
    });
  }
}
export function afterAttackEffects(battle, attacker, hits, cursedIds) {
  for (const hit of hits) {
    const target = battle.units.find((u) => u.id === hit.id);
    if (hit.vampiric)
      healUnit(battle, attacker, maxHp(attacker) * 0.1, "Vampiric Touch");
    for (const bearer of battle.units.filter(
      (u) =>
        cursedIds.includes(u.id) &&
        u.id !== target.id &&
        u.side === target.side &&
        u.currentHp > 0,
    )) {
      const amount = Math.floor(hit.amount * 0.6);
      sufferDamage(battle, bearer, amount);
      battle.log.unshift({
        message: `${bearer.name}: Curse deals ${amount.toLocaleString()} damage.`,
        details: `${target.name} was attacked`,
        turn: battle.turn,
      });
    }
  }
}

export function effectRemaining(battle, effect) {
  return effect.expiresAtGlobal !== undefined
    ? Math.max(0, effect.expiresAtGlobal - battle.turn)
    : effect.turns;
}
export function applyCRChange(
  battle,
  unit,
  amount,
  source = "Manual resolved CR change",
) {
  const result = shiftCR(battle, unit, amount, effectiveStats(unit).spd);
  battle.log.unshift({
    message: `${unit.name}: CR ${result.amount >= 0 ? "+" : ""}${Number(result.amount.toFixed(2))}%${result.reason ? ` (${result.reason})` : ""}.`,
    details: source,
    turn: battle.turn,
  });
  return result;
}
export function clearSourceDeathEffects(battle, casterId) {
  for (const unit of battle.units) {
    const removed = (unit.buffs || []).some(
      (b) => b.id === "stic_death_0_keep" && b.casterId === casterId,
    );
    if (removed) {
      unit.buffs = unit.buffs.filter(
        (b) => !(b.id === "stic_death_0_keep" && b.casterId === casterId),
      );
      battle.log.unshift({
        message: `${unit.name}: Death Sentence removed because its source died.`,
        details: "Source-death cleanup",
        turn: battle.turn,
      });
    }
  }
}
export function globalTurnEffects(battle) {
  const due = [];
  for (const unit of battle.units) {
    unit.buffs = (unit.buffs || []).filter((effect) => {
      if (effect.expiresAtGlobal === undefined) return true;
      if (
        effect.id === "stic_death_0_keep" &&
        !battle.units.some((u) => u.id === effect.casterId && u.currentHp > 0)
      )
        return false;
      if (effect.expiresAtGlobal > battle.turn) return true;
      due.push({ unit, effect });
      return false;
    });
    if (unit.frozenCR !== undefined && !hasBuff(unit, "stic_danger_4"))
      unfreezeCR(battle, unit, effectiveStats(unit).spd);
  }
  // Capture all due statuses before damage, so simultaneous deadlines share one start-of-turn snapshot.
  for (const { unit, effect } of due) {
    if (effect.id === "stic_death_0_keep" && unit.currentHp > 0) {
      sufferDamage(battle, unit, 50000, {fixed:true,ignoreSharing:true});
      battle.log.unshift({
        message: `${unit.name}: Death Sentence deals 50,000 fixed damage.`,
        details: "12 global turn starts · ignores sharing",
        turn: battle.turn,
      });
    } else if (effect.id === "stic_danger_4")
      battle.log.unshift({
        message: `${unit.name}: Immobilize expired.`,
        details: "4 global turn starts",
        turn: battle.turn,
      });
  }
}
