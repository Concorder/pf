import { syncTeamDefaults } from "../data/cecilia.js";
import { equippedEE } from "../engine/progression.js";
import React, { useState, useRef } from "react";
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
  const selection = useRef(0);
  const [loading, setLoading] = useState(false);
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
            onChange={async (e) => {
              const name = e.target.value,
                request = ++selection.current;
              setDraft(
                makeHero(
                  l.heroes,
                  name,
                  l.heroes[name].calculatedStatus ? "base" : "damage",
                ),
              );
              setLoading(true);
              const catalog = await l.ensureHero(name);
              if (selection.current === request) {
                setDraft(
                  makeHero(
                    catalog,
                    name,
                    catalog[name].calculatedStatus ? "base" : "damage",
                  ),
                );
                setLoading(false);
              }
            }}
          >
            {Object.keys(l.heroes)

              .sort()
              .map((n) => (
                <option key={n}>{n}</option>
              ))}
          </select>
        </label>
        <div className="progression-summary">
          <b>All skills: MAX enhancements</b>
          <span>
            Damage bonuses, cooldown reductions and soul gains use all
            enhancement levels. Unimplemented trigger/healing effects remain
            marked as pending.
          </span>
        </div>
        {l.heroes[draft.name].exclusiveEquipment ? (
          <section className="ee-editor">
            <label className="ee-toggle">
              <input
                id="eeEnabled"
                type="checkbox"
                checked={draft.eeEnabled !== false}
                onChange={(e) => {
                  const enabled = e.target.checked;
                  setDraft(
                    (d) =>
                      syncTeamDefaults(
                        { team: [{ ...d, eeEnabled: enabled }] },
                        l.heroes,
                      ).team[0],
                  );
                }}
              />
              Equip {l.heroes[draft.name].exclusiveEquipment.name}
            </label>
            {draft.eeEnabled !== false && (
              <>
                <label>
                  EE skill effect
                  <select
                    id="eeOption"
                    value={
                      draft.eeOption ??
                      l.heroes[draft.name].exclusiveEquipment.options[0].index
                    }
                    onChange={(e) => {
                      const index = Number(e.target.value);
                      setDraft(
                        (d) =>
                          syncTeamDefaults(
                            { team: [{ ...d, eeOption: index }] },
                            l.heroes,
                          ).team[0],
                      );
                    }}
                  >
                    {l.heroes[draft.name].exclusiveEquipment.options.map(
                      (o) => (
                        <option key={o.index} value={o.index}>
                          Option {o.index + 1} · {o.skill}
                        </option>
                      ),
                    )}
                  </select>
                </label>
                <p className="fine">
                  {equippedEE(l.heroes[draft.name], draft)?.option.description}
                </p>
                <p className="fine">
                  {equippedEE(l.heroes[draft.name], draft)?.option.reason}
                </p>
                <p className="fine">
                  Entered stats are final combat totals, including EE stats. The
                  EE stat is not added a second time.
                </p>
              </>
            )}
          </section>
        ) : (
          ["light", "dark"].includes(l.heroes[draft.name].attribute) && (
            <p className="fine">
              No Exclusive Equipment is available in the current source data for
              this hero.
            </p>
          )
        )}
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
              disabled={
                loading ||
                (key === "base" && !l.heroes[draft.name].calculatedStatus)
              }
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
        {!l.heroes[draft.name].calculatedStatus && (
          <p className="fine">
            Base stats are unavailable for this hero. Enter stats manually or
            use an illustrative preset.
          </p>
        )}
        {loading && <p role="status">Fetching hero details…</p>}
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
          Soul gains and cooldowns start from CeciliaBot’s awakened, fully
          enhanced skills. You can override them here. Soulburn, passive
          triggers and secondary effects are not automated. Base combat stats
          currently use the bundled Fribbels cache; presets are illustrative
          builds.
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
          <button className="primary" type="submit" disabled={loading}>
            Save hero →
          </button>
        </div>
      </form>
    </Modal>
  );
}
