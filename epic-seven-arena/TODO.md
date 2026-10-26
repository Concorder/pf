# Next session

## Current state

- Work in `/workspace/pf/epic-seven-arena` (React + Vite).
- This update publishes accumulated mechanics work after baseline `8d5fe21`; see `git log` for the current commit.
- Source modules, source icons and the generated static build are committed together. Inspect `git status` and preserve any future local changes before pulling or resetting.
- User prefers previewing changes without a push. Commit/push only when explicitly requested.
- Current implementation: 32 debuff types plus five unique effects, including partial support; reviewed automatic direct-grant mappings for 66 skills. Manual application remains available.
- Last engine checks: 216 Node tests and production build passed. Desktop/mobile browser checks passed for Block, containers, detonation/Undo, dispels and Extinction.
- Run `npm test` and `npm run dev` from this directory. `npm run build` regenerates tracked static output at the app root for GitHub Pages.

## Remaining mechanics

- [x] Build a shared injury / reduced-max-HP system. HP bars, healing caps, scaling, death and the future-revival health primitive share `health.js`.
  - [x] Venom: modified pre-injury max-HP turn-start damage plus actual-loss injury; shared 50% persistent injury cap.
  - [x] Laceration: +15% attack damage received and a shared injury hook. DoT/additional-damage eligibility remains unverified.
  - [x] Collapse: temporary max HP −25%, doubled against heroes; cleanse restores capacity without healing.
  - [x] Collapse and injury are multiplicative: apply Collapse to HP capacity remaining after injury (confirmed by user).
  - [x] Venom shares the injury-limit HP basis: after Collapse/other max-HP modifiers, before injury.
  - [ ] Verify Laceration event coverage later: user believes DoTs do not trigger it; additional damage is unknown. Include Venom/Burn/Bleed/Poison, Bomb/detonation and separate additional-damage events in the review. Do not treat current broad shared-hook behavior or double Venom/Laceration injury as confirmed. Engine behavior left unchanged pending verification.
  - [x] User-confirmed: HP-cap clamping (e.g. Collapse) does not trigger Laceration injury; only actual damage can cause injury. DoT/additional-damage eligibility remains deferred. See `docs/health-mechanics.md`.
  - [ ] Pilfer: persistent Attack / Health / Defense −20%, Spoils grant, resistance/miss exceptions and death persistence.
- [x] Implement shared reaction/passive activation gates, reviewed Ras Dual Attack, configured counters and Arbiter revival. See `docs/triggers-and-revival.md`.
  - [x] Bind: block out-of-turn additional skills, counterattacks and Dual Attacks.
  - [x] Cannot Counterattack: block counterattacks.
  - [x] Seal: suppress implemented passive activation, including death passives; EE and gear/manual effects remain separate.
  - [x] Preserve Fracture stacks and duration through shared revival and Arbiter’s native death revival.
  - [ ] Expand hero-specific passive/additional-attack mappings and implement reviewed secondary reaction chains; the current queue does not recursively enqueue attacks.
  - [x] Highest-Attack Dual Attacks skip disabled allies in effective-ATK order, and do not occur if all teammates are ineligible (user clarification).
  - [ ] Verify reaction soul rules and broader chain ordering against game evidence.
  - [ ] Complete Arbiter Focus consumption, full-Focus S3 and start-turn cooldown reset (flat cast gains and revival grant now implemented).
  - [x] Add guarded automatic Extinction application before death passives (Sigret, Glenn, Lilibet and Top Model Luluca source rules; unsupported damage formulas remain blocked).
- [x] Implement skill-driven Combat Readiness changes and already-resolved manual CR controls. See `docs/readiness-and-global-timers.md`.
  - [x] Restrict: prevent non-Speed CR increases.
  - [x] Complete Stigma: halve CR increases as well as healing received.
  - [x] Immobilize: freeze Speed progress, allow direct pushes, expire on the defined fourth future global start and support all-frozen pause/recovery.
  - [ ] Verify application-turn counting, the Aube prose/database duration discrepancy, refresh behavior and above-100% CR priority against game evidence.
