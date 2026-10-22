"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { searchOpportunities } from "@/lib/search";
import type { LanguageCode, Opportunity } from "@/lib/types";
import type { OpportunitySearchWorkerRequest, OpportunitySearchWorkerResponse } from "@/lib/opportunitySearch.worker";

type SearchReply = { key: string; ids: string[]; error?: string };
type PendingSearch = {
  key: string;
  generation: number;
  sequence: number;
  timeout?: ReturnType<typeof setTimeout>;
};

/** Accept only a current reply, and never let the worker widen the eligible set. */
export function acceptedSearchResultIds(
  response: unknown,
  generation: number,
  sequence: number,
  eligibleIds: ReadonlySet<string>
): string[] | undefined {
  if (!response || typeof response !== "object") return undefined;
  const reply = response as Partial<Extract<OpportunitySearchWorkerResponse, { type: "results" }>>;
  if (reply.type !== "results" || reply.generation !== generation || reply.sequence !== sequence ||
      !Array.isArray(reply.ids) || reply.ids.some((id) => typeof id !== "string")) return undefined;
  return [...new Set(reply.ids.filter((id) => eligibleIds.has(id)))];
}

function idSignature(items: readonly Opportunity[]) {
  return JSON.stringify(items.map((item) => item.id));
}

/** Blank searches are immediate; nonempty searches run on the same-origin worker. */
export function useOpportunitySearch(
  masterItems: Opportunity[],
  eligible: Opportunity[],
  query: string,
  language: LanguageCode,
  proximityResolved: boolean
): { results: Opportunity[]; searching: boolean; error?: string } {
  const master = useRef<{ signature: string; items: Opportunity[]; generation: number } | null>(null);
  const masterSignature = idSignature(masterItems);
  if (!master.current || master.current.signature !== masterSignature ||
      masterItems.some((item, index) => item !== master.current!.items[index])) {
    master.current = {
      signature: masterSignature,
      items: Array.from(masterItems),
      generation: (master.current?.generation ?? 0) + 1
    };
  }
  const masterSnapshot = master.current;

  const eligibility = useRef<{ signature: string; items: Opportunity[]; byId: Map<string, Opportunity>; ids: Set<string> } | null>(null);
  const eligibleSignature = idSignature(eligible);
  if (!eligibility.current || eligibility.current.signature !== eligibleSignature ||
      eligible.some((item, index) => item !== eligibility.current!.items[index])) {
    eligibility.current = {
      signature: eligibleSignature,
      items: Array.from(eligible),
      byId: new Map(eligible.map((item) => [item.id, item])),
      ids: new Set(eligible.map((item) => item.id))
    };
  }
  const eligibleSnapshot = eligibility.current;
  const hasQuery = query.trim().length > 0;
  const key = hasQuery ? JSON.stringify([masterSnapshot.generation, eligibleSignature, query, language, proximityResolved]) : "";
  const latestKey = useRef(key);
  latestKey.current = key;

  const worker = useRef<Worker | null>(null);
  const mounted = useRef(false);
  const pending = useRef<PendingSearch | null>(null);
  const sequence = useRef(0);
  const [workerFailed, setWorkerFailed] = useState(false);
  const [reply, setReply] = useState<SearchReply>({ key: "", ids: [] });

  const failWorker = useCallback(() => {
    if (!mounted.current) return;
    if (worker.current) {
      worker.current.onmessage = null;
      worker.current.onerror = null;
      worker.current.onmessageerror = null;
      worker.current.terminate();
      worker.current = null;
    }
    setWorkerFailed(true);
  }, []);

  useEffect(() => {
    mounted.current = true;
    try {
      if (typeof Worker === "undefined") throw new Error("Worker unavailable");
      const instance = new Worker("/vendor/search/opportunity-search-worker.mjs", { type: "module", name: "opportunity-search" });
      worker.current = instance;
      instance.onmessage = (event: MessageEvent<OpportunitySearchWorkerResponse>) => {
        if (worker.current !== instance) return;
        const current = pending.current;
        if (!current || latestKey.current !== current.key || master.current?.generation !== current.generation) return;
        const response = event.data;
        if (response?.type === "error" && response.generation === current.generation &&
            (response.sequence === undefined || response.sequence === current.sequence)) {
          failWorker();
          return;
        }
        const ids = acceptedSearchResultIds(response, current.generation, current.sequence, eligibility.current!.ids);
        if (ids === undefined) return;
        clearTimeout(current.timeout);
        pending.current = null;
        setReply({ key: current.key, ids });
      };
      instance.onerror = () => { if (worker.current === instance) failWorker(); };
      instance.onmessageerror = () => { if (worker.current === instance) failWorker(); };
    } catch {
      failWorker();
    }
    return () => {
      mounted.current = false;
      sequence.current += 1;
      if (pending.current) clearTimeout(pending.current.timeout);
      pending.current = null;
      if (worker.current) {
        worker.current.onmessage = null;
        worker.current.onerror = null;
        worker.current.onmessageerror = null;
        worker.current.terminate();
        worker.current = null;
      }
    };
  }, [failWorker]);

  useEffect(() => {
    if (workerFailed || !worker.current) return;
    try {
      worker.current.postMessage({
        type: "initialize", generation: masterSnapshot.generation, items: masterSnapshot.items
      } satisfies OpportunitySearchWorkerRequest);
    } catch {
      failWorker();
    }
  }, [masterSnapshot, workerFailed, failWorker]);

  useEffect(() => {
    if (!hasQuery) return;
    const current: PendingSearch = { key, generation: masterSnapshot.generation, sequence: ++sequence.current };
    pending.current = current;
    const isCurrent = () => mounted.current && pending.current === current && latestKey.current === current.key;
    if (workerFailed || !worker.current) {
      // Retain the existing matching behavior if browser workers fail. This
      // fallback receives the exact already-filtered records, never the master.
      current.timeout = setTimeout(() => {
        if (!isCurrent()) return;
        try {
          const ids = searchOpportunities(eligibleSnapshot.items, query, language, { proximityResolved }).map((item) => item.id);
          if (isCurrent()) setReply({ key, ids });
        } catch {
          if (isCurrent()) setReply({ key, ids: [], error: "Search is unavailable right now. Clear the search to browse the filtered listings." });
        }
      }, 0);
    } else {
      // Avoid queuing an expensive full-catalog match for every intermediate
      // keystroke. Cleanup cancels this timer when the next input arrives.
      current.timeout = setTimeout(() => {
        if (!isCurrent()) return;
        try {
          worker.current!.postMessage({
            type: "search", generation: current.generation, sequence: current.sequence,
            eligibleIds: Array.from(eligibleSnapshot.ids), query, language, proximityResolved
          } satisfies OpportunitySearchWorkerRequest);
          current.timeout = setTimeout(() => { if (isCurrent()) failWorker(); }, 15_000);
        } catch {
          failWorker();
        }
      }, 200);
    }
    return () => {
      clearTimeout(current.timeout);
      if (pending.current === current) pending.current = null;
    };
  }, [hasQuery, key, masterSnapshot.generation, eligibleSnapshot, query, language, proximityResolved, workerFailed, failWorker]);

  const results = useMemo(() => reply.key === key
    ? reply.ids.flatMap((id) => eligibleSnapshot.byId.has(id) ? [eligibleSnapshot.byId.get(id)!] : [])
    : [], [reply, key, eligibleSnapshot]);
  if (!hasQuery) return { results: eligible, searching: false };
  return { results, searching: reply.key !== key, error: reply.key === key ? reply.error : undefined };
}
