# Buffs, debuffs and unique effects

User-confirmed classification:

- Regular buffs count as buffs, can be dispelled and cannot be granted under Cannot Buff.
- Undispellable buffs still count as buffs and cannot be granted under Cannot Buff. Their removal protection does not grant application immunity. Existing undispellable buffs survive dispels. Their arena badges use a lighter blue border/background.
- Unique effects are neither buffs nor debuffs. They cannot be dispelled/cleansed, are not counted by buff/debuff-count mechanics and bypass Cannot Buff, Immunity and Block’s buff suppression. Their own source trigger conditions and duration rules still apply; undispellable does not mean permanent or guaranteed to survive death.

The original four supported source entries explicitly named “Unique Effect” are reclassified: Energy Depletion, Volatility, Fracture and Trauma. Their stat/event behavior remains available. Fracture alone has the explicit persist-through-revival flag; other revival persistence is not inferred. Undispellable negative effects such as Death Sentence remain debuffs, not unique effects.

`BUFFS` remains the internal effect registry for compatibility, but each definition has `effectType`: `buff`, `debuff` or `unique`. Application/removal/counting logic uses that distinction. `undispellable` is a separate property.

The manual Sanctuary of Battle toggle in the effects panel prevents new buffs/debuffs on heroes on either team, including undispellable buffs. Unique effects remain available. The toggle does not cleanse existing effects, advance a turn or automate Notos’s transformation, healing, skill cooldowns, stance skills or domain lifecycle. Its changes support Undo. Those source-specific Notos mechanics remain pending.

Do not infer unique status solely from “undispellable,” an `_aura` ID or an icon color. Classify additional effects from explicit source information before automating them.

Offering is also a supported unique effect, automatically granted by Lady of the Scales to the foremost ally at battle start. Its grant and 70% share remain available under Sanctuary; its separate Immortality buff does not. See [Offering](offering.md) for survival and restrictions.
