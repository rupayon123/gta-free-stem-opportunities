import { createHash } from "node:crypto";
import { closeSync, existsSync, mkdirSync, mkdtempSync, openSync, readSync, renameSync, rmSync, writeFileSync, fsyncSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { parseYouthCatalogue, validTimestamp } from "../../lib/highSchool/model";
import { buildPublicYouthFeed, decodePublicYouthFeed, emptyYouthHunterState, maximumPublicYouthFeedBytes, serializePublicYouthFeed, type YouthHunterState } from "../../lib/youthHunter/feed";

export const youthCanonicalPaths = {
  state: "data/youth-hunter-state.json", feed: "public/youth-opportunities.json", manifest: "data/youth-hunter-manifest.json"
} as const;
type Kind = keyof typeof youthCanonicalPaths;
export interface YouthCandidateManifest { schemaVersion: 1; generation: string; generatedAt: string; stateSHA256: string; feedSHA256: string }
export interface YouthSnapshot { state: YouthHunterState; feedRaw: string; stateRaw: string; manifestRaw: string; manifest: YouthCandidateManifest }
const hash = (s: string) => createHash("sha256").update(s).digest("hex");
const boundedRead = (path: string) => {
  // Bounded buffer read: a malformed or growing file cannot be read unboundedly.
  const fd = openSync(path, "r");
  try {
    const buffer = Buffer.alloc(maximumPublicYouthFeedBytes + 1);
    let size = 0;
    while (size < buffer.length) {
      const count = readSync(fd, buffer, size, buffer.length - size, size);
      if (count === 0) break;
      size += count;
    }
    if (size > maximumPublicYouthFeedBytes) throw new Error("Youth snapshot file exceeds byte limit");
    return new TextDecoder("utf-8", { fatal: true }).decode(buffer.subarray(0, size));
  } finally { closeSync(fd); }
};
function parseState(raw: string): YouthHunterState {
  const x = JSON.parse(raw) as YouthHunterState;
  if (!x || x.schemaVersion !== 1 || !Array.isArray(x.roles) || !x.fingerprints || typeof x.fingerprints !== "object" || Array.isArray(x.fingerprints) || !Array.isArray(x.retiredIds) || x.retiredIds.length > 10000) throw new Error("Invalid youth state");
  const roles = parseYouthCatalogue(x.roles); const ids = new Set(roles.map(r => r.id));
  if (Object.keys(x.fingerprints).length !== roles.length || Object.entries(x.fingerprints).some(([id, value]) => !ids.has(id) || typeof value !== "string" || !/^[a-f0-9]{64}$/.test(value))) throw new Error("Youth state fingerprint identities mismatch");
  if (new Set(x.retiredIds).size !== x.retiredIds.length || x.retiredIds.some(id => typeof id !== "string" || !/^[a-z0-9][a-z0-9-]{0,119}$/.test(id) || ids.has(id))) throw new Error("Invalid retired youth identity");
  if (x.lastSuccessfulCheck !== undefined && !validTimestamp(x.lastSuccessfulCheck)) throw new Error("Invalid source success timestamp");
  return { schemaVersion: 1, roles, fingerprints: { ...x.fingerprints }, retiredIds: [...x.retiredIds], ...(x.lastSuccessfulCheck === undefined ? {} : { lastSuccessfulCheck: x.lastSuccessfulCheck }) };
}
function snapshot(stateRaw: string, feedRaw: string, manifestRaw: string): YouthSnapshot {
  const m = JSON.parse(manifestRaw) as YouthCandidateManifest;
  if (!m || m.schemaVersion !== 1 || !validTimestamp(m.generatedAt) || !/^[a-f0-9]{64}$/.test(m.generation) || m.stateSHA256 !== hash(stateRaw) || m.feedSHA256 !== hash(feedRaw) || m.generation !== hash(stateRaw + "\0" + feedRaw)) throw new Error("Youth snapshot pair/hash mismatch");
  const state = parseState(stateRaw);
  if (state.roles.some(r => Date.parse(r.checkedAt) > Date.parse(m.generatedAt)) || (state.lastSuccessfulCheck !== undefined && Date.parse(state.lastSuccessfulCheck) > Date.parse(m.generatedAt))) throw new Error("Youth source check is later than snapshot time");
  decodePublicYouthFeed(feedRaw, m.generatedAt);
  if (serializePublicYouthFeed(buildPublicYouthFeed(state, m.generatedAt)) !== feedRaw) throw new Error("Youth state/public feed facts or classifications differ");
  return { state, stateRaw, feedRaw, manifestRaw, manifest: m };
}
/** All absent means uninitialized, NOT a successful loaded empty public feed.
 * A partially present pair is corruption and cannot be silently bootstrapped. */
export function readAcceptedYouthSnapshot(root: string): YouthSnapshot | undefined {
  const present = Object.values(youthCanonicalPaths).filter(p => existsSync(join(root, p))).length;
  if (present === 0) return undefined;
  if (present !== 3) throw new Error("Incomplete accepted youth state/feed/manifest; refusing replacement");
  return snapshot(boundedRead(join(root, youthCanonicalPaths.state)), boundedRead(join(root, youthCanonicalPaths.feed)), boundedRead(join(root, youthCanonicalPaths.manifest)));
}
function durableFile(path: string, raw: string) {
  const fd = openSync(path, "wx", 0o600);
  let complete = false;
  try { writeFileSync(fd, raw); fsyncSync(fd); complete = true; }
  finally { try { closeSync(fd); } finally { if (!complete) rmSync(path, { force: true }); } }
}
/** Immutable generation directory is the atomic CANDIDATE boundary. Nothing in
 * public/ or the accepted state is modified while assembling/validating it. */
export function prepareYouthCandidate(state: YouthHunterState, generatedAt: string, candidateRoot: string): string {
  if (!validTimestamp(generatedAt)) throw new Error("Invalid candidate clock");
  const stateRaw = JSON.stringify(parseState(JSON.stringify(state)), null, 2) + "\n";
  if (Buffer.byteLength(stateRaw, "utf8") > maximumPublicYouthFeedBytes) throw new Error("Youth state exceeds byte limit");
  const feedRaw = serializePublicYouthFeed(buildPublicYouthFeed(state, generatedAt));
  const generation = hash(stateRaw + "\0" + feedRaw);
  const manifestRaw = JSON.stringify({ schemaVersion: 1, generation, generatedAt, stateSHA256: hash(stateRaw), feedSHA256: hash(feedRaw) }, null, 2) + "\n";
  snapshot(stateRaw, feedRaw, manifestRaw); // ALL checks before any accepted write.
  mkdirSync(candidateRoot, { recursive: true });
  const staging = mkdtempSync(join(candidateRoot, ".staging-"));
  const target = join(candidateRoot, generation);
  try {
    durableFile(join(staging, "state.json"), stateRaw); durableFile(join(staging, "feed.json"), feedRaw); durableFile(join(staging, "manifest.json"), manifestRaw);
    if (existsSync(target)) {
      const prior = readYouthCandidate(target);
      if (prior.stateRaw !== stateRaw || prior.feedRaw !== feedRaw || prior.manifestRaw !== manifestRaw) throw new Error("Candidate generation collision");
    } else renameSync(staging, target);
    return target;
  } finally { rmSync(staging, { recursive: true, force: true }); }
}
export function readYouthCandidate(directory: string): YouthSnapshot {
  return snapshot(boundedRead(join(directory, "state.json")), boundedRead(join(directory, "feed.json")), boundedRead(join(directory, "manifest.json")));
}
export function verifyAcceptedYouthSnapshot(root: string): YouthSnapshot {
  const accepted = readAcceptedYouthSnapshot(root);
  if (!accepted) throw new Error("Youth feed is not initialized; no endpoint may be claimed");
  return accepted;
}
/** Only an explicit accepted CI path or reviewed-candidate import may call this. Three different directories cannot
 * be one OS rename: small rollback handles ordinary failures; paired hashes
 * reject interrupted worktrees BEFORE Git's atomic commit/publication boundary.
 * A fresh CI checkout starts from accepted bytes. No durable journal framework. */
export function promoteYouthCandidate(root: string, directory: string, expectedGeneration: string | undefined, options: {
  allowPromotion: boolean; expectedCandidateGeneration?: string; beforeReplace?: (kind: Kind) => void
}): YouthSnapshot {
  if (!options.allowPromotion) throw new Error("Canonical youth promotion is not authorized");
  const candidate = readYouthCandidate(directory);
  if (options.expectedCandidateGeneration !== undefined && candidate.manifest.generation !== options.expectedCandidateGeneration) throw new Error("Reviewed candidate generation changed before promotion");
  const lockPath = join(root, "tmp/youth-hunter-promotion.lock"); mkdirSync(dirname(lockPath), { recursive: true });
  const lock = openSync(lockPath, "wx", 0o600);
  const replaced: Kind[] = []; const temporaries: string[] = [];
  const backups: Partial<Record<Kind, string>> = {};
  try {
    const previous = readAcceptedYouthSnapshot(root);
    if (previous?.manifest.generation !== expectedGeneration) throw new Error("Youth source changed while collecting; regenerate from accepted state");
    if (previous && (Date.parse(candidate.manifest.generatedAt) < Date.parse(previous.manifest.generatedAt) ||
        (candidate.manifest.generatedAt === previous.manifest.generatedAt && candidate.manifest.generation !== previous.manifest.generation))) throw new Error("Older or conflicting youth candidate cannot replace accepted source checks");
    const raw: Record<Kind, string> = { state: candidate.stateRaw, feed: candidate.feedRaw, manifest: candidate.manifestRaw };
    for (const kind of ["state", "feed", "manifest"] as const) {
      const path = join(root, youthCanonicalPaths[kind]); mkdirSync(dirname(path), { recursive: true });
      if (existsSync(path)) backups[kind] = boundedRead(path);
      const temporary = `${path}.${process.pid}.tmp`;
      durableFile(temporary, raw[kind]); temporaries.push(temporary);
    }
    for (const kind of ["state", "feed", "manifest"] as const) {
      options.beforeReplace?.(kind); renameSync(`${join(root, youthCanonicalPaths[kind])}.${process.pid}.tmp`, join(root, youthCanonicalPaths[kind])); replaced.push(kind);
    }
    return verifyAcceptedYouthSnapshot(root);
  } catch (error) {
    for (const kind of [...replaced].reverse()) {
      const path = join(root, youthCanonicalPaths[kind]);
      if (backups[kind] === undefined) rmSync(path, { force: true });
      else { const restore = `${path}.${process.pid}.rollback`; durableFile(restore, backups[kind]!); temporaries.push(restore); renameSync(restore, path); }
    }
    throw error;
  } finally {
    for (const path of temporaries) rmSync(path, { force: true });
    closeSync(lock); rmSync(lockPath, { force: true });
  }
}
export function initialYouthState(root: string): YouthHunterState {
  return readAcceptedYouthSnapshot(root)?.state ?? emptyYouthHunterState();
}
export function candidateDirectory(root: string): string { return resolve(root, "tmp/youth-hunter-candidates"); }
