import {reviveUnit} from "./revival.js";
import {maxHp} from "./health.js";
import {alliesOf} from "./targeting.js";
import {BUFFS,grantBuff,cleanseDebuffs,applyCRChange} from "./buffs.js";
import {SKILLS} from "./heroes.js";
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
function effectRecipients(battle,caster,effect,targetId) {
  if (effect.target === "caster") return [caster];
  if (effect.target === "selected") return alliesOf(battle,caster).filter(u => u.id === targetId);
  return alliesOf(battle,caster,{excludeCaster:effect.target === "otherAllies",includeDefeated:effect.kind === "revive"});
}
export function applyNonAttackSkill(heroes,battle,caster,data,targetId) {
  const source = `${caster.name} · ${data.name}`;
  for (const effect of data.nonAttack.effects) for (const target of effectRecipients(battle,caster,effect,targetId)) {
    if (effect.kind === "revive") {
      reviveUnit(battle,target,{fraction:effect.hp/maxHp(target),source});
    } else if (effect.kind === "buff") {
      const granted = grantBuff(battle,target,effect.id,effect.turns,source,{casterId:caster.id});
      battle.log.unshift({message:`${target.name}: ${BUFFS[effect.id]?.name || "Buff"} ${granted ? "granted" : "blocked"}.`,details:source,turn:battle.turn});
    } else if (effect.kind === "cleanse") cleanseDebuffs(battle,target,caster.id,effect.count === "all" ? Infinity : effect.count);
    else if (effect.kind === "readiness") applyCRChange(battle,target,effect.amount,source);
    else if (["cooldownReset","cooldownDecrease"].includes(effect.kind))
      for (const skill of SKILLS) {
        if (heroes[target.name]?.skills?.[skill]?.nonAttack?.cooldownEffectImmune) continue;
        target.cooldowns[skill] = effect.kind === "cooldownReset" ? 0 : Math.max(0,target.cooldowns[skill]-effect.amount);
      }
  }
}
