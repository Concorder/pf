import React from "react";
import { useLab } from "../context.js";
import { skillData } from "../engine/battle.js";
import { teamName, SKILLS } from "../engine/heroes.js";

function SoulBulb({ side, filled }) {
  return (
    <svg className={`soul-bulb ${filled ? "is-filled" : "is-empty"}`} viewBox="0 0 28 40" aria-hidden="true">
      <defs>
        <linearGradient id={`soul-glow-${side}`} x1="0" y1="0" x2="0.7" y2="1">
          <stop stopColor="#e8ffff" /><stop offset=".45" stopColor="#5ceaff" /><stop offset="1" stopColor="#4385ff" />
        </linearGradient>
      </defs>
      <path className="soul-flame" d="M19 2C8-1 5 7 10 12c4 4 11-1 8-5-2-2-5 0-3 2" />
      <path className="soul-vessel" d="M11 12h8l-1 7c1 3 6 5 6 10 0 5-5 9-11 9S3 35 3 30c0-6 6-9 7-12Z" fill={`url(#soul-glow-${side})`} />
      <path className="soul-heart" d="m14 23 6 5-7 6-6-5Z" />
      <path className="soul-neck" d="m9 17 10 1" />
    </svg>
  );
}

export default function SoulMeter({ side }) {
  const l = useLab(), value = (l.battle?.souls || l.souls)[side],
    tens = Math.floor(value / 10), ones = value % 10;
  const burnSkill = l.active?.side === side && !l.battle?.winner
    ? SKILLS.map(key => ({key, data: skillData(l.heroes, l.active, key)})).find(s => s.data?.soulburn)
    : null;
  const available = !!burnSkill && value >= burnSkill.data.soulburn.cost;
  const armed = available && l.soulburnSelection?.skill === burnSkill.key;
  return (
    <div className={`battlefield-soul-meter soul-meter-${side}`} data-side={side}
      role="group" aria-label={`${teamName(side)} soul meter`}>
      <div className="soulburn-slot">
        {available && <button type="button" className={`soulburn-button ${armed ? "is-armed" : "is-ready"}`}
          aria-label={armed ? "Cancel Soulburn preview" : "Preview Soulburn"} aria-pressed={armed}
          title={`${burnSkill.key} · ${burnSkill.data.soulburn.cost} souls · ${burnSkill.data.soulburn.description} · UI preview only; enhanced skill effect is not enabled yet.`}
          onClick={() => l.toggleSoulburn(burnSkill.key)}>
          <span className="soulburn-word">{armed ? "Cancel" : "Burn!"}</span>
          {armed ? <span className="soulburn-arrow">›</span> : <small>Tap to burn</small>}
        </button>}
        {available && armed && <span className="soulburn-preview-note">UI preview · {burnSkill.key} · {burnSkill.data.soulburn.cost} souls</span>}
      </div>
      <div className="soul-meter-heading">
        <label htmlFor={`souls-${side}`}>{side === "left" ? "YOUR SOULS" : "ENEMY SOULS"}</label>
        <input id={`souls-${side}`} aria-label={`${teamName(side)} souls`} type="number" min="0" max="99"
          value={value} onChange={(e) => l.editSouls(side, e.target.value)} title="Click to adjust souls" />
      </div>
      <div className="soul-bulbs" aria-hidden="true">
        {Array.from({length: Math.max(1, tens)}, (_, i) => <SoulBulb key={i} side={`${side}-${i}`} filled={i < tens} />)}
      </div>
      <div className="soul-segments" aria-hidden="true">
        {Array.from({length: 9}, (_, i) => <span key={i} className={`soul-segment ${i < ones ? "is-filled" : ""}`} />)}
      </div>
      <span className="sr-only">{tens} bulbs of ten souls and {ones} individual souls.</span>
    </div>
  );
}
