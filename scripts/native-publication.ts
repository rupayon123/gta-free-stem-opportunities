import { isDeepStrictEqual } from "node:util";

export const maximumNativeBytes = 10_000_000;
export const maximumNativeRecords = 4999;
export const maximumPublicationClockSkewMs = 5 * 60 * 1000;
export type FeedPayload = { count: number; opportunities: readonly unknown[]; publicationRevision?: string; [key: string]: unknown };

export function serializeNativeFeed(value: FeedPayload): string {
  if (!Number.isInteger(value.count) || value.count < 0 || !Array.isArray(value.opportunities)
      || value.count !== value.opportunities.length || value.count > maximumNativeRecords) {
    throw new Error(`Native feed count is inconsistent or exceeds ${maximumNativeRecords} records. Previous output was retained.`);
  }
  const contents = `${JSON.stringify(value, null, 2)}\n`;
  if (Buffer.byteLength(contents, "utf8") > maximumNativeBytes) {
    throw new Error(`Native feed exceeds ${maximumNativeBytes} UTF-8 bytes. Previous output was retained.`);
  }
  return contents;
}

export function publicationRevisionTime(value: unknown, nowMs: number): number {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) {
    throw new Error("Publication revision must be canonical UTC with milliseconds.");
  }
  const milliseconds = Date.parse(value);
  if (!Number.isFinite(milliseconds) || milliseconds <= 0 || new Date(milliseconds).toISOString() !== value
      || milliseconds > nowMs + maximumPublicationClockSkewMs) {
    throw new Error("Publication revision is invalid or too far in the future.");
  }
  return milliseconds;
}

/** Source publication alone assigns revisions. Builders only verify accepted bytes. */
export function prepareNativePublication(
  candidate: FeedPayload,
  previousContents: string | undefined,
  mode: "publish" | "verify",
  now = new Date()
): { contents: string; changed: boolean; publicationRevision: string } {
  const nowMs = now.getTime();
  if (!Number.isFinite(nowMs) || nowMs <= 0) throw new Error("Invalid publication clock.");
  // JSON normalization accounts for omitted optional undefined properties.
  const normalized = JSON.parse(serializeNativeFeed(candidate)) as FeedPayload;
  const { publicationRevision: _ignored, ...candidateBody } = normalized;
  let previous: FeedPayload | undefined;
  let previousTime: number | undefined;
  if (previousContents !== undefined) {
    if (Buffer.byteLength(previousContents, "utf8") > maximumNativeBytes) throw new Error("Previous native feed exceeds byte limit.");
    const parsed: unknown = JSON.parse(previousContents);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid previous native feed.");
    previous = parsed as FeedPayload;
    serializeNativeFeed(previous);
    if (Object.hasOwn(previous, "publicationRevision")) previousTime = publicationRevisionTime(previous.publicationRevision, nowMs);
    const { publicationRevision, ...previousBody } = previous;
    if (previousTime !== undefined && isDeepStrictEqual(candidateBody, previousBody)) {
      return { contents: previousContents, changed: false, publicationRevision: publicationRevision! };
    }
  }
  if (mode === "verify") {
    throw new Error("Committed native feed differs from source or lacks a publication revision. Run npm run export:public-feed and commit its output; builds never assign revisions.");
  }
  const nextTime = Math.max(nowMs, (previousTime ?? 0) + 1);
  const publicationRevision = new Date(nextTime).toISOString();
  publicationRevisionTime(publicationRevision, nowMs);
  const contents = serializeNativeFeed({ ...candidateBody, publicationRevision });
  return { contents, changed: true, publicationRevision };
}
