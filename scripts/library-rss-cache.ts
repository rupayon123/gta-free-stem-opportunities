import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const maximumAgeMs = 15 * 60_000;
const maximumEntryBytes = 2 * 1024 * 1024;

export type LibraryRssPage = { xml: string; capturedAt: string; fromCache: boolean };
export type LibraryRssFetchOptions = { cacheDirectory?: string; now?: () => Date };

export function isCompleteLibraryRss(xml: string) {
  return /^\s*(?:<\?xml\b[^?]*\?>\s*)?<rss\b[\s\S]*<\/rss\s*>\s*$/i.test(xml)
    && /<channel\b/i.test(xml) && /<\/channel\s*>/i.test(xml);
}

function digest(value: string) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function cachePath(directory: string, url: string) {
  return join(directory, `${digest(url)}.json`);
}

export function readLibraryRssCache(url: string, directory: string | undefined, now: Date): LibraryRssPage | undefined {
  if (!directory) return undefined;
  try {
    const path = cachePath(directory, url);
    if (statSync(path).size > maximumEntryBytes) return undefined;
    const entry: unknown = JSON.parse(readFileSync(path, "utf8"));
    if (!entry || typeof entry !== "object") return undefined;
    const cached = entry as Record<string, unknown>;
    if (cached.schemaVersion !== 1 || cached.url !== url || typeof cached.xml !== "string" || typeof cached.capturedAt !== "string") return undefined;
    const capturedMs = Date.parse(cached.capturedAt);
    const ageMs = now.getTime() - capturedMs;
    if (!Number.isFinite(capturedMs) || !Number.isFinite(ageMs) || new Date(capturedMs).toISOString() !== cached.capturedAt || ageMs < 0 || ageMs > maximumAgeMs) return undefined;
    if (!isCompleteLibraryRss(cached.xml) || cached.contentSha256 !== digest(cached.xml)) return undefined;
    return { xml: cached.xml, capturedAt: cached.capturedAt, fromCache: true };
  } catch {
    // A missing, damaged, or unavailable optional cache is a normal cache miss.
    // Only a newly validated provider response can replace it.
    return undefined;
  }
}

export function writeLibraryRssCache(url: string, directory: string | undefined, page: LibraryRssPage) {
  if (!directory || !isCompleteLibraryRss(page.xml)) return;
  const serialized = JSON.stringify({ schemaVersion: 1, url, capturedAt: page.capturedAt, contentSha256: digest(page.xml), xml: page.xml });
  // At most 600 configured source-page keys per job, with a fixed size bound.
  // Oversize valid RSS can still be used; it simply is not cached.
  if (Buffer.byteLength(serialized, "utf8") > maximumEntryBytes) return;
  try {
    mkdirSync(directory, { recursive: true });
    writeFileSync(cachePath(directory, url), serialized, { mode: 0o600 });
  } catch {
    // Cache availability must never turn a successful source fetch into a failure.
  }
}
