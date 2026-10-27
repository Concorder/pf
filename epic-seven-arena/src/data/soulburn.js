import {SOULBURN_DAMAGE_RULES} from './soulburnDamageRules.js';
// A description selects only a known mechanic, never executable source prose.
export function soulburnMetadata(hero,data,index) {
 const base=data.soulburn;
 if(!base)return null;
 const text=base.description.replace(/\s+/g,' ').trim();let effects=null;
 if(/^Grants? an extra turn\.?$/i.test(text))effects={extraTurn:true};
 else if(/^Ignores? Effect Resistance\.?$/i.test(text))effects={ignoreResistance:true};
 else if(/^(?:Skill cooldown is decreased|Cooldown of this skill is decreased) by 2 turns\.?$/i.test(text))effects={cooldownReduction:2};
 else if(/^Increases? effect chance to 100%\.?$/i.test(text) && data.automaticDebuffs.length && data.debuffRefs.every(id=>data.automaticDebuffs.some(e=>e.id===id)))effects={effectChance:100};
 else {
  const duration=text.match(/^Extends duration of buffs granted by this skill by ([12]) turns?(?: and grants an extra turn)?\.?$/i);
  if(duration)effects={buffDurationBonus:Number(duration[1]),extraTurn:/and grants an extra turn/i.test(text)};
 }
 if(/^Increases effect chance to 100% and ignores Effect Resistance\.?$/i.test(text) && data.automaticDebuffs.length && data.debuffRefs.every(id=>data.automaticDebuffs.some(e=>e.id===id)))effects={effectChance:100,ignoreResistance:true};
 const direct=text.replace(/--/g,'').match(/^Increases? effect chance to 100% and decreases? (Attack|Defense) of the target for (\d+) turns?\.?$/i);
 if(direct && data.automaticDebuffs.length && data.debuffRefs.every(id=>data.automaticDebuffs.some(e=>e.id===id)))effects={effectChance:100,addDebuff:{id:direct[1].toLowerCase()==='attack'?'stic_att_dn':'stic_def_dn',turns:Number(direct[2]),chance:100,count:1}};
 const numeric=SOULBURN_DAMAGE_RULES[hero.id]?.[`S${index+1}`];
 if(/^Increases? damage dealt\.?$/i.test(text) && numeric && numeric.description===data.description && numeric.sourceText===data.sourceText && numeric.baseRate===data.rate && numeric.pow===data.pow)
  effects={damage:{rate:numeric.rate,pow:numeric.pow},sourceRevision:numeric.revision};
 const executable=['supported','nonAttack'].includes(data.damageSupport);
 return {...base,supported:!!effects&&executable,effects,reason:effects ? executable ? 'Enhanced cast implemented' : 'Soulburn effect mapped; base skill is not executable yet' : 'Soulburn effect needs a reviewed execution rule or verified coefficients'};
}
export function applySoulburn(data,active=false) {
 if(!active||!data?.soulburn?.supported)return data;
 const effects=data.soulburn.effects;
 const extend=list=>(list||[]).map(e=>({...e,...(['buff','barrier'].includes(e.kind)&&effects.buffDurationBonus?{turns:e.turns+effects.buffDurationBonus}:{})}));
 const debuffs=data.automaticDebuffs.map(e=>({...e,...(effects.effectChance?{chance:effects.effectChance}:{}),...(effects.addDebuff?.id===e.id?{turns:effects.addDebuff.turns}:{})}));
 if(effects.addDebuff && !debuffs.some(e=>e.id===effects.addDebuff.id))debuffs.push({...effects.addDebuff});
 return {...data,...effects.damage,soulburnActive:true,soulburnEffects:effects,
  ignoreEffectResistance:!!effects.ignoreResistance,
  automaticDebuffs:debuffs,debuffRefs:[...new Set([...data.debuffRefs,...(effects.addDebuff?[effects.addDebuff.id]:[])])],
  nonAttack:data.nonAttack?{...data.nonAttack,extraTurn:!!data.nonAttack.extraTurn||!!effects.extraTurn,effects:extend(data.nonAttack.effects)}:null,
  earthReview:data.earthReview?{...data.earthReview,beforeEffects:extend(data.earthReview.beforeEffects),combatEffects:extend(data.earthReview.combatEffects)}:null,
  displayDescription:`${data.displayDescription || data.description}\nSoulburn (${data.soulburn.cost} souls): ${data.soulburn.description}`,
 };
}
