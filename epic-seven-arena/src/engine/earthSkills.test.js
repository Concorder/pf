import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createCatalog} from '../data/cecilia.js';
import {defaultTeams,makeHero} from './heroes.js';
import {createBattle,executeAttack,executeReaction,resolveDeaths,skillData,damage,canUse} from './battle.js';
import {grantBuff,hasBuff,effectiveStats,sufferDamage,applyCRChange,startTurnEffects,dispelBuffs} from './buffs.js';
import {applySkillEffects} from './skillEffects.js';
import {resourceValue} from './resources.js';
import {maxHp} from './health.js';
const read=n=>JSON.parse(fs.readFileSync(new URL(`../../public/data/${n}.json`,import.meta.url)));
const heroes=createCatalog(read('heroes'),read('cecilia').heroes),get=(b,id)=>b.units.find(u=>u.id===id);
function fixture(name,enemyName=null,allyName=null){const t=defaultTeams(heroes);t.left[0]=makeHero(heroes,name);if(enemyName)t.right[0]=makeHero(heroes,enemyName);if(allyName)t.left[1]=makeHero(heroes,allyName);for(const side of Object.values(t))for(const u of side.filter(Boolean)){u.stats.hp=100000;u.stats.spd=100;u.stats.chc=0;}t.left[0].stats.spd=350;t.right[0].stats.spd=300;return createBattle(t,{left:0,right:0},heroes);}
const opts={automaticDualAttacks:false};
const cast=(b,s,t=null,hit='normal',random=()=>.999)=>executeAttack(heroes,b,s,t,hit,random,opts);
test('nine Earth support casts are classified and usable without invented damage or hit rolls',()=>{
 for(const [name,s] of [['Destina','S2'],['Destina','S3'],['Ray','S3'],['Roana','S3'],['Violet','S2'],['Zahhak','S2'],['Young Senya','S3'],['Saria','S3'],['Ocean Breeze Luluca','S3']]){
  const b=fixture(name),u=get(b,'left-0'),d=skillData(heroes,u,s);assert.equal(d.damageSupport,'nonAttack',name);assert.deepEqual(d.tags.includes('attack'),false);assert.ok(canUse(heroes,b,u,s),name);
  assert.notEqual(cast(b,s,d.nonAttack.target==='ally'?'left-1':null,'normal',()=>{throw Error('support cast rolled');}),b,name);
 }
});
test('Destina S2 cleanses before healing at max enhancement and grants CR; healing respects injury and Unhealable',()=>{
 const b=fixture('Destina'),a=get(b,'left-1');a.currentHp=10000;grantBuff(b,a,'stic_heal_impossible',2,'test');grantBuff(b,a,'stic_att_dn',2,'test');
 const n=cast(b,'S2',a.id);assert.equal(get(n,a.id).currentHp,30800);assert.equal(hasBuff(get(n,a.id),'stic_att_dn'),false);assert.equal(get(b,a.id).currentHp,10000);
 const c=fixture('Destina');get(c,'left-1').injuryFraction=.5;get(c,'left-1').currentHp=40000;assert.equal(get(cast(c,'S2','left-1'),'left-1').currentHp,50000);
});
test('Destina S3 revives at 30%, only heals initially living allies, and opens with undispellable Spirit Blessing',()=>{
 const b=fixture('Destina'),u=get(b,'left-0'),a=get(b,'left-1');u.currentHp=10000;sufferDamage(b,a,200000);resolveDeaths(heroes,b);
 assert.equal(effectiveStats(u).efr,u.stats.efr+60);const n=cast(b,'S3');assert.equal(get(n,a.id).currentHp,30000);assert.equal(get(n,u.id).currentHp,50500);
 assert.ok(hasBuff(get(n,u.id),'stic_spirit_keep'));
});
test('Roana heals, grants a single strongest barrier and a consumable 30% revival buff',()=>{
 const b=fixture('Roana'),a=get(b,'left-1');a.currentHp=10000;const n=cast(b,'S3'),v=get(n,a.id);assert.equal(v.currentHp,35000);assert.equal(v.buffs.find(b=>b.id==='stic_protect').barrier,15000);
 sufferDamage(n,v,10000);assert.equal(v.currentHp,35000);assert.equal(v.buffs.find(b=>b.id==='stic_protect').barrier,5000);
 applySkillEffects(heroes,n,get(n,'left-0'),heroes.Roana.skills.S3,[{kind:'barrier',target:'selected',ratio:.01,basis:'casterHp',turns:2}],v.id);assert.equal(v.buffs.find(b=>b.id==='stic_protect').barrier,5000);
 sufferDamage(n,v,100000);resolveDeaths(heroes,n);assert.equal(v.currentHp,30000);assert.equal(hasBuff(v,'stic_bless'),false);assert.equal(v.buffs.some(b=>b.id==='stic_protect'),false);
});
test('Revive buff is not a passive: Seal does not suppress it; Extinction and Hecate do',()=>{
 for(const mode of ['seal','extinct','hecate']){const b=fixture('Roana'),a=get(b,'left-1');grantBuff(b,a,'stic_bless',2,'test');if(mode==='seal')grantBuff(b,a,'stic_dizzy',2,'test');if(mode==='extinct')a.extinct=true;if(mode==='hecate')get(b,'right-0').hecateRestrictions=true;sufferDamage(b,a,200000);resolveDeaths(heroes,b);assert.equal(a.currentHp,mode==='seal'?30000:0,mode);}
});
test('Saria grants team Invincibility and Attack; Invincibility absorbs incoming damage',()=>{
 const n=cast(fixture('Saria'),'S3');for(const a of n.units.filter(u=>u.side==='left')){assert.ok(hasBuff(a,'stic_invincible'));const hp=a.currentHp;sufferDamage(n,a,500000);assert.equal(a.currentHp,hp);}
});
test('Violet S2 cleanses, heals 15%, grants Perception and a real extra turn',()=>{
 const b=fixture('Violet'),u=get(b,'left-0');u.currentHp=50000;grantBuff(b,u,'stic_att_dn',2,'test');const n=cast(b,'S2'),v=get(n,u.id);assert.equal(n.active,u.id);assert.equal(v.currentHp,65000);assert.equal(effectiveStats(v).chc,15);assert.equal(effectiveStats(v).chd,v.stats.chd+15);assert.equal(v.buffs.find(b=>b.id==='stic_detection_keep').turns,3);
});
test('Violet S3 scales with fractional Focus, consumes it and resets only at full Focus',()=>{
 for(const focus of [2.5,5]){const b=fixture('Violet'),u=get(b,'left-0'),t=get(b,'right-0');u.resourceValue=focus;const d=skillData(heroes,u,'S3');assert.equal(d.damageMultiplier,1+focus*.15);const amount=damage(u,t,d,'normal');const n=cast(b,'S3',t.id);assert.equal(get(n,t.id).currentHp,100000-amount);assert.equal(resourceValue(get(n,u.id)),0);assert.equal(get(n,u.id).cooldowns.S3,focus===5?0:u.skills.S3.cd+1);}
});
test('Violet has ready-S3 evasion and passive counter on miss; Seal and cooldown suppress them',()=>{
 const b=fixture('Violet'),v=get(b,'left-0');assert.equal(effectiveStats(v).evasion,35);v.cooldowns.S3=1;assert.equal(effectiveStats(v).evasion,0);v.cooldowns.S3=0;grantBuff(b,v,'stic_dizzy',2,'test');assert.equal(effectiveStats(v).evasion,0);
});
test('Young Senya grants stackable continuous healing, with 15% start-turn recovery and normal heal blocking',()=>{
 const n=cast(fixture('Young Senya'),'S3'),a=get(n,'left-1');a.currentHp=30000;startTurnEffects(n,a,()=>.999);assert.equal(a.currentHp,45000);grantBuff(n,a,'stic_heal_impossible',2,'test');startTurnEffects(n,a,()=>.999);assert.equal(a.currentHp,45000);
});
test('Zahhak S2 allows self or ally, grants only caster buffs and extra turn; S3 injuries use actual loss with a 35% ceiling',()=>{
 const b=fixture('Zahhak');const n=cast(b,'S2','left-1');assert.equal(n.active,'left-0');assert.ok(hasBuff(get(n,'left-0'),'stic_increase_hit'));assert.equal(hasBuff(get(n,'left-1'),'stic_att_up'),false);
 const c=fixture('Zahhak');get(c,'left-0').stats.atk=1000000;const x=cast(c,'S3','right-0');assert.equal(get(x,'right-0').injuryFraction,.35);assert.ok(hasBuff(get(x,'left-0'),'stic_invincible'));
});
test('Ram passive stats and CR decrease immunity, and ae-GISELLE CR amplification, obey Seal',()=>{
 const b=fixture('Ram'),u=get(b,'left-0');assert.equal(effectiveStats(u).atk,u.stats.atk);assert.equal(applyCRChange(b,u,-30).amount,0);grantBuff(b,u,'stic_dizzy',2,'test');assert.equal(effectiveStats(u).atk,u.stats.atk/1.3);assert.equal(applyCRChange(b,u,-30).amount,-30);
 const c=fixture('ae-GISELLE'),a=get(c,'left-1');a.reviewedPassives=get(c,'left-0').reviewedPassives;const amount=applyCRChange(c,a,10).amount;assert.ok(Math.abs(amount-15)<.00001);
});
test('Earth conditional numeric branches follow reviewed e7calc coefficients',()=>{
 const b=fixture('Fenris'),u=get(b,'left-0'),t=get(b,'right-0');u.stats.hp=10000;u.baseMaxHp=10000;u.currentHp=10000;
 const d=skillData(heroes,u,'S3'),base=damage(u,t,{...d,hpDifferenceDamage:null},'normal');assert.ok(Math.abs(damage(u,t,d,'normal')-base*1.7)<2);
 const a=fixture('Arunka'),v=get(a,'left-0'),target=get(a,'right-0'),data=skillData(heroes,v,'S3');grantBuff(a,target,'stic_protect',2,'test',{barrier:10000});const normal=damage(v,target,{...data,damageCondition:null},'normal');assert.ok(Math.abs(damage(v,target,data,'normal')-normal*3.4)<4);assert.equal(data.hitTypes.includes('crit'),false);
 const y=fixture('Yulha'),yu=get(y,'left-0');yu.currentHp=10000;assert.ok(damage(yu,get(y,'right-0'),skillData(heroes,yu,'S3'),'normal')>damage({...yu,currentHp:100000},get(y,'right-0'),skillData(heroes,yu,'S3'),'normal'));
});
test('Bellona full Focus on S1 launches reviewed stronger S3 without a turn or cooldown tick',()=>{
 const b=fixture('Bellona'),u=get(b,'left-0');u.resourceValue=4;const n=cast(b,'S1','right-0','normal',()=>0);assert.equal(n.skillUseEvents.filter(e=>e.actorId===u.id).length,2);assert.equal(n.skillUseEvents[1].kind,'additional');assert.equal(get(n,u.id).cooldowns.S3,0);assert.equal(resourceValue(get(n,u.id)),3);assert.ok(hasBuff(n.units.find(u=>u.name==='Luna'),'stic_def_dn'));assert.equal(skillData(heroes,u,'S3','additional').rate,1.25);
});
test('Baiken S1 applies two independent bleeds and critical cooldown reduction; S2 grants extra turn and one bleed bypasses ER',()=>{
 const b=fixture('Baiken'),u=get(b,'left-0');u.cooldowns.S3=4;const n=cast(b,'S1','right-0','crit',()=>0);assert.equal(get(n,'right-0').buffs.filter(b=>b.id==='stic_blood').length,2);assert.equal(get(n,u.id).cooldowns.S3,3);
 const c=fixture('Baiken');get(c,'right-0').stats.efr=1000;const x=cast(c,'S2','right-0','crit',()=>0);assert.equal(x.active,'left-0');assert.equal(get(x,'right-0').buffs.filter(b=>b.id==='stic_blood').length,1);
});

