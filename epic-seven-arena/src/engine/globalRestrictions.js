// Reviewed Hecate S2 flags are assigned from guarded source data at battle start.
export function hecateRestrictionsActive(battle, target) {
  return target?.isHero !== false && (battle.units || []).some((unit) =>
    unit.hecateRestrictions && unit.currentHp > 0 &&
    !(unit.buffs || []).some((b) => b.id === "stic_dizzy" && (b.turns === null || b.turns > 0))
  );
}
