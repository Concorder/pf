// Build HP is immutable. Injury is persistent battle state, not a dispellable effect.
export function originalMaxHp(unit) {
  return Math.max(1, Math.floor(unit.baseMaxHp ?? unit.stats.hp));
}
export function injuryAmount(unit) {
  if (unit.isHero === false) return 0;
  return Math.min(
    Math.floor(originalMaxHp(unit) * 0.5),
    Math.max(0, Math.floor(unit.injury || 0)),
  );
}
export function maxHp(unit) {
  const remaining = originalMaxHp(unit) - injuryAmount(unit);
  const collapse = (unit.buffs || []).some(
    (b) => b.id === "stic_collapse" && (b.turns === null || b.turns > 0),
  );
  // Explicit sandbox ordering: Collapse reduces the capacity remaining after injury.
  return Math.max(
    1,
    Math.floor(
      remaining * (collapse ? (unit.isHero === false ? 0.75 : 0.5) : 1),
    ),
  );
}
export function clampHealth(unit) {
  unit.currentHp = Math.max(
    0,
    Math.min(maxHp(unit), Math.floor(unit.currentHp)),
  );
}
export function inflictInjury(unit, amount) {
  if (unit.isHero === false || !Number.isFinite(amount) || amount <= 0)
    return 0;
  const before = injuryAmount(unit);
  unit.injury = Math.min(
    Math.floor(originalMaxHp(unit) * 0.5),
    before + Math.floor(amount),
  );
  clampHealth(unit);
  return unit.injury - before;
}
// HP restoration primitive for a future revival pipeline; does not implement any hero trigger.
export function reviveHealth(unit, fraction) {
  if (unit.currentHp > 0 || !Number.isFinite(fraction) || fraction <= 0)
    return 0;
  unit.currentHp = Math.max(1, Math.floor(maxHp(unit) * Math.min(1, fraction)));
  return unit.currentHp;
}
