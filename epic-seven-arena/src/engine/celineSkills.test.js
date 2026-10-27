import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createCatalog} from '../data/cecilia.js';
import {defaultTeams,makeHero} from './heroes.js';
import {createBattle,executeAttack,executeReaction,skillData,damage,canUse,resolveDeaths} from './battle.js';
import {grantBuff,hasBuff,effectiveStats,dispelBuffs,sufferDamage} from './buffs.js';
const read=n=>JSON.parse(fs.readFileSync(new URL(`../../public/data/${n}.json`,import.meta.url)));
const heroes=createCatalog(read('heroes'),read('cecilia').heroes);
const get=(b,id)=>b.units.find(u=>u.id===id);
function fixture(enemy=false){const t=defaultTeams(heroes);t[enemy?'right':'left'][0]=makeHero(heroes,'Spirit Eye Celine');
 for(const side of Object.values(t))for(const u of side.filter(Boolean)){u.stats.hp=100000;u.stats.spd=100;u.stats.chc=100;}
 t.left[0].stats.spd=350;return createBattle(t,{left:0,right:0},heroes);}
const opts={automaticDualAttacks:false};
test('Celine S3 cleanses all living allies including herself before granting Immortality and Possession',()=>{
 const b=fixture(),u=get(b,'left-0');assert.ok(canUse(heroes,b,u,'S1'));assert.ok(canUse(heroes,b,u,'S3'));
 for(const a of b.units.filter(x=>x.side==='left')){grantBuff(b,a,'stic_buf_impossible',2,'test');grantBuff(b,a,'stic_att_dn',2,'test');}
 const n=executeAttack(heroes,b,'S3',null,'normal',()=>.999,opts),c=get(n,u.id);
 for(const a of n.units.filter(x=>x.side==='left')){assert.ok(hasBuff(a,'stic_immortality'));assert.equal(hasBuff(a,'stic_buf_impossible'),false);}
 assert.ok(hasBuff(c,'stic_possession_keep'));assert.equal(c.buffs.find(x=>x.id==='stic_possession_keep').turns,3);
 assert.equal(c.cooldowns.S3,5);assert.equal(n.souls.left,3);assert.equal(hasBuff(u,'stic_possession_keep'),false);
});
test('Possession is undispellable buff, increases Attack, and obeys Cannot Buff and Sanctuary',()=>{
 const b=fixture(),u=get(b,'left-0');grantBuff(b,u,'stic_possession_keep',3,'test');assert.equal(effectiveStats(u).atk,u.stats.atk*1.25);
 dispelBuffs(b,u,'right-0',Infinity);assert.ok(hasBuff(u,'stic_possession_keep'));
 u.buffs=[];grantBuff(b,u,'stic_buf_impossible',2,'test');assert.equal(grantBuff(b,u,'stic_possession_keep',3,'test'),false);
 const s=fixture();s.sanctuaryOfBattle=true;const n=executeAttack(heroes,s,'S3',null,'normal',()=>.999,opts);assert.equal(hasBuff(get(n,'left-0'),'stic_possession_keep'),false);assert.equal(hasBuff(get(n,'left-1'),'stic_immortality'),false);
});
test('Celine S1 selects normal versus Nimble Sword using any actual buff, excluding Dual Attacks and unique effects',()=>{
 const b=fixture(),u=get(b,'left-0');assert.equal(skillData(heroes,u,'S1').penetration,0);
 grantBuff(b,u,'stic_sacrifice_aura',1,'test');assert.equal(skillData(heroes,u,'S1').celineNimble,false);
 grantBuff(b,u,'stic_debuf_impossible',1,'test');assert.equal(skillData(heroes,u,'S1').name,'Nimble Sword');assert.equal(skillData(heroes,u,'S1').penetration,.5);assert.equal(skillData(heroes,u,'S1').canTriggerDualAttack,false);
 assert.equal(skillData(heroes,u,'S1','dual').celineNimble,false);assert.equal(skillData(heroes,u,'S1','dual').penetration,0);
});
test('Nimble Sword buffs Attack before damage, penetrates Defense, heals 25%, and cannot summon a natural Dual Attack',()=>{
 const b=fixture(),u=get(b,'left-0'),t=get(b,'right-0');u.currentHp=50000;grantBuff(b,u,'stic_possession_keep',3,'test');
 const preview=structuredClone(u);grantBuff(b,preview,'stic_att_up',1,'test',{casterId:preview.id});
 const expected=damage(preview,t,skillData(heroes,u,'S1'),'normal');
 const n=executeAttack(heroes,b,'S1',t.id,'normal',()=>0),c=get(n,u.id);
 assert.equal(get(n,t.id).currentHp,100000-expected);assert.equal(c.currentHp,50000+Math.floor(expected*.25));assert.ok(hasBuff(c,'stic_att_up'));
 assert.equal(n.skillUseEvents.length,1);
 const blocked=fixture();get(blocked,'left-0').currentHp=50000;grantBuff(blocked,get(blocked,'left-0'),'stic_possession_keep',3,'test');grantBuff(blocked,get(blocked,'left-0'),'stic_heal_impossible',2,'test');
 const x=executeAttack(heroes,blocked,'S1','right-0','normal',()=>.999,opts);assert.equal(get(x,'left-0').currentHp,50000);
});
test('Dual Attack uses plain Mighty Strike without Attack buff, penetration or lifesteal',()=>{
 const b=fixture(),u=get(b,'left-0');b.active='left-1';u.currentHp=50000;grantBuff(b,u,'stic_possession_keep',3,'test');
 const expected=damage(u,get(b,'right-0'),skillData(heroes,u,'S1','dual'),'normal');
 const n=executeReaction(heroes,b,{kind:'dual',actorId:u.id,targetId:'right-0',skill:'S1',hit:'normal'},()=>.999);
 assert.equal(get(n,'right-0').currentHp,100000-expected);assert.equal(get(n,u.id).currentHp,50000);assert.equal(hasBuff(get(n,u.id),'stic_att_up'),false);
});
test('Possession counters critical hits once; normal hits, Bind and Cannot Counterattack do not counter',()=>{
 for(const [hit,block,expected] of [['crit',null,2],['normal',null,1],['crit','stic_restrict',1],['crit','stic_nocounterattack',1],['crit','stic_dizzy',2]]){
  const b=fixture(true),u=get(b,'right-0');grantBuff(b,u,'stic_possession_keep',3,'test');if(block)grantBuff(b,u,block,2,'test');
  const n=executeAttack(heroes,b,'S1',u.id,hit,()=>.999,opts);assert.equal(n.skillUseEvents.length,expected,`${hit}/${block}`);
  if(expected===2){assert.ok(hasBuff(get(n,u.id),'stic_att_up'));assert.equal(n.skillUseEvents[1].kind,'counter');}
 }
});

