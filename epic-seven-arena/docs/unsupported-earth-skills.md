# Unsupported and partially supported Earth 5★ skills

Generated from the bundled CeciliaBot snapshot (2026-10-22T22:41:17.340Z) and current normalization rules.
Scope: **45 heroes**, **135 skills** (rarity 5 only; includes Moonlight and limited units).
Earth only; all remaining entries are work/research, not questions for the user.
Contains **108 skill entries** across **45 heroes**.

Regenerate with `npm run report:skills:earth`. This is an implementation/review queue, not a list of questions you must answer. Checked-off notes should be recorded in the relevant mechanics document or rules before regeneration, which replaces this file.

## Source research queue (not questions for the user)

- [ ] Laceration: verify whether additional damage causes its injury; DoT coverage is deferred (user believes DoTs do not trigger it). HP-cap clamping is confirmed NOT to cause injury.
- [ ] Verify Magic Nail/Rupture coefficients and defense interactions, and Omen's actual trigger.
- [ ] Confirm simultaneous reaction ordering, equal-strength protection-source selection, and AoE/death-passive ordering for affected skills.

See [remaining mechanics](remaining-mechanics.md), [health rules](health-mechanics.md), and [trigger rules](triggers-and-revival.md) for context. Already confirmed injury/Collapse, Venom scaling, damage-limit/share ordering and buff sorting rules are not reopened here.

Ordinary target selection, caster exclusions, buff recipients, durations and explicit trigger conditions are taken from CeciliaBot descriptions. They do not require user clarification. Damage coefficients follow e7calc. Healing/barrier metadata uses reviewed source text and max enhancements, cross-checked against e7calc where it provides those values. Ask the user only if source research leaves a genuine contradiction or undocumented interaction unresolved. See [review policy](review-policy.md).

## How to read the skill queue

- An unsupported damage formula or missing target count usually needs implementation/source verification, not user clarification.
- Entries labelled **Base damage supported; secondary effects pending** remain only for the listed remaining mechanics. Their coefficient text is included as a reference, not an unsupported-formula warning.
- Supported base damage does not certify all secondary effects. Buff audit prompts flag references for review; some grants may already work. The report cannot prove complete semantic coverage from prose.
- Passive support reasons describe implemented portions and remaining gaps. A passive entry does not mean all its mechanics are missing.
- Soulburn, tags and manual status controls do not imply automatic skill execution. Conditional/form-specific reactions still require reviewed handlers.
- Entries without a detected gap are omitted, but are not thereby certified fully supported. This inventory is based on explicit support flags plus targeted audit prompts, not exhaustive prose interpretation.
- Descriptions below use awakened, maximum-enhancement display values. EE options are listed independently of which option a player equips.

## Skills

### ae-GISELLE (c1138)

- [ ] **S1 — Surging Light** — Base damage supported; secondary effects pending
  - Current base support: supported. Reviewed e7calc damage formula
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy, and increases Combat Readiness of the ally with the highest Attack except for the caster by 15%. Damage dealt increases proportional to the target's current Health ratio.
  - Reviewed Earth effects: readiness.
  - Reviewed damage source: [e7calc](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts), revision 39070976ce3cd0435cbcf5d430f2711cf0ef0005.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1 (1.7 Soulburn)<br>!pow: 1<br>0.2% increased damage per 1% target current Health (Same for Soulburn)<br>
  - Soulburn (10 souls): Increases damage dealt.

### Albedo (c1156)

- [ ] **S1 — No Need for Words** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy with a bardiche, before increasing Combat Readiness of the caster by 20%. A successful attack deals additional damage proportional to the caster's max Health. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.75<br>!pow: 1<br>Max Health scaling 9% (0.09 * self Max Health)<br>Additional damage: 7% caster's max Health (0.07 * Health)
  - Unparsed formula lines: Additional damage: 7% caster's max Health (0.07 * Health)

- [ ] **S2 — Aegis Unfold** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When an ally suffers a critical hit, decreases damage suffered by 20%. When an ally except for the caster suffers a critical hit, counterattacks with Let's Go, Bicorn!. Let's Go, Bicorn! can only be activated once every 2 turns. When more than one damage reduction effect is granted, only the strongest effect is applied.<br>Let's Go, Bicorn!: Attacks all enemies, dispelling one buff, before increasing Speed of the caster for 2 turns. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.3<br>!pow: 1.3<br>Max Health scaling 7% (0.07 * self Max Health)<br>

- [ ] **S3 — Rage of Nazarick** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Fiercely attacks the wicked enemy, with a 100% chance each to dispel all buffs from the target, make them --unable to be buffed--, and --decrease Defense-- for 2 turns. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.7<br>!pow: 1.05<br>Max Health scaling 25% (0.25 * self Max Health)<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Alencia (c1100)

- [ ] **S1 — Eradicate** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy by battering them, with a 75% chance to --decrease Defense-- for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.5<br>!pow: 1<br>8% self max Health (0.08 * Health)<br>
  - Soulburn (10 souls): Increases effect chance to 100% and ignores Effect Resistance.
  - EE 1: Recovers the caster's Health when using Eradicate. Amount recovered increases proportional to the caster's max Health.

- [ ] **S2 — Noble Blood** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed stats; pending: Mind’s Eye opening each turn and Trample follow-up
  - Review/work: Passive: reviewed stats; pending: Mind’s Eye opening each turn and Trample follow-up
  - Review/work: Mind’s Eye opening each turn and Trample follow-up
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Increases Critical Hit Chance by 20%. At the start of the turn, has a 100% chance to grant Mind's Eye to the caster for 1 turn. After using Eradicate, when the caster is granted Mind's Eye, activates Trample as an extra skill.<br>Trample: Attacks the enemy by striking from above, and increases Combat Readiness of the caster by 15%. Damage dealt increases proportional to the caster's max Health.
  - Reviewed Earth effects: conditional/passive execution.
  - Source multiplier text (requires review): Skill2 (Trigger Only)<br>att_rate: 0.5<br>!pow: 1<br>11% self max Health (0.11 * Health)<br>
  - Unparsed formula lines: Skill2 (Trigger Only)
  - EE 2: Increase damage dealt by Tramplet by 20%.

- [ ] **S3 — Genesis** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies with Dragon's Might, dispelling all buffs, and grants increased Defense to all allies for 2 turns. Increases Combat Readiness of the caster by 50%. Damage dealt increases proportional to the caster's max Health.
  - Reviewed Earth effects: buff, readiness.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.5<br>!pow: 1<br>15% self max Health (0.15 * Health)<br>
  - EE 3: Decreases Combat Readiness of the target by 20% when using Genesis.

### Arunka (c1124)

- [ ] **S1 — Dagger Throw** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Throws daggers at the enemy, with a 50% chance each to inflict two --bleeding-- effects for 2 turns. A successful attack has a 50% chance to activate Expose as an extra attack. Expose can only be activated once per turn, during the caster's turn.<br>Expose: Attacks the enemy, and recovers Health of the caster. Amount recovered increases proportional to the caster's Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br><br><br>Skill1Proc<br>att_rate: 1.3<br>!pow: 1.3<br>Heal Strength: 25% Self Attack<br>
  - Unparsed formula lines: Skill1Proc; att_rate: 1.3; !pow: 1.3; Heal Strength: 25% Self Attack
  - Soulburn (10 souls): Has a 100% chance to activate Expose.
  - EE 1: Increases Dagger Throw's chance to inflict --bleeding-- by 20%.

