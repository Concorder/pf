import { isInPosition } from "./formation.js";

// “Ally/all allies” includes the caster. Source rules must request exclusion explicitly.
export function alliesOf(battle, caster, { excludeCaster = false, includeDefeated = false } = {}) {
  if (!caster) return [];
  return (battle?.units || []).filter((unit) => unit.side === caster.side &&
    (!excludeCaster || unit.id !== caster.id) && (includeDefeated || unit.currentHp > 0));
}
export function allyInPosition(battle, caster, position, options = {}) {
  return alliesOf(battle, caster, options).find(unit => isInPosition(unit, position)) || null;
}
