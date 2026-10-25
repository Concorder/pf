import { hasBuff } from "./buffs.js";
const REACTIONS = new Set(["additional", "counter", "dual"]);
// The origin of a trigger is independent from the action it requests.
export function activationBlockReason(
  battle,
  unit,
  kind,
  { source = "skill", allowDead = false, sealedAtDeath = false } = {},
) {
  if (!battle) return "no battle";
  if (!unit || (!allowDead && unit.currentHp <= 0)) return "defeated";
  if (!["passive", "equipment", ...REACTIONS].includes(kind))
    return "unknown activation";
  if (
    (kind === "passive" || source === "passive") &&
    unit.isHero !== false &&
    (sealedAtDeath || hasBuff(unit, "stic_dizzy"))
  )
    return "Seal";
  if (!REACTIONS.has(kind)) return null;
  if (
    unit.isHero !== false &&
    kind === "counter" &&
    hasBuff(unit, "stic_nocounterattack")
  )
    return "Cannot Counterattack";
  if (
    unit.isHero !== false &&
    battle.active !== unit.id &&
    hasBuff(unit, "stic_restrict")
  )
    return "Bind";
  if (["stic_stun", "stic_sleep", "stic_fear"].some((id) => hasBuff(unit, id)))
    return "unable to act";
  return null;
}
export const canActivate = (battle, unit, kind, options) =>
  activationBlockReason(battle, unit, kind, options) === null;
// Only reviewed, in-code handlers enter this dispatcher; source prose is never executed.
export function dispatchTrigger(battle, unit, trigger, context = {}) {
  const reason = activationBlockReason(battle, unit, trigger.kind, {
    ...context,
    source: trigger.source || "skill",
  });
  if (reason || typeof trigger.run !== "function")
    return { activated: false, reason: reason || "missing handler" };
  const result = trigger.run();
  return { activated: result !== false, reason: null };
}
