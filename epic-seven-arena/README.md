# Epic Seven Battle Lab

A React + Vite prototype for a manually controlled 3v3 battle. Three heroes per team occupy four formation slots arranged as a diamond: index 0 back, 1 upper, 2 front and 3 lower. The enemy formation is mirrored. Teams have separate editable soul pools, initially zero. Builds persist in browser local storage.

## Develop locally

Requires Node.js 20.19+ (or 22.12+). From the `epic-seven-arena` directory:

```sh
npm ci
npm run dev
```

Open the local address Vite prints. The development server uses `src/index.html`, supports hot reload, and serves local hero data and portraits from `public/`.

```sh
npm test        # framework-independent battle-engine regressions
npm run build  # production build and refresh the static GitHub Pages files
npm run preview # inspect the production build locally
```

## Structure and publication

- `src/App.jsx`: application state and coordination; existing saved teams use the unchanged `e7-lab-builds-v1` storage key.
- `src/components/`: arena / hero units, readiness rail, current hero and skills, editor, hit-outcome dialog, portraits and timeline.
- `src/useBattleSession.js`: React session state, immutable battle history and undo.
- `src/engine/`: plain JavaScript data model, presets and battle calculations. No React or DOM dependency.
- `src/data/`: CeciliaBot adapter, conservative multiplier parser, validated cache and refresh client.
- `src/style.css`: interface styles.
- `public/data/` and `public/assets/`: source hero data, portraits and background.
- `dist/`: ignored Vite output, served by `npm run preview`.
- Root `index.html`, `build-assets/`, `data/` and `assets/`: **generated deployment files** committed to keep the existing branch-based GitHub Pages URL working. `npm run build` refreshes them; edit the source files rather than these outputs.

GitHub Pages currently serves the root of `Concorder/pf` on `main`, so deploying only a Vite source entry would break the existing app URL. The build copies the standalone static output into this app folder; other `pf` pages remain unchanged. Run the tests and build before committing and pushing. A future standalone repository can instead deploy `dist/` directly.

The built app can still be served with Python's HTTP server from this folder; installing Node is only required for development and rebuilding. Hero records and portraits are bundled locally; optional fonts require Internet access. Portrait initials and system fonts provide fallbacks.

## Upstream sources

Damage formulas and coefficients use **e7calc as the authority**. Fribbels is used only for base stats and portraits. The current adapter still parses CeciliaBot multiplier text; values awaiting an e7calc check remain provisional, and no completed migration or live e7calc synchronization is implied. See [source policy](docs/data-sources.md).

