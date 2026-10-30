"use client";

import { useEffect, useRef } from "react";
import { evaluateYouthListing, type YouthListing } from "@/lib/highSchool/model";

export function YouthListingDetail({ listing, now, onBack }: { listing: YouthListing; now: string; onBack: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus(); }, [listing.id]);
  const result = evaluateYouthListing(listing, { now });
  const directory = listing.listingKind === "provider-directory";
  return <section className="hs-detail" aria-labelledby="hs-detail-title" lang="en">
    <button type="button" className="soft-button" onClick={onBack}>Back to results</button>
    <p className="hs-provider">{listing.provider}</p>
    <h2 id="hs-detail-title" ref={heading} tabIndex={-1}>{listing.title}</h2>
    <p className="hs-kind">{directory ? "Provider directory — check individual opportunities" : listing.listingKind === "role" ? "Volunteer role" : listing.listingKind === "resource" ? "Information resource — not an opening or award" : listing.listingKind === "event" ? "Learning event" : "Programme — placement is not guaranteed"}</p>
    <dl className="hs-facts">
      <div><dt>Who it is for</dt><dd>{listing.audience.original}</dd></div>
      <div><dt>Ages</dt><dd>{listing.audience.ageMin === undefined && listing.audience.ageMax === undefined ? "Not stated by the provider" : `${listing.audience.ageMin ?? "Not stated"}–${listing.audience.ageMax ?? "No maximum stated"}`}</dd></div>
      <div><dt>Grades</dt><dd>{listing.audience.grades?.join(", ") || "Not stated by the provider"}</dd></div>
      <div><dt>Residency</dt><dd>{listing.audience.residency || "Not stated by the provider"}</dd></div>
      {!!listing.audience.restrictions?.length && <div><dt>Other requirements</dt><dd><ul>{listing.audience.restrictions.map(text => <li key={text}>{text}</li>)}</ul></dd></div>}
      <div><dt>Cost information</dt><dd>{listing.cost.original}{!!listing.cost.requiredCosts.length && <ul>{listing.cost.requiredCosts.map((cost, index) => <li key={index}>{cost.description}{cost.mandatory ? " (required)" : " (optional)"}</li>)}</ul>}</dd></div>
      <div><dt>Availability</dt><dd>{directory ? "Openings are listed separately by the provider." : result.statusLabel}<p>{listing.availability.original}</p>{!result.evidenceCurrent && <p>Source review needs refreshing. Current availability is not confirmed.</p>}</dd></div>
      {listing.availability.opensAt && <div><dt>Applications open</dt><dd><time dateTime={listing.availability.opensAt}>{new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", dateStyle: "long", timeStyle: "short" }).format(new Date(listing.availability.opensAt))} (Toronto time)</time></dd></div>}
      {listing.availability.closesAt && <div><dt>Application deadline</dt><dd><time dateTime={listing.availability.closesAt}>{new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", dateStyle: "long", timeStyle: "short" }).format(new Date(listing.availability.closesAt))} (Toronto time)</time></dd></div>}
      <div><dt>Commitment</dt><dd>{listing.commitmentOriginal || "Not stated by the provider"}</dd></div>
      <div><dt>Delivery</dt><dd>{listing.delivery === "virtual" ? "Online" : listing.delivery === "hybrid" ? "Mixed delivery — confirm the provider’s format and attendance requirements" : listing.delivery === "in-person" ? "In person" : "Confirm with provider"}</dd></div>
      <div><dt>Provider-stated hours</dt><dd>{listing.hours.original || "Not stated. Scheduled time is not completed volunteering."}</dd></div>
      <div><dt>Source last reviewed</dt><dd><time dateTime={listing.checkedAt}>{new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", dateStyle: "long" }).format(new Date(listing.checkedAt))}</time></dd></div>
    </dl>
    <p className="hs-notice">Confirm the current requirements and availability with the provider. Your school decides whether an activity qualifies for community involvement. This page does not approve or award hours.</p>
    <a className="primary-button" href={listing.sourceUrl}>{directory ? "Visit provider directory" : result.applyNow ? "Check application with provider" : "Check current provider information"}</a>
  </section>;
}
