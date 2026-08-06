import type { Category } from "./types";

export type LibraryOpportunityClassificationInput = {
  title: string;
  description: string;
  categories: readonly string[];
};

type PublishedLibraryOpportunityClassificationInput = {
  title?: unknown;
  description?: unknown;
  tags?: unknown;
  categories?: unknown;
};

const trustedStemSourceCategories = new Set([
  "3d printing",
  "artificial intelligence",
  "coding & robotics",
  "computer basics & office software",
  "digital literacy",
  "let's learn tech",
  "makerspace",
  "science & engineering",
  "steam"
]);

const obviousNonStemFormats =
  /\b(?:board game|book club|concert|craft(?:ing)?|crafternoon|creative writing|crochet|film|game night|gaming night|karaoke|knit(?:ting)?|movie|painting|poetry|storytime|watch party|writing club)\b/i;

const titleStemSignals =
  /\b(?:3d (?:design|model(?:ing|ling)|print(?:er|ing)?)|adobe|ai|animat(?:e|ion)|app development|arduino|artificial intelligence|astronomy|blocks? challenges?|build with (?:blocks?|duplo|keva|lego)|builders? club|canva|circuit(?:ry|s)?|climate|code|coder|coding|computer|conservation|cricut|cyber ?security|data science|digital|ecology|electronics?|engineering|experiment(?:s)?|fabrication|game design|graphic design|illustrator|laser engrav(?:e|er|ing)|makedo|math(?:ematics)?|makerspace|programming|python|robot(?:ics|s)?|science|scratch|screen ?print(?:er|ing)?|steam|stem|stop[ -]motion|sublimation print(?:er|ing)|technology|tinkercad|virtual reality|vr|wacom|web design)\b/i;

const descriptionStemSignals =
  /\b(?:3d (?:design|model(?:ing|ling)|print(?:er|ing)?)|adobe|arduino|artificial intelligence|astronomy|circuit(?:ry|s)?|climate action|climate science|coding|conservation|cricut|cyber ?security|data science|digital literacy|duplo|ecology|electronics?|engineering|experiment(?:s)?|fabrication|game design|illustrator|keva|laser engrav(?:e|er|ing)|lego|machine learning|makedo|math(?:ematics)?|makerspace|python|robotics|science|scratch|screen ?print(?:er|ing)?|steam|stem|stop[ -]motion|sublimation print(?:er|ing)|tinkercad|virtual reality|vr|wacom)\b|\b(?:computer|robot|software) programming\b|\bprogramming (?:concepts?|language|skills?)\b/i;

const learningActivitySignals =
  /\b(?:analy[sz]e|build|challenge|class|construct|course|create|demonstration|design|develop|experiment|explore|hands-on|introduction|lab|learn|operate|practice|program|skills?|teach|test|training|workshop)\b/i;

const educationalTechnologyDescription =
  /\b(?:build|class|course|create|design|develop|explore|introduction|learn|program|skills?|training|workshop)\b[\s\S]{0,120}\b(?:animation|computer|digital|technology)\b|\b(?:animation|computer|digital|technology)\b[\s\S]{0,120}\b(?:build|class|course|create|design|develop|explore|introduction|learn|program|skills?|training|workshop)\b/i;

const aiAndDigitalSignals =
  /\b(?:adobe|ai|animat(?:e|ion)|artificial intelligence|canva|computer|cyber ?security|data science|digital|game design|graphic design|illustrator|machine learning|stop[ -]motion|technology|virtual reality|vr|wacom|web design)\b/i;
const fabricationSignals =
  /\b(?:3d (?:design|model(?:ing|ling)|print(?:er|ing)?)|cricut|fabrication|laser engrav(?:e|er|ing)|makedo|makerspace|screen ?print(?:er|ing)?|sublimation print(?:er|ing)|tinkercad)\b/i;
const scienceSignals =
  /\b(?:astronomy|blocks? challenges?|builders? club|circuit(?:ry|s)?|climate|conservation|duplo|ecology|electronics?|engineering|experiment(?:s)?|keva|lego|math(?:ematics)?|science|steam|stem)\b/i;