- [ ] **S2 — Wild Instinct** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed stats implemented
  - Review/work: Attack +30% and no critical hits are implemented by the reviewed passive stat rule
  - Description: Attack increases by 30%. When attacking, cannot trigger a critical hit. At the end of an enemy's turn, when the target is granted a barrier, increases Combat Readiness of the caster by 10%.
  - Reviewed Earth effects: conditional/passive execution.
  - Implemented watchers: arunka-enemy-barrier.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — A Thrashing In The Prairie** — Base damage supported; secondary effects pending
  - Current base support: supported. Reviewed e7calc damage formula
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Runs up to the enemy to attack. When the enemy is defeated, inflicts extinction and resets cooldown of this skill. Penetrates the target's Defense by 70% and when the target is granted a barrier, increases damage dealt.
  - Reviewed Earth effects: conditional/passive execution.
  - Reviewed damage source: [e7calc](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts), revision 39070976ce3cd0435cbcf5d430f2711cf0ef0005.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.9<br>!pow: 1<br>240% increased damage if enemy has barrier<br>
  - EE 3: Increases Combat Readiness of the caster by 30% when usrng A Thrashing In The Prairie.

### Baiken (c1093)

- [ ] **S3 — Garyo Tensei** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Delivers a deadly blow and detonates any --bleeding-- effects inflicted on the target at the end of the turn. A critical hit will increase Combat Readiness of all allies by 25%.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.6(1.85 soulburn)<br>!pow: 1<br>after initial damage, explosion damage is total remaining bleed damage<br>30% increased damage on bleed portion<br><br>explosion cannot get bonus from critical hit damage<br>Detonation multi: 1.3
  - Unparsed formula lines: after initial damage, explosion damage is total remaining bleed damage; 30% increased damage on bleed portion; explosion cannot get bonus from critical hit damage; Detonation multi: 1.3
  - Soulburn (10 souls): Increases damage dealt.

### Basar (c1053)

- [ ] **S3 — Sandstorm** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with sand magic, dispelling all buffs and making them --unable to be buffed-- for 2 turns, before decreasing Combat Readiness by 30%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.9<br>!pow: 0.9<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Bellona (c1071)

- [ ] **S1 — Windbreak Fan** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a fan. Damage dealt increases proportional to the target's max Health. When Focus is 5 or more, consumes all Focus and activates Razorwind Fan.
  - Reviewed Earth effects: conditional/passive execution.
  - Resource: focus; base gain 1; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.95<br>4% target max Health<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Butterfly Fan** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks all enemies by waving a fan, before granting immunity to the caster for 1 turn.
  - Reviewed Earth effects: buff.
  - Resource: focus; base gain 1; required/spent 0.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.2<br>!pow: 0.95<br>
  - EE 1: Dispels one buff each from all enemies when using Butterfly Fan.

- [ ] **S3 — Razorwind Fan** — Base damage supported; secondary effects pending
  - Current base support: supported. Reviewed e7calc damage formula
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies by creating a powerful gust of wind, with a 100% chance to --decrease Defense-- for 2 turns. Increases damage dealt when Razorwind Fan is triggered by Windbreak Fan.
  - Reviewed damage source: [e7calc](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts), revision 39070976ce3cd0435cbcf5d430f2711cf0ef0005.
  - Resource: focus; base gain 3; required/spent 0.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.05 (1.25 if tirggered by S1)<br>!pow: 1<br>
  - EE 3: Decreases Combat Readiness of all enemies by 15% when using Razorwrnd Fan.

### Blooming Lidica (c5046)

- [ ] **S1 — Twirling Thorns** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a sword, with a 40% chance to --stun-- for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.5<br>!pow: 1<br>Max Health scaling 12% (0.12 * self Max Health)<br>
  - Soulburn (10 souls): Increases effect chance to 100%.
  - EE 1: Removes 3 Soul from the enemy when using Twirling Thorns.

- [ ] **S2 — Seductive Scent** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Increases Speed proportional to the number of debuffs inflicted on all enemies, up to a maximum of 70%. After an ally except for the caster attacks, when the target has a debuff, activates Thorned Vine. Thorned Vine can only be activated once every 3 turns.<br>Thorned Vine: Attacks all enemies, decreasing buff durations by 1 turn and making them --unable to be buffed-- for 2 turns. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2(Proc)<br>att_rate: 0.5<br>!pow: 1<br>Max Health scaling 7% (0.07 * self Max Health)<br>Speed increase 7% for each debuff on the target (max 70% speed increase)
  - Unparsed formula lines: Skill2(Proc); Speed increase 7% for each debuff on the target (max 70% speed increase)
  - EE 2: --Restricts-- all enemies for 2 turns when using Thorned Vine.

- [ ] **S3 — Fruit of Ecstasy** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a flower, and grants skill nullifier once to all allies. Penetrates the target's Defense by 50%. When the caster's Speed is greater than the target's Speed, penetrates the target's Defense, with the penetration rate increasing proportional to the difference, up to a maximum of 100%. Damage dealt increases proportional to the caster's max Health. This attack cannot trigger a critical hit.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.5<br>!pow: 1<br>Max Health scaling 42% (0.42 * self Max Health)<br>0.296% defense penetration per speed over the target (MAX 100% Def Penetration)<br>170 speed difference for 100% penetration
  - Unparsed formula lines: 0.296% defense penetration per speed over the target (MAX 100% Def Penetration); 170 speed difference for 100% penetration

### Celine (c1103)

- [ ] **S1 — Uppercut** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a sheath, and grants stealth to the caster for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.2<br>!pow: 1<br>

- [ ] **S2 — Intuition** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: Damage bonus implemented; additional effect pending
  - Description: At the start of the first battle, grants stealth for 2 turns. After an enemy uses a non-attack skill, dispels all debuffs from the caster and activates Blink against a random enemy.<br>Blink (gains 10 Soul): Attacks the enemy in the blink of an eye, and increases Combat Readiness of the caster by 30%. Unaffected by elemental disadvantage.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.6<br>!pow: 1<br>
  - EE 1: --Stuns-- the target for 1 turn when using Blink.
  - EE 2: Increases damage dealt by Blink by 10% and attacks the enemy with the highest Attack.

- [ ] **S3 — Thunderclap** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy repeatedly, and absorbs some of the damage dealt as Health. Grants increased Evasion and a barrier (proportional to Attack) to the caster for 2 turns. When the enemy is not an Elite or Boss monster, ignores damage sharing.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.8(2.5 soulburn)<br>!pow: 1<br>Heals for 20% of damage done<br>Heal Strength: 50% Self Attack
  - Unparsed formula lines: Heals for 20% of damage done; Heal Strength: 50% Self Attack
  - Soulburn (10 souls): Increases damage dealt.