- [x] Death Sentence: twelve-future-global-start countdown, source-death cleanup (including revival), undispellability and 50,000 fixed damage.
  - [x] Death Sentence timer origin confirmed by user: first count is the next hero’s turn after application; every hero’s subsequent turn counts. The application turn does not count.
  - [x] User-confirmed: Death Sentence is uncleansable but can be resisted; only one can be active at a time. Removal protection does not bypass application resistance.
  - [ ] Deferred by user: remaining Death Sentence/Ainz details, including refresh/expiry edge cases and enforcing the single-active constraint throughout manual controls. The hero is currently unusable; do not spend further implementation work here yet.
- [x] Add manually configured direct-attack damage reduction → max-HP limit → sharing, with no recursive transfer and Undo.
  - [ ] Map source-specific protection passives/artifacts, their stacking and suppression rules; broader source-specific event ordering remains pending.
- [x] Block: suppress external buffs and external cleansing while allowing the bearer’s own effects.
  - [ ] Research “some beneficial effects” coverage for healing, CR and other effects before extending suppression.
- [ ] Verify Magic Nail and Rupture coefficients, defense interactions and trigger timing. Their descriptions omit required numbers; do not guess.
- [ ] Omen: find its actual trigger/rule; “Something is watching” is insufficient.
- [x] Resolve reviewed Random / Class Debuff containers into actual statuses, including manual application and guarded skill grants.

## Skill support and accuracy

- [ ] Expand reviewed automatic grant mappings beyond 66 skills. Verify chance, targets, duration, stack count, conditions and ordering for each.
- [x] Add guarded all-buff dispels with source ordering, resistance checks and a per-attack manual override.
  - [x] User-specified removal order: longest remaining duration first, then oldest application; dispels/cleanses start from the left and skip non-removable effects. Icons and removal logic share one ordering helper.
  - [x] Add manual one/two/all removal controls and six guarded limited-strip mappings (Yufine S2, Tenebria S2, Wanderer Silk S2, Researcher Carrot S3, Carrot S3, Aramintha S2). Other mechanics on these skills may remain partial.
  - [x] User-confirmed refresh order: successful reapplication updates age; among equal remaining durations, the refreshed effect becomes newest/rightmost. Instance identity remains stable for duration/Undo tracking.
- [x] Add manual base Burn/Bleed/Poison/Bomb detonation with stack consumption, snapshots and Undo.
- [ ] Verify hero-specific detonation multipliers, Venom interactions and automatic trigger conditions; passive Bomb planting and conditional follow-ups remain pending.
- [x] Implement random eligible ally Dual Attacks for Lilias S1 and Faithless Lidica’s reviewed EE; skip disabled allies.
- [ ] Review remaining EE modifiers to proc chance/duration and special passive interactions.
- [ ] Researcher Carrot S1: resolve the source conflict (description says Burn; current debuff reference says Speed Down) before automating.
- [ ] Verify Curse overkill/AoE event details and secondary-damage interactions against game references.
- [ ] Verify Volatility against secondary/periodic damage; currently its damage-received component affects direct attacks.
- [ ] Verify unique stat modifier stacking and Fracture lifetime against game references; current Fracture has configurable duration and ten-stack cap.
- [ ] Add general hero healing skills using shared healing rules (Vampiric Touch healing, Unhealable and Stigma already work).

## Sources and implementation notes

- Debuff descriptions: https://ceciliabot.github.io/#/database/debuffs/
- Cached reviewed database: `src/data/debuffCatalog.js` (48 entries); unsupported effects have reasons displayed in the effects panel.
- `src/engine/buffs.js`: statuses, effective stats, application/expiry, Sleep wakeup, Fear rolls, Curse/Beguile and healing hooks.
- `src/engine/battle.js`: scheduler, forced Provoke targets and attack event ordering.
- `src/engine/effects.js`: proc/resistance and DoT/Bomb math.
- `src/data/skillDebuffRules.js` and `skillDebuffs.js`: reviewed source guards and max-enhanced chances.
- CeciliaBot percentage convention: sum base + enhancement values through maximum level, then multiply fractional values by 1000. Do not add enhancement chance twice.
- Automatic debuffs default on in the hit popup; uncheck for a single attack and use Buffs & debuffs for manual outcomes.
- e7calc live site was network-blocked. Formulas were checked against public beta source at https://github.com/tyopoyt/e7calc-beta/tree/dcc3312a9bfe7b6dcd53898740ce07790e607948, not verified against its current deployment.
- Resistance pass: clamp(1 + EFF/100 − ER/100, 0, .85). Ignore Resistance bypasses that check, but not proc chance or Immunity. Explicit source exceptions can apply on misses.
- Bleed/Burn/Bomb: source ATK × .30/.60/1.50 × 1.871, with 70% defense penetration; independent source-ATK snapshots. Poison: 5% bearer max HP. CeciliaBot's embedded Bleed text conflicts with the calculator; current engine follows the documented calculator formula.
- Bomb expires at bearer turn end and applies a one-turn Stun. Burn/Bleed/Poison tick at bearer turn start.
- Provoke enforces the required S1 and target; the user confirms the action in this manually controlled sandbox.
- Extend meaningful engine tests for each new rule, then check the relevant UI and build. Avoid claiming complete hero support when secondary effects remain pending.