CeciliaBot supplies hero/skill metadata and multiplier text via `https://cecilia-bot-api.vercel.app/api/v1`. Hero details are requested by slug (`getItem?list=hero&id=ras`), not game code. Skill images come from [CeciliaBot/E7Assets-Temp](https://github.com/CeciliaBot/E7Assets-Temp).

The app loads a bundled snapshot of all 388 API heroes and 1,113 skill icons, then refreshes the roster and the selected teams’ details. A valid browser cache is reused for 24 hours; Refresh data forces a recheck. Selecting a hero not yet checked loads its current details. New roster entries appear automatically and load their details when selected. Refreshes never change the rules of a running fight. Network or malformed-response failures preserve cached/bundled data. The status strip reports the source mode and last check; it is not a claim that the upstream data is complete or current to the game patch.

The API stores multipliers as text. The adapter supports explicit numeric ATK rate / POW, simple HP/DEF/Speed scaling, labelled normal-cast vs soulburn coefficients, and explicit unconditional defense penetration. It never executes source expressions. Unknown lines, conditional variants, missing scaling or target counts disable damage calculations rather than silently dropping terms. Passive skills remain visible with a passive marker; only the explicitly listed opening passive below is implemented. The Skill data & support disclosure explains each skill’s status and shows its source text.

Defaults use awakened skills with **maximum enhancements** (damage bonuses, cooldown reductions and soul gains). API cooldowns and soul gains replace old placeholder defaults, while custom settings are preserved. Soulburn is not implemented. Icons try the live asset repository first, then bundled copies, then vector placeholders.

Base combat stats remain supplied by the bundled Fribbels cache: CeciliaBot’s raw stat attributes are not ready-to-use max-level combat totals. Newly discovered heroes without these totals require manual stats or illustrative presets. Damage scaling support does not implement buffs, triggers or other effects described by the skill.

To refresh the bundled fallback for a release:

```sh
npm run refresh:data               # fetch all hero details and icons (3 concurrent requests)
npm run refresh:data -- --hero ras # update one hero and its icons
npm test
npm run build
```

The refresh script validates response identity and PNG signatures and keeps TLS verification enabled. Runtime client updates do not require rebuilding; this command refreshes the offline snapshot. Ras’s three imported rate/POW values and 8%/12% HP scaling were also checked against the linked multiplier spreadsheet. The spreadsheet remains a reference; its text is not executed or imported as battle logic.

## Controls

- Click a hero to choose among the bundled heroes, edit stats, set artifact notes / initial soul contribution, or configure skill soul gains, costs and cooldowns.
- Drag heroes between the four slots on the same team, or use the editor's “Move to empty slot” button.
- Presets are illustrative builds, not community averages.
- The cleaned snowy courtyard is an image-generated background based on the provided battle screenshot, saved in `assets/frozen-courtyard.png`. All original units and interface elements were removed from the background. Portrait avatars represent heroes; these are not animated battle sprites.
- HP and a thin blue readiness meter sit above each avatar. The left combat-readiness rail reflects the current deterministic speed scheduler; markers are separated for readability while labels retain actual percentages. Starting readiness is Speed / fastest living hero Speed × 100 across both teams. The fastest hero starts at 100%; subsequent turns use the deterministic speed scheduler.
- The lower-left arena panel shows the current hero’s portrait and HP; the lower-right panel contains the three skill controls. Team soul meters sit at the foot of the battlefield: yours on the left and the opponent’s on the right. Each glowing bulb represents 10 souls, and nine smaller segments show the remaining individual souls. The numeric total remains editable. Real skill icons are fetched from CeciliaBot’s asset repository, with bundled icons and vector placeholders as fallbacks. Select one of the three skill buttons, click a living enemy avatar (or its readiness marker), then use automatic hits or choose a manual Critical, Normal, Miss or Crushing override in the popup. Only outcomes supported by the source skill are enabled. Escape, Cancel or clicking outside the popup returns without spending souls or advancing the turn. Multi-target attacks list all affected enemies; automatic outcomes are rolled separately, while manual overrides apply to all of them. Pass turn and Undo are available in the HUD. Fullscreen uses the browser Fullscreen API where supported.
- Start battle; manually control both teams. Choose a skill, click an enemy, then confirm automatic hits or a manual override in the popup. Multiple-target skills hit the selected enemy followed by living enemies in formation order.
- Pass turn, undo actions / soul edits, or reset. Reset keeps builds and restores pre-battle soul values, so artifact contributions are not counted twice. Artifact starting souls are added each time a new battle starts.

## Buffs (first implementation)

Use **Manage buffs** in the current hero panel during battle. Select any living hero, choose a 1–10 turn duration, and apply/remove Attack Up (+50%), Greater Attack Up (+75%), Defense Up (+60%), Speed Up (+30%), Critical Chance Up (+50 percentage points) or Critical Damage Up (+70 percentage points). Values and source icons were checked against CeciliaBot buff metadata. Critical chance and damage are capped at 100% and 350%; automatic hit rolls use effective stats. Defense/Speed scaling skills use effective buffed stats.

Buff icons and remaining durations appear above each unit. Identical buffs refresh to the longer duration, not additive stacks. Greater Attack replaces normal Attack; normal Attack cannot overwrite Greater Attack. Speed changes preserve current CR and reschedule pending turns. Buffs expire after their bearer’s actions, including passing; a skill’s newly granted buffs are applied after the duration tick. Manual changes and automatic grants are part of the battle snapshot and undo together with attacks. Reset clears combat buffs and preserves saved builds.

Reviewed automatic grants currently cover **Ras S3: Defense Up on living allies for 2 turns** and **Mercedes S3: Attack Up on living allies for 2 turns**. These rules require matching source buff references, ally targeting and duration text; changed source descriptions do not silently retain an assumed grant. Cermia S2 and Arbiter Vildred’s opening buff are implemented as described below. Other heroes’ buff grants, unmapped passive effects and other unique buffs are not automated; reviewed debuff grants and reactions are described below. Use manual controls for supported stat buffs. Buff constants and grant rules are engine mechanics; source descriptions are not executable code.

## Cermia and Arbiter Vildred

Cermia’s awakened **S2 Hot Streak!** is an implemented self-cast action. Click S2 and confirm without selecting an enemy or a hit outcome. It grants Greater Attack for 2 turns, resets All-In! (S3), gains configured souls, and immediately gives Cermia an extra turn without advancing the battle clock. Other heroes retain their CR and pending turns. Normal scheduling resumes after that turn; a sufficiently fast Cermia can naturally act again before slower heroes. New buffs retain both turns for the extra turn, then count down after her actions. S2 uses its imported cooldown. Cancel does nothing; Undo restores the entire action, including buff, souls, cooldowns and extra turn.

Moonlight heroes equip their source-provided Exclusive Equipment by default. Choose one effect in the hero editor when multiple options exist. Simple damage bonuses and cooldown reductions are applied; additional mechanics are explicitly marked pending. Enter final stats including EE stats to avoid double counting.

Arbiter Vildred’s Archdemon’s Eye EE grants undispellable **Archdemon’s Might for 2 bearer turns** at battle start. It grants +70% Evasion and +60% damage against Light targets. Hit outcomes are automatic by default with manual overrides. Dark Contract revival, its EE grant, flat Focus gains and the maximum-Focus revival grant are implemented; full-Focus branching/consumption and the start-turn cooldown reset remain pending.

The snowy courtyard is shown when battle starts. Its CSS image URL is resolved absolutely against the page URL, preventing built stylesheets from requesting the incorrect `build-assets/assets/…` path. Setup uses a neutral background; resetting returns to setup.

## Combat scope

This is a damage sandbox, not an accurate Epic Seven battle engine. Speed schedules deterministic turns without initial speed randomness. Base calculation:

```
attack = ATK × rate × (1 + Speed × selfSpdScaling)
scaling = maxHP × selfHpScaling + DEF × selfDefScaling + targetMaxHP × targetHpScaling
damage = floor((attack + scaling) × 1.871 × pow × hitMultiplier / (1 + targetDEF × (1 - penetration) / 300))
```

Hit multiplier: normal 1, crit configured Crit Damage / 100, miss 0.75, crushing 1.3. Critical chance is used by automatic hit rolls; Effectiveness / resistance rolls are supported in the effects panel and reviewed skill mappings. Only the listed coefficients are applied. Conditional skill options, elemental damage bonuses, general hero healing skills, shields, unmapped passives and triggers, general combat-readiness skill effects, damage sharing / reduction and artifact combat effects are **not** implemented. Buff support is limited to the section above. A source entry is not a verified active ability: unimplemented passive skills are disabled even when their source includes damage coefficients. No claim of complete hero support is made. Cooldowns and soul gains default to API values and can be overridden. Soul costs are manual settings; soulburn is not automated. Non-damaging skills other than the implemented Cermia S2 are disabled; use Pass turn and manual soul changes as needed.

## Data and attribution

`public/data/heroes.json` is a snapshot of the public [Fribbels Epic 7 Gear Optimizer hero cache](https://github.com/fribbels/Fribbels-Epic-7-Optimizer/blob/main/data/cache/herodata.json), fetched 2026-10-22. 391 records at download time. Hero portraits are bundled from the same upstream cache; all game assets belong to their respective owners. This is an unofficial fan prototype. No upstream application code was copied. CeciliaBot skill data is refreshed automatically as described above; new records do not imply implemented battle mechanics. Review upstream data / asset reuse permissions before public distribution.

CeciliaBot attribution: [hero database](https://ceciliabot.github.io/#/hero/), [deployed website repository](https://github.com/CeciliaBot/CeciliaBot.github.io), [asset repository](https://github.com/CeciliaBot/E7Assets-Temp). The app uses structured data and game assets; no CeciliaBot application code was copied.

Element badges use CeciliaBot’s `assets/img/cm_icon_prom{attribute}.png` images, with bundled copies as an offline fallback.

## Debuffs

Open **Buffs & debuffs** during battle to apply, refresh or remove a successful debuff. Attack Down (−50%), Defense Down (−70%) and Speed Down (−30%) affect combat stats; opposing buffs/debuffs add their modifiers to base stats. Speed changes preserve current readiness. Stun disables skills until a passed bearer turn consumes its duration. Silence blocks skills with cooldowns. Unbuffable blocks new ordinary buffs while keeping existing buffs. Decreased Hit Chance (−50%) is displayed in the hit dialog; hit outcomes are automatic by default.

Debuffs use CeciliaBot's game icons, show remaining bearer turns above units, expire after bearer actions, and support Undo. Use the effects panel to select a source, proc chance, and resistance-roll mode. Automatic skill grants use the reviewed mappings described below. Supported Sleep, Provoke and other effects are described below; unimplemented effects are listed in the effects panel.

## Automatic hits

After choosing a skill and target, **Use skill · automatic hits** resolves each target separately. Water (ice) beats Fire, Fire beats Earth (wind), and Earth beats Water. The weaker element has 50% base miss chance. Light and Dark have advantage against each other, and neutral matchups with Fire/Water/Earth. Same-element matchups are neutral.

Evasion and Decreased Hit Chance add to miss chance, capped at 100%. Rolls check miss, then critical (configured chance plus 15 percentage points on advantage), then crushing (30%, or 50% on advantage, if not critical). Unsupported hit types are never rolled. This adds hit selection, not a separate elemental damage bonus. Manual hit overrides remain available in the popup. Logs record the outcome for each target; Undo restores the full prior snapshot.

## Effect chance, DoTs and Bomb

Formula references were reviewed against [e7calc public beta source](https://github.com/tyopoyt/e7calc-beta/tree/dcc3312a9bfe7b6dcd53898740ce07790e607948): `effectiveness-checker.component.ts`, `damage.service.ts`, `skill.ts` (`DoTSkill`) and `constants.ts`. The cloud proxy blocked the live e7calc.xyz site; this verifies the referenced public source, not the current deployed version.

On a successful attack: proc roll, then resistance pass = `clamp(1 + EFF/100 − ER/100, 0, 0.85)`. The combined chance is hit chance × proc chance × resistance pass. Ignore Resistance removes the resistance check and its 15% floor, but not proc chance or Immunity. Missed attacks cannot apply the reviewed on-hit debuff. Ordinary buffs are not resistance-checked.

The effects panel defaults to rolling proc / resistance after a successful hit; enter the fully enhanced skill proc chance and choose the source hero. Uncheck rolling for a decided result. Reviewed mappings now cover 51 skills. They use CeciliaBot’s actual fully enhanced chance-value formatting and explicitly reviewed target, duration, stack count and condition rules.

Burn, Bleed and Bomb each snapshot effective source ATK at application. Each application is an independent stack with its own duration. Base damage per stack, rounded down:

- Bleed: `sourceATK × 0.30 × 1.871 / (1 + currentDEF × 0.30 / 300)`.
- Burn: `sourceATK × 0.60 × 1.871 / (1 + currentDEF × 0.30 / 300)`.
- Bomb: `sourceATK × 1.50 × 1.871 / (1 + currentDEF × 0.30 / 300)`.
- Poison: `bearerMaxHP × 0.05`, ignoring DEF.

Bleed/Burn/Poison tick at bearer turn start. Bomb detonates when its independent timer expires at bearer turn end, then applies Stun for one turn without a second resistance roll (Immunity still blocks the new Stun). Start-of-turn lethal damage skips the defeated bearer and checks victory. Removing stacks cleanses them without damage; the panel removes all stacks of a selected type. Existing Bomb timers are never refreshed by a new stack. Undo restores HP, timers, application rolls and logs. Manual detonation skills, Venom injuries, Beehoo modifiers, artifact bonuses, damage sharing and unique DoT passives remain unimplemented.

CeciliaBot's embedded Bleed description says 40% ATK, whereas the referenced calculator uses 30% ATK × 1.871. This engine explicitly follows the calculator formula above; descriptions are not executed as rules.

## Automatic skill debuffs

The hit popup defaults to **Apply skill debuffs automatically**. Each supported grant rolls its proc chance, then resistance, separately for every surviving hit target and stack. Misses and Immunity prevent applications. Critical-only grants and Coli’s Fire-target resistance bypass are explicit conditions. Uncheck this option for a single attack to skip all automatic grants, then apply decided outcomes in **Buffs & debuffs** (uncheck the panel’s rolling option to force an already-decided result). Manual hit overrides and debuff application mode are independent. Undo restores the entire attack and its grants.

The original mappings cover direct grants across Cermia, Sigret, Seaside Bellona, Researcher Carrot S3, Luna, Arbiter Vildred, Aramintha, Silver Blade Aramintha S3, Baal & Sezan, Furious, Haste, Khawazu, Tenebria, Solitaria S3, Roaming Warrior Leo S3, Veronica S3, Pirate Captain Flan S3, Coli S3 and Summertime Iseria S3. Some skills remain unavailable if their damage formula is unsupported. This does not implement their passive triggers, dispels, detonations, extra attacks or other secondary mechanics. Researcher Carrot S1 is deliberately pending because its current source debuff reference conflicts with its description. Unknown / changed source descriptions are flagged pending rather than guessed.

CeciliaBot sums each `values` row through the max enhancement level and formats fractional values as percentages using ×1000 (`skillDescriptionValues` and formatter module 5317 in its public site). Proc normalization uses that same convention, without adding enhancement chance a second time. Reviewed prose and debuff references guard each mapping; future chance-value updates are imported, while changed mechanics need review. The popup and skill support disclosure show the fully enhanced proc percentages and pending support. Target increases direct damage received by 15% and decreases Evasion by 50 percentage points; Unhealable is tracked, while healing skills remain unimplemented.

## Additional reviewed debuffs

All 48 CeciliaBot database entries were reviewed (including random-effect containers). The effects panel lists unsupported individual debuffs with their source descriptions and the specific missing system or coefficient. It does not offer nonfunctional status buttons.

New implemented mechanics:

- **Sleep:** disables skills, reduces Evasion and Critical Hit Resistance by 100 percentage points, and wakes on positive direct or secondary damage.
- **Fear:** disables skills until passed/expired; 40% removal check at the bearer’s turn start, before start-of-turn damage.
- **Provoke / Redirected Provoke:** enforce S1 and the living source / enemy with highest max HP. Players still confirm the forced basic attack in this manually controlled battle. Passing is blocked while that S1 is available; a dead provoking source releases targeting.
- **Curse:** each attacked ally other than the bearer causes 60% secondary attack damage to the bearer. Secondary damage does not recursively trigger Curse. AoE primary damage resolves before these reactions and new debuffs.
- **Beguile:** at bearer turn end, damages each other living ally by 10% of that ally’s max HP, then removes itself. Can defeat units and wake sleeping allies.
- **Vampiric Touch:** an attacked bearer heals the attacker by 10% of the attacker’s max HP. Healing respects Unhealable, Stigma and the HP cap. This does not enable other hero healing skills.
- **Energy Depletion:** Attack / Speed −50%, preserving CR. **Volatility:** Attack +15%, attack damage received +10%.
- **Fracture:** stacks Attack +20% / Defense −5%, capped at ten stacks, with a configurable duration. Stacks and remaining duration persist through the shared revival pipeline.
- **Trauma:** Defense −70%; Attack / Speed +100%, doubled to +200% when Defense before Trauma is at least 2000. **Stigma:** healing received −50%; its CR-gain component is implemented.

Reviewed automatic direct-grant mappings now cover **40 skills**, adding Sleep, Provoke, Redirected Provoke, Fear, Beguile, Curse, Stigma and Vampiric Touch where appropriate. Melissa’s Curse explicitly applies on misses. Mort and Setsuka ignore resistance against lower-max-HP targets. Other effects of those skills (such as dispels, healing, CR movement, buffs and additional attacks) still require their own implementations.

Pilfer still needs persistent stat loss and Spoils grants; Bind/Cannot Counterattack/Seal now use shared trigger gates; other hero-specific trigger mappings remain pending; Frostbite now bypasses reduction/sharing while retaining damage limits; Block supports external-buff suppression and cleansing ownership; broader beneficial effects need verification; Immobilize and Death Sentence need verified global timers; Magic Nail and Rupture need missing coefficients; Omen has no actionable source description. These remain explicitly pending. Random-debuff and Class Debuff containers now resolve into actual statuses.

## Shared injury and HP capacity

Venom, Laceration and Collapse are implemented with a shared effective-max-HP model. Persistent injury is stored as a percentage capped at 50%, preserving that percentage across max-HP changes; cleansing does not erase injury. HP bars, healing caps, damage scaling and HP comparisons use the reduced maximum. New battle resets injury; the revival pipeline preserves it, including the reviewed Dark Contract death handler. See [health-mechanics.md](docs/health-mechanics.md) for source definitions, event coverage, tests and **unverified combined edge-case choices**. Automatic direct-grant mappings now cover 46 skills; unsupported damage formulas remain blocked.

## Reactions and passive revival

Bind, Cannot Counterattack and Seal now use shared activation gates. Ras S2 requests a highest-ATK ally Dual Attack; counter chance can be configured in the hero editor (defaults to zero). Arbiter Vildred's source-guarded death passive revives before victory checks, unless blocked by Seal or cooldown, and separately triggers the equipped EE's revival grant. Fracture and injury persist; ordinary effects are removed. All results are undoable.

See [triggers-and-revival.md](docs/triggers-and-revival.md) for source categories, turn/resource boundaries, conservative chain limits and remaining hero-specific support. This is not complete automation of every source passive or extra attack.

## Combat Readiness and global countdowns

Restrict blocks CR pushes; Stigma halves pushes; Immobilize freezes Speed-driven progress while allowing direct CR changes. The effects panel supports manual CR adjustment and recovery if every living unit is frozen. Reviewed caster boosts and enemy setbacks are automatic, with a popup override.

Death Sentence counts twelve subsequent global turn starts, deals 50,000 fixed damage and is removed when its source dies. Immobilize expires after four subsequent global starts. Both have global countdown labels. Timer-origin, refresh and source-duration ambiguities remain documented verification items; see [readiness-and-global-timers.md](docs/readiness-and-global-timers.md). This update has 32 debuff types, five unique effects and 66 reviewed direct-debuff skill mappings, plus five skill CR mappings.

Highest-Attack Dual Attacks use the highest **eligible** effective-ATK teammate, skipping disabled/dead allies and doing nothing if none can act. Ras and reviewed highest-Attack EE triggers share this behavior. Regular-element EEs are manually selectable and remain disabled by default. Random-ally effects are separate.

See [remaining mechanics](docs/remaining-mechanics.md) for Block, random/class effects, dispels, Extinction and manual detonation support and limitations.

Manual attack protection is available in the hero editor: damage reduction → max-HP damage limit → sharing to a chosen living teammate. A 50% cap on 10,000 HP with 20% sharing splits a sufficiently large hit into 4,000 target damage and 1,000 transferred damage. These are manually entered final values; protection passives/artifacts are not automatically imported. See [remaining mechanics](docs/remaining-mechanics.md) for scope and pending interactions.

Frostbite disables incoming reduction and sharing while preserving damage limits. Fourteen reviewed skill exceptions apply automatically with their hero/non-Elite/Boss conditions; bypassing sharing does not imply bypassing reduction. The hero editor also has separate outgoing bypass switches for manually configured artifact effects. Artifact ownership, level and conditional activation are not imported automatically.

Injury ceilings use max HP after non-injury modifiers: injury gained is the smaller of actual HP loss and the stated percentage limit. Collapse or a later max-HP change preserves the accumulated injury percentage rather than a fixed HP amount.

Effect categories are separate: regular buffs, undispellable buffs and unique effects. Cannot Buff blocks both kinds of buff; unique effects bypass buff/debuff blocking and are excluded from buff/debuff counts. The effects panel has a manual Sanctuary of Battle immunity toggle for testing; Notos’s full kit/domain lifecycle is still pending. See [effect types](docs/effect-types.md).

Formation positions are mirrored horizontally: your back row is at the left outer edge and your foremost slot faces right toward the center; the opponent’s back row is at the right outer edge and its foremost slot faces left. Upper and lower slots retain their vertical order. Slot IDs remain stable across formation edits and battle.

Lady of the Scales automatically grants Offering to the foremost ally. That ally receives 70% of teammates’ direct-attack damage and can survive lethal damage once at up to 1% max HP if Immortality can be granted. Cannot Buff, Sanctuary and an active Hecate prevent that survival. Offering-bearer death triggers the source-defined team heal; other Lady mechanics remain partial. See [Offering](docs/offering.md).

Team protection can be configured on its provider: enter team sharing on the receiving tank and team reduction on the supplying hero. Only the strongest applicable source applies. With Offering on foremost Lady and a 20% Aurius-style tank, other allies share 70% to Lady, while direct attacks on Lady share 20% to the tank. Transferred damage never shares again. Automatic artifact imports remain pending.

Effect icons and limited removals share duration-first order: longer remaining duration goes left, then older application wins ties. Dispels and cleanses remove the leftmost eligible one/two/all effects, skipping unique and undispellable effects. The manual removal count is selectable in the effects panel. Six reviewed native limited-strip skills use the same order. Refreshing updates application age, moving the buff to the right among equal remaining durations. Barrier mechanics and equipment-set opening grants are separate, pending features.

Floating damage numbers appear beneath each affected unit: orange-to-yellow gradient with black outline for critical hits, white for normal/crushing hits and grey for misses. Misses also show a small MISS label above the character. AoE targets, reactions and transferred damage use their own structured damage events. Popups fade away, remain inside battlefield edges, preserve colors on defeated units and never intercept clicks. Undo/reset clears them without replaying old events; reduced-motion preferences use a simple fade.

A Soulburn UI preview appears above the active team's soul meter when its API-provided Soulburn cost is affordable. Burn pulses twice per second and toggles to grey Cancel; it clears on turn/hero changes or loss of affordability. Skill/cost/description come from the source, including 10- and 20-soul cases. This is a labelled interface preview: it does not spend souls or execute enhanced skill variants. Soulburn gameplay remains pending.

Arming Soulburn automatically selects the source-defined Soulburn skill and adds a gold glow pulse to that skill only. Other skill buttons are disabled until Cancel or loss of selection eligibility. Turn changes, Undo and Reset clear the mode. Enhanced Soulburn execution remains pending; target clicks while armed explain the preview limitation instead of silently casting the normal skill. Reduced-motion mode uses a steady glow.

Spirit Eye Celine now automatically applies her reviewed 50% effective-max-HP damage limit before sharing, without manual configuration. With 8,000 max HP and 70% Offering sharing, a sufficiently large hit deals at most 1,200 to Celine and transfers 2,800. Seal suppresses the native passive; Frostbite preserves its cap. Her remaining passive triggers are not implied by this fix.

Skill descriptions and tooltips replace source `{{variable}}` tokens with maximum-enhancement values. Each variable uses its matching value row through the skill’s max enhancement level; percentage rows use CeciliaBot’s ×1000 convention, while flat resources and turn counts stay numeric. Raw source text remains separate for mechanic guards. Celine’s reviewed native cap displays the same 50% used by the engine.

Skill details and tooltips expose shared skill tags: attack, single attack, attack targeting all enemies, multi-target attack, non-attack, passive and extra turn. `src/data/skillTags.js` classifies the awakened source data independently of damage-formula support and exports `hasSkillTag` for reaction rules. Soulburn-only extra turns are separate in `soulburnTags`; mixed-form targeting is explicitly variant-dependent. Tags describe skill capabilities, not proof a conditional effect activated. Missing coefficients alone never imply non-attack; uncertain data stays unclassified. Passive descriptions are not treated as active casts, even when they describe follow-up attacks. Individual follow-ups, conditional grants, EE variants and transformed casts still need reviewed execution-specific classification when their mechanics are implemented; tags alone do not activate reactions.

For a per-hero review queue with unsupported formulas, partial passives, pending debuffs, Soulburn and EE gaps, see [unsupported skills](docs/unsupported-skills.md). Regenerate it from current bundled data and support rules with `npm run report:skills`. The file separates open mechanics questions from implementation work and includes max-enhancement descriptions.

HP/Defense damage scaling is supported as additive terms: `(ATK × rate + effective max HP × HP ratio + effective DEF × DEF ratio + target effective max HP × target ratio) × pow × 1.871`, followed by enhancement/hit modifiers and defense mitigation. The parser accepts explicit percentage-only coefficients and equivalent labelled `Max Health scaling`/`Health scaling` forms, validates any redundant arithmetic, and keeps Soulburn-only numeric alternatives out of normal casts. Conditional coefficients, additional-damage/healing/barrier lines and conflicting formulas remain pending rather than being treated as direct attack scaling. Typical ratios are never substituted for missing hero-specific values.

Natural Dual Attacks roll each eligible assisting ally's own final chance independently (3% by default, capped at 20% per hero). The active hero's chance is not used. A single success selects that ally; multiple successes select one successful ally uniformly. Hero Workshop edits each hero's assisting chance; gear/artifact/buff chance mappings remain manual. Two allies at 3%/7% provide a combined 9.79% chance, while 3%/3% gives 5.91%. Guaranteed calls bypass the chance roll. Assisting S1 casts emit `dual-attack` with their base attack tags in `battle.skillUseEvents`, retain the original turn owner, and use normal non-Soulburn effects without ticking their own turn timers. Details and limitations are in [trigger rules](docs/triggers-and-revival.md).

Per-unit resources now support Focus (max 5, including fractions such as 2.5) and Fighting Spirit (max 100). Fighting Spirit appears in red directly under HP; Focus uses five partially fillable blocks. Hero Workshop configures initial overrides and manual gain multipliers; active/effects-panel edits support Undo. Native flat skill gains/costs and reviewed passive resource portions are automatic. See [resource rules and limitations](docs/unit-resources.md).

The natural-5★ review is in [the audit](docs/nat5-review.md), with a [5★-only remaining-skill queue](docs/unsupported-nat5-skills.md). Regenerate with `npm run audit:skills:nat5` and `npm run report:skills:nat5`. This pass maps 28 S1 debuff grants plus reviewed Aria/Violet/Choux modifiers; it does not certify complete kits. Fribbels' `data/py` is Scapy; its damage files were inspected, but its damage values are excluded as an authority in favor of e7calc.

Reviewed non-attack casts support friendly targeting: Yuna S2, Vivian S3, Iseria S2, Flan S2, Emilia S2, Laia S2, Desert Jewel Basar S3 and Mediator Kawerik S3. Select a single ally by clicking its avatar; team casts open confirmation directly. Ally targeting includes the caster unless the description excludes them. Buffs, cleanses, CR changes and cooldown changes follow the reviewed description order, with extra turns, native resource gains, normal buff blocking and Undo. They do not roll damage, critical hits, misses or resistance. Mediator Kawerik's separate turn-start S3-ready duration effect remains pending. Unimplemented non-attack entries are effect-handler work, not requests to clarify obvious ally/team targeting.


Current damage-formula research uses the maintained [tyopoyt/epic7-damage-calc](https://github.com/tyopoyt/epic7-damage-calc) source (2026-10-22), not the old 2024 beta referenced in historical notes. See [additional and fixed damage](docs/additional-and-fixed-damage.md) for stat scaling, 70% default penetration, dedicated modifiers, current artifact coefficients and exceptions. This research has not yet enabled those damage components in the engine.


The next 5★ batch adds e7calc-verified conditional S1 damage for Kise, Zahhak, Dizzy and Astromancer Elena, including Zahhak S1 hit/crit bonuses and Dizzy S1 Stun. It also adds reviewed watchers for Sol’s enemy non-attack resource/CR effect, Designer Lilibet’s enemy-turn-end Spirit/cleanse/buffs, and Astromancer Elena’s allied-AoE Worship Me! follow-up. Opposing-side watchers resolve first for the same event. Sol’s retaliation, Elena’s Star’s Blessing and remaining EE/Soulburn branches stay in the unsupported checklist. See [reaction rules](docs/triggers-and-revival.md) for timing and restrictions.

Spirit Eye Celine's S1 and S3 are usable: any buff enables Nimble Sword outside Dual Attacks, with Attack Up, 50% Defense penetration and 25% lifesteal. S3 revives eligible allies at exactly 1 HP, then cleanses allies and grants Immortality plus self Possession. Possession adds 25% Attack and counters critical hits. S2 grants five souls and reduces her cooldowns by one per Hero death while alive and unsealed. Soulburn/EE effects remain explicitly pending; see [Celine mechanics](docs/triggers-and-revival.md#spirit-eye-celine-active-skills-and-possession).

The [Earth 5★ review](docs/earth-review.md) covers the first Earth implementation batch: 22 previously blocked casts, healing/barrier/Revive/Invincibility support, Focus branches, direct buffs/debuffs and reviewed passive reactions. The [Earth-only remaining queue](docs/unsupported-earth-skills.md) is regenerated with `npm run report:skills:earth`. Partial kits, coefficient conflicts and pending EE/Soulburn effects stay explicit.