### Charles (c1027)

- [ ] **S1 — Slash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a giant sword and has a 75% chance to dispel one buff. After attacking, has a 50% chance to activate Smash as an extra attack, and when the caster is granted three or more buffs, doubles effect chance.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - EE 1: Increases buff dispel chance of Slash by 25%.

- [ ] **S2 — Smash** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy repeatedly with a giant sword, absorbing some of the damage as Health, and increases Combat Readiness of all allies by 15%.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.5<br>!pow: 1<br>Heal strength: 30% of Damage done<br>
  - Unparsed formula lines: Heal strength: 30% of Damage done

- [ ] **S3 — Faithful Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies by discharging a sword blast, and grants increased Attack and increased Defense to all allies for 2 turns. Grants counterattack to the caster for 2 turns. When there are three or fewer enemies, damage dealt increases as enemies become fewer.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.2<br>!pow: 1<br>26.7% more dmg vs 1 target, 53.4% more dmg vs 2 targets, 80.1% more dmg vs 3 targets<br>
  - Unparsed formula lines: 26.7% more dmg vs 1 target, 53.4% more dmg vs 2 targets, 80.1% more dmg vs 3 targets
  - Soulburn (10 souls): Cooldown of this skill is decreased by 2 turns.
  - EE 3: Dispels all debuffs from the caster before the skill effect when using Faithful Strike.

### Command Model Laika (c1099)

- [ ] **S1 — Supporting Fire** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy, increasing Combat Readiness of the caster and a random ally except for the caster by 15%.
  - Reviewed Earth effects: readiness.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - EE 1: Increases Combat Readiness of the ally with the highest Attack Instead of a random ally when using Supporting Fire.

- [ ] **S2 — Strike Order** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Selects an enemy, with a 100% chance to --target-- them for 2 turns. Grants increased Attack (Greater) to the ally with the highest Attack except for the caster for 2 turns before triggering a Dual Attack.
  - Source multiplier text (requires review): Skill2<br>
  - EE 2: Dispels all buffs from the enemy when using Strike Order. (This effect is applied before inflicting --target--)

- [ ] **S3 — Volley Fire!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Shoots out all wings to attack all enemies, with a 100% chance each to --decrease Speed-- for 2 turns and put them to --sleep-- for 1 turn, before granting immunity to all allies for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.1<br>!pow: 1<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.
  - EE 3: Decreases buff durations of the target by 1 turn when using Volley Fire!. (This <br>effect is applied before inflicting decreased Speed.)

### Destina (c2022)

- [ ] **S1 — Key to an Oath** — Base damage supported; secondary effects pending
  - Current base support: supported. Reviewed e7calc damage formula
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a staff, before recovering Health of the ally with the lowest Health proportional to the caster’s max Health.
  - Reviewed Earth effects: heal.
  - Reviewed damage source: [e7calc](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts), revision 39070976ce3cd0435cbcf5d430f2711cf0ef0005.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>Heal strength: 8% self max Health<br>Heal strength: 35% self max Health (Soulburn)
  - Soulburn (20 souls): After attacking, greatly heals all allies. Does not trigger a Dual Attack.
  - EE 1: Dispels one debuff from the ally with the lowest Health when using Key to an Oath.

- [ ] **S2 — Regen** — Non-attack cast supported; remaining effects listed below
  - Current base support: nonAttack. Non-attack cast implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Blesses an ally, dispelling two debuffs and recovering Health proportional to the caster’s max Health before increasing Combat Readiness by 30%.
  - Non-attack source note (no damage formula): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 16% self max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 16% self max Health
  - EE 2: Has a 30% chance to reset skill cooldown of Regen when using Regen.
  - EE 3: Increases Combat Readiness of the target by an additional 20% when using Regen.

### Ervalen (c1108)

- [ ] **S2 — Sword of Hatred** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy repeatedly, and grants immunity to the caster for 1 turn. When the enemy's max Health is greater than the caster's max Health, increases Combat Readiness of the caster proportionally, up to 30%.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.4 (2.0 soulburn)<br>!pow: 1<br>0.49% combat readiness per 1% self health under enemy current health<br>
  - Unparsed formula lines: 0.49% combat readiness per 1% self health under enemy current health
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — Heir to the Throne** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Attacks the enemy with a sword, and grants counterattack and a barrier (proportional to Attack) to the caster for 2 turns. When the enemy is defeated, extends buff durations of the caster by 1 turn and grants an extra turn. When the enemy's max Health is greater than the caster's max Health, damage dealt increases proportionally, up to 70%.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.6<br>!pow: 1<br>Barrier strength: 120% self Attack<br>0.01% increased damage per 1 max health below Target
  - Unparsed formula lines: Barrier strength: 120% self Attack; 0.01% increased damage per 1 max health below Target

### Estelle (c1183)

- [ ] **S1 — S1** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy, inflicting up to 10% injuries and recovering the caster's Health. A successful attack always results in a critical hit. Amount recovered and damage dealt increase proportional to the caster's max Health. When it is not the caster's turn, damage dealt and injuries are doubled. After attacking, when Fighting Spirit is full, consumes all Fighting Spirit to activate Wind of Protection.<br>Wind of Protection (Acquire 10 Soul): Grants a barrier (proportional to the caster's max Health) to all allies for 2 turns, and increases Combat Readiness of the caster by 35%.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.5 (1 if not caster's turn)<br>!pow: 1<br>Health scaling: 8% (16% if not caster's turn) caster's max Health<br>Heal strength: 10% caster's max Health<br><br>Skill1 (Proc)<br>Barrier strength: 20% caster's max Health<br>
  - Unparsed formula lines: att_rate: 0.5 (1 if not caster's turn); Health scaling: 8% (16% if not caster's turn) caster's max Health; Heal strength: 10% caster's max Health; Skill1 (Proc); Barrier strength: 20% caster's max Health

- [ ] **S2 — Protective Nature** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Description: At the start of the first battle, gains 50 Fighting Spirit. Grants 40% damage sharing from the damage received by the ally. After an ally except for the caster is attacked, when the damage suffered is 20% or more of max Health, dispels all debuffs and counterattacks. Cannot be triggered by extra attacks or counterattacks.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Implemented resource passive portions: battle-start grant. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Dazzling Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a shield, inflicting up to 20% injuries, and recovering Health of the caster. Penetrates the target's Defense by 50%. A successful attack always results in a critical hit. Amount recovered and damage dealt increase proportional to the caster's max Health.
  - Resource: fightingSpirit; base gain 50; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.5<br>!pow: 1<br>Health scaling: 14% caster's max Health<br>Heal strength: 20% caster's max Health
  - Unparsed formula lines: Heal strength: 20% caster's max Health
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Eye of the Abyss Fumyr (c5147)

