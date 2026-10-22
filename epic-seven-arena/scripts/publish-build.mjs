// Keep the existing branch-based GitHub Pages URL working without changing other pf pages.
import { cp, rm } from "node:fs/promises";
await rm(new URL("../build-assets", import.meta.url), {
  recursive: true,
  force: true,
});
for (const name of ["index.html", "build-assets", "assets", "data"])
  await cp(
    new URL("../dist/" + name, import.meta.url),
    new URL("../" + name, import.meta.url),
    { recursive: true },
  );
