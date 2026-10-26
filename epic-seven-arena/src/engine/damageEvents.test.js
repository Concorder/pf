import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {createCatalog} from "../data/cecilia.js";
import {defaultTeams,makeHero} from "./heroes.js";
import {createBattle,executeAttack,activeUnit,damage} from "./battle.js";
import {newDamageEvents} from "./damageEvents.js";
const heroes=createCatalog(JSON.parse(fs.readFileSync(new URL('../../public/data/heroes.json',import.meta.url))),JSON.parse(fs.readFileSync(new URL('../../public/data/cecilia.json',import.meta.url))).heroes);
const fixture=(name="Vildred")=>{
 const t=defaultTeams(heroes);t.left[0]=makeHero(heroes,name);t.left[0].stats.spd=350;
 for(const team of Object.values(t))for(const u of team.filter(Boolean))u.stats.hp=100000;
 return createBattle(t,{left:0,right:0},heroes);
};
test("AoE presents each target's resolved critical damage without mutating the previous snapshot",()=>{
 const b=fixture();
 const next=executeAttack(heroes,b,'S3','right-0','crit',()=>.999,{automaticDebuffs:false,automaticReactions:false});
 const events=newDamageEvents(b,next);
 assert.equal(events.length,3);
 assert.ok(events.every(e=>e.hit==='crit'&&e.amount>0));
 assert.deepEqual(new Set(events.map(e=>e.unitId)),new Set(['right-0','right-2','right-3']));
 assert.equal(b.damageEvents,undefined);
 assert.deepEqual(newDamageEvents(next,next),[]);
});
test("manual miss and crushing outcomes retain their own presentation type and computed number",()=>{
 for(const hit of ['miss','crushing']){
  const b=fixture('Cermia'),target=b.units.find(u=>u.id==='right-0'),actor=activeUnit(b);
  const expected=damage(actor,target,heroes.Cermia.skills.S1,hit);
  const next=executeAttack(heroes,b,'S1',target.id,hit,()=>.999,{automaticDebuffs:false,automaticReactions:false});
  const [event]=newDamageEvents(b,next);
  assert.equal(event.hit,hit);assert.equal(event.amount,expected);assert.equal(event.unitId,target.id);
 }
});
test("direct and transferred damage produce separate target numbers, not a duplicated full hit",()=>{
 const b=fixture('Cermia'),target=b.units.find(u=>u.id==='right-0'),tank=b.units.find(u=>u.id==='right-2');
 tank.teamDamageShare=20;
 const expected=damage(activeUnit(b),target,heroes.Cermia.skills.S1,'normal');
 const next=executeAttack(heroes,b,'S1',target.id,'normal',()=>.999,{automaticDebuffs:false,automaticReactions:false});
 const events=newDamageEvents(b,next),direct=events.find(e=>e.unitId===target.id),shared=events.find(e=>e.unitId===tank.id);
 assert.equal(events.length,2);assert.equal(shared.kind,'shared');assert.equal(shared.hit,'normal');
 assert.equal(direct.amount+shared.amount,expected);
 assert.equal(shared.amount,Math.floor(expected*.2));
});
