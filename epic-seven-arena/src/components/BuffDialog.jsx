import React, { useState } from "react";
import { useLab, asset } from "../context.js";
import { BUFFS, effectiveStats } from "../engine/buffs.js";
import { teamName } from "../engine/heroes.js";
import Portrait from "./Portrait.jsx";
import Modal from "./Modal.jsx";
export default function BuffDialog() {
  const l = useLab(),
    [turns, setTurns] = useState(2),
    unit = l.units.find((u) => u.id === l.buffTarget),
    stats = effectiveStats(unit);
  return (
    <Modal
      id="buffDialog"
      aria-labelledby="buffTitle"
      onDismiss={() => l.setBuffTarget(null)}
    >
      <div className="dialog-heading">
        <div>
          <span className="eyebrow">BATTLE EFFECTS</span>
          <h2 id="buffTitle">Manage buffs</h2>
        </div>
        <button
          className="subtle"
          aria-label="Close buffs"
          autoFocus
          onClick={() => l.setBuffTarget(null)}
        >
          ✕
        </button>
      </div>
      <div className="buff-roster">
        {l.units
          .filter((u) => u.currentHp > 0)
          .map((u) => (
            <button
              key={u.id}
              className={u.id === unit.id ? "selected" : ""}
              aria-label={`Buffs for ${u.name}, ${teamName(u.side)}`}
              onClick={() => l.setBuffTarget(u.id)}
            >
              <Portrait name={u.name} />
              <span>{u.name}</span>
            </button>
          ))}
      </div>
      <h3>
        {unit.name} · {teamName(unit.side)}
      </h3>
      <p className="fine">
        Effective stats: {Math.round(stats.atk).toLocaleString()} ATK ·{" "}
        {Math.round(stats.def).toLocaleString()} DEF · {Math.round(stats.spd)}{" "}
        SPD · {stats.chc}% crit chance · {stats.chd}% crit damage
      </p>
      <label>
        Duration (bearer turns)
        <input
          id="buffDuration"
          type="number"
          min="1"
          max="10"
          value={turns}
          onChange={(e) =>
            setTurns(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </label>
      <div className="buff-options">
        {Object.entries(BUFFS)
          .filter(([, b]) => b.manual !== false)
          .map(([id, b]) => (
            <button
              key={id}
              className="buff-option"
              aria-label={`Apply ${b.name}`}
              disabled={!Number.isInteger(turns) || turns < 1 || turns > 10}
              onClick={() => l.editBuff(unit.id, id, turns, false)}
            >
              <img src={asset(`data/buff-icons/${id}.png`)} alt="" />
              <span>
                <b>{b.name}</b>
                <small>{b.description}</small>
              </span>
            </button>
          ))}
      </div>
      <h3>Active buffs</h3>
      <div className="active-buffs">
        {unit.buffs?.length ? (
          unit.buffs.map((b) => (
            <div key={b.id}>
              <span>
                {BUFFS[b.id]?.name} ·{" "}
                {b.turns === null ? "permanent" : `${b.turns} turns`}
              </span>
              <button
                disabled={BUFFS[b.id]?.undispellable}
                aria-label={`Remove ${BUFFS[b.id]?.name}`}
                onClick={() => l.editBuff(unit.id, b.id, 2, true)}
              >
                {BUFFS[b.id]?.undispellable ? "Undispellable" : "Remove"}
              </button>
            </div>
          ))
        ) : (
          <p className="fine">No buffs on this hero.</p>
        )}
      </div>
      <p className="fine">
        Buffs tick down at the end of the bearer’s turn, including Pass turn. A
        skill’s new buffs are applied after that tick. Speed changes preserve
        current CR. Critical outcomes remain manually chosen. All changes can be
        undone after closing this panel.
      </p>
    </Modal>
  );
}
