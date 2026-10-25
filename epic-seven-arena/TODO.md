# Next session

## Current state

- Work in `/workspace/pf/epic-seven-arena` (React + Vite).
- This update publishes accumulated mechanics work after baseline `2e0ad3a`; see `git log` for the current commit.
- Source modules, source icons and the generated static build are committed together. Inspect `git status` and preserve any future local changes before pulling or resetting.
- User prefers previewing changes without a push. Commit/push only when explicitly requested.
- Current implementation: 34 debuff types, including partial support; reviewed automatic direct-grant mappings for 58 skills. Manual application remains available.
- Last checks: 86 Node tests, production build, and desktop/mobile browser checks passed.
- Run `npm test` and `npm run dev` from this directory. `npm run build` regenerates tracked static output at the app root for GitHub Pages.

## Remaining mechanics

- [x] Build a shared injury / reduced-max-HP system. HP bars, healing caps, scaling, death and the future-revival health primitive share `health.js`.
  - [x] Venom: current max-HP turn-start damage plus actual-loss injury; shared 50% original-HP injury cap.
  - [x] Laceration: +15% attack damage received and injury through the shared damage path, including secondary damage.
  - [x] Collapse: temporary max HP −25%, doubled against heroes; cleanse restores capacity without healing.
  - [ ] Verify combined edge rules against game evidence: Collapse/injury ordering, Venom + Laceration injury stacking, sequential Venom capacity updates, and whether HP-cap clamping can cause injury. See `docs/health-mechanics.md`.
  - [ ] Pilfer: persistent Attack / Health / Defense −20%, Spoils grant, resistance/miss exceptions and death persistence.
- [x] Implement shared reaction/passive activation gates, reviewed Ras Dual Attack, configured counters and Arbiter revival. See `docs/triggers-and-revival.md`.
  - [x] Bind: block out-of-turn additional skills, counterattacks and Dual Attacks.
  - [x] Cannot Counterattack: block counterattacks.
  - [x] Seal: suppress implemented passive activation, including death passives; EE and gear/manual effects remain separate.
  - [x] Preserve Fracture stacks and duration through shared revival and Arbiter’s native death revival.
  - [ ] Expand hero-specific passive/additional-attack mappings and implement reviewed secondary reaction chains; the current queue does not recursively enqueue attacks.
  - [ ] Verify Ras Dual Attack selection when the highest-ATK ally is blocked, reaction soul rules and broader chain ordering against game evidence.
  - [ ] Complete Arbiter Focus generation/consumption, full-Focus S3 and start-turn cooldown reset.
  - [ ] Add automatic Extinction application before enabling more revival skills.
- [x] Implement skill-driven Combat Readiness changes and already-resolved manual CR controls. See `docs/readiness-and-global-timers.md`.
  - [x] Restrict: prevent non-Speed CR increases.
  - [x] Complete Stigma: halve CR increases as well as healing received.
  - [x] Immobilize: freeze Speed progress, allow direct pushes, expire on the defined fourth future global start and support all-frozen pause/recovery.
  - [ ] Verify application-turn counting, the Aube prose/database duration discrepancy, refresh behavior and above-100% CR priority against game evidence.
- [x] Death Sentence: twelve-future-global-start countdown, source-death cleanup (including revival), undispellability and 50,000 fixed damage.
  - [ ] Confirm exact in-game timer origin, refresh/multiple-source behavior and simultaneous-expiry ordering; current policy is explicit and tested.
- [ ] Implement damage sharing/reduction before Frostbite; preserve damage-limit effects.
- [ ] Block: implement source ownership for buffs, beneficial effects and cleansing, including the bearer exception.
- [ ] Verify Magic Nail and Rupture coefficients, defense interactions and trigger timing. Their descriptions omit required numbers; do not guess.
- [ ] Omen: find its actual trigger/rule; “Something is watching” is insufficient.
- [ ] Random Debuff / Class Debuff entries: implement selection/resolution into actual statuses, rather than treating containers as independent effects.

## Skill support and accuracy

- [ ] Expand reviewed automatic grant mappings beyond 58 skills. Verify chance, targets, duration, stack count, conditions and ordering for each.
- [ ] Implement dispels before debuff application where the skill specifies them; currently pending strips mean Immunity is retained.
- [ ] Implement detonation skills (Burn/Bleed/Bomb), extra attacks, passive Bomb planting and conditional follow-ups.
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
