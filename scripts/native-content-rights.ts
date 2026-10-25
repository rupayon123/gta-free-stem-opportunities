import reviewedRestrictedIds from "../lib/reviewedRestrictedOpportunityIds.json";

const approvedProviders = new Map([
  ["Toronto Public Library", "tpl.bibliocommons.com"],
  ["Markham Public Library", "markham.bibliocommons.com"]
]);
type SourceRecord = { id: string; organization: string; sourceUrl: string; registrationUrl: string };

function isApproved(row: SourceRecord): boolean {
  try {
    const url = new URL(row.sourceUrl);
    return approvedProviders.get(row.organization) === url.hostname.toLowerCase()
      && url.protocol === "https:" && url.port === "" && !url.username && !url.password
      && url.pathname.startsWith("/events/") && row.registrationUrl === row.sourceUrl;
  } catch { return false; }
}

/** Permission is the owner's explicit confirmation, not an inferred licence grant. */
export function nativeContentRights(rows: readonly SourceRecord[], sourceRows: readonly SourceRecord[], verifiedAt: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(verifiedAt) || verifiedAt < "2026-10-25") throw new Error("Invalid rights review snapshot date.");
  const restrictedOpportunityIds = [...new Set([
    ...reviewedRestrictedIds,
    ...sourceRows.filter((row) => !isApproved(row)).map((row) => row.id)
  ])].sort();
  const restricted = new Set(restrictedOpportunityIds);
  if (rows.some((row) => !isApproved(row) || restricted.has(row.id))) {
    throw new Error("Native publication contains an unapproved provider/link or reviewed restricted ID. Previous feed retained.");
  }
  return {
    // Retained wire key: snapshot verification date, never a claim of renewed permission.
    termsVerifiedAt: verifiedAt,
    restrictedOpportunityIds,
    sources: [...approvedProviders].map(([organization, sourceHost]) => ({
      organization,
      sourceHost,
      records: rows.filter((row) => row.organization === organization).length,
      status: "owner-confirmed-permission",
      ownerPermission: {
        confirmationID: "gta-library-content-2026-10-25",
        confirmedAt: "2026-10-25",
        scope: ["display-event-listings", "translate-event-listings"]
      }
    })).filter((source) => source.records > 0)
  };
}
