import {applySkillEffects} from "./skillEffects.js";
import {dispatchWatchers,tickWatcherCooldowns} from "./watchers.js";
import {WATCHER_HANDLERS} from "./watcherHandlers.js";
import {validNonAttackTarget,applyNonAttackSkill} from "./nonAttack.js";
import { grantUnitResource, resourceValue, canPaySkillResource, spendSkillResource, applySkillResourceGain } from "./resources.js";
import { recordSkillUse } from "./skillEvents.js";
import { alliesOf, allyInPosition } from "./targeting.js";
import { planProtectedDamage } from "./damageProtection.js";
import { rollEffect } from "./effects.js";
import { currentCR, setCR } from "./combatReadiness.js";
import { activationBlockReason, dispatchTrigger } from "./triggers.js";
import { reviveUnit } from "./revival.js";
import { maxHp, inflictInjury } from "./health.js";
import { rollHit } from "./hits.js";
import { equippedSkill, equippedEE } from "./progression.js";
import { isCermiaSelfSkill } from "./mechanics.js";
import {
  globalTurnEffects,
  clearSourceDeathEffects,
  applyCRChange,
  startTurnEffects,
  endTurnEffects,
  afterAttackEffects,
  receivedDamageMultiplier,
  sufferDamage,
  applySkillDebuffs,
  effectiveStats,
  expireBuffs,
  buffTickKey,
  applySkillBuffs,
  grantBuff,
  dispelBuffs,
  decreaseBuffDurations,
  detonateUnitEffects,
  hasBuff,
  healUnit,
  BUFFS,
} from "./buffs.js";
import { SIDES, SKILLS, clone, roster, teamName } from "./heroes.js";
function flushSkillWatchers(battle,budget) {
  for (const event of battle.skillUseEvents || []) {
    if (event.id <= (battle.lastWatchedSkillUseSerial || 0)) continue;
    battle.lastWatchedSkillUseSerial=event.id;
    dispatchWatchers(battle,event,WATCHER_HANDLERS,budget);
  }
  if ((battle.skillUseSerial || 0) > (battle.lastWatchedSkillUseSerial || 0)) {
    if (budget.remaining>0) flushSkillWatchers(battle,budget);
    else battle.lastWatchedSkillUseSerial=battle.skillUseSerial;
  }
}
export const activeUnit = (battle) =>
  battle?.units.find((u) => u.id === battle.active);
