"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { createYouthFeedLoader } from "@/lib/youthHunter/client";

const currentClock = () => new Date().toISOString();
/** One canonical store. No duplicate fetcher, polling, persistent cache or
 * returning an awaited payload that can overwrite a newer request's result. */
export function useYouthRoleFeed(enabled: boolean) {
  const store = useMemo(() => createYouthFeedLoader({ now: currentClock }), []);
  const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
  useEffect(() => {
    const controller = new AbortController();
    void store.load({ enabled, signal: controller.signal });
    return () => controller.abort();
  }, [enabled, store]);
  useEffect(() => () => store.dispose(), [store]);
  const feed = snapshot.state === "ready" || snapshot.state === "stale" ? snapshot.feed :
    snapshot.state === "loading" || snapshot.state === "error" ? snapshot.cached?.feed : undefined;
  return { feed, state: snapshot.state, refresh: () => { void store.load({ enabled }); } };
}
