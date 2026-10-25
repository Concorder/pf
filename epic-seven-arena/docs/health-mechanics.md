# Injury and reduced max HP

Reviewed 2026-10-25. Source descriptions are bundled in `public/data/cecilia.json` and `src/data/debuffCatalog.js`, from [CeciliaBot](https://ceciliabot.github.io/#/database/debuffs/).

Verified source rules:

- `cmn_injury`: decreases max HP cumulatively, up to 50%; heroes only; injury itself is unaffected by resistance or misses.
- `stic_venom`: at turn start, 10% max-HP damage and injuries proportional to damage suffered; heroes only.
- `stic_laceration`: when attacked, damage suffered +15%; when HP decreases, injuries equal to HP reduced; heroes only.
- `stic_collapse`: max HP −25%, doubled on heroes.

## Shared state and rules

`health.js` owns the capacity calculation. `stats.hp` remains build HP; `baseMaxHp` freezes that baseline when battle begins. `injuryFraction` is a persistent fraction capped at 0.5. Injury is not a buff, cannot be cleansed, survives death/revival and clears on a new battle. Legacy amount snapshots are read as a percentage of their original HP baseline.

`uninjuredMaxHp` applies non-injury HP modifiers first (Collapse and the shared max-HP multiplier). Effective max HP is floor(uninjured max HP × (1 − injury fraction)), minimum 1. Applying or removing a max-HP modifier preserves the injury percentage, changes its displayed HP amount and clamps HP without healing or reviving. The shared multiplier is infrastructure for later max-HP effects; it does not automatically implement Superhuman or its source triggers.

For an injury effect limited to 15%, injury gained is min(actual HP lost, floor(uninjured max HP × .15)), then converted to percentage points of that same HP basis. Existing injury does not compound the percentage denominator. A collapsed 10,000-HP hero has a 5,000-HP basis: a 500-damage hit adds 10% injury; a 2,000-damage hit with a 15% ceiling adds only 750 HP / 15%. Removing Collapse preserves that fraction. The 50% total ceiling still applies. Source-specific skill injury mappings remain separate from this shared primitive.

HP bars, healing caps, HP-scaled damage, Poison, Beguile, Vampiric Touch and HP comparisons use the effective post-injury maximum. UI injury labels show both the persistent percentage and its current HP equivalent.

Venom stacks resolve independently. Each tick reads the same modified pre-injury max-HP basis as injury limits (after Collapse and other max-HP modifiers), deals floor(10%) damage, then injures by actual HP lost, not overkill damage. Laceration adds 15 percentage points to attack damage received and creates injury from actual HP lost through the shared damage entry point, including direct attacks, DoTs, Bomb, Curse and Beguile. Existing injury is not prevented by Immunity; the debuffs that cause it remain subject to ordinary application checks.

User-confirmed interaction: injury and Collapse are multiplicative. For example, 10,000 original HP with 20% injury leaves 8,000 permanent capacity; Collapse halves that to 4,000. Cleansing Collapse restores the capacity to 8,000 without healing or removing injury.

## Remaining sandbox choices requiring in-game confirmation

The source descriptions do **not** establish the following combined edge cases. These choices are deterministic and tested, but are not claimed as verified game behavior:

- Deferred Laceration event coverage: the user believes DoTs do not trigger Laceration, and does not know whether additional damage triggers it. Keep both questions open for later verification. The engine currently routes DoTs, Bomb/detonation and secondary damage through the broad injury hook, including double injury for Venom + Laceration; that is an unverified implementation assumption, not confirmed game behavior. No engine change was requested in this clarification.



User-confirmed: reducing the HP cap and clamping current HP (including Collapse or injury itself) is not actual damage and does not trigger Laceration injury. It cannot recursively create injury. This matches the existing implementation.

Venom’s HP basis is now settled by the user clarification and is no longer an open question.

A user clarification confirms injury percentage persistence across max-HP modifiers and that an “up to” limit is a ceiling, not a guaranteed injury amount.

Keep these limitations visible in documentation and verify them against reliable game evidence before claiming complete damage accuracy.

## Automatic application

Reviewed mappings add Sharun S1/S3 Venom, Ruiza S3 and Faithless Lidica S2 Laceration, and pre-attack Collapse for Salome S3 / Genesis Ras S2. Source prose, references and enhanced chances remain guarded. Unsupported damage formulas still block those actions; adding a status mapping does not imply full hero support. Manual controls can apply all three effects.

Pre-attack effects resolve before hit/damage calculation and are not duplicated afterward. Manual mode disables these rolls as well; apply pre-attack effects in the effects panel **before** attacking if you want to resolve them manually.

## Damage limits after injury

User-confirmed: percentage damage limits use effective max HP after injury and other HP modifiers, not original build HP or currently remaining HP. A 10,000-HP Spirit Eye Celine at 50% injury has 5,000 effective max HP; her configured 50% hit limit is 2,500. A 20% share then splits that into 2,000 target damage and 500 transfer. Frostbite disables sharing but preserves the 2,500 limit.
