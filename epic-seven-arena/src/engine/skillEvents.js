import {skillTags} from "../data/skillTags.js";
// Completed skill uses carry resolved execution tags for future reviewed
// passive/artifact subscribers. An S1 in a Dual Attack is distinct from its caller.
// This event never starts a turn or executes a handler inferred from prose.
export function recordSkillUse(battle, actor, skill, data, {kind = "active", targetId = null, soulburn = false,hits=[]} = {}) {
  const burning=!!soulburn && kind==="active";
  const event = {
    id: (battle.skillUseSerial || 0) + 1,
    type: "skillUsed",
    turn: battle.turn,
    turnOwnerId: battle.active,
    actorId: actor.id,
    side: actor.side,
    skill,
    targetId,
    hits:hits.map(({id,outcome,amount,defeated})=>({id,outcome,amount,defeated})),
    kind,
    // Assisting heroes always use their normal S1.
    soulburn: burning,
    tags: skillTags(data, {kind, soulburn: burning}),
  };
  battle.skillUseSerial = event.id;
  battle.skillUseEvents = [...(battle.skillUseEvents || []), event].slice(-64);
  return event;
}