## Resolved rules and deferred source research

See [remaining-mechanics.md](docs/remaining-mechanics.md) for this batch and the rules intentionally left unresolved.

- [x] User clarification: detonated Venom resolves after the preceding Laceration hit, using the modified pre-injury max-HP basis (updated user clarification). Manual Venom detonation is available; hero-specific automatic triggers remain pending.

- [x] Frostbite bypasses direct-attack reduction and sharing, while preserving max-HP limits. Native manual application plus Zeno S1 direct grant are supported.
- [x] Fourteen reviewed skill sharing exceptions, including two separate reduction bypasses, with source and target-condition guards.
- [x] Separate manual outgoing sharing/reduction bypass switches for artifact effects; automatic artifact imports and conditional triggers remain pending.

- [x] Clarified Frostbite locality: the damaged ally cannot receive reduction/sharing benefits from another hero’s artifact/passive; unaffected allies keep protection. Conditional source imports remain pending.

- [x] Store injury as a percentage across Collapse and shared max-HP multiplier changes; capped injury is min(actual HP loss, percentage ceiling). Source-specific injury skills and Superhuman mappings remain pending.

- [x] Confirm damage limits use post-injury effective max HP: 10,000 base HP at 50% injury → 5,000 max HP → 2,500 hit limit at 50%, before sharing.

## Effect classification

- [x] Separate regular buffs, undispellable buffs and unique effects. Cannot Buff prevents granting both classes of buff; unique effects bypass buff/debuff blockers and do not count as buffs/debuffs.
- [x] Reclassify Energy Depletion, Volatility, Fracture and Trauma from explicit source labels; give undispellable buffs lighter blue badges and unique effects their own panel category.
- [x] Add an undoable manual Sanctuary of Battle immunity toggle, allowing unique effects while blocking new buffs/debuffs on heroes.
- [ ] Implement Notos’s full S3, transformation, healing, stance skills, cooldowns and automatic domain lifecycle. See [effect types](docs/effect-types.md).

## Formation mechanics

- [x] Mirror formation horizontally while preserving team-relative slot identities: back row = slot 0, upper = 1, foremost = 2, lower = 3. Back row means only the outermost slot (user-confirmed).
- [x] Add shared formation labels and living-occupant selectors for use by positional skill/passive/artifact rules; verify mirror geometry on desktop/tablet/mobile and test selection on both teams.
- [ ] Map individual position-dependent source mechanics (for example Troublemaker Crozet back-row protection, Christy back-row Resistance and Riza Hawkeye foremost protection). Do not equate the back row with every non-front slot.
- [ ] Verify replacement/fallback rules for “foremost ally except for the caster,” empty/dead positions and position changes before automating those conditional clauses. Fixed-slot selectors currently return no target when the occupant is excluded, missing or defeated.

## Lady of the Scales / Offering

