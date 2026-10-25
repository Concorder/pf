# Next session

## Current state

- Work in `/workspace/pf/epic-seven-arena` (React + Vite).
- This update publishes accumulated mechanics work after baseline `8d5fe21`; see `git log` for the current commit.
- Source modules, source icons and the generated static build are committed together. Inspect `git status` and preserve any future local changes before pulling or resetting.
- User prefers previewing changes without a push. Commit/push only when explicitly requested.
- Current implementation: 32 debuff types plus five unique effects, including partial support; reviewed automatic direct-grant mappings for 66 skills. Manual application remains available.
- Last engine checks: 159 Node tests and production build passed. Desktop/mobile browser checks passed for Block, containers, detonation/Undo, dispels and Extinction.
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
  - [ ] Complete Arbiter Focus generation/consumption, full-Focus S3 and start-turn cooldown reset.
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
  - [ ] Clarify “some beneficial effects” coverage for healing, CR and other effects before extending suppression.
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

## Deferred clarification queue

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
