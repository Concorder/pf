import fs from "node:fs";
import {createCatalog} from "../src/data/cecilia.js";
import {isCermiaSelfSkill} from "../src/engine/mechanics.js";
const root = new URL("../", import.meta.url);
const read = name => JSON.parse(fs.readFileSync(new URL(`public/data/${name}.json`, root)));
const snapshot = read("cecilia");
const catalog = createCatalog(read("heroes"), snapshot.heroes);
const escape = text => String(text || "").replaceAll("|", "\\|").replace(/\r?\n/g, "<br>");
const earth=process.argv.includes("--earth");
const rarity = earth || process.argv.includes("--rarity=5") ? 5 : null;
const scopedHeroes = Object.entries(catalog).filter(([,hero]) => (!rarity || hero.rarity === rarity) && (!earth || hero.attribute === "wind"));
const entries = [];
for (const [name, hero] of scopedHeroes.sort(([a],[b]) => a.localeCompare(b))) {
  for (const [key, s] of Object.entries(hero.skills || {})) {
    const gaps = [];
    const special = isCermiaSelfSkill(catalog, {name}, key);
    if (!["supported", "nonAttack"].includes(s.damageSupport) && !special && !s.passiveComplete) gaps.push(s.supportReason || "Source data unavailable");
    if (s.nonAttack?.pending.length) gaps.push(...s.nonAttack.pending);
    if (s.earthReview?.pending?.length) gaps.push(...s.earthReview.pending);
    if (s.watcherPending?.length) gaps.push(...s.watcherPending);
    if (s.sourceReview) gaps.push(s.sourceReview);
    if (s.debuffsPending) gaps.push("Unmapped/conditional debuff grants");
    if (s.soulburn) gaps.push("Soulburn enhanced execution (currently preview only)");
    // These are audit prompts, not a claim that every referenced effect is absent.
    if (!s.passive && !special && !s.nonAttack && !s.celineS1 && ![...(s.earthReview?.beforeEffects || []),...(s.earthReview?.combatEffects || [])].some(e=>["buff","barrier"].includes(e.kind)) && s.buffRefs?.length) gaps.push("Audit buff recipients, conditions and durations against implemented grants");
    if (!s.passive && s.tags?.includes("extraTurn") && !special && !s.nonAttack && !s.earthReview?.extraTurnOnKill && !s.earthReview?.extraTurnOnCritical) gaps.push("Review source-specific extra-turn execution/conditions (tag is capability metadata)");
    const ee = (hero.exclusiveEquipment?.options || []).filter(o => o.skill === key && o.support !== "supported");
    for (const option of ee) gaps.push(`EE option ${option.index + 1}: ${option.reason}`);
    if (!gaps.length) continue;
    entries.push({name, hero, key, s, gaps, ee, special});
  }
}
const out = [
  earth ? "# Unsupported and partially supported Earth 5★ skills" : rarity ? "# Unsupported and partially supported natural 5★ skills" : "# Unsupported and partially supported skills — review checklist",
  "",
  `Generated from the bundled CeciliaBot snapshot (${snapshot.fetchedAt ? new Date(snapshot.fetchedAt).toISOString() : "date unavailable"}) and current normalization rules.`,
  `Scope: **${scopedHeroes.length} heroes**, **${scopedHeroes.reduce((n,[,h]) => n + Object.keys(h.skills || {}).length,0)} skills**${rarity ? " (rarity 5 only; includes Moonlight and limited units)" : ""}.`,
  ...(earth ? ["Earth only; all remaining entries are work/research, not questions for the user."] : []),
  `Contains **${entries.length} skill entries** across **${new Set(entries.map(e => e.name)).size} heroes**.`,
  "",
  `Regenerate with \`npm run ${earth ? "report:skills:earth" : rarity ? "report:skills:nat5" : "report:skills"}\`. This is an implementation/review queue, not a list of questions you must answer. Checked-off notes should be recorded in the relevant mechanics document or rules before regeneration, which replaces this file.`,
  "",
  "## Source research queue (not questions for the user)",
  "",
  "- [ ] Laceration: verify whether additional damage causes its injury; DoT coverage is deferred (user believes DoTs do not trigger it). HP-cap clamping is confirmed NOT to cause injury.",
  ...(!rarity ? ["- [ ] Resolve Researcher Carrot S1's conflicting description/reference before enabling its remaining effects."] : []),
  "- [ ] Verify Magic Nail/Rupture coefficients and defense interactions, and Omen's actual trigger.",
  "- [ ] Confirm simultaneous reaction ordering, equal-strength protection-source selection, and AoE/death-passive ordering for affected skills.",

  "",
  "See [remaining mechanics](remaining-mechanics.md), [health rules](health-mechanics.md), and [trigger rules](triggers-and-revival.md) for context. Already confirmed injury/Collapse, Venom scaling, damage-limit/share ordering and buff sorting rules are not reopened here.",
  "",
  "Ordinary target selection, caster exclusions, buff recipients, durations and explicit trigger conditions are taken from CeciliaBot descriptions. They do not require user clarification. Damage coefficients follow e7calc. Healing/barrier metadata uses reviewed source text and max enhancements, cross-checked against e7calc where it provides those values. Ask the user only if source research leaves a genuine contradiction or undocumented interaction unresolved. See [review policy](review-policy.md).", "",
  "## How to read the skill queue",
  "",
  "- An unsupported damage formula or missing target count usually needs implementation/source verification, not user clarification.",
  "- Entries labelled **Base damage supported; secondary effects pending** remain only for the listed remaining mechanics. Their coefficient text is included as a reference, not an unsupported-formula warning.",
  "- Supported base damage does not certify all secondary effects. Buff audit prompts flag references for review; some grants may already work. The report cannot prove complete semantic coverage from prose.",
  "- Passive support reasons describe implemented portions and remaining gaps. A passive entry does not mean all its mechanics are missing.",
  "- Soulburn, tags and manual status controls do not imply automatic skill execution. Conditional/form-specific reactions still require reviewed handlers.",
  "- Entries without a detected gap are omitted, but are not thereby certified fully supported. This inventory is based on explicit support flags plus targeted audit prompts, not exhaustive prose interpretation.",
  "- Descriptions below use awakened, maximum-enhancement display values. EE options are listed independently of which option a player equips.",
  "",
  "## Skills",
  "",
];
let previous;
for (const {name, hero, key, s, gaps, ee, special} of entries) {
  if (name !== previous) {out.push(`### ${name} (${hero.code || "unknown ID"})`, "");previous=name;}
  out.push(`- [ ] **${key} — ${s.name || "Unknown skill"}** — ${s.nonAttack ? "Non-attack cast supported; remaining effects listed below" : s.damageSupport === "supported" ? "Base damage supported; secondary effects pending" : special ? "Self-buff execution supported; remaining effects pending" : s.passive ? "Passive partially implemented or pending" : "Skill execution unsupported"}`,
    `  - Current base support: ${s.damageSupport || "unknown"}. ${escape(s.supportReason)}`,
    ...gaps.map(g => `  - Review/work: ${escape(g)}`),
    `  - Description: ${escape(s.displayDescription || s.description || "No source description available.")}`);
  if (s.earthReview) out.push(`  - Reviewed Earth effects: ${[...(s.earthReview.beforeEffects || []),...(s.earthReview.combatEffects || []),...(s.earthReview.openingEffects || []),...(s.earthReview.turnStartEffects || [])].map(e=>e.kind).filter((v,i,a)=>a.indexOf(v)===i).join(", ") || "conditional/passive execution"}.`);
  if (s.celineS1) out.push("  - Implemented: buff-dependent Nimble Sword (except Dual Attacks), pre-hit Attack Up, 50% penetration, 25% lifesteal, and no outgoing Dual Attack in Nimble Sword form.");
  if (s.watchers?.length) out.push(`  - Implemented watchers: ${s.watchers.map(w => w.id).join(", ")}.`);
  if (s.damageSource) out.push(`  - Reviewed damage source: [${s.damageSource.provider}](${s.damageSource.url}), revision ${s.damageSource.revision}.`);
  if (s.resource) out.push(`  - Resource: ${s.resource.type}; base gain ${s.resource.gain}; required/spent ${s.resource.cost}${s.resource.criticalGainMultiplier ? "; critical-hit gain ×" + s.resource.criticalGainMultiplier : ""}${s.resource.outsideTurnGainMultiplier ? "; out-of-turn gain ×" + s.resource.outsideTurnGainMultiplier : ""}.`);
  if (s.resourcePassive) out.push(`  - Implemented resource passive portions: ${[s.resourcePassive.opening && "battle-start grant",s.resourcePassive.turnStart && "turn-start grant",s.resourcePassive.enemyGainMultiplier && "enemy gain blocking"].filter(Boolean).join(", ")}. Other passive effects still require separate handlers.`);
  if (s.sourceText) out.push(`  - ${s.nonAttack ? "Non-attack source note (no damage formula)" : s.damageSupport === "supported" ? "Supported damage formula (reference only)" : "Source multiplier text (requires review)"}: ${escape(s.sourceText)}`);
  if (s.unparsed?.length) out.push(`  - Unparsed formula lines: ${s.unparsed.map(escape).join("; ")}`);
  if (s.soulburn) out.push(`  - Soulburn (${s.soulburn.cost} souls): ${escape(s.soulburn.description)}`);
  for (const option of ee) out.push(`  - EE ${option.index + 1}: ${escape(option.displayDescription || option.description)}`);
  out.push("");
}
const filename = earth ? "docs/unsupported-earth-skills.md" : rarity ? "docs/unsupported-nat5-skills.md" : "docs/unsupported-skills.md";
fs.writeFileSync(new URL(filename, root), out.join("\n"));
console.log(`Wrote ${filename}: ${entries.length} skills, ${new Set(entries.map(e => e.name)).size} heroes.`);
