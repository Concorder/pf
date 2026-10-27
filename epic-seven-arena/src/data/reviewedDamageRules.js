// e7calc-sourced numeric rules, guarded against the matching CeciliaBot metadata version.
export const REVIEWED_DAMAGE_RULES = {
  "c2022": {
    "S1": {
      "description": "Attacks the enemy with a staff, before recovering Health of the ally with the lowest Health proportional to the caster\u2019s max Health.",
      "sourceText": "Skill1\natt_rate: 1\n!pow: 1\nHeal strength: 8% self max Health\nHeal strength: 35% self max Health (Soulburn)",
      "rate": 1,
      "pow": 1,
      "targets": 1,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      },
      "healingOnlyScaling": true
    }
  },
  "c1102": {
    "S1": {
      "description": "Attacks the enemy with a noble power, and grants a barrier (proportional to the caster\u2019s max Health) to the ally with the lowest Health for 2 turns.",
      "sourceText": "Skill1\natt_rate: 1\n!pow: 1\nBarrier strength: 10-12.5% self Max Health\n",
      "rate": 1,
      "pow": 1,
      "targets": 1,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      },
      "healingOnlyScaling": true
    }
  },
  "c1138": {
    "S1": {
      "description": "Attacks the enemy, and increases Combat Readiness of the ally with the highest Attack except for the caster by {{variable}}. Damage dealt increases proportional to the target's current Health ratio.",
      "sourceText": "Skill1\natt_rate: 1 (1.7 Soulburn)\n!pow: 1\n0.2% increased damage per 1% target current Health (Same for Soulburn)\n",
      "rate": 1,
      "pow": 1,
      "targets": 1,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      },
      "targetCurrentHpDamage": 0.2
    }
  },
  "c1131": {
    "S3": {
      "description": "Attacks the enemy by unraveling Sphere of Sadism, and when the enemy is defeated, recovers Health of the caster proportional to max Health. When the target is not an Elite or Boss monster, ignores damage share. Penetrates the target's Defense, but cannot trigger a critical hit or a heavy blow. Damage dealt increases proportional to the caster's lost Health.",
      "sourceText": "Skill3\natt_rate: 0.5\n!pow: 1\n0.31 (0.41 with soulburn) flat per 1 hp missing\nHeal strength: 40% Self Max HP",
      "rate": 0.5,
      "pow": 1,
      "targets": 1,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      },
      "selfMissingHpScaling": 0.31,
      "penetration": 1,
      "reviewedPenetration": true
    }
  },
  "c1158": {
    "S3": {
      "description": "After granting increased Attack (Greater) of the caster for 3 turns, attacks the enemy with an arrow of resolution, and increases Combat Readiness of all allies by 30%. When the enemy's max Health is greater than the caster's max Health, damage dealt increases proportionally, up to 70%.",
      "sourceText": "Skill3\natt_rate: 1.3\n!pow: 1\nDamage increase (max 70%): DIFFERENCE_IN_MAX_HP * 0.00005\n14000 (14k) health diff for 70% damage increase",
      "rate": 1.3,
      "pow": 1,
      "targets": 1,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      },
      "hpDifferenceDamage": {
        "ratio": 5e-05,
        "cap": 0.7
      }
    }
  },
  "c1069": {
    "S3": {
      "description": "Attacks all enemies with Nocturne magic, and when an enemy is defeated, extends the caster's buff durations by 1 turn. Penetrates the target's Defense by 30%. When the caster is invincible, penetrates the target's Defense by an additional 30%.",
      "sourceText": "Skill3\natt_rate: 0.9\n!pow: 0.95\n",
      "rate": 0.9,
      "pow": 0.95,
      "targets": 3,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      },
      "penetration": 0.3,
      "casterBuffPenetration": {
        "id": "stic_invincible",
        "bonus": 0.3
      },
      "reviewedPenetration": true
    }
  },
  "c1016": {
    "S3": {
      "description": "After granting increased Attack to the caster for 2 turns, attacks the enemy with a massive blade. When the enemy is defeated, grants an extra turn. When the target has a debuff, increases damage dealt. When this skill is not on cooldown, after an ally except for the caster uses a skill, if the enemy has a debuff, increases Combat Readiness of the caster by 20%.",
      "sourceText": "Skill3\natt_rate: 2\n!pow: 0.95\n50% increased damage if target is debuffed\n",
      "rate": 2,
      "pow": 0.95,
      "targets": 1,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      },
      "damageCondition": {
        "targetStatus": "debuff",
        "multiplier": 1.5
      }
    }
  },
  "c1124": {
    "S3": {
      "description": "Runs up to the enemy to attack. When the enemy is defeated, inflicts extinction and resets cooldown of this skill. Penetrates the target's Defense by 70% and when the target is granted a barrier, increases damage dealt.",
      "sourceText": "Skill3\natt_rate: 0.9\n!pow: 1\n240% increased damage if enemy has barrier\n",
      "rate": 0.9,
      "pow": 1,
      "targets": 1,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      },
      "penetration": 0.7,
      "reviewedPenetration": true,
      "damageCondition": {
        "targetStatus": "barrier",
        "multiplier": 3.4
      }
    }
  },
  "c1074": {
    "S3": {
      "description": "Attacks the enemy by piercing them with a sword before consuming all Focus. Damage dealt increases proportional to the amount of Focus consumed, and when consumed Focus is 5, resets the cooldown of Butterfly Cut. When Butterfly Cut is not on cooldown, increases Evasion by 35%, and when evading, counterattacks with Graceful Cut.",
      "sourceText": "Skill3\natt_rate: 1.5\n!pow: 0.9\n15% increased damage per Focus\n",
      "rate": 1.5,
      "pow": 0.9,
      "targets": 1,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      },
      "focusMultiplier": 0.15,
      "consumesAllFocus": true
    }
  },
  "c1093": {
    "S1": {
      "description": "Attacks the enemy repeatedly, with a {{variable}} chance each to inflict two --bleeding effects-- for 2 turns. A critical hit will reduce the caster's skill cooldowns by 1 turn.",
      "sourceText": "Skill1\natt_rate: 1\n!pow: 1\n2 separate chances to apply a bleed at said %\n",
      "rate": 1,
      "pow": 1,
      "targets": 1,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      }
    },
    "S2": {
      "description": "Attacks the enemy with expert swordsmanship and has a {{variable}} chance each to inflict three --bleeding-- effects for 2 turns. One bleeding effect ignores Effect Resistance. A critical hit will grant an extra turn.",
      "sourceText": "Skill2\natt_rate: 1.2\n!pow: 1\n3 separate chances to apply a bleed at said % (one ignores resistances)\n",
      "rate": 1.2,
      "pow": 1,
      "targets": 1,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      }
    }
  },
  "c1071": {
    "S3": {
      "description": "Attacks all enemies by creating a powerful gust of wind, with a {{variable}} chance to --decrease Defense-- for 2 turns. Increases damage dealt when Razorwind Fan is triggered by Windbreak Fan.",
      "sourceText": "Skill3\natt_rate: 1.05 (1.25 if tirggered by S1)\n!pow: 1\n",
      "rate": 1.05,
      "pow": 1,
      "targets": 3,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      },
      "additionalRate": 1.25
    }
  },
  "c2103": {
    "S1": {
      "description": "Attacks the enemy with a sheath. When this skill is used, if it was not triggered by a Dual Attack and the caster has a buff, uses Nimble Sword instead.\nNimble Sword: After granting increased Attack to the caster for 1 turn, swiftly attacks the enemy, and absorbs some of the damage dealt as Health. Penetrates the target's Defense by 50%. This skill does not trigger a Dual Attack.",
      "sourceText": "Skill1\natt_rate: 1\n!pow: 0.9\n\n\nSkill1 Extra (Nimble Sword)\natt_rate: 1\n!pow: 0.9\n25% Lifesteal\nPenetration 50%",
      "rate": 1,
      "pow": 0.9,
      "targets": 1,
      "celineS1": true,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      }
    }
  },
  "c1006": {
    "S1": {
      "description": "Attacks the enemy with a scythe. When the target has a buff, increases damage dealt by 70%.",
      "sourceText": "Skill1\natt_rate: 1.1\n!pow: 1\n70% increased damage is enemy is buffed\n",
      "rate": 1.1,
      "pow": 1,
      "targets": 1,
      "damageCondition": {
        "targetStatus": "buff",
        "multiplier": 1.7
      },
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      }
    }
  },
  "c1119": {
    "S1": {
      "description": "Attacks the enemy with a longsword. Increases Hit Chance and Critical Hit Chance of this skill by 50%. When the target has a buff, increases damage dealt.",
      "sourceText": "Skill1\natt_rate: 1.1(1.8 soulburn)\n!pow: 1\n30% increased damage if target is buffed\n",
      "rate": 1.1,
      "pow": 1,
      "targets": 1,
      "damageCondition": {
        "targetStatus": "buff",
        "multiplier": 1.3
      },
      "hitChanceBonus": 50,
      "criticalChanceBonus": 50,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      }
    }
  },
  "c1094": {
    "S1": {
      "description": "Attacks all enemies with the power of magic and has a 25% chance to inflict --stun-- for 1 turn. Damage dealt increases when the target has a debuff.",
      "sourceText": "Skill1\natt_rate: 0.7\n!pow: 1\n30% increased damage if target has a debuff\n",
      "rate": 0.7,
      "pow": 1,
      "targets": 3,
      "damageCondition": {
        "targetStatus": "debuff",
        "multiplier": 1.3
      },
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      }
    }
  },
  "c2091": {
    "S1": {
      "description": "Attacks the enemy with a punishing melody. When the target has a debuff, increases damage dealt.",
      "sourceText": "Skill1\natt_rate: 1\n!pow: 0.9\n20% increased damage if target debuffed\n",
      "rate": 1,
      "pow": 0.9,
      "targets": 1,
      "damageCondition": {
        "targetStatus": "debuff",
        "multiplier": 1.2
      },
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      }
    }
  },
  "c1172": {
    "S3": {
      "description": "After granting increased Attack to the caster for 3 turns, attacks all enemies with lightning magic, dispelling all buffs. Increases Combat Readiness of the caster by 50%. Penetrates the target's Defense by 50%.",
      "sourceText": "Skill3\natt_rate: 0.95\n!pow: 1\n50% Penetration\n",
      "rate": 0.95,
      "pow": 1,
      "targets": 3,
      "penetration": 0.5,
      "reviewedPenetration": true,
      "damageSource": {
        "provider": "e7calc",
        "revision": "39070976ce3cd0435cbcf5d430f2711cf0ef0005",
        "url": "https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts"
      }
    }
  }
};
