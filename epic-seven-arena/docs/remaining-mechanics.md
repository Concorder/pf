# Reviewed mechanics and deferred questions

Block tracks effect ownership: external buffs are suppressed (including buffs already present), external cleansing is blocked, and the bearer can grant itself buffs or cleanse itself. Suppressed buffs retain their duration. Removing Block reactivates them; the strongest active stat family applies. Other beneficial-effect suppression remains unverified.

Random containers resolve uniformly within their reviewed pools. Class containers resolve by the bearer’s role; unknown roles are rejected. Containers are never stored as statuses. Automatic grants retain normal proc/resistance rules.

Reviewed all-buff and limited strips run in their specified pre/post-attack phase, before subsequent debuffs, with resistance checks and a popup override. Undispellable effects remain. Limited strips use the user-specified longest-duration/oldest-application order, matching the icons. Source guards reject changed descriptions rather than guessing. Some mapped hero skills remain unavailable because their damage formula or other required mechanics are unsupported.

Extinction marks direct lethal victims before death passives, blocking shared revival. Sigret S3 includes its reviewed 30% penetration plus 10% per debuff, capped at 100%. New battles clear Extinction. Other unimplemented skill effects remain pending.

Lilias S1 and Faithless Lidica’s reviewed EE select a random eligible ally. Highest-Attack selectors retain their separate descending-effective-Attack fallback. Disabled allies are excluded; no eligible ally means no Dual Attack.

The effects panel exposes all-removable cleanse/dispel and base detonation. Burn/Bleed/Poison/Venom consume all selected stacks and multiply their per-tick damage by remaining duration; Bomb detonates once per stack and attempts its Stun. Source Attack snapshots are retained. These manual actions do not advance a turn and support Undo. Venom resolves after the preceding hit and uses the same modified pre-injury HP basis as injury limits, including Collapse and other max-HP modifiers. This is the user’s clarified rule. Hero-specific detonation multipliers and automatic detonation skills are not implied by these controls.

## Leave pending until verified

- Pilfer/Spoils: persistent stat ownership, repeated application, HP scaling with injury and Collapse, death persistence.
- Block: exact coverage of “some beneficial effects,” especially healing and Combat Readiness.
- Simultaneous event ordering; duration/application-age sorting and refresh age are user-confirmed.
- Automatic conditional protection passive/artifact mappings, equal-strength source selection and AoE/death-passive ordering. Strongest-applicable sharing/reduction is user-confirmed.
- Magic Nail and Rupture coefficients/defense interactions; Omen’s actual trigger.
- Combined injury edge cases, global timer origins/refreshes and above-100% CR priority (see the dedicated health/readiness documents).
- Arbiter conditional Focus consumption and full-Focus scaling using a consistent current source.
- Researcher Carrot S1’s conflicting source description/reference.
- Hero-specific detonation coefficients, remaining combined injury details and automatic trigger conditions.
- Reaction-chain ordering/souls, remaining hero passives/EE conditions and general healing coefficients.

These items stay visible in TODO rather than receiving inferred combat rules.

## Damage protection

The hero editor accepts manual damage reduction %, an additional damage limit % of effective max HP (zero disables only the manual limit), transferred %, and a teammate recipient. These manual settings remain independent of Seal. Spirit Eye Celine now additionally receives a guarded native 50% passive limit at battle start; Seal suppresses that native passive. When multiple positive limits apply, the smaller cap wins. Artifact protection imports remain separate.

Direct attacks, including secondary attacks, calculate reduction first, cap the remaining damage second, then split that capped amount. With 10,000 max HP, a 50% cap and 20% sharing, a sufficiently large reduced hit deals 4,000 to the target and 1,000 to the recipient. Below the cap, only that smaller reduced amount is split. Transfer is based on the capped hit, not actual HP lost to overkill. Integer transfer is rounded down; the target takes the remainder.

