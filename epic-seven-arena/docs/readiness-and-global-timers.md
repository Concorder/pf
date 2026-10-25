# Combat Readiness and global timers

## Supported behavior

`engine/combatReadiness.js` separates natural Speed progress from direct CR changes. Positive pushes are blocked by **Restrict** (`stic_ab_up_block`, distinct from Bind) and halved by **Stigma**. Setbacks are not modified by these statuses. Enemy skill setbacks require a successful hit and the usual Effectiveness/Resistance and Immunity checks. The effects panel offers already-resolved manual CR changes, including negative values, and all changes support Undo.

An actor consumes its normal gauge at action start, so a caster's own skill push is retained rather than overwritten at action end. Reactions do not consume that gauge. Extra turns are separate from CR pushes, so Restrict does not block Cermia's extra turn. Native revival clears ordinary debuffs before setting readiness.

**Immobilize** stores the current gauge and freezes only Speed progress. Direct pushes/setbacks still work. A direct push to 100% can make the unit eligible while Immobilize remains. Speed buffs do not create free progress while frozen. Expiry/cleanse restores natural scheduling from the stored gauge and current effective Speed.

If every living unit is frozen below 100%, the battle pauses with a recoverable `stalled` state. It neither advances time to Infinity nor invents turns. The effects panel remains available; a push or cleanse can resume the scheduler. This admin-created corner case is a deterministic sandbox recovery policy, not a claimed in-game stalemate rule.

## Global countdown policy

The CeciliaBot database says Immobilize is removed at the start of someone's fourth turn, and Death Sentence damages its bearer at the start of someone's twelfth turn. The implementation counts **subsequent global actor-turn starts after application**: a status applied in global turn N has deadline N+4 or N+12. Normal and extra turns count; counters, Dual Attacks and other secondary attacks do not. Timers are shown in global turns instead of bearer turns, do not decrement with ordinary duration ticks and cannot be refreshed by reapplying the same status.

At a global start, expired Immobilize restores scheduling. Due Death Sentences are captured as a batch, removed and deal **50,000 fixed damage**, bypassing ordinary damage multipliers and sharing. Death/passive revival handling runs before victory and actor selection. A source's death removes its Death Sentences immediately, even if that source then revives. Manual cleansing of Death Sentence is blocked because it is undispellable.

## Source caveats and pending verification

- The source descriptions do not define whether the application turn itself counts or how refresh/overlapping-source attempts work. The future-start/non-refresh policy above is explicit and tested; confirm it against in-game evidence before claiming exact timer fidelity.
- Aube's skill prose says Immobilize for two turns, while the database specifies a four-global-start removal. The database's dedicated mechanic is used. This discrepancy remains a verification TODO.
- CR currently clamps to 0–100%. Above-100% ordering/overflow is not modeled. Ordinary ties retain the existing effective-Speed / formation-id ordering. Verify game priority before extending it.
- Fixed-damage batch ordering is explicit; more elaborate simultaneous-death interactions need reviewed rules.

## Reviewed automatic skill CR mappings

Romann S3 and Sharun S3 push the caster by 50%. Lidica S2 pushes the caster by 25% per attacked target. Tenebria S2 uses its fully enhanced 30% enemy setback. Pirate Captain Flan S3 uses a 20% enemy setback. Prose guards prevent changed source mechanics from silently keeping old behavior. The hit popup has an independent CR-effect toggle. Other aspects of these skills, such as dispels, remain subject to their existing support limitations.

Debuff mappings additionally cover Romann, Lucy, Peira, Cerise, Aube and Ainz Ooal Gown as reviewed. An unsupported damage/non-attack formula still blocks a skill even when its status mapping exists; manual effects remain available. Ainz's absent Silence reference is not guessed from prose.
