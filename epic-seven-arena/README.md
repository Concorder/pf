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

## Primary upstream source

CeciliaBot supplies hero/skill metadata and multiplier text via `https://cecilia-bot-api.vercel.app/api/v1`. Hero details are requested by slug (`getItem?list=hero&id=ras`), not game code. Skill images come from [CeciliaBot/E7Assets-Temp](https://github.com/CeciliaBot/E7Assets-Temp).

The app loads a bundled snapshot of all 388 API heroes and 1,113 skill icons, then refreshes the roster and the selected teams’ details. A valid browser cache is reused for 24 hours; Refresh data forces a recheck. Selecting a hero not yet checked loads its current details. New roster entries appear automatically and load their details when selected. Refreshes never change the rules of a running fight. Network or malformed-response failures preserve cached/bundled data. The status strip reports the source mode and last check; it is not a claim that the upstream data is complete or current to the game patch.

The API stores multipliers as text. The adapter supports explicit numeric ATK rate / POW, simple HP/DEF/Speed scaling, labelled normal-cast vs soulburn coefficients, and explicit unconditional defense penetration. It never executes source expressions. Unknown lines, conditional variants, missing scaling or target counts disable damage calculations rather than silently dropping terms. Passive skills remain visible with a passive marker; their triggers are not implemented. The Skill data & support disclosure explains each skill’s status and shows its source text.

Defaults use awakened skills with **+0 enhancements**. API cooldowns and soul gains replace old placeholder defaults, while custom settings are preserved. Soulburn is not implemented. Icons try the live asset repository first, then bundled copies, then vector placeholders.

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
- The lower-left arena panel shows the current hero’s portrait and HP; the lower-right panel contains the three skill controls. Team souls are below the arena. Real skill icons are fetched from CeciliaBot’s asset repository, with bundled icons and vector placeholders as fallbacks. Select one of the three skill buttons, click a living enemy avatar (or its readiness marker), then choose Critical, Normal, Miss or Crushing in the popup to execute. Only outcomes supported by the source skill are enabled. Escape, Cancel or clicking outside the popup returns without spending souls or advancing the turn. Multi-target attacks list all affected enemies; the chosen outcome applies to all of them. Pass turn and Undo are available in the HUD. Fullscreen uses the browser Fullscreen API where supported.
- Start battle; manually control both teams. Choose a skill, click an enemy, then choose a hit outcome in the popup. Multiple-target skills hit the selected enemy followed by living enemies in formation order.
- Pass turn, undo actions / soul edits, or reset. Reset keeps builds and restores pre-battle soul values, so artifact contributions are not counted twice. Artifact starting souls are added each time a new battle starts.

## Combat scope

This is a damage sandbox, not an accurate Epic Seven battle engine. Speed schedules deterministic turns without initial speed randomness. Base calculation:

```
attack = ATK × rate × (1 + Speed × selfSpdScaling)
scaling = maxHP × selfHpScaling + DEF × selfDefScaling + targetMaxHP × targetHpScaling
damage = floor((attack + scaling) × 1.871 × pow × hitMultiplier / (1 + targetDEF × (1 - penetration) / 300))
```

Hit multiplier: normal 1, crit configured Crit Damage / 100, miss 0.75, crushing 1.3. Crit chance / effectiveness / resistance are editable build metadata; no random status or critical rolls occur. Only the listed coefficients are applied. Conditional skill options, enhancement bonuses, elemental advantage, buffs, debuffs, healing, shields, passives, triggers, revival, counters, dual attacks, combat-readiness changes, damage sharing / reduction and artifact combat effects are **not** implemented. A source entry is not a verified active ability: passives with numeric coefficients may appear as selectable damage actions. No claim of complete hero support is made. Cooldowns and soul gains default to API values and can be overridden. Soul costs are manual settings; soulburn is not automated. Non-damaging skills are disabled; use Pass turn and manual soul changes as needed.

## Data and attribution

`public/data/heroes.json` is a snapshot of the public [Fribbels Epic 7 Gear Optimizer hero cache](https://github.com/fribbels/Fribbels-Epic-7-Optimizer/blob/main/data/cache/herodata.json), fetched 2026-10-22. 391 records at download time. Hero portraits are bundled from the same upstream cache; all game assets belong to their respective owners. This is an unofficial fan prototype. No upstream application code was copied. CeciliaBot skill data is refreshed automatically as described above; new records do not imply implemented battle mechanics. Review upstream data / asset reuse permissions before public distribution.

CeciliaBot attribution: [hero database](https://ceciliabot.github.io/#/hero/), [deployed website repository](https://github.com/CeciliaBot/CeciliaBot.github.io), [asset repository](https://github.com/CeciliaBot/E7Assets-Temp). The app uses structured data and game assets; no CeciliaBot application code was copied.
