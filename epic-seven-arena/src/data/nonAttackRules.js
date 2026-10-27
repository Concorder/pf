// Reviewed non-attack casts. Descriptions guard declarative effects; no prose is executed.
export const NON_ATTACK_RULES = {
  "c2103": {
  "S3": {
    "description": "Opens the gate of the spirits to revive all dead allies. Dispels all debuffs from all allies before granting immortality for 1 turn, and grants possession to the caster for 3 turns.",
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
    "pending": [
      "Revival HP percentage awaiting verification; dead allies are not revived yet"
    ]
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