test('Celine reviewed formulas and S3 handlers disable on changed source descriptions',()=>{
 const snapshot=read('cecilia'),h=Object.values(snapshot.heroes).find(h=>h.id==='c2103');
 h.skills[0].description+=' Changed';h.skills[2].awakened.description+=' Changed';
 const changed=createCatalog(read('heroes'),snapshot.heroes);
 assert.equal(changed['Spirit Eye Celine'].skills.S1.damageSupport,'unsupported');assert.equal(changed['Spirit Eye Celine'].skills.S3.nonAttack,null);
});

test('S3 revives at exactly 1 HP before cleanse and team Immortality, preserving injury',()=>{
 const b=fixture(),ally=get(b,'left-1');ally.injuryFraction=.5;sufferDamage(b,ally,1000000);resolveDeaths(heroes,b);
 const n=executeAttack(heroes,b,'S3',null,'normal',()=>.999,opts),revived=get(n,ally.id);
 assert.equal(revived.currentHp,1);assert.equal(revived.injuryFraction,.5);assert.ok(hasBuff(revived,'stic_immortality'));
 assert.equal(n.souls.left,8);assert.equal(ally.currentHp,0);
 for(const block of ['extinct','hecate']){
  const x=fixture(),a=get(x,'left-1');sufferDamage(x,a,1000000);if(block==='extinct')a.extinct=true;else get(x,'right-0').hecateRestrictions=true;
  const next=executeAttack(heroes,x,'S3',null,'normal',()=>.999,opts);assert.equal(get(next,a.id).currentHp,0,block);
 }
});
test('Sixth Sense grants 5 souls and reduces cooldowns once per hero death, regardless of team',()=>{
 for(const id of ['left-1','right-0']){
  const b=fixture(),u=get(b,'left-0');u.cooldowns.S3=4;b.souls.left=96;
  sufferDamage(b,get(b,id),1000000);resolveDeaths(heroes,b);assert.equal(u.cooldowns.S3,3);assert.equal(b.souls.left,99);
  resolveDeaths(heroes,b);assert.equal(u.cooldowns.S3,3);
 }
});
test('Sixth Sense does not activate under Seal, for a non-hero death, or for a defeated owner',()=>{
 for(const mode of ['sealed','nonhero','dead']){
  const b=fixture(),u=get(b,'left-0'),victim=get(b,'left-1');u.cooldowns.S3=4;
  if(mode==='sealed')grantBuff(b,u,'stic_dizzy',2,'test');if(mode==='nonhero')victim.isHero=false;if(mode==='dead')u.currentHp=0;
  sufferDamage(b,victim,1000000);resolveDeaths(heroes,b);assert.equal(u.cooldowns.S3,4,mode);assert.equal(b.souls.left,0,mode);
 }
});
