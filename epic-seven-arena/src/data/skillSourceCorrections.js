// Root S1 attacks; the non-attack marker describes the nested Might effect.
// Classification follows the guarded CeciliaBot description; coefficients are not overridden here.
export const SKILL_SOURCE_CORRECTIONS = {
  "c1144": {
    "S1": {
      "description": "Attacks the enemy with bloodied wings, and increases Combat Readiness of the caster by 15%. When used on the caster's turn, has a 35% chance to activate Might as an extra effect. Damage dealt increases proportional to the caster's max Health.\nMight: Increases Combat Readiness of all allies by 15%.",
      "sourceText": "Skill1\natt_rate: 0.8\n!pow: 0.9\nMax Health scaling 12% (0.12 * self Max Health)\n",
      "ignoreRootNonAttackMarker": true,
      "note": "Root attack classification corrected; the conditional Might effect remains pending."
    }
  }
};
