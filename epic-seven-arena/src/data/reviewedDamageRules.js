// e7calc-sourced numeric rules, guarded against the matching CeciliaBot metadata version.
export const REVIEWED_DAMAGE_RULES = {
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
  }
};