- [ ] **S1 — Elemental Magic** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with elemental magic, with a 40% chance to inflict --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Blue Despair** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Envelops all enemies with the energy of the deep sea, dispelling two buffs beofre decreasing Combat Readiness by 25%. Grants an extra turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Eye of the Abyss** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Pierces the foremost enemy Hero with light, inflicting detain, and when detain is inflicted, grants deterrence to the caster for 2 turns. Grants a barrier (proportional to level) and stealth to the caster for 2 turns.
  - Source multiplier text (requires review): Skill3<br>Barrier strength: 100 per caster level<br>
  - Unparsed formula lines: Barrier strength: 100 per caster level

### Fenris (c1158)

- [ ] **S1 — Magic Arrow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a magic arrow, and increases Speed for 1 turn.
  - Reviewed Earth effects: buff.
  - Resource: fightingSpirit; base gain 25; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.2 (1.9 Soulburn)<br>!pow: 1<br>
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S2 — Unwavering Will** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Description: Starts the first battle with 50 Fighting Spirit. After an ally suffers an extra attack, counterattack, or Dual Attack, gains 50 Fighting Spirit and uses Soaring Arrow. The effect after being attacked can only be activated once every 2 turns.<br>Soaring Arrow: Leaps backward and attacks all enemies, before dispelling two debuffs from all allies. Increases Combat Readiness of the caster by 30%.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Implemented resource passive portions: battle-start grant. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.7<br>!pow: 1<br>

### Frieren (c1172)

- [ ] **S1 — Ordinary Offensive Magic** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with magic, and grants immunity to the caster for 1 turn. When it is the caster's turn, activates Vollzanbel as an extra attack.<br>Vollznabell (gain 1 Soul): Attacks all enemies with flame magic. Damage dealt increases proportional to the amount of the enemy's lost Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1 (1.7 soulburn)<br>!pow: 0.95<br><br><br>Skill1 (Proc)<br>att_rate: 1<br>!pow: 1<br>Lost Health scaling: 0.35% increased damage per 1% target Health missing<br>
  - Unparsed formula lines: Skill1 (Proc); att_rate: 1; !pow: 1; Lost Health scaling: 0.35% increased damage per 1% target Health missing
  - Soulburn (10 souls): Increases damage dealt of Ordinary Offensive Magic.

- [ ] **S2 — The Highest Form of Magic** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of battle, grants 40% resource increase to all allies. During battle, when Soul is 4 or higher, grants Defensive Magic. After being attacked, increases Combat Readiness of all allies by 10%
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Hecate (c1178)

- [ ] **S1 — Reaper's Scythe** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with Sigurd Scythe, before increasing Combat Readiness of the caster by 20%. When used on the caster's turn, activates Final Deliverance as an extra attack. <br>Final Deliverance: Attacks all enemies, before granting stealth to the caster for 1 turn and decreasing skill cooldowns by 2 turns.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.35<br>!pow: 1<br><br><br>Skill1 (Proc)<br>att_rate: 0.25<br>!pow: 1.3<br>
  - Unparsed formula lines: Skill1 (Proc); att_rate: 0.25; !pow: 1.3
  - EE 1: Activates Final Deliverance as an extra attack even when performing a Dual Attack.

- [ ] **S2 — Death's Dominion** — Passive partially implemented or pending
  - Current base support: passive. Passive: cannot revive / grant Immortality aura implemented; attack penetration pending
  - Review/work: Passive: cannot revive / grant Immortality aura implemented; attack penetration pending
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: All Heroes cannot revive and cannot be granted immortality. When attacking, penetrates the target's Defense by 100%, and cannot trigger a critical hit or a heavy blow.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - EE 2: Grants 20% damage reduction when attacked.

- [ ] **S3 — Inescapable Demise** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: After granting increased Attack to the caster for 3 turns, attacks the enemy by releasing the force of the netherworld. When the target is a hero, ignores damage share. Begins the first battle with a full skill cooldown count.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5<br>!pow: 1<br>
  - Soulburn (10 souls): Grants increased Attack (Greater) for 3 turns.
  - EE 3: Increases Combat Readiness of the casters by 50% when using Inescapable Demise.

### Immortal Wukong (c1161)

- [ ] **S1 — Swing** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with Ruyi Bang, and grants a barrier to the caster for 1 turn. Barrier strength increases proportional to the caster's Attack. When used on the caster's turn, attacks all enemies. The changed attack does not trigger a Dual Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.85 (1.55 Soulburn)<br>!pow: 1<br>Barrier strength: 30% caster's Attack<br><br><br>Skill1(AoE)<br>att_rate: 0.85 (1.1 Soulburn)<br>!pow: 1<br>Barrier strength: 30% caster's Attack<br>
  - Unparsed formula lines: Barrier strength: 30% caster's Attack; Skill1(AoE); att_rate: 0.85 (1.1 Soulburn); !pow: 1; Barrier strength: 30% caster's Attack
  - Soulburn (10 souls): Increases damage dealt.
  - EE 1: Swing attacks all enemies, even when counterattacking.

- [ ] **S2 — The Immortal One** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Increases Critical Hit Resistance and Penetration Resistance by 50%. When attacked, if the caster suffers a non-critical hit, increases Attack and Speed by 20%. Can stack up to 3 times.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - EE 2: Increases Critical Hit Resistance and Penetration Resistance increased by The Immortal One by 10%.

- [ ] **S3 — Heavenly Fighter's Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After granting increased Attack to the caster for 2 turns, attacks the enemy and inflicts --stun-- for 1 turn. When the caster's Attack is greater than the target's Attack, damage dealt increases proportionally, up to 70%. Unaffected by elemental disadvantage.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5<br>!pow: 1<br>Damage increase: DIFFERENCE_IN_ATK * 0.000175 (max 70% damage increase)<br>4000 Attack differance for max damage increase
  - Unparsed formula lines: Damage increase: DIFFERENCE_IN_ATK * 0.000175 (max 70% damage increase); 4000 Attack differance for max damage increase

### Iseria (c1024)

- [ ] **S1 — Refined Flower** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Throws swords at the enemy, with a 50% chance to --decrease Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1 (2 soulburn)<br>!pow: 0.95<br>
  - Soulburn (10 souls): Increases effect chance by 50% and increases damage dealt. Does not trigger a Dual Attack.

- [ ] **S3 — Full Bloom** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a giant Magic Sword, dispelling all buffs, before making them --unable to be buffed-- and --decreasing Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 2<br>!pow: 0.9<br>

### Laia (c1159)

- [ ] **S1 — Sing with Me!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a sweet melody, and increases Combat Readiness of the caster by 15%. When The Spirit of Rock is unavailable due to cooldown count, triggers a Dual Attack from a random ally. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.7<br>!pow: 1<br>Max Health scaling 10% (0.10 * self Max Health)<br>
  - EE 1: Triggers a Dual Attack from the ally in the back row isntead of a random ally when using Sing With Me!

- [ ] **S2 — Sweet Cheers** — Non-attack cast supported; remaining effects listed below
  - Current base support: nonAttack. Non-attack cast implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Dispels all debuffs from all allies and increases Combat Readiness by 25%, before decreasing skill cooldowns of all allies except for the caster by 1 turn. 
  - Non-attack source note (no damage formula): No info
  - Unparsed formula lines: No info
  - EE 2: Increases Combat Readiness increase amount by 5% when using Sweet Cheers.

