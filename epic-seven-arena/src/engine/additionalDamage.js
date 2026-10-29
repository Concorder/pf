import {effectiveStats,hasBuff,sufferDamage} from './buffs.js';
import {injuryAmount} from './health.js';
import {planProtectedDamage} from './damageProtection.js';
import {ARTIFACT_DAMAGE_RULES} from '../data/artifactDamageRules.js';
export function additionalDamageEligible(effect,outcome){return effect.source==='artifact'||effect.allowMiss||outcome!=='miss';}
export function additionalDamageAmount(actor,target,effect) {
 const a=effectiveStats(actor),t=effectiveStats(target);
 const basis=effect.basis==='injury'?injuryAmount(target):a[effect.basis];
 if(!Number.isFinite(basis)||!Number.isFinite(effect.ratio)||effect.ratio<0)return 0;
 const penetration=Math.min(1,Math.max(0,effect.penetration??.7));
 return Math.max(0,Math.floor(basis*effect.ratio*1.871/(1+t.def*(1-penetration)/300)));
}
export function selectedArtifactDamage(actor,data,skill) {
 const rule=ARTIFACT_DAMAGE_RULES[actor.additionalDamageArtifact];
 if(!rule||rule.role!==actor.role||!data.tags?.includes('attack'))return null;
 if(rule.scope==='single'&&data.targetScope!=='single')return null;
 if(rule.scope==='allEnemies'&&data.targetScope!=='allEnemies')return null;
 if(rule.scope==='basic'&&skill!=='S1')return null;
 return {...rule,source:'artifact',chance:actor.artifactProcChance??100};
}
// Additional damage is a component, not an additional skill: no skill tags,
// counters, natural Dual Attacks, turn ticks or repeated reaction queues.
export function applyAdditionalDamage(battle,actor,data,skill,hits,random=Math.random,{artifact=true}={}) {
 const artifactEffect=artifact?selectedArtifactDamage(actor,data,skill):null;
 const effects=[...(data.additionalDamage||[]),...(artifactEffect?[artifactEffect]:[])];
 for(const effect of effects){
  if(effect.requiresBuff&&!hasBuff(actor,effect.requiresBuff))continue;
  const eligible=hits.filter(h=>additionalDamageEligible(effect,h.outcome));
  if(!eligible.length)continue;
  if(effect.chance!==undefined&&(effect.chance<=0||effect.chance<100&&random()*100>=effect.chance))continue;
  const targets=effect.scope==='allEnemies'?battle.units.filter(u=>u.side!==actor.side&&u.currentHp>0):eligible.map(h=>battle.units.find(u=>u.id===h.id)).filter(u=>u?.currentHp>0);
  for(const target of targets){
   const incoming=additionalDamageAmount(actor,target,effect);
   const protection=planProtectedDamage(battle,target,incoming,{attacker:actor,skill:data,additional:true});
   const options={kind:'additionalDamage',hit:'normal',delayMs:1000,laceration:false};
   sufferDamage(battle,target,protection.targetDamage,options);
   if(protection.transferred>0)sufferDamage(battle,protection.recipient,protection.transferred,{...options,kind:'sharedAdditionalDamage'});
   if(target.currentHp<=0&&data.inflictsExtinction)target.extinct=true;
   const primary=hits.find(h=>h.id===target.id);if(primary){primary.defeated=target.currentHp<=0;primary.additionalDamage=(primary.additionalDamage||0)+protection.targetDamage;}
   battle.log.unshift({message:`${actor.name}: ${effect.name||data.name} deals ${protection.targetDamage.toLocaleString()} additional damage to ${target.name}.`,details:`${effect.source==='artifact'?'Artifact':'Skill'} · no critical hit · ${Math.round((effect.penetration??.7)*100)}% Defense penetration`,turn:battle.turn});
  }
 }
}
