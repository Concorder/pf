import { hasBuff } from "./buffs.js";
import { maxHp } from "./health.js";

const percent = (value) => Math.max(0, Math.min(100, Number(value) || 0));

// Direct attack protection only. Transferred damage never re-enters this pipeline.
export function planProtectedDamage(battle, target, incoming, { attacker, skill, additional=false } = {}) {
  // Check the damage recipient, not the tank/artifact owner: all applicable
  // incoming protection is suppressed for this bearer, regardless of its source.
  const frostbite = target.isHero !== false && hasBuff(target, "stic_freezing");
  const bypass = skill?.protectionBypass;
  const applicable = bypass?.scope === "hero" ? target.isHero !== false
    : bypass?.scope === "nonEliteBoss" ? target.isHero !== false || (!target.isElite && !target.isBoss)
    : false;
  const ignoreSharing = frostbite || attacker?.ignoreDamageSharing || (applicable && bypass.ignoreDamageSharing);
  const ignoreReduction = frostbite || attacker?.ignoreDamageReduction || (applicable && bypass.ignoreDamageReduction);
  const allies = battle.units.filter(u => u.side === target.side && u.currentHp > 0);
  const reduction = additional || ignoreReduction ? 0 : Math.max(percent(target.damageReduction),
    ...allies.map(u => percent(u.teamDamageReduction)));
  const reduced = Math.floor(Math.max(0, incoming) * (1 - reduction / 100));
  const nativeLimit = !additional && target.isHero !== false && !hasBuff(target, "stic_dizzy")
    ? percent(target.passiveDamageLimit) : 0;
  const limits = [additional ? 0 : percent(target.damageLimit), nativeLimit].filter(value => value > 0);
  const limit = limits.length ? Math.min(...limits) : 0;
  const limited = limit > 0
    ? Math.min(reduced, Math.floor(maxHp(target) * limit / 100))
    : reduced;
  const manualRecipient = battle.units.find((u) =>
    u.side === target.side && u.id !== target.id && u.currentHp > 0 &&
    String(u.slot) === String(target.damageShareSlot ?? "")
  );
  const candidates = [];
  if (manualRecipient && percent(target.damageShare) > 0)
    candidates.push({recipient: manualRecipient, share: percent(target.damageShare)});
  for (const ally of allies) {
    // Damage sharing always requires another unit; the provider cannot receive from itself.
    if (ally.id === target.id) continue;
    if (hasBuff(ally, "stic_sacrifice_aura")) candidates.push({recipient: ally, share: 70});
    if (percent(ally.teamDamageShare) > 0)
      candidates.push({recipient: ally, share: percent(ally.teamDamageShare)});
  }
  // Strongest applicable effect wins; shares/reductions are never added or multiplied.
  const selected = candidates.sort((a,b) => b.share - a.share || a.recipient.id.localeCompare(b.recipient.id))[0];
  const recipient = selected?.recipient;
  const transferred = recipient && !ignoreSharing ? Math.floor(limited * selected.share / 100) : 0;
  return { reduction, limit, reduced, limited, targetDamage: limited - transferred, transferred, recipient };
}
