export const SIDES = ["left", "right"];
export const SKILLS = ["S1", "S2", "S3"];
export const FIELDS = {
  hp: ["Health", 1, 100000],
  atk: ["Attack", 1, 20000],
  def: ["Defense", 0, 10000],
  spd: ["Speed", 1, 500],
  chc: ["Crit chance %", 0, 100],
  chd: ["Crit damage %", 100, 350],
  eff: ["Effectiveness %", 0, 500],
  efr: ["Resistance %", 0, 500],
};
export const clone = (value) => structuredClone(value);
export const teamName = (side) => (side === "left" ? "Your team" : "Opponent");
export function baseStats(heroes, name) {
  const d =
    heroes[name].calculatedStatus?.lv60SixStarFullyAwakened ||
    heroes[name].calculatedStatus?.lv50FiveStarFullyAwakened ||
    {};
  return {
    hp: d.hp || 5000,
    atk: d.atk || 1000,
    def: d.def || 500,
    spd: d.spd || 100,
    chc: Math.round((d.chc || 0.15) * 100),
    chd: Math.round((d.chd || 1.5) * 100),
    eff: Math.round((d.eff || 0) * 100),
    efr: Math.round((d.efr || 0) * 100),
  };
}
export function presetStats(heroes, name, preset) {
  const s = baseStats(heroes, name);
  if (preset === "damage")
    Object.assign(s, {
      hp: 12000,
      atk: 3500,
      def: 1000,
      spd: 200,
      chc: 100,
      chd: 280,
    });
  if (preset === "tank")
    Object.assign(s, {
      hp: 25000,
      atk: 1500,
      def: 1800,
      spd: 180,
      chc: 15,
      chd: 150,
    });
  if (preset === "speed")
    Object.assign(s, {
      hp: 17000,
      atk: 1800,
      def: 1300,
      spd: 270,
      chc: 15,
      chd: 150,
      eff: 100,
    });
  return s;
}
export function makeHero(heroes, name, preset = "damage") {
  return {
    name,
    stats: presetStats(heroes, name, preset),
    sourceDefaults: Object.fromEntries(
      SKILLS.map((s) => [
        s,
        {
          ...(heroes[name].skills?.[s]?.defaults || {
            gain: s === "S1" ? 1 : 0,
            cost: 0,
            cd: 0,
          }),
        },
      ]),
    ),
    artifact: "",
    artifactSouls: 0,
    skills: {
      S1: {
        ...(heroes[name].skills?.S1?.defaults || { gain: 1, cost: 0, cd: 0 }),
      },
      S2: {
        ...(heroes[name].skills?.S2?.defaults || { gain: 0, cost: 0, cd: 0 }),
      },
      S3: {
        ...(heroes[name].skills?.S3?.defaults || { gain: 0, cost: 0, cd: 0 }),
      },
    },
  };
}

export function defaultTeams(heroes) {
  return {
    left: [
      makeHero(heroes, "Vildred"),
      makeHero(heroes, "Mercedes"),
      makeHero(heroes, "Ras", "tank"),
      null,
    ],
    right: [
      makeHero(heroes, "Cermia"),
      null,
      makeHero(heroes, "Luna"),
      makeHero(heroes, "Arbiter Vildred"),
    ],
  };
}
export function validTeams(teams, heroes) {
  return (
    teams &&
    SIDES.every(
      (side) =>
        Array.isArray(teams[side]) &&
        teams[side].length === 4 &&
        teams[side].filter(Boolean).length === 3 &&
        new Set(teams[side].filter(Boolean).map((h) => h.name)).size === 3 &&
        teams[side].every(
          (h) =>
            !h ||
            (heroes[h.name] &&
              h.stats &&
              Object.keys(FIELDS).every(
                (k) =>
                  Number.isFinite(h.stats[k]) &&
                  h.stats[k] >= FIELDS[k][1] &&
                  h.stats[k] <= FIELDS[k][2],
              ) &&
              Number.isFinite(h.artifactSouls) &&
              h.artifactSouls >= 0 &&
              h.artifactSouls <= 99 &&
              SKILLS.every(
                (s) =>
                  h.skills?.[s] &&
                  ["gain", "cost", "cd"].every(
                    (k) =>
                      Number.isFinite(h.skills[s][k]) &&
                      h.skills[s][k] >= 0 &&
                      h.skills[s][k] <= (k === "cd" ? 20 : 99),
                  ),
              )),
        ),
    )
  );
}
export function roster(teams) {
  return SIDES.flatMap((side) =>
    teams[side]
      .map((h, slot) =>
        h
          ? { ...h, side, slot, id: `${side}-${slot}`, currentHp: h.stats.hp }
          : null,
      )
      .filter(Boolean),
  );
}
