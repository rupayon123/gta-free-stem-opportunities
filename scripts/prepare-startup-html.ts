import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, join, relative, resolve } from "node:path";

const outputDirectory = resolve(process.argv[2] ?? "out");
const recoveryScriptPattern = /<script\b(?=[^>]*\bid=(["'])gta-asset-recovery\1)[^>]*>[\s\S]*?<\/script\s*>/gi;

function htmlFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return htmlFiles(path);
      return entry.isFile() && entry.name.toLowerCase().endsWith(".html") ? [path] : [];
    });
}

const files = htmlFiles(outputDirectory);
if (files.length === 0) throw new Error("Static export contains no HTML documents.");
let verificationTokens = 0;

// Validate every file before writing any, so a missing or duplicate guard
// fails the build without leaving a partly prepared export.
const changes = files.flatMap((path) => {
  const html = readFileSync(path, "utf8");
  const name = relative(outputDirectory, path);
  if (basename(path) === "googleafb8aa8a0befb71d.html" &&
      html.trim() === "google-site-verification: googleafb8aa8a0befb71d.html") {
    verificationTokens++;
    return [];
  }

  const scripts = [...html.matchAll(recoveryScriptPattern)];
  const heads = [...html.matchAll(/<head\b[^>]*>/gi)];
  const headEnd = html.search(/<\/head\s*>/i);
  if (scripts.length !== 1) {
    throw new Error("Expected exactly one startup recovery script in " + name + "; found " + scripts.length + ".");
  }
  if (heads.length !== 1 || headEnd < 0) {
    throw new Error("Expected one complete HTML head in " + name + ".");
  }
  const script = scripts[0];
  const scriptStart = script.index!;
  const headContentStart = heads[0].index! + heads[0][0].length;
  if (scriptStart < headContentStart || scriptStart + script[0].length > headEnd) {
    throw new Error("Startup recovery script must be inside the HTML head in " + name + ".");
  }

  const withoutScript = html.slice(0, scriptStart) + html.slice(scriptStart + script[0].length);
  const charset = withoutScript.slice(headContentStart).match(/^\s*<meta\b[^>]*\bcharset\s*=\s*(["'])utf-8\1[^>]*>/i);
  if (!charset) throw new Error("Expected the leading UTF-8 charset declaration in " + name + ".");
  const insertionPoint = headContentStart + charset[0].length;
  if (Buffer.byteLength(withoutScript.slice(0, insertionPoint), "utf8") > 1024) {
    throw new Error("UTF-8 charset declaration must remain within the first 1024 bytes in " + name + ".");
  }
  // Preserve the exact server-generated script bytes and all other markup.
  // Keep charset first, then install recovery before every loadable resource.
  // This runs after Next has hoisted its asset tags during static export.
  const prepared = withoutScript.slice(0, insertionPoint) + script[0] + withoutScript.slice(insertionPoint);
  return [{ path, html, prepared }];
});

for (const change of changes) {
  if (change.prepared !== change.html) writeFileSync(change.path, change.prepared, "utf8");
}
console.log("Prepared startup recovery before assets in " + changes.length +
  " HTML documents (" + verificationTokens + " verification token unchanged).");
