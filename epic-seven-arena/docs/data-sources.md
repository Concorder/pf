# Data source priority

1. **e7calc**: authoritative damage formulas, hero/skill damage coefficients, conditional damage modifiers, damage scaling, and Soulburn damage variants.
2. **CeciliaBot**: hero identities, descriptions, enhancements, resource fields, skill/status metadata and icons. Its imported multiplier text is provisional until checked against e7calc.
3. **Fribbels**: base stats and portraits only. Do not use its damage coefficients or damage options to resolve disagreement or replace e7calc values.

The current runtime still imports CeciliaBot multiplier text through the existing guarded parser. This policy does not claim that every imported coefficient has been migrated to e7calc or that live e7calc synchronization exists. Keep unverified variants explicit rather than filling them with Fribbels values.

Use the current e7calc skill and matching variant. The public e7calc repository can be consulted when the live site is inaccessible, but a repository snapshot must not be described as current deployed-site data without verification. Existing user-confirmed battle rules remain in their mechanics documents; e7calc's damage formulas do not imply a complete battle/reaction engine.


Maintained e7calc source: [tyopoyt/epic7-damage-calc](https://github.com/tyopoyt/epic7-damage-calc), verified at revision `39070976ce3cd0435cbcf5d430f2711cf0ef0005` (2026-10-22), with `docs/CNAME` pointing to `e7calc.xyz`. The old `tyopoyt/e7calc-beta` snapshot is from 2024 and is historical evidence only. Use the maintained repository for new source reviews. [Additional/fixed-damage research](additional-and-fixed-damage.md) records the current formulas and exceptions.
