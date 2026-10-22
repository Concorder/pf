import { changeBuff } from "./engine/buffs.js";
import { useState } from "react";
import { createBattle, executeAttack, setSouls } from "./engine/battle.js";
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
    attack: (skill, target, hit) =>
      setSession((s) => {
        const battle = executeAttack(heroes, s.battle, skill, target, hit);
        return battle === s.battle
          ? s
          : { battle, history: [...s.history, s.battle] };
      }),
    editBuff: (target, id, turns, remove) =>
      setSession((s) => {
        const battle = changeBuff(s.battle, target, id, turns, remove);
        return battle === s.battle
          ? s
          : { battle, history: [...s.history, s.battle] };
      }),
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
