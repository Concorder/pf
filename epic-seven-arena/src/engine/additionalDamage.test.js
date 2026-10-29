import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {createCatalog} from '../data/cecilia.js';import {defaultTeams,makeHero,validTeams} from './heroes.js';
import {createBattle,executeAttack,skillData,damage} from './battle.js';import {grantBuff,hasBuff,effectiveStats} from './buffs.js';
import {additionalDamageAmount,additionalDamageEligible,applyAdditionalDamage,selectedArtifactDamage} from './additionalDamage.js';
const read=n=>JSON.parse(fs.readFileSync(new URL(`../../public/data/${n}.json`,import.meta.url)));
const heroes=createCatalog(read('heroes'),read('cecilia').heroes),get=(b,id)=>b.units.find(u=>u.id===id);
function fixture(name='Albedo'){const t=defaultTeams(heroes);t.left[0]=makeHero(heroes,name);for(const side of Object.values(t))for(const u of side.filter(Boolean)){u.stats.hp=100000;u.stats.spd=100;u.stats.def=1000;}t.left[0].stats.spd=350;t.right[0].stats.spd=300;return createBattle(t,{left:0,right:0},heroes);}
const cast=(b,s='S1',hit='normal',options={})=>executeAttack(heroes,b,s,'right-0',hit,()=>.999,{automaticDualAttacks:false,...options});
test('Albedo S1 is enabled with source-verified primary scaling and separate non-critical HP damage',()=>{
 const b=fixture(),u=get(b,'left-0'),t=get(b,'right-0'),d=skillData(heroes,u,'S1');assert.equal(d.damageSupport,'supported');
 const base=damage(u,t,d,'crit'),extra=Math.floor(100000*.07*1.871/2),n=cast(b,'S1','crit');
 assert.equal(get(n,t.id).currentHp,100000-base-extra);const events=n.damageEvents.filter(e=>e.unitId===t.id);assert.deepEqual(events.map(e=>e.hit),['crit','normal']);assert.equal(events[1].amount,extra);assert.equal(events[1].delayMs,1000);assert.equal(n.skillUseEvents.length,1);assert.equal(b.units[0].currentHp,100000);
});
test('skill additional damage skips misses unless source explicitly allows them; artifact procs allow misses',()=>{
 const b=fixture(),n=cast(b,'S1','miss');assert.equal(n.damageEvents.filter(e=>e.kind==='additionalDamage').length,0);
 assert.equal(additionalDamageEligible({source:'artifact'},'miss'),true);assert.equal(additionalDamageEligible({},'miss'),false);
 const sol=cast(fixture('Sol'),'S3','miss');assert.equal(sol.damageEvents.filter(e=>e.kind==='additionalDamage').length,1);
});
test('additional HP damage reads effective injured max HP, ignores crit damage and ordinary skill enhancements',()=>{
 const b=fixture(),u=get(b,'left-0'),t=get(b,'right-0'),e={basis:'hp',ratio:.07};const first=additionalDamageAmount(u,t,e);u.stats.chd=350;u.injuryFraction=.5;assert.equal(additionalDamageAmount(u,t,e),Math.floor(first/2));
 u.injuryFraction=0;grantBuff(b,t,'stic_def_dn',2,'test');assert.equal(additionalDamageAmount(u,t,e),Math.floor(100000*.07*1.871/(1+300*.3/300)));
});
test('additional damage bypasses ordinary reduction and attack caps, but uses strongest sharing without chaining',()=>{
 const b=fixture(),u=get(b,'left-0'),t=get(b,'right-0'),tank=get(b,'right-2');t.damageReduction=90;t.damageLimit=1;t.damageShare=20;t.damageShareSlot=String(tank.slot);
 const raw=additionalDamageAmount(u,t,{basis:'hp',ratio:.07});applyAdditionalDamage(b,u,{name:'test',tags:['attack'],additionalDamage:[{basis:'hp',ratio:.07}]},'S1',[{id:t.id,outcome:'normal'}]);
 assert.equal(tank.currentHp,100000-Math.floor(raw*.2));assert.equal(t.currentHp,100000-raw+Math.floor(raw*.2));
});
test('artifact profile uses its stat, chance, role and skill scope and procs on a miss',()=>{
 const b=fixture('Ras'),u=get(b,'left-0'),t=get(b,'right-0');u.additionalDamageArtifact='rocket_punch_gauntlet';
 const d=skillData(heroes,u,'S1'),primary=damage(u,t,d,'miss'),raw=additionalDamageAmount(u,t,{basis:'def',ratio:1});const n=cast(b,'S1','miss');assert.equal(get(n,t.id).currentHp,100000-primary-raw);
 const off=cast(b,'S1','miss',{automaticArtifactDamage:false});assert.equal(get(off,t.id).currentHp,100000-primary);
 u.artifactProcChance=0;assert.equal(cast(b,'S1','miss').damageEvents.filter(e=>e.kind==='additionalDamage').length,0);
 assert.equal(selectedArtifactDamage({...u,role:'mage'},d,'S1'),null);assert.equal(selectedArtifactDamage(u,{...d,targetScope:'allEnemies'},'S3'),null);
});
test('AoE artifact damage applies to each hit target without becoming another skill or triggering extra chains',()=>{
 const b=fixture('Yuna'),u=get(b,'left-0');u.additionalDamageArtifact='reingar_special_drink';const d={name:'test',tags:['attack'],targetScope:'allEnemies'};const hits=b.units.filter(t=>t.side==='right').map(t=>({id:t.id,outcome:'miss'}));applyAdditionalDamage(b,u,d,'S3',hits);
 assert.equal(b.damageEvents.filter(e=>e.kind==='additionalDamage').length,3);assert.equal(b.skillUseEvents,undefined);assert.ok(b.damageEvents.every(e=>e.hit==='normal'));
});
test('New Moon Luna successful S2 splashes all enemies; primary miss skips its entire skill component',()=>{
 const b=fixture('New Moon Luna'),n=cast(b,'S2');assert.equal(n.damageEvents.filter(e=>e.kind==='additionalDamage').length,3);const miss=cast(b,'S2','miss');assert.equal(miss.damageEvents.filter(e=>e.kind==='additionalDamage').length,0);
});
test('Defense Down is applied before Requiem Roana additional damage; immunity/resistance still gate it',()=>{
 const b=fixture('Requiem Roana'),u=get(b,'left-0'),t=get(b,'right-0'),d=skillData(heroes,u,'S1');const n=executeAttack(heroes,b,'S1',t.id,'normal',()=>0,{automaticDualAttacks:false});assert.ok(hasBuff(get(n,t.id),'stic_def_dn'));
 const reduced=structuredClone(t);grantBuff(b,reduced,'stic_def_dn',1,'test');assert.equal(n.damageEvents.find(e=>e.kind==='additionalDamage').amount,additionalDamageAmount(u,reduced,d.additionalDamage[0]));
});
test('additional damage respects barriers, Invincibility and Immortality; does not enable deferred Laceration coverage',()=>{
 for(const id of ['stic_protect','stic_invincible','stic_immortality']){const b=fixture(),u=get(b,'left-0'),t=get(b,'right-0');t.currentHp=100;grantBuff(b,t,id,2,'test',{barrier:10000});grantBuff(b,t,'stic_laceration',2,'test');applyAdditionalDamage(b,u,{name:'test',additionalDamage:[{basis:'hp',ratio:.07}]},'S1',[{id:t.id,outcome:'normal'}]);assert.equal(t.currentHp,id==='stic_immortality'?1:100);assert.equal(t.injuryFraction,0);}
});
test('dead targets are not damaged again, and source changes disable reviewed activation',()=>{
 const b=fixture(),u=get(b,'left-0'),t=get(b,'right-0');t.currentHp=0;applyAdditionalDamage(b,u,{name:'test',additionalDamage:[{basis:'hp',ratio:.07}]},'S1',[{id:t.id,outcome:'normal'}]);assert.equal(b.damageEvents,undefined);
 const snapshot=read('cecilia'),h=Object.values(snapshot.heroes).find(h=>h.id==='c1156');h.skills[0].multipliers+=' Changed';assert.equal(createCatalog(read('heroes'),snapshot.heroes).Albedo.skills.S1.damageSupport,'unsupported');
});

