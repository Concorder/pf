// Slot identities are team-relative. Mirroring the arena never changes them.
export const FORMATION_SLOTS = Object.freeze({ back: 0, upper: 1, foremost: 2, lower: 3 });
export const POSITIONS = Object.freeze(["Back row", "Upper", "Foremost", "Lower"]);
export function isInPosition(unit, position) {
  return !!unit && Object.hasOwn(FORMATION_SLOTS, position) && unit.slot === FORMATION_SLOTS[position];
}
export function unitInPosition(battle, side, position, { includeDefeated = false, excludeId } = {}) {
  if (!Object.hasOwn(FORMATION_SLOTS, position)) return null;
  return battle?.units.find((u) => u.side === side && isInPosition(u, position) &&
    u.id !== excludeId && (includeDefeated || u.currentHp > 0)) || null;
}
