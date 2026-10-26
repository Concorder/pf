import React from "react";
import {UNIT_RESOURCES, resourceValue} from "../engine/resources.js";
export default function UnitResource({unit, edit, compact = false}) {
  const def = UNIT_RESOURCES[unit?.resourceType];
  if (!def) return null;
  const value = resourceValue(unit);
  return <div className={`unit-resource resource-${unit.resourceType}${compact ? " resource-compact" : ""}`} title={`${def.name}: ${value} / ${def.max}`}>
    <div className="resource-caption">
      <span>{def.name}</span>
      {edit ? <label>
        <input key={`${unit.id}:${value}`} aria-label={`${def.name} for ${unit.name}`}
          type="number" min="0" max={def.max} step="any" defaultValue={value}
          onKeyDown={e => {if (e.key === "Enter") {e.preventDefault();e.currentTarget.blur();}}}
          onBlur={e => {
            const next = e.currentTarget.valueAsNumber;
            if (Number.isFinite(next)) edit(unit.id, next);
            else e.currentTarget.value = String(value);
          }} /> / {def.max}
      </label> : <b>{value} / {def.max}</b>}
    </div>
    <div className="resource-track" role="meter" aria-label={`${def.name} meter for ${unit.name}`}
      aria-valuemin={0} aria-valuemax={def.max} aria-valuenow={value}>
      {unit.resourceType === "focus" ? Array.from({length: 5}, (_, index) =>
        <span className="focus-block" key={index} aria-hidden="true">
          <i style={{width: `${Math.max(0, Math.min(1, value - index)) * 100}%`}} />
        </span>) : <span style={{width: `${value / def.max * 100}%`}} /> }
    </div>
  </div>;
}
