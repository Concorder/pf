// Reviewed non-attack casts. Descriptions guard declarative effects; no prose is executed.
export const NON_ATTACK_RULES = {

  "c2022": {
    "S2": {
      "description": "Blesses an ally, dispelling two debuffs and recovering Health proportional to the caster\u2019s max Health before increasing Combat Readiness by 30%.",
      "target": "ally",
      "effects": [
        {
          "kind": "cleanse",
          "target": "selected",
          "count": 2
        },
        {
          "kind": "heal",
          "target": "selected",
          "ratio": 0.16,
          "basis": "casterHp",
          "enhance": "healing"
        },
        {
          "kind": "readiness",
          "target": "selected",
          "amount": 30
        }
      ],
      "sourceText": "Skill2\natt_rate: n/a\n!pow: n/a\nHeal strength: 16% self max Health\n"
    },
    "S3": {
      "description": "Through the benediction of a Spirit Lord, revives all dead allies to 30% Health. For allies that are not dead, dispels all debuffs before recovering Health proportional to the caster's max Health. At the start of the first battle, grants Spirit's Blessing to the caster for 3 turns.",
      "target": "team",
      "effects": [
        {
          "kind": "revive",
          "target": "team",
          "fraction": 0.3
        },
        {
          "kind": "cleanse",
          "target": "team",
          "count": "all",
          "onlyInitiallyLiving": true
        },
        {
          "kind": "heal",
          "target": "team",
          "ratio": 0.3,
          "basis": "casterHp",
          "enhance": "healing",
          "onlyInitiallyLiving": true
        }
      ],
      "sourceText": "Skill3\natt_rate: n/a\n!pow: n/a\nHeal strength: 30% self max Health\n"
    }
  },
  "c1090": {
    "S3": {
      "description": "By infusing vitality, dispels all debuffs from all allies and grants immunity for 2 turns before recovering Health proportional to the target\u2019s max Health.",
      "target": "team",
      "effects": [
        {
          "kind": "cleanse",
          "target": "team",
          "count": "all"
        },
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_debuf_impossible",
          "turns": 2
        },
        {
          "kind": "heal",
          "target": "team",
          "ratio": 0.15,
          "basis": "targetHp",
          "enhance": "healing"
        }
      ],
      "sourceText": "Skill3\nHeal strength: 15% Target Max Health, 25% soulburn\n"
    }
  },
  "c1102": {
    "S3": {
      "description": "With the grace of Rekos, recovers the Health of all allies and grants a barrier and revive for 2 turns. Amount recovered and barrier strength increase proportional to the caster\u2019s max Health.",
      "target": "team",
      "effects": [
        {
          "kind": "heal",
          "target": "team",
          "ratio": 0.25,
          "basis": "casterHp",
          "enhance": "healing"
        },
        {
          "kind": "barrier",
          "target": "team",
          "ratio": 0.15,
          "basis": "casterHp",
          "turns": 2,
          "enhance": "barrier"
        },
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_bless",
          "turns": 2
        }
      ],
      "sourceText": "Skill3\nHeal strength: 25% self max Health \nBarrier strength: 15% self Max Health"
    }
  },
  "c1074": {
    "S2": {
      "description": "As preparation for a duel, dispels two debuffs from the caster and grants perception for 3 turns, before recovering 15% Health. Grants an extra turn.",
      "target": "self",
      "effects": [
        {
          "kind": "cleanse",
          "target": "caster",
          "count": 2
        },
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_detection_keep",
          "turns": 3
        },
        {
          "kind": "heal",
          "target": "caster",
          "ratio": 0.15,
          "basis": "casterHp",
          "enhance": "healing"
        }
      ],
      "extraTurn": true
    }
  },
  "c1119": {
    "S2": {
      "description": "Dispels two debuffs from an ally before increasing Combat Readiness of the ally by {{variable}}. Grants increased Attack and increased Hit Chance to the caster for 3 turns. Grants an extra turn.",
      "target": "ally",
      "effects": [
        {
          "kind": "cleanse",
          "target": "selected",
          "count": 2
        },
        {
          "kind": "readiness",
          "target": "selected",
          "amount": {"variable":0}
        },
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_att_up",
          "turns": 3
        },
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_increase_hit",
          "turns": 3
        }
      ],
      "extraTurn": true
    }
  },
  "c1162": {
    "S3": {
      "description": "Stops fighting and takes a break, dispelling all debuffs from all allies and granting continuous healing for 2 turns before increasing Combat Readiness by {{variable}}.",
      "target": "team",
      "effects": [
        {
          "kind": "cleanse",
          "target": "team",
          "count": "all"
        },
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_heal",
          "turns": 2
        },
        {
          "kind": "readiness",
          "target": "team",
          "amount": {"variable":0}
        }
      ]
    }
  },
  "c1177": {
    "S3": {
      "description": "By kindling the light of hope, grants invincibility to all allies for 1 turn and increased Attack for 2 turns.",
      "target": "team",
      "effects": [
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_invincible",
          "turns": 1
        },
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_att_up",
          "turns": 2
        }
      ],
      "allowMissingNonAttackTag": true
    }
  },
  "c5082": {
    "S3": {
      "description": "With quality customer service, dispels two debuffs from all allies and grants increased Defense for 2 turns and an ice cream.",
      "target": "team",
      "effects": [
        {
          "kind": "cleanse",
          "target": "team",
          "count": 2
        },
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_def_up",
          "turns": 2
        },
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_icecream_keep",
          "turns": 2
        }
      ]
    }
  }