- [ ] **S3 — The Spirit of Rock** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Attacks the enemy with a bass. When the enemy is defeated, recovers Health of the caster and grants an extra turn. Penetrates the target's Defense, and cannot trigger a critical hit. Amount recovered and damage dealt increase proportional to the caster's max Health. Begins the first battle with full skill cooldown count, and when this skill is unavailable due to cooldown count, at the start of every turn, decreases all skill cooldowns by 1 turn.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.3<br>!pow: 1<br>Max Health scaling 20% (0.20 * self Max Health) (32% with Soulburn)<br>Heal strength: 30% caster's max Health
  - Unparsed formula lines: Heal strength: 30% caster's max Health
  - Soulburn (10 souls): Increases damage dealt.

### Landy (c1109)

- [ ] **S1 — Fire** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 3: EE mechanic not implemented
  - Description:  Attacks the enemy with gunfire, and increases Combat Readiness of the caster by 15%. When the target has a buff, doubles the effects of Combat Readiness increase and Fighting Spirit gained.
  - Resource: fightingSpirit; base gain 20; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.2<br>!pow: 1<br>
  - EE 3: With Full Burst's effect, increases Combat Readiness by an additional 5%.

- [ ] **S2 — The Chief Is on the Scene** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: At the start of the first battle, gains 50 Fighting Spirit and grants stealth for 1 turn. At the start of the turn, gains 10 Fighting Spirit for each buff granted to an enemy, and when Fighting Spirit is full, resets skill cooldown. After attacking, increases Attack of the caster by 25%. This effect can stack up to 3 times.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Implemented resource passive portions: battle-start grant. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): Skill2<br>
  - EE 1: At the start of the turn, when Fighting Spirit is full, dispels all debuffs from the caster.

- [ ] **S3 — Full Burst** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Fires at all enemies to attack, and increases Combat Readiness of all allies by 25%, before granting a barrier (proportional to Attack) to the caster for 2 turns. When Fighting Spirit is full, consumes all Fighting Spirit to penetrate the target's Defense by 50%. This skill cannot trigger a counterattack.
  - Reviewed Earth effects: readiness, barrier.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.9<br>!pow: 1<br>Barrier strength: 80% caster's Attack<br>
  - Unparsed formula lines: Barrier strength: 80% caster's Attack
  - Soulburn (20 souls): Grants an extra turn.
  - EE 2: When using Full Burst, if Fighting Spirit is full, penetrates the target's Defense by an additional 10%.

### Lilibet (c1095)

- [ ] **S2 — Snip-Snip** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy mercilessly, with a 100% chance to dispel all buffs. A critical hit will grant an extra turn.
  - Reviewed Earth effects: conditional/passive execution.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.2<br>!pow: 1<br>20% increased damage if target has no buffs<br>
  - Unparsed formula lines: 20% increased damage if target has no buffs
  - Soulburn (10 souls): Ignores Effect Resistance.
  - EE 2: Dispels two debuffs from the caster before the skill effect when using Snip-Snip.

- [ ] **S3 — Soul Cutter** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy by slashing them with Cho & Mal, before granting skill nullifier once to the caster, and when the enemy is defeated, inflicts extinction. Penetrates the target's Defense. Increase Hit Chance of this skill by 20%.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.65<br>!pow: 0.95<br>100% def penetration<br>
  - Unparsed formula lines: 100% def penetration

### Ludwig (c1069)

- [ ] **S2 — Moonlight Blow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy with light, decreasing buff durations by 1 turn before a 100% chance to --stun-- for 1 turn. Grants invincibility to the caster for 1 turn and increases Combat Readiness by 50%.
  - Reviewed Earth effects: buff, readiness.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.65<br>!pow: 1.05<br>
  - Soulburn (20 souls): Ignores Effect Resistance.
  - EE 1: Increases Attack of the caster for 2 turns when using Moonlight Blow.
  - EE 2: --Decreases Defense-- for 2 turns when using Moonlight Blow.

### Midnight Gala Lilias (c5089)

- [ ] **S1 — Go, Kyla!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with Kyla, and recovers Health. Amount recovered increases proportional to the caster's Attack. A successful attack always results in a critical hit.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S2 — Elaborate Scheme** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of battle and at the end of the turn, grants damage limit to the caster for 1 turn. After attacking on the caster's turn, when the target's Health is 50% or less, activates Now or Never!.<br>Now or Never!: Grants increased Attack to all allies except for the caster for 2 turns before increasing Combat Readiness by 20%, and increases Combat Readiness of the caster by 50%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Take the Lead** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After granting increased Attack to the caster for 3 turns, attacks the enemy by exploiting their weakness. When the target is a Hero, ignores damage reduction and damage sharing effect. When the target's max Health is greater than the caster's max Health, penetrates Defense proportionally, up to 100%. A successful attack always results in a critical hit.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Mort (c1104)

- [ ] **S1 — Extermination** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy by piercing them, with a 50% chance to --decrease Defense-- for 2 turns. Ignores Effect Resistance of any targets with Max Health lower than the caster’s Max Health. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>10% self max Health (0.1 * Health)<br>
  - Soulburn (10 souls): Increases effect chance to 100%.
  - EE 1: Increases Extermination's chance to --decrease Defense-- by 10%.

- [ ] **S2 — Absolute Dignity** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Immune to debuffs which prevent movement. All Heroes except for the caster cannot counterattack. When an ally is attacked, has a 20% chance to counterattack, and when counterattacking, activates Sacred Blessing.<br>Sacred Blessing: Grants a barrier (proportional to the caster’s max Health) to all allies for 2 turns, and grants increased Speed to the caster for 2 turns.
  - Source multiplier text (requires review): Skill2<br>Barrier Strength: 12% of Self Max Health<br>
  - Unparsed formula lines: Barrier Strength: 12% of Self Max Health
  - EE 2: Extends buff duration of Sacred Blessing's increased Speed by 1 turn.

- [ ] **S3 — Advent: Mortelix** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Description: Descends and attacks all enemies, inflicting --fear-- for 2 turns, before recovering Health of the caster. Penetrates Defense of the enemy with the highest Max Health by 70%, and ignores Effect Resistance of any targets with Max Health lower than the caster’s Max Health. Damage dealt and amount recovered increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1<br>!pow: 1<br>15% self max Health (0.15 * Health)<br>Heal strength: 30% self max Health
  - Unparsed formula lines: Heal strength: 30% self max Health

### Mui (c1044)

- [ ] **S1 — Lash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a whip, with a 100% chance to inflict --target-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Punishment** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks all enemies by calling upon a trained monster, with a 50% chance each to inflict two --bleeding-- effects for 2 turns and a 80% chance to inflict --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.8<br>!pow: 1<br>
  - Soulburn (20 souls): All skill cooldowns decreased by 2 turns.
  - EE 1: Increases Punishment's effect chance by 10%.

- [ ] **S3 — Grand Finale** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Drives monsters forward to attack all enemies and dispels two buffs. Grants increased Attack to all allies for 3 turns, and increases Combat Readiness of the caster by 30% per critical hit.
  - Reviewed Earth effects: buff, readiness.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 0.95<br>
  - EE 2: Grants enhanced Dual Attack to the ally with the highest Attack after using Grand Finale.
  - EE 3: --Silences-- the enemy with the highest Combat Readiness for 1 turn after using Grand Finale.

