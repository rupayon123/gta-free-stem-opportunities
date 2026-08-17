import type { Category } from "./types";

export type DiscoveryTagEvidenceInput = {
  category: Category;
  title: string;
  description: string;
  sourceName: string;
  sourceOrganization: string;
  sourceKeywords: readonly string[];
  candidateTags?: readonly string[];
};

export function isGeneratedDiscoveryOpportunityId(id: string) {
  return id.startsWith("discovered-");
}

export function discoverySourceRequiresSpecificStemEvidence(input: {
  id: string;
  sourceType: string;
}) {
  return (
    input.sourceType === "library" &&
    /(?:^|-)(?:coding|stem|tech)(?:-|$)/i.test(input.id)
  );
}

function normalized(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^a-z0-9+#]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizedTag(value: string) {
  return value.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
}

function containsPhrase(text: string, phrase: string) {
  const normalizedPhrase = normalized(phrase);
  return normalizedPhrase.length > 0 && ` ${text} `.includes(` ${normalizedPhrase} `);
}

function candidateEvidenceText(input: DiscoveryTagEvidenceInput) {
  const title = normalized(input.title);
  let description = normalized(input.description);

  // Generic discovery descriptions may end in "listed by <source name>".
  // Source labels describe the search surface, not the individual event, so
  // remove them before deciding which source keywords the event earned.
  for (const attribution of [input.sourceName, input.sourceOrganization]) {
    const normalizedAttribution = normalized(attribution);
    if (normalizedAttribution) description = description.replaceAll(normalizedAttribution, " ");
  }

  return normalized(`${title} ${description}`);
}

export function evidenceBackedDiscoveryTags(input: DiscoveryTagEvidenceInput) {
  const evidenceText = candidateEvidenceText(input);
  const evidencedSourceKeywords = input.sourceKeywords
    .filter((keyword) => containsPhrase(evidenceText, keyword))
    .map(normalizedTag);
  const candidateTags = (input.candidateTags ?? []).map(normalizedTag).filter(Boolean);

  return Array.from(
    new Set([normalizedTag(input.category), ...evidencedSourceKeywords, ...candidateTags])
  ).slice(0, 12);
}

export function inferDiscoveryCategory(text: string): Category {
  const lower = text.toLowerCase();
  if (lower.includes("volunteer")) return "Volunteer Hours";
  if (lower.includes("co-op") || lower.includes("coop") || lower.includes("shsm")) return "Co-op & SHSM";
  if (lower.includes("hackathon") || lower.includes("competition")) return "Hackathons & Competitions";
  if (lower.includes("mentor") || lower.includes("career")) return "Career & Mentorship";
  if (/\b(?:robot(?:ics|s)?|coding|python|arduino|scratch)\b/i.test(text)) return "Coding & Robotics";
  if (
    /\b(?:3d (?:model(?:ing|ling)|print(?:er|ing)?|sculpt(?:ing)?|design)|cricut|fabrication|laser (?:cutter|engraving)|maker(?:space)?|sculptgl|tinkercad)\b/i.test(
      text
    )
  ) {
    return "Makerspace & Fabrication";
  }
  if (/\b(?:ai|artificial intelligence|data science|digital media|machine learning)\b/i.test(text)) {
    return "AI & Digital Media";
  }
  if (/\b(?:climate|conservation|engineering|environment|math(?:ematics)?|science|steam|stem)\b/i.test(text)) {
    return "Science & Engineering";
  }
  return "STEM";
}
