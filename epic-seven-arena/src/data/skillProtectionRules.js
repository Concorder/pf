// Reviewed bypass clauses; exact descriptions and common references guard activation.
export const SKILL_PROTECTION_RULES = {
  "c1131": {
    "S3": {
      "description": "Attacks the enemy by unraveling Sphere of Sadism, and when the enemy is defeated, recovers Health of the caster proportional to max Health. When the target is not an Elite or Boss monster, ignores damage share. Penetrates the target's Defense, but cannot trigger a critical hit or a heavy blow. Damage dealt increases proportional to the caster's lost Health.",
      "scope": "nonEliteBoss",
      "ignoreDamageSharing": true,
      "ignoreDamageReduction": false
    }
  },
  "c2082": {
    "S1": {
      "description": "Attacks the enemy with the suit’s energy. Has a 40% chance to grant an extra attack with the same skill. When the enemy is not an Elite or Boss monster, ignores damage share.",
      "scope": "nonEliteBoss",
      "ignoreDamageSharing": true,
      "ignoreDamageReduction": false
    }
  },
  "c2185": {
    "S3": {
      "description": "Rhianna and Luciella launch a coordinated attack. Luciella attacks all enemies and when the target is a Hero, ignores damage sharing. Rhianna dispels two buffs from all enemies, before inflicting --fear-- for 1 turn. Grants a barrier (proportional to Attack) to the caster for 3 turns. One Butterfly's Afterdream will remain throughout the battle.",
      "scope": "hero",
      "ignoreDamageSharing": true,
      "ignoreDamageReduction": false
    }
  },
  "c1080": {
    "S3": {
      "description": "Swiftly cuts and shoots the enemy. When the target is not an Elite or Boss monster, ignores damage share. Damage dealt increases proportional to the caster's Speed.",
      "scope": "nonEliteBoss",
      "ignoreDamageSharing": true,
      "ignoreDamageReduction": false
    }
  },
  "c1122": {
    "S3": {
      "description": "Attacks the enemy by releasing mana, and when the enemy is defeated, inflicts extinction. Grants increased Evasion to the caster for 3 turns. When the enemy is not an Elite or Boss monster, ignores damage share.",
      "scope": "nonEliteBoss",
      "ignoreDamageSharing": true,
      "ignoreDamageReduction": false
    }
  },
  "c5089": {
    "S3": {
      "description": "After granting increased Attack to the caster for 3 turns, attacks the enemy by exploiting their weakness. When the target is a Hero, ignores damage reduction and damage sharing effect. When the target's max Health is greater than the caster's max Health, penetrates Defense proportionally, up to 100%. A successful attack always results in a critical hit.",
      "scope": "hero",
      "ignoreDamageSharing": true,
      "ignoreDamageReduction": true
    }
  },
  "c1178": {
    "S3": {
      "description": "After granting increased Attack to the caster for 3 turns, attacks the enemy by releasing the force of the netherworld. When the target is a hero, ignores damage share. Begins the first battle with a full skill cooldown count.",
      "scope": "hero",
      "ignoreDamageSharing": true,
      "ignoreDamageReduction": false
    }
  },
  "c1134": {
    "S3": {
      "description": "Attacks the enemy together with Alphonse, and increase Combat Readiness by 50%. When the enemy is not an Elite or Boss monster, damage sharing effects are ignored. Damage dealt increases proprotional to the caster's max Health. Damage dealt increases every time this skill is used and can stack up to 3 times.",
      "scope": "nonEliteBoss",
      "ignoreDamageSharing": true,
      "ignoreDamageReduction": false
    }
  },
  "c2012": {
    "S3": {
      "description": "Attacks the enemy with a lethal hit, and absorbs some of the damage as Health, and when the enemy is defeated, inflicts extinction. When the target is a Hero, ignores damage sharing. Penetrates Defense, and cannot trigger a critical hit or a heavy blow. Damage dealt increases proportional to the caster's max Health. Begins the first battle with full skill cooldown count.",
      "scope": "hero",
      "ignoreDamageSharing": true,
      "ignoreDamageReduction": false
    }
  },
  "c2080": {
    "S3": {
      "description": "Attacks the enemy with a pistol. When the target is not an Elite or Boss monster, ignores damage share. When the caster's Attack is greater than the target's Attack, penetrates Defense proportionally, up to 70%.",
      "scope": "nonEliteBoss",
      "ignoreDamageSharing": true,
      "ignoreDamageReduction": false
    }
  },
  "c1103": {
    "S3": {
      "description": "Attacks the enemy repeatedly, and absorbs some of the damage dealt as Health. Grants increased Evasion and a barrier (proportional to Attack) to the caster for 2 turns. When the enemy is not an Elite or Boss monster, ignores damage sharing.",
      "scope": "nonEliteBoss",
      "ignoreDamageSharing": true,
      "ignoreDamageReduction": false
    }
  },
  "c2128": {
    "S3": {
      "description": "Attacks the enemy with a rage-filled strike. When the enemy is defeated, inflicts extinction. When the target is a Hero, ignores damage reduction and damage sharing effects. When the target is of the Light element, increases damage dealt.",
      "scope": "hero",
      "ignoreDamageSharing": true,
      "ignoreDamageReduction": true
    }
  },
  "c2099": {
    "S3": {
      "description": "With everything going as planned, attacks all enemies, and when the enemy is defeated, inflicts extinction. When the target is not an Elite or Boss monster, ignores damage sharing. When the enemy is inflicted with --target--, penetrates Defense by 80%. Damage dealt increases proportional to the caster's Speed.",
      "scope": "nonEliteBoss",
      "ignoreDamageSharing": true,
      "ignoreDamageReduction": false
    }
  },
  "c1138": {
    "S3": {
      "description": "Attacks the enemy with light, before increasing Attack of the caster and the ally with the highest Attack except for the caster for 2 turns. When the enemy is not an Elite or Boss monster, damage sharing effects are ignored. When the enemy is defeated, grants an extra turn to the caster.",
      "scope": "nonEliteBoss",
      "ignoreDamageSharing": true,
      "ignoreDamageReduction": false
    }
  }
};
