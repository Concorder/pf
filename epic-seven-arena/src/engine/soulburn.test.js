import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createCatalog} from '../data/cecilia.js';
import {defaultTeams,makeHero} from './heroes.js';
import {createBattle,executeAttack,skillData,damage,canUse} from './battle.js';
import {grantBuff,hasBuff} from './buffs.js';
import {recordSkillUse} from './skillEvents.js';
const read=n=>JSON.parse(fs.readFileSync(new URL(`../../public/data/${n}.json`,import.meta.url)));
const heroes=createCatalog(read('heroes'),read('cecilia').heroes),get=(b,id)=>b.units.find(u=>u.id===id);
function fixture(name,souls=40){const t=defaultTeams(heroes);t.left[0]=makeHero(heroes,name);for(const side of Object.values(t))for(const u of side.filter(Boolean)){u.stats.hp=100000;u.stats.spd=100;}t.left[0].stats.spd=350;t.right[0].stats.spd=300;return createBattle(t,{left:souls,right:0},heroes);}
const burn=(b,s,t='right-0',hit='normal',extra={})=>executeAttack(heroes,b,s,t,hit,()=>.999,{automaticDualAttacks:false,soulburn:true,...extra});
test('explicit ae-GISELLE damage Soulburn uses rate 1.7, consumes 10 before gains, and emits an isolated Soulburn event',()=>{
 const b=fixture('ae-GISELLE'),u=get(b,'left-0'),t=get(b,'right-0'),normal=skillData(heroes,u,'S1'),d=skillData(heroes,u,'S1','active',{soulburn:true});
 assert.equal(normal.rate,1);assert.equal(d.rate,1.7);assert.ok(d.displayDescription.includes('Soulburn (10 souls): Increases damage dealt.'));
 const amount=damage(u,t,d,'normal'),n=burn(b,'S1');assert.equal(get(n,t.id).currentHp,100000-amount);assert.equal(n.souls.left,31);assert.equal(b.souls.left,40);assert.equal(get(n,u.id).soulburnUses,1);
 assert.equal(n.skillUseEvents[0].soulburn,true);assert.ok(n.skillUseEvents[0].tags.includes('soulburn'));assert.ok(n.skillUseEvents[0].tags.includes('attack'));assert.equal(skillData(heroes,u,'S1').rate,1);
});
test('Soulburn validates cost before gains, target, cooldown and supported variant without mutation',()=>{
 const b=fixture('ae-GISELLE',9);assert.equal(canUse(heroes,b,get(b,'left-0'),'S1',{soulburn:true}),false);assert.equal(burn(b,'S1'),b);
 const enough=fixture('ae-GISELLE');assert.equal(burn(enough,'S1','left-1'),enough);get(enough,'left-0').cooldowns.S1=1;assert.equal(burn(enough,'S1'),enough);
 const unsupported=fixture('Luna');assert.equal(burn(unsupported,'S1'),unsupported);assert.equal(canUse(heroes,b,get(b,'left-0'),'wait',{soulburn:true}),false);
 const cost=fixture('ae-GISELLE',11);get(cost,'left-0').skills.S1.cost=2;assert.equal(burn(cost,'S1'),cost);
});
test('normal cast remains normal and affordable without the Soulburn cost',()=>{
 const b=fixture('ae-GISELLE',0);const n=executeAttack(heroes,b,'S1','right-0','normal',()=>.999,{automaticDualAttacks:false});assert.equal(n.souls.left,1);assert.equal(n.skillUseEvents[0].soulburn,false);assert.equal(n.skillUseEvents[0].tags.includes('soulburn'),false);
});
test('Soulburn extra-turn effect grants an actual turn and extraTurn/soulburn execution tags',()=>{
 const b=fixture('Aria'),n=burn(b,'S1');assert.equal(n.active,'left-0');assert.equal(n.turn,b.turn+1);assert.equal(n.souls.left,21);assert.ok(n.skillUseEvents[0].tags.includes('extraTurn'));assert.ok(n.skillUseEvents[0].tags.includes('soulburn'));
 const plain=executeAttack(heroes,b,'S1','right-0','normal',()=>.999,{automaticDualAttacks:false});assert.equal(plain.skillUseEvents[0].tags.includes('extraTurn'),false);
});
test('ignore-ER Soulburn applies to strips and debuffs while respecting miss and status immunity',()=>{
 const b=fixture('Basar');for(const u of b.units.filter(u=>u.side==='right'))u.stats.efr=1000;grantBuff(b,get(b,'right-0'),'stic_debuf_impossible',2,'test');
 const n=burn(b,'S3');assert.equal(hasBuff(get(n,'right-0'),'stic_debuf_impossible'),false);assert.ok(hasBuff(get(n,'right-0'),'stic_buf_impossible'));
 const normal=executeAttack(heroes,b,'S3','right-0','normal',()=>.999,{automaticDualAttacks:false});assert.equal(hasBuff(get(normal,'right-0'),'stic_buf_impossible'),false);
 const miss=burn(b,'S3','right-0','miss');assert.equal(hasBuff(get(miss,'right-0'),'stic_buf_impossible'),false);
 const sanctuary=fixture('Basar');sanctuary.sanctuaryOfBattle=true;assert.equal(hasBuff(get(burn(sanctuary,'S3'),'right-0'),'stic_buf_impossible'),false);
});
test('combined proc/ignore-ER Soulburn and current-skill cooldown reduction execute their stated effects',()=>{
 const b=fixture('Alencia');get(b,'right-0').stats.efr=1000;const n=burn(b,'S1');assert.ok(hasBuff(get(n,'right-0'),'stic_def_dn'));
 const ras=fixture('Ras'),plain=executeAttack(heroes,ras,'S2','right-0','normal',()=>.999,{automaticDualAttacks:false});const boosted=burn(ras,'S2');assert.equal(get(boosted,'left-0').cooldowns.S2,Math.max(0,get(plain,'left-0').cooldowns.S2-2));
});
test('buff-duration Soulburn extends only the buffs granted by this skill',()=>{
 const b=fixture('Mercedes');grantBuff(b,get(b,'left-1'),'stic_speed_up',2,'test');const n=burn(b,'S3');for(const u of n.units.filter(u=>u.side==='left'))assert.equal(u.buffs.find(b=>b.id==='stic_att_up').turns,3);assert.equal(get(n,'left-1').buffs.find(b=>b.id==='stic_speed_up').turns,2);
});
test('opposing-side Soulburn watchers run first and a normal cast does not activate them',()=>{
 const b=fixture('ae-GISELLE');for(const [id,relation] of [['left-1','allyExceptSelf'],['right-0','enemy']])get(b,id).watchers=[{id,event:'skillUsed',actorRelation:relation,kind:'passive',source:'passive',handler:'solNonAttack',tagsAll:['soulburn'],cooldown:0}];
 const n=burn(b,'S1');assert.deepEqual(n.watcherEvents.map(e=>e.ownerId),['right-0','left-1']);const plain=executeAttack(heroes,b,'S1','right-0','normal',()=>.999,{automaticDualAttacks:false});assert.equal(plain.watcherEvents?.length||0,0);
});
test('counter and Dual Attack events cannot inherit Soulburn flags, tags or extra turns',()=>{
 const b=fixture('ae-GISELLE');get(b,'right-0').counterChance=100;const n=executeAttack(heroes,b,'S1','right-0','normal',()=>0,{soulburn:true});assert.ok(n.skillUseEvents.some(e=>e.kind==='dual'));assert.ok(n.skillUseEvents.some(e=>e.kind==='counter'));
 for(const event of n.skillUseEvents.filter(e=>e.kind!=='active')){assert.equal(event.soulburn,false);assert.equal(event.tags.includes('soulburn'),false);}
 const d=heroes.Aria.skills.S1;for(const kind of ['dual','counter','additional']){const event=recordSkillUse(b,get(b,'left-0'),'S1',d,{kind,soulburn:true});assert.equal(event.soulburn,false);assert.equal(event.tags.includes('extraTurn'),false);}
});
test('Celine EE makes only her first Soulburn free with 50% extra damage; Undo snapshot and EE-off stay independent',()=>{
 const b=fixture('Spirit Eye Celine',0),u=get(b,'left-0'),t=get(b,'right-0'),d=skillData(heroes,u,'S1','active',{soulburn:true});assert.equal(d.soulburn.cost,0);assert.equal(d.damageMultiplier,1.5);
 const amount=damage(u,t,d,'normal'),n=burn(b,'S1');assert.equal(get(n,t.id).currentHp,100000-amount);assert.equal(n.souls.left,1);assert.equal(n.active,u.id);assert.equal(skillData(heroes,get(n,u.id),'S1').soulburn.cost,20);assert.equal(skillData(heroes,u,'S1').soulburn.cost,0);
 const disabled=fixture('Spirit Eye Celine',0);get(disabled,'left-0').eeEnabled=false;assert.equal(burn(disabled,'S1'),disabled);
});
test('changed coefficient source cannot silently retain a reviewed damage Soulburn',()=>{
 const snapshot=read('cecilia'),h=Object.values(snapshot.heroes).find(h=>h.id==='c1138');h.skills[0].multipliers+=' Changed';const c=createCatalog(read('heroes'),snapshot.heroes);assert.equal(c['ae-GISELLE'].skills.S1.soulburn.supported,false);
});

test('Violet Soulburn increases his mapped Attack Down to 100% and the stated two-turn duration',()=>{
 const b=fixture('Violet');const n=executeAttack(heroes,b,'S1','right-0','normal',()=>.8,{soulburn:true,automaticDualAttacks:false});assert.equal(get(n,'right-0').buffs.find(b=>b.id==='stic_att_dn').turns,2);
 const normal=executeAttack(heroes,b,'S1','right-0','normal',()=>.8,{automaticDualAttacks:false});assert.equal(hasBuff(get(normal,'right-0'),'stic_att_dn'),false);
});
