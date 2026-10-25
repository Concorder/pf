// Reviewed direct grants, guarded by source descriptions; ordering is explicit.
export const SKILL_DEBUFF_RULES = {
  "c1079": {
    "S1": {
      "description": "Attacks the enemy with a flaming sword and has a {{variable}} chance to inflict --unhealable-- for 1 turn.",
      "effects": [
        {
          "id": "stic_heal_impossible",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1072": {
    "S1": {
      "description": "Attacks the enemy with a scythe, with a {{variable}} chance each to inflict two --bleeding-- effects for 2 turns.",
      "effects": [
        {
          "id": "stic_blood",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 2
        }
      ]
    },
    "S2": {
      "description": "Attacks the enemy by swiping consecutively with a scythe, with a {{variable}} chance each to inflict --unhealable-- and --bleeding-- for 2 turns. After attacking, when the target's Health is 50% or less, activates Sever as an extra attack. When attacking with an extra attack, Sever has a 100% chance to inflict --bleeding--.",
      "effects": [
        {
          "id": "stic_heal_impossible",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        },
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
  "c5071": {
    "S1": {
      "description": "Attacks the enemy with a fan, with a {{variable}} chance to --target-- the enemy for 2 turns.",
      "effects": [
        {
          "id": "stic_target",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    },
    "S3": {
      "description": "Attacks all enemies with a spray of water, dispelling all buffs before a {{variable}} chance each to inflict --cannot buff-- and --unhealable-- for 2 turns.",
      "effects": [
        {
          "id": "stic_buf_impossible",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        },
        {
          "id": "stic_heal_impossible",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c4051": {
    "S3": {
      "description": "Attacks all enemies with a powerful fire, dispelling two buffs before a {{variable}} chance each to inflict two --burn-- effects for 2 turns.",
      "effects": [
        {
          "id": "stic_blaze",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 2
        }
      ]
    }
  },
  "c1066": {
    "S3": {
      "description": "Soars into the air and attacks the enemy by hurling a spear, with a {{variable}} chance to inflict --decreased Defense-- for 2 turns. Penetrates the target's Defense by 50% and attacks using an elemental advantage. When the enemy is defeated, gains an additional 5 Soul.",
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
  "c2007": {
    "S3": {
      "description": "After increasing Attack of the caster for 2 turns, attacks all enemies before inflicting --decreased Hit Chance-- for 2 turns, and when an enemy is defeated, resets cooldown. When Focus is full, consumes it all, increasing damage dealt.",
      "effects": [
        {
          "id": "stic_blind",
          "turns": 2,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c1048": {
    "S1": {
      "description": "Attacks the enemy with an explosion of flames, with a {{variable}} chance to --burn-- for 2 turns.",
      "effects": [
        {
          "id": "stic_blaze",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    },
    "S2": {
      "description": "Attacks all enemies with a catalytic explosion, dispelling two buffs and making them --unhealable-- for 2 turns, before increasing Attack of all allies for 2 turns. For each --unhealable-- inflicted, increases Combat Readiness of the caster by 30%.",
      "effects": [
        {
          "id": "stic_heal_impossible",
          "turns": 2,
          "chance": 100,
          "count": 1
        }
      ]
    },
    "S3": {
      "description": "Attacks all enemies with a massive fire pillar, with a {{variable}} chance each to inflict two --burn-- effects for 2 turns and a {{variable}} chance to inflict --stun-- for 1 turn. Grants a barrier (proportional to the caster’s Attack) to the caster for 2 turns.",
      "effects": [
        {
          "id": "stic_blaze",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 2
        },
        {
          "id": "stic_stun",
          "turns": 1,
          "chance": {
            "variable": 1
          },
          "count": 1
        }
      ]
    }
  },
  "c2048": {
    "S3": {
      "description": "Attacks all enemies with a giant meteor, inflicting two --burn-- effects for 2 turns and --stunning-- for 1 turn. Decreases Combat Readiness of the enemy with the highest Combat Readiness by 30%.",
      "effects": [
        {
          "id": "stic_blaze",
          "turns": 2,
          "chance": 100,
          "count": 2
        },
        {
          "id": "stic_stun",
          "turns": 1,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c1015": {
    "S1": {
      "description": "Summons an evil spirit to attack two enemies, with a {{variable}} chance to inflict --poison-- for 2 turns.",
      "effects": [
        {
          "id": "stic_dot",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    },
    "S3": {
      "description": "Baal & Sezan attack all enemies with offensive magic, with a {{variable}} chance each to inflict --decreased Defense--, --decreased Speed--, and --unhealable-- for 2 turns.",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        },
        {
          "id": "stic_dodge_dn",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        },
        {
          "id": "stic_heal_impossible",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1087": {
    "S1": {
      "description": "Fires a gun while dashing towards the enemy, with a {{variable}} chance to --burn-- for 2 turns.",
      "effects": [
        {
          "id": "stic_blaze",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    },
    "S3": {
      "description": "Attacks the enemy with a fatal shot, with a {{variable}} chance to --decrease Defense-- for 2 turns.",
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
  "c1039": {
    "S1": {
      "description": "Attacks the enemy with an enormous scythe, with a {{variable}} chance to --decrease Defense-- for 2 turns.",
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
    },
    "S2": {
      "description": "Attacks the enemy with a scythe, inflicting --unhealable-- and --vampiric touch-- for 2 turns, and recovers Health of all allies proportional to damage dealt.",
      "effects": [
        {
          "id": "stic_heal_impossible",
          "turns": 2,
          "chance": 100,
          "count": 1
        },
        {
          "id": "stic_vampire",
          "turns": 2,
          "chance": 100,
          "count": 1
        }
      ]
    },
    "S3": {
      "description": "Attacks all enemies with Envoy's Scythe, dispelling two buffs before a {{variable}} chance each to inflict two --bleeding-- effects for 2 turns. A critical hit has a {{variable}} chance to inflict --decreased Defense-- for 2 turns. When there are three or fewer enemies, damage dealt increases with fewer enemies. This skill cannot trigger a counterattack.",
      "effects": [
        {
          "id": "stic_blood",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 2
        },
        {
          "id": "stic_def_dn",
          "turns": 2,
          "chance": {
            "variable": 1
          },
          "count": 1,
          "requiresCrit": true
        }
      ]
    }
  },
  "c1085": {
    "S1": {
      "description": "Attacks the enemy with a ball of flame and has a {{variable}} chance to inflict --decreased Defense-- for 2 turns. After attacking, has a 35% chance to activate Burning Vitality.\nBurning Vitality: Increases Combat Readiness of the caster by 20%.",
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
    },
    "S3": {
      "description": "Attacks with a fiery explosion, making the target --unhealable-- and --decreasing Defense-- for 2 turns each.",
      "effects": [
        {
          "id": "stic_heal_impossible",
          "turns": 2,
          "chance": 100,
          "count": 1
        },
        {
          "id": "stic_def_dn",
          "turns": 2,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c1050": {
    "S2": {
      "description": "Summons ominous thunder to attack all enemies, dispelling one buff before decreasing Combat Readiness by {{variable}} and before --decreasing Speed-- and making them --unable to be buffed-- for 2 turns.",
      "effects": [
        {
          "id": "stic_dodge_dn",
          "turns": 2,
          "chance": 100,
          "count": 1
        },
        {
          "id": "stic_buf_impossible",
          "turns": 2,
          "chance": 100,
          "count": 1
        }
      ]
    },
    "S3": {
      "description": "Attacks all enemies by dropping the Moon of Nightmare, inflicting --decreased Defense-- for 2 turns and a {{variable}} chance to put them to --sleep-- for 1 turn, before granting increased Attack to the caster for 2 turns.",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 2,
          "chance": 100,
          "count": 1
        },
        {
          "id": "stic_sleep",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    },
    "S1": {
      "description": "Attacks two enemies with an explosion of dark energy, with a {{variable}} chance to put them to --sleep-- for 1 turn. When an enemy is put to --sleep--, the caster's Combat Readiness increases by 25%. This skill does not trigger a Dual Attack.",
      "effects": [
        {
          "id": "stic_sleep",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c2111": {
    "S3": {
      "description": "Decreases buff durations of the enemy by 1 turn and attacks with starlight, inflicting --stun-- for 1 turn before decreasing Combat Readiness by 30%. Grants a barrier (proportional to the caster’s max Health) to the caster for 2 turns.",
      "effects": [
        {
          "id": "stic_stun",
          "turns": 1,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c2029": {
    "S3": {
      "description": "Attacks all enemies with Racoo’s help, decreasing buff durations by 1 turn before a {{variable}} chance each to inflict --decreased Speed-- and a --bomb-- for 2 turns. Grants skill nullifier once to the caster.",
      "effects": [
        {
          "id": "stic_dodge_dn",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        },
        {
          "id": "stic_bomb",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1150": {
    "S3": {
      "description": "Attacks the enemy, dispelling two buffs before inflicting --decreased Defense-- and --bomb-- for 2 turns. A critical hit will grant an extra turn.",
      "effects": [
        {
          "id": "stic_def_dn",
          "turns": 2,
          "chance": 100,
          "count": 1
        },
        {
          "id": "stic_bomb",
          "turns": 2,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c2110": {
    "S3": {
      "description": "Attacks all enemies with a barrage of cannon fire, stealing one buff before a 85% chance to --decrease Defense-- for 2 turns, and a 100% chance to plant a --bomb-- for 2 turns, and decreases Combat Readiness by 20%.",
      "effects": [
        {
          "id": "stic_bomb",
          "turns": 2,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c1033": {
    "S3": {
      "description": "Attacks the enemy with a dagger and bomb, decreasing buff durations by 1 turn, inflicting --bleeding-- and planting a --bomb-- for 2 turns, before increasing Combat Readiness of the caster by 50%. When the target is a Fire elemental Hero, ignores Effect Resistance and increases Combat Readiness of the caster by an additional 50%.",
      "effects": [
        {
          "id": "stic_blood",
          "turns": 2,
          "chance": 100,
          "count": 1,
          "ignoreResistanceAgainst": "fire"
        },
        {
          "id": "stic_bomb",
          "turns": 2,
          "chance": 100,
          "count": 1,
          "ignoreResistanceAgainst": "fire"
        }
      ]
    }
  },
  "c5024": {
    "S3": {
      "description": "Attacks all enemies with swords of flowers, --decreasing Attack-- for 2 turns and increases Speed of the caster for 2 turns. At the end of the turn, detonates bombs inflicted on the enemy.",
      "effects": [
        {
          "id": "stic_att_dn",
          "turns": 2,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c1002": {
    "S3": {
      "description": "Attacks all enemies with a spear infused with dark energy, with a {{variable}} chance to --provoke-- for 1 turn, before granting immunity to all allies for 2 turns and a barrier to the caster for 2 turns. Damage dealt and barrier strength increases proportional to the caster's max Health.",
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
  "c5050": {
    "S1": {
      "description": "Attacks the enemy with a mystical power, with a {{variable}} chance each to inflict --redirected provoke-- for 1 turn.",
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
    },
    "S3": {
      "description": "Lures all enemies in with a tea party and attacks, dispelling one buff, making them --unable to be buffed-- for 2 turns, and inflicting --redirected provoke-- for 1 turn.",
      "effects": [
        {
          "id": "stic_buf_impossible",
          "turns": 2,
          "chance": 100,
          "count": 1
        },
        {
          "id": "stic_provoke_hp",
          "turns": 1,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c2012": {
    "S1": {
      "description": "Attacks the enemy with a shield, with a {{variable}} chance to --provoke-- for 1 turn, before recovering the caster's Health. Damage dealt and amount recovered increase proportional to the caster's max Health.",
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
  "c6005": {
    "S1": {
      "description": "Attacks the enemy with divine lightning and has a {{variable}} chance to inflict --fear-- for 1 turn, before recovering Health of all allies proportional to the target's max Health.",
      "effects": [
        {
          "id": "stic_fear",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1104": {
    "S3": {
      "description": "Descends and attacks all enemies, inflicting --fear-- for 2 turns, before recovering Health of the caster. Penetrates Defense of the enemy with the highest Max Health by 70%, and ignores Effect Resistance of any targets with Max Health lower than the caster’s Max Health. Damage dealt and amount recovered increase proportional to the caster's max Health.",
      "effects": [
        {
          "id": "stic_fear",
          "turns": 2,
          "chance": 100,
          "count": 1,
          "ignoreResistanceIfLowerHP": true
        }
      ]
    }
  },
  "c1176": {
    "S3": {
      "description": "Dispels all buffs from all enemies before inflicting --beguile-- and inflicting --decreased Hit Chance-- for 2 turns. Ignores Effect Resistance of targets with less max Health than the caster.",
      "effects": [
        {
          "id": "stic_deceptive",
          "turns": 1,
          "chance": 100,
          "count": 1,
          "ignoreResistanceIfLowerHP": true
        },
        {
          "id": "stic_blind",
          "turns": 2,
          "chance": 100,
          "count": 1,
          "ignoreResistanceIfLowerHP": true
        }
      ]
    }
  },
  "c2185": {
    "S3": {
      "description": "Rhianna and Luciella launch a coordinated attack. Luciella attacks all enemies and when the target is a Hero, ignores damage sharing. Rhianna dispels two buffs from all enemies, before inflicting --fear-- for 1 turn. Grants a barrier (proportional to Attack) to the caster for 3 turns. One Butterfly's Afterdream will remain throughout the battle.",
      "effects": [
        {
          "id": "stic_fear",
          "turns": 1,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c1096": {
    "S3": {
      "description": "After dispelling all buffs from the target, attacks the enemy by releasing pent-up aggression. Unaffected by elemental disadvantage and grants an extra turn. When the target is not an Elite or Boss monster, regardless of whether the attack hits, inflicts --curse-- for 2 turns.",
      "effects": [
        {
          "id": "stic_curse2",
          "turns": 2,
          "chance": 100,
          "count": 1,
          "ignoreMiss": true
        }
      ]
    }
  },
  "c3121": {
    "S3": {
      "description": "Attacks all enemies, --decreasing Speed-- and inflicting --stigma-- for 2 turns. A successful attack always results in a critical hit.",
      "effects": [
        {
          "id": "stic_dodge_dn",
          "turns": 2,
          "chance": 100,
          "count": 1
        },
        {
          "id": "stic_stigma",
          "turns": 2,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c1132": {
    "S1": {
      "description": "Attacks the enemy, with a {{variable}} chance to inflict --venom-- for 1 turn. After attacking, when the target is inflicted with venom, increases skill cooldowns by 1 turn.",
      "effects": [
        {
          "id": "stic_venom",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    },
    "S3": {
      "description": "Attacks all enemies, decreasing buff durations by 2 turn before inflicting --decreased Speed-- and two --venom-- effects for 2 turns. Increases Combat Readiness of the caster by 50%.",
      "effects": [
        {
          "id": "stic_dodge_dn",
          "turns": 2,
          "chance": 100,
          "count": 1
        },
        {
          "id": "stic_venom",
          "turns": 2,
          "chance": 100,
          "count": 2
        }
      ]
    }
  },
  "c1180": {
    "S3": {
      "description": "Attacks the enemy by destroying the surroundings, dispelling all buffs from the target and decreasing Combat Readiness by 50% before a {{variable}} chance each to inflict --laceration-- and --silence-- for 2 turns. Increases Combat Readiness of the caster by 50%. At the start of the first battle, grants stealth for 2 turns.",
      "effects": [
        {
          "id": "stic_laceration",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        },
        {
          "id": "stic_silence",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c2046": {
    "S2": {
      "description": "Attacks all enemies by binding them with a sword, with a {{variable}} chance to dispel two buffs and inflict --laceration-- for 2 turns. Grants an extra turn to the caster. This skill cannot trigger a counterattack.",
      "effects": [
        {
          "id": "stic_laceration",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c2184": {
    "S3": {
      "description": "After inflicting --collapse-- on the enemy for 2 turns, attacks with the power of Nggdrasil, with a {{variable}} chance to inflict --decreased Defense-- for 2 turns, and deals additional damage to the target. Damage dealt and additional damage increase proportional to the caster's max Health.",
      "effects": [
        {
          "id": "stic_collapse",
          "turns": 2,
          "chance": 100,
          "count": 1,
          "timing": "beforeAttack"
        },
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
  "c2001": {
    "S2": {
      "description": "After inflicting --seal-- and --collapse-- on the enemy for 2 turns, attacks the enemy. A critical hit will grant an extra turn. Damage dealt increases proportional to the caster's max Health.",
      "effects": [
        {
          "id": "stic_collapse",
          "turns": 2,
          "chance": 100,
          "count": 1,
          "timing": "beforeAttack"
        }
      ]
    }
  },
  "c1046": {
    "S2": {
      "description": "Inflicts resource reduction on all enemies by 60% before attacking, dispelling all buffs and inflicting --bind-- for 2 turns. For every target, increases Combat Readiness of the caster by 25%.",
      "effects": [
        {
          "id": "stic_restrict",
          "turns": 2,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c1151": {
    "S2": {
      "description": "--Seals-- the enemy for 2 turns before attacking, and increases Speed of the caster for 2 turns.",
      "effects": [
        {
          "id": "stic_dizzy",
          "turns": 2,
          "chance": 100,
          "count": 1,
          "timing": "beforeAttack"
        }
      ]
    },
    "S3": {
      "description": "Attacks all enemies with a powerful spell, dispelling all buffs before inflicting --bind-- for 2 turns and increasing skill cooldowns by 1 turn. Grants an extra turn to the caster.",
      "effects": [
        {
          "id": "stic_restrict",
          "turns": 2,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c2148": {
    "S1": {
      "description": "Has a {{variable}} chance to inflict --seal-- on the enemy for 2 turns before attacking. When used on the caster's turn, has a 40% chance to activate Twisted Strike as an extra attack.\nTwisted Strike: Attacks all enemies, absorbing some of the damage dealt as Health, and has a 35% chance to inflict --fear-- for 1 turn. When the caster is granted engulf, effect chance is doubled.",
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
  },
  "c1153": {
    "S3": {
      "description": "Attacks all enemies, decreasing buff durations by 2 turns and a {{variable}} chance each to inflict --unable to counterattack-- and --unable to be buffed-- for 2 turns. Penetrates the target's Defense. When Focus is full, consumes it all, increasing damage dealt. Damage dealt increases proportional to the caster's max Health.",
      "effects": [
        {
          "id": "stic_nocounterattack",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        },
        {
          "id": "stic_buf_impossible",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1043": {
    "S3": {
      "description": "Shoots a powerful gravity sphere to attack all enemies, dispelling all buffs before inflicting --restrict-- and two --poison-- effects for 2 turns. Increases Combat Readiness of the caster by 50%.",
      "effects": [
        {
          "id": "stic_ab_up_block",
          "turns": 2,
          "chance": 100,
          "count": 1
        },
        {
          "id": "stic_dot",
          "turns": 2,
          "chance": 100,
          "count": 2
        }
      ]
    }
  },
  "c3113": {
    "S1": {
      "description": "Throws paper to attack the enemy, with a {{variable}} chance to --restrict-- for 2 turns.",
      "effects": [
        {
          "id": "stic_ab_up_block",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    },
    "S2": {
      "description": "Attacks all enemies, with a {{variable}} chance each to --restrict-- and --decrease Speed-- for 2 turns.",
      "effects": [
        {
          "id": "stic_ab_up_block",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        },
        {
          "id": "stic_dodge_dn",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1125": {
    "S2": {
      "description": "Attacks all enemies with guardian spirits, decreasing buff durations by 1 turn before --restricting-- and making them --unable to be buffed-- for 2 turns. Grants an extra turn to the caster.",
      "effects": [
        {
          "id": "stic_ab_up_block",
          "turns": 2,
          "chance": 100,
          "count": 1
        },
        {
          "id": "stic_buf_impossible",
          "turns": 2,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c1081": {
    "S3": {
      "description": "Attacks all enemies with a raging frost storm, decreasing buff durations by 1 turn before a {{variable}} chance each to inflict --decreased Speed-- and --restrict-- for 2 turns. Grants invincibility to the caster for 1 turn. Attacks using an elemental advantage.",
      "effects": [
        {
          "id": "stic_dodge_dn",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        },
        {
          "id": "stic_ab_up_block",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c5190": {
    "S3": {
      "description": "Fixes all enemies in a frame, dispelling two buffs before a {{variable}} chance each to inflict --immobilize-- and --restrict-- for 2 turns. Concealment will remain throughout the battle. ",
      "effects": [
        {
          "id": "stic_danger_4",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        },
        {
          "id": "stic_ab_up_block",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1155": {
    "S3": {
      "description": "Dispels all buffs from the enemy before --silencing-- for 1 turn and a {{variable}} chance to inflict --death sentence--. This skill is unaffected by cooldown increase and decrease effects.",
      "effects": [
        {
          "id": "stic_death_0_keep",
          "turns": 12,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c6050": {
    "S1": {
      "description": "Attacks the enemy with a mirror, with a {{variable}} chance to inflict a --random debuff-- for 1 turn. When Mirror of the Abyss is on cooldown, triggers a Dual Attack from the ally with the highest Attack.",
      "effects": [
        {
          "id": "stic_random_debuff6",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    },
    "S3": {
      "description": "Traps all enemies in a timeless space beyond the mirror, dispelling two buffs before inflicting --block-- for 2 turns and a --random debuff-- for 1 turn. Increases Combat Readiness of the caster by 50%.",
      "effects": [
        {
          "id": "stic_isolation",
          "turns": 2,
          "chance": 100,
          "count": 1
        },
        {
          "id": "stic_random_debuff7",
          "turns": 1,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c2132": {
    "S3": {
      "description": "Attacks all enemies with the power of the divine Dragon, decreasing buff durations by 2 turns before a {{variable}} chance to inflict --cannot buff-- and --class debuff-- for 2 turns and decrease Combat Readiness by 20%.",
      "effects": [
        {
          "id": "stic_buf_impossible",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        },
        {
          "id": "stic_class_debuff_1",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1053": {
    "S1": {
      "description": "Attacks the enemy with wind magic, with a {{variable}} chance to transfer one debuff from the caster and inflict one --random debuff-- for 2 turns.",
      "effects": [
        {
          "id": "cmn_random_debuff3",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    },
    "S3": {
      "description": "Attacks all enemies with sand magic, dispelling all buffs and making them --unable to be buffed-- for 2 turns, before decreasing Combat Readiness by 30%.",
      "effects": [
        {
          "id": "stic_buf_impossible",
          "turns": 2,
          "chance": 100,
          "count": 1
        }
      ]
    }
  },
  "c1160": {
    "S3": {
      "description": "Dispels all buffs from the enemy, before a {{variable}} chance each to inflict --bind-- and --block-- for 2 turns.",
      "effects": [
        {
          "id": "stic_restrict",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        },
        {
          "id": "stic_isolation",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c5069": {
    "S3": {
      "description": "Dispels two buffs from all enemies, and has a {{variable}} chance each to inflict --block-- for 2 turns and --silence-- for 1 turn on all enemies. Grants dawn and a barrier (proportional to max Health) to the caster for 3 turns.",
      "effects": [
        {
          "id": "stic_isolation",
          "turns": 2,
          "chance": {
            "variable": 0
          },
          "count": 1
        },
        {
          "id": "stic_silence",
          "turns": 1,
          "chance": {
            "variable": 0
          },
          "count": 1
        }
      ]
    }
  },
  "c1083": {
    "S1": {
      "description": "Attacks the enemy with thorns, inflicting --frostbite-- for 1 turn. Damage dealt increases proportional to the caster's Defense.",
      "effects": [
        {
          "id": "stic_freezing",
          "turns": 1,
          "chance": 100,
          "count": 1
        }
      ]
    }
  }
};
