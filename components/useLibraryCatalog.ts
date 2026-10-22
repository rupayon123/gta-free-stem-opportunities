"use client";
import { useCallback, useEffect, useState } from "react";
import { loadLibraryCatalog } from "@/lib/libraryCatalog";
import type { Opportunity } from "@/lib/types";

export function useLibraryCatalog() {
  const [events, setEvents] = useState<Opportunity[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    loadLibraryCatalog(controller.signal).then(items => {
      if (!controller.signal.aborted) { setEvents(items); setStatus("ready"); }
    }).catch(() => { if (!controller.signal.aborted) setStatus("error"); });
    return () => controller.abort();
  }, [attempt]);
  const retry = useCallback(() => setAttempt(value => value + 1), []);
  return { events, status, retry };
}
