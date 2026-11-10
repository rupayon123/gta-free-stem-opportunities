/** Separate curated records. These are never ordinary dated-feed opportunities. */
export type ListingKind = "event" | "role" | "program" | "provider-directory" | "resource";
export type Pathway = "volunteer" | "learning" | "leadership-careers" | "funding";
export type Availability = "open" | "closed" | "upcoming" | "unknown" | "conflicting";
export type CostStatus = "no-fee-evidence" | "required-cost" | "unknown";
/** Authored factual detail, not a claim to reproduce the provider's full copyrighted page. */
export interface YouthRoleDetails {
  contentMode: "authored-facts";
  description: string;
  responsibilities: string[];
  requirements: string[];
  commitment: string;
  selection: string;
  costNotes: string;
  applicationUrl: string;
  applicationInstructions: string;
}
export interface YouthListing {
  schemaVersion: 1;
  id: string;
  listingKind: ListingKind;
  pathway: Pathway;
  title: string;
  provider: string;
  sourceUrl: string;
  checkedAt: string;
  reviewStatus: "approved" | "hold";
  audience: {
    context: "high-school" | "teen" | "adult" | "child-with-adult" | "all-ages" | "unknown";
    original: string;
    ageMin?: number;
    ageMax?: number;
    grades?: number[];
    residency?: string;
    restrictions?: string[];
  };
  cost: {
    status: CostStatus;
    original: string;
    requiredCosts: { description: string; mandatory: boolean; amount?: number; currency?: string }[];
  };
  availability: {
    status: Availability;
    original: string;
    conflicting: boolean;
    opensAt?: string;
    closesAt?: string;
    /** Provider's explicit season end; never inferred from a generic directory. */
    seasonEndsOn?: string;
  };
  hours: { status: "not-stated" | "provider-stated"; minutes?: number; original?: string };
  regions?: string[];
  delivery?: "in-person" | "virtual" | "hybrid" | "unknown";
  commitmentOriginal?: string;
  roleDetails?: YouthRoleDetails;
}

export function validLocalDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  return year >= 1900 && year <= 9999 && month >= 1 && month <= 12 && day >= 1 &&
    day <= [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

export function validTimestamp(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(?:Z|[+-](?:0\d|1[0-4]):[0-5]\d)$/.test(value)) return false;
  return validLocalDate(value.slice(0, 10)) && Number.isFinite(Date.parse(value));
}

function requireValue(ok: unknown, field: string): asserts ok {
  if (!ok) throw new Error(`Invalid youth listing: ${field}`);
}
function text(value: unknown, max = 2000): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}
function optionalText(value: unknown, max = 2000): boolean { return value === undefined || text(value, max); }
export function safeSourceUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 2048) return false;
  try {
    const u = new URL(value);
    // Curated provider links use public domain names, never IP/local destinations.
    // URL normalizes integer/hex IPv4 forms before this check. No DNS/fetch occurs.
    return u.protocol === "https:" && !u.username && !u.password && !u.port && u.hostname.includes(".") &&
      !/^[\d.]+$/.test(u.hostname) && !u.hostname.includes(":") &&
      ![".localhost", ".local", ".internal", ".lan", ".home", ".invalid", ".test"].some(s => u.hostname.endsWith(s));
  } catch { return false; }
}

