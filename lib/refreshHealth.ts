export type RefreshSourceHealthInput = {
  sourceId: string;
  organization: string;
  attemptedPages: number;
  successfulPages: number;
  acceptedListings: number;
};

export type RefreshSourceHealth = RefreshSourceHealthInput & {
  failedPages: number;
  pageSuccessRatio: number;
};

export type LibrarySourceHealth = {
  schemaVersion: 1;
  generatedAt: string;
  status: "healthy" | "rejected";
  failureReasons: string[];
  sourceCount: number;
  attemptedPages: number;
  successfulPages: number;
  failedPages: number;
  pageSuccessRatio: number;
  minimumPageSuccessRatio: number;
  minimumPerSourceSuccessRatio: number;
  acceptedListings: number;
  previousPublishedListings: number;
  minimumAcceptedListings: number;
  sources: RefreshSourceHealth[];
};

export type LibraryRefreshHealthInput = {
  generatedAt: string;
  sources: RefreshSourceHealthInput[];
  acceptedListings: number;
  previousPublishedListings: number;
  minimumPageSuccessRatio?: number;
  minimumPerSourceSuccessRatio?: number;
  minimumOutputRatio?: number;
  minimumPublishedListings?: number;
};

export type DiscoverySourceHealth = {
  schemaVersion: 1;
  generatedAt: string;
  status: "healthy" | "rejected";
  failureReasons: string[];
  sourcesChecked: number;
  successfulSources: number;
  failedSources: number;
  sourceSuccessRatio: number;
  minimumSourceSuccessRatio: number;
};

export type DiscoverySourceHealthInput = {
  generatedAt: string;
  sourcesChecked: number;
  successfulSources: number;
  minimumSourceSuccessRatio?: number;
};

export const defaultLibraryRefreshHealthPolicy = {
  minimumPageSuccessRatio: 0.75,
  minimumPerSourceSuccessRatio: 0.5,
  minimumOutputRatio: 0.65,
  minimumPublishedListings: 30
} as const;

export const defaultDiscoverySourceHealthPolicy = {
  minimumSourceSuccessRatio: 0.75
} as const;

function boundedRatio(value: number | undefined, fallback: number) {
  if (value === undefined || !Number.isFinite(value) || value < 0 || value > 1) return fallback;
  return value;
}

function positiveInteger(value: number | undefined, fallback: number) {
  if (value === undefined || !Number.isFinite(value) || value < 0) return fallback;
  return Math.floor(value);
}

function ratio(numerator: number, denominator: number) {
  if (denominator <= 0) return 0;
  return Number((numerator / denominator).toFixed(4));
}

export function evaluateLibraryRefreshHealth(input: LibraryRefreshHealthInput) {
  const minimumPageSuccessRatio = boundedRatio(
    input.minimumPageSuccessRatio,
    defaultLibraryRefreshHealthPolicy.minimumPageSuccessRatio
  );
  const minimumPerSourceSuccessRatio = boundedRatio(
    input.minimumPerSourceSuccessRatio,
    defaultLibraryRefreshHealthPolicy.minimumPerSourceSuccessRatio
  );
  const minimumOutputRatio = boundedRatio(input.minimumOutputRatio, defaultLibraryRefreshHealthPolicy.minimumOutputRatio);
  const minimumPublishedListings = positiveInteger(
    input.minimumPublishedListings,
    defaultLibraryRefreshHealthPolicy.minimumPublishedListings
  );
  const sources = input.sources.map((source) => {
    const attemptedPages = Math.max(0, source.attemptedPages);
    const successfulPages = Math.max(0, Math.min(attemptedPages, source.successfulPages));
    return {
      ...source,
      attemptedPages,
      successfulPages,
      acceptedListings: Math.max(0, source.acceptedListings),
      failedPages: attemptedPages - successfulPages,
      pageSuccessRatio: ratio(successfulPages, attemptedPages)
    };
  });
  const attemptedPages = sources.reduce((total, source) => total + source.attemptedPages, 0);
  const successfulPages = sources.reduce((total, source) => total + source.successfulPages, 0);
  const previousPublishedListings = Math.max(0, input.previousPublishedListings);
  const minimumAcceptedListings = Math.max(
    minimumPublishedListings,
    Math.ceil(previousPublishedListings * minimumOutputRatio)
  );
  const failureReasons: string[] = [];
  const pageSuccessRatio = ratio(successfulPages, attemptedPages);

  if (sources.length === 0) {
    failureReasons.push("No upstream sources were configured.");
  }
  if (pageSuccessRatio < minimumPageSuccessRatio) {
    failureReasons.push(
      `Only ${(pageSuccessRatio * 100).toFixed(1)}% of source pages succeeded; the minimum is ${(minimumPageSuccessRatio * 100).toFixed(1)}%.`
    );
  }
  for (const source of sources) {
    if (source.pageSuccessRatio < minimumPerSourceSuccessRatio) {
      failureReasons.push(
        `${source.organization} returned ${(source.pageSuccessRatio * 100).toFixed(1)}% of its expected pages; the minimum per source is ${(minimumPerSourceSuccessRatio * 100).toFixed(1)}%.`
      );
    }
  }
  if (input.acceptedListings < minimumAcceptedListings) {
    failureReasons.push(
      `Only ${input.acceptedListings} publishable listings were generated; the minimum is ${minimumAcceptedListings}.`
    );
  }

  const health: LibrarySourceHealth = {
    schemaVersion: 1,
    generatedAt: input.generatedAt,
    status: failureReasons.length ? "rejected" : "healthy",
    failureReasons,
    sourceCount: sources.length,
    attemptedPages,
    successfulPages,
    failedPages: attemptedPages - successfulPages,
    pageSuccessRatio,
    minimumPageSuccessRatio,
    minimumPerSourceSuccessRatio,
    acceptedListings: input.acceptedListings,
    previousPublishedListings,
    minimumAcceptedListings,
    sources
  };

  return {
    healthy: health.status === "healthy",
    health
  };
}

export function evaluateDiscoverySourceHealth(input: DiscoverySourceHealthInput) {
  const sourcesChecked = Math.max(0, input.sourcesChecked);
  const successfulSources = Math.max(0, Math.min(sourcesChecked, input.successfulSources));
  const minimumSourceSuccessRatio = boundedRatio(
    input.minimumSourceSuccessRatio,
    defaultDiscoverySourceHealthPolicy.minimumSourceSuccessRatio
  );
  const sourceSuccessRatio = ratio(successfulSources, sourcesChecked);
  const failureReasons: string[] = [];

  if (sourcesChecked === 0) {
    failureReasons.push("No discovery sources were configured.");
  }
  if (sourceSuccessRatio < minimumSourceSuccessRatio) {
    failureReasons.push(
      `Only ${(sourceSuccessRatio * 100).toFixed(1)}% of discovery sources succeeded; the minimum is ${(minimumSourceSuccessRatio * 100).toFixed(1)}%.`
    );
  }

  const health: DiscoverySourceHealth = {
    schemaVersion: 1,
    generatedAt: input.generatedAt,
    status: failureReasons.length ? "rejected" : "healthy",
    failureReasons,
    sourcesChecked,
    successfulSources,
    failedSources: sourcesChecked - successfulSources,
    sourceSuccessRatio,
    minimumSourceSuccessRatio
  };

  return {
    healthy: health.status === "healthy",
    health
  };
}
