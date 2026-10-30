import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { build } from "esbuild";

async function main() {
if (!process.argv[2]) throw new Error("Pass an output directory outside out/ for the local-only storage QA harness.");
const directory = resolve(process.argv[2]);
const release = resolve("out");
if (directory === release || directory.startsWith(`${release}/`)) throw new Error("QA harness must not enter the public export.");
await mkdir(directory, { recursive: true });
await build({ entryPoints: { "storage-browser": "qa/high-school-storage-browser.ts", "storage-peer": "qa/high-school-storage-peer.ts" }, outdir: directory, bundle: true, format: "esm", platform: "browser", target: "es2020", logLevel: "warning" });
await writeFile(`${directory}/index.html`, `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Local High School storage QA</title><style>body{font:18px/1.6 system-ui;max-width:960px;margin:24px auto;padding:20px}button,a{display:inline-block;padding:14px;margin:8px;min-height:48px}pre{white-space:pre-wrap;overflow-wrap:anywhere;border:2px solid;padding:20px}</style><h1>Disposable High School storage QA</h1><p>Local test harness only. Requires dedicated localhost port8793. These controls modify only disposable test data on this origin. Never mount this harness on a public host.</p><a href="/high-school/?pathway=hours">Open product notebook</a><button id="qa-run">Run 7 real storage checks</button><button id="qa-corrupt">Seed invalid QA archive</button><button id="qa-upgrade">Simulate unsupported database version</button><button id="qa-reset">Remove disposable QA notebook</button><pre id="qa-results" role="status" aria-live="polite">Ready.</pre><script type="module" src="/__qa__/storage-browser.js"></script></html>`);
await writeFile(`${directory}/storage-peer.html`, '<!doctype html><html lang="en"><meta charset="utf-8"><title>QA storage peer</title><script type="module" src="/__qa__/storage-peer.js"></script></html>');
console.log(`Prepared local-only storage QA outside the public export: ${directory}`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