The recipient must be a different living ally in the configured formation slot; otherwise the target takes the full capped amount. Transfer enters the existing damage/death/injury hooks, bypassing another defense/reduction/cap/share calculation. It does not recursively share or count as an additional attack. DoTs, detonation and fixed damage do not enter this direct-attack protection pipeline. AoE target order currently uses the engine’s sequential resolution; source-specific simultaneous death/revival interactions remain pending. Undo restores both HP pools.

## Frostbite and protection bypasses

User clarification: Frostbite is checked on each damaged ally, independently of who owns the protection. A tank’s presence, passive or artifact cannot reduce or share damage for a Frostbitten ally, even if that protection applies only to AoE or single-target attacks. Other allies retain their applicable protection; Frostbite on the tank alone does not disable its protection for an unaffected ally. Only the reduction/sharing clauses are bypassed; unrelated artifact/passive effects remain separate. Conditional source imports are still pending: manually enter protection applicable to the attack.

Frostbite (`stic_freezing`) is hero-only and disables both reduction and sharing on its bearer without bypassing damage limits. Ordinary resistance, Immunity, cleansing and expiry rules apply. Zeno S1 has a reviewed automatic one-turn grant. Other Frostbite skills with unsupported buff strips, detonations or damage formulas retain their pending mechanics.

`skillProtectionRules.js` records fourteen reviewed sharing bypass clauses. Exact skill descriptions and the source common reference guard them; changed source text disables the mapping pending review. Hero-only and non-Elite/Boss conditions are evaluated per target. Midnight Gala Lilias S3 and Bystander Hwayoung S3 bypass reduction as well as sharing against heroes; sharing-only clauses keep reduction active. These mappings do not enable otherwise unsupported damage formulas or imply complete hero support.

The editor exposes independent outgoing ignore-sharing and ignore-reduction switches for manually configured artifacts/effects. They affect direct attacks, including reactions, and always preserve the HP cap. These settings do not infer artifact identity, level, chance, target conditions or Seal rules. Conditional artifact effects require manual adjustment. Automatic artifact/protection-source imports remain pending.

Damage preview now includes the target’s configured protection and bypasses; it shows target damage rather than counting transferred damage twice. AoE previews remain estimates where earlier hits can kill a protector or change statuses.

## Injury clarification

Injury now persists as a fraction, not fixed original-HP loss. Non-injury max-HP modifiers change its HP equivalent while preserving the fraction. An “up to 15%” injury effect uses the modified pre-injury HP basis as its ceiling; actual HP loss below that ceiling produces only that smaller injury. Total injury is capped at 50%. See [health mechanics](health-mechanics.md). Superhuman and source-specific injury skill triggers still require individual mappings.

## Position-dependent mechanics

User-confirmed slot semantics are shared by both teams: back row is the single outermost slot (0), upper is 1, foremost is the center-facing slot (2), and lower is 3. The opponent's arena coordinates are horizontally reflected; slot identities do not change. The upper/lower heroes are not back-row targets.

`formation.js` owns the names and position selectors, shared by the UI and future effect handlers. A selector looks up the relevant team's living occupant and can explicitly exclude an ID or include defeated units. It never silently substitutes another slot. This is infrastructure, not automatic support for every positional passive/skill/artifact. Conditional fallback and each source's proc/trigger/stacking rules require individual review. The protection recipient dropdown now names positions rather than showing only slot numbers.

## Ally wording

User-confirmed: “ally” and “all allies” include the skill bearer. Exclusion must be explicit, such as “except for the caster” or “other allies.” `targeting.js` provides caster-inclusive team and positional selectors, with an explicit exclusion option. Lady can grant Offering to herself if she occupies the foremost slot. This language rule is separate from action-specific restrictions, such as requiring a different unit as a Dual Attack partner or damage-share recipient. Those restrictions are not inferred merely from the word “ally.”

Laceration event eligibility is explicitly deferred: the user believes DoTs should not trigger it, while additional damage remains unknown. Verify periodic ticks, detonations and distinct additional-damage events separately before changing the shared hook. Existing broad coverage and Venom/Laceration double injury are unverified; this note does not change engine behavior.

Confirmed: HP-cap clamping is not actual damage and never triggers Laceration injury. DoT and additional-damage eligibility remain separately deferred.

