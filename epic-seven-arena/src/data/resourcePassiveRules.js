// Reviewed resource-only portions; exact descriptions guard all mappings.
export const RESOURCE_PASSIVE_RULES = {
  "c1019": {
    "skill": "S2",
    "description": "At the start of the first battle, gains 60 Fighting Spirit and increases Attack proportional to max Health. After being attacked, increases Combat Readiness by {{variable}}, and after suffering a critical hit, dispels one debuff from the caster.",
    "opening": {
      "type": "fightingSpirit",
      "amount": 60
    }
  },
  "c2019": {
    "skill": "S2",
    "description": "Increases Penetration Resistance by 30%. At the start of the first battle, gains 50 Fighting Spirit. After being attacked, consumes 10 Fighting Spirit, increasing Combat Readiness of the caster by 15% and recovering Health proportional to the caster's max Health.",
    "opening": {
      "type": "fightingSpirit",
      "amount": 50
    }
  },
  "c1109": {
    "skill": "S2",
    "description": "At the start of the first battle, gains 50 Fighting Spirit and grants stealth for 1 turn. At the start of the turn, gains 10 Fighting Spirit for each buff granted to an enemy, and when Fighting Spirit is full, resets skill cooldown. After attacking, increases Attack of the caster by {{variable}}. This effect can stack up to 3 times.",
    "opening": {
      "type": "fightingSpirit",
      "amount": 50
    }
  },
  "c1146": {
    "skill": "S2",
    "description": "At the start of the first battle, gains 50 Fighting Spirit. At the start of an enemy's extra turn, dispels all debuffs from the caster and grants Multilayer Barrier for 2 turns before increasing Combat Readiness by {{variable}}. The effect following an enemy's extra turn can only be activated once every 2 turns. After attacking, when Fighting Spirit is full, consumes all Fighting Spirit to activate Hell Flare.\nHell Flare: Attacks all enemies with a dark flame sphere. Penetrates the target's Defense by 30%, and when the caster is granted Multilayer Barrier, penetrates the target's Defense by an additional 30%.",
    "opening": {
      "type": "fightingSpirit",
      "amount": 50
    }
  },
  "c5009": {
    "skill": "S2",
    "description": "Increases Critical Hit Chance by {{variable}}. At the start of the first battle, gains 60 Fighting Spirit and grants enhanced Dual Attack to the caster. At the end of every 4 ally turns, grants enhanced Dual Attack to the caster.",
    "opening": {
      "type": "fightingSpirit",
      "amount": 60
    }
  },
  "c1158": {
    "skill": "S2",
    "description": "Starts the first battle with 50 Fighting Spirit. After an ally suffers an extra attack, counterattack, or Dual Attack, gains 50 Fighting Spirit and uses Soaring Arrow. The effect after being attacked can only be activated once every 2 turns.\nSoaring Arrow: Leaps backward and attacks all enemies, before dispelling two debuffs from all allies. Increases Combat Readiness of the caster by 30%.",
    "opening": {
      "type": "fightingSpirit",
      "amount": 50
    }
  },
  "c2080": {
    "skill": "S2",
    "description": "At the start of the first battle, gains 60 Fighting Spirit. After an ally except for the caster makes a critical hit, gains 20 Fighting Spirit, and when Fighting Spirit is full, activates Begone!. This effect is not activated by an extra attack, counterattack, or Dual Attack.\nBegone! (consumes 100 Fighting Spirit): Grants increased Attack to the caster for 2 turns, and attacks all enemies with gunfire, before increasing Combat Readiness of the caster by 100%.",
    "opening": {
      "type": "fightingSpirit",
      "amount": 60
    }
  },
  "c1183": {
    "skill": "S2",
    "description": "At the start of the first battle, gains 50 Fighting Spirit. Grants {{variable}} damage sharing from the damage received by the ally. After an ally except for the caster is attacked, when the damage suffered is 20% or more of max Health, dispels all debuffs and counterattacks. Cannot be triggered by extra attacks or counterattacks.",
    "opening": {
      "type": "fightingSpirit",
      "amount": 50
    }
  },
  "c3151": {
    "skill": "S2",
    "description": "At the start of the first battle, gains 20 Fighting Spirit. The caster receives {{variable}} of the damage suffered by the ally in the back row in their place. When more than one damage sharing effect is granted, only the strongest effect is applied. When an enemy revives, gains 40 Fighting Spirit and grants perception to the caster for 2 turns. The effect upon an enemy's revival can only be activated once every 2 turns.",
    "opening": {
      "type": "fightingSpirit",
      "amount": 20
    }
  },
  "c2095": {
    "skill": "S2",
    "description": "Starts the first battle with {{variable}} Fighting Spirit. When an enemy's turn ends, gains 10 Fighting Spirit for each debuff inflicted on an ally, and when the caster's Fighting Spirit is full, consumes all Fighting Spirit to dispel all debuffs from the caster and grants increased Defense and immunity for 1 turn before increasing Combat Readiness by 40%.",
    "opening": {
      "type": "fightingSpirit",
      "amount": {
        "variable": 0
      }
    }
  },
  "c2101": {
    "skill": "S2",
    "description": "Increases Critical Hit Chance by {{variable}}. At the start of the first battle, gains 1 Focus. At the start of the turn, gains 1 Focus and grants Bzzt! to the caster for 1 turn, and when Focus is full, resets cooldown of Operation: Cream Pastry.",
    "opening": {
      "type": "focus",
      "amount": 1
    },
    "turnStart": {
      "type": "focus",
      "amount": 1
    }
  },
  "c1192": {
    "skill": "S2",
    "description": "At the start of battle, gains 3 Focus, and has a {{variable}} chance to grant indomitable to all allies for 1 turn. At the start of the turn, when the caster has a buff, dispels all debuffs from the caster and resets skill cooldown of Anchor Shot. ",
    "opening": {
      "type": "focus",
      "amount": 3
    }
  },
  "c1173": {
    "skill": "S2",
    "description": "At the start of the first battle, gains 3 Focus. Increases Speed by 15% and Evasion by 20% for each Focus. When successfully evading, consumes 1 Focus and decreases skill cooldowns by 1 turn.",
    "opening": {
      "type": "focus",
      "amount": 3
    }
  },
  "c5110": {
    "skill": "S2",
    "description": "At the start of the first battle, gains 3 Focus. Increases Evasion by 50%, and when Focus is 1 or higher, increases Evasion by an additional 50%. After an ally uses a basic skill, consumes 1 Focus, triggering a Dual Attack, and increases Combat Readiness of the caster by {{variable}}.",
    "opening": {
      "type": "focus",
      "amount": 3
    }
  },
  "c2088": {
    "skill": "S2",
    "description": "At the start of the first battle, fully recovers Focus, and at the end of the turn, gains 1 Focus. When Focus is 3 or higher, immune to debuffs. When attacked, if expected damage suffered is equivalent to 30% or more of max Health, consumes 1 Focus, granting {{variable}} damage reduction. Insight only applies to PVP.",
    "opening": {
      "type": "focus",
      "amount": 5
    }
  },
  "c2111": {
    "skill": "S2",
    "description": "Decreases the amount of Focus gained by the enemy by 100%. At the start of the turn, has a {{variable}} chance to grant daydream for 1 turn, and at the end of the turn, has a {{variable}} chance to grant stealth for 1 turn.",
    "enemyGainMultiplier": {
      "type": "focus",
      "multiplier": 0
    }
  },
  "c1148": {
    "skill": "S2",
    "description": "Increases Effect Resistance by {{variable}}, and when attacking, cannot trigger a critical hit. Decreases the amount of Fighting Spirit gained by the enemy by 100%. After using a basic skill on the caster's turn, when the caster is immortal, activates Exterminate as an extra attack. Exterminate can only be activated once every 2 turns.\nExterminate: Attacks all enemies, dispelling one buff before inflicting --beguile--.",
    "enemyGainMultiplier": {
      "type": "fightingSpirit",
      "multiplier": 0
    }
  }
};
