// Build HP is immutable; persistent injury is a fraction of the current HP basis.
export function originalMaxHp(unit) {
  return Math.max(1, Math.floor(unit.baseMaxHp ?? unit.stats.hp));
}
// Max HP after other modifiers, before injury. Future max-HP effects share this basis.
export function uninjuredMaxHp(unit) {
  const collapse = (unit.buffs || []).some(
    (b) => b.id === "stic_collapse" && (b.turns === null || b.turns > 0),
  );
  const multiplier = Number.isFinite(unit.maxHpMultiplier) && unit.maxHpMultiplier > 0
    ? unit.maxHpMultiplier : 1;
  return Math.max(1, Math.floor(originalMaxHp(unit) * multiplier *
    (collapse ? (unit.isHero === false ? 0.75 : 0.5) : 1)));
}
export function injuryFraction(unit) {
  if (unit.isHero === false) return 0;
  // Compatibility for older in-memory snapshots that stored original-HP amounts.
  const fraction = unit.injuryFraction ?? (unit.injury || 0) / originalMaxHp(unit);
  return Math.max(0, Math.min(0.5, Number.isFinite(fraction) ? fraction : 0));
}
export function maxHp(unit) {
  return Math.max(1, Math.floor(uninjuredMaxHp(unit) * (1 - injuryFraction(unit)) + 1e-9));
}
export function injuryAmount(unit) {
  return uninjuredMaxHp(unit) - maxHp(unit);
}
export function clampHealth(unit) {
  unit.currentHp = Math.max(0, Math.min(maxHp(unit), Math.floor(unit.currentHp)));
}
export function inflictInjury(unit, amount, { maxFractionPerHit = 0.5 } = {}) {
  if (unit.isHero === false || !Number.isFinite(amount) || amount <= 0 ||
      !Number.isFinite(maxFractionPerHit) || maxFractionPerHit < 0) return 0;
  const basis = uninjuredMaxHp(unit);
  const before = injuryAmount(unit);
  const inflicted = Math.min(Math.floor(amount), Math.floor(basis * maxFractionPerHit));
  unit.injuryFraction = Math.min(0.5, injuryFraction(unit) + inflicted / basis);
  delete unit.injury;
  clampHealth(unit);
  return injuryAmount(unit) - before;
}
// Change HP capacity without healing or changing the persistent injury percentage.
export function setMaxHpMultiplier(unit, multiplier) {
  if (!Number.isFinite(multiplier) || multiplier <= 0) return false;
  unit.maxHpMultiplier = multiplier;
  clampHealth(unit);
  return true;
}
export function reviveHealth(unit, fraction) {
  if (unit.currentHp > 0 || !Number.isFinite(fraction) || fraction <= 0) return 0;
  unit.currentHp = Math.max(1, Math.floor(maxHp(unit) * Math.min(1, fraction)));
  return unit.currentHp;
}
