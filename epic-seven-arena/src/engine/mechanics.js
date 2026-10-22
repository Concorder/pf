export function isCermiaSelfSkill(heroes, unit, skill) {
  const hero = heroes[unit?.name],
    data = hero?.skills?.[skill];
  return (
    hero?.code === "c1079" &&
    skill === "S2" &&
    !data?.passive &&
    data?.buffRefs?.includes("stic_att_up2") &&
    /extra turn/i.test(data.description) &&
    /resets cooldown/i.test(data.description) &&
    /for 2 turns/i.test(data.description)
  );
}
