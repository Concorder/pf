export const RANDOM_DEBUFF_POOLS = {
  stic_random_debuff1: [
    "stic_att_dn",
    "stic_blind",
    "stic_provoke",
    "stic_silence",
    "stic_ab_up_block",
  ],
  stic_random_debuff2: ["stic_silence", "stic_def_dn", "stic_dodge_dn"],
  cmn_random_debuff3: [
    "stic_silence",
    "stic_def_dn",
    "stic_att_dn",
    "stic_heal_impossible",
  ],
  stic_random_debuff4: [
    "stic_att_dn",
    "stic_blind",
    "stic_dodge_dn",
    "stic_buf_impossible",
  ],
  stic_random_debuff5: [
    "stic_stun",
    "stic_buf_impossible",
    "stic_blind",
    "stic_ab_up_block",
  ],
  stic_random_debuff6: ["stic_dot", "stic_dodge_dn", "stic_def_dn"],
  stic_random_debuff7: ["stic_stun", "stic_sleep", "stic_provoke_hp"],
};
export const isDebuffContainer = (id) =>
  id === "stic_class_debuff_1" || !!RANDOM_DEBUFF_POOLS[id];
export function resolveDebuffContainer(id, target, random = Math.random) {
  if (id === "stic_class_debuff_1") {
    if (
      ["assassin", "thief", "warrior", "ranger", "mage"].includes(target.role)
    )
      return "stic_att_dn";
    if (
      ["knight", "manauser", "soul-weaver", "soulweaver"].includes(target.role)
    )
      return "stic_def_dn";
    return null;
  }
  const pool = RANDOM_DEBUFF_POOLS[id];
  return pool
    ? pool[Math.min(pool.length - 1, Math.floor(random() * pool.length))]
    : id;
}
export const debuffGroupName=id=>id==='stic_class_debuff_1'?'Class Debuff':RANDOM_DEBUFF_POOLS[id]?'Random Debuff':null;
