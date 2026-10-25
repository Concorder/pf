import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {createCatalog} from "../data/cecilia.js";
import {defaultTeams,makeHero} from "./heroes.js";
import {createBattle,executeAttack} from "./battle.js";
import {orderedEffects,grantBuff,hasBuff,dispelBuffs,cleanseDebuffs,changeBuff} from "./buffs.js";
const heroes=createCatalog(JSON.parse(fs.readFileSync(new URL('../../public/data/heroes.json',import.meta.url))),JSON.parse(fs.readFileSync(new URL('../../public/data/cecilia.json',import.meta.url))).heroes);
const fixture=(name="Tenebria")=>{
 const t=defaultTeams(heroes);t.left[0]=makeHero(heroes,name);t.left[0].stats.spd=350;
 for(const team of Object.values(t))for(const u of team.filter(Boolean))u.stats.hp=100000;
 return createBattle(t,{left:0,right:0},heroes);
};
const target=b=>b.units.find(u=>u.id==='right-0');
const add=(b,id,turns)=>grantBuff(b,target(b),id,turns,'test',{casterId:'left-0'});
const zero=()=>0;
test("display ordering is longest duration first, older applications first on ties, without mutation",()=>{
 const b=fixture();add(b,'stic_debuf_impossible',1);add(b,'stic_def_up',2);add(b,'stic_speed_up',2);
 const u=target(b),before=structuredClone(u.buffs);
 assert.deepEqual(orderedEffects(b,u.buffs).map(e=>e.id),['stic_def_up','stic_speed_up','stic_debuf_impossible']);
 assert.deepEqual(u.buffs,before);
 // Stored array order does not override explicit application age.
 assert.deepEqual(orderedEffects(b,[...u.buffs].reverse()).map(e=>e.id),['stic_def_up','stic_speed_up','stic_debuf_impossible']);
});
test("one strip removes the longer buff, two strips can leave short Immunity behind two protections",()=>{
 const b=fixture();add(b,'stic_debuf_impossible',1);add(b,'stic_def_up',2);add(b,'stic_speed_up',3);
 const u=target(b);
 assert.equal(dispelBuffs(b,u,1),1);assert.equal(hasBuff(u,'stic_speed_up'),false);assert.equal(hasBuff(u,'stic_debuf_impossible'),true);
 assert.equal(dispelBuffs(b,u,1),1);assert.equal(hasBuff(u,'stic_def_up'),false);assert.equal(hasBuff(u,'stic_debuf_impossible'),true);
 assert.equal(dispelBuffs(b,u,1),1);assert.equal(hasBuff(u,'stic_debuf_impossible'),false);
});
test("limited removal skips unique and undispellable effects without spending a removal",()=>{
 const b=fixture();add(b,'stic_demonpower_keep',10);add(b,'stic_crack_1_aura',10);add(b,'stic_debuf_impossible',1);add(b,'stic_def_up',2);
 const u=target(b);
 assert.equal(dispelBuffs(b,u,2),2);
 assert.equal(hasBuff(u,'stic_demonpower_keep'),true);assert.equal(hasBuff(u,'stic_crack_1_aura'),true);
 assert.equal(hasBuff(u,'stic_debuf_impossible'),false);assert.equal(hasBuff(u,'stic_def_up'),false);
});
test("limited cleanse uses the same duration/age ordering, with independent stacked instances",()=>{
 const b=fixture();add(b,'stic_att_dn',1);add(b,'stic_def_dn',3);add(b,'stic_blaze',2);add(b,'stic_blaze',2);
 add(b,'stic_death_0_keep',2);add(b,'stic_crack_1_aura',3);
 const u=target(b),burns=u.buffs.filter(e=>e.id==='stic_blaze');
 assert.equal(cleanseDebuffs(b,u,u.id,2),2);
 assert.equal(hasBuff(u,'stic_def_dn'),false);
 assert.deepEqual(u.buffs.filter(e=>e.id==='stic_blaze'),[burns[1]]);
 assert.equal(hasBuff(u,'stic_att_dn'),true);assert.equal(hasBuff(u,'stic_death_0_keep'),true);assert.equal(hasBuff(u,'stic_crack_1_aura'),true);
});
test("manual limited removal preserves previous snapshots and respects explicit count",()=>{
 const b=fixture();add(b,'stic_debuf_impossible',1);add(b,'stic_def_up',2);
 const next=changeBuff(b,'right-0','__dispel_all__',2,true,{removalCount:1});
 assert.equal(hasBuff(target(next),'stic_def_up'),false);assert.equal(hasBuff(target(next),'stic_debuf_impossible'),true);
 assert.equal(hasBuff(target(b),'stic_def_up'),true);
 assert.equal(changeBuff(b,'right-0','__dispel_all__',2,true,{removalCount:0}),b);
});
test("native one-buff dispel leaves Immunity behind longer protection before debuff/CR checks",()=>{
 const b=fixture();add(b,'stic_debuf_impossible',1);add(b,'stic_def_up',2);
 const next=executeAttack(heroes,b,'S2','right-0','normal',zero);
 assert.equal(heroes.Tenebria.skills.S2.automaticDispel.count,1);
 assert.equal(hasBuff(target(next),'stic_def_up'),false);assert.equal(hasBuff(target(next),'stic_debuf_impossible'),true);
 assert.equal(hasBuff(target(next),'stic_dodge_dn'),false);
 assert.ok(next.log.some(e=>e.message==='Cermia: CR setback immunity.'));
});
test("native two-buff strip removes longer protection plus Immunity before Burn rolls",()=>{
 const b=fixture('Researcher Carrot');add(b,'stic_debuf_impossible',1);add(b,'stic_def_up',2);
 const next=executeAttack(heroes,b,'S3','right-0','normal',zero);
 assert.equal(heroes['Researcher Carrot'].skills.S3.automaticDispel.count,2);
 assert.equal(hasBuff(target(next),'stic_debuf_impossible'),false);
 assert.equal(target(next).buffs.filter(e=>e.id==='stic_blaze').length,2);
 const protectedBattle=fixture('Researcher Carrot');add(protectedBattle,'stic_debuf_impossible',1);add(protectedBattle,'stic_def_up',2);add(protectedBattle,'stic_speed_up',3);
 const protectedHit=executeAttack(heroes,protectedBattle,'S3','right-0','normal',zero);
 assert.equal(hasBuff(target(protectedHit),'stic_debuf_impossible'),true);
 assert.equal(hasBuff(target(protectedHit),'stic_blaze'),false);
});


