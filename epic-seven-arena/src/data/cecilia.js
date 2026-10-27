import {soulburnMetadata} from "./soulburn.js";
import {EARTH_SKILL_RULES} from "./earthSkillRules.js";
import {resolvePassiveWatchers} from "./passiveWatchers.js";
import {reviewedDamage} from "./reviewedDamage.js";
import {resolveNonAttackSkill} from "./nonAttackSkills.js";
import {SKILL_SOURCE_CORRECTIONS} from "./skillSourceCorrections.js";
import {NAT5_RESOURCE_RULES} from "./natFiveSkillRules.js";
import {RESOURCE_PASSIVE_RULES} from "./resourcePassiveRules.js";
import { nativeResourceType, skillResourceRule } from "../engine/resources.js";
import { classifySkill } from "./skillTags.js";
import { formatSkillDescription } from "./skillText.js";
import { PROTECTION_PASSIVE_DESCRIPTIONS } from "./protectionPassiveRules.js";
import { SKILL_PROTECTION_RULES } from "./skillProtectionRules.js";
import { SKILL_UTILITY_RULES } from "./skillUtilityRules.js";
import { resolveReadinessRules } from "./skillReadiness.js";
import { resolveDebuffRules } from "./skillDebuffs.js";
import {
  maxEnhancements,
  normalizeEquipment,
  defaultSkillSettings,
} from "../engine/progression.js";
export const API = "https://cecilia-bot-api.vercel.app/api/v1";
export const ASSETS =
  "https://raw.githubusercontent.com/CeciliaBot/E7Assets-Temp/main/assets";