function normalized(value: string) {
  return value
    .normalize("NFKC")
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function hasTrustedStemSourceCategory(categories: readonly string[]) {
  return categories.some((category) => trustedStemSourceCategories.has(normalized(category)));
}

function signalsAppearNearby(value: string, first: RegExp, second: RegExp, maximumDistance: number) {
  const indexesFor = (pattern: RegExp) =>
    [...value.matchAll(new RegExp(pattern.source, `${pattern.flags.replace("g", "")}g`))].map(
      (match) => match.index
    );
  const firstIndexes = indexesFor(first);
  const secondIndexes = indexesFor(second);
  return firstIndexes.some((firstIndex) =>
    secondIndexes.some((secondIndex) => Math.abs(firstIndex - secondIndex) <= maximumDistance)
  );
}

/**
 * Treat the official event categories as evidence only when they name a
 * specific STEM discipline. Generic library categories such as crafts,
 * storytimes, careers, or lifelong learning are not enough by themselves.
 */
export function isLibraryOpportunityStemRelevant(input: LibraryOpportunityClassificationInput) {
  const title = normalized(input.title);
  const description = normalized(input.description);
  const trustedSourceCategory = hasTrustedStemSourceCategory(input.categories);

  if (trustedSourceCategory) return true;

  const descriptionHasStemEvidence =
    signalsAppearNearby(description, descriptionStemSignals, learningActivitySignals, 180) ||
    educationalTechnologyDescription.test(description);

  // An event with a generic entertainment/craft title needs STEM evidence in
  // that title (for example, "Circuit Craft" or "Stop-Motion Movie Lab").
  // This blocks plot/schedule mentions such as "The Wild Robot" and a craft
  // series whose later calendar merely mentions "Robot Basketball".
  if (obviousNonStemFormats.test(title)) return titleStemSignals.test(title);

  return titleStemSignals.test(title) || descriptionHasStemEvidence;
}

function stringValues(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

/**
 * Count previously published rows against the same relevance policy used for a
 * new refresh. Source tags take precedence because generated categories may
 * contain an older inferred STEM label that the current classifier rejects.
 */
export function countClassifierRelevantLibraryOpportunities(inputs: readonly unknown[]) {
  return inputs.reduce<number>((count, input) => {
    if (!input || typeof input !== "object") return count;

    const candidate = input as PublishedLibraryOpportunityClassificationInput;
    if (typeof candidate.title !== "string" || typeof candidate.description !== "string") return count;

    const categories = Array.isArray(candidate.tags)
      ? stringValues(candidate.tags)
      : stringValues(candidate.categories);

    return count +
      (isLibraryOpportunityStemRelevant({
        title: candidate.title,
        description: candidate.description,
        categories
      })
        ? 1
        : 0);
  }, 0);
}

export function inferLibraryOpportunityCategory(input: LibraryOpportunityClassificationInput): Category {
  const title = normalized(input.title);
  const description = normalized(input.description);
  const titleAndDescription = `${title} ${description}`;
  const sourceCategories = normalized(input.categories.join(" "));
  const allEvidence = `${titleAndDescription} ${sourceCategories}`;
  const hasCodingEvidence =
    /\b(?:coding & robotics|arduino|code|coder|coding|python|robotics|scratch)\b/i.test(`${title} ${sourceCategories}`) ||
    /\b(?:arduino|coding|computer programming|programming (?:concepts?|language|skills?)|python|robotics|scratch)\b/i.test(
      description
    );

  if (hasCodingEvidence) return "Coding & Robotics";
  if (/\b(?:ai|artificial intelligence|machine learning)\b/i.test(titleAndDescription)) return "AI & Digital Media";
  if (fabricationSignals.test(allEvidence)) return "Makerspace & Fabrication";
  if (scienceSignals.test(allEvidence)) return "Science & Engineering";
  if (aiAndDigitalSignals.test(allEvidence)) return "AI & Digital Media";

  // Relevance is checked before classification. This fallback is therefore a
  // conservative STEM label, never a generic family/craft classification.
  return "STEM";
}
