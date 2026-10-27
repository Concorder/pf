# Natural 5★ skill audit

Scope: **213 natural 5★ heroes, 639 skills** from the bundled CeciliaBot snapshot (2026-10-22T22:41:17.340Z). Includes elemental, Moonlight, limited and collaboration units. Lower-rarity units are outside this review scope.

Detailed CeciliaBot records: 212; fallback-only heroes: Mei Lin. Missing details remain blocked.

Every scoped record was scanned for support flags, formula parsing, target markers, status references, resource fields and source inconsistencies. Specific mechanics below were reviewed and implemented from descriptions. This is a coverage audit, not a claim that every kit has been manually verified in game or fully implemented.

Regenerate this audit with `npm run audit:skills:nat5` and the detailed queue with `npm run report:skills:nat5`.

## Source priority

Damage formulas, coefficients, conditional damage modifiers and Soulburn damage values follow e7calc. CeciliaBot supplies hero/skill descriptions, icons and other metadata. Fribbels is retained for base stats and portraits only; its damage values must not validate or override e7calc. See [source policy](data-sources.md).

The runtime parses CeciliaBot multiplier text and uses guarded e7calc conditional S1 rules for Kise, Zahhak, Dizzy and Astromancer Elena. Other values remain provisional until checked against the matching current e7calc skill/version; this audit does not claim a completed e7calc data migration or live synchronization.

## Current base support

| Classification | Skills |
| --- | ---: |
| supported | 240 |
| passive | 132 |
| unsupported | 249 |
| nonAttack | 18 |

Supported means the base damage calculation is available. Buffs, passives, Soulburn and conditional follow-ups can remain incomplete; see [the per-skill queue](unsupported-nat5-skills.md).

## Primary blockers

| Primary blocker | Skills |
| --- | ---: |
| Passive / reaction handlers | 132 |
| Non-attack effects awaiting handlers | 61 |
| Healing, barriers or lifesteal mixed into formula text | 57 |
| Conditional damage / unrecognized source syntax | 48 |
| Multiple forms, procs or resource-dependent variants | 32 |
| Conditional / unspecified penetration | 25 |
| Additional damage / detonation handlers | 17 |
| Missing / inconsistent coefficient data | 5 |
| Target-scope verification | 4 |

These categories assign one primary blocker to each unsupported/passive entry, while individual skills may have several gaps. Clear descriptions generally need implementation rather than user clarification.

## Non-attack targeting and cast support

Ally and team targets come from the skill descriptions; they are not open clarification questions. Eight reviewed support casts now execute: Yuna S2, Vivian S3, Iseria S2, Flan S2, Emilia S2, Laia S2, Desert Jewel Basar S3 and Mediator Kawerik S3. Ally means the caster too unless explicitly excluded. Team/self casts open a confirmation directly; ally casts highlight friendly avatars. No hit/resistance roll occurs for beneficial effects. Existing Cermia self-cast support remains available.

Mediator Kawerik's separate S3-ready turn-start duration reduction remains pending. Other unimplemented non-attack skills are generally missing effect handlers (healing, barriers, special buffs, revival/transformations, enemy debuff effects), not ambiguous ally targeting. The remaining count is not a count of questions for the user.

## Reviewed and implemented in this pass

- Resource foundation: optional Fighting Spirit (100 maximum) and Focus (5 maximum), fractional values, manual edits with Undo, initial-value overrides and gain multipliers. Native pools and supported flat cast gains/costs use explicit source data. Costs are checked before casting. Resource-bearing unsupported skills remain blocked by their other support checks.
- Resource UI: red Fighting Spirit bar immediately under HP; Focus has five blocks with proportional partial filling (2.5 = two full blocks plus half a block). Active-unit and effect-panel controls edit exact values.
- Reviewed conditional S1 damage: Kise versus buffs ×1.7, Zahhak versus buffs ×1.3 with +50 Hit/Critical Chance, Dizzy versus debuffs ×1.3, Astromancer Elena versus debuffs ×1.2. Dizzy S1 also applies its 25% one-turn Stun with ordinary resistance checks.
- Reviewed passive watchers: Sol enemy non-attack CR/Spirit, Designer Lilibet enemy-turn-end allied-debuff Spirit/full-resource cleanse and buffs, Astromancer Elena allied AoE Worship Me! CR/souls. Enemy-side reactions resolve first for a shared event. Sol retaliation and Elena Star’s Blessing remain pending; see the detailed checklist.
- Resource-only passive mappings: 15 opening grants; Urban Shadow Choux's turn-start Focus; Solitaria/Elvira enemy gain blocking with Seal/death handling; Arbiter Vildred's reviewed revival grants maximum Focus. Other portions of those passives remain pending.
- Direct S1 debuff grants for 28 natural 5★ heroes, with source-description guards, max-enhanced chances, ordinary miss/Immunity/resistance rules and existing manual overrides. This includes ae-KARINA, Alencia, Iseria, Lua, Flan, Politis, Yufine, Fallen Cecilia and Faithless Lidica. It does not imply Soulburn or the entire kit is implemented.
- Aria S1: +20 percentage points to effect chance outside her own turn. Violet S1: doubled Focus and +15% CR outside his own turn. Choux S1: doubled Focus after a critical hit and source-defined CR gain. Resource gain reductions apply after the conditional gain multiplier, preserving fractions.
- Fixed penetration no longer becomes unsupported solely because a separate sentence describes HP/DEF/Speed scaling. Conditional, target-ranked and unspecified penetration remain blocked. Ran S1 and Lionheart Cermia S3 now have verified static percentages; source-defined battle-start cooldowns are initialized. Extra-turn execution for unimplemented skills remains separate from damage support.
- Abigail S1 root is classified as an attack; its shared non-attack marker describes the nested Might effect. Normal damage and caster CR are available. The conditional Might effect still needs a handler.

