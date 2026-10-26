// Classification is independent of whether this engine supports the skill's damage.
// Source markers may describe several variants; ambiguous variants remain explicit.
export const SKILL_TAG_LABELS = {
  attack: "Attack",
  singleAttack: "Single attack",
  allEnemiesAttack: "Attack that targets all enemies",
  multiTargetAttack: "Multi-target attack",
  nonAttack: "Non-attack",
  passive: "Passive",
  extraTurn: "Extra turn",
  "dual-attack": "Dual attack",
  unclassified: "Unclassified",
};
export function classifySkill(raw) {
  const s = {...raw, ...raw.awakened};
  const refs = new Set((s.common || []).map(c => c._id));
  const description = String(s.description || "").replace(/[*+_]/g, "");
  const passive = !!raw.passive || !!s.passive;
  // Do not turn a referenced enemy/ally attack or a passive's follow-up into a cast.
  const opening = description.split(/\n/)[0];
  const attackProse = /^(?:\([^)]*\)\s*)?(?:attacks?\b|rapidly attacks?\b|rapidly fires to attack\b|summons .*? to attack\b|takes the lead to attack\b|cuts the enemy to attack\b|punches the enemy\b)/i.test(opening);
  const attack = !passive && !refs.has("cmn_non_attack_skill") &&
    (refs.has("cmn_single_target") || refs.has("cmn_aoe") || attackProse || /\batt_rate\s*:\s*(?:[1-9]|0?\.\d*[1-9])/i.test(s.multipliers || ""));
  const nonAttack = !passive && !attack && (refs.has("cmn_non_attack_skill") ||
    /^(?:by |with |before |releases |opens |dispels |grants |recover)/i.test(opening));
  const tags = passive ? ["passive"] : attack ? ["attack"] : nonAttack ? ["nonAttack"] : ["unclassified"];
  let targetScope = null;
  if (attack) {
    const single = refs.has("cmn_single_target");
    const aoe = refs.has("cmn_aoe");
    targetScope = single && aoe ? "variantDependent" :
      aoe || /\b(?:attacks?|attack by firing on) all enemies\b/i.test(opening) ? "allEnemies" :
      /\b(?:two|2) enemies\b/i.test(opening) || refs.has("cmn_multiple_targets") ? "multiple" :
      single || /\b(?:the|an) enemy\b/i.test(opening) ? "single" : "unknown";
    if (targetScope === "single") tags.push("singleAttack");
    if (targetScope === "allEnemies") tags.push("allEnemiesAttack");
    if (targetScope === "multiple") tags.push("multiTargetAttack");
  }
  // Only explicit caster grant wording, never a shared common marker alone.
  const extraTurn = !passive && /\bgrants? (?:the caster )?an extra turn\b/i.test(description);
  if (extraTurn) tags.push("extraTurn");
  const soulburnTags = [...tags];
  if (!passive && s.soulburn && /\bgrants? (?:the caster )?an extra turn\b/i.test(String(s.soul_description || "").replace(/[*+_]/g, "")) && !soulburnTags.includes("extraTurn")) soulburnTags.push("extraTurn");
  return {tags, targetScope, soulburnTags: s.soulburn ? soulburnTags : null};
}
// Resolve the chosen cast variant for UI and future skill-use reaction contexts.
// Return a copy so resolving Soulburn cannot mutate subsequent normal casts.
export const skillTags = (skill, {soulburn = false, kind = "active"} = {}) => {
  const tags = [...((soulburn ? skill?.soulburnTags : null) ?? skill?.tags ?? ["unclassified"])];
  // Dual Attack is an execution context, not a permanent property of an S1
  // or of the skill which called the assisting hero.
  if (kind === "dual" && !tags.includes("dual-attack")) tags.push("dual-attack");
  return tags;
};
export const hasSkillTag = (skill, tag, options) => skillTags(skill, options).includes(tag);
export const skillTagLabels = (skill, options) => skillTags(skill, options).map(tag => SKILL_TAG_LABELS[tag] || tag);
