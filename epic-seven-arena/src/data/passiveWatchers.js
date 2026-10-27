import {PASSIVE_WATCHER_RULES} from "./passiveWatcherRules.js";
export function resolvePassiveWatchers(hero,skill,index,cooldown) {
  const rule=PASSIVE_WATCHER_RULES[hero.id]?.[`S${index+1}`];
  if (!rule || (!skill.passive && !rule.allowActive) || rule.description !== String(skill.description || "").replace(/[*+_]/g,"")) return null;
  if ((rule.requiresBuffs || []).some(id => !(skill.buff || []).some(b => b._id === id))) return null;
  if(rule.sourceText && rule.sourceText!==skill.multipliers)return null;
  const result=structuredClone(rule);
  result.watchers=result.watchers.map(w => ({...w,source:"passive",sourceSkill:`S${index+1}`,cooldown:w.cooldown ?? cooldown}));
  for(const w of result.watchers) {
    if(w.baseHealRatio)w.healRatio=w.baseHealRatio*(1+(skill.enhancements||[]).filter(e=>e.string==="enh_healing_eff").reduce((a,e)=>a+e.value,0));
    if(w.crVariable!==undefined)w.crAmount=(skill.values?.[w.crVariable]||[]).slice(0,(skill.enhancements||[]).length+1).reduce((a,v)=>a+(v||0),0)*1000;
  }
  return result;
}