## Source findings and unresolved implementation work

- Ilynav S1: CeciliaBot text says 10% max HP but the redundant expression says `0.01 Health`; The checked e7calc source specifies 0.10. The coefficient evidence is clear, but the 50% replacement with Punish still needs execution branching. Her S1 remains blocked; a Dual Attack uses the unreplaced basic skill according to its description.
- Kawerik: the current cached descriptions include Fighting Spirit/Mana Field. Use the maintained e7calc repository for coefficients and extra-attack variants; the previously checked 2024 beta is historical, not authoritative. Do not substitute Fribbels values.
- Healing/barrier rows are not HP/DEF attack scaling. Keep recipient selection, caps, timing, skill enhancement effects and shield absorption separate when implementing them.
- Focus/full-resource replacement skills need branch-specific damage and spending, not a guessed averaged multiplier. Clear descriptions are sufficient for trigger conditions, but the matching branch coefficients must also be available.
- Explicit resource requirements are imported, while conditional consumes-all triggers, retaliation resource grants, resource-on-death/reset policy and every unreviewed passive/resource interaction remain pending. Manual adjustments can represent those states without pretending they are automatic.
- Existing deferred injury and reaction-order questions remain in the mechanics documents. This pass does not reopen user-confirmed Venom scaling, injury caps, Collapse, damage-share order or dispel sorting.

## Resource-bearing natural 5★ units

Detected **44 resource-bearing units**. A pool does not imply complete passive or threshold automation.

| Hero | Resource |
| --- | --- |
| Abyssal Yufine | Fighting Spirit, max 100 |
| Afternoon Soak Flan | Focus, max 5 |
| Apocalypse Ravi | Fighting Spirit, max 100 |
| Arbiter Vildred | Focus, max 5 |
| Archdemon's Shadow | Focus, max 5 |
| Aria | Focus, max 5 |
| Bellona | Focus, max 5 |
| Benimaru | Fighting Spirit, max 100 |
| Brieg | Fighting Spirit, max 100 |
| Charlotte | Fighting Spirit, max 100 |
| Choux | Focus, max 5 |
| Commander Pavel | Fighting Spirit, max 100 |
| Designer Lilibet | Fighting Spirit, max 100 |
| Estelle | Fighting Spirit, max 100 |
| Fenris | Fighting Spirit, max 100 |
| Fern | Focus, max 5 |
| Fumyr | Focus, max 5 |
| Harsetti | Focus, max 5 |
| Haru | Focus, max 5 |
| Kane | Fighting Spirit, max 100 |
| Kawerik | Fighting Spirit, max 100 |
| Ken | Fighting Spirit, max 100 |
| Landy | Fighting Spirit, max 100 |
| Lone Crescent Bellona | Fighting Spirit, max 100 |
| Milim | Focus, max 5 |
| Navy Captain Landy | Fighting Spirit, max 100 |
| Ocean Breeze Luluca | Focus, max 5 |
| Ravi | Fighting Spirit, max 100 |
| Remnant Violet | Focus, max 5 |
| Renoa | Focus, max 5 |
| Roy Mustang | Fighting Spirit, max 100 |
| Saria | Focus, max 5 |
| Seaside Bellona | Focus, max 5 |
| Setsuka | Fighting Spirit, max 100 |
| Sol | Fighting Spirit, max 100 |
| Stark | Fighting Spirit, max 100 |
| Successor Taeyou | Fighting Spirit, max 100 |
| Summer Break Charlotte | Fighting Spirit, max 100 |
| Sylvan Sage Vivian | Focus, max 5 |
| Twisted Eidolon Kayron | Fighting Spirit, max 100 |
| Urban Shadow Choux | Focus, max 5 |
| Violet | Focus, max 5 |
| Young Senya | Fighting Spirit, max 100 |
| Yuna | Focus, max 5 |

## References checked

- [CeciliaBot hero database](https://ceciliabot.github.io/#/hero/): local snapshot supplies awakened descriptions, values, resource fields and source guards. Live API freshness is not claimed.
- [Fribbels repository](https://github.com/fribbels/Fribbels-Epic-7-Optimizer/tree/038a652b9e76cb1ea5bc40d34c7dcdb9a1d8e3a8): checked `data/py` (Scapy networking library), `app/js/lib/damageCalc.js`, `backend/src/main/java/com/fribbels/model/DamageMultipliers.java`, and `data/cache/herodata.json`. The fetched hero-cache file exactly matches our bundled cache (SHA-256 `2a17831fe7ed936f8e2d58783bac786f6790de7792b8cb5b52bc374da082d384`). It remains a base-stat/portrait source; its damage values are excluded from this audit and are not authoritative.
- [e7calc public source](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts): checked maintained repository revision 39070976ce3cd0435cbcf5d430f2711cf0ef0005 (2026-10-22) for Aria, Apocalypse Ravi, Ilynav and Kawerik coefficients/branches; the old 2024 beta is historical. Its formulas do not certify current live-game passive behavior. No upstream application code was copied.
