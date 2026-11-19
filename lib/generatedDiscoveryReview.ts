import type { DiscoveredOpportunity } from "./discovery";

export const generatedDiscoverySummary = {
  "mode": "deterministic",
  "sourcesChecked": 34,
  "candidatesFound": 409,
  "newCandidates": 182,
  "duplicatesSkipped": 225,
  "warnings": [
    "Could not check Mississauga Library volunteer opportunities: No review candidates remain; retained previous records pending source check.",
    "Could not check Milton Public Library programs: No review candidates remain; retained previous records pending source check.",
    "Could not check Credit Valley Conservation youth opportunities: 403 Forbidden.",
    "Could not check TRCA youth volunteer opportunities: fetch failed.",
    "Could not check Volunteer MBC youth opportunities: 403 Forbidden.",
    "Could not check Eventbrite free science and technology events: 405 Not Allowed.",
    "Could not check Eventbrite free online science and technology events: 405 Not Allowed."
  ],
  "sourceHealth": {
    "schemaVersion": 1,
    "generatedAt": "2026-11-19T07:31:30.739Z",
    "status": "healthy",
    "failureReasons": [],
    "sourcesChecked": 34,
    "successfulSources": 27,
    "failedSources": 7,
    "sourceSuccessRatio": 0.7941,
    "minimumSourceSuccessRatio": 0.75,
    "sources": [
      {
        "sourceId": "autism-ontario-index",
        "status": "ok",
        "candidates": 16,
        "accepted": 11,
        "retained": 10
      },
      {
        "sourceId": "autism-ontario-quiet-time",
        "status": "ok",
        "candidates": 1,
        "accepted": 1,
        "retained": 0
      },
      {
        "sourceId": "ontario-science-centre-events",
        "status": "ok",
        "candidates": 1,
        "accepted": 1,
        "retained": 0
      },
      {
        "sourceId": "rom-public-programs",
        "status": "ok",
        "candidates": 5,
        "accepted": 3,
        "retained": 0
      },
      {
        "sourceId": "tpl-events-stem",
        "status": "ok",
        "candidates": 21,
        "accepted": 19,
        "retained": 0
      },
      {
        "sourceId": "tpl-events-coding",
        "status": "ok",
        "candidates": 21,
        "accepted": 19,
        "retained": 0
      },
      {
        "sourceId": "tpl-events-volunteer",
        "status": "ok",
        "candidates": 21,
        "accepted": 19,
        "retained": 0
      },
      {
        "sourceId": "brampton-library-stem",
        "status": "ok",
        "candidates": 4,
        "accepted": 4,
        "retained": 0
      },
      {
        "sourceId": "brampton-library-teen-volunteer",
        "status": "ok",
        "candidates": 4,
        "accepted": 4,
        "retained": 0
      },
      {
        "sourceId": "markham-events-stem",
        "status": "ok",
        "candidates": 21,
        "accepted": 20,
        "retained": 0
      },
      {
        "sourceId": "markham-events-volunteer",
        "status": "ok",
        "candidates": 21,
        "accepted": 20,
        "retained": 0
      },
      {
        "sourceId": "vaughan-library-programs",
        "status": "ok",
        "candidates": 70,
        "accepted": 69,
        "retained": 0
      },
      {
        "sourceId": "richmond-hill-library-programs",
        "status": "ok",
        "candidates": 16,
        "accepted": 16,
        "retained": 0
      },
      {
        "sourceId": "aurora-library-stem",
        "status": "ok",
        "candidates": 21,
        "accepted": 19,
        "retained": 0
      },
      {
        "sourceId": "aurora-library-volunteers",
        "status": "ok",
        "candidates": 2,
        "accepted": 1,
        "retained": 0
      },
      {
        "sourceId": "whitby-programs",
        "status": "ok",
        "candidates": 16,
        "accepted": 15,
        "retained": 0
      },
      {
        "sourceId": "ajax-library-stem",
        "status": "ok",
        "candidates": 12,
        "accepted": 10,
        "retained": 0
      },
      {
        "sourceId": "pickering-library-tech",
        "status": "ok",
        "candidates": 2,
        "accepted": 2,
        "retained": 0
      },
      {
        "sourceId": "oshawa-library-stem",
        "status": "ok",
        "candidates": 22,
        "accepted": 20,
        "retained": 0
      },
      {
        "sourceId": "clarington-library-programs",
        "status": "ok",
        "candidates": 44,
        "accepted": 44,
        "retained": 0
      },
      {
        "sourceId": "mississauga-library-events",
        "status": "ok",
        "candidates": 3,
        "accepted": 1,
        "retained": 0
      },
      {
        "sourceId": "mississauga-library-volunteers",
        "status": "failed",
        "candidates": 0,
        "accepted": 0,
        "retained": 2
      },
      {
        "sourceId": "oakville-library-programs",
        "status": "ok",
        "candidates": 11,
        "accepted": 11,
        "retained": 0
      },
      {
        "sourceId": "burlington-library-stem",
        "status": "ok",
        "candidates": 3,
        "accepted": 3,
        "retained": 0
      },
      {
        "sourceId": "milton-library-programs",
        "status": "failed",
        "candidates": 0,
        "accepted": 0,
        "retained": 3
      },
      {
        "sourceId": "halton-hills-library-programs",
        "status": "ok",
        "candidates": 19,
        "accepted": 19,
        "retained": 0
      },
      {
        "sourceId": "cvc-youth",
        "status": "failed",
        "candidates": 0,
        "accepted": 0,
        "retained": 0
      },
      {
        "sourceId": "trca-youth",
        "status": "failed",
        "candidates": 0,
        "accepted": 0,
        "retained": 11
      },
      {
        "sourceId": "uhn-stem-pathways",
        "status": "ok",
        "candidates": 10,
        "accepted": 10,
        "retained": 0
      },
      {
        "sourceId": "volunteer-mbc-youth",
        "status": "failed",
        "candidates": 0,
        "accepted": 0,
        "retained": 0
      },
      {
        "sourceId": "uoft-engineering-outreach",
        "status": "ok",
        "candidates": 4,
        "accepted": 2,
        "retained": 0
      },
      {
        "sourceId": "ontario-tech-engineering-outreach",
        "status": "ok",
        "candidates": 18,
        "accepted": 18,
        "retained": 0
      },
      {
        "sourceId": "eventbrite-free-science-tech",
        "status": "failed",
        "candidates": 0,
        "accepted": 0,
        "retained": 0
      },
      {
        "sourceId": "eventbrite-free-online-science-tech",
        "status": "failed",
        "candidates": 0,
        "accepted": 0,
        "retained": 0
      }
    ]
  }
} as const;

