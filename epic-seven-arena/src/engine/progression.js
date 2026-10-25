export function maxEnhancements(skill) {
  const entries = skill.enhancements || [];
  const sum = (key) =>
    entries
      .filter((e) => e.string === key)
      .reduce((n, e) => n + (Number.isFinite(e.value) ? e.value : 0), 0);
  return {
    level: entries.length,
    damage: sum("enh_damage_dealt"),
    cooldown: sum("enh_sk_cooldown"),
    soulGain: sum("enh_soul_gain"),
    effectChance: sum("enh_effect_chance"),
    entries,
  };
}
export function normalizeEquipment(hero) {
  if (!["light", "dark"].includes(hero.attribute)) return null;
  const raw = (hero.ex_equip || []).find(
    (e) =>
      Array.isArray(e.skills) && e.skills.some((s) => s.description?.trim()),
  );
  if (!raw) return null;
  return {
    id: raw._id || raw.id,
    name: raw.name,
    stat: raw.stat,
    options: raw.skills
      .map((s, index) => {
        const description = String(s.description || "").replace(/\*|\+|_/g, ""),
          damage = description.match(
            /^Increases damage dealt by .+? by (\d+(?:\.\d+)?)%([\s\S]*)$/i,
          ),
          cooldown = description.match(
            /^Decreases cooldown of .+ by (\d+) turns?\.?$/i,
          );
        const opening =
          hero.id === "c2007" &&
          /start of battle/i.test(description) &&
          /Archdemon.s Might/i.test(description) &&
          /for 2 turns/i.test(description);
        let support = "unsupported",
          reason = "EE mechanic not implemented";
        if (opening) {
          support = "supported";
          reason =
            "Opening and Dark Contract revival buffs implemented for 2 turns";
        } else if (damage) {
          support = /^[\s.]*$/.test(damage[2]) ? "supported" : "partial";
          reason =
            support === "supported"
              ? "Damage bonus implemented"
              : "Damage bonus implemented; additional effect pending";
        } else if (cooldown) {
          support = "supported";
          reason = "Cooldown reduction implemented";
        }
        return {
          index,
          skill: `S${s.skill}`,
          description,
          damageBonus: damage ? Number(damage[1]) / 100 : 0,
          cooldownReduction: cooldown ? Number(cooldown[1]) : 0,
          opening,
          support,
          reason,
        };
      })
      .filter((s) => s.description.trim()),
  };
}
export function equippedEE(hero, unit) {
  const ee = hero?.exclusiveEquipment;
  if (!ee || unit?.eeEnabled === false) return null;
  const option = ee.options.find(
    (o) => o.index === (unit?.eeOption ?? ee.options[0]?.index),
  );
  return option ? { ...ee, option } : null;
}
export function equippedSkill(hero, unit, skill) {
  const base = hero?.skills?.[skill];
  if (!base) return base;
  const ee = equippedEE(hero, unit);
  if (!ee || ee.option.skill !== skill) return base;
  return {
    ...base,
    eeDamage: ee.option.damageBonus,
    defaults: {
      ...base.defaults,
      cd: Math.max(0, base.defaults.cd - ee.option.cooldownReduction),
    },
    equipmentEffect: ee.option,
    equipmentName: ee.name,
  };
}
export function defaultSkillSettings(hero, unit) {
  return Object.fromEntries(
    ["S1", "S2", "S3"].map((s) => [
      s,
      {
        ...(equippedSkill(hero, unit, s)?.defaults || {
          gain: s === "S1" ? 1 : 0,
          cd: 0,
          cost: 0,
        }),
      },
    ]),
  );
}
