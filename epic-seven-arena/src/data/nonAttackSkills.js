import {NON_ATTACK_RULES} from "./nonAttackRules.js";
export function resolveNonAttackSkill(hero, skill, index) {
  const reviewed = NON_ATTACK_RULES[hero.id]?.[`S${index+1}`];
  if (!reviewed || skill.passive || reviewed.description !== String(skill.description || "").replace(/[*+_]/g,"")) return null;
  if (!(skill.common || []).some(c => c._id === "cmn_non_attack_skill")) return null;
  const refs = (skill.buff || []).map(b => b._id);
  const result = structuredClone(reviewed);
  for (const effect of result.effects) {
    if (effect.kind === "buff" && !refs.includes(effect.id)) return null;
    if (typeof effect.amount === "object") {
      const row = skill.values?.[effect.amount.variable];
      if (!Array.isArray(row) || row.some(v => v !== null && !Number.isFinite(v))) return null;
      effect.amount = Math.round(row.slice(0,(skill.enhancements || []).length+1).reduce((a,v) => a+(v || 0),0)*1e7)/1e4;
      if (effect.amount < 0 || effect.amount > 100) return null;
    }
  }
  result.pending ||= [];
  return result;
}
