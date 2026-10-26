# Unit resources

Resources are per unit, separate from team Souls. A unit can have no pool, Focus (maximum 5), or Fighting Spirit (maximum 100). Native types are inferred from source skill gain fields and resource references; optional pools can also be configured manually for units without a known native pool. Fractions are retained to six decimal places, so 2.5 Focus and halved gains remain meaningful.

`resourceType`, `resourceValue`, `resourceGainMultiplier`, and `resourceOpeningOverride` are included in battle snapshots. Hero Workshop configures the initial value and manual gain multiplier. Setting an initial value enables the explicit override of automatic opening grants; zero can also be overridden with the checkbox. Old saved builds default to their source-defined native pool and zero, then reviewed opening effects apply. Each new battle starts from the configured build rather than the previous battle's remaining resource.

The battlefield shows Fighting Spirit as a red bar immediately below HP. Focus uses five blocks, with a partially filled block for fractions. The active panel and effects panel expose editable values for either side. Changes advance neither time nor turns and participate in Undo. Manual adjustments bypass gain-reduction effects intentionally, to represent a known battle state.

## Skill integration

CeciliaBot's explicit `focus_gain`, `focus_requirement`, `fighting_spirit_gain`, and `fighting_spirit_requirement` fields supply flat skill rules for the native pool. Requirements gate use and are spent once before a supported attack; gains occur once after the skill's effects, not once per enemy hit. A supported assisting/counter S1 also uses its own gain/cost rule without consuming a turn. Unsupported damage or targeting is not enabled just because its resource data is known. This pass does not implement generic non-attack casting, every conditional resource trigger, or every transformed basic skill.

Choux S1 doubles its Focus gain on a critical hit. Violet S1 doubles it outside his own turn. These reviewed source guards apply before the manual gain multiplier and enemy gain blockers, allowing fractional results. The user can represent an unmapped halving passive with a 0.5 gain multiplier; this is not an automatic mapping for an unidentified unit.

## Reviewed passive portions

`data/resourcePassiveRules.js` holds exact-description guards. Fifteen reviewed opening grants initialize Ravi, Apocalypse Ravi, Landy, Benimaru, Summer Break Charlotte, Fenris, Commander Pavel, Estelle, Juni, Designer Lilibet, Urban Shadow Choux, Haru, Fern, Afternoon Soak Flan, and Sylvan Sage Vivian. Urban Shadow Choux also gains 1 Focus at turn start. These resource-only handlers do not imply support for the rest of each passive.

Living, unsealed enemy Solitaria blocks automatic Focus gains; Elvira blocks automatic Fighting Spirit gains. Seal and defeat deactivate these blockers. They prevent gains rather than removing an existing pool. Reviewed opening grants pass through the same gain rules. Manual absolute edits remain available.

Arbiter Vildred's existing guarded revival handler grants maximum Focus through the resource gain path after successful revival. Full-Focus S3 branching/consumption and its start-turn cooldown reset remain pending. Source-specific passive thresholds and retaliation grants need their own handlers; a full resource bar alone does not execute an unimplemented skill.

## Boundaries still requiring source-specific review

- Which deaths clear versus preserve a resource and which revival effects restore it. Current generic death/revival does not reset the stored pool; only reviewed grants change it. Do not infer a universal in-game persistence rule from this sandbox policy.
- Conditional “consume all” timing, changed skill coefficients/targets, extra attacks, and passive internal cooldowns.
- Interactions among multiple partial gain-reduction passives. Only the named 100% blockers are automatically mapped here; other combinations can use an explicitly configured final gain multiplier.
- Conflicting or stale API resource fields must be checked against the matching skill version, not filled from a generic typical value.
