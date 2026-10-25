// Gauge arithmetic has no buff-module dependency; callers supply effective Speed.
export function currentCR(unit, battle, speed) {
  if (unit.currentHp <= 0) return 0;
  if (unit.frozenCR !== undefined) return unit.frozenCR;
  return Math.max(
    0,
    Math.min(100, 100 - ((unit.readyAt - battle.time) * speed) / 100),
  );
}
export function setCR(battle, unit, value, speed) {
  const cr = Math.max(0, Math.min(100, value));
  if (unit.frozenCR !== undefined) {
    unit.frozenCR = cr;
    unit.readyAt = cr >= 100 ? battle.time : Infinity;
  } else unit.readyAt = battle.time + ((100 - cr) * 100) / speed;
}
export function freezeCR(battle, unit, speed) {
  if (unit.frozenCR !== undefined) return;
  unit.frozenCR = currentCR(unit, battle, speed);
  unit.readyAt = unit.frozenCR >= 100 ? battle.time : Infinity;
}
export function unfreezeCR(battle, unit, speed) {
  if (unit.frozenCR === undefined) return;
  const cr = unit.frozenCR;
  delete unit.frozenCR;
  setCR(battle, unit, cr, speed);
}
export function shiftCR(battle, unit, amount, speed) {
  if (unit.currentHp <= 0 || !Number.isFinite(amount))
    return { amount: 0, reason: "invalid target or amount" };
  const active = (id) =>
    (unit.buffs || []).some(
      (b) => b.id === id && (b.turns === null || b.turns > 0),
    );
  if (amount > 0 && active("stic_ab_up_block"))
    return { amount: 0, reason: "Restrict" };
  const before = currentCR(unit, battle, speed),
    adjusted = amount > 0 && active("stic_stigma") ? amount * 0.5 : amount;
  setCR(battle, unit, before + adjusted, speed);
  return {
    amount: currentCR(unit, battle, speed) - before,
    reason: adjusted !== amount ? "Stigma" : null,
  };
}
