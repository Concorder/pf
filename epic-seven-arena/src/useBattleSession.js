import { changeBuff } from "./engine/buffs.js";
import { useState } from "react";
import {
  createBattle,
  executeAttack,
  setSouls,
  changeCombatReadiness,
  resumeStalledBattle,
} from "./engine/battle.js";
export default function useBattleSession(heroes) {
  const [session, setSession] = useState({ battle: null, history: [] });
  return {
    ...session,
    start: (teams, souls) =>
      setSession({ battle: createBattle(teams, souls, heroes), history: [] }),
    reset: () => setSession({ battle: null, history: [] }),
    undo: () =>
      setSession((s) =>
        s.history.length
          ? { battle: s.history.at(-1), history: s.history.slice(0, -1) }
          : s,
      ),
    attack: (skill, target, hit = "auto", options = {}) => {
      // Replaying a React updater must produce the same rolls.
      const seed = Math.floor(Math.random() * 0x100000000);
      setSession((s) => {
        let state = seed;
        const random = () => {
          state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
          return state / 0x100000000;
        };
        const battle = executeAttack(
          heroes,
          s.battle,
          skill,
          target,
          hit,
          random,
          options,
        );
        return battle === s.battle
          ? s
          : { battle, history: [...s.history, s.battle] };
      });
    },
    editBuff: (target, id, turns, remove, options = {}) => {
      const seed = Math.floor(Math.random() * 0x100000000);
      setSession((s) => {
        let state = seed;
        const random = () => {
          state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
          return state / 0x100000000;
        };
        const battle = changeBuff(
          s.battle,
          target,
          id,
          turns,
          remove,
          options,
          random,
        );
        if (battle !== s.battle) resumeStalledBattle(heroes, battle, random);
        return battle === s.battle
          ? s
          : { battle, history: [...s.history, s.battle] };
      });
    },
    editReadiness: (target, amount) => {
      const seed = Math.floor(Math.random() * 0x100000000);
      setSession((s) => {
        let state = seed;
        const random = () => {
          state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
          return state / 0x100000000;
        };
        const battle = changeCombatReadiness(
          heroes,
          s.battle,
          target,
          amount,
          random,
        );
        return battle === s.battle
          ? s
          : { battle, history: [...s.history, s.battle] };
      });
    },
    editSouls: (side, value) =>
      setSession((s) =>
        s.battle
          ? {
              battle: setSouls(s.battle, side, value),
              history: [...s.history, s.battle],
            }
          : s,
      ),
  };
}
