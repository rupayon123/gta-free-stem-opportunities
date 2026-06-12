import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { opportunities } from "../lib/data";
import { publicOpportunities } from "../lib/opportunityStatus";

const outputPath = process.env.GTA_PUBLIC_OPPORTUNITIES_EXPORT ?? "public/opportunities.json";
const publicListings = publicOpportunities(opportunities).map((opportunity) => ({
  id: opportunity.id,
  title: opportunity.title,
  organization: opportunity.organization,
  description: opportunity.description,
  city: opportunity.city,
  region: opportunity.region,
  ageMin: opportunity.ageMin,
  ageMax: opportunity.ageMax,
  category: opportunity.category,
  categories: opportunity.categories,
  cost: opportunity.cost,
  language: opportunity.language,
  deadline: opportunity.deadline,
  startDate: opportunity.startDate,
  endDate: opportunity.endDate,
  sourceUrl: opportunity.sourceUrl,
  registrationUrl: opportunity.registrationUrl,
  lastChecked: opportunity.lastChecked,
  lastSeen: opportunity.lastSeen,
  status: opportunity.status,
  tags: opportunity.tags,
  communityFocus: opportunity.communityFocus,
  latitude: opportunity.latitude,
  longitude: opportunity.longitude,
  address: opportunity.address,
  volunteerHoursEligible: opportunity.volunteerHoursEligible,
  coopEligible: opportunity.coopEligible,
  trustedSource: opportunity.trustedSource,
  sources: opportunity.sources
}));

const lastDataChange = publicListings
  .flatMap((opportunity) => [opportunity.lastChecked, opportunity.lastSeen].filter(Boolean))
  .sort()
  .at(-1);

const payload = {
  name: "GTA FREE STEM Opportunities public feed",
  schemaVersion: 1,
  count: publicListings.length,
  lastDataChange,
  opportunities: publicListings
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Exported ${publicListings.length} public opportunities to ${outputPath}`);
