import {teamName} from "../engine/heroes.js";
import React from "react";
import Modal from "./Modal.jsx";
import {useLab} from "../context.js";
import {skillData} from "../engine/battle.js";
import {nonAttackRecipients} from "../engine/nonAttack.js";
export default function NonAttackDialog() {
  const l = useLab(), data = skillData(l.heroes,l.active,l.pending.skill,"active",{soulburn:l.soulburnSelection?.skill===l.pending.skill});
  const recipients = nonAttackRecipients(l.battle,l.active,data.nonAttack,l.pending.targetId);
  return <Modal id="nonAttackDialog" aria-labelledby="nonAttackTitle" onDismiss={() => l.setPending(null)}>
    <div className="dialog-heading">
      <div><span className="eyebrow">{l.active.name} · {l.pending.skill} · NON-ATTACK</span>
        <h2 id="nonAttackTitle">{data.name}</h2></div>
      <button className="subtle" aria-label="Cancel skill" autoFocus onClick={() => l.setPending(null)}>✕</button>
    </div>
    <p><b>{data.nonAttack.target === "team" ? teamName(l.active.side) : "Ally"}:</b> {recipients.map(u => u.name).join(", ")}</p>
    <p>{data.displayDescription ?? data.description}</p>
    {data.nonAttack.pending.length > 0 && <p className="fine">Pending: {data.nonAttack.pending.join(", ")}</p>}
    <p className="fine">Gains {l.active.skills[l.pending.skill].gain} souls. This action can be undone.</p>
    <button className="primary" id="confirmNonAttack" onClick={() => l.resolveHit("normal")}>Use skill →</button>
  </Modal>;
}
