# Unsupported and partially supported skills — review checklist

Generated from the bundled CeciliaBot snapshot (2026-10-22T22:41:17.340Z) and current normalization rules.
Scope: **391 heroes**, **1173 skills**.
Contains **1104 skill entries** across **391 heroes**.

Regenerate with `npm run report:skills`. This is an implementation/review queue, not a list of questions you must answer. Checked-off notes should be recorded in the relevant mechanics document or rules before regeneration, which replaces this file.

## Source research queue (not questions for the user)

- [ ] Laceration: verify whether additional damage causes its injury; DoT coverage is deferred (user believes DoTs do not trigger it). HP-cap clamping is confirmed NOT to cause injury.
- [ ] Resolve Researcher Carrot S1's conflicting description/reference before enabling its remaining effects.
- [ ] Verify Magic Nail/Rupture coefficients and defense interactions, and Omen's actual trigger.
- [ ] Confirm simultaneous reaction ordering, equal-strength protection-source selection, and AoE/death-passive ordering for affected skills.

See [remaining mechanics](remaining-mechanics.md), [health rules](health-mechanics.md), and [trigger rules](triggers-and-revival.md) for context. Already confirmed injury/Collapse, Venom scaling, damage-limit/share ordering and buff sorting rules are not reopened here.

Ordinary target selection, caster exclusions, buff recipients, durations and explicit trigger conditions are taken from CeciliaBot descriptions. They do not require user clarification. Damage/healing coefficients are checked against e7calc. Ask the user only if source research leaves a genuine contradiction or undocumented interaction unresolved. See [review policy](review-policy.md).

## How to read the skill queue

- An unsupported damage formula or missing target count usually needs implementation/source verification, not user clarification.
- Entries labelled **Base damage supported; secondary effects pending** remain only for the listed remaining mechanics. Their coefficient text is included as a reference, not an unsupported-formula warning.
- Supported base damage does not certify all secondary effects. Buff audit prompts flag references for review; some grants may already work. The report cannot prove complete semantic coverage from prose.
- Passive support reasons describe implemented portions and remaining gaps. A passive entry does not mean all its mechanics are missing.
- Soulburn, tags and manual status controls do not imply automatic skill execution. Conditional/form-specific reactions still require reviewed handlers.
- Entries without a detected gap are omitted, but are not thereby certified fully supported. This inventory is based on explicit support flags plus targeted audit prompts, not exhaustive prose interpretation.
- Descriptions below use awakened, maximum-enhancement display values. EE options are listed independently of which option a player equips.

## Skills

### Abigail (c1144)

- [ ] **S1 — Ambush** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Root attack classification corrected; the conditional Might effect remains pending.
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with bloodied wings, and increases Combat Readiness of the caster by 15%. When used on the caster's turn, has a 35% chance to activate Might as an extra effect. Damage dealt increases proportional to the caster's max Health.<br>Might: Increases Combat Readiness of all allies by 15%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.8<br>!pow: 0.9<br>Max Health scaling 12% (0.12 * self Max Health)<br>
  - Soulburn (10 souls): Increase chance to activate Might to 100%.

- [ ] **S2 — Blood Banquet** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: At the start of the turn, --curses-- the enemy with the highest Attack for 1 turn. When the ally in the back row except for the caster receives lethal damage, consumes 30% of the caster's current Health, dispelling all debuffs from the target, before granting immortality and vampirism for 1 turn. Can only be activated once every 4 turns.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Scarlet Garden** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: After dispelling all buffs from the enemy, attacks with a field of bloody thorns, inflicting injuries. Increases Effectiveness of this attack by 50% and damage dealt increases proportional to the caster's max Health. The severity of injuries increases proportional to damage dealt. Injuries decrease max Health of the target by up to 25% every time this skill is used.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.2<br>!pow: 0.95<br>Max Health scaling 20% (0.20 * self Max Health)<br>
  - EE 2: --Decreases Defense-- of the enemy for 2 turns when using Scarlet Garden.

### Abyssal Yufine (c2016)

- [ ] **S1 — Dragon's Breath** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with a dragon's breath, with a 60% chance to inflict --decreased Attack-- for 1 turn. Damage dealt increases proportional to the caster's Defense. When the caster is inflicted with --trauma--, activates Unbridled Outburst instead of Dragon's Breath.<br>Unbridled Outburst: Attacks the enemy with a massive blade. Penetrates the target's Defense.
  - Resource: fightingSpirit; base gain 20; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7<br>!pow: 1<br>90% self Defense (0.9 * Defense) <br><br><br>Skill1(Soulburn)<br>att_rate: 0.9<br>!pow: 1<br>110% self Defense (1.1 * Defense) <br><br><br>Skill1(Proc)<br>att_rate: 0.8<br>!pow: 1<br>Penetration: 70%<br><br><br>Skill1(Proc Soulburn)<br>att_rate: 1.25<br>!pow: 1<br>Penetration: 70%<br>
  - Unparsed formula lines: Skill1(Soulburn); att_rate: 0.9; !pow: 1; 110% self Defense (1.1 * Defense) ; Skill1(Proc); att_rate: 0.8; !pow: 1; Penetration: 70%; Skill1(Proc Soulburn); att_rate: 1.25; !pow: 1; Penetration: 70%
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S2 — Inner Abyss** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When the enemy is not an Elite or Boss monster, reduces the effect of Combat Readiness increases granted to the enemy by 50%. When attacked, gains 20 Fighting Spirit and has a 30% chance to counterattack. At the start of the turn, when Fighting Spirit is full, dispels all debuffs from the caster.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Frenzied Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Inflicts --trauma-- on the caster for 3 turns, before attacking all enemies, dispelling all buffs and decreasing Combat Readiness by 50%. Ignores Effect Resistance.
  - Resource: fightingSpirit; base gain 0; required/spent 100.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.1<br>!pow: 1<br>

### Achates (c1017)

- [ ] **S1 — Magic Design** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a staff, with a 50% chance to inflict --decreased Attack-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.95<br>
  - EE 1: Increases Magic Design's chance to --decrease Attack-- by 25%.

- [ ] **S2 — Rapid Cure** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Recovers Health of an ally proportional to the caster’s max Health and grants invincibility for 1 turn before decreasing skill cooldowns by 1 turn.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 15% self max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 15% self max Health
  - EE 2: Inreases Rapid Cure's amount recovered by 67%.

- [ ] **S3 — Curing Prayer** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: With the power of healing, dispels one debuff from all allies before recovering Health proportional to the caster’s max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 30% self max Health (50% soulburn)<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 30% self max Health (50% soulburn)
  - Soulburn (10 souls): Increases the amount recovered.
  - EE 3: Increases Effect Resistance of the caster for 2 turns when using Curing Prayer.

### Adin (c3143)

- [ ] **S2 — Blade Gust** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies with a blade gust, with an 80% chance to make them --unable to be buffed-- for 2 turns. When there are three or fewer enemies, damage dealt increases with fewer enemies. 
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.8<br>!pow: 1<br>20% more dmg vs 3 targets, 40% more dmg vs 2 targets, 60% more dmg vs 1 target<br>
  - Unparsed formula lines: 20% more dmg vs 3 targets, 40% more dmg vs 2 targets, 60% more dmg vs 1 target

- [ ] **S3 — Lightning Bolt** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy repeatedly, granting increased Attack and Weakness Shared to the caster for 2 turns. A critical hit has a 100% chance to --decrease Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.8<br>!pow: 1.05<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Adlay (c3043)

- [ ] **S1 — Mana Release** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with the power of a magical tome, with a 35% chance to --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Heroism** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Combat Readiness increases by 12% every time an ally except for the caster is attacked, and the caster's skill cooldown is reset when an ally dies.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Mana Seal** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Deals huge damage to all enemies with a sealing spell, with a 85% chance to dispel one buff, before a 85% chance to increase skill cooldowns by 1 turn.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Ignores Effect Resistance.

### Adventurer Ras (c5001)

- [ ] **S2 — Command Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy repeatedly, before triggering a Dual Attack from the ally with the highest Attack.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.5<br>!pow: 1<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

- [ ] **S3 — Purifying Flame** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Strongly attacks all enemies with a swordstorm, before recovering Health of the caster, and increases Defense of all allies for 2 turns. Amount recovered and damage dealt increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.9<br>!pow: 1<br>12% self max Health (0.12 * Health)<br>Heal strength: 30% self max Health
  - Unparsed formula lines: Heal strength: 30% self max Health

### ae-GISELLE (c1138)

- [ ] **S1 — Surging Light** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy, and increases Combat Readiness of the ally with the highest Attack except for the caster by 15%. Damage dealt increases proportional to the target's current Health ratio.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1 (1.7 Soulburn)<br>!pow: 1<br>0.2% increased damage per 1% target current Health (Same for Soulburn)<br>
  - Unparsed formula lines: 0.2% increased damage per 1% target current Health (Same for Soulburn)
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S2 — Linguistic Wisdom** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Amplifies the effect of Combat Readiness increases the caster receives by 50%. At the start of the turn, has a 100% chance to dispel one debuff.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Frame of Light** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Attacks the enemy with light, before increasing Attack of the caster and the ally with the highest Attack except for the caster for 2 turns. When the enemy is not an Elite or Boss monster, damage sharing effects are ignored. When the enemy is defeated, grants an extra turn to the caster.
  - Supported damage formula (reference only): Skill3<br>att_rate: 2<br>!pow: 1<br>

### ae-KARINA (c1137)

- [ ] **S1 — Exposed!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy by punching them, with a 75% chance to --decrease Defense-- for 1 turn. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.5<br>!pow: 1<br>100% self Defense (1.00 * Defense)<br>
  - Soulburn (10 souls): Increase effect chance to 100% and --decrease Defense-- of the target for 2 turns.

- [ ] **S2 — Rocket Punch** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When Health of an ally except for the caster is 50% or less after being attacked, increases Combat Readiness of the caster by 50% and activates Leave It To Me!. Can only be activated once every 3 turns.<br>Leave It To Me!: Increases Defense of the caster for 2 turns, and grants a barrier to all allies for 2turns. Barrier strength increases proportional to the caster's Defense.
  - Source multiplier text (requires review): Skill2<br>Barrier strength: 70% self caster def<br>
  - Unparsed formula lines: Barrier strength: 70% self caster def

- [ ] **S3 — I'll Blow You Away!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy by slamming them with a fist, --decreasing Defense-- for 2 turns, before increasing Speed of the caster for 2turns. A successful attack will deal additional damage proportional to the caster's Defense to all enemies. Damage dealt increases proportional to the caster's Defense.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.5<br>!pow: 1<br>50% self Defense (0.50 * Defense)<br><br><br>Skill3 Explosion<br>140% self Defense (1.40 * Defense)<br>
  - Unparsed formula lines: Skill3 Explosion; 140% self Defense (1.40 * Defense)

### ae-NINGNING (c1140)

- [ ] **S1 — SSAMBEAR** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with SSAMBEAR, with a 40% chance to --stun-- for 1 turn. After attacking, when the target is --stunned--, increases Combat Readiness of the caster by 20%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Butterfly Effect** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy, decreasing Combat Readiness by 30%. Increases Attack of the ally with the highest Attack except for the caster for 2 turns and increases Combat Readiness by 30%.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.5<br>!pow: 1<br>

- [ ] **S3 — System Hacking** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Hacks all enemies, inflicting barrier inversion and dispelling two buffs, before increasing Combat Readiness of the caster by 50%. When the target is granted a barrier, Combat Readiness increase amount is doubled.
  - Source multiplier text (requires review): Skill3<br>Shield inversion<br>
  - Unparsed formula lines: Shield inversion

### ae-WINTER (c1139)

- [ ] **S1 — Rapid Cut** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a sword and has a 40% chance to --stun-- for 1 turn. 
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increase effect chance to 100%.

- [ ] **S2 — Next Level** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of the battle and at the end of the turn, grants stealth for 1 turn. After an enemy uses a non-attack skill, dispels all debuffs from the caster and activates Level Up. The debuff dispelling effect and Level Up can only be activated once every 2 turns.<br>Level Up: Grants Immunity to the caster for 2 turns and fully resets skill cooldown of Black Out.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Black Out** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attack the enemy with various weapons and --stuns-- for 2 turns, and increase Combat Readiness of the caster by 50%. A critical hit will deal an additional 5000 fixed damage. Increase fixed damage by 5000 every time this skill is used, stacking up to 3 times.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.8<br>!pow: 0.95<br>

### Afternoon Soak Flan (c5110)

- [ ] **S1 — Do Not Disturb** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a gun, with a 40% chance to stun for 1 turn. A successful attack always results in a critical hit. When used on the caster's turn, uses It's a Whopper! instead of Do Not Disturb.<br>It's a Whopper!: Attacks all enemies, and gains 1 Focus. A successful attack always results in a critical hit. This skill does not trigger a Dual Attack or counterattack.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1.1<br>!pow: 1<br><br><br>Skill1(AoE)<br>att_rate: 0.7<br>!pow: 1<br>
  - Unparsed formula lines: Skill1(AoE); att_rate: 0.7; !pow: 1

- [ ] **S2 — I’m Still On Vacation!** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Description: At the start of the first battle, gains 3 Focus. Increases Evasion by 50%, and when Focus is 1 or higher, increases Evasion by an additional 50%. After an ally uses a basic skill, consumes 1 Focus, triggering a Dual Attack, and increases Combat Readiness of the caster by 25%.
  - Resource: focus; base gain 0; required/spent 0.
  - Implemented resource passive portions: battle-start grant. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — In the Palm of My Hand** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy, --decreasing Defense-- for 2 turns, and increases Combat Readiness of all allies by 20%. A successful attack always results in a critical hit.
  - Resource: focus; base gain 0; required/spent 0.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5<br>!pow: 1<br>
  - Soulburn (10 souls): Ignores Effect Resistance.

### Ainos (c3105)

- [ ] **S1 — Silent Fire** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Silently shoots the enemy, with a 75% chance to --decrease Defense-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100% and --decreases Defense-- of the target for 2 turns.

- [ ] **S2 — Maneuver Support** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the end of the turn, increases Combat Readiness of the ally except for the caster with the highest Attack by 20% and dispels one debuff from an ally.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Firepower Cube** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Throws an firepower cube to attack all enemies, before healing all allies and granting increased Attack and Speed for 2 turns. Amount recovered increases proportional to the target's max Health. 
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.9<br>!pow: 1<br>Heal Strength: 14% Target Max Health (0.14 * Max Health)<br>
  - Unparsed formula lines: Heal Strength: 14% Target Max Health (0.14 * Max Health)

### Ainos 2.0 (c4105)

- [ ] **S1 — Silent Fire** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Silently shoots the enemy, with a 75% chance to --decrease Defense-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100% and --decreases Defense-- of the target for 2 turns.

- [ ] **S2 — Maneuver Support** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the end of the turn, increases Combat Readiness of the ally except for the caster with the highest Attack by 20% and dispels one debuff from an ally.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Enhanced Firepower Cube** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Throws an enhanced firepower cube before exploding it to attack all enemies. Recovers Health of all allies and increases Attack and Speed for 2 turns. Amount recovered increases proportional to the target's max Health. This skill cannot trigger a counterattack.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.9<br>!pow: 1<br>Heal Strength: 14% Target Max Health (0.14 * Max Health)<br>
  - Unparsed formula lines: Heal Strength: 14% Target Max Health (0.14 * Max Health)

### Ains (c3093)

- [ ] **S1 — Gazelle Punch** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Punches the enemy, with a 50% chance to use Satisfying Strike instead of Gazelle Strike. Satisfying Strike: Attacks the enemy, a successful hit always results in a critical hit.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7 (1.0 on Satisfying Strike)<br>!pow: 1<br>
  - Unparsed formula lines: att_rate: 0.7 (1.0 on Satisfying Strike)

- [ ] **S2 — Gash** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When attacked, has a 50% chance to counterattack.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Ram** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Punches the enemy, with a 100% chance to --stun-- for 2 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5 (1.8 soulburn)<br>!pow: 1<br>
  - Soulburn (10 souls): Increases damage dealt.

### Ainz Ooal Gown (c1155)

- [ ] **S1 — Lightning of Judgment** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with lightning, with a 25% chance to --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.7<br>!pow: 0.95<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Overlord of Death** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases damage suffered from Light elemental enemies by 30%. When an ally is attacked, has a 35% chance to activate Mana Barrier. Mana Barrier can only be activated once every 3 turns.<br>Mana Barrier: Grants a barrier to all allies for 2 turns, and the caster adopts a counterattacking stance for 2 turns. Barrier strength increases proportional to the caster’s max Health.
  - Source multiplier text (requires review): Skill2<br>Barrier strength: 20% caster's max Health<br>
  - Unparsed formula lines: Barrier strength: 20% caster's max Health

- [ ] **S3 — The Goal of All Life Is Death** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Description: Dispels all buffs from the enemy before --silencing-- for 1 turn and a 100% chance to inflict --death sentence--. This skill is unaffected by cooldown increase and decrease effects.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Aither (c1018)

- [ ] **S1 — Whispering Spirit** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with spirit power, with a 50% chance to --decrease Speed-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1.05<br>

- [ ] **S2 — Guard** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: With water energy, recovers Health of an ally proportional to the target’s max Health and dispels two debuffs, before increasing Combat Readiness of the caster by 20%.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 19% target's max Health (29% with soulburn)<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 19% target's max Health (29% with soulburn)
  - Soulburn (10 souls): Increases the amount recovered.

- [ ] **S3 — Spirit's Call** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Recovers Health of all allies and grants a barrier for 2 turns with spirit power. Amount recovered and barrier strength increases proportional to the target's max Health. 
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 15% target's max Health<br>Barrier strength: 15% target's max Health
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 15% target's max Health; Barrier strength: 15% target's max Health

### Aki (c1179)

- [ ] **S1 — Baptism of Fire** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a blaze, with a 100% chance to inflict --burn-- for 1 turn. At the end of the turn, detonates burn effects inflicted on the target.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.2<br>!pow: 1<br>Detonation multiplier: 1.3<br>
  - Unparsed formula lines: Detonation multiplier: 1.3
  - Soulburn (20 souls): Extends duration of --burn-- by 3 turns, and ignores Effect Resistance. This attack does not trigger a Dual Attack.

- [ ] **S2 — Final Radiance** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Attack by 50%. Cannot receive recover Health effects and damage sharing effects. When attacked, damage suffered in one attack does not exceed 51% of max Health. When using Soulburn, if Health exceeds 51%, consumes 51% Health instead of Soul, and grants an extra turn
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Karmic Flame** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy, dispelling all buffs before inflicting --decreased Defense-- for 2 turns and a 100% chance each to inflict two --burn-- effects for 2 turns. At the end of the turn, detonates burn effects inflicted on the target.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.2<br>!pow: 1.1<br>Detonation multiplier: 1.3<br>
  - Unparsed formula lines: Detonation multiplier: 1.3
  - Soulburn (20 souls): Ignore Effect Resistance.

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
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Increases Critical Hit Chance by 20%. At the start of the turn, has a 100% chance to grant Mind's Eye to the caster for 1 turn. After using Eradicate, when the caster is granted Mind's Eye, activates Trample as an extra skill.<br>Trample: Attacks the enemy by striking from above, and increases Combat Readiness of the caster by 15%. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2 (Trigger Only)<br>att_rate: 0.5<br>!pow: 1<br>11% self max Health (0.11 * Health)<br>
  - Unparsed formula lines: Skill2 (Trigger Only)
  - EE 2: Increase damage dealt by Tramplet by 20%.

- [ ] **S3 — Genesis** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies with Dragon's Might, dispelling all buffs, and grants increased Defense to all allies for 2 turns. Increases Combat Readiness of the caster by 50%. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.5<br>!pow: 1<br>15% self max Health (0.15 * Health)<br>
  - EE 3: Decreases Combat Readiness of the target by 20% when using Genesis.

### Alexa (c3012)

- [ ] **S1 — Fell** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Description: Attacks the enemy by cutting with dual-wielded swords. A critical hit will activate Lightning Bolt as an extra attack. Lightning Bolt can only be activated once per turn of the caster. Lightning Bolt (Acquire 1 Soul): Rapidly attacks the enemy by cutting with dual-wielded swords.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>proc on crit is 0.75 att_rate, 1 pow! damage<br>
  - Unparsed formula lines: proc on crit is 0.75 att_rate, 1 pow! damage

- [ ] **S2 — Cold Edge** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a cold blade, with a 100% chance to inflict two --poison-- effects for 2 turns, and increases the caster's Combat Readiness by 30%.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

- [ ] **S3 — Crushing Blow** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy continuously, dealing damage proportional to the number of debuffs inflicted on the enemy.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5<br>!pow: 0.9<br>15% increased damage per target debuff<br>
  - Unparsed formula lines: 15% increased damage per target debuff

### All-Rounder Wanda (c4065)

- [ ] **S1 — Weak Point** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Shoots an arrow at the enemy, decreasing Combat Readiness by 15%. When the enemy is --targeted--, increases damage dealt.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Steady Aim** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: Has a 100% chance to --target-- a random enemy for 2 turns at the beginning of each turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — One Shot, One Kill** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy's vital points, with a 100% chance to --stun-- and --decrease Speed-- for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (20 souls): Ignores Effect Resistance.

### Ambitious Tywin (c2042)

- [ ] **S1 — Icy Sword Storm** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with a sword, with a 75% chance to inflict --provoke-- for 1 turn. Inflicts 4 Soul Removal on the enemy. When the caster is granted rage, ignores Effect Resistance. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.6<br>!pow: 1<br>10% self max Health (0.10 * Health)<br>

- [ ] **S2 — Battle Command** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: After being attacked, when an ally has a debuff, has a 100% chance to dispel one debuff each from all allies and grant rage to the caster for 1 turn.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Flash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with an instant swordstorm, with a 80% chance each to --stun-- for 1 turn and --decrease Defense-- for 2 turns. When the caster is enraged, ignores Effect Resistance. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.5<br>!pow: 1<br>12% self max Health (0.12 * Health)<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Amid (c1143)

- [ ] **S1 — Zephyr** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy with a fan, and increases Combat Readiness of the caster by 15%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Combat Readiness increase effect will be applied to all allies.
  - EE 1: When using Zephyr, increases Combat Readiness by an additional 5%.
  - EE 2: When using Zephyr, the same effect applies to the ally with the highest Combat Readiness except for the caster.

- [ ] **S2 — Forest Blessing** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Grants skill nullifier once to all allies and increases Combat Readiness by 25%. Grants an extra turn to the caster.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Touch of Hope** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: With Elven magic, dispels two debuffs from an ally except for the caster and grants Swift Attack. Increases Attack of the target for 2 turns.
  - Source multiplier text (requires review): Skill3<br>
  - EE 3: Grants increased Attack (Greater) instead of increased Attack to the target when using Touch of Hope.

### Amiki (c3158)

- [ ] **S1 — Divine Punishment** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a sword, and has a 75% chance to --provoke-- for 1 turn. Cannot trigger a critical hit, and penetrates the target's Defense by 30%. After attacking, when the caster's Health is 30% or less, grants an extra attack with the same skill.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.6<br>!pow: 1<br>

- [ ] **S2 — Desperate Resolve** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Grants immortality for 1 turn and increased Attack for 2 turns to the caster. Upon receiving lethal damage when the skill is available according to cooldown count, grants the same effects to the caster and fully increases cooldown of this skill.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Avenger's Sword** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Slash the enemy consecutively to attack. Cannot trigger a critical hit. Penetrates the target's Defense by 30%, and when the caster's Health is 30% or less, penetrates by 70%. When the caster is immortal, grants an extra turn.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.1 (1.5 Soulburn)<br>!pow: 0.95<br>
  - Soulburn (10 souls): Increases damage dealt.

### Angel of Light Angelica (c6062)

- [ ] **S1 — Ritualistic Touch** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with fragments of a shimmering star, with a 75% chance to --silence-- for 1 turn. When the target is --silenced-- after attacking, decreases Combat Readiness of the target by 25%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Guardian of Light** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Immune to stun, and after every attack suffered by an ally except for the caster, increases Combat Readiness of the caster by 8% each. When suffering an attack that targets all allies, has a 100% chance to activate Guardian Angel.<br>Guardian Angel: Dispels one debuff from all allies before granting skill nullifier once.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Judgement of Angels** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Description: With holy light, dispels two buffs from all enemies before a 100% chance to inflict --cannot buff-- for 2 turns and --silence-- for 1 turn.
  - Source multiplier text (requires review): Skill3<br>

### Angelic Montmorancy (c4042)

- [ ] **S1 — Sleep Sorcery** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with water energy, with a 75% chance to put them to --sleep-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Purification** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Description: Dispels one debuff from all allies and recovers Health of allies inflicted with debuffs proportional to the target's max Health
  - Source multiplier text (requires review): Skill2<br>Heal strength: 7% target max Health<br>extra heal does 10% target max HP from SC
  - Unparsed formula lines: Heal strength: 7% target max Health; extra heal does 10% target max HP from SC

- [ ] **S3 — Earnest Prayer** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Dispels two debuffs from an ally before recovering Health proportional to the target's max Health and grants immunity for 2 turns. Decreases skill cooldown of the caster by 1 turn.
  - Source multiplier text (requires review): Skill3<br>Heal strength: 35% target max Health<br>
  - Unparsed formula lines: Heal strength: 35% target max Health
  - Soulburn (20 souls): Effect is granted to all allies.

### Angelica (c1062)

- [ ] **S1 — Holy Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks with a staff, with a 25% chance to --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - EE 1: Increases Combat Readiness of the ally except for the caster with the highest Attack by 15% after using Holy Strike.

- [ ] **S2 — Origin of Life** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Description: With the power of healing, recovers Health of the target and the ally with the lowest Health proportional to the caster’s max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 20% self max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 20% self max Health

- [ ] **S3 — Guide of the Goddess** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Recovers Health of all allies and grants immunity and a barrier for 2 turns. Amount recovered and barrier strength increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 15% self max Health<br>Barrier strength: 15% self max Health
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 15% self max Health; Barrier strength: 15% self max Health
  - Soulburn (20 souls): Extends duration of buffs granted by this skill by 2 turns.
  - EE 2: Increases Guide of the Goddess' amount recovered by 15%.
  - EE 3: Dispels one debuff from all allies after using Guide of the Goddess.

### Apocalypse Ravi (c2019)

- [ ] **S1 — Spectral Axe** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with an axe, inflicting up to 10% injuries before absorbing some of the damage dealt as Health. Damage dealt increases proportional to the caster's max Health.
  - Resource: fightingSpirit; base gain 20; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1 (2 soulburn)<br>!pow: 0.95<br>12% self max Health (24% soulburn)<br>30% of damage gained as life
  - Unparsed formula lines: 30% of damage gained as life
  - Soulburn (20 souls): Greatly increases damage dealt. Does not trigger a Dual Attack.

- [ ] **S2 — War God's Might** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Description: Increases Penetration Resistance by 30%. At the start of the first battle, gains 50 Fighting Spirit. After being attacked, consumes 10 Fighting Spirit, increasing Combat Readiness of the caster by 15% and recovering Health proportional to the caster's max Health.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Implemented resource passive portions: battle-start grant. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): Skill2<br>Heal strength: 6-8% self max Health <br>
  - Unparsed formula lines: Heal strength: 6-8% self max Health 

- [ ] **S3 — Deliverance: Soul Exchange** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: Damage bonus implemented; additional effect pending
  - Description: Attacks the enemy with divine judgment. When the enemy is defeated, revives one random dead ally with 30% Health and increases Combat Readiness by 100% before granting skill nullifier once. Damage dealt increases proportional to the caster's max Health. When an ally dies, grants War God to the caster and resets cooldown of this skill.
  - Resource: fightingSpirit; base gain 30; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.3<br>!pow: 0.95<br>20% self max Health<br>25% increased damage when somebody dies, stacks 3x
  - Unparsed formula lines: 25% increased damage when somebody dies, stacks 3x
  - EE 1: Increases damage dealt by Deliverance: Soul Exchange by 10%, and inflicts up to 30% injuries on the target,

### Aram (c5175)

- [ ] **S1 — Atten-Tion!** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy by whipping up the sand and has a 35% chance to inflict --stun-- for 1 turn, before recovering Health of all allies proportional to the caster’s max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 0.95<br>Heal strength: 11% caster's max Health<br>
  - Unparsed formula lines: Heal strength: 11% caster's max Health
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Coastal Discipline** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of the first battle, if an enemy takes the first turn, grants immunity to all allies for 3 turns, and if an ally takes the first turn, grants increased Effectiveness to all allies for 3 turns. After suffering an attack that targets all allies, activates Warming Up.<br>Warming Up (gains 10 Soul): Grants vigor and increased Speed to all allies for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Rapid Rescue** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Fires a rescue line launcher, granting exploiting weak points to an ally except for the caster and resetting skill cooldowns before increasing Combat Readiness by 100%. This skill is unaffected by cooldown increase and decrease effects.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Aramintha (c1048)

- [ ] **S1 — Ignite** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy with an explosion of flames, with a 50% chance to --burn-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1.05<br>
  - EE 1: Increase Ignite's chance to --burn-- by 10%.
  - EE 2: After using Ignite, at the end of the turn, detonates burn effects inflicted on the target.

- [ ] **S2 — Catalyst** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with a catalytic explosion, dispelling two buffs and making them --unhealable-- for 2 turns, before increasing Attack of all allies for 2 turns. For each --unhealable-- inflicted, increases Combat Readiness of the caster by 30%.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.9<br>!pow: 1<br>

- [ ] **S3 — Fire Pillar** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies with a massive fire pillar, with a 100% chance each to inflict two --burn-- effects for 2 turns and a 70% chance to inflict --stun-- for 1 turn. Grants a barrier (proportional to the caster’s Attack) to the caster for 2 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1<br>!pow: 1<br>Barrier strength: 120% self Attack<br>Detonation multi: 1
  - Unparsed formula lines: Barrier strength: 120% self Attack; Detonation multi: 1
  - Soulburn (20 souls): Ignores Effect Resistance.
  - EE 3: Increase Fire Pillar's chance to --stun-- by 10%.

### Arbiter Vildred (c2007)

- [ ] **S2 — Dark Contract** — Passive partially implemented or pending
  - Current base support: passive. Passive: revival and maximum-Focus grant implemented; full-Focus skill/reset effects pending
  - Review/work: Passive: revival and maximum-Focus grant implemented; full-Focus skill/reset effects pending
  - Description: At the start of the turn, when Focus is full, resets skill cooldown of Dark Blade. Upon dying, revives to 100% Health, before increasing Combat Readiness by 100% and gaining maximum Focus.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>Archdemon's Might Damage increase against light targets: 60%<br>
  - Unparsed formula lines: Archdemon's Might Damage increase against light targets: 60%

- [ ] **S3 — Dark Blade** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After increasing Attack of the caster for 2 turns, attacks all enemies before inflicting --decreased Hit Chance-- for 2 turns, and when an enemy is defeated, resets cooldown. When Focus is full, consumes it all, increasing damage dealt.
  - Resource: focus; base gain 1; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.15 (1.4 soulburn)<br>!pow: 0.85<br><br><br>Skill3 (Full Focus)<br>att_rate: 1.4 (1.6 soulburn0<br>!pow: 0.85<br>
  - Unparsed formula lines: Skill3 (Full Focus); att_rate: 1.4 (1.6 soulburn0; !pow: 0.85
  - Soulburn (10 souls): Increases damage dealt.

### Archdemon's Shadow (c5004)

- [ ] **S1 — Touch of Chaos** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Has a 100% chance to --seal-- the enemy for 2 turns, before attacking with lightning.
  - Resource: focus; base gain 1; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Ignores Effect Resistance.

- [ ] **S2 — Twisted Power** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Damage suffered from a critical hit decreases by 30%. When more than one damage reduction effect is granted, only the strongest effect is applied. After using a basic skill, when the target is --sealed--, increases Attack of the caster for 1 turn before activating Burst.<br>Burst: Attacks all enemies, and increases Combat Readiness of the caster by 25% before gaining 1 Focus. A successful attack deals additional damage proportional to the caster's Attack.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2Proc<br>att_rate: 0.45<br>!pow: 1.3<br>Additional damage: 40% of Self Attack (0.4 * Attack)<br>
  - Unparsed formula lines: Skill2Proc; Additional damage: 40% of Self Attack (0.4 * Attack)

- [ ] **S3 — Dissolution** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Attacks all enemies with the power of Ilryos, with a 80% chance to --decrease Defense-- for 2 turns, and a 100% chance each to inflict two --burn-- effects for 2 turns. Grants the caster an extra turn. This skill cannot trigger a counterattack.
  - Resource: focus; base gain 0; required/spent 5.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>

### Architect Laika (c2099)

- [ ] **S2 — Laying the Groundwork** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Confirms the target, with a 100% chance each to dispel two buffs from the enemy and inflict --target-- for 2 turns, before granting increased Attack and immunity to the caster for 2 turns. After using this skill, when the enemy is inflicted with --target--, grants an extra turn to the caster.
  - Source multiplier text (requires review): Skill2<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

- [ ] **S3 — Eliminating the Target.** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Description: With everything going as planned, attacks all enemies, and when the enemy is defeated, inflicts extinction. When the target is not an Elite or Boss monster, ignores damage sharing. When the enemy is inflicted with --target--, penetrates Defense by 80%. Damage dealt increases proportional to the caster's Speed.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.95<br>!pow: 0.9<br>0.1125% self Speed (0.001125 * Speed)<br>

### Argent Waves Hwayoung (c5128)

- [ ] **S2 — Advent of the Sura** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: After an ally uses a non-attack skill, activates Swallow Kick on the enemy with the highest Defense.<br>Swallow Kick: After granting increased Attack to the caster for 2 turns, attacks the enemy by leaping forward, and increases Combat Readiness of the caster by 20%. Penetrates the target’s Defense by 50%. When the caster is granted vigor, grants an extra turn.
  - Source multiplier text (requires review): Skill2(Proc)<br>att_rate: 1.25<br>!pow: 1<br>
  - Unparsed formula lines: Skill2(Proc)
  - EE 1: Before attacking, grants increased Hit Chance to the caster for 2 turns when using Swallow Kick.
  - EE 2: With Swallow Kick's effect, increases Combat Readiness by an additional 10%.

- [ ] **S3 — Argent Flash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with a water scooter, and increases Combat Readiness of the ally in the back row by 50%. Grants vigor to the caster for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.1 (1.35 Soulburn)<br>!pow: 1<br>
  - Soulburn (10 souls): Increases damage dealt.

### Aria (c1129)

- [ ] **S1 — Shadow Call** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks two enemies with shadows, with a 50% chance to --decrease Hit Chance-- for 1 turn. When it is not the caster's turn, increases effect chance by 20%. Damage dealt increases proportional to the caster's Defense.
  - Resource: focus; base gain 1; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.7<br>!pow: 1<br>85% self Defense (0.85 * Defense) <br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Guide of Darkness** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Increases Critical Hit Chance by 30%. After using a skill, when Focus is full, consumes all Focus to activate Dark Shadow Phantom.<br>Dark Shadow Phantom: Attacks all enemies, dispelling two buffs and decreasing Combat Readiness by 30%. Damage dealt increases proportional to the caster's Defense.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2<br><br><br>Skill2Proc<br>att_rate: 0.7<br>!pow: 1.3<br>140% self Defense (1.4 * Defense) <br>does not benefit from s2 mola
  - Unparsed formula lines: Skill2Proc; does not benefit from s2 mola
  - EE 3: At the start of the first battle, gains 1 Focus.

- [ ] **S3 — The Umbral Hour** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Using the power of the shadows, increases Defense of the caster and adopts a counterattacking stance for 2 turns. Grants stealth and a barrier to all allies except for the caster for 2 turns. Barrier strength increases proportional to the caster's Defense.
  - Resource: focus; base gain 3; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>Barrier Strength: 100% of Self Defense<br>
  - Unparsed formula lines: Barrier Strength: 100% of Self Defense

### Armin (c1008)

- [ ] **S1 — Takedown** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy with a shield, with a 35% chance to --stun-- for 1 turn. Damage dealt increases proportional to the caster's Defense. When it is not the caster's turn, this attack changes into an attack that targets all enemies.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.8<br>!pow: 0.9<br>60% self Defense (0.6 * Defense)<br>65% stun chance if enemy debuffed
  - Unparsed formula lines: 65% stun chance if enemy debuffed
  - EE 3: Dispels one additional debuff from all allies when using Shield Wall.

- [ ] **S2 — Protect** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: When attacked, has a 25% chance to counterattack. When an ally is attacked by a Single Attack, grants 30% damage reduction.
  - Source multiplier text (requires review): Skill2<br>
  - EE 1: Increases Protect's chance to counterattack by 5%.

- [ ] **S3 — Shield Wall** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: With the Shield of Light, dispels one debuff from all allies, and grants increased Defense to the caster for 2 turns, and grants a barrier (proportional to the caster's Defense) to all allies for 2 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>Barrier strength: 60% self Defense<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Barrier strength: 60% self Defense
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.
  - EE 2: Increases's Shield Wall's barrier strength by 50%.

### Arowell (c3004)

- [ ] **S1 — Shield Thrust** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a sword and shield, with a 75% chance each to dispel one buff twice. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7<br>!pow: 0.95<br>5% self max Health (0.02 * Health)<br>
  - Unparsed formula lines: 5% self max Health (0.02 * Health)
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Escort** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of battle and at the end of the caster's turn, grants escort to the caster for 1 turn. After an ally except for the caster is attacked by a Single Attack, increases Combat Readiness of the caster by 20%.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Defensive Position** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy, with a 100% chance to --stun-- for 1 turn, and grants a barrier and increased Defenseto all allies for 2 turns. Damage dealt and barrier strength increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5<br>!pow: 0.95<br>15% self max Health (0.05 * Health)<br>Barrier strength: 20% self max Health
  - Unparsed formula lines: 15% self max Health (0.05 * Health); Barrier strength: 20% self max Health

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
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Attack increases by 30%. When attacking, cannot trigger a critical hit. At the end of an enemy's turn, when the target is granted a barrier, increases Combat Readiness of the caster by 10%.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — A Thrashing In The Prairie** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Runs up to the enemy to attack. When the enemy is defeated, inflicts extinction and resets cooldown of this skill. Penetrates the target's Defense by 70% and when the target is granted a barrier, increases damage dealt.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.9<br>!pow: 1<br>240% increased damage if enemy has barrier<br>
  - Unparsed formula lines: 240% increased damage if enemy has barrier
  - EE 3: Increases Combat Readiness of the caster by 30% when usrng A Thrashing In The Prairie.

### Assassin Cartuja (c2013)

- [ ] **S1 — Shred** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with sharp claws, with a 100% chance to inflict --provoke-- for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>6% self max Health (0.06 * Health)<br>

- [ ] **S2 — Battle Fever** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Increases Evasion by 50% and increases Evasion of all allies except for the caster by 20%. When successfully evading, increases Combat Readiness of the caster by 15%.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a
  - EE 1: With Battle Fever's Effect, increases Evasion of the caster by an additional 20%.
  - EE 2: After successfully evading, increases Combat Readiness of all allies except for the caster by 10%.

- [ ] **S3 — Sudden Assault** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy by quickly dashing towards them, inflicting --decreased Defense-- for 2 turns and --stun-- for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5<br>!pow: 0.95<br>15% self max Health (0.15 * Health)<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Assassin Cidd (c2014)

- [ ] **S1 — Slice** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks with an axe, with a 50% chance to --decrease Defense-- for 2 turns. Damage dealt increases proportional to the caster's Speed.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.9<br>!pow: 1<br>0.075% self Speed (0.00075 * Speed)<br>
  - EE 1: Increases Slice's chance to --decrease Defense-- by 10%.

- [ ] **S2 — Swift Action** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: When somebody dies, caster is granted increased Attack for 1 turn and Combat Readiness increases by 30%.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a
  - EE 2: With Swift Action's effect, when an enemy dies, grants increase Attack (Greater) instead of increased Attack to the caster.

- [ ] **S3 — Execution** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy with a powerful ground pound, inflicting --silence-- for 1 turn and decreasing Combat Readiness by 50%, before granting increased Evasion to the caster for 2 turns. Damage dealt increases proportional to the caster and enemy's Speed. Inflicts 20 Soul Removal on the enemy.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5 (2 soulburn)<br>!pow: 0.95<br>0.10% self Speed (0.001 * Speed)<br>0.30% target Speed (0.003 * Speed)
  - Unparsed formula lines: 0.30% target Speed (0.003 * Speed)
  - Soulburn (10 souls): Increases damage dealt.
  - EE 3: Dispels one buff from the enemy when using Execution. (This effect is applied before inflicting --silence--.)

### Assassin Coli (c2033)

- [ ] **S1 — Ambush** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy by ambushing them. When the caster is granted stealth, increases damage dealt and grants increased Speed to the caster for 1 turn. Damage dealt increases proportional to the caster's Speed.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.9(1.2 if stealthed)<br>!pow: 1<br>0.075% self Speed (0.00075 * Speed)<br>
  - Unparsed formula lines: att_rate: 0.9(1.2 if stealthed)
  - EE 2: Removes 3 Souls from the opponent after using Ambush.

- [ ] **S2 — Cloak and Dagger** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When the caster does not have a debuff, has a 100% chance each to be granted increased Attack for 1 turn at the beginning of turn and stealth for 1 turn at the end of the turn.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Murder** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy by moving silently, inflicting --stun-- for 1 turn. When the enemy is defeated, inflicts --silence-- on all enemies for 1 turn. Damage dealt increases proportional to the caster's Speed.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5 (3 soulburn)<br>!pow: 0.8<br>0.1125% self Speed (0.001125 * Speed)<br>
  - Soulburn (20 souls): Increases damage dealt.
  - EE 3: Grants the caster immunity for 2 turns after using Murder.

### Astromancer Elena (c2091)

- [ ] **S2 — Disciple of the Stars** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed condition watcher implemented; Star's Blessing opening grant and conditional enemy counterattack blocking pending
  - Review/work: Passive: reviewed condition watcher implemented; Star's Blessing opening grant and conditional enemy counterattack blocking pending
  - Review/work: Star's Blessing opening grant and conditional enemy counterattack blocking
  - Description: At the start of battle, grants Star's Blessing for 1 turn. When the caster is granted Star's Blessing, enemy Heroes cannot counterattack. After an ally except for the caster uses an attack that targets all enemies, activates Worship Me!.<br>Worship Me! (gains 10 Soul): Increases Combat Readiness of the caster by 20%.
  - Implemented watchers: astromancer-elena-ally-aoe.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — S3** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with the energy of the enraged star, decreasing buff durations by 1 turn before making them --unhealable-- and --restricting-- for 2 turns. Grants Star's Blessing to the caster for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.1<br>!pow: 0.9<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Aubade Ludwig (c5069)

- [ ] **S1 — Moonlight** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with moonlight. When the caster is granted dawn, activates Light of Condemnation as an extra attack. Light of Condemnation can only be activated once per turn, during the caster's turn.<br>Light of Condemnation (Acquire 5 Soul): Attacks all enemies and consumes all Soul regardless of whether the attack hits, inflicting 1,000 additional damage. Additional damage increases proportional to the amount of consumed Soul, up to 25,000.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7<br>!pow: 1<br><br><br>Skill1 (Proc)<br>att_rate: 0.4<br>!pow: 1.3<br>Soul scaling: 1000 base damage + (300 x NUMBER_OF_SOULS)<br>NUMBER_OF_SOULS = Small souls, 1 big soul = 10 souls, the cap is 80 souls
  - Unparsed formula lines: Skill1 (Proc); att_rate: 0.4; !pow: 1.3; Soul scaling: 1000 base damage + (300 x NUMBER_OF_SOULS); NUMBER_OF_SOULS = Small souls, 1 big soul = 10 souls, the cap is 80 souls

- [ ] **S2 — Night Greeting the Dawn** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Defense by 30%. At the end of an ally's turn, when Soul is 10 or higher, increases Combat Readiness of the caster by 20%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — S3** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Dispels two buffs from all enemies, and has a 85% chance each to inflict --block-- for 2 turns and --silence-- for 1 turn on all enemies. Grants dawn and a barrier (proportional to max Health) to the caster for 3 turns.
  - Source multiplier text (requires review): Skill3<br>Barrier strength: 25% (32% with soulburn) of the caster's max Health<br>
  - Unparsed formula lines: Barrier strength: 25% (32% with soulburn) of the caster's max Health
  - Soulburn (10 souls): Increases barrier strength.

### Aube (c5190)

- [ ] **S2 — Film Fiesta** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Releases the moment engraved in the film, with a 100% chance to grant cascade to all allies. Grants skill nullifier once and an extra turn to the caster.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Eternal Moment** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Fixes all enemies in a frame, dispelling two buffs before a 100% chance each to inflict --immobilize-- and --restrict-- for 2 turns. Concealment will remain throughout the battle. 
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): Ignore Effect Resistance.

### Auxiliary Lots (c2031)

- [ ] **S2 — Mana Injection** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Injects an ally except for the caster with Mana, granting exploiting weak points and increased Attack for 2 turns before increasing Combat Readiness by 100%.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Desolation** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with powerful magic, with a 80% chance to --decrease Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.

### Azalea (c3031)

- [ ] **S1 — Persistent Attack** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Description: Stabs the enemy with a spear and recovers Health of the caster. Amount recovered increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1.05<br>Heal strength: 11% self max Health<br>
  - Unparsed formula lines: Heal strength: 11% self max Health

- [ ] **S2 — Challenging Blow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy, with a 100% chance each of --provoking-- and making them --unhealable-- for 2 turns.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.5<br>!pow: 1.05<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

- [ ] **S3 — Sweep** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Sweeps all enemies with a spear, with a 75% chance to --decrease Speed-- and --Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.9<br>!pow: 1<br>

### Baal & Sezan (c1015)

- [ ] **S1 — Ghost Haunt** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Summons an evil spirit to attack two enemies, with a 50% chance to inflict --poison-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - EE 1: Increase damage dealt by Ghost Haunt by 10%.

- [ ] **S2 — Dark Cloud** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies by summoning a cloud of darkness. Damage dealt increases proportional to the number of debuffs inflicted on the target. When an enemy is defeated, resets cooldown of Last Requiem.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.1 (1.35 soulburn)<br>!pow: 0.9<br>15% increased damage per debuff on target<br>
  - Unparsed formula lines: 15% increased damage per debuff on target
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — Last Requiem** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Baal & Sezan attack all enemies with offensive magic, with a 85% chance each to inflict --decreased Defense--, --decreased Speed--, and --unhealable-- for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.8<br>!pow: 1<br>
  - EE 2: Dispels one buff from all enemies when using Last Requiem.
  - EE 3: Increases all of Last Requiem's effect chances by 15%.

### Bad Cat Armin (c6008)

- [ ] **S1 — Are You Ready?!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a giant shield, with a 45% chance to --provoke-- for 1 turn. Damage dealt increases proportional to the caster's max Health. When used on the caster's turn, Are You Ready?! changes into an attack that targets all enemies. The changed attack does not trigger a Dual Attack.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.9<br>!pow: 1<br>6% self max Health (0.06 * Health)<br>
  - EE 1: Increases Are You Ready?!'s chance to --provoke-- by 10%.

- [ ] **S2 — Catch 'Em!** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: After being attacked, has a 50% chance to grant increased Critical Hit Damage to the foremost ally for 1 turn before making them counterattack. When attacked by an enemy inflicted with --provoke-- or --redirected-- provoke, doubles effect chance. Cannot be triggered by extra attacks or counterattacks.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Is This It?! Nyahaha!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy with a huge explosion, --provoking-- for 1 turn. Increases Defense of the caster for 2 turns, and grants a barrier to all allies for 2 turns. Damage dealt and barrier strength increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.3<br>!pow: 1<br>16% self max Health (0.16 * Health)<br>Barrier Strength: 15% of Self Max HP
  - Unparsed formula lines: Barrier Strength: 15% of Self Max HP
  - Soulburn (10 souls): --Provokes-- for 2 turns.
  - EE 2: Increases Is This It?! Nyahaha!'s barrier strength by 30%.
  - EE 3: Decreases buff durations of the target by 1 turn when using Is This It?! Nyahaha!. (This effect is applied before inflicting --provoke--)

### Baiken (c1093)

- [ ] **S1 — Tatami Gaeshi** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy repeatedly, with a 70% chance each to inflict two --bleeding effects-- for 2 turns. A critical hit will reduce the caster's skill cooldowns by 1 turn.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>2 separate chances to apply a bleed at said %<br>
  - Unparsed formula lines: 2 separate chances to apply a bleed at said %

- [ ] **S2 — Tsurane Sanzu-watashi** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Attacks the enemy with expert swordsmanship and has a 80% chance each to inflict three --bleeding-- effects for 2 turns. One bleeding effect ignores Effect Resistance. A critical hit will grant an extra turn.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.2<br>!pow: 1<br>3 separate chances to apply a bleed at said % (one ignores resistances)<br>
  - Unparsed formula lines: 3 separate chances to apply a bleed at said % (one ignores resistances)

- [ ] **S3 — Garyo Tensei** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Delivers a deadly blow and detonates any --bleeding-- effects inflicted on the target at the end of the turn. A critical hit will increase Combat Readiness of all allies by 25%.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.6(1.85 soulburn)<br>!pow: 1<br>after initial damage, explosion damage is total remaining bleed damage<br>30% increased damage on bleed portion<br><br>explosion cannot get bonus from critical hit damage<br>Detonation multi: 1.3
  - Unparsed formula lines: after initial damage, explosion damage is total remaining bleed damage; 30% increased damage on bleed portion; explosion cannot get bonus from critical hit damage; Detonation multi: 1.3
  - Soulburn (10 souls): Increases damage dealt.

### Basar (c1053)

- [ ] **S2 — Hurricane** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies by releasing a hot sand hurricane, with a 75% chance each to inflict --decreased Hit Chance-- and --decreased Attack-- for 2 turns.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.9<br>!pow: 1<br>

- [ ] **S3 — Sandstorm** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with sand magic, dispelling all buffs and making them --unable to be buffed-- for 2 turns, before decreasing Combat Readiness by 30%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.9<br>!pow: 0.9<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Bask (c3006)

- [ ] **S1 — Protective Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Slashes with a sword, with a 75% chance to --decrease Attack-- for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.7<br>!pow: 0.9<br>7% self max Health (0.07 * Health)<br>

- [ ] **S2 — Shield Blow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks with a shield, with a 100% chance to dispel all buffs. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.8<br>!pow: 1<br>12% self max Health (0.12 * Health)<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

- [ ] **S3 — Will of Protection** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Covers all allies with the Will of Protection, granting immunity for 3 turns, before granting a Barrier to the caster for 3 turns. Barrier strength increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>Barrier strength: 30% self max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Barrier strength: 30% self max Health

### Batisse (c3095)

- [ ] **S1 — Brawl** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Hits the enemy in the face. When used against an enemy inflicted with --decreased Attack--, activates Rock Smash as an extra attack.<br>Rock Smash: Attacks all enemies. This attack receives effects that are applied to the basic skill. 
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.8<br>!pow: 0.95<br>Rock Smash is 0.5 att_rate, 0.95 pow!<br>
  - Unparsed formula lines: Rock Smash is 0.5 att_rate, 0.95 pow!
  - Soulburn (20 souls): Activates Rock Smash even when used against enemy without --decreased Attack--.

- [ ] **S2 — Justified Provoke** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: At the start of the turn, has a 100% chance to --decrease Attack-- of the enemy with the highest Combat Readiness for 2 turns.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Certain Victory** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with blindingly fast speed. When used against an enemy with --decreased Attack--, --decreases Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5<br>!pow: 1<br>

### Beehoo (c1141)

- [ ] **S1 — Scorching Flare** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with flames, --burning-- for 1 turn. When used on the caster's turn, activates lncinerate instead of Scorching Flare.<br>Incinerate: Attacks the enemy with an explosion of flames and --burns-- for 1 turn, before detonating burn effects inflicted on the target at the end of the turn. This skill cannot trigger a Dual Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 0.9<br><br><br>Skill1Proc<br>att_rate: 1.2<br>!pow: 0.9<br>
  - Unparsed formula lines: Skill1Proc; att_rate: 1.2; !pow: 0.9

- [ ] **S2 — Flame Keeper** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Increases Attack and Effectiveness by 30%. When attacking, cannot trigger a critical hit. Increases --burn-- damage suffered by enemies by 30%. This skill effect does not stack with other passive skills of the same name.
  - Source multiplier text (requires review): Skill2<br>30% increased burn damage<br>Detonation multi: 1.0
  - Unparsed formula lines: 30% increased burn damage; Detonation multi: 1.0
  - EE 1: Increases the amount of Attack and Effectiveness increased by Flame Keeper by 5%.

- [ ] **S3 — Symphony of Radiance** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: With light, dispels two buffs from all enemies and inflicts --cannot buff-- and --burn-- for 2 turns, before increasing Combat Readiness of the caster by 50%. Increases Combat Readiness of all allies except for the caster by 20%.
  - Source multiplier text (requires review): Skill3<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.
  - EE 2: Increases Attack of the caster for 2 turns when using Symphony of Radiance.
  - EE 3: Inflicts an additional --burn--effect on all enemies for 2 turn when using Symphony of Radiance.

### Belian (c1117)

- [ ] **S1 — Light of Destruction** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with an energy ray and has a 65% chance to dispel one buff. When used on the caster's turn, has a 35% chance to activate Incursion as an extra attack. Damage dealt increases proportional to the caster's max Health.<br>Incursion: Attacks all enemies and inflicts --decreased Speed-- and --decreased Hit Chance-- for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.6<br>!pow: 1.05<br>9% self max Health (0.09 * Health)<br><br><br>Skill1Proc<br>att_rate: 0.6<br>!pow: 1.3<br>4.5% self max Health (0.045 * Health)<br>
  - Unparsed formula lines: Skill1Proc; att_rate: 0.6; !pow: 1.3; 4.5% self max Health (0.045 * Health)
  - Soulburn (10 souls): Increases chance of activating Incursion to 100%.

- [ ] **S2 — Shackles of Suppression** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Decreases the amount of Soul acquired by the enemy by 100%. At the start of the turn, has a 100% chance to grant a random buff to the caster for 1 turn.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Apocalypse** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with the power of duties, decreasing Combat Readiness by a random amount between 20% and 40% and --provokes-- for 1 turn. Increases Defense of the caster for 2 turns. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.6<br>!pow: 1.3<br>12% self max Health (0.12 * Health)<br>

### Bellona (c1071)

- [ ] **S1 — Windbreak Fan** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a fan. Damage dealt increases proportional to the target's max Health. When Focus is 5 or more, consumes all Focus and activates Razorwind Fan.
  - Resource: focus; base gain 1; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.95<br>4% target max Health<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Butterfly Fan** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks all enemies by waving a fan, before granting immunity to the caster for 1 turn.
  - Resource: focus; base gain 1; required/spent 0.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.2<br>!pow: 0.95<br>
  - EE 1: Dispels one buff each from all enemies when using Butterfly Fan.

- [ ] **S3 — Razorwind Fan** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies by creating a powerful gust of wind, with a 100% chance to --decrease Defense-- for 2 turns. Increases damage dealt when Razorwind Fan is triggered by Windbreak Fan.
  - Resource: focus; base gain 3; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.05 (1.25 if tirggered by S1)<br>!pow: 1<br>
  - Unparsed formula lines: att_rate: 1.05 (1.25 if tirggered by S1)
  - EE 3: Decreases Combat Readiness of all enemies by 15% when using Razorwrnd Fan.

### Benevolent Romann (c2043)

- [ ] **S1 — Mana Arrow** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with concentrated mana, before a 35% chance to activate Mana Burst. Effect chance is doubled when the target is silenced.<br>Mana Burst: Attacks all enemies, decreasing Combat Readiness by a random amount between 15% and 50%.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.8<br>!pow: 0.9<br>proc is 0.5 att_rate, 1 pow<br>
  - Unparsed formula lines: proc is 0.5 att_rate, 1 pow
  - EE 1: Fixes Combat Readiness decrease amount of Mana Burst to 30%.

- [ ] **S2 — High Mage's Might** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Immune to --silence--. Reduces the effect of decreased Combat Readiness debuffs inflicted on the caster by 100%.
  - Source multiplier text (requires review): Skill2<br>
  - EE 2: When Combat Readiness of an ally is decreased, at the end of the turn, increases Combat Readiness of the caster by 15%. Can only be activated once every 3 turns.

- [ ] **S3 — Mana Fundamentals** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies with condensed mana, dispelling two buffs before a 75% chance to --decrease Defense-- and --silence-- for 2 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.9<br>!pow: 1.1<br>silences first then dispells<br>
  - Unparsed formula lines: silences first then dispells
  - Soulburn (20 souls): Grants an extra turn.
  - EE 3: Increases all of Mana Fundamentals' effect chances by 5%.

### Benimaru (c1146)

- [ ] **S1 — Move Out of the Way** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Cuts the enemy to attack. When the caster is granted Multilayer Barrier, increases damage dealt.
  - Resource: fightingSpirit; base gain 25; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1 (1.7 Soulburn)<br>!pow: 1<br>30% Damage increase if caster has Multilayer Barrier<br>
  - Unparsed formula lines: 30% Damage increase if caster has Multilayer Barrier
  - Soulburn (10 souls): Increases damage dealt

- [ ] **S2 — Universal Perception** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Description: At the start of the first battle, gains 50 Fighting Spirit. At the start of an enemy's extra turn, dispels all debuffs from the caster and grants Multilayer Barrier for 2 turns before increasing Combat Readiness by 40%. The effect following an enemy's extra turn can only be activated once every 2 turns. After attacking, when Fighting Spirit is full, consumes all Fighting Spirit to activate Hell Flare.<br>Hell Flare: Attacks all enemies with a dark flame sphere. Penetrates the target's Defense by 30%, and when the caster is granted Multilayer Barrier, penetrates the target's Defense by an additional 30%.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Implemented resource passive portions: battle-start grant. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): Skill2Proc<br>att_rate: 1.2<br>!pow: 1<br>
  - Unparsed formula lines: Skill2Proc

- [ ] **S3 — Show No Mercy** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy by slashing their soul, --decreasing Defense-- for 2 turns, before increasing Combat Readiness of the ally with the highest Combat Readiness except for the caster by 15%. When the caster is granted Multilayer Barrier, acquired Fighting Spirit is doubled.
  - Resource: fightingSpirit; base gain 25; required/spent 0.
  - Supported damage formula (reference only): Skill3<br>att_rate: 2<br>!pow: 1<br>

### Bernard (c3162)

- [ ] **S1 — Data Collection** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy, and recovers Health of the ally with the lowest Health. When all allies are Earth elemental, recovers Health of all allies instead. Amount recovered increases proportional to the caster's Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases the amount recovered.

- [ ] **S2 — Tool Utilization** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of battle, grants a barrier to the caster for 2 turns, and at the end of the turn, grants a barrier to the ally with the lowest Health for 2 turns. Barrier strength increases proportional to the caster's Health.
  - Source multiplier text (requires review): Skill2<br>Barrier strength turn 1: 20% (30% with max skill ups) caster's max Health<br>Barrier strength turn end: 15% caster's max Health
  - Unparsed formula lines: Barrier strength turn 1: 20% (30% with max skill ups) caster's max Health; Barrier strength turn end: 15% caster's max Health

- [ ] **S3 — S3** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Dispels all debuffs from all allies and grants immunity to all allies for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Birgitta (c1160)

- [ ] **S1 — Baseless Rumor** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy and decreases Combat Readiness by 15%. When the target is inflicted with --block--, doubles the amount of Combat Readiness decrease.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - EE 1: With Baseless Rumor's effect, decreases Combat Readiness by an additional 5%.

- [ ] **S2 — Subterfuge** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Dispels two debuffs from an ally before granting swift attack and increasing Combat Readiness by 50%. Grants an extra turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - EE 2: Grants increased Attack (Greater) to the target for 2 turns when using Subterfuge.

- [ ] **S3 — Nothing Personal, Kid** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Dispels all buffs from the enemy, before a 100% chance each to inflict --bind-- and --block-- for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (20 souls): Ignores Effect Resistance.
  - EE 3: Grants stealth to the caster for 2 turns when using Nothing Personal, Kid.

### Blaze Dingo (c2021)

- [ ] **S1 — Punishment** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks an enemy with a sharp dagger, before recovering Health of the ally with the lowest Health proportional to damage dealt.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1.5<br>!pow: 0.95<br>Heal strength: 50% of Damage done<br>
  - Unparsed formula lines: Heal strength: 50% of Damage done
  - EE 1: A critical hit with Punishment will dispel one debuff from the caster and the ally with the lowest Health.

- [ ] **S2 — Divine Punishment** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks all enemies with a giant gauntlet, with a 75% chance to inflict --decreased Defense-- for 2 turns, before recovering Health of the ally with the lowest Health proportional to damage dealt. A critical hit will activate Punishment on a random enemy as an extra attack.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.2<br>!pow: 0.95<br>Heal strength: 30% of Damage done<br>
  - Unparsed formula lines: Heal strength: 30% of Damage done
  - EE 2: Increases Defense of the caster for 2 turns when using Divine Punishment.

- [ ] **S3 — Sacred Power** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: With a sacred power, recovers Health of the target and the caster proportional to the caster’s Attack and grants invincibility for 1 turn and increased Attack for 2 turns.
  - Source multiplier text (requires review): Skill3<br>Heal strength: 200% self Attack<br>
  - Unparsed formula lines: Heal strength: 200% self Attack
  - Soulburn (20 souls): Extends the duration of Sacred Power granted to the caster by 1 turn and grants an extra turn.
  - EE 3: Grants the caster increased Attack (Greater) for 2 turns when using Sacred Power.

### Blood Blade Karin (c2011)

- [ ] **S1 — Sequential Cutter** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the target by quick-drawing with a sword. Absorbs some of the damage dealt as Health. Increases Combat Readiness of the caster by 15%, and when the enemy is defeated, increases by an additional 35%.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>50% of damage gained as life<br>
  - Unparsed formula lines: 50% of damage gained as life

- [ ] **S2 — Cursed Sword** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: As Health decreases, Attack, Defense, and Speed increase. At the start of the battle, grants immortality to the caster for 1 turn.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Per 1% hp missing: 0.51% to atk/def/spd<br>25% each stat at max molagora
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Per 1% hp missing: 0.51% to atk/def/spd; 25% each stat at max molagora
  - EE 1: Upon receiving lethal damage, grants immortality for 1 turn. Can only be activated once per battle.

- [ ] **S3 — Blade Art: Dragon** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Sacrifices 20% of the caster’s current Health to attack all enemies, and grants increased Attack to the caster for 2 turns. When the target is defeated, grants an extra turn. This skill cannot trigger a counterattack.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.2 (1.45 soulburn)<br>!pow: 0.95<br>
  - Soulburn (10 souls): Increases damage dealt.
  - EE 2: Grants increased Attack (Greater) instead of increased Attack when using Blade Art: Dragon.

### Blood Moon Haste (c2039)

- [ ] **S1 — Blood Scythe** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks by swinging a scythe, dispelling one buff. Damage dealt increases proportional to the caster's max Health. When dispelling the target's buff, activates Bloody Retribution as an extra attack.<br>Bloody Retribution: Attacks the enemy with a scythe, and recovers Health of all allies. Damage dealt and amount recovered increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.3<br>!pow: 1<br><br><br>Skill1(Proc)<br>att_rate: 0.3<br>!pow: 1<br>Max Health Scaling: 10% self max Health (0.1 * Health)<br>Heal strength: 10% Target max Health 
  - Unparsed formula lines: Skill1(Proc); att_rate: 0.3; !pow: 1; Heal strength: 10% Target max Health 
  - Soulburn (10 souls): Ignores Effect Resistance.

- [ ] **S2 — Grudge** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When attacking, penetrates Defense, and cannot trigger a critical hit or a heavy blow. When an ally dies, grants a barrier (proportional to the caster’s max Health) and immunity to all allies for 2 turns, and grants blood aura to the caster for 2 turns.
  - Source multiplier text (requires review): Skill2<br>Barrier strength: 30% self Max Health<br>
  - Unparsed formula lines: Barrier strength: 30% self Max Health

- [ ] **S3 — Moon Slash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Dispels all buffs from the enemy before attacking with a scythe. When the enemy is defeated, revives all dead allies before granting immortality for 1 turn. When the caster is granted blood aura, increases damage dealt by 100%. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.3<br>!pow: 1<br>14% self max Health (0.14 * Health)<br>

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

### Bomb Model Kanna (c1097)

- [ ] **S1 — Quick Bombardment** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Rapidly fires to attack two enemies. Damage dealt increases proportional to the caster's Speed.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.75<br>!pow: 1<br>0.075% self Speed (0.00075 * Speed)<br>
  - EE 1: Has a 50% chance to make the target --unable to be buffed-- for 1 turn when ustng Quick Bombardment.

- [ ] **S2 — Stance Shift** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: At the start of the turn, when Full Bombardment! is not on cooldown, takes a Shelling Stance. At the end of the turn, when Full Bombardment! is on cooldown, takes a Striking Stance. Can only take one stance at a time.<br>Shelling Stance: Increases Effectiveness by 50%.<br>Striking Stance: Increases Speed and Dual Attack chance by 15%.
  - Source multiplier text (requires review): Skill2<br>
  - EE 2: lncreases Speed and Dual Attack chance of Stance Shift's Striking Stance by an additional 5%.

- [ ] **S3 — Full Bombardment!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Boosts firepower to attack all enemies, with a 100% chance to dispel one buff, before increasing Speed of all allies for 2 turns and increasing Attack of the caster for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.
  - EE 3: Makes the target --unhealable-- for 2 turns when using Full Bombardment!.

### Boss Arunka (c2124)

- [ ] **S1 — Road Sign Smash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a road sign and has a 75% chance to inflict --decreased Defense-- for 1 turn. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.6<br>!pow: 1<br>100% self Defense scaling (1 * Defense) <br>
  - Soulburn (10 souls): Triggers a Dual Attack from the ally with the highest Attack.

- [ ] **S2 — Vanguard of the Silent Expanse** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of battle and at the end of the turn, when the caster is in the front row, grants Ferocious Stand for 1 turn. After being attacked, increases Combat Readiness by 25%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Coruscated Trajectory** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy at an incredible velocity, dispelling all buffs before inflicting --decreased Defense-- for 2 turns. Grants increased Defense and a barrier to the caster for 2 turns. Damage dealt and barrier strength increase proportional to the caster's Defense.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.6<br>!pow: 0.95<br>200% self Defense scaling (2 * Defense) <br>Barrier strength: 120% caster's Defense
  - Unparsed formula lines: Barrier strength: 120% caster's Defense

### Briar Witch Iseria (c2024)

- [ ] **S1 — Fallen Flower** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Throws swords at the enemy, with a 75% chance to --decrease Defense-- for 1 turn. A successful attack deals additional damage proportional to the caster's Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.85<br>!pow: 1<br>30% of atk - guessing it's ignores 70% def<br>
  - Unparsed formula lines: 30% of atk - guessing it's ignores 70% def

- [ ] **S2 — Witch's Curse** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Hit Chance by 50%. Allies and enemies cannot revive. Upon receiving lethal damage, grants immortality for 1 turn.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Cursed Thorn** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks all enemies with a cursed thornbush, dispelling all buffs, with a 75% chance to --decrease Defense-- for 2 turns and a 100% chance to make them --unable to be buffed-- for 2 turns. A successful attack deals additional damage proportional to the caster's Attack.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.95<br>!pow: 1.1<br>30% of atk - guessing it's ignores 70% def<br>
  - Unparsed formula lines: 30% of atk - guessing it's ignores 70% def
  - Soulburn (20 souls): Ignores Effect Resistance.
  - EE 1: Increases Cursed Thorn's --decrease Defense-- effect chance by 10%.

### Brieg (c1145)

- [ ] **S2 — Spirit Lord's Protection** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Grants a barrier to all allies for 3 turns, and perception to the caster for 3 turns. Grants an extra turn to the caster. Barrier strength increases proportional to the caster's max Health.
  - Resource: fightingSpirit; base gain 50; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>Barrier Strength: 18.5% of self max Health (0.185 * self Max Health) (24% with Soulburn)<br>
  - Unparsed formula lines: Barrier Strength: 18.5% of self max Health (0.185 * self Max Health) (24% with Soulburn)
  - Soulburn (10 souls): Increases barrier strength.

- [ ] **S3 — Limitless Sword Arts** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a sword, dispelling all buffs before --decreasing Defense-- and --Speed-- for 2 turns. Increases Effectiveness of this attack by 50% and damage dealt increases proportional to the caster's max Health.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>Max Health scaling 22% (0.22 * self Max Health)<br>

### Butcher Corps Inquisitor (c3001)

- [ ] **S2 — Butcher Corps Gear** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Damage suffered in one attack does not exceed 35% of max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Hack** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Strikes indiscriminately at the enemy, dealing damage proportional to the caster's lost Health, and recovering Health proportional to the damage dealt.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5(2.2 soulburn)<br>!pow: 0.85<br>0.5% increased damage per 1% self Health missing<br>
  - Unparsed formula lines: 0.5% increased damage per 1% self Health missing
  - Soulburn (10 souls): Increases damage dealt.

### Byblis (c1154)

- [ ] **S1 — Floral Arrangement** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a magical flower, with a 75% chance to --silence-- for 1 turn. After attacking, if the target is inflicted with --silence--, decreases Combat Readiness of the target by 20%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Gardener's Secret** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: When an ally suffers a counterattack, increases Combat Readiness of the caster by 20%, and activates I'm Warning You. I'm Warning You can only be activated once per turn.<br>I'm Warning You: Attacks all enemies, decreasing buff durations by 2 turns and has a 80% chance to --decrease Defense-- for 2 turns, before recovering Health of all allies. Amount recovered increases proportional to the target's max Health.
  - Source multiplier text (requires review): Skill2(Proc)<br>att_rate: 0.8<br>!pow: 1.3<br>Heal strength: 15% target max Health<br>
  - Unparsed formula lines: Skill2(Proc); Heal strength: 15% target max Health

- [ ] **S3 — A Larunda's Hospitality** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with a specially prepared gift, decreasing buff durations by 1 turn and --decreasing Hit Chance-- for 2 turns, before removing 10 Soul. Grants a barrier to all allies for 2 turns. Barrier strength increases proportional to the target's Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1<br>!pow: 1<br>Barrier strength: 25% target's max Health<br>
  - Unparsed formula lines: Barrier strength: 25% target's max Health

### Bystander Hwayoung (c2128)

- [ ] **S2 — Divine Vessel** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Immune to buffs and debuffs. At the start of the first battle, increases Defense proportional to Attack. The rate of the increase Defense effect does not change after it is activated. After an ally except for the caster is attacked, when the damage suffered is 40% or more of max Health, activates Sura: Reave the Skies against a random enemy. Can only be activated once every 3 turns.
  - Source multiplier text (requires review): Skill2<br>Defense increase: 40% of self Attack<br>
  - Unparsed formula lines: Defense increase: 40% of self Attack

- [ ] **S3 — Sura: Reave the Skies** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a rage-filled strike. When the enemy is defeated, inflicts extinction. When the target is a Hero, ignores damage reduction and damage sharing effects. When the target is of the Light element, increases damage dealt.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.8 (2.3 Soulburn)<br>!pow: 0.95<br>100% (120% soulburn) increased damage vs. Light enemies<br>
  - Unparsed formula lines: 100% (120% soulburn) increased damage vs. Light enemies
  - Soulburn (10 souls): Increases damage dealt.

### Camilla (c3124)

- [ ] **S1 — Flashing Blade** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy, with a 50% chance to --decrease Defense-- for 2 turns. When the caster is granted increased Attack, triggers a Dual Attack from the ally with the highest Attack.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Tactical Maneuver** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Increases Attack of the caster and the ally with the highest Attack except for <br>the caster for 3 turns. Grants an extra turn to the caster. 
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Swift Execution** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy and when the enemy is defeated, recovers the caster to max Health. Damage dealt increases proportional to the target's lost Health. When this skill is available according to cooldown count, decreases damage suffered by 30% when attacked. When more than one damage reduction effect is granted, only the strongest effect is applied. 
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.6<br>!pow: 0.9<br>1% increased damage per 1% target missing Health<br>
  - Unparsed formula lines: 1% increased damage per 1% target missing Health

### Captain Rikoris (c4034)

- [ ] **S1 — Quick Pierce** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a spear, with a 50% chance to --decrease Defense-- for 2 turns. When the caster is granted increase Speed, effect chance increases by 25%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Cheer** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Encourages all allies, decreasing skill cooldown by 1 turn and increasing Speed for 2 turns.
  - Source multiplier text (requires review): Skill2<br>
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

- [ ] **S3 — Supreme Spear** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Decreases debuff duration of all allies by 2 turns, and attacks all enemies with spear art, with a 80% chance each to inflict --decreased Speed-- and --restrict-- for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.9<br>!pow: 1<br>

### Carmainerose (c3071)

- [ ] **S1 — Vampirism** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Claws the enemy, before absorbing some of the damage as Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Vengeful Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy, decreasing Combat Readiness by 55% before --decreasing Speed-- of the enemy for 2 turns and increasing Speed of the caster for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Daze** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy, dispelling all buffs, and increasing Attack and Defense of the caster for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

### Carrot (c3051)

- [ ] **S1 — Swing** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with a staff, with a 75% chance to inflict --burn-- for 1 turn, before detonating burn effects inflicted on the enemy at the end of the turn.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 0.95<br>Detonation multi: 1.1<br>
  - Unparsed formula lines: Detonation multi: 1.1

- [ ] **S2 — Flame Barrier** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: After being attacked, grants increased Attack and a barrier (proportional to Attack) for 1 turn, and inflicts --burn-- on the attacker for 1 turn.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Barrier strength: 60-78% self Attack<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Barrier strength: 60-78% self Attack

- [ ] **S3 — Blaze Explosion** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with a powerful fire, dispelling two buffs before a 70% chance to --burn-- for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.

### Cartuja (c1013)

- [ ] **S1 — Shred** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with sharp claws, with a 50% chance to --decrease Defense-- for 2 turns. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.5<br>!pow: 1<br>6% self max Health (0.06 * Health)<br>

- [ ] **S2 — Danger Zone** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the moment of being attacked, increases Combat Readiness by 15%. When the caster's Health is 50% or less, increases Combat Readiness by an additional 10%.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Predatory Roar** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with wild energy, with a 100% chance to --decrease Attack-- for 2 turns. Recovers 50% of the caster's max Health before granting them increased Defense for 2 turns. Damage dealt increases proportional to the caster's max Health, with additional damage increase when the caster's Health is 75% or less.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.6 (1.0 under 75% hp) <br>!pow: 1<br>5% self max Health (8% soulburn) (6.25% < 75% hp)<br>(10% <75% hp and soulburn)<br><br>att_rate: (+0.2 soulburn)<br>
  - Unparsed formula lines: att_rate: 0.6 (1.0 under 75% hp) ; 5% self max Health (8% soulburn) (6.25% < 75% hp); (10% <75% hp and soulburn); att_rate: (+0.2 soulburn)
  - Soulburn (10 souls): Increases damage dealt.

### Cecilia (c1002)

- [ ] **S1 — Deliverance** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks with a spear, with a 50% chance to --decrease Defense-- for 2 turns. When the target is inflicted with --decreased Attack--, effect chance increases by 25%. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.7<br>!pow: 1<br>7% self max Health (0.07 * Health)<br>
  - EE 1: Increase Deliverance's chance to --decrease Defense-- by 10%.

- [ ] **S2 — Steel Cloudburst** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies with a magical spear, with a 100% chance to --decrease Attack-- for 2 turns, before dispelling one buff. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.4<br>!pow: 1<br>6% self max Health (0.06 * Health)<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.
  - EE 2: --Decreases Speed-- of all enemies for 2 turns when using Steel Cloudburst.
  - EE 3: Makes all enemies --unhealable-- for 2 turns when using Steel Cloudburst.

- [ ] **S3 — Ruinous Retribution** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with a spear infused with dark energy, with a 100% chance to --provoke-- for 1 turn, before granting immunity to all allies for 2 turns and a barrier to the caster for 2 turns. Damage dealt and barrier strength increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.6<br>!pow: 1.05<br>12% self max Health (0.12 * Health)<br>

### Celeste (c3064)

- [ ] **S1 — Precision Fire** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy, before a 75% chance to --decrease Hit Chance-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Volley** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Shoots a volley of arrows at all enemies, with an 85% chance to decrease Combat Readiness by 20%. When the caster's Health is 80% or more, cooldown does not occur.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1 (1.25 soulburn)<br>!pow: 0.9<br>
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — Defcon** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Caster recovers 30% Health and is granted increased Attack for 2 turns and an extra turn.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br><br><br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

### Celestial Mercedes (c2005)

- [ ] **S1 — Divine Bolt** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Description: Attacks two enemies with shock magic. Damage dealt increases proportional to the target's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Dimensional Rupture** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with a massive light sphere, and absorbs some of the damage dealt as Health. Damage dealt increases proportional to the enemy's max Health.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.9<br>!pow: 0.9<br>4% target max Health<br>
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — Finale** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies by releasing spells of The Last Spellbook, and grants increased Attack to the caster for 2 turns. Increases the caster's Combat Readiness by 25% for each critical hit made.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.2<br>!pow: 0.8<br>

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

### Cerise (c1081)

- [ ] **S2 — Luminous Explosion** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Explodes a magical sphere, inflicting --stun-- for 1 turn and --cannot buff-- for 2 turns. Increases Combat Readiness of the caster by 50%.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.5<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

- [ ] **S3 — Frost Storm** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with a raging frost storm, decreasing buff durations by 1 turn before a 100% chance each to inflict --decreased Speed-- and --restrict-- for 2 turns. Grants invincibility to the caster for 1 turn. Attacks using an elemental advantage.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1.1<br>

### Cermia (c1079)

- [ ] **S1 — Playing with Fire** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a flaming sword and has a 75% chance to inflict --unhealable-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.2<br>!pow: 1<br>
  - EE 1: Has a 25% chance to grant an extra attack with the same skill when using Playing with Fire.

- [ ] **S2 — Hot Streak!** — Self-buff execution supported; remaining effects pending
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: By releasing flames, grants increased Attack (Greater) to the caster for 2 turns and resets cooldown of All-In!. Grants an extra turn.
  - Source multiplier text (requires review): Skill2<br>
  - EE 2: Grants the caster a barrier for 2 turns when using Hot Streak!. Barrier strength increases proportional to the caster’s Attack.

- [ ] **S3 — All-In!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy with a blazing inferno. Penetrates the target's Defense by 50%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.15(1.65 soulburn)<br>!pow: 0.9<br>
  - Soulburn (10 souls): Increases damage dealt.
  - EE 3: When an enemy is defeated by All-in!, decrease skill cooldown of Hot Streak! by 2 turns.

### Challenger Dominiel (c2037)

- [ ] **S1 — Electrocute** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with electricity. A critical hit will increase damage dealt.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1 (2.5 soulburn)<br>!pow: 0.9 (1 soulburn)<br>20% increased damage on Critical Hit<br>
  - Unparsed formula lines: 20% increased damage on Critical Hit
  - Soulburn (20 souls): Increases damage dealt.
  - EE 1: When an enemy is defeated with Electrocute, has a 25% chance to --stun-- all remaining enemies for 1 turn.

- [ ] **S2 — Electric Charge** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Increases Critical Hit Chance by 30%. When an ally makes a critical hit, grants stackable increased Attack to the caster according to the number of critical hits made and increases Combat Readiness by 10% per critical hit. This stackable increased Attack is dispelled after attacking.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>5.4% increased damage per crit, up to 7.02% at max molagora<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; 5.4% increased damage per crit, up to 7.02% at max molagora
  - EE 2: With Electric Charge's effect, increases Combat Readiness by an additional 2%.

- [ ] **S3 — Supercharge** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Releases powerful electricity, granting increased Critical Hit Damage to all allies for 3 turns and increasing Combat Readiness by 25%. Grants an extra turn.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a
  - EE 3: Grants increased Attack to all allies for 3 turns when using Supercharge.

### Champion Zerato (c2010)

- [ ] **S1 — Earthen Rage** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Description: Attacks two enemies including the target with an earthen blast, transferring two debuffs from the caster, and recovers Health proportional to max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 0.95<br>Heals strength: 5% self max Health<br>
  - Unparsed formula lines: Heals strength: 5% self max Health

- [ ] **S2 — Iron Will** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Immune to --stun--, --sleep--, and --decreased Hit Chance--. After being attacked, when the caster has a debuff, has a 100% chance to counterattack.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Cataclysm** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies by slamming rocks and has a 75% chance each to inflict --decreased Defense-- and --decreased Attack-- for 2 turns. Grants increased Defense to the caster for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Chaos Inquisitor (c4001)

- [ ] **S2 — Butcher Corps Gear** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Damage suffered in one attack does not exceed 35% of max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Preach** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy in the name of Chaos, with a 50% chance to activate Heavy Strike when the enemy is buffed. Damage dealt increases proportional to the caster's lost Health. Recovers Health proportional to damage dealt.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5(2.2 soulburn)<br>!pow: 0.85<br>0.5% increased damage per 1% self Health missing<br>
  - Unparsed formula lines: 0.5% increased damage per 1% self Health missing
  - Soulburn (10 souls): Increases damage dealt.

### Chaos Sect Axe (c4025)

- [ ] **S1 — Disconnect** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Description: Attacks the enemy with an axe and inflicts up to 10% injuries. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Attack Chain** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Description: Attacks all enemies with a shockwave and inflicts up to 15% injuries before recovering Health of the caster. Damage dealt and amount recovered increase proportional to the caster's max Health. 
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Vigorous Strike** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy, dispelling all buffs before a 75% chance to increase skill cooldowns by 2 turns. When the enemy is defeated, resets cooldown of this skill. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
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

### Charlotte (c1009)

- [ ] **S1 — Dual Swords** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy with dual swords, and increases Combat Readiness of the caster by 25%. A successful attack always results in a critical hit. When this skill is used, if it was not triggered by a Dual Attack and the caster has a buff, Dual Swords changes into an attack that targets all enemies, and the amount of Fighting Spirit gained is doubled.
  - Resource: fightingSpirit; base gain 25; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.9<br>!pow: 1<br>EE Lifesteal: 20% of damage dealt<br>
  - Unparsed formula lines: EE Lifesteal: 20% of damage dealt
  - EE 1: Damage dealt is increased by 10% when using Dual Swords.
  - EE 2: Absorbs some of the damage dealt as Health when using Dual Swords.

- [ ] **S2 — Will of the Swamp** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of battle and at the end of the turn, grants a barrier (proportional to Attack) for 1 turn. When the caster has a buff and attacking, increases damage dealt by 50%, and when attacked, grants 50% damage reduction.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>Barrier strength: 50% caster's Attack (75% at max skill ups)<br>
  - Unparsed formula lines: Barrier strength: 50% caster's Attack (75% at max skill ups)

- [ ] **S3 — Vortex** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Cuts all enemies while spinning, making them --unhealable-- for 2 turns. Penetrates Defense of the target with the highest Defense. A successful attack always results in a critical hit.
  - Resource: fightingSpirit; base gain 0; required/spent 100.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.85<br>!pow: 1<br>
  - Soulburn (10 souls): Acquires 100 Fighting Spirit after using this skill.
  - EE 3: Dispels two debuffs from the caster before the skill effect when using Vortex.

### Chloe (c1049)

- [ ] **S1 — Heavy Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Hammers the enemy. Damage dealt is increased when the enemy is inflicted with --magic nail--.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 0.9<br>When the enemy is inflicted with magic nail, ignores Effect Resistance.<br>
  - Unparsed formula lines: When the enemy is inflicted with magic nail, ignores Effect Resistance.

- [ ] **S2 — Magic Bolt** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After granting increased Attack to the caster for 3 turns, attacks the enemy, inflicting --magic nail-- for 3 turns, and increases Combat Readiness of the caster by 50%. Ignores Effect Resistance.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.2<br>!pow: 0.9<br>80% of the attackers Attack as damage<br>ignores defense, not improved by attacker's crit, etc
  - Unparsed formula lines: 80% of the attackers Attack as damage; ignores defense, not improved by attacker's crit, etc

- [ ] **S3 — Hyper Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Soars into the air and attacks the enemy, --stunning-- for 1 turn. When the enemy is inflicted with --magic nail--, ignores Effect Resistance.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.8(3.3 soulburn)<br>!pow: 0.8<br>When the enemy is inflicted with magic nail, ignores Effect Resistance.<br>
  - Unparsed formula lines: When the enemy is inflicted with magic nail, ignores Effect Resistance.
  - Soulburn (20 souls): Increases damage dealt.
  - EE 1: Increases Combat Readiness of the caster by 15% when using Heavy Strike.
  - EE 3: Has a 85% chance to --decrease Defense-- for 2 turns when using Hyper Strike. When the target is inflicted with --magic nail--, ignores Effect Resistance.

### Choux (c1101)

- [ ] **S1 — Chop** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a spear, before increasing Combat Readiness of the caster by 20%. A critical hit will double the amount of Focus gained. Damage dealt increases proportional to the caster's max Health.
  - Resource: focus; base gain 1; required/spent 0; critical-hit gain ×2.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.5<br>!pow: 1<br>10% self max Health (0.10 * Health)<br>
  - Soulburn (20 souls): Grants an extra turn.
  - EE 1: A critical hit with Chop has a 40% chance to activate Fwoooosh!.

- [ ] **S2 — Fwoooosh!** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Description: Attacks the enemy by wildly swinging a spear, and absorbs some of the damage dealt as Health. Penetrates the enemy's Defense by 70%. When the caster's stacked Focus is 5, consumes all Focus, increasing damage dealt and resetting the cooldown of Fwoooosh!. Damage dealt increases proportional to the caster's max Health.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.5<br>!pow: 1<br>11% self max Health (0.11 * Health), 15% with max Focus<br>Heal Strength: 25% of damage
  - Unparsed formula lines: 11% self max Health (0.11 * Health), 15% with max Focus; Heal Strength: 25% of damage

- [ ] **S3 — Help Me, Cream!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies by freezing them before calling for Cream. Grants increased Critical Hit Resistance to all allies for 2 turns, and grants immunity to the caster for 2 turns. Damage dealt increases proportional to the caster's max Health. When this skill is on cooldown, after an ally except for the caster is attacked, has a 20% chance to counterattack.
  - Resource: focus; base gain 3; required/spent 0.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.5<br>!pow: 1<br>15% self max Health (0.15 * Health)<br>
  - EE 3: Grants immunity to all allies for 2 turns after using Help Me, Cream!.

### Christy (c3123)

- [ ] **S1 — Sword of Protection** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy, with a 75% chance to --provoke-- for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.1<br>!pow: 1<br>5% self max Health (0.05 * Health)<br>

- [ ] **S2 — Oath Shield** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: After being attacked, when the caster does not have a debuff, increases Combat Readiness of the caster and the ally in the back row by 20%. Can only be activated once per turn. At the start of the first battle, increases Effect Resistance of the ally in the back row by 100% of the caster's Effect Resistance. The rate of this effect does not change after it is activated, and this effect is dispelled only when the ally in the back row is defeated. When the caster is in the back row, the effect is not activated.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Hymn of Courage** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Increases Attack of all allies for 2 turns. Increases Defense of the caster for 2 turns and recovers Health. Amount recovered increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>Heal strength: 15% self max Health<br>
  - Unparsed formula lines: Heal strength: 15% self max Health
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Church of Ilryos Axe (c3025)

- [ ] **S1 — Disconnect** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with an axe and inflicts up to 10% injuries. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Attack Chain** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Description: Attacks all enemies with a shockwave and inflicts up to 15% injuries before recovering Health of the caster. Damage dealt and amount recovered increase proportional to the caster's max Health. 
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Plagued Strike** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy, dispelling all buffs. When the enemy is defeated, resets cooldown of this skill. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): Increases damage dealt.

### Cidd (c1014)

- [ ] **S1 — Relentless Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a dagger. Damage dealt increases proportional to the caster's Speed. When the caster is granted increased Speed, uses Whirlwind instead of Relentless Strike.<br>Whirlwind: Attacks the enemy repeatedly, --decreasing Defense-- for 1 turn. Damage dealt increases proportional to the caster's Speed.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.9 (1.5 for whirlwind)<br>!pow: 0.95 (0.9 WW)<br>0.075% self Speed (0.00075 * Speed)<br>
  - Unparsed formula lines: att_rate: 0.9 (1.5 for whirlwind); !pow: 0.95 (0.9 WW)
  - EE 1: Has a 35% chance to --decrease Speed-- of the target for 2 turns when using Whirlwind.

- [ ] **S2 — Wind's Resolve** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: A critical hit grants increased Speed to the caster for 1 turn and a 100% chance to grant arandom buff for 1 turn.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Hack** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy by slashing at them with daggers, and when the target is defeated, grants an extra turn. When the caster is granted increased Speed, attacks using an elemental advantage. Damage dealt increases proportional to the caster's Speed.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.6 (2.2 soulburn)<br>!pow: 1<br>0.21% self Speed (0.0021 * Speed)<br>
  - Soulburn (10 souls): Increases damage dealt.
  - EE 2: Decreases Combat Readiness of the target by 30% when using Hack.
  - EE 3: Grants advantageous element effect to Hack, regardless of whether the caster is granted increased Speed.

### Clarissa (c1028)

- [ ] **S1 — Harsh Lesson** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks with a morning star, with a 50% chance to --decrease Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - EE 1: Increases Harsh Lesson's chance to --decrease Defense-- by 15%.
  - EE 2: Inflicts --bleeding-- for 2 turns when using Harsh Lesson.

- [ ] **S2 — Rage** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When an enemy is defeated by Harsh Lesson or Hysteric, grants rage to the caster for 3 turns and activates Kya-hahaha.<br>Kya-hahaha (gains 1 Soul): Attacks all enemies by swinging an iron mace.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Extra attack does att_rate 0.7, pow! 1 damage<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Extra attack does att_rate 0.7, pow! 1 damage

- [ ] **S3 — Hysteric** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies by spinning before inflicting two --bleeding-- effects for 2 turns and a 70% chance to inflict --decreased Defense-- for 2 turns. When an enemy is defeated, resets skill cooldowns. When the caster is granted rage, increases damage dealt.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.85 (1.1 soulburn)<br>!pow: 1<br>20% increased damage when Enraged<br><br><br>
  - Unparsed formula lines: 20% increased damage when Enraged
  - Soulburn (10 souls): Increases damage dealt.

### Claudia (c3156)

- [ ] **S1 — View Obstruction** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a sword, and has a 50% chance to --decrease Hit Chance-- for 2 turns.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br><br><br>Skill1(Proc)<br>att_rate: 1<br>!pow: 1.3<br>Barrier strength: 20% caster's max Health<br>
  - Unparsed formula lines: Skill1(Proc); att_rate: 1; !pow: 1.3; Barrier strength: 20% caster's max Health
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Slayer's Determination** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: Increases Effectiveness by 30%. When suffering an attack that targets all allies, activates Retaliation against the attacker. Can only be activated once every 2 turns. <br>Retaliation: Pierces through the enemy before attacking, --decreasing Attack-- for 2 turns, and grants a barrier to the ally with the lowest Health for 2 turns. Barrier strength increases proportional to the caster's max Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Indomitable Resolve** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Reaffirms resolve, granting immunity to all allies for 2 turns, and recovers Health of the caster. Amount recovered increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>Heal strength: 25% self max Health<br>
  - Unparsed formula lines: Heal strength: 25% self max Health

### Closer Charles (c2027)

- [ ] **S1 — Elimination** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy by sharply cutting them. When used on the caster's turn, if the caster is granted perception, uses Demolition instead of Elimination.<br>Demolition: Attacks the enemy with a sword, absorbing some of the damage dealt as Health. Damage dealt increases proportional to the target's lost Health. When the enemy is defeated, decreases cooldown of Descent by 1 turn. This attack does not trigger a Dual Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br><br><br>Skill1Alt<br>att_rate: 1.4<br>!pow: 1<br>0.4% increased damage per 1% target missing Health<br>Heals for 30% of the damage dealt
  - Unparsed formula lines: Skill1Alt; att_rate: 1.4; !pow: 1; 0.4% increased damage per 1% target missing Health; Heals for 30% of the damage dealt

- [ ] **S2 — Closer** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of the first battle, grants increased Evasion for 1 turn. After an ally except for the caster attacks, when the enemy's Health is less than 40%, increases Combat Readiness of the caster by 50% and grants perception for 2 turns.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Descent** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies after descending, increasing Attack of all allies for 2 turns before increasing Combat Readiness by 20%. Increases Evasion of the caster for 3 turns. This skill cannot trigger a counterattack.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1 (1.25 soulburn)<br>!pow: 1<br>
  - Soulburn (10 souls): Increases damage dealt.

### Coli (c1033)

- [ ] **S1 — Ambush** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Ambushes the enemy, with a 75% chance to steal one buff.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.8<br>!pow: 0.9<br>
  - Soulburn (10 souls): Increases effect chance to 100% and steals two buffs.

- [ ] **S2 — Accurate Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with an unseen blade and grants stealth to the caster for 2 turns. At the end of the turn, detonates any --bleeding-- effects and --bombs-- inflicted on the target.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.8<br>!pow: 0.9<br>Detonation multi: 1.0<br>
  - Unparsed formula lines: Detonation multi: 1.0

- [ ] **S3 — Baptism of Fire** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a dagger and bomb, decreasing buff durations by 1 turn, inflicting --bleeding-- and planting a --bomb-- for 2 turns, before increasing Combat Readiness of the caster by 50%. When the target is a Fire elemental Hero, ignores Effect Resistance and increases Combat Readiness of the caster by an additional 50%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.3<br>!pow: 0.9<br>

### Command Model Laika (c1099)

- [ ] **S1 — Supporting Fire** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy, increasing Combat Readiness of the caster and a random ally except for the caster by 15%.
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

### Commander Lorina (c4035)

- [ ] **S2 — Spiritual Armament** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Effect Resistance by 50%. Increases Attack by 15% each time the caster attacks an enemy. Effect can only stack up to 5 times.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Spiral Breakthrough** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy by piercing them with a spear, decreasing Combat Readiness by 15%. Damage dealt increases proportional to the target's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5<br>!pow: 0.95<br>3% target max Health<br>
  - Soulburn (20 souls): Grants an extra turn.

### Commander Pavel (c2080)

- [ ] **S2 — Obstacle Elimination** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Description: At the start of the first battle, gains 60 Fighting Spirit. After an ally except for the caster makes a critical hit, gains 20 Fighting Spirit, and when Fighting Spirit is full, activates Begone!. This effect is not activated by an extra attack, counterattack, or Dual Attack.<br>Begone! (consumes 100 Fighting Spirit): Grants increased Attack to the caster for 2 turns, and attacks all enemies with gunfire, before increasing Combat Readiness of the caster by 100%.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Implemented resource passive portions: battle-start grant. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): Skill2 (Proc)<br>att_rate: 0.8<br>!pow: 1<br>
  - Unparsed formula lines: Skill2 (Proc)

- [ ] **S3 — Die, You Fly** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a pistol. When the target is not an Elite or Boss monster, ignores damage share. When the caster's Attack is greater than the target's Attack, penetrates Defense proportionally, up to 70%.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.85 (1.2 Soulburn)<br>!pow: 1<br>Penetration up to 70% = DIFFERENCE_IN_ATK * 0.000117<br>maybe 5983 atk over to have max pen?
  - Unparsed formula lines: Penetration up to 70% = DIFFERENCE_IN_ATK * 0.000117; maybe 5983 atk over to have max pen?
  - Soulburn (10 souls): Increases damage dealt.
  - EE 1: When defeating an enemy with Die, You Fly, inflicts extinction on the enemy.

### Conqueror Lilias (c2089)

- [ ] **S2 — Cover!** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Distracts the enemy, with a 100% chance to inflict --redirected provoke-- and --decreased Defense-- for 1 turn. Grants a barrier (proportional to the target’s max Health) to the caster and the ally except for the caster with the highest max Health for 2 turns.
  - Source multiplier text (requires review): Skill2<br>Barrier Strength: 25% of Target Max Health<br>
  - Unparsed formula lines: Barrier Strength: 25% of Target Max Health
  - Soulburn (10 souls): Extends duration of debuffs inflicted by this skill by 1 turn.

- [ ] **S3 — For Honor!** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Encourages the Perland Army, granting vigor to all allies for 2 turns and increasing Combat Readiness by 15%. Decreases buff durations of all enemies by 1 turn and has a 100% chance to inflict --decreased Attack-- for 2 turns. Grants an extra turn.
  - Source multiplier text (requires review): Skill3<br>

### Corvus (c1012)

- [ ] **S1 — Shield Slam** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy by shoving them with a shield, with a 75% chance to transfer one debuff. When the caster is granted indomitable, increases damage dealt and inflicts --stun-- on the target for 1 turn. Damage dealt increases proportional to the caster's Defense.
  - Resource: fightingSpirit; base gain 10; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7 (0.9 after s3)<br>!pow: 1<br>90% self Defense (120% if buffed by Skill 3)<br>
  - Unparsed formula lines: att_rate: 0.7 (0.9 after s3); 90% self Defense (120% if buffed by Skill 3)

- [ ] **S2 — Macerate** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies with an iron mace, decreasing Combat Readiness by 30%. If the target’s Combat Readiness decreases to 0, inflicts --stun-- for 1 turn. When the caster is granted indomitable, doubles the effect of Combat Readiness decrease. Damage dealt increases proportional to the caster's Defense.
  - Resource: fightingSpirit; base gain 30; required/spent 0.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.3<br>!pow: 0.9<br>70% self Defense (0.7 * Defense)<br>

- [ ] **S3 — Fury's Advent** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: By discharging Fighting Spirit, grants indomitable for 3 turns and recovers Health proportional to max Health before granting an extra turn. At the start of the first battle, gains 50 Fighting Spirit. When attacked, gains 10 Fighting Spirit.
  - Resource: fightingSpirit; base gain 0; required/spent 100.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 50% self max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 50% self max Health
  - Soulburn (20 souls): Amount of Health recovered is doubled.

### Crescent Moon Rin (c2054)

- [ ] **S1 — Heckle** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a ring, with a 40% chance to --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Eyecatcher** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a lavish dance and steals two buffs, granting their effects to all allies, before --stunning-- the target for 1 turn. When the target had no prior buffs, decreases cooldown of this skill by 1 turn.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.1<br>!pow: 1<br>

- [ ] **S3 — Curtain Call** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Attacks the enemy by crossing her rings and dispels all buffs from the target, before granting increased Critical Hit Damage to all allies for 2 turns. A critical hit will grant an extra turn.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.6<br>!pow: 1<br>

### Crimson Armin (c2008)

- [ ] **S1 — Takedown** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a large shield, with a 100% chance to inflict --provoke-- for 1 turn. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.8<br>!pow: 1<br>60% self Defense (0.6 * Defense)<br>

- [ ] **S2 — Security State** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: When an ally is attacked, grants 20% damage reduction.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a
  - EE 1: With Security's State's effect, increases damage reduction by 10%.

- [ ] **S3 — Shield of Holy Spirit** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Covers all allies with an aura of holy spirit, granting immunity for 2 turns and invincibility for 1 turn.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>EE Heal: 20% caster's max Health <br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; EE Heal: 20% caster's max Health 
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.
  - EE 2: Extends duration of immunity granted by Shield of Holy Spirit by 1 turn.
  - EE 3: Recovers Health of all allies proportional to the caster's max Health when using Shield of Holy Spirit.

### Crozet (c1036)

- [ ] **S1 — Rush** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with a sword, with a 75% chance to --decrease Attack-- for 1 turn. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.6<br>!pow: 1.05<br>70% self Defense (0.7 * Defense)<br>

- [ ] **S2 — Mark of Protection** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: After an ally is attacked, when the ally’s Health is 50% or less, grants a barrier (proportional to the target’s max Health) and increased Defense to the target for 2 turns.
  - Source multiplier text (requires review): Skill2<br>Barrier strength: 15% target max Health<br>
  - Unparsed formula lines: Barrier strength: 15% target max Health

- [ ] **S3 — Breakthrough** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with a swordstorm, decreasing their Combat Readiness by 50%, before a 75% chance to --provoke-- for 1 turn. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.5(0.75 soulburn)<br>!pow: 0.95<br>60% self Defense (0.6 * Defense)<br>
  - Soulburn (10 souls): Increases damage dealt.

### Dark Corvus (c2012)

- [ ] **S1 — Shield Bash** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy with a shield, with a 100% chance to --provoke-- for 1 turn, before recovering the caster's Health. Damage dealt and amount recovered increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7<br>!pow: 1<br>7% self max Health (0.07 * Health)<br>Heals 6% of Self Max HP
  - Unparsed formula lines: Heals 6% of Self Max HP

- [ ] **S2 — Ruin's Advent** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Immune to debuffs which prevent movement. After being attacked, has a 100% chance to decrease skill cooldowns by 1 turn. After suffering a critical hit, has a 100% chance to decrease skill cooldowns by an additional 1 turn.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Devil's Descent** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a lethal hit, and absorbs some of the damage as Health, and when the enemy is defeated, inflicts extinction. When the target is a Hero, ignores damage sharing. Penetrates Defense, and cannot trigger a critical hit or a heavy blow. Damage dealt increases proportional to the caster's max Health. Begins the first battle with full skill cooldown count.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0<br>!pow: 0.95<br>31% self max Health (37.5% soulburn)<br>50% of damage gained as life, penetrates defense
  - Unparsed formula lines: 50% of damage gained as life, penetrates defense
  - Soulburn (10 souls): Increases damage dealt.

### Death Dealer Ray (c2090)

- [ ] **S1 — Clinical Trial** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy by throwing an experimental drug at them and has a 75% chance to put them to --sleep-- for 1 turn. A successful attack deals additional damage equivalent to 40% of injuries inflicted on the target. This skill does not trigger a Dual Attack.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Anatomical Mutation** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Grants increased Effectiveness and pestilence to all allies for 2 turns and increases Combat Readiness by 20%.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Cloud of Death** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Releases a miasma of fatal poison, dispelling two buffs from all enemies and a 100% chance to inflict --sleep-- for 1 turn and --venom-- for 2 turns. Grants an extra turn.
  - Source multiplier text (requires review): Skill3<br>

### Desert Jewel Basar (c2053)

- [ ] **S1 — Desert Wind** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with wind and has a 35% chance to inflict --stun-- for 1 turn, before recovering Health of all allies proportional to the target’s max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1.2<br>!pow: 1<br>Heal Strength: 9% of Target max Health (18% SB)<br>
  - Unparsed formula lines: Heal Strength: 9% of Target max Health (18% SB)
  - Soulburn (10 souls): Increases the amount recovered.

- [ ] **S2 — Desert Cycle** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When attacked, grants 20% damage reduction. After an enemy uses a skill, when granted a barrier, activates Desert Storm.<br>Desert Storm: Inflicts barrier inversion on all enemies before decreasing Combat Readiness by 20%. Increases Combat Readiness of the caster by 20%.
  - Source multiplier text (requires review): Skill2<br>Shield Inversion<br>36% self Attack and 14.2% target's max Health soulburn.
  - Unparsed formula lines: Shield Inversion; 36% self Attack and 14.2% target's max Health soulburn.

- [ ] **S3 — Bastet Roar** — Non-attack cast supported; remaining effects listed below
  - Current base support: nonAttack. Non-attack cast implemented
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Bastet roars, dispelling all debuffs from all allies and granting immunity for 2 turns before increasing Combat Readiness by 30%.
  - Non-attack source note (no damage formula): Skill3<br>
  - EE 1: When using Bastet Roar, grants indomitable to all allies for 2 turns.

### Designer Lilibet (c2095)

- [ ] **S1 — Slice to Pieces** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with scissors, with a 75% chance to --decrease Defense-- for 1 turn. Damage dealt increases proportional to the caster's Defense.
  - Resource: fightingSpirit; base gain 25; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.6<br>!pow: 1<br>100% self Defense (1 * Defense)<br>
  - Soulburn (10 souls): Increases effect chance to 100% and decreases Defense for 2 turns.

- [ ] **S3 — Model Disqualification** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Decreases debuff durations of all allies by 2 turns and gets on stage to attack all enemies, increasing their skill cooldown by 1 turn, before increasing Combat Readiness of all allies by 15%. Penetrates the target's Defense by 50%. Damage dealt increases proportional to the caster's Defense.
  - Resource: fightingSpirit; base gain 50; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.6<br>!pow: 1<br>115% self Defense (1.15 * Defense)<br>Penetration: 50%
  - Unparsed formula lines: Penetration: 50%

### Destina (c2022)

- [ ] **S1 — Key to an Oath** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a staff, before recovering Health of the ally with the lowest Health proportional to the caster’s max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Heal strength: 8% self max Health<br>Heal strength: 35% self max Health (Soulburn)
  - Unparsed formula lines: Heal strength: 8% self max Health; Heal strength: 35% self max Health (Soulburn)
  - Soulburn (20 souls): After attacking, greatly heals all allies. Does not trigger a Dual Attack.
  - EE 1: Dispels one debuff from the ally with the lowest Health when using Key to an Oath.

- [ ] **S2 — Regen** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Blesses an ally, dispelling two debuffs and recovering Health proportional to the caster’s max Health before increasing Combat Readiness by 30%.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 16% self max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 16% self max Health
  - EE 2: Has a 30% chance to reset skill cooldown of Regen when using Regen.
  - EE 3: Increases Combat Readiness of the target by an additional 20% when using Regen.

- [ ] **S3 — Destina's Grace** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Through the benediction of a Spirit Lord, revives all dead allies to 30% Health. For allies that are not dead, dispels all debuffs before recovering Health proportional to the caster's max Health. At the start of the first battle, grants Spirit's Blessing to the caster for 3 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 30% self max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 30% self max Health

### Diene (c1076)

- [ ] **S2 — Blessings of the Goddess** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: With the Blessings of the Goddess, grants increased Attack and a barrier (proportional to the target’s max Health) to all allies for 2 turn before increasing Combat Readiness by 15%.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Barrier strength: 20% target max Health (30% Molagora)<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Barrier strength: 20% target max Health (30% Molagora)
  - EE 1: Increases Combat Readiness of the ally with the highest Attack by 5% when using Ligh of Judgment. When the caster has a buff, the effect is doubled.
  - EE 2: Dispels two debuffs from all allies when using Blessings of the Goddess.

- [ ] **S3 — Saint's Prayer** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Through a miracle of the Goddess, dispels all debuffs from all allies before granting increased Defense and increased Penetration Resistance for 3 turns, and increases Combat Readiness of the caster by 50%.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>EE Heal strength: 30% target's max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; EE Heal strength: 30% target's max Health
  - Soulburn (20 souls): All skill cooldowns decreased by 2 turns.
  - EE 3: Recovers Health of all allies proportional to the target’s max Health when using Saint's Prayer.

### Dingo (c1021)

- [ ] **S1 — Prep Ingredients** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a cleaver, with a 50% chance to inflict --bleeding-- for 2 turns. Has a 30% chance to activate Quick Grill as an extra attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Heal strength: 20% of damage done<br>
  - Unparsed formula lines: Heal strength: 20% of damage done
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Quick Grill** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies with the Glove Oven, before absorbing some of the damage dealt as Health. When the enemy is inflicted with --bleed--, has a 100% chance to inflict --burn-- for 2 turns.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.8<br>!pow: 1<br>

- [ ] **S3 — Free Dinner** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Provides all allies with a meal, dispelling all debuffs and increasing Critical Hit Chance for 2 turns before decreasing skill cooldown by 1 turn. Grants an extra turn to the caster. Every time an enemy dies, the cooldown for this skill decreases by 1 turn.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

### Disciplinary Prefect Aria (c2129)

- [ ] **S1 — Disciplinary Warning** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy, increasing Combat Readiness of the caster by 15%. When Purge is on cooldown, activates Disciplinary Action as an extra attack. Damage dealt increases proportional to the caster's max Health.<br>Disciplinary Action: Attacks the enemy, inflicting up to 10% injuries. A successful attack always results in a critical hit. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.5<br>!pow: 1<br>Max Health scaling 5% caster's max Health<br><br><br>Skill1(Proc)<br>att_rate: 0.75<br>!pow: 1<br>Max Health scaling 18% caster's max Health<br>
  - Unparsed formula lines: Skill1(Proc); att_rate: 0.75; !pow: 1; Max Health scaling 18% caster's max Health

- [ ] **S2 — Unwavering Execution** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Soulburn consumption of the enemy by 100%. At the start of the first battle, increases Effect Resistance proportional to max Health. The rate of the Effect Resistance increase effect does not change after it is activated. When the caster is not inflicted with a debuff, increases Effect Resistance of all allies by 40%.
  - Source multiplier text (requires review): Skill2<br>Health to Eff Res ratio: 0.000065 x max Health<br>
  - Unparsed formula lines: Health to Eff Res ratio: 0.000065 x max Health

- [ ] **S3 — Purge** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: Damage bonus implemented; additional effect pending
  - Description: Attacks the enemy with a merciless iron fist, granting a barrier to all allies for 2 turns before increasing Defense penetration of this skill by 35%. Penetration increase can stack up to 2 times. A successful attack always results in a critical hit. Damage dealt and barrier strength increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1 (1.24 Soulburn)<br>!pow: 1<br>Max Health scaling 17% (22.5% Soulburn) caster's max Health<br>Barrier strength: 15% caster's max Health
  - Unparsed formula lines: Barrier strength: 15% caster's max Health
  - Soulburn (10 souls): Increases damage dealt and decreases cooldown of this skill by 1 turn.
  - EE 1: Increases damage dealt by Purge by 10%, and removes 20 Soul from the enemy.

### Dizzy (c1094)

- [ ] **S3 — Emotional Gamma Ray** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Unleashes a giant explosion to attack all enemies. The attack misses, but inflicts --decreased Speed--, --decreased Attack--, and --decreased Hit Chance-- on all enemies for 2 turns regardless of whether the attack hits.
  - Source multiplier text (requires review): Skill3<br>att_rate: 2.5<br>!pow: 1<br>always 'misses' (0.75 modifier, no crit chance)<br>
  - Unparsed formula lines: always 'misses' (0.75 modifier, no crit chance)
  - Soulburn (20 souls): Grants an extra turn.

### Doll Maker Pearlhorizon (c4073)

- [ ] **S1 — Chaos Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Claws the enemy, with a 50% chance to --decrease hit Chance-- for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Hypnosis** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies, with a 50% chance to put them to --sleep-- for 1 turn. Increases Combat Readiness of the caster by 10% per --sleep-- debuff inflicted.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Endless Nightmare** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy and --stuns-- them for 1 turn. When the enemy is --asleep--, --decrease Defense-- for 2 turns and deals additional damage equivalent to 30% of the target's max Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (20 souls): Ignores Effect Resistance.

### Dominiel (c1037)

- [ ] **S1 — Hail** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy by hurling ice fragments, with a 40% chance to inflict --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance by 60%.

- [ ] **S2 — Nixied's Grace** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When an ally suffers a critical hit, has a 35% chance to activate Blizzard Cape.<br>Blizzard Cape: Using frost magic, grants a barrier (proportional to the target’s max Health) and reflect to all allies for 2 turns.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Barrier strength: 25% target Max health<br>Reflects 30% of damage taken
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Barrier strength: 25% target Max health; Reflects 30% of damage taken

- [ ] **S3 — Ice Spear** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with a large block of ice, with a 90% chance to --stun-- for 1 turn and a 100% chance to decrease Combat Readiness by 15%. Increases Speed of the caster for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.75<br>!pow: 0.95<br>

### Doris (c3044)

- [ ] **S1 — Mana Bullet** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with light energy, before a 75% chance to --decrease Hit Chance-- for 1 turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Celebration of Light** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Recites the Celebration of Light, recovering the Health of all allies and granting continuous healing and increased Defense for 2 turns. Amount recovered is proportional to the target's max Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

- [ ] **S3 — Light Curtain** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Description: Recovers an ally's Health and increases their Combat Readiness by 50% with light magic. Amount recovered is proportional to the target's max Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Dragon Bride Senya (c2106)

- [ ] **S1 — One Step** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Approaches and attacks the enemy with a spear, and increases Speed of the caster for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.7<br>!pow: 0.9<br>Max Health scaling 10% (0.10 * self Max Health)<br>

- [ ] **S2 — Bride's Resolve** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases max Health by 10%. When Health of the ally in the back row except for the caster is 50% or less after being attacked, dispels all debuffs from the caster and the ally in the back row, and activates Bridal Prayer.<br>Bridal Prayer (Gains 10 Soul): Grants a barrier (proportional to the caster’s max Health) to the caster and the ally in the back row for 3 turns, and grants Oath of Punishment to the caster for 3 turns before resetting skill cooldowns of the caster.
  - Source multiplier text (requires review): Skill2<br>Barrier strength: 30% caster's max Health<br>
  - Unparsed formula lines: Barrier strength: 30% caster's max Health

- [ ] **S3 — Overcoming Hardship** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy by piercing them, and increases Combat Readiness of the caster and the ally in the back row by 30%. Penetrates Defense, but cannot trigger a critical hit or a heavy blow. Damage dealt increases proportional to the caster's max Health. When the caster is granted Oath of Punishment, attacks all enemies.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.3<br>!pow: 0.9<br>Max Health scaling 11% (0.11 * self Max Health)<br>Penetration 100%
  - Unparsed formula lines: Penetration 100%
  - Soulburn (10 souls): Increases damage dealt.

### Dragon King Sharun (c2132)

- [ ] **S1 — Turtle Flipping** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy, with a 40% chance to --stun-- for 1 turn. After attacking, when the target is --stunned--, increases Combat Readiness of the ally with the highest Attack except for the caster by 20%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Lullaby for Waves** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the end of someone's turn, when an ally is inflicted with a debuff which prevents movement, grants cascade to all allies and dispels all debuffs which prevent movement, before increasing Combat Readiness of the caster by 40%. Can only be activated once per turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Is It Going to Rain?** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies with the power of the divine Dragon, decreasing buff durations by 2 turns before a 100% chance to inflict --cannot buff-- and --class debuff-- for 2 turns and decrease Combat Readiness by 20%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1.05<br>

### Eaton (c3094)

- [ ] **S1 — Come Here** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Strongly knees the enemy to attack, with a 75% chance each to --provoke-- for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.2<br>!pow: 1<br>5% self max Health (0.05 * Health)<br>
  - Soulburn (20 souls): Attacks all enemies.

- [ ] **S2 — I Protect** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Receives 30% of damage taken by an ally in their place. Only the highest damage distribution effect will be applied. Increases max Health by 20%.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — I'm Tough** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Releases strong energy, dispelling all debuffs inflicted on the caster before granting a barrier and immunity for 2 turns. Barrier strength increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>Barrier strength: 25%-36.1% self Max Health<br>
  - Unparsed formula lines: Barrier strength: 25%-36.1% self Max Health

### Eda (c1111)

- [ ] **S2 — Cold Snap** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with an explosion of ice, dispelling two buffs before decreasing Combat Readiness by a random amount between 15% and 40%. Grants the caster skill nullifier once.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.9<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S3 — Absolute Zero** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies by unleashing power, with a 85% chance to inflict --stun-- for 1 turn, and increases Combat Readiness of all allies by 20%. When this skill is not on cooldown, if an ally uses a non-attack skill, increases Combat Readiness of the caster by 20%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.05<br>!pow: 1.1<br>

### Edward Elric (c1134)

- [ ] **S1 — I'll Take You On!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a transmuted blade, and grants a barrier to the caster for 1 turn. Damage dealt and barrier strength increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>10% self max Health (0.10* Health)<br>Barrier Strength: 8% of Self Max HP
  - Unparsed formula lines: Barrier Strength: 8% of Self Max HP

- [ ] **S2 — Equivalent Exchange** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: After being attacked, when the caster has a debuff, dispels one debuff and activates Rise!. Rise! can only be activated once per turn.<br>Rise!: Attacks all enemies with ground thorns, dispelling one buff and inflicting a --random debuff-- for 2 turns, before increasing Combat Readiness by 20%. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2Proc<br>att_rate: 0.7<br>!pow: 1<br>8% self max Health (0.08* Health)<br>
  - Unparsed formula lines: Skill2Proc

- [ ] **S3 — I'll Show You Our Difference!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy together with Alphonse, and increase Combat Readiness by 50%. When the enemy is not an Elite or Boss monster, damage sharing effects are ignored. Damage dealt increases proprotional to the caster's max Health. Damage dealt increases every time this skill is used and can stack up to 3 times.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.2<br>!pow: 1<br>25% self max Health (0.25* Health)<br>20% increased damage per usage
  - Unparsed formula lines: 20% increased damage per usage
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Elena (c1091)

- [ ] **S1 — Starlight's Will** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks with the power of the stars, dispelling one debuff each from two allies.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Dispels all debuffs from all allies.

- [ ] **S2 — Guardian's Authority** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: When an ally suffers an attack that targets all allies, grants 30% damage reduction and activates Consecrated Ground.<br>Consecrated Ground: Recovers Health of all allies proportional to the caster’s max Health before increasing Combat Readiness of the caster by 30%.
  - Source multiplier text (requires review): Skill2<br>Consecrated Ground heals for 20% of Self max health<br>
  - Unparsed formula lines: Consecrated Ground heals for 20% of Self max health
  - EE 1: With Consecrated Ground's effect, increases Combat Readiness of the caster by an additional 5%.
  - EE 2: Dispels one debuff from all allies when using Consecrated Ground. (This effect is applied before healing)

- [ ] **S3 — Eternally Shining Comet** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with a meteor shower, and dispels one debuff from all allies before granting invincibility for 1 turn and increased Effect Resistance for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.9<br>!pow: 1<br>

### Eligos (c1142)

- [ ] **S1 — Point-Blank Shot** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy by dashing towards them. When the caster is granted increased Attack (Greater), triggers a Dual Attack from the ally with the highest Attack. Damage deait increases proportional to the caster's Speed.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.85<br>!pow: 0.9<br>0.075% self Speed (0.00075 * Speed)<br>
  - EE 1: Increases Combat Readiness of the caster by 15% when using Point-Blank Shot.

- [ ] **S2 — The Cleaner** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: Damage bonus implemented; additional effect pending
  - Description: Hit Chance and Critical Hit Damage increases by 50%. When an ally except for the caster defeats an enemy, activates Time Bomb against the enemy with the lowest Health. Can only be activated once every 2 turns.<br>Time Bomb: After granting increased Attack (Greater) to the caster for 2 turns, attacks the enemy with a bomb. Damage dealt increases proportional to the caster's Speed.
  - Source multiplier text (requires review): Skill2Proc<br>att_rate: 1.4<br>!pow: 1.3<br>0.15% self Speed (0.0015 * Speed)<br>
  - Unparsed formula lines: Skill2Proc
  - EE 2: At the start of the first battle, grants stealth to the caster for 2 turn.
  - EE 3: Increases damage dealt by Time Bomb by 10% and attacks the enemy with the highest Attack.

- [ ] **S3 — Cloak and Trigger** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Inflicts resource reduction on the target by 60%, before attacking the enemy with a pistol, dispelling two buffs before inflicting --target-- and --decreased Defense-- for 2 turns and decreasing Combat Readiness by 50%. Increases Combat Readiness of the caster by 50%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.2<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Elphelt (c1105)

- [ ] **S2 — Judge Better Half** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After trapping the target in a cake, attacks the enemy with a cutting knife, and grants increased Attack to all allies for 2 turns. When the target is inflicted with --sleep--, inflicts --decreased Defense-- on all enemies for 2 turns. Damage dealt increases proportional to the number of debuffs inflicted on the target.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.85<br>!pow: 1<br>15% increased damage per debuff on enemy<br>
  - Unparsed formula lines: 15% increased damage per debuff on enemy

- [ ] **S3 — Magnum Wedding** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Dispels two buffs from the enemy before shooting a bullet of love, with a 100% chance each to inflict --sleep-- and --decreased Defense-- for 2 turns. Grants an extra turn.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.1<br>!pow: 1.1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Elson (c3054)

- [ ] **S1 — Heavy Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy, with a 75% chance to --decrease Attack-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.9<br>!pow: 1<br>

- [ ] **S2 — Meteor Shower** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Description: Attacks all enemies with Meteor Shower of Light and recovers the Health of all allies. Healing increases proportional to the ally's max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.7<br>!pow: 0.9<br>Heal strength: 15% target max Health<br>
  - Unparsed formula lines: Heal strength: 15% target max Health

- [ ] **S3 — Light's Protection** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Recovers Health and increases Attack and Defense of all allies for 2 turns with strengthening magic. Amount recovered is proportional to the target's max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 10% target max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 10% target max Health
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

### Elvira (c1148)

- [ ] **S1 — Hit and Run** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Swiftly attacks the enemy and has a 75% chance to --provoke-- for 1 turn. When the caster is immortal, increases effect chance by 25%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Blood Mana** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Unmapped/conditional debuff grants
  - Description: Increases Effect Resistance by 50%, and when attacking, cannot trigger a critical hit. Decreases the amount of Fighting Spirit gained by the enemy by 100%. After using a basic skill on the caster's turn, when the caster is immortal, activates Exterminate as an extra attack. Exterminate can only be activated once every 2 turns.<br>Exterminate: Attacks all enemies, dispelling one buff before inflicting --beguile--.
  - Implemented resource passive portions: enemy gain blocking. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): Skill2(Proc)<br>att_rate: 1<br>!pow: 1.3<br>
  - Unparsed formula lines: Skill2(Proc)

- [ ] **S3 — Capturing Sacrifice** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy, dispelling all buffs before making them --unhealable-- amd --decreasing Defense-- for 2 turns, and grants immortality to the caster for 3 turns. Penetrates the target's Defense. When the target is a Hero, damage dealt increases proportional to the target's current Health. This skill is unaffected by cooldown increase and decrease effects.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.2<br>!pow: 1<br>Proportional damage based on target current hp: 16% (0.16 * Target Current Health)<br>Penetration: 100%
  - Unparsed formula lines: Proportional damage based on target current hp: 16% (0.16 * Target Current Health); Penetration: 100%

### Emilia (c1116)

- [ ] **S1 — Huma** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Description: Attacks the enemy with ice, before recovering Health of the ally with the lowest Health proportional to the caster’s max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.95<br>!pow: 1<br>Heal strength: 7% self Max health<br>
  - Unparsed formula lines: Heal strength: 7% self Max health

- [ ] **S2 — Spirit's Blessing** — Non-attack cast supported; remaining effects listed below
  - Current base support: nonAttack. Non-attack cast implemented
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Grants a blessing to an ally except for the caster, dispelling two debuffs and increasing Attack for 2 turns before increasing Combat Readiness by 50%. Increases Combat Readiness of the caster by 25%.
  - Non-attack source note (no damage formula): Skill2<br>Soulburn: 20% self max Health (0.2 * Health)<br>
  - Unparsed formula lines: Soulburn: 20% self max Health (0.2 * Health)
  - Soulburn (10 souls): Recovers Health of an ally proportional to the caster’s max Health.

- [ ] **S3 — Divine Protection of the Great Spirit** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Uses spiritual arts to dispel two debuffs from all allies, before recovering Health and granting a barrier for 2 turns. Amount recovered and barrier strength increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>Heal strength: 15% self Max health<br>Barrier strength: 20% Self Max health
  - Unparsed formula lines: Heal strength: 15% self Max health; Barrier strength: 20% Self Max health

### Empyrean Ilynav (c2113)

- [ ] **S1 — Sword of Punishment** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a sword, absorbing some of the damage dealt as Health, and inflicts up to 10% injuries. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Max Health scaling 10% (0.10 * self Max Health) or 17% with Soulburn<br>Heals for 35% of the damage dealt
  - Unparsed formula lines: Max Health scaling 10% (0.10 * self Max Health) or 17% with Soulburn; Heals for 35% of the damage dealt
  - Soulburn (10 souls): Increases damage dealt and a successful attack deals additional damage equivalent to 50% of injuries inflicted on the target. This attack does not trigger a Dual Attack.

- [ ] **S2 — Dragon's Pride** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Penetration Resistance of all allies by 30%. After every attack suffered by an ally, increases Combat Readiness of the caster by 10%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Unyielding Blow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a spear, inflicting up to 20% injuries, before dispelling two debuffs from all allies and granting indomitable for 2 turns. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>Max Health scaling 18% (0.18 * self Max Health)<br>

### Enott (c3022)

- [ ] **S1 — Smash** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with an axe, with a 50% chance to cause --bleeding-- for 2 turns. Damage dealt increases proportional to the amount of the enemy's lost Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>0.5% increased damage per 1% target Health missing<br>
  - Unparsed formula lines: 0.5% increased damage per 1% target Health missing

- [ ] **S2 — Judgement** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with a sharp blow, with a 75% chance each to --decrease Defense-- and make them --unable to be buffed-- for 2 turns.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.5<br>!pow: 1.05<br>

- [ ] **S3 — Prepare Judgement** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Corrects stance, increasing Attack and Critical Hit Chance of the caster for 2 turns and Combat Readiness by 50%.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

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

### Eternal Wanderer Ludwig (c2069)

- [ ] **S1 — How Trivial** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with mana, before increasing Attack of the caster for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Extends duration of buffs granted by this skill by 1 turn and grants an extra turn.

- [ ] **S2 — Let's Have Some Fun** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with powerful mana, before granting increased Hit Chance for 2 turns and skill nullifier once to the caster.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.6<br>!pow: 1<br>
  - Soulburn (20 souls): Extends duration of buffs granted by this skill by 1 turn and grants an extra turn.

- [ ] **S3 — Can You Handle This?** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Description: Attacks all enemies with the essence of magical engineering. When someone uses a Soulburn, increases Combat Readiness of the caster by 20% and penetration rate of this skill by 30%. Penetration rate increase effect can stack up to 2 times.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1<br>!pow: 1<br>30% Pen for each soulburn (60% max Penetration)<br>
  - Unparsed formula lines: 30% Pen for each soulburn (60% max Penetration)

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

### Ezra (c3157)

- [ ] **S1 — Take This!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a sword, with a 75% chance to --decrease Attack-- for 1 turn. A successful attack deals 1,000 fixed damage for each debuff inflicted on the target at the end of the turn.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Fixed damage 1k per debuff<br>
  - Unparsed formula lines: Fixed damage 1k per debuff
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Slayer's Bond** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When the foremost ally uses a non-attack skill, increase Combat Readiness of the caster by 20%. Can only be activated once every 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Leave Me Alone** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies by wielding a sword, with a 100% chance to make them --unhealable--, --restrict--, and --decrease Hit Chance-- for 2 turns. A successful attack deals 1,500 fixed damage for each debuff inflicted on the target at the end of the turn.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1<br>!pow: 1<br>Fixed damage 1.5k per debuff<br>
  - Unparsed formula lines: Fixed damage 1.5k per debuff

### Fairytale Tenebria (c5050)

- [ ] **S1 — One Pair** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a mystical power, with a 75% chance each to inflict --redirected provoke-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.
  - EE 1: Increases One Pair's chance to --redirected provoke-- by 25%.

- [ ] **S2 — Wild Card** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: When an ally is attacked by an enemy inflicted with --provoke-- or --redirected provoke--, activates Shuffle. Shuffle can only be activated once per turn.<br>Shuffle: Attacks all enemies and inflicts a --random debuff-- for 1 turn. A successful attack against a target inflicted with provoke or redirected provoke inflicts additional damage. Additional damage increases proportional to the target's max Health.
  - Source multiplier text (requires review): Skill2Proc<br>att_rate: 0.8<br>!pow: 1<br>10% enemy max Health (0.10 * Health)<br>
  - Unparsed formula lines: Skill2Proc; 10% enemy max Health (0.10 * Health)

- [ ] **S3 — Tea Party** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Lures all enemies in with a tea party and attacks, dispelling one buff, making them --unable to be buffed-- for 2 turns, and inflicting --redirected provoke-- for 1 turn.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1<br>!pow: 1<br>(EE Option 2) Barrier strength: 25% of the target's max Health.<br>
  - Unparsed formula lines: (EE Option 2) Barrier strength: 25% of the target's max Health.
  - EE 2: Grants a barrier to the ally with the highest max Health for 2 turns when using Tea Party. Barrier strength increases proportional to the target's max Health.
  - EE 3: Dispels one additional buff when using Tea Party.

### Faithless Lidica (c2046)

- [ ] **S2 — Larkspur** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Attacks all enemies by binding them with a sword, with a 100% chance to dispel two buffs and inflict --laceration-- for 2 turns. Grants an extra turn to the caster. This skill cannot trigger a counterattack.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.9<br>!pow: 1<br>

- [ ] **S3 — Hysteria** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy indiscriminately, fully increasing skill cooldowns. Grants skill nullifier once to all allies, and increases Combat Readiness of all allies by 25%. Grants stealth to the caster for 3 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.4<br>!pow: 0.95<br>
  - Soulburn (10 souls): Ignores Effect Resistance.

### Falconer Kluri (c4003)

- [ ] **S2 — Magic Resist** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Recovers 10% Health of the caster at the beginning of every turn.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Fluri, Attack!** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Fluri flies towards the enemy, with a 75% chance to dispel all buffs, before a 100% chance to --provoke-- and --decrease Defense-- the enemy for 2 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a
  - Soulburn (20 souls): Ignores Effect Resistance.

### Fallen Cecilia (c2002)

- [ ] **S1 — Mistake** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a spear of revenge and has a 100% chance to --provoke-- for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.7<br>!pow: 1<br>7% self max Health<br>
  - Soulburn (10 souls): Ignores Effect Resistance.

- [ ] **S2 — Strong Instinct** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Grants 50% additional damage reduction to all allies. At the start of battle, grants a barrier to all allies for 2 turns, and at the end of the turn, grants a barrier to the ally with the lowest Health for 2 turns. Barrier strength increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2<br>Barrier Strength: 10-15% self Max Health (based on mola)<br>
  - Unparsed formula lines: Barrier Strength: 10-15% self Max Health (based on mola)

- [ ] **S3 — Spear of Resentment** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies in an explosion of spiteful emotions and dispels all buffs before transferring all debuffs inflicted on the caster. Grants skill nullifier once to all allies. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.65<br>!pow: 0.95<br>12% self max Health<br>

### Fenne (c1170)

- [ ] **S1 — Intense Welcome** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After consuming 15% of the caster's current Health and inflicting injuries proportional to the consumption on the caster, attacks the enemy, recovering Health of all allies. When it is the caster's turn, if the caster is enraged, activates Embrace as an extra attack. Amount recovered increases proportional to the caster's max Health and Attack.<br>Embrace: Attacks the enemy, and grants immunity to the caster for 1 turn. Damage dealt increases proportional to the caster's injuries.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1.5<br>!pow: 1<br>Heal strength: 3% caster's max Health, 30% caster's Attack<br>Soulburn Heal strength: 8% caster's max Health, 75% caster's Attack<br><br>Skill1(Proc)<br>att_rate: 0.7<br>!pow: 1<br>Injury scaling rate: 1<br>
  - Unparsed formula lines: Heal strength: 3% caster's max Health, 30% caster's Attack; Soulburn Heal strength: 8% caster's max Health, 75% caster's Attack; Skill1(Proc); att_rate: 0.7; !pow: 1; Injury scaling rate: 1
  - Soulburn (10 souls): Increases the amount recovered.

- [ ] **S2 — Love=Pain** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Critical Hit Chance by 30%. Attack and Speed increase proportional to the caster's injuries ratio. Upon receiving lethal damage, revives with 50% Health and grants a barrier to the caster for 2 turns. Barrier strength increases proportional to the caster's Attack. Can only be activated once per battle.
  - Source multiplier text (requires review): Skill2<br>Barrier strength: 250% caster's Attack<br>Attack increase: CASTER_ATT * ( INJURY_RATE * 3 )<br>Speed increase: CASTER_SPEED * ( INJURY_RATE * 1 )
  - Unparsed formula lines: Barrier strength: 250% caster's Attack; Attack increase: CASTER_ATT * ( INJURY_RATE * 3 ); Speed increase: CASTER_SPEED * ( INJURY_RATE * 1 )

- [ ] **S3 — Love Bite** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After consuming 15% of the caster's current Health and inflicting injuries proportional to the consumption on the caster, attacks the enemy, absorbing some of the damage dealt as Health. The caster becomes enraged for 2 turns. Damage dealt increases proportional to the caster's injuries inflicted.
  - Source multiplier text (requires review): Skill3<br>att_rate: 2<br>!pow: 1<br>Injury scaling rate: 1.50<br>Lifesteal: 25% of the damage dealt
  - Unparsed formula lines: Injury scaling rate: 1.50; Lifesteal: 25% of the damage dealt

### Fenris (c1158)

- [ ] **S1 — Magic Arrow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a magic arrow, and increases Speed for 1 turn.
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

- [ ] **S3 — Strike of Fate** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After granting increased Attack (Greater) of the caster for 3 turns, attacks the enemy with an arrow of resolution, and increases Combat Readiness of all allies by 30%. When the enemy's max Health is greater than the caster's max Health, damage dealt increases proportionally, up to 70%.
  - Resource: fightingSpirit; base gain 0; required/spent 75.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.3<br>!pow: 1<br>Damage increase (max 70%): DIFFERENCE_IN_MAX_HP * 0.00005<br>14000 (14k) health diff for 70% damage increase
  - Unparsed formula lines: Damage increase (max 70%): DIFFERENCE_IN_MAX_HP * 0.00005; 14000 (14k) health diff for 70% damage increase

### Fern (c1173)

- [ ] **S1 — The Spell to Kill Demons** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After granting increased Attack to the caster for 1 turn, attacks the enemy with magic. When Focus is 3 or higher, decreases skill cooldowns by 1 turn. Damage dealt increases proportional to the caster's Speed.
  - Resource: focus; base gain 0; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.9<br>!pow: 0.9<br>0.075% self Speed (0.00075 * Speed)<br>
  - Soulburn (10 souls): Attacks all enemies. This attack does not trigger a Dual Attack or counterattack.

- [ ] **S2 — Exceptional Magical Talent** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Description: At the start of the first battle, gains 3 Focus. Increases Speed by 15% and Evasion by 20% for each Focus. When successfully evading, consumes 1 Focus and decreases skill cooldowns by 1 turn.
  - Resource: focus; base gain 0; required/spent 0.
  - Implemented resource passive portions: battle-start grant. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — The Spell to Kill Demons - Release** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After granting increased Attack to the caster for 1 turn, attacks the enemy with The Spell to Kill Demons. Penetrates the enemy's Defense by 70%. Damage dealt increases proportional to the caster's Speed. Begins the first battle with a full skill cooldown count.
  - Resource: focus; base gain 1; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.35<br>!pow: 0.95<br>0.15% self Speed (0.0015 * Speed)<br>70% Penetration 
  - Unparsed formula lines: 70% Penetration 

### Festive Eda (c5111)

- [ ] **S1 — I'm Embarrassed** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with bubbles, with a 40% chance to --stun-- for 1 turn. When the caster is stealthed, increases effect chance by 25%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — It's Okay, It Won't Show** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: At the start of battle and at the end of the turn, grants stealth for 1 turn. At the start of the turn, when not stealthed, dispels all debuffs and grants Shyness for 1 turn. Effects at the start of the turn can only be activated once every 4 turns. After attacking, when granted Shyness activates Expected Outcome.<br>Expected Outcome: Attacks all enemies, decreasing Combat Readiness by 50% and inflicting additional damage proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2(Proc)<br>att_rate: 1<br>!pow: 1<br>Additional damage: 40% caster's max Health (70% def penetration)<br>
  - Unparsed formula lines: Skill2(Proc); Additional damage: 40% caster's max Health (70% def penetration)

- [ ] **S3 — Let Me Give It a Try** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies by collecting bubbles, dispelling two buffs before a 85% chance to inflict --decreased Defense-- for 2 turns and a 100% inflict --silence-- for 1 turn.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.9<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance

### Fighter Maya (c2032)

- [ ] **S1 — Strike of Provocation** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks with a blunt weapon, with a 75% chance to --provoke-- for 1 turn. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.5<br>!pow: 1<br>75% self Defense (0.75 * Defense)<br>
  - Soulburn (10 souls): --Provoke-- chance increases to 100%.

- [ ] **S2 — Reclaim** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: After being attacked, has a 100% chance to dispel one debuff and grant increased Defense for 2 turns.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Finishing Attack** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Attacks the target with a powerful smash, and when the target’s Health is 30% or less, increases damage dealt by 300%. Damage dealt increases proportional to the caster’s Defense. When an enemy is defeated, grants an extra turn.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1 (1.7 soulburn)<br>!pow: 1<br>150% self Defense (1.5 * Defense)<br>

### Flan (c1110)

- [ ] **S1 — Communication Breakdown** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a gun, with a 75% chance to inflict --decreased Defense-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - EE 1: Increases Communication Breakdown's --decrease Defense-- effect chance by 10%.

- [ ] **S2 — Data Monopoly** — Non-attack cast supported; remaining effects listed below
  - Current base support: nonAttack. Non-attack cast implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Encourages an ally, granting increased Attack and increased Critical Hit Damage to the ally for 2 turns before increasing Combat Readiness by 40%.
  - Non-attack source note (no damage formula): Skill2<br>
  - EE 2: Increases Combat Readiness by an additional 10% when using Data Monopoly.

- [ ] **S3 — Advantageous Deal** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Drives a hard bargain against all enemies, increasing skill cooldown of all enemies by 1 turn and inflicting --decreasing Defense-- for 2 turns before decreasing Combat Readiness by 15%.
  - Source multiplier text (requires review): Skill3<br>
  - Soulburn (20 souls): Grants an extra turn.
  - EE 3: Decreases Combat Readiness by an additional 5% when using Advantageous Deal.

### Free Spirit Tieria (c3026)

- [ ] **S1 — Half Slash** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with an axe, with a 50% chance to --decrease Attack-- for 2 turns. Damage dealt increases proportional to the target's max Health. 
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>3% enemy max Health (0.03 * Health)<br>
  - Unparsed formula lines: 3% enemy max Health (0.03 * Health)
  - EE 1: When the target is a Dark elemental Hero, decreases cooldown of Energy Wave by 1 turn when using Half Slash.

- [ ] **S2 — Energy Wave** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies with condensed energy, and absorbs some of the damage dealt as Health. Resets this skill's cooldown when an enemy is defeated. 
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.1<br>!pow: 1<br>Heals for 20% of damage done<br>
  - Unparsed formula lines: Heals for 20% of damage done
  - EE 2: Dispels one buff from the target when using Energy Wave.
  - EE 3: Grants immunity to all allies except for the caster for 1 turn when using Energy Wave.

- [ ] **S3 — Pursuit Cut** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Dashes towards the enemy to attack, and --decreases Defense-- for 2 turns. A critical hit will grant immunity to the caster for 2 turns. Damage dealt increases proportional to the target's max Health. 
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.6(2.3 soulburn)<br>!pow: 0.9<br>4% enemy max Health (0.04 * Health)<br>
  - Unparsed formula lines: 4% enemy max Health (0.04 * Health)
  - Soulburn (10 souls): Increases damage dealt.

### Frida (c1163)

- [ ] **S1 — Tube Throw** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy by throwing a tube, and increases Combat Readiness of the ally with the highest Combat Readiness except for the caster by 15%.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Barrier strength: 20% caster's max Health<br>
  - Unparsed formula lines: Barrier strength: 20% caster's max Health
  - Soulburn (20 souls): Uses Aqua Ride instead of Tube Throw.<br>Aqua Ride: Dispels one debuff from all allies and grants a barrier (proportional to the caster's max Health)  for 2 turns.

- [ ] **S2 — Invitation to a Fantasy** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of the first battle, grants Oasis All-Ride Pass to the caster and the foremost ally. When an ally uses a Soulburn, increases Combat Readiness of the caster by 20%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Oasis Land, Grand Opening!** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Dispels one debuff from all allies before increasing Combat Readiness by 25% and granting increased Attack and ignore sharing for 3 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

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

- [ ] **S3 — Judradjim** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After granting increased Attack to the caster for 3 turns, attacks all enemies with lightning magic, dispelling all buffs. Increases Combat Readiness of the caster by 50%. Penetrates the target's Defense by 50%.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.95<br>!pow: 1<br>50% Penetration<br>
  - Unparsed formula lines: 50% Penetration

### Fumyr (c1147)

- [ ] **S1 — Substratal Experimentation** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with an elemental reaction, and increases Combat Readiness of the ally with the highest Combat Readiness except for the caster by 15%.
  - Resource: focus; base gain 0; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.9<br>!pow: 1<br>
  - EE 1: Increases Combat Readiness by an additional 5% when using Subtratal Experimentation.

- [ ] **S2 — Elemental Inquiry** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: At the start of battle, gains 1 Focus for each ally's element. At the start of the turn, gains 1 Focus, and after attacking, when Focus is full, consumes all, activating Fruit of Knowledge.<br>Fruit of Knowledge: Dispels all buffs from all enemies, and has a 100% chance to put them to --sleep-- for 2 turns, before a 85% chance to --decrease Defense-- for 2 turns.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - EE 2: Increases Fruit of Knowledge's chance to --decrease Defense-- by 15%.

- [ ] **S3 — Sensory Dissection** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy with an illusion, dispelling two buffs before increasing skill cooldowns by 1 turn and decreasing Combat Readiness by 40%. Inflicts 2,000 additional damage for each Focus.
  - Resource: focus; base gain 0; required/spent 0.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.
  - EE 3: Unaffected by elemental disadvantage when using Sensory Dissection.

### Furious (c1087)

- [ ] **S1 — Quickdraw** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Fires a gun while dashing towards the enemy, with a 35% chance to --burn-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - EE 1: Increases Quickdraw's --burn-- effect chance by 25%.

- [ ] **S2 — Morale Boost** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Raises morale of all allies, granting increased Critical Hit Chance for 2 turns, before granting an extra turn to the caster.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Fatal Bullet** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy with a fatal shot, with a 100% chance to --decrease Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.65(1.95 soulburn)<br>!pow: 1<br>
  - Soulburn (10 souls): Increases damage dealt.
  - EE 2: --Restricts-- the target for 2 turns when using Fatal Bullet.
  - EE 3: Has a 75% chance to --decrease Hit Chance-- of the target for 2 turns when using Fatal Bullet.

### General Purrgis (c2035)

- [ ] **S1 — Heroic Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a great sword, with a 100% chance to inflict --provoke-- for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>6% self max Health (0.06 * Health)<br>

- [ ] **S2 — Spearhead** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: After being attacked, increases Combat Readiness of all allies by 15%.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a
  - EE 1: Recovers Health of the caster proportional to max Health when using Heroic Strike.
  - EE 2: With Spearhead's effect, increases Combat Readiness by an additional 3%.

- [ ] **S3 — Command to Charge** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies by giving the order to charge, and has a 100% chance to inflict --stun-- for 1 turn, before granting increased Attack to all allies for 2 turns. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.8<br>!pow: 1<br>8% self max Health (0.08 * Health)<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Genesis Ras (c2001)

- [ ] **S2 — Chains of Binding** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: After inflicting --seal-- and --collapse-- on the enemy for 2 turns, attacks the enemy. A critical hit will grant an extra turn. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.9<br>!pow: 1<br>Health scaling: 7% caster's max Health<br>
  - Soulburn (10 souls): Ignores Effect Resistance.

- [ ] **S3 — Goddess's Judgement** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with divinity and penetrates the target's Defense. Damage dealt increases proportional to the caster's max Health. Damage dealt increases with fewer enemies. At the start of the first battle, grants Sacred Covenant for 5 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.1<br>!pow: 1<br>Health scaling: 5% caster's max Health, Damage increase 70% per missing enemy<br>
  - Unparsed formula lines: Health scaling: 5% caster's max Health, Damage increase 70% per missing enemy

### Glenn (c3103)

- [ ] **S1 — Quick Fire** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Rapidly shoots the enemy, with a 50% chance to --decrease Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Precise Attack** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Fires a missile at the enemy, and when the enemy is defeated, inflicts extinction and grants torrent to the caster. Increases Hit Chance of this skill by 50%.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.5(2.2 soulburn)<br>!pow: 0.9<br>
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — Focused Fire** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Using an enhancement cube, grants the caster increased Attack (Greater) and increased Hit Chancefor 2 turns. Grants an extra turn.
  - Source multiplier text (requires review): Skill3<br>

### Gloomyrain (c3074)

- [ ] **S2 — Ill Will** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Attack by 40% and Speed by 30% when the caster is debuffed. Grants immunity to --stun--, --sleep--, and --provoke--.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>25% atk up -> 40% atk up with max molagora<br>10% speed up -> 30% speed up with max molagora
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; 25% atk up -> 40% atk up with max molagora; 10% speed up -> 30% speed up with max molagora

- [ ] **S3 — Soul Destruction** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with magic, with a 100% chance to transfer all debuffs inflicted on the caster, and dispels all debuffs from the caster.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.7(0.95 soulburn)<br>!pow: 1<br>^ in game tooltip scaling is wrong, not me
  - Unparsed formula lines: ^ in game tooltip scaling is wrong, not me
  - Soulburn (20 souls): Increases damage dealt.

### Godmother (c3101)

- [ ] **S1 — Gunshot** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Shoots the enemy with a pistol, with a 50% chance to --target-- them for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Rocket Launcher** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with a powerful missile, before a 100% chance each to --decreases Hit Chance-- and --Attack-- for 1 turn.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.65<br>!pow: 0.95<br>

- [ ] **S3 — Enhance Maneuverability** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Utilizes the power of an enhancement cube, granting all allies increased Speed and Effectiveness for 2 turns.
  - Source multiplier text (requires review): Skill3<br>

### Great Chief Khawana (c2086)

- [ ] **S1 — Vertical Cut** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Cuts the enemy, with a 100% chance to --restrict-- for 1 turn. Has a 100% chance to --restrict-- for 2 turns when the target is a Light elemental enemy.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.1 (1.8 Soulburn)<br>!pow: 1<br>
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S2 — Motivation** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Increases Critical Hit Chance by 30%. When an ally is attacked by a Dual Attack, increases Attack of the caster by 25%. Increased Attack effect can stack up to 3 times.
  - Source multiplier text (requires review): Skill2<br>
  - EE 2: When an ally is attacked by a Dual Attack, increases Combat Readiness of the caster by 15%. Can only be activated once per skill.

- [ ] **S3 — Great Chief's Devotion** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: With released power, dispels two debuffs from all allies and grants increased Speed and a barrier (proportional to the caster’s Attack) for 2 turns. Grants an extra turn.
  - Source multiplier text (requires review): Skill3<br>Barrier Strength: 50% of Self Attack<br>
  - Unparsed formula lines: Barrier Strength: 50% of Self Attack
  - EE 3: Increases Great Chief's Devotion's barrier strength by 20%.

### Guard Captain Krau (c5070)

- [ ] **S1 — Crimson Flame** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a mystic blade, and increases Combat Readiness of the caster by 20%. A successful attack deals additional damage proportional to the caster's Defense. Damage dealt increases proportional to the caster's Defense.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7<br>!pow: 1<br>Additional damage: 60% caster's Defense (0.6 * Defense)<br>
  - Unparsed formula lines: Additional damage: 60% caster's Defense (0.6 * Defense)
  - EE 1: With Crimson Flame's effect, increases Combat Readiness by an additional 5%.

- [ ] **S2 — Comet** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy by pushing them away and inflicts --stun-- for 1 turn before decreasing Combat Readiness by 50%. When the caster is granted vigor, ignores Effect Resistance. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.7<br>!pow: 1<br>140% self Defense (1.4 * Defense) <br>
  - EE 2: Makes the target --unable to be buffed-- for 2 turns when using Comet.

- [ ] **S3 — Scorching Flare** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After granting vigor to the caster for 3 turns, attacks all enemies by surrounding the area in flames, and absorbs some of the damage dealt as Health. Increases Combat Readiness of the caster by 50%. Cannot trigger a critical hit, and penetrates the target's Defense. Damage dealt increases proportional to the caster's Defense.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.3 (0.6 Soulburn)<br>!pow: 1<br>50% self Defense (0.5 * Defense) -> Soulburn 145% self Defense (1.45 * Defense)<br>Heal strength: 30% of the damage dealt
  - Unparsed formula lines: 50% self Defense (0.5 * Defense) -> Soulburn 145% self Defense (1.45 * Defense); Heal strength: 30% of the damage dealt
  - Soulburn (10 souls): Increases damage dealt and attacks a single target.

### Guider Aither (c2018)

- [ ] **S1 — Whispering Spirit** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with spirit power, with a 50% chance to --decrease Speed-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Spirit's Protection** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with spirit power, before recovering Health of all allies and granting a barrier for 2 turns. Amount recovered and barrier strength increase proportional to the caster's Attack.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.5<br>!pow: 0.9<br>Barrier strength: 60% self Attack<br>Heal strength: 35% self Attack 
  - Unparsed formula lines: Barrier strength: 60% self Attack; Heal strength: 35% self Attack 
  - EE 1: Increases Spirit Protection's amount recovered by 20%.

- [ ] **S3 — Wave of Force** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Delivers a blow to the enemy with spirit power and dispels all buffs, before increasing Attack of the ally with the highest Attack for 2 turns and increasing Combat Readiness by 50%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.8<br>!pow: 1<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.
  - EE 2: --Stuns-- the enemy for 1 turn when using Wave of Force.
  - EE 3: Increases Attack of all allies for 2 turns when using Wave of Force.

### Gunther (c3024)

- [ ] **S1 — Spirited Blow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with an axe, with a 50% chance to cause --bleeding-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.85<br>

- [ ] **S2 — Veteran** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Attack increases by 75%, and Critical Hit Resistance increases by 70%. When attacking, cannot trigger a critical hit.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Tenacious Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks with an axe, --stunning-- for 1 turn and --decreasing Defense-- for 2 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: 2.2(2.9 soulburn) was 1.7(2.4 soulburn)<br>!pow: 0.95<br>30% increased damage if target is bleeding<br>
  - Unparsed formula lines: att_rate: 2.2(2.9 soulburn) was 1.7(2.4 soulburn); 30% increased damage if target is bleeding
  - Soulburn (10 souls): Increases damage dealt.

### Harsetti (c1153)

- [ ] **S1 — Gambit** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy, with a 75% chance to --decrease Defense-- for 1 turn. When it is the caster's turn, uses En Passant as an extra attack. Damage dealt increases proportional to the caster's max Health.<br>En Passant: Attacks all enemies, with a 60% chance to --decrease Attack-- for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Resource: focus; base gain 1; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.6<br>!pow: 1<br>Max Health scaling 8% (0.08 * self Max Health)<br><br><br>Skill1(Proc)<br>att_rate: 0.5<br>!pow: 1<br>Max Health scaling 11% (0.11 * self Max Health)<br>
  - Unparsed formula lines: Skill1(Proc); att_rate: 0.5; !pow: 1; Max Health scaling 11% (0.11 * self Max Health)
  - Soulburn (10 souls): Effect Chance of Gambit increases to 100%, and --decreases Defense-- for 2 turns.

- [ ] **S2 — The Law of Skuggiheim** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of battle, Speed of the caster is fixed going forward, and Speed of all Heroes except for the caster is limited to a maximum of 90% of the caster's Speed. On the caster's turn, Combat Readiness increase effects of all Heroes is not applied. The Law of Skuggiheim only applies to PvP.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Checkmate** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Description: Attacks all enemies, decreasing buff durations by 2 turns and a 100% chance each to inflict --unable to counterattack-- and --unable to be buffed-- for 2 turns. Penetrates the target's Defense. When Focus is full, consumes it all, increasing damage dealt. Damage dealt increases proportional to the caster's max Health.
  - Resource: focus; base gain 2; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.1<br>!pow: 1<br>Max Health scaling 2% (0.02 * self Max Health)<br>Damage increase if full Focus: 100%
  - Unparsed formula lines: Damage increase if full Focus: 100%

### Haru (c1192)

- [ ] **S1 — Power Anchor** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Attacks the enemy with an anchor, and grants a barrier to all allies for 1 turn. Damage dealt and barrier strength increase portional to the caster's max Health. At the start of the turn, when Focus is full, changes to Power Strike.<br>Power Strike (Consume 5 Focus): Attacks the enemy, and grants an extra turn to the caster. Penetrates the target's Defense. Unaffected by elemental disadvantage. Damage dealt increases proportional to the caster's max Health. The changed attack does not trigger a Dual Attack.
  - Resource: focus; base gain 1; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Anchor Pointer** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Description: At the start of battle, gains 3 Focus, and has a 100% chance to grant indomitable to all allies for 1 turn. At the start of the turn, when the caster has a buff, dispels all debuffs from the caster and resets skill cooldown of Anchor Shot. 
  - Resource: focus; base gain 0; required/spent 0.
  - Implemented resource passive portions: battle-start grant. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Anchor Shot** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with an anchor, absorbing some of the damage dealt as Health, and granting morale to all allies for 2 turns. When the target is granted a barrier, penetrates the target's Defense by 70%. Damage dealt increases proportional to the caster's Max Health. Damage dealt increases every time this skill is used, stacking up to 5 times.
  - Resource: focus; base gain 2; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): Increases Hit Chance by 100% when using this skill.

### Hasol (c3135)

- [ ] **S1 — Swift Cut** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy, before recovering Health of the caster. Additionally inflicts 500 fixed damage regardless of whether the attack hits. Damage dealt and amount recovered increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7<br>!pow: 1<br>5% self max Health (0.05 * Health)<br>Heal Strength: 10% self max hp
  - Unparsed formula lines: Heal Strength: 10% self max hp
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Blade of Vengeance** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When an ally suffers a counterattack, decreases damage suffered by 25%. When more than one damage reduction effect is granted, only the strongest effect is applied. After an enemy counterattacks, increases Combat Readiness of the caster by 25% and increases the fixed damage of Swift Cut and Punishing Strike by 1500. The fixed damage increase can stack up to 5 times.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Punishing Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with a secret skill and additionally inflicts 500 fixed damage regardless of whether the attack hits. Grants increased Defense to all allies for 3 turns, and grants immunity to the caster for 3 turns. Damage dealt increases proportional to the caster's max Health. After suffering a counterattack, decreases skill cooldown by 1 turn.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.7<br>!pow: 1<br>5% self max Health (0.05 * Health)<br>Barrier Strength: 20% of Self Max Health
  - Unparsed formula lines: Barrier Strength: 20% of Self Max Health

### Haste (c1039)

- [ ] **S1 — Envoy's Scythe** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy with an enormous scythe, with a 50% chance to --decrease Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - EE 1: Increases Envoy's Scythe's --decrease Defense-- effect chance by 15%.
  - EE 2: Has a 75% chance to inflict --bleeding-- on the target for 2 turns when using Envoy's Scythe.

- [ ] **S2 — Blood Rend** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a scythe, inflicting --unhealable-- and --vampiric touch-- for 2 turns, and recovers Health of all allies proportional to damage dealt.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.5 (2 soulburn)<br>!pow: 1<br>27% of damage as healing<br>
  - Unparsed formula lines: 27% of damage as healing
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — Vampiric Seal** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies with Envoy's Scythe, dispelling two buffs before a 100% chance each to inflict two --bleeding-- effects for 2 turns. A critical hit has a 85% chance to inflict --decreased Defense-- for 2 turns. When there are three or fewer enemies, damage dealt increases with fewer enemies. This skill cannot trigger a counterattack.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.2<br>!pow: 1<br>150% dmg vs 3 targets, 200% dmg vs 2 targets, 250% dmg vs 1 target<br>
  - Unparsed formula lines: 150% dmg vs 3 targets, 200% dmg vs 2 targets, 250% dmg vs 1 target
  - EE 3: Extends duration of --bleed-- inflicted by Vampiric Seal by 1 turn.

### Hataan (c3091)

- [ ] **S1 — Knee Smash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Smashes the enemy with their knee, with a 80% chance to --decrease Hit Chance-- for 1 turn. Damage dealt increases proportional to the caster's Speed.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.95<br>!pow: 0.95<br>0.075% self Speed (0.00075 * Speed)<br>
  - Soulburn (10 souls): Ignores Effect Resistance.

- [ ] **S2 — Wind Pressure** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy with wind pressure. Activates Wind Pressure again when an enemy is defeated. Damage dealt increases proportional to the caster's Speed.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.3<br>!pow: 0.85<br>0.125% self Speed (0.00125 * Speed)<br>repeat skill is same ratios
  - Unparsed formula lines: repeat skill is same ratios

- [ ] **S3 — Unbeatable Will** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Releases energy to all allies, increasing Attack for 2 turns, before increasing Speed of the caster for 2 turns.
  - Source multiplier text (requires review): Skill3<br>

### Hazel (c3041)

- [ ] **S1 — Book of Fire** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with fire magic, with a 50% chance to make --unhealable-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1.05<br>

- [ ] **S2 — Urgent Regen** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Description: Heals the target proportional to the caster's Attack and the target's max Health, before increasing Combat Readiness of the caster by 15%. Amount recovered is doubled when the target's Health is 50% or less. 
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 30% self Attack + 15% target max Health<br>If Target at <50% Health: 45%, 22%
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 30% self Attack + 15% target max Health; If Target at <50% Health: 45%, 22%

- [ ] **S3 — Attack Command** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Uses strengthening magic to increase Attack of all allies for 2 turns before recovering Health and dispelling one debuff. Amount recovered is proportional to the caster's Attack and the target's max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 30% self Attack + 12% target max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 30% self Attack + 12% target max Health
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

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

### Helen (c3122)

- [ ] **S1 — Blunt Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy before increasing Combat Readiness of a random ally except for the caster by 15%. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.7<br>!pow: 1<br>80% self Defense (0.8 * Defense)<br>
  - Soulburn (10 souls): Combat Readiness increase effect will be applied to all allies.

- [ ] **S2 — Wild Swing** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy before increasing Defense of the caster for 2 turns and recovers Health. Damage dealt increases proportional to the caster's Defense, and amount recovered increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.2<br>!pow: 1<br>100% self Defense (1 * Defense)<br>Heal strength: 13% self max hp
  - Unparsed formula lines: Heal strength: 13% self max hp

- [ ] **S3 — Sword of Grace** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Adopts a counterattacking stance for 3 turns, and grants increased Speed and a barrier to all allies except for the caster for 2 turns. Barrier strength increases proportional to the caster's Defense. After suffering an attack that targets all allies, decreases skill cooldown by 2 turns.
  - Source multiplier text (requires review): Skill3<br>Barrier Strength: 80% of Self Defense<br>
  - Unparsed formula lines: Barrier Strength: 80% of Self Defense

### Helga (c3023)

- [ ] **S1 — Armor Rend** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with an axe, with a 50% chance to --decrease Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Attack Chain** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Strongly slams the enemy with an axe, with a 75% chance to --decrease Defense-- for 2 turns. A critical hit will extend any buffs granted to the caster by 1 turn.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.55<br>!pow: 0.95<br>

- [ ] **S3 — Cry of Victory** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Encourages allies, increasing Attack for 2 turns before increasing Combat Readiness of the caster by 50%.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

### Hellion Lua (c2126)

- [ ] **S1 — Lua Attack** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy and has a 100% chance to --provoke-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Lua Squad** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: After being attacked by a Hero, increases Combat Readiness of all allies by 10% and makes all allies granted with challenge counterattack.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Lua's Challenge** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Grants challenge to all allies, before increasing Defense of the caster for 2 turns. Decreases buff durations of all enemies by 1 turn and has a 100% chance to --provoke-- for 1 turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (20 souls): Ignores Effect Resistance.

### Holiday Yufine (c5016)

- [ ] **S1 — Just One Bite! ♡** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy by tearing up a food market, with a 100% chance to --burn-- for 1 turn. When used on the caster's turn, Just One Bite! ♡ becomes an attack that targets all enemies. Changed attack is unaffected by elemental disadvantage and does not trigger a Dual Attack.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.7<br>!pow: 1<br>

- [ ] **S2 — Let's Eat Together!** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Reduces the effect of decreased Combat Readiness debuffs inflicted on all allies by 50%. This skill effect does not stack with other passive skills of the same name. Increase Evasion by 35%, and when Health is 50% or more, increases Evasion by an additional 35%.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Yufine's ☆ Special** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Dispels two debuffs from all allies and attacks all enemies in the middle of a night market. Increased Attack of all allies for 2 turns and Combat Readiness by 25%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Holy Flame Adin (c4141)

- [ ] **S1 — Ankle Cut** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy with a sword, recovering Health of the ally with the lowest Health. Amount recovered increases proportional to damage dealt.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Defensive Spirit** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: After suffering an attack that targets all allies, when the caster has a debuff, has a 100% chance to counterattack with Fiery Blade Gust. Fiery Blade Gust takes priority over a counterattack with a basic skill. This effect can only be activated once every 2 turns.<br>Fiery Blade Gust: Attacks all enemies with a blade gust, and increases Speed of the caster for 1 turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Explosive Cut** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy repeatedly, --decreasing Speed-- of the target for 2 turns and a 100% chance to --decrease Defense-- of the target for 2 turns. Grants Willful Flame to the caster for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (20 souls): Ignores Effect Reistance.

### Hurado (c3055)

- [ ] **S1 — Staff Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with a staff, with a 50% chance to --silence-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.9<br>

- [ ] **S2 — Dark Magic** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Decreases amount recovered of all enemies by 50%, and increases the caster's Combat Readiness by 20%. When the enemy uses a non-attack skill.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Dark Explosion** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with dark magic, with a 100% chance to --dispel-- all buff before --decreasing Combat Readiness-- by 15%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.9<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.

### Hwayoung (c1128)

- [ ] **S1 — Supersonic Kick** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy with a kick and deals additional damage proportional to the caster's Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.8<br>!pow: 1<br>Additional damage: 35% of caster's Attack as damage, assumed 70% def pen<br><br><br>Skill1 (Soulburn)<br>att_rate: 1.2<br>!pow: 1<br>Additional damage: 70% of caster's Attack as damage, assumed 70% def pen<br>
  - Unparsed formula lines: Additional damage: 35% of caster's Attack as damage, assumed 70% def pen; Skill1 (Soulburn); att_rate: 1.2; !pow: 1; Additional damage: 70% of caster's Attack as damage, assumed 70% def pen
  - Soulburn (10 souls): Grants an extra attack with the same skill.
  - EE 2: Increases Combat Readiness of the caster by 15% when using Supersonic Kick.

- [ ] **S2 — Prairie Hawk** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Evasion by 50%. When attacking, cannot trigger a critical hit or a heavy blow. At the start of the turn, increases Attack for 1 turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Monarch's Flaming Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Dispels all debuffs from the caster, and attacks the enemy with a secret technique before granting immunity and a barrier (proportional to Attack) to the caster for 2 turns. When the caster's Attack is greater than the target's Attack, penetrates Defense proportionally, up to 100%.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.1<br>!pow: 1<br>Penetration: DIFFERENCE_IN_ATK * 0.000213<br>4.695 Attack difference for 100% penetration
  - Unparsed formula lines: Penetration: DIFFERENCE_IN_ATK * 0.000213; 4.695 Attack difference for 100% penetration

### Ian (c3102)

- [ ] **S2 — Combat Support** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Supports all allies using an enhancement cube, granting increased Attack for 2 turns. Grants an extra turn to the caster.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — High-Density Explosive Cube** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with powerful explosives, with a 100% chance to dispel one buff, before a 75% chance to --decrease hit Chance-- for 2 turns. Grants the caster skill nullifier once.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.9(1.15 soulburn)<br>!pow: 1<br>
  - Soulburn (10 souls): Increases damage dealt.

### Ilynav (c1113)

- [ ] **S1 — Rush** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Description: Attacks the enemy with a spear. Damage dealt increases proportional to the caster's max Health. When this skill is used, if it was not triggered by a Dual Attack, has a 50% chance to use Punish instead of Rush. This skill does not trigger a Dual Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7<br>!pow: 1<br>10% self max Health (0.01 Health)<br>
  - Unparsed formula lines: 10% self max Health (0.01 Health)

- [ ] **S2 — Punish** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy by stabbing them, inflicting up to 20% injuries. A successful attack inflicts additional damage equivalent to 50% of injuries inflicted on the target. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1 (1.4 Soulburn)<br>!pow: 1<br>18% self max Health (0.18* Health) (Soulburn: 28% self Max Health  0.28 * Health)<br>
  - Unparsed formula lines: 18% self max Health (0.18* Health) (Soulburn: 28% self Max Health  0.28 * Health)
  - Soulburn (10 souls): Increases damage dealt.
  - EE 1: Decrease cooldown of Punish by 1 turn.

- [ ] **S3 — Repel** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies mercilessly, inflicting up to 20% injuries. Grants increased Critical Hit Damage to all allies for 2 turns, and grants immunity to the caster for 2 turns. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.7<br>!pow: 1<br>15% self max Health (0.15* Health)<br>
  - EE 2: Grants a barrier to the caster for 2 turns when using Repel. Barrier strength increases proportional to the caster's max Health.
  - EE 3: Increase Combat Readiness of the caster by 50% when using Repel.

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

### Inferno Khawazu (c2085)

- [ ] **S1 — Jealous Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with flames, with a 100% chance to --burn-- for 1 turn. When the caster is granted vigor, ignores Effect Resistance
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.95<br>!pow: 1<br>

- [ ] **S2 — Malicus's Power** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: When attacked, damage suffered in one attack does not exceed 51% of max Health. After suffering an attack that targets all allies, dispels all debuffs from the caster and activates Blazing Fury.<br>Blazing Fury: With an outraged cry, grants vigor to the caster for 2 turns, before recovering Health proportional to Attack and increasing Combat Readiness by 30%.
  - Source multiplier text (requires review): Skill2<br>Heal Strength: 60.75% caster's Attack (0.6075 * self Attack<br>
  - Unparsed formula lines: Heal Strength: 60.75% caster's Attack (0.6075 * self Attack
  - EE 1: When activating Blazing Fury, acquires 10 Soul.
  - EE 2: Grants immunity to the caster for 2 turns when using Blazing Fury.

- [ ] **S3 — Flames of Destruction** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy with an inferno, dispelling all buffs before a 100% chance each to inflict two --burn-- effects for 2 turns, and at the end of the turn, detonates --burn-- effects. When the caster is granted vigor, ignores Effect Resistance.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.7<br>!pow: 1<br>Detonation multi: 1.3<br>
  - Unparsed formula lines: Detonation multi: 1.3
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.
  - EE 3: Inflicts one additional --burn-- for 2 turns if granted vigor when using Flames of Destruction.

### Infinite Horizon Achates (c6017)

- [ ] **S1 — Mysterious Design** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a staff, with a 40% chance to --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Unbridled Potential** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: With a mysterious power, dispels two debuffs from an ally except for the caster and grants a barrier (proportional to the caster’s max Health) for 2 turns before increasing Combat Readiness by 40%.
  - Source multiplier text (requires review): Skill2<br>Barrier strength: 18% self caster max Health<br>
  - Unparsed formula lines: Barrier strength: 18% self caster max Health
  - EE 1: Grants stealth to the target for 2 turns when using Unbridled Potential.
  - EE 2: Increases Combat Readiness by an additional 20% when using Unbridled Potential.

- [ ] **S3 — Matter Reconstruction** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Dispels all debuffs from all allies before granting a random buff for 2 turns for each debuff dispelled and recovers Health proportional to the caster’s max Health. When this skill is not on cooldown, at the end of an enemy's turn, increases Combat Readiness of the caster by 20%.
  - Source multiplier text (requires review): Skill3<br>Heal Strength: 20% Caster's max Health (0.2 * max Health)<br>Barrier strength (RNG Buff): 20% self caster max Health
  - Unparsed formula lines: Heal Strength: 20% Caster's max Health (0.2 * max Health); Barrier strength (RNG Buff): 20% self caster max Health
  - EE 3: Increases Matter Reconstruction's amount recovered by 15%.

### Inheritor Amiki (c4158)

- [ ] **S1 — Divine Punishment** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a sword, and has a 75% chance to --provoke-- for 1 turn. Cannot trigger a critical hit, and penetrates the target's Defense by 30%. After attacking, when the caster's Health is 30% or less, grants an extra attack with the same skill.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.6<br>!pow: 1<br>

- [ ] **S2 — Desperate Resolve** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Grants immortality for 1 turn and increased Attack for 2 turns to the caster. Upon receiving lethal damage when the skill is available according to cooldown count, grants the same effects to the caster and fully increases cooldown of this skill.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Strike of Vengeance** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Attacks the enemy with a sword. Cannot trigger a critical hit. A successful attack deals additional damage proportional to the caster's Attack to all enemies. Penetrates the target’s Defense by 30%, and when the caster’s Health is 30% or less, penetrates by 70%. When the caster is immortal, grants an extra turn.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.1<br>!pow: 0.95<br>Additional damage: 60% caster's Attack (0.6 * Attack)<br><br><br>Skill3(soulburn)<br>att_rate: 1.5<br>!pow: 0.95<br>Additional damage: 80% caster's Attack (0.8 * Attack)<br>
  - Unparsed formula lines: Additional damage: 60% caster's Attack (0.6 * Attack); Skill3(soulburn); att_rate: 1.5; !pow: 0.95; Additional damage: 80% caster's Attack (0.8 * Attack)
  - Soulburn (10 souls): Increases damage dealt and additional damage.

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

### Ivana (c1182)

- [ ] **S1 — Holy Light** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with holy light, and recovers Health of allies proportional to the target's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Heal strength: 7.2% target's max Health (14.4% with soulburn)<br>
  - Unparsed formula lines: Heal strength: 7.2% target's max Health (14.4% with soulburn)
  - Soulburn (10 souls): Increases the amount recovered.

- [ ] **S2 — Light of Repose** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Unaffected by decreases to Combat Readiness. At the start of the turn, dispels immortality from all enemies. Ignores Effect Resistance. At the end of someone's turn, when the enemy is granted immortality, spreads the censer's light to dispel all debuffs from all allies and grants radiance for 2 turns, before increasing Combat Readiness of the caster by 50%
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Requiem Prayer** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Dispels two debuffs from all allies by offering a prayer to banish evil, and grants ignore sharing for 3 turns and immunity for 2 turns before increasing Combat Readiness by 20%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Jack-O (c1130)

- [ ] **S1 — Throw Servant** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a servant, with a 40% chance to --stun-- for 1 turn. After attacking on the caster's turn, when the target has a debuff, activates Dust Attack as an extra attack.<br>Dust Attack: Attacks the enemy by throwing them into the air, granting stealth to the caster for 1 turn.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.75<br>!pow: 1<br><br><br>Skill1Proc<br>att_rate: 1.1<br>!pow: 1<br>
  - Unparsed formula lines: Skill1Proc; att_rate: 1.1; !pow: 1
  - Soulburn (10 souls): Increase effect chance to 100%.

- [ ] **S2 — Trick-or-Treat** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: At the start of the battle, grants Chain of Chiron to the ally in the back row for 2 turns. After an ally attacks, when the target has a debuff, increasing Combat Readiness of the caster by 30%. This effect is activated after all of the attacker's effects have occurred, and can only be activated once every 3 turns.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Forever Elyson Driver** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Increases Attack of the caster for 2 turns, before attacking the enemy by swallowing them with a jack-o'-lantern. When the enemy is defeated increases Combat Readiness of all allies by 20% and grants an extra turn to the caster. Penetrates the target's Defense by 50%. When the target has a debuff, damage dealt increases.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1<br>!pow: 1<br>50% increased damage if target debuffed<br>
  - Unparsed formula lines: 50% increased damage if target debuffed

### Januta (c3131)

- [ ] **S1 — Rabid Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Dashes towards the enemy to attack. When the caster is enraged, damage dealt is increased.
  - Resource: fightingSpirit; base gain 20; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>30% increased damage if enraged<br>
  - Unparsed formula lines: 30% increased damage if enraged

- [ ] **S2 — Ruler of the Prairie** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: After any ally is attacked, the caster gains 10 Fighting Spirit per ally attacked, and has a 35% chance to activate Hour of the Hunt.<br>Hour of the Hunt: Increases Speed of all allies for 2 turns, and the caster becomes enraged for 2 turns.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Shatter** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy, --decreasing Speed-- for 2 turns before increasing Attack of the caster for 2 turns. When the caster is enraged, ignores Effect Resistance.
  - Resource: fightingSpirit; base gain 0; required/spent 100.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5 (2.2 soulburn)<br>!pow: 1<br>
  - Soulburn (10 souls): Increases damage dealt.

### Jecht (c3053)

- [ ] **S1 — Staff Assault** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with a staff, with a 75% chance to --decrease Hit Chance-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1.05<br>

- [ ] **S2 — Tailind** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: 100% chance to dispel one debuff inflicted on an ally at the beginning of each turn.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Gale** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with wind magic, granting continuous healing and increased Speed to all allies for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.9<br>!pow: 0.9<br>
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

### Jena (c3052)

- [ ] **S1 — Cold Blow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with a staff, with a 35% chance to --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.95<br>

- [ ] **S2 — Coerce** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Casts weakening magic, with a 100% chance each to decrease buff durations of all enemies by 1 turn and inflict --frostbite-- for 2 turns. Grants immunity to all allies for 2 turns.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S3 — Cold Snap** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies with frost magic, with a 75% chance to --decrease Defense-- for 2 turns before a 100% chance to decrease Combat Readiness by 20%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.85<br>!pow: 0.95<br>

### Jenua (c1055)

- [ ] **S1 — Taste Test** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After granting increased Attack to the caster for 1 turn, attacks the enemy. When the caster is already granted rage, activates Bite as an extra attack. Bite can only be activated once per turn, during the caster's turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.9<br>
  - Soulburn (10 souls): Grants increased Attack (Greater) for 1 turn.<br>

- [ ] **S2 — Wild Dog Company Captain** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Upon receiving lethal damage, grants immortality to the caster for 1 turn. Immortality can only be activated once per battle. After being attacked, when Health is 50% or less, activates Plan A. Plan A can only be activated once every 4 turns.<br>Plan A: Dispels all debuffs from the caster and becomes enraged for 2 turns, before increasing Combat Readiness by 50%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Bite** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Description: Attacks the enemy with a sword, absorbing some of the damage dealt as Health, and deals additional damage proportional to the caster's Attack to all enemies except for the target. When the enemy is defeated, inflicts extinction. Penetrates the target's Defense.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.32<br>!pow: 0.95<br>Heal strength: 25% of the damage dealt<br>Additional Splash damage: 60% of th caster's Attack
  - Unparsed formula lines: Heal strength: 25% of the damage dealt; Additional Splash damage: 60% of th caster's Attack

### Judge Kise (c2006)

- [ ] **S1 — Sever** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy with a scythe. Penetrates the target's Defense by 20%.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Penetration 20%<br>
  - Unparsed formula lines: Penetration 20%

- [ ] **S2 — End of Evil** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with a scythe, dispelling all buffs before a 100% chance to inflict --decreased Hit Chance-- for 2 turns and a 85% chance to --inflict decreased Defense-- for 2 turns, and increases Combat Readiness of the caster by 25% per target. This skill cannot trigger a counterattack.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

- [ ] **S3 — Wave of Light** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies by distorting space and time before increasing skill cooldowns by 1 turn. Grants invincibility to the caster for 1 turn.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.2<br>!pow: 0.95<br>

### Judith (c3011)

- [ ] **S1 — Vulnerability Exposed** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks with dual-wielded swords. When the caster is stealthed, has a 100% chance to --stun-- the enemy for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Urgent Evasion** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the moment the caster is attacked, has a 100% chance to become stealthed for 1 turn.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Mark of Acceleration** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Increases the Combat Readiness of all allies by 30%, and grants stealth to the caster for 1 turn.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0<br>!pow: 0<br>
  - Soulburn (10 souls): Grants an extra turn.

### Juni (c3151)

- [ ] **S1 — Violent Beating** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a club and has a 75% chance to dispel one buff. When the caster has perception, increases effect chance to 100%.
  - Resource: fightingSpirit; base gain 20; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100% and dispels two buffs from the target.

- [ ] **S2 — Wicked Instinct** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Description: At the start of the first battle, gains 20 Fighting Spirit. The caster receives 30% of the damage suffered by the ally in the back row in their place. When more than one damage sharing effect is granted, only the strongest effect is applied. When an enemy revives, gains 40 Fighting Spirit and grants perception to the caster for 2 turns. The effect upon an enemy's revival can only be activated once every 2 turns.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Implemented resource passive portions: battle-start grant. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Club Swing** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies by swinging a club and has a 100% chance each to --decrease Defense-- and make then --unable to be buffed-- for 2 turns. Decreases debuff duration of all allies by 2 turns.
  - Resource: fightingSpirit; base gain 0; required/spent 80.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1.1<br>

### Kane (c1152)

- [ ] **S1 — Hammer Time** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a hammer, and increases Combat Readiness of the caster by 15%. When the caster is enraged, activates Rock Smash as an extra attack. Rock Smash can only be activated once per turn, during the caster’s turn.<br>Rock Smash: Attacks all enemies by slamming the ground, and inflicts --bleeding-- for 2 turns. Ignores Effect Resistance.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.9<br>!pow: 1<br><br><br>Skill1(Proc)<br>att_rate: 0.5<br>!pow: 1.3<br>
  - Unparsed formula lines: Skill1(Proc); att_rate: 0.5; !pow: 1.3

- [ ] **S2 — Force Awakening** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Upon receiving lethal damage, grants immortality and vampirism for 1 turn and resets skill cooldown of Feast of Predation. Can be only activated once every 6 turns. After an ally attacks, if the target has a debuff, gains 10 Fighting Spirit and when Fighting Spirit is full, consumes all Fighting Spirit to make the caster enraged for 2 turns.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Feast of Predation** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy by unleashing their power, and grants increased Attack (Greater) to the caster for 2 turns. Damage dealt increases proportional to the number of debuffs inflicted on the target.
  - Resource: fightingSpirit; base gain 50; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.6<br>!pow: 1<br>20% increased damage for each debuff on the target<br>
  - Unparsed formula lines: 20% increased damage for each debuff on the target
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Karin (c1011)

- [ ] **S1 — Sequential Cutter** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy by quick-drawing with a sword. A critical hit will decrease skill cooldown by 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.95<br>
  - EE 1: Increases Combat Readiness of the caster by 15% after using Sequential Cutter.

- [ ] **S2 — Blade Art: Flash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy by rushing towards them. A critical hit will inflict --decreased Defense-- on the target for 1 turn, and grants an extra turn.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1<br>!pow: 0.9<br>
  - EE 2: Dispels one buff from the enemy when using Blade Art: Flash. (This effect is applied before --decreasing Defense--)

- [ ] **S3 — Blade Art: Thunder** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy by slashing at lightning speed. A critical hit will increase damage dealt.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.6 (2.3 soulburn)<br>!pow: 0.85<br>50% increase to crit damage multiplier<br>
  - Unparsed formula lines: 50% increase to crit damage multiplier
  - Soulburn (10 souls): Increases damage dealt.
  - EE 3: lnflicts two --bleeding-- effects on the enemy for 2 turns after using Blade Art: Thunder.

### Kawerik (c1073)

- [ ] **S2 — Dimensional Corridor** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Attacks the enemy in a dimensional corridor, with a 100% chance each to dispel two buffs before fully increasing skill cooldowns. A critical hit will grant an extra turn.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.4<br>!pow: 1<br>0.30% Target Speed (0.003 * Speed)<br>
  - Unparsed formula lines: 0.30% Target Speed (0.003 * Speed)
  - Soulburn (20 souls): Ignores Effect Resistance.

- [ ] **S3 — Dimensional Explosion** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks all enemies with an explosion and grants increased Speed to the caster for 2 turns. Penetrates the target's Defense by 50%. At the start of the first battle, gains maximum Fighting Spirit, and when Fighting Spirit is 10 or more during battle, grants mana field.
  - Resource: fightingSpirit; base gain 0; required/spent 30.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.8<br>!pow: 0.95<br>0.075% self Speed (0.00075 * Speed)<br>
  - EE 1: Before attacking, increases Attack of the caster for 3 turns when using Dimensional Explosion.
  - EE 2: When using Dimensional Explosion, inflicts --silence-- for 1 turn.

### Kayron (c1023)

- [ ] **S1 — Void Slash** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a sword, with a 50% chance to inflict --decreased Hit Chance-- for 1 turn, dealing damage proportional to the caster's lost Health. When this skill is used, if it was not triggered by a Dual Attack and the caster has a buff, this skill changes into an attack that targets all enemies. The changed attack does not trigger a Dual Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.9 (1.4 soulburn)<br>!pow: 1<br>0.20% increased damage per 1% self Health missing<br><br><br>Skill1(AoE)<br>att_rate: 0.9 (1.1 soulburn)<br>!pow: 1<br>0.20% increased damage per 1% self Health missing<br>
  - Unparsed formula lines: 0.20% increased damage per 1% self Health missing; Skill1(AoE); att_rate: 0.9 (1.1 soulburn); !pow: 1; 0.20% increased damage per 1% self Health missing
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S2 — Immortal Will** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When the caster receives lethal damage, grants immortality for 1 turn and increased Evasion for 2 turns and resets skill cooldowns.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Apocalypse** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy with the Archdemon's Might contained within the sword, before absorbing some of the damage dealt as Health and granting increased Attack to the caster for 2 turns. When the enemy is defeated, extends buff durations granted to the caster by 1 turn. Damage dealt increases proportional to the caster's lost Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.7<br>!pow: 0.9<br>0.3% increased damage per 1% self Health missing<br>Heal strength: 50% of the damage dealt
  - Unparsed formula lines: 0.3% increased damage per 1% self Health missing; Heal strength: 50% of the damage dealt
  - EE 3: Inflicts --silence-- on the enemy for 1 turn when using Apocalypse.

### Ken (c1047)

- [ ] **S1 — Knockout** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a flurry of strikes and has a 50% chance to inflict --decreased Defense-- for 2 turns. When granted vigor, additionally inflicts --burn-- on the target for 2 turns. Damage dealt increases proportional to the caster's max Health.
  - Resource: fightingSpirit; base gain 15; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>10% self max Health (0.10 * Health)<br>Vigor buff: increase Attack and Defense by 30%
  - Unparsed formula lines: Vigor buff: increase Attack and Defense by 30%
  - EE 1: Increases Knockout's --decrease Defense-- effect chance by 10%.

- [ ] **S2 — Celestial Kick** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a series of kicks, --decreasing Defense-- for 2 turns before granting the caster increased Speed for 2 turns. When the caster is granted vigor, ignores Effect Resistance. Damage dealt increases proportional to the caster's max Health.
  - Resource: fightingSpirit; base gain 40; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.2<br>!pow: 1<br>10% self max Health (0.10 * Health)<br>actually goes up to 100% chance, in addition to ignore resistances with Vigor (unlisted)
  - Unparsed formula lines: actually goes up to 100% chance, in addition to ignore resistances with Vigor (unlisted)
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S3 — Phoenix Flurry** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks with a flurry of strikes before delivering a powerful blow, --decreasing Attack-- for 2 turns and --stunning-- for 1 turn. Grants vigor to the caster for 3 turns. Damage dealt increases proportional to the caster's max Health. At the start of the first battle, gains 40 Fighting Spirit.
  - Resource: fightingSpirit; base gain 0; required/spent 80.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5<br>!pow: 0.9<br>30% self max Health (0.30 * Health)<br>
  - EE 3: Recovers Health of the caster when using Phoenix Flurry. Amount recovered increases proportional to the caster's max Health.

### Khawana (c1086)

- [ ] **S1 — Hey There!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with sharp sickles, with a 50% chance each to inflict two --bleeding-- effects for 2 turns. If the enemy is debuffed after the attack, a successful attack deals additional damage proportional to the caster's Attack.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Casual Introduction** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with a flame guardian, before increasing Attack of all allies for 2 turns. Grants skill nullifier once to Fire elemental allies. Damage dealt increases proportional to the caster's Speed.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.9<br>!pow: 1<br>0.075% self Speed (0.00075 * Speed)<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S3 — Rough Welcome** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Description: Attacks the enemy with a flame guardian, dispelling two buffs before --stunning-- for 1 turn. Increases Combat Readiness of Fire elemental allies by 20%. Damage dealt increases proportional to the caster's Speed.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5<br>!pow: 1<br>0.1125% Target Speed (0.001125 * Speed)<br>
  - Unparsed formula lines: 0.1125% Target Speed (0.001125 * Speed)

### Khawazu (c1085)

- [ ] **S1 — Flame Strike** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a ball of flame and has a 50% chance to inflict --decreased Defense-- for 2 turns. After attacking, has a 35% chance to activate Burning Vitality.<br>Burning Vitality: Increases Combat Readiness of the caster by 20%.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): 100% chance to decrease Defense.

- [ ] **S2 — Composure** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: After being attacked, when the caster has a debuff, dispels all debuffs and grants increased Attack for 2 turns. 
  - Source multiplier text (requires review): Skill2<br>

### Kikirat v2 (c3084)

- [ ] **S2 — Defense Mode** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Defense of the caster by 10% after attacking. Effect can only stack up to 5 times.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Cleaning Mode** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Fires indiscriminately at all enemies, with a 75% chance to --decrease Hit Chance-- for 1 turn, before triggering counterattacks from the caster for 2 turns. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.4(0.5 soulburn)<br>!pow: 1<br>50% self Defense (60% soulburn)<br>
  - Soulburn (10 souls): Increases damage dealt.

### Kiris (c3063)

- [ ] **S1 — Venomous Arrow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Fires a poisoned arrow at the enemy, with a 50% chance to inflict --poison-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.9<br>

- [ ] **S2 — Corrosive Volley** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Fires a corrosive volley to all enemies, extending any debuff duration by 1 turn.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.7<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

- [ ] **S3 — Preparation** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Description: Strengthens the casters next attack, granting an extra turn.<br>Venomous Arrow: Increases effect chance to 100%, and --poison-- effects can be stacked up to 3 times.<br>Corrosive Volley: Extends debuff duration by 2 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

### Kise (c1006)

- [ ] **S1 — Full Moon Scythe** — Base damage supported; secondary effects pending
  - Current base support: supported. Reviewed e7calc conditional damage
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a scythe. When the target has a buff, increases damage dealt by 70%.
  - Reviewed damage source: [e7calc](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts), revision 39070976ce3cd0435cbcf5d430f2711cf0ef0005.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.1<br>!pow: 1<br>70% increased damage is enemy is buffed<br>
  - EE 1: Increases Combat Readiness of the caster by 15% after usrng Full Moon Scythe.

- [ ] **S2 — Dark Scar** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Description: Attacks all enemies with a scythe. Penetrates the enemy's Defense by 30%, and by an additional 30% when the caster is stealthed.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.9<br>!pow: 1<br>

- [ ] **S3 — Nocturne** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Leaps towards the enemy to attack and increases skill cooldowns by 1 turn twice. Grants stealth and a barrier (proportional to the caster's Attack) to the caster for 2 turns before increasing Combat Readiness by 50%. Damage dealt increases proportional to the caster's current Health ratio.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1 (1.2 soulburn)<br>!pow: 1<br>0.35% increased damage per 1% current self Health<br>Barrier strength: 65% self Attack (0.65 * Attack)
  - Unparsed formula lines: 0.35% increased damage per 1% current self Health; Barrier strength: 65% self Attack (0.65 * Attack)
  - Soulburn (10 souls): Increases damage dealt.
  - EE 3: Decreases buff durations of the target by 1 turn when using Nocturne. (This effect is applied before increasrng skill cooldown.)

### Kitty Clarissa (c2028)

- [ ] **S1 — Get Away, Meow!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks with a morning star. Damage dealt increases proportional to the caster's max Health. When the caster is granted loveliness, triggers a Dual Attack from the ally with the highest Attack.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.9<br>!pow: 0.8<br>6% self max Health (0.06 * Health)<br>
  - EE 1: Recovers Health of the ally with the highest Attack after using Get Away, Meow!. Amount recovered increases proportional to the caster's max Health.

- [ ] **S2 — Meow I'm Angry!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies with a morning star while raging, with a 80% chance to decrease buff duration by 2 turns and make them --unhealable-- for 2 turns. When the caster is granted loveliness, effect chance increases by 20%.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.8<br>!pow: 0.95<br>requires buff duration down to have something to reduce to give a healing debuff<br>
  - Unparsed formula lines: requires buff duration down to have something to reduce to give a healing debuff
  - Soulburn (20 souls): Ignores Effect Resistance.
  - EE 2: Has an 80% chance to --restrict-- the target for 2 turns after using Meow I'm Angry!.
  - EE 3: Decreases Combat Readiness of the target by 20% after using Meow l'm Angry!.

- [ ] **S3 — I'm So Cute, Meow♥** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Wiggles tail cutely, decreasing debuff duration on all allies by 2 turns, and granting the caster immunity and loveliness for 3 turns. Grants the caster an extra turn.
  - Source multiplier text (requires review): Skill3<br>

### Kizuna AI (c1107)

- [ ] **S1 — Aitan Beeeam! ☆** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks by firing a heart at the enemy, before dispelling a debuff from an ally. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.5<br>!pow: 0.9<br>12% self max Health (0.12 * Health)<br>
  - Soulburn (10 souls): Dispels a debuff from all allies.

- [ ] **S2 — Crisis Avoidance ♪** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Recovers Health of the ally with the lowest Health proportional to the caster’s max Health at the end of the turn.
  - Source multiplier text (requires review): Skill2<br>Heal Strength: 10-14.5% Self Max Health<br>
  - Unparsed formula lines: Heal Strength: 10-14.5% Self Max Health

- [ ] **S3 — Super Intelligent AI** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Cheers on allies, granting increased Attack and a barrier (proportional to the caster’s max Health) to all allies for 3 turns, before granting increased Speed to the caster for 2 turns.
  - Source multiplier text (requires review): Skill3<br>Barrier strength: 14-18.2% Self Max Health<br>
  - Unparsed formula lines: Barrier strength: 14-18.2% Self Max Health

### Kluri (c3003)

- [ ] **S2 — Magic Resist** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Recovers 10% Health of the caster at the beginning of every turn.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Fortitude** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Has a 100% chance to --provoke-- and --decrease Defense-- the enemy for 2 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Krau (c1070)

- [ ] **S1 — Swordstorm** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a swordstorm, with a 75% chance to --provoke-- for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.7<br>!pow: 1<br>8.5% self max Health (0.085 * Health)<br>
  - EE 1: Increase Swordstorm's chance to --provoke-- by 25%.

- [ ] **S2 — Charge** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Shoves the enemy with a shield, decreasing Combat Readiness by 50%, before granting increased Defense to all allies for 2 turns. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.8<br>!pow: 1<br>13% self max Health (0.13 * Health)<br>in game tooltip wrong
  - Unparsed formula lines: in game tooltip wrong
  - EE 2: Increase Speed of the caster for 2 turns when using Charge.

- [ ] **S3 — Summon Ziegfried** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy by summoning the Guardian Ziegfried, and absorbs some of the damage dealt as Health. Penetrates Defense, but cannot trigger a critical hit or a heavy blow. Damage dealt increases proportional to the caster's lost Health. When this skill is not on cooldown, grants 25% damage share from the damage received by the ally.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.3<br>!pow: 1<br>0.53571 (0.26785 with Soulburn) flat per 1 hp missing<br>Heal strength: 20% of the damage dealt
  - Unparsed formula lines: 0.53571 (0.26785 with Soulburn) flat per 1 hp missing; Heal strength: 20% of the damage dealt
  - Soulburn (10 souls): Decreases damage dealt and attacks all enemies.
  - EE 3: Decreases cooldown of Summon Ziegfried by 1 turn. 

### Lady of the Scales (c6005)

- [ ] **S1 — Divine Punishment** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with divine lightning and has a 75% chance to inflict --fear-- for 1 turn, before recovering Health of all allies proportional to the target's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Heal strength: 8% of the target's max Health<br>
  - Unparsed formula lines: Heal strength: 8% of the target's max Health
  - Soulburn (10 souls): Increases effect chance to 100%, and attacks all enemies. This attack does not trigger a Dual Attack.

- [ ] **S2 — Scales of Equity** — Passive partially implemented or pending
  - Current base support: passive. Passive: Offering grant, sharing, one-time survival and bearer-death healing implemented; enemy CR-copy mechanic pending
  - Review/work: Passive: Offering grant, sharing, one-time survival and bearer-death healing implemented; enemy CR-copy mechanic pending
  - Description: At the start of battle, grants offering to the foremost ally. When the ally granted offering dies, recovers Health of all allies by 50%. When Combat Readiness of an enemy increases during battle, increases Combat Readiness of the caster by 50% of the amount of Combat Readiness increased. This effect will not be applied to the Combat Readiness increase effect triggered by the same skill.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — The Caress of Mercy** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: With the Goddess's authority, dispels all debuffs from all allies before increasing Combat Readiness by 25%. Consumes 20% of the current Health of the ally granted offering, granting abundance to all other allies for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

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
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Fires at all enemies to attack, and increases Combat Readiness of all allies by 25%, before granting a barrier (proportional to Attack) to the caster for 2 turns. When Fighting Spirit is full, consumes all Fighting Spirit to penetrate the target's Defense by 50%. This skill cannot trigger a counterattack.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.9<br>!pow: 1<br>Barrier strength: 80% caster's Attack<br>
  - Unparsed formula lines: Barrier strength: 80% caster's Attack
  - Soulburn (20 souls): Grants an extra turn.
  - EE 2: When using Full Burst, if Fighting Spirit is full, penetrates the target's Defense by an additional 10%.

### Last Piece Karin (c6011)

- [ ] **S1 — Vacuum Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a sword, and increases Combat Readiness of the caster by 15%. Damage dealt increases proportional to the caster's Speed.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.9 (1.5 Soulburn)<br>!pow: 1<br>0.075% self Speed (0.00075 * Speed)<br>
  - Soulburn (10 souls): Increases damage dealt.
  - EE 1: Increase Combat Readiness of the caster by an additional 15% when defeating an enemy using Vacuum Strike.

- [ ] **S2 — Phantom Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy, decreasing Combat Readiness by 30%, before granting stealth and a barrier (proportional to the caster's Attack) to the caster for 3 turns. Increases Hit Chance of this skill by 50%. Damage dealt increases proportional to the caster's Speed.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.65<br>!pow: 0.9<br>0.15% self Speed (0.0015 * Speed)<br>Barrier Strength: 65% of self Attack (0.65 Attack)
  - Unparsed formula lines: Barrier Strength: 65% of self Attack (0.65 Attack)
  - EE 2: Increases Phantom Strike's barrier strength by 10%.

- [ ] **S3 — Blade Art: Infinite Sword** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Becomes one with the sword, granting increased Attack and Phantom Sword to the caster for 3 turns. Grants an extra turn.
  - Source multiplier text (requires review): Skill3<br>Neo Phantom Sword: 30% target max Health<br>
  - Unparsed formula lines: Neo Phantom Sword: 30% target max Health
  - EE 3: Dispels stealth from all enemies when using Blade Art: Infinte Sword. Ignores Effect Resistance.

### Last Rider Krau (c2070)

- [ ] **S1 — Punishment** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a swordstorm, before increasing Speed of the caster for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.7<br>!pow: 1<br>10% self max Health (0.10 * Health)<br>

- [ ] **S2 — Code Number 00** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: After being attacked, decreases skill cooldowns by 1 turn. After suffering an attack that targets all allies, decreases skill cooldowns by an additional 1 turn, and grants a barrier (proportional to the caster’s max Health) to all allies for 2 turns.
  - Source multiplier text (requires review): Skill2<br>Barrier strength:14-21% Self Max Health<br>
  - Unparsed formula lines: Barrier strength:14-21% Self Max Health

- [ ] **S3 — Mobile Weapon Ziegfried** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Summons Ziegfried to attack all enemies, before granting immunity to all allies for 2 turns and decreasing skill cooldowns by 1 turn. Penetrates Defense, but cannot trigger a critical hit or a heavy blow. Damage dealt increases proportional to the caster's max Health and Speed. Damage dealt increases every time this skill is used and can stack up to 3 times.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.3<br>!pow: 1<br>6% self max Health (0.06 * Health)<br>0.1125 % self Speed (0.001125 * Speed)<br>20% increased damage per usage, up to 60%
  - Unparsed formula lines: 0.1125 % self Speed (0.001125 * Speed); 20% increased damage per usage, up to 60%
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Leah (c3163)

- [ ] **S1 — Swift Fire** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a pistol, decreasing Combat Readiness by 15%. When the caster is granted exploiting weak points, uses Explosive Fire instead of Swift Fire.<br>Explosive Fire: Attacks the enemy, decreasing buff durations by 1 turn and --silencing-- for 1 turn before decreasing Combat Readiness by 30%. Damage dealt increases proportional to the caster's Speed. This attack does not trigger a Dual Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.9<br>!pow: 0.95<br><br><br>Skill1(Proc)<br>att_rate: 1.2<br>!pow: 0.95<br>0.10% self Speed (0.001 * Speed)<br>
  - Unparsed formula lines: Skill1(Proc); att_rate: 1.2; !pow: 0.95
  - Soulburn (20 souls): Ignores Effect Resistance.

- [ ] **S2 — Power of Harmony** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of the first battle, when all allies are of different elements, acquires 10 Soul and has a 100% chance to increase Attack of all allies for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Battle Preparation** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Increases Critical Hit Damage of all allies for 2 turns, and grants exploiting weak points to the caster. Grants an extra turn to the caster.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Lena (c3092)

- [ ] **S2 — Power Strike** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Critical Hit Chance by 50%.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Exposed!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with a powerful storm, decreasing Combat Readiness by 20%, before increasing Attack of the caster for 2 turns. Damage dealt increases proportional to the amount of the enemy's lost Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1 (1.2 soulburn)<br>!pow: 1<br>gains 0.2% damage per 1% enemy Health missing<br>
  - Unparsed formula lines: gains 0.2% damage per 1% enemy Health missing
  - Soulburn (10 souls): Increases damage dealt.

### Leo (c1029)

- [ ] **S1 — Sparrow Dive** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a slingshot, with a 35% chance to inflict --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.9<br>!pow: 1<br>

- [ ] **S2 — Fox Hunt** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks with a slingshot, with a 100% chance to --decrease Defense-- for 2 turns, and a 50% chance to use Sparrow Dive.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.35<br>!pow: 1.05<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

- [ ] **S3 — Flying Racoo** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Racoo attacks all enemies by firing bullets, inflicting --decreased Speed-- for 2 turns and a 75% chance to inflict --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.8<br>!pow: 0.8<br>

### Lethe (c5149)

- [ ] **S1 — Wave Slash** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy with a sword, before granting increased Speed to the caster for 1 turn. After attacking, when the target's --omen-- is 3, consumes all, activating Call of the Abyss.<br>Call of the Abyss: Calls forth a deep sea creature to attack the enemy, and when the enemy is defeated, inflicts extinction and recovers Health of all allies, before increasing Combat Readiness of the caster by 50%. Cannot trigger a critical hit, and penetrates the target's Defense. Amount recovered and damage dealt increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br><br><br>Skill1 (Proc)<br>att_rate: 0.3<br>!pow: 1.3<br>Max Health scaling 23% (0.23 * self Max Health)<br>Heal strength: 20% caster's max Health (0.2 * caster's max Health)<br>Penetration: 100%
  - Unparsed formula lines: Skill1 (Proc); att_rate: 0.3; !pow: 1.3; Heal strength: 20% caster's max Health (0.2 * caster's max Health); Penetration: 100%
  - EE 2: Increases Call of the Abyss's amount recovered by 20%.

- [ ] **S2 — Dreamer in the Deep** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: Increases Health by 10%. Does not cost any Soul to activate the caster's first Soulburn. When attacking has a 100% chance to inflict one --omen-- on the target.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Freeze Over** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies with a frozen mass, decreasing buff durations by 2 turns before a 100% chance each to inflict --frostbite-- and --restrict-- for 2 turns. Ignores Effect Resistance of any targets with max Health lower than the caster’s max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1.05<br>
  - Soulburn (20 souls): Grants an extra turn.
  - EE 3: Cannot trigger a counterattack from the enemy when using Freeze Over.

### Lidica (c1046)

- [ ] **S1 — Wild Rose** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a sword and has a 80% chance each to inflict two --bleeding-- effects for 2 turns. At the end of the turn, detonates --bleeding-- effects inflicted on the target.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7<br>!pow: 1<br>Detonation multi: 1.3<br>
  - Unparsed formula lines: Detonation multi: 1.3
  - EE 1: Increases Wild Rose's chance of inflicting --bleeding-- by 20%.

- [ ] **S2 — Thornbush** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Inflicts resource reduction on all enemies by 60% before attacking, dispelling all buffs and inflicting --bind-- for 2 turns. For every target, increases Combat Readiness of the caster by 25%.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.7<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.
  - EE 2: Inflicts --restrict-- on all enemies for 2 turns when using Thornbush.

- [ ] **S3 — Public Execution** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy with a whip sword, inflicting --decreased Defense-- for 2 turns before decreasing Combat Readiness by 100%. Grants skill nullifier once to all allies. When the target is inflicted with --bind--, ignores Effect Resistance.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.6<br>!pow: 1<br>
  - EE 3: --Decreases Speed-- of the target for 2 turns when using Public Execution.

### Lilias (c1089)

- [ ] **S1 — Follow Me! Charge!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Takes the lead to attack the enemy, and triggers a Dual Attack from a random ally. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.8<br>!pow: 0.95<br>12% self max Health<br>Heal Strength EE: 8% self max Health (0.08 * self max Health)
  - Unparsed formula lines: Heal Strength EE: 8% self max Health (0.08 * self max Health)
  - Soulburn (20 souls): Grants an extra turn.
  - EE 1: Recovers Health of the caster when using Follow Me! Charge!. Amount recovered increases proportional to the caster's max Health. 

- [ ] **S2 — That's Far Enough!** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Increases Critical Hit Chance by 50%. After an enemy uses a non-attack skill, dispels all debuffs from the caster, and activates Suppression against the enemy caster.<br>Suppression: Inflicts --provoke-- on the target for 1 turn, and grants a barrier (proportional to the caster’s max Health) to the caster for 2 turns.
  - Source multiplier text (requires review): Skill2(Proc)<br>Barrier strength: 20% self Max Health (0.20 * Max Health)<br>
  - Unparsed formula lines: Skill2(Proc); Barrier strength: 20% self Max Health (0.20 * Max Health)
  - EE 2: When Suppression is activated by That's Far Enough!, increases Combat Readiness of the caster by 20%.
  - EE 3: When Suppression is activated by That's Far Enough!, grants immunity to the caster for 2 turns.

- [ ] **S3 — Ready, Load, Fire!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Dispels all debuffs from all allies and commands the Perland Army to attack by firing on all enemies, before decreasing Combat Readiness by 25%. Inflicts damage according to the Attack of the ally with the highest Attack. When the target is --provoked--, damage dealt increases.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.1<br>!pow: 1<br>uses highest allies Attack for calculation instead of her own<br>80% damage increase if target is provoked<br>uses her crit and crit damage<br><br>Rosa Hargana and other effects work. Note: Rosa is only 25% (not 30%)<br>
  - Unparsed formula lines: uses highest allies Attack for calculation instead of her own; 80% damage increase if target is provoked; uses her crit and crit damage; Rosa Hargana and other effects work. Note: Rosa is only 25% (not 30%)

### Lilibet (c1095)

- [ ] **S2 — Snip-Snip** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy mercilessly, with a 100% chance to dispel all buffs. A critical hit will grant an extra turn.
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

### Lilka (c3153)

- [ ] **S1 — Pinpoint Fire** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy and has a 50% chance to --decrease Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increase effect chance to 100%.

- [ ] **S2 — Technical Support** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Increases Attack of the caster and the ally with the highest Attack except for the caster for 2 turns and Combat Readiness by 30%. When Combat Readiness of the ally with the highest Attack except for the caster is 35% or less, increases Combat Readiness of the targeted ally by an additional 50%.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Ace in the Hole** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a grenade, with a 100% each to --decrease Attack-- and --Speed-- for 2 turns. When the target is of the Ice element, increases Speed of all allies for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.9<br>!pow: 0.95<br>

### Lionheart Cermia (c2079)

- [ ] **S1 — Can You Handle The Heat?** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a sword, and grants increased Speed to the caster for 1 turn. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.6 (1 soulburn)<br>!pow: 0.9<br>100% self Defense (1 * Defense)  (160% soulburn)<br>
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S2 — It's Far From Over!** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: After an ally suffers an extra attack, counterattack, or Dual Attack, dispels all debuffs inflicted on the caster and activates Shine!.<br>Shine!: Emits light, granting increased Defense and immunity to the caster for 3 turns and increases Combat Readiness by 50% before resetting skill cooldowns.
  - Source multiplier text (requires review): Skill2<br>
  - EE 1: Grants 50% damage reduction when suffering an extra attack, counterattack, or Dual Attack.

### Lisette (c2186)

- [ ] **S1 — Light Source** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Description: Attacks the enemy with light, and recovers Health of all allies. Damage dealth and amount recovered increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Health scaling: 10% caster's max Health<br>Heal strength: 7% caster's max Health<br><br>Skill1 (Fragment of Life)<br>Heal strength: 10% target's max Health<br>
  - Unparsed formula lines: Heal strength: 7% caster's max Health; Skill1 (Fragment of Life); Heal strength: 10% target's max Health

- [ ] **S2 — Devotion** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: At the start of the first battle, grants four divinity effects. When an ally except for the caster dies, consumes one divinity to revive them as a Fragment of Life for 2 turns and increase Combat Readiness by 30%
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Converged Time** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Reconstructs the world to fully recover Health of all allies and grants increased Speed for 3 turns. When the caster is granted divinity, grants time reversal to all allies except for the caster. This skill is unaffected by cooldown increase and decrease effects.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Little Queen Charlotte (c2009)

- [ ] **S1 — Judgment** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks with a giant sword before granting the caster immunity for 1 turn. A successful attack always results in a critical hit.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.2<br>!pow: 1<br>

- [ ] **S2 — A Queen's Dignity** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Immune to debuffs which prevent movement. When an ally is attacked, grants 20% damage reduction. After every attack suffered by an ally, increases Combat Readiness of the caster by 10%.
  - Source multiplier text (requires review): Skill2<br>
  - EE 1: With A Queen's Dignity's effect, increases damage reduction by 10%.

- [ ] **S3 — The Will of La Mare** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy by slamming down with a sword, absorbing some of the damage dealt as Health, and when the enemy is defeated, inflicts extinction. A successful attack always results in a critical hit, and deals additional damage proportional to the caster's Attack to all enemies except for the target. Penetrates the target's Defense by 50%. When the target is of the Dark element, increases damage dealt.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.65<br>!pow: 1<br>30% of damage gained as life<br>35% increased damage vs. Dark enemies<br><br>Splash effect is 120% self Attack, ignores 70% defense<br>
  - Unparsed formula lines: 30% of damage gained as life; 35% increased damage vs. Dark enemies; Splash effect is 120% self Attack, ignores 70% defense
  - Soulburn (10 souls): Increases Hit Chance by 100% when using this skill.

### Lone Crescent Bellona (c2071)

- [ ] **S1 — Delicate Crescent** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a fan, absorbing some of the damage dealt as Health, and inflicts up to 10% injuries. A successful attack always results in a critical hit.
  - Resource: fightingSpirit; base gain 20; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1.0 (1.35 soulburn)<br>!pow: 1<br>Lifesteal: 20% of damage dealt<br>
  - Unparsed formula lines: Lifesteal: 20% of damage dealt
  - Soulburn (10 souls): Increases damage dealt, and injuries can be inflicted up to 20%.

- [ ] **S2 — Waxing Crescent** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: For every surviving ally, increases Evasion by 15%. When an ally is attacked, gains 20 Fighting Spirit, and when Fighting Spirit is full, activates All Eyes on Me.<br>All Eyes on Me (consumes 100 Fighting Spirit): Attacks all enemies, inflicting up to 15% injuries,and increases Combat Readiness of the caster by 30%. A successful attack always results in a critical hit.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2Proc<br>att_rate: 0.8<br>!pow: 1<br>
  - Unparsed formula lines: Skill2Proc

- [ ] **S3 — Quixotic Crescent** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: After granting vigor to the caster for 3 turns, attacks the enemy by moving unpredictably, and grants immunity to the caster for 2 turns. A successful attack always results in a critical hit.
  - Resource: fightingSpirit; base gain 20; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.6<br>!pow: 1<br>EE damage scaling: 70% injury <br>
  - Unparsed formula lines: EE damage scaling: 70% injury 
  - EE 1: Damage dealt by Quixotic Crescent increases in proportional to the target’s injuries.

### Lone Wolf Peira (c2125)

- [ ] **S1 — Bash** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attack the enemy, with a 75% chance to --decrease Defense-- for 1 turn. A successful attack deals additional damage proportional to the caster's Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Additional damage: 25% caster's Attack (0.25 * Attack)<br>
  - Unparsed formula lines: Additional damage: 25% caster's Attack (0.25 * Attack)
  - Soulburn (10 souls): Attacks all enemies. This attack does not trigger a Dual Attack.

- [ ] **S2 — Time to Rampage** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Evasion by 50%. At the start of the turn, increases Attack by 20%, and can stack up to 5 times. At the end of the turn, increases Combat Readiness of all allies by 10%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Hound the Indolent** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Dispels two debuffs from all allies before granting rampage to Dark elemental allies for 3 turns. Grants swift attack to all allies except for the caster. Grants an extra turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Lorina (c3035)

- [ ] **S2 — Spiritual Armament** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Effect Resistance by 50%. Increases Attack by 15% each time the caster attacks an enemy. Effect can only stack up to 5 times.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Resolve** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: After leaping into the air, attacks the enemy with a strike from above. Damage dealt increases proportional to the target's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5<br>!pow: 0.95<br>3% target max Health<br>
  - Soulburn (20 souls): Grants an extra turn.

### Lots (c1031)

- [ ] **S1 — Holy Light** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with a light sphere, with a 75% chance to --decrease Attack-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Regen** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Description: With recovery magic, recovers Health of an ally proportional to the target’s max Health and increases Combat Readiness by 100%. Increases Combat Readiness of the caster by 30%.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 15% target max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 15% target max Health

- [ ] **S3 — Serenity** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: With strengthening magic, increases Combat Readiness of all allies by 20% before granting continuous healing for 3 turns and recovering Health proportional to the target’s max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 10% target max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 10% target max Health
  - Soulburn (20 souls): Extends duration of buffs granted by this skill by 2 turns.

### Lua (c1126)

- [ ] **S2 — Butterfly Reverie** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with light, dispelling two buffs before putting them to --sleep-- for 1 turn. Grants an extra turn to the caster.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.5<br>!pow: 0.9<br>
  - EE 1: When using Butterfly Reverie, inflicts --decreased Defense-- on the target for 2 turns.

- [ ] **S3 — Sweet Talk** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Dispels one buff from all enemies before increasing skill cooldowns by 1 turn and inflicting --beguile--. Increases Speed of all allies for 2 turns.
  - Source multiplier text (requires review): Skill3<br>
  - Soulburn (20 souls): Ignores Effect Resistance.
  - EE 2: When using Sweet Talk, dispels one additional buff.
  - EE 3: When using Sweet Talk, increases skill cooldowns of enemies inflicted with --sleep-- to max.

### Lucy (c3113)

- [ ] **S1 — Paper Throw** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Throws paper to attack the enemy, with a 50% chance to --restrict-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.95<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S3 — Paper Barrier** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Uses many sheets of paper to recover Health of all allies and grant a barrier for 2 turns, before decreasing debuff durations by 1 turn. Amount recovered and barrier strength increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>Barrier Strength: 20% of Self Max HP<br>
  - Unparsed formula lines: Barrier Strength: 20% of Self Max HP

### Ludwig (c1069)

- [ ] **S2 — Moonlight Blow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy with light, decreasing buff durations by 1 turn before a 100% chance to --stun-- for 1 turn. Grants invincibility to the caster for 1 turn and increases Combat Readiness by 50%.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.65<br>!pow: 1.05<br>
  - Soulburn (20 souls): Ignores Effect Resistance.
  - EE 1: Increases Attack of the caster for 2 turns when using Moonlight Blow.
  - EE 2: --Decreases Defense-- for 2 turns when using Moonlight Blow.

- [ ] **S3 — Call of the Full Moon** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Description: Attacks all enemies with Nocturne magic, and when an enemy is defeated, extends the caster's buff durations by 1 turn. Penetrates the target's Defense by 30%. When the caster is invincible, penetrates the target's Defense by an additional 30%.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.9<br>!pow: 0.95<br>

### Luluca (c1082)

- [ ] **S1 — Wild Wave** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks with intense elemental force, with a 50% chance to --decrease Defense-- for 2 turns. Damage dealt increases proportional to the amount of the enemy's lost Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>increased damage equal to 20% of enemies missing health percent (ie 50% hp enemy = 10% dmg boost)<br>
  - Unparsed formula lines: increased damage equal to 20% of enemies missing health percent (ie 50% hp enemy = 10% dmg boost)
  - EE 1: Increases Wild Wave's chance to --decrease Defense-- by 15%.
  - EE 2: Has a 35% chanceto grant an extra attack with the same skill when using Wild Wave. Extra attack can only be granted once per turn of the caster.

- [ ] **S2 — Rekos's Blessing** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: With the blessing of the stars, grants increased Defense and a barrier (proportional to the caster’s Attack) to all allies for 2 turns.
  - Source multiplier text (requires review): Skill2<br>Barrier Strength: 37.5% self Attack<br>
  - Unparsed formula lines: Barrier Strength: 37.5% self Attack
  - Soulburn (20 souls): All skill cooldowns decreased by 2 turns.

- [ ] **S3 — Wave of Vengeance** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies with the power of ruin, with a 100% chance to --decrease Defense-- for 2 turns, before increasing the caster's Attack. Increased Attack can stack up to 3 times.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.9<br>!pow: 1.05<br>20% increased self Attack per stack (for all skills)<br>
  - Unparsed formula lines: 20% increased self Attack per stack (for all skills)
  - EE 3: Has a 75% chance to --decrease Attack-- of all enemies for 2 turns when using Wave of Vengeance.

### Luna (c1066)

- [ ] **S1 — Infinity Slash** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Stabs the target a random number of times. Skill cooldown decreases by 1-3 turns and damage dealt increases according to the number of attacks.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7<br>!pow: 0.95<br>att_rate changes: 1.4 for 2 hits, 2.1 for 3 hits<br>
  - Unparsed formula lines: att_rate changes: 1.4 for 2 hits, 2.1 for 3 hits
  - Soulburn (10 souls): Increases the number of attacks to max.
  - EE 1: Increases Combat Readiness of the caster by 15% after using Infinity Slash.

- [ ] **S2 — Dragon Knight's Will** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Critical Hit Chance and Critical Hit Resistance by 30%. When the caster's Health is 50% or more, increases Attack by 30%, and when the caster's Health is less than 50%, increases Defense by 30%.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Ragnar Spear** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Soars into the air and attacks the enemy by hurling a spear, with a 100% chance to inflict --decreased Defense-- for 2 turns. Penetrates the target's Defense by 50% and attacks using an elemental advantage. When the enemy is defeated, gains an additional 5 Soul.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.1<br>!pow: 1.05<br>
  - EE 2: --Decreases Attack-- of the enemy for 2 turns after using Ragnar Spear.
  - EE 3: When the enemy is defeated with Ragnar's Spear, grants an extra turn to the caster.

### Magic Scholar Doris (c4044)

- [ ] **S1 — Mana Bullet** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with light energy, before a 75% chance to --decrease Hit Chance-- for 1 turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Celebration of Light** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Recites the Celebration of Light, recovering the Health of all allies and granting continuous healing and increased Defense for 2 turns. Amount recovered is proportional to the target's max Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

- [ ] **S3 — Primal Light** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Description: Dispels one debuff from an ally with light magic, before recovering their Health and increasing their Combat Readiness by 50% with light magic. Amount recovered is proportional to the target's max Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Maid Chloe (c2049)

- [ ] **S1 — Heavy Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks with a hammer, with a 40% chance to --stun-- for 1 turn, before increasing Combat Readiness of the caster by 15%. After attacking, when the target is inflicted with --stun--, increases Combat Readiness of all allies except for the caster by 15%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Maid's Cheer** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Grants 50% additional damage reduction to all allies. At the start of the turn, recovers Health of two allies with the lowest Health proportional to the caster’s max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 12% self max Health (18% full Molgora)<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 12% self max Health (18% full Molgora)

- [ ] **S3 — VIP Treatment** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Entertains all allies with VIP Treatment, reviving all dead allies to 30% Health. For allies that are not dead, dispels two debuffs and grants revive for 3 turns, before granting increased Defense of all allies for 3 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

### Martial Artist Ken (c2047)

- [ ] **S1 — Knockout** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a flurry of strikes, with a 100% chance to inflict --provoke-- for 1 turn. A successful attack always results in a critical hit.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1 (1.7 soulburn)<br>!pow: 0.95<br>
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S2 — Dragon Flame** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of battle, grants vigor for 3 turns. When an ally except for the caster suffers a critical hit, counterattacks, and when the caster suffers a critical hit, counterattacks with Dragon Flame.<br>Dragon Flame (gains 1 Soul): Attacks the enemy with a kick and penetrates the target's Defense by 50%. A successful attack always results in a critical hit, and damage dealt increases proportional to the caster's lost Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.95<br>!pow: 1<br>0.4% increased damage per 1% self Health missing<br>Penetration 50%, Dragon Flame counterattack, regular is just Skill1
  - Unparsed formula lines: 0.4% increased damage per 1% self Health missing; Penetration 50%, Dragon Flame counterattack, regular is just Skill1

- [ ] **S3 — The Coming of Asura** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with a powerful ground pound, with a 80% chance to --decrease Defense-- for 2 turns, and increases Attack of the caster for 2 turns. A successful attack always results in a critical hit.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.1<br>!pow: 1<br>

### Mascot Hazel (c4041)

- [ ] **S1 — Book of Fire** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with fire magic, with a 50% chance to make --unhealable-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1.05<br>

- [ ] **S2 — Urgent Regen** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Description: Heals the target proportional to the caster's Attack and the target's max Health, before increasing Combat Readiness of the caster by 15%. Amount recovered is doubled when the target's Health is 50% or less. 
  - Source multiplier text (requires review): Skill2<br>Heal strength: 30% self Attack + 15% target max Health<br>If Target at <50% Health: 45%, 22% (60%, 29% with rune?)
  - Unparsed formula lines: Heal strength: 30% self Attack + 15% target max Health; If Target at <50% Health: 45%, 22% (60%, 29% with rune?)

- [ ] **S3 — A Girl in Uniform** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Encourages allies by increasing Attack of the target and all other allies for 2 turns before recovering Health of all allies and dispelling one debuff. When the target is a Fire elemental hero, grants the target increased Attack (Greater) instead. Amount recovered is proportional to the target's max Health and the caster's Attack.
  - Source multiplier text (requires review): Skill3<br>Heal strength: 30% self Attack + 12% target max Health<br>Greater Attack is 75% increased Attack. Doesn't stack.
  - Unparsed formula lines: Heal strength: 30% self Attack + 12% target max Health; Greater Attack is 75% increased Attack. Doesn't stack.
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

### Maya (c1032)

- [ ] **S1 — Weakening Blow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with a blunt weapon, with a 35% chance to --stun-- for 1 turn. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.5<br>!pow: 0.95<br>75% self Defense (0.75 * Defense)<br>

- [ ] **S2 — Concuss** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks with a shield, with a 100% chance each to --stun-- for 1 turn before decreasing Combat Readiness by 30%. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.8<br>!pow: 1<br>80% self Defense (0.8 * Defense)<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

- [ ] **S3 — Morale Boost** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Has a 75% chance to inflict --provoke-- for 1 turn and a 100% chance to inflict --decreased Attack-- for 2 turns on all enemies. Grants increased Defense to all allies for 2 turns.
  - Source multiplier text (requires review): Skill3<br>

### Mediator Kawerik (c2073)

- [ ] **S2 — Balance of Power** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with the mediator's power, dispelling all buffs before inflicting --decreased Attack-- for 2 turns, and grants a barrier (proportional to the target’s max Health) to all allies for 2 turns. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.5 (0.75 with EE)<br>!pow: 1<br>9% self max Health (0.09 * Health), 100% defense penetration w/ EE<br>Shield Strength: 21% of Target Max Health
  - Unparsed formula lines: att_rate: 1.5 (0.75 with EE); 9% self max Health (0.09 * Health), 100% defense penetration w/ EE; Shield Strength: 21% of Target Max Health
  - EE 1: Decreases damage dealt of Balance of Power but penetrates the target's Defense. Cannot trigger a critical hit or a heavy blow.

- [ ] **S3 — Nature Restoration** — Non-attack cast supported; remaining effects listed below
  - Current base support: nonAttack. Non-attack cast implemented; pending: S3-ready turn-start debuff-duration reduction
  - Review/work: S3-ready turn-start debuff-duration reduction
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: By restoring balance that has been destroyed, dispels all debuffs from all allies and grants increased Attack and immunity for 2 turns. Increases Combat Readiness of the caster by 50%. When this skill is not on cooldown, at the start of the turn, decreases debuff durations of the caster by 1 turn.
  - Non-attack source note (no damage formula): Skill3<br>
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

### Mei Lin (c1191)

- [ ] **S1 — Unknown skill** — Skill execution unsupported
  - Current base support: unsupported. API skill data unavailable
  - Review/work: API skill data unavailable
  - Description: No source description available.

- [ ] **S2 — Unknown skill** — Skill execution unsupported
  - Current base support: unsupported. API skill data unavailable
  - Review/work: API skill data unavailable
  - Description: No source description available.

- [ ] **S3 — Unknown skill** — Skill execution unsupported
  - Current base support: unsupported. API skill data unavailable
  - Review/work: API skill data unavailable
  - Description: No source description available.

### Melany (c3121)

- [ ] **S1 — Freeze!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy, with a 40% chance to --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Effect chance increases by 60% and a successful attack always results in a critical hit.

- [ ] **S2 — Agility** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When attacked, has a 25% chance to decrease damage suffered by 50%. When more than one damage reduction effect is granted, only the strongest effect is applied. At the end of the turn, increases Combat Readiness of the caster by 15%.
  - Source multiplier text (requires review): Skill2<br>

### Melissa (c1096)

- [ ] **S1 — Might** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Overpowers the enemy, with a 75% chance to make them --unhealable-- for 1 turn. Damage dealt increases proportional to the caster's lost Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1.1<br>0.35% increased damage per 1% self Health missing<br>30% heal on hit
  - Unparsed formula lines: 0.35% increased damage per 1% self Health missing; 30% heal on hit
  - EE 1: Absorbs some of the damage dealt as Health when using Might.

- [ ] **S2 — Manifestation** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy by unleashing their inner rage, before granting immortality and immunity to the caster for 1 turn. When the enemy is defeated, resets cooldown of this skill.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.8<br>!pow: 0.95<br>

- [ ] **S3 — Blood Bloom** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: After dispelling all buffs from the target, attacks the enemy by releasing pent-up aggression. Unaffected by elemental disadvantage and grants an extra turn. When the target is not an Elite or Boss monster, regardless of whether the attack hits, inflicts --curse-- for 2 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.2<br>!pow: 1<br>Curse Debuff: 60% of damage<br>
  - Unparsed formula lines: Curse Debuff: 60% of damage
  - Soulburn (20 souls): Ignores Effect Resistance.
  - EE 3: Increases Attack of the caster for 2 turns when using Blood Bloom.

### Mercedes (c1005)

- [ ] **S3 — Blazing Eye of Kal** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Releases the power of the Ancient Book to attack all enemies before increasing Attack of all allies for 2 turns.<br><br>After completing Eureka - 10. East Politia - 10-10. Central Control Room: --Volatility-- will remain throughout the battle.<br>After completing Eureka - 10. East Politia - The Final Destination: --Volatility-- debuff is replaced by Immense Power.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.2<br>!pow: 0.95<br>
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

### Mercenary Helga (c4023)

- [ ] **S1 — Armor Rend** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with an axe, with a 50% chance to --decrease Defense-- for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Attack Chain** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Strongly slams the enemy with an axe, with a 75% chance to --decrease Defense-- for 2 turns. A critical hit will extend any buffs granted to the caster by 1 turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Cry of Victory** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Encourages all allies, increasing Attack and Effectiveness for 2 turns before increasing Combat Readiness of the caster by 50%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

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

### Mighty Scout (m0063)

- [ ] **S1 — Unknown skill** — Skill execution unsupported
  - Current base support: unsupported. API skill data unavailable
  - Review/work: API skill data unavailable
  - Description: No source description available.

- [ ] **S2 — Unknown skill** — Skill execution unsupported
  - Current base support: unsupported. API skill data unavailable
  - Review/work: API skill data unavailable
  - Description: No source description available.

- [ ] **S3 — Unknown skill** — Skill execution unsupported
  - Current base support: unsupported. API skill data unavailable
  - Review/work: API skill data unavailable
  - Description: No source description available.

### Milim (c1122)

- [ ] **S1 — Dragon Dive** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy, recovering Health proportional to damage dealt before increasing Attack of the caster for 1 turn.
  - Resource: focus; base gain 1; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1.1<br>!pow: 1<br>20% Lifesteal<br>
  - Unparsed formula lines: 20% Lifesteal
  - Soulburn (20 souls): Grants an extra turn.
  - EE 1: Increase Dragon Dive's amount recovered by 20%.

- [ ] **S2 — Dragon Eye (Milim Eye)** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: At the start of battle and at the end of the turn, has a 100% chance to grant Dragon Eye (Milim Eye) to the caster for 1 turn. At the start of the turn, when the caster is granted Dragon Eye (Milim Eye), dispels stealth from all enemies. Ignores Effect Resistance. After attacking, when Focus is full, activates Dragon Buster.<br>Dragon Buster (consumes 5 Focus): Attacks all enemies with overwhelming mana and inflicts 10 Soul Removal.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2 (Dragon Buster)<br>att_rate: 1<br>!pow: 1.3<br>
  - Unparsed formula lines: Skill2 (Dragon Buster)
  - EE 2: Increase damage dealt by Dragon Buster by 10%.

- [ ] **S3 — Dragon Fear** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy by releasing mana, and when the enemy is defeated, inflicts extinction. Grants increased Evasion to the caster for 3 turns. When the enemy is not an Elite or Boss monster, ignores damage share.
  - Resource: focus; base gain 2; required/spent 0.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.7<br>!pow: 1<br>
  - EE 3: When the enemy is defeated with Dragon Fear, acquires 1 additional Focus.

### Mirsa (c3014)

- [ ] **S1 — Double Edge** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with dual-wielded swords, with a 50% chance to --decrease Speed-- for 2 turns. Damage dealt increases proportional to the caster's Speed.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.9<br>!pow: 1<br>0.075% self Speed (0.00075 * Speed)<br>

- [ ] **S2 — Brush Off** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Evasion chance by 50%. At the moment the caster is attacked, if the caster successfully evades, decreases cooldown of the caster by 1 turn and increases Speed for 2 turns.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>20% base dodge, gains 15-30% more (based on mola) under 50% health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; 20% base dodge, gains 15-30% more (based on mola) under 50% health

- [ ] **S3 — Raid** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Ambushes the target, --silencing-- them for 2 turns. Damage dealt increases proportional to the caster's Speed.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.8 (2.5 soulburn)<br>!pow: 0.85<br>0.15% self Speed (0.0015 * Speed)<br>
  - Soulburn (10 souls): Increase damage dealt.

### Mistychain (c3072)

- [ ] **S1 — Vampirism** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Claws at the enemy, absorbing some of the damage to heal all allies.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>7% of damage gained as life<br>
  - Unparsed formula lines: 7% of damage gained as life

- [ ] **S2 — Banshee's Curse** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Casts a spell at the enemy, with a 100% chance each to make them --unhealable-- and --decrease Attack-- for 2 turns.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.3<br>!pow: 1.05<br>

- [ ] **S3 — Life Drain** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks by absorbing the enemy's life force. Some of the damage dealt is absorbed to heal all allies. When the enemy is defeated, grants revive for 2 turns to the ally with the lowest Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5(2.2 soulburn)<br>!pow: 1<br>15% of damage gained as life<br>
  - Unparsed formula lines: 15% of damage gained as life
  - Soulburn (10 souls): Increases damage dealt.

### Monarch of the Sword Iseria (c6024)

- [ ] **S1 — Revelation** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with sword fragments. Penetrates the target's Defense. When triggered as a counterattack, activates Sword of Duty instead.<br>Sword of Duty: After inflicting --fracture-- on the caster, attacks the enemy with the ritual sword, and increases Combat Readiness of the caster and the foremost ally except for the caster by 25%. Inflicts additional damage proportional to the caster's Attack on the target and up to 25% injuries.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.3 (0.5 soulburn)<br>!pow: 1<br><br><br>Skill1 (Proc)<br>att_rate: 0.3<br>!pow: 1<br>Additional damage: 125% caster's Attack and 20% injury<br>
  - Unparsed formula lines: Skill1 (Proc); att_rate: 0.3; !pow: 1; Additional damage: 125% caster's Attack and 20% injury
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S2 — Elbris's Successor** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Increases Hit Chance and Penetration Resistance by 70%. All counterattack chances of the caster are doubled, and when counterattacking, if the target is a Hero, triggers a counterattack from the foremost ally. After attacking, grants a barrier (proportional to Attack) to the caster for 2 turns.
  - Source multiplier text (requires review): Skill2<br>Barrier Strength: 70% caster's Attack<br>
  - Unparsed formula lines: Barrier Strength: 70% caster's Attack
  - EE 1: Increases the amount of Hit Chance and Penetration Resistance increased by Elbris's Successor by 30%.

- [ ] **S3 — Dawnbreaker** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: After inflicting --fracture-- on the caster and dispelling all debuffs, attacks all enemies with the power of the ritual sword. Inflicts additional damage proportional to the caster's Attack on the target and up to 25% injuries.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.3<br>!pow: 1<br>Additional damage: 155% caster's Attack and 25% injury<br>
  - Unparsed formula lines: Additional damage: 155% caster's Attack and 25% injury

### Montmorancy (c3042)

- [ ] **S1 — Sleep Sorcery** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with water energy, with a 75% chance to put them to --sleep-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Purification** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Description: Dispels one debuff from all allies and heals debuffed allies. Amount recovered is proportional to the ally's max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 7% target max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 7% target max Health

- [ ] **S3 — Watery Curtain** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Recover's ally's Health and grants immunity for 2 turns, before increasing the caster's Combat Readiness by 50%. Amount recovered increases proportional to the ally's max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 35% target max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 35% target max Health
  - Soulburn (20 souls): Effect is granted to all allies.

### Moon Bunny Dominiel (c6037)

- [ ] **S1 — Moonlight Wave** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with an ethereal moonlight wave and has a 75% chance to put them to --sleep-- for 1 turn. This skill does not trigger a Dual Attack.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.9<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Flow Control** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of an enemy's extra turn, dispels all debuffs from all allies before granting skill nullifier once and skill effect nullifier once, and increases Combat Readiness of the caster by 30%. Only activates when the enemy is a Hero.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Divination** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: In accordance with the divinations, grants vigor and a barrier (proportional to the caster's max Health) to all allies for 2 turns and increases Combat Readiness by 30%. 
  - Source multiplier text (requires review): Skill3<br>Barrier Strength: 20% of Self Max HP<br>
  - Unparsed formula lines: Barrier Strength: 20% of Self Max HP

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

### Mucacha (c3033)

- [ ] **S2 — Wild** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Speed by 2% each time the caster attacks an enemy. Effect can only stack up to 5 times.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Enlightened Blow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks with a fatal blow, with a 100% chance to --decrease Defense-- for 2 turns, before increasing Speed of the caster for 2 turns. Damage dealt increases proportional to the caster's Speed.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5<br>!pow: 1<br>0.075% self Speed (0.00075 * Speed)<br>
  - Soulburn (20 souls): Grants an extra turn.

### Mui (c1044)

- [ ] **S1 — Lash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a whip, with a 100% chance to inflict --target-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Punishment** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks all enemies by calling upon a trained monster, with a 50% chance each to inflict two --bleeding-- effects for 2 turns and a 80% chance to inflict --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.8<br>!pow: 1<br>
  - Soulburn (20 souls): All skill cooldowns decreased by 2 turns.
  - EE 1: Increases Punishment's effect chance by 10%.

- [ ] **S3 — Grand Finale** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Drives monsters forward to attack all enemies and dispels two buffs. Grants increased Attack to all allies for 3 turns, and increases Combat Readiness of the caster by 30% per critical hit.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 0.95<br>
  - EE 2: Grants enhanced Dual Attack to the ally with the highest Attack after using Grand Finale.
  - EE 3: --Silences-- the enemy with the highest Combat Readiness for 1 turn after using Grand Finale.

### Muse Rima (c4062)

- [ ] **S1 — Quick Shot** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks with a quick shot of an arrow. A critical hit will decrease the caster's skill cooldown by 1 turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Lullaby Arrow** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Shoots an arrow infused with a sleep toxin, with a 100% chance to put them to --sleep-- for 1 turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S3 — Hopeful Hymn** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Encourages an ally except for the caster, decreasing skill cooldowns by 3 turns and increasing Attack for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Muwi (c3132)

- [ ] **S1 — Leap Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Leaps to attack the enemy, with a 50% chance to inflict --bleeding-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Coldhearted Management** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: After the foremost ally is attacked, counterattacks with Blade Flurry, and when all allies are Ice elemental heroes, increases Combat Readiness of all allies by 10%. Blade Flurry takes priority over a counterattack with a basic skill and can only be activated once every 2 turns.<br>Blade Flurry: Attacks the enemy with a swordstorm, --decreasing Attack-- for 2 turns.
  - Source multiplier text (requires review): Skill2 counter<br>att_rate: 0.8<br>!pow: 1<br>
  - Unparsed formula lines: Skill2 counter

- [ ] **S3 — Wind Cutter** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with a sword, with a 75% chance to --decrease Defense-- for 2 turns. Increases Attack of the caster for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1 (1.25 soulburn)<br>!pow: 1.1<br>
  - Soulburn (10 souls): Increases damage dealt.

### Nahkwol (c1151)

- [ ] **S1 — Phantom Brush** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a brush, with a 75% chance to --silence-- for 1 turn. After attacking, if the target is inflicted with --silence--, decreases Combat Readiness by 20%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Forbidden Incantation** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: --Seals-- the enemy for 2 turns before attacking, and increases Speed of the caster for 2 turns.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.5<br>!pow: 1<br>

- [ ] **S3 — Spiritual Devouring** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Attacks all enemies with a powerful spell, dispelling all buffs before inflicting --bind-- for 2 turns and increasing skill cooldowns by 1 turn. Grants an extra turn to the caster.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Navy Captain Landy (c2109)

- [ ] **S1 — Precision Targeting** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with gunfire, and increases Combat Readiness of the caster by 25%. After attacking, has a 40% chance to activate Salvo Fire as an extra attack.<br>Salvo Fire: Attacks all enemies by firing off artillery, and recovers Health of the caster proportional to Attack.
  - Resource: fightingSpirit; base gain 25; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1.1<br>!pow: 1<br><br><br>Skill1 (Proc)<br>att_rate: 0.8<br>!pow: 1.3<br>Heal Strength: 80% Caster's Max Attack (0.8 * Max Attack)<br>
  - Unparsed formula lines: Skill1 (Proc); att_rate: 0.8; !pow: 1.3; Heal Strength: 80% Caster's Max Attack (0.8 * Max Attack)
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Ruler of the Sea** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Immune to debuffs which prevent movement and increases Critical Hit Resistance by 70%. At the start of battle, increases Critical Hit Resistance of all allies except for the caster for 2 turns. After attacking, increases Attack of the caster by 10%. This effect can stack up to 5 times.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Mobilize the Warship!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After increasing Attack of the caster for 3 turns, attacks all enemies with a warship, --stunning-- for 1 turn. Penetrates the target's Defense by 60%.
  - Resource: fightingSpirit; base gain 0; required/spent 100.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1<br>!pow: 1<br>Penetration: 60%<br>
  - Unparsed formula lines: Penetration: 60%

### Nemunas (c3061)

- [ ] **S2 — Shock Arrow** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Powerfully shoots an arrow at the enemy, --decreasing Hit Chance-- for 2 turns and Combat Readiness by 30%. Damage dealt increases proportional to the enemy's max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1(1.7 soulburn)<br>!pow: 0.8<br>5% target max Health, 8.5% soulburn<br>
  - Unparsed formula lines: 5% target max Health, 8.5% soulburn
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — A Girl's Determination** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Encourages all allies, dispelling one debuff, and increases Attack of the caster for 2 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

### New Kid Adin (c2165)

- [ ] **S1 — An Opening!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a bamboo sword, inflicting injuries. The severity of injuries increases proportional to damage dealt. Injuries decrease max Health of the target by up to 10% every time this skill is used. When the caster is granted vigor, a successful attack will inflict additional damage equivalent to 50% of injuries inflicted on the target.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.9<br>!pow: 1<br>
  - Soulburn (10 souls): Attacks all enemies. This attack does not trigger a Dual Attack.
  - EE 1: Absorbs some of the damage dealt as Health when using An Opening!.

- [ ] **S2 — You Started This!** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Increases Evasion by 50%, and when successfully evading, grants vigor to the caster for 1 turn and counterattacks. Counterattack can only be activated once per turn. At the end of someone's turn, when the caster is granted vigor, increases Combat Readiness of the caster by 20%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - EE 2: With You Started This!'s effect, increases Combat Readiness by an additional 5%.

- [ ] **S3 — Scattering Petals, Falling Leaves** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After increasing Attack of the caster for 3 turns, attacks the enemy with an exceptional technique, inflicting injuries. The severity of injuries increases proportional to damage dealt. Injuries decrease max Health of the target by up to 30% every time this skill is used. When the caster is granted vigor, a successful attack deals additional damage equivalent to 100% of injuries inflicted on the target.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.4<br>!pow: 1<br>Additional damage: 100% of injuries<br>
  - Unparsed formula lines: Additional damage: 100% of injuries

### New Moon Luna (c2066)

- [ ] **S2 — Demon-Sealing Spear** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy by thrusting down a spear, inflicting --decreased Defense-- for 1 turn, and increases Combat Readiness of the caster by 50%. A successful attack will inflict additional damage on all enemies. Damage dealt and additional damage increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.7<br>!pow: 0.95<br>Max Health scaling 20% (0.20 * self Max Health)<br>Additional damage: 16% caster's max Health (0.16 * Health)
  - Unparsed formula lines: Additional damage: 16% caster's max Health (0.16 * Health)

- [ ] **S3 — Moon's Judgment** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Using mana, dispels all buffs from all enemies before --sealing-- and making them --unable to be buffed-- for 2 turns. At the start of the first battle, grants skill effect nullifier once to the caster.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (20 souls): Ignores Effect Resistance.

### Notos (c2181)

- [ ] **S1 — Divinity Release** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: (Notos) Attacks the enemy with divinity and has a 75% chance to inflict --decreased Defense-- for 1 turn. Damage dealt increases proportional to the caster’s max Health.<br>(God of Battle) Attacks the enemy and deals additional damage proportional to the caster’s max Health. Damage dealt increases proportional to the caster’s max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.5<br>!pow: 0.9<br>Health scaling: 10% caster's max Health<br><br><br>Skill1 (God of Battle)<br>att_rate: 0.5<br>!pow: 0.9<br>Health scaling: 6% caster's max Health<br>Additional damage: 15% caster's max Health
  - Unparsed formula lines: Skill1 (God of Battle); att_rate: 0.5; !pow: 0.9; Health scaling: 6% caster's max Health; Additional damage: 15% caster's max Health

- [ ] **S2 — Blaze of Battle** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: (Notos) Unaffected by Combat Readiness increase and decrease effects.<br>(God of Battle) Attacks the enemy with transcendent power. Penetrates the target’s Defense by 50%. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2 (God of Battle)<br>att_rate: 0.6 (0.9 soulburn)<br>!pow: 0.9<br>Health scaling: 20% caster's max Health (30% with soulburn)<br>Def pen: 50%
  - Unparsed formula lines: Skill2 (God of Battle); Def pen: 50%
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — God’s Might** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Grants God of Battle to the caster for 3 turns and fully recovers Health. While God of Battle is maintained, changes the battlefield into the Sanctuary of Battle. Begins the first battle with a full skill cooldown count.<br><br>Sanctuary of Battle<br>In the Sanctuary of Battle, all Heroes are immune to buffs and debuffs.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Ocean Breeze Luluca (c5082)

- [ ] **S1 — Order's In, Just Wait!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with overflowing energy, and increases Combat Readiness of the ally with the highest Combat Readiness except the caster by 15%
  - Resource: focus; base gain 1; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Combat Readiness increase effect will be applied to all allies.
  - EE 1: Increases Combat Readiness by an additional 5% when using Order's In, Just Wait!

- [ ] **S2 — One Luluca's Special!** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: After an enemy uses a non-attack skill, gains 2 Focus and increases Combat Readiness of the caster by 25%. Can only be activated once every 2 turns. After using a skill, when Focus is full, consumes all Focus and activates Luluca's Special Delivery.<br>Luluca's Special Delivery: Attacks all enemies who are interrupting her delivery, dispelling two buffs and an 85% chance to inflict --silence-- for 1 turn and a 100% chance to --decrease Hit Chance-- for 2 turns, before decreasing skill cooldowns of the caster by 1 turn.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2 (Proc)<br>att_rate: 1<br>!pow: 1<br>
  - Unparsed formula lines: Skill2 (Proc)
  - EE 2: Increasees Combat Readiness of the caster by an additional 15% after an enemy uses a non-attack skill.

- [ ] **S3 — This One's On Me** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: With quality customer service, dispels two debuffs from all allies and grants increased Defense for 2 turns and an ice cream.
  - Resource: focus; base gain 3; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Operator Sigret (c2072)

- [ ] **S1 — Incision** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy with a scythe, before recovering Health of the ally with the lowest Health proportional to the caster’s Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Heal strength: 30% caster's Attack <br>
  - Unparsed formula lines: Heal strength: 30% caster's Attack 

- [ ] **S2 — Annihilation** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: After granting increased Attack to the caster for 2 turns, attacks the enemy by swiping consecutively with a scythe. When the enemy is defeated, grants an extra turn . Penetrates the target's Defense by 100%. When the target is granted a barrier, increases damage dealt.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.33<br>!pow: 1<br>100% Penetration<br>Damage increase if target has barrier: 200%
  - Unparsed formula lines: 100% Penetration; Damage increase if target has barrier: 200%
  - EE 1: The extra turn condition triggered by Annihilation will be changed to when a critical hit is made.

- [ ] **S3 — Obliterate** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Calls in drones to attack all enemies, with a 100% chance each to decrease buff durations by 1 turn before decreasing Combat Readiness by 30%. Grants increased Attack to all allies for 2 turns. When the target is granted a barrier, ignores Effect Resistance.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.2 (1.45 soulburn)<br>!pow: 1.1<br>
  - Soulburn (10 souls): Increases damage dealt.

### Orte (c3133)

- [ ] **S2 — Overflowing Enthusiasm** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When the caster is at max Health at the start of the turn, grants perception to the caster for 1 turn. After attacking, if the caster has perception and when the enemy is not an Elite of Boss monster, increases Attack of the caster for 1 turn and activates the same skill as an extra attack. Effect after attacking can only be activated once every 1 turn(s).
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — No Mercy for the Weak** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a swift swordstorm. Penetrates the target's Defense by 30%. When the Speed of the Caster is greater than the Speed of the target, penetration rate increases proportional to the difference, op to a maximum of 70%. Damage dealt increases proportional to the Speed of the caster.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.7<br>!pow: 0.95<br>0.075% self Speed (0.00075 * Speed)<br>30% + 0.3% def pen per speed over the target, caps at 70%<br><br>>=133.3 speed difference = 70% pen
  - Unparsed formula lines: 30% + 0.3% def pen per speed over the target, caps at 70%; >=133.3 speed difference = 70% pen
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Otillie (c3045)

- [ ] **S1 — Dark Arrow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with dark energy, with a 50% chance to make the enemy --unhealable-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Area Defense** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: All allies receive 30% less damage from attacks that target all allies. When more than one damage reduction effect is granted, only the strongest effect is applied.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Mana Release** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Exhales powerful darkness to attack the enemy, decreasing Combat Readiness by 40%, before --silencing-- and making them --unable to be buffed-- for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.8<br>!pow: 1<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Pavel (c1080)

- [ ] **S2 — Storm Bullet** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Grants the caster increased Attack for 2 turns, before firing a strong blast of wind at all enemies. Damage dealt increases proportional to the caster's Speed. This skill cannot trigger a counterattack.
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

### Peacemaker Furious (c2087)

- [ ] **S2 — Set in Motion** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Increases Speed and Defense of all allies for 2 turns, before granting an extra turn to the caster.
  - Resource: focus; base gain 3; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

### Pearlhorizon (c3073)

- [ ] **S1 — Chaos Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Claws the enemy, with a 50% chance to --decrease hit Chance-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Hypnosis** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies, with a 50% chance to put them to --sleep-- for 1 turn. Increases Combat Readiness of the caster by 10% per --sleep-- debuff inflicted.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.6<br>!pow: 1<br>

- [ ] **S3 — Nightmare** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy and --stuns-- them for 1 turn. When the enemy is --asleep--, deals additional damage equivalent to 20% of the target's max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5<br>!pow: 0.9<br>20% target max Health as extra damage when they're asleep (30% as awakened pearlhorizon)<br>
  - Unparsed formula lines: 20% target max Health as extra damage when they're asleep (30% as awakened pearlhorizon)
  - Soulburn (20 souls): Ignores Effect Resistance.

### Peira (c1125)

- [ ] **S1 — Wolven Claw** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Slashes the enemy with sharp claws, with a 40% chance to --stun-- for 1 turn. When the caster is granted a barrier, effect chance increases by 25%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increase effect chance to 100%.

- [ ] **S2 — Punishing Blade** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Attacks all enemies with guardian spirits, decreasing buff durations by 1 turn before --restricting-- and making them --unable to be buffed-- for 2 turns. Grants an extra turn to the caster.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S3 — Pack Hunt** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Using the power of the Goblet of Oath, increases Attack of all allies except for the caster for 2 turns, before granting stealth, escort, and a barrier to the caster for 3 turns. Barrier strength increases proportional to the caster's level.
  - Source multiplier text (requires review): Skill3<br>Barrier Strength: Probably 180 shield per level. (10800 @ 60)<br>CS_ADD_SHIELD_CASTER_LEVEL 180
  - Unparsed formula lines: Barrier Strength: Probably 180 shield per level. (10800 @ 60); CS_ADD_SHIELD_CASTER_LEVEL 180

### Penelope (c3125)

- [ ] **S1 — Merciless Sword** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy before increasing Attack of the caster by 15%. When an enemy is defeated, increases Combat Readiness of the caster by 75%. Increased Attack effect can stack up to 3 times.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1 (1.6 soulburn)<br>!pow: 1<br>
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S2 — Preliminary Plans** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Decreases debuff duration of all allies by 1 turn before granting a barrier to the caster for 3 turns. Grants an extra turn to the caster. Barrier strength increases proportional to the caster's Attack.
  - Source multiplier text (requires review): Skill2<br>Barrier Strength: 65% of Self Attack<br>
  - Unparsed formula lines: Barrier Strength: 65% of Self Attack

- [ ] **S3 — Disarm** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Inflicts resource reduction on the target by 100% before attacking the, with a 100% chance each to --decrease Attack-- for 2 turns, and --stun-- for 1 turn. Grants stealth to the caster for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.8<br>!pow: 1.2<br>

### Perfumer Byblis (c5154)

- [ ] **S1 — Rose Breeze** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with scented paper, and has a 75% chance to inflicted --decreased Defense-- for 1 turn. 
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Triggers a Dual Attack from the ally with the highest Attack.

- [ ] **S2 — Elixir de Belle Nuit** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of an enemy's turn, grants lingering fragrance to all allies for 1 turn. When an ally's Health is 50% or less after being attacked, activates La Vie en Rose.<br>La Vie en Rose: Dispels two debuffs from all allies and recovers Health before granting a barrier for 2 turns. Amount recovered and barrier strength increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2<br>Heal strength: 23% caster's max Health<br> Barrier strength: 10% caster's max Health
  - Unparsed formula lines: Heal strength: 23% caster's max Health;  Barrier strength: 10% caster's max Health

- [ ] **S3 — Aura de la Mort** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After granting increased Effectiveness to the caster for 3 turns, spreads the scent of death, inflicting --redirected provoke-- on all enemies for 1 turn and a 100% chance to inflict two --venom-- effects for 2 turns. At the end of the turn, detonates venom effects inflicted on the target.
  - Source multiplier text (requires review): Skill3<br>Detonation multiplier: 1<br>
  - Unparsed formula lines: Detonation multiplier: 1

### Pernilla (c3165)

- [ ] **S1 — Skyward Slash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a sword, with a 50% chance to --decrease Defense-- for 2 turns. When Ragnvald is on the ally team, triggers a Dual Attack from Ragnvald.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.65<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Coldhearted Judgment** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Dispels two debuffs from the target and the caster and grants a barrier for 2 turns. Barrier strength increases proportional to the caster's Attack. If the target was Ragnvald, grants an extra turn to the caster and extends the caster's buff durations by 1 turn.
  - Source multiplier text (requires review): Skill2<br>Barrier strength: 70% caster's Attack<br>
  - Unparsed formula lines: Barrier strength: 70% caster's Attack

- [ ] **S3 — Chase** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a sword, with a 100% chance to --decrease Speed-- for 2 turns, and increases Speed of all allies for 2 turns.
  - Supported damage formula (reference only): Skill3<br><br><br>att_rate: 1.8<br>!pow: 1<br>

### Pirate Captain Flan (c2110)

- [ ] **S1 — Execution** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a gun, stealing one buff. At the end of the turn, detonates --bomb-- effects inflicted on the target.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7<br>!pow: 0.95<br>Detonation multi: 1.0<br>
  - Unparsed formula lines: Detonation multi: 1.0
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Scourge of the Sea** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When attacked, grants 30% damage reduction. After an ally attacks, when the target does not have a buff, activates Hunt.<br>Hunt: By raising morale, grants swift attack to all allies and increases Combat Readiness by 15%.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Full Burst** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks all enemies with a barrage of cannon fire, stealing one buff before a 85% chance to --decrease Defense-- for 2 turns, and a 100% chance to plant a --bomb-- for 2 turns, and decreases Combat Readiness by 20%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.8<br>!pow: 1<br>
  - EE 1: When using Full Burst, steals one additional buff from the target and randomly grants it to an ally.

### Politis (c1112)

- [ ] **S1 — Call of the Stars** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Summons dolls to attack the enemy, with a 40% chance to --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Astral Guide** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When the enemy is not an Elite or Boss monster, reduces the effect of Combat Readiness increases granted to the enemy by 50%. When an enemy uses a non-attack skill, activates Tranquility.<br>Tranquility: Attacks all enemies, decreasing buff durations by 1 turn, before increasing Combat Readiness of the caster by 30%.
  - Source multiplier text (requires review): Skill2Proc<br>att_rate: 1<br>!pow: 0.9<br>
  - Unparsed formula lines: Skill2Proc

- [ ] **S3 — Starfall** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies with alien technology, with a 100% chance each to inflict --decreased Hit Chance-- and --cannot buff-- for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1.1<br>

### Purrgis (c1035)

- [ ] **S1 — Falling Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a great sword, with a 50% chance each to inflict --decreased Speed-- for 2 turns and decrease Combat Readiness by 20%. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>5% self max Health (0.05 * Health)<br>

- [ ] **S2 — Get Lost!** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: When attacked, has a 30% chance to counterattack. When counterattacking, activates Get Lost!.<br>Get Lost! (gains 1 Soul): Attacks all enemies with a great sword. Inflicts the same debuffs as Falling Strike before a 15% chance to inflict --stun-- for 1 turn. Damage dealt increases proportional to the caster's max Health. This attack receives effects that are applied to the basic skill.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Final Blow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with a powerful ground pound, and has a 50% chance to inflict --stun-- for 1 turn. When the target’s Health is 30% or less, increases effect chance by 50%. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.8(1.05 soulburn)<br>!pow: 1<br>10% self max Health (0.10 * Health)<br>
  - Soulburn (10 souls): Increases damage dealt.

### Pyllis (c3005)

- [ ] **S1 — Weakening Blow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy, with a 75% chance to --provoke-- for 1 turn. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.7<br>!pow: 1<br>50% self Defense (0.5 * Defense)<br>

- [ ] **S2 — Will** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the moment the caster is attacked, increases Defense of the caster. At the moment of every fourth attack suffered, increases Defense of all allies for 2 turns. The caster's increased Defense can stack up to 3 times.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>6.7% Defense increase per stack, scales up to 10% with molagora<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; 6.7% Defense increase per stack, scales up to 10% with molagora

- [ ] **S3 — Guard** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy before --provoking-- for 1 turn, and grants a barrier to all allies for 2 turns. Damage dealt and barrier strength increase proportional to the caster's Defense.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.3<br>!pow: 0.95<br>70% self Defense (0.7 * Defense)<br>Barrier strength: 80% self Defense
  - Unparsed formula lines: Barrier strength: 80% self Defense
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Ragnvald (c3164)

- [ ] **S1 — Leap Cut** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy with a sword, and recovers Health of the caster. When Pernilla is on the ally team, triggers a Dual Attack from Pernilla. Amount recovered increases proportional to the caster's Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.65<br>!pow: 1<br>Heal strength: 30% caster's Attack<br>
  - Unparsed formula lines: Heal strength: 30% caster's Attack

- [ ] **S2 — Power of Bonds** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the end of the turn, increases Combat Readiness of the caster by 15%. At the start of battle, when Pernilla is on the ally team, increases Effectiveness and Effect Resistance of the caster and Pernilla by 100%. The rate of this effect does not change after it is activated.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Desperate** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a sword, dispelling two buffs and --decreasing Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.8<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.

### Ram (c1115)

- [ ] **S1 — How Boring.** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with wind, with a 75% chance to --decrease Attack-- for 1 turn. When the caster is buffed, effect chance increases by 25%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Attacks all enemies. This attack does not trigger a Dual Attack.

- [ ] **S2 — What Are You Looking At?** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Attack by 30%. Reduces the effect of decreased Combat Readiness debuffs inflicted on the caster by 100%.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — El Fura** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a gust of wind, --decreasing Defense-- for 2 turns, and grants increased Attack (Greater) to the caster for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.8<br>!pow: 1<br>

### Ran (c1118)

- [ ] **S2 — Mental Focus** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Grants immunity to all allies for 2 turns, before granting skill nullifier once to the caster and increased Attack to the caster for 2 turns. Grants an extra turn.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Instant Blade** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with a sword, dispelling two buffs before a 100% chance to inflict --frostbite-- and --restrict-- for 2 turns, and a critical hit will have a 85% chance to inflict --decreased Defense-- for 2 turns. Damage dealt increases proportional to the caster and the target's Speed.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.8<br>!pow: 1<br>0.075% self Speed (0.00075 * Speed)<br>0.15% target Speed (0.0015 * Speed)
  - Unparsed formula lines: 0.15% target Speed (0.0015 * Speed)
  - Soulburn (20 souls): Ignores Effect Resistance.

### Ras (c1001)

- [ ] **S2 — Command Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy repeatedly, before triggering a Dual Attack from the ally with the highest Attack.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.5<br>!pow: 1<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

- [ ] **S3 — Sword of the Heir** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Strongly attacks all enemies with a swordstorm, before increasing Defense of all allies for 2 turns. Damage dealt increases proportional to the caster's max Health. 
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.9<br>!pow: 1<br>12% self max Health (0.12 * Health)<br>

### Ravi (c1019)

- [ ] **S1 — Slaughter** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a double-edged axe, and absorbs some of the damage dealt as Health. A successful attack always results in a critical hit.
  - Resource: fightingSpirit; base gain 30; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1 (2.5 soulburn)<br>!pow: 1<br>38% of damage as healing<br>
  - Unparsed formula lines: 38% of damage as healing
  - Soulburn (20 souls): Greatly increases amount of damage dealt. Does not trigger a Dual Attack.

- [ ] **S2 — Demon's Blood** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Description: At the start of the first battle, gains 60 Fighting Spirit and increases Attack proportional to max Health. After being attacked, increases Combat Readiness by 15%, and after suffering a critical hit, dispels one debuff from the caster.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Implemented resource passive portions: battle-start grant. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>HP to attack scaling: increase attack by 8% of the caster's max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; HP to attack scaling: increase attack by 8% of the caster's max Health

- [ ] **S3 — Devil Drive** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Brutally attacks all enemies, inflicting up to 20% injuries before a 75% chance to --stun-- for 1 turn. A successful attack always results in a critical hit.
  - Resource: fightingSpirit; base gain 0; required/spent 100.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.2<br>!pow: 0.95<br>
  - EE 3: Increase Devil Drive's chance to --stun-- by 10%.

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

- [ ] **S3 — Invigorate** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: By infusing vitality, dispels all debuffs from all allies and grants immunity for 2 turns before recovering Health proportional to the target’s max Health.
  - Source multiplier text (requires review): Skill3<br>Heal strength: 15% Target Max Health, 25% soulburn<br>
  - Unparsed formula lines: Heal strength: 15% Target Max Health, 25% soulburn
  - Soulburn (10 souls): Increases the amount recovered.
  - EE 3: Increases Defense of the caster for 2 turns when using Invigorate.

### Rem (c1114)

- [ ] **S1 — Leave it to Me.** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a morning star, with a 50% chance to --decrease Defense-- for 2 turns. When the caster is granted Demon Mode, grants the caster an extra attack with the same skill.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.9<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — A Maid's Pride** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: When somebody dies, dispels all debuffs from the caster and grants Demon Mode for 2 turns. When an ally except for the caster is attacked, has a 20% chance to counterattack with Iron Strike. Iron Strike takes priority over a counterattack with a basic skill.<br>Iron Strike: Attacks all enemies, decreasing buff durations by 1 turn and inflicting --unhealable-- for 1 turn.
  - Source multiplier text (requires review): Skill2 counter<br>att_rate: 0.8<br>!pow: 1.3<br>
  - Unparsed formula lines: Skill2 counter

- [ ] **S3 — I Will Punish You!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Increases Attack of the caster for 3 turns, before leaping up to attack all enemies and --decrease Hit Chance-- for 2 turns. Increases Combat Readiness of the caster by 50%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>

### Remnant Violet (c2074)

- [ ] **S1 — Sword Flash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Cuts the enemy, with a 75% chance to --decrease Hit Chance-- for 1 turn.
  - Resource: focus; base gain 1; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.2<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Concentration** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Evasion by 50%, and when evading, gains 1 Focus. After attacking or being attacked, when Focus is 5, activates Massacre against a random enemy and consumes all Focus.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Massacre** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Increases Attack of the caster for 3 turns, before attacking the enemy with a sword, and increases Combat Readiness of the caster by 50%. Penetrates the target's Defense by 50%.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5<br>!pow: 1<br>Penetration 50%<br>
  - Unparsed formula lines: Penetration 50%

### Renoa (c1193)

- [ ] **S1 — Instant Judgement** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Description: Attacks the enemy with a pistol. Damage dealt increases proportional to the caster's Defense. At the start of the turn, when Focus is full, changes to Black Thorn.<br>Black Thorn (Consumes 5 Focus): Attacks the enemy with thorns, and grants the maximum number of Dirge Bullets to the caster. Damage dealt increases proportional to the caster's Defense. The changed attack does not trigger a Dual Attack.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Black Rose** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Buffs and debuffs applied to the caster become Dirge Bullets. After using a skill on the caster's turn, when the caster has a Dirge Bullet, uses Dirge Bullet on a random enemy.<br>Dirge Bullet (Gains 1 Focus): Attacks the enemy with a pistol. Damage dealt increases proportional to the caster's Defense. Damage dealt and attack count increase proportional to the number of Dirge Bullets granted.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Flower of Devoured Fate** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Increases Combat Readiness of all allies by 50%, and grants three Dirge Bullets to the caster.
  - Resource: focus; base gain 2; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): The number of Dirge Bullets granted is doubled.

### Requiem Roana (c2102)

- [ ] **S1 — Touch of Darkness** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with magic, with a 75% chance to inflict --decreased Defense-- for 1 turn. Cannot trigger a critical hit or a heavy blow, and a successful attack will inflict additional damage proportional to the caster's Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Additional damage: 50% caster's Attack (0.5 * Attack)<br>
  - Unparsed formula lines: Additional damage: 50% caster's Attack (0.5 * Attack)
  - Soulburn (10 souls): Increases effect chance to 100% and decreases Defense for 2 turns.

- [ ] **S2 — Boundless Obsession** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Reduces the effect of Combat Readiness increases provided by Speed by 50%. At the start of the foremost ally's turn except for the caster, increases Combat Readiness of the caster by 100%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Eternal Lament** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Description: Attacks all enemies with a horde of illusions, dispelling one buff before increasing cooldowns by 1 turn and decreasing Combat Readiness by 30%. Cannot trigger a critical hit or a heavy blow, but penetrates the target's Defense.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.35<br>!pow: 1<br>Penetration: 100%<br>
  - Unparsed formula lines: Penetration: 100%

### Requiemroar (c3075)

- [ ] **S1 — Insanity** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Claws the enemy, with a 75% chance to --decrease Attack-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Blood Feast** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: All allies absorb 10% of the damage they inflict as Health. Every time an enemy dies, all allies recover 20% Health and the caster's Combat Readiness increases by 10%. Effects upon enemy death can only be activated once per turn.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Dirge** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks with magic, with a 100% chance to --decrease Defense-- for 2 turns, and increases Combat Readiness of all allies by 20%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.8(2.7 soulburn)<br>!pow: 1<br>
  - Soulburn (10 souls): Increases damage dealt.

### Researcher Carrot (c4051)

- [ ] **S1 — Swing** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with a staff, with a 75% chance to inflict --burn-- for 1 turn, before detonating burn effects inflicted on the enemy at the end of the turn.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.95<br>!pow: 1<br>Detonation multi: 1.1<br>
  - Unparsed formula lines: Detonation multi: 1.1

- [ ] **S2 — Flame Barrier** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: After being attacked, grants increased Attack and a barrier (proportional to Attack) for 1 turn, and inflicts --burn-- on the attacker for 1 turn.
  - Source multiplier text (requires review): Skill2<br>Barrier strength: 60-78% self Attack<br>
  - Unparsed formula lines: Barrier strength: 60-78% self Attack

- [ ] **S3 — Flame Spurt** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with a powerful fire, dispelling two buffs before a 75% chance each to inflict two --burn-- effects for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.

### Revna (c3160)

- [ ] **S1 — Infiltration** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a sword, with a 75% chance to --poison-- for 1 turn. When granted promotion, damage dealt increases proportional to the target's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>2.5% target max Health<br>

- [ ] **S2 — Ambition** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of the turn, when an enemy's Health is 50% or less, has a 100% chance to grant exploiting weak points to the caster. When an enemy dies, grants promotion to the caster. Promotion can stack up to 6 times.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Strike Target** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy relentlessly, with a 100% chance to inflict --target-- and --decreased Speed-- for 2 turns. When granted promotion, damage dealt increases proportional to the target's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5 (1.8 Soulburn)<br>!pow: 1<br>3% target max Health<br>
  - Soulburn (10 souls): Increases damage dealt.

### Rhianna and Luciella (c2185)

- [ ] **S1 — Half Moon Slash / Waning Moon Slash** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: --(Rhianna)-- Attacks the enemy with a dagger, inflicting --erosion-- for 2 turns. A critical hit will detonate erosion effects inflicted on the target.<br><br>(Luciella) After granting increased Attack to the caster for 1 turn, attacks the enemy with a dagger and absorbs some of the damage dealt as health.
  - Source multiplier text (requires review): Skill1 (Rihanna)<br>att_rate: .7<br>!pow: .95<br><br><br>Skill1 (Luciella)<br>att_rate: 1<br>!pow: .95<br>Heal strength: 40% of the damage inflicted<br>
  - Unparsed formula lines: Skill1 (Rihanna); Skill1 (Luciella); att_rate: 1; !pow: .95; Heal strength: 40% of the damage inflicted

- [ ] **S2 — Hunter's Mark / Blade of Pursuit** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: --(Rhianna)-- Attacks the enemy, dispelling two buffs before inflicting --bind-- and --decreased Defense-- for 2 turns. Swaps with Luciella and grants an extra turn. After attacking, when the target has a debuff, Luciella activates Waning Moon Slash as an extra attack.<br><br>(Luciella) After granting increased Attack to the caster for 3 turns, attacks the enemy. Swaps with Rhianna and grants an extra turn. After attacking, when the target's Health is 50% or less, Rhianna activates Half Moon Slash as an extra attack.
  - Source multiplier text (requires review): Skill2 (Rihanna)<br>att_rate: 1<br>!pow: 1<br><br><br>Skill2 (Luciella)<br>att_rate: 1.5 (3 with soulburn)<br>!pow: 1<br>
  - Unparsed formula lines: Skill2 (Rihanna); Skill2 (Luciella); att_rate: 1.5 (3 with soulburn); !pow: 1
  - Soulburn (20 souls): --(Rhianna)-- Ignores Effect Resistance.<br>(Luciella) Increases damage dealt.

- [ ] **S3 — Pursuit of Death** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Rhianna and Luciella launch a coordinated attack. Luciella attacks all enemies and when the target is a Hero, ignores damage sharing. Rhianna dispels two buffs from all enemies, before inflicting --fear-- for 1 turn. Grants a barrier (proportional to Attack) to the caster for 3 turns. One Butterfly's Afterdream will remain throughout the battle.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.3<br>!pow: 1<br>Barrier strength: 160% caster's Attack<br>
  - Unparsed formula lines: Barrier strength: 160% caster's Attack

### Righteous Thief Roozid (c4013)

- [ ] **S1 — Hemorrhage** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Description: Cuts the enemy with dual-wielded swords, with a 50% chance to --decrease Speed-- for 2 turns. Damage dealt increases proportional to the caster's Speed.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Wind Slash** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks with a swordstorm, with a 70% chance to --decrease Attack-- for 2 turns. Damage dealt increases proportional to the caster's Speed.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — Moonlight Roar** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Increases Combat Readiness of all allies by 25% and grants increased Speed for 3 turns through the power of the moon. Grants an extra turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Rikoris (c3034)

- [ ] **S1 — Quick Pierce** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a spear, with a 50% chance to --decrease Defense-- for 2 turns. When the caster is granted increase Speed, effect chance increases by 25%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Cheer** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Encourages all allies, decreasing skill cooldown by 1 turn and increasing Speed for 2 turns.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

- [ ] **S3 — Flash Cut** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Decreases debuff duration of all allies by 1 turns, and attacks all enemies with a shockwave, with a 80% chance each to inflict --decreased Speed-- and --restrict-- for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.6<br>!pow: 1<br>

### Rima (c3062)

- [ ] **S2 — Lullaby Arrow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Shoots an arrow infused with a sleep toxin, with a 100% chance to put them to --sleep-- for 1 turn.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.3<br>!pow: 0.95<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S3 — War Hymn** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Description: Encourages an ally except for the caster, decreasing skill cooldowns by 3 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

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

### Rin (c1054)

- [ ] **S1 — Ring Throw** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Throws rings at the enemy to attack, with a 75% chance to dispel one buff, and increases Combat Readiness of the caster by 15%. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7<br>!pow: 0.9<br>5% self max Health (0.05 * Health)<br>1. atk up, speed up, crit up, crit dmg up, continuous heal
  - Unparsed formula lines: 1. atk up, speed up, crit up, crit dmg up, continuous heal

- [ ] **S2 — Dazzling Dance** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Dazzles the enemy with a dance, with a 75% chance to --decrease Defense-- for 2 turns, before a 50% chance to use Ring Throw. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.7<br>!pow: 1<br>7% self max Health (0.07 * Health)<br>2. def up, evasion, debuff immunity
  - Unparsed formula lines: 2. def up, evasion, debuff immunity
  - EE 1: Increases chance to use Ring Throw by 20% when using Dazzling Dance.

- [ ] **S3 — Showtime** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: With an elegant dance, recovers Health of all allies proportional to the target’s max Health before granting two random buffs for 3 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 20% target max Health<br>Barrier strength: 15% target max Health
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 20% target max Health; Barrier strength: 15% target max Health
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.
  - EE 2: Increases Showtime's amount recovered by 15%.
  - EE 3: Dispels one debuff from all allies before the skill effect when using Showtime.

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

### Riza Hawkeye (c1136)

- [ ] **S1 — Stand Back!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy by firing a pistol and has a 50% chance to --target-- them for 2 turns. When the caster is granted Hawk's Eye, after attacking, increases Combat Readiness of the foremost ally by 20%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.15<br>!pow: 1<br>

- [ ] **S2 — Devoted Support** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When the foremost ally is attacked by a Single Attack, decreases damage suffered by 30%. When more than one damage reduction effect is granted, only the strongest effect is applied.<br>When the foremost ally's Health is 50% or less after being attacked, dispels all debuffs from the foremost ally and the caster, and grants Hawk's Eye to the caster for 2 turns. Dispelling debuffs and Hawk's Eye effects can only be activated once every 3 turns.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — All Out!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with focused fire, dispelling all buffs and decreasing Combat Readiness by 50%, before granting immunity for 2 turns and exploiting weak points once to the caster and the foremost ally.
  - Supported damage formula (reference only): Skill3<br>att_rate: 2<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Roaming Warrior Leo (c2029)

- [ ] **S1 — Fire Slingshot** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy with a slingshot, with a 50% chance to inflict --decreased Attack-- for 2 turns. When the enemy has a debuff, increases damage dealt.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>10% increased Attack if enemy has at least 1 buff<br>
  - Unparsed formula lines: 10% increased Attack if enemy has at least 1 buff
  - EE 1: Increases Fire Slingshot's --decrease Attack-- effect chance by 10%.
  - EE 3: Increases Effectiveness of the caster for 2 turns when using Go, Racoo!.

- [ ] **S2 — Fire Shockbomb** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Fires a shockbomb at the enemy, with a 100% chance to --decrease Defense-- for 2 turns. Decreases skill cooldown of Go, Racoo! by 1 turn. At the end of the turn, detonates --bombs-- inflicted on the enemy.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.2<br>!pow: 1<br>

- [ ] **S3 — Go, Racoo!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks all enemies with Racoo’s help, decreasing buff durations by 1 turn before a 100% chance each to inflict --decreased Speed-- and a --bomb-- for 2 turns. Grants skill nullifier once to the caster.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.8<br>!pow: 1.1<br>
  - Soulburn (20 souls): Grants an extra turn.
  - EE 2: Has a 30% chance to activate Fire Shockbomb as an extra attack against a random enemy when using Go, Racoo!.

### Roana (c1102)

- [ ] **S1 — Soul Purification** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a noble power, and grants a barrier (proportional to the caster’s max Health) to the ally with the lowest Health for 2 turns.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Barrier strength: 10-12.5% self Max Health<br>
  - Unparsed formula lines: Barrier strength: 10-12.5% self Max Health
  - Soulburn (20 souls): Grants a barrier to all allies for 2 turns after attacking.

- [ ] **S2 — Vigilant Eye** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When an ally is attacked by an extra attack, counterattack, or Dual Attack, recovers Health of all allies proportional to the caster’s max Health and the number of attacked allies, and increases Combat Readiness of each by 5% per attacked ally.
  - Source multiplier text (requires review): Skill2<br>Heal strength: 5-7.75% self max Health <br>maybe per unit hit, too lazy to figure out
  - Unparsed formula lines: Heal strength: 5-7.75% self max Health ; maybe per unit hit, too lazy to figure out

- [ ] **S3 — Noble Rekos** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: With the grace of Rekos, recovers the Health of all allies and grants a barrier and revive for 2 turns. Amount recovered and barrier strength increase proportional to the caster’s max Health.
  - Source multiplier text (requires review): Skill3<br>Heal strength: 25% self max Health <br>Barrier strength: 15% self Max Health
  - Unparsed formula lines: Heal strength: 25% self max Health ; Barrier strength: 15% self Max Health

### Robin (c1169)

- [ ] **S2 — Clear The Back** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies with a grenade launcher, dispelling two buffs before a 100% chance each to inflict three --burn-- effects for 1 turn. Increases Combat Readiness of the caster by 50%.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.9<br>!pow: 1<br>

- [ ] **S3 — Say Hello To My Little Friends** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with her secret weapon and extends durations of debuffs except for those which prevent movement by 1 turn before a 100% chance to inflict --decreased Defense-- for 2 turns. When this skill is not on cooldown, at the start of an ally’s extra turn, grants swift attack to the caster and increases Combat Readiness by 25%.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.05<br>!pow: 1<br>Detonation multi: 1.0<br>
  - Unparsed formula lines: Detonation multi: 1.0
  - Soulburn (10 souls): At the end of the turn, detonates bleed and burn effects inflicted on the target.

### Romann (c1043)

- [ ] **S1 — Gravity Arrow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Shoots gravity arrows at the enemy, decreasing Combat Readiness by 10%, and increasing Combat Readiness of the caster by 10%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - EE 1: Has a 75% chance to dispel one buff from the enemy when using Gravity Arrow.

- [ ] **S2 — Gravitation** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies with a magic circle, with a 50% chance each to decrease Combat Readiness by 20% four times.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.7<br>!pow: 1<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.
  - EE 2: Grants a barrier to the caster for 2 turns when using Gravitation. Barrier strength Increases<br>proportional to the caster's max Health.
  - EE 3: Has a 50% chance to dispel one buff each from all enemies when using Gravitation.

- [ ] **S3 — Event Horizon** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Shoots a powerful gravity sphere to attack all enemies, dispelling all buffs before inflicting --restrict-- and two --poison-- effects for 2 turns. Increases Combat Readiness of the caster by 50%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.9<br>!pow: 0.85<br>

### Roozid (c3013)

- [ ] **S1 — Hemorrhage** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Description: Cuts the enemy with dual-wielded swords, with a 50% chance to --decrease Speed-- for 2 turns. Damage dealt increases proportional to the caster's Speed.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Wind Slash** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks with a swordstorm, with a 70% chance to --decrease Attack-- for 2 turns. Damage dealt increases proportional to the caster's Speed.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — Divine Response** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Corrects stance, increasing Combat Readiness of all allies by 20% and granting increased Speed for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Rose (c1003)

- [ ] **S1 — Sequential Cutter** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a sword. When the caster's Health is 50% or more, has a 75% chance to inflict --provoke-- for 1 turn, and when the caster's Health is less than 50%, grants increased Defense to the caster for 1 turn. Damage dealt increases proportional to the caster's Defense.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.5<br>!pow: 1<br>70% self Defense (0.7 * Defense)<br>not listed in tooltip
  - Unparsed formula lines: not listed in tooltip
  - EE 1: Activates each effect regardless of the current Health when using Sequential Cutter.

- [ ] **S2 — Shield of Light** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Covers an ally with the Shield of Light, dispelling two debuffs and granting a barrier (proportional to the caster's Defense) for 2 turns before increasing Combat Readiness by 20%.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Barrier strength: 100% self Defense (1 * Defense)<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Barrier strength: 100% self Defense (1 * Defense)
  - EE 2: Applies the same effect to the caster when using Shield of Light.

- [ ] **S3 — Goddess of Victory** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Gives blessing to all allies, increasing Attack for 2 turns, and Combat Readiness by 25%. Grants increased Defense to the caster for 2 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.
  - EE 3: Decreases skill cooldown of Goddess of Victory by 1 turn.

### Roy Mustang (c1135)

- [ ] **S1 — Ignite** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with flames, and increases Combat Readiness of the caster by 15%. When used on the caster's turn, if the caster is granted Flame Alchemist, activates Heat Wave instead of Ignite.<br>Heat Wave: Attacks the enemy with a huge flame, and increases Combat Readiness of the caster by 30%. Penetrates the target's Defense by 50%. This skill does not trigger a Dual Attack.
  - Resource: fightingSpirit; base gain 30; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.8<br>!pow: 1<br><br><br>Skill1Alt<br>att_rate: 0.8<br>!pow: 1<br>
  - Unparsed formula lines: Skill1Alt; att_rate: 0.8; !pow: 1
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Hero of Ishval** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of the first battle, gains 40 Fighting Spirit and grants Flame Alchemist. Damage suffered in one attack does not exceed 51% of max Health.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Scorching Heat** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After increasing Attack of the caster for 2 turns, attacks all enemies with a consecutive barrage of flames, and grants Flame Alchemist to the caster. When there are three or fewer enemies, damage dealt increases with fewer enemies.
  - Resource: fightingSpirit; base gain 0; required/spent 80.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.2<br>!pow: 0.9<br>20% increased damage vs 3 enemies, 40% vs 2, 60% vs 1<br>
  - Unparsed formula lines: 20% increased damage vs 3 enemies, 40% vs 2, 60% vs 1

### Ruele of Light (c1022)

- [ ] **S1 — Key to an Oath** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a staff, before recovering Health of all allies. Damage dealt and amount recovered increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.81<br>!pow: 0.95<br>5% self max Health (0.05 * Health)  -> 35% with soulburn<br>
  - Unparsed formula lines: 5% self max Health (0.05 * Health)  -> 35% with soulburn
  - Soulburn (20 souls): Attacks the enemy before greatly healing all allies. Does not trigger a Dual Attack.

- [ ] **S2 — Light Pillar** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Summons Light Pillar, dispelling all debuffs from an ally and recovering their Health before granting them a barrier and damage limit for 2 turns. Amount recovered and barrier strength increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Heal strength: 35% self max Health<br>Barrier strength: 20% self max Health
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Heal strength: 35% self max Health; Barrier strength: 20% self max Health

- [ ] **S3 — Light Ascending** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Dispels all debuffs from an ally with healing magic before fully recovering Health and granting invincibility for 1 turn. When the target is already dead, revives them with 100% Health before the same effect is applied. At the start of the first battle, grants Spirit Lord's Protection to the caster.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>100% target's max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; 100% target's max Health
  - EE 1: Applies the same effect to the caster when using Light Ascending.

### Ruiza (c1180)

- [ ] **S1 — Liquidation** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a whip, and grants increased Speed to the caster for 1 turn. Deals additional damage equivalent to 50% of injuries inflicted on the target.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.95<br>

- [ ] **S2 — Deflection** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Creates a gust of wind, dispelling two buffs from all enemies and decreasing Combat Readiness by 20%, before spreading the selected target's debuffs. Grants stealth to the caster for 2 turns. 
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Demolition** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy by destroying the surroundings, dispelling all buffs from the target and decreasing Combat Readiness by 50% before a 100% chance each to inflict --laceration-- and --silence-- for 2 turns. Increases Combat Readiness of the caster by 50%. At the start of the first battle, grants stealth for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.8<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Sage Baal & Sezan (c2015)

- [ ] **S1 — Evil Spirit's Call** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Summons an evil spirit to attack the enemy, with a 75% chance to put the enemy to --sleep-- for 1 turn. When the target is asleep after the attack, increases the caster's Combat Readiness by 20%. This skill does not trigger a Dual Attack.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1.1<br>

- [ ] **S2 — Cloud of Ruin** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies by summoning storm clouds and has a 100% chance to dispel two buffs before inflicting --sleep-- for 1 turn. When this skill is not on cooldown, at the end of an enemy’s turn, increases Combat Readiness of the caster by 20%.
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.85<br>!pow: 1.3<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S3 — Eye of Death** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with the eyes of an evil spirit, and when the enemy is defeated, extends debuff durations of all remaining enemies by 1 turn. Penetrates the target’s Defense, but cannot trigger a critical hit or a heavy blow. Damage dealt increases proportional to the caster's max Health. Damage dealt increases when the target is inflicted with sleep.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.3<br>!pow: 1<br>24% of the caster's max Health, Damage increase if target is asleep: 50%<br>
  - Unparsed formula lines: 24% of the caster's max Health, Damage increase if target is asleep: 50%

### Salome (c2184)

- [ ] **S2 — Salvation** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Releases divinity, granting skill nullifier once to the caster, and cloning a target Hero except for the caster for 1 turn. Grants an extra turn.<br>Clone: Clones the target's appearance and abilities. While in the Clone state, seperate skill cooldowns are applied. When dispelled, unique effects granted to the caster by the Clone skill are also dispelled.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Nggdrasil's Judgment** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: After inflicting --collapse-- on the enemy for 2 turns, attacks with the power of Nggdrasil, with a 100% chance to inflict --decreased Defense-- for 2 turns, and deals additional damage to the target. Damage dealt and additional damage increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.7<br>!pow: 1<br>Health scaling: 15% caster's max Health<br>Additional damage: 17% caster's max Health (70% def pen)
  - Unparsed formula lines: Additional damage: 17% caster's max Health (70% def pen)
  - Soulburn (10 souls): Ignores Effect Resistance.

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

- [ ] **S3 — Blossoming Hope** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: By kindling the light of hope, grants invincibility to all allies for 1 turn and increased Attack for 2 turns.
  - Resource: focus; base gain 3; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - EE 3: When using Blossoming Hope, the duration of increased Attack in increased to 3 turns.

### Savior Adin (c4144)

- [ ] **S1 — Ankle Cut** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a sword, with a 85% chance to make them --unable to be buffed-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Power of the Four Seasons** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Evasion increases by 50%, and after successfully evading, counterattacks with Blade Gust. Blade Gust can only be activated once every 2 turns.<br>Blade Gust (Gains 10 Soul): Attacks all enemies with a blade gust, dispelling one buff.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.7<br>!pow: 1.3<br>

- [ ] **S3 — Smite of Salvation** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a powerful blow and grants invincibility to all allies except for the caster for 1 turn. When the enemy is defeated, inflicts extinction. Penetrates the target's Defense by 50%.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.2 (1.65 soulburn)<br>!pow: 1<br>Penetration: 50%<br>Increased 20% dmg on dark elemental targets
  - Unparsed formula lines: Penetration: 50%; Increased 20% dmg on dark elemental targets
  - Soulburn (10 souls): Increases damage dealt.

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

### School Nurse Yulha (c2131)

- [ ] **S1 — This'll Sting!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a scalpel, with a 80% chance to inflict two --bleeding-- effects for 2 turns. At the end of the turn, detonates bleeding effects inflicted on the target,
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.9<br>!pow: 1<br>Detonation multiplier: 1.3<br>
  - Unparsed formula lines: Detonation multiplier: 1.3
  - Soulburn (10 souls): Grants an extra attack with the same skill.

- [ ] **S2 — There, It'll Feel Better** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of the first battle, increases Attack proportional to max Health.<br>At the start of an ally's turn, dispels one debuff from the target and recovers Health proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2<br>Heal strength: 8% caster's max Health (10.8% at max level)<br>HP to Attack scaling: Increase Attack by 8% of the caster's max Health
  - Unparsed formula lines: Heal strength: 8% caster's max Health (10.8% at max level); HP to Attack scaling: Increase Attack by 8% of the caster's max Health

- [ ] **S3 — It's Time to Be Reborn!** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Dispels all debuffs from an ally except for the caster before fully recovering Health. Grants superhumanization to the target for 3 turns and increases Combat Readiness by 50%. When the target is already dead, revives them with 100% Health before the same effect is applied. This skill is unaffected by cooldown increase and decrease effects.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Schuri (c1020)

- [ ] **S1 — Rapid Fire** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Description: Attack the enemy with a pistol. Damage dealt increases proportional to the target's max Health. A critical hit will double the amount of Focus gained.
  - Resource: focus; base gain 1; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Health scaling: 1.5% target's max Health<br>
  - Unparsed formula lines: Health scaling: 1.5% target's max Health

- [ ] **S2 — Explosive Gentleman** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of the first battle, gains 3 Focus. After making a critical hit, increases Combat Readiness of all allies except for the caster by 25%.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Rifle Shot** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with a rifle and decreases Combat Readiness by 30%. . When Focus is full, consumes it all, increasing damage dealt and ignoring Effect Resistance.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1 (1.25 full Focus)<br>!pow: 1<br>
  - Unparsed formula lines: att_rate: 1 (1.25 full Focus)
  - Soulburn (20 souls): Grants an extra turn.

### Sea Phantom Politis (c2112)

- [ ] **S2 — Phantom's Waltz** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Decreases the amount of resources gained by the enemy by 50%. At the start of battle and at the end of the turn, has a 100% chance to grant stealth for 1 turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Fanatic Ball** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Hosts a ball, making all allies enraged for 2 turns. Dispels two buffs from all enemies and --decreases Speed-- for 2 turns before decreasing Combat Readiness by 20%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (20 souls): Ignores Effect Resistance.

### Sealed Eye Surin (c6065)

- [ ] **S1 — Repel** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a chain axe, with a 75% chance to inflict --decreased Defense-- for 1 turn. When the caster is granted rage, activates Eradication as an extra attack.<br>Eradication: Attacks the enemy, inflicting --bleed-- for 2 turns, and at the end of the turn, detonates --bleed-- effects inflicted on the target. Ignores Effect Resistance.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.9<br>!pow: 1<br><br><br>Skill1 (Proc)<br>att_rate: 0.5<br>!pow: 1.3<br>Detonation multiplier: 1.3<br>
  - Unparsed formula lines: Skill1 (Proc); att_rate: 0.5; !pow: 1.3; Detonation multiplier: 1.3

- [ ] **S2 — Abyss Observer** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of battle and at the end of the turn, grants stealth to the caster for 1 turn. At the end of someone's turn, when an enemy is inflicted with --provoke-- or --redirected provoke--, grants rage to the caster for 2 turns and increases Combat Readiness by 30%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Unexpected Accident** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After granting increased Attack to the caster for 2 turns, attacks all enemies by staging an accident, inflicting three --bleeding-- effects for 1 turn. When the target is inflicted with --provoke-- or --redirected provoke--, extends duration of --bleed-- inflicted on the target by 1 turn. When the caster is granted rage, ignores Effect Resistance.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.9<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.

### Seaside Bellona (c5071)

- [ ] **S2 — I'm with My Friends** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: For every surviving ally, decreases damage suffered by 10%. When more than one damage reduction effect of the same kind is granted, only the strongest effect is applied. When an ally is attacked, gains 1 Focus, and when the caster's stacked Focus is 5, consumes all Focus and activates You're Not Cute.<br>You're Not Cute: Attacks all enemies with a fan, with a 75% chance to --decrease Defense-- for 2 turns.
  - Resource: focus; base gain 0; required/spent 5.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.7<br>!pow: 1<br>
  - EE 1: Dispels one debuff from the caster before attacking when using You're Not Cute.

- [ ] **S3 — Haven't I Warned You?** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies with a spray of water, dispelling all buffs before a 100% chance each to inflict --cannot buff-- and --unhealable-- for 2 turns.
  - Resource: focus; base gain 3; required/spent 0.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.2<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.
  - EE 3: Decreases skill cooldown of Haven't I Warned You? by 1 turn.

### Senya (c1106)

- [ ] **S1 — Spear of Vengeance** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a spear, with a 75% chance to --provoke-- for 1 turn. When it is not the caster's turn, effect chance increases by 25%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.95<br>!pow: 1<br>
  - EE 1: Recovers Health of the caster after using Spear of Vengeance. Amount recovered increases proportional to the caster's Attack.

- [ ] **S2 — Indomitable Spirit** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Increases Attack by 30% and Critical Hit Resistance by 50%. When attacking, cannot trigger a critical hit or a heavy blow. When attacked, if the caster suffers a non-critical hit, inflicts damage on the attacker proportional to the caster's Attack, before activating Grace of the Battlefield.<br>Grace of the Battlefield: Grants a barrier (proportional to the caster’s Attack) to all allies for 2 turns, and grants increased Speed of the caster for 2 turns.
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

### Serene Purity Adin (c4142)

- [ ] **S1 — Ankle Cut** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a sword, with a 50% chance to --decrease Defense-- for 2 turns.
  - Resource: focus; base gain 1; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.85<br>!pow: 1.05<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Crystal Clear Soul** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: When the ally with the highest Attack starts their turn, gains 1 Focus. After attacking on the caster's turn, when Focus is full, consumes all Focus, activating Glacial Strike.<br>Glacial Strike: Attacks all enemies, with a 50% chance to --decrease Defense-- for 2 turns, and grants Torrent to the ally with the highest Attack.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.6<br>!pow: 1<br>

- [ ] **S3 — Frozen Winter Cut** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy repeatedly, with a 100% chance to --decrease Speed-- for 2 turns, and increases Speed of all allies for 2 turns.
  - Resource: focus; base gain 0; required/spent 0.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.3<br>!pow: 1.05<br>

### Serila (c1040)

- [ ] **S1 — Seduction** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with a flame of seduction, with a 50% chance to --decrease Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Spirit Absorb** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy, with a 75% chance to --decrease Attack-- for 2 turns, and when the enemy is defeated, resets skill cooldowns. Grants increased Attack to the caster for 2 turns and absorbs some of the damage dealt as Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.7 (2.2 soulburn)<br>!pow: 1.05<br>30% of damage as healing<br>
  - Unparsed formula lines: 30% of damage as healing
  - Soulburn (10 souls): Increases damage dealt.
  - EE 1: Has a 30% chance of granting the caster an extra turn when using Spirit Absorb.

- [ ] **S3 — Flame Kiss** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy with the flame of Chatty, the magic lantern, with a 100% chance each to inflict two --burn-- effects for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.8<br>!pow: 1.05<br>
  - EE 2: Inflicts --vampiric touch-- for 2 turns when using Flame Kiss.
  - EE 3: --Decreases Defense-- of the enemy for 2 turns when using Flame Kiss. (Applies prior to inflicting burn debuff)

### Setsuka (c1176)

- [ ] **S1 — Horizontal Slash** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a sword, and absorbs some of the damage dealt as Health. Damage dealt increases proportional to the caster's max Health.
  - Resource: fightingSpirit; base gain 10; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.6 (1.3 soulburn)<br>!pow: 1<br>Health scaling: 12% caster's max Health, Lifesteal: 30% of the damage dealt<br>
  - Unparsed formula lines: Health scaling: 12% caster's max Health, Lifesteal: 30% of the damage dealt
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S2 — Surpressed Desire** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Evasion of all allies by 30%, and when an ally except for the caster evades, counterattacks. After attacking, when Fighting Spirit is full, consumes all, granting Demon Blade Unleashed to the caster for 1 turn before activating Blade Art: Bewitching Blossom.<br>Blade Art: Bewitching Blossom: Consumes all Health to attack all enemies, and increases Combat Readiness of the caster by 50%. Damage dealt increases proportional to the caster's lost Health.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2 (Proc)<br>att_rate: 0.9<br>!pow: 0.95<br>Health scaling: 40% caster's lost Health (total lost health, not only lost health from s2)<br>
  - Unparsed formula lines: Skill2 (Proc); Health scaling: 40% caster's lost Health (total lost health, not only lost health from s2)

- [ ] **S3 — Rouge Aroma** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Description: Dispels all buffs from all enemies before inflicting --beguile-- and inflicting --decreased Hit Chance-- for 2 turns. Ignores Effect Resistance of targets with less max Health than the caster.
  - Resource: fightingSpirit; base gain 30; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Sez (c1038)

- [ ] **S1 — Dark Shadow** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with dark energy, making them --unhealable-- for 1 turn. Damage dealt increases proportional to the amount of the enemy's lost Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 0.95<br>0.2% increased damage per 1% target missing Health<br>
  - Unparsed formula lines: 0.2% increased damage per 1% target missing Health

- [ ] **S2 — Die Hard** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: When attacked, damage suffered in one attack does not exceed 51% of max Health. After an ally except for the caster attacks, when the target's Health is 30% or less, activates Encroach.<br>Encroach: Attacks all enemies by releasing dark energy, and increases Combat Readiness of the caster by 30%. Damage dealt increases proportional to the target's lost Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.6<br>!pow: 1.3<br>0.3% increased damage per 1% target missing Health<br>
  - Unparsed formula lines: 0.3% increased damage per 1% target missing Health
  - EE 2: Increases Attack of the caster for 2 turns when using Encroach.

- [ ] **S3 — Conviction** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Inflicts lethal damage on the enemy. When the enemy is defeated, inflicts extinction, and inflicts additional damage proportional to the caster's Attack on all enemies except for the target. Damage dealt increases proportional to the target's lost Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 2(3.2 soulburn)<br>!pow: 0.95<br>0.3% (0.7% soulburn) increased damage per 1% target missing Health<br><br><br>explosion on kill does 150% of self Attack<br>
  - Unparsed formula lines: 0.3% (0.7% soulburn) increased damage per 1% target missing Health; explosion on kill does 150% of self Attack
  - Soulburn (20 souls): Increases damage dealt.

### Shadow Knight Pyllis (c4005)

- [ ] **S1 — Weakening Blow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy, with a 75% chance to --provoke-- for 1 turn. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.7<br>!pow: 1<br>50% self Defense (0.5 * Defense) <br>

- [ ] **S2 — Will** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the moment the caster is attacked, increases Defense of the caster. At the moment of every fourth attack suffered, increases Defense of all allies for 2 turns. The caster's increased Defense can stack up to 3 times.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Perceptive Slash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Concentrates in order to dispel one debuff from all allies before attacking the enemy, --provoking-- for 1 turn and granting all allies a barrier for 2 turns. Damage dealt and barrier strength increase proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.3<br>!pow: 0.95<br>70% self Defense (0.7 * Defense) <br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Shadow Rose (c2003)

- [ ] **S1 — Sequential Cutter** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a sword. When the target's Health is 50% or more, has a 75% chance to inflict --decreased Defense-- for 1 turn, and when the target's Health is less than 50%, has a 75% chance to inflict --unhealable-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Spear of Darkness** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Leaps into the air and strikes at the enemy with a swordstorm, dispelling one buff and inflciting --decreased Defense-- for 2 turns. Grants an extra turn.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.5<br>!pow: 0.9<br>
  - Soulburn (10 souls): Ignores Effect Resistance.
  - EE 1: Dispels one additional buff when using Spear of Darkness.

- [ ] **S3 — Goddess of Ruin** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: After granting increased Attack to all allies for 2 turns, attacks all enemies with the Portent of Destruction, decreasing Combat Readiness by 25% and increasing Combat Readiness of all allies by 25%. When there are three or fewer enemies, damage dealt increases with fewer enemies.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 0.8<br>
  - EE 2: Increases Combat Readiness of the caster by an additional 25% when using Goddess of Ruin.
  - EE 3: Increases Goddess of Ruin's increase and decrease Combat Readiness amounts by 5% respectively.

### Shalltear (c1157)

- [ ] **S1 — Summon Household** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Summons different familiars to attack the enemy, inflicting injuries. The severity of injuries increases proportional to the damage dealt. Injuries decrease max Health of the target by up to 10% every time this skill is used. 
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.1 (1.5 Soulburn)<br>!pow: 1<br>
  - Soulburn (10 souls): Increases damage dealt and injuries decrease max Health of the target by up to 20%.

- [ ] **S2 — True Vampire** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Damage suffered in one attack does not exceed 51% of max Health. At the start of the turn, when the caster's Health is 60% or more, increases Attack for 1 turn. At the end of the turn, grants stealth for 1 turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

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

### Shepherd Jena (c4052)

- [ ] **S1 — Cold Blow** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with a staff, with a 35% chance to --stun-- for 1 turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Coerce** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Casts weakening magic, with a 100% chance each to decrease buff durations of all enemies by 1 turn and inflict --frostbite-- for 2 turns. Grants immunity to all allies for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S3 — Punishing Light** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies with frost magic, with a 75% chance to --decrease Defense-- for 2 turns before a 100% chance to decrease Combat Readiness by a random amount between 20% and 40%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Shepherd of the Dark Diene (c2076)

- [ ] **S1 — Crimson Claws** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: After inflicting --rupture-- on the enemy for 1 turn, attacks the enemy. A successful attack always results in a critical hit. Damage dealt increases proportional to the caster's max Health. When the caster is granted immortality, triggers a Dual Attack from the ally with the highest Attack.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.5 (1 soulburn)<br>!pow: 1<br>Health scaling: 12% caster's max Health (24% with soulburn)<br>
  - Soulburn (20 souls): Increases damage dealt.

- [ ] **S2 — Noias's Guidance** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of battle, grants immortality for 1 turn. When granted immortality, increases Effect Resistance by 200%. When someone uses a Soulburn, dispels all debuffs from the caster before activating Dark Moon. <br>Dark Moon: Dispels two buffs from all enemies, before granting immortality to the caster for 3 turns and increases Combat Readiness by 50%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Endless Darkness** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: After inflicting --seal-- on all enemies for 2 turns, attacks them and decreases Combat Readiness by 30%. A successful attack always results in a critical hit. When the caster is granted immortality, ignores Effect Resistance. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.5<br>!pow: 1<br>Health scaling: 20% caster's max Health<br>

### Shooting Star Achates (c2017)

- [ ] **S1 — Magic Design** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a staff, with a 75% chance to inflict --decreased Hit Chance-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.95<br>

- [ ] **S2 — Resurrection Magic** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Revives a dead ally with magic and grants increased Attack and immortality for 1 turn. When the target is not dead, grants increased Attack and immortality for 3 turns.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S3 — Sparkling Star** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Description: With recovery magic, dispels all debuffs from an ally and the caster and increases Health ratios to the higher of the two before additionally recovering Health proportional to the target’s max Health. Health ratio increase effect is unaffected by increased or decreased healing effects.
  - Source multiplier text (requires review): Skill3<br>att_rate: n/a<br>!pow: n/a<br>15% further target max Health healed on top<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; 15% further target max Health healed on top

### Shuna (c1123)

- [ ] **S1 — Magicule Explosion** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy by manipulating magicules and recovers Health of all allies. Damage dealt and amount recovered increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.75<br>!pow: 1<br>9% self max Health (0.09 * Health)<br>Heal strength: 8% self max hp
  - Unparsed formula lines: Heal strength: 8% self max hp
  - Soulburn (10 souls): Grants an extra attack with the same skill.

- [ ] **S2 — Blooming Lotus** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Dispels two debuffs from all allies and redistributes Health so that each ally has an equal Health ratio before granting a barrier (proportional to the caster’s max Health) for 2 turns.
  - Source multiplier text (requires review): Skill2<br>Shield Strength: 18% of Self Max Health<br>
  - Unparsed formula lines: Shield Strength: 18% of Self Max Health
  - EE 1: Increases Blooming Lotus's barrier strength by 10%.
  - EE 2: Increases Combat Readiness of the caster by 30% when using Blooming Lotus.

- [ ] **S3 — Sleeping Spell** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: With scattering petals, dispels two buffs from all enemies before a 85% chance to inflict --sleep-- for 1 turn and a 100% chance to inflict --decreased Attack-- for 2 turns.
  - Source multiplier text (requires review): Skill3<br>
  - EE 3: Increases Sleeping Spell's effect chance by 15%.

### Sigret (c1072)

- [ ] **S1 — Sever** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy with a scythe, with a 50% chance each to inflict two --bleeding-- effects for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - EE 1: Increase damage dealt by Sever by 20%.
  - EE 2: Increase Sever's chance of inflicting --bleeding-- by 20%.

- [ ] **S2 — Smash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy by swiping consecutively with a scythe, with a 100% chance each to inflict --unhealable-- and --bleeding-- for 2 turns. After attacking, when the target's Health is 50% or less, activates Sever as an extra attack. When attacking with an extra attack, Sever has a 100% chance to inflict --bleeding--.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.25<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.
  - EE 3: After using Smash, the Health condition to activate Sever's extra attack changes to 75%.

### Silk (c1004)

- [ ] **S1 — Single Shot** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Shoots arrows at the enemy, decreasing their Combat Readiness by 10%. Damage dealt increases proportional to the caster's Speed.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.9 (1.2 automatic shot)<br>!pow: 0.9<br>0.075% self Speed (0.00075 * Speed)<br>
  - Unparsed formula lines: att_rate: 0.9 (1.2 automatic shot)
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Concentration** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of the turn, gains 1 Focus. When attacked, consumes 1 Focus, dispelling one debuff from the caster and increasing Combat Readiness by 15%. When the caster's Focus is 2 or more, uses Automatic Fire instead of Single Shot.<br>Automatic Fire: Attacks the enemy with arrows, decreasing Combat Readiness by 10%. Damage dealt increases proportional to the caster's Speed, and penetrates the target's Defense by 20%. This attack receives effects that are applied to the basic skill.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>tooltip wrong, actually 3%/3%/4%/5% increase ( ? Tooltip looks correct: Patch 2023.08.03)<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; tooltip wrong, actually 3%/3%/4%/5% increase ( ? Tooltip looks correct: Patch 2023.08.03)

- [ ] **S3 — Storm Arrow** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with wind, with a 100% chance to --decrease Speed-- for 2 turns, and granting increased Speed to all allies for 2 turns.
  - Resource: focus; base gain 2; required/spent 0.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.85<br>!pow: 1.05<br>

### Silver Blade Aramintha (c2048)

- [ ] **S1 — Flame Friction** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks an enemy with an explosion of flames, with a 75% chance to --burn-- for 1 turn. After attacking, when an enemy is burned, activates Flame Release as an extra attack.<br>Flame Release: Attacks all enemies with fire energy, with a 60% chance to --burn-- for 1 turn, before detonating --burn-- effects inflicted on the target at the end of the turn.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Detonation multi: 1.0<br><br><br>Skill1 Proc<br>att_rate: 0.5<br>!pow: 1.3<br>
  - Unparsed formula lines: Detonation multi: 1.0; Skill1 Proc; att_rate: 0.5; !pow: 1.3
  - Soulburn (10 souls): Effect Chance of Flame Friction increases to 100%, and ignores Effect Resistance.

- [ ] **S2 — Flame of Savara** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of the first battle, increases Attack proportional to Effectiveness. The rate of the increase Attack effect does not change after it is activated. At the end of an ally except for the caster's turn, increases Combat Readiness of the caster by 15%.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Attack increase: 900 * EFF / 100  or  9*Effectiveness<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Attack increase: 900 * EFF / 100  or  9*Effectiveness

- [ ] **S3 — Meteor Fall** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies with a giant meteor, inflicting two --burn-- effects for 2 turns and --stunning-- for 1 turn. Decreases Combat Readiness of the enemy with the highest Combat Readiness by 30%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.9<br>!pow: 1<br>

### Silvertide Christy (c4123)

- [ ] **S1 — Sword of Protection** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy, with a 75% chance to --provoke-- for 1 turn. Damage dealt increases proportional to the caster's max Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Oath Shield** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: After being attacked, when the caster does not have a debuff, increases Combat Readiness of the caster and the ally in the back row by 20%. Can only be activated once per turn. At the start of the first battle, increases Effect Resistance of the ally in the back row by 100% of the caster's Effect Resistance. The rate of this effect does not change after it is activated, and this effect is dispelled only when the ally in the back row is defeated. When the caster is in the back row, the effect is not activated.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Dragon Knight's Cheer** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Increases Attack of all allies for 2 turns. Increases Defense and Effectiveness of the caster for 2 turns and recovers Health. Amount recovered increases proportional to the caster's Max Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Sinful Angelica (c2062)

- [ ] **S1 — Debilitating Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the target with a staff, with a 75% chance to --decrease Defense-- for 1 turn. When the caster is immortal, triggers a Dual Attack from the ally with the highest Attack.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.95<br>
  - Soulburn (10 souls): Increases effect chance to 100%, and decreases Defense of the target for 2 turns.

- [ ] **S2 — Soul Harvest** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Enemies cannot revive. Every time an enemy dies, recovers Health of all allies proportional to the target’s max Health.
  - Source multiplier text (requires review): Skill2<br>Heal strength: 16-24% Target max Health <br>
  - Unparsed formula lines: Heal strength: 16-24% Target max Health 
  - EE 1: With Soul Harvest's effect, when an enemy dies while the caster is immortal, increases Combat Readiness of all allies by 15%. Combat Readiness increase effect can only be activated once per turn.
  - EE 2: Increases Soul Harvest's amount recovered by 20%.

- [ ] **S3 — Dark Salvation** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Whips up a vortex of darkness and loathing, dispelling two debuffs from all allies, before granting immortality to the caster for 2 turns, and increases Attack and Speed of all allies except for the caster for 2 turns.
  - Source multiplier text (requires review): Skill3<br>
  - EE 3: Increases Effectiveness of the caster for 2 turns when using Dark Salvation.

### Sol (c1092)

- [ ] **S1 — Gunflame** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks an enemy with pillars of fire. When the target does not have a buff, increases damage dealt. After attacking, when the caster's Fighting Spirit is 100, activates Roman Cancel. Does not activate when counterattacking.<br>Roman Cancel: Consumes all Fighting Spirit and extends buff durations of the caster by 1 turn before granting an extra turn.
  - Resource: fightingSpirit; base gain 20; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>20% increased damage if target has no buffs<br>
  - Unparsed formula lines: 20% increased damage if target has no buffs

- [ ] **S2 — Volcanic Viper** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed condition watcher implemented; Volcanic Viper reaction to incoming all-enemies attacks pending
  - Review/work: Passive: reviewed condition watcher implemented; Volcanic Viper reaction to incoming all-enemies attacks pending
  - Review/work: Volcanic Viper reaction to incoming all-enemies attacks
  - Review/work: Unmapped/conditional debuff grants
  - Description: When an enemy uses a non-attack skill, increases Combat Readiness of the caster by 20% and gains 20 Fighting Spirit. When suffering an attack that targets all allies, activates Volcanic Viper against the attacker. This effect is not activated by a counterattack, Dual Attack, or extra attack. Each effect can only be activated once every 2 turns.<br>Volcanic Viper (gains 2 Soul): Launches the enemy into the air and attacks repeatedly, inflicting --silence-- for 2 turns. Damage dealt increases proportional to the target's max Health.
  - Implemented watchers: sol-enemy-non-attack.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.7<br>!pow: 1<br>4% target max Health<br>

- [ ] **S3 — Tyrant Rave ver. Beta** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the target with a strong punch, dispelling all buffs and inflicts --cannot buff-- for 2 turns. Damage dealt increases proportional to the target's max Health. After attacking, deals additional damage proportional to the caster's Attack regardless of whether the attack hits.
  - Resource: fightingSpirit; base gain 60; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.6<br>!pow: 1<br>5% target max Health<br>Additional damage: 40% of Self Attack (0.4 * Attack)
  - Unparsed formula lines: Additional damage: 40% of Self Attack (0.4 * Attack)
  - Soulburn (10 souls): Ignores Effect Resistance.

### Solitaria of the Snow (c2111)

- [ ] **S1 — Pew, Pew, Pew!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a staff, with a 75% chance to dispel one buff. When the caster is granted daydream, activates Fwooooosh— Ha! as an extra attack.<br>Fwooooosh— Ha!: Attacks all enemies with mana, with a 25% chance to inflict --stun-- for 1 turn.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7<br>!pow: 1<br><br><br>Skill1Proc<br>att_rate: 0.8<br>!pow: 1.3<br>might not get mola bonus, just has it baseline in the pow<br>
  - Unparsed formula lines: Skill1Proc; att_rate: 0.8; !pow: 1.3; might not get mola bonus, just has it baseline in the pow

- [ ] **S2 — I Wanna Go Home...** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Unmapped/conditional debuff grants
  - Description: Decreases the amount of Focus gained by the enemy by 100%. At the start of the turn, has a 100% chance to grant daydream for 1 turn, and at the end of the turn, has a 100% chance to grant stealth for 1 turn.
  - Implemented resource passive portions: enemy gain blocking. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Boom! Starlight Fall!** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Decreases buff durations of the enemy by 1 turn and attacks with starlight, inflicting --stun-- for 1 turn before decreasing Combat Readiness by 30%. Grants a barrier (proportional to the caster’s max Health) to the caster for 2 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.8<br>!pow: 1<br>Barrier Strength: 25% of Self Max HP<br>
  - Unparsed formula lines: Barrier Strength: 25% of Self Max HP
  - Soulburn (20 souls): Extends duration of buffs granted by this skill by 1 turn and grants an extra turn.

### Sonia (c3104)

- [ ] **S1 — Surpressing Fire** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with cover fire, before granting a barrier to the ally except for the caster with the lowest Health for 2 turns. Barrier strength increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1.1<br>!pow: 1<br>Barrier strength: 8% Self Max health<br>
  - Unparsed formula lines: Barrier strength: 8% Self Max health

- [ ] **S2 — Recovery** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Recovers the target's Health using a recovery cube and dispels two debuffs. Amount recovered increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill2<br>Heal Strength: 7% Self Max Health<br>
  - Unparsed formula lines: Heal Strength: 7% Self Max Health
  - Soulburn (20 souls): Effect is granted to all allies.

- [ ] **S3 — Cube Aura** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Uses a recovery cube to grant all allies immunity for 2 turns, before recovering Health. Amount recovered increases proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>Heal Strength: 18% Self Max Health<br>
  - Unparsed formula lines: Heal Strength: 18% Self Max Health

### Specimen Sez (c2038)

- [ ] **S1 — Dreamy Iron Mace** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with an iron mace, with a 50% chance to --stun-- for 1 turn. When the target is --stunned-- after the attack, increases Combat Readiness of the caster by 25%. Increases Effectiveness of this attack by 50%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Evil Claws** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with evil claws, with a 80% chance to --stun-- for 1 turn, before granting increased Attack to the caster for 2 turns and increasing the caster's Combat Readiness by 50%. Increases Effectiveness of this attack by 50%.,
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.8(1.05 soulburn)<br>!pow: 1<br>
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — Light Storm** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a light storm, and absorbs some of the damage dealt as Health. When the enemy is defeated, inflicts extinction and resets cooldown of this skill. Penetrates the target’s Defense by 30%, but when the enemy is inflicted with --stun--, penetrates by 100%. When this skill is not on cooldown, increases Evasion by 50%.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5<br>!pow: 1<br>Heal strength: 30% damage dealt<br>
  - Unparsed formula lines: Heal strength: 30% damage dealt
  - EE 1: Light Storm's condition for penetrating Defense by 100% changes to being --stunned-- or --asleep--.

### Specter Tenebria (c2050)

- [ ] **S1 — Poison Blast** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with an explosion of poison energy and has a 70% chance to inflict --poison-- for 2 turns. This skill cannot trigger a counterattack. When Endless Nightmare is on cooldown, attacks two enemies including the target.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.2<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Nightmare Illusion** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Illusion will remain throughout the battle. Increases Attack and Defense of the caster by 10% every time somebody dies. Effect can only stack up to 5 times.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a
  - EE 1: Changes the Attack and Defense increase condition of Nightmare Illusion to after attacking.

- [ ] **S3 — Endless Nightmare** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a nightmare crystal, inflicting --stun-- for 1 turn. When the enemy is defeated, decreases Combat Readiness of all remaining enemies by 50%. Damage dealt increases proportional to the number of debuffs inflicted on the target.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.8<br>!pow: 0.95<br>20% increased damage per target debuff<br>
  - Unparsed formula lines: 20% increased damage per target debuff

### Spirit Eye Celine (c2103)

- [ ] **S1 — Mighty Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a sheath. When this skill is used, if it was not triggered by a Dual Attack and the caster has a buff, uses Nimble Sword instead.<br>Nimble Sword: After granting increased Attack to the caster for 1 turn, swiftly attacks the enemy, and absorbs some of the damage dealt as Health. Penetrates the target's Defense by 50%. This skill does not trigger a Dual Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 0.9<br><br><br>Skill1 Extra (Nimble Sword)<br>att_rate: 1<br>!pow: 0.9<br>25% Lifesteal<br>Penetration 50%
  - Unparsed formula lines: Skill1 Extra (Nimble Sword); att_rate: 1; !pow: 0.9; 25% Lifesteal; Penetration 50%
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Sixth Sense** — Passive partially implemented or pending
  - Current base support: passive. Passive: 50% effective-max-HP attack limit implemented before sharing; death-trigger cooldown/souls pending
  - Review/work: Passive: 50% effective-max-HP attack limit implemented before sharing; death-trigger cooldown/souls pending
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: When attacked, damage suffered in one attack does not exceed 50% of max Health. When someone dies, decreases skill cooldowns by 1 turn and gains 5 Soul. Effects upon death are only activated upon a Hero's death.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - EE 1: When the casters uses Soulburn for the first time, increases damage dealt by 50% and does not cost any Soul.

- [ ] **S3 — Spirit Gate: Burning Possession** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Opens the gate of the spirits to revive all dead allies. Dispels all debuffs from all allies before granting immortality for 1 turn, and grants possession to the caster for 3 turns.
  - Source multiplier text (requires review): Skill3<br>Possession: increases attack by 25%<br>
  - Unparsed formula lines: Possession: increases attack by 25%

### Stark (c1174)

- [ ] **S2 — Master's Lessons** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When an ally is attacked, gains 10 Fighting Spirit, and when Fighting Spirit is full, activates Warrior's Strike on the attacker.<br>Warrior's Strike (consumes 100 Fighting Spirit): Attacks the enemy consecutively, and increases Combat Readiness of the caster by 50% before resetting cooldown of Lightning Strike. Damage dealt increases proportional to the caster's max Health.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.5<br>!pow: 1<br>Health scaling: 12% caster's max Health<br>

- [ ] **S3 — Lightning Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy by slamming down with an axe. Penetrates the target's Defense by 50%. Damage dealt increases proportional to the caster's max Health. Damage dealt increases every time this skill is used, stacking up to 3 times.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.7 (0.9 soulburn)<br>!pow: 1<br>Health scaling: 12% (16% Soulburn) caster's max Health<br>50% Penetration<br>Damage increase 30% per stack
  - Unparsed formula lines: 50% Penetration; Damage increase 30% per stack
  - Soulburn (10 souls): Increases damage dealt.

### Straze (c1034)

- [ ] **S2 — Destructive Gaze** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with a wave of force and dispels all buffs. Ignores Effect Resistance of any targets with Attack lower than the caster's Attack. When there are three or fewer enemies, damage dealt increases with fewer enemies.
  - Source multiplier text (requires review): Skill2<br>att_rate: 0.9<br>!pow: 1<br>20% increased damage per enemy less than 4 (20% 3 enemies, 40% 2, 60% 1)<br>
  - Unparsed formula lines: 20% increased damage per enemy less than 4 (20% 3 enemies, 40% 2, 60% 1)
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

- [ ] **S3 — Star Extinction** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks all enemies with a sword, and grants invincibility to the caster for 1 turn. Penetrates Defense of the target with the highest max Health. This skill cannot trigger a counterattack.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.95<br>!pow: 1<br>Penetration = 30% + (DIFFERENCE_IN_ATTACK * 0.00035)<br>
  - Unparsed formula lines: Penetration = 30% + (DIFFERENCE_IN_ATTACK * 0.00035)
  - EE 1: When the enemy is defeated by Star Extinction, extends buff durations of the caster by 1 turn and grants an extra turn.

### Successor Taeyou (c2127)

- [ ] **S1 — Lan Na Zha** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a spear, decreasing Combat Readiness by 20%. A successful attack always results in a critical hit. When this skill is used, if it was not triggered by a Dual Attack and the caster is granted possession, activates Roaring Spiritfall instead.<br>Roaring Spiritfall: Increases Attack of the caster for 2 turns, before attacking the enemy by striking from above. A successful attack always results in a critical hit. This skill does not trigger a Dual Attack.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br><br><br>Skill1(Proc)<br>att_rate: 1.85<br>!pow: 1<br>
  - Unparsed formula lines: Skill1(Proc); att_rate: 1.85; !pow: 1

- [ ] **S2 — Spirit Invocation** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Starts the first battle with 60 Fighting Spirit. When Combat Readiness of an enemy is decreased, gains Fighting Spirit equal to the amount of Combat Readiness reduced, and at the end of a turn, when Fighting Spirit is full, consumes all Fighting Spirit, increasing Combat Readiness of the caster by 100% and granting possession for 2 turns.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Azure Phantom** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Unleashes power, dispelling two buffs from all enemies and a 85% chance to --decrease Defense-- for 2 turns, before granting invincibility to the caster for 1 turn. When the caster is granted possession, extends buff durations of the caster by 1 turn and grants an extra turn.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (20 souls): Ignores Effect Resistance.
  - EE 1: Increases Azure Phantom's chance to --decrease Defense-- by 15%.

### Summer Break Charlotte (c5009)

- [ ] **S1 — Caught A Big One** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy with two meaty fish and has a 75% chance to --decrease Defense-- for 1 turn. When activated as a Dual Attack, this attack changes into an attack that targets all enemies. The changed attack does not trigger a counterattack, and increases Combat Readiness of all allies by 20%.
  - Resource: fightingSpirit; base gain 20; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.9<br>!pow: 1<br>
  - Soulburn (10 souls): Attacks all enemies. This attack does not trigger a Dual Attack or counterattack.
  - EE 1: Increases Caught a Big One's chance to --decrease Defense-- by 5%.
  - EE 2: Increases Combat Readiness by an additional 5% when Caught a Big One is activated as a Dual Attack

- [ ] **S2 — An Adult's Responsibility** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Increases Critical Hit Chance by 30%. At the start of the first battle, gains 60 Fighting Spirit and grants enhanced Dual Attack to the caster. At the end of every 4 ally turns, grants enhanced Dual Attack to the caster.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Implemented resource passive portions: battle-start grant. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): Skill2<br>
  - EE 3: At the start of the first battle, grants increased Attack to the caster for 2 turns.

- [ ] **S3 — Whale, Hello There** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Dispels all debuffs from the caster, and attacks the enemy with a pod of killer whales, --stunning-- for 1 turn, before increasing Speed of all allies for 2 turns. Penetrates the target's Defense by 50%.
  - Resource: fightingSpirit; base gain 0; required/spent 80.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.7<br>!pow: 1<br>50% Defense Penetration<br>
  - Unparsed formula lines: 50% Defense Penetration

### Summer's Disciple Alexa (c4012)

- [ ] **S1 — Fell** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Description: Attacks the enemy by cutting with dual-wielded swords. A critical hit will activate Lightning Bolt as an extra attack. Lightning Bolt can only be activated once per turn of the caster. Lightning Bolt (Acquire 1 Soul): Rapidly attacks the enemy by cutting with dual-wielded swords.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Cold Edge** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a cold blade, with a 100% chance to inflict two --poison-- effects for 2 turns, and increases the caster's Combat Readiness by 30%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (20 souls): Ignores Effect Resistance.

- [ ] **S3 — Glistening Summer Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy with a powerful spike, and increases Attack  of the caster for 3 turns. Damage dealt increases proportional to the number of debuffs inflicted on the target.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Summertime Iseria (c5024)

- [ ] **S1 — Are you the Culprit?** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy with swords, with a 75% chance each to dispel one buff twice.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.
  - EE 1: Increases buff dispel chance of Are you the Culprit? by 5%.
  - EE 2: After using Are you the Culprit?, detonates bombs inflicted on the target at the end of the turn.

- [ ] **S2 — Suppression Attempt** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attack increases by 50%. When attacking, cannot trigger a critical hit. Does not cost any Souls to activate the caster's first Soulburn. After an ally except for the caster uses an attack that targets all enemies, activates Suppress!. Can only be activated once every 3 turns.<br>Suppress!: Increases Combat Readiness of all allies by 15% and plants a --bomb-- on two random enemies for 2 turns.
  - Source multiplier text (requires review): Skill2<br>Bomb Effect = 150% of caster's Attack as damage, ignores 70% of def<br>
  - Unparsed formula lines: Bomb Effect = 150% of caster's Attack as damage, ignores 70% of def
  - EE 3: Upon using Suppress!, plants a --bomb-- on all enemies for 2 turns.

- [ ] **S3 — Sword of Flowers!** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies with swords of flowers, --decreasing Attack-- for 2 turns and increases Speed of the caster for 2 turns. At the end of the turn, detonates bombs inflicted on the enemy.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.2<br>!pow: 1<br>10% increased damage on detonate via s3<br>Detonation multi: 1.1
  - Unparsed formula lines: 10% increased damage on detonate via s3; Detonation multi: 1.1

### Surin (c1065)

- [ ] **S1 — Chain Dagger** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a chain axe. When the enemy is inflicted with --bleeding--, inflicts two --bleeding-- effects for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.9<br>

- [ ] **S2 — Edge Smash** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy consecutively with a chain axe, inflicting two to four --bleeding-- effects for 2 turns and--decreased Attack-- for 1 turn.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.4<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S3 — Implosion** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the inner core of the enemy with a chain axe. Damage dealt increases proportional to the number of bleeding effects inflicted on the target and extends debuff durations by 1 turn. Increases Combat Readiness of the caster by 15% per --bleeding-- effect inflicted on the target, by up to 75%.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.8<br>!pow: 0.8<br>If one bleed, +40% damage. +15% damage for each additional up to 5.<br>
  - Unparsed formula lines: If one bleed, +40% damage. +15% damage for each additional up to 5.

### Suthan (c3155)

- [ ] **S1 — Shadow Tracking** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy and has a 50% chance to --burn-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Belated Bloom** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: After attacking, increases Attack and Effectiveness of the caster by 5%. Can stack up to 10 times.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Shadow Release** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Releases mana to attack all enemies and has a 100% chance to make them --unhealable-- for 2 turns and inflict two --burn-- effects for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.8<br>!pow: 1.1<br>

### Sven (c3015)

- [ ] **S2 — Potential** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Grants immortality for 1 turn and increases Attack for 2 turn when the caster receives lethal damage. Can only be activated once every 4 turns.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — S3** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies and inflicts huge damage. Damage dealt increases proportional to the caster's lost Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.8<br>!pow: 0.8<br>0.5% increased damage per 1% self Health missing<br>0.15% increased damage per 1% target health missing
  - Unparsed formula lines: 0.5% increased damage per 1% self Health missing; 0.15% increased damage per 1% target health missing
  - Soulburn (10 souls): Increases damage dealt.

### Swift Flagbearer Sigret (c5072)

- [ ] **S1 — Strike of Flagbearer** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a flag, with a 75% chance to inflict --silence-- for 1 turn. After attacking, if the target is inflicted with silence, decreases Combat Readiness of the target by 25%.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Target Lock** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: After dispelling all buffs from the enemy, has a 100% chance to inflict --target-- for 2 turns, and makes all allies except for the caster attack with a basic skill. Increases Combat Readiness of the caster by 30%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): Ignores Effect Resistance.

- [ ] **S3 — Flag of Victory** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Dispels two buffs from all enemies, before a 100% chance to inflict --fear-- for 2 turns, and decrease Combat Readiness by 20%. Grants increased Speed to all allies for 2 turns. At the start of the first battle, grants increased Evasion to the caster for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Sylvan Sage Vivian (c2088)

- [ ] **S1 — Mana Attunment** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with mana, before increasing Combat Readiness of the caster by 15% and increasing Attack by 20%. Increased Attack effect can stack up to 3 times. On the caster's turn, when Focus is full, activates the same skill as an extra attack.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>same att_rate and pow for the soulburn (but its aoe)<br>20% attack increase per buff stack (up to 3 times)
  - Unparsed formula lines: same att_rate and pow for the soulburn (but its aoe); 20% attack increase per buff stack (up to 3 times)
  - Soulburn (10 souls): Attacks all enemies. This attack does not trigger a Dual Attack.

- [ ] **S2 — Insight** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Description: At the start of the first battle, fully recovers Focus, and at the end of the turn, gains 1 Focus. When Focus is 3 or higher, immune to debuffs. When attacked, if expected damage suffered is equivalent to 30% or more of max Health, consumes 1 Focus, granting 70% damage reduction. Insight only applies to PVP.
  - Resource: focus; base gain 0; required/spent 0.
  - Implemented resource passive portions: battle-start grant. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Nature's Judgment** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks all enemies by bringing forth the power of nature, before decreasing skill cooldowns of all allies by 1 turn and recovering Health proportional to the caster's Attack.
  - Resource: focus; base gain 1; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.1<br>!pow: 1<br>Heal strength: 65% caster's Attack<br>10% increased damage per extra target
  - Unparsed formula lines: Heal strength: 65% caster's Attack; 10% increased damage per extra target

### Tactical Archetype Coli (c5033)

- [ ] **S1 — Sweep** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a blade, with a 80% chance each to inflict two --bleeding-- effects for 2 turns, and when the caster is granted overload, increases effect chance by 20%. At the end of the turn, detonates --bleeding-- effects inflicted on the target.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Bleed Detonation multiplier: 1.3<br>
  - Unparsed formula lines: Bleed Detonation multiplier: 1.3
  - Soulburn (10 souls): Inflicts one additional --bleeding--.

- [ ] **S2 — Guard** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: After an ally except for the caster uses a Single Attack, grants swift attack to the ally target, and activates Flank Strike against the enemy target. This effect is not activated by an extra attack, counterattack, or Dual Attack.<br>Flank Strike: Attacks the enemy’s flank, dispelling one buff and inflicting --decreased Defense-- for 2 turns, before increasing Combat Readiness of the caster by 20%.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S3 — Assault** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After granting overload to the caster for 2 turns, attacks all enemies with maximum output, dispelling two buffs, and has a 100% chance each to inflict a --bomb-- and --frostbite-- for 2 turns. At the end of the turn, detonates --bombs-- inflicted on the target.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.9<br>!pow: 1<br>Bomb Detonation multiplier: 1.2<br>
  - Unparsed formula lines: Bomb Detonation multiplier: 1.2

### Taeyou (c1127)

- [ ] **S1 — Full Moon Slash** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy with a spear and increases Combat Readiness of the caster by 15%. Damage dealt increases proportional to the caster's Speed. When the caster is enraged, activates Tidal Crash as an extra attack. Tidal Crash can only be activated once per turn, during the caster's turn.<br>Tidal Crash: Attacks the enemy by slashing downwards with a spear. Damage dealt increases proportional to the caster's Speed.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.98 (1.65 soulburn)<br>!pow: 0.9<br>0.075% self Speed (0.00075 * Speed)<br>yes, 0.98, weird value<br><br>Skill1Proc<br>att_rate: 1.2<br>!pow: 1.3<br>0.075% self Speed (0.00075 * Speed)<br>does not benefit from s1 mola
  - Unparsed formula lines: yes, 0.98, weird value; Skill1Proc; att_rate: 1.2; !pow: 1.3; 0.075% self Speed (0.00075 * Speed); does not benefit from s1 mola
  - Soulburn (10 souls): Increase damage dealt by Full Moon Slash.
  - EE 1: Increases Full Moon Slash's Combat Readiness increase effect by 5%.

- [ ] **S2 — Azure Waves Of The Ocean** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: After an enemy uses a non-attack skill, dispels all debuffs from the caster and becomes enraged for 3 turns and grants skill nullifier once to the caster. Can only be activated once every 3 turns.
  - Source multiplier text (requires review): Skill2<br>
  - EE 2: Increases Combat Readiness of the caster by 15% after an enemy uses a non-attack skill.

- [ ] **S3 — Tornado Sweep** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies, dispelling all buffs, and increases skill cooldowns of the target with the highest Attack by 1 turn twice. Grants increased Attack and Speed to the caster for 2 turns. When the caster is enraged, ignores Effect Resistance.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 0.9<br>
  - EE 3: Increases skill cooldowns of all enemies except for the target with the highest Attack by 1 turn when using Tornado Sweep.

### Talaz (c3152)

- [ ] **S1 — Casual Introduction** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy and has a 60% chance to --provoke-- for 1 turn.
  - Resource: fightingSpirit; base gain 20; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Street Fighter** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When attacked, has a 40% chance to counterattack. After attacking with a basic skill, when Fighting Spirit is full, consumes all Fighting Spirit to increases Combat Readiness of the caster by 100% and fully decrease cooldown of Soulful Strike.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Soulful Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with full power, and increases Defense of the caster for 2 turns. When the target is inflicted with --provoke-- or --redirected provoke--, increases damage dealt.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5 (1.8 Soulburn)<br>!pow: 0.9<br>50% increased damage if target provoked<br>
  - Unparsed formula lines: 50% increased damage if target provoked
  - Soulburn (10 souls): Increases damage dealt.

### Talia (c3154)

- [ ] **S1 — Ready to Pounce** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy and has a 50% chance to --decrease Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Casual Cheer** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Grants immunity to an ally and the caster for 2 turns, and grants a barrier to all allies for 2 turns. Barrier strength increases proportional to the caster's Attack.
  - Source multiplier text (requires review): Skill2<br>Barrier Strength: 70% of self attack<br>
  - Unparsed formula lines: Barrier Strength: 70% of self attack

- [ ] **S3 — Break Apart** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy's vital point, with a 100% chance to dispel two buffs and make them --unable to be buffed-- for 2 turns. This skill cannot trigger a counterattack.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Tamarinne (c1067)

- [ ] **S1 — Serene Tune** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: (Tamarinne) Attacks an enemy with a serene melody before recovering Health of the ally with the lowest Health proportional to the target’s max Health. Decreases cooldown of Shining Star☆ by 1 turn.<br>(Idol) Attacks all enemies with a beautiful voice and dispels all buffs. Triggers a Dual Attack from the ally with the highest Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 0.75<br>Heal strength: 7% target max Health. <br>Heal strength: 35% self max Health (Soulburn)<br><br>Skill1(Idol)<br>att_rate: 1<br>!pow: 0.75<br>Heal strength: 35% self max Health (Soulburn)<br>
  - Unparsed formula lines: Heal strength: 7% target max Health. ; Heal strength: 35% self max Health (Soulburn); Skill1(Idol); att_rate: 1; !pow: 0.75; Heal strength: 35% self max Health (Soulburn)
  - Soulburn (20 souls): Greatly recovers Health of all allies after attacking.

- [ ] **S2 — Song of the Forest** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: (Tamarinne) With a peaceful melody, recovers Health of all allies proportional to the caster’s max Health. Decreases cooldown of Shining Star☆ by 1 turn.<br>(Idol) With a powerful performance, grants increased Attack to all allies for 2 turns, increases Combat Readiness by 50%, and recovers Health proportional to the caster’s max Health.
  - Source multiplier text (requires review): Skill2<br>Heal strength: 25% self max Health. <br><br><br>Skill2(Idol)<br>Heal strength: 25% self max Health. <br>
  - Unparsed formula lines: Heal strength: 25% self max Health. ; Skill2(Idol); Heal strength: 25% self max Health. 

- [ ] **S3 — Shining Star☆** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Before performing, dispels all debuffs inflicted on all allies and recovers the caster to max Health and grants an extra turn. The caster becomes an idol for 3 turns and performs a concert. Begins the first battle with full cooldown count.
  - Source multiplier text (requires review): Skill3<br>

### Taranor Guard (c3032)

- [ ] **S1 — Spear Art** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Knocks the enemy into the air with a spear, with a 75% chance to --decrease Defense-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Discipline** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases the chance of Dual Attack by 10%. Combat Readiness of all allies increases by 25% and the caster is granted increased Attack when a Dual Attack is triggered.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Pierce** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Pierces the enemy's weak point with a spear, decreasing Combat Readiness by 50%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.8<br>!pow: 1<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.

### Taranor Royal Guard (c3002)

- [ ] **S1 — Sword of the Kingdom** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with a sword, with a 50% chance to --provoke-- for 1 turn. Damage dealt increases proportional to the caster's max Health.<br>
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.8<br>!pow: 1<br>2.5% self max Health (0.025 * Health)<br>

- [ ] **S2 — Shield Deflect** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: The caster reflects 50% of the damage suffered from a critical hit to the attacker. Reflected damage can't be higher than caster's max Health.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Strike** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Jumps towards the enemy and attacks them, dispelling all buffs and absorbing all damage as Health. Damage dealt increases proportional to the caster's max Health.<br>
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.5(2.3 soulburn)<br>!pow: 0.95<br>5% self max Health (0.05 * Health)<br>
  - Soulburn (10 souls): Increases damage dealt.<br>

### Tempest Surin (c2065)

- [ ] **S1 — Lunge** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy by diving at them with a chain axe, with a 50% chance each to inflict two --bleeding-- effects for 2 turns. Damage dealt increases proportional to the caster's lost Health.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>0.15% increased damage per 1% self Health missing<br>EE Lifesteal: 20% of the damage dealt ( 0.2 * damge dealt )
  - Unparsed formula lines: 0.15% increased damage per 1% self Health missing; EE Lifesteal: 20% of the damage dealt ( 0.2 * damge dealt )
  - EE 1: Increases Lunge's chance of inflicting bleeding by 20%.

- [ ] **S2 — Swift Movement** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: When attacked, damage suffered in one attack does not exceed 51% of max Health. At the end of an enemy's turn, when the caster's Health is 70% or less, dispels all debuffs from the caster and grants stealth and vampirism for 1 turn before increasing Combat Readiness by 30%.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Moonlight Shadow** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies, with a 100% chance each to make them --unable to be buffed-- for 2 turns and inflict --silence-- for 1 turn. Damage dealt increases proportional to the amount of the caster's lost Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1 (1.25 Soulburn)<br>!pow: 1.05<br>0.50% increased damage per 1% self Health missing<br>
  - Unparsed formula lines: 0.50% increased damage per 1% self Health missing
  - Soulburn (10 souls): Increases damage dealt.
  - EE 3: When using Moonlight Shadow, dispels one buff from the terget (This effect is applied before inflicting --unable to be buffed--).<br>

### Tenebria (c1050)

- [ ] **S1 — Dark Explosion** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks two enemies with an explosion of dark energy, with a 70% chance to put them to --sleep-- for 1 turn. When an enemy is put to --sleep--, the caster's Combat Readiness increases by 25%. This skill does not trigger a Dual Attack.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.2<br>!pow: 1<br>
  - EE 1: Has a 75% chance to dispel one buff from the targlet when using Dark explosion (This effect is applied before sleep).

- [ ] **S2 — Ominous Thunder** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Summons ominous thunder to attack all enemies, dispelling one buff before decreasing Combat Readiness by 30% and before --decreasing Speed-- and making them --unable to be buffed-- for 2 turns.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1 (1.25 soulburn)<br>!pow: 1<br>
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — Nightmare** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks all enemies by dropping the Moon of Nightmare, inflicting --decreased Defense-- for 2 turns and a 85% chance to put them to --sleep-- for 1 turn, before granting increased Attack to the caster for 2 turns.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.1<br>!pow: 1.05<br>
  - EE 2: Increases Nightmare's chance to put the target to --sleep-- by 15%.
  - EE 3: Grants increased Attack (Greater) instead of increased Attack when using Nightmare.

### Tidal Rift Elvira (c2148)

- [ ] **S1 — Rift Cleave** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Has a 85% chance to inflict --seal-- on the enemy for 2 turns before attacking. When used on the caster's turn, has a 40% chance to activate Twisted Strike as an extra attack.<br>Twisted Strike: Attacks all enemies, absorbing some of the damage dealt as Health, and has a 35% chance to inflict --fear-- for 1 turn. When the caster is granted engulf, effect chance is doubled.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.75<br>!pow: .95<br><br><br>Skill1 (Proc)<br>att_rate: .3<br>!pow: 1<br>Heal strength: 50% of the damage dealt<br>
  - Unparsed formula lines: Skill1 (Proc); att_rate: .3; !pow: 1; Heal strength: 50% of the damage dealt
  - Soulburn (10 souls): Increases chance of activating Twisted Strike to 100%.

- [ ] **S2 — Craving Affection** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of battle, grants engulf. When attacking, penetrates the target's Defense, and cannot trigger a critical hit or heavy blow. After an ally uses a skill, for each debuff inflicted on all enemies, has a 25% chance to increase Combat Readiness by 15%
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Wave of Curses** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Has a 35% chance to inflict --curse-- on all enemies except for the target for 2 turns before attacking the enemy, and inceases Combat Readiness of the caster by 50%. When the caster is granted engulf, effect chance is doubled.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.8<br>!pow: .95<br>

### Tieria (c3021)

- [ ] **S1 — Demon Cutter** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks with an axe, with a 75% chance to --decrease Hit Chance-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1.05<br>

- [ ] **S2 — Dance of Sands** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: A successful attack increases the Combat Readiness of all allies except for the caster by 15%.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Soul Break** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Strikes the enemy strongly, dealing damage proportional to the target's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.8<br>!pow: 0.9<br>6% target max Health<br>
  - Soulburn (20 souls): Grants an extra turn.

### Top Model Luluca (c2082)

- [ ] **S2 — Victory Pose** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: By manifesting the suit’s power, increases Combat Readiness of all allies by 20%, and grants increased Speed to the caster for 2 turns. Grants an extra turn.
  - Source multiplier text (requires review): Skill2<br>
  - EE 1: Grants increased Speed to all allies for 2 turns when using Victory Pose.

- [ ] **S3 — Demolish** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After granting increased Attack to the caster for 3 turns, attacks the enemy, and when the enemy is defeated, inflicts extinction. Grants stealth and a barrier (proportional to Attack) to the caster for 2 turns. Penetrates the target’s Defense by 50%. When the Speed of the caster is greater than the Speed of the target, penetration rate increases proportional to the difference, up to a maximum of 100%.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.7<br>!pow: 1<br>0.25% defense penetration per speed over the target (MAX 100% Def Penetration)<br>(200 Speed difference for max def penetration)<br>Barrier strength: 100% caster's Attack
  - Unparsed formula lines: 0.25% defense penetration per speed over the target (MAX 100% Def Penetration); (200 Speed difference for max def penetration); Barrier strength: 100% caster's Attack
  - Soulburn (20 souls): All skill cooldowns decreased by 2 turns.

### Tori (c1171)

- [ ] **S1 — Overreaction** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy by whipping a ribbon, and grants a barrier to the caster for 1 turn. Barrier strength increases proportional to the caster's Attack.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1.2 (2.3 Soulburn)<br>!pow: 0.9<br>Barrier strength: 50% caster's Attack<br>
  - Unparsed formula lines: Barrier strength: 50% caster's Attack
  - Soulburn (20 souls): Greatly increases damage dealt and does not trigger a Dual Attack. When the caster is granted cascade, does not cost any Soul to activate Soulburn.

- [ ] **S2 — Delusional Runway** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Buffs granted to the caster are applied as undispellable. When attacked, damage suffered in one attack does not exceed 51% of max Health. At the start of the turn, has a 20% chance for each buff granted to the caster to grant cascade.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Heart Over Grace** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Throws chocolates filled with heartfelt sentiments, granting increased Attack and increased Speed to all allies for 3 turns. Grants increased Hit Chance to the caster for 3 turns. Grants an extra turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Troublemaker Crozet (c2036)

- [ ] **S1 — Lunge** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy in an act of faith, with a 40% chance to --stun-- for 1 turn. When it is not the caster's turn, effect chance increases by 20%. Damage dealt increases proportional to the caster's max Health.<br>
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 0.95<br>4% self max Health (0.04 * Health)<br>
  - Soulburn (10 souls): Increases effect chance by 60%.<br>

- [ ] **S2 — Chivalry** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Grants 40% damage share from the damage received by the ally in the back row. At the moment the ally in the back row is attacked, increases Combat Readiness of the caster by 15% and has a 35% chance to counterattack.
  - Source multiplier text (requires review): Skill2<br>
  - EE 1: With Chivalry's effect, at the moment the ally in the back row is attacked, increases chance to counterattack by 15%.

- [ ] **S3 — Oath of Protection** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Swears an oath of protection, dispelling all debuffs from the caster and an ally, before increasing Defense for 3 turns. Grants class enhancement to the ally for 3 turns.<br>
  - Source multiplier text (requires review): Skill3<br>Barrier strength: 20% self Max Health<br>
  - Unparsed formula lines: Barrier strength: 20% self Max Health
  - EE 2: Recovers the caster's Health when using Oath of Protection. Amount recovered increase proportional to the caster's max Health.
  - EE 3: Increases Combat Readiness of the targeted ally by 40% when using Oath of Protection.

### Twisted Eidolon Kayron (c2023)

- [ ] **S1 — Sundering Slash** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a sword, inflicting up to 10% injuries, before granting a barrier (proportional to the caster’s max Health) to the caster for 1 turn. When triggered as a counterattack, changes into an attack that targets all enemies.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1 (1.7 Soulburn)<br>!pow: 1<br>Barrier Strength: 12% of self Max Health<br><br><br>Skill1(AoE Proc)<br>att_rate: 1<br>!pow: 1<br>Barrier Strength: 12% of self Max Health<br>
  - Unparsed formula lines: Barrier Strength: 12% of self Max Health; Skill1(AoE Proc); att_rate: 1; !pow: 1; Barrier Strength: 12% of self Max Health
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S2 — Wandering Eidolon** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of battle and at the end of the turn, grants counterattack for 1 turn. At the end of an enemy's turn, gains 10 Fighting Spirit, and when Fighting Spirit is full, dispels all debuffs before increasing Combat Readiness by 100%.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Sword of Requiem** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks all enemies by unleashing the power of the demonic sword, before consuming all Fighting Spirit. Inflicts 5,000 additional damage, regardless of whether the attack hits, and additional damage increases proportional to the amount of consumed Fighting Spirit, up to 15,000. When this skill is not on cooldown, when attacked, grants 30% damage reduction.
  - Resource: fightingSpirit; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.7<br>!pow: 1<br>Need to check how this works stack passive fixed damage 5000, resource=0.01<br>
  - Unparsed formula lines: Need to check how this works stack passive fixed damage 5000, resource=0.01

### Tywin (c1042)

- [ ] **S1 — Sword Storm** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy with a sword blast, with a 75% chance to inflict --decreased Defense-- for 2 turns. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.8<br>!pow: 0.95<br>4% self max Health (0.04 * Health)<br>
  - Soulburn (10 souls): Increases effect chance to 100%.
  - EE 1: Increases Sword Storm's --decrease Defense-- effect chance by 15%.
  - EE 2: Increases combat Readiness of the ally in the back row by 10% when using Sword Storm.

- [ ] **S2 — S2** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Immune to debuffs which prevent movement. When the ally in the back row has a debuff which prevents movement after being attacked, activates Commanding Shout on the target.<br>Commanding Shout: Dispels all debuffs from the ally and grants immunity and a barrier (proportional to the caster’s max Health) for 2 turns.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>Barrier strength: 20% caster max Health<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a; Barrier strength: 20% caster max Health
  - EE 3: Increases Commanding Shout's barrier strength by 20%.

- [ ] **S3 — All-Out Attack** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies again after a swordstorm, with a 100% chance to --decrease Defense-- for 2 turns, and increases Defense of all allies for 2 turns. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.5<br>!pow: 0.95<br>10% self max Health (0.10 * Health)<br>

### Unbound Knight Arowell (c4004)

- [ ] **S1 — Shield Thrust** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a sword and shield, with a 75% chance each to dispel one buff twice. Damage dealt increases proportional to the caster's max Health.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.7<br>!pow: 0.95<br>5% self max Health (0.05 * Health)  <br>
  - Soulburn (10 souls): Increases effect chance to 100%.

- [ ] **S2 — Escort** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of battle and at the end of the caster's turn, grants escort to the caster for 1 turn. After an ally except for the caster is attacked by a Single Attack, increases Combat Readiness of the caster by 20%.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Judgment of Light** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a shield, dispelling all buffs and a 100% chance to --stun-- for 1 turn, before granting a barrier and increased Defense to all allies for 2 turns. Damage dealt and barrier strength increase proportional to the caster's max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.7<br>!pow: 0.95<br>15% self max Health (0.15 * Health)<br>Barrier Strength: 20% of Self Max Health
  - Unparsed formula lines: Barrier Strength: 20% of Self Max Health

### Uncharted Pioneer Politis (c5112)

- [ ] **S1 — Pulse Deployment** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Description: Attacks all enemies with light, with a 65% chance to dispel one buff. Deals 1000 additional damage regardless of whether the attack hits.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.5<br>!pow: 1<br>

- [ ] **S2 — Survivor's Mission** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: At the start of battle, when in the front row, grants offense mission, and when in the back row, grants defense mission. When a mission is complete, dispels the mission and all debuffs from the caster, and activates Last Words of a Fallen Star.<br>Last Words of a Fallen Star: Grants knowledge of the stars to all allies, and grants an extra turn to the caster.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Light Piercing the End** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks all enemies with a drone, dispelling all buffs before increasing skill cooldowns by 1 turn. Deals 3000 additional damage regardless of whether the attack hits.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.7<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Urban Shadow Choux (c2101)

- [ ] **S1 — Zippity Zap!** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a spear, and increases Combat Readiness of the caster by 15%. When it is the caster's turn, gains 1 Focus. Damage dealt increases proportional to the caster's max Health.
  - Resource: focus; base gain 0; required/spent 0.
  - Supported damage formula (reference only): Skill1<br>att_rate: 0.5 (0.8 Soulburn)<br>!pow: 1<br>Max Health scaling 10% (0.10 * self Max Health) (16% with Soulburn)<br>
  - Soulburn (10 souls): Increases damage dealt and deals additional damage equivalent to 40% of injuries inflicted on the target. 

- [ ] **S2 — Wild Charge** — Passive partially implemented or pending
  - Current base support: passive. Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Review/work: Passive: reviewed resource grants/gain blocking implemented; other effects pending
  - Description: Increases Critical Hit Chance by 30%. At the start of the first battle, gains 1 Focus. At the start of the turn, gains 1 Focus and grants Bzzt! to the caster for 1 turn, and when Focus is full, resets cooldown of Operation: Cream Pastry.
  - Resource: focus; base gain 0; required/spent 0.
  - Implemented resource passive portions: battle-start grant, turn-start grant. Other passive effects still require separate handlers.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Operation: Cream Pastry** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy using adaptable tactics, inflicting up to 25% injuries, and grants increased Speed to all allies for 2 turns. Penetrates the target's Defense by 50%. When Focus is full, consumes all to recover Health of the caster, and deals additional damage equivalent to 60% of injuries inflicted on the target. Damage dealt and amount recovered increase proportional to the caster's max Health.
  - Resource: focus; base gain 2; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.5<br>!pow: 1<br>Max Health scaling 25% (0.25 * self Max Health)<br>Heal strength: 20% self max Health (0.2 * self max Health)
  - Unparsed formula lines: Heal strength: 20% self max Health (0.2 * self max Health)

### Verdant Adin (c4143)

- [ ] **S1 — Ankle Cut** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy with a sword, increasing Combat Readiness of the caster by 20%. 
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Blade Gust** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies with a blade gust, with an 80% chance to make them --unable to be buffed-- for 2 turns. When there are three or fewer enemies, damage dealt increases with fewer enemies. 
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Gliding Slash** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy repeatedly, granting increased Attack and Weakness Shared to the caster for 2 turns, before absorbing some of the damage dealt as Health. A critical hit has a 100% chance to --decrease Defense-- for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (20 souls): Ignores Effect Resistance.

### Veronica (c1150)

- [ ] **S1 — Rapid Fire** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attack the enemy by shooting, and increases Combat Readiness of the ally with the highest Combat Readiness except for the caster by 15%. At the end of the turn detonates bomb effects inflicted on the target.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7<br>!pow: 1<br>Detonation multi: 1.0<br>
  - Unparsed formula lines: Detonation multi: 1.0

- [ ] **S2 — Vampire Hunter** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: At the start of the turn, dispels immortality from all enemies. Ignores Effect Resistance. At the end of someone's turn, when an enemy has immortality, increases Combat Readiness of the caster by 50%.
  - Source multiplier text (requires review): Skill2<br>
  - EE 1: At the end of someone's turn, when the enemy is immortal, grants increased Attack to the caster for 1 turn.
  - EE 2: Vampire Hunter increases Combat Readiness by an additional 30%.

- [ ] **S3 — Chain Explosion** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy, dispelling two buffs before inflicting --decreased Defense-- and --bomb-- for 2 turns. A critical hit will grant an extra turn.
  - Supported damage formula (reference only): Skill3<br>att_rate: 0.8<br>!pow: 1<br>
  - Soulburn (20 souls): Ignores Effect Resistance.
  - EE 3: Decreases Combat Readiness of the target by 50% when using Chain Explosion.

### Victorika (c1166)

- [ ] **S1 — Hilag's Pride** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy with a lance, with a 50% chance to inflict --decreased Defense-- for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Maelstrom Waltz** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks all enemies by infiltrating deep into enemy lines, and grants counterattack to the caster for 3 turns.
  - Supported damage formula (reference only): Skill2<br>att_rate: 1.2 (1.45 Soulburn)<br>!pow: 1<br>
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — Promised Glory** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy by rushing them down, and grants immunity to all allies for 2 turns. Damage dealt increases proportional to the target's max Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.4<br>!pow: 1<br>Target's Max Health scaling 5% (0.05 * target Max Health)<br>
  - Unparsed formula lines: Target's Max Health scaling 5% (0.05 * target Max Health)

### Vigilante Leader Glenn (c4103)

- [ ] **S1 — Quick Fire** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Rapidly shoots the enemy, with a 50% chance to --decrease Defense-- for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Precise Attack** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Fires a missile at the enemy, and when the enemy is defeated, inflicts extinction and grants torrent to the caster. Increases Hit Chance of this skill by 50%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S3 — Limiter Release** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Releases the limiter, granting increased Attack (Greater), increased Critical Hit Chance, and increased Hit Chance to the caster for 2 turns. Grants an extra turn.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

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

- [ ] **S2 — Duel Accepted** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: As preparation for a duel, dispels two debuffs from the caster and grants perception for 3 turns, before recovering 15% Health. Grants an extra turn.
  - Resource: focus; base gain 3; required/spent 0.
  - Source multiplier text (requires review): Skill2<br>Heal strength: 15% self max Health<br>
  - Unparsed formula lines: Heal strength: 15% self max Health

- [ ] **S3 — Butterfly Cut** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks the enemy by piercing them with a sword before consuming all Focus. Damage dealt increases proportional to the amount of Focus consumed, and when consumed Focus is 5, resets the cooldown of Butterfly Cut. When Butterfly Cut is not on cooldown, increases Evasion by 35%, and when evading, counterattacks with Graceful Cut.
  - Resource: focus; base gain 0; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5<br>!pow: 0.9<br>15% increased damage per Focus<br>
  - Unparsed formula lines: 15% increased damage per Focus

### Vivian (c1088)

- [ ] **S1 — Vitality Drain** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Smashes the enemy with a rock, increasing the caster's Combat Readiness by 15%. A critical hit will increase the caster's Combat Readiness by an additional 10%.
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

### Wanda (c3065)

- [ ] **S1 — Weak Point** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Shoots an arrow at the enemy, decreasing Combat Readiness by 15%. When the enemy is --targeted--, increases damage dealt.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.9<br>!pow: 0.95<br>35% increased damage if enemy has Targetted debuff<br>
  - Unparsed formula lines: 35% increased damage if enemy has Targetted debuff

- [ ] **S2 — Steady Aim** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: Unmapped/conditional debuff grants
  - Description: Has a 100% chance to --target-- a random enemy for 2 turns at the beginning of each turn.
  - Source multiplier text (requires review): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a

- [ ] **S3 — Fatal Shot** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy's vital points, with a 100% chance to --stun-- for 2 turn.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.8<br>!pow: 0.9<br>
  - Soulburn (20 souls): Ignores Effect Resistance.

### Wanderer Silk (c2004)

- [ ] **S1 — Basic Shot** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks the enemy by shooting arrows, with a 50% chance to --target-- for 2 turns.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1.2<br>!pow: 1<br>
  - EE 1: Increases Basic Shot's chance to --target-- by 15%.

- [ ] **S3 — Shock Arrow** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy by shooting lightning arrows, inflicting --silence-- and --decreased Attack-- for 2 turns and decreasing Combat Readiness by 100%. Grants a barrier (proportional to the caster's level) to the caster for 2 turns.
  - Source multiplier text (requires review): Skill3<br>att_rate: 2<br>!pow: 0.8<br>Shield Strength: 75 per character level<br>
  - Unparsed formula lines: Shield Strength: 75 per character level
  - Soulburn (20 souls): Ignores Effect Resistance.<br>
  - EE 2: Dispels one buff from the enemy when using Shock Arrow. (This effect is applied before inflicting --silence--.)
  - EE 3: Increases Speed of all allies for 2 turns when using Shock Arrow.

### Wandering Prince Cidd (c6014)

- [ ] **S1 — Spiral Cut** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a machete, with a 75% chance to --decrease Defense-- for 1 turn.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (10 souls): Increases effect chance to 100%, and decreases Defense of the target for 2 turns.

- [ ] **S2 — Natural Storyteller** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Review/work: EE option 1: EE mechanic not implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: After an ally uses an attack that targets all enemies, activates Continuous Strike against the enemy with the highest Combat Readiness.<br>Continuous Strike: Attacks the enemy, decreasing Combat Readiness by 20%, and increases Combat Readiness of the ally with the highest Combat Readiness except for the caster by 20%.
  - Source multiplier text (requires review): Skill2(Proc)<br>att_rate: 0.6<br>!pow: 0.9<br>
  - Unparsed formula lines: Skill2(Proc)
  - EE 1: Increases Combat Readiness of the caster by 20% when using Continuous Strike.
  - EE 2: Amplifies the Combat Readiness increase and Combat Readiness decrease values of Continuous Strike by 10%.

- [ ] **S3 — Narrative Retcon** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Plants a --bomb-- on all enemies and --decreases Speed-- for 2 turns. At the end of the turn, detonates bombs inflicted on the target.
  - Source multiplier text (requires review): Skill3<br>Detonation multi: 1.1<br>
  - Unparsed formula lines: Detonation multi: 1.1
  - EE 3: Decreases Combat Readiness of all enemies by 15% when using Narrative Retcon.

### Watcher Schuri (c2020)

- [ ] **S1 — Sniper** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Shoots the enemy with a rifle, with a 50% chance to --target-- them for 2 turns.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>

- [ ] **S2 — Quickfire** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Shoots all enemies with a rifle, with a 100% chance to dispel one buff, and increases Speed of the caster for 2 turns. 
  - Supported damage formula (reference only): Skill2<br>att_rate: 0.7<br>!pow: 1.05<br>
  - EE 1: Decreases Combat Readiness of all enemies by 20% when using Quickfire.

- [ ] **S3 — Finishing Shot** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unverified defense penetration
  - Review/work: Conditional or unverified defense penetration
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 2: EE mechanic not implemented
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy with a mana bullet. Penetrates the target’s Defense. Increases Hit Chance by 50% when using this skill.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.8<br>!pow: 0.95<br>
  - Soulburn (10 souls): Skill cooldown is decreased by 2 turns.
  - EE 2: Grants skill nullifier once to the caster when using Finishing Shot.
  - EE 3: Increases Hit Chance of Finishing Shot by 50%.

### Westwind Executioner Schuri (c6020)

- [ ] **S1 — Overpower** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy, with a 100% chance to inflict --burn-- for 1 turn. When Merciless Execution is on cooldown, activates Annihilate instead of Overpower.<br>Annihilate: Attacks the enemy, inflicting --burn-- for 1 turn, and at the end of the turn, detonates --burn-- effects inflicted on the target.
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br><br><br>Skill1<br>att_rate: 1<br>!pow: 1<br>Detonation (burn only) multi: 1.0<br>
  - Unparsed formula lines: att_rate: 1; !pow: 1; Detonation (burn only) multi: 1.0
  - Soulburn (10 souls): Inflicts an additional --burn-- effect for 1 turn.

- [ ] **S2 — Operational Readiness** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Increases Effectiveness by 30%. When attacking, cannot trigger a critical hit or a heavy blow. At the start of the first battle, grants explosives to the ally in the back row except for the caster.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Merciless Execution** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies, with a 100% chance each to inflict two --burn-- effects for 2 turns, and at the end of the turn, detonates --burn-- effects and --bombs-- inflicted on the target.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.2<br>!pow: 1<br>Detonation (brun, bombs) multi: 1.0<br>
  - Unparsed formula lines: Detonation (brun, bombs) multi: 1.0

### Wild Angara (m0171)

- [ ] **S1 — Unknown skill** — Skill execution unsupported
  - Current base support: unsupported. API skill data unavailable
  - Review/work: API skill data unavailable
  - Description: No source description available.

- [ ] **S2 — Unknown skill** — Skill execution unsupported
  - Current base support: unsupported. API skill data unavailable
  - Review/work: API skill data unavailable
  - Description: No source description available.

- [ ] **S3 — Unknown skill** — Skill execution unsupported
  - Current base support: unsupported. API skill data unavailable
  - Review/work: API skill data unavailable
  - Description: No source description available.

### Witch of the Mere Tenebria (c6050)

- [ ] **S1 — Mirror Fragment** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a mirror, with a 100% chance to inflict a --random debuff-- for 1 turn. When Mirror of the Abyss is on cooldown, triggers a Dual Attack from the ally with the highest Attack.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Consuming Grasp** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: After inflicting --rupture-- on all enemies for 2 turns, attacks all enemies and has a 100% chance to inflict --restrict-- for 2 turns. Grants stealth and a barrier (proportional to the Level) to the caster for 2 turns.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1<br>!pow: 1<br>Barrier strength: 100 per Caster's level<br>
  - Unparsed formula lines: Barrier strength: 100 per Caster's level

- [ ] **S3 — Mirror of the Abyss** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Unmapped/conditional debuff grants
  - Description: Traps all enemies in a timeless space beyond the mirror, dispelling two buffs before inflicting --block-- for 2 turns and a --random debuff-- for 1 turn. Increases Combat Readiness of the caster by 50%.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

### Wretched Rose (c6003)

- [ ] **S1 — Hide in the Shadows** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy by swinging a sword, and has a 100% chance to grant stealth to the caster for 1 turn. 
  - Source multiplier text (requires review): Skill1<br>att_rate: 1<br>!pow: 1<br>Barrier strength: 20% caster's max Health<br>Heal strength: 15% caster's max Health
  - Unparsed formula lines: Barrier strength: 20% caster's max Health; Heal strength: 15% caster's max Health
  - Soulburn (20 souls): Grant an extra turn.

- [ ] **S2 — Aegis of Time** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of battle, grants increased Critical Hit Resistance to all allies for 2 turns. Upon dying, revives with 50% Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Once-in-a-Life Research** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: (Before Enhancement) Dispels all debuffs from all allies except for the caster and recovers Health before granting barrier for 2 turns. Amount recovered and barrier strength increase proportional to the caster's max Health. Grants solution to the caster and decreases skill cooldowns by 2 turns.<br>(After Enhancement) Grants time reversal to all allies except for the caster and grants a barrier proportional to the caster's max Health to all allies except for the caster for 2 turns. 
  - Source multiplier text (requires review): Skill3<br>

### Yoonryoung (c3134)

- [ ] **S1 — Lunging Slash** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks the enemy, with a 75% chance to --decrease Defense-- for 1 turn. When used on the caster's turn, activate Dazzling Slash as an extra attack if the caster is buffed. <br>Dazzling Slash: Swiftly attacks the enemy, inflicting --restrict-- for 1 turn.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.8<br>!pow: 0.95<br><br><br>Skill1 Extra Attack<br>att_rate: 0.5<br>!pow: 1<br>
  - Unparsed formula lines: Skill1 Extra Attack; att_rate: 0.5; !pow: 1

- [ ] **S2 — Assault Coordination** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: After attacking four times, grants a barrier to all allies for 2 turns and increases Combat Readiness by 15%. Barrier strength increases proportional to the target's max Health.
  - Source multiplier text (requires review): Skill2<br>Barrier Strength: 16% of Target Max Health<br>
  - Unparsed formula lines: Barrier Strength: 16% of Target Max Health

- [ ] **S3 — Battle Cry** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Raises the morale of all allies, granting increased Attack and immunity for 2 turns and decreasing debuff durations by 1 turn.
  - Source multiplier text (requires review): Skill3<br>
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

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

- [ ] **S3 — Snack Time!** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Stops fighting and takes a break, dispelling all debuffs from all allies and granting continuous healing for 2 turns before increasing Combat Readiness by 20%.
  - Resource: fightingSpirit; base gain 20; required/spent 0.
  - Source multiplier text (requires review): Skill3<br>Special Friendship: 8% of the attacker's max Health as additional damage on critical hit<br>
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

- [ ] **S3 — Dragon Charge** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: After granting increased Attack to the caster for 2 turns, attacks the enemy with a massive blade. When the enemy is defeated, grants an extra turn. When the target has a debuff, increases damage dealt. When this skill is not on cooldown, after an ally except for the caster uses a skill, if the enemy has a debuff, increases Combat Readiness of the caster by 20%.
  - Source multiplier text (requires review): Skill3<br>att_rate: 2<br>!pow: 0.95<br>50% increased damage if target is debuffed<br>
  - Unparsed formula lines: 50% increased damage if target is debuffed

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

- [ ] **S3 — Symphony of Agony** — Skill execution unsupported
  - Current base support: unsupported. Missing numeric scaling coefficient
  - Review/work: Missing numeric scaling coefficient
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 3: EE mechanic not implemented
  - Description: Attacks the enemy by unraveling Sphere of Sadism, and when the enemy is defeated, recovers Health of the caster proportional to max Health. When the target is not an Elite or Boss monster, ignores damage share. Penetrates the target's Defense, but cannot trigger a critical hit or a heavy blow. Damage dealt increases proportional to the caster's lost Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.5<br>!pow: 1<br>0.31 (0.41 with soulburn) flat per 1 hp missing<br>Heal strength: 40% Self Max HP
  - Unparsed formula lines: 0.31 (0.41 with soulburn) flat per 1 hp missing; Heal strength: 40% Self Max HP
  - Soulburn (10 souls): Increases damage dealt.
  - EE 3: Resets skill cooldown when defeating an enemy with Symphony of Agony.

### Yuna (c1030)

- [ ] **S1 — Homing Laser** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: EE option 1: EE mechanic not implemented
  - Description: Attacks all enemies with a drone, before increasing Combat Readiness of the caster by 15%, and increasing Combat Readiness of all allies except for the caster by 5%. 
  - Resource: focus; base gain 1; required/spent 0.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.6 (0.85 soulburn)<br>!pow: 0.8<br>0.075% self Speed (0.00075 * Speed)<br>140% dmg vs 2 targets, 160% vs 1 target
  - Unparsed formula lines: 140% dmg vs 2 targets, 160% vs 1 target
  - Soulburn (10 souls): Increases damage dealt.
  - EE 1: Increases Combat Readiness of the caster by an additional 5% when using Homing Laser.

- [ ] **S2 — Upgrade** — Non-attack cast supported; remaining effects listed below
  - Current base support: nonAttack. Non-attack cast implemented
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Enhances all allies with a drone, granting increased Attack and increased Speed for 3 turns. Grants an extra turn.
  - Resource: focus; base gain 3; required/spent 0.
  - Non-attack source note (no damage formula): Skill2<br>att_rate: n/a<br>!pow: n/a<br>
  - Unparsed formula lines: att_rate: n/a; !pow: n/a
  - EE 2: Upgrade is unaffected by cooldown increase and decrease effects.

- [ ] **S3 — Meteor Cannon** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Attacks all enemies with a cannon. When there are three or fewer enemies, damage dealt increases with fewer enemies. 
  - Resource: focus; base gain 0; required/spent 5.
  - Source multiplier text (requires review): Skill3<br>att_rate: 1.5<br>!pow: 0.8<br>20% damage increase for each enemy less than 4<br>
  - Unparsed formula lines: 20% damage increase for each enemy less than 4

### Zahhak (c1119)

- [ ] **S1 — Vulnerability Exposed** — Base damage supported; secondary effects pending
  - Current base support: supported. Reviewed e7calc conditional damage
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with a longsword. Increases Hit Chance and Critical Hit Chance of this skill by 50%. When the target has a buff, increases damage dealt.
  - Reviewed damage source: [e7calc](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts), revision 39070976ce3cd0435cbcf5d430f2711cf0ef0005.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.1(1.8 soulburn)<br>!pow: 1<br>30% increased damage if target is buffed<br>
  - Soulburn (10 souls): Increases damage dealt.

- [ ] **S2 — Elaborate Plan** — Skill execution unsupported
  - Current base support: unsupported. Non-damaging skill: effect support pending
  - Review/work: Non-damaging skill: effect support pending
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: Review source-specific extra-turn execution/conditions (tag is capability metadata)
  - Description: Dispels two debuffs from an ally before increasing Combat Readiness of the ally by 30%. Grants increased Attack and increased Hit Chance to the caster for 3 turns. Grants an extra turn.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Execute** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Review/work: EE option 2: EE mechanic not implemented
  - Description: Attacks the enemy, inflicting up to 35% injuries, before granting invincibility to the caster for 1 turn. Increases Critical Hit Chance and Hit Chance of this skill by 50%.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1.9<br>!pow: 1<br>
  - EE 2: Inflicts resource reduction on the target by 60% before the skill's effect when using Execute.

### Zealot Carmainerose (c4071)

- [ ] **S1 — Vampirism** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Description: Claws the enemy, before absorbing some of the damage as Health.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S2 — Vengeful Strike** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy, decreasing Combat Readiness by 55% before --decreasing Speed-- of the enemy for 2 turns and increasing Speed of the caster for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info

- [ ] **S3 — Spiteful Annihilation** — Skill execution unsupported
  - Current base support: unsupported. Unverified target count
  - Review/work: Unverified target count
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy, dispelling all buffs and making them --unable to be buffed-- for 2 turns, before increasing Attack and Defense of the caster for 2 turns.
  - Source multiplier text (requires review): No info
  - Unparsed formula lines: No info
  - Soulburn (10 souls): Extends duration of buffs granted by this skill by 1 turn.

### Zeno (c1083)

- [ ] **S1 — Black Thorn** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy with thorns, inflicting --frostbite-- for 1 turn. Damage dealt increases proportional to the caster's Defense.
  - Supported damage formula (reference only): Skill1<br>att_rate: 1<br>!pow: 1<br>100% self Defense (1.0 * Defense)<br>
  - Soulburn (20 souls): Grants an extra turn.

- [ ] **S2 — Star's Armor** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: Decreases the enemy’s Evasion by 50%. At the start of the turn, when an enemy is inflicted with --frostbite--, grants rage and increased Defense to the caster for 2 turns.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Ancient Beast** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Summons an ancient beast to attack all enemies, dispelling two buffs before inflicting --rupture-- and --cannot buff-- for 2 turns. Damage dealt increases proportional to the caster’s Defense. When the caster is granted rage, ignores Effect Resistance.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>160% self Defense (1.6 * Defense)<br>

### Zerato (c1010)

- [ ] **S1 — Ice Shard** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks an enemy with an ice pick, with a 50% chance to --decrease Speed-- for 2 turns.<br>
  - Supported damage formula (reference only): Skill1<br>att_rate: 1.05<br>!pow: 1<br>

- [ ] **S2 — Ice Pick** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Description: Attacks the enemy repeatedly, before increasing Combat Readiness of the caster by 50%. When the target has a debuff, increases damage dealt.
  - Source multiplier text (requires review): Skill2<br>att_rate: 1.5 (2 soulburn)<br>!pow: 0.95<br>30% increased damage if target is debuffed<br>
  - Unparsed formula lines: 30% increased damage if target is debuffed
  - Soulburn (10 souls): Increases damage dealt.<br>

- [ ] **S3 — Iceberg** — Base damage supported; secondary effects pending
  - Current base support: supported. Damage coefficients parsed
  - Review/work: Unmapped/conditional debuff grants
  - Description: Attacks all enemies with a giant iceberg, with a 75% chance to --stun-- for 1 turn.
  - Supported damage formula (reference only): Skill3<br>att_rate: 1<br>!pow: 1<br>

### Zio (c1133)

- [ ] **S1 — Let Me Destroy You** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy with a spear, before increasing Attack of the caster for 1 turn. When the caster is deified, activates Disappear as an extra attack. Disappear can only be activated once per turn, during the caster's turn.<br>Disappear: Attacks the enemy with a swordstorm, and when the enemy is defeated, increases Combat Readiness of the caster by 50%. Penetrates the target's Defense by 50%.
  - Source multiplier text (requires review): Skill1<br>att_rate: 0.7<br>!pow: 1<br><br><br>Skill1Proc<br>att_rate: 1<br>!pow: 1<br>Penetration: 50%<br>
  - Unparsed formula lines: Skill1Proc; att_rate: 1; !pow: 1; Penetration: 50%

- [ ] **S2 — Supreme Authority** — Passive partially implemented or pending
  - Current base support: passive. Passive: triggered effects are not automated
  - Review/work: Passive: triggered effects are not automated
  - Description: At the start of the first battle, increases Combat Readiness by 30%. Unaffected by effects that reduce Combat Readiness increases the caster receives.
  - Source multiplier text (requires review): Skill2<br>

- [ ] **S3 — Bow Down Before Me** — Skill execution unsupported
  - Current base support: unsupported. Conditional or unrecognized multiplier text
  - Review/work: Conditional or unrecognized multiplier text
  - Review/work: Unmapped/conditional debuff grants
  - Review/work: Soulburn enhanced execution (currently preview only)
  - Review/work: Audit buff recipients, conditions and durations against implemented grants
  - Description: Attacks the enemy, dispelling two buffs before --silencing-- for 1 turn and decreasing Combat Readiness by 40%. Grants deify to the caster for 3 turns. Penetrates the target's Defense by 100% and cannot trigger a critical hit. When the target is a Hero, damage dealt increases proportional to the target's current Health.
  - Source multiplier text (requires review): Skill3<br>att_rate: 0.2<br>!pow: 1<br>Proportional damage based on target current hp: 18.75% (0.1875 * Target Current Health)<br>Penetration: 100%
  - Unparsed formula lines: Proportional damage based on target current hp: 18.75% (0.1875 * Target Current Health); Penetration: 100%
  - Soulburn (20 souls): Ignores Effect Resistance.
