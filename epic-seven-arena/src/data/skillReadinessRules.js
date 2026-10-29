// Reviewed readiness effects guarded by exact source descriptions.
export const SKILL_CR_RULES = {
  "c1053": {
    "S3": {
      "description": "Attacks all enemies with sand magic, dispelling all buffs and making them --unable to be buffed-- for 2 turns, before decreasing Combat Readiness by 30%.",
      "effects": [
        {
          "target": "enemies",
          "amount": -30
        }
      ]
    }
  },
  "c1043": {
    "S3": {
      "description": "Shoots a powerful gravity sphere to attack all enemies, dispelling all buffs before inflicting --restrict-- and two --poison-- effects for 2 turns. Increases Combat Readiness of the caster by 50%.",
      "effects": [
        {
          "amount": 50,
          "target": "caster"
        }
      ]
    }
  },
  "c1132": {
    "S3": {
      "description": "Attacks all enemies, decreasing buff durations by 2 turn before inflicting --decreased Speed-- and two --venom-- effects for 2 turns. Increases Combat Readiness of the caster by 50%.",
      "effects": [
        {
          "amount": 50,
          "target": "caster"
        }
      ]
    }
  },
  "c1046": {
    "S2": {
      "description": "Inflicts resource reduction on all enemies by 60% before attacking, dispelling all buffs and inflicting --bind-- for 2 turns. For every target, increases Combat Readiness of the caster by 25%.",
      "effects": [
        {
          "amount": 25,
          "target": "caster",
          "perTarget": true
        }
      ]
    }
  },
  "c1050": {
    "S2": {
      "description": "Summons ominous thunder to attack all enemies, dispelling one buff before decreasing Combat Readiness by {{variable}} and before --decreasing Speed-- and making them --unable to be buffed-- for 2 turns.",
      "effects": [
        {
          "amount": {
            "variable": 0,
            "sign": -1
          },
          "target": "enemies"
        }
      ]
    }
  },
  "c2110": {
    "S3": {
      "description": "Attacks all enemies with a barrage of cannon fire, stealing one buff\u00a0before a 85% chance to --decrease Defense-- for 2 turns, and a 100% chance to plant a --bomb-- for 2 turns, and decreases Combat Readiness by 20%.",
      "effects": [
        {
          "amount": -20,
          "target": "enemies"
        }
      ]
    }
  },
  "c1156": {
    "S1": {
      "description": "Attacks the enemy with a bardiche, before increasing Combat Readiness of the caster by {{variable}}. A successful attack deals additional damage proportional to the caster's max Health. Damage dealt increases proportional to the caster's max Health.",
      "effects": [
        {
          "target": "caster",
          "amount": {
            "variable": 0,
            "sign": 1
          }
        }
      ]
    }
  },
  "c5070": {
    "S1": {
      "description": "Attacks the enemy with a mystic blade, and increases Combat Readiness of the caster by {{variable}}. A successful attack deals additional damage proportional to the caster's Defense. Damage dealt increases proportional to the caster's Defense.",
      "effects": [
        {
          "target": "caster",
          "amount": {
            "variable": 0,
            "sign": 1
          }
        }
      ]
    }
  },
  "c2066": {
    "S2": {
      "description": "Attacks the enemy by thrusting down a spear, inflicting --decreased Defense-- for 1 turn, and increases Combat Readiness of the caster by 50%. A successful attack will inflict additional damage on all enemies. Damage dealt and additional damage increase proportional to the caster's max Health.",
      "effects": [
        {
          "target": "caster",
          "amount": 50
        }
      ]
    }
  }
};
