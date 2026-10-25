import test from "node:test";
import assert from "node:assert/strict";
import { alliesOf, allyInPosition } from "./targeting.js";
const fixture = () => ({units: ["left", "right"].flatMap(side => [0,1,2].map(slot =>
  ({id: `${side}-${slot}`, side, slot, currentHp: 1000}))) });
test("all allies includes caster, explicit except-caster excludes it, on either team", () => {
  const b=fixture();
  for(const side of ["left","right"]){
    const caster=b.units.find(u=>u.id===`${side}-0`);
    assert.deepEqual(alliesOf(b,caster).map(u=>u.id),[`${side}-0`,`${side}-1`,`${side}-2`]);
    assert.deepEqual(alliesOf(b,caster,{excludeCaster:true}).map(u=>u.id),[`${side}-1`,`${side}-2`]);
  }
});
test("foremost ally can be caster; an explicit exclusion does not invent a replacement", () => {
  const b=fixture(), caster=b.units.find(u=>u.id==="left-2");
  assert.equal(allyInPosition(b,caster,"foremost"),caster);
  assert.equal(allyInPosition(b,caster,"foremost",{excludeCaster:true}),null);
  assert.equal(allyInPosition(b,caster,"back").id,"left-0");
  caster.currentHp=0;
  assert.equal(allyInPosition(b,caster,"foremost"),null);
  assert.equal(allyInPosition(b,caster,"foremost",{includeDefeated:true}),caster);
});