test("refresh moves a buff behind older same-duration buffs without changing its identity",()=>{
 const b=fixture();add(b,'stic_def_up',2);add(b,'stic_speed_up',2);
 const u=target(b),original=u.buffs.find(e=>e.id==='stic_def_up');
 const instance=original.instance;
 assert.deepEqual(orderedEffects(b,u.buffs).map(e=>e.id),['stic_def_up','stic_speed_up']);
 add(b,'stic_def_up',2);
 assert.equal(original.instance,instance);
 assert.deepEqual(orderedEffects(b,u.buffs).map(e=>e.id),['stic_speed_up','stic_def_up']);
 dispelBuffs(b,u,1);
 assert.equal(hasBuff(u,'stic_speed_up'),false);assert.equal(hasBuff(u,'stic_def_up'),true);
});
test("remaining duration still outranks refresh age",()=>{
 const b=fixture();add(b,'stic_def_up',3);add(b,'stic_speed_up',2);
 add(b,'stic_speed_up',2);
 assert.deepEqual(orderedEffects(b,target(b).buffs).map(e=>e.id),['stic_def_up','stic_speed_up']);
 add(b,'stic_speed_up',3);
 assert.deepEqual(orderedEffects(b,target(b).buffs).map(e=>e.id),['stic_def_up','stic_speed_up']);
 add(b,'stic_def_up',3);
 assert.deepEqual(orderedEffects(b,target(b).buffs).map(e=>e.id),['stic_speed_up','stic_def_up']);
});
test("refresh ordering is snapshot-safe and works when legacy effects lack an applicationOrder",()=>{
 const b=fixture();add(b,'stic_def_up',2);add(b,'stic_speed_up',2);
 for(const e of target(b).buffs)delete e.applicationOrder;
 delete b.effectSerial;
 const next=changeBuff(b,'right-0','stic_def_up',2,false,{casterId:'left-0'});
 assert.deepEqual(orderedEffects(next,target(next).buffs).map(e=>e.id),['stic_speed_up','stic_def_up']);
 assert.deepEqual(orderedEffects(b,target(b).buffs).map(e=>e.id),['stic_def_up','stic_speed_up']);
});
