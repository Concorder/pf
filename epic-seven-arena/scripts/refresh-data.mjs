import { readFile, writeFile, mkdir } from "node:fs/promises";
import { API, ASSETS, compactHero } from "../src/data/cecilia.js";
const root = new URL("../public/data/", import.meta.url),
  path = new URL("cecilia.json", root);
const json = async (url) => {
  const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!r.ok) throw Error(`${r.status}: ${url}`);
  return r.json();
};
const list = await json(`${API}/getList?list=hero`);
if (!Array.isArray(list) || !list.length) throw Error("Invalid hero list");
const option = process.argv.indexOf("--hero"),
  selected =
    option < 0 ? list : list.filter((h) => h._id === process.argv[option + 1]);
if (!selected.length) throw Error("No matching hero");
let old = { version: 1, heroes: {} };
try {
  old = JSON.parse(await readFile(path, "utf8"));
} catch {}
let cursor = 0;
const records = {},
  icons = new Set();
await Promise.all(
  Array.from({ length: Math.min(3, selected.length) }, async () => {
    while (cursor < selected.length) {
      const h = selected[cursor++],
        d = compactHero(
          await json(
            `${API}/getItem?list=hero&id=${encodeURIComponent(h._id)}`,
          ),
        );
      if (d.id !== h.id) throw Error("Identity mismatch");
      records[d._id] = d;
      for (const [i, raw] of d.skills.slice(0, 3).entries()) {
        const s = { ...raw, ...raw.awakened };
        const icon = s.icon || raw.icon || `sk_${d.id}_${s.skill || i + 1}`;
        if (!/^[\w-]+$/.test(icon)) throw Error("Invalid icon identifier");
        icons.add(icon);
      }
    }
  }),
);
await mkdir(new URL("skill-icons/", root), { recursive: true });
cursor = 0;
const names = [...icons];
await Promise.all(
  Array.from({ length: Math.min(3, names.length) }, async () => {
    while (cursor < names.length) {
      const name = names[cursor++],
        r = await fetch(`${ASSETS}/skill/${name}.png`, {
          signal: AbortSignal.timeout(30000),
        });
      if (!r.ok) throw Error(`Icon unavailable: ${name} (${r.status})`);
      const bytes = Buffer.from(await r.arrayBuffer());
      if (
        !bytes
          .subarray(0, 8)
          .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      )
        throw Error(`Invalid PNG: ${name}`);
      await writeFile(new URL(`skill-icons/${name}.png`, root), bytes);
    }
  }),
);
await writeFile(
  path,
  JSON.stringify({
    version: 1,
    source: API,
    fetchedAt: Date.now(),
    heroes: option < 0 ? records : { ...old.heroes, ...records },
  }),
);
console.log(
  `Saved ${Object.keys(records).length} hero records and ${icons.size} icons. Run npm run build to refresh the deployable files.`,
);