test('artifact opt-out affects the chosen caster, not an opposing counterattacker',()=>{
 const b=fixture('Ras'),u=get(b,'left-0'),enemy=get(b,'right-0');u.additionalDamageArtifact='rocket_punch_gauntlet';enemy.additionalDamageArtifact='uberius_tooth';enemy.counterChance=100;
 const n=cast(b,'S1','normal',{automaticArtifactDamage:false});const events=n.damageEvents.filter(e=>e.kind==='additionalDamage');assert.equal(events.length,1);assert.equal(events[0].unitId,u.id);
});
test('optional artifact settings validate old builds and reject unknown profiles or invalid chances',()=>{
 const t=defaultTeams(heroes);assert.ok(validTeams(t,heroes));t.left[0].additionalDamageArtifact='unknown';assert.equal(validTeams(t,heroes),false);t.left[0].additionalDamageArtifact='rocket_punch_gauntlet';t.left[0].artifactProcChance=101;assert.equal(validTeams(t,heroes),false);
});
test('ae-KARINA S3 applies its primary effects and DEF-scaled splash independently to all enemies',()=>{
 const b=fixture('ae-KARINA'),n=executeAttack(heroes,b,'S3','right-0','normal',()=>0,{automaticDualAttacks:false});assert.equal(n.damageEvents.filter(e=>e.kind==='additionalDamage').length,3);assert.ok(hasBuff(get(n,'left-0'),'stic_speed_up'));assert.ok(hasBuff(get(n,'right-0'),'stic_def_dn'));
 const extra=n.damageEvents.filter(e=>e.kind==='additionalDamage');assert.ok(extra.find(e=>e.unitId==='right-0').amount>extra.find(e=>e.unitId!=='right-0').amount);
});
test('a missed Albedo attack suppresses her skill component while her artifact component still procs',()=>{
 const b=fixture(),u=get(b,'left-0');u.additionalDamageArtifact='three_f';const missed=cast(b,'S1','miss');assert.equal(missed.damageEvents.filter(e=>e.kind==='additionalDamage').length,1);
 const landed=cast(b,'S1','normal');assert.equal(landed.damageEvents.filter(e=>e.kind==='additionalDamage').length,2);
});
