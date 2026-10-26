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
  }
};
