import React, { useEffect, useRef, useState } from "react";
import { LabContext, asset } from "./context.js";
import { clone, defaultTeams, validTeams, roster } from "./engine/heroes.js";
import { activeUnit, canUse, clampSouls } from "./engine/battle.js";
import useBattleSession from "./useBattleSession.js";
import Arena from "./components/Arena.jsx";
import HeroEditor from "./components/HeroEditor.jsx";
import Timeline from "./components/Timeline.jsx";
const STORAGE_KEY = "e7-lab-builds-v1";
export default function App() {
  const [heroes, setHeroes] = useState(null),
    [teams, setTeams] = useState(null),
    [error, setError] = useState(""),
    [souls, setStartingSouls] = useState({ left: 0, right: 0 }),
    [selectedSkill, setSelectedSkill] = useState(null),
    [pending, setPending] = useState(null),
    [editing, setEditing] = useState(null),
    [inspected, setInspected] = useState(null),
    [message, setMessage] = useState("");
  const arenaRef = useRef(null),
    session = useBattleSession(heroes),
    { battle, history } = session;
  useEffect(() => {
    const controller = new AbortController();
    fetch(asset("data/heroes.json"), { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        let saved;
        try {
          saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        } catch {}
        setHeroes(data);
        setTeams(validTeams(saved, data) ? saved : defaultTeams(data));
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (!teams) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
    } catch {
      setMessage(
        "Browser storage unavailable. Builds will last for this session.",
      );
    }
  }, [teams]);
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3500);
    return () => clearTimeout(timer);
  }, [message]);
  const toast = (text) => setMessage(text),
    units = battle?.units || (teams ? roster(teams) : []),
    active = activeUnit(battle),
    preview =
      active ||
      units.find((u) => u.id === inspected) ||
      units.find((u) => u.currentHp > 0) ||
      units[0];
  function openEditor(side, slot) {
    if (battle) return toast("Reset the battle to edit teams.");
    setInspected(`${side}-${slot}`);
    setEditing({ side, slot });
  }
  function saveHero(draft) {
    const { side, slot } = editing;
    if (teams[side].some((h, i) => h && i !== slot && h.name === draft.name))
      return toast(
        "Choose a different hero. Each team needs three unique heroes.",
      );
    const next = clone(teams);
    next[side][slot] = { ...draft, artifact: draft.artifact.trim() };
    if (!validTeams(next, heroes))
      return toast("Please enter valid build values.");
    setTeams(next);
    setEditing(null);
    toast("Hero build saved.");
  }
  function moveHero(from, side, slot) {
    if (
      battle ||
      from.side !== side ||
      !Number.isInteger(from.slot) ||
      from.slot < 0 ||
      from.slot > 3
    )
      return;
    setTeams((previous) => {
      const next = clone(previous);
      [next[side][slot], next[side][from.slot]] = [
        next[side][from.slot],
        next[side][slot],
      ];
      return next;
    });
  }
  function moveToEmpty() {
    const { side, slot } = editing,
      empty = teams[side].indexOf(null);
    if (empty < 0) return;
    moveHero({ side, slot }, side, empty);
    setInspected(`${side}-${empty}`);
    setEditing(null);
  }
  function chooseTarget(targetId) {
    if (!active) return;
    if (!selectedSkill || !canUse(heroes, battle, active, selectedSkill))
      return toast("Select an available skill first.");
    const target = units.find(
      (u) => u.id === targetId && u.currentHp > 0 && u.side !== active.side,
    );
    if (target)
      setPending({
        actorId: active.id,
        targetId,
        skill: selectedSkill,
        turn: battle.turn,
      });
  }
  function attack(skill, targetId, hit) {
    session.attack(skill, targetId, hit);
    setPending(null);
    setSelectedSkill(null);
  }
  function resolveHit(hit) {
    if (
      pending &&
      active?.id === pending.actorId &&
      battle.turn === pending.turn
    )
      attack(pending.skill, pending.targetId, hit);
    else setPending(null);
  }
  function reset() {
    if (battle) setStartingSouls(battle.initialSouls);
    session.reset();
    setPending(null);
    setSelectedSkill(null);
    toast("Battle reset. Your builds are kept.");
  }
  function undo() {
    session.undo();
    setSelectedSkill(null);
    setPending(null);
  }
  function editSouls(side, value) {
    if (battle) session.editSouls(side, value);
    else setStartingSouls((s) => ({ ...s, [side]: clampSouls(value) }));
  }
  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await arenaRef.current.requestFullscreen();
    } catch {
      toast("Fullscreen is unavailable in this browser.");
    }
  }
  if (!heroes || !teams)
    return (
      <main>
        <h1>Epic Seven · Battle Lab</h1>
        <p role="status">
          {error
            ? `Hero data could not load: ${error}. Reload to retry.`
            : "Loading hero data…"}
        </p>
      </main>
    );
  const context = {
    heroes,
    teams,
    units,
    battle,
    history,
    active,
    preview,
    souls,
    selectedSkill,
    setSelectedSkill,
    pending,
    setPending,
    editing,
    setEditing,
    arenaRef,
    toast,
    openEditor,
    saveHero,
    moveHero,
    moveToEmpty,
    chooseTarget,
    attack,
    resolveHit,
    undo,
    editSouls,
    fullscreen,
  };
  return (
    <LabContext.Provider value={context}>
      <div
        style={{
          "--arena-background": `url("${asset("assets/frozen-courtyard.png")}")`,
        }}
      >
        <header>
          <a className="brand" href="./">
            <span className="brand-icon">✧</span> EPIC SEVEN{" "}
            <small>BATTLE LAB</small>
          </a>
          <span className="header-note">GUILD WAR · INTERACTIVE 3 V 3</span>
          <span className="prototype">DAMAGE SANDBOX</span>
        </header>
        <main>
          <div className="workspace-bar">
            <div>
              <div className="eyebrow">THE FROZEN COURTYARD</div>
              <h1>Play your next move.</h1>
            </div>
            <div className="toolbar-actions">
              <div className="tabs">
                <button
                  id="setupTab"
                  className={!battle ? "selected" : ""}
                  onClick={() =>
                    battle && toast("Use Reset battle to return to formation.")
                  }
                >
                  Formation
                </button>
                <button
                  id="battleTab"
                  className={battle ? "selected" : ""}
                  onClick={() =>
                    battle
                      ? arenaRef.current.scrollIntoView({ behavior: "smooth" })
                      : toast("Set up your teams, then click Start battle.")
                  }
                >
                  Battle
                </button>
              </div>
              <button id="reset" className="subtle" onClick={reset}>
                ↺ Reset
              </button>
              <button
                id="start"
                className="primary"
                disabled={!!battle}
                onClick={() => {
                  session.start(teams, souls);
                  setSelectedSkill(null);
                }}
              >
                Start battle →
              </button>
            </div>
          </div>
          <Arena />
          <div className="below-arena">
            <div className="arena-help">
              <span className="help-icon">◇</span>
              <p>
                <b>Three heroes. Four positions.</b> Back, upper, front and
                lower — mirrored for the opponent. Select an enemy avatar to
                target them during battle.
              </p>
            </div>
            <div className="scope-note">
              <span className="live-dot" /> MANUAL CONTROL · BOTH TEAMS
            </div>
          </div>
          <Timeline />
          <p className="fine scope-description">
            Prototype combat: simplified damage coefficients. Passives, buffs,
            counters, combat-readiness changes and artifact combat effects are
            not automated. Numeric source skills are not necessarily active
            abilities. Soul gains and cooldowns are manually configurable in the
            hero editor.
          </p>
          <footer>
            <span>BUILT FOR THE NEXT “WHAT IF?”</span>
            <span>
              Community data via{" "}
              <a
                href="https://github.com/fribbels/Fribbels-Epic-7-Optimizer"
                target="_blank"
                rel="noreferrer"
              >
                Fribbels ↗
              </a>{" "}
              · Unofficial fan project
            </span>
          </footer>
        </main>
        {editing && <HeroEditor key={`${editing.side}-${editing.slot}`} />}
        <div
          id="toast"
          role="status"
          style={{ display: message ? "block" : "none" }}
        >
          {message}
        </div>
      </div>
    </LabContext.Provider>
  );
}
