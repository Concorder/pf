import {maxHp} from "./health.js";
import {BUFFS,applyCRChange,cleanseDebuffs,grantBuff,healUnit} from "./buffs.js";
import {grantUnitResource,resourceValue} from "./resources.js";
import {alliesOf} from "./targeting.js";
import {recordSkillUse} from "./skillEvents.js";
const log=(battle,owner,message)=>battle.log.unshift({message:`${owner.name}: ${message}`,details:"Passive reaction",turn:battle.turn});
export const WATCHER_HANDLERS = {
  arunkaBarrier(battle,owner,event) {
    const actor=battle.units.find(u=>u.id===event.actorId);
    if(!actor?.buffs?.some(b=>b.id==="stic_protect"&&(b.turns===null||b.turns>0)))return false;
    applyCRChange(battle,owner,10,"Arunka · enemy turn ends with Barrier");
  },
  yufineReady(battle,owner) {
    if(owner.cooldowns.S3>0 || !battle.units.some(u=>u.side!==owner.side&&u.currentHp>0&&u.buffs?.some(b=>BUFFS[b.id]?.debuff&&(b.turns===null||b.turns>0))))return false;
    applyCRChange(battle,owner,20,"Yufine · Dragon Charge ready / enemy debuffed");
  },
  roanaSecondary(battle,owner,event,watcher) {
    const count=(event.hits||[]).filter(hit=>battle.units.some(u=>u.id===hit.id&&u.side===owner.side)).length;
    if(!count)return false;
    for(const ally of alliesOf(battle,owner)) {
      healUnit(battle,ally,maxHp(owner)*watcher.healRatio*count,"Vigilant Eye");
      applyCRChange(battle,ally,5*count,"Vigilant Eye");
    }
  },
  oceanLulucaNonAttack(battle,owner,event,watcher) {
    grantUnitResource(battle,owner,2);
    applyCRChange(battle,owner,watcher.crAmount,"Ocean Breeze Luluca · enemy non-attack");
  },
  solNonAttack(battle,owner) {
    applyCRChange(battle,owner,20,"Sol · enemy non-attack skill");
    grantUnitResource(battle,owner,20);
    log(battle,owner,"reacts to an enemy non-attack skill: +20% Combat Readiness and Fighting Spirit gain.");
  },
  designerTurnEnd(battle,owner) {
    const count=alliesOf(battle,owner).reduce((sum,ally)=>sum+(ally.buffs || []).filter(b=>
      BUFFS[b.id]?.debuff && !BUFFS[b.id]?.unique && (b.turns===null || b.turns>0)).length,0);
    if (count>0) grantUnitResource(battle,owner,count*10);
    if (owner.resourceType!=="fightingSpirit" || resourceValue(owner)<100) return;
    owner.resourceValue=0;
    cleanseDebuffs(battle,owner,owner.id,Infinity);
    grantBuff(battle,owner,"stic_def_up",1,"Designer Lilibet · full Fighting Spirit",{casterId:owner.id});
    grantBuff(battle,owner,"stic_debuf_impossible",1,"Designer Lilibet · full Fighting Spirit",{casterId:owner.id});
    applyCRChange(battle,owner,40,"Designer Lilibet · full Fighting Spirit");
    log(battle,owner,"consumes all Fighting Spirit: cleanses herself, gains Defense Up and Immunity, and +40% Combat Readiness.");
  },
  astromancerWorship(battle,owner) {
    applyCRChange(battle,owner,20,"Worship Me!");
    battle.souls[owner.side]=Math.min(99,battle.souls[owner.side]+10);
    recordSkillUse(battle,owner,"Worship Me!",{tags:["nonAttack"]},{kind:"additional",targetId:owner.id});
    log(battle,owner,"uses Worship Me!: +20% Combat Readiness and +10 souls.");
  },
};
