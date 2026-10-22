import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { build } from "esbuild";

const require = createRequire(import.meta.url);
const target = resolve("public/vendor/search");
async function main() {
  const result = await build({
    entryPoints: [resolve("lib/opportunitySearch.worker.ts")],
    outfile: join(target, "opportunity-search-worker.mjs"),
    bundle: true,
    platform: "browser",
    format: "esm",
    target: ["es2022"],
    minify: true,
    legalComments: "eof",
    write: false
  });

  if (process.argv.includes("--check")) {
    console.log(`Validated same-origin search worker (${result.outputFiles[0].contents.length} bytes); no files written.`);
  } else {
    const fuseRoot = dirname(dirname(require.resolve("fuse.js")));
    const license = readFileSync(join(fuseRoot, "LICENSE"));
    mkdirSync(target, { recursive: true });
    for (const file of result.outputFiles) writeFileSync(file.path, file.contents);
    writeFileSync(join(target, "FUSE-LICENSE.txt"), license);
    console.log("Prepared same-origin opportunity search worker from the existing search implementation.");
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Could not prepare the search worker.");
  process.exitCode = 1;
});