Death Sentence: user confirms a single active instance and that the debuff is uncleansable but resistible. Further Ainz/Death Sentence details are deferred while the hero is unusable. Existing manual controls have not been expanded or restricted in response to this clarification.

## Strongest applicable protection sources

User confirms that reduction effects specifying “only the strongest applies” do not add or multiply, and sharing uses the strongest applicable source. The manual protection model now considers personal reduction plus living providers' team reduction and chooses the maximum. Team reduction includes the provider; team sharing must use another living unit as receiver. Frostbite and attack bypasses still suppress the relevant protection on the original target before the HP limit/share calculation.

In the hero editor, set `Damage sharing provided to other allies %` on the receiving tank (e.g. 20 for an Aurius setup). No per-target recipient configuration is needed for that provider. Offering remains automatic at 70%. A direct hit on another teammate chooses Lady over the 20% tank, but a direct hit on Lady can choose the tank. Transferred damage never enters the selection pipeline again. Defeated providers stop contributing. Artifact names in the notes field are not parsed or automatically equipped; level, conditions, other artifact stat effects and passive-specific suppression still require source mappings. These manual provider values apply to direct attacks and should be configured only for applicable effects.

Equal-strength ties currently use stable recipient ID ordering, a deterministic sandbox policy rather than a verified game rule. Limited-dispel priority is resolved by the user’s duration-first/application-age rule; refresh updates age so the refreshed effect becomes newest among same-duration entries.

## Effect display and removal order

Per the user's supplied rule, buffs/debuffs are ordered left to right by remaining duration, descending; same-duration effects use older application first. Both arena icons and the effects panel use `orderedEffects`, as do limited dispel/cleanse selection. Filtering for eligible effects means unique and undispellable effects are skipped without consuming a removal. Independent stacked instances each count as one removable effect. Permanent entries sort before finite durations; global timers use their displayed remaining count.

Manual controls select one, two or all removable effects. Limited cleanses retain Block ownership rules and ordinary HP/CR recalculation. Six unconditional source-reviewed one/two-buff strips now have native count metadata; their exact source descriptions guard activation. This does not automatically implement other secondary skill mechanics, barriers/shield absorption, equipment-set opening grants or all remaining strip/cleanse skills.

Example using existing supported buffs: a three-turn Speed Up and two-turn Defense Up sort before one-turn Immunity. A two-buff strip removes those two protections and leaves Immunity. With only two-turn Defense Up plus one-turn Immunity, a two-buff strip removes both before subsequent debuff rolls.

User-confirmed refresh behavior: every successful reapplication updates the effect's application order. Duration remains the primary key; among equal remaining durations the refreshed effect becomes newest/rightmost. A separate application-order serial changes without replacing the effect instance, preserving duration revision tracking and Undo. Failed grants and ignored global-timer reapplications do not change age. The April 2024 provenance of the supplied rule was not independently researched in this change.

## Spirit Eye Celine native cap fix

The protection pipeline already calculated reduction → cap → sharing, but previously only the manual cap field was populated. Spirit Eye Celine now receives an automatic 50% per-attack limit from her reviewed S2 mapping, before Offering or manual sharing. No editor setup is required; zero in the manual field does not disable the native passive. HP-based cap calculations use effective max HP after injury/modifiers, not remaining current HP. Frostbite and sharing-bypass clauses do not bypass the cap; Seal suppresses this native passive while independent manual caps remain.

User-specified regression: 8,000 effective max HP → 4,000 capped damage → 2,800 transferred to Offering → 1,200 on Celine. The hit popup, floating numbers and actual HP loss share this result. At 17,000 effective max HP, the corresponding ceiling is 2,550, so a 2,253 hit is below that ceiling.

The numeric 50% threshold is explicitly user-confirmed. Cached CeciliaBot variable/enhancement rows are inconsistent with that value, so it is not inferred from their sum. The source wording and cap reference guard the native handler; changed wording requires review. Celine's S2 death-trigger cooldown reduction/souls and remaining hero-specific mechanics are still pending.
