// Reviewed watcher portions; add filters and handlers as each kit requires them.
export const PASSIVE_WATCHER_RULES = {
  "c1092": {
    "S2": {
      "description": "When an enemy uses a non-attack skill, increases Combat Readiness of the caster by 20% and gains 20 Fighting Spirit. When suffering an attack that targets all allies, activates Volcanic Viper against the attacker. This effect is not activated by a counterattack, Dual Attack, or extra attack. Each effect can only be activated once every 2 turns.\nVolcanic Viper (gains 2 Soul): Launches the enemy into the air and attacks repeatedly, inflicting --silence-- for 2 turns. Damage dealt increases proportional to the target's max Health.",
      "watchers": [
        {
          "id": "sol-enemy-non-attack",
          "event": "skillUsed",
          "actorRelation": "enemy",
          "tagsAll": [
            "nonAttack"
          ],
          "kind": "passive",
          "handler": "solNonAttack",
          "cooldown": 2,
          "cooldownSkill": "S2"
        }
      ],
      "pending": [
        "Volcanic Viper reaction to incoming all-enemies attacks"
      ]
    }
  },
  "c2095": {
    "S2": {
      "description": "Starts the first battle with {{variable}} Fighting Spirit. When an enemy's turn ends, gains 10 Fighting Spirit for each debuff inflicted on an ally, and when the caster's Fighting Spirit is full, consumes all Fighting Spirit to dispel all debuffs from the caster and grants increased Defense and immunity for 1 turn before increasing Combat Readiness by 40%.",
      "requiresBuffs": [
        "stic_def_up",
        "stic_debuf_impossible"
      ],
      "complete": true,
      "requiresOpening": true,
      "watchers": [
        {
          "id": "designer-lilibet-enemy-turn-end",
          "event": "turnEnd",
          "actorRelation": "enemy",
          "kind": "passive",
          "handler": "designerTurnEnd",
          "cooldown": 0
        }
      ]
    }
  },
  "c2091": {
    "S2": {
      "description": "At the start of battle, grants Star's Blessing for 1 turn. When the caster is granted Star's Blessing, enemy Heroes cannot counterattack. After an ally except for the caster uses an attack that targets all enemies, activates Worship Me!.\nWorship Me! (gains 10 Soul): Increases Combat Readiness of the caster by 20%.",
      "watchers": [
        {
          "id": "astromancer-elena-ally-aoe",
          "event": "skillUsed",
          "actorRelation": "allyExceptSelf",
          "tagsAll": [
            "attack",
            "allEnemiesAttack"
          ],
          "kind": "additional",
          "handler": "astromancerWorship",
          "cooldownSkill": "S2"
        }
      ],
      "pending": [
        "Star's Blessing opening grant and conditional enemy counterattack blocking"
      ]
    }
  },
  "c1124": {
    "S2": {
      "description": "Attack increases by 30%. When attacking, cannot trigger a critical hit. At the end of an enemy's turn, when the target is granted a barrier, increases Combat Readiness of the caster by {{variable}}.",
      "watchers": [
        {
          "id": "arunka-enemy-barrier",
          "event": "turnEnd",
          "actorRelation": "enemy",
          "kind": "passive",
          "handler": "arunkaBarrier",
          "cooldown": 0
        }
      ],
      "pending": [
        "Attack +30% and no critical hits are implemented by the reviewed passive stat rule"
      ]
    }
  },
  "c1016": {
    "S3": {
      "description": "After granting increased Attack to the caster for 2 turns, attacks the enemy with a massive blade. When the enemy is defeated, grants an extra turn. When the target has a debuff, increases damage dealt. When this skill is not on cooldown, after an ally except for the caster uses a skill, if the enemy has a debuff, increases Combat Readiness of the caster by 20%.",
      "allowActive": true,
      "watchers": [
        {
          "id": "yufine-ready-ally-skill",
          "event": "skillUsed",
          "actorRelation": "allyExceptSelf",
          "kind": "passive",
          "handler": "yufineReady",
          "cooldown": 0
        }
      ],
      "pending": []
    }
  },
  "c1102": {
    "S2": {
      "description": "When an ally is attacked by an extra attack, counterattack, or Dual Attack, recovers Health of all allies proportional to the caster\u2019s max Health and the number of attacked allies, and increases Combat Readiness of each by 5% per attacked ally.",
      "complete": true,
      "watchers": [
        {
          "id": "roana-secondary-attack",
          "event": "skillUsed",
          "actorRelation": "enemy",
          "kind": "passive",
          "handler": "roanaSecondary",
          "cooldown": 0,
          "kindsAny": [
            "additional",
            "counter",
            "dual"
          ],
          "baseHealRatio": 0.05
        }
      ],
      "sourceText": "Skill2\nHeal strength: 5-7.75% self max Health \nmaybe per unit hit, too lazy to figure out"
    }
  },
  "c5082": {
    "S2": {
      "description": "After an enemy uses a non-attack skill, gains 2 Focus and increases Combat Readiness of the caster by {{variable}}. Can only be activated once every 2 turns. After using a skill, when Focus is full, consumes all Focus and activates Luluca's Special Delivery.\nLuluca's Special Delivery: Attacks all enemies who are interrupting her delivery, dispelling two buffs and an 85% chance to inflict --silence-- for 1 turn and a 100% chance to --decrease Hit Chance-- for 2 turns, before decreasing skill cooldowns of the caster by 1 turn.",
      "watchers": [
        {
          "id": "ocean-luluca-enemy-non-attack",
          "event": "skillUsed",
          "actorRelation": "enemy",
          "kind": "passive",
          "handler": "oceanLulucaNonAttack",
          "cooldown": 0,
          "tagsAll": [
            "nonAttack"
          ],
          "cooldownSkill": "S2",
          "crVariable": 0
        }
      ],
      "pending": [
        "Full-Focus Special Delivery additional attack"
      ]
    }
  }
};
