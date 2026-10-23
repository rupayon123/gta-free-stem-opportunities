import Fuse from "fuse.js";
import { languageMeta, translatedCategory } from "./i18n";
import { categorySearchAliases, librarySearchTerms, libraryTopicTerms, proximitySearchPhrases, searchFillerTerms, searchRequestMarkers, sourceTopicSearchAliases } from "./searchLexicon";
import type { LanguageCode, Opportunity } from "./types";

/** Fold Latin accents without deleting the vowel signs used by Indic scripts. */
export function normalizeSearchText(value: string): string {
  return value.normalize("NFKC").normalize("NFD").replace(/(\p{Script=Latin})\p{M}+/gu, "$1").normalize("NFC").toLowerCase();
}

const wordSegmenter = typeof Intl.Segmenter === "function"
  ? new Intl.Segmenter(undefined, { granularity: "word" })
  : undefined;

function tokenize(value: string): string[] {
  const chunks = normalizeSearchText(value).match(/\d{4}-\d{2}-\d{2}|[\p{L}\p{M}\p{N}]+/gu) ?? [];
  return chunks.flatMap((chunk) => {
    if (!wordSegmenter || !/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(chunk)) return [chunk];
    return Array.from(wordSegmenter.segment(chunk)).filter((part) => part.isWordLike).map((part) => part.segment);
  });
}

