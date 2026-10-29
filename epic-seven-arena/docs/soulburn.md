# Soulburn execution

Burn arms the active hero's source-defined Soulburn skill and highlights it. Other skill buttons stay locked until Cancel. Choosing a target opens the usual confirmation with the enhanced preview and a `Soulburn (N souls): …` description line. Arming or cancelling spends nothing; a valid confirmed cast consumes its Soulburn cost **before** normal skill soul gains. Invalid targets, unavailable skills, unsupported variants and insufficient pre-cast souls do not change battle state. Undo restores souls and first-use flags.

The normal manual per-skill soul cost remains separate from the API Soulburn cost. The active side pays its own costs. Spirit Eye Celine's reviewed EE makes her first Soulburn cost zero and adds 50% damage; subsequent casts pay the normal cost. This is an equipment effect, not a passive skill. The first-use counter persists through death/revival and resets with a new battle.

## Enabled variants

- Explicit increased-damage variants verified against maintained e7calc: replace the normal ATK rate/POW with the reviewed Soulburn values. For example, ae-GISELLE S1 uses **1.7 ATK rate**, not 1.0. Other normal skill scaling and conditional multipliers stay intact.
- Extra turns, with a real next turn for the caster.
- Ignore Effect Resistance, including applicable strip/debuff/CR checks. Miss rules and status immunity still apply; ignoring ER does not make a hit guaranteed.
- Current-skill cooldown reduction by two turns.
- Fully mapped direct debuff chances increased to 100%, including the combined 100%/ignore-ER clause and direct mapped Attack/Defense Down duration changes.
- One-/two-turn extensions of buffs actually granted by the skill, and the reviewed generic duration/extra-turn combination. Existing unrelated buffs are not extended.

Currently **126 executable base skills** have a mapped Soulburn variant; this does not certify all secondary effects in their base kits. Fifty-five damage alternatives are recorded in the source table, of which 27 currently have executable base skills. Other specialized variants—changed targeting, new secondary effects, custom healing/barrier coefficients, special resource rules, repeats and transformations—stay explicitly blocked until reviewed. A mapped damage alternative does not bypass an unsupported base skill.

## Events and reactions

A completed active Soulburn cast emits its normal `skillUsed` event with:

```js
{ kind: "active", soulburn: true, tags: ["attack", "singleAttack", "soulburn"] }
```

Non-attacks keep their non-attack tag. Extra-turn Soulburns also carry `extraTurn`. Watchers can require `tagsAll: ["soulburn"]`; the existing dispatcher resolves the opposing side first for the same event. Reacting Dual Attacks, counters and additional skills always use their own normal, non-Soulburn skill version. They do not inherit the caller's expenditure, multiplier, extra turn or tag.

## Source policy

The numeric table is guarded by the matching source description, multiplier text, normal rate and POW. Its explicit alternatives were cross-checked against e7calc revision `39070976ce3cd0435cbcf5d430f2711cf0ef0005`. Source expressions are not executed. Variants that change additional numeric functions beyond the rate are excluded from generic damage handling and need separate review. Simple non-numeric effects and soul costs follow CeciliaBot's max-enhanced descriptions/metadata.

Tests cover consumption before gain, validation without spending, normal/Soulburn isolation, extra turns, ER/immunity/miss behavior, cooldowns, durations, enemy-first watchers, secondary-action isolation, source changes, and Celine's first-free EE. Desktop/mobile checks cover arming, locking, cancellation, confirmation, soul expenditure, Undo and the free first cast.
