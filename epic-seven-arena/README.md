# Epic Seven Battle Lab

A standalone, dependency-free HTML/CSS/JavaScript prototype for a manually controlled 3v3 battle. Three heroes per team occupy four formation slots arranged as a diamond: index 0 back, 1 upper, 2 front and 3 lower. The enemy formation is mirrored. Teams have separate editable soul pools, initially zero. Builds persist in browser local storage.

## Run

From `/workspace/pf`:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `/epic-seven-arena/` through your development server. No build step. Hero records and portraits are bundled locally; optional fonts require Internet access. Portrait initials and system fonts provide fallbacks.

## Controls

- Click a hero to choose among the bundled heroes, edit stats, set artifact notes / initial soul contribution, or configure skill soul gains, costs and cooldowns.
- Drag heroes between the four slots on the same team, or use the editor's “Move to empty slot” button.
- Presets are illustrative builds, not community averages.
- The cleaned snowy courtyard is an image-generated background based on the provided battle screenshot, saved in `assets/frozen-courtyard.png`. All original units and interface elements were removed from the background. Portrait avatars represent heroes; these are not animated battle sprites.
- HP and a thin blue readiness meter sit above each avatar. The left combat-readiness rail reflects the current deterministic speed scheduler; markers are separated for readability while labels retain actual percentages. Readiness is 0 before battle.
- The bottom HUD shows the current hero’s portrait, HP, souls and three skill controls. Generic vector skill symbols are placeholders, not original hero skill artwork. Target by clicking an enemy avatar or selecting the dropdown. Pass turn and Undo are available in the HUD. Fullscreen uses the browser Fullscreen API where supported.
- Start battle; manually control both teams. Choose a skill, enemy and normal / critical / miss outcome. Multiple-target skills hit the selected enemy followed by living enemies in formation order.
- Pass turn, undo actions / soul edits, or reset. Reset keeps builds and restores pre-battle soul values, so artifact contributions are not counted twice. Artifact starting souls are added each time a new battle starts.

## Combat scope

This is a damage sandbox, not an accurate Epic Seven battle engine. Speed schedules deterministic turns without initial speed randomness. Base calculation:

```
attack = ATK × rate × (1 + Speed × selfSpdScaling)
scaling = maxHP × selfHpScaling + DEF × selfDefScaling + targetMaxHP × targetHpScaling
damage = floor((attack + scaling) × 1.871 × pow × hitMultiplier / (1 + targetDEF × (1 - penetration) / 300))
```

Hit multiplier: normal 1, crit configured Crit Damage / 100, miss 0.75. Crit chance / effectiveness / resistance are editable build metadata; no random status or critical rolls occur. Only the listed coefficients are applied. Conditional skill options, enhancement bonuses, elemental advantage, buffs, debuffs, healing, shields, passives, triggers, revival, counters, dual attacks, combat-readiness changes, damage sharing / reduction and artifact combat effects are **not** implemented. A source entry is not a verified active ability: passives with numeric coefficients may appear as selectable damage actions. No claim of complete hero support is made. Soul costs / gains and cooldowns are manual user overrides, not fetched game rules; only S1 starts with a +1 soul placeholder. Non-damaging skills are disabled; use Pass turn and manual soul changes as needed.

## Data and attribution

`data/heroes.json` is a snapshot of the public [Fribbels Epic 7 Gear Optimizer hero cache](https://github.com/fribbels/Fribbels-Epic-7-Optimizer/blob/main/data/cache/herodata.json), fetched 2026-10-22. 391 records at download time. Hero portraits are bundled from the same upstream cache; all game assets belong to their respective owners. This is an unofficial fan prototype. No upstream application code was copied. There is no automatic data refresh yet; new records do not imply implemented battle mechanics. Review upstream data / asset reuse permissions before public distribution.
