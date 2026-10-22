import { effectiveStats } from "../engine/buffs.js";
import React from "react";
import { useLab } from "../context.js";
import { skillData, affectedTargets, damage } from "../engine/battle.js";
import Modal from "./Modal.jsx";
import Portrait from "./Portrait.jsx";
export default function HitDialog() {
  const l = useLab(),
    p = l.pending,
    u = l.active,
    target = l.units.find((t) => t.id === p.targetId),
    d = skillData(l.heroes, u, p.skill),
    targets = affectedTargets(l.battle, u, target, d);
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
          <h2 id="hitTitle">Choose the hit outcome</h2>
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
            {target.stats.hp.toLocaleString()} HP
          </p>
        </div>
      </div>
      <p id="hitAffected" className="fine">
        {targets.length > 1
          ? `This skill hits ${targets.length} enemies: ${targets.map((t) => t.name).join(", ")}. The chosen outcome applies to all targets.`
          : "Single-target attack"}
      </p>
      <div id="hitOptions" className="hit-options">
        {[
          ["crit", "Critical", "✦", `${effectiveStats(u).chd}% crit damage`],
          ["normal", "Normal", "◇", "Standard damage"],
          ["miss", "Miss", "↝", "75% damage"],
          ["crushing", "Crushing", "◆", "130% damage"],
        ].map(([hit, label, icon, note]) => {
          const allowed = d.hitTypes?.includes(hit) ?? hit === "normal",
            total = targets.reduce((sum, t) => sum + damage(u, t, d, hit), 0);
          return (
            <button
              key={hit}
              type="button"
              className={`hit-option ${hit}`}
              disabled={!allowed}
              aria-label={`${label} hit`}
              onClick={() => l.resolveHit(hit)}
            >
              <span className="hit-symbol">{icon}</span>
              <b>{label}</b>
              <span>
                {allowed ? total.toLocaleString() + " damage" : "Not available"}
              </span>
              <small>
                {targets.length > 1 ? "Total across targets · " : ""}
                {note}
              </small>
            </button>
          );
        })}
      </div>
      <p className="fine">
        Choose an outcome to apply the attack. Cancel or press Esc to return
        without using the skill.
      </p>
    </Modal>
  );
}
