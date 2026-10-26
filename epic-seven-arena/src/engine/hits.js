import { effectiveStats } from "./buffs.js";
const canonical = (element) =>
  ({ water: "ice", earth: "wind" })[element] || element;
export function elementRelation(attacker, defender) {
  const a = canonical(attacker),
    d = canonical(defender);
  if (!a || !d || a === d) return "neutral";
  if ((a === "light" && d === "dark") || (a === "dark" && d === "light"))
    return "advantage";
  const beats = { ice: "fire", fire: "wind", wind: "ice" };
  if (beats[a] === d) return "advantage";
  if (beats[d] === a) return "disadvantage";
  return "neutral";
}
export function hitChances(attacker, defender, data = {}) {
  const relation = elementRelation(attacker.attribute, defender.attribute);
  const a = effectiveStats(attacker),
    d = effectiveStats(defender);
  return {
    relation,
    miss: Math.min(
      100,
      Math.max(
        0,
        (relation === "disadvantage" ? 50 : 0) + d.evasion + a.hitChancePenalty - (data.hitChanceBonus || 0),
      ),
    ),
    critical: Math.min(
      100,
      Math.max(
        0,
        a.chc - d.critResistance + (relation === "advantage" ? 15 : 0) + (data.criticalChanceBonus || 0),
      ),
    ),
    crushing: relation === "advantage" ? 50 : 30,
  };
}
// Independent checks: miss first, then critical, then crushing on non-critical hits.
export function rollHit(attacker, defender, data, random = Math.random) {
  const c = hitChances(attacker, defender, data);
  const allowed = (hit) => data.hitTypes?.includes(hit) ?? hit === "normal";
  if (allowed("miss") && random() * 100 < c.miss) return "miss";
  if (allowed("crit") && random() * 100 < c.critical) return "crit";
  if (allowed("crushing") && random() * 100 < c.crushing) return "crushing";
  return "normal";
}
