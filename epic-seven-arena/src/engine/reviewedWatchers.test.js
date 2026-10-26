import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createCatalog} from '../data/cecilia.js';
import {defaultTeams,makeHero} from './heroes.js';
import {createBattle,executeAttack,damage} from './battle.js';
import {grantBuff,hasBuff} from './buffs.js';
import {hitChances} from './hits.js';
import {dispatchWatchers,tickWatcherCooldowns} from './watchers.js';
const read=n=>JSON.parse(fs.readFileSync(new URL(`../../public/data/${n}.json`,import.meta.url)));
const heroes=createCatalog(read('heroes'),read('cecilia').heroes);
const unit=(b,id)=>b.units.find(u=>u.id===id);
function fixture(left='Flan',right='Sol',ally='Ras') {
 const teams=defaultTeams(heroes);teams.left[0]=makeHero(heroes,left);teams.left[1]=makeHero(heroes,ally);teams.right[0]=makeHero(heroes,right);
 for(const side of Object.values(teams))for(const u of side.filter(Boolean)){u.stats.hp=100000;u.stats.spd=100;}
 teams.left[0].stats.spd=350;
 return createBattle(teams,{left:0,right:0},heroes);
}
const cast=b=>executeAttack(heroes,b,'S2','left-1','normal',()=>.999,{automaticDualAttacks:false});
test('reviewed conditional damage uses classified status and e7calc provenance',()=>{
 for(const [name,id,mult] of [['Kise','stic_att_up',1.7],['Zahhak','stic_att_up',1.3],['Dizzy','stic_att_dn',1.3],['Astromancer Elena','stic_att_dn',1.2]]) {
  const b=fixture(name),a=unit(b,'left-0'),t=unit(b,'right-0'),d=heroes[name].skills.S1;
  assert.equal(d.damageSupport,'supported');assert.equal(d.damageSource.provider,'e7calc');
  grantBuff(b,t,id,2,'test');
  const base=damage(a,t,{...d,damageCondition:undefined},'normal');
  assert.ok(Math.abs(damage(a,t,d,'normal')-base*mult)<2,name);
  t.buffs=[];assert.equal(damage(a,t,d,'normal'),damage(a,t,{...d,damageCondition:undefined},'normal'));
 }
});
test('Zahhak S1 hit and critical bonuses are skill-specific',()=>{
 const b=fixture('Zahhak'),a=unit(b,'left-0'),t=unit(b,'right-0');a.attribute='fire';t.attribute='ice';a.stats.chc=0;
 assert.equal(hitChances(a,t).miss,50);assert.equal(hitChances(a,t,heroes.Zahhak.skills.S1).miss,0);
 assert.equal(hitChances(a,t,heroes.Zahhak.skills.S1).critical,50);assert.equal(hitChances(a,t,heroes.Zahhak.skills.S3).critical,0);
});
test('Sol enemy non-attack watcher grants resources once, respects Seal and freezes metadata',()=>{
 const b=fixture();assert.equal(unit(b,'right-0').watchers.length,1);
 const n=cast(b);assert.equal(unit(n,'right-0').resourceValue,20);assert.equal(n.watcherEvents.filter(e=>e.watcherId==='sol-enemy-non-attack').length,1);
 assert.equal(unit(n,'right-0').watcherCooldowns['sol-enemy-non-attack'],2);
 const sealed=fixture();grantBuff(sealed,unit(sealed,'right-0'),'stic_dizzy',2,'test');assert.equal(unit(cast(sealed),'right-0').resourceValue,0);
 assert.equal(unit(b,'right-0').resourceValue,0);
});
test('Designer Lilibet counts allied debuffs at enemy turn end and consumes full spirit',()=>{
 const b=fixture('Flan','Designer Lilibet'),d=unit(b,'right-0');assert.equal(d.resourceValue,50);
 for(const id of ['stic_att_dn','stic_def_dn','stic_stun','stic_sleep','stic_blind'])grantBuff(b,d,id,2,'test');
 const n=cast(b),u=unit(n,'right-0');assert.equal(u.resourceValue,0);assert.ok(hasBuff(u,'stic_def_up'));assert.ok(hasBuff(u,'stic_debuf_impossible'));assert.equal(hasBuff(u,'stic_stun'),false);
});
test('Astromancer Elena AoE reaction emits non-attack event observed by enemy Sol',()=>{
 const b=fixture('Ras','Sol','Astromancer Elena');
 const n=executeAttack(heroes,b,'S3','right-0','normal',()=>.999,{automaticDualAttacks:false});
 assert.equal(unit(n,'right-0').resourceValue,20);assert.ok(n.skillUseEvents.some(e=>e.skill==='Worship Me!'&&e.tags.includes('nonAttack')));
 assert.equal(n.souls.left,12);assert.ok(unit(n,'left-1').watcherCooldowns['astromancer-elena-ally-aoe']>0);
 const blocked=fixture('Ras','Sol','Astromancer Elena');grantBuff(blocked,unit(blocked,'left-1'),'stic_restrict',2,'test');
 const next=executeAttack(heroes,blocked,'S3','right-0','normal',()=>.999,{automaticDualAttacks:false});assert.equal(next.watcherEvents?.length || 0,0);
});
test('watcher priority is opponent first; conditions are rechecked and cooldowns tick explicitly',()=>{
 const b=fixture(),a=unit(b,'left-0'),e=unit(b,'right-0'),order=[];
 for(const u of b.units)u.watchers=[];
 for(const u of [a,e])u.watchers=[{id:u.id,event:'test',actorRelation:u===a?'ally':'enemy',kind:'passive',handler:'run',cooldown:2}];
 dispatchWatchers(b,{type:'test',actorId:a.id,side:a.side},{run:(_,u)=>order.push(u.id)});
 assert.deepEqual(order,[e.id,a.id]);dispatchWatchers(b,{type:'test',actorId:a.id,side:a.side},{run:(_,u)=>order.push(u.id)});assert.equal(order.length,2);
 tickWatcherCooldowns(a);assert.equal(a.watcherCooldowns[a.id],1);assert.equal(e.watcherCooldowns[e.id],2);
 a.watcherCooldowns={};e.watcherCooldowns={};order.length=0;
 dispatchWatchers(b,{type:'test',actorId:a.id,side:a.side},{run:(_,u)=>{order.push(u.id);if(u===e)a.currentHp=0;}});assert.deepEqual(order,[e.id]);
});
test('watcher limits, passive action gates and exact metadata guards fail safely',()=>{
 const b=fixture(),sol=unit(b,'right-0');
 const event={type:'skillUsed',actorId:'left-0',side:'left',tags:['nonAttack']};let calls=0;
 grantBuff(b,sol,'stic_stun',2,'test');grantBuff(b,sol,'stic_restrict',2,'test');
 dispatchWatchers(b,event,{solNonAttack:()=>calls++});assert.equal(calls,1);
 sol.watcherCooldowns={};dispatchWatchers(b,event,{solNonAttack:()=>calls++},{remaining:0});assert.equal(calls,1);
 sol.watcherCooldowns={};dispatchWatchers(b,event,{});assert.equal(calls,1);
 const snapshot=read('cecilia'),raw=Object.values(snapshot.heroes).find(h=>h.id==='c1092');
 raw.skills[1].description+=' Changed';
 if(raw.skills[1].awakened?.description)raw.skills[1].awakened.description+=' Changed';
 const changed=createCatalog(read('heroes'),snapshot.heroes);assert.equal(changed.Sol.skills.S2.watchers.length,0);
});
