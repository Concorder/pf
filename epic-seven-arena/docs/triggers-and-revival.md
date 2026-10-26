# Reactions, passive triggers and revival

## Shared activation gate

`engine/triggers.js` separates **action kind** (`additional`, `counter`, `dual`) from **trigger origin** (`passive`, `equipment`, active skill or configured counter chance). Reviewed in-code handlers enter `dispatchTrigger`; source descriptions are never executed.

- **Bind** (`stic_restrict`, not CR Restrict): blocks the three secondary attack kinds only when the bearer is outside its own turn.
- **Cannot Counterattack**: blocks counters, including during the bearer’s turn; does not block Dual Attacks, additional skills or ordinary active skills.
- **Seal**: blocks implemented passive-origin activation, including death passives. It does not block active skills, configured gear/manual counters or equipment effects. It does not remove stat contributions already included in manually entered build totals. Unknown passive stat/trigger rules remain pending.
- These statuses apply to heroes only. Stun, Sleep, Fear and defeat also prevent reaction attacks. Death passives explicitly allow a dead bearer, while retaining Seal’s death-time state.

## Reviewed integrations

- **Highest-Attack Dual Attacks:** after the primary attack, rank living teammates by effective ATK and select the first eligible basic attacker. Skip Bind, Stun, Sleep, Fear, dead allies and unsupported basic attacks. If none qualify, no Dual Attack occurs. Seal and Cannot Counterattack do not disable an otherwise eligible active S1. Ras S2 and the reviewed Ken / Archdemon’s Shadow EE options share this selector, evaluated when the reaction is dispatched. Ken’s conditional damage formula remains unsupported; recognizing its EE does not enable an unsafe calculation. Regular-element EE options can be selected manually but remain unequipped by default; Moonlight EE defaults remain unchanged. Faithless Lidica’s source EE selects a random ally and is not classified as a highest-Attack effect.
- **Configured counters:** Hero Workshop has `Counterattack chance % (gear/manual)`, default zero. Each surviving primary attack target can request one S1 counter against the attacker. Skill descriptions that explicitly forbid counters suppress these requests. Passive-specific counter chances require their own mappings and must not be entered as a Seal-sensitive passive here.
- **Arbiter Vildred S2:** a source-guarded death handler revives at its fully enhanced HP fraction and grants 100% readiness, respecting S2 cooldown. Seal at death blocks this handler even if later cleanup removes Seal. Revival resolves before victory checks, including start-of-turn DoT deaths. Flat Focus gains and the revival maximum-Focus grant are implemented; full-Focus S3, start-turn S3 reset and other unmapped effects remain pending.
- **Archdemon’s Eye EE:** battle-start and Dark Contract-revival grants are equipment effects. They are not reclassified as passives. The revival grant occurs only after Dark Contract successfully revives the bearer.

## Event and turn boundaries

Primary damage, secondary damage and debuffs resolve before death handlers and the attack reaction queue. Reviewed skill buffs resolve before counters. Secondary attacks reuse hit, damage, debuff, injury and death handling without spending a normal turn, advancing time, consuming the reactor’s souls or ticking its buffs/cooldowns. Reacted skills do not currently add extra soul gain. The trigger is responsible for any specific resource or cooldown rules.

The root turn remains active during its reaction window. Duration ticking captures the effects present at action start; new or refreshed effects from a counter retain their full duration. A revival during the actor’s turn does not consume the newly granted EE buff as part of the old turn.

The queue is bounded to 32 entries. Secondary attacks **do not automatically enqueue further reaction attacks**. This is a conservative sandbox rule, not a claim that every in-game reaction chain behaves that way. Broader extra-attack/dual/counter chains need explicit reviewed rules. Additional-attack requests are supported by the gate/API; automatic mappings for other heroes’ additional skills remain pending.

## Revival state