export const generatedDiscoveryReviewCandidates = [
  {
    "id": "discovered-autism-ontario-index-central-west-mississauga-chuck-78bb6fe4025a",
    "title": "Central West - Mississauga - Chuck…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Mississauga",
    "region": "Peel",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-29",
    "startDate": "2026-11-29",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13288",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-autism-ontario-index-central-east-oshawa-relaxed-853a259ecca8",
    "title": "Central East, Oshawa – Relaxed…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-12-02",
    "startDate": "2026-12-02",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13278",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-autism-ontario-index-central-west-mississauga-a3ef5fcaeef3",
    "title": "Central West - Mississauga -…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Mississauga",
    "region": "Peel",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-12-03",
    "startDate": "2026-12-03",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13344",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-autism-ontario-index-central-east-vaughan-adult-eca41774561d",
    "title": "Central East - Vaughan - Adult…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-12-03",
    "startDate": "2026-12-03",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13001",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-autism-ontario-index-central-east-richmond-hill-bc34e59d94da",
    "title": "Central East - Richmond Hill -…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Richmond Hill",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-12-06",
    "startDate": "2026-12-06",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13051",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-autism-ontario-index-toronto-autistic-adults-liquid-fa2ce96bebaf",
    "title": "Toronto - Autistic Adults: Liquid…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-12-06",
    "startDate": "2026-12-06",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13216",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-autism-ontario-index-central-east-whitby-reptilia-72036ccf2ea0",
    "title": "Central East, Whitby – Reptilia…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Whitby",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-12-06",
    "startDate": "2026-12-06",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13277",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-autism-ontario-index-central-east-whitby-preschool-d20723ded6ab",
    "title": "Central East, Whitby – Preschool…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Whitby",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-12-08",
    "startDate": "2026-12-08",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13186",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-autism-ontario-index-central-east-markham-caregiver-e1a2a69324d3",
    "title": "Central East – Markham – Caregiver…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-12-09",
    "startDate": "2026-12-09",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13078",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-autism-ontario-index-central-east-markham-b59081f94015",
    "title": "Central East - Markham -…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18",
    "startDate": "2026-11-18",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=12973",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-autism-ontario-index-central-east-newmarket-cooking-5f2f60447058",
    "title": "Central East - Newmarket - Cooking…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Newmarket",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18",
    "startDate": "2026-11-18",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=12999",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-autism-ontario-index-toronto-glow-in-the-dark-paint-4ad54fb9ff5a",
    "title": "Toronto – Glow in the Dark Paint…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18",
    "startDate": "2026-11-18",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13215",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-autism-ontario-index-central-east-whitby-sensory-b598c0169078",
    "title": "Central East, Whitby - Sensory…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Whitby",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-28",
    "startDate": "2026-11-28",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13244",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-autism-ontario-index-toronto-autistic-adults-social-6a61450fb34e",
    "title": "Toronto – Autistic Adults Social:…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-28",
    "startDate": "2026-11-28",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13166",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-autism-ontario-index-central-east-vaughan-legoland-1a63e107ea59",
    "title": "Central East – Vaughan – LEGOLAND…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-12-13",
    "startDate": "2026-12-13",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13223",
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "new"
  },
  {
    "id": "discovered-autism-ontario-index-toronto-adult-social-quesadilla-46253938b6af",
    "title": "Toronto - Adult Social: Quesadilla…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-12-13",
    "startDate": "2026-12-13",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13292",
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "new"
  },
  {
    "id": "discovered-autism-ontario-index-toronto-holiday-party-afa6a8a5e241",
    "title": "Toronto - Holiday Party",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-12-20",
    "startDate": "2026-12-20",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13262",
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "new"
  },
  {
    "id": "discovered-autism-ontario-index-central-east-whitby-adult-8f5f793e91b7",
    "title": "Central East, Whitby – Adult…",
    "organization": "Autism Ontario",
    "description": "An Autism Ontario event is listed. Check its official page for cost, eligibility and availability.",
    "city": "Whitby",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-12-20",
    "startDate": "2026-12-20",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13279",
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Autism Ontario event index",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "new"
  },
  {
    "id": "discovered-rom-public-programs-skip-to-main-content-32a4a352c2ad",
    "title": "Skip to main content",
    "organization": "Royal Ontario Museum",
    "description": "Skip to main content listed by Royal Ontario Museum public programs.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.rom.on.ca/whats-on/programs",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Royal Ontario Museum public programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-rom-public-programs-next-page-b22a2adc026b",
    "title": "Next page",
    "organization": "Royal Ontario Museum",
    "description": "Next page listed by Royal Ontario Museum public programs.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.rom.on.ca/whats-on/programs?page=1",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Royal Ontario Museum public programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-rom-public-programs-rom-youth-cabinet-a320f32f472d",
    "title": "ROM Youth Cabinet",
    "organization": "Royal Ontario Museum",
    "description": "ROM Youth Cabinet listed by Royal Ontario Museum public programs.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.rom.on.ca/whats-on/special-programs/youth-cabinet",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning",
      "youth"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Royal Ontario Museum public programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-tpl-events-stem-wellness-recovery-action-plan-wrap-for-hea-4df207b0cc97",
    "title": "Wellness Recovery Action Plan (WRAP) for Healthy Aging",
    "organization": "Toronto Public Library",
    "description": "WRAP is for anyone looking to strengthen their well-being—whether you’re supporting your mental health, managing stress, or simply wanting to feel more balanced and resilient in daily life. The WRAP for Wellness Recovery Action Plan (WRAP) Workshop for Healthy Aging is expertly designed by Hope + Me for individuals aged 60 and older using the principles of WRAP, but with scenarios and tools focused on common aging challenges This 3-week session is appropriate for people with no experience with WRAP, or for those who wish to refresh their knowledge and skills. Participants will receive a certificate of participation upon program completion, but these sessions do not contribute to a WRAP certificate. Find more WRAP program options at TPL here. This WRAP Group meets every Thursday, once a wee",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T10:00:00-04:00",
    "startDate": "2026-11-19T10:00:00-04:00",
    "endDate": "2026-11-19T12:30:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ae89bf09d27a00045550e59",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Cost-related words appeared near the listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-40th-anniversary-of-franklin-in-the-dark-d8e926a22491",
    "title": "40th Anniversary of Franklin in the Dark",
    "organization": "Toronto Public Library",
    "description": "First published in 1986, join us in celebrating 40 years of the beloved Canadian turtle, Franklin. Discover the series’ original drafts by author Paulette Bourgeois and illustrator Brenda Clark, alongside other terrific turtle tales! Visit the Osborne Collection to experience our exhibit.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-09-13",
    "startDate": "2026-09-13",
    "endDate": "2027-01-03",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ae64bc5901b02002cc6747a",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-maison-des-b-b-s-d8a23872de8a",
    "title": "Maison des bébés",
    "organization": "Toronto Public Library",
    "description": "Un programme spécialement conçu pour les bébés de 0 à 18 mois et leurs accompagnateurs. Chanter des chansons et des comptines à votre bébé favorise le développement du langage tout en partageant un moment amusant et chaleureux. Les comptines avec gestes encouragent également les tout‑petits à bouger et à explorer selon leur stade de développement. Ce programme est offert en partenariat avec le Centre francophone du Grand Toronto. Accessibilité: Le sous-titrage en direct ou automatique, l’interprétation en langue des signes, les services d’intervenant, ou les services d’accompagnement sont disponibles sur demande. Veuillez soumettre votre demande au moins deux semaines à l’avance à : tpl.ca/accessibility-events A program specially designed for babies aged 0 to 18 months and their caregivers",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T10:00:00-04:00",
    "startDate": "2026-11-19T10:00:00-04:00",
    "endDate": "2026-11-19T11:30:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6abfe43a9dbc2b002c8bcccd",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-baby-time-8e742a7a03d3",
    "title": "Baby Time",
    "organization": "Toronto Public Library",
    "description": "Join us for bouncing rhymes, songs and stories in this program for babies, birth to 18 months, and their parents or caregivers. Baby Time runs from 10am 11am. Children, parents and caregivers are invited to Stay and Play.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T10:00:00-04:00",
    "startDate": "2026-11-19T10:00:00-04:00",
    "endDate": "2026-11-19T11:00:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ac7c2bfa85a2c00337e0e97",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-nocturnal-animals-scavenger-hunt-0413fe229e7c",
    "title": "Nocturnal Animals Scavenger Hunt",
    "organization": "Toronto Public Library",
    "description": "Welcome to the Night Shift! Stop by the library to find images of nocturnal animals hidden around the children's area. Find them all and win a fun prize! This program is intended for children aged 4 to 12 years .",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-02",
    "startDate": "2026-11-02",
    "endDate": "2026-11-30",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ae63f065ea4c386b3ec1b19",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-tpl-events-stem-knit-wits-knitting-and-crochet-club-3d70f0a37757",
    "title": "Knit Wits Knitting and Crochet Club",
    "organization": "Toronto Public Library",
    "description": "Main Street's knitting and crochet club returns! Share your projects with other knitters/crocheters, teach a technique, learn a technique, and enjoy great conversation. All level of knitters/crocheters welcome. Bring your own yarn, needles, and crochet hooks. We meet on the second floor of the library. Drop-in program.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T09:30:00-04:00",
    "startDate": "2026-11-19T09:30:00-04:00",
    "endDate": "2026-11-19T11:30:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ae91f5ef9d28050ccb0bd0d",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-celebrate-60-years-of-mimico-centennial-li-6690df7725e7",
    "title": "Celebrate 60 years of Mimico Centennial Library",
    "organization": "Toronto Public Library",
    "description": "Throughout November, we're celebrating the 60th anniversary of Mimico Centennial Library ! Take a walk through history with our special historical photo display , featuring images and newspaper articles of the library and surrounding Mimico community through the years. Discover how our neighbourhood has changed and revisit the people, places, and moments that have shaped our community. 60 years of stories. 60 years of memories. 60 years of community.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-01",
    "startDate": "2026-11-01",
    "endDate": "2026-11-30",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ae9ebfe9b955d531f7caf6c",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-saving-the-moment-by-jo-8ad8305861d7",
    "title": "Branch Art Exhibit: Saving the Moment by Jon Christopher Embree",
    "organization": "Toronto Public Library",
    "description": "Throughout the month of November, the works of Jon Christopher Embree are on display at Morningside branch Jon Christopher Embree showed artistic promise early and started drawing, painting and sculpting from his teens on. With some post-secondary fine arts instruction, he then worked as a graphic artist with a focus on colour theory and retouching. Since retirement, he has worked full-time on visual art using oils, pen and ink, watercolour, acrylic as well as sketching, pencil and charcoal. “I want to move people, showcase something that will highlight the beauty of a moment in nature, or the day-to-day environment, ordinary life activities and special places. I want the viewer to stop, breathe slower and think.” This exhibit is part of TPL's Art Exhibit program . Toronto Public Library p",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-01",
    "startDate": "2026-11-01",
    "endDate": "2026-11-30",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ae8f7bbad4027659155ee39",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-sanko-speaks-2e64aeafec75",
    "title": "Sanko Speaks",
    "organization": "Toronto Public Library",
    "description": "A free, culturally affirming drop-in program for adults that promotes mental wellness through creative activities, discussion, and healthy coping strategies. Guided by the concept of Sankofa, participants explore connections between past experiences and present wellbeing while building skills for managing stress and supporting mental health. Activities vary based on community interests and needs. This program is in collaboration with TAIBU Community Health Centre.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T10:00:00-04:00",
    "startDate": "2026-11-19T10:00:00-04:00",
    "endDate": "2026-11-19T14:00:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/696a8e2c6724c63d00ec90d8",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-my-red-is-not-your-red--8b93a4e50595",
    "title": "Branch Art Exhibit: My Red Is Not Your Red by Francesco Leka",
    "organization": "Toronto Public Library",
    "description": "Throughout the month of November, the works of artist Francesco Leka are on display at Northern District library. Francesco Leka is a self-taught Canadian artist from Toronto who balances his artistic practice with his studies in Health Sciences at the University of Ottawa. While pursuing a future career in medicine, he continues to develop his art independently and with dedication. \"In my work, I find in witnessing viewers interpret the densely packed symbolic elements into their own narratives. Conceptually, my works explore the illusions people cling to—nostalgia, order, wealth—and the harsher truths underlying them. Visually, scenes in my oil paintings draw inspiration from the awe of nature, aesthetic qualities of myths, and my own visual interpretations of music.\" This exhibit is par",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-02",
    "startDate": "2026-11-02",
    "endDate": "2026-11-29",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6aa9fcd23dd190003e724a08",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-needleworx-ed45ed2e93ff",
    "title": "Needleworx",
    "organization": "Toronto Public Library",
    "description": "Bring your own knitting or crocheting project, or start something new while enjoying relaxed conversation! All are welcome! This is a drop in program. No registration request.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T10:00:00-04:00",
    "startDate": "2026-11-19T10:00:00-04:00",
    "endDate": "2026-11-19T11:30:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ad374aa2b40e729fed2bcb0",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-works-by-camila-mia-c4e355082263",
    "title": "Branch Art Exhibit: Works by Camila Mia",
    "organization": "Toronto Public Library",
    "description": "Camila Mia is a talented young artist from Mimico, Toronto, who has been passionate about painting since she was four. Over the years, her love for art has evolved into a professional pursuit, with Camila officially dedicating herself to her craft about two years ago. Her work showcases a unique blend of creativity and technical skill, with a portfolio that includes serene landscapes, expressive wildlife, and intricate still-life pieces created with watercolour, acrylic, and mixed media. This exhibit is part of TPL's Art Exhibit program. Toronto Public Library provides space for local artists to exhibit their work at locations across the city. These exhibits aim to reflect the diverse cultural interests of the city and its neighbourhoods. The exhibit can be viewed during Richview branch op",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-02",
    "startDate": "2026-11-02",
    "endDate": "2026-11-30",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ab554d5c9d1b8187a993479",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-storytelling-works-by-a-9e03ef6cb3c2",
    "title": "Branch Art Exhibit: Storytelling -- works by Adira Rotstein",
    "organization": "Toronto Public Library",
    "description": "Throughout the month of November, the works of artist Adira Rotstein are on display at Deer Park branch . Adira Rotstein is a Toronto artist, writer and teacher. Her YA novels 'Little Jane Silver' and 'Little Jane and the Nameless Isle' are published by Dundurn. She has experience in sequential art, creating comic books and illustrating stories. She also loves experimenting with the boundaries of stopmotion and hand drawn animation. I am curious about the world in all beauty and absurdity \"Usually, with my artwork I attempt to tell a story. People say I am able to imbue even inanimate objects with a personality, human agency and warmth. People's faces, their motions, their discarded objects at rest tell stories about where they have been, what they have felt and where they are going. Slow ",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-01",
    "startDate": "2026-11-01",
    "endDate": "2026-11-30",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ae35682198b996a80a9527b",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-dancing-flowers-d047edbb0d43",
    "title": "Branch Art Exhibit: Dancing Flowers",
    "organization": "Toronto Public Library",
    "description": "Throughout the month of November the works of artist Mary Garrone are on display at the Yorkville Branch in an exhibit titled Dancing Flowers. Artist biography: A Toronto-based artist from Australia. She has studied abstract expressionism for two years with the techniques of Nicholas Wilton and Jenny Nelson. A flower photographer for many years, she continues with this subject matter in her acrylic and oil painting. Artist statement: I love the challenge of translating emotion into paintings using gesture, palette, value, shape and line. While each painting is an exhausting number of decisions for me, the artist, the goal is ultimately to bring joy to the viewer. Applying the visual principle that \"lines activate,\" this series is entitled \"There's a party in the garden and the flowers are ",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-02",
    "startDate": "2026-11-02",
    "endDate": "2026-11-29",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6aa59ff6129d8e0031f1bb7e",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-brampton-library-stem-skip-to-main-content-116049eed336",
    "title": "Skip to main content",
    "organization": "Brampton Library",
    "description": "Skip to main content listed by Brampton Library STEM events.",
    "city": "Brampton",
    "region": "Peel",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://bramlib.libnet.info/events?term=STEM",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Brampton Library STEM events",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-brampton-library-stem-events-calendar-57b3676ef9b5",
    "title": "Events Calendar",
    "organization": "Brampton Library",
    "description": "Events Calendar listed by Brampton Library STEM events.",
    "city": "Brampton",
    "region": "Peel",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://bramlib.libnet.info/events",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Brampton Library STEM events",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-markham-events-stem-unionville-english-conversation-circle-731b2e21fded",
    "title": "Unionville English Conversation Circle",
    "organization": "Markham Public Library",
    "description": "Join this casual English Conversation Circle where small groups will practice speaking English through guided conversations on topics that are organized around real-life themes, such as friendship, communication, daily routines, helping others, family life, community life, work, and personal growth. The goal is to help participants build confidence while discussing practical everyday topics as well as to build community and connection with neighbors. We hope to see you there!",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T18:00:00-04:00",
    "startDate": "2026-11-19T18:00:00-04:00",
    "endDate": "2026-11-19T19:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6aa707fe65abe8002a78ed62",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-markham-events-stem-1-1-interview-skills-coaching-9761cbf00085",
    "title": "1:1 Interview Skills Coaching",
    "organization": "Markham Public Library",
    "description": "Get one-on-one help with your interview skills! Book a 25 minute with an employment consultant and improve your interview skills. Requirement: Participants must be a Canadian citizens, PR, refugee status with work permit, or with work permit. Job Skills Bio: This one-on-one sessions are facilitated by Job Skills, a government funded employment service. Job Skills, a non-profit charitable community-based employment, and training organization has successfully delivered employment solutions since 1988 across the Greater Toronto Area (GTA) and neighbouring regions. Today, the agency provides employment, employer, business, and newcomer services and programs in the York and Peel Regions. For more information, please visit their website - https://www.jobskills.org/",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-20T10:30:00-04:00",
    "startDate": "2026-11-20T10:30:00-04:00",
    "endDate": "2026-11-20T11:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/68fbde1fe59a13000d3e1d1f",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-mpl-homepage-8b3700b85563",
    "title": "MPL Homepage",
    "organization": "Markham Public Library",
    "description": "MPL Homepage from Markham Public Library events.",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6acfd45ca85a2c00337f86a3",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-markham-events-stem-financial-literacy-chat-with-ceo-of-credit-7b8703c3b3e8",
    "title": "Financial Literacy Chat with CEO of Credit Canada",
    "organization": "Markham Public Library",
    "description": "If your wallet could talk, what would it say? We are honoured to invite Bruce Sellery, CEO of Credit Canada , to share essential financial knowledge that every Canadian should know. Credit Canada is Canada's first and longest-standing non-profit credit counselling agency. This session will also include a Q&A period, giving participants the opportunity to ask their financial questions. Learning Outcomes: Learn about Canada's financial system and how it works. Gain practical financial literacy tips and discover where to find reliable resources. Have the opportunity to ask your financial questions and receive expert insights.",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T11:00:00-04:00",
    "startDate": "2026-11-19T11:00:00-04:00",
    "endDate": "2026-11-19T12:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a636ddf0d65ac360041e600",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-markham-events-stem-alzheimers-society-york-region-active-livi-24db474a5e73",
    "title": "Alzheimers Society York Region Active Living - Joy in Art",
    "organization": "Markham Public Library",
    "description": "Discover the joy of creativity in Joy in Art , a lighthearted four-week art program for people living with Alzheimer’s disease or other related dementias and their caregivers , offered as part of the Alzheimer Society of York Region’s Active Living programs. You’ll explore playful drawing and simple art activities while enjoying opportunities for creative self-expression, connection, and making art together in a welcoming setting. You will: Explore your creativity and self-expression through playful drawing and simple art activities. Enjoy connection and creativity while making art together in a relaxed and supportive environment. Format: Four-week interactive art program featuring guided drawing and simple creative activities.",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-20T10:30:00-04:00",
    "startDate": "2026-11-20T10:30:00-04:00",
    "endDate": "2026-11-20T11:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6903a9359b87934100935126",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-tenant-rights-450ad280ae03",
    "title": "Tenant Rights",
    "organization": "Markham Public Library",
    "description": "Understanding your rights as a tenant is essential to maintaining safe, stable, and respectful housing. Many tenants experience issues such as unaddressed repairs, illegal rent increases, harassment, or pressure to move out—often without realizing that Ontario law provides strong protections against these practices. This Tenant Rights workshop is designed to help renters understand their legal protections under Ontario’s Residential Tenancies Act in clear, practical terms. We will discuss key tenant rights, including the right to a habitable home, privacy, proper notice, freedom from unlawful eviction, and protection from retaliation. The session will also explain what tenants can do when their rights are violated and how to document, report, and resolve disputes effectively. Learning Outc",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T18:30:00-04:00",
    "startDate": "2026-11-19T18:30:00-04:00",
    "endDate": "2026-11-19T20:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a63c020c7e02e3d006b75e2",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-markham-events-stem-wagging-tails-happy-hearts-an-introduction-991fb7794251",
    "title": "Wagging Tails, Happy Hearts: An Introduction to Responsible Dog Ownership",
    "organization": "Markham Public Library",
    "description": "Join us for an educational presentation where we will explore the wonderful world of responsible dog ownership! Wagging Tails, Happy Hearts aims to teach families essential skills and knowledge needed to care for our furry friends. Whether you're thinking about getting a dog, recently adopted one, or have been a dog owner for years, this seminar is the perfect place to enhance your knowledge. Led by Valerie from SSH Canine Academy , a canine behavior specialist with a passion for creating lasting connections between dogs and their families, this presentation will empower you with the tools to be a confident and compassionate dog owner. In this program, you’ll discover the joys of having a dog while learning about the responsibilities that come with pet ownership. Valerie will guide you thr",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T18:00:00-04:00",
    "startDate": "2026-11-19T18:00:00-04:00",
    "endDate": "2026-11-19T19:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a738410e30fe48459672c58",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-markham-events-stem-pa-day-crafts-at-unionville-965c1ffb50c0",
    "title": "PA Day Crafts at Unionville",
    "organization": "Markham Public Library",
    "description": "Looking for PA Day fun? We've got you covered! Drop in for a morning of creativity and adventure featuring: ✂️ Hands-on mini crafts 🔎 Scavenger hunt 🌈 A coloring station packed with fun",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-20T11:00:00-04:00",
    "startDate": "2026-11-20T11:00:00-04:00",
    "endDate": "2026-11-20T12:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a5e659c9943bdf31ea0474c",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-english-conversation-circle-coffee-chat-8329ba36cbfe",
    "title": "English Conversation Circle: Coffee Chat",
    "organization": "Markham Public Library",
    "description": "This program provides newcomers with a relaxed and supportive environment to practice English and learn about life in Canada. Each session begins with casual conversations over coffee, followed by engaging discussions on practical, everyday topics related to life in York Region. The program helps participants build confidence in navigating real-life situations such as visiting the bank or hospital, handling unexpected events like car accidents, and engaging in small talk in casual Canadian settings. Through interactive lessons, participants will improve their English-speaking and interpersonal skills while learning useful vocabulary and phrases they can apply in daily life. Learning Outcomes: By the end of the program, participants will feel more comfortable, confident, and prepared to com",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-20T10:30:00-04:00",
    "startDate": "2026-11-20T10:30:00-04:00",
    "endDate": "2026-11-20T12:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/69039c9e0562322f002dd710",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Cost-related words appeared near the listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-book-club-discussion-atmosphere-816d693486cb",
    "title": "Book Club Discussion - Atmosphere",
    "organization": "Markham Public Library",
    "description": "Want to connect with others over the love of reading? Join our book club to discuss Taylor Jenkins Reid`s Atmosphere: a Love Story . This title should be on shelves and ready to borrow approximately 5 weeks prior to the discussion date. Check with a staff member if you have questions on how to access a copy. Book Description \"From the #1 New York Times bestselling author of The Seven Husbands of Evelyn Hugo and Daisy Jones & The Six comes an epic new novel set against the backdrop of the 1980s Space Shuttle program about the extraordinary lengths we go to live and love beyond our limits\"--Provided by publisher.",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T18:30:00-04:00",
    "startDate": "2026-11-19T18:30:00-04:00",
    "endDate": "2026-11-19T20:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/68fbdf2de59a13000d3e1df3",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-markham-events-stem-storytime-ebd753ad802b",
    "title": "Storytime",
    "organization": "Markham Public Library",
    "description": "Join us on for an interactive storytime full of books, songs and activities for little ones and their caregivers. Drop-in program.",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-20T10:30:00-04:00",
    "startDate": "2026-11-20T10:30:00-04:00",
    "endDate": "2026-11-20T11:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a5fafed9943bdf31ea08446",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-service-canada-presents-saving-for-your-ch-e79edd6a4d3c",
    "title": "Service Canada Presents: Saving For Your Child's Education and Government Supports for Families",
    "organization": "Markham Public Library",
    "description": "Join this virtual session with Service Canada for a broad introduction and overview of government programs and services for families and children including how to save for your child's education . Participants will learn about: The Social Insurance program Canada Pension Plan for children and families Employment Insurance Canadian Dental Care Plan Canada Disability Benefit Canada Child Benefit Registered Education Savings Plans (RESP) Canada Learning Bond and Canada Education Savings Grant Registered Disability Savings Plan (RDSP) We look forward to seeing you there!",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T13:00:00-04:00",
    "startDate": "2026-11-19T13:00:00-04:00",
    "endDate": "2026-11-19T14:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/68fbd37875911f28001a236d",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-earlyon-drop-in-c4dad93b988a",
    "title": "EarlyON Drop-in",
    "organization": "Markham Public Library",
    "description": "In partnership with Family Day's EarlyON Child & Family Centres, drop-in for welcoming, supportive and accessible sessions where children (birth to six years of age) and their parents, grandparents, or caregivers can play and learn together. EarlyON Child and Family Centres (familydaycare.com)",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T09:30:00-04:00",
    "startDate": "2026-11-19T09:30:00-04:00",
    "endDate": "2026-11-19T11:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/69274b3f44d0e96d007b8765",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-book-club-discussion-the-names-8d7409eae2e0",
    "title": "Book Club Discussion - The Names",
    "organization": "Markham Public Library",
    "description": "Want to connect with others over the love of reading? Join our book club to discuss Florence Knapp's The Names . This title should be on shelves and ready to borrow approximately 5 weeks prior to the discussion date. Check with a staff member if you have questions on how to access a copy. Book Description \"A dazzling debut that asks: Can a name shape the course of a life? In the wake of an enormous, history-making storm, Cora sets off with her nine-year-old daughter, Maia, to register her son's birth. Her husband Gordon, a local doctor, respected in the community but a terrifying and controlling presence at home, intends for her to follow his family tradition going back generations, and name the child Gordon. But on the journey there, Cora wonders if it's right to impose the burden of this",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T14:00:00-04:00",
    "startDate": "2026-11-19T14:00:00-04:00",
    "endDate": "2026-11-19T15:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a4818e54407827f8aa93246",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-science-program-for-grades-4-6-e40e0666ce43",
    "title": "Science program for Grades 4-6",
    "organization": "Markham Public Library",
    "description": "Is your child in Grades 4-6 and would like to explore the world of Science? This program focuses on inspiring children to explore the field of Science and each session will run according to the structure: Activity/Experiment - around 15-25 mins (including discussion about the activity) Independent Research using iPads - around 20 mins (research a Science topic) - for those registered for each week, the student will research a new topic each week Presentation of research topic to the group - around 15 mins The topics for each week is as follows: Session 1: Activity/Experiment - Spaghetti tower (items used: spaghetti, marshmallows) Session 2: Activity/Experiment - Rainbow milk (items used: whole milk, liquid dish soap, q-tips/cotton swabs, food colouring) Session 3: Activity/Experiment - Mea",
    "city": "Markham",
    "region": "York",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T18:00:00-04:00",
    "startDate": "2026-11-19T18:00:00-04:00",
    "endDate": "2026-11-19T19:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6ab2e0b2129d8e0031f44b32",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "School grades are stated; numeric ages are unknown and must be verified.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-vaughan-library-programs-programs-events-bb9bb93d52f1",
    "title": "Programs & Events",
    "organization": "Vaughan Public Libraries",
    "description": "Programs & Events listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-books-movies-music-6fae69baadc2",
    "title": "BOOKS, MOVIES, MUSIC",
    "organization": "Vaughan Public Libraries",
    "description": "BOOKS, MOVIES, MUSIC listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/index",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-baby-social-52313e82e023",
    "title": "Baby Social",
    "organization": "Vaughan Public Libraries",
    "description": "Baby Social listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2573",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-pre-school-programs-5a3286a4ce59",
    "title": "Pre-school Programs",
    "organization": "Vaughan Public Libraries",
    "description": "Pre-school Programs listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/category/1",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-stories-come-alive-39470b415c11",
    "title": "Stories Come Alive",
    "organization": "Vaughan Public Libraries",
    "description": "Stories Come Alive listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3821",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-home-equity-retirement-2c4aba651480",
    "title": "Home Equity & Retirement",
    "organization": "Vaughan Public Libraries",
    "description": "Home Equity & Retirement listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/4100",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-adult-programs-e483d91b812b",
    "title": "Adult Programs",
    "organization": "Vaughan Public Libraries",
    "description": "Adult Programs listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/category/7",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-living-well-club-4557f8b24dfa",
    "title": "Living Well Club",
    "organization": "Vaughan Public Libraries",
    "description": "Living Well Club listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3346",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-custom-ornament-with-laser-cutter-0504f3651825",
    "title": "Custom Ornament with Laser Cutter",
    "organization": "Vaughan Public Libraries",
    "description": "Custom Ornament with Laser Cutter listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2911",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-make-it-create-it-learn-it-8a70b79616a2",
    "title": "Make It! Create It! Learn It!",
    "organization": "Vaughan Public Libraries",
    "description": "Make It! Create It! Learn It! listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/category/37",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-baby-adventures-storytime-16e641ffafb5",
    "title": "Baby Adventures Storytime",
    "organization": "Vaughan Public Libraries",
    "description": "Baby Adventures Storytime listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2865",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-coffee-conversation-9509f6a816d8",
    "title": "Coffee & Conversation",
    "organization": "Vaughan Public Libraries",
    "description": "Coffee & Conversation listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3974",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "needs_review",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Cost-related words appeared near the listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-little-explorers-storytime-9c75653e2e3c",
    "title": "Little Explorers Storytime",
    "organization": "Vaughan Public Libraries",
    "description": "Little Explorers Storytime listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2924",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-little-kitchen-time-40873a2cbe48",
    "title": "Little Kitchen Time",
    "organization": "Vaughan Public Libraries",
    "description": "Little Kitchen Time listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3508",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-cooking-with-diabetes-5453c84f7f89",
    "title": "Cooking with Diabetes",
    "organization": "Vaughan Public Libraries",
    "description": "Cooking with Diabetes listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3720",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-culinary-literacy-27a76c976e32",
    "title": "Culinary Literacy",
    "organization": "Vaughan Public Libraries",
    "description": "Culinary Literacy listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/category/43",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-scholars-hub-home-26d187531bf2",
    "title": "Scholars' Hub @ Home",
    "organization": "Vaughan Public Libraries",
    "description": "Scholars' Hub @ Home listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3531",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-chess-club-d69e7bd75980",
    "title": "Chess Club",
    "organization": "Vaughan Public Libraries",
    "description": "Chess Club listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/735",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-for-children-families-9e538386dd0e",
    "title": "For Children & Families",
    "organization": "Vaughan Public Libraries",
    "description": "For Children & Families listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/category/23",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-baby-music-and-movement-c22d773ae38f",
    "title": "Baby Music and Movement",
    "organization": "Vaughan Public Libraries",
    "description": "Baby Music and Movement listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/1810",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-let-s-go-to-the-movies-b7cc8b7dc0e2",
    "title": "Let's Go to the Movies",
    "organization": "Vaughan Public Libraries",
    "description": "Let's Go to the Movies listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/832",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-chess-club-for-teens-c3090e798242",
    "title": "Chess Club for Teens",
    "organization": "Vaughan Public Libraries",
    "description": "Chess Club for Teens listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3547",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-teen-programs-83d26ea33179",
    "title": "Teen Programs",
    "organization": "Vaughan Public Libraries",
    "description": "Teen Programs listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/category/2",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-reading-buddies-f1b27ca211f7",
    "title": "Reading Buddies",
    "organization": "Vaughan Public Libraries",
    "description": "Reading Buddies listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3240",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-children-s-programs-d160879203a4",
    "title": "Children's Programs",
    "organization": "Vaughan Public Libraries",
    "description": "Children's Programs listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/category/34",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-coding-buddies-5aee8640a30f",
    "title": "Coding Buddies",
    "organization": "Vaughan Public Libraries",
    "description": "Coding Buddies listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Coding & Robotics",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3085",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "coding & robotics",
      "coding"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-english-conversation-circle-17ba67cf66b1",
    "title": "English Conversation Circle",
    "organization": "Vaughan Public Libraries",
    "description": "English Conversation Circle listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2377",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-robotics-club-ae01ea3163b5",
    "title": "Robotics Club",
    "organization": "Vaughan Public Libraries",
    "description": "Robotics Club listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Coding & Robotics",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2494",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "coding & robotics",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-cercle-de-discussion-french-conversation-c-8818b4b6252f",
    "title": "Cercle de discussion / French Conversation Circle",
    "organization": "Vaughan Public Libraries",
    "description": "Cercle de discussion / French Conversation Circle listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en",
      "fr"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2830",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-p-a-day-fun-at-the-library-77d0aa7f673c",
    "title": "P.A. Day Fun at the Library!",
    "organization": "Vaughan Public Libraries",
    "description": "P.A. Day Fun at the Library! listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/4044",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-p-a-day-dea7bd66ce5d",
    "title": "P.A. Day",
    "organization": "Vaughan Public Libraries",
    "description": "P.A. Day listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/category/38",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-richmond-hill-library-programs-skip-to-content-6ae9b30acbf4",
    "title": "Skip to Content",
    "organization": "Richmond Hill Public Library",
    "description": "Skip to Content listed by Richmond Hill Public Library programs.",
    "city": "Richmond Hill",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.rhpl.ca/programs-and-events/program-guide",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Richmond Hill Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-richmond-hill-library-programs-english-english-79080fdd1be4",
    "title": "English (English)",
    "organization": "Richmond Hill Public Library",
    "description": "English (English) listed by Richmond Hill Public Library programs.",
    "city": "Richmond Hill",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.rhpl.ca/programs-and-events/program-information/program-guide",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Richmond Hill Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-richmond-hill-library-programs-fran-ais-french-b98dbcfe3fc8",
    "title": "Français (French)",
    "organization": "Richmond Hill Public Library",
    "description": "Français (French) listed by Richmond Hill Public Library programs.",
    "city": "Richmond Hill",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en",
      "fr"
    ],
    "sourceUrl": "https://www.rhpl.ca/fr/programmes-et-evenements/informations-sur-le-programme/guide-du-programme",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Richmond Hill Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-richmond-hill-library-programs-happening-now-517e06febb3c",
    "title": "Happening Now",
    "organization": "Richmond Hill Public Library",
    "description": "Happening Now listed by Richmond Hill Public Library programs.",
    "city": "Richmond Hill",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.rhpl.ca/programs-and-events",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Richmond Hill Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-richmond-hill-library-programs-program-information-76f385f4e702",
    "title": "Program Information",
    "organization": "Richmond Hill Public Library",
    "description": "Program Information listed by Richmond Hill Public Library programs.",
    "city": "Richmond Hill",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.rhpl.ca/programs-and-events/program-information",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Richmond Hill Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-richmond-hill-library-programs-exhibits-and-displays-f96f0c23147a",
    "title": "Exhibits and Displays",
    "organization": "Richmond Hill Public Library",
    "description": "Exhibits and Displays listed by Richmond Hill Public Library programs.",
    "city": "Richmond Hill",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.rhpl.ca/programs-and-events/exhibits-and-displays",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Richmond Hill Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-maker-workshop-custom-stickers-1e4206b0d15a",
    "title": "Maker Workshop: Custom Stickers",
    "organization": "Aurora Public Library",
    "description": "Learn how to design and cut custom printed stickers using printable vinyl and laminate materials with the Cricut machine. All required materials will be provided. Please note that spots will be prioritized for first-time attendees. teen/adult program 13+",
    "city": "Aurora",
    "region": "York",
    "category": "Makerspace & Fabrication",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T11:00:00-04:00",
    "startDate": "2026-11-19T11:00:00-04:00",
    "endDate": "2026-11-19T12:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/69a451c5491b809c6f1d4a1b",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "makerspace & fabrication",
      "maker"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-crass-stitch-club-0400adcef3c5",
    "title": "Crass Stitch Club",
    "organization": "Aurora Public Library",
    "description": "Every Thursday | 7:00-8:45 Express your frustrations through the art of cross-stitching! Join us in the Creative Studio for some profane cross-stitching. All skill levels are welcome, no supplies needed! *WARNING - this program is intended for older teens/adults, and as such, contains coarse language/curse words; please be advised.* In-person MA Room Drop-in",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T19:00:00-04:00",
    "startDate": "2026-11-19T19:00:00-04:00",
    "endDate": "2026-11-19T20:45:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a99d1e657c264087ad60b42",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning",
      "creative studio"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-apl-acts-of-kindness-f7b72167e0bf",
    "title": "APL Acts of Kindness",
    "organization": "Aurora Public Library",
    "description": "Acts of kindness come in many shapes and forms. To join our monthly Acts of Kindness program email ya@aurorapl.ca . Include your full name, grade, school, and email. Volunteer hours will be awarded at the discretion of library staff. · Registered · In person · Multi-Use Room",
    "city": "Aurora",
    "region": "York",
    "category": "Volunteer Hours",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-20T16:00:00-04:00",
    "startDate": "2026-11-20T16:00:00-04:00",
    "endDate": "2026-11-20T17:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6af1e13496ec3a003ae05484",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-fall-in-love-with-ya-reading-challenge-2ddfe8105a9b",
    "title": "Fall in Love with YA Reading Challenge",
    "organization": "Aurora Public Library",
    "description": "Track the books you read, complete activities, write reviews, and earn digital badges to win prizes. To register, please see the link below: Online Reading Challenge",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-09-01T08:00:00-04:00",
    "startDate": "2026-09-01T08:00:00-04:00",
    "endDate": "2026-12-31T09:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a563c6cfb418a28009ad685",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-cs-intro-to-cricut-68fbb49ffeb1",
    "title": "CS Intro to Cricut",
    "organization": "Aurora Public Library",
    "description": "Learn the basics of the Cricut cutting machine in this introductory course. Create a custom vinyl sticker to take home! This program is for ages 13+ . This is just a reminder that if you are unable to attend any of our programs at APL , to please unregister , or else you will be marked as a \"no-show\", and your ability to register for programs in the future may be impacted, due to high waitlists. Unregistering when you are unable to make it to a program, allows there to be space for others who are on the waitlist to attend. We appreciate your consideration. APL Creative Studio",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T19:00:00-04:00",
    "startDate": "2026-11-19T19:00:00-04:00",
    "endDate": "2026-11-19T20:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6aaac94da5dbde002aa50898",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning",
      "creative studio"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-chinese-singing-lessons-5990d1dbce11",
    "title": "Chinese Singing Lessons",
    "organization": "Aurora Public Library",
    "description": "Do you love singing? Would you like to improve your vocal method and singing techniques? Join us to enhance your singing skills through vocal and breathing techniques taught by our experienced vocal instructor! 喜歡唱歌的你，是否想改善發聲方法及歌唱技巧？ 由資深聲樂老師教授發聲與運氣方法。 歡迎參加 Location: Magna Room 地點： 奧羅拉圖書館 Magna Room，在圖書館入口左手邊 Drop in, no registration required 免費, 無需註冊",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-21T10:00:00-04:00",
    "startDate": "2026-11-21T10:00:00-04:00",
    "endDate": "2026-11-21T12:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a7cbff361e11c00517723cc",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-apl-s-stuffed-animal-hospital-576df6caac5e",
    "title": "APL's Stuffed Animal Hospital",
    "organization": "Aurora Public Library",
    "description": "Children's Desk on 2nd Floor | All Day Is your stuffed animal sick or injured? Worry not! APL’s Stuffed Animal Hospital is here to help! Drop off your stuffie needing repairs at the children’s desk on the 2nd floor of the library, then our “doctors” will fix them up and send them home with instructions for YOU to help your stuffies next time! Please drop your stuffie off at the 2nd floor Children's Desk and fill out our stuffie patient intake form!",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2025-09-18",
    "startDate": "2025-09-18",
    "endDate": "2026-12-31",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a563cf5aa34e23600ef0184",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-apl-escape-room-9d663aef0f16",
    "title": "APL Escape Room",
    "organization": "Aurora Public Library",
    "description": "Put your puzzle-solving skills to the test! Find codes, solve riddles, and so much more! One clue leads to another, until victory is achieved! Registration is required.",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T18:00:00-04:00",
    "startDate": "2026-11-19T18:00:00-04:00",
    "endDate": "2026-11-19T19:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6933515b94297d36009e7d73",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-stem-engineering-adventures-07635a5e6504",
    "title": "STEM Engineering Adventures",
    "organization": "Aurora Public Library",
    "description": "Discover the power of hands-on learning with our scientific, intriguing, interactive STEM activities and projects that you get to take home after completion! This is in collaboration with and funded by Robotics Rock STEM Youth Association. This session is for ages 11-14. If you are unable to attend, please cancel your registration as soon as possible so that another child may take your spot. Repeated no-shows without cancelling may affect eligibility for future registrations, as we strive to provide fair access to all families interested in the program.",
    "city": "Aurora",
    "region": "York",
    "ageMin": 11,
    "ageMax": 14,
    "category": "Coding & Robotics",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "explicit-ages",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T17:30:00-04:00",
    "startDate": "2026-11-19T17:30:00-04:00",
    "endDate": "2026-11-19T18:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6ab147913dd190003e737b1a",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "coding & robotics",
      "stem"
    ],
    "confidence": "high",
    "reviewReasons": [
      "Cost is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-improving-your-listening-and-speaking-d20cbe1825d0",
    "title": "Improving Your Listening and Speaking",
    "organization": "Aurora Public Library",
    "description": "In partnership with YCDSB, this course will allow students to explore and develop their language skills through various documentaries, parts of films, current news and talk shows. Students will be given the opportunity to explore ideas, use everyday language and develop their knowledge on real world lingo. New students will need to have a registration/assessment completed. The assessment centre number is 1-855-330-8655.",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T13:30:00-04:00",
    "startDate": "2026-11-19T13:30:00-04:00",
    "endDate": "2026-11-19T15:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a3d7a57c52cdc3600ecdd19",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-friday-family-storytime-44fece4d5703",
    "title": "Friday Family Storytime",
    "organization": "Aurora Public Library",
    "description": "Join us for Friday Family Storytime, where we have stories, rhymes, songs, and lots of fun! Best for ages 5 and younger with a parent, but everyone is welcome.",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-20T10:30:00-04:00",
    "startDate": "2026-11-20T10:30:00-04:00",
    "endDate": "2026-11-20T11:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a98b7021c197d11325cdf56",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-financial-empowerment-for-women-f5fb2a5d0fd3",
    "title": "Financial Empowerment for Women",
    "organization": "Aurora Public Library",
    "description": "Financial Empowerment is a four-week financial education workshop designed specifically for women. The program takes a comprehensive and practical approach to building financial well-being. WEEK 1 | Nov 19 Discover Your Relationship With Money and Where It Comes From WEEK 2 | Nov 26 Build Your Budget & Expense Tracker WEEK 3 | Dec 3 Trust New Financial Habits WEEK 4 | Dec 10 Align Your Values With Your Financial Decisions For women 18+ living in York Region. In partnership with Women’s Centre of York Region. Please note: Registration is for the full four-week program. Register at wcyr.ca/registration",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T10:00:00-04:00",
    "startDate": "2026-11-19T10:00:00-04:00",
    "endDate": "2026-11-19T12:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a0c8164278f7c2f008e1e48",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-spanish-for-everyone-espa-ol-para-todos-dd4e1fd6071f",
    "title": "Spanish for Everyone (Español para todos)",
    "organization": "Aurora Public Library",
    "description": "Practice your Spanish in a welcoming and relaxed environment! Join our Spanish Conversation Circle to build confidence, improve your speaking skills, and connect with others through engaging conversation and cultural exchange. Participants of all levels are welcome, although a basic knowledge of Spanish is recommended. Register at bit.ly/4g4K0c0",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en",
      "es"
    ],
    "deadline": "2026-11-20T14:00:00-04:00",
    "startDate": "2026-11-20T14:00:00-04:00",
    "endDate": "2026-11-20T15:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a3d8efde5f29d2667fe4332",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-kids-sewing-series-0ed62f18bd9b",
    "title": "Kids Sewing Series",
    "organization": "Aurora Public Library",
    "description": "Kids will learn techniques and some simple sewing patterns once a month, perfect for individuals who are crafty and looking to work with a new medium. Recommended for 8+, all materials included. Please note that the same pattern will be taught for both sessions in the same month. If you register for the first session, please do not register for the second. November Sewing Project: Heat Holder for Hands",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-20T16:00:00-04:00",
    "startDate": "2026-11-20T16:00:00-04:00",
    "endDate": "2026-11-20T17:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a7e1bce452bb101b574fdc7",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-song-and-dance-time-ea77ab529e49",
    "title": "Song and Dance Time",
    "organization": "Aurora Public Library",
    "description": "Join us for preschool music and movement! We’ll sing, dance, learn about rhythm, and have a lot of fun! Best for ages 2-5.",
    "city": "Aurora",
    "region": "York",
    "ageMin": 2,
    "ageMax": 5,
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "explicit-ages",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T11:00:00-04:00",
    "startDate": "2026-11-19T11:00:00-04:00",
    "endDate": "2026-11-19T11:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6ad2844b29c3d60033306e00",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "high",
    "reviewReasons": [
      "Cost is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-korean-storytime-8155aa1ceae9",
    "title": "Korean Storytime",
    "organization": "Aurora Public Library",
    "description": "Join us for a cozy Korean-language storytime designed for young learners and their families! Each session features a themed story — from nature and emotions to family and friendship — followed by a fun, simple craft that brings the story to life. A wonderful way to build language skills, spark imagination, and connect with Korean culture together. 오로라 도서관 한국어 스토리타임 아이들과 함께하는 따뜻한 한국어 스토리타임에 초대합니다! 매 회 자연, 감정, 가족 등 다양한 주제의 그림책을 읽고, 이야기와 연결된 간단하고 재미있는 크래프트 활동을 진행합니다. 한국어와 한국 문화를 즐겁게 배우는 소중한 시간이 될 거예요.",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en",
      "ko"
    ],
    "deadline": "2026-11-19T17:00:00-04:00",
    "startDate": "2026-11-19T17:00:00-04:00",
    "endDate": "2026-11-19T18:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a79fc311d5d03c3a6bba1e4",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-time-for-toddlers-1fabb8115dd3",
    "title": "Time for Toddlers",
    "organization": "Aurora Public Library",
    "description": "Come join us for a fun session of movement, rhythm, and reading that's perfect for little ones.",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T10:00:00-04:00",
    "startDate": "2026-11-19T10:00:00-04:00",
    "endDate": "2026-11-19T10:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a78c8b5b3bdcec4a6674160",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-french-classes-for-beginners-7cbc9984d6a1",
    "title": "French Classes for Beginners",
    "organization": "Aurora Public Library",
    "description": "Join our Introduction to French class at the library! This fun and interactive program is designed for beginners who want to learn basic French words and phrases. Sessions are led by a professional French teacher. This is a series program, and participants are expected to attend all scheduled sessions. By registering, you are committing to participate in the full program to ensure the best learning experience for everyone.",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en",
      "fr"
    ],
    "deadline": "2026-11-19T19:00:00-04:00",
    "startDate": "2026-11-19T19:00:00-04:00",
    "endDate": "2026-11-19T20:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6adb9a19a85a2c003381a91b",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-the-good-food-workshop-69eeef6e297d",
    "title": "The Good Food Workshop",
    "organization": "Aurora Public Library",
    "description": "The Good Food Workshop is a food skills workshop that helps participants build confidence in preparing nutritious, affordable meals. This interactive workshop is tailored to individual lifestyles and needs, and participants develop practical skills in meal planning, food safety and food budgeting. In partnership with York Region Food Network. Register at bit.ly/4eg6OWf",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-19T10:00:00-04:00",
    "startDate": "2026-11-19T10:00:00-04:00",
    "endDate": "2026-11-19T12:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6aea8d1b901b02002cc7536c",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-volunteers-click-here-45d4b498ca1f",
    "title": "Click Here",
    "organization": "Aurora Public Library",
    "description": "Click Here listed by Aurora Public Library volunteer opportunities.",
    "city": "Aurora",
    "region": "York",
    "category": "Volunteer Hours",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://aurorapl.ca/form-event-volunteer-form",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library volunteer opportunities",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-whitby-programs-skip-to-main-content-2390f8b1098c",
    "title": "Skip to Main Content",
    "organization": "Whitby Public Library",
    "description": "Skip to Main Content listed by Whitby Public Library programs.",
    "city": "Whitby",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.whitbylibrary.ca/programs",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Whitby Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-ajax-library-stem-skip-to-main-content-95f4e6fe118a",
    "title": "Skip to main content",
    "organization": "Ajax Public Library",
    "description": "Skip to main content listed by Ajax Public Library STEM events.",
    "city": "Ajax",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://ajaxlibrary.libnet.info/events?term=STEM",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Ajax Public Library STEM events",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-pickering-library-tech-asl-event-interpreter-1ebc8c4c2754",
    "title": "ASL Event Interpreter",
    "organization": "Pickering Public Library",
    "description": "ASL Event Interpreter listed by Pickering Public Library technology events.",
    "city": "Pickering",
    "region": "Durham",
    "category": "STEM",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://pickeringlibrary.ca/assistive-services/asl-event-interpreter",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "stem"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Pickering Public Library technology events",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-pickering-library-tech-propose-an-event-2e923f825ea5",
    "title": "Propose an Event",
    "organization": "Pickering Public Library",
    "description": "Propose an Event listed by Pickering Public Library technology events.",
    "city": "Pickering",
    "region": "Durham",
    "category": "STEM",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://pickeringlibrary.ca/event-proposal",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "stem"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Pickering Public Library technology events",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oshawa-library-stem-bright-merry-market-d74e31b9876c",
    "title": "Bright & Merry Market",
    "organization": "Oshawa Public Libraries",
    "description": "Bright & Merry Market from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/v2/events/6a68cb1af4e5db3d00c4d296",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oshawa Public Libraries STEM events",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oshawa-library-stem-create-with-cricut-cards-for-seniors-b5ef1193fed6",
    "title": "Create with Cricut®: Cards for Seniors",
    "organization": "Oshawa Public Libraries",
    "description": "Create with Cricut®: Cards for Seniors from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Makerspace & Fabrication",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/v2/events/6ad635c8fee2d21deb2449e0",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "makerspace & fabrication"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oshawa Public Libraries STEM events",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oshawa-library-stem-game-on-98cf99fd716e",
    "title": "Game On!",
    "organization": "Oshawa Public Libraries",
    "description": "Game On! from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/v2/events/6a68d0910e562e28009d01af",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oshawa Public Libraries STEM events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oshawa-library-stem-90s-trivia-night-2e22537d0e01",
    "title": "90s Trivia Night",
    "organization": "Oshawa Public Libraries",
    "description": "90s Trivia Night from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/v2/events/6a68cb5f4523092f00331eb2",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oshawa Public Libraries STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-oshawa-library-stem-neighbourhood-play-date-6ee84c3cfcfd",
    "title": "Neighbourhood Play Date",
    "organization": "Oshawa Public Libraries",
    "description": "Neighbourhood Play Date from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68df564523092f00332446",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oshawa Public Libraries STEM events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oshawa-library-stem-lunchtime-book-club-43b4451acf21",
    "title": "Lunchtime Book Club",
    "organization": "Oshawa Public Libraries",
    "description": "Lunchtime Book Club from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68c0844523092f00331bf8",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oshawa Public Libraries STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-oshawa-library-stem-creation-station-70711801df07",
    "title": "Creation Station",
    "organization": "Oshawa Public Libraries",
    "description": "Creation Station from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68d928f4e5db3d00c4d752",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oshawa Public Libraries STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-oshawa-library-stem-meditation-group-0bb7799b6c07",
    "title": "Meditation Group",
    "organization": "Oshawa Public Libraries",
    "description": "Meditation Group from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68bceef4e5db3d00c4cf19",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oshawa Public Libraries STEM events",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-oshawa-library-stem-skip-to-main-navigation-da4e031c2af8",
    "title": "Skip to main navigation",
    "organization": "Oshawa Public Libraries",
    "description": "Skip to main navigation listed by Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.ca/events/?tribe-bar-search=STEM",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oshawa Public Libraries STEM events",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oshawa-library-stem-name-ee1e87e03a66",
    "title": "{{name}}",
    "organization": "Oshawa Public Libraries",
    "description": "{{name}} listed by Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.ca/events/%7B%7Burl%7D%7D",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oshawa Public Libraries STEM events",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oshawa-library-stem-title-e079ef32b663",
    "title": "{{title}}",
    "organization": "Oshawa Public Libraries",
    "description": "{{title}} listed by Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.ca/events/%7B%7Blink%7D%7D",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oshawa Public Libraries STEM events",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-clarington-library-programs-programs-services-f980134a3283",
    "title": "Programs & Services",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Programs & Services listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.cplma.ca/programs-services",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning",
      "programs"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Clarington Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-clarington-library-programs-battle-of-the-books-2e95bce016d4",
    "title": "Battle of the Books",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Battle of the Books listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.cplma.ca/programs-services/battle-of-the-books",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Clarington Library programs",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-clarington-library-programs-community-resources-5c7cea028641",
    "title": "Community Resources",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Community Resources listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.cplma.ca/programs-services/community-resources",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Clarington Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-clarington-library-programs-curious-communities-9254353a5764",
    "title": "Curious Communities",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Curious Communities listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.cplma.ca/programs-services/curious-communities-discount-program",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Clarington Library programs",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-clarington-library-programs-enewsletters-4e8a2eb0bb28",
    "title": "eNewsletters",
    "organization": "Clarington Library, Museums & Archives",
    "description": "eNewsletters listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.cplma.ca/programs-services/newsletters",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Clarington Library programs",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-clarington-library-programs-good-neighbours-16e0547fd667",
    "title": "Good Neighbours",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Good Neighbours listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.cplma.ca/programs-services/good-neighbours",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Clarington Library programs",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-clarington-library-programs-news-press-releases-e31ed3ec57a6",
    "title": "News & Press Releases",
    "organization": "Clarington Library, Museums & Archives",
    "description": "News & Press Releases listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.cplma.ca/programs-services/news-and-press-releases",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Clarington Library programs",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-clarington-library-programs-program-calendar-84c88e87b965",
    "title": "Program Calendar",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Program Calendar listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.cplma.ca/programs-services/program-calendar",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Clarington Library programs",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-clarington-library-programs-program-guide-a3377cc4e934",
    "title": "Program Guide",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Program Guide listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.cplma.ca/programs-services/program-guide",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Clarington Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-clarington-library-programs-room-bookings-07941ed3a871",
    "title": "Room Bookings",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Room Bookings listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.cplma.ca/programs-services/room-bookings",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Clarington Library programs",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-clarington-library-programs-tours-group-visits-b5a53e206a97",
    "title": "Tours & Group Visits",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Tours & Group Visits listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.cplma.ca/programs-services/tours-and-group-visits",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Clarington Library programs",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-clarington-library-programs-reading-and-math-buddies-3e183b053cf3",
    "title": "Reading and Math Buddies",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Reading and Math Buddies listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.cplma.ca/programs-services/reading-and-math-buddies",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Clarington Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-clarington-library-programs-storywalks-a9476f4e2e14",
    "title": "StoryWalks",
    "organization": "Clarington Library, Museums & Archives",
    "description": "StoryWalks listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.cplma.ca/programs-services/storywalks",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Clarington Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-mississauga-library-events-view-all-programs-6e64e0c8effd",
    "title": "View all programs",
    "organization": "Mississauga Library",
    "description": "View all programs listed by Mississauga Library events.",
    "city": "Mississauga",
    "region": "Peel",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.mississauga.ca/library/programs",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Mississauga Library events",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-mississauga-library-volunteers-library-jobs-and-volunteer-4e330c1fa4cc",
    "title": "Library jobs and volunteer",
    "organization": "Mississauga Library",
    "description": "View current job opportunities and volunteer information for people who want to work at the Mississauga Library or volunteer with the Friends of the Library.",
    "city": "Mississauga",
    "region": "Peel",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-11-10T09:00:00-04:00",
    "sourceUrl": "https://www.mississauga.ca/library/library-jobs-and-volunteer",
    "lastChecked": "2026-11-10",
    "lastSeen": "2026-11-10",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "volunteer"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Mississauga Library volunteer opportunities",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-mississauga-library-volunteers-volunteer-at-the-library-teens-can-join-a--b5bb104e9e9a",
    "title": "Volunteer at the library Teens can join a teen advisory group. Adults can volunteer for special events and more.",
    "organization": "Mississauga Library",
    "description": "Volunteer at the library Teens can join a teen advisory group. Adults can volunteer for special events and more. listed by Mississauga Library volunteer opportunities.",
    "city": "Mississauga",
    "region": "Peel",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-11-10T09:00:00-04:00",
    "sourceUrl": "https://app.betterimpact.com/PublicEnterprise/EnterpriseSearch?EnterpriseGuid=e3200288-2b64-4ed8-a26d-5bd0f4c5170b&SearchType=OrganizationClassification&SearchId=9624",
    "lastChecked": "2026-11-10",
    "lastSeen": "2026-11-10",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "volunteer",
      "teen"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Mississauga Library volunteer opportunities",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-oakville-library-programs-skip-to-main-content-5e43854d8acd",
    "title": "Skip to main content",
    "organization": "Oakville Public Library",
    "description": "Skip to main content listed by Oakville Public Library programs.",
    "city": "Oakville",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://opl.ca/Programs",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oakville Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oakville-library-programs-opl-programs-and-events-search-a69e8415b605",
    "title": "OPL Programs and Events Search",
    "organization": "Oakville Public Library",
    "description": "OPL Programs and Events Search listed by Oakville Public Library programs.",
    "city": "Oakville",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://opl.ca/Programs-and-Events",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oakville Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oakville-library-programs-book-clubs-153120550fd8",
    "title": "Book Clubs",
    "organization": "Oakville Public Library",
    "description": "Book Clubs listed by Oakville Public Library programs.",
    "city": "Oakville",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://opl.ca/Programs-and-Events/Book-Clubs",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oakville Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oakville-library-programs-summer-reading-club-2e15ceae9e89",
    "title": "Summer Reading Club",
    "organization": "Oakville Public Library",
    "description": "Summer Reading Club listed by Oakville Public Library programs.",
    "city": "Oakville",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://opl.ca/programs-and-events/summer-reading-challenge",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oakville Public Library programs",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oakville-library-programs-battle-of-the-books-5cfe3516bdb2",
    "title": "Battle of the Books",
    "organization": "Oakville Public Library",
    "description": "Battle of the Books listed by Oakville Public Library programs.",
    "city": "Oakville",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://opl.ca/Programs-and-Events/Battle-of-the-Books",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oakville Public Library programs",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  },
  {
    "id": "discovered-oakville-library-programs-programs-faq-fb4b1e3842ef",
    "title": "Programs FAQ",
    "organization": "Oakville Public Library",
    "description": "Programs FAQ listed by Oakville Public Library programs.",
    "city": "Oakville",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://opl.ca/Programs-and-Events/Programming-FAQ",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Oakville Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-burlington-library-stem-skip-to-main-content-5dd96a0ee364",
    "title": "Skip to main content",
    "organization": "Burlington Public Library",
    "description": "Skip to main content listed by Burlington Public Library STEM events.",
    "city": "Burlington",
    "region": "Halton",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://attend.bpl.on.ca/events?term=STEM",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Burlington Public Library STEM events",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-milton-library-programs-volunteer-opportunities-b6ad7428d58f",
    "title": "Volunteer Opportunities",
    "organization": "Milton Public Library",
    "description": "Volunteer Opportunities listed by Milton Public Library programs.",
    "city": "Milton",
    "region": "Halton",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-11-10T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca/volunteer-opportunities",
    "lastChecked": "2026-11-10",
    "lastSeen": "2026-11-10",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "volunteer"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Milton Public Library programs",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-milton-library-programs-computer-services-02850eef3932",
    "title": "Computer Services",
    "organization": "Milton Public Library",
    "description": "Computer Services listed by Milton Public Library programs.",
    "city": "Milton",
    "region": "Halton",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-11-10T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca",
    "lastChecked": "2026-11-10",
    "lastSeen": "2026-11-10",
    "status": "needs_review",
    "tags": [
      "stem"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Milton Public Library programs",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-milton-library-programs-public-access-computers-wireless-access-bo-9651b4edfb4b",
    "title": "Public Access Computers, Wireless Access, Borrow Laptops",
    "organization": "Milton Public Library",
    "description": "Public Access Computers, Wireless Access, Borrow Laptops listed by Milton Public Library programs.",
    "city": "Milton",
    "region": "Halton",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-11-10T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca/computer-services",
    "lastChecked": "2026-11-10",
    "lastSeen": "2026-11-10",
    "status": "needs_review",
    "tags": [
      "stem"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Milton Public Library programs",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-halton-hills-library-programs-all-programs-b236443eaf40",
    "title": "All Programs",
    "organization": "Halton Hills Public Library",
    "description": "All Programs listed by Halton Hills Public Library programs.",
    "city": "Halton Hills",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.hhpl.ca/all-programs",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning",
      "programs"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Halton Hills Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-halton-hills-library-programs-cultural-programs-cdf6946d8c99",
    "title": "Cultural Programs",
    "organization": "Halton Hills Public Library",
    "description": "Cultural Programs listed by Halton Hills Public Library programs.",
    "city": "Halton Hills",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.hhpl.ca/all-programs/cultural-programs",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning",
      "programs"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Halton Hills Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-halton-hills-library-programs-children-s-programs-b721f2a2f29c",
    "title": "Children's Programs",
    "organization": "Halton Hills Public Library",
    "description": "Children's Programs listed by Halton Hills Public Library programs.",
    "city": "Halton Hills",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.hhpl.ca/childrens-programs",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning",
      "programs"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Halton Hills Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-halton-hills-library-programs-youth-programs-13d3fcafea17",
    "title": "Youth Programs",
    "organization": "Halton Hills Public Library",
    "description": "Youth Programs listed by Halton Hills Public Library programs.",
    "city": "Halton Hills",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.hhpl.ca/youth-programs",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning",
      "programs"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Halton Hills Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-halton-hills-library-programs-adult-programs-dbdd4a8d1275",
    "title": "Adult Programs",
    "organization": "Halton Hills Public Library",
    "description": "Adult Programs listed by Halton Hills Public Library programs.",
    "city": "Halton Hills",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.hhpl.ca/adult-programs",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning",
      "programs"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Halton Hills Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-halton-hills-library-programs-suggest-a-program-8ff90b0adedb",
    "title": "Suggest a Program",
    "organization": "Halton Hills Public Library",
    "description": "Suggest a Program listed by Halton Hills Public Library programs.",
    "city": "Halton Hills",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.hhpl.ca/all-programs/suggest-a-program",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Halton Hills Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-halton-hills-library-programs-battle-of-the-books-bf9b33a93019",
    "title": "Battle of the Books",
    "organization": "Halton Hills Public Library",
    "description": "Battle of the Books listed by Halton Hills Public Library programs.",
    "city": "Halton Hills",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.hhpl.ca/all-programs/battle-of-the-books",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Halton Hills Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-halton-hills-library-programs-early-literacy-2b971c148c62",
    "title": "Early Literacy",
    "organization": "Halton Hills Public Library",
    "description": "Early Literacy listed by Halton Hills Public Library programs.",
    "city": "Halton Hills",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.hhpl.ca/all-programs/ealry-literacy",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Halton Hills Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-halton-hills-library-programs-summer-reading-challenge-e44ed6376e0f",
    "title": "Summer Reading Challenge",
    "organization": "Halton Hills Public Library",
    "description": "Summer Reading Challenge listed by Halton Hills Public Library programs.",
    "city": "Halton Hills",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.hhpl.ca/all-programs/summer-reading-challenge",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Halton Hills Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-halton-hills-library-programs-halton-hills-lecture-series-3108fee161c4",
    "title": "Halton Hills Lecture Series",
    "organization": "Halton Hills Public Library",
    "description": "Halton Hills Lecture Series listed by Halton Hills Public Library programs.",
    "city": "Halton Hills",
    "region": "Halton",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.hhpl.ca/all-programs/halton-hills-lecture-series",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Halton Hills Public Library programs",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-trca-youth-events-calendar-fa42437c8c89",
    "title": "Events Calendar",
    "organization": "Toronto and Region Conservation Authority",
    "description": "Events Calendar listed by TRCA youth volunteer opportunities.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Volunteer Hours",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://trca.ca/events-calendar",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "TRCA youth volunteer opportunities",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-trca-youth-host-an-event-a0b1d26008f8",
    "title": "Host an Event",
    "organization": "Toronto and Region Conservation Authority",
    "description": "Host an Event listed by TRCA youth volunteer opportunities.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Volunteer Hours",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://trca.ca/host-an-event",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "TRCA youth volunteer opportunities",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-trca-youth-recreational-activities-396e33de425b",
    "title": "Recreational Activities",
    "organization": "Toronto and Region Conservation Authority",
    "description": "Recreational Activities listed by TRCA youth volunteer opportunities.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Volunteer Hours",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://trca.ca/activities",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "TRCA youth volunteer opportunities",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-trca-youth-take-your-bike-for-a-spin-0667eb7d0928",
    "title": "Take Your Bike for a Spin",
    "organization": "Toronto and Region Conservation Authority",
    "description": "Take Your Bike for a Spin listed by TRCA youth volunteer opportunities.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Volunteer Hours",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://trca.ca/activities/mountain-biking-cycling",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "TRCA youth volunteer opportunities",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-trca-youth-enjoy-birding-8e78e476bdc0",
    "title": "Enjoy Birding",
    "organization": "Toronto and Region Conservation Authority",
    "description": "Enjoy Birding listed by TRCA youth volunteer opportunities.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Volunteer Hours",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://trca.ca/activities/bird-watching",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "TRCA youth volunteer opportunities",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-trca-youth-go-for-a-hike-880461c7c6c4",
    "title": "Go for a Hike",
    "organization": "Toronto and Region Conservation Authority",
    "description": "Go for a Hike listed by TRCA youth volunteer opportunities.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Volunteer Hours",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://trca.ca/activities/hiking",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "TRCA youth volunteer opportunities",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-trca-youth-community-events-32f975a0ccf8",
    "title": "Community Events",
    "organization": "Toronto and Region Conservation Authority",
    "description": "Community Events listed by TRCA youth volunteer opportunities.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Volunteer Hours",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://trca.ca/get-involved/events",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "TRCA youth volunteer opportunities",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-trca-youth-community-stewardship-program-99b1d30186d4",
    "title": "Community Stewardship Program",
    "organization": "Toronto and Region Conservation Authority",
    "description": "Community Stewardship Program listed by TRCA youth volunteer opportunities.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Volunteer Hours",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://trca.ca/get-involved/community-stewardship-program",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "TRCA youth volunteer opportunities",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-trca-youth-corporate-functions-459f3d290cf8",
    "title": "Corporate Functions",
    "organization": "Toronto and Region Conservation Authority",
    "description": "Corporate Functions listed by TRCA youth volunteer opportunities.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Volunteer Hours",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://trca.ca/host-an-event/corporate-functions",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "TRCA youth volunteer opportunities",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-trca-youth-weddings-47d188b05138",
    "title": "Weddings",
    "organization": "Toronto and Region Conservation Authority",
    "description": "Weddings listed by TRCA youth volunteer opportunities.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Volunteer Hours",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://trca.ca/host-an-event/weddings",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "TRCA youth volunteer opportunities",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-trca-youth-host-a-community-event-80b67e5aa208",
    "title": "Host a Community Event",
    "organization": "Toronto and Region Conservation Authority",
    "description": "Host a Community Event listed by TRCA youth volunteer opportunities.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Volunteer Hours",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://trca.ca/host-an-event/host-a-large-scale-community-event",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "TRCA youth volunteer opportunities",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "source_unavailable"
  },
  {
    "id": "discovered-uhn-stem-pathways-program-update-d82e225d9965",
    "title": "Program Update",
    "organization": "UHN STEM Pathways",
    "description": "Program Update listed by UHN STEM Pathways.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://uhnstempathways.ca/program-update",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "UHN STEM Pathways",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-uhn-stem-pathways-request-an-event-56aaeea0b5b2",
    "title": "Request an Event",
    "organization": "UHN STEM Pathways",
    "description": "Request an Event listed by UHN STEM Pathways.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://uhnstempathways.ca/request-an-event",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "UHN STEM Pathways",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-uhn-stem-pathways-certificate-of-participation-program-a160621342d7",
    "title": "Certificate of Participation Program",
    "organization": "UHN STEM Pathways",
    "description": "Certificate of Participation Program listed by UHN STEM Pathways.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://uhnstempathways.ca/certificate-of-participation-program",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "UHN STEM Pathways",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-uhn-stem-pathways-folder-programs-91d3244a4258",
    "title": "Folder: Programs",
    "organization": "UHN STEM Pathways",
    "description": "Folder: Programs listed by UHN STEM Pathways.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://uhnstempathways.ca/programs",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "UHN STEM Pathways",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-uoft-engineering-outreach-introduction-to-u-of-t-engineering-6c45b7bc39c8",
    "title": "Introduction to U of T Engineering",
    "organization": "University of Toronto Engineering Outreach",
    "description": "Introduction to U of T Engineering Grade 9–12 | Free Offered multiple times from September–December Join U of T Engineering Recruitment staff for this special online presentation designed for high school students and their families to learn more about studying engineering at the University of Toronto. The session begins with a 30-minute overview of our [&hellip;] Admission: Free.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Science & Engineering",
    "cost": "Free to join",
    "costEvidence": "source-stated-free",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-20T01:00:00.000Z",
    "startDate": "2026-11-20T01:00:00.000Z",
    "endDate": "2026-11-20T02:00:00.000Z",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/event/introduction-to-u-of-t-engineering-4/2026-11-19",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "School grades are stated; numeric ages are unknown and must be verified.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "University of Toronto Engineering Outreach",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-uoft-engineering-outreach-stem-students-for-a-day-8211-fall-1c8f665af955",
    "title": "Stem Students for a Day – Fall",
    "organization": "University of Toronto Engineering Outreach",
    "description": "This event is put on by a University of Toronto student group, Women in Science and Engineering (WISE). STEM Students for a Day Friday, November 20, 2026 9:00 AM to 4:30 PM Target Audience: Grade 9-12 ​This event is intended for individuals who identify as women, non-binary, or Two-Spirit, but all students interested in exploring [&hellip;] Admission: Free.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Science & Engineering",
    "cost": "Free to join",
    "costEvidence": "source-stated-free",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-20T14:00:00.000Z",
    "startDate": "2026-11-20T14:00:00.000Z",
    "endDate": "2026-11-20T21:30:00.000Z",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/event/stem-students-for-a-day-fall",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering",
      "stem",
      "science"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "School grades are stated; numeric ages are unknown and must be verified.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "University of Toronto Engineering Outreach",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-elementary-programs-6f5963f19b66",
    "title": "Elementary Programs",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Elementary Programs listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/elementary-programs/index.php",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Ontario Tech Engineering Outreach",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-high-school-programs-f64b56b0b0c5",
    "title": "High School Programs",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "High School Programs listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/high-school-programs/index.php",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Ontario Tech Engineering Outreach",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-edi-programs-46daec202d56",
    "title": "EDI Programs",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "EDI Programs listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/edi-programs/index.php",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Ontario Tech Engineering Outreach",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-teacher-programs-62fa411225dc",
    "title": "Teacher Programs",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Teacher Programs listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/teacher-programs/index.php",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Ontario Tech Engineering Outreach",
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-shsm-experiential-learning-a8c203b47adb",
    "title": "SHSM Experiential Learning",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "SHSM Experiential Learning listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Co-op & SHSM",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/teacher-programs/shsm-experiential-learning.php",
    "lastChecked": "2026-11-19",
    "lastSeen": "2026-11-19",
    "status": "needs_review",
    "tags": [
      "co-op & shsm"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Ontario Tech Engineering Outreach",
    "firstSeen": "2026-11-19",
    "lastChanged": "2026-11-19",
    "changeKind": "new"
  }
] satisfies DiscoveredOpportunity[];
