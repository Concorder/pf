import fs from "node:fs";
import {createCatalog} from "../src/data/cecilia.js";
const root = new URL("../", import.meta.url);
const read = name => JSON.parse(fs.readFileSync(new URL(`public/data/${name}.json`, root)));
const baseline = read("heroes"), snapshot = read("cecilia"), catalog = createCatalog(baseline, snapshot.heroes);
const heroes = Object.values(catalog).filter(h => h.rarity === 5).sort((a,b) => a.name.localeCompare(b.name));
const counts = {}, blockers = {}, resources = [];
for (const h of heroes) {
  if (h.resourceType) resources.push(h);
  for (const [key,s] of Object.entries(h.skills)) {
    counts[s.damageSupport] = (counts[s.damageSupport] || 0) + 1;
    if (!["supported", "nonAttack"].includes(s.damageSupport)) {
      const text = `${s.supportReason} ${s.unparsed?.join(" ") || ""}`;
      const category = s.passive ? "Passive / reaction handlers" : s.tags.includes("nonAttack") ? "Non-attack effects awaiting handlers" :
        /Unverified target count/.test(text) ? "Target-scope verification" :
        s.unparsed?.some(line => /Skill\s*\d.*(?:Proc|Alt|Focus|Idol|AoE|Rihanna|Luciella)/i.test(line)) ? "Multiple forms, procs or resource-dependent variants" :
        /penetration/i.test(s.supportReason) ? "Conditional / unspecified penetration" :
        /Heal|Barrier|Shield|Lifesteal|damage (?:as|gained as) (?:healing|life)/i.test(text) ? "Healing, barriers or lifesteal mixed into formula text" :
        /Additional damage|fixed damage|Detonat/i.test(text) ? "Additional damage / detonation handlers" :
        /Missing numeric|No multiplier|No verified/.test(text) ? "Missing / inconsistent coefficient data" : "Conditional damage / unrecognized source syntax";
      blockers[category] = (blockers[category] || 0) + 1;
    }

  }
}
const fallbackHeroes = heroes.filter(h => h.source !== "CeciliaBot");
const skillCount = heroes.reduce((n,h) => n + Object.keys(h.skills).length,0);
const lines = ["# Natural 5★ skill audit", "",
  `Scope: **${heroes.length} natural 5★ heroes, ${skillCount} skills** from the bundled CeciliaBot snapshot (${new Date(snapshot.fetchedAt).toISOString()}). Includes elemental, Moonlight, limited and collaboration units. Lower-rarity units are outside this review scope.`, "",
  `Detailed CeciliaBot records: ${heroes.length - fallbackHeroes.length}; fallback-only heroes: ${fallbackHeroes.map(h => h.name).join(", ") || "none"}. Missing details remain blocked.`, "",
  "Every scoped record was scanned for support flags, formula parsing, target markers, status references, resource fields and source inconsistencies. Specific mechanics below were reviewed and implemented from descriptions. This is a coverage audit, not a claim that every kit has been manually verified in game or fully implemented.", "",
  "Regenerate this audit with `npm run audit:skills:nat5` and the detailed queue with `npm run report:skills:nat5`.", "",
  "## Source priority", "",
  "Damage formulas, coefficients, conditional damage modifiers and Soulburn damage values follow e7calc. CeciliaBot supplies hero/skill descriptions, icons and other metadata. Fribbels is retained for base stats and portraits only; its damage values must not validate or override e7calc. See [source policy](data-sources.md).", "",
  "The runtime parses CeciliaBot multiplier text and uses guarded e7calc conditional S1 rules for Kise, Zahhak, Dizzy and Astromancer Elena. Other values remain provisional until checked against the matching current e7calc skill/version; this audit does not claim a completed e7calc data migration or live synchronization.", "",
  "## Current base support", "", "| Classification | Skills |", "| --- | ---: |",
  ...Object.entries(counts).map(([key,value]) => `| ${key} | ${value} |`), "",
  "Supported means the base damage calculation is available. Buffs, passives, Soulburn and conditional follow-ups can remain incomplete; see [the per-skill queue](unsupported-nat5-skills.md).", "",
  "## Primary blockers", "", "| Primary blocker | Skills |", "| --- | ---: |",
  ...Object.entries(blockers).sort((a,b) => b[1]-a[1]).map(([key,value]) => `| ${key} | ${value} |`), "",
  "These categories assign one primary blocker to each unsupported/passive entry, while individual skills may have several gaps. Clear descriptions generally need implementation rather than user clarification.", "",
  "## Non-attack targeting and cast support", "",
  "Ally and team targets come from the skill descriptions; they are not open clarification questions. Eight reviewed support casts now execute: Yuna S2, Vivian S3, Iseria S2, Flan S2, Emilia S2, Laia S2, Desert Jewel Basar S3 and Mediator Kawerik S3. Ally means the caster too unless explicitly excluded. Team/self casts open a confirmation directly; ally casts highlight friendly avatars. No hit/resistance roll occurs for beneficial effects. Existing Cermia self-cast support remains available.", "",
  "Mediator Kawerik's separate S3-ready turn-start duration reduction remains pending. Other unimplemented non-attack skills are generally missing effect handlers (healing, barriers, special buffs, revival/transformations, enemy debuff effects), not ambiguous ally targeting. The remaining count is not a count of questions for the user.", "",
  "## Reviewed and implemented in this pass", "",
  "- Resource foundation: optional Fighting Spirit (100 maximum) and Focus (5 maximum), fractional values, manual edits with Undo, initial-value overrides and gain multipliers. Native pools and supported flat cast gains/costs use explicit source data. Costs are checked before casting. Resource-bearing unsupported skills remain blocked by their other support checks.",
  "- Resource UI: red Fighting Spirit bar immediately under HP; Focus has five blocks with proportional partial filling (2.5 = two full blocks plus half a block). Active-unit and effect-panel controls edit exact values.",
  "- Reviewed conditional S1 damage: Kise versus buffs ×1.7, Zahhak versus buffs ×1.3 with +50 Hit/Critical Chance, Dizzy versus debuffs ×1.3, Astromancer Elena versus debuffs ×1.2. Dizzy S1 also applies its 25% one-turn Stun with ordinary resistance checks.",
  "- Reviewed passive watchers: Sol enemy non-attack CR/Spirit, Designer Lilibet enemy-turn-end allied-debuff Spirit/full-resource cleanse and buffs, Astromancer Elena allied AoE Worship Me! CR/souls. Enemy-side reactions resolve first for a shared event. Sol retaliation and Elena Star’s Blessing remain pending; see the detailed checklist.",
  "- Resource-only passive mappings: 15 opening grants; Urban Shadow Choux's turn-start Focus; Solitaria/Elvira enemy gain blocking with Seal/death handling; Arbiter Vildred's reviewed revival grants maximum Focus. Other portions of those passives remain pending.",
  "- Direct S1 debuff grants for 28 natural 5★ heroes, with source-description guards, max-enhanced chances, ordinary miss/Immunity/resistance rules and existing manual overrides. This includes ae-KARINA, Alencia, Iseria, Lua, Flan, Politis, Yufine, Fallen Cecilia and Faithless Lidica. It does not imply Soulburn or the entire kit is implemented.",
  "- Aria S1: +20 percentage points to effect chance outside her own turn. Violet S1: doubled Focus and +15% CR outside his own turn. Choux S1: doubled Focus after a critical hit and source-defined CR gain. Resource gain reductions apply after the conditional gain multiplier, preserving fractions.",
  "- Fixed penetration no longer becomes unsupported solely because a separate sentence describes HP/DEF/Speed scaling. Conditional, target-ranked and unspecified penetration remain blocked. Ran S1 and Lionheart Cermia S3 now have verified static percentages; source-defined battle-start cooldowns are initialized. Extra-turn execution for unimplemented skills remains separate from damage support.",
  "- Abigail S1 root is classified as an attack; its shared non-attack marker describes the nested Might effect. Normal damage and caster CR are available. The conditional Might effect still needs a handler.", "",
  "## Source findings and unresolved implementation work", "",
  "- Ilynav S1: CeciliaBot text says 10% max HP but the redundant expression says `0.01 Health`; The checked e7calc source specifies 0.10. The coefficient evidence is clear, but the 50% replacement with Punish still needs execution branching. Her S1 remains blocked; a Dual Attack uses the unreplaced basic skill according to its description.",
  "- Kawerik: the current cached descriptions include Fighting Spirit/Mana Field. Use the maintained e7calc repository for coefficients and extra-attack variants; the previously checked 2024 beta is historical, not authoritative. Do not substitute Fribbels values.",
  "- Healing/barrier rows are not HP/DEF attack scaling. Keep recipient selection, caps, timing, skill enhancement effects and shield absorption separate when implementing them.",
  "- Focus/full-resource replacement skills need branch-specific damage and spending, not a guessed averaged multiplier. Clear descriptions are sufficient for trigger conditions, but the matching branch coefficients must also be available.",
  "- Explicit resource requirements are imported, while conditional consumes-all triggers, retaliation resource grants, resource-on-death/reset policy and every unreviewed passive/resource interaction remain pending. Manual adjustments can represent those states without pretending they are automatic.",
  "- Existing deferred injury and reaction-order questions remain in the mechanics documents. This pass does not reopen user-confirmed Venom scaling, injury caps, Collapse, damage-share order or dispel sorting.", "",
  "## Resource-bearing natural 5★ units", "", `Detected **${resources.length} resource-bearing units**. A pool does not imply complete passive or threshold automation.`, "",
  "| Hero | Resource |", "| --- | --- |", ...resources.map(h => `| ${h.name} | ${h.resourceType === "focus" ? "Focus, max 5" : "Fighting Spirit, max 100"} |`), "",
  "## References checked", "",
  "- [CeciliaBot hero database](https://ceciliabot.github.io/#/hero/): local snapshot supplies awakened descriptions, values, resource fields and source guards. Live API freshness is not claimed.",
  "- [Fribbels repository](https://github.com/fribbels/Fribbels-Epic-7-Optimizer/tree/038a652b9e76cb1ea5bc40d34c7dcdb9a1d8e3a8): checked `data/py` (Scapy networking library), `app/js/lib/damageCalc.js`, `backend/src/main/java/com/fribbels/model/DamageMultipliers.java`, and `data/cache/herodata.json`. The fetched hero-cache file exactly matches our bundled cache (SHA-256 `2a17831fe7ed936f8e2d58783bac786f6790de7792b8cb5b52bc374da082d384`). It remains a base-stat/portrait source; its damage values are excluded from this audit and are not authoritative.",
  "- [e7calc public source](https://github.com/tyopoyt/epic7-damage-calc/blob/39070976ce3cd0435cbcf5d430f2711cf0ef0005/damage-calc/src/assets/data/heroes.ts): checked maintained repository revision 39070976ce3cd0435cbcf5d430f2711cf0ef0005 (2026-10-22) for Aria, Apocalypse Ravi, Ilynav and Kawerik coefficients/branches; the old 2024 beta is historical. Its formulas do not certify current live-game passive behavior. No upstream application code was copied.", "",
];
fs.writeFileSync(new URL("docs/nat5-review.md",root),lines.join("\n"));
console.log(`Audited ${heroes.length} heroes / ${skillCount} skills; Wrote docs/nat5-review.md.`);
