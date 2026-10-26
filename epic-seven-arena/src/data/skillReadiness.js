import {NAT5_READINESS_RULES} from "./natFiveSkillRules.js";
import { SKILL_CR_RULES } from "./skillReadinessRules.js";
export function resolveReadinessRules(hero, skill, index) {
  const rule = SKILL_CR_RULES[hero.id]?.[`S${index + 1}`] ?? NAT5_READINESS_RULES[hero.id]?.[`S${index + 1}`];
  if (
    !rule ||
    skill.passive ||
    rule.description !== String(skill.description || "").replace(/\*|\+|_/g, "")
  )
    return [];
  return rule.effects.flatMap((effect) => {
    let amount = effect.amount;
    if (typeof amount === "object") {
      const row = skill.values?.[amount.variable];
      if (
        !Array.isArray(row) ||
        row.some((v) => v !== null && !Number.isFinite(v))
      )
        return [];
      amount =
        row
          .slice(0, (skill.enhancements || []).length + 1)
          .reduce((a, v) => a + (v || 0), 0) *
        1000 *
        amount.sign;
    }
    return Number.isFinite(amount) && Math.abs(amount) <= 100.000001
      ? [{ ...effect, amount: Math.round(amount * 10000) / 10000 }]
      : [];
  });
}