`engine/revival.js` restores HP using the shared injured max-HP model, clears ordinary buffs/debuffs and preserves effects tagged `persistOnRevive`. Fracture has that tag: its exact stack count and remaining duration survive revival. Persistent injury and cooldowns remain. Collapse is cleared before HP restoration, so it cannot incorrectly lower the revived HP cap. Readiness is recalculated from the post-cleanse effective Speed.

The primitive rejects living units, invalid HP fractions, completed battles and an explicit `extinct` flag. Automatic Extinction application is not implemented yet. It runs inside a cloned battle action, so Undo restores death, revival, stacks, injury, cooldowns and all reaction outcomes together.

## Verification

Engine tests cover own-turn/out-of-turn Bind, counter-only blocking, Seal versus passive/equipment/gear origins, Ras’s selected Dual Attack, secondary action timing/resources, new-duration boundaries, revival cooldown, death-time Seal, victory ordering, DoT death, Fracture/injury preservation and old-build compatibility. Desktop/mobile browser checks cover configuration, counter execution/blocking, Undo, native revival/EE, Fracture and Seal.

## Dual Attack execution tags

Completed skill uses emit bounded `battle.skillUseEvents` records with the actor, turn owner, skill, target, action kind and resolved tags. The assisting hero's standard S1 carries the `dual-attack` tag in addition to its normal attack/target-scope tags. The caller's skill is not reclassified as a Dual Attack. These tags never mutate catalog skills, and an assisting S1 cannot inherit a Soulburn-only extra-turn tag. `skillTags(data, {kind: "dual"})` provides the same classification to reviewed reaction handlers. The event stream records execution context; it does not automatically enable unimplemented artifact/passive subscriptions.

Direct Dual Attack requests are restricted to S1. A transformation handler can set `canDualAttack: false` to exclude a unit whose basic skill cannot participate. The existing disabled-ally fallback and no-turn-tick rules remain. Supported secondary S1 status effects still execute, but unmapped healing, additional attacks and resources do not become supported merely because the skill was called as an assist. Counters and Dual Attacks cannot create recursive Dual Attack/counter chains under the current bounded reaction policy.

Natural Dual Attacks roll each eligible assisting ally's final chance independently (5% base, capped at 20% per hero). The active hero's chance is not used. These checks run before primary damage on an eligible S1 cast. No successes means no assist; one success selects that hero without another draw; multiple successes select exactly one successful hero uniformly. The selected ally executes its normal S1 after the primary attack. With allies at 5% and 9%, the chance of any assist is `1 - 0.95 × 0.91 = 13.55%`; two 5% allies give 9.75%. The cap applies individually, not to the team's combined probability.

Hero Workshop edits each hero's final assisting chance, including any manually configured gear/artifact/buff bonuses; old builds default to 5%. Explicit source prohibitions (`canTriggerDualAttack: false`), no eligible allies, and the engine's natural-assist opt-out skip these checks. Guaranteed source/EE calls bypass chance checks and never also request a natural assist. Other skill slots and secondary actions cannot roll natural assists.

If the original target dies before the assist, the assist is skipped without redirecting; the queued partner is rechecked for eligibility at execution. No normal-turn duration/cooldown/resource tick is performed for the partner. Equipment and buff contributions to the final build chance are currently manual totals; automatic artifact/passive chance mappings and unmapped form changes remain pending. Highest-ATK guaranteed selectors retain the previously confirmed next-eligible fallback.

## User-confirmed cross-team reaction priority

When one triggering skill/tag event qualifies watchers on both teams, reactions from the side opposing the event's actor run first, followed by reactions from that actor's team. Re-evaluate activation gates and conditions when dispatching each reaction, because an earlier reaction can defeat, Seal, disable or otherwise change a later participant. This rule does not establish the ordering of multiple reactions on the same side; stable ordering there remains an explicit sandbox policy until a skill-specific priority is reviewed.

Watcher filters are extended during unit-by-unit review rather than trying to enumerate every possible predicate in advance. Skill completion, actual extra-turn start, damage received, and HP threshold events are distinct triggers; a skill's extra-turn capability tag does not substitute for an actual extra-turn-start event.
