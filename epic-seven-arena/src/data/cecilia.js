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
    line = line.replace(/\(\s*[\d.]+\s+soulburn\s*\)/gi, "").trim();
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
        `^(${NUMBER})%\\s+(self max Health|self Defense|self Speed|target max Health)\\s*\\(\\s*(${NUMBER})\\s*\\*\\s*(Health|Defense|Speed)\\s*\\)\\s*$`,
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
        Math.abs(Number(m[1]) / 100 - Number(m[3])) > 1e-9 ||
        m[4].toLowerCase() !== expected ||
        values[key] !== undefined
      )
        unknown.push(original);
      else values[key] = Number(m[3]);
      continue;
    }
    unknown.push(original);
  }
  const supported =
    Number.isFinite(values.rate) &&
    values.rate > 0 &&
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
    ].map((k) => [k, h[k]]),
  );
}
export function normalizeSkill(hero, raw, index) {
  const s = { ...raw, ...(raw.awakened || {}) },
    parsed = parseMultipliers(s.multipliers),
    description = String(s.description || "").replace(/\*|\+|_/g, ""),
    common = (s.common || []).map((c) => c._id),
    passive = !!raw.passive || !!s.passive;
  const targets = common.includes("cmn_aoe")
    ? 3
    : common.includes("cmn_single_target")
      ? 1
      : /\btwo enemies\b/i.test(description)
        ? 2
        : null;
  const result = {
    ...parsed,
    name: s.name || `S${index + 1}`,
    description,
    buffRefs: (s.buff || []).map((b) => b._id),
    passive,
    source: "CeciliaBot",
    sourceText: s.multipliers || "",
    sourceUpdatedAt: hero.updated_dt || null,
    iconFile: `${s.icon || raw.icon || `sk_${hero.id}_${s.skill || raw.skill || index + 1}`}.png`,
    iconUrl: `${ASSETS}/skill/${encodeURIComponent(s.icon || raw.icon || `sk_${hero.id}_${s.skill || raw.skill || index + 1}`)}.png`,
    defaults: {
      gain: Number(s.soul_gain ?? raw.soul_gain ?? 0),
      cd: Number(s.cooldown ?? raw.cooldown ?? 0),
      cost: 0,
    },
    targets: targets || 1,
    hitTypes: ["crit", "crushing", "normal", "miss"],
    note: "Normal cast, awakened skill, +0 enhancements; only explicitly implemented buffs are automated; other secondary effects are not.",
  };
  if (passive) {
    result.damageSupport = "passive";
    result.supportReason = "Passive: triggered effects are not automated";
  } else if (common.includes("cmn_non_attack_skill")) {
    result.damageSupport = "unsupported";
    result.supportReason = "Non-damaging skill: effect support pending";
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
  if (common.includes("cmn_penetration")) {
    const m = description.match(/penetrates?[^.]*?(\d+(?:\.\d+)?)%/i);
    if (m && !/depending|proportional|increases? by|up to/i.test(description))
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
    if (common.includes(tag) && !Number.isFinite(result[key])) {
      result.damageSupport = "unsupported";
      result.supportReason = "Missing numeric scaling coefficient";
    }
  return result;
}
export function createCatalog(baseline, records) {
  const result = structuredClone(baseline);
  for (const h of Object.values(result))
    for (const s of Object.values(h.skills || {})) {
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
      h.sourceDefaults = {};
      for (const skill of ["S1", "S2", "S3"]) {
        const defaults = heroes[h.name]?.skills?.[skill]?.defaults;
        if (!defaults) continue;
        h.sourceDefaults[skill] = { ...defaults };
        for (const k of ["gain", "cost", "cd"])
          if (h.skills[skill][k] === previous[skill]?.[k])
            h.skills[skill][k] = defaults[k];
      }
    }
  return next;
}