### Ocean Breeze Luluca (c5082)

- [ ] **S1 — Order's In, Just Wait!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with overflowing energy, and increases Combat Readiness of the ally with the highest Combat Readiness except the caster by 15%
  - Reviewed Earth effects: readiness.
  - Resource: focus; base gain 1; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Combat Readiness increase effect will be applied to all allies.
  - EE 1: Increases Combat Readiness by an additional 5% when using Order's In, Just Wait!

- [ ] **S2 — One Luluca's Special!** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed condition watcher implemented; Full-Focus Special Delivery additional attack pending
  - Review/work: Passive: reviewed condition watcher implemented; Full-Focus Special Delivery additional attack pending
  - Review/work: Full-Focus Special Delivery additional attack
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: After an enemy uses a non-attack skill, gains 2 Focus and increases Combat Readiness of the caster by 25%. Can only be activated once every 2 turns. After using a skill, when Focus is full, consumes all Focus and activates Luluca's Special Delivery.<br>Luluca's Special Delivery: Attacks all enemies who are interrupting her delivery, dispelling two buffs and an 85% chance to inflict --silence-- for 1 turn and a 100% chance to --decrease Hit Chance-- for 2 turns, before decreasing skill cooldowns of the caster by 1 turn.
  - Implemented watchers: ocean-luluca-enemy-non-attack.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2 (Proc)<br>att_rate: 1<br>!pow: 1<br>
  - Unparsed formula lines: Skill2 (Proc)
  - EE 2: Increasees Combat Readiness of the caster by an additional 15% after an enemy uses a non-attack skill.

### Pavel (c1080)

- [ ] **S2 — Storm Bullet** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Grants the caster increased Attack for 2 turns, before firing a strong blast of wind at all enemies. Damage dealt increases proportional to the caster's Speed. This skill cannot trigger a counterattack.
  - Reviewed Earth effects: buff.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.8<br>!pow: 1<br>0.1125% self Speed (0.001125 * Speed)<br>
  - Soulburn (20 souls): Grants an extra turn.
  - EE 1: Dispels two debuffs from the caster before the skill effect when using Storm Bullet.
  - EE 2: Additionally grants increased Attack to the ally except for the caster with the highest Attack for 2 turns after using Storm Bullet.

- [ ] **S3 — Destructive Pursuit** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Swiftly cuts and shoots the enemy. When the target is not an Elite or Boss monster, ignores damage share. Damage dealt increases proportional to the caster's Speed.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.3<br>!pow: 1<br>0.15% self Speed (0.0015 * Speed)<br>
  - EE 3: Grants skill nullifier to the caster once after using Destructive Pursuit.

### Ram (c1115)

- [ ] **S1 — How Boring.** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with wind, with a 75% chance to --decrease Attack-- for 1 turn. When the caster is buffed, effect chance increases by 25%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Attacks all enemies. This attack does not trigger a Dual Attack.

### Ray (c1090)

- [ ] **S1 — Extreme Remedies** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks by throwing a bottle, dispelling one debuff from an ally.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - EE 1: When using Extreme Remedies on the caster's turn, if all allies are Earth elemental Heroes, decreases cooldown of Invigorate by 1 turn.

- [ ] **S2 — Light of Rebirth** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Radiates light upon all allies, recovering Health and granting a barrier for 2 turns. Amount recovered and barrier strength increase proportional to the ally's max Health.
  - Source multiplier text (requires review): Skill2<br>Barrier strength: 10-15% Target Max Health<br>
  - Unparsed formula lines: Barrier strength: 10-15% Target Max Health
  - EE 2: Increases Light of Rebirth's amount recovered by 15%.

- [ ] **S3 — Invigorate** — Non-attack cast supported; remaining effects listed below
  - Current base support: nonAttack. Non-attack cast implemented
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: By infusing vitality, dispels all debuffs from all allies and grants immunity for 2 turns before recovering Health proportional to the target’s max Health.
  - Non-attack source note (no damage formula): Skill3<br>Heal strength: 15% Target Max Health, 25% soulburn<br>
  - Unparsed formula lines: Heal strength: 15% Target Max Health, 25% soulburn
  - Soulburn (10 souls): Increases the amount recovered.
  - EE 3: Increases Defense of the caster for 2 turns when using Invigorate.

### Rimuru (c1121)

- [ ] **S1 — Okay, Shall I Get Started?** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Cuts the enemy to attack, granting a random buff to the caster for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.1<br>!pow: 1<br>

- [ ] **S2 — Analyze and Assess** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: After attacking with a non-basic skill, copies two buffs when the target has a buff, regardless of whether the attack hits, and grants their effects to all allies. This effect is not applied to undispellable buffs. When an ally is attacked by an enemy who has a buff, activates Be Ready! against the attacker.<br>Be Ready!: Quickly approaches the enemy and attacks, increasing Combat Readiness of the caster by 30%.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.65<br>!pow: 1<br>the mola bonus is a multiplicative buff, doesnt add to pow, shouldnt change calc at all tho<br>
  - Unparsed formula lines: the mola bonus is a multiplicative buff, doesnt add to pow, shouldnt change calc at all tho

- [ ] **S3 — Devour It, Black Flame!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with black flame, and a successful attack will inflict 5,000 additional damage. Additional damage increases proportional to the number of buffs granted to all allies, up to 10,000. When the target has a buff, inflicts --decreased Defense-- on all enemies for 2 turns. Unaffected by elemental disadvantage.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.8<br>!pow: 1<br>Flat damage = 5000 + 625 per ally buff, max 10000<br>if you are bad at math, that means 8 buffs for 10k
  - Unparsed formula lines: Flat damage = 5000 + 625 per ally buff, max 10000; if you are bad at math, that means 8 buffs for 10k
  - Soulburn (10 souls): Cooldown of this skill is decreased by 2 turns.

### Rinak (c1168)

- [ ] **S1 — Vital Point Slash** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Description: Attacks the enemy with a dagger. Penetrates the target's Defense, and cannot trigger a critical hit. Damage dealt increases proportional to the caster's Speed.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.25<br>!pow: 1<br>0.15% self Speed (0.0015 * Speed)<br>

- [ ] **S2 — Pickpocketing** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Swiftly attacks the enemy, dispelling all buffs before decreasing Combat Readiness by 40% and inflicting --pilfer--. Grants increased Attack to the caster for 2 turns and an extra turn.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.7<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

- [ ] **S3 — Clumsy Finish** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Unmapped/conditional debuff grants
  - Description: Nimbly attacks the enemy. Penetrates the target's Defense, and cannot trigger a critical hit. Damage dealt increases proportional to the caster's Speed. After attacking, activates a security sensor by a mistake, dispelling all buffs from the caster and inflicting --stun-- for 1 turn, and deals 7000 fixed damage to all enemies. Ignores Effect Resistance.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.32<br>!pow: 1<br>0.3% self Speed (0.003 * Speed)<br>

