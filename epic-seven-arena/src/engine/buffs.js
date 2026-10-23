import { clone } from "./heroes.js";
export const hasBuff = (unit, id) =>
  (unit.buffs || []).some(
    (b) => b.id === id && (b.turns === null || b.turns > 0),
  );
export const DEBUFFS = {
  stic_att_dn: {
    name: "Attack Down",
    description: "Attack −50%",
    stat: "atk",
    amount: -0.5,
  },
  stic_def_dn: {
    name: "Defense Down",
    description: "Defense −70%",
    stat: "def",
    amount: -0.7,
  },
  stic_dodge_dn: {
    name: "Speed Down",
    description: "Speed −30%; preserves current CR",
    stat: "spd",
    amount: -0.3,
  },
  stic_blind: {
    name: "Decreased Hit Chance",
    description: "Hit chance −50%; increases automatic miss chance",
    stat: "hitChancePenalty",
    amount: 50,
  },
  stic_stun: {
    name: "Stun",
    description: "Cannot use skills. Pass to consume the stunned turn.",
  },
  stic_silence: {
    name: "Silence",
    description: "Cannot use skills with a cooldown.",
  },
  stic_buf_impossible: {
    name: "Unbuffable",
    description: "Cannot receive buffs; existing buffs remain.",
  },
};
for (const [id, def] of Object.entries(DEBUFFS))
  Object.assign(def, { debuff: true, icon: id });