test('Roana reacts to secondary attacks using actual allied target count; Seal suppresses the passive',()=>{
 for(const sealed of [false,true]){
  const b=fixture('Roana','Vildred'),u=get(b,'left-0'),a=get(b,'left-2');a.currentHp=20000;b.active='right-0';if(sealed)grantBuff(b,u,'stic_dizzy',2,'test');
  const n=executeReaction(heroes,b,{kind:'additional',actorId:'right-0',targetId:'left-0',skill:'S1',hit:'normal'},()=>.999);
  assert.equal(get(n,a.id).currentHp,sealed?20000:35500);assert.equal(n.watcherEvents?.some(e=>e.watcherId==='roana-secondary-attack')||false,!sealed);
 }
});
test('Ocean Luluca gains two Focus on enemy non-attack, and Arunka observes the ending enemy barrier',()=>{
 const b=fixture('Ocean Breeze Luluca','Flan');b.active='right-0';const n=cast(b,'S2','right-0');assert.equal(resourceValue(get(n,'left-0')),2);assert.ok(n.watcherEvents.some(e=>e.watcherId==='ocean-luluca-enemy-non-attack'));
 const a=fixture('Arunka');a.active='right-0';grantBuff(a,get(a,'right-0'),'stic_protect',2,'test',{barrier:1000});const x=cast(a,'wait');assert.ok(x.watcherEvents.some(e=>e.watcherId==='arunka-enemy-barrier'));
});
test('Yufine ready-S3 watcher needs an allied skill and a debuffed enemy; conditional extra-turn tags reflect actual crits',()=>{
 const b=fixture('Yufine',null,'Flan');b.active='left-1';grantBuff(b,get(b,'right-0'),'stic_att_dn',2,'test');const n=cast(b,'S2','left-1');assert.ok(n.watcherEvents.some(e=>e.watcherId==='yufine-ready-ally-skill'));
 const c=fixture('Baiken');const normal=cast(c,'S2','right-0');assert.equal(normal.skillUseEvents[0].tags.includes('extraTurn'),false);const crit=cast(c,'S2','right-0','crit');assert.equal(crit.skillUseEvents[0].tags.includes('extraTurn'),true);
});
test('changed Earth descriptions and numeric healing source text disable their reviewed rules',()=>{
 const snapshot=read('cecilia'),h=Object.values(snapshot.heroes).find(h=>h.id==='c2022');h.skills[1].multipliers+=' Changed';h.skills[0].description+=' Changed';
 const changed=createCatalog(read('heroes'),snapshot.heroes);assert.equal(changed.Destina.skills.S2.nonAttack,null);assert.equal(changed.Destina.skills.S1.earthReview,null);assert.equal(changed.Destina.skills.S1.damageSupport,'unsupported');
});

