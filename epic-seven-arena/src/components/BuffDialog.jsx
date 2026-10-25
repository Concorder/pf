import { maxHp, originalMaxHp, injuryAmount } from "../engine/health.js";
import {
  DEBUFF_CATALOG,
  PENDING_DEBUFF_REASONS,
} from "../data/debuffCatalog.js";
import { resistancePassChance } from "../engine/effects.js";
import React, { useState } from "react";
import { useLab, asset } from "../context.js";
import { BUFFS, effectiveStats, effectRemaining } from "../engine/buffs.js";
import { teamName } from "../engine/heroes.js";
import Portrait from "./Portrait.jsx";
import Modal from "./Modal.jsx";
export default function BuffDialog() {
  const l = useLab(),
    [turns, setTurns] = useState(2),
    [crAmount, setCRAmount] = useState(25),
    [casterId, setCasterId] = useState(
      () =>
        l.units.find(
          (u) =>
            u.side !== l.units.find((t) => t.id === l.buffTarget)?.side &&
            u.currentHp > 0,
        )?.id,
    ),
    [procChance, setProcChance] = useState(100),
    [roll, setRoll] = useState(true),
    [ignoreResistance, setIgnoreResistance] = useState(false),
    unit = l.units.find((u) => u.id === l.buffTarget),
    stats = effectiveStats(unit),
    caster = l.units.find((u) => u.id === casterId && u.currentHp > 0);
  return (
    <Modal
      id="buffDialog"
      aria-labelledby="buffTitle"
      onDismiss={() => l.setBuffTarget(null)}
    >
      <div className="dialog-heading">
        <div>
          <span className="eyebrow">BATTLE EFFECTS</span>
          <h2 id="buffTitle">Manage buffs & debuffs</h2>
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
      <p className="fine" id="effectHealthSummary">
        HP {unit.currentHp.toLocaleString()} / {maxHp(unit).toLocaleString()} ·
        original max {originalMaxHp(unit).toLocaleString()} · persistent injury{" "}
        {injuryAmount(unit).toLocaleString()}. Removing a debuff does not remove
        injury or heal lost HP.
      </p>
      <fieldset>
        <legend>Manual CR change · already resolved outcome</legend>
        <label>
          CR change (percentage points)
          <input
            id="crAmount"
            type="number"
            min="-100"
            max="100"
            value={crAmount}
            onChange={(e) =>
              setCRAmount(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </label>
        <button
          id="applyCR"
          disabled={
            !Number.isFinite(crAmount) || crAmount < -100 || crAmount > 100
          }
          onClick={() => l.editReadiness(unit.id, crAmount)}
        >
          Apply CR change
        </button>
        <p className="fine">
          Positive pushes respect Restrict and Stigma. Negative setbacks are
          unchanged by those statuses. Immobilize blocks natural Speed gains,
          not direct pushes. This control does not roll resistance.
        </p>
      </fieldset>
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
      <fieldset>
        <legend>Debuff application</legend>
        <label>
          Source hero
          <select
            id="effectCaster"
            value={casterId || ""}
            onChange={(e) => setCasterId(e.target.value)}
          >
            {l.units
              .filter((u) => u.currentHp > 0)
              .map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} · {teamName(u.side)}
                </option>
              ))}
          </select>
        </label>
        <label>
          <input
            id="rollEffect"
            type="checkbox"
            checked={roll}
            onChange={(e) => setRoll(e.target.checked)}
          />{" "}
          Roll proc chance and resistance
        </label>
        {roll && (
          <>
            <label>
              Skill proc chance % (including enhancements)
              <input
                id="effectProcChance"
                type="number"
                min="0"
                max="100"
                value={procChance}
                onChange={(e) =>
                  setProcChance(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
              />
            </label>
            <label>
              <input
                id="ignoreResistance"
                type="checkbox"
                checked={ignoreResistance}
                onChange={(e) => setIgnoreResistance(e.target.checked)}
              />{" "}
              Ignore Effect Resistance
            </label>
            <p className="fine">
              {caster?.name}: {effectiveStats(caster || unit).eff || 0}% EFF ·{" "}
              {unit.name}: {stats.efr || 0}% ER ·{" "}
              {Math.round(
                resistancePassChance(
                  effectiveStats(caster || unit).eff || 0,
                  stats.efr || 0,
                  ignoreResistance,
                ) * 100,
              )}
              % resistance pass ·{" "}
              {Math.round(
                procChance *
                  resistancePassChance(
                    effectiveStats(caster || unit).eff || 0,
                    stats.efr || 0,
                    ignoreResistance,
                  ),
              )}
              % combined chance on a successful hit. Immunity blocks debuffs
              even when resistance is ignored.
            </p>
          </>
        )}
        <p className="fine">
          Uncheck to apply an already-decided outcome. Burn, Bleed and Bomb
          snapshot the source hero’s current ATK; each application creates an
          independent stack.
        </p>
      </fieldset>
      {[false, true].map((debuffs) => (
        <section key={String(debuffs)}>
          <h3>{debuffs ? "Debuffs" : "Buffs"}</h3>
          <div className="buff-options">
            {Object.entries(BUFFS)
              .filter(([, b]) => b.manual !== false && !!b.debuff === debuffs)
              .map(([id, b]) => (
                <button
                  key={id}
                  className={`buff-option ${b.debuff ? "debuff-option" : ""}`}
                  aria-label={`Apply ${b.name}`}
                  disabled={
                    !Number.isInteger(turns) ||
                    turns < 1 ||
                    turns > 10 ||
                    (b.needsCaster && (!caster || caster.side === unit.side)) ||
                    (b.debuff &&
                      roll &&
                      (!caster ||
                        !Number.isFinite(procChance) ||
                        procChance < 0 ||
                        procChance > 100))
                  }
                  onClick={() =>
                    l.editBuff(unit.id, id, turns, false, {
                      casterId,
                      procChance,
                      roll,
                      ignoreResistance,
                    })
                  }
                >
                  <img src={asset(`data/buff-icons/${id}.png`)} alt="" />
                  <span>
                    <b>{b.name}</b>
                    <small>{b.description}</small>
                  </span>
                </button>
              ))}
          </div>
        </section>
      ))}
      <details className="skill-source-details">
        <summary>Other source debuffs · mechanics pending</summary>
        {DEBUFF_CATALOG.filter(
          (d) => !BUFFS[d._id] && !/random|class debuff/i.test(d.name),
        ).map((d) => (
          <div key={d._id}>
            <b>{d.name}</b>
            <p>{d.description}</p>
            <small>
              {PENDING_DEBUFF_REASONS[d._id] ||
                "Requires additional combat support."}
            </small>
          </div>
        ))}
      </details>
      <h3>Active effects</h3>
      <div className="active-buffs">
        {unit.buffs?.length ? (
          unit.buffs.map((b, index) => (
            <div key={b.instance || `${b.id}-${index}`}>
              <span>
                {BUFFS[b.id]?.name}
                {b.stacks > 1 ? ` ×${b.stacks}` : ""} ·{" "}
                {b.expiresAtGlobal !== undefined
                  ? `${effectRemaining(l.battle, b)} global turns`
                  : b.turns === null
                    ? "permanent"
                    : `${b.turns} turns`}
                {BUFFS[b.id]?.stackable
                  ? ` · ${b.source} · ATK ${Math.round(b.sourceAttack || 0)}`
                  : ""}
              </span>
              <button
                disabled={BUFFS[b.id]?.undispellable}
                aria-label={`Remove ${BUFFS[b.id]?.name}`}
                onClick={() => l.editBuff(unit.id, b.id, 2, true)}
              >
                {BUFFS[b.id]?.undispellable
                  ? "Undispellable"
                  : BUFFS[b.id]?.stackable
                    ? "Remove all of this type"
                    : "Remove"}
              </button>
            </div>
          ))
        ) : (
          <p className="fine">No effects on this hero.</p>
        )}
      </div>
      <p className="fine">
        Effects tick down at the end of the bearer’s turn, including Pass turn.
        A skill’s new buffs are applied after that tick. Speed changes preserve
        current CR. Proc chance and resistance can be rolled here after a
        successful hit. Ignore Resistance bypasses the 15% floor but not
        Immunity. DoTs tick at turn start; Bomb explodes at expiry and attempts
        a one-turn Stun. All changes can be undone after closing this panel.
      </p>
    </Modal>
  );
}
