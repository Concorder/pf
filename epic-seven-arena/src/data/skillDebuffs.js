import { SKILL_DEBUFF_RULES } from "./skillDebuffRules.js";
// Same value formatting as CeciliaBot: sum base + enhancement values, then ×1000 for percentages.
export function resolveDebuffRules(hero, skill, index) {
  const description = String(skill.description || "").replace(/\*|\+|_/g, "");
  const refs = (skill.debuff || []).map((d) => d._id);
  const reviewed = SKILL_DEBUFF_RULES[hero.id]?.[`S${index + 1}`];
  if (!reviewed || reviewed.description !== description || skill.passive)
    return { effects: [], pending: refs.length > 0 };
  const effects = [];
  for (const effect of reviewed.effects) {
    if (!refs.includes(effect.id)) continue;
    let chance = effect.chance;
    if (typeof chance === "object") {
      const values = skill.values?.[chance.variable];
      if (
        !Array.isArray(values) ||
        values.some((v) => v !== null && !Number.isFinite(v))
      )
        continue;
      chance =
        values
          .slice(0, (skill.enhancements || []).length + 1)
          .reduce((a, v) => a + (v || 0), 0) * 1000;
    }
    if (!Number.isFinite(chance) || chance < 0 || chance > 100.000001) continue;
    effects.push({
      ...effect,
      chance: Math.min(100, Math.round(chance * 10000) / 10000),
    });
  }
  return {
    effects,
    pending:
      refs.some((id) => !effects.some((e) => e.id === id)) ||
      /detonat|dispel|extra attack|steal|Combat Readiness/i.test(description),
  };
}
