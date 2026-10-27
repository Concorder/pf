import {alliesOf} from './targeting.js';
import {maxHp} from './health.js';
import {currentCR} from './combatReadiness.js';
import {BUFFS,grantBuff,cleanseDebuffs,applyCRChange,effectiveStats,healUnit} from './buffs.js';
import {reviveUnit} from './revival.js';
import {SKILLS} from './heroes.js';
export function effectRecipients(battle,caster,effect,targetId,random=Math.random) {
 const allies=alliesOf(battle,caster,{excludeCaster:effect.excludeCaster || effect.target==='otherAllies',includeDefeated:effect.kind==='revive'});
 if(effect.target==='caster')return [caster];
 if(['selected','target'].includes(effect.target))return battle.units.filter(u=>u.id===targetId&&u.currentHp>0);
 if(effect.target==='enemies')return battle.units.filter(u=>u.side!==caster.side&&u.currentHp>0);
 if(effect.target==='lowestHpAlly')return allies.sort((a,b)=>a.currentHp/maxHp(a)-b.currentHp/maxHp(b)||a.id.localeCompare(b.id)).slice(0,1);
 if(effect.target==='highestAttackAlly')return allies.sort((a,b)=>effectiveStats(b).atk-effectiveStats(a).atk||a.id.localeCompare(b.id)).slice(0,1);
 if(effect.target==='highestCRAlly')return allies.sort((a,b)=>currentCR(b,battle,effectiveStats(b).spd)-currentCR(a,battle,effectiveStats(a).spd)||a.id.localeCompare(b.id)).slice(0,1);
 if(effect.target==='randomAlly')return allies.length?[allies[Math.min(allies.length-1,Math.floor(random()*allies.length))]]:[];
 return ["team","otherAllies"].includes(effect.target)?allies:[];
}
export function applySkillEffects(heroes,battle,caster,data,effects,targetId,{random=Math.random,hits=[]}={}) {
 const source=`${caster.name} · ${data.name}`;
 for(const effect of effects || []) {
  if(effect.when==='critical'&&!hits.some(h=>h.outcome==='crit'))continue;
  if(effect.when==='kill'&&!hits.some(h=>h.defeated))continue;
  if(effect.when==='casterBuffed'&&!(caster.buffs||[]).some(b=>BUFFS[b.id]?.effectType==='buff'&&(b.turns===null||b.turns>0)))continue;
  for(const target of effectRecipients(battle,caster,effect,targetId,random)) {
   if(effect.kind==='revive'){reviveUnit(battle,target,{fraction:effect.fraction??effect.hp/maxHp(target),source});continue;}
   if(target.currentHp<=0)continue;
   const basis=effect.basis==='targetHp'?maxHp(target):effect.basis==='casterAtk'?effectiveStats(caster).atk:maxHp(caster);
   const amount=effect.ratio!==undefined?basis*effect.ratio*(1+((effect.enhance==='healing'?data.healingEnhancement:effect.enhance==='barrier'?data.barrierEnhancement:0)||0)):effect.amount;
   if(effect.kind==='buff'){const granted=grantBuff(battle,target,effect.id,effect.turns,source,{casterId:caster.id});battle.log.unshift({message:`${target.name}: ${BUFFS[effect.id]?.name || 'Buff'} ${granted?'granted':'blocked'}.`,details:source,turn:battle.turn});}
   else if(effect.kind==='barrier'){
    const existing=target.buffs?.find(b=>b.id==='stic_protect'&&(b.turns===null||b.turns>0));
    if(!existing||existing.barrier<=Math.floor(amount))grantBuff(battle,target,'stic_protect',effect.turns,source,{casterId:caster.id,barrier:Math.floor(amount)});
   }else if(effect.kind==='heal')healUnit(battle,target,amount,source);
   else if(effect.kind==='cleanse')cleanseDebuffs(battle,target,caster.id,effect.count==='all'?Infinity:effect.count);
   else if(effect.kind==='readiness')applyCRChange(battle,target,amount*(effect.perCriticalTarget?hits.filter(h=>h.outcome==='crit').length:1),source);
   else if(['cooldownReset','cooldownDecrease'].includes(effect.kind))for(const skill of SKILLS){
    if(heroes[target.name]?.skills?.[skill]?.nonAttack?.cooldownEffectImmune)continue;
    target.cooldowns[skill]=effect.kind==='cooldownReset'?0:Math.max(0,target.cooldowns[skill]-effect.amount);
   }else if(effect.kind==='extendBuffs')for(const buff of target.buffs||[])if(BUFFS[buff.id]?.effectType==='buff'&&buff.turns>0)buff.turns+=effect.amount;
  }
 }
}