,
  "c2103": {
  "S3": {
    "description": "Opens the gate of the spirits to revive all dead allies. Dispels all debuffs from all allies before granting immortality for 1 turn, and grants possession to the caster for 3 turns.",
    "target": "team",
    "effects": [
      {"kind":"revive","target":"team","hp":1},
      {
        "kind": "cleanse",
        "target": "team",
        "count": "all"
      },
      {
        "kind": "buff",
        "target": "team",
        "id": "stic_immortality",
        "turns": 1
      },
      {
        "kind": "buff",
        "target": "caster",
        "id": "stic_possession_keep",
        "turns": 3
      }
    ],
    "pending": []
  }
},
  "c1030": {
    "S2": {
      "description": "Enhances all allies with a drone, granting increased Attack and increased Speed for 3 turns. Grants an extra turn.",
      "target": "team",
      "extraTurn": true,
      "effects": [
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_att_up",
          "turns": 3
        },
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_speed_up",
          "turns": 3
        }
      ]
    }
  },
  "c1088": {
    "S3": {
      "description": "Fully amplifies mana, granting immunity to all allies for 3 turns before granting increased Attack (Greater) to the caster for 3 turns while increasing Attack of all allies except for the caster for 3 turns.",
      "target": "team",
      "effects": [
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_debuf_impossible",
          "turns": 3
        },
        {
          "kind": "buff",
          "target": "caster",
          "id": "stic_att_up2",
          "turns": 3
        },
        {
          "kind": "buff",
          "target": "otherAllies",
          "id": "stic_att_up",
          "turns": 3
        }
      ]
    }
  },
  "c1024": {
    "S2": {
      "description": "Resets skill cooldown of an ally except for the caster and grants increased Attack (Greater) for 2 turns with light energy. Grants an extra turn. This skill is unaffected by cooldown increase and decrease effects.",
      "target": "ally",
      "excludeCaster": true,
      "extraTurn": true,
      "cooldownEffectImmune": true,
      "effects": [
        {
          "kind": "cooldownReset",
          "target": "selected"
        },
        {
          "kind": "buff",
          "target": "selected",
          "id": "stic_att_up2",
          "turns": 2
        }
      ]
    }
  },
  "c1110": {
    "S2": {
      "description": "Encourages an ally, granting increased Attack and increased Critical Hit Damage to the ally for 2 turns before increasing Combat Readiness by {{variable}}.",
      "target": "ally",
      "effects": [
        {
          "kind": "buff",
          "target": "selected",
          "id": "stic_att_up",
          "turns": 2
        },
        {
          "kind": "buff",
          "target": "selected",
          "id": "stic_cridmg_up",
          "turns": 2
        },
        {
          "kind": "readiness",
          "target": "selected",
          "amount": {
            "variable": 0
          }
        }
      ]
    }
  },
  "c1116": {
    "S2": {
      "description": "Grants a blessing to an ally except for the caster, dispelling two debuffs and increasing Attack for 2 turns before increasing Combat Readiness by {{variable}}. Increases Combat Readiness of the caster by 25%.",
      "target": "ally",
      "excludeCaster": true,
      "effects": [
        {
          "kind": "cleanse",
          "target": "selected",
          "count": 2
        },
        {
          "kind": "buff",
          "target": "selected",
          "id": "stic_att_up",
          "turns": 2
        },
        {
          "kind": "readiness",
          "target": "selected",
          "amount": {
            "variable": 0
          }
        },
        {
          "kind": "readiness",
          "target": "caster",
          "amount": 25
        }
      ]
    }
  },
  "c1159": {
    "S2": {
      "description": "Dispels all debuffs from all allies and increases Combat Readiness by {{variable}}, before decreasing skill cooldowns of all allies except for the caster by 1 turn. ",
      "target": "team",
      "effects": [
        {
          "kind": "cleanse",
          "target": "team",
          "count": "all"
        },
        {
          "kind": "readiness",
          "target": "team",
          "amount": {
            "variable": 0
          }
        },
        {
          "kind": "cooldownDecrease",
          "target": "otherAllies",
          "amount": 1
        }
      ]
    }
  },
  "c2053": {
    "S3": {
      "description": "Bastet roars, dispelling all debuffs from all allies and granting immunity for 2 turns before increasing Combat Readiness by {{variable}}.",
      "target": "team",
      "effects": [
        {
          "kind": "cleanse",
          "target": "team",
          "count": "all"
        },
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_debuf_impossible",
          "turns": 2
        },
        {
          "kind": "readiness",
          "target": "team",
          "amount": {
            "variable": 0
          }
        }
      ]
    }
  },
  "c2073": {
    "S3": {
      "description": "By restoring balance that has been destroyed, dispels all debuffs from all allies and grants increased Attack and immunity for 2 turns. Increases Combat Readiness of the caster by 50%. When this skill is not on cooldown, at the start of the turn, decreases debuff durations of the caster by 1 turn.",
      "target": "team",
      "pending": [
        "S3-ready turn-start debuff-duration reduction"
      ],
      "effects": [
        {
          "kind": "cleanse",
          "target": "team",
          "count": "all"
        },
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_att_up",
          "turns": 2
        },
        {
          "kind": "buff",
          "target": "team",
          "id": "stic_debuf_impossible",
          "turns": 2
        },
        {
          "kind": "readiness",
          "target": "caster",
          "amount": 50
        }
      ]
    }
  }
};