export const skillData = (heroes, u, s, kind = "active") => {
  let data=equippedSkill(heroes[u.name],u,s);
  if(data?.additionalRate && kind==="additional")data={...data,rate:data.additionalRate};
  if(data?.consumesAllFocus) data={...data,focusAtCast:resourceValue(u),damageMultiplier:1+resourceValue(u)*data.focusMultiplier};
  const activePassives=!hasBuff(u,"stic_dizzy") ? u.reviewedPassives || [] : [];
  if (data && activePassives.some(p=>p.staticPassive?.cannotCrit)) return {...data,hitTypes:data.hitTypes.filter(h=>h!=="crit")};
  if (!data?.celineS1) return data;
  const nimble=kind!=="dual" && (u.buffs || []).some(b=>BUFFS[b.id]?.effectType==="buff" && (b.turns===null || b.turns>0));
  return {...data,name:nimble?"Nimble Sword":data.name,celineNimble:nimble,
    penetration:nimble?0.5:0,canTriggerDualAttack:!nimble};
};
function eligibleDualAllies(heroes, battle, caller) {
  if (!caller || caller.currentHp <= 0) return [];
  // A Dual Attack partner is a separate unit; this is an action rule, not the definition of “ally”.
  return alliesOf(battle, caller, { excludeCaster: true }).filter(
    (ally) =>
      !activationBlockReason(battle, ally, "dual") &&
      skillData(heroes, ally, "S1")?.damageSupport === "supported" &&
      !skillData(heroes, ally, "S1")?.passive &&
      canPaySkillResource(ally, skillData(heroes, ally, "S1")),
  );
}
export function selectHighestAttackDualAlly(heroes, battle, caller) {
  return (
    eligibleDualAllies(heroes, battle, caller).sort(
      (a, b) =>
        effectiveStats(b).atk - effectiveStats(a).atk ||
        a.id.localeCompare(b.id),
    )[0] || null
  );
}
export function selectRandomDualAlly(
  heroes,
  battle,
  caller,
  random = Math.random,
) {
  const allies = eligibleDualAllies(heroes, battle, caller);
  return allies.length
    ? allies[Math.min(allies.length - 1, Math.floor(random() * allies.length))]
    : null;
}
// Final configured build chance includes gear/artifact/buff contributions once.
// Old saved builds inherit the user-confirmed post-patch 3% base.
export function dualAttackChance(unit) {
  const value = Number(unit?.dualAttackChance ?? 3);
  return Math.min(20, Math.max(3, Number.isFinite(value) ? value : 3));
}
export function selectNaturalDualAlly(heroes, battle, caller, random = Math.random) {
  // Each eligible assisting hero rolls once against its own final chance.
  // Only successful allies enter the uniform tie-break; the caller never rolls.
  const successful = eligibleDualAllies(heroes, battle, caller)
    .filter(ally => random() * 100 <= dualAttackChance(ally));
  if (!successful.length) return null;
  if (successful.length === 1) return successful[0];
  return successful[Math.min(successful.length - 1, Math.floor(random() * successful.length))];
}
function naturalDualRequest(heroes, battle, caller, skill, data, targetId, random, options) {
  if (options.automaticReactions === false || options.automaticDualAttacks === false ||
      skill !== "S1" || data.triggersDualAttack || data.canTriggerDualAttack === false) return null;
  const ally = selectNaturalDualAlly(heroes, battle, caller, random);
  return ally ? {kind: "dual", actorId: ally.id, callerId: caller.id, targetId,
    skill: "S1", source: "naturalDualChance", label: `${caller.name} S1 · natural Dual Attack (${ally.name}: ${dualAttackChance(ally)}%)`} : null;
}
export function forcedTarget(battle, unit) {
  if (!battle || !unit) return null;
  const enemies = battle.units.filter(
    (t) => t.side !== unit.side && t.currentHp > 0,
  );
  if (hasBuff(unit, "stic_provoke_hp"))
    return (
      enemies.sort(
        (a, b) => maxHp(b) - maxHp(a) || a.id.localeCompare(b.id),
      )[0] || null
    );
  const effect = (unit.buffs || []).find(
    (b) => b.id === "stic_provoke" && b.turns > 0,
  );
  return effect ? enemies.find((t) => t.id === effect.casterId) || null : null;
}
export function isValidSkillTarget(heroes,battle,caster,skill,target) {
  if (!caster || !target || !battle || target.currentHp <= 0) return false;
  const data = skillData(heroes,caster,skill);
  if (data?.nonAttack) return validNonAttackTarget(battle,caster,data.nonAttack,target.id);
  const forced = forcedTarget(battle,caster);
  return target.side !== caster.side && (!forced || target.id === forced.id);
}
export function canUse(heroes, battle, u, s) {
  if (!u || !battle || battle.winner) return false;
  if (s === "wait")
    return !forcedTarget(battle, u) || !canUse(heroes, battle, u, "S1");
  const d = skillData(heroes, u, s);
  if (["stic_stun", "stic_sleep", "stic_fear"].some((id) => hasBuff(u, id)))
    return false;
  if (forcedTarget(battle, u) && s !== "S1") return false;
  if (
    hasBuff(u, "stic_silence") &&
    (d?.defaults?.cd > 0 || u.skills[s]?.cd > 0)
  )
    return false;
  return (
    !!d &&
    !d.passive &&
    (isCermiaSelfSkill(heroes, u, s) || d.nonAttack ||
      ((!d.damageSupport || d.damageSupport === "supported") &&
        Number.isFinite(d.rate) &&
        d.rate >= 0 &&
        (d.rate > 0 || [d.selfHpScaling, d.selfDefScaling, d.targetHpScaling].some(value => value > 0)) &&
        Number.isFinite(d.pow) &&
        d.pow > 0)) &&
    canPaySkillResource(u, d) &&
    !u.cooldowns[s] &&
    battle.souls[u.side] >= u.skills[s].cost
  );
}
export function readiness(unit, battle, units) {
  if (unit.currentHp <= 0) return 0;
  if (!battle)
    return (unit.stats.spd / Math.max(...units.map((u) => u.stats.spd))) * 100;
  return currentCR(unit, battle, effectiveStats(unit).spd);
}
function log(battle, message, details = "") {
  battle.log.unshift({ message, details, turn: battle.turn });
}
function nextTurn(battle, forcedId = null, random = Math.random, heroes = {}) {
  const live = battle.units.filter((u) => u.currentHp > 0),
    lost = SIDES.find((s) => !live.some((u) => u.side === s));
  if (lost) {
    battle.winner = lost === "left" ? "right" : "left";
    battle.active = null;
    battle.stalled = false;
    log(
      battle,
      `${teamName(battle.winner)} wins.`,
      "Reset to try a different matchup.",
    );
    return;
  }
  const eligible = () =>
    battle.units.filter((u) => u.currentHp > 0 && Number.isFinite(u.readyAt));
  const ordered = () =>
    eligible().sort(
      (a, b) =>
        a.readyAt - b.readyAt ||
        effectiveStats(b).spd - effectiveStats(a).spd ||
        a.id.localeCompare(b.id),
    );
  const first = eligible().find((u) => u.id === forcedId) || ordered()[0];
  if (!first) {
    battle.active = null;
    battle.stalled = true;
    log(
      battle,
      "Readiness stalled: all living heroes are immobilized below 100% CR.",
      "Apply a CR push or cleanse Immobilize through Buffs & debuffs.",
    );
    return;
  }
  battle.stalled = false;
  battle.time = Math.max(battle.time, first.readyAt);
  battle.turn++;
  globalTurnEffects(battle);
  resolveDeaths(heroes, battle);
  const lostAfterGlobals = SIDES.find(
    (side) => !battle.units.some((u) => u.side === side && u.currentHp > 0),
  );
  if (lostAfterGlobals) {
    battle.winner = lostAfterGlobals === "left" ? "right" : "left";
    battle.active = null;
    log(battle, `${teamName(battle.winner)} wins.`);
    return;
  }
  const next = eligible().find((u) => u.id === forcedId) || ordered()[0];
  if (!next) {
    battle.active = null;
    battle.stalled = true;
    return;
  }
  battle.active = next.id;
  battle.time = Math.max(battle.time, next.readyAt);
  for (const s of SKILLS)
    next.cooldowns[s] = Math.max(0, next.cooldowns[s] - 1);
  tickWatcherCooldowns(next);
  for(const data of Object.values(heroes[next.name]?.skills||{}))if(data.passive&&data.earthReview?.turnStartEffects)
    dispatchTrigger(battle,next,{kind:"passive",run:()=>applySkillEffects(heroes,battle,next,data,data.earthReview.turnStartEffects,next.id,{random})});
  startTurnEffects(battle, next, random);
  for (const rule of next.resourcePassives || []) if (rule.turnStart?.type === next.resourceType)
    dispatchTrigger(battle, next, {kind: "passive", run: () => grantUnitResource(battle, next, rule.turnStart.amount)});
  resolveDeaths(heroes, battle, { turnAlreadyStarted: true });
  if (next.currentHp <= 0) nextTurn(battle, null, random, heroes);
}
export const clampSouls = (value) =>
  Math.min(99, Math.max(0, Math.floor(Number(value) || 0)));
