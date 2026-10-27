import {REVIEWED_DAMAGE_RULES} from "./reviewedDamageRules.js";
export function reviewedDamage(hero,skill,index) {
  const rule=REVIEWED_DAMAGE_RULES[hero.id]?.[`S${index+1}`];
  if (!rule || skill.passive || rule.description !== String(skill.description || "").replace(/[*+_]/g,"") || rule.sourceText !== skill.multipliers) return null;
  const requiredScope=rule.targets===3?"cmn_aoe":"cmn_single_target";
  if (!(skill.common || []).some(c=>c._id===requiredScope)) return null;
  const {description,sourceText,targets,...values}=structuredClone(rule);
  return {...values,damageSupport:"supported",supportReason:values.celineS1 ? "Reviewed e7calc Mighty Strike / Nimble Sword" : "Reviewed e7calc conditional damage",unparsed:[]};
}
