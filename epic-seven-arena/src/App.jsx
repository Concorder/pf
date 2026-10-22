import { isCermiaSelfSkill } from "./engine/mechanics.js";
import React, { useEffect, useRef, useState } from "react";
import { LabContext, asset } from "./context.js";
import { clone, defaultTeams, validTeams, roster } from "./engine/heroes.js";
import { activeUnit, canUse, clampSouls } from "./engine/battle.js";
import useBattleSession from "./useBattleSession.js";
import Arena from "./components/Arena.jsx";
import HeroEditor from "./components/HeroEditor.jsx";
import Timeline from "./components/Timeline.jsx";
import { loadSources, refreshSource } from "./data/sourceService.js";
import { createCatalog, syncTeamDefaults } from "./data/cecilia.js";
const STORAGE_KEY = "e7-lab-builds-v1";
export default function App() {
  const [heroes, setHeroes] = useState(null),
    [teams, setTeams] = useState(null),
    [sourceInfo, setSourceInfo] = useState(null),
    [refreshing, setRefreshing] = useState(false),
    [error, setError] = useState(""),
    [souls, setStartingSouls] = useState({ left: 0, right: 0 }),
    [selectedSkill, setSelectedSkill] = useState(null),
    [pending, setPending] = useState(null),
    [buffTarget, setBuffTarget] = useState(null),
    [editing, setEditing] = useState(null),
    [inspected, setInspected] = useState(null),
    [message, setMessage] = useState("");
  const sourceRef = useRef(null),
    battleRef = useRef(null),
    refreshController = useRef(null),
    attemptRef = useRef(false),
    busyRef = useRef(false);
  const arenaRef = useRef(null),
    session = useBattleSession(heroes),
    { battle, history } = session;
  battleRef.current = battle;
  useEffect(() => {
    const controller = new AbortController();
    loadSources(import.meta.env.BASE_URL, controller.signal)
      .then((data) => {
        let saved;
        try {
          saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        } catch {}
        sourceRef.current = data;
        setHeroes(data.heroes);
        setTeams(
          syncTeamDefaults(
            validTeams(saved, data.heroes) ? saved : defaultTeams(data.heroes),
            data.heroes,
          ),
        );
        setSourceInfo({ mode: data.mode, checkedAt: data.checkedAt });
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      });
    return () => controller.abort();
  }, []);
  busyRef.current = !!battle || !!editing || !!pending;
  async function refreshData(force = false, names = null) {
    if (!sourceRef.current || busyRef.current || refreshing) return null;
    const controller = new AbortController();
    refreshController.current = controller;
    setRefreshing(true);
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const wanted =
        names ||
        Object.values(teams)
          .flat()
          .filter(Boolean)
          .map((h) => heroes[h.name]?.sourceName || h.name);
      const result = await refreshSource(
        sourceRef.current.snapshot,
        [...new Set(wanted)],
        { signal: controller.signal, force },
      );
      if (controller.signal.aborted || busyRef.current) return null;
      sourceRef.current.snapshot = {
        ...sourceRef.current.snapshot,
        heroes: result.records,
      };
      if (battleRef.current) return heroes;
      const catalog = createCatalog(sourceRef.current.baseline, result.records);
      setHeroes(catalog);
      setTeams((t) => syncTeamDefaults(t, catalog));
      setSourceInfo({ mode: result.mode, checkedAt: result.checkedAt });
      return catalog;
    } catch (e) {
      if (!busyRef.current) setSourceInfo((i) => ({ ...i, mode: "offline" }));
      return null;
    } finally {
      clearTimeout(timer);
      if (refreshController.current === controller) setRefreshing(false);
    }
  }
  useEffect(() => {
    if (teams && !attemptRef.current) {
      attemptRef.current = true;
      refreshData();
    }
  }, [teams]);
  useEffect(() => {
    if (battle || editing || pending) refreshController.current?.abort();
  }, [battle, editing, pending]);
  useEffect(() => () => refreshController.current?.abort(), []);
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
  async function ensureHero(name) {
    if (battleRef.current) return heroes;
    try {
      const result = await refreshSource(
        sourceRef.current.snapshot,
        [heroes[name]?.sourceName || name],
        {
          force: false,
          signal: AbortSignal.timeout(12000),
        },
      );
      if (battleRef.current) return heroes;
      const catalog = createCatalog(sourceRef.current.baseline, result.records);
      sourceRef.current.snapshot = {
        ...sourceRef.current.snapshot,
        heroes: result.records,
      };
      setHeroes(catalog);
      setSourceInfo({ mode: result.mode, checkedAt: result.checkedAt });
      return catalog;
    } catch {
      toast("Hero details unavailable. Try again when the API is reachable.");
      return heroes;
    }
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
  function chooseSkill(skill) {
    setSelectedSkill(skill);
    if (
      active &&
      canUse(heroes, battle, active, skill) &&
      isCermiaSelfSkill(heroes, active, skill)
    )
      setPending({
        kind: "self",
        actorId: active.id,
        targetId: active.id,
        skill,
        turn: battle.turn,
      });
  }
  function chooseTarget(targetId) {
    if (active && isCermiaSelfSkill(heroes, active, selectedSkill))
      return chooseSkill(selectedSkill);
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
    setBuffTarget(null);
    session.reset();
    setPending(null);
    setSelectedSkill(null);
    toast("Battle reset. Your builds are kept.");
  }
  function undo() {
    setBuffTarget(null);
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
    buffTarget,
    setBuffTarget,
    editBuff: session.editBuff,
    ensureHero,
    teams,
    units,
    battle,
    history,
    active,
    preview,
    souls,
    selectedSkill,
    setSelectedSkill: chooseSkill,
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
          "--arena-background": battle
            ? `url("${new URL(asset("assets/frozen-courtyard.png"), document.baseURI).href}")`
            : "none",
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
                  busyRef.current = true;
                  refreshController.current?.abort();
                  session.start(teams, souls);
                  setSelectedSkill(null);
                }}
              >
                Start battle →
              </button>
            </div>
          </div>
          <div className="data-status" role="status">
            <span>
              CeciliaBot ·{" "}
              {sourceInfo?.mode === "live"
                ? "API refreshed"
                : sourceInfo?.mode === "cache"
                  ? "cached API data"
                  : sourceInfo?.mode === "partial"
                    ? "partial refresh, fallback retained"
                    : sourceInfo?.mode === "offline"
                      ? "API unavailable, using saved data"
                      : "bundled API snapshot"}
              {sourceInfo?.checkedAt
                ? " · checked " +
                  new Date(sourceInfo.checkedAt).toLocaleDateString()
                : ""}
            </span>
            <button
              onClick={() => refreshData(true)}
              disabled={refreshing || !!battle || !!editing}
            >
              {refreshing ? "Refreshing…" : "Refresh data"}
            </button>
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
            Implemented: common stat buffs, Ras S3 and Mercedes S3 team buffs,
            Cermia S2 self-buff/reset/extra turn, and Arbiter Vildred’s opening
            Archdemon’s Might. Evasion and critical outcomes remain manual.
            Revival, Focus, other passives, debuffs, counters and artifact
            effects remain unsupported.
          </p>
          <footer>
            <span>BUILT FOR THE NEXT “WHAT IF?”</span>
            <span>
              Skill data:{" "}
              <a
                href="https://ceciliabot.github.io/#/hero/"
                target="_blank"
                rel="noreferrer"
              >
                CeciliaBot ↗
              </a>{" "}
              · Base stats:{" "}
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
