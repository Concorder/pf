import { createPortal } from "react-dom";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLab } from "../context.js";
const EMPTY = [];
export default function DamageFloats({ unitId }) {
  const { damageEvents = EMPTY } = useLab();
  const [visible, setVisible] = useState(EMPTY);
  const root = useRef(null);
  useEffect(() => {
    const events = damageEvents.filter(event => event.unitId === unitId);
    setVisible(events);
    if (!events.length) return;
    const timer = setTimeout(() => setVisible(EMPTY), 1700 + Math.max(...events.map((event,index)=>event.delayMs ?? index*100)));
    return () => clearTimeout(timer);
  }, [damageEvents, unitId]);
  useLayoutEffect(() => {
    if (!visible.length || !root.current) return;
    const scene = document.getElementById("scene");
    if (!scene) return;
    const place = () => {
      if (!root.current) return;
      const target = [...scene.querySelectorAll(".hero-card")].find(e => e.dataset.unitId === unitId);
      if (!target) return;
      const bounds = scene.getBoundingClientRect(), anchor = target.getBoundingClientRect();
      Object.assign(root.current.style, {left: `${anchor.left - bounds.left}px`, top: `${anchor.top - bounds.top}px`, width: `${anchor.width}px`, height: `${anchor.height}px`});
      for (const number of root.current.querySelectorAll(".damage-float")) {
        const half = number.offsetWidth * .58 + 5;
        const shift = parseFloat(number.parentElement.style.getPropertyValue("--damage-shift")) || 0;
        const desired = anchor.x + anchor.width / 2 + shift;
        const center = Math.max(bounds.left + half, Math.min(bounds.right - half, desired));
        number.style.left = `${center - anchor.x}px`;
      }
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(scene);
    return () => observer.disconnect();
  }, [visible]);
  const scene = document.getElementById("scene");
  if (!visible.length || !scene) return null;
  return createPortal(
    <span ref={root} className="damage-floats" data-unit-id={unitId} aria-hidden="true">
      {visible.map((event, index) => (
        <span className="damage-float-group" key={event.id}
          style={{"--damage-delay": `${event.delayMs ?? index * 100}ms`, "--damage-shift": `${[0,-12,12][index % 3]}px`}}>
          {event.hit === "miss" && <span className="damage-miss-label">MISS</span>}
          <span className={`damage-float damage-${event.hit}`} data-hit={event.hit} data-damage={event.amount}>
            <span className="damage-number-outline">{event.amount.toLocaleString()}</span>
            <span className="damage-number-fill">{event.amount.toLocaleString()}</span>
          </span>
        </span>
      ))}
    </span>, scene
  );
}
