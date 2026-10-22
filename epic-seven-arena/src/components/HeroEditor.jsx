import React, { useState } from "react";
import { useLab } from "../context.js";
import {
  FIELDS,
  SKILLS,
  clone,
  makeHero,
  presetStats,
} from "../engine/heroes.js";
import Modal from "./Modal.jsx";
export default function HeroEditor() {
  const l = useLab(),
    { side, slot } = l.editing,
    [draft, setDraft] = useState(() => clone(l.teams[side][slot]));
  const setStat = (key, value) =>
    setDraft((d) => ({ ...d, stats: { ...d.stats, [key]: Number(value) } }));
  return (
    <Modal id="editor" onDismiss={() => l.setEditing(null)}>
      <form
        id="editForm"
        onSubmit={(e) => {
          e.preventDefault();
          l.saveHero(draft);
        }}
      >
        <div className="dialog-heading">
          <div>
            <span className="eyebrow">HERO WORKSHOP</span>
            <h2>Fine-tune your build.</h2>
          </div>
          <button
            type="button"
            id="close"
            className="subtle"
            aria-label="Close editor"
            onClick={() => l.setEditing(null)}
          >
            ✕
          </button>
        </div>
        <label>
          Hero
          <select
            id="heroChoice"
            value={draft.name}
            onChange={(e) =>
              setDraft(makeHero(l.heroes, e.target.value, "base"))
            }
          >
            {Object.keys(l.heroes)
              .filter((n) => l.heroes[n].calculatedStatus)
              .sort()
              .map((n) => (
                <option key={n}>{n}</option>
              ))}
          </select>
        </label>
        <div className="preset-row">
          <span>Stat preset</span>
          {[
            ["base", "Base stats"],
            ["damage", "Damage dealer"],
            ["tank", "Bulky"],
            ["speed", "Fast support"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              data-preset={key}
              onClick={() =>
                setDraft((d) => ({
                  ...d,
                  stats: presetStats(l.heroes, d.name, key),
                }))
              }
            >
              {label}
            </button>
          ))}
        </div>
        <p className="fine">
          Presets are illustrative builds, not measured player averages.
        </p>
        <div className="stat-grid" id="statFields">
          {Object.entries(FIELDS).map(([key, [label, min, max]]) => (
            <label key={key}>
              {label}
              <input
                name={key}
                type="number"
                min={min}
                max={max}
                required
                value={draft.stats[key]}
                onChange={(e) => setStat(key, e.target.value)}
              />
            </label>
          ))}
        </div>
        <label>
          Artifact / notes
          <input
            id="artifact"
            placeholder="e.g. Tagehel’s Ancient Book +30"
            value={draft.artifact}
            onChange={(e) =>
              setDraft((d) => ({ ...d, artifact: e.target.value }))
            }
          />
        </label>
        <label>
          Starting artifact souls
          <input
            type="number"
            id="artifactSouls"
            min="0"
            max="99"
            required
            value={draft.artifactSouls}
            onChange={(e) =>
              setDraft((d) => ({ ...d, artifactSouls: Number(e.target.value) }))
            }
          />
        </label>
        <h3>
          Skill settings <small>Manual overrides</small>
        </h3>
        <div className="skill-settings" id="skillFields">
          {SKILLS.map((skill) => (
            <div className="skill-setting" key={skill}>
              <b>{skill}</b>
              {[
                ["gain", "Souls gained"],
                ["cost", "Soul cost"],
                ["cd", "Cooldown turns"],
              ].map(([key, label]) => (
                <label key={key}>
                  {label}
                  <input
                    id={`${skill}-${key}`}
                    type="number"
                    min="0"
                    max={key === "cd" ? 20 : 99}
                    required
                    value={draft.skills[skill][key]}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setDraft((d) => ({
                        ...d,
                        skills: {
                          ...d.skills,
                          [skill]: { ...d.skills[skill], [key]: value },
                        },
                      }));
                    }}
                  />
                </label>
              ))}
            </div>
          ))}
        </div>
        <p className="fine">
          Soul gain, cost and cooldown values are user settings; they are not
          provided by the dataset. S1 defaults to +1 soul; other skills default
          to 0. Triggered skills and passive effects require manual handling.
        </p>
        <div className="dialog-actions">
          <button
            type="button"
            id="emptySlot"
            className="subtle"
            onClick={() => l.moveToEmpty()}
          >
            Move to empty slot
          </button>
          <button className="primary" type="submit">
            Save hero →
          </button>
        </div>
      </form>
    </Modal>
  );
}