function escapePattern(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const libraryAliases = Array.from(new Set(Object.values(librarySearchTerms).flat().map(normalizeSearchText)))
  .sort((a, b) => b.length - a.length);
const sourceTopicPatterns = sourceTopicSearchAliases.map(({ signals, aliases }) => ({
  aliases,
  pattern: new RegExp(`(?<![\\p{L}\\p{M}\\p{N}])(?:${signals.map((signal) => escapePattern(normalizeSearchText(signal)).replace(/ +/g, "\\s+")).join("|")})(?![\\p{L}\\p{M}\\p{N}])`, "u")
}));
const libraryPatterns = libraryAliases.map((alias) => {
  const cjk = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(alias);
  return new RegExp(`${cjk ? "" : "(?<![\\p{L}\\p{M}\\p{N}])"}${escapePattern(alias)}${cjk ? "" : "(?![\\p{L}\\p{M}\\p{N}])"}`, "gu");
});
const proximityPatterns = proximitySearchPhrases.map((phrase) => {
  const normalized = normalizeSearchText(phrase);
  const cjk = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(normalized);
  return new RegExp(`${cjk ? "" : "(?<![\\p{L}\\p{M}\\p{N}])"}${escapePattern(normalized)}${cjk ? "" : "(?![\\p{L}\\p{M}\\p{N}])"}`, "gu");
});
const fillerByLanguage = Object.fromEntries(Object.entries(searchFillerTerms).map(([language, terms]) => [
  language,
  new Set([...searchFillerTerms.en, ...terms].flatMap(tokenize))
])) as Record<LanguageCode, Set<string>>;
const requestLanguagePatterns = Object.entries(searchRequestMarkers).map(([language, markers]) => ({
  language: language as LanguageCode,
  patterns: markers.map((marker) => {
    const normalized = normalizeSearchText(marker);
    const cjk = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(normalized);
    const phrase = escapePattern(normalized).replace(/ +/g, "\\s+");
    return new RegExp(`${cjk ? "" : "(?<![\\p{L}\\p{M}\\p{N}])"}${phrase}${cjk ? "" : "(?![\\p{L}\\p{M}\\p{N}])"}`, "u");
  })
}));

function requestLanguage(query: string, fallback: LanguageCode): LanguageCode {
  const normalized = normalizeSearchText(query);
  const matches = requestLanguagePatterns.filter(({ patterns }) => patterns.some((pattern) => pattern.test(normalized)));
  // Ambiguous mixed requests keep the selected language rather than merging
  // stopword lists and accidentally discarding another language's topic.
  return matches.length === 1 ? matches[0].language : fallback;
}

/** Text search has no location fix. The UI can direct this request to its location controls. */
export function hasUnresolvedProximityQuery(query: string): boolean {
  const normalized = normalizeSearchText(query);
  return proximityPatterns.some((pattern) => {
    pattern.lastIndex = 0;
    return pattern.test(normalized);
  });
}

function canonicalizeLibraries(value: string): string {
  return libraryPatterns.reduce((text, pattern) => text.replace(pattern, " library "), normalizeSearchText(value));
}

// Damerau-Levenshtein is used only as a final bound on Fuse's fuzzy matches.
// It never fuzzes short words, numbers, dates or text from different scripts.
function editDistanceWithin(a: string, b: string, maximum: number): boolean {
  const left = Array.from(a);
  const right = Array.from(b);
  if (Math.abs(left.length - right.length) > maximum) return false;
  let previousPrevious: number[] | undefined;
  let previous = right.map((_, index) => index + 1);
  previous.unshift(0);
  for (let row = 1; row <= left.length; row += 1) {
    const current = [row];
    for (let column = 1; column <= right.length; column += 1) {
      current[column] = Math.min(
        current[column - 1] + 1,
        previous[column] + 1,
        previous[column - 1] + (left[row - 1] === right[column - 1] ? 0 : 1)
      );
      if (previousPrevious && row > 1 && column > 1 && left[row - 1] === right[column - 2] && left[row - 2] === right[column - 1]) {
        current[column] = Math.min(current[column], previousPrevious[column - 2] + 1);
      }
    }
    if (Math.min(...current) > maximum) return false;
    previousPrevious = previous;
    previous = current;
  }
  return previous[right.length] <= maximum;
}

const scripts = ["Latin", "Han", "Hiragana", "Katakana", "Hangul", "Arabic", "Devanagari", "Gurmukhi", "Tamil", "Gujarati", "Bengali"]
  .map((name) => new RegExp(`\\p{Script=${name}}`, "u"));
function sameScript(a: string, b: string): boolean {
  return scripts.some((script) => script.test(a) && script.test(b));
}

// Reviewed activity requests already have source-backed canonical aliases in
// the index. Require that exact token so e.g. reading cannot match leading,
// crafts cannot match drafts, or conversation cannot match conservation.
const exactLibraryTopicTokens = new Set(Object.keys(libraryTopicTerms.en));

function tokenMatches(query: string, candidate: string): boolean {
  if (query === candidate) return true;
  if (exactLibraryTopicTokens.has(query)) return false;
  if (/\p{N}/u.test(query) || /\p{N}/u.test(candidate)) return false;
  const length = Array.from(query).length;
  if (length < 4) return false;
  if (candidate.startsWith(query)) return true;
  if (length < 5 || !sameScript(query, candidate)) return false;
  const maximum = Math.min(2, Math.floor(length * 0.2));
  return editDistanceWithin(query, candidate, maximum);
}

// Reviewed whole-token misspellings reproduced in the public catalog. Without
// this preference, "scince" also matches ordinary "since", while "robtics"
// misses records found by the canonical robotics query. Do not infer a broader
// spelling dictionary: legitimate words such as since, leading and campus keep
// their meaning, and unknown terms/numbers remain mandatory query constraints.
const reviewedQuerySpellings = new Map([
  ["scince", "science"],
  ["robtics", "robotics"]
]);

function queryTokens(query: string, language: LanguageCode): string[] {
  const effectiveLanguage = requestLanguage(query, language);
  const fillers = fillerByLanguage[effectiveLanguage] ?? fillerByLanguage.en;
  let canonical = canonicalizeLibraries(query);
  // Resolve reviewed activity words in the request's language before ranking.
  // French "lecture" means reading; an English astronomy lecture must not
  // become a match just because the same spelling appears in its description.
  for (const [topic, phrase] of Object.entries(libraryTopicTerms[effectiveLanguage]).sort((a, b) => b[1].length - a[1].length)) {
    const normalized = normalizeSearchText(phrase);
    const attached = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(normalized);
    const boundary = "[\\p{L}\\p{M}\\p{N}]";
    const pattern = new RegExp(`${attached ? "" : `(?<!${boundary})`}${escapePattern(normalized)}${attached ? "" : `(?!${boundary})`}`, "gu");
    canonical = canonical.replace(pattern, ` ${topic} `);
  }
  if (["zh", "yue", "ja", "ko"].includes(effectiveLanguage)) {
    // Protect reviewed activity names before removing attached request
    // particles: Japanese おはなし会 contains は as part of the noun.
    // Use only the effective language so e.g. 工作 is not translated across
    // languages with different meanings.
    // These languages routinely attach request particles without spaces.
    for (const filler of [...searchFillerTerms[effectiveLanguage]].sort((a, b) => b.length - a.length)) {
      canonical = canonical.replaceAll(normalizeSearchText(filler), " ");
    }
  }
  return Array.from(new Set(tokenize(canonical).filter((token) => !fillers.has(token)).map((token) => {
    const reviewedSpelling = reviewedQuerySpellings.get(token);
    if (reviewedSpelling) return reviewedSpelling;
    // Preserve the same reviewed concept when a library name has a small typo.
    if (libraryAliases.some((alias) => !alias.includes(" ") && tokenMatches(token, alias))) return "library";
    return token;
  })));
}

type SearchDocument = {
  item: Opportunity;
  title: string;
  categories: string[];
  provider: string[];
  description: string[];
  tags: string[];
  place: string[];
  dates: string[];
  terms: string[];
};

const languages = Object.keys(languageMeta) as LanguageCode[];
const documentCache = new WeakMap<Opportunity, SearchDocument>();
function documentFor(item: Opportunity): SearchDocument {
  const cached = documentCache.get(item);
  if (cached) return cached;
  const categories = Array.from(new Set([item.category, ...item.categories]));
  const provider = [item.provider, item.organization];
  const isLibrary = libraryPatterns.some((pattern) => {
    pattern.lastIndex = 0;
    return pattern.test(normalizeSearchText(provider.join(" ")));
  });
  const sourceTopicText = normalizeSearchText([item.title, item.description, ...item.tags].join("\n"));
  const topicAliases = sourceTopicPatterns.flatMap(({ pattern, aliases }) => pattern.test(sourceTopicText) ? aliases : []);
  const fields = {
    title: normalizeSearchText(item.title),
    categories: categories.flatMap((category) => [category, ...languages.map((language) => translatedCategory(category, language)), ...(categorySearchAliases[category] ?? [])]).map(normalizeSearchText),
    provider: [...provider, ...(isLibrary ? ["library"] : [])].map(normalizeSearchText),
    description: [item.description, item.summary].map(normalizeSearchText),
    tags: [...item.tags, ...topicAliases].map(normalizeSearchText),
    place: [item.city, item.region, item.address].map(normalizeSearchText),
    dates: [item.startDate, item.endDate ?? "", item.deadline ?? ""].map(normalizeSearchText)
  };
  const terms = Array.from(new Set(Object.values(fields).flat().flatMap(tokenize)));
  const document = { item, ...fields, terms };
  documentCache.set(item, document);
  return document;
}

type CachedIndex = {
  items: readonly Opportunity[];
  documents: SearchDocument[];
  fuse: Fuse<SearchDocument>;
  results: Map<string, readonly Opportunity[]>;
};
const maximumCachedQueries = 32;
const indexes: CachedIndex[] = [];
function indexFor(items: readonly Opportunity[]): CachedIndex {
  const cachedIndex = indexes.findIndex((entry) => entry.items.length === items.length && entry.items.every((item, index) => item === items[index]));
  if (cachedIndex >= 0) {
    const [cached] = indexes.splice(cachedIndex, 1);
    indexes.unshift(cached);
    return cached;
  }
  const documents = items.map(documentFor);
  const entry: CachedIndex = {
    items: Array.from(items),
    documents,
    results: new Map(),
    fuse: new Fuse(documents, {
      useTokenSearch: true,
      tokenMatch: "all",
      tokenize,
      ignoreDiacritics: false,
      ignoreLocation: true,
      // Bitap counts a swapped pair as two edits. The whole-token guard below
      // still requires at most one Damerau edit for words shorter than 10 letters.
      threshold: 0.4,
      includeScore: true,
      keys: [
        { name: "title", weight: 0.32 },
        { name: "categories", weight: 0.25 },
        { name: "provider", weight: 0.18 },
        { name: "description", weight: 0.12 },
        { name: "tags", weight: 0.07 },
        { name: "place", weight: 0.05 },
        { name: "dates", weight: 0.01 }
      ]
    })
  };
  indexes.unshift(entry);
  if (indexes.length > 4) indexes.pop();
  return entry;
}

export type OpportunitySearchOptions = { proximityResolved?: boolean };

/** Search only the supplied records; public/age/distance filters remain the caller's responsibility. */
export function searchOpportunities(items: readonly Opportunity[], query: string, language: LanguageCode = "en", options: OpportunitySearchOptions = {}): Opportunity[] {
  if (query.length > 500 || (hasUnresolvedProximityQuery(query) && !options.proximityResolved)) return [];
  const effectiveQuery = options.proximityResolved
    ? proximityPatterns.reduce((value, pattern) => value.replace(pattern, " "), normalizeSearchText(query))
    : query;
  const tokens = queryTokens(effectiveQuery, language);
  if (!tokens.length) return Array.from(items);
  const index = indexFor(items);
  // Ranking and whole-token eligibility depend only on this exact ordered
  // token list and the index's record references/order. Keep a small LRU per
  // index, including empty matches, and never expose its mutable array.
  const key = JSON.stringify(tokens);
  const cached = index.results.get(key);
  if (cached) {
    index.results.delete(key);
    index.results.set(key, cached);
    return Array.from(cached);
  }
  const result = index.fuse.search(tokens.join(" "))
    .filter(({ item }) => tokens.every((token) => item.terms.some((candidate) => tokenMatches(token, candidate))))
    .map(({ item }) => item.item);
  index.results.set(key, result);
  if (index.results.size > maximumCachedQueries) index.results.delete(index.results.keys().next().value!);
  return Array.from(result);
}
