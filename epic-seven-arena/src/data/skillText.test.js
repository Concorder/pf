import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {formatSkillDescription} from "./skillText.js";
import {createCatalog} from "./cecilia.js";
const cached=JSON.parse(fs.readFileSync(new URL('../../public/data/cecilia.json',import.meta.url)));
const heroes=createCatalog(JSON.parse(fs.readFileSync(new URL('../../public/data/heroes.json',import.meta.url))),cached.heroes);
test("max enhancement formatting handles percentages, flat gains and decreasing turn counts independently",()=>{
 assert.equal(formatSkillDescription('Chance {{variable}}; gain {{variable}} Fighting Spirit; every {{variable}} turns.',
  [[.05,.025,.025],[30,2,3],[8,-1,-1]],{level:2}), 'Chance 100%; gain 35 Fighting Spirit; every 6 turns.');
 assert.equal(formatSkillDescription('{{variable}}',[[.075,0,.025,.15]],{level:2}),'100%');
 assert.equal(formatSkillDescription('{{variable}}',[[.00005]],{level:0}),'0.05%');
});
test("missing source numbers are labelled unavailable rather than displayed as raw placeholders or invented zero",()=>{
 assert.equal(formatSkillDescription('Value {{variable}} then {{variable}}',[[null],[.075,.025]],{level:1}), 'Value value unavailable then 100%');
 assert.equal(formatSkillDescription('{{variable}}',[[NaN]],{level:0}), 'value unavailable');
});
test("real multi-variable, flat and passive descriptions show max values",()=>{
 assert.match(heroes['Young Senya'].skills.S2.displayDescription,/gains 40 Fighting Spirit/);
 assert.match(heroes.Sven.skills.S2.displayDescription,/every 4 turns/);
 assert.equal((heroes.Luna.skills.S2.displayDescription.match(/30%/g)||[]).length,3);
 assert.match(heroes['Arbiter Vildred'].skills.S2.displayDescription,/revives to 100% Health/);
 assert.match(heroes['Spirit Eye Celine'].skills.S2.displayDescription,/does not exceed 50%/);
});
test("all cached hero skill placeholders resolve, while raw text and reviewed proc/passive guards remain intact",()=>{
 let count=0;
 for(const h of Object.values(heroes))for(const s of Object.values(h.skills||{})){
  count+=(s.description?.match(/\{\{variable\}\}/g)||[]).length;
  assert.ok(!s.displayDescription?.includes('{{'),`${h.name}: ${s.name}`);
  assert.ok(!s.displayDescription?.includes('value unavailable'),`${h.name}: missing values in ${s.name}`);
 }
 assert.equal(count,611);
 assert.match(heroes.Tenebria.skills.S1.description,/\{\{variable\}\}/);
 assert.ok(heroes.Tenebria.skills.S1.automaticDebuffs.length>0);
 assert.equal(heroes['Spirit Eye Celine'].skills.S2.passiveDamageLimit,50);
 assert.equal(heroes['Arbiter Vildred'].skills.S2.passiveRevival,1);
});
