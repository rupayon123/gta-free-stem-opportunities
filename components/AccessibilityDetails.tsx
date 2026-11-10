import { useId } from "react";
import { accessibilitySupportDecision, accessibilitySupportUnavailableMessage, readAccessibilitySupport } from "@/lib/accessibilitySupport";
import { supportCategoryHelp, supportCategoryLabels } from "@/lib/accessibilitySelection";

/** Programme evidence is separate from interface accessibility preferences. */
export function AccessibilityDetails({ support, unavailable, now, reviewedVenueId }: {
  support?: unknown; unavailable?: true; now: string; reviewedVenueId?: string;
}) {
  const id = useId();
  const parsed = readAccessibilitySupport(unavailable ? undefined : support);
  const missing = unavailable || parsed.accessibilitySupportUnavailable;
  const rows = parsed.accessibilitySupport?.evidence ?? [];
  if (!missing && !rows.length) return null;
  return <section className="accessibility-details" aria-labelledby={id} lang="en">
    <h3 id={id}>Accessibility &amp; support</h3>
    {missing ? <p role="status">{accessibilitySupportUnavailableMessage}</p> : <>
      <p>Provider statements describe specific arrangements. Confirm the support and any conditions before attending.</p>
      <ul>{rows.map((row, index) => {
        const decision = accessibilitySupportDecision(parsed.accessibilitySupport, row.category, row.scope, now, 30, reviewedVenueId);
        const label = decision.status === "provided" ? "Provider lists this support" : decision.status === "on-request" ? "Request and confirmation needed" : decision.status === "not-available" ? "Provider lists this as unavailable" : "Not confirmed";
        return <li key={`${row.category}-${row.scope}-${index}`}>
          <h4>{supportCategoryLabels[row.category]}</h4><p><strong>{label}</strong></p>
          <p>{row.scope === "activity" ? "Activity statement" : row.scope === "provider-policy" ? "Provider request policy — not a guaranteed event service" : `Venue statement: ${row.venue!.name}`}</p>
          {decision.reason === "venue-unmatched" && <p>The exact venue has not been matched to this listing.</p>}
          {decision.reason === "out-of-date" && <p>This support statement needs a fresh source review.</p>}
          {decision.reason === "conflicting" && <p>Source statements conflict. Confirm the arrangements with the provider.</p>}
          <p>{row.evidenceText}</p>
          {supportCategoryHelp[row.category] && <p>{supportCategoryHelp[row.category]}</p>}
          {!!row.conditions?.length && <ul>{row.conditions.map((condition, i) => <li key={i}>{condition}</li>)}</ul>}
          <p>Source checked <time dateTime={row.checkedAt}>{new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", dateStyle: "long" }).format(new Date(row.checkedAt))}</time>.</p>
          <div className="accessibility-detail-links"><a href={row.sourceUrl}>Read provider support information</a>{row.requestUrl && <a href={row.requestUrl}>Check the provider’s request process</a>}</div>
        </li>;
      })}</ul>
    </>}
  </section>;
}
