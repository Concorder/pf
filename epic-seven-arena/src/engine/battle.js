import { SIDES, SKILLS, clone, roster, teamName } from "./heroes.js";
export const activeUnit = (battle) =>
  battle?.units.find((u) => u.id === battle.active);
export const skillData = (heroes, u, s) => heroes[u.name].skills?.[s];
export function canUse(heroes, battle, u, s) {
  if (!u || !battle || battle.winner) return false;
  if (s === "wait") return true;
  const d = skillData(heroes, u, s);
  return (
    !!d &&
    !d.passive &&
    (!d.damageSupport || d.damageSupport === "supported") &&
    Number.isFinite(d.rate) &&
    d.rate > 0 &&
    Number.isFinite(d.pow) &&
    d.pow > 0 &&
    !u.cooldowns[s] &&
    battle.souls[u.side] >= u.skills[s].cost
  );
}
export function readiness(unit, battle, units) {
  if (unit.currentHp <= 0) return 0;
  if (!battle)
    return (unit.stats.spd / Math.max(...units.map((u) => u.stats.spd))) * 100;
  return Math.min(
    100,
    Math.max(0, 100 - ((unit.readyAt - battle.time) * unit.stats.spd) / 100),
  );
}
function log(battle, message, details = "") {
  battle.log.unshift({ message, details, turn: battle.turn });
}
function nextTurn(battle) {
  const live = battle.units.filter((u) => u.currentHp > 0),
    lost = SIDES.find((s) => !live.some((u) => u.side === s));
  if (lost) {
    battle.winner = lost === "left" ? "right" : "left";
    battle.active = null;
    log(
      battle,
      `${teamName(battle.winner)} wins.`,
      "Reset to try a different matchup.",
    );
    return;
  }
  const next = [...live].sort(
    (a, b) =>
      a.readyAt - b.readyAt ||
      b.stats.spd - a.stats.spd ||
      a.id.localeCompare(b.id),
  )[0];
  battle.active = next.id;
  battle.time = next.readyAt;
  battle.turn++;
  for (const s of SKILLS)
    next.cooldowns[s] = Math.max(0, next.cooldowns[s] - 1);
}
export const clampSouls = (value) =>
  Math.min(99, Math.max(0, Math.floor(Number(value) || 0)));
export function createBattle(teams, souls) {
  const units = clone(roster(teams));
  for (const u of units) {
    u.readyAt = 10000 / u.stats.spd;
    u.cooldowns = { S1: 0, S2: 0, S3: 0 };
  }
  const battle = {
    units,
    turn: 0,
    time: 0,
    active: null,
    log: [],
    winner: null,
    souls: {},
    initialSouls: Object.fromEntries(
      SIDES.map((side) => [side, clampSouls(souls[side])]),
    ),
  };
  for (const side of SIDES)
    battle.souls[side] = clampSouls(
      battle.initialSouls[side] +
        units
          .filter((u) => u.side === side)
          .reduce((sum, u) => sum + u.artifactSouls, 0),
    );
  log(
    battle,
    "The battle begins.",
    "Starting souls include each hero’s configured artifact contribution. No automatic passive or artifact effects.",
  );
  nextTurn(battle);
  return battle;
}
export function setSouls(previous, side, value) {
  const battle = clone(previous);
  battle.souls[side] = clampSouls(value);
  log(
    battle,
    `${teamName(side)} souls set to ${battle.souls[side]}.`,
    "Manual adjustment",
  );
  return battle;
}
export function damage(attacker, defender, d, hit) {
  const a = attacker.stats,
    t = defender.stats;
  const attack = a.atk * d.rate * (1 + a.spd * (d.selfSpdScaling || 0));
  const scaling =
    a.hp * (d.selfHpScaling || 0) +
    a.def * (d.selfDefScaling || 0) +
    t.hp * (d.targetHpScaling || 0);
  const penetration = Math.max(0, Math.min(1, d.penetration || 0));
  const hitMultiplier =
    hit === "crit"
      ? a.chd / 100
      : hit === "miss"
        ? 0.75
        : hit === "crushing"
          ? 1.3
          : 1;
  return Math.max(
    0,
    Math.floor(
      ((attack + scaling) * 1.871 * d.pow * hitMultiplier) /
        (1 + (t.def * (1 - penetration)) / 300),
    ),
  );
}
export function affectedTargets(battle, u, target, d) {
  const enemies = battle.units.filter(
    (t) => t.currentHp > 0 && t.side !== u.side,
  );
  return [target, ...enemies.filter((t) => t.id !== target.id)].slice(
    0,
    Math.max(1, d.targets || 1),
  );
}

export function executeAttack(
  heroes,
  previous,
  skill,
  targetId = null,
  hit = "normal",
) {
  const actor = activeUnit(previous);
  if (!canUse(heroes, previous, actor, skill)) return previous;
  const originalTarget = previous.units.find(
    (t) => t.id === targetId && t.currentHp > 0 && t.side !== actor.side,
  );
  if (
    skill !== "wait" &&
    (!originalTarget ||
      !(
        skillData(heroes, actor, skill).hitTypes?.includes(hit) ??
        hit === "normal"
      ))
  )
    return previous;
  const battle = clone(previous),
    u = activeUnit(battle);
  if (skill === "wait")
    log(battle, `${u.name} passes.`, `${teamName(u.side)} · no souls gained`);
  else {
    const d = skillData(heroes, u, skill),
      target = battle.units.find((t) => t.id === targetId),
      targets = affectedTargets(battle, u, target, d),
      results = [];
    for (const t of targets) {
      const amount = damage(u, t, d, hit);
      t.currentHp = Math.max(0, t.currentHp - amount);
      results.push(
        `${t.name}: ${amount.toLocaleString()} damage${t.currentHp === 0 ? " · defeated" : ""}`,
      );
    }
    battle.souls[u.side] = clampSouls(
      battle.souls[u.side] - u.skills[skill].cost + u.skills[skill].gain,
    );
    u.cooldowns[skill] = u.skills[skill].cd + 1;
    log(
      battle,
      `${u.name} uses ${skill}. ${results.join(" / ")}`,
      `${teamName(u.side)} · ${hit} hit · +${u.skills[skill].gain} / −${u.skills[skill].cost} souls · simplified damage${d.note ? " · source note: " + d.note : ""}`,
    );
  }
  u.readyAt = battle.time + 10000 / u.stats.spd;
  nextTurn(battle);
  return battle;
}