### Roana (c1102)

- [ ] **S1 — Soul Purification** — Base damage supported; secondary effects pending
  - Current base support: supported. Reviewed e7calc damage formula
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a noble power, and grants a barrier (proportional to the caster’s max Health) to the ally with the lowest Health for 2 turns.
  - Reviewed Earth effects: barrier.
  - Reviewed damage source: [e7calc](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts), revision 39070976ce3cd0435cbcf5d430f2711cf0ef0005.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>Barrier strength: 10-12.5% self Max Health<br>
  - Soulburn (20 souls): Grants a barrier to all allies for 2 turns after attacking.

### Saria (c1177)

- [ ] **S1 — Spirit Burst** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks two enemies with a burst and has a 75% chance to dispel one buff.
  - Resource: focus; base gain 1; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100% and ignores Effect Resistance.

- [ ] **S2 — Guidance of Nature** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: At the start of an ally's extra turn, gains 2 Focus and increases Combat Readiness of the caster by 30%. After using a skill, when Focus is full, activates Wings of Liberation.<br>Wings of Liberation(consumes 5 Focus): Attacks all enemies by unleashing a spirit bird. Increases Hit Chance by 50% when using this skill, and is unaffected by elemental disadvantage.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2(Proc)<br>att_rate: 1.4<br>!pow: 0.9<br>
  - Unparsed formula lines: Skill2(Proc)
  - EE 1: Increases Combat Readiness increase effect of Guidance of Nature by an additional 10%.

- [ ] **S3 — Blossoming Hope** — Non-attack cast supported; remaining effects listed below
  - Current base support: nonAttack. Non-attack cast implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: By kindling the light of hope, grants invincibility to all allies for 1 turn and increased Attack for 2 turns.
  - Resource: focus; base gain 3; required/spent 0.
  - Non-attack source note (no damage formula): No info
  - Unparsed formula lines: No info
  - EE 3: When using Blossoming Hope, the duration of increased Attack in increased to 3 turns.

### Schniel (c1060)

- [ ] **S2 — I Know a Thing About Poison** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of the turn, dispels one debuff each from two allies. After an enemy uses a skill, when an ally is inflicted with --poison-- or --venom--, dispels all debuffs from the caster and activates Cleanse.<br>Cleanse: Dispels all debuffs from all allies and grants immunity and indomitable for 1 turn, before resetting skill cooldowns of the caster.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — You May Walk Yourself Out** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies, before granting increased Defense and a barrier (proportional to the caster's max Health) to all allies for 2 turns. Deals 5,000 additional damage regardless of whether the attack hits. When the caster is granted indomitable, greatly increases additional damage.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1<br>!pow: 1.1<br>Barrier strength: 15% (19% soulburn) caster's max Health<br>Fixed Damage: 5000 or 15000 with Indomitable
  - Unparsed formula lines: Barrier strength: 15% (19% soulburn) caster's max Health; Fixed Damage: 5000 or 15000 with Indomitable
  - Soulburn (10 souls): Increase barrier strength.

### Senya (c1106)

- [ ] **S1 — Spear of Vengeance** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a spear, with a 75% chance to --provoke-- for 1 turn. When it is not the caster's turn, effect chance increases by 25%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.95<br>!pow: 1<br>
  - EE 1: Recovers Health of the caster after using Spear of Vengeance. Amount recovered increases proportional to the caster's Attack.

- [ ] **S2 — Indomitable Spirit** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed stats; pending: Non-critical-hit retaliation and Grace of the Battlefield
  - Review/work: Passive: reviewed stats; pending: Non-critical-hit retaliation and Grace of the Battlefield
  - Review/work: Non-critical-hit retaliation and Grace of the Battlefield
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Increases Attack by 30% and Critical Hit Resistance by 50%. When attacking, cannot trigger a critical hit or a heavy blow. When attacked, if the caster suffers a non-critical hit, inflicts damage on the attacker proportional to the caster's Attack, before activating Grace of the Battlefield.<br>Grace of the Battlefield: Grants a barrier (proportional to the caster’s Attack) to all allies for 2 turns, and grants increased Speed of the caster for 2 turns.
  - Reviewed Earth effects: conditional/passive execution.
  - Source multiplier text (requires review): Skill2<br>Barrier Strength: 25% of Self Attack<br>
  - Unparsed formula lines: Barrier Strength: 25% of Self Attack
  - EE 2: Increases Grace of the Battlefield's barrier strength by 20%.

- [ ] **S3 — Dragon Slayer's Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies by striking downwards with a spear and has a 100% chance to --decrease Hit Chance-- for 2 turns and a 85% chance to --provoke-- for 1 turn. Adopts a counterattacking stance for 3 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5<br>!pow: 1.1<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.
  - EE 3: Grants increased Attack (Greater) to the caster for 3 turns after using Dragon Slayer's Strike. (This effect is applied before adopting a counterattack stance)

### Sharun (c1132)

- [ ] **S1 — How Fragile** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy, with a 100% chance to inflict --venom-- for 1 turn. After attacking, when the target is inflicted with venom, increases skill cooldowns by 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Ignores Effect Resistance.

- [ ] **S2 — Just Trust Me** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: At the end of an enemy's turn, for each buff granted to the enemy, has a 5% chance to increase Combat Readiness of the caster by 25%. At the end of the turn, grants a a barrier (proportional to the caster's max Health) to the ally with the highest Attack except for the caster for 2 turns and increases Combat Readiness by 25%.
  - Source multiplier text (requires review): Skill2<br>Barrier Strength: 10% of Self Max HP<br>
  - Unparsed formula lines: Barrier Strength: 10% of Self Max HP
  - EE 1: With Just Trust Me's effect, increases Combat Readiness of the caster by an additional 5%.
  - EE 2: Increases Just Trust Me's barrier strength by 15%.

- [ ] **S3 — May You Perish** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies, decreasing buff durations by 2 turn before inflicting --decreased Speed-- and two --venom-- effects for 2 turns. Increases Combat Readiness of the caster by 50%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>

### Vildred (c1007)

- [ ] **S2 — Dancing Blade** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: After an ally attacks, when the enemy's Health is 50% or less, grants increased Attack to the caster for 2 turns, and activates Dancing Blade.<br>Dancing Blade: Attacks all enemies with a sword blast, and increases Combat Readiness of the caster by 20%. Damage dealt increases proportional to the caster’s Speed.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.5<br>!pow: 1<br>0.1125% self Speed (0.001125 * Speed)<br>
  - EE 1: Increases Combat Readiness of the caster by an additional 5% when using Dancing Blade.

- [ ] **S3 — Blade Ascent** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies with a swordstorm, dealing damage proportional to the caster's Speed.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.85 (1.1 soulburn)<br>!pow: 1<br>0.1125% self Speed  (0.001125 * Speed)<br>
  - Soulburn (10 souls): Increases damage dealt.
  - EE 2: Resets skill cooldown when defeating an enemy with Blade Ascent.
  - EE 3: Grants increased Critical Hit Damage to the caster for 2 turns before the skill effect when using Blade Ascent.

