# Additional and fixed damage — e7calc research

Checked the maintained [tyopoyt/epic7-damage-calc repository](https://github.com/tyopoyt/epic7-damage-calc/tree/39070976ce3cd0435cbcf5d430f2711cf0ef0005), revision `39070976ce3cd0435cbcf5d430f2711cf0ef0005` (2026-10-22). Its `docs/CNAME` specifies `e7calc.xyz`. This supersedes the previously inspected 2024 `tyopoyt/e7calc-beta` snapshot. The live domain is blocked by this environment's HTTP policy; repository source was fetched directly from GitHub. The source findings below informed the reviewed implementation added on 2026-10-29. The live calculator itself remains inaccessible from this environment.

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


## Implemented shared pipeline (2026-10-29)

The live site returned HTTP 403 here. The maintained repository HEAD was checked again and still matches the revision above. The implementation uses `floor(stat × ratio × 1.871 / (1 + effective DEF × (1 − penetration) / 300))`, with 70% default penetration. Albedo at 10,000 effective max HP against 1,000 DEF therefore deals **654** additional damage, not the 350 that ordinary no-penetration mitigation would produce without the engine constant.

Additional damage is a separate component after the primary skill's strips/debuffs/buffs, not another attack/skill use. It does not crit, inherit main-hit enhancement/crit/miss/element modifiers, start a turn, trigger another skill-use event or recursively counter/Dual Attack. The skill's stated hit requirement still applies. Sol S3 explicitly procs even on a miss; ordinary successful-hit skill components do not. Artifact damage ignores the primary hit/miss outcome but still checks its configured proc chance and applicable role/attack scope.

Damage is resolved atomically inside the same turn/Undo snapshot. A separate white damage number has an explicit 1,000 ms presentation delay and remains visible for its normal lifetime. No asynchronous timer mutates battle HP or advances the combat engine.

Reviewed skill mappings:

| Skill | Component | Trigger/scope |
| --- | --- | --- |
| ae-KARINA S3 | 140% caster Defense | Successful primary hit, then all enemies; Defense Down and self Speed precede it. |
| Albedo S1 | 7% caster max HP | Successful hit, primary target; primary damage also has 9% HP scaling. |
| Sol S3 | 40% caster Attack | Primary target, including misses. |
| Requiem Roana S1 | 50% caster Attack | Successful hit; resolves after the skill's Defense Down. |
| Lone Wolf Peira S1 | 25% caster Attack | Successful hit; normal single-target form. |
| New Moon Luna S2 | 16% caster max HP | Successful primary hit, then splash to all living enemies using each enemy's Defense. |
| Guard Captain Krau S1 | 60% caster Defense | Successful hit; the primary 85% Defense scaling is also imported from e7calc. |
| Salome S3 | 17% caster max HP | Successful hit; Collapse before the primary attack and Defense Down before the component. |
| Hwayoung S1 | 35% caster Attack | Successful hit, normal form. Soulburn repeat/variant still requires its own review. |

Reviewed artifact **damage profiles** are selectable in Hero Workshop: 3F (9% HP), M.O.A.S and Rocket Punch Gauntlet (100% DEF), Reingar's Special Drink (45% ATK/AoE), Spear of a New Dawn (50% ATK/basic skill), and Uberius's Tooth (45% ATK). All use their explicit 70% penetration. These are e7calc component profiles, not complete artifact automation: proc chance is a manual build setting, other bonuses are not imported, and activation/cooldown restrictions not encoded by the calculator remain manual. The attack dialog can disable the artifact component for an individual cast. Legacy free-text artifact notes do not silently enable a profile.

The component bypasses ordinary attack damage reduction/caps; strongest eligible damage sharing is resolved once, with existing Frostbite/share-bypass rules. Barriers, Invincibility, Immortality, death and revival use the shared damage pipeline. Dedicated additional-damage reduction/Pursuit modifiers remain separate pending integrations. Laceration-on-additional-damage remains deferred, so this new event does not enable it implicitly.

Checked but still requiring their native execution/condition handlers: Archdemon's Shadow Burst, Festive Eda Expected Outcome, Inheritor Amiki's conditional penetration/Immortality form, Monarch of the Sword Iseria's Fracture/injury variants, and New Kid Adin's Vigor/injury component. Notos remains deferred as previously requested. Fixed-damage skills such as Rimuru/Schniel are a different category and are not converted into stat-scaled aftermath damage merely because their descriptions say “additional.”
