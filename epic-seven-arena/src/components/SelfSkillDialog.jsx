import React from "react";
import { useLab } from "../context.js";
import Modal from "./Modal.jsx";
import Portrait from "./Portrait.jsx";
export default function SelfSkillDialog() {
  const l = useLab();
  return (
    <Modal
      id="selfSkillDialog"
      aria-labelledby="selfSkillTitle"
      onDismiss={() => l.setPending(null)}
    >
      <div className="dialog-heading">
        <div>
          <span className="eyebrow">{l.active.name} · S2 · SELF</span>
          <h2 id="selfSkillTitle">Hot Streak!</h2>
        </div>
        <button
          className="subtle"
          aria-label="Cancel self skill"
          autoFocus
          onClick={() => l.setPending(null)}
        >
          ✕
        </button>
      </div>
      <div className="hit-target">
        <Portrait name={l.active.name} />
        <div>
          <b>Greater Attack for 2 turns</b>
          <p>Reset All-In! (S3) cooldown and immediately take an extra turn.</p>
        </div>
      </div>
      <p className="fine">
        No enemy target or hit roll is needed. Gains {l.active.skills.S2.gain}{" "}
        souls
        {l.active.skills.S2.cost
          ? ` and costs ${l.active.skills.S2.cost} souls`
          : ""}
        . The entire action can be undone.
      </p>
      <button
        className="primary"
        id="confirmSelfSkill"
        onClick={() => l.resolveHit("normal")}
      >
        Use Hot Streak! →
      </button>
    </Modal>
  );
}
