import reviewedRestrictedIds from "../lib/reviewedRestrictedOpportunityIds.json";
import { isAllowedNativeSource, type NativeSourceRecord } from "./native-source-policy";

const approvedProviders = new Map([
  ["Toronto Public Library", "tpl.bibliocommons.com"],
  ["Markham Public Library", "markham.bibliocommons.com"]
]);
type SourceRecord = NativeSourceRecord;

/** Permission is the owner's explicit confirmation, not an inferred licence grant. */
export function nativeContentRights(rows: readonly SourceRecord[], sourceRows: readonly SourceRecord[], verifiedAt: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(verifiedAt) || verifiedAt < "2026-10-25") throw new Error("Invalid rights review snapshot date.");
  const restrictedOpportunityIds = [...new Set([
    ...reviewedRestrictedIds,
    ...sourceRows.filter((row) => !isAllowedNativeSource(row)).map((row) => row.id)
  ])].sort();
  const restricted = new Set(restrictedOpportunityIds);
  if (rows.some((row) => !isAllowedNativeSource(row) || restricted.has(row.id))) {
    throw new Error("Native publication contains an unapproved provider/link or reviewed restricted ID. Previous feed retained.");
  }
  return {
    // Retained wire key: snapshot verification date, never a claim of renewed permission.
    termsVerifiedAt: verifiedAt,
    restrictedOpportunityIds,
    sources: [...approvedProviders, ["Ontario Science Centre", "www.ontariosciencecentre.ca"] as const, ["Autism Ontario", "www.autismontario.com"] as const].map(([organization, sourceHost]) => ({
      organization,
      sourceHost,
      records: rows.filter((row) => row.organization === organization).length,
      status: organization === "Ontario Science Centre" || organization === "Autism Ontario" ? "original-factual-summary" : "owner-confirmed-permission",
      ownerPermission: organization === "Ontario Science Centre" || organization === "Autism Ontario" ? undefined : {
        confirmationID: "gta-library-content-2026-10-25",
        confirmedAt: "2026-10-25",
        scope: ["display-event-listings", "translate-event-listings"]
      }
    })).filter((source) => source.records > 0)
  };
}