- [x] Source-guarded S2 battle-start Offering on the foremost slot, including self when Lady occupies it. Unique effect survives buff/debuff blocking.
- [x] Offering bearer receives 70% of teammates’ direct-attack damage, after their reduction/limit. Original-target Frostbite and ignore-sharing exceptions suppress transfer; bearer Frostbite does not stop protecting other allies. Transferred damage does not recursively share.
- [x] Once per Offering, prevent lethal damage only if a one-turn Immortality buff can be granted, surviving at up to 1% effective max HP per user instruction. Cannot Buff, Sanctuary, Hecate and applicable grant restrictions prevent survival. Existing Immortality subsequently prevents damage below 1 HP.
- [x] Offering-bearer death heals living allies by 50% max HP through normal healing rules and Lady’s passive activation gate.
- [x] Hecate’s guarded S2 blocks revival and granting Immortality on heroes while alive and unsealed. Other Hecate mechanics remain pending.
- [ ] Lady’s enemy-CR-copy mechanic, S1 healing and S3 cleanse/CR/Offering HP consumption/Abundance still need reviewed handlers. Offering sharing currently uses the direct-attack pipeline; periodic/secondary damage sharing needs event-specific verification.
- [x] User-confirmed strongest applicable sharing/reduction rule: third ally shares 70% to foremost Lady over Aurius; a direct hit on Lady shares 20% to the tank. Added manual team sharing/reduction provider fields. No recursive transfer.
- [ ] Verify equal-strength source tie selection and simultaneous AoE/death/revival events; conditional artifact/passive source imports remain pending.

- [x] Shared ally selection includes the caster by default; “except for the caster” requires explicit exclusion. Team buffs, positional ally selection and Offering death healing use these semantics. Separate action constraints (e.g. a distinct Dual Attack partner) remain explicit.

## Deferred health-bar UI changes

- [ ] Show injury as a pale red segment on the right side of each health bar, proportional to the persistent injury percentage. Keep it distinct from missing current HP and consistent across arena units and the current-turn panel.
- [ ] Display current HP / effective max HP after injury and other max-HP modifiers, rather than the original uninjured maximum. Keep labels consistent after injury, Collapse application/removal, healing, revival and Undo.

## Battlefield soul meters

- [x] Move soul meters to the foot of the battlefield, your team left and opponent right. Each bulb represents 10 souls; nine smaller segments show individual souls. Keep editable totals, artifact startup, skill gains and Undo connected to battle state. Desktop/tablet/mobile and fullscreen browser checks passed.

## Damage feedback and Soulburn UI

- [x] Float damage beneath targets: orange/yellow outlined crits, white normal/crushing hits, grey misses with MISS above the character. Capture actual resolved hit types per AoE target/reaction and separate transferred damage without changing combat math.
- [x] Keep popups inside battlefield edges, above UI without intercepting clicks, and fully colored on defeated units. Fade/Undo/reset cleanup and reduced-motion behavior are checked on desktop/mobile.
- [x] Source-driven Soulburn button above active team souls: affordable API cost, Burn/Cancel preview states, two pulses per second, reduced-motion override, automatic clearing on turn/hero/affordability changes.
- [ ] Implement reviewed Soulburn execution and soul spending, including variant damage, extra turns, effects and resistance exceptions. Current button is explicitly a UI preview and does not change attacks or spend souls.

- [x] Centralize Soulburn selection: auto-select and glow-pulse its API-defined skill, lock other skill buttons and guard programmatic skill/target actions. Cancel, insufficient souls, turn changes, Undo and Reset clear the lock. Keep enhanced execution explicitly pending rather than silently using normal damage. Desktop/mobile and reduced-motion checks passed.

## Spirit Eye Celine protection fix

- [x] Automatically apply the reviewed native 50% S2 attack cap before sharing. Verify 8,000 effective max HP → 4,000 cap → 1,200 target / 2,800 transfer without manual settings, including matching preview/popups/HP and Undo.
- [x] Use effective post-injury max HP; preserve the native cap under Frostbite/sharing bypass; suppress native passive under Seal while independent manual caps remain.
- [ ] Implement/review Celine's remaining S2 death-trigger cooldown/soul effects and other kit mechanics. Numeric cap is user-confirmed at 50%; cached variable/enhancement rows need review before replacing this value with automatic numeric normalization.

## Max-enhancement skill text

- [x] Resolve all 611 active cached skill description placeholders into max-enhancement values in skill details and tooltips. Handle multiple variables, percentage rows, flat resources, decreasing cooldowns and the reviewed native Celine 50% cap.
- [x] Preserve raw source descriptions for exact mechanic guards; expose separate formatted display text. Apply the same display formatter to equipment descriptions and Soulburn text where source variables exist.
- [x] Catalogue coverage test rejects unresolved/missing cached variables; unknown future source values display “value unavailable” instead of fabricated numbers. Desktop/mobile checks cover real percentage, Fighting Spirit, cooldown and passive examples.