/** Runtime validation is required even for typed callers and persisted JSON. */
export function parseYouthListing(input: unknown): YouthListing {
  requireValue(input && typeof input === "object" && !Array.isArray(input), "object");
  const x = input as YouthListing;
  requireValue(x.schemaVersion === 1 && text(x.id, 120), "version/id");
  requireValue(["event", "role", "program", "provider-directory", "resource"].includes(x.listingKind), "kind");
  requireValue(["volunteer", "learning", "leadership-careers", "funding"].includes(x.pathway), "pathway");
  requireValue(text(x.title, 240) && text(x.provider, 240) && safeSourceUrl(x.sourceUrl), "source");
  requireValue(validTimestamp(x.checkedAt) && ["approved", "hold"].includes(x.reviewStatus), "review");
  requireValue(x.audience && typeof x.audience === "object", "audience");
  const a = x.audience;
  requireValue(["high-school", "teen", "adult", "child-with-adult", "all-ages", "unknown"].includes(a.context) && text(a.original), "audience context/evidence");
  for (const age of [a.ageMin, a.ageMax]) requireValue(age === undefined || (Number.isFinite(age) && age >= 0 && age <= 120), "age");
  requireValue(a.ageMin === undefined || a.ageMax === undefined || a.ageMin <= a.ageMax, "age bounds");
  requireValue(a.grades === undefined || (Array.isArray(a.grades) && a.grades.length > 0 && a.grades.length <= 13 && new Set(a.grades).size === a.grades.length && a.grades.every(g => Number.isInteger(g) && g >= 0 && g <= 12)), "grades");
  requireValue(optionalText(a.residency) && (a.restrictions === undefined || (Array.isArray(a.restrictions) && a.restrictions.length <= 20 && a.restrictions.every(v => text(v)))), "restrictions");
  requireValue(x.cost && ["no-fee-evidence", "required-cost", "unknown"].includes(x.cost.status) && text(x.cost.original) && Array.isArray(x.cost.requiredCosts) && x.cost.requiredCosts.length <= 20, "cost evidence");
  for (const c of x.cost.requiredCosts) requireValue(c && text(c.description) && typeof c.mandatory === "boolean" && (c.amount === undefined || (Number.isFinite(c.amount) && c.amount >= 0)) && (c.currency === undefined || /^[A-Z]{3}$/.test(c.currency)), "required cost");
  const v = x.availability;
  requireValue(v && ["open", "closed", "upcoming", "unknown", "conflicting"].includes(v.status) && text(v.original) && typeof v.conflicting === "boolean", "availability evidence");
  for (const date of [v.opensAt, v.closesAt]) requireValue(date === undefined || validTimestamp(date), "application date");
  requireValue(v.opensAt === undefined || v.closesAt === undefined || Date.parse(v.opensAt) < Date.parse(v.closesAt), "application interval");
  requireValue(v.seasonEndsOn === undefined || validLocalDate(v.seasonEndsOn), "season end");
  requireValue(x.hours && ["not-stated", "provider-stated"].includes(x.hours.status), "hours evidence");
  requireValue(x.hours.minutes === undefined || (x.hours.status === "provider-stated" && Number.isSafeInteger(x.hours.minutes) && x.hours.minutes > 0), "stated minutes");
  requireValue(x.hours.status !== "provider-stated" || text(x.hours.original), "hours wording");
  requireValue(x.hours.status !== "not-stated" || x.hours.minutes === undefined, "unknown hours");
  requireValue(x.regions === undefined || (Array.isArray(x.regions) && x.regions.length <= 5 && x.regions.every(r => ["Toronto", "York", "Peel", "Durham", "Halton"].includes(r))), "regions");
  requireValue(x.delivery === undefined || ["in-person", "virtual", "hybrid", "unknown"].includes(x.delivery), "delivery");
  requireValue(optionalText(x.commitmentOriginal), "commitment");
  if (x.roleDetails !== undefined) {
    const d = x.roleDetails;
    const keys = ["contentMode", "description", "responsibilities", "requirements", "commitment", "selection", "costNotes", "applicationUrl", "applicationInstructions"];
    requireValue(d && typeof d === "object" && !Array.isArray(d) && Object.keys(d).length === keys.length && keys.every(k => Object.hasOwn(d, k)), "role detail shape");
    requireValue(d.contentMode === "authored-facts" && text(d.description, 6000) && safeSourceUrl(d.applicationUrl), "role detail source/body");
    for (const list of [d.responsibilities, d.requirements]) requireValue(Array.isArray(list) && list.length > 0 && list.length <= 32 && list.every(v => text(v)), "role requirements");
    for (const v of [d.commitment, d.selection, d.costNotes, d.applicationInstructions]) requireValue(text(v), "role instructions");
  }
  return JSON.parse(JSON.stringify(x)) as YouthListing;
}

export function parseYouthCatalogue(input: unknown): YouthListing[] {
  requireValue(Array.isArray(input) && input.length <= 2000, "catalogue");
  const rows = input.map(parseYouthListing);
  requireValue(new Set(rows.map(r => r.id)).size === rows.length, "duplicate IDs");
  return rows;
}

