# Skill review policy

Ordinary targeting does not require user clarification. Use CeciliaBot's awakened/max-enhanced descriptions and preserve each effect's scope and order:

- “Ally” and “all allies” include the caster unless explicitly excluded.
- “An ally” permits choosing a living teammate, including the caster unless excluded. A disabled ally may still receive a beneficial skill.
- “All allies” selects the living team automatically. Include defeated allies only for an explicit revival effect.
- “Caster” targets self. “Except for the caster” excludes self only from the clause where it appears.
- “Enemy” and “all enemies” select the opposing side. Non-attack enemy debuffs remain non-attacks and use their own status/resistance rules rather than a fabricated damage hit.
- Distinct clauses can have different recipients: Vivian's Greater Attack targets herself, normal Attack targets other allies, and Immunity targets the whole team.
- Foremost/back-row and highest-ATK selectors use the shared formation/action rules, including the user-confirmed outermost back slot and eligible-partner Dual Attack fallback.
- Buff duration, cleanse count, explicit resource conditions, extra turns, and stated before/after order come from the description. Known status behavior uses the shared effect engine.

CeciliaBot supplies descriptions/metadata; e7calc is authoritative for damage coefficients and variants. Fribbels damage values are not a fallback. A clear targeting description can be recorded independently of whether its healing, barrier, special buff or other execution handler is implemented.

## What does not need to be asked

Missing cast support, missing effect handlers, ordinary ally/team targeting, ordinary buff grants, and descriptive trigger conditions are implementation tasks. The unsupported-skill count is not a count of questions. Do not re-ask already confirmed rules from the mechanics documents.

## When a question may actually be needed

Research sources first. Ask only about a specific conflict or undocumented interaction that still changes the result—for example, whether Laceration reacts to distinct additional-damage events, or the priority of simultaneous passive reactions when sources do not specify it. Source/version contradictions are first a research problem, not an invitation to ask the user to restate an entire skill. Previously deferred/unusable-hero work remains deferred.

No new user answer is currently required for ordinary skill targeting. Partial execution support must stay explicit; knowing the targets is not a reason to silently omit the remaining effects.


## Patch/version checks

Read the current awakened/max-enhanced skill description first. If it does not resolve the mechanic, research current internet sources and check their patch/version dates before applying them. Older guides and cached API data can describe pre-patch rules. User-confirmed current rules take precedence: the natural Dual Attack base is **3%**, replacing the former 5%; eligible assisting allies still roll independently. Explicit saved build chances are retained; missing values use 3%.
