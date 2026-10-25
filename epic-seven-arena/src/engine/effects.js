// e7calc effectiveness checker: hit × proc × clamp(1 + EFF − ER, 0, .85).
export function resistancePassChance(
  effectiveness = 0,
  resistance = 0,
  ignoreResistance = false,
) {
  return ignoreResistance
    ? 1
    : Math.max(0, Math.min(0.85, 1 + effectiveness / 100 - resistance / 100));
}
export function rollEffect(
  {
    procChance = 100,
    effectiveness = 0,
    resistance = 0,
    ignoreResistance = false,
    hit = "normal",
    allowMiss = false,
    immunity = false,
  },
  random = Math.random,
) {
  if (hit === "miss" && !allowMiss) return { landed: false, reason: "miss" };
  if (immunity) return { landed: false, reason: "immunity" };
  if (random() * 100 >= Math.max(0, Math.min(100, procChance)))
    return { landed: false, reason: "did not proc" };
  if (
    !ignoreResistance &&
    random() >=
      resistancePassChance(effectiveness, resistance, ignoreResistance)
  )
    return { landed: false, reason: "resisted" };
  return { landed: true, reason: "landed" };
}
export function periodicDamage(id, sourceAttack, targetHealth, targetDefense) {
  if (id === "stic_dot") return Math.floor(targetHealth * 0.05);
  if (id === "stic_venom") return Math.floor(targetHealth * 0.1);
  const rate = { stic_blood: 0.3, stic_blaze: 0.6, stic_bomb: 1.5 }[id] || 0;
  return Math.floor(
    (sourceAttack * rate * 1.871) / (1 + (targetDefense * 0.3) / 300),
  );
}