- [x] Shared skill classification and visible tags, separating passive/attack/non-attack, single/all-enemies/two-target attacks, and normal versus Soulburn extra-turn capability. Classification stays independent of formula support; uncertain sources remain explicit.
- [ ] Connect reviewed passive/artifact reactions to resolved skill-use tags at the correct execution stage. Classify individual triggered skills and form/EE/conditional variants at execution time; do not infer actual extra-turn grants from capability tags.

- [x] Accept equivalent explicit HP/Defense multiplier spellings and percentage-only terms; separate labelled Soulburn values from normal casts and preserve contradictory/conditional formula guards. Fixed passive/non-attack scaling checks that masked their actual support reason. 34 additional source formulas parse, enabling base damage for 30 additional active skills; secondary mechanics still require their own review.

- [x] Dual Attack execution emits `dual-attack` plus base attack tags for the assisting hero's normal S1, with actor/turn-owner context. No permanent tag on the caller or catalog S1; Soulburn-only tags cannot leak to assists. Direct dual requests reject S2/S3, and transformation handlers can disable participation explicitly.
- [x] Natural Dual Attack rolls each eligible assisting ally independently using that ally's final chance (5% base, 20% cap per hero). No successes means no assist; one success selects that hero; multiple successes select one successful hero uniformly. Active hero chance is unused. Guaranteed calls bypass RNG, S1 prohibitions apply, and reactions cannot chain. Highest-ATK guaranteed calls retain next-eligible fallback. Automatic artifact/buff chance mappings remain pending.


- [x] Optional per-unit Fighting Spirit (max 100) / Focus (max 5), decimal values, native source fields, cast gains/costs, manual gain multipliers and Undo-safe controls. Red Fighting Spirit under HP; Focus as five partially fillable blocks.
- [x] Reviewed resource-only mappings: 15 opening grants, Urban Shadow Choux turn-start Focus, Solitaria/Elvira gain blocking with Seal/death, Arbiter revival Focus. Unmapped threshold/consumes-all/retaliation and resource-death reset rules remain pending.
- [x] Natural 5★ source/coverage audit: 213 merged-catalog heroes / 639 skills, 27 direct S1 debuff mappings, reviewed Aria/Violet/Choux conditional modifiers, fixed-penetration parsing and starting-cooldown support. See `docs/nat5-review.md` and `docs/unsupported-nat5-skills.md`; complex branches and source-version disagreements remain explicit.

- Source policy: e7calc is authoritative for damage formulas/coefficients and Soulburn damage. CeciliaBot remains metadata/descriptions/icons. Fribbels is base stats/portraits only. Do not use Fribbels damage values to validate or override e7calc. Existing CeciliaBot multiplier imports remain provisional until matched to current e7calc; full migration/live synchronization is pending.

- [x] Shared non-attack cast execution and friendly-avatar targeting; team/self confirmation without a hit popup. Eight guarded support casts cover team/self/selected buffs, explicit caster exclusion, cleansing, CR, cooldown reset/reduction, Iseria S2 cooldown-effect immunity, extra turns, resource gains and Undo. Other non-attack effects (barriers/healing/transformations/special statuses) still need their own handlers; targeting stated in descriptions is not an open question.

- Review policy: derive ally/enemy/team/self targeting, explicit caster exclusions, positions, durations and stated triggers from CeciliaBot descriptions. Missing handlers are implementation work, not clarification requests. Research damage coefficients in e7calc and ambiguous interactions in sources first; ask the user only about a specific unresolved contradiction or undocumented interaction. See `docs/review-policy.md`.

- [x] Research additional/fixed damage against maintained e7calc source `tyopoyt/epic7-damage-calc` at `39070976ce3cd0435cbcf5d430f2711cf0ef0005` (2026-10-22), replacing the old 2024-beta reference for new work. Findings and citations: `docs/additional-and-fixed-damage.md`.
- [ ] Implement source-mapped additional/fixed damage components using those findings, including independent trigger conditions, dedicated modifiers and event-specific protection handling. Keep unresolved Laceration eligibility deferred.
- [ ] Update old-beta DoT coefficients after reviewing the maintained source: current e7calc uses Bleed 40% ATK and Burn 70% ATK, rather than the current engine's 30%/60%. Research recorded; engine unchanged in this pass.
- [x] Record user-confirmed cross-team watcher priority: for the same triggering event, opposing-side reactions precede the event actor's team. Filters remain extensible unit by unit; same-side order is a separate rule.