export function createBattle(teams, souls, heroes = {}) {
  const units = clone(roster(teams));
  for (const u of units) {
    u.reviewedPassives=clone(Object.values(heroes[u.name]?.skills||{}).filter(s=>s.passive&&s.earthReview).map(s=>s.earthReview));
    u.watchers = clone(Object.values(heroes[u.name]?.skills || {}).flatMap(s => s.watchers || []));
    u.watcherCooldowns = {};
    u.resourcePassives = Object.values(heroes[u.name]?.skills || {}).filter(s => s.passive && s.resourcePassive).map(s => s.resourcePassive);
    u.resourceType = heroes[u.name]?.resourceType || u.resourceType || "";
    u.resourceValue = resourceValue(u);
    u.resourceGainMultiplier ??= 1;
    u.baseMaxHp = u.stats.hp;
    delete u.injury;
    u.injuryFraction = 0;
    u.maxHpMultiplier = 1;
    u.deaths = 0;
    u.extinct = false;
    u.isHero ??= true;
    delete u.frozenCR;
    u.readyAt = 10000 / u.stats.spd;
    u.cooldowns = Object.fromEntries(SKILLS.map(s => [s, heroes[u.name]?.skills?.[s]?.startsOnCooldown ? u.skills[s].cd : 0]));
    u.buffs = [];
    u.code = heroes[u.name]?.code || u.code;
    u.attribute = heroes[u.name]?.attribute || u.attribute;
    u.role = heroes[u.name]?.role || u.role;
    u.hecateRestrictions = !!heroes[u.name]?.skills?.S2?.hecateRestrictions;
    u.violetReadyPassive=!!heroes[u.name]?.skills?.S3?.consumesAllFocus;
    u.passiveDamageLimit = heroes[u.name]?.skills?.S2?.passiveDamageLimit || 0;
  }
  const battle = {
    units,
    deathEvents: [],
    turn: 0,
    time: 0,
    active: null,
    log: [],
    winner: null,
    souls: {},
    initialSouls: Object.fromEntries(
      SIDES.map((side) => [side, clampSouls(souls[side])]),
    ),
  };
  for (const unit of units) if (!unit.resourceOpeningOverride)
    for (const rule of unit.resourcePassives)
      if (rule.opening?.type === unit.resourceType)
        dispatchTrigger(battle, unit, {kind: "passive", run: () => grantUnitResource(battle, unit, rule.opening.amount)});
  for (const side of SIDES)
    battle.souls[side] = clampSouls(
      battle.initialSouls[side] +
        units
          .filter((u) => u.side === side)
          .reduce((sum, u) => sum + u.artifactSouls, 0),
    );
  log(
    battle,
    "The battle begins.",
    "Starting souls include each hero’s configured artifact contribution. Only explicitly implemented passives and skill effects are automated.",
  );
  for (const u of units)
    if (u.code === "c2007" && equippedEE(heroes[u.name], u)?.option.opening) {
      grantBuff(
        battle,
        u,
        "stic_demonpower_keep",
        2,
        "Archdemon’s Eye EE · battle start",
        { casterId: u.id },
      );
      log(
        battle,
        `${u.name} gains Archdemon’s Might at battle start.`,
        "Exclusive Equipment · 2 turns / undispellable",
      );
    }
  for (const u of units) {
    if (!heroes[u.name]?.skills?.S2?.openingOffering) continue;
    const foremost = allyInPosition(battle, u, "foremost");
    if (foremost) dispatchTrigger(battle, u, {kind: "passive", run: () => {
      const granted = grantBuff(battle, foremost, "stic_sacrifice_aura", 1,
        `${u.name} · Scales of Equity`, {casterId: u.id});
      if (granted) log(battle, `${foremost.name} gains Offering from ${u.name}.`,
        "Foremost ally · 70% damage share received · unique effect");
      return granted;
    }});
  }
  for(const u of units)for(const data of Object.values(heroes[u.name]?.skills||{}))
    applySkillEffects(heroes,battle,u,data,data.earthReview?.openingEffects,u.id);
  nextTurn(battle, null, Math.random, heroes);
  return battle;
}
export function setSouls(previous, side, value) {
  const battle = clone(previous);
  battle.souls[side] = clampSouls(value);
  log(
    battle,
    `${teamName(side)} souls set to ${battle.souls[side]}.`,
    "Manual adjustment",
  );
  return battle;
}
export function damage(attacker, defender, d, hit) {
  const a = effectiveStats(attacker),
    t = effectiveStats(defender);
  const attack = a.atk * d.rate * (1 + a.spd * (d.selfSpdScaling || 0));
  const scaling =
    a.hp * (d.selfHpScaling || 0) +
    a.def * (d.selfDefScaling || 0) +
    t.hp * (d.targetHpScaling || 0) +
    Math.max(0,a.hp-(attacker.currentHp ?? a.hp))*(d.selfMissingHpScaling || 0);
  const debuffCount = (defender.buffs || []).filter(
    (b) => BUFFS[b.id]?.debuff && (b.turns === null || b.turns > 0),
  ).length;
  const penetration = Math.max(
    0,
    Math.min(
      1,
      (d.penetration || 0) + (d.casterBuffPenetration && hasBuff(attacker,d.casterBuffPenetration.id) ? d.casterBuffPenetration.bonus : 0) + (d.penetrationPerDebuff || 0) * debuffCount,
    ),
  );
  const targetStatus = d.damageCondition?.targetStatus;
  const hasConditionalStatus = (defender.buffs || []).some(effect => {
    const definition = BUFFS[effect.id];
    return definition && !definition.unique && (effect.turns === null || effect.turns > 0) &&
      (targetStatus === "buff" ? !definition.debuff : targetStatus === "debuff" ? !!definition.debuff : targetStatus === "barrier" ? effect.id==="stic_protect" : false);
  });
  const conditionalDamage = hasConditionalStatus ? d.damageCondition.multiplier : 1;
  const lightBonus =
    hasBuff(attacker, "stic_demonpower_keep") && defender.attribute === "light"
      ? 1.6
      : 1;
  const hitMultiplier =
    hit === "crit"
      ? a.chd / 100
      : hit === "miss"
        ? 0.75
        : hit === "crushing"
          ? 1.3
          : 1;
  return Math.max(
    0,
    Math.floor(
      ((attack + scaling) *
        1.871 *
        d.pow *
        hitMultiplier *
        lightBonus *
        conditionalDamage * (d.damageMultiplier || 1) *
        (1+(d.targetCurrentHpDamage || 0)*Math.max(0,Math.min(1,(defender.currentHp ?? t.hp)/t.hp))) *
        (1+(d.hpDifferenceDamage ? Math.min(d.hpDifferenceDamage.cap,Math.max(0,t.hp-a.hp)*d.hpDifferenceDamage.ratio) : 0)) *
        receivedDamageMultiplier(defender) *
        (1 + (d.enhancementDamage || 0) + (d.eeDamage || 0))) /
        (1 + (t.def * (1 - penetration)) / 300),
    ),
  );
}
export function affectedTargets(battle, u, target, d) {
  const enemies = battle.units.filter(
    (t) => t.currentHp > 0 && t.side !== u.side,
  );
  return [target, ...enemies.filter((t) => t.id !== target.id)].slice(
    0,
    Math.max(1, d.targets || 1),
  );
}

