import { equippedEE } from "../engine/progression.js";
import SelfSkillDialog from "./SelfSkillDialog.jsx";
import { isCermiaSelfSkill } from "../engine/mechanics.js";
import BuffDialog from "./BuffDialog.jsx";
import { BUFFS, effectiveStats } from "../engine/buffs.js";
import React, { useEffect, useRef, useState } from "react";
import { useLab, asset } from "../context.js";
import { teamName, SKILLS } from "../engine/heroes.js";
import { readiness, canUse, skillData } from "../engine/battle.js";
import Portrait from "./Portrait.jsx";
import HitDialog from "./HitDialog.jsx";
const POSITIONS = ["Back", "Upper", "Front", "Lower"];
function HeroUnit({ side, slot }) {
  const l = useLab(),
    h = l.teams[side][slot],
    unit = l.units.find((u) => u.side === side && u.slot === slot),
    pos = POSITIONS[slot];
  const targetable =
    unit &&
    l.active &&
    unit.side !== l.active.side &&
    unit.currentHp > 0 &&
    l.selectedSkill &&
    canUse(l.heroes, l.battle, l.active, l.selectedSkill);
  return (
    <button
      type="button"
      data-side={side}
      data-slot={slot}
      className={[
        "hero-card",
        !h && "empty-slot",
        unit?.currentHp <= 0 && "dead",
        unit?.id === l.battle?.active && "active-card",
        targetable && "targetable",
        unit?.id === l.pending?.targetId && "target-card",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={
        h
          ? `${h.name}, ${unit.currentHp} of ${h.stats.hp} health, ${teamName(side)}, ${pos.toLowerCase()} position`
          : `${teamName(side)} empty ${pos.toLowerCase()} position`
      }
      draggable={!!h && !l.battle}
      onDragStart={(e) => {
        e.dataTransfer.setData(
          "application/json",
          JSON.stringify({ side, slot }),
        );
      }}
      onDragOver={(e) => {
        if (!l.battle) e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        try {
          const from = JSON.parse(e.dataTransfer.getData("application/json"));
          l.moveHero(from, side, slot);
        } catch {}
      }}
      onClick={() => {
        if (!h)
          return l.toast(
            "Drag a hero here, or use “Move to empty slot” in their editor.",
          );
        if (!l.battle) l.openEditor(side, slot);
        else if (targetable || unit.side !== l.active?.side)
          l.chooseTarget(unit.id);
        else l.toast("Reset the battle to edit builds.");
      }}
    >
      {!h ? (
        <>
          <span className="slot-number">{pos.toUpperCase()}</span>
          <span className="plus">＋</span>
          <small>EMPTY POSITION</small>
        </>
      ) : (
        <>
          <div className="unit-status">
            <div className="unit-buffs">
              {(unit.buffs || []).map((b) => (
                <span
                  key={b.id}
                  className="buff-badge"
                  title={`${BUFFS[b.id]?.name} · ${b.turns === null ? "permanent" : `${b.turns} turns`} · ${BUFFS[b.id]?.description}`}
                >
                  <img
                    src={asset(`data/buff-icons/${b.id}.png`)}
                    alt={BUFFS[b.id]?.name}
                  />
                  <b>{b.turns ?? "∞"}</b>
                </span>
              ))}
            </div>
            <span className="unit-level">60</span>
            <div className="unit-bars">
              <div className="health">
                <span
                  style={{ width: `${(unit.currentHp / h.stats.hp) * 100}%` }}
                />
              </div>
              <div className="unit-cr">
                <span
                  style={{ width: `${readiness(unit, l.battle, l.units)}%` }}
                />
              </div>
            </div>
            <span className="hp-text">
              {unit.currentHp.toLocaleString()} / {h.stats.hp.toLocaleString()}
            </span>
          </div>
          <div className="unit-portrait-wrap">
            <Portrait className="portrait" name={h.name} />
            <span className="unit-shadow" />
            {unit.id === l.battle?.active && (
              <span className="active-indicator">▾</span>
            )}
          </div>
          <span className="hero-name">{h.name}</span>
          <span className="hero-role">
            {l.heroes[h.name].attribute} · {l.heroes[h.name].role}
          </span>
          <span className="position-tag">{pos.toUpperCase()}</span>
        </>
      )}
    </button>
  );
}
function ReadinessRail() {
  const l = useLab(),
    ref = useRef(null),
    [height, setHeight] = useState(240);
  useEffect(() => {
    const observer = new ResizeObserver(() =>
      setHeight(ref.current.clientHeight || 240),
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const live = l.units
      .filter((u) => u.currentHp > 0)
      .sort(
        (a, b) =>
          readiness(a, l.battle, l.units) - readiness(b, l.battle, l.units) ||
          a.stats.spd - b.stats.spd ||
          b.id.localeCompare(a.id),
      ),
    gap = Math.min(35, (height - 12) / Math.max(1, live.length - 1)),
    positions = [];
  live.forEach(
    (u, i) =>
      (positions[i] = Math.max(
        8 + (readiness(u, l.battle, l.units) / 100) * (height - 16),
        i ? positions[i - 1] + gap : 8,
      )),
  );
  if (positions.at(-1) > height - 8) {
    positions[positions.length - 1] = height - 8;
    for (let i = positions.length - 2; i >= 0; i--)
      positions[i] = Math.min(positions[i], positions[i + 1] - gap);
  }
  return (
    <aside className="readiness-panel" aria-label="Combat readiness">
      <span className="rail-title">CR</span>
      <span className="rail-top">0</span>
      <div className="readiness-track" id="turnOrder" ref={ref}>
        {live.map((u, i) => {
          const cr = Math.round(readiness(u, l.battle, l.units));
          return (
            <button
              key={u.id}
              className={`cr-marker ${u.side === "right" ? "enemy-marker" : ""} ${u.id === l.battle?.active ? "is-active" : ""}`}
              style={{ top: positions[i] }}
              aria-label={`${u.name}, ${teamName(u.side)}, ${cr}% combat readiness`}
              title={`${u.name} · ${cr}% CR`}
              onClick={() =>
                !l.battle ? l.openEditor(u.side, u.slot) : l.chooseTarget(u.id)
              }
            >
              <Portrait name={u.name} />
              <span className="cr-value">{cr}%</span>
            </button>
          );
        })}
      </div>
      <span className="rail-bottom">100</span>
    </aside>
  );
}
function ActiveHero() {
  const l = useLab(),
    u = l.preview;
  return (
    <div className="active-hero">
      <div className="active-portrait-wrap">
        <Portrait
          id="activePortrait"
          className="active-portrait"
          name={u.name}
        />
        <span className="portrait-level">60</span>
      </div>
      <div className="active-info">
        <span id="activeSide" className="eyebrow">
          {l.battle
            ? l.battle.winner
              ? `${teamName(l.battle.winner)} wins`
              : `${teamName(u.side)} · CURRENT TURN`
            : `${teamName(u.side)} · SELECTED HERO`}
        </span>
        <h2 id="activeName">{u.name}</h2>
        <div className="active-health">
          <span
            id="activeHealthFill"
            style={{ width: `${(u.currentHp / u.stats.hp) * 100}%` }}
          />
        </div>
        <div className="active-hp-line">
          <span id="activeHp">
            {u.currentHp.toLocaleString()} / {u.stats.hp.toLocaleString()}
          </span>
          <span id="activeSpeed">{Math.round(effectiveStats(u).spd)} SPD</span>
        </div>
        <button
          id="manageBuffs"
          className="hud-text-button"
          disabled={!l.active}
          onClick={() => l.setBuffTarget(l.active.id)}
        >
          ✦ Manage buffs
        </button>
        <button
          id="undo"
          className="hud-text-button"
          disabled={!l.history.length}
          onClick={l.undo}
        >
          ↶ Undo turn
        </button>
      </div>
    </div>
  );
}
function SkillIcon({ skill }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {skill === "S1" ? (
        <path d="M14 37L36 8l4-2-1 5-22 29-7 1 2-7M12 31l12 9M8 42l8-8" />
      ) : skill === "S2" ? (
        <>
          <path d="M24 5l15 6v12c0 9-8 15-15 20-7-5-15-11-15-20V11zM24 14v18M16 23h16" />
          <circle cx="24" cy="23" r="12" />
        </>
      ) : (
        <>
          <path d="M24 4l4 13 14-3-9 11 8 11-14-3-4 12-4-13-14 2 9-10-7-11 13 4z" />
          <circle cx="24" cy="24" r="6" />
        </>
      )}
    </svg>
  );
}
function SkillArtwork({ data, skill }) {
  const [attempt, setAttempt] = useState(0);
  useEffect(() => setAttempt(0), [data?.iconUrl]);
  const source =
    attempt === 0
      ? data?.iconUrl
      : attempt === 1 && data?.iconFile
        ? asset("data/skill-icons/" + encodeURIComponent(data.iconFile))
        : null;
  return source ? (
    <img
      className="skill-artwork"
      src={source}
      alt=""
      onError={() => setAttempt((n) => n + 1)}
    />
  ) : (
    <SkillIcon skill={skill} />
  );
}
function Skills() {
  const l = useLab(),
    u = l.active || l.preview,
    d = skillData(l.heroes, u, l.selectedSkill),
    settings = u.skills[l.selectedSkill];
  return (
    <div className="skill-station">
      <div className="skill-station-heading">
        <span className="eyebrow">
          SKILLS · MAX{equippedEE(l.heroes[u.name], u) ? " · EE EQUIPPED" : ""}
        </span>
        <button
          id="pass"
          className="hud-text-button"
          disabled={!l.active}
          onClick={() => l.attack("wait")}
        >
          Pass turn ⇥
        </button>
      </div>
      <div id="skills" className="skills">
        {SKILLS.map((s) => {
          const data = skillData(l.heroes, u, s),
            cd = l.active?.cooldowns[s] || 0;
          return (
            <button
              key={s}
              type="button"
              className={`skill-button ${l.selectedSkill === s ? "selected" : ""}`}
              aria-label={`${s}${cd ? `, ${cd} turns remaining` : ""}`}
              disabled={!canUse(l.heroes, l.battle, l.active, s)}
              title={
                data?.source
                  ? `${data.name} · ${isCermiaSelfSkill(l.heroes, u, s) ? "Self buff, S3 reset and extra turn" : data.passive ? "Passive" : data.damageSupport === "supported" ? "Damage supported" : data.supportReason}\n${data.description}\n${data.sourceText}`
                  : data?.rate
                    ? `${data.targets || 1} target(s) · ATK rate ${data.rate} · POW ${data.pow} · +${u.skills[s].gain} souls · cost ${u.skills[s].cost}${data.note ? " · " + data.note : ""}`
                    : "Passive or unsupported action"
              }
              onClick={() => l.setSelectedSkill(s)}
            >
              <SkillArtwork data={data} skill={s} />
              <span className="skill-key">
                {s}
                {data?.passive
                  ? " · P"
                  : data?.damageSupport === "unsupported" &&
                      !isCermiaSelfSkill(l.heroes, u, s)
                    ? " · !"
                    : ""}
              </span>
              {cd > 0 && <span className="skill-cooldown">{cd}</span>}
            </button>
          );
        })}
      </div>
      <details className="skill-source-details">
        <summary>Skill data & support</summary>
        {SKILLS.map((s) => {
          const data = skillData(l.heroes, u, s);
          return (
            <div key={s}>
              <b>
                {s} · {data?.name || "Unknown skill"}
              </b>
              <span>
                {isCermiaSelfSkill(l.heroes, u, s)
                  ? "Self buff + cooldown reset + extra turn implemented"
                  : data?.passive
                    ? l.heroes[u.name].code === "c2007" && s === "S2"
                      ? "EE opening buff: 2 turns when equipped; revive and Focus pending"
                      : "Passive — triggers not automated"
                    : data?.damageSupport === "supported"
                      ? "Base damage supported"
                      : data?.supportReason || "Source data unavailable"}
              </span>
              <p>
                MAX +{data?.enhancementLevel || 0} · damage +
                {Math.round((data?.enhancementDamage || 0) * 100)}%
                {data?.eeDamage
                  ? ` · EE damage +${Math.round(data.eeDamage * 100)}%`
                  : ""}
              </p>
              {data?.equipmentEffect && (
                <p>
                  EE: {data.equipmentEffect.description}
                  <br />
                  {data.equipmentEffect.reason}
                </p>
              )}
              <p>{data?.description}</p>
              <small>{data?.note}</small>
              <pre>{data?.sourceText}</pre>
            </div>
          );
        })}
      </details>
      <div id="skillSummary" className="skill-summary">
        {!l.active
          ? l.battle?.winner
            ? "Reset to try another matchup"
            : "Start the battle to use skills"
          : isCermiaSelfSkill(l.heroes, u, l.selectedSkill)
            ? `S2 · self buff · +${settings?.gain || 0} souls · extra turn`
            : d && settings
              ? `${l.selectedSkill} · click an enemy · ${d.targets || 1} target${d.targets > 1 ? "s" : ""} · +${settings.gain} souls`
              : "Select a skill, then click an enemy"}
      </div>
    </div>
  );
}
export default function Arena() {
  const l = useLab();
  return (
    <section
      className={`arena ${l.battle ? "in-battle" : ""}`}
      id="arena"
      ref={l.arenaRef}
      aria-label="Battle arena"
    >
      <div className="scene" id="scene">
        <div className="scene-vignette" />
        <div className="arena-top">
          <span>
            <i className="live-dot" />
            <span id="status">
              {l.battle
                ? l.battle.winner
                  ? `${teamName(l.battle.winner).toUpperCase()} WINS`
                  : "BATTLE IN PROGRESS"
                : "PREPARING THE ARENA"}
            </span>
          </span>
          <span className="round-badge" id="round">
            {l.battle
              ? `TURN ${l.battle.turn} · ${l.units.filter((u) => u.currentHp > 0).length} HEROES STANDING`
              : "3 V 3 · FORMATION"}
          </span>
          <button
            id="fullscreen"
            className="scene-button"
            aria-label="Toggle arena fullscreen"
            onClick={l.fullscreen}
          >
            ⛶
          </button>
        </div>
        <ReadinessRail />
        {["left", "right"].map((side) => (
          <div
            key={side}
            className={`side-label ${side === "left" ? "ally-label" : "enemy-label"}`}
          >
            <span className="side-dot" />
            {teamName(side).toUpperCase()}
            <button
              data-edit={side}
              aria-label={`Edit ${teamName(side).toLowerCase()}`}
              onClick={() =>
                l.openEditor(side, l.teams[side].findIndex(Boolean))
              }
            >
              ✎
            </button>
          </div>
        ))}
        <div className="teams">
          <section className="team ally" aria-label="Your team formation">
            <div className="formation" id="left">
              {[0, 1, 2, 3].map((slot) => (
                <HeroUnit key={slot} side="left" slot={slot} />
              ))}
            </div>
          </section>
          <div className="center-mark" aria-hidden="true">
            VS
          </div>
          <section className="team enemy" aria-label="Opponent formation">
            <div className="formation" id="right">
              {[0, 1, 2, 3].map((slot) => (
                <HeroUnit key={slot} side="right" slot={slot} />
              ))}
            </div>
          </section>
        </div>
        <ActiveHero />
        <Skills />
      </div>
      {l.pending &&
        (l.pending.kind === "self" ? <SelfSkillDialog /> : <HitDialog />)}
      {l.buffTarget && <BuffDialog />}
      <section
        id="battleControls"
        className="battle-hud"
        aria-label="Battle controls"
      >
        <div className="soul-station">
          <span className="eyebrow">TEAM SOULS</span>
          <div className="soul-pools">
            {["left", "right"].map((side, i) => (
              <React.Fragment key={side}>
                {i > 0 && <span className="soul-divider" />}
                <label className="souls">
                  <span className="orb" />
                  <span className="soul-value">
                    <input
                      id={`souls-${side}`}
                      aria-label={`${teamName(side)} souls`}
                      type="number"
                      min="0"
                      max="99"
                      value={(l.battle?.souls || l.souls)[side]}
                      onChange={(e) => l.editSouls(side, e.target.value)}
                    />
                    <span>{teamName(side).toUpperCase()}</span>
                  </span>
                </label>
              </React.Fragment>
            ))}
          </div>
          <span className="soul-note">Click a number to adjust</span>
        </div>
        <div className="action-guide">
          <span className="eyebrow">PLAY YOUR NEXT MOVE</span>
          <div>
            <span>
              01 <b>Select a skill</b>
            </span>
            <span>
              02 <b>Click an enemy</b>
            </span>
            <span>
              03 <b>Choose the hit</b>
            </span>
          </div>
        </div>
      </section>
    </section>
  );
}
