import {BUFFS,applyCRChange,cleanseDebuffs,grantBuff} from "./buffs.js";
import {grantUnitResource,resourceValue} from "./resources.js";
import {alliesOf} from "./targeting.js";
import {recordSkillUse} from "./skillEvents.js";
const log=(battle,owner,message)=>battle.log.unshift({message:`${owner.name}: ${message}`,details:"Passive reaction",turn:battle.turn});
export const WATCHER_HANDLERS = {
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
