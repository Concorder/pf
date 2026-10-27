import { planProtectedDamage } from "../engine/damageProtection.js";
import {debuffGroupName} from "../engine/debuffContainers.js";
import { activationBlockReason } from "../engine/triggers.js";
import { maxHp } from "../engine/health.js";
import { BUFFS } from "../engine/buffs.js";
import { hitChances } from "../engine/hits.js";
import { effectiveStats } from "../engine/buffs.js";
import React, { useState } from "react";
import { useLab } from "../context.js";
import { skillData, affectedTargets, damage } from "../engine/battle.js";
import Modal from "./Modal.jsx";
import Portrait from "./Portrait.jsx";
export default function HitDialog() {
  const l = useLab(),
    p = l.pending,
    u = l.active,
    target = l.units.find((t) => t.id === p.targetId),
    d = skillData(l.heroes, u, p.skill,"active",{soulburn:l.soulburnSelection?.skill===p.skill}),
    targets = affectedTargets(l.battle, u, target, d),
    [automaticDebuffs, setAutomaticDebuffs] = useState(true),
    [automaticReadiness, setAutomaticReadiness] = useState(true),
    [automaticDispels, setAutomaticDispels] = useState(true);
  return (
    <Modal
      id="hitDialog"
      aria-labelledby="hitTitle"
      onDismiss={() => l.setPending(null)}
    >
      <div className="dialog-heading">
        <div>
          <span className="eyebrow" id="hitActor">
            {u.name} · {p.skill}
          </span>
          <h2 id="hitTitle">{d.soulburnActive ? `Soulburn · ${d.name}` : "Resolve the attack"}</h2>
        </div>
        <button
          type="button"
          id="cancelHit"
          className="subtle"
          aria-label="Cancel attack"
          autoFocus
          onClick={() => l.setPending(null)}
        >
          ✕
        </button>
      </div>
      <div className="hit-target">
        <Portrait id="hitPortrait" name={target.name} />
        <div>
          <b id="hitTargetName">{target.name}</b>
          <p id="hitTargetHp">
            {target.currentHp.toLocaleString()} /{" "}
            {maxHp(target).toLocaleString()} HP
          </p>
        </div>
      </div>
      {d.soulburnActive && <p className="fine" id="soulburnCastDescription">Soulburn ({d.soulburn.cost} souls): {d.soulburn.description}</p>}
      <p id="hitAffected" className="fine">
        {targets.length > 1
          ? `This skill hits ${targets.length} enemies: ${targets.map((t) => t.name).join(", ")}. Automatic mode rolls separately for each target. Manual overrides apply to all targets.`
          : "Single-target attack"}
      </p>
      {(target.counterChance || 0) > 0 && (
        <p className="fine">
          Target counterattack chance: {target.counterChance}%.{" "}
          {d.canTriggerCounter === false
            ? "This skill cannot trigger counters."
            : activationBlockReason(l.battle, target, "counter")
              ? `Counter blocked by ${activationBlockReason(l.battle, target, "counter")}.`
              : "Counters use a separate hit roll."}
        </p>
      )}
      {(d.protectionBypass || u.ignoreDamageSharing || u.ignoreDamageReduction) && (
        <p className="fine">
          Protection exceptions: {d.protectionBypass?.ignoreDamageSharing || u.ignoreDamageSharing ? "ignores sharing. " : ""}
          {d.protectionBypass?.ignoreDamageReduction || u.ignoreDamageReduction ? "Ignores reduction. " : ""}
          Skill target conditions apply; manual artifact switches apply to all direct attacks. Damage limits remain active.
        </p>
      )}
      {targets.some((t) => t.buffs?.some((b) => b.id === "stic_freezing" && b.turns > 0)) && (
        <p className="fine">Frostbite disables the bearer’s reduction and sharing; damage limits remain active.</p>
      )}
      <button
        type="button"
        className="primary"
        id="automaticHit"
        onClick={() =>
          l.resolveHit("auto", {
            automaticDebuffs,
            automaticReadiness,
            automaticDispels,
          })
        }
      >
        Use skill · automatic hits
      </button>
      <p className="fine">
        Miss is checked first, then critical, then crushing. Element advantage
        adds 15 percentage points to critical chance. Decreased Hit Chance and
        Evasion add to miss chance.
      </p>
      {targets.map((t) => {
        const c = hitChances(u, t, d);
        return (
          <p className="fine" key={t.id}>
            {t.name}: {c.relation} · {c.miss}% miss · {c.critical}% crit after a
            hit · {c.crushing}% crushing if not critical
          </p>
        );
      })}
      {(d.automaticDebuffs?.length > 0 || d.debuffsPending) && (
        <fieldset>
          <legend>Skill debuffs</legend>
          {d.automaticDebuffs?.length > 0 && (
            <>
              <label>
                <input
                  id="automaticDebuffs"
                  type="checkbox"
                  checked={automaticDebuffs}
                  onChange={(e) => setAutomaticDebuffs(e.target.checked)}
                />{" "}
                Apply skill debuffs automatically
              </label>
              {d.automaticDebuffs.map((effect, index) => (
                <p className="fine" key={index}>
                  {BUFFS[effect.id]?.name || debuffGroupName(effect.id) || "Unknown effect"} · {effect.chance}% MAX
                  proc
                  {effect.count > 1
                    ? ` × ${effect.count} independent rolls`
                    : ""}{" "}
                  · {BUFFS[effect.id]?.globalTurns || effect.turns}{" "}
                  {BUFFS[effect.id]?.globalTurns ? "global turns" : "turns"}
                  {effect.requiresCrit ? " · critical hits only" : ""}
                  {effect.timing === "beforeAttack" ? " · before damage" : ""}
                  {effect.ignoreMiss ? " · can apply on miss" : ""}
                  {effect.ignoreResistanceIfLowerHP
                    ? " · ignores ER against lower-max-HP targets"
                    : ""}
                </p>
              ))}
              <p className="fine">
                {automaticDebuffs
                  ? "Rolls separately per target and stack, with Effectiveness, Resistance and Immunity checks. Explicit source exceptions can apply on misses."
                  : "Automatic debuff rolls are disabled for this attack. Apply your chosen outcomes through Buffs & debuffs after the attack."}
              </p>
            </>
          )}
          {d.debuffsPending && (
            <p className="fine">
              Other source mechanics are not fully automated. The listed debuffs
              roll automatically. Additional source effects may remain pending;
              check Skill data &amp; support before resolving the attack.
            </p>
          )}
        </fieldset>
      )}
      {d.automaticReadiness?.length > 0 && (
        <fieldset>
          <legend>Skill Combat Readiness</legend>
          <label>
            <input
              id="automaticReadiness"
              type="checkbox"
              checked={automaticReadiness}
              onChange={(e) => setAutomaticReadiness(e.target.checked)}
            />{" "}
            Apply skill CR effects automatically
          </label>
          {d.automaticReadiness.map((e, i) => (
            <p className="fine" key={i}>
              {e.target}: {e.amount > 0 ? "+" : ""}
              {e.amount}%{e.perTarget ? " per target" : ""}. Enemy setbacks
              require a hit and a resistance check.
            </p>
          ))}
        </fieldset>
      )}
      {d.automaticDispel && (
        <label>
          <input
            id="automaticDispels"
            type="checkbox"
            checked={automaticDispels}
            onChange={(e) => setAutomaticDispels(e.target.checked)}
          />{" "}
          Apply {d.automaticDispel.count ? `${d.automaticDispel.count}-buff` : "all-buff"} dispel automatically (
          {d.automaticDispel.timing === "beforeAttack"
            ? "before damage"
            : "after damage"}
          ; resistance checked)
        </label>
      )}
      {d.inflictsExtinction && (
        <p className="fine">
          A target defeated by this skill receives Extinction and cannot revive.
        </p>
      )}
      <details>
        <summary>Manual hit override</summary>
        <div id="hitOptions" className="hit-options">
          {[
            ["crit", "Critical", "✦", `${effectiveStats(u).chd}% crit damage`],
            ["normal", "Normal", "◇", "Standard damage"],
            ["miss", "Miss", "↝", "75% damage"],
            ["crushing", "Crushing", "◆", "130% damage"],
          ].map(([hit, label, icon, note]) => {
            const allowed = d.hitTypes?.includes(hit) ?? hit === "normal",
              total = targets.reduce((sum, t) => sum + planProtectedDamage(l.battle, t, damage(u, t, d, hit), { attacker: u, skill: d }).targetDamage, 0);
            return (
              <button
                key={hit}
                type="button"
                className={`hit-option ${hit}`}
                disabled={!allowed}
                aria-label={`${label} hit`}
                onClick={() =>
                  l.resolveHit(hit, {
                    automaticDebuffs,
                    automaticReadiness,
                    automaticDispels,
                  })
                }
              >
                <span className="hit-symbol">{icon}</span>
                <b>{label}</b>
                <span>
                  {allowed
                    ? total.toLocaleString() + " damage"
                    : "Not available"}
                </span>
                <small>
                  {targets.length > 1 ? "Total across targets · " : ""}
                  {note}
                </small>
              </button>
            );
          })}
        </div>
      </details>
      <p className="fine">
        Choose an outcome to apply the attack. Cancel or press Esc to return
        without using the skill.
      </p>
    </Modal>
  );
}
