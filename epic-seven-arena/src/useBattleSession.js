import {setUnitResource} from "./engine/resources.js";
import { newDamageEvents } from "./engine/damageEvents.js";
import { changeBuff, setSanctuaryOfBattle } from "./engine/buffs.js";
import { useState } from "react";
import {
  createBattle,
  executeAttack,
  setSouls,
  changeCombatReadiness,
  detonateEffects,
  resumeStalledBattle,
} from "./engine/battle.js";
export default function useBattleSession(heroes) {
  const [session, setSession] = useState({ battle: null, history: [], damageEvents: [] });
  return {
    ...session,
    start: (teams, souls) =>
      setSession({ battle: createBattle(teams, souls, heroes), history: [], damageEvents: [] }),
    reset: () => setSession({ battle: null, history: [], damageEvents: [] }),
    undo: () =>
      setSession((s) =>
        s.history.length
          ? { battle: s.history.at(-1), history: s.history.slice(0, -1), damageEvents: [] }
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
          : { battle, history: [...s.history, s.battle], damageEvents: newDamageEvents(s.battle, battle) };
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
          : { battle, history: [...s.history, s.battle], damageEvents: newDamageEvents(s.battle, battle) };
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
          : { battle, history: [...s.history, s.battle], damageEvents: newDamageEvents(s.battle, battle) };
      });
    },
    detonate: (target, id) => {
      const seed = Math.floor(Math.random() * 0x100000000);
      setSession((s) => {
        let state = seed;
        const random = () => {
          state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
          return state / 0x100000000;
        };
        const battle = detonateEffects(heroes, s.battle, target, id, random);
        return battle === s.battle
          ? s
          : { battle, history: [...s.history, s.battle], damageEvents: newDamageEvents(s.battle, battle) };
      });
    },
    setSanctuary: (enabled) => setSession((s) => {
      const battle = setSanctuaryOfBattle(s.battle, enabled);
      return battle === s.battle ? s : {battle, history: [...s.history, s.battle], damageEvents: []};
    }),
    editResource: (id, value) => setSession(s => {
      const battle = setUnitResource(s.battle, id, value);
      return battle === s.battle ? s : {battle, history: [...s.history, s.battle], damageEvents: []};
    }),
    editSouls: (side, value) =>
      setSession((s) =>
        s.battle
          ? {
              battle: setSouls(s.battle, side, value),
              history: [...s.history, s.battle],
              damageEvents: [],
            }
          : s,
      ),
  };
}
