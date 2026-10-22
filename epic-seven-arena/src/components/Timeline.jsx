import React from "react";
import { useLab } from "../context.js";
export default function Timeline() {
  const { battle } = useLab();
  return (
    <section className="panel timeline-panel">
      <div className="panel-title">
        <div>
          <span className="eyebrow">BATTLE TIMELINE</span>
          <h2>Every move, explained.</h2>
        </div>
        <span className="tag" id="eventCount">
          {battle ? `${battle.log.length} EVENTS` : "LIVE LOG"}
        </span>
      </div>
      <div id="log" className="log">
        {battle ? (
          battle.log.map((e, i) => (
            <div className="log-entry" key={`${e.turn}-${i}`}>
              <small>
                TURN {String(e.turn).padStart(2, "0")} · {e.details}
              </small>
              {e.message}
            </div>
          ))
        ) : (
          <div className="empty-log">
            <span>☷</span>
            <div>
              The arena is yours.
              <p>Start a battle to see actions and damage here.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
