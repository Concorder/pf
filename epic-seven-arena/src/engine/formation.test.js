import test from "node:test";
import assert from "node:assert/strict";
import { FORMATION_SLOTS, isInPosition, unitInPosition } from "./formation.js";
const fixture = () => ({units: ["left", "right"].flatMap(side => [0,1,2,3].map(slot =>
  ({id: `${side}-${slot}`, side, slot, currentHp: 1000}))) });
test("mirrored teams retain the same logical back and foremost slots", () => {
  const b = fixture();
  for (const side of ["left", "right"]) {
    assert.equal(unitInPosition(b, side, "back").id, `${side}-0`);
    assert.equal(unitInPosition(b, side, "foremost").id, `${side}-2`);
    for (const slot of [1,2,3]) assert.equal(isInPosition(b.units.find(u=>u.id===`${side}-${slot}`), "back"), false);
  }
  assert.equal(FORMATION_SLOTS.back, 0);
  assert.equal(FORMATION_SLOTS.foremost, 2);
});
test("position selectors honor living occupants and explicit caster exclusions without guessing a replacement", () => {
  const b = fixture();
  b.units.find(u=>u.id==="left-0").currentHp = 0;
  assert.equal(unitInPosition(b, "left", "back"), null);
  assert.equal(unitInPosition(b, "left", "back", {includeDefeated:true}).id, "left-0");
  assert.equal(unitInPosition(b, "right", "foremost", {excludeId:"right-2"}), null);
  b.units = b.units.filter(u=>u.id!=="left-2");
  assert.equal(unitInPosition(b, "left", "foremost"), null);
  assert.equal(unitInPosition(b, "left", "unknown"), null);
});