export interface EvaluationContext { now: string; selectedAge?: number; selectedGrade?: number; maxEvidenceAgeDays?: number }
export function evaluateYouthListing(input: unknown, context: EvaluationContext) {
  const row = parseYouthListing(input);
  requireValue(validTimestamp(context.now), "evaluation time");
  requireValue(context.selectedAge === undefined || (Number.isFinite(context.selectedAge) && context.selectedAge >= 0 && context.selectedAge <= 120), "selected age");
  requireValue(context.selectedGrade === undefined || (Number.isInteger(context.selectedGrade) && context.selectedGrade >= 0 && context.selectedGrade <= 12), "selected grade");
  const maxDays = context.maxEvidenceAgeDays ?? 30;
  requireValue(Number.isFinite(maxDays) && maxDays > 0 && maxDays <= 90, "evidence age limit");
  const now = Date.parse(context.now);
  const age = now - Date.parse(row.checkedAt);
  const evidenceCurrent = age >= 0 && age <= maxDays * 86_400_000;
  const reviewed = row.reviewStatus === "approved" && evidenceCurrent;
  const a = row.audience;
  const selectedAgeEligible = context.selectedAge === undefined || (a.ageMin === undefined && a.ageMax === undefined) ? null :
    (a.ageMin === undefined || context.selectedAge >= a.ageMin) && (a.ageMax === undefined || context.selectedAge <= a.ageMax);
  const selectedGradeEligible = context.selectedGrade === undefined || a.grades === undefined ? null : a.grades.includes(context.selectedGrade);
  const contextEligible = a.context === "high-school" || a.context === "teen" ||
    (a.context !== "adult" && a.context !== "child-with-adult" && !!a.grades?.some(g => g >= 9 && g <= 12));
  const teenHub = reviewed && contextEligible && selectedAgeEligible !== false && selectedGradeEligible !== false;
  const directorySection = reviewed && row.listingKind === "provider-directory";
  const resource = row.listingKind === "provider-directory" || row.listingKind === "resource";
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(now));
  let effectiveStatus: Availability = row.availability.status;
  if (!reviewed) effectiveStatus = "unknown";
  else if (row.availability.conflicting || effectiveStatus === "conflicting") effectiveStatus = "conflicting";
  else if ((row.availability.closesAt && now >= Date.parse(row.availability.closesAt)) || (row.availability.seasonEndsOn && row.availability.seasonEndsOn < today)) effectiveStatus = "closed";
  else if (effectiveStatus !== "closed" && row.availability.opensAt && now < Date.parse(row.availability.opensAt)) effectiveStatus = "upcoming";
  else if (effectiveStatus === "upcoming") effectiveStatus = "unknown"; // Passing an opening date is not evidence of a live intake.
  const mandatory = row.cost.requiredCosts.filter(c => c.mandatory);
  const costStatus: CostStatus = row.cost.status === "required-cost" || mandatory.some(c => c.amount !== undefined && c.amount > 0) ? "required-cost" :
    mandatory.some(c => c.amount === undefined) ? "unknown" : row.cost.status;
  const freeBadge = teenHub && !resource && costStatus === "no-fee-evidence" && ["open", "upcoming"].includes(effectiveStatus);
  const volunteerRole = row.listingKind === "role" && row.pathway === "volunteer";
  const verifiedFreeRoles = freeBadge && volunteerRole && effectiveStatus === "open";
  const verifiedFreePrograms = freeBadge && !volunteerRole && effectiveStatus === "open";
  const statusLabel = effectiveStatus === "closed" ? "Closed" : effectiveStatus === "open" ? "Open" : effectiveStatus === "upcoming" && row.availability.opensAt ?
    `Opens ${new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", month: "long", day: "numeric" }).format(new Date(row.availability.opensAt))}` : "Confirm with provider";
  return {
    teenHub, reviewed, selectedAgeEligible, selectedGradeEligible, directorySection, volunteerRole,
    verifiedFreeRoles, verifiedFreePrograms, freeBadge, effectiveStatus, evidenceCurrent,
    statusLabel, costLabel: costStatus === "required-cost" ? "Required cost" : costStatus === "unknown" ? "Cost unknown" : "No fee evidenced",
    applyNow: teenHub && !resource && effectiveStatus === "open" && costStatus === "no-fee-evidence",
    schoolApproved: false as const, autoCredit: 0 as const, inferUserIdentity: false as const,
    inventDate: false as const, inventHours: false as const, mapPin: false as const,
    ageMin: a.ageMin ?? null, ageMax: a.ageMax ?? null,
    providerHours: row.hours.minutes === undefined ? null : row.hours.minutes / 60,
    restrictions: [...(a.restrictions ?? [])], residency: a.residency ?? null,
  };
}
