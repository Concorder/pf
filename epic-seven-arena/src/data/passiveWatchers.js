import {PASSIVE_WATCHER_RULES} from "./passiveWatcherRules.js";
export function resolvePassiveWatchers(hero,skill,index,cooldown) {
  const rule=PASSIVE_WATCHER_RULES[hero.id]?.[`S${index+1}`];
  if (!rule || !skill.passive || rule.description !== String(skill.description || "").replace(/[*+_]/g,"")) return null;
  if ((rule.requiresBuffs || []).some(id => !(skill.buff || []).some(b => b._id === id))) return null;
  const result=structuredClone(rule);
  result.watchers=result.watchers.map(w => ({...w,source:"passive",sourceSkill:`S${index+1}`,cooldown:w.cooldown ?? cooldown}));
  return result;
}
