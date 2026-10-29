// Bounded presentation events are separate from combat math and the text timeline.
export function recordDamageEvent(battle, unit, amount, { hit = "normal", kind = "damage",delayMs } = {}) {
  if (unit.currentHp <= 0 || (amount <= 0 && hit !== "miss")) return;
  battle.damageEventSerial = (battle.damageEventSerial || 0) + 1;
  const event = { id: battle.damageEventSerial, unitId: unit.id, amount,
    ...(Number.isFinite(delayMs)?{delayMs:Math.max(0,delayMs)}:{}),
    hit: ["crit", "normal", "crushing", "miss"].includes(hit) ? hit : "normal", kind };
  battle.damageEvents = [...(battle.damageEvents || []), event].slice(-64);
}
export function newDamageEvents(previous, next) {
  return (next?.damageEvents || []).filter(event => event.id > (previous?.damageEventSerial || 0));
}