function applySkillDispel(battle, actor, target, data, hit, random, stage) {
  if (data.automaticDispel?.timing !== stage) return;
  const result = rollEffect(
    {
      hit,
      allowMiss: stage === "beforeAttack",
      effectiveness: effectiveStats(actor).eff || 0,
      resistance: effectiveStats(target).efr || 0,
    },
    random,
  );
  if (result.landed) {
    if(data.automaticDispel.durationDecrease)decreaseBuffDurations(battle,target,data.automaticDispel.durationDecrease);
    else dispelBuffs(battle, target, data.automaticDispel.count ?? Infinity, `${actor.name} dispel`);
  }
  else log(battle, `${target.name}: buff dispel ${result.reason}.`, actor.name);
}
function performSkillAttack(
  heroes,
  battle,
  u,
  skill,
  targetId,
  hit,
  random,
  options = {},
) {
  const d = skillData(heroes, u, skill, options.actionKind || "active"),
    target = battle.units.find((t) => t.id === targetId),
    targets = affectedTargets(battle, u, target, d),
    results = [],
    hits = [],
    cursedIds = battle.units
      .filter((t) => hasBuff(t, "stic_curse2"))
      .map((t) => t.id);
  if (!spendSkillResource(u, d)) return {data: d, hits, results};
  if(d.consumesAllFocus)u.resourceValue=0;
  applySkillEffects(heroes,battle,u,d,d.earthReview?.beforeEffects,targetId,{random});
  if (d.celineNimble) grantBuff(battle,u,"stic_att_up",1,"Nimble Sword",{casterId:u.id});
  for (const t of targets) {
    if (options.automaticDispels !== false)
      applySkillDispel(battle, u, t, d, "normal", random, "beforeAttack");
    if (options.automaticDebuffs !== false)
      applySkillDebuffs(
        battle,
        u,
        t,
        skill,
        d,
        "normal",
        random,
        "beforeAttack",
      );
    const outcome = hit === "auto" ? rollHit(u, t, d, random) : hit;
    const protection = planProtectedDamage(battle, t, damage(u, t, d, outcome), { attacker: u, skill: d });
    const amount = protection.targetDamage;
    const healthLost=sufferDamage(battle, t, amount, { hit: outcome });
    if(d.earthReview?.injury && outcome!=="miss")inflictInjury(t,healthLost,{maxFractionPerHit:d.earthReview.injury});
    if (protection.transferred > 0) {
      sufferDamage(battle, protection.recipient, protection.transferred, { kind: "shared" });
      log(battle,
        `${t.name} shares ${protection.transferred.toLocaleString()} damage with ${protection.recipient.name}.`,
        `Reduction → limit → share · ${protection.limited.toLocaleString()} before sharing · transfer bypasses further protection`,
      );
    }
    if (t.currentHp === 0 && d.inflictsExtinction) {
      t.extinct = true;
      log(
        battle,
        `${t.name}: Extinction prevents revival.`,
        `${u.name} ${skill}`,
      );
    }
    hits.push({
      id: t.id,
      amount,
      outcome,
      vampiric: hasBuff(t, "stic_vampire"),
      defeated: t.currentHp <= 0,
    });
    results.push(
      `${t.name}: ${amount.toLocaleString()} damage (${outcome})${t.currentHp === 0 ? " · defeated" : ""}`,
    );
  }
  if (d.celineNimble) healUnit(battle,u,hits.reduce((sum,h)=>sum+h.amount,0)*0.25,"Nimble Sword lifesteal");
  afterAttackEffects(battle, u, hits, cursedIds);
  for (const hitResult of hits) {
    const t = battle.units.find((t) => t.id === hitResult.id);
    if (t.currentHp > 0 && options.automaticDispels !== false)
      applySkillDispel(
        battle,
        u,
        t,
        d,
        hitResult.outcome,
        random,
        "afterAttack",
      );
    if (t.currentHp > 0 && options.automaticDebuffs !== false)
      applySkillDebuffs(battle, u, t, skill, d, hitResult.outcome, random);
  }
  applySkillBuffs(battle, u, heroes[u.name].code, skill, d);
  if (options.automaticReadiness !== false)
    for (const effect of d.automaticReadiness || []) {
      if (effect.outsideTurnOnly && battle.active === u.id) continue;
      if (effect.target === "caster")
        applyCRChange(
          battle,
          u,
          effect.amount * (effect.perTarget ? hits.length : 1),
          `${u.name} ${skill}`,
        );
      else
        for (const hitResult of hits) {
          const recipient = battle.units.find(
            (t) => t.id === hitResult.id && t.currentHp > 0,
          );
          if (!recipient) continue;
          const result = rollEffect(
            {
              hit: hitResult.outcome,
              effectiveness: effectiveStats(u).eff || 0,
              resistance: effectiveStats(recipient).efr || 0,
              immunity: hasBuff(recipient, "stic_debuf_impossible"),
            },
            random,
          );
          if (result.landed)
            applyCRChange(
              battle,
              recipient,
              effect.amount,
              `${u.name} ${skill}`,
            );
          else
            log(
              battle,
              `${recipient.name}: CR setback ${result.reason}.`,
              `${u.name} ${skill}`,
            );
        }
    }

  applySkillEffects(heroes,battle,u,d,d.earthReview?.combatEffects,targetId,{random,hits});
  if(d.earthReview?.cooldownResetOnKill&&hits.some(h=>h.defeated))u.cooldowns[skill]=0;
  applySkillResourceGain(battle, u, d, hits);
  const resolvedExtra=(d.earthReview?.extraTurnOnKill&&hits.some(h=>h.defeated)) || (d.earthReview?.extraTurnOnCritical&&hits.some(h=>h.outcome==="crit"));
  const eventData=d.earthReview?.extraTurnOnKill||d.earthReview?.extraTurnOnCritical ? {...d,tags:[...d.tags.filter(t=>t!=="extraTurn"),...(resolvedExtra?["extraTurn"]:[])]} : d;
  const skillUse = recordSkillUse(battle, u, skill, eventData, {kind: options.actionKind || "active", targetId,hits});
  const followUps=d.earthReview?.focusFollowUp&&resourceValue(u)>=5 ? [{kind:"additional",actorId:u.id,targetId,skill:d.earthReview.focusFollowUp,consumeFocus:true,source:"skill",label:"Bellona · full Focus"}] : [];
  return { data: d, hits, results, skillUse, followUps };
}

