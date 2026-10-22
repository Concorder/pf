import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  parseMultipliers,
  createCatalog,
  syncTeamDefaults,
} from "./cecilia.js";
import { defaultTeams, clone } from "../engine/heroes.js";
import {
  createBattle,
  canUse,
  activeUnit,
  executeAttack,
} from "../engine/battle.js";
import { refreshSource, readCache, mergeCache } from "./sourceService.js";
const baseline = JSON.parse(
    fs.readFileSync(new URL("../../public/data/heroes.json", import.meta.url)),
  ),
  snapshot = JSON.parse(
    fs.readFileSync(new URL("../../public/data/cecilia.json", import.meta.url)),
  ),
  catalog = createCatalog(baseline, snapshot.heroes);
test("parses normal coefficients, labelled soulburn alternatives, HP and speed scaling", () => {
  assert.equal(
    parseMultipliers("Skill3\natt_rate: 1.15(1.65 soulburn)\n!pow: 0.9").rate,
    1.15,
  );
  assert.equal(
    parseMultipliers(
      "Skill1\natt_rate: 0.9\n!pow: 1\n8% self max Health (0.08 * Health)",
    ).selfHpScaling,
    0.08,
  );
  assert.equal(catalog.Vildred.skills.S1.selfSpdScaling, 0.00075);
  assert.equal(catalog.Ras.skills.S3.selfHpScaling, 0.12);
});
test("never treats partial, contradictory, variable or executable formulas as supported", () => {
  for (const text of [
    "att_rate: 1\n!pow: 1\nunknown extra",
    "att_rate: 1\n!pow: 1\n10% self max Health (0.08 * Health)",
    "att_rate: globalThis.exit()\n!pow: 1",
    "att_rate: 1\n!pow: 1\natt_rate: 2",
  ])
    assert.equal(parseMultipliers(text).damageSupport, "unsupported");
  assert.equal(catalog.Luna.skills.S1.damageSupport, "unsupported");
  assert.equal(
    catalog["Arbiter Vildred"].skills.S3.damageSupport,
    "unsupported",
  );
});
test("preserves API identities, passive icons, cooldowns, soul gains and target counts", () => {
  assert.equal(catalog.Vildred.skills.S2.passive, true);
  assert.match(catalog.Vildred.skills.S2.iconUrl, /pa_c1007_2.png$/);
  assert.equal(catalog.Vildred.skills.S1.targets, 2);
  assert.equal(catalog.Ras.skills.S3.targets, 3);
  assert.equal(catalog.Cermia.skills.S3.penetration, 0.5);
  assert.deepEqual(catalog.Ras.skills.S2.defaults, { gain: 2, cd: 3, cost: 0 });
});
test("source defaults migrate old builds and preserve explicit user overrides on refresh", () => {
  const old = defaultTeams(baseline);
  old.left[1].skills.S2.gain = 7;
  let synced = syncTeamDefaults(old, catalog);
  assert.equal(synced.left[2].skills.S2.cd, 3);
  assert.equal(synced.left[2].skills.S2.gain, 2);
  assert.equal(synced.left[1].skills.S2.gain, 7);
  const changed = clone(catalog);
  changed.Ras.skills.S2.defaults.cd = 4;
  synced = syncTeamDefaults(synced, changed);
  assert.equal(synced.left[2].skills.S2.cd, 4);
  assert.equal(synced.left[1].skills.S2.gain, 7);
});
test("engine blocks passives and unparsed formulas and uses imported soul gains", () => {
  const teams = defaultTeams(catalog),
    battle = createBattle(teams, { left: 0, right: 0 }),
    actor = activeUnit(battle);
  assert.equal(canUse(catalog, battle, actor, "S2"), false);
  const next = executeAttack(catalog, battle, "S3", "right-0", "normal");
  assert.equal(next.souls.left, 2);
  assert.equal(next.units.find((u) => u.id === actor.id).cooldowns.S3, 5);
  assert.equal(battle.souls.left, 0);
});
test("refresh validates responses, caches selected details and discovers new heroes", async () => {
  const original = globalThis.fetch;
  const memory = new Map(),
    storage = {
      getItem: (k) => memory.get(k) || null,
      setItem: (k, v) => memory.set(k, v),
    };
  let calls = 0;
  const ras = snapshot.heroes.ras;
  globalThis.fetch = async (url) => {
    calls++;
    return new Response(
      JSON.stringify(
        url.includes("getList")
          ? [
              { _id: "ras", id: "c1001", name: "Ras" },
              { _id: "new-hero", id: "c9999", name: "New Hero" },
            ]
          : ras,
      ),
      { status: 200 },
    );
  };
  try {
    const first = await refreshSource(snapshot, ["Ras"], { storage });
    assert.equal(first.mode, "live");
    assert.equal(first.records["new-hero"].sourceDetailPending, true);
    assert.equal(calls, 2);
    const cached = await refreshSource(snapshot, ["Ras"], { storage });
    assert.equal(cached.mode, "cache");
    assert.equal(calls, 2);
    globalThis.fetch = async () => new Response("{}", { status: 200 });
    await assert.rejects(
      refreshSource(snapshot, ["Ras"], { storage, force: true }),
      /Invalid hero list/,
    );
    assert.equal(JSON.parse([...memory.values()][0]).records.ras.id, "c1001");
  } finally {
    globalThis.fetch = original;
  }
});

test("corrupt cached records are discarded, retaining safe bundled fallback", () => {
  const storage = {
    getItem: () =>
      JSON.stringify({
        version: 1,
        checkedAt: Date.now(),
        records: {
          ras: { _id: "ras", id: "c1001", name: "Ras", skills: [null] },
        },
        list: [null],
      }),
  };
  const cache = readCache(storage);
  assert.deepEqual(cache.records, {});
  assert.equal(mergeCache(snapshot, cache).ras.name, "Ras");
});