### Violet (c1074)

- [ ] **S1 — Graceful Cut** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks with a sword, with a 75% chance to --decrease Attack-- for 1 turn. When it is not the caster's turn, increases Combat Readiness by 15% and gains double the amount of Focus.
  - Resource: focus; base gain 1; required/spent 0; out-of-turn gain ×2.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.9<br>
  - Soulburn (10 souls): Increases effect chance to 100% and --decreases Attack-- of the target for 2 turns.

### Vivian (c1088)

- [ ] **S1 — Vitality Drain** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Smashes the enemy with a rock, increasing the caster's Combat Readiness by 15%. A critical hit will increase the caster's Combat Readiness by an additional 10%.
  - Reviewed Earth effects: readiness.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.2<br>!pow: 1<br>
  - EE 1: A critical hit with Vitality Drain will increase the caster's Combat Readiness by an additional 5%.

- [ ] **S2 — Thunder God's Cry** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with a thunderstorm. When an enemy is defeated, activates Thunder God's Cry once more. Each subsequent Thunder God's Cry activated this way deals decreased damage, and can be activated up to 3 times.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.05(1.3 soulburn)<br>!pow: 0.9<br>first trigger on kill is 0.55 att_rate, second trigger is 0.3 att_rate<br>these get mola bonus too, but NOT soulburn
  - Unparsed formula lines: first trigger on kill is 0.55 att_rate, second trigger is 0.3 att_rate; these get mola bonus too, but NOT soulburn
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — Mana Amplification** — Non-attack cast supported; remaining effects listed below
  - Current base support: nonAttack. Non-attack cast implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Fully amplifies mana, granting immunity to all allies for 3 turns before granting increased Attack (Greater) to the caster for 3 turns while increasing Attack of all allies except for the caster for 3 turns.
  - Non-attack source note (no damage formula): Skill3<br>
  - EE 2: Increases the caster's Combat Readiness by 50% when using Mana Amplification.
  - EE 3: Dispels one debuff from all allies before the skill effect when using Mana Amplification.

### Young Senya (c1162)

- [ ] **S1 — Oopsie!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Accidentally spills bread to attack the enemy, and triggers a Dual Attack from a random ally, and increases Combat Readiness of the caster by 15%.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Combat Readiness increase effect will be applied to all allies.

- [ ] **S2 — No Bullying!** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: At the start of the first battle, gains 40 Fighting Spirit, and when the foremost ally except for the caster is an Earth elemental Hero, gains 40 additional Fighting Spirit, before granting Special Friendship to the target. After being attacked, gains 20 Fighting Spirit and when Fighting Spirit is full, consumes all to dispel all debuffs from the caster before activating Help!<br>Help!: Attacks all enemies, and grants an extra turn to the caster. A successful attack deals additional damage equivalent to 15% of max Health of the caster and the foremost ally except for the caster.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2(Proc)<br>att_rate: 1<br>!pow: 1<br>HP Scaling: 15% self and ally<br>
  - Unparsed formula lines: Skill2(Proc); HP Scaling: 15% self and ally
  - EE 1: Additional damage from Special Friendship is dealt regardless of the bearer's turn.
  - EE 2: When using Help!, additional damage increases to 20% of max Health.

- [ ] **S3 — Snack Time!** — Non-attack cast supported; remaining effects listed below
  - Current base support: nonAttack. Non-attack cast implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Stops fighting and takes a break, dispelling all debuffs from all allies and granting continuous healing for 2 turns before increasing Combat Readiness by 20%.
  - Resource: fightingSpirit; base gain 20; required/spent 0.
  - Non-attack source note (no damage formula): Skill3<br>Special Friendship: 8% of the attacker's max Health as additional damage on critical hit<br>
  - Unparsed formula lines: Special Friendship: 8% of the attacker's max Health as additional damage on critical hit
  - EE 3: When using Snack Time!, grants a barrier (proportional to the caster's max Health) to all allies for 2 turns.

### Yufine (c1016)

- [ ] **S1 — Double Slash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks by swinging their weapon, with a 50% chance to --decrease Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - EE 1: Has 35% chance to extend the caster's buff durations by 1 turn when using Double Slash.

- [ ] **S2 — Dragon's Roar** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies with a dragon howl, dispelling one buff, before a 70% chance to --decrease Defense-- for 2 turns and a 85% chance to --silence-- for 1 turn.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.9<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.
  - EE 3: Increases Dragon's Roar's chance to --silence-- by 15%.

### Yulha (c1131)

- [ ] **S2 — Malicious Smile** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: When attacked, reflects 40% of the damage suffered to the attacker. Reflected damage cannot be higher than the caster's max Health. After being attacked, when Health is 30% or less, dispels all debuffs from the caster and activates Murderous Intent. The effect after being attacked can only be activated once every 5 turns.<br>Murderous Intent: Grants a barrier (proportional to max Health) to the caster for 3 turns and increases Combat Readiness by 25%.
  - Source multiplier text (requires review): Skill2<br>Barrier Strength: 35% of Self Max HP<br>
  - Unparsed formula lines: Barrier Strength: 35% of Self Max HP
  - EE 1: With Murderous Intent's effect, increases Combat Readiness by an additional 10%.
  - EE 2: With Malicious Smile's effect, increases damage reflected by 20%.

- [ ] **S3 — Symphony of Agony** — Base damage supported; secondary effects pending
  - Current base support: supported. Reviewed e7calc damage formula
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy by unraveling Sphere of Sadism, and when the enemy is defeated, recovers Health of the caster proportional to max Health. When the target is not an Elite or Boss monster, ignores damage share. Penetrates the target's Defense, but cannot trigger a critical hit or a heavy blow. Damage dealt increases proportional to the caster's lost Health.
  - Reviewed Earth effects: heal.
  - Reviewed damage source: [e7calc](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts), revision 39070976ce3cd0435cbcf5d430f2711cf0ef0005.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.5<br>!pow: 1<br>0.31 (0.41 with soulburn) flat per 1 hp missing<br>Heal strength: 40% Self Max HP
  - Soulburn (10 souls): Increases damage dealt.
  - EE 3: Resets skill cooldown when defeating an enemy with Symphony of Agony.

### Zahhak (c1119)

- [ ] **S1 — Vulnerability Exposed** — Base damage supported; secondary effects pending
  - Current base support: supported. Reviewed e7calc damage formula
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a longsword. Increases Hit Chance and Critical Hit Chance of this skill by 50%. When the target has a buff, increases damage dealt.
  - Reviewed damage source: [e7calc](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts), revision 39070976ce3cd0435cbcf5d430f2711cf0ef0005.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.1(1.8 soulburn)<br>!pow: 1<br>30% increased damage if target is buffed<br>
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — Execute** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy, inflicting up to 35% injuries, before granting invincibility to the caster for 1 turn. Increases Critical Hit Chance and Hit Chance of this skill by 50%.
  - Reviewed Earth effects: buff.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.9<br>!pow: 1<br>
  - EE 2: Inflicts resource reduction on the target by 60% before the skill's effect when using Execute.