export const BUFFS = {
  ...DEBUFFS,
  stic_demonpower_keep: {
    name: "Archdemon’s Might",
    description:
      "Undispellable: Evasion +70%; damage against Light +60%. Included in automatic hit rolls.",
    stat: "evasion",
    amount: 70,
    icon: "stic_demonpower_keep",
    permanent: false,
    undispellable: true,
    manual: false,
  },
  stic_att_up: {
    name: "Attack Up",
    description: "Attack +50%",
    stat: "atk",
    amount: 0.5,
    family: "attack",
    icon: "stic_att_up",
  },
  stic_att_up2: {
    name: "Greater Attack Up",
    description: "Attack +75%",
    stat: "atk",
    amount: 0.75,
    family: "attack",
    icon: "stic_att_up2",
  },
  stic_def_up: {
    name: "Defense Up",
    description: "Defense +60%",
    stat: "def",
    amount: 0.6,
    icon: "stic_def_up",
  },
  stic_speed_up: {
    name: "Speed Up",
    description: "Speed +30%; preserves current CR",
    stat: "spd",
    amount: 0.3,
    icon: "stic_speed_up",
  },
  stic_cri_up: {
    name: "Critical Chance Up",
    description:
      "Critical chance +50 percentage points",
    stat: "chc",
    amount: 50,
    icon: "stic_cri_up",
  },
  stic_cridmg_up: {
    name: "Critical Damage Up",
    description: "Critical damage +70 percentage points",
    stat: "chd",
    amount: 70,
    icon: "stic_cridmg_up",
  },
};
export function effectiveStats(unit) {
  const s = {
    ...unit.stats,
    evasion: unit.stats.evasion || 0,
    hitChancePenalty: 0,
  };
  const modifiers = {};
  for (const [id, def] of Object.entries(BUFFS)) {
    if (!hasBuff(unit, id)) continue;
    if (
      def.family &&
      (unit.buffs || []).some(
        (b) =>
          b.turns > 0 &&
          BUFFS[b.id]?.family === def.family &&
          BUFFS[b.id].amount > def.amount,
      )
    )
      continue;
    if (!def.stat) continue;
    if (["chc", "chd", "evasion", "hitChancePenalty"].includes(def.stat))
      s[def.stat] += def.amount;
    else modifiers[def.stat] = (modifiers[def.stat] || 0) + def.amount;
  }
  for (const [stat, amount] of Object.entries(modifiers))
    s[stat] *= Math.max(0.01, 1 + amount);
  s.evasion = Math.min(100, s.evasion);
  s.chc = Math.min(100, s.chc);
  s.chd = Math.min(350, s.chd);
  return s;
}
function preserveReadiness(battle, unit, oldSpeed) {
  const speed = effectiveStats(unit).spd;
  if (Number.isFinite(unit.readyAt) && speed !== oldSpeed)
    unit.readyAt =
      battle.time +
      (Math.max(0, unit.readyAt - battle.time) * oldSpeed) / speed;
}
export function grantBuff(battle, unit, id, turns, source = "manual") {
  const def = BUFFS[id];
  if (!def || unit.currentHp <= 0) return false;
  if (!def.debuff && !def.undispellable && hasBuff(unit, "stic_buf_impossible"))
    return false;
  const oldSpeed = effectiveStats(unit).spd;
  unit.buffs ||= [];
  if (def.family) {
    if (
      unit.buffs.some(
        (b) =>
          BUFFS[b.id]?.family === def.family && BUFFS[b.id].amount > def.amount,
      )
    )
      return false;
    unit.buffs = unit.buffs.filter(
      (b) => b.id === id || BUFFS[b.id]?.family !== def.family,
    );
  }
  const existing = unit.buffs.find((b) => b.id === id);
  if (existing) {
    existing.turns = def.permanent ? null : Math.max(existing.turns, turns);
    existing.source = source;
  } else unit.buffs.push({ id, turns: def.permanent ? null : turns, source });
  preserveReadiness(battle, unit, oldSpeed);
  return true;
}
export function expireBuffs(battle, unit) {
  const speed = effectiveStats(unit).spd,
    expired = [];
  unit.buffs = (unit.buffs || []).filter((b) => {
    if (b.turns === null) return true;
    b.turns--;
    if (b.turns <= 0) {
      expired.push(BUFFS[b.id]?.name || b.id);
      return false;
    }
    return true;
  });
  preserveReadiness(battle, unit, speed);
  return expired;
}
export function changeBuff(previous, targetId, id, turns = 2, remove = false) {
  if (
    !previous ||
    previous.winner ||
    !BUFFS[id] ||
    BUFFS[id].manual === false ||
    !Number.isInteger(turns) ||
    turns < 1 ||
    turns > 10
  )
    return previous;
  const battle = clone(previous),
    unit = battle.units.find((u) => u.id === targetId && u.currentHp > 0);
  if (!unit) return previous;
  const speed = effectiveStats(unit).spd;
  if (remove) {
    if (!(unit.buffs || []).some((b) => b.id === id)) return previous;
    unit.buffs = unit.buffs.filter((b) => b.id !== id);
    preserveReadiness(battle, unit, speed);
  } else if (!grantBuff(battle, unit, id, turns)) return previous;
  battle.log.unshift({
    message: `${unit.name}: ${BUFFS[id].name} ${remove ? "removed" : `applied / refreshed (${unit.buffs.find((b) => b.id === id).turns} turns)`}.`,
    details: "Manual effect change · no turn advanced",
    turn: battle.turn,
  });
  return battle;
}
// Explicitly reviewed skill grants; free-text descriptions are never executed.
export const SKILL_BUFFS = {
  c1001: { S3: [{ id: "stic_def_up", turns: 2, target: "allies" }] },
  c1005: { S3: [{ id: "stic_att_up", turns: 2, target: "allies" }] },
};
export function applySkillBuffs(battle, actor, code, skill, data) {
  const grants = SKILL_BUFFS[code]?.[skill] || [];
  for (const effect of grants.filter(
    (e) =>
      data?.buffRefs?.includes(e.id) &&
      /all allies/i.test(data.description) &&
      new RegExp(`for ${e.turns} turns?`, "i").test(data.description),
  ))
    for (const unit of battle.units.filter(
      (u) => u.side === actor.side && u.currentHp > 0,
    )) {
      if (
        grantBuff(
          battle,
          unit,
          effect.id,
          effect.turns,
          `${actor.name} ${skill}`,
        )
      )
        battle.log.unshift({
          message: `${unit.name} gains ${BUFFS[effect.id].name} (${effect.turns} turns).`,
          details: `${actor.name} ${skill}`,
          turn: battle.turn,
        });
    }
}
