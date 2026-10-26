import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {createCatalog, normalizeSkill} from "../data/cecilia.js";
import {defaultTeams,makeHero} from "./heroes.js";
import {createBattle,executeAttack,activeUnit} from "./battle.js";
import {changeBuff} from "./buffs.js";
import {planProtectedDamage} from "./damageProtection.js";
import {inflictInjury,maxHp} from "./health.js";
const cached=JSON.parse(fs.readFileSync(new URL('../../public/data/cecilia.json',import.meta.url)));
const heroes=createCatalog(JSON.parse(fs.readFileSync(new URL('../../public/data/heroes.json',import.meta.url))),cached.heroes);
const get=(b,slot=0)=>b.units.find(u=>u.id===`right-${slot}`);
const fixture=(hp=8000)=>{
 const t=defaultTeams(heroes);
 t.left[0]=makeHero(heroes,'Cermia');t.left[0].stats.spd=350;t.left[0].stats.atk=20000;
 t.right[0]=makeHero(heroes,'Spirit Eye Celine');t.right[0].stats.hp=hp;t.right[0].stats.def=0;
 t.right[2]=makeHero(heroes,'Lady of the Scales');t.right[2].stats.hp=100000;
 return createBattle(t,{left:0,right:0},heroes);
};
test("native Celine cap defaults to 50% without manual setup, before Offering's 70% transfer",()=>{
 const b=fixture(),celine=get(b);
 assert.equal(celine.damageLimit,0);assert.equal(celine.passiveDamageLimit,50);
 for(const incoming of [10000,100000,1000000]){
  const p=planProtectedDamage(b,celine,incoming);
  assert.equal(p.limited,4000);assert.equal(p.targetDamage,1200);assert.equal(p.transferred,2800);
 }
 const next=executeAttack(heroes,b,'S1',celine.id,'crit',()=>.999,{automaticDebuffs:false,automaticReactions:false});
 assert.equal(get(next).currentHp,6800);assert.equal(get(next,2).currentHp,97200);
 assert.equal(next.damageEvents.find(e=>e.unitId===celine.id).amount,1200);
 assert.equal(celine.currentHp,8000);
});
test("native limit uses injury-adjusted max HP, not current remaining HP",()=>{
 const b=fixture(16000),celine=get(b);
 inflictInjury(celine,8000);celine.currentHp=2000;
 assert.equal(maxHp(celine),8000);
 const p=planProtectedDamage(b,celine,100000);
 assert.equal(p.limited,4000);assert.equal(p.targetDamage,1200);
});
test("Frostbite and sharing bypass preserve Celine's cap; Seal suppresses the native passive",()=>{
 const b=fixture();
 const bypass=planProtectedDamage(b,get(b),100000,{attacker:{ignoreDamageSharing:true}});
 assert.equal(bypass.targetDamage,4000);
 const frozen=changeBuff(b,'right-0','stic_freezing',2);
 assert.equal(planProtectedDamage(frozen,get(frozen),100000).targetDamage,4000);
 const sealed=changeBuff(b,'right-0','stic_dizzy',2);
 assert.equal(planProtectedDamage(sealed,get(sealed),100000).targetDamage,30000);
 get(sealed).damageLimit=25;
 assert.equal(planProtectedDamage(sealed,get(sealed),100000).targetDamage,600);
});
test("screenshot max HP of 17,000 means a 2,550 post-share ceiling, while smaller hits remain smaller",()=>{
 const b=fixture(17000);
 assert.equal(planProtectedDamage(b,get(b),100000).targetDamage,2550);
 const p=planProtectedDamage(b,get(b),7510);
 assert.equal(p.limited,7510);assert.equal(p.targetDamage,2253);
});
test("changed passive wording or missing source cap reference disables the reviewed native mapping",()=>{
 const h=Object.values(cached.heroes).find(h=>h.id==='c2103'),s=h.skills[1];
 assert.equal(normalizeSkill(h,s,1).passiveDamageLimit,50);
 assert.equal(normalizeSkill(h,{...s,description:s.description+' Changed.'},1).passiveDamageLimit,null);
 assert.equal(normalizeSkill(h,{...s,common:[]},1).passiveDamageLimit,null);
});