export function executeAttack(
  heroes,
  previous,
  skill,
  targetId = null,
  hit = "auto",
  random = Math.random,
  options = {},
) {
  const actor = activeUnit(previous);
  if (!canUse(heroes, previous, actor, skill)) return previous;
  const selfSkill = isCermiaSelfSkill(heroes, actor, skill);
  const supportAction = skill !== "wait" ? skillData(heroes,actor,skill)?.nonAttack : null;
  if (supportAction && !validNonAttackTarget(previous,actor,supportAction,targetId)) return previous;
  const forced = forcedTarget(previous, actor);
  if (forced && skill !== "wait" && targetId !== forced.id) return previous;
  const originalTarget = previous.units.find(
    (t) => t.id === targetId && t.currentHp > 0 && t.side !== actor.side,
  );
  if (
    skill !== "wait" &&
    !selfSkill &&
    !supportAction &&
    (!originalTarget ||
      !(
        hit === "auto" ||
        (skillData(heroes, actor, skill).hitTypes?.includes(hit) ??
          hit === "normal")
      ))
  )
    return previous;
  const battle = clone(previous),
    u = activeUnit(battle),
    actorDeathSerial = u.deaths || 0,
    tickableBuffs = new Set((u.buffs || []).map(buffTickKey));
  let attackExtraTurn=false;
  const watcherBudget={remaining:32};
  battle.lastWatchedSkillUseSerial ??= previous.skillUseSerial || 0;
  setCR(battle, u, 0, effectiveStats(u).spd);
  if (skill === "wait")
    log(
      battle,
      `${u.name} ${hasBuff(u, "stic_stun") ? "loses the turn to Stun" : "passes"}.`,
      `${teamName(u.side)} · no souls gained`,
    );
  else if (supportAction) {
    const data = skillData(heroes,u,skill);
    spendSkillResource(u,data);
    battle.souls[u.side] = clampSouls(battle.souls[u.side]-u.skills[skill].cost+u.skills[skill].gain);
    u.cooldowns[skill] = u.skills[skill].cd+1;
    applyNonAttackSkill(heroes,battle,u,data,targetId);
    applySkillResourceGain(battle,u,data);
    recordSkillUse(battle,u,skill,data,{kind:"active",targetId:targetId || u.id});
    log(battle,`${u.name} uses ${data.name}.`,"Non-attack skill · no hit or resistance roll");
  }
  else if (selfSkill) {
    battle.souls[u.side] = clampSouls(
      battle.souls[u.side] - u.skills[skill].cost + u.skills[skill].gain,
    );
    u.cooldowns[skill] = u.skills[skill].cd + 1;
    grantBuff(battle,u,"stic_att_up2",2,"Hot Streak!",{casterId:u.id});
    u.cooldowns.S3=0;
    recordSkillUse(battle,u,skill,skillData(heroes,u,skill),{kind:"active",targetId:u.id});
    log(
      battle,
      `${u.name} uses Hot Streak!: Greater Attack, S3 cooldown reset and extra turn.`,
      `${teamName(u.side)} · +${u.skills[skill].gain} / −${u.skills[skill].cost} souls`,
    );
  } else {
    const naturalDual = naturalDualRequest(heroes, battle, u, skill,
      skillData(heroes, u, skill), targetId, random, options);
    const {
      data: d,
      hits,
      results,
      followUps,
    } = performSkillAttack(
      heroes,
      battle,
      u,
      skill,
      targetId,
      hit,
      random,
      {...options, actionKind: "active"},
    );
    battle.souls[u.side] = clampSouls(
      battle.souls[u.side] - u.skills[skill].cost + u.skills[skill].gain,
    );
    u.cooldowns[skill] = (d.consumesAllFocus && d.focusAtCast>=5) || (d.earthReview?.cooldownResetOnKill && hits.some(h=>h.defeated)) ? 0 : u.skills[skill].cd + 1;
    attackExtraTurn=(d.earthReview?.extraTurnOnKill&&hits.some(h=>h.defeated)) || (d.earthReview?.extraTurnOnCritical&&hits.some(h=>h.outcome==="crit"));
    log(
      battle,
      `${u.name} uses ${d.celineNimble ? "Nimble Sword" : skill}. ${results.join(" / ")}`,
      `${teamName(u.side)} · ${hit} hit · ${options.automaticDebuffs === false ? "manual debuffs" : "automatic skill debuffs"} · +${u.skills[skill].gain} / −${u.skills[skill].cost} souls · simplified damage${d.note ? " · source note: " + d.note : ""}`,
    );
    resolveDeaths(heroes, battle);
    flushSkillWatchers(battle,watcherBudget);
    if (options.automaticReactions !== false) {
      const queue = [...(followUps || []),...(naturalDual ? [naturalDual] : [])];
      if (d.triggersDualAttack) {
        queue.push({
          kind: "dual",
          selection: d.dualAttackSelection || "highestAttack",
          callerId: u.id,
          targetId,
          skill: "S1",
          source: d.dualAttackSource || "skill",
          label: `${u.name} ${skill}`,
        });
      }
      if (d.canTriggerCounter !== false)
        for (const hitResult of hits.filter((h) => !h.defeated)) {
          const defender = battle.units.find((t) => t.id === hitResult.id);
          const possessionCounter=hitResult.outcome === "crit" && hasBuff(defender,"stic_possession_keep");
          const violetCounter=defender.violetReadyPassive && !defender.cooldowns.S3 && hitResult.outcome==="miss" && !hasBuff(defender,"stic_dizzy");
          if ((defender.counterChance || 0) > 0 || possessionCounter || violetCounter)
            queue.push({
              kind: "counter",
              actorId: defender.id,
              targetId: u.id,
              skill: "S1",
              source: possessionCounter ? "buff" : violetCounter ? "passive" : "counterStat",
              chance: possessionCounter || violetCounter ? 100 : defender.counterChance,
              label: possessionCounter ? "Possession · suffered critical hit" : violetCounter ? "Violet · evaded with Butterfly Cut ready" : "configured counter chance",
            });
        }
      resolveReactionQueue(heroes, battle, queue, random, {...options,watcherBudget});
    }
  }
  flushSkillWatchers(battle,watcherBudget);
  if ((u.deaths || 0) === actorDeathSerial) {
    endTurnEffects(battle, u);
    for (const name of expireBuffs(battle, u, tickableBuffs))
      log(battle, `${u.name}: ${name} expired.`, "End of bearer turn");
  }
  resolveDeaths(heroes, battle);
  dispatchWatchers(battle,{type:"turnEnd",actorId:u.id,side:u.side,tags:[]},WATCHER_HANDLERS,watcherBudget);
  flushSkillWatchers(battle,watcherBudget);
  if (selfSkill && u.currentHp > 0) {
    setCR(battle, u, 100, effectiveStats(u).spd);
    nextTurn(battle, u.id, random, heroes);
  } else if ((supportAction?.extraTurn || attackExtraTurn) && u.currentHp > 0) {
    setCR(battle,u,100,effectiveStats(u).spd);
    nextTurn(battle,u.id,random,heroes);
  } else {
    nextTurn(battle, null, random, heroes);
  }
  return battle;
}

