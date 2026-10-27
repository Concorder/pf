// Explicit normal/Soulburn coefficients cross-checked against maintained e7calc.
// Source revision 39070976ce3cd0435cbcf5d430f2711cf0ef0005; no upstream expressions are executed.
export const SOULBURN_DAMAGE_RULES = {
  "c1010": {
    "S2": {
      "description": "Attacks the enemy repeatedly, before increasing Combat Readiness of the caster by 50%. When the target has a debuff, increases damage dealt.",
      "sourceText": "Skill2\natt_rate: 1.5 (2 soulburn)\n!pow: 0.95\n30% increased damage if target is debuffed\n",
      "baseRate": 1.5,
      "rate": 2.0,
      "pow": 0.95,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1119": {
    "S1": {
      "description": "Attacks the enemy with a longsword. Increases Hit Chance and Critical Hit Chance of this skill by 50%. When the target has a buff, increases damage dealt.",
      "sourceText": "Skill1\natt_rate: 1.1(1.8 soulburn)\n!pow: 1\n30% increased damage if target is buffed\n",
      "baseRate": 1.1,
      "rate": 1.8,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1088": {
    "S2": {
      "description": "Attacks all enemies with a thunderstorm. When an enemy is defeated, activates Thunder God's Cry once more. Each subsequent Thunder God's Cry activated this way deals decreased damage, and can be activated up to 3 times.",
      "sourceText": "Skill2\natt_rate: 1.05(1.3 soulburn)\n!pow: 0.9\nfirst trigger on kill is 0.55 att_rate, second trigger is 0.3 att_rate\nthese get mola bonus too, but NOT soulburn",
      "baseRate": 1.05,
      "rate": 1.3,
      "pow": 0.9,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1166": {
    "S2": {
      "description": "Attacks all enemies by infiltrating deep into enemy lines, and grants counterattack to the caster for 3 turns.",
      "sourceText": "Skill2\natt_rate: 1.2 (1.45 Soulburn)\n!pow: 1\n",
      "baseRate": 1.2,
      "rate": 1.45,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1007": {
    "S3": {
      "description": "Attacks all enemies with a swordstorm, dealing damage proportional to the caster's Speed.",
      "sourceText": "Skill3\natt_rate: 0.85 (1.1 soulburn)\n!pow: 1\n0.1125% self Speed  (0.001125 * Speed)\n",
      "baseRate": 0.85,
      "rate": 1.1,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c2023": {
    "S1": {
      "description": "Attacks the enemy with a sword, inflicting up to 10% injuries, before granting a barrier (proportional to the caster\u2019s max Health) to the caster for 1 turn. When triggered as a counterattack, changes into an attack that targets all enemies.",
      "sourceText": "Skill1\natt_rate: 1 (1.7 Soulburn)\n!pow: 1\nBarrier Strength: 12% of self Max Health\n\n\nSkill1(AoE Proc)\natt_rate: 1\n!pow: 1\nBarrier Strength: 12% of self Max Health\n",
      "baseRate": 1.0,
      "rate": 1.7,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c2065": {
    "S3": {
      "description": "Attacks all enemies, with a {{variable}} chance each to make them --unable to be buffed-- for 2 turns and inflict --silence-- for 1 turn. Damage dealt increases proportional to the amount of the caster's lost Health.",
      "sourceText": "Skill3\natt_rate: 1 (1.25 Soulburn)\n!pow: 1.05\n0.50% increased damage per 1% self Health missing\n",
      "baseRate": 1.0,
      "rate": 1.25,
      "pow": 1.05,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3002": {
    "S3": {
      "description": "Jumps towards the enemy and attacks them, dispelling all buffs and absorbing all damage as Health. Damage dealt increases proportional to the caster's max Health.\n",
      "sourceText": "Skill3\natt_rate: 1.5(2.3 soulburn)\n!pow: 0.95\n5% self max Health (0.05 * Health)\n",
      "baseRate": 1.5,
      "rate": 2.3,
      "pow": 0.95,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3152": {
    "S3": {
      "description": "Attacks the enemy with full power, and increases Defense of the caster for 2 turns. When the target is inflicted with --provoke-- or --redirected provoke--, increases damage dealt.",
      "sourceText": "Skill3\natt_rate: 1.5 (1.8 Soulburn)\n!pow: 0.9\n50% increased damage if target provoked\n",
      "baseRate": 1.5,
      "rate": 1.8,
      "pow": 0.9,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1040": {
    "S2": {
      "description": "Attacks the enemy, with a {{variable}} chance to --decrease Attack-- for 2 turns, and when the enemy is defeated, resets skill cooldowns. Grants increased Attack to the caster for 2 turns and absorbs some of the damage dealt as Health.",
      "sourceText": "Skill2\natt_rate: 1.7 (2.2 soulburn)\n!pow: 1.05\n30% of damage as healing\n",
      "baseRate": 1.7,
      "rate": 2.2,
      "pow": 1.05,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1176": {
    "S1": {
      "description": "Attacks the enemy with a sword, and absorbs some of the damage dealt as Health. Damage dealt increases proportional to the caster's max Health.",
      "sourceText": "Skill1\natt_rate: 0.6 (1.3 soulburn)\n!pow: 1\nHealth scaling: 12% caster's max Health, Lifesteal: 30% of the damage dealt\n",
      "baseRate": 0.6,
      "rate": 1.3,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c4144": {
    "S3": {
      "description": "Attacks the enemy with a powerful blow and grants invincibility to all allies except for the caster for 1 turn. When the enemy is defeated, inflicts extinction. Penetrates the target's Defense by 50%.",
      "sourceText": "Skill3\natt_rate: 1.2 (1.65 soulburn)\n!pow: 1\nPenetration: 50%\nIncreased 20% dmg on dark elemental targets",
      "baseRate": 1.2,
      "rate": 1.65,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3075": {
    "S3": {
      "description": "Attacks with magic, with a {{variable}} chance to --decrease Defense-- for 2 turns, and increases Combat Readiness of all allies by 20%.",
      "sourceText": "Skill3\natt_rate: 1.8(2.7 soulburn)\n!pow: 1\n",
      "baseRate": 1.8,
      "rate": 2.7,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3160": {
    "S3": {
      "description": "Attacks the enemy relentlessly, with a {{variable}} chance to inflict --target-- and --decreased Speed-- for 2 turns. When granted promotion, damage dealt increases proportional to the target's max Health.",
      "sourceText": "Skill3\natt_rate: 1.5 (1.8 Soulburn)\n!pow: 1\n3% target max Health\n",
      "baseRate": 1.5,
      "rate": 1.8,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1035": {
    "S3": {
      "description": "Attacks all enemies with a powerful ground pound, and has a 50% chance to inflict --stun-- for 1 turn. When the target\u2019s Health is 30% or less, increases effect chance by 50%. Damage dealt increases proportional to the caster's max Health.",
      "sourceText": "Skill3\natt_rate: 0.8(1.05 soulburn)\n!pow: 1\n10% self max Health (0.10 * Health)\n",
      "baseRate": 0.8,
      "rate": 1.05,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3125": {
    "S1": {
      "description": "Attacks the enemy before increasing Attack of the caster by 15%. When an enemy is defeated, increases Combat Readiness of the caster by 75%. Increased Attack effect can stack up to 3 times.",
      "sourceText": "Skill1\natt_rate: 1 (1.6 soulburn)\n!pow: 1\n",
      "baseRate": 1.0,
      "rate": 1.6,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c2072": {
    "S3": {
      "description": "Calls in drones to attack all enemies, with a {{variable}} chance each to decrease buff durations by 1 turn before decreasing Combat Readiness by 30%. Grants increased Attack to all allies for 2 turns. When the target is granted a barrier, ignores Effect Resistance.",
      "sourceText": "Skill3\natt_rate: 1.2 (1.45 soulburn)\n!pow: 1.1\n",
      "baseRate": 1.2,
      "rate": 1.45,
      "pow": 1.1,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3132": {
    "S3": {
      "description": "Attacks all enemies with a sword, with a {{variable}} chance to --decrease Defense-- for 2 turns. Increases Attack of the caster for 2 turns.",
      "sourceText": "Skill3\natt_rate: 1 (1.25 soulburn)\n!pow: 1.1\n",
      "baseRate": 1.0,
      "rate": 1.25,
      "pow": 1.1,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3072": {
    "S3": {
      "description": "Attacks by absorbing the enemy's life force. Some of the damage dealt is absorbed to heal all allies. When the enemy is defeated, grants revive for 2 turns to the ally with the lowest Health.",
      "sourceText": "Skill3\natt_rate: 1.5(2.2 soulburn)\n!pow: 1\n15% of damage gained as life\n",
      "baseRate": 1.5,
      "rate": 2.2,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3014": {
    "S3": {
      "description": "Ambushes the target, --silencing-- them for 2 turns. Damage dealt increases proportional to the caster's Speed.",
      "sourceText": "Skill3\natt_rate: 1.8 (2.5 soulburn)\n!pow: 0.85\n0.15% self Speed (0.0015 * Speed)\n",
      "baseRate": 1.8,
      "rate": 2.5,
      "pow": 0.85,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c2047": {
    "S1": {
      "description": "Attacks the enemy with a flurry of strikes, with a {{variable}} chance to inflict --provoke-- for 1 turn. A successful attack always results in a critical hit.",
      "sourceText": "Skill1\natt_rate: 1 (1.7 soulburn)\n!pow: 0.95\n",
      "baseRate": 1.0,
      "rate": 1.7,
      "pow": 0.95,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3092": {
    "S3": {
      "description": "Attacks all enemies with a powerful storm, decreasing Combat Readiness by 20%, before increasing Attack of the caster for 2 turns. Damage dealt increases proportional to the amount of the enemy's lost Health.",
      "sourceText": "Skill3\natt_rate: 1 (1.2 soulburn)\n!pow: 1\ngains 0.2% damage per 1% enemy Health missing\n",
      "baseRate": 1.0,
      "rate": 1.2,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c6011": {
    "S1": {
      "description": "Attacks the enemy with a sword, and increases Combat Readiness of the caster by {{variable}}. Damage dealt increases proportional to the caster's Speed.",
      "sourceText": "Skill1\natt_rate: 0.9 (1.5 Soulburn)\n!pow: 1\n0.075% self Speed (0.00075 * Speed)\n",
      "baseRate": 0.9,
      "rate": 1.5,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1011": {
    "S3": {
      "description": "Attacks the enemy by slashing at lightning speed. A critical hit will increase damage dealt.",
      "sourceText": "Skill3\natt_rate: 1.6 (2.3 soulburn)\n!pow: 0.85\n50% increase to crit damage multiplier\n",
      "baseRate": 1.6,
      "rate": 2.3,
      "pow": 0.85,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3131": {
    "S3": {
      "description": "Attacks the enemy, --decreasing Speed-- for 2 turns before increasing Attack of the caster for 2 turns. When the caster is enraged, ignores Effect Resistance.",
      "sourceText": "Skill3\natt_rate: 1.5 (2.2 soulburn)\n!pow: 1\n",
      "baseRate": 1.5,
      "rate": 2.2,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3102": {
    "S3": {
      "description": "Attacks all enemies with powerful explosives, with a {{variable}} chance to dispel one buff, before a 75% chance to --decrease hit Chance-- for 2 turns. Grants the caster skill nullifier once.",
      "sourceText": "Skill3\natt_rate: 0.9(1.15 soulburn)\n!pow: 1\n",
      "baseRate": 0.9,
      "rate": 1.15,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1039": {
    "S2": {
      "description": "Attacks the enemy with a scythe, inflicting --unhealable-- and --vampiric touch-- for 2 turns, and recovers Health of all allies proportional to damage dealt.",
      "sourceText": "Skill2\natt_rate: 1.5 (2 soulburn)\n!pow: 1\n27% of damage as healing\n",
      "baseRate": 1.5,
      "rate": 2.0,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3024": {
    "S3": {
      "description": "Attacks with an axe, --stunning-- for 1 turn and\u00a0--decreasing\u00a0Defense--\u00a0for\u00a02 turns.",
      "sourceText": "Skill3\natt_rate: 2.2(2.9 soulburn) was 1.7(2.4 soulburn)\n!pow: 0.95\n30% increased damage if target is bleeding\n",
      "baseRate": 2.2,
      "rate": 2.9,
      "pow": 0.95,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3074": {
    "S3": {
      "description": "Attacks all enemies with magic, with a {{variable}} chance to transfer all debuffs inflicted on the caster, and dispels all debuffs from the caster.",
      "sourceText": "Skill3\natt_rate: 0.7(0.95 soulburn)\n!pow: 1\n^ in game tooltip scaling is wrong, not me",
      "baseRate": 0.7,
      "rate": 0.95,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c2086": {
    "S1": {
      "description": "Cuts the enemy, with a {{variable}} chance to --restrict-- for 1 turn. Has a {{variable}} chance to --restrict-- for 2 turns when the target is a Light elemental enemy.",
      "sourceText": "Skill1\natt_rate: 1.1 (1.8 Soulburn)\n!pow: 1\n",
      "baseRate": 1.1,
      "rate": 1.8,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3103": {
    "S2": {
      "description": "Fires a missile at the enemy, and when the enemy is defeated, inflicts extinction and grants torrent to the caster. Increases Hit Chance of this skill by 50%.",
      "sourceText": "Skill2\natt_rate: 1.5(2.2 soulburn)\n!pow: 0.9\n",
      "baseRate": 1.5,
      "rate": 2.2,
      "pow": 0.9,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1087": {
    "S3": {
      "description": "Attacks the enemy with a fatal shot, with a {{variable}} chance to --decrease Defense-- for 2 turns.",
      "sourceText": "Skill3\natt_rate: 1.65(1.95 soulburn)\n!pow: 1\n",
      "baseRate": 1.65,
      "rate": 1.95,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3026": {
    "S3": {
      "description": "Dashes towards the enemy to attack, and --decreases Defense-- for 2 turns. A critical hit will grant immunity to the caster for 2 turns. Damage dealt increases proportional to the target's max Health.\u00a0",
      "sourceText": "Skill3\natt_rate: 1.6(2.3 soulburn)\n!pow: 0.9\n4% enemy max Health (0.04 * Health)\n",
      "baseRate": 1.6,
      "rate": 2.3,
      "pow": 0.9,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1158": {
    "S1": {
      "description": "Attacks the enemy with a magic arrow, and increases Speed for 1 turn.",
      "sourceText": "Skill1\natt_rate: 1.2 (1.9 Soulburn)\n!pow: 1\n",
      "baseRate": 1.2,
      "rate": 1.9,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1108": {
    "S2": {
      "description": "Attacks the enemy repeatedly, and grants immunity to the caster for 1 turn. When the enemy's max Health is greater than the caster's max Health, increases Combat Readiness of the caster proportionally, up to 30%.",
      "sourceText": "Skill2\natt_rate: 1.4 (2.0 soulburn)\n!pow: 1\n0.49% combat readiness per 1% self health under enemy current health\n",
      "baseRate": 1.4,
      "rate": 2.0,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1036": {
    "S3": {
      "description": "Attacks all enemies with a swordstorm, decreasing their Combat Readiness by {{variable}}, before a 75% chance to --provoke-- for 1 turn. Damage dealt increases proportional to the caster's Defense.",
      "sourceText": "Skill3\natt_rate: 0.5(0.75 soulburn)\n!pow: 0.95\n60% self Defense (0.6 * Defense)\n",
      "baseRate": 0.5,
      "rate": 0.75,
      "pow": 0.95,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c2080": {
    "S3": {
      "description": "Attacks the enemy with a pistol. When the target is not an Elite or Boss monster, ignores damage share. When the caster's Attack is greater than the target's Attack, penetrates Defense proportionally, up to 70%.",
      "sourceText": "Skill3\natt_rate: 0.85 (1.2 Soulburn)\n!pow: 1\nPenetration up to 70% = DIFFERENCE_IN_ATK * 0.000117\nmaybe 5983 atk over to have max pen?",
      "baseRate": 0.85,
      "rate": 1.2,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1028": {
    "S3": {
      "description": "Attacks all enemies by spinning before inflicting two --bleeding-- effects for 2 turns and a 70% chance to inflict --decreased Defense-- for 2 turns. When an enemy is defeated, resets skill cooldowns. When the caster is granted rage, increases damage dealt.",
      "sourceText": "Skill3\natt_rate: 0.85 (1.1 soulburn)\n!pow: 1\n20% increased damage when Enraged\n\n\n",
      "baseRate": 0.85,
      "rate": 1.1,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c2027": {
    "S3": {
      "description": "Attacks all enemies after descending, increasing Attack of all allies for 2 turns before increasing Combat Readiness by 20%. Increases Evasion of the caster for 3 turns. This skill cannot trigger a counterattack.",
      "sourceText": "Skill3\natt_rate: 1 (1.25 soulburn)\n!pow: 1\n",
      "baseRate": 1.0,
      "rate": 1.25,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1014": {
    "S3": {
      "description": "Attacks the enemy by slashing at them with daggers, and when the target is defeated, grants an extra turn. When the caster is granted increased Speed, attacks using an elemental advantage. Damage dealt increases proportional to the caster's Speed.",
      "sourceText": "Skill3\natt_rate: 1.6 (2.2 soulburn)\n!pow: 1\n0.21% self Speed (0.0021 * Speed)\n",
      "baseRate": 1.6,
      "rate": 2.2,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1049": {
    "S3": {
      "description": "Soars into the air and attacks the enemy, --stunning-- for 1 turn. When the enemy is inflicted with --magic nail--, ignores Effect Resistance.",
      "sourceText": "Skill3\natt_rate: 1.8(3.3 soulburn)\n!pow: 0.8\nWhen the enemy is inflicted with magic nail, ignores Effect Resistance.\n",
      "baseRate": 1.8,
      "rate": 3.3,
      "pow": 0.8,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c4001": {
    "S3": {
      "description": "Attacks the enemy in the name of Chaos, with a {{variable}} chance to activate Heavy Strike when the enemy is buffed. Damage dealt increases proportional to the caster's lost Health. Recovers Health proportional to damage dealt.",
      "sourceText": "Skill3\natt_rate: 1.5(2.2 soulburn)\n!pow: 0.85\n0.5% increased damage per 1% self Health missing\n",
      "baseRate": 1.5,
      "rate": 2.2,
      "pow": 0.85,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1079": {
    "S3": {
      "description": "Attacks the enemy with a blazing inferno. Penetrates the target's Defense by 50%.",
      "sourceText": "Skill3\natt_rate: 1.15(1.65 soulburn)\n!pow: 0.9\n",
      "baseRate": 1.15,
      "rate": 1.65,
      "pow": 0.9,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1103": {
    "S3": {
      "description": "Attacks the enemy repeatedly, and absorbs some of the damage dealt as Health. Grants increased Evasion and a barrier (proportional to Attack) to the caster for 2 turns. When the enemy is not an Elite or Boss monster, ignores damage sharing.",
      "sourceText": "Skill3\natt_rate: 1.8(2.5 soulburn)\n!pow: 1\nHeals for 20% of damage done\nHeal Strength: 50% Self Attack",
      "baseRate": 1.8,
      "rate": 2.5,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3064": {
    "S2": {
      "description": "Shoots a volley of arrows at all enemies, with an 85% chance to decrease Combat Readiness by 20%. When the caster's Health is 80% or more, cooldown does not occur.",
      "sourceText": "Skill2\natt_rate: 1 (1.25 soulburn)\n!pow: 0.9\n",
      "baseRate": 1.0,
      "rate": 1.25,
      "pow": 0.9,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3001": {
    "S3": {
      "description": "Strikes indiscriminately at the enemy, dealing damage proportional to the caster's lost Health, and recovering Health proportional to the damage dealt.",
      "sourceText": "Skill3\natt_rate: 1.5(2.2 soulburn)\n!pow: 0.85\n0.5% increased damage per 1% self Health missing\n",
      "baseRate": 1.5,
      "rate": 2.2,
      "pow": 0.85,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c2011": {
    "S3": {
      "description": "Sacrifices 20% of the caster\u2019s current Health to attack all enemies, and grants increased Attack to the caster for 2 turns. When the target is defeated, grants an extra turn. This skill cannot trigger a counterattack.",
      "sourceText": "Skill3\natt_rate: 1.2 (1.45 soulburn)\n!pow: 0.95\n",
      "baseRate": 1.2,
      "rate": 1.45,
      "pow": 0.95,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1146": {
    "S1": {
      "description": "Cuts the enemy to attack. When the caster is granted Multilayer Barrier, increases damage dealt.",
      "sourceText": "Skill1\natt_rate: 1 (1.7 Soulburn)\n!pow: 1\n30% Damage increase if caster has Multilayer Barrier\n",
      "baseRate": 1.0,
      "rate": 1.7,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1093": {
    "S3": {
      "description": "Delivers a deadly blow and detonates any --bleeding-- effects inflicted on the target at the end of the turn. A critical hit will increase Combat Readiness of all allies by {{variable}}.",
      "sourceText": "Skill3\natt_rate: 1.6(1.85 soulburn)\n!pow: 1\nafter initial damage, explosion damage is total remaining bleed damage\n30% increased damage on bleed portion\n\nexplosion cannot get bonus from critical hit damage\nDetonation multi: 1.3",
      "baseRate": 1.6,
      "rate": 1.85,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c2033": {
    "S3": {
      "description": "Attacks the enemy by moving silently, inflicting --stun-- for 1 turn. When the enemy is defeated, inflicts --silence-- on all enemies for 1 turn. Damage dealt increases proportional to the caster's Speed.",
      "sourceText": "Skill3\natt_rate: 1.5 (3 soulburn)\n!pow: 0.8\n0.1125% self Speed (0.001125 * Speed)\n",
      "baseRate": 1.5,
      "rate": 3.0,
      "pow": 0.8,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c2014": {
    "S3": {
      "description": "Attacks the enemy with a powerful ground pound, inflicting --silence-- for 1 turn and decreasing Combat Readiness by 50%, before granting increased Evasion to the caster for 2 turns. Damage dealt increases proportional to the caster and enemy's Speed. Inflicts 20 Soul Removal on the enemy.",
      "sourceText": "Skill3\natt_rate: 1.5 (2 soulburn)\n!pow: 0.95\n0.10% self Speed (0.001 * Speed)\n0.30% target Speed (0.003 * Speed)",
      "baseRate": 1.5,
      "rate": 2.0,
      "pow": 0.95,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c5128": {
    "S3": {
      "description": "Attacks all enemies with a water scooter, and increases Combat Readiness of the ally in the back row by 50%. Grants vigor to the caster for 2 turns.",
      "sourceText": "Skill3\natt_rate: 1.1 (1.35 Soulburn)\n!pow: 1\n",
      "baseRate": 1.1,
      "rate": 1.35,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3158": {
    "S3": {
      "description": "Slash the enemy consecutively to attack. Cannot trigger a critical hit. Penetrates the target's Defense by 30%, and when the caster's Health is 30% or less, penetrates by 70%. When the caster is immortal, grants an extra turn.",
      "sourceText": "Skill3\natt_rate: 1.1 (1.5 Soulburn)\n!pow: 0.95\n",
      "baseRate": 1.1,
      "rate": 1.5,
      "pow": 0.95,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c3093": {
    "S3": {
      "description": "Punches the enemy, with a {{variable}} chance to --stun-- for 2 turns.",
      "sourceText": "Skill3\natt_rate: 1.5 (1.8 soulburn)\n!pow: 1\n",
      "baseRate": 1.5,
      "rate": 1.8,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  },
  "c1138": {
    "S1": {
      "description": "Attacks the enemy, and increases Combat Readiness of the ally with the highest Attack except for the caster by {{variable}}. Damage dealt increases proportional to the target's current Health ratio.",
      "sourceText": "Skill1\natt_rate: 1 (1.7 Soulburn)\n!pow: 1\n0.2% increased damage per 1% target current Health (Same for Soulburn)\n",
      "baseRate": 1.0,
      "rate": 1.7,
      "pow": 1.0,
      "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005"
    }
  }
};
