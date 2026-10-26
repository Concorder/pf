export const UNIT_RESOURCES = {
  focus: {name: "Focus", max: 5},
  fightingSpirit: {name: "Fighting Spirit", max: 100},
};
const sourceFields = {focus: "focus", fightingSpirit: "fighting_spirit"};
export function nativeResourceType(hero) {
  const skills = (Array.isArray(hero?.skills) ? hero.skills : []).map(raw => ({...raw, ...raw.awakened}));
  for (const [type, field] of Object.entries(sourceFields)) {
    if (skills.some(s => Number(s[`${field}_gain`]) > 0 ||
      (s.common || []).some(c => c._id === `cmn_${field}`) &&
      new RegExp(type === "focus" ? "\\bFocus\\b" : "\\bFighting Spirit\\b").test(s.description || ""))) return type;
  }
  return "";
}
export function skillResourceRule(hero, skill) {
  const type = nativeResourceType(hero);
  if (!type) return null;
  const field = sourceFields[type], max = UNIT_RESOURCES[type].max;
  const read = key => Number.isFinite(skill[key]) && skill[key] >= 0 && skill[key] <= max ? skill[key] : 0;
  return {type, gain: read(`${field}_gain`), cost: read(`${field}_requirement`)};
}
export function resourceValue(unit) {
  const def = UNIT_RESOURCES[unit?.resourceType];
  const value = Number(unit?.resourceValue ?? 0);
  return def && Number.isFinite(value) ? Math.round(Math.min(def.max, Math.max(0, value)) * 1e6) / 1e6 : 0;
}
export function canPaySkillResource(unit, data) {
  const rule = data?.resource;
  return !rule?.cost || (unit.resourceType === rule.type && resourceValue(unit) >= rule.cost);
}
export function spendSkillResource(unit, data) {
  if (!canPaySkillResource(unit, data)) return false;
  if (data?.resource?.cost) unit.resourceValue = resourceValue(unit) - data.resource.cost;
  return true;
}
// Mutating primitive for reviewed grants. Fractional resources are deliberately
// preserved; a gain-reduction passive may turn 1 Focus into 0.5 Focus.
export function gainUnitResource(unit, amount, {multiplier = 1} = {}) {
  if (!UNIT_RESOURCES[unit?.resourceType] || !Number.isFinite(amount) || amount < 0 ||
      !Number.isFinite(multiplier) || multiplier < 0) return 0;
  const before = resourceValue(unit);
  unit.resourceValue = before + amount * multiplier;
  unit.resourceValue = resourceValue(unit);
  return unit.resourceValue - before;
}
export function automaticResourceMultiplier(battle, unit) {
  let multiplier = 1;
  for (const enemy of battle.units.filter(u => u.side !== unit.side && u.currentHp > 0 &&
    !(u.buffs || []).some(b => b.id === "stic_dizzy" && (b.turns === null || b.turns > 0)))) {
    for (const rule of enemy.resourcePassives || [])
      if (rule.enemyGainMultiplier?.type === unit.resourceType)
        multiplier = Math.min(multiplier, rule.enemyGainMultiplier.multiplier);
  }
  return (unit.resourceGainMultiplier ?? 1) * multiplier;
}
export function grantUnitResource(battle, unit, amount) {
  return gainUnitResource(unit, amount, {multiplier: automaticResourceMultiplier(battle, unit)});
}
export function applySkillResourceGain(battle, unit, data, hits = []) {
  if (unit.currentHp <= 0 || data?.resource?.type !== unit.resourceType) return 0;
  const criticalMultiplier = hits.some(h => h.outcome === "crit") ? data.resource.criticalGainMultiplier ?? 1 : 1;
  const outsideMultiplier = battle.active !== unit.id ? data.resource.outsideTurnGainMultiplier ?? 1 : 1;
  return grantUnitResource(battle, unit, data.resource.gain * criticalMultiplier * outsideMultiplier);
}
export function setUnitResource(previous, id, value) {
  if (!previous || previous.winner || !Number.isFinite(value)) return previous;
  const existing = previous.units.find(u => u.id === id);
  if (!UNIT_RESOURCES[existing?.resourceType]) return previous;
  const battle = structuredClone(previous), unit = battle.units.find(u => u.id === id);
  unit.resourceValue = value;
  unit.resourceValue = resourceValue(unit);
  if (unit.resourceValue === resourceValue(existing)) return previous;
  battle.log.unshift({message: `${unit.name}: ${UNIT_RESOURCES[unit.resourceType].name} set to ${unit.resourceValue}.`,
    details: "Manual resource adjustment · no turn advanced", turn: battle.turn});
  return battle;
}
