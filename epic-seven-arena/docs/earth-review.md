# Earth 5★ mechanics review

The catalog audit covers 45 Earth heroes / 135 skills. This first implementation batch enables **22 previously blocked casts**, and adds secondary effects to other usable skills. It is not a claim that all 45 kits, Soulburns, or exclusive equipment options are complete. The generated [Earth-only queue](unsupported-earth-skills.md) lists remaining work; regenerate with `npm run report:skills:earth`.

## Implemented in this batch

| Hero | Reviewed mechanics |
| --- | --- |
| Destina | S1 damage and lowest-HP-ratio ally healing; S2 two-debuff cleanse, healing and 30% CR; S3 revival at 30% HP, cleanse/healing only for initially living allies; opening three-turn Spirit's Blessing (+60 Resistance). |
| Roana | S1 lowest-HP-ratio ally barrier; S2 healing and CR per allied target of an extra/counter/Dual Attack; S3 healing, barrier and two-turn Revive buff. Revive returns at 30% HP, with Extinction/Hecate restrictions. |
| Violet | S2 cleanse, Perception (+15 Crit Chance/Crit Damage), 15% healing and extra turn; S3 fractional-Focus damage, consume-all and full-Focus cooldown reset; ready-S3 evasion and miss-triggered counter. |
| Zahhak | S2 ally cleanse/CR, caster Attack/Hit Chance buffs and extra turn; S3 +50 Hit/Crit Chance, actual-damage injury capped at 35%, self Invincibility. |
| Bellona | S2 self Immunity; S3 direct Defense Down; full-Focus S1 consumes Focus and uses stronger S3 as an additional skill without ticking its cooldown. |
| Baiken | S1 two independent bleed attempts and critical cooldown reduction; S2 three attempts, one bypassing ER, and critical extra turn. S3 detonation remains pending. |
| Saria / Young Senya / Ray | Saria S3 team Invincibility/Attack; Young Senya S3 cleanse/stackable Continuous Healing/CR; Ray S3 cleanse/Immunity/target-HP healing. Other passive/skill portions remain in the queue. |
| Ocean Breeze Luluca | S1 highest-CR ally push; S2 enemy non-attack Focus/CR reaction; S3 cleanse/Defense/Ice Cream. Ice Cream heals 20% max HP after being attacked and is consumed. Full-Focus Special Delivery remains pending. |
| Arunka | Native Attack/no-crit passive with enemy-turn-end barrier CR trigger; S3 70% penetration, ×3.4 damage against Barrier, Extinction and kill cooldown reset. S1 Expose remains pending. |
| Fenris / Frieren | Fenris S1 Speed and S3 Greater Attack, HP-difference damage, team CR; Frieren S3 pre-attack Attack buff, 50% penetration, strip and CR. Their other reactions remain pending. |
| Ludwig / Yufine / Mui | Ludwig S2 buff-duration reduction, Stun, Invincibility and CR; S3 conditional penetration/buff extension. Yufine S2 strip/debuffs and S3 pre-buff/conditional damage/kill extra turn/ready-skill watcher. Mui S2 bleeds/Stun and S3 strip, team Attack and CR per critical target. |
| Ram / Alencia / Senya | Ram S2 native Attack/CR-decrease immunity and S3 Defense Down/Greater Attack. Alencia native Crit Chance plus S3 strip/Defense/CR; Mind's Eye/Trample still pending. Senya native Attack/Crit Resistance/no-crit portion; retaliation/barrier still pending. |
| Basar / Albedo | Basar S2 direct debuffs and S3 strip/Unbuffable/CR setback; Albedo S3 strip/Unbuffable/Defense Down. Unreviewed passive/random/transfer portions remain pending. |
| Yulha / ae-GISELLE | Yulha S3 missing-HP damage, full penetration, kill healing and existing share bypass. ae-GISELLE S1 current-HP damage and highest-ATK ally CR; S2 CR amplification/turn-start cleanse; S3 team-selected Attack grants/kill extra turn. |
| Vivian / Command Model Laika / Schniel / Pavel | Reviewed direct CR selectors and critical bonuses; Pavel S2 pre-attack Attack Up. Their unlisted follow-ups/passives remain pending. |

## Shared mechanics and input semantics

Healing uses max enhancements and effective post-injury maximum HP. Unhealable and Stigma apply normally. Barriers use the stronger current barrier, show a blue meter and remaining shield HP, absorb before Health loss, and expire/dispel as buffs. Invincibility prevents incoming damage. Continuous Healing stacks and recovers 15% max HP per stack at bearer turn start. Perception, Spirit's Blessing and Ice Cream are undispellable buffs, so Cannot Buff prevents new grants; they are not unique effects.

Entered Attack and Critical Chance are final stat-screen totals. Innate bonuses are not added twice: the engine accounts for their contribution before combining Attack Up or suppressing the reviewed passive with Seal. Hidden native Crit Resistance remains a separate modifier. Base presets now retain the source's innate Attack percentage. Reactive extra skills preserve the original turn owner and do not tick the reacting hero's timers. Conditional extra-turn tags are emitted only when the relevant crit/kill condition succeeds.

## Source checks and remaining research

Damage rules follow the maintained e7calc repository at `39070976ce3cd0435cbcf5d430f2711cf0ef0005`; its upstream HEAD was checked on 2026-10-27 and still matches. CeciliaBot's awakened descriptions supply targets, durations, conditions, status definitions, and healing/barrier metadata; e7calc's Roana/Fenris/Violet/etc. numeric branches were checked where it supplies them. Rules are guarded by descriptions and relevant source text. Status icons come from CeciliaBot's asset repository.

- Landy's current CeciliaBot description/values give 25% Attack per stack; maintained e7calc encodes 20%. This conflict needs a patch-specific source before enabling that stack mechanic. Her full-Spirit branch also remains pending.
- Lilibet S2 source text mentions +20% against an unbuffed target, but maintained e7calc currently has no such modifier. Keep the damage branch blocked pending version research.
- Ray S2 source text does not specify its healing amount; do not invent that coefficient.
- Additional damage, detonation, more complex follow-ups, unique effects and source-specific EE/Soulburn execution remain on the generated queue. These are implementation/research items, not requests for the user to restate clear skill descriptions.

Validation: engine tests cover healing/revival, barriers, buff restrictions, fractional resources, conditional damage, injury, native stats, passive gates, event tags and secondary-target counts. Desktop/mobile browser checks cover support targeting, confirmation, status icons, barrier visibility, extra turns and Undo.
