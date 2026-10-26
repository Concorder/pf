// Reviewed natural-5-star S1 portions; descriptions are source guards, not executable rules.
export const NAT5_DEBUFF_RULES = {
  "c1131": {
    "S1": {
      "description": "Attacks the enemy, with a {{variable}} chance to inflict --redirected provoke-- for 1 turn. Damage dealt increases proportional to the caster's max Health.",
      "effects": [
        {
          "id": "stic_provoke_hp",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1016": {
    "S1": {
      "description": "Attacks by swinging their weapon, with a {{variable}} chance to --decrease Defense-- for 2 turns.",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1174": {
    "S1": {
      "description": "Attacks the enemy with an axe and inflicts --provoke-- for 1 turn. Damage dealt increases proportional to the caster's max Health.",
      "effects": [
        {
          "id": "stic_provoke",
          "turns": 1,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c1169": {
    "S1": {
      "description": "Attacks the enemy with a dagger and has a {{variable}} chance to inflict --bleed-- for 2 turns.",
      "effects": [
        {
          "id": "stic_blood",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c2074": {
    "S1": {
      "description": "Cuts the enemy, with a {{variable}} chance to --decrease Hit Chance-- for 1 turn.",
      "effects": [
        {
          "id": "stic_blind",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1112": {
    "S1": {
      "description": "Summons dolls to attack the enemy, with a {{variable}} chance to --stun-- for 1 turn.",
      "effects": [
        {
          "id": "stic_stun",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c5154": {
    "S1": {
      "description": "Attacks the enemy with scented paper, and has a {{variable}} chance to inflicted --decreased Defense-- for 1 turn. ",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1080": {
    "S1": {
      "description": "Strikes the enemy with a gun, with a {{variable}} chance to --decrease Hit Chance-- for 1 turn. Damage dealt increases proportional to the caster's Speed.",
      "effects": [
        {
          "id": "stic_blind",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c2046": {
    "S1": {
      "description": "Attacks the enemy with a sword, with a {{variable}} chance to --decrease Defense-- for 1 turn.",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c2002": {
    "S1": {
      "description": "Attacks the enemy with a spear of revenge and has a {{variable}} chance to --provoke-- for 1 turn. Damage dealt increases proportional to the caster's max Health.",
      "effects": [
        {
          "id": "stic_provoke",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1108": {
    "S1": {
      "description": "Rapidly attacks the enemy, with a {{variable}} chance to --decrease Defense-- for 2 turns.",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c5147": {
    "S1": {
      "description": "Attacks the enemy with elemental magic, with a {{variable}} chance to inflict --stun-- for 1 turn.",
      "effects": [
        {
          "id": "stic_stun",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1105": {
    "S1": {
      "description": "Fires a barrage of bullets at the enemy, with a {{variable}} chance to make them --unable to be buffed-- for 1 turn.",
      "effects": [
        {
          "id": "stic_buf_impossible",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1111": {
    "S1": {
      "description": "Attacks the enemy with shards of ice, with a {{variable}} chance to --decrease Defense-- for 1 turn.",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c2095": {
    "S1": {
      "description": "Attacks the enemy with scissors, with a {{variable}} chance to --decrease Defense-- for 1 turn. Damage dealt increases proportional to the caster's Defense.",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c2080": {
    "S1": {
      "description": "Attacks the enemy with a gunblade, with a {{variable}} chance to --decrease Attack-- for 1 turn.",
      "effects": [
        {
          "id": "stic_att_dn",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c5046": {
    "S1": {
      "description": "Attacks the enemy with a sword, with a {{variable}} chance to --stun-- for 1 turn. Damage dealt increases proportional to the caster's max Health.",
      "effects": [
        {
          "id": "stic_stun",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c2124": {
    "S1": {
      "description": "Attacks the enemy with a road sign and has a {{variable}} chance to inflict --decreased Defense-- for 1 turn. Damage dealt increases proportional to the caster's Defense.",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1100": {
    "S1": {
      "description": "Attacks the enemy by battering them, with a {{variable}} chance to --decrease Defense-- for 1 turn. Damage dealt increases proportional to the caster's max Health.",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1139": {
    "S1": {
      "description": "Attacks the enemy with a sword and has a {{variable}} chance to --stun-- for 1 turn. ",
      "effects": [
        {
          "id": "stic_stun",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1137": {
    "S1": {
      "description": "Attacks the enemy by punching them, with a {{variable}} chance to --decrease Defense-- for 1 turn. Damage dealt increases proportional to the caster's Defense.",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1024": {
    "S1": {
      "description": "Throws swords at the enemy, with a {{variable}} chance to --decrease Defense-- for 2 turns.",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1126": {
    "S1": {
      "description": "Attacks the enemy with a fan, with a {{variable}} chance to --decrease Defense-- for 2 turns.",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1110": {
    "S1": {
      "description": "Attacks the enemy with a gun, with a {{variable}} chance to inflict --decreased Defense-- for 1 turn.",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1074": {
    "S1": {
      "description": "Attacks with a sword, with a {{variable}} chance to --decrease Attack-- for 1 turn. When it is not the caster's turn, increases Combat Readiness by 15% and gains double the amount of Focus.",
      "effects": [
        {
          "id": "stic_att_dn",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1129": {
    "S1": {
      "description": "Attacks two enemies with shadows, with a {{variable}} chance to --decrease Hit Chance-- for 1 turn. When it is not the caster's turn, increases effect chance by 20%. Damage dealt increases proportional to the caster's Defense.",
      "effects": [
        {
          "id": "stic_blind",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1,
          "chanceBonusOutsideTurn": 20
        }
      ]
    }
  },
  "c5004": {
    "S1": {
      "description": "Has a {{variable}} chance to --seal-- the enemy for 2 turns, before attacking with lightning.",
      "effects": [
        {
          "id": "stic_dizzy",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1,
          "timing": "beforeAttack"
        }
      ]
    }
  }
};
export const NAT5_RESOURCE_RULES = {
  "c1074": {
    "S1": {
      "description": "Attacks with a sword, with a {{variable}} chance to --decrease Attack-- for 1 turn. When it is not the caster's turn, increases Combat Readiness by 15% and gains double the amount of Focus.",
      "outsideTurnGainMultiplier": 2
    }
  },
  "c1101": {
    "S1": {
      "description": "Attacks the enemy with a spear, before increasing Combat Readiness of the caster by {{variable}}. A critical hit will double the amount of Focus gained. Damage dealt increases proportional to the caster's max Health.",
      "criticalGainMultiplier": 2
    }
  }
};
export const NAT5_READINESS_RULES = {
  "c1074": {
    "S1": {
      "description": "Attacks with a sword, with a {{variable}} chance to --decrease Attack-- for 1 turn. When it is not the caster's turn, increases Combat Readiness by 15% and gains double the amount of Focus.",
      "effects": [
        {
          "amount": 15,
          "target": "caster",
          "outsideTurnOnly": true
        }
      ]
    }
  },
  "c1101": {
    "S1": {
      "description": "Attacks the enemy with a spear, before increasing Combat Readiness of the caster by {{variable}}. A critical hit will double the amount of Focus gained. Damage dealt increases proportional to the caster's max Health.",
      "effects": [
        {
          "amount": {
            "variable": 0,
            "sign": 1
          },
          "target": "caster"
        }
      ]
    }
  },
  "c1144": {
    "S1": {
      "description": "Attacks the enemy with bloodied wings, and increases Combat Readiness of the caster by 15%. When used on the caster's turn, has a 35% chance to activate Might as an extra effect. Damage dealt increases proportional to the caster's max Health.\nMight: Increases Combat Readiness of all allies by 15%.",
      "effects": [
        {
          "amount": 15,
          "target": "caster"
        }
      ]
    }
  }
};
