import { reviveHealth } from "./health.js";
import { BUFFS, effectiveStats } from "./buffs.js";
// Mutating primitive used inside a battle snapshot. Trigger/cooldown checks belong to the dispatcher.
export function reviveUnit(
  battle,
  unit,
  { fraction = 0.5, combatReadiness = 0, source = "Revival" } = {},
) {
  if (
    battle.winner ||
    !unit ||
    unit.currentHp > 0 ||
    unit.extinct ||
    !Number.isFinite(fraction) ||
    fraction <= 0 ||
    !Number.isFinite(combatReadiness)
  )
    return false;
  unit.buffs = (unit.buffs || []).filter((b) => BUFFS[b.id]?.persistOnRevive);
  delete unit.frozenCR;
  const hp = reviveHealth(unit, fraction);
  if (!hp) return false;
  unit.readyAt =
    battle.time +
    ((100 - Math.max(0, Math.min(100, combatReadiness))) * 100) /
      effectiveStats(unit).spd;
  battle.log.unshift({
    message: `${unit.name} revives with ${hp.toLocaleString()} HP.`,
    details: `${source} · injury and Fracture preserved`,
    turn: battle.turn,
  });
  return true;
}