test('native Attack is not double counted in screen totals and combines additively with Attack Up',()=>{
 const b=fixture('Ram'),u=get(b,'left-0');const base=u.stats.atk;grantBuff(b,u,'stic_att_up',2,'test');assert.ok(Math.abs(effectiveStats(u).atk-base/1.3*1.8)<.000001);
 const c=fixture('Alencia'),a=get(c,'left-0');a.stats.chc=80;assert.equal(effectiveStats(a).chc,80);grantBuff(c,a,'stic_dizzy',2,'test');assert.equal(effectiveStats(a).chc,60);
});
test('Earth strip and direct debuff mappings resolve, including Basar S2 alongside existing S1/S3',()=>{
 assert.equal(heroes.Basar.skills.S2.automaticDebuffs.length,2);assert.equal(heroes.Basar.skills.S1.automaticDebuffs.length,1);assert.equal(heroes.Basar.skills.S3.automaticDebuffs.length,1);
 for(const name of ['Alencia','Frieren','Mui']){
  const b=fixture(name),t=get(b,'right-0');grantBuff(b,t,'stic_att_up',2,'test');grantBuff(b,t,'stic_debuf_impossible',1,'test');
  const n=cast(b,'S3',t.id,'normal',()=>0);assert.equal(hasBuff(get(n,t.id),'stic_att_up'),false,name);assert.equal(hasBuff(get(n,t.id),'stic_debuf_impossible'),false,name);
 }
 const b=fixture('Ram');const n=cast(b,'S3','right-0','normal',()=>0);assert.ok(hasBuff(get(n,'right-0'),'stic_def_dn'));assert.ok(hasBuff(get(n,'left-0'),'stic_att_up2'));
});
test('Ludwig reduces all ordinary buff durations before Stun while preserving undispellable durations',()=>{
 const b=fixture('Ludwig'),t=get(b,'right-0');grantBuff(b,t,'stic_debuf_impossible',1,'test');grantBuff(b,t,'stic_att_up',2,'test');grantBuff(b,t,'stic_possession_keep',3,'test');
 const n=cast(b,'S2',t.id,'normal',()=>0),v=get(n,t.id);assert.equal(hasBuff(v,'stic_debuf_impossible'),false);assert.ok(hasBuff(v,'stic_stun'));assert.equal(v.buffs.find(b=>b.id==='stic_att_up').turns,1);assert.equal(v.buffs.find(b=>b.id==='stic_possession_keep').turns,3);assert.ok(hasBuff(get(n,'left-0'),'stic_invincible'));
});

test('Zahhak injury does not come from absorbed damage or Invincibility',()=>{
 for(const id of ['stic_protect','stic_invincible']){const b=fixture('Zahhak'),t=get(b,'right-0');grantBuff(b,t,id,2,'test',{barrier:1000000});const n=cast(b,'S3',t.id);assert.equal(get(n,t.id).injuryFraction,0);assert.equal(get(n,t.id).currentHp,100000);}
});
