import { API, compactHero, createCatalog } from "./cecilia.js";
const KEY = "e7-cecilia-cache-v1",
  TTL = 24 * 60 * 60 * 1000;
async function json(url, signal) {
  const r = await fetch(url, { signal });
  if (!r.ok) throw Error(`HTTP ${r.status}`);
  return r.json();
}
export function readCache(storage = globalThis.localStorage) {
  try {
    const c = JSON.parse(storage.getItem(KEY));
    if (
      c?.version !== 1 ||
      !c.records ||
      typeof c.records !== "object" ||
      Array.isArray(c.records)
    )
      return null;
    const records = {};
    for (const [key, value] of Object.entries(c.records)) {
      try {
        const h = compactHero(value);
        if (h._id === key) records[key] = h;
      } catch {}
    }
    return {
      ...c,
      records,
      checkedAt: Number.isFinite(c.checkedAt) ? c.checkedAt : 0,
      list: Array.isArray(c.list)
        ? c.list.filter(
            (h) =>
              h &&
              typeof h._id === "string" &&
              typeof h.name === "string" &&
              typeof h.id === "string",
          )
        : [],
    };
  } catch {
    return null;
  }
}
export function mergeCache(snapshot, cache) {
  const records = { ...snapshot.heroes, ...(cache?.records || {}) };
  for (const h of cache?.list || [])
    if (!records[h._id])
      records[h._id] = { ...h, skills: [], sourceDetailPending: true };
  return records;
}
/** Only details in use are refreshed: never 388 detail requests per visitor. */
export async function refreshSource(
  snapshot,
  names,
  { signal, force = false, storage = globalThis.localStorage } = {},
) {
  const cache = readCache(storage);
  const records = mergeCache(snapshot, cache);
  if (
    !force &&
    cache?.checkedAt &&
    Date.now() - cache.checkedAt < TTL &&
    names.every((n) =>
      Object.values(cache.records).some(
        (h) =>
          h.name === n &&
          Date.now() - (cache.recordCheckedAt?.[h._id] || cache.checkedAt) <
            TTL,
      ),
    )
  )
    return { records, checkedAt: cache.checkedAt, mode: "cache" };
  const list = await json(`${API}/getList?list=hero`, signal);
  if (
    !Array.isArray(list) ||
    !list.length ||
    !list.every(
      (h) =>
        h &&
        typeof h._id === "string" &&
        typeof h.name === "string" &&
        typeof h.id === "string",
    )
  )
    throw Error("Invalid hero list");
  for (const h of list)
    if (!records[h._id])
      records[h._id] = { ...h, skills: [], sourceDetailPending: true };
  const byName = new Map(list.map((h) => [h.name, h]));
  let cursor = 0,
    failures = 0;
  const live = { ...(cache?.records || {}) },
    recordCheckedAt = { ...(cache?.recordCheckedAt || {}) };
  const wanted = names
    .map(
      (name) =>
        byName.get(name) ||
        list.find(
          (h) =>
            h.id === Object.values(records).find((r) => r.name === name)?.id,
        ),
    )
    .filter(Boolean);
  failures = names.length - wanted.length;
  await Promise.all(
    Array.from({ length: Math.min(3, wanted.length) }, async () => {
      while (cursor < wanted.length) {
        const h = wanted[cursor++];
        try {
          const detail = compactHero(
            await json(
              `${API}/getItem?list=hero&id=${encodeURIComponent(h._id)}`,
              signal,
            ),
          );
          if (detail.id !== h.id) throw Error("Hero identity mismatch");
          live[h._id] = detail;
          recordCheckedAt[h._id] = Date.now();
        } catch (e) {
          if (signal?.aborted) throw e;
          failures++;
        }
      }
    }),
  );
  if (signal?.aborted) throw signal.reason || new Error("Aborted");
  const checkedAt = Date.now(),
    entry = {
      version: 1,
      checkedAt: failures ? 0 : checkedAt,
      records: live,
      recordCheckedAt,
      list: list.map((h) => ({
        _id: h._id,
        id: h.id,
        name: h.name,
        attribute: h.attribute,
        role: h.role,
        rarity: h.rarity,
        zodiac: h.zodiac,
      })),
    };
  try {
    storage.setItem(KEY, JSON.stringify(entry));
  } catch {
    /* Cached snapshot remains available if storage is full. */
  }
  return {
    records: { ...records, ...live },
    list: entry.list,
    checkedAt,
    mode: failures ? "partial" : "live",
    failures,
  };
}
export async function loadSources(baseUrl, signal) {
  const [baseline, snapshot] = await Promise.all([
    json(`${baseUrl}data/heroes.json`, signal),
    json(`${baseUrl}data/cecilia.json`, signal),
  ]);
  const cache = readCache(),
    records = mergeCache(snapshot, cache);
  return {
    baseline,
    snapshot,
    heroes: createCatalog(baseline, records),
    checkedAt: cache?.checkedAt || snapshot.fetchedAt,
    mode: cache ? "cache" : "snapshot",
  };
}
