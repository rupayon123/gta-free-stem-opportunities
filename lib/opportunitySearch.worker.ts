import { languageMeta } from "./i18n";
import { searchOpportunities } from "./search";
import type { LanguageCode, Opportunity } from "./types";

export type OpportunitySearchWorkerRequest =
  | { type: "initialize"; generation: number; items: Opportunity[] }
  | {
    type: "search";
    generation: number;
    sequence: number;
    eligibleIds: string[];
    query: string;
    language: LanguageCode;
    proximityResolved: boolean;
  };

export type OpportunitySearchWorkerResponse =
  | { type: "ready"; generation: number }
  | { type: "results"; generation: number; sequence: number; ids: string[] }
  | { type: "error"; generation: number; sequence?: number; message: string };

/** The same handler can be exercised without a browser or a public worker URL. */
export function createOpportunitySearchWorkerHandler(send: (response: OpportunitySearchWorkerResponse) => void) {
  let generation = -1;
  let latestSequence = 0;
  let master = new Map<string, Opportunity>();

  return (request: OpportunitySearchWorkerRequest) => {
    const requestGeneration = request?.generation;
    const sequence = request?.type === "search" ? request.sequence : undefined;
    try {
      if (!Number.isSafeInteger(requestGeneration) || requestGeneration < 1) throw new Error("Invalid generation");
      if (request.type === "initialize") {
        if (requestGeneration < generation) return;
        if (requestGeneration === generation) {
          send({ type: "ready", generation });
          return;
        }
        if (!Array.isArray(request.items) || request.items.some((item) => typeof item?.id !== "string")) {
          throw new Error("Invalid catalog");
        }
        // The records are installed once per catalog revision. Every query
        // reuses these objects so the existing search document/index caches work.
        master = new Map(request.items.map((item) => [item.id, item]));
        generation = requestGeneration;
        latestSequence = 0;
        send({ type: "ready", generation });
        return;
      }
      if (request.type !== "search" || requestGeneration !== generation ||
          !Number.isSafeInteger(request.sequence) || request.sequence < 1 ||
          !Array.isArray(request.eligibleIds) || request.eligibleIds.some((id) => typeof id !== "string") ||
          typeof request.query !== "string" || !Object.hasOwn(languageMeta, request.language) ||
          typeof request.proximityResolved !== "boolean") {
        throw new Error("Invalid search request");
      }
      if (request.sequence <= latestSequence) return;
      latestSequence = request.sequence;
      const eligible = [...new Set(request.eligibleIds)].map((id) => {
        const item = master.get(id);
        if (!item) throw new Error("Catalog revision does not contain an eligible record");
        return item;
      });
      const ids = searchOpportunities(eligible, request.query, request.language, {
        proximityResolved: request.proximityResolved
      }).map((item) => item.id);
      send({ type: "results", generation, sequence: request.sequence, ids });
    } catch {
      send({ type: "error", generation: requestGeneration, sequence, message: "Opportunity search could not finish." });
    }
  };
}

if (typeof self !== "undefined" && typeof window === "undefined") {
  const scope = self as unknown as {
    postMessage: (response: OpportunitySearchWorkerResponse) => void;
    addEventListener: (type: "message", callback: (event: MessageEvent<OpportunitySearchWorkerRequest>) => void) => void;
  };
  const handle = createOpportunitySearchWorkerHandler((response) => scope.postMessage(response));
  scope.addEventListener("message", (event) => handle(event.data));
}