export function resolveDeaths(
  heroes,
  battle,
  { turnAlreadyStarted = false } = {},
) {
  while (battle.deathEvents?.length) {
    const event = battle.deathEvents.shift(),
      unit = battle.units.find((u) => u.id === event.unitId);
    if (!unit || unit.deaths !== event.serial) continue;
    if (unit.isHero !== false) {
      // One resolution per queued death serial, including deaths followed by revival.
      for (const owner of battle.units) {
        if (!heroes[owner.name]?.skills?.S2?.deathCooldownSouls) continue;
        dispatchTrigger(battle,owner,{kind:"passive",run:()=>{
          for (const skill of SKILLS) owner.cooldowns[skill]=Math.max(0,owner.cooldowns[skill]-1);
          battle.souls[owner.side]=clampSouls(battle.souls[owner.side]+5);
          log(battle,`${owner.name}: hero death reduces cooldowns by 1 and grants 5 souls.`,"Sixth Sense");
        }});
      }
    }
    const offering = (unit.buffs || []).find(b => b.id === "stic_sacrifice_aura");
    const offeringCaster = offering && battle.units.find(u => u.id === offering.casterId);
    if (offeringCaster && heroes[offeringCaster.name]?.skills?.S2?.openingOffering)
      dispatchTrigger(battle, offeringCaster, {kind: "passive", run: () => {
        for (const ally of alliesOf(battle, offeringCaster))
          healUnit(battle, ally, maxHp(ally) * 0.5, "Scales of Equity · Offering bearer died");
        return true;
      }});
    clearSourceDeathEffects(battle, unit.id);
    if (unit.currentHp > 0) continue;
    if(event.reviveBuff) {
      unit.buffs=(unit.buffs||[]).filter(b=>b.id!=="stic_bless");
      if(reviveUnit(battle,unit,{fraction:.3,source:"Revive buff"}))continue;
    }
    const data = heroes[unit.name]?.skills?.S2;
    if (!data?.passiveRevival || !data.passive || unit.cooldowns.S2 > 0)
      continue;
    const result = dispatchTrigger(
      battle,
      unit,
      {
        kind: "passive",
        run: () => {
          if (
            !reviveUnit(battle, unit, {
              fraction: data.passiveRevival,
              combatReadiness: 100,
              source: "Dark Contract passive",
            })
          )
            return false;
          if (unit.resourceType === "focus") grantUnitResource(battle, unit, 5);
          unit.cooldowns.S2 =
            unit.skills.S2.cd +
            (turnAlreadyStarted && battle.active === unit.id ? 0 : 1);
          if (equippedEE(heroes[unit.name], unit)?.option.opening)
            dispatchTrigger(battle, unit, {
              kind: "equipment",
              run: () =>
                grantBuff(
                  battle,
                  unit,
                  "stic_demonpower_keep",
                  2,
                  "Archdemon’s Eye EE · Dark Contract revival",
                  { casterId: unit.id },
                ),
            });
          return true;
        },
      },
      { allowDead: true, sealedAtDeath: event.sealed },
    );
    if (!result.activated && result.reason)
      log(
        battle,
        `${unit.name}: revival passive blocked by ${result.reason}.`,
        "Dark Contract",
      );
  }
}
function resolveReactionQueue(heroes, battle, queue, random, options = {}) {
  // Only reviewed follow-ups can append attacks; counters and natural Dual Attacks do not recurse.
  for (let index=0;index<queue.length&&index<32;index++) {
    const request=queue[index];
    if (request.kind === "dual" && request.callerId && !battle.units.some(u => u.id === request.callerId && u.currentHp > 0)) continue;
    const actor = ["highestAttack", "random"].includes(request.selection)
        ? (request.selection === "random"
            ? selectRandomDualAlly
            : selectHighestAttackDualAlly)(
            heroes,
            battle,
            battle.units.find((u) => u.id === request.callerId),
            random,
          )
        : battle.units.find((u) => u.id === request.actorId),
      target = battle.units.find(
        (u) => u.id === request.targetId && u.currentHp > 0,
      );
    if (!actor && ["highestAttack", "random"].includes(request.selection)) {
      log(
        battle,
        "Dual Attack does not occur: no eligible ally.",
        request.label,
      );
      continue;
    }
    const reason = activationBlockReason(battle, actor, request.kind, {
      source: request.source,
    });
    if (reason || !target || target.side === actor?.side) {
      if (actor && reason)
        log(
          battle,
          `${actor.name}: ${request.kind} blocked by ${reason}.`,
          request.label || "Reaction gate",
        );
      continue;
    }
    if (request.kind === "dual" && request.skill && request.skill !== "S1") continue;
    const data = skillData(heroes, actor, request.skill || "S1");
    if (!data || data.passive || data.damageSupport !== "supported" || !canPaySkillResource(actor, data)) continue;
    if (
      request.chance !== undefined &&
      random() * 100 >= Math.max(0, Math.min(100, request.chance))
    )
      continue;
    if(request.consumeFocus){if(resourceValue(actor)<5)continue;actor.resourceValue=0;}
    const { results,followUps } = performSkillAttack(
      heroes,
      battle,
      actor,
      request.skill || "S1",
      target.id,
      request.hit || "auto",
      random,
      {...options, actionKind: request.kind},
    );
    log(
      battle,
      `${actor.name} ${request.kind}: ${results.join(" / ")}`,
      request.label || request.source || "Reaction",
    );
    queue.push(...(followUps || []));
    resolveDeaths(heroes, battle);
    flushSkillWatchers(battle,options.watcherBudget || {remaining:32});
  }
}
export function executeReaction(
  heroes,
  previous,
  request,
  random = Math.random,
) {
  if (
    !previous ||
    previous.winner ||
    !["additional", "counter", "dual"].includes(request.kind) ||
    (request.kind === "dual" && request.skill && request.skill !== "S1")
  )
    return previous;
  const actor = previous.units.find((u) => u.id === request.actorId),
    target = previous.units.find(
      (u) => u.id === request.targetId && u.currentHp > 0,
    );
  if (
    activationBlockReason(previous, actor, request.kind, {
      source: request.source,
    }) ||
    !target ||
    target.side === actor?.side
  )
    return previous;
  const data = skillData(heroes, actor, request.skill || "S1");
  if (!data || data.passive || data.damageSupport !== "supported" || !canPaySkillResource(actor, data))
    return previous;
  if (
    request.hit &&
    request.hit !== "auto" &&
    !data.hitTypes?.includes(request.hit)
  )
    return previous;
  const battle = clone(previous);
  battle.lastWatchedSkillUseSerial ??= previous.skillUseSerial || 0;
  resolveReactionQueue(heroes, battle, [request], random,{watcherBudget:{remaining:32}});
  const live = battle.units.filter((u) => u.currentHp > 0),
    lost = SIDES.find((side) => !live.some((u) => u.side === side));
  if (lost) {
    battle.winner = lost === "left" ? "right" : "left";
    battle.active = null;
  } else if (activeUnit(battle)?.currentHp <= 0)
    nextTurn(battle, null, random, heroes);
  return battle;
}

