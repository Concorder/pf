import {activationBlockReason} from "./triggers.js";
// Intentionally small: unit reviews add filters when an actual kit needs them.
export function watcherMatches(battle,owner,watcher,event) {
  if (watcher.event !== event.type || !event.actorId || !event.side) return false;
  const relation=watcher.actorRelation;
  if (relation === "enemy" && owner.side === event.side) return false;
  if (["ally","allyExceptSelf"].includes(relation) && owner.side !== event.side) return false;
  if (relation === "allyExceptSelf" && owner.id === event.actorId) return false;
  if (relation === "self" && owner.id !== event.actorId) return false;
  if (!["enemy","ally","allyExceptSelf","self"].includes(relation)) return false;
  if ((watcher.tagsAll || []).some(tag => !event.tags?.includes(tag))) return false;
  return true;
}
export function tickWatcherCooldowns(owner) {
  for (const id of Object.keys(owner.watcherCooldowns || {})) owner.watcherCooldowns[id]=Math.max(0,owner.watcherCooldowns[id]-1);
}
// Opposing side first relative to the triggering actor, with stable insertion
// order within a side. Same-side game priority is not inferred from this policy.
export function dispatchWatchers(battle,event,handlers,budget={remaining:32}) {
  const candidates=battle.units.flatMap(owner => (owner.watchers || []).map(watcher=>({owner,watcher})))
    .filter(({owner,watcher})=>watcherMatches(battle,owner,watcher,event))
    .sort((a,b)=>Number(a.owner.side===event.side)-Number(b.owner.side===event.side));
  for (const {owner,watcher} of candidates) {
    if (budget.remaining<=0) break;
    if (!watcherMatches(battle,owner,watcher,event) ||
      activationBlockReason(battle,owner,watcher.kind,{source:watcher.source}) ||
      (owner.watcherCooldowns?.[watcher.id] || 0)>0) continue;
    const handler=handlers[watcher.handler];
    if (typeof handler!=="function") continue;
    budget.remaining--;
    const cooldown=watcher.cooldownSkill ? owner.skills?.[watcher.cooldownSkill]?.cd ?? watcher.cooldown : watcher.cooldown;
    // Arm before running a handler so nested events cannot re-enter this watcher.
    owner.watcherCooldowns ||= {};
    owner.watcherCooldowns[watcher.id]=cooldown || 0;
    if (handler(battle,owner,event,watcher)===false) {owner.watcherCooldowns[watcher.id]=0;continue;}
    battle.watcherEventSerial=(battle.watcherEventSerial || 0)+1;
    battle.watcherEvents=[...(battle.watcherEvents || []),{id:battle.watcherEventSerial,
      ownerId:owner.id,watcherId:watcher.id,eventType:event.type,sourceEventId:event.id ?? null,
      actorId:event.actorId,originSide:event.side,turn:battle.turn}].slice(-64);
  }
}
