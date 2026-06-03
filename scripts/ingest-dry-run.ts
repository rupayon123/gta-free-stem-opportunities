import { opportunities, reviewQueue } from "../lib/data";

type Finding = {
  title: string;
  status: "publishable" | "review";
  reasons: string[];
};

function evaluateSeedListings(): Finding[] {
  return opportunities.map((opportunity) => {
    const reasons: string[] = [];
    if (!opportunity.freeStatusProof.toLowerCase().includes("free") && !opportunity.freeStatusProof.toLowerCase().includes("no")) {
      reasons.push("free status proof is weak");
    }
    if (!opportunity.registrationUrl) reasons.push("missing registration URL");
    if (!opportunity.latitude || !opportunity.longitude) reasons.push("missing coordinates");
    if (!opportunity.sources.some((source) => source.confidence === "high")) reasons.push("no high-confidence source");
    if (new Date(opportunity.startDate).getTime() < Date.now() - 1000 * 60 * 60 * 24) {
      reasons.push("start date may be stale");
    }
    return {
      title: opportunity.title,
      status: reasons.length ? "review" : "publishable",
      reasons
    };
  });
}

function findDuplicateHints() {
  const seen = new Map<string, string>();
  const duplicates: string[] = [];
  for (const opportunity of opportunities) {
    const key = `${opportunity.title.toLowerCase()}-${opportunity.city.toLowerCase()}`;
    const existing = seen.get(key);
    if (existing) duplicates.push(`${existing} <-> ${opportunity.id}`);
    seen.set(key, opportunity.id);
  }
  return duplicates;
}

const findings = evaluateSeedListings();
const publishable = findings.filter((finding) => finding.status === "publishable").length;
const needsReview = findings.filter((finding) => finding.status === "review");
const duplicates = findDuplicateHints();

console.log("GTA FREE STEM Opportunities ingestion dry run");
console.log(`Seed listings: ${opportunities.length}`);
console.log(`Publishable: ${publishable}`);
console.log(`Needs review: ${needsReview.length}`);
console.log(`Review queue examples: ${reviewQueue.length}`);
console.log(`Duplicate hints: ${duplicates.length}`);

for (const finding of needsReview) {
  console.log(`- REVIEW: ${finding.title}: ${finding.reasons.join(", ")}`);
}

for (const duplicate of duplicates) {
  console.log(`- DUPLICATE: ${duplicate}`);
}
