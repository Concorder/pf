// CeciliaBot debuff database snapshot, reviewed 2026-10-24.
export const DEBUFF_CATALOG = [
  {
    _id: "cmn_random_debuff3",
    id: 0,
    name: "Random Debuff",
    description: "Silence, Decrease Defense, Decrease Attack, Unhealable",
  },
  {
    _id: "stic_1402_omen",
    id: "1402",
    name: "Omen (Unique Effect)",
    description: "Something is watching.",
    src: "stic_omen_1_aura",
  },
  {
    _id: "stic_ab_up_block",
    id: 0,
    name: "Restrict",
    description:
      "Cannot receive Combat Readiness increase effects other than that provided by the Speed stat.",
  },
  {
    _id: "stic_att_dn",
    id: 0,
    name: "Decrease Attack",
    description: "Decrease Attack by 50%",
  },
  {
    _id: "stic_blaze",
    id: 0,
    name: "Burn",
    description:
      "At the start of the turn, suffers huge damage proportional to the caster's Attack.",
  },
  {
    _id: "stic_blind",
    id: 0,
    name: "Decrease Hit Chance",
    description: "Decrease Hit Chance by 50%",
  },
  {
    _id: "stic_blood",
    id: 0,
    name: "Bleed",
    description:
      "Target receives damage proportional to the caster's Attack at the start of the turn.",
  },
  {
    _id: "stic_bomb",
    id: 0,
    name: "Bomb",
    description:
      "At the end of the debuff duration, the target receives damage proportional to the caster's Attack and becomes unable to move for 1 turn. Debuff duration cannot be extended or decreased.",
  },
  {
    _id: "stic_buf_impossible",
    id: 0,
    name: "Cannot Buff",
    description: "Makes the target unable to be buffed.",
  },
  {
    _id: "stic_class_debuff_1",
    id: 0,
    name: "Class Debuff",
    description:
      "Thief, Warrior, Ranger, Mage: Decreased Attack\nKnight, Soul-Weaver: Decreased Defense",
  },
  {
    _id: "stic_collapse",
    id: 0,
    name: "Collapse",
    description:
      "Decreases max Health by 25%. This effect is doubled when applied to Heroes.",
  },
  {
    _id: "stic_crack_1_aura",
    id: 0,
    name: "Fracture (Unique Effect)",
    description:
      "Increases Attack by 20%, but decreases Defense by 5%. Can stack up to 10 times. Remains even after reviving.",
  },
  {
    _id: "stic_curse2",
    id: 0,
    name: "Curse",
    description:
      "When an ally except for the bearer is attacked, deals additional damage equivalent to 60% of damage dealt to the bearer.",
  },
  {
    _id: "stic_danger_4",
    id: 0,
    name: "Immobilize",
    description:
      "Cannot receive Combat Readiness increase effects provided by the Speed stat. Dispelled at the start of someone's fourth turn.",
  },
  {
    _id: "stic_death_0_keep",
    id: 0,
    name: "Death Sentence (Undispellable)",
    description:
      "At the start of someone's 12th turn, deals 50,000 fixed damage to the bearer. Ignores damage sharing effects. Dispelled when the caster dies.",
  },
  {
    _id: "stic_deceptive",
    id: 0,
    name: "Beguile",
    description:
      "At the end of the turn, deals additional damage to all allies of the bearer except for the target equivalent to 10% of their respective max Health. Beguile effect applies to Heroes only, and is dispelled once the effect is activated.",
  },
  {
    _id: "stic_def_dn",
    id: 0,
    name: "Decrease Defense",
    description: "Decrease Defense by 70%",
  },
  {
    _id: "stic_discharge_aura",
    id: 0,
    name: "Energy Depletion (Unique Effect)",
    description: "Decreases Attack and Speed by 50%.",
  },
  {
    _id: "stic_dizzy",
    id: 0,
    name: "Seal",
    description:
      "Passive skill effects do not activate. Applies to Heroes only.",
  },
  {
    _id: "stic_dodge_dn",
    id: 0,
    name: "Decrease Speed",
    description: "Decrease Speed by 30%",
  },
  {
    _id: "stic_dot",
    id: 0,
    name: "Poison",
    description:
      "Receives damage equivalent to 5% of max Health at the start of the turn.",
  },
  {
    _id: "stic_fear",
    id: 0,
    name: "Fear",
    description:
      "Cannot act for a certain number of turns. At the start of the turn, has a 40% chance to be dispelled.",
  },
  {
    _id: "stic_freezing",
    id: 0,
    name: "Frostbite",
    description:
      "Cannot be subject to any damage reduction or damage sharing effects. Does not affect damage suffered amount limit effect. Frostbite effect applies to Heroes only.",
  },
  {
    _id: "stic_heal_impossible",
    id: 0,
    name: "Unhealable",
    description: "Cannot receive recover Health effects.",
  },
  {
    _id: "stic_isolation",
    id: 0,
    name: "Block",
    description:
      "Unaffected by any buffs, some beneficial effects, and dispel debuff effects except when granted by the bearer. Applies to Heroes only.",
  },
  {
    _id: "stic_laceration",
    id: 0,
    name: "Laceration",
    description:
      "When attacked, increases damage suffered by 15%, and when Health is reduced, inflicts injuries equivalent to the amount of Health reduced. Applies to Heroes only.",
  },
  {
    _id: "stic_mercedes_unstable_aura",
    id: 0,
    name: "Volatility (Unique Effect)",
    description:
      "Increases Attack by 15% but increases damage suffered by 10%.",
  },
  {
    _id: "stic_nail",
    id: 0,
    name: "Magic Nail",
    description:
      "When attacked, inflicts additional damage proportional to the attacker's Attack.",
  },
  {
    _id: "stic_nocounterattack",
    id: 0,
    name: "Cannot Counterattack",
    description:
      "Disables counterattack. Cannot Counterattack does not apply to monsters.",
  },
  {
    _id: "stic_provoke",
    id: 0,
    name: "Provoke",
    description:
      "Target attacks the enemy who provoked them with a basic skill at the start of the turn.",
  },
  {
    _id: "stic_provoke_hp",
    id: 0,
    name: "Redirected Provoke",
    description:
      "At the start of the turn, forcibly uses basic attack skill on the enemy with the highest max Health.",
  },
  {
    _id: "stic_random_debuff1",
    id: 0,
    name: "Random Debuff",
    description:
      "Decreased Attack, Decrease Hit Chance, Provoke, Silence, Restrict",
  },
  {
    _id: "stic_random_debuff2",
    id: 0,
    name: "Random Debuff",
    description: "Silence, Decrease Defense, Decrease Speed",
  },
  {
    _id: "stic_random_debuff4",
    id: 0,
    name: "Random Debuff",
    description:
      "Decrease Attack, Decrease Hit Chance, Decrease Speed, Cannot Buff",
  },
  {
    _id: "stic_random_debuff5",
    id: 0,
    name: "Random Debuff",
    description: "Stun, Cannot Buff, Decrease Hit Chance, Restrict",
  },
  {
    _id: "stic_random_debuff6",
    id: 0,
    name: "Random Debuff",
    description: "Poison, Decrease Speed, Decrease Defense",
  },
  {
    _id: "stic_random_debuff7",
    id: 0,
    name: "Random Debuff",
    description: "Stun, Sleep, Redirected Provoke",
  },
  {
    _id: "stic_restrict",
    id: 0,
    name: "Bind",
    description:
      "When it's not the bearer's turn, cannot activate additional skills, counterattacks, and Dual Attacks. Applies to Heroes only.",
  },
  {
    _id: "stic_rupture",
    id: 0,
    name: "Rupture",
    description:
      "When attacked, inflicts additional damage proportional to max Health. Applies to Heroes only.",
  },
  {
    _id: "stic_silence",
    id: 0,
    name: "Silence",
    description: "The target cannot use skills that require cooldowns.",
  },
  {
    _id: "stic_sleep",
    id: 0,
    name: "Sleep",
    description:
      "Cannot act for a certain number of turns. Decreases Critical Hit Resistance and Evasion by 100%, and when suffering damage, is dispelled.",
  },
  {
    _id: "stic_stigma",
    id: 0,
    name: "Stigma",
    description:
      "Decreases amount recovered by 50% and reduces the effect of Combat Readiness increases by 50%.",
  },
  {
    _id: "stic_stun",
    id: "205",
    name: "Stun",
    description: "Cannot act for a certain number of turns.",
  },
  {
    _id: "stic_target",
    id: 0,
    name: "Target",
    description:
      "Increases damage received by the target by 15%, while decreasing Evasion by 50%.",
  },
  {
    _id: "stic_thievery_aura",
    id: "1420",
    name: "Pilfer (Unique Effect)",
    description:
      "Decreases Attack, Health, and Defense by 20%, and grants spoils to the attacker. Can only apply to Heroes and remains even after dying. Unaffected by Effect Resistance or whether the attack hits.",
  },
  {
    _id: "stic_trauma_aura",
    id: 0,
    name: "Trauma (Unique Effect)",
    description:
      "Decreases Defense by 70%, but increases Attack and Speed by 100%. If the Defense prior to the effect of trauma is 2000 or higher, the stat increase effects are doubled.",
  },
  {
    _id: "stic_vampire",
    id: 0,
    name: "Vampiric Touch",
    description: "When attacked, recovers 10% of the attacker's max Health.",
  },
  {
    _id: "stic_venom",
    id: 0,
    name: "Venom",
    description:
      "At the start of the turn, suffers damage equivalent of 10% of max Health and is inflicted with injuries proportional to damage suffered. Venom effect applies to Heroes only.",
  },
];
export const PENDING_DEBUFF_REASONS = {
  stic_1402_omen:
    "The source description does not define an executable effect.",
  stic_ab_up_block:
    "Requires skill-driven CR increases; natural speed scheduling is already separate.",
  stic_danger_4:
    "Requires global-turn expiration and freezing speed-driven readiness.",
  stic_death_0_keep:
    "Requires a verified global-turn timer and source-death cleanup.",
  stic_dizzy:
    "Requires a general passive-trigger system; EE opening grants are equipment effects.",
  stic_freezing: "Requires damage-sharing and damage-reduction systems.",
  stic_isolation:
    "Requires effect ownership rules for buffs, beneficial effects and cleansing.",
  stic_nail:
    "The description omits the damage coefficient and defense interaction.",
  stic_nocounterattack: "Counterattacks are not implemented yet.",
  stic_restrict:
    "Requires extra-attack, counterattack and Dual Attack triggers.",
  stic_rupture:
    "The description omits the max-HP coefficient and defense interaction.",
  stic_thievery_aura:
    "Requires persistent max-HP reduction, revival handling and Spoils grants.",
};
