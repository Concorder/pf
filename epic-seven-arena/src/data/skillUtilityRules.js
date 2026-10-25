// Reviewed utility effects; no source text is executed.
export const SKILL_UTILITY_RULES = {
  c1043: {
    S3: {
      description:
        "Shoots a powerful gravity sphere to attack all enemies, dispelling all buffs before inflicting --restrict-- and two --poison-- effects for 2 turns. Increases Combat Readiness of the caster by 50%.",
      dispel: {
        timing: "afterAttack",
      },
    },
  },
  c5071: {
    S3: {
      description:
        "Attacks all enemies with a spray of water, dispelling all buffs before a {{variable}} chance each to inflict --cannot buff-- and --unhealable-- for 2 turns.",
      dispel: {
        timing: "afterAttack",
      },
    },
  },
  c1096: {
    S3: {
      description:
        "After dispelling all buffs from the target, attacks the enemy by releasing pent-up aggression. Unaffected by elemental disadvantage and grants an extra turn. When the target is not an Elite or Boss monster, regardless of whether the attack hits, inflicts --curse-- for 2 turns.",
      dispel: {
        timing: "beforeAttack",
      },
    },
  },
  c1180: {
    S3: {
      description:
        "Attacks the enemy by destroying the surroundings, dispelling all buffs from the target and decreasing Combat Readiness by 50% before a {{variable}} chance each to inflict --laceration-- and --silence-- for 2 turns. Increases Combat Readiness of the caster by 50%. At the start of the first battle, grants stealth for 2 turns.",
      dispel: {
        timing: "afterAttack",
      },
    },
  },
  c1151: {
    S3: {
      description:
        "Attacks all enemies with a powerful spell, dispelling all buffs before inflicting --bind-- for 2 turns and increasing skill cooldowns by 1 turn. Grants an extra turn to the caster.",
      dispel: {
        timing: "afterAttack",
      },
    },
  },
  c1046: {
    S2: {
      description:
        "Inflicts resource reduction on all enemies by 60% before attacking, dispelling all buffs and inflicting --bind-- for 2 turns. For every target, increases Combat Readiness of the caster by 25%.",
      dispel: {
        timing: "afterAttack",
      },
    },
  },
  c1155: {
    S3: {
      description:
        "Dispels all buffs from the enemy before --silencing-- for 1 turn and a {{variable}} chance to inflict --death sentence--. This skill is unaffected by cooldown increase and decrease effects.",
      dispel: {
        timing: "beforeAttack",
      },
    },
  },
  c1160: {
    S3: {
      description:
        "Dispels all buffs from the enemy, before a {{variable}} chance each to inflict --bind-- and --block-- for 2 turns.",
      dispel: {
        timing: "beforeAttack",
      },
    },
  },
  c1072: {
    S3: {
      description:
        "Inflicts lethal damage to the enemy, piercing their Weakness. Penetrates Defense by 30%, with an additional 10% for each debuff inflicted on the enemy. Inflicts extinction when the enemy is defeated.",
      extinction: true,
    },
  },
  c3103: {
    S2: {
      description:
        "Fires a missile at the enemy, and when the enemy is defeated, inflicts extinction and grants torrent to the caster. Increases Hit Chance of this skill by 50%.",
      extinction: true,
    },
  },
  c1095: {
    S3: {
      description:
        "Attacks the enemy by slashing them with Cho & Mal, before granting skill nullifier once to the caster, and when the enemy is defeated, inflicts extinction. Penetrates the target's Defense. Increase Hit Chance of this skill by 20%.",
      extinction: true,
    },
  },
  c2082: {
    S3: {
      description:
        "After granting increased Attack to the caster for 3 turns, attacks the enemy, and when the enemy is defeated, inflicts extinction. Grants stealth and a barrier (proportional to Attack) to the caster for 2 turns. Penetrates the target’s Defense by 50%. When the Speed of the caster is greater than the Speed of the target, penetration rate increases proportional to the difference, up to a maximum of 100%.",
      extinction: true,
    },
  },
"c1016": {
  "S2": {
    "description": "Attacks all enemies with a dragon howl, dispelling one buff, before a {{variable}} chance to --decrease Defense-- for 2 turns and a {{variable}} chance to --silence-- for 1 turn.",
    "dispel": {
      "timing": "afterAttack",
      "count": 1
    }
  }
},
"c1050": {
  "S2": {
    "description": "Summons ominous thunder to attack all enemies, dispelling one buff before decreasing Combat Readiness by {{variable}} and before --decreasing Speed-- and making them --unable to be buffed-- for 2 turns.",
    "dispel": {
      "timing": "afterAttack",
      "count": 1
    }
  }
},
"c2004": {
  "S2": {
    "description": "Fires arrows at the enemy to attack, dispelling one buff. When the caster has a buff, triggers a Dual Attack from the ally with the highest Attack.",
    "dispel": {
      "timing": "afterAttack",
      "count": 1
    }
  }
},
"c4051": {
  "S3": {
    "description": "Attacks all enemies with a powerful fire, dispelling two buffs before a {{variable}} chance each to inflict two --burn-- effects for 2 turns.",
    "dispel": {
      "timing": "afterAttack",
      "count": 2
    }
  }
},
"c3051": {
  "S3": {
    "description": "Attacks all enemies with a powerful fire, dispelling two buffs before a {{variable}} chance to --burn-- for 2 turns.",
    "dispel": {
      "timing": "afterAttack",
      "count": 2
    }
  }
},
"c1048": {
  "S2": {
    "description": "Attacks all enemies with a catalytic explosion, dispelling two buffs and making them --unhealable-- for 2 turns, before increasing Attack of all allies for 2 turns. For each --unhealable-- inflicted, increases Combat Readiness of the caster by 30%.",
    "dispel": {
      "timing": "afterAttack",
      "count": 2
    }
  }
},
};
