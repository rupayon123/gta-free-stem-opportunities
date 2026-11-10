import { validTimestamp } from "../highSchool/model";
import { decodePublicYouthFeed, maximumPublicYouthFeedBytes, type PublicYouthFeed } from "./feed";

export const DEFAULT_YOUTH_FEED_URL = "/youth-opportunities.json";
type CachedYouthFeed = { feed: PublicYouthFeed; state: "ready" | "stale" };
export type YouthFeedLoadState =
  | { state: "disabled" }
  | { state: "loading"; cached?: CachedYouthFeed }
  | { state: "ready"; feed: PublicYouthFeed; source: "network" }
  | { state: "stale"; feed: PublicYouthFeed }
  | { state: "error"; reason: "network" | "invalid" | "timeout" | "cancelled"; cached?: CachedYouthFeed };
const disabled: YouthFeedLoadState = Object.freeze({ state: "disabled" });
async function readBounded(response: Response): Promise<string> {
  const declared = response.headers.get("content-length");
  if ((declared !== null && (!Number.isSafeInteger(Number(declared)) || Number(declared) < 0 || Number(declared) > maximumPublicYouthFeedBytes)) || !response.body) throw new Error("Invalid youth response size/body");
  const reader = response.body.getReader(); const decoder = new TextDecoder("utf-8", { fatal: true });
  const parts: string[] = []; let bytes = 0;
  try {
    while (true) {
      const next = await reader.read(); if (next.done) break;
      bytes += next.value.byteLength;
      if (bytes > maximumPublicYouthFeedBytes) throw new Error("Youth feed exceeds byte limit");
      parts.push(decoder.decode(next.value, { stream: true }));
    }
    parts.push(decoder.decode()); return parts.join("");
  } catch (error) { await reader.cancel().catch(() => {}); throw error; }
  finally { reader.releaseLock(); }
}
/** No import-time fetch, persistence, timer polling, or fallback to retired/static
 * roles. Explicit load/refresh is the only place the clock is evaluated.
 * Snapshot getters return cached object identity for useSyncExternalStore. */
export function createYouthFeedLoader(options: { now: () => string; fetcher?: typeof fetch; endpoint?: string }) {
  const endpoint = options.endpoint ?? DEFAULT_YOUTH_FEED_URL;
  if (!endpoint.startsWith("/") || endpoint.startsWith("//") || /[\\#?]|(?:^|\/)\.\.(?:\/|$)/.test(endpoint)) throw new Error("Youth endpoint must be an explicit same-origin path");
  let snapshot: YouthFeedLoadState = disabled;
  let generation = 0; let active: AbortController | undefined;
  let lastGoodRaw: string | undefined;
  const listeners = new Set<() => void>();
  const publish = (next: YouthFeedLoadState) => { if (!Object.is(snapshot, next)) { snapshot = next; listeners.forEach(listener => listener()); } };
  function evaluate(raw: string, now: string): CachedYouthFeed {
    const feed = decodePublicYouthFeed(raw, now);
    const envelopeAge = Date.parse(now) - Date.parse(feed.generatedAt);
    if (envelopeAge < 0) throw new Error("Future youth feed revision");
    const original = JSON.parse(raw) as { count: number };
    return { feed, state: envelopeAge <= 30 * 86_400_000 && feed.count === original.count ? "ready" : "stale" };
  }
  function cached(now: string): CachedYouthFeed | undefined {
    if (lastGoodRaw === undefined) return undefined;
    try { return evaluate(lastGoodRaw, now); } catch { lastGoodRaw = undefined; return undefined; }
  }
  return {
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    getSnapshot: () => snapshot,
    getServerSnapshot: () => disabled,
    async load(input: { enabled: boolean; signal?: AbortSignal }): Promise<void> {
      const current = ++generation; active?.abort(); active = undefined;
      if (!input.enabled) { publish(disabled); return; }
      let now: string;
      try { now = options.now(); if (!validTimestamp(now)) throw new Error("Invalid load clock"); }
      catch { publish({ state: "error", reason: "invalid" }); return; }
      const prior = cached(now); publish({ state: "loading", ...(prior ? { cached: prior } : {}) });
      const controller = new AbortController(); active = controller;
      let timedOut = false;
      const abort = () => controller.abort();
      input.signal?.addEventListener("abort", abort, { once: true });
      if (input.signal?.aborted) abort();
      const timer = setTimeout(() => { timedOut = true; abort(); }, 15_000);
      let reason: "network" | "invalid" = "network";
      try {
        if (controller.signal.aborted) throw new Error("Cancelled");
        const response = await (options.fetcher ?? fetch)(endpoint, { signal: controller.signal, credentials: "omit", redirect: "error", headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error("Youth feed unavailable");
        reason = "invalid";
        if (!response.headers.get("content-type")?.includes("application/json")) throw new Error("Invalid youth response type");
        const raw = await readBounded(response); const result = evaluate(raw, now);
        if (current !== generation) return;
        if (controller.signal.aborted) throw new Error("Cancelled");
        // A delayed old server/cache response cannot replace a newer valid feed.
        if (lastGoodRaw !== undefined && Date.parse(JSON.parse(lastGoodRaw).generatedAt) > Date.parse(result.feed.generatedAt)) throw new Error("Older youth feed revision");
        lastGoodRaw = raw;
        publish(result.state === "stale" ? { state: "stale", feed: result.feed } : { state: "ready", feed: result.feed, source: "network" });
      } catch {
        if (current !== generation) return;
        const lastGood = cached(now);
        publish({ state: "error", reason: timedOut ? "timeout" : controller.signal.aborted ? "cancelled" : reason, ...(lastGood ? { cached: lastGood } : {}) });
      } finally {
        clearTimeout(timer); input.signal?.removeEventListener("abort", abort);
        if (active === controller) active = undefined;
      }
    },
    dispose() { generation++; active?.abort(); active = undefined; lastGoodRaw = undefined; publish(disabled); listeners.clear(); }
  };
}
