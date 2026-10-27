// Earth 5-star reviews: exact source descriptions guard every rule.
export const EARTH_SKILL_RULES = {
  "c2022": {
    "S1": {
      "description": "Attacks the enemy with a staff, before recovering Health of the ally with the lowest Health proportional to the caster\u2019s max Health.",
      "combatEffects": [
        {
          "kind": "heal",
          "target": "lowestHpAlly",
          "ratio": 0.08,
          "basis": "casterHp",
          "enhance": "healing"
        }
      ],
      "sourceText": "Skill1\natt_rate: 1\n!pow: 1\nHeal strength: 8% self max Health\nHeal strength: 35% self max Health (Soulburn)"
    },
    "S3": {
      "description": "Through the benediction of a Spirit Lord, revives all dead allies to 30% Health. For allies that are not dead, dispels all debuffs before recovering Health proportional to the caster's max Health. At the start of the first battle, grants Spirit's Blessing to the caster for 3 turns.",
      "combatEffects": [],
      "openingEffects": [
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_spirit_keep",
          "turns": 3
        }
      ],
      "sourceText": "Skill3\natt_rate: n/a\n!pow: n/a\nHeal strength: 30% self max Health\n"
    }
  },
  "c1102": {
    "S1": {
      "description": "Attacks the enemy with a noble power, and grants a barrier (proportional to the caster\u2019s max Health) to the ally with the lowest Health for 2 turns.",
      "combatEffects": [
        {
          "kind": "barrier",
          "target": "lowestHpAlly",
          "ratio": 0.1,
          "basis": "casterHp",
          "turns": 2,
          "enhance": "barrier"
        }
      ],
      "sourceText": "Skill1\natt_rate: 1\n!pow: 1\nBarrier strength: 10-12.5% self Max Health\n"
    }
  },
  "c1100": {
    "S3": {
      "description": "Attacks all enemies with Dragon's Might, dispelling all buffs, and grants increased Defense to all allies for 2 turns. Increases Combat Readiness of the caster by 50%. Damage dealt increases proportional to the caster's max Health.",
      "combatEffects": [
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_def_up",
          "turns": 2
        },
        {
          "kind": "readiness",
          "target": "caster",
          "amount": 50
        }
      ],
      "sourceText": "Skill3\natt_rate: 0.5\n!pow: 1\n15% self max Health (0.15 * Health)\n"
    },
    "S2": {
      "description": "Increases Critical Hit Chance by 20%. At the start of the turn, has a {{variable}} chance to grant Mind's Eye to the caster for 1 turn. After using Eradicate, when the caster is granted Mind's Eye, activates Trample as an extra skill.\nTrample: Attacks the enemy by striking from above, and increases Combat Readiness of the caster by 15%. Damage dealt increases proportional to the caster's max Health.",
      "staticPassive": {
        "critChance": 20
      },
      "pending": [
        "Mind\u2019s Eye opening each turn and Trample follow-up"
      ],
      "sourceText": "Skill2 (Trigger Only)\natt_rate: 0.5\n!pow: 1\n11% self max Health (0.11 * Health)\n"
    }
  },
  "c1071": {
    "S2": {
      "description": "Attacks all enemies by waving a fan, before granting immunity to the caster for 1 turn.",
      "combatEffects": [
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_debuf_impossible",
          "turns": 1
        }
      ],
      "sourceText": "Skill2\natt_rate: 1.2\n!pow: 0.95\n"
    },
    "S1": {
      "description": "Attacks the enemy with a fan. Damage dealt increases proportional to the target's max Health. When Focus is 5 or more, consumes all Focus and activates Razorwind Fan.",
      "combatEffects": [],
      "focusFollowUp": "S3",
      "sourceText": "Skill1\natt_rate: 1\n!pow: 0.95\n4% target max Health\n"
    }
  },
  "c1158": {
    "S1": {
      "description": "Attacks the enemy with a magic arrow, and increases Speed for 1 turn.",
      "combatEffects": [
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_speed_up",
          "turns": 1
        }
      ],
      "sourceText": "Skill1\natt_rate: 1.2 (1.9 Soulburn)\n!pow: 1\n"
    },
    "S3": {
      "description": "After granting increased Attack (Greater) of the caster for 3 turns, attacks the enemy with an arrow of resolution, and increases Combat Readiness of all allies by 30%. When the enemy's max Health is greater than the caster's max Health, damage dealt increases proportionally, up to 70%.",
      "combatEffects": [
        {
          "kind": "readiness",
          "target": "team",
          "amount": 30
        }
      ],
      "beforeEffects": [
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_att_up2",
          "turns": 3
        }
      ],
      "sourceText": "Skill3\natt_rate: 1.3\n!pow: 1\nDamage increase (max 70%): DIFFERENCE_IN_MAX_HP * 0.00005\n14000 (14k) health diff for 70% damage increase"
    }
  },
  "c1172": {
    "S3": {
      "description": "After granting increased Attack to the caster for 3 turns, attacks all enemies with lightning magic, dispelling all buffs. Increases Combat Readiness of the caster by 50%. Penetrates the target's Defense by 50%.",
      "combatEffects": [
        {
          "kind": "readiness",
          "target": "caster",
          "amount": 50
        }
      ],
      "beforeEffects": [
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_att_up",
          "turns": 3
        }
      ],
      "sourceText": "Skill3\natt_rate: 0.95\n!pow: 1\n50% Penetration\n"
    }
  },
  "c1080": {
    "S2": {
      "description": "Grants the caster increased Attack for 2 turns, before firing a strong blast of wind at all enemies. Damage dealt increases proportional to the caster's Speed. This skill cannot trigger a counterattack.",
      "combatEffects": [],
      "beforeEffects": [
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_att_up",
          "turns": 2
        }
      ],
      "sourceText": "Skill2\natt_rate: 0.8\n!pow: 1\n0.1125% self Speed (0.001125 * Speed)\n"
    }
  },
  "c1115": {
    "S3": {
      "description": "Attacks the enemy with a gust of wind, --decreasing Defense-- for 2 turns, and grants increased Attack (Greater) to the caster for 2 turns.",
      "combatEffects": [
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_att_up2",
          "turns": 2
        }
      ],
      "sourceText": "Skill3\natt_rate: 1.8\n!pow: 1\n"
    },
    "S2": {
      "description": "Increases Attack by 30%. Reduces the effect of decreased Combat Readiness debuffs inflicted on the caster by {{variable}}.",
      "staticPassive": {
        "attack": 0.3,
        "crDecreaseReductionVariable": 0
      },
      "complete": true,
      "sourceText": "Skill2\n"
    }
  },
  "c1069": {
    "S2": {
      "description": "Attacks the enemy with light, decreasing buff durations by 1 turn before a {{variable}} chance to --stun-- for 1 turn. Grants invincibility to the caster for 1 turn and increases Combat Readiness by 50%.",
      "combatEffects": [
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_invincible",
          "turns": 1
        },
        {
          "kind": "readiness",
          "target": "caster",
          "amount": 50
        }
      ],
      "sourceText": "Skill2\natt_rate: 1.65\n!pow: 1.05\n"
    },
    "S3": {
      "description": "Attacks all enemies with Nocturne magic, and when an enemy is defeated, extends the caster's buff durations by 1 turn. Penetrates the target's Defense by 30%. When the caster is invincible, penetrates the target's Defense by an additional 30%.",
      "combatEffects": [
        {
          "kind": "extendBuffs",
          "target": "caster",
          "amount": 1,
          "when": "kill"
        }
      ],
      "sourceText": "Skill3\natt_rate: 0.9\n!pow: 0.95\n"
    }
  },
  "c1109": {
    "S3": {
      "description": "Fires at all enemies to attack, and increases Combat Readiness of all allies by 25%, before granting a barrier (proportional to Attack) to the caster for 2 turns. When Fighting Spirit is full, consumes all Fighting Spirit to penetrate the target's Defense by 50%. This skill cannot trigger a counterattack.",
      "combatEffects": [
        {
          "kind": "readiness",
          "target": "team",
          "amount": 25
        },
        {
          "kind": "barrier",
          "target": "caster",
          "ratio": 0.8,
          "basis": "casterAtk",
          "turns": 2,
          "enhance": "barrier"
        }
      ],
      "sourceText": "Skill3\natt_rate: 0.9\n!pow: 1\nBarrier strength: 80% caster's Attack\n"
    }
  },
  "c1044": {
    "S3": {
      "description": "Drives monsters forward to attack all enemies and dispels two buffs. Grants increased Attack to all allies for 3 turns, and increases Combat Readiness of the caster by 30% per critical hit.",
      "combatEffects": [
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_att_up",
          "turns": 3
        },
        {
          "kind": "readiness",
          "target": "caster",
          "amount": 30,
          "perCriticalTarget": true
        }
      ],
      "sourceText": "Skill3\natt_rate: 1\n!pow: 0.95\n"
    }
  },
  "c1119": {
    "S3": {
      "description": "Attacks the enemy, inflicting up to 35% injuries, before granting invincibility to the caster for 1 turn. Increases Critical Hit Chance and Hit Chance of this skill by 50%.",
      "combatEffects": [
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_invincible",
          "turns": 1
        }
      ],
      "injury": 0.35,
      "hitChanceBonus": 50,
      "criticalChanceBonus": 50,
      "sourceText": "Skill3\natt_rate: 1.9\n!pow: 1\n"
    }
  },
  "c1131": {
    "S3": {
      "description": "Attacks the enemy by unraveling Sphere of Sadism, and when the enemy is defeated, recovers Health of the caster proportional to max Health. When the target is not an Elite or Boss monster, ignores damage share. Penetrates the target's Defense, but cannot trigger a critical hit or a heavy blow. Damage dealt increases proportional to the caster's lost Health.",
      "combatEffects": [
        {
          "kind": "heal",
          "target": "caster",
          "ratio": 0.4,
          "basis": "casterHp",
          "enhance": "healing",
          "when": "kill"
        }
      ],
      "sourceText": "Skill3\natt_rate: 0.5\n!pow: 1\n0.31 (0.41 with soulburn) flat per 1 hp missing\nHeal strength: 40% Self Max HP"
    }
  },
  "c1016": {
    "S3": {
      "description": "After granting increased Attack to the caster for 2 turns, attacks the enemy with a massive blade. When the enemy is defeated, grants an extra turn. When the target has a debuff, increases damage dealt. When this skill is not on cooldown, after an ally except for the caster uses a skill, if the enemy has a debuff, increases Combat Readiness of the caster by 20%.",
      "combatEffects": [],
      "beforeEffects": [
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_att_up",
          "turns": 2
        }
      ],
      "extraTurnOnKill": true,
      "sourceText": "Skill3\natt_rate: 2\n!pow: 0.95\n50% increased damage if target is debuffed\n"
    }
  },
  "c1124": {
    "S3": {
      "description": "Runs up to the enemy to attack. When the enemy is defeated, inflicts extinction and resets cooldown of this skill. Penetrates the target's Defense by 70% and when the target is granted a barrier, increases damage dealt.",
      "combatEffects": [],
      "cooldownResetOnKill": true,
      "inflictsExtinction": true,
      "sourceText": "Skill3\natt_rate: 0.9\n!pow: 1\n240% increased damage if enemy has barrier\n"
    },
    "S2": {
      "description": "Attack increases by 30%. When attacking, cannot trigger a critical hit. At the end of an enemy's turn, when the target is granted a barrier, increases Combat Readiness of the caster by {{variable}}.",
      "staticPassive": {
        "attack": 0.3,
        "cannotCrit": true
      },
      "pending": [],
      "complete": true,
      "sourceText": "Skill2\n"
    }
  },
  "c1095": {
    "S2": {
      "description": "Attacks the enemy mercilessly,\u00a0with a {{variable}} chance to dispel all buffs. A critical hit will grant an extra turn.",
      "combatEffects": [],
      "extraTurnOnCritical": true,
      "sourceText": "Skill2\natt_rate: 1.2\n!pow: 1\n20% increased damage if target has no buffs\n"
    }
  },
  "c1138": {
    "S3": {
      "description": "Attacks the enemy with light, before increasing Attack of the caster and the ally with the highest Attack except for the caster for 2 turns. When the enemy is not an Elite or Boss monster, damage sharing effects are ignored. When the enemy is defeated, grants an extra turn to the caster.",
      "combatEffects": [
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_att_up",
          "turns": 2
        },
        {
          "kind": "buff",
          "target": "highestAttackAlly",
          "id": "stic_att_up",
          "turns": 2,
          "excludeCaster": true
        }
      ],
      "extraTurnOnKill": true,
      "sourceText": "Skill3\natt_rate: 2\n!pow: 1\n"
    },
    "S1": {
      "description": "Attacks the enemy, and increases Combat Readiness of the ally with the highest Attack except for the caster by {{variable}}. Damage dealt increases proportional to the target's current Health ratio.",
      "combatEffects": [
        {
          "kind": "readiness",
          "target": "highestAttackAlly",
          "amount": 15,
          "excludeCaster": true
        }
      ],
      "sourceText": "Skill1\natt_rate: 1 (1.7 Soulburn)\n!pow: 1\n0.2% increased damage per 1% target current Health (Same for Soulburn)\n"
    },
    "S2": {
      "description": "Amplifies the effect of Combat Readiness increases the caster receives by 50%. At the start of the turn, has a {{variable}} chance to dispel one debuff.",
      "staticPassive": {
        "crIncreaseMultiplier": 1.5
      },
      "turnStartEffects": [
        {
          "kind": "cleanse",
          "target": "caster",
          "count": 1
        }
      ],
      "complete": true,
      "sourceText": "Skill2\n"
    }
  },
  "c1088": {
    "S1": {
      "description": "Smashes the enemy with a rock, increasing the caster's Combat Readiness by {{variable}}. A critical hit will increase the caster's Combat Readiness by an additional 10%.",
      "combatEffects": [
        {
          "kind": "readiness",
          "target": "caster",
          "amount": 15
        },
        {
          "kind": "readiness",
          "target": "caster",
          "amount": 10,
          "when": "critical"
        }
      ],
      "sourceText": "Skill1\natt_rate: 1.2\n!pow: 1\n"
    }
  },
  "c1099": {
    "S1": {
      "description": "Attacks the enemy, increasing Combat Readiness of the caster and a random ally except for the caster by {{variable}}.",
      "combatEffects": [
        {
          "kind": "readiness",
          "target": "caster",
          "amount": 15
        },
        {
          "kind": "readiness",
          "target": "randomAlly",
          "amount": 15,
          "excludeCaster": true
        }
      ],
      "sourceText": "Skill1\natt_rate: 1\n!pow: 1\n"
    }
  },
  "c1060": {
    "S1": {
      "description": "Attacks the enemy, and increases Combat Readiness of the caster and the ally with the highest Attack except for the caster by {{variable}}.",
      "combatEffects": [
        {
          "kind": "readiness",
          "target": "caster",
          "amount": 15
        },
        {
          "kind": "readiness",
          "target": "highestAttackAlly",
          "amount": 15,
          "excludeCaster": true
        }
      ],
      "sourceText": "Skill1\natt_rate: 1\n!pow: 1\n"
    }
  },
  "c5082": {
    "S1": {
      "description": "Attacks the enemy with overflowing energy, and increases Combat Readiness of the ally with the highest Combat Readiness except the caster by {{variable}}",
      "combatEffects": [
        {
          "kind": "readiness",
          "target": "highestCRAlly",
          "amount": 15,
          "excludeCaster": true
        }
      ],
      "sourceText": "Skill1\natt_rate: 1\n!pow: 1\n"
    }
  },
  "c1106": {
    "S2": {
      "description": "Increases Attack by 30% and Critical Hit Resistance by {{variable}}. When attacking, cannot trigger a critical hit or a heavy blow. When attacked, if the caster suffers a non-critical hit, inflicts damage on the attacker proportional to the caster's Attack, before activating Grace of the Battlefield.\nGrace of the Battlefield: Grants a barrier (proportional to the caster\u2019s Attack) to all allies for 2 turns, and grants increased Speed of the caster for 2 turns.",
      "staticPassive": {
        "attack": 0.3,
        "critResistance": 50,
        "cannotCrit": true
      },
      "pending": [
        "Non-critical-hit retaliation and Grace of the Battlefield"
      ],
      "sourceText": "Skill2\nBarrier Strength: 25% of Self Attack\n"
    }
  },
  "c1093": {
    "S1": {
      "description": "Attacks the enemy repeatedly, with a {{variable}} chance each to inflict two --bleeding effects-- for 2 turns. A critical hit will reduce the caster's skill cooldowns by 1 turn.",
      "combatEffects": [
        {
          "kind": "cooldownDecrease",
          "target": "caster",
          "amount": 1,
          "when": "critical"
        }
      ],
      "sourceText": "Skill1\natt_rate: 1\n!pow: 1\n2 separate chances to apply a bleed at said %\n"
    },
    "S2": {
      "description": "Attacks the enemy with expert swordsmanship and has a {{variable}} chance each to inflict three --bleeding-- effects for 2 turns. One bleeding effect ignores Effect Resistance. A critical hit will grant an extra turn.",
      "combatEffects": [],
      "extraTurnOnCritical": true,
      "sourceText": "Skill2\natt_rate: 1.2\n!pow: 1\n3 separate chances to apply a bleed at said % (one ignores resistances)\n"
    }
  }
};
