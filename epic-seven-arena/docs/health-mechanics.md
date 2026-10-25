# Injury and reduced max HP

Reviewed 2026-10-25. Source descriptions are bundled in `public/data/cecilia.json` and `src/data/debuffCatalog.js`, from [CeciliaBot](https://ceciliabot.github.io/#/database/debuffs/).

Verified source rules:

- `cmn_injury`: decreases max HP cumulatively, up to 50%; heroes only; injury itself is unaffected by resistance or misses.
- `stic_venom`: at turn start, 10% max-HP damage and injuries proportional to damage suffered; heroes only.
- `stic_laceration`: when attacked, damage suffered +15%; when HP decreases, injuries equal to HP reduced; heroes only.
- `stic_collapse`: max HP −25%, doubled on heroes.

## Shared state and rules

`health.js` owns the capacity calculation. `stats.hp` remains build HP; `baseMaxHp` freezes that baseline when battle begins. `injury` is a persistent amount capped at floor(original max HP × 50%). It is not a buff, cannot be cleansed, survives death and is retained by the HP-only revival primitive. New battle/reset clears it. The reviewed Dark Contract death handler now uses the shared revival pipeline; other revival skills remain pending.

Effective max HP = floor((original max HP − injury) × Collapse multiplier), minimum 1. The multiplier is .5 on heroes, .75 on nonheroes, otherwise 1. Apply/cleanse/expiry clamps current HP to capacity without healing or reviving. Removing Collapse restores capacity, not lost HP. All HP-scaled damage, Poison/Venom, Beguile, Vampiric Touch, healing caps, HP comparisons and displays use this same maximum.

Venom stacks resolve independently. Each tick reads the current effective max HP, deals floor(10%) damage, then injures by actual HP lost, not overkill damage. Laceration adds 15 percentage points to attack damage received and creates injury from actual HP lost through the shared damage entry point, including direct attacks, DoTs, Bomb, Curse and Beguile. Existing injury is not prevented by Immunity; the debuffs that cause it remain subject to ordinary application checks.

## Explicit sandbox choices requiring in-game confirmation

The source descriptions do **not** establish the following combined edge cases. These choices are deterministic and tested, but are not claimed as verified game behavior:

- Collapse multiplies remaining capacity after permanent injury, rather than adding another reduction of original max HP.
- Separate Venom and Laceration injury sources add their injury amounts for the same damage event, up to the shared cap.
- Capacity clamping from Collapse or injury is not another damage event and cannot recursively create more injury.
- Each Venom stack reads the capacity after the preceding stack’s injury, rather than snapshotting capacity once for the whole turn.

Keep these limitations visible in documentation and verify them against reliable game evidence before claiming complete damage accuracy.

## Automatic application

Reviewed mappings add Sharun S1/S3 Venom, Ruiza S3 and Faithless Lidica S2 Laceration, and pre-attack Collapse for Salome S3 / Genesis Ras S2. Source prose, references and enhanced chances remain guarded. Unsupported damage formulas still block those actions; adding a status mapping does not imply full hero support. Manual controls can apply all three effects.

Pre-attack effects resolve before hit/damage calculation and are not duplicated afterward. Manual mode disables these rolls as well; apply pre-attack effects in the effects panel **before** attacking if you want to resolve them manually.
