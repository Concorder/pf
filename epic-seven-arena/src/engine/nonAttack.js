import {applySkillEffects} from "./skillEffects.js";
import {alliesOf} from "./targeting.js";
export function validNonAttackTarget(battle, caster, action, targetId) {
  if (!action || !caster || !battle) return false;
  if (action.target !== "ally") return targetId == null || targetId === caster.id;
  return alliesOf(battle,caster,{excludeCaster:!!action.excludeCaster}).some(u => u.id === targetId);
}
export function nonAttackRecipients(battle,caster,action,targetId) {
  if (action.target === "self") return [caster];
  if (action.target === "team") return alliesOf(battle,caster,{includeDefeated:action.effects.some(e=>e.kind==="revive")});
  return alliesOf(battle,caster,{excludeCaster:!!action.excludeCaster}).filter(u => u.id === targetId);
}
export function applyNonAttackSkill(heroes,battle,caster,data,targetId) {
  // Destina's healing clause applies only to allies who were alive before revival.
  const livingBefore=new Set(alliesOf(battle,caster).map(u=>u.id));
  for(const effect of data.nonAttack.effects) {
    if(effect.onlyInitiallyLiving) {
      for(const ally of alliesOf(battle,caster).filter(u=>livingBefore.has(u.id)))
        applySkillEffects(heroes,battle,caster,data,[{...effect,target:"selected"}],ally.id);
    } else applySkillEffects(heroes,battle,caster,data,[effect],targetId);
  }
}
