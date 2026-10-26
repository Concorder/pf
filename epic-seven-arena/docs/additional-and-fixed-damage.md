# Additional and fixed damage — e7calc research

Checked the maintained [tyopoyt/epic7-damage-calc repository](https://github.com/tyopoyt/epic7-damage-calc/tree/39070976ce3cd0435cbcf5d430f2711cf0ef0005), revision `39070976ce3cd0435cbcf5d430f2711cf0ef0005` (2026-10-22). Its `docs/CNAME` specifies `e7calc.xyz`. This supersedes the previously inspected 2024 `tyopoyt/e7calc-beta` snapshot. The live domain is blocked by this environment's HTTP policy; repository source was fetched directly from GitHub. These are source findings, not a claim to have tested the live calculator or enabled the mechanics in our engine.

## Ordinary stat-scaled additional damage

For a single stat-scaled aftermath component, before transfer and dedicated modifiers:

```text
AdditionalDamage = FinalScalingStat × Coefficient × 1.871
                   / (1 + EffectiveTargetDEF × (1 − Penetration) / 300)
```

- `FinalScalingStat` is the appropriate current ATK, DEF or max HP, including applicable stat changes. Certain effects use ally HP or injury amounts instead.
- Normal stat-scaled aftermath defaults to **70% defense penetration**, so 30% of the target's effective Defense remains. Use an effect's explicit penetration if it supplies one; do not turn this default into a universal rule.
- This is a separate component after the main hit. It does not reuse the main hit's ATK rate or POW.
- No crit, crushing, miss-damage, elemental-advantage or ordinary skill-enhancement multiplier is applied directly to this component in `getAfterMathSkillDamage`. The effect can still require a critical hit or a successful/non-missing hit to trigger.
- In the checked source, ordinary damage reduction is bypassed via `noReduc=true`; dedicated **additional-damage reduction** is applied separately. Additional damage is therefore not another normal skill hit.
- A **Pursuit set** applies ×1.2 to aftermath damage. Dedicated reduction applies ×`(1 − additionalDamageReduction/100)`.
- The target defense helper still accounts for transfer where called, including effect/artifact exceptions. Treat transfer and the simulator's recipient/limit ordering as a separate event/protection stage rather than subtracting damage twice.
- The synthetic `FixedPenetration` skill bypasses Penetration Resistance and has no single-target Penetration-set flag. Do not automatically copy the main attack's Penetration-set bonus to the additional component.

Reference: [hero.ts, aftermath methods](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/app/models/hero.ts#L135), [target.ts, defense/penetration handling](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/app/models/target.ts#L13), and [skill.ts, default aftermath penetration](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/app/models/skill.ts#L20).

## Concrete source examples

| Effect | Scaling coefficient | Defense penetration | Trigger/eligibility shown in the source |
| --- | ---: | ---: | --- |
| ae-KARINA S3 additional component | 140% caster DEF | 70% default | Main hit must not miss; ally/enemy recipient scope still comes from the skill description |
| Hwayoung S1 additional component | 35% caster ATK | 70% default | Main hit must not miss |
| Rocket Punch Gauntlet | 100% caster DEF | 70% | Single-target skill; artifact proc eligibility must be modeled separately |
| Uberius's Tooth | 45% caster ATK | 70% | Artifact proc eligibility must be modeled separately |
| Reingar's Special Drink | 45% caster ATK | 70% | AoE skill; artifact proc eligibility must be modeled separately |

These are the values in the checked current source, not older commonly quoted 30% artifact coefficients. A coefficient alone does not supply proc probability, artifact enhancement level behavior, recipient selection or activation order.

References: [ae-KARINA](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts#L333), [Hwayoung](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts#L5612), [artifact definitions](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/artifacts.ts#L464).

Example, excluding transfer and dedicated modifiers:

```text
Caster DEF = 2,000
Target effective DEF = 1,000
Karina S3 additional damage = 2,000 × 1.4 × 1.871 / (1 + 1,000 × 0.30 / 300)
                           = 2,619.4
```

Changing the main hit from normal to critical does not multiply that additional amount by Critical Damage. A DEF Down that lands before the additional component changes the Defense used for that component; the source has an explicit `targetDefenseDownAftermath` path for this. Our eventual event resolver must use the actual resolved status state, not assume Defense Down always lands.

## Exceptions: do not force everything through the stat formula

The source's `targetMaxHPPercent` branch uses `target max HP × coefficient` directly, without the 1.871 factor or defense helper. Rupture currently supplies 12% target max HP through this branch; Challenge supplies 10%. Magic Nail currently supplies 80% attacker ATK through the ordinary stat-scaled aftermath branch. Special Friendship and Young Senya have their own components/conditions, including two-component aftermath support. Each needs an explicit effect mapping rather than a guessed universal formula or a generic flat “extra attack.”

The source itself retains a TODO on parts of the target-max-HP aftermath treatment. Record this special path as calculator behavior and verify effect-specific game interactions before treating it as universal.

## Fixed damage

The base fixed amount skips Defense mitigation entirely and is not multiplied by the main hit's crit/crushing/miss multiplier, POW or ordinary skill enhancement. Its *trigger* can still depend on the main hit. Example: ae-WINTER S3 supplies `5000 × (stack + 1)` only on a critical hit.

The checked calculator does not treat “fixed” as “ignore every modifier.” Its skill-fixed contribution is:

```text
FixedContribution = (fixed + fixed2)
                    × (1 + PursuitBonus + KnowledgeOfTheStarsBonus)
                    × (1 − DedicatedAdditionalDamageReduction)
                    × TransferFactor
```

In this source the bonuses are 0.2 for Pursuit and 1.0 for Knowledge of the Stars when active. TransferFactor follows skill/artifact ignore-transfer flags. This differs from simply returning a constant for every damage event. Do not conflate bypassing Defense with bypassing barriers, immortality, damage caps, sharing or source-specific restrictions; the calculator is not a full battle lifecycle simulator.

Reference: [damage.service.ts, fixed contribution outside hit multipliers](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/app/services/damage.service.ts#L227), [ae-WINTER definition](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts#L387).

## Implementation consequences

- Keep additional and fixed components distinct from the main attack, with independent coefficients and activation conditions.
- Resolve statuses and stat changes at the appropriate point before computing each component.
- Use the existing user-confirmed protection rules where applicable; research source-specific coverage rather than inheriting every ordinary-attack modifier.
- Preserve the deferred Laceration/additional-damage injury question. This research does not settle event eligibility or simultaneous passive ordering.
- Recheck existing formulas imported from the old beta against this maintained source. For example, its current DoT code has 40% ATK Bleed and 70% ATK Burn; our earlier 30%/60% implementation needs a separate update. No DoT behavior was changed in this research pass.