const NUMBER = "(?:\\d+(?:\\.\\d+)?|\\.\\d+)";
/** Deliberately not an expression evaluator. Unknown lines block calculation. */
export function parseMultipliers(text) {
  const values = {},
    unknown = [];
  for (const original of String(text || "").split(/\r?\n/)) {
    let line = original.trim();
    if (!line) continue;
    if (/^Skill\s*[123]$/i.test(line)) continue;
    // A clearly labelled soulburn alternative is excluded from the normal cast.
    line = line.replace(/\(\s*[\d.]+%?\s+(?:with\s+)?soulburn\s*\)/gi, "").trim();
    // Normalize only explicit equivalent stat-coefficient spellings. Keep all
    // conditional tails and contradictory parenthetical arithmetic for review.
    line = line.replace(/^(?:Max )?Health scaling\s*:?\s*([\d.]+)%\s+(?:caster['’]s|self) max Health/i, "$1% self max Health");
    line = line.replace(/^Max Health scaling\s*:?\s*([\d.]+)%\s*(?=\()/i, "$1% self max Health ");
    line = line.replace(/^(\d+(?:\.\d+)?% self Defense) scaling\b/i, "$1");
    let m = line.match(
      new RegExp(`^(att_rate|!pow|pow!)\\s*:\\s*(${NUMBER})$`, "i"),
    );
    if (m) {
      const key = m[1].toLowerCase() === "att_rate" ? "rate" : "pow";
      if (values[key] !== undefined) unknown.push(original);
      else values[key] = Number(m[2]);
      continue;
    }
    m = line.match(
      new RegExp(
        `^(${NUMBER})%\\s+(self max Health|self Defense|self Speed|target max Health)\\s*(?:\\(\\s*(${NUMBER})\\s*\\*\\s*(?:self\\s+)?(?:max\\s+)?(Health|Defense|Speed)\\s*\\))?\\s*$`,
        "i",
      ),
    );
    if (m) {
      const key = {
          "self max health": "selfHpScaling",
          "self defense": "selfDefScaling",
          "self speed": "selfSpdScaling",
          "target max health": "targetHpScaling",
        }[m[2].toLowerCase()],
        expected = m[2].toLowerCase().includes("speed")
          ? "speed"
          : m[2].toLowerCase().includes("defense")
            ? "defense"
            : "health";
      if (
        (m[3] !== undefined && (Math.abs(Number(m[1]) / 100 - Number(m[3])) > 1e-9 ||
        m[4].toLowerCase() !== expected)) ||
        values[key] !== undefined
      )
        unknown.push(original);
      else values[key] = Number(m[1]) / 100;
      continue;
    }
    unknown.push(original);
  }
  const supported =
    Number.isFinite(values.rate) &&
    values.rate >= 0 &&
    (values.rate > 0 || ["selfHpScaling", "selfDefScaling", "targetHpScaling"].some(key => values[key] > 0)) &&
    Number.isFinite(values.pow) &&
    values.pow > 0 &&
    !unknown.length;
  return {
    ...values,
    damageSupport: supported ? "supported" : "unsupported",
    supportReason: supported
      ? "Damage coefficients parsed"
      : unknown.length
        ? "Conditional or unrecognized multiplier text"
        : !text
          ? "No multiplier data"
          : "No verified attack coefficients",
    unparsed: unknown,
  };
}
export function compactHero(h) {
  if (
    !h ||
    typeof h._id !== "string" ||
    typeof h.id !== "string" ||
    typeof h.name !== "string" ||
    !Array.isArray(h.skills) ||
    !h.skills.every((raw) => {
      if (!raw || typeof raw !== "object") return false;
      const s = { ...raw, ...raw.awakened };
      return (
        (!s.common || Array.isArray(s.common)) &&
        [
          ["soul_gain", 99],
          ["cooldown", 20],
          ["focus_gain", 5],
          ["focus_requirement", 5],
          ["fighting_spirit_gain", 100],
          ["fighting_spirit_requirement", 100],
        ].every(
          ([key, max]) =>
            s[key] === undefined ||
            (typeof s[key] === "number" &&
              Number.isFinite(s[key]) &&
              s[key] >= 0 &&
              s[key] <= max),
        )
      );
    })
  )
    throw Error("Invalid hero detail response");
  return Object.fromEntries(
    [
      "_id",
      "id",
      "name",
      "attribute",
      "role",
      "rarity",
      "zodiac",
      "updated_dt",
      "skills",
      "ex_equip",
    ].map((k) => [k, h[k]]),
  );
}
export function normalizeSkill(hero, raw, index) {
  const s = { ...raw, ...(raw.awakened || {}) },
    enhancement = maxEnhancements(s),
    parsed = reviewedDamage(hero,s,index) || parseMultipliers(s.multipliers),
    description = String(s.description || "").replace(/\*|\+|_/g, ""),
    correction = SKILL_SOURCE_CORRECTIONS[hero.id]?.[`S${index + 1}`],
    sourceCorrection = correction?.description === description && correction.sourceText === s.multipliers ? correction : null,
    commonRefs = (s.common || []).filter(c => !(sourceCorrection?.ignoreRootNonAttackMarker && c._id === "cmn_non_attack_skill")),
    common = commonRefs.map((c) => c._id),
    passive = !!raw.passive || !!s.passive,
    debuffs = resolveDebuffRules(hero, s, index);
  const targets = common.includes("cmn_aoe")
    ? 3
    : common.includes("cmn_single_target")
      ? 1
      : /\btwo enemies\b/i.test(description)
        ? 2
        : null;
  const utility = SKILL_UTILITY_RULES[hero.id]?.[`S${index + 1}`];
  const reviewedUtility = utility?.description === description ? utility : null;
  const protection = SKILL_PROTECTION_RULES[hero.id]?.[`S${index + 1}`];
  const reviewedProtection = protection?.description === description && common.includes("cmn_ignore_dmg_sharing")
    ? protection : null;
  const gainRule = NAT5_RESOURCE_RULES[hero.id]?.[`S${index + 1}`];
  const resource = skillResourceRule(hero, s);
  if (resource && gainRule?.description === description) Object.assign(resource, {
    criticalGainMultiplier: gainRule.criticalGainMultiplier,
    outsideTurnGainMultiplier: gainRule.outsideTurnGainMultiplier,
  });
  const passiveRule = RESOURCE_PASSIVE_RULES[hero.id];
  const resourcePassive = passive && passiveRule?.skill === `S${index + 1}` && passiveRule.description === description
    ? structuredClone(passiveRule) : null;
  if (resourcePassive?.opening && typeof resourcePassive.opening.amount === "object") {
    const row = s.values?.[resourcePassive.opening.amount.variable];
    if (Array.isArray(row) && row.every(v => v === null || Number.isFinite(v)))
      resourcePassive.opening.amount = row.slice(0, enhancement.level + 1).reduce((a,v) => a + (v || 0), 0);
    else delete resourcePassive.opening;
  }
  const candidateEarth=EARTH_SKILL_RULES[hero.id]?.[`S${index+1}`];
  const earthReview=candidateEarth?.description===description && (!candidateEarth.sourceText || candidateEarth.sourceText===s.multipliers) ? structuredClone(candidateEarth) : null;
  if(earthReview?.staticPassive?.crDecreaseReductionVariable!==undefined)earthReview.staticPassive.crDecreaseReduction=(s.values?.[earthReview.staticPassive.crDecreaseReductionVariable]||[]).slice(0,enhancement.level+1).reduce((a,v)=>a+(v||0),0)*10;
  const watcherReview = resolvePassiveWatchers(hero,s,index,Math.max(0,Number(s.cooldown || 0)+enhancement.cooldown));
  const result = {
    protectionBypass: reviewedProtection ? {
      scope: reviewedProtection.scope,
      ignoreDamageSharing: reviewedProtection.ignoreDamageSharing,
      ignoreDamageReduction: reviewedProtection.ignoreDamageReduction,
    } : null,
    ...parsed,
    ...classifySkill({...s, awakened: undefined, common: commonRefs, passive}),
    sourceReview: sourceCorrection?.note || null,
    resource,
    resourcePassive,
    earthReview,
    healingEnhancement: enhancement.entries.filter(e=>e.string==="enh_healing_eff").reduce((sum,e)=>sum+e.value,0),
    barrierEnhancement: enhancement.entries.filter(e=>e.string==="enh_barrier_strength").reduce((sum,e)=>sum+e.value,0),
    watchers: watcherReview?.watchers || [],
    watcherPending: watcherReview?.pending || [],
    passiveComplete: !!watcherReview?.complete && (!watcherReview.requiresOpening || !!resourcePassive?.opening),
    nonAttack: resolveNonAttackSkill(hero, s, index),
    enhancementLevel: enhancement.level,
    enhancementDamage: enhancement.damage,
    enhancements: enhancement.entries,
    effectChanceBonus: enhancement.effectChance,
    name: s.name || `S${index + 1}`,
    description,
    buffRefs: (s.buff || []).map((b) => b._id),
    debuffRefs: (s.debuff || []).map((b) => b._id),
    automaticDebuffs: debuffs.effects,
    automaticReadiness: resolveReadinessRules(hero, s, index),
    debuffsPending: debuffs.pending,
    inflictsExtinction:
      !!reviewedUtility?.extinction && common.includes("cmn_extinction"),
    automaticDispel: reviewedUtility?.dispel || null,
    dualAttackSelection:
      hero.id === "c1089" &&
      description ===
        "Takes the lead to attack the enemy, and triggers a Dual Attack from a random ally. Damage dealt increases proportional to the caster's max Health."
        ? "random"
        : "highestAttack",
    passive,
    startsOnCooldown: common.includes("cmn_full_skill_cooldown") && /begins.*battle with full cooldown count/i.test(description),
    soulburn: (s.soulburn ?? raw.soulburn) && Number.isFinite(Number(s.soul_requirement ?? raw.soul_requirement)) &&
      Number(s.soul_requirement ?? raw.soul_requirement) > 0 ? {
        cost: Number(s.soul_requirement ?? raw.soul_requirement),
        description: formatSkillDescription(String(s.soul_description ?? raw.soul_description ?? "").replace(/\*|\+|_/g, ""), s.soul_values ?? s.values, {level: enhancement.level}),
      } : null,
    openingOffering: hero.id === "c6005" && index === 1 && passive &&
      description === PROTECTION_PASSIVE_DESCRIPTIONS.c6005 &&
      (s.buff || []).some(b => b._id === "stic_sacrifice_aura"),
    // User-reviewed 50% cap; the cached numeric enhancement rows are inconsistent.
    deathCooldownSouls: hero.id === "c2103" && index === 1 && passive && description === PROTECTION_PASSIVE_DESCRIPTIONS.c2103,
    passiveDamageLimit: hero.id === "c2103" && index === 1 && passive &&
      description === PROTECTION_PASSIVE_DESCRIPTIONS.c2103 && common.includes("cmn_damage_taken_cap") ? 50 : null,
    hecateRestrictions: hero.id === "c1178" && index === 1 && passive &&
      description === PROTECTION_PASSIVE_DESCRIPTIONS.c1178 && common.includes("cmn_cannot_revive"),
    passiveRevival:
      hero.id === "c2007" &&
      passive &&
      description ===
        "At the start of the turn, when Focus is full, resets skill cooldown of Dark Blade. Upon dying, revives to {{variable}} Health, before increasing Combat Readiness by 100% and gaining maximum Focus." &&
      Array.isArray(s.values?.[0]) &&
      s.values[0].every((v) => v === null || Number.isFinite(v))
        ? Math.min(
            1,
            Math.round(
              (s.values?.[0] || [])
                .slice(0, enhancement.level + 1)
                .reduce((sum, v) => sum + (v || 0), 0) *
                10 *
                1e6,
            ) / 1e6,
          )
        : null,
    triggersDualAttack:
      (hero.id === "c1089" &&
        description ===
          "Takes the lead to attack the enemy, and triggers a Dual Attack from a random ally. Damage dealt increases proportional to the caster's max Health.") ||
      (hero.id === "c1001" &&
        description ===
          "Attacks the enemy repeatedly, before triggering a Dual Attack from the ally with the highest Attack."),
    canTriggerDualAttack: !/(?:cannot|does not) trigger (?:a )?Dual Attack/i.test(description),
    canTriggerCounter: !/cannot trigger (?:a )?counterattack/i.test(
      description,
    ),
    source: "CeciliaBot",
    sourceText: s.multipliers || "",
    sourceUpdatedAt: hero.updated_dt || null,
    iconFile: `${s.icon || raw.icon || `sk_${hero.id}_${s.skill || raw.skill || index + 1}`}.png`,
    iconUrl: `${ASSETS}/skill/${encodeURIComponent(s.icon || raw.icon || `sk_${hero.id}_${s.skill || raw.skill || index + 1}`)}.png`,
    defaults: {
      gain: Number(s.soul_gain ?? raw.soul_gain ?? 0) + enhancement.soulGain,
      cd: Math.max(
        0,
        Number(s.cooldown ?? raw.cooldown ?? 0) + enhancement.cooldown,
      ),
      cost: 0,
    },
    targets: targets || 1,
    hitTypes: ["crit", "crushing", "normal", "miss"],
    note: "Normal cast, awakened skill, MAX enhancements; only reviewed secondary effects are automated.",
  };
  if (result.nonAttack?.allowMissingNonAttackTag) {result.tags=["nonAttack"];result.targetScope=null;}
  result.displayDescription = formatSkillDescription(description, s.values, {
    level: enhancement.level,
    overrides: result.passiveDamageLimit ? {0: `${result.passiveDamageLimit}%`} : {},
  });
  if (passive) {
    result.passiveComplete ||= !!earthReview?.complete || (!!result.passiveDamageLimit && !!result.deathCooldownSouls);
    result.damageSupport = "passive";
    result.supportReason = earthReview?.staticPassive ? `Passive: reviewed stats${earthReview.complete ? " implemented" : "; pending: " + earthReview.pending.join(", ")}` : result.passiveDamageLimit
      ? "Passive: 50% effective-max-HP attack limit before sharing; hero-death cooldown reduction and souls implemented"
      : result.openingOffering
      ? "Passive: Offering grant, sharing, one-time survival and bearer-death healing implemented; enemy CR-copy mechanic pending"
      : result.hecateRestrictions
        ? "Passive: cannot revive / grant Immortality aura implemented; attack penetration pending"
        : result.passiveRevival
      ? "Passive: revival and maximum-Focus grant implemented; full-Focus skill/reset effects pending"
      : result.watchers.length
        ? result.passiveComplete ? "Passive: reviewed opening and condition watcher implemented" : "Passive: reviewed condition watcher implemented; " + result.watcherPending.join(", ") + " pending"
      : result.resourcePassive
        ? "Passive: reviewed resource grants/gain blocking implemented; other effects pending"
        : "Passive: triggered effects are not automated";
  } else if (result.nonAttack || common.includes("cmn_non_attack_skill")) {
    result.damageSupport = result.nonAttack ? "nonAttack" : "unsupported";
    result.supportReason = result.nonAttack
      ? `Non-attack cast implemented${result.nonAttack.pending.length ? "; pending: " + result.nonAttack.pending.join(", ") : ""}`
      : "Non-damaging skill: effect support pending";
  } else if (!targets) {
    result.damageSupport = "unsupported";
    result.supportReason = "Unverified target count";
  }
  if (
    /cannot (?:trigger|deal|land).*critical|cannot critically hit/i.test(
      description,
    )
  )
    result.hitTypes = result.hitTypes.filter((x) => x !== "crit");
  if (!passive && !result.celineS1 && !result.reviewedPenetration && !common.includes("cmn_non_attack_skill") && common.includes("cmn_penetration")) {
    const clauses = description.match(/[^.!?]*\bpenetrat(?:e[sd]?|ion)\b[^.!?]*/gi) || [];
    const m = clauses.length === 1 && clauses[0].match(/penetrates?[^.]*?(\d+(?:\.\d+)?)%/i);
    // HP/DEF/Speed scaling in a separate sentence does not make a fixed
    // penetration percentage conditional. Target-specific/variable clauses do.
    if (m && !/when|if |depending|proportional|increases? by|up to|highest|lowest|difference|elite|boss/i.test(clauses[0]))
      result.penetration = Number(m[1]) / 100;
    else {
      result.damageSupport = "unsupported";
      result.supportReason = "Conditional or unverified defense penetration";
    }
  }
  // Described scaling must have a parsed numeric term, never silently omitted.
  for (const [tag, key] of [
    ["cmn_speed_scaling", "selfSpdScaling"],
    ["cmn_max_health_scaling", "selfHpScaling"],
    ["cmn_def_scaling", "selfDefScaling"],
    ["cmn_target_max_health", "targetHpScaling"],
  ])
    if (!passive && !common.includes("cmn_non_attack_skill") && common.includes(tag) && !result.healingOnlyScaling && !Number.isFinite(result.selfMissingHpScaling) && !Number.isFinite(result[key])) {
      result.damageSupport = "unsupported";
      result.supportReason = "Missing numeric scaling coefficient";
    }
  if (
    hero.id === "c1072" &&
    index === 2 &&
    reviewedUtility?.extinction &&
    parsed.damageSupport === "supported" &&
    !passive &&
    targets === 1 &&
    ["supported", "unsupported"].includes(result.damageSupport) &&
    [
      "Damage coefficients parsed",
      "Conditional or unverified defense penetration",
    ].includes(result.supportReason)
  ) {
    result.penetration = 0.3;
    result.penetrationPerDebuff = 0.1;
    result.damageSupport = "supported";
    result.supportReason = "Reviewed Sigret debuff-count penetration";
  }
  result.soulburn=soulburnMetadata(hero,result,index);
  return result;
}
export function createCatalog(baseline, records) {
  const result = structuredClone(baseline);
  for (const h of Object.values(result))
    for (const s of Object.values(h.skills || {})) {
      s.tags = ["unclassified"];
      s.targetScope = null;
      s.damageSupport = "unsupported";
      s.supportReason = "API skill data unavailable";
      s.source = "Fribbels fallback";
    }
  const byCode = new Map(
    Object.entries(baseline).map(([name, h]) => [h.code, name]),
  );
  for (const h of Object.values(records || {})) {
    if (!h || !Array.isArray(h.skills)) continue;
    const name = byCode.get(h.id) || h.name,
      old = result[name] || {};
    result[name] = {
      ...old,
      name,
      sourceName: h.name,
      code: h.id,
      portraitCode: old.portraitCode || old.code || h.id,
      _id: h._id,
      attribute: h.attribute,
      role: h.role,
      rarity: h.rarity,
      zodiac: h.zodiac,
      source: "CeciliaBot",
      exclusiveEquipment: normalizeEquipment(h),
      resourceType: nativeResourceType(h),
      sourceDetailPending: !!h.sourceDetailPending,
      skills: Object.fromEntries(
        h.skills
          .slice(0, 3)
          .map((s, i) => [`S${i + 1}`, normalizeSkill(h, s, i)]),
      ),
    };
  }
  return result;
}
export function syncTeamDefaults(teams, heroes) {
  const next = structuredClone(teams);
  for (const list of Object.values(next))
    for (const h of list) {
      if (!h) continue;
      const previous = h.sourceDefaults || {
        S1: { gain: 1, cost: 0, cd: 0 },
        S2: { gain: 0, cost: 0, cd: 0 },
        S3: { gain: 0, cost: 0, cd: 0 },
      };
      const hero = heroes[h.name];
      h.eeEnabled ??=
        !!hero.exclusiveEquipment && ["light", "dark"].includes(hero.attribute);
      h.eeOption ??= hero.exclusiveEquipment?.options[0]?.index ?? 0;
      h.skillsMaxed = true;
      h.resourceType = hero.resourceType || h.resourceType || "";
      h.resourceValue ??= 0;
      h.resourceOpeningOverride ??= false;
      h.resourceGainMultiplier ??= 1;
      const resolvedDefaults = defaultSkillSettings(hero, h);
      h.sourceDefaults = {};
      for (const skill of ["S1", "S2", "S3"]) {
        const defaults = resolvedDefaults[skill];
        if (!defaults) continue;
        h.sourceDefaults[skill] = { ...defaults };
        for (const k of ["gain", "cost", "cd"])
          if (h.skills[skill][k] === previous[skill]?.[k])
            h.skills[skill][k] = defaults[k];
      }
    }
  return next;
}