export function resumeStalledBattle(heroes, battle, random = Math.random) {
  if (
    battle.stalled &&
    !battle.winner &&
    battle.units.some((u) => u.currentHp > 0 && Number.isFinite(u.readyAt))
  )
    nextTurn(battle, null, random, heroes);
  return battle;
}
export function changeCombatReadiness(
  heroes,
  previous,
  targetId,
  amount,
  random = Math.random,
) {
  if (
    !previous ||
    previous.winner ||
    !Number.isFinite(amount) ||
    amount < -100 ||
    amount > 100
  )
    return previous;
  const target = previous.units.find(
    (u) => u.id === targetId && u.currentHp > 0,
  );
  if (!target) return previous;
  const battle = clone(previous);
  applyCRChange(
    battle,
    battle.units.find((u) => u.id === targetId),
    amount,
  );
  return resumeStalledBattle(heroes, battle, random);
}

export function detonateEffects(
  heroes,
  previous,
  targetId,
  id,
  random = Math.random,
) {
  if (!previous || previous.winner) return previous;
  const battle = clone(previous),
    target = battle.units.find((u) => u.id === targetId);
  if (!target || !detonateUnitEffects(battle, target, id)) return previous;
  resolveDeaths(heroes, battle);
  const lost = SIDES.find(
    (side) => !battle.units.some((u) => u.side === side && u.currentHp > 0),
  );
  if (lost) {
    battle.winner = lost === "left" ? "right" : "left";
    battle.active = null;
  } else if (activeUnit(battle)?.currentHp <= 0)
    nextTurn(battle, null, random, heroes);
  return resumeStalledBattle(heroes, battle, random);
}
