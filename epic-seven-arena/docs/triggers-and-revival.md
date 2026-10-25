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
- **Arbiter Vildred S2:** a source-guarded death handler revives at its fully enhanced HP fraction and grants 100% readiness, respecting S2 cooldown. Seal at death blocks this handler even if later cleanup removes Seal. Revival resolves before victory checks, including start-of-turn DoT deaths. Focus, full-Focus S3, start-turn S3 reset and other unmapped effects remain pending.
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
