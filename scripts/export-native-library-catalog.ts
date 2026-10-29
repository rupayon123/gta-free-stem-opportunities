import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, realpathSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { generatedLibraryOpportunities, generatedLibrarySourceHealth } from "../lib/generatedLibraryOpportunities";
import { buildNativeLibraryCatalog, writeNativeLibraryCatalog } from "./native-library-catalog";

/** Deliberately review-only: no default path and no build/collector/deploy integration. */
export function exportReviewCatalog(output: string) {
  const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const git = (...args: string[]) => execFileSync("git", ["-C", repo, ...args], { encoding: "utf8" }).trim();
  if (!isAbsolute(output)) throw new Error("Supply an absolute review-output directory outside the repository.");
  let ancestor = resolve(output);
  while (!existsSync(ancestor)) ancestor = dirname(ancestor);
  const effective = resolve(realpathSync(ancestor), relative(ancestor, resolve(output)));
  const repoRelative = relative(realpathSync(repo), effective);
  if (!repoRelative.startsWith(".." + "/") && repoRelative !== "..") throw new Error("Review output cannot be written inside the repository or public export.");
  const master = "lib/generatedLibraryOpportunities.ts", feed = "public/opportunities.json";
  for (const path of [master, feed]) {
    if (git("rev-parse", `HEAD:${path}`) !== git("hash-object", "--", path)) throw new Error(`Uncommitted source input: ${path}`);
  }
  // The accepted master commit is independent of doc-only HEAD commits.
  const acceptedRevision = git("log", "-1", "--format=%H", "--", master);
  const legacy = JSON.parse(readFileSync(resolve(repo, feed), "utf8"));
  if (!isDeepStrictEqual(legacy.sourceHealth?.libraryCollection, generatedLibrarySourceHealth)) throw new Error("Legacy publication and full master have different accepted collections.");
  const plan = buildNativeLibraryCatalog(generatedLibraryOpportunities, generatedLibrarySourceHealth, acceptedRevision, legacy.publicationRevision);
  const result = writeNativeLibraryCatalog(plan, effective);
  return { reviewOnly: true, output: effective, ...result, manifest: JSON.parse(plan.manifest.toString("utf8")) };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (process.argv.length !== 4 || process.argv[2] !== "--output") throw new Error("Usage: tsx scripts/export-native-library-catalog.ts --output /absolute/review-directory");
  console.log(JSON.stringify(exportReviewCatalog(process.argv[3]), null, 2));
}
