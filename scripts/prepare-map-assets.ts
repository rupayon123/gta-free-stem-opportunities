import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";

// MapLibre's module worker imports its shared module by relative filename.
// Preserve both names instead of relying on the application bundler's hashes.
const require = createRequire(import.meta.url);
const packageRoot = dirname(require.resolve("maplibre-gl/package.json"));
const target = "public/vendor/maplibre";
mkdirSync(target, { recursive: true });
for (const file of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  copyFileSync(join(packageRoot, "dist", file), join(target, file));
}
copyFileSync(join(packageRoot, "LICENSE.txt"), join(target, "LICENSE.txt"));
console.log("Prepared same-origin MapLibre worker assets from the installed package.");
