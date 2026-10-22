'use strict';
const $ = id => document.getElementById(id);
const clone = value => JSON.parse(JSON.stringify(value));
const SIDES = ['left', 'right'];
const FIELDS = {hp:['Health',1,100000],atk:['Attack',1,20000],def:['Defense',0,10000],spd:['Speed',1,500],chc:['Crit chance %',0,100],chd:['Crit damage %',100,350],eff:['Effectiveness %',0,500],efr:['Resistance %',0,500]};
let heroes, teams, battle = null, history = [], editing = null, selectedSkill = 'S1', drag = null, inspected = null;
let savedDraft;
try { savedDraft = JSON.parse(localStorage.getItem('e7-lab-builds-v1')); } catch {}
const escapeHTML = text => String(text).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const teamName = side => side === 'left' ? 'Your team' : 'Opponent';
const toast = msg => { $('toast').textContent=msg; $('toast').style.display='block'; clearTimeout(toast.timer); toast.timer=setTimeout(()=>$('toast').style.display='none',3500); };
function baseStats(name) {
 const d=heroes[name].calculatedStatus?.lv60SixStarFullyAwakened || heroes[name].calculatedStatus?.lv50FiveStarFullyAwakened || {};
 return {hp:d.hp||5000,atk:d.atk||1000,def:d.def||500,spd:d.spd||100,chc:Math.round((d.chc||.15)*100),chd:Math.round((d.chd||1.5)*100),eff:Math.round((d.eff||0)*100),efr:Math.round((d.efr||0)*100)};
}
function presetStats(name,preset) {
 const s=baseStats(name);
 if(preset==='damage')Object.assign(s,{hp:12000,atk:3500,def:1000,spd:200,chc:100,chd:280});
 if(preset==='tank')Object.assign(s,{hp:25000,atk:1500,def:1800,spd:180,chc:15,chd:150});
 if(preset==='speed')Object.assign(s,{hp:17000,atk:1800,def:1300,spd:270,chc:15,chd:150,eff:100});
 return s;
}
function makeHero(name,preset='damage') { return {name,stats:presetStats(name,preset),artifact:'',artifactSouls:0,skills:{S1:{gain:1,cost:0,cd:0},S2:{gain:0,cost:0,cd:0},S3:{gain:0,cost:0,cd:0}}}; }
function persist(){try{localStorage.setItem('e7-lab-builds-v1',JSON.stringify(teams));}catch{toast('Browser storage unavailable. Builds will last for this session.');}}
function roster(){return battle ? battle.units : SIDES.flatMap(side=>teams[side].map((h,slot)=>h?{...h,side,slot,id:`${side}-${slot}`,currentHp:h.stats.hp}:null).filter(Boolean));}
function avatar(img,name){img.src='data/portraits/'+heroes[name].code+'.png';img.alt=name;img.onerror=()=>{img.onerror=null;img.src='data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90"><rect width="90" height="90" fill="#273a34"/><text x="45" y="57" text-anchor="middle" font-size="30" fill="#c4ed9b">${name.slice(0,1).replace(/[^a-zA-Z]/g,'✧')}</text></svg>`);};}
function render(){
 const units=roster();
 for(const side of SIDES){
  $(side).replaceChildren();
  teams[side].forEach((h,slot)=>{
   const card=document.createElement('button');card.type='button';card.className='hero-card';card.dataset.side=side;card.dataset.slot=slot;const position=['Back','Upper','Front','Lower'][slot];
   if(!h){card.classList.add('empty-slot');card.setAttribute('aria-label',`${teamName(side)} empty ${position.toLowerCase()} position`);card.innerHTML=`<span class="slot-number">${position.toUpperCase()}</span><span class="plus">＋</span><small>EMPTY POSITION</small>`;card.onclick=()=>{if(battle)return toast('Reset the battle to change formation.');toast('Drag a hero here, or use “Move to empty slot” in their editor.');};}
   else {
    const unit=units.find(u=>u.side===side&&u.slot===slot), hp=unit.currentHp, max=h.stats.hp, data=heroes[h.name], cr=readiness(unit);
    card.setAttribute('aria-label',`${h.name}, ${hp} of ${max} health, ${teamName(side)}, ${position.toLowerCase()} position`);
    card.innerHTML=`<div class="unit-status"><span class="unit-level">60</span><div class="unit-bars"><div class="health"><span style="width:${Math.max(0,hp/max*100)}%"></span></div><div class="unit-cr"><span style="width:${cr}%"></span></div></div><span class="hp-text">${hp.toLocaleString()} / ${max.toLocaleString()}</span></div><div class="unit-portrait-wrap"><img class="portrait"><span class="unit-shadow"></span>${battle?.active===unit.id?'<span class="active-indicator">▾</span>':''}</div><span class="hero-name">${escapeHTML(h.name)}</span><span class="hero-role">${escapeHTML(data.attribute)} · ${escapeHTML(data.role)}</span><span class="position-tag">${position.toUpperCase()}</span>`;
    avatar(card.querySelector('img'),h.name);
    if(hp<=0)card.classList.add('dead');
    if(battle?.active===unit.id)card.classList.add('active-card');
    card.draggable=!battle;
    card.ondragstart=()=>{drag={side,slot};};
    card.onclick=()=>{if(!battle)return openEditor(side,slot);if(unit.side!==activeUnit()?.side&&hp>0){$('target').value=unit.id;$('target').dataset.previous=unit.id;highlightTarget();toast(`${unit.name} targeted`);}else toast('Reset the battle to edit builds.');};
   }
   card.ondragover=e=>{if(!battle)e.preventDefault();};
   card.ondrop=e=>{e.preventDefault();if(!drag||battle||drag.side!==side)return;[teams[side][slot],teams[side][drag.slot]]=[teams[side][drag.slot],teams[side][slot]];drag=null;persist();render();};
   $(side).append(card);
  });
 }
 $('battleControls').hidden=false;$('arena').classList.toggle('in-battle',!!battle);
 $('start').disabled=!!battle;
 $('setupTab').classList.toggle('selected',!battle);$('battleTab').classList.toggle('selected',!!battle);
 $('status').textContent=battle?(battle.winner?`${teamName(battle.winner).toUpperCase()} WINS`:'BATTLE IN PROGRESS'):'PREPARING THE ARENA';
 $('round').textContent=battle?`TURN ${battle.turn} · ${battle.units.filter(u=>u.currentHp>0).length} HEROES STANDING`:'3 V 3 · FORMATION';
 $('hint').textContent=battle?'Choose a skill and target. You control both teams.':'Select a hero to customize their build. Drag heroes between formation slots.';
 for(const side of SIDES)if(battle)$(`souls-${side}`).value=battle.souls[side];
 renderControls();renderReadiness();renderLog();
}
function openEditor(side,slot){
 editing={side,slot};inspected=`${side}-${slot}`;renderControls();const h=teams[side][slot];$('heroChoice').value=h.name;
 fillEditor(h);$('editor').showModal();
}
function fillEditor(h){
 $('statFields').innerHTML=Object.entries(FIELDS).map(([key,[label,min,max]])=>`<label>${label}<input name="${key}" type="number" min="${min}" max="${max}" required value="${h.stats[key]}"></label>`).join('');
 $('artifact').value=h.artifact;$('artifactSouls').value=h.artifactSouls;
 $('skillFields').innerHTML=['S1','S2','S3'].map(s=>`<div class="skill-setting"><b>${s}</b>${[['gain','Souls gained'],['cost','Soul cost'],['cd','Cooldown turns']].map(([k,l])=>`<label>${l}<input id="${s}-${k}" type="number" min="0" max="${k==='cd'?20:99}" required value="${h.skills[s][k]}"></label>`).join('')}</div>`).join('');
}
$('heroChoice').onchange=()=>{const h=makeHero($('heroChoice').value,'base');fillEditor(h);};
for(const b of document.querySelectorAll('[data-preset]'))b.onclick=()=>{const s=presetStats($('heroChoice').value,b.dataset.preset);for(const k in FIELDS)$('editForm').elements[k].value=s[k];};
$('close').onclick=()=>$('editor').close();
$('editor').addEventListener('click',e=>{if(e.target===$('editor')){const r=$('editor').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('editor').close();}});
$('editForm').onsubmit=e=>{
 e.preventDefault();const {side,slot}=editing,name=$('heroChoice').value;
 if(teams[side].some((h,i)=>h&&i!==slot&&h.name===name))return toast('Choose a different hero. Each team needs three unique heroes.');
 const h=makeHero(name);for(const k in FIELDS)h.stats[k]=Number($('editForm').elements[k].value);
 h.artifact=$('artifact').value.trim();h.artifactSouls=Number($('artifactSouls').value);
 for(const s of ['S1','S2','S3'])for(const k of ['gain','cost','cd'])h.skills[s][k]=Number($(`${s}-${k}`).value);
 teams[side][slot]=h;persist();$('editor').close();render();toast('Hero build saved.');
};
$('emptySlot').onclick=()=>{const {side,slot}=editing,empty=teams[side].indexOf(null);if(empty<0)return;teams[side][empty]=teams[side][slot];teams[side][slot]=null;persist();$('editor').close();render();};
for(const b of document.querySelectorAll('[data-edit]'))b.onclick=()=>{if(battle)return toast('Reset the battle to edit teams.');const side=b.dataset.edit;openEditor(side,teams[side].findIndex(Boolean));};
function activeUnit(){return battle?.units.find(u=>u.id===battle.active);}
function addLog(message,details=''){battle.log.unshift({message,details,turn:battle.turn});}
function nextTurn(){
 const live=battle.units.filter(u=>u.currentHp>0);
 const side=SIDES.find(s=>!live.some(u=>u.side===s));
 if(side){battle.winner=side==='left'?'right':'left';battle.active=null;addLog(`${teamName(battle.winner)} wins.`, 'Reset to try a different matchup.');return;}
 const next=[...live].sort((a,b)=>a.readyAt-b.readyAt||b.stats.spd-a.stats.spd||a.id.localeCompare(b.id))[0];
 battle.active=next.id;battle.time=next.readyAt;battle.turn++;
 for(const s of ['S1','S2','S3'])next.cooldowns[s]=Math.max(0,next.cooldowns[s]-1);
 selectedSkill=['S1','S2','S3'].find(s=>canUse(next,s))||'wait';
}
function startBattle(){
 const units=clone(roster());
 for(const u of units){u.readyAt=10000/u.stats.spd;u.cooldowns={S1:0,S2:0,S3:0};}
 battle={units,turn:0,time:0,active:null,log:[],winner:null,souls:{},initialSouls:Object.fromEntries(SIDES.map(side=>[side,Math.max(0,Math.min(99,Math.floor(Number($(`souls-${side}`).value)||0)))]))};
 for(const side of SIDES)battle.souls[side]=Math.min(99,Math.max(0,Number($(`souls-${side}`).value)||0)+units.filter(u=>u.side===side).reduce((sum,u)=>sum+u.artifactSouls,0));
 history=[];addLog('The battle begins.','Starting souls include each hero’s configured artifact contribution. No automatic passive or artifact effects.');nextTurn();render();
}
$('start').onclick=startBattle;
$('battleTab').onclick=()=>{if(!battle)toast('Set up your teams, then click Start battle.');else $('battleControls').scrollIntoView({behavior:'smooth',block:'center'});};
function resetBattle(){if(battle)for(const side of SIDES)$(`souls-${side}`).value=battle.initialSouls[side];battle=null;history=[];render();toast('Battle reset. Your builds are kept.');}
$('reset').onclick=resetBattle;
$('setupTab').onclick=()=>{if(battle)toast('Use Reset battle to return to formation.');};
for(const side of SIDES)$(`souls-${side}`).onchange=e=>{
 const souls=Math.max(0,Math.min(99,Math.floor(Number(e.target.value)||0)));e.target.value=souls;
 if(battle){history.push(clone(battle));battle.souls[side]=souls;addLog(`${teamName(side)} souls set to ${souls}.`,'Manual adjustment');renderLog();renderControls();}
};
function skillData(u,s){return heroes[u.name].skills?.[s];}
function canUse(u,s){if(s==='wait')return true;const d=skillData(u,s);return !!d&&Number.isFinite(d.rate)&&d.rate>0&&Number.isFinite(d.pow)&&d.pow>0&&!u.cooldowns[s]&&battle.souls[u.side]>=u.skills[s].cost;}
function readiness(unit){
 if(unit.currentHp<=0)return 0;
 if(!battle){const fastest=Math.max(...roster().map(u=>u.stats.spd));return unit.stats.spd/fastest*100;}
 return Math.min(100,Math.max(0,100-(unit.readyAt-battle.time)*unit.stats.spd/100));
}
function renderReadiness(){
 const track=$('turnOrder');track.replaceChildren();
 const live=roster().filter(u=>u.currentHp>0).sort((a,b)=>readiness(a)-readiness(b)||a.stats.spd-b.stats.spd||b.id.localeCompare(a.id));
 const height=track.clientHeight||240, gap=Math.min(35,(height-12)/Math.max(1,live.length-1));
 const positions=[];
 for(let i=0;i<live.length;i++)positions[i]=Math.max(8+readiness(live[i])/100*(height-16),i?positions[i-1]+gap:8);
 if(positions.length&&positions.at(-1)>height-8){positions[positions.length-1]=height-8;for(let i=positions.length-2;i>=0;i--)positions[i]=Math.min(positions[i],positions[i+1]-gap);}
 live.forEach((u,i)=>{
  const marker=document.createElement('button');marker.type='button';marker.className='cr-marker'+(u.side==='right'?' enemy-marker':'')+(u.id===battle?.active?' is-active':'');marker.style.top=`${positions[i]}px`;
  const cr=Math.round(readiness(u));marker.setAttribute('aria-label',`${u.name}, ${teamName(u.side)}, ${cr}% combat readiness`);marker.title=`${u.name} · ${teamName(u.side)} · ${cr}% CR${!battle?' · starting order':''}`;
  marker.innerHTML=`<img alt=""><span class="cr-value">${cr}%</span>`;avatar(marker.querySelector('img'),u.name);
  marker.onclick=()=>{if(!battle)openEditor(u.side,u.slot);else if(u.side!==activeUnit()?.side){$('target').value=u.id;$('target').dataset.previous=u.id;highlightTarget();}};track.append(marker);
 });
}
function highlightTarget(){
 document.querySelectorAll('.hero-card').forEach(card=>card.classList.toggle('target-card',!!battle&&!battle.winner&&`${card.dataset.side}-${card.dataset.slot}`===$('target').value));
}
const SKILL_ICONS={S1:'<path d="M14 37L36 8l4-2-1 5-22 29-7 1 2-7M12 31l12 9M8 42l8-8"/>',S2:'<path d="M24 5l15 6v12c0 9-8 15-15 20-7-5-15-11-15-20V11zM24 14v18M16 23h16"/><circle cx="24" cy="23" r="12"/>',S3:'<path d="M24 4l4 13 14-3-9 11 8 11-14-3-4 12-4-13-14 2 9-10-7-11 13 4z"/><circle cx="24" cy="24" r="6"/>'};
function renderControls(){
 $('undo').disabled=!history.length;
 const unit=activeUnit(), preview=unit||roster().find(u=>u.id===inspected)||roster().find(u=>u.currentHp>0)||roster()[0];
 if(!preview)return;
 avatar($('activePortrait'),preview.name);
 $('activeName').textContent=preview.name;
 $('activeSide').textContent=battle?(battle.winner?`${teamName(battle.winner)} wins`:`${teamName(preview.side)} · CURRENT TURN`):`${teamName(preview.side)} · SELECTED HERO`;
 $('activeHp').textContent=`${preview.currentHp.toLocaleString()} / ${preview.stats.hp.toLocaleString()}`;
 $('activeSpeed').textContent=`${preview.stats.spd} SPD`;
 $('activeHealthFill').style.width=`${preview.currentHp/preview.stats.hp*100}%`;
 $('skills').replaceChildren();
 for(const skill of ['S1','S2','S3']){
  const b=document.createElement('button'),d=skillData(preview,skill),cooldown=unit?.cooldowns[skill]||0;
  b.className='skill-button';b.type='button';b.setAttribute('aria-label',`${skill}${cooldown?`, ${cooldown} turns remaining`:''}`);b.classList.toggle('selected',selectedSkill===skill);b.disabled=!unit||!canUse(unit,skill);
  b.innerHTML=`<svg viewBox="0 0 48 48" aria-hidden="true">${SKILL_ICONS[skill]}</svg><span class="skill-key">${skill}</span>${cooldown?`<span class="skill-cooldown">${cooldown}</span>`:''}`;
  b.title=!d?.rate?'Passive or unsupported action':`${d.targets||1} target(s) · ATK rate ${d.rate} · POW ${d.pow} · +${preview.skills[skill].gain} souls · cost ${preview.skills[skill].cost}${d.note?' · '+d.note:''}`;
  b.onclick=()=>{selectedSkill=skill;renderControls();};$('skills').append(b);
 }
 $('pass').disabled=!unit;
 $('target').replaceChildren();
 if(!unit){$('cast').disabled=true;$('target').disabled=true;$('hit').disabled=true;const o=document.createElement('option');o.textContent=battle?.winner?'Battle complete':'Start battle to choose';$('target').append(o);$('skillSummary').textContent=battle?.winner?'Reset to try another matchup':'Start the battle to use skills';highlightTarget();return;}
 const previous=$('target').dataset.previous;
 for(const u of battle.units.filter(u=>u.side!==unit.side&&u.currentHp>0)){
  const o=document.createElement('option');o.value=u.id;o.textContent=`${u.name} · ${u.currentHp.toLocaleString()} HP`;$('target').append(o);
 }
 if([...$('target').options].some(o=>o.value===previous))$('target').value=previous;
 $('target').disabled=selectedSkill==='wait';$('hit').disabled=selectedSkill==='wait';$('cast').disabled=!canUse(unit,selectedSkill);
 $('cast').textContent=selectedSkill==='wait'?'Pass turn →':'Use skill →';
 const d=skillData(unit,selectedSkill),settings=unit.skills[selectedSkill];
 $('skillSummary').textContent=d&&settings?`${selectedSkill} · ${d.targets||1} target${d.targets>1?'s':''} · +${settings.gain} souls${settings.cost?` · ${settings.cost} soul cost`:''}${settings.cd?` · ${settings.cd} turn cooldown`:''}`:'No available damage skill · pass turn';
 highlightTarget();
}
$('target').onchange=e=>{$('target').dataset.previous=e.target.value;highlightTarget();};
$('pass').onclick=()=>{if(!activeUnit())return;selectedSkill='wait';$('cast').onclick();};
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('arena').requestFullscreen();}catch{toast('Fullscreen is unavailable in this browser.');}};
new ResizeObserver(()=>{if(teams)renderReadiness();}).observe($('scene'));
function damage(attacker,defender,d,hit){
 const a=attacker.stats,t=defender.stats;
 const attack=a.atk*d.rate*(1+a.spd*(d.selfSpdScaling||0));
 const scaling=a.hp*(d.selfHpScaling||0)+a.def*(d.selfDefScaling||0)+t.hp*(d.targetHpScaling||0);
 const penetration=Math.max(0,Math.min(1,d.penetration||0));
 const hitMultiplier=hit==='crit'?a.chd/100:hit==='miss'?.75:1;
 return Math.max(0,Math.floor((attack+scaling)*1.871*d.pow*hitMultiplier/(1+t.def*(1-penetration)/300)));
}
$('cast').onclick=()=>{
 const u=activeUnit();if(!u||!canUse(u,selectedSkill))return;
 const s=selectedSkill;history.push(clone(battle));
 if(s==='wait')addLog(`${u.name} passes.`,`${teamName(u.side)} · no souls gained`);
 else{
  const d=skillData(u,s),target=battle.units.find(t=>t.id===$('target').value&&t.currentHp>0&&t.side!==u.side);
  if(!target){history.pop();return toast('Choose a living enemy target.');}
  const enemies=battle.units.filter(t=>t.currentHp>0&&t.side!==u.side), targets=[target,...enemies.filter(t=>t.id!==target.id)].slice(0,Math.max(1,d.targets||1));
  const results=[];for(const t of targets){const amount=damage(u,t,d,$('hit').value);t.currentHp=Math.max(0,t.currentHp-amount);results.push(`${t.name}: ${amount.toLocaleString()} damage${t.currentHp===0?' · defeated':''}`);}
  battle.souls[u.side]=Math.min(99,battle.souls[u.side]-u.skills[s].cost+u.skills[s].gain);
  u.cooldowns[s]=u.skills[s].cd+1;
  addLog(`${u.name} uses ${s}. ${results.join(' / ')}`,`${teamName(u.side)} · ${$('hit').value} hit · +${u.skills[s].gain} / −${u.skills[s].cost} souls · simplified damage${d.note?' · source note: '+d.note:''}`);
 }
 u.readyAt=battle.time+10000/u.stats.spd;nextTurn();render();
};
$('undo').onclick=()=>{if(!history.length)return;battle=history.pop();const u=activeUnit();selectedSkill=u?['S1','S2','S3'].find(s=>canUse(u,s))||'wait':'wait';render();};
function renderLog(){
 if(!battle){$('log').innerHTML='<div class="empty-log"><span>☷</span><div>The arena is yours.<p>Start a battle to see actions and damage here.</p></div></div>';$('eventCount').textContent='LIVE LOG';return;}
 $('log').innerHTML=battle.log.map(e=>`<div class="log-entry"><small>TURN ${String(e.turn).padStart(2,'0')} · ${escapeHTML(e.details)}</small>${escapeHTML(e.message)}</div>`).join('');$('eventCount').textContent=`${battle.log.length} EVENTS`;
}
async function init(){
 try{
  const response=await fetch('data/heroes.json');if(!response.ok)throw Error(`HTTP ${response.status}`);heroes=await response.json();
  const choices=Object.keys(heroes).filter(n=>heroes[n].calculatedStatus).sort();
  for(const name of choices){const o=document.createElement('option');o.value=name;o.textContent=name;$('heroChoice').append(o);}
  const valid=savedDraft&&SIDES.every(s=>Array.isArray(savedDraft[s])&&savedDraft[s].length===4&&savedDraft[s].filter(Boolean).length===3&&new Set(savedDraft[s].filter(Boolean).map(h=>h.name)).size===3&&savedDraft[s].every(h=>!h||heroes[h.name]&&h.stats&&Object.keys(FIELDS).every(k=>Number.isFinite(h.stats[k])&&h.stats[k]>=FIELDS[k][1]&&h.stats[k]<=FIELDS[k][2])&&Number.isFinite(h.artifactSouls)&&h.artifactSouls>=0&&h.artifactSouls<=99&&['S1','S2','S3'].every(skill=>h.skills?.[skill]&&['gain','cost','cd'].every(k=>Number.isFinite(h.skills[skill][k])&&h.skills[skill][k]>=0&&h.skills[skill][k]<=(k==='cd'?20:99)))));
  teams=valid?savedDraft:{left:[makeHero('Vildred'),makeHero('Mercedes'),makeHero('Ras','tank'),null],right:[makeHero('Cermia'),null,makeHero('Luna'),makeHero('Arbiter Vildred')]};
  render();
 }catch(e){$('status').textContent='HERO DATA COULD NOT LOAD';$('start').disabled=true;$('hint').textContent='Serve this folder over HTTP, then reload. '+e.message;toast('Could not load local hero data.');}
}
init();
