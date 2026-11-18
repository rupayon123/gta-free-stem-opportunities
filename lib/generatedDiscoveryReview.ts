import type { DiscoveredOpportunity } from "./discovery";

export const generatedDiscoverySummary = {
  "mode": "deterministic",
  "sourcesChecked": 34,
  "candidatesFound": 411,
  "newCandidates": 189,
  "duplicatesSkipped": 218,
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
    "generatedAt": "2026-11-18T07:34:15.784Z",
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
        "candidates": 17,
        "accepted": 12,
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
        "accepted": 19,
        "retained": 0
      },
      {
        "sourceId": "markham-events-volunteer",
        "status": "ok",
        "candidates": 21,
        "accepted": 19,
        "retained": 0
      },
      {
        "sourceId": "vaughan-library-programs",
        "status": "ok",
        "candidates": 88,
        "accepted": 87,
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
        "candidates": 15,
        "accepted": 14,
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
        "candidates": 31,
        "accepted": 31,
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
        "candidates": 15,
        "accepted": 15,
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
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
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
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
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
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
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
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
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
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
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
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-tpl-events-stem-youth-hub-house-of-games-trivia-4ca4ab7f7ffa",
    "title": "Youth Hub: House of Games Trivia",
    "organization": "Toronto Public Library",
    "description": "The temperature is cooling, but the competition is heating up! Join us for Morgan’s House of Games, Ep. 31. Indulge your love of fun and facts with an exciting round of trivia that’ll test your general knowledge, lateral thinking, and quick reflexes. This is a Youth Hub program for teens only . Drop-in attendance, no registration required. This program is part of Youth Hub service. Youth Hubs are a welcoming place for teens after school and in the summer, where helpful staff are always available. Free, nutritious snacks are offered daily. Drop by a branch with a Youth Hub or call the branch to find out more.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T08:00:00-04:00",
    "startDate": "2026-11-18T08:00:00-04:00",
    "endDate": "2026-11-18T09:00:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6a89c44b29a7dd0d6745c19b",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-canadian-council-of-the-blind-book-club-0c014ca6c83f",
    "title": "Canadian Council of the Blind Book Club",
    "organization": "Toronto Public Library",
    "description": "This book club is facilitated by staff in partnership with the Canadian Council of the Blind, Toronto Visionaries Chapter. The book club is open to those living with vision loss or low vision, or are deaf-blind and to their sighted support persons. The book club meets on the third Wednesday of the month. November's book is The River is Waiting by Wally Lamb.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T10:00:00-04:00",
    "startDate": "2026-11-18T10:00:00-04:00",
    "endDate": "2026-11-18T12:00:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ae64bc5901b02002cc6747a",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-family-time-1e08e0a59256",
    "title": "Family Time",
    "organization": "Toronto Public Library",
    "description": "Join us for stories, songs, rhymes and activities in this program for children ages 5 and under and their parents or caregivers. Family Time runs from 10:00 to 10:30 . Children, parents and caregivers are invited to Stay and Play from 10:30 to 11:00 .",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T10:00:00-04:00",
    "startDate": "2026-11-18T10:00:00-04:00",
    "endDate": "2026-11-18T10:30:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6abfe43a9dbc2b002c8bcccd",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-storytelling-works-by-a-2caa95755ce5",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ac7c2bfa85a2c00337e0e97",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-tpl-events-stem-earlyon-together-time-38e2249ba398",
    "title": "EarlyON Together Time",
    "organization": "Toronto Public Library",
    "description": "This is a program for parents and caregivers with children from birth - 6 years. Families have the opportunity to socialize while children develop new skills in an early learning environment. This program is offered in partnership with the Malvern Family Resource Centre (MFRC) . This is a drop-in program. No registration required.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T09:30:00-04:00",
    "startDate": "2026-11-18T09:30:00-04:00",
    "endDate": "2026-11-18T11:30:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6adf51d39dbc2b002c910d86",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-tpl-events-stem-toddler-time-f1ace8fe5f87",
    "title": "Toddler Time",
    "organization": "Toronto Public Library",
    "description": "Join us for stories, songs, and rhymes for children, 19 months to 3 years, with their parents or caregivers. Toddler Time runs from 10 to 10:30 am. Children, parents and caregivers are invited to Stay and Play , from 10:30 to 11 am. Stay and Play provides a welcoming space for children to play and learn while caregivers connect with each other and library staff. Drop-in. No registration required. NOTE: No program on Wednesday September 30 for National Day of Truth and Reconciliation.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T10:00:00-04:00",
    "startDate": "2026-11-18T10:00:00-04:00",
    "endDate": "2026-11-18T11:00:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ae91f5ef9d28050ccb0bd0d",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-make-a-will-with-the-ontario-bar-associati-23bc328d8cd8",
    "title": "Make A Will with the Ontario Bar Association",
    "organization": "Toronto Public Library",
    "description": "November is Make a Will Month and TPL is delighted to host the Ontario Bar Association. Learn about the importance of having a will and powers of attorney for you and your family. A member of the Ontario Bar Association who practices Trusts and Estates Law will speak about: the elements of a will and what happens if you don’t have one what are powers of attorney and why they are important special considerations to keep in mind when preparing your estate and care plans. Note, this program is for general information only, not for drafting individual wills. Register online or call 416-396-3975. Drop-ins welcome too. ------- Information Collection Notice: The personal information on this form is collected by the Toronto Public Library under the Public Libraries Act, sections 20(a), 20(c), and ",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T10:00:00-04:00",
    "startDate": "2026-11-18T10:00:00-04:00",
    "endDate": "2026-11-18T11:00:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ae9ebfe9b955d531f7caf6c",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-dancing-flowers-c9470760e3f7",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ada8abcf4d1423e2ce42c42",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-saving-the-moment-by-jo-34ebaf04e9cc",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6a970e821c197d11325c69df",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-works-by-camila-mia-1874ed363526",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6a7e3aae8c7b29006f162583",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-celebrate-60-years-of-mimico-centennial-li-43f61eb3a63b",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ad104e4377296003a4c31ff",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-my-red-is-not-your-red--2da382166a10",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ad142a3295d793e2d178664",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-40th-anniversary-of-franklin-in-the-dark-6cd20d3d8ba0",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6a3bfbeec52cdc3600ec8366",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-baby-time-bf55c0d49ffe",
    "title": "Baby Time",
    "organization": "Toronto Public Library",
    "description": "Join us for bouncing rhymes, songs and stories in this program for babies, birth to 18 months, and their parents or caregivers. Drop-in. No registration required.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T10:00:00-04:00",
    "startDate": "2026-11-18T10:00:00-04:00",
    "endDate": "2026-11-18T10:30:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ad8efef11bbf300684cd1b6",
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
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-markham-events-stem-meditation-de18ef5ffa77",
    "title": "Meditation",
    "organization": "Markham Public Library",
    "description": "Find a moment of calm from the comfort of home in this virtual guided meditation , where you’ll practise mindfulness and breathing techniques to encourage relaxation, focus, and greater awareness. Led by a graduate of the Markham Yoga Teacher Training program , this beginner-friendly session welcomes all ages and can be enjoyed from a mat, chair, or couch in a comfortable upright position. You will: Practise guided meditation and mindful breathing techniques to encourage relaxation and present-moment awareness. Explore simple mindfulness practices that can support focus and help you create moments of calm in your day. Format: Virtual instructor-led guided meditation suitable for beginners and all ages.",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T20:15:00-04:00",
    "startDate": "2026-11-18T20:15:00-04:00",
    "endDate": "2026-11-18T20:45:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a61080a7b79214226aa68cf",
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
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-writers-meet-up-6171ec823d88",
    "title": "Writers' Meet-up",
    "organization": "Markham Public Library",
    "description": "Join us for our monthly writers' meetup, whether you are just starting to write or an established writer, all are welcome. We will be sharing our stories, writing stories with prompts, editing pieces and providing valuable feedback in peer group. Registrants will receive a confirmation email upon registration, 24 hours prior to the program, registrants will receive an email with the event link. If you do not receive the Zoom link prior the program: Please note: The email will be from “Markham Public Library” It may be in your junk/spam folder. If you still cannot find the email, please contact us prior to the program start time so we can send you the link again @ mplcommunitylibrarians@markham.library.on.ca **",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T19:00:00-04:00",
    "startDate": "2026-11-18T19:00:00-04:00",
    "endDate": "2026-11-18T20:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6adb60a596ec3a003adc67a9",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-mpl-homepage-93c878d996a7",
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
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/68fbdc8bd272945e0068ed69",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-markham-events-stem-triple-p-positive-parenting-program-for-pa-65afc439ad83",
    "title": "陪伴孩子的焦慮成長 Triple P: Positive Parenting Program - For Parents Whose Children Aged 6-14 Are Experiencing Anxiety (Mandarin)",
    "organization": "Markham Public Library",
    "description": "Join our 8-session Triple P: Positive Parenting Program for parents whose children aged 6-14 are experiencing anxiety. This program is led by Family Services York Region. What parents will learn: Grounded in Cognitive Behavioral Therapy (CBT), this program provides a clinically-proven roadmap to manage anxiety for both parents and children. This program equips families with an \"Emotional Resilience Toolbox.\" Learn to face fears incrementally, turning overwhelming anxiety into manageable milestones and a higher quality of life. ➢ 基於認知行為療法 (CBT)，這是一套科學驗證能有效應對焦慮的心理學方法，專為那些正為孩子（或自己）的焦慮感到心累的家長所設計的。 ➢ 除了學習辨識孩子的焦慮訊號（如過度擔憂、社交恐懼、厭學），父母還可以學習如何處理自身的育兒壓力，如何回應孩子的情緒和負面想法，避免焦慮在家庭成員間傳遞。 ➢ 協助家長與孩子共同建立「情緒管理工具箱」，及逐步面對恐懼至克服困難的方法。 More information: (Triple P) Positive Parenting Program is a world-leading, evid",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en",
      "zh",
      "yue"
    ],
    "deadline": "2026-11-18T18:30:00-04:00",
    "startDate": "2026-11-18T18:30:00-04:00",
    "endDate": "2026-11-18T20:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a6108979943bdf31ea0c59e",
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
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-chair-yoga-32d16ac94d5e",
    "title": "Chair Yoga",
    "organization": "Markham Public Library",
    "description": "Take a gentle approach to movement in this 30-minute Chair Yoga class , where you’ll explore meditation, breathing techniques, and seated stretches for your arms, legs, shoulders, and back. Designed with older adults in mind but open to all ages, this accessible class will help you build body awareness and practise mindful movement at a comfortable pace. You will: Practise chair yoga stretches and breathing techniques that encourage gentle movement, flexibility, and body awareness. Explore meditation and mindful breathing to cultivate greater awareness and presence in your body and mind. Format: 30-minute instructor-led Chair Yoga class featuring meditation, breathing exercises, and gentle seated stretches. This program is facilitated through Zoom. Registrants will receive an email with th",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T10:00:00-04:00",
    "startDate": "2026-11-18T10:00:00-04:00",
    "endDate": "2026-11-18T10:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/68fbde97d272945e0068ee95",
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
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-managing-finances-after-loss-or-change-9cc7fe523a93",
    "title": "Managing Finances After Loss or Change",
    "organization": "Markham Public Library",
    "description": "Change is hard, you are not alone. This program is designed to help individuals navigate the financial realities that follow from a change in the family or the loss of a partner. It blends emotional grounding with practical guidance so participants can honor their grief while learning to manage essential money matters with growing confidence. The program covers assembling a trusted team, organizing key documents, handling household finances, and understanding larger decisions such as investments, estate planning, and taxes. Learning Outcomes: - Participants gain the clarity to assess their financial needs - About to create a sustainable plan, and prepare their own estate with intention. - Empowers participants to move forward feeling informed, capable, and far less alone. Presenter's bio: ",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T19:00:00-04:00",
    "startDate": "2026-11-18T19:00:00-04:00",
    "endDate": "2026-11-18T20:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6aa0a00ee1fb8f13578c53dd",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-earlyon-drop-in-65c4d88cf239",
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
    "deadline": "2026-11-18T10:00:00-04:00",
    "startDate": "2026-11-18T10:00:00-04:00",
    "endDate": "2026-11-18T12:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6903a6fd0562322f002dd92c",
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
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-storytime-1069cd7bea66",
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
    "deadline": "2026-11-18T11:00:00-04:00",
    "startDate": "2026-11-18T11:00:00-04:00",
    "endDate": "2026-11-18T11:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a3065b41e67cd9cb33a167c",
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
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-book-club-discussion-the-names-506e533f3bed",
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
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a7b27c30d65ac360045efe8",
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
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-newcomer-youth-love-of-language-club-c4fa7adb0c5e",
    "title": "Newcomer Youth Love of Language Club",
    "organization": "Markham Public Library",
    "description": "Calling all newcomer youth between the ages of 6 to 12! Join the Love of Language Club to have fun while practicing your English communication, writing, and reading skills. In this eight-week program, newcomer youth will improve their English vocabulary through engaging and fun activities, as well as gain confidence and foster friendships with their peers. Each session will explore a new topic, with activities including discussion, games and reading books! This program is provided in partnership with Youth Assisting Youth . The program will take place in person at the Aaniin Library Program Room. Priority will be given to newcomer youth. We look forward to seeing you there!",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T16:30:00-04:00",
    "startDate": "2026-11-18T16:30:00-04:00",
    "endDate": "2026-11-18T17:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/69948bfc81b67dfe32a6e9ac",
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
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-seniors-sewing-social-learn-to-sew-leg-war-7828dcf30293",
    "title": "Seniors Sewing Social - Learn to Sew Leg Warmers",
    "organization": "Markham Public Library",
    "description": "Join us for the Learn to Sew - Seniors Sewing Social, where participants will learn beginner sewing techniques and exercise their creativity by sewing a simple items. This session will focus on creating a leg warmers using recycled fabric. Participants are encouraged to bring their own recycled fabrics , which helps reduce textile waste and sustainability. A very limited number of spare fabric may be available for participants who are unable to bring their own. However, bringing your own is highly recommended. Participants will learn basic sewing techniques they can use at home with their clothing, furniture, or bags. As well, participants will practice their fine motor skills by turning discarded textiles into sustainable everyday items or gifts. Lastly, we hope to \"weave\" connections wit",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en",
      "ur",
      "hi",
      "gu"
    ],
    "deadline": "2026-11-18T18:00:00-04:00",
    "startDate": "2026-11-18T18:00:00-04:00",
    "endDate": "2026-11-18T20:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a480882ed35742f000031ab",
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
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-book-club-discussion-is-a-river-alive-fd20213c2b59",
    "title": "Book Club Discussion - Is A River Alive?",
    "organization": "Markham Public Library",
    "description": "Want to connect with others over the love of reading? Join our book club to discuss Robert Macfarlane's Is a River Alive? This title should be on shelves and ready to borrow approximately 5 weeks prior to the discussion date. Check with a staff member if you have questions on how to access a copy. Book Description \"From the celebrated nature writer, observer and advocate Robert Macfarlane, a brilliant, immersive and paradigm-shifting book that says an emphatic yes to the question it asks. Robert Macfarlane writes, \"At the heart of Is A River Alive? is a single, powerful idea: that rivers, forests, glaciers and mountains are living beings, and that as such they have rights that should be recognized both in imagination and in law. The river has the right to flow unimpeded to the sea; the old",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T14:00:00-04:00",
    "startDate": "2026-11-18T14:00:00-04:00",
    "endDate": "2026-11-18T15:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6aa707fe65abe8002a78ed62",
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
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-service-canada-presents-saving-for-your-ch-0b464a0c3aff",
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
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/68fbde1fe59a13000d3e1d1f",
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
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
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
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-yoga-for-older-adults-6b8eee947569",
    "title": "Yoga for Older Adults",
    "organization": "Markham Public Library",
    "description": "Move, breathe, and reconnect in this 30-minute Yoga for Older Adults class , where you’ll explore gentle stretches, meditation, and breathing techniques designed to encourage mindful movement and body awareness. Geared toward older adults but open to all ages , this welcoming class will guide you through gentle movements for the arms, legs, shoulders, and back at a comfortable pace. You will: Practise gentle yoga stretches and breathing techniques to explore flexibility, movement, and body awareness. Learn meditation and mindful breathing practices that encourage awareness and presence in your body and mind. Format: 30-minute instructor-led yoga class featuring meditation, breathing exercises, and gentle stretching. This program is facilitated through Zoom. Registrants will receive an emai",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T10:30:00-04:00",
    "startDate": "2026-11-18T10:30:00-04:00",
    "endDate": "2026-11-18T11:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6903a9359b87934100935126",
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
    "sourceName": "Markham Public Library events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-vaughan-library-programs-real-talk-bd260caae334",
    "title": "Real Talk",
    "organization": "Vaughan Public Libraries",
    "description": "Real Talk listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3739",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-vaughan-library-programs-hebrew-storytime-d138c66aec8b",
    "title": "שעת סיפור בעברית / Hebrew Storytime",
    "organization": "Vaughan Public Libraries",
    "description": "שעת סיפור בעברית / Hebrew Storytime listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3004",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-vaughan-library-programs-d-d-club-516802a29c38",
    "title": "D&D Club",
    "organization": "Vaughan Public Libraries",
    "description": "D&D Club listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2528",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-vaughan-library-programs-minecrafters-club-753cd2572320",
    "title": "Minecrafters Club",
    "organization": "Vaughan Public Libraries",
    "description": "Minecrafters Club listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2214",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-vaughan-library-programs-cooking-in-french-194050d893a6",
    "title": "Cooking in French",
    "organization": "Vaughan Public Libraries",
    "description": "Cooking in French listed by Vaughan Public Libraries programs.",
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
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3960",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-vaughan-library-programs-mystery-book-club-4dd10f39af94",
    "title": "Mystery Book Club",
    "organization": "Vaughan Public Libraries",
    "description": "Mystery Book Club listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3734",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-vaughan-library-programs-steam-club-2f89f6e0e686",
    "title": "STEAM Club",
    "organization": "Vaughan Public Libraries",
    "description": "STEAM Club listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2278",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "sourceName": "Vaughan Public Libraries programs",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "changeKind": "new"
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "changeKind": "new"
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "changeKind": "new"
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "changeKind": "new"
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "changeKind": "new"
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-aurora-library-stem-korean-seniors-meetup-55-b12a3511c3a2",
    "title": "Korean Seniors Meetup (55+)",
    "organization": "Aurora Public Library",
    "description": "Join us for a warm and welcoming weekly meetup designed to support Korean seniors. Each session features engaging activities such as art workshops, music, language lessons, dancing, and the sharing of Korean cuisine. Drop-in! No registration required.",
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
    "deadline": "2026-11-18T10:00:00-04:00",
    "startDate": "2026-11-18T10:00:00-04:00",
    "endDate": "2026-11-18T12:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a99d1e657c264087ad60b42",
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-stitch-happens-crochet-knit-group-f1c2cf1bc64d",
    "title": "Stitch Happens (Crochet & Knit Group)",
    "organization": "Aurora Public Library",
    "description": "Wednesdays | 7:00-8:30pm (Drop-in) Join us every Wednesday evening to work on your yarn-based projects! All skill levels are welcome; supplies are available for all participants, but feel free to bring your own as well!",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T19:00:00-04:00",
    "startDate": "2026-11-18T19:00:00-04:00",
    "endDate": "2026-11-18T20:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6af1e13496ec3a003ae05484",
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-crass-stitch-club-9217b8551be6",
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
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/69f8a684caf934360059a3fa",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-time-for-toddlers-2519784ac602",
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
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a1996c4703c3363002ac4fe",
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-korean-storytime-b60ae0ffa5f1",
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
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a563c28aa34e23600ef0160",
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-financial-empowerment-for-women-e75c81a8e7b6",
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
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/69bd932881b67dfe32adef8d",
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-fall-in-love-with-ya-reading-challenge-b012a249b835",
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
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a8774abd4b10d003007ec3a",
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-making-changes-reaction-to-response-3d52179ad29f",
    "title": "Making Changes: Reaction to Response",
    "organization": "Aurora Public Library",
    "description": "Life is a series of peaks and valleys. Sometimes you’re up, sometimes you’re down. But it’s the difficult times where we need a little more support and guidance. It is how you respond in your moments of defeat that really defines the type of person you are. When you can improve your ability to navigate the difficult times, you not only live a happier life, but you also grow as person. For women 18+ living in York Region. In partnership with Women’s Centre of York Region. Register at wcyr.ca/registration",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T10:00:00-04:00",
    "startDate": "2026-11-18T10:00:00-04:00",
    "endDate": "2026-11-18T12:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a986c1260ccaf01c022e1b5",
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-apl-escape-room-de8c4f2ebd30",
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
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/69862e3f377f55c8ec183df7",
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-community-latin-dance-341fea8d7f76",
    "title": "Community Latin Dance",
    "organization": "Aurora Public Library",
    "description": "Join us for a 10-week progressive Latin dance class! Perfect for beginners who want to master the basics of Salsa, Merengue, and Bachata! This fun and dynamic class will help you stay fit, improve your health, and enhance communication skills—all while offering a great opportunity to meet new people. Led by Boris and Kate Rozenberg, a local couple with many years of dance experience, who are eager to share their knowledge and highlight the many benefits of dance! Important Considerations Registration is for the full 10 week period . Please do not register if you cannot commit to all 10 weeks. Registration is for one person. If you want to bring a partner, they will also have to register . Failure to attend the first session without notice will lead to your removal from the program. Wear li",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T18:30:00-04:00",
    "startDate": "2026-11-18T18:30:00-04:00",
    "endDate": "2026-11-18T20:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a563c6cfb418a28009ad685",
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-baby-storytime-e831dc3a5f8e",
    "title": "Baby Storytime",
    "organization": "Aurora Public Library",
    "description": "Join us for songs, stories, rhymes and more in this storytime just for babies!",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T10:30:00-04:00",
    "startDate": "2026-11-18T10:30:00-04:00",
    "endDate": "2026-11-18T11:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6aaac94da5dbde002aa50898",
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-the-good-food-workshop-c5677c10b507",
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
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a7cbff361e11c00517723cc",
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-entrepreneurship-startup-help-apex-program-0dee60042909",
    "title": "Entrepreneurship | Startup Help APEX Program",
    "organization": "Aurora Public Library",
    "description": "Entrepreneurial Incubation & Growth Accelerator Seminar and Workshop Series The Startup Help Apex P rogram is a dynamic, hands-on initiative designed to empower aspiring entrepreneurs with the knowledge, skills, and resources needed to build and scale successful businesses. This comprehensive seminar and workshop series combines expert-led sessions, interactive workshops, and personalized mentorship to provide a structured pathway for business success. A certificate of completion will be issued to participants who fulfill attendance of at least 80% of the program sessions . In partnership with Startup Help. Register at bit.ly/3OaP18C Topics: November 4: Marketing Your Business Introduces essential marketing strategies, including branding, digital marketing, social media, and customer engag",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T19:00:00-04:00",
    "startDate": "2026-11-18T19:00:00-04:00",
    "endDate": "2026-11-18T20:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6933515b94297d36009e7d73",
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "changeKind": "new"
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-song-and-dance-time-51a869905dd0",
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
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a98b7021c197d11325cdf56",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "high",
    "reviewReasons": [
      "Cost is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-apl-scrabble-club-f35be2c59ae7",
    "title": "APL Scrabble Club",
    "organization": "Aurora Public Library",
    "description": "Join other wordsmiths for a fun, friendly game of Scrabble. Drop-in, boards provided or bring your own.",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-18T13:30:00-04:00",
    "startDate": "2026-11-18T13:30:00-04:00",
    "endDate": "2026-11-18T16:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a0c8164278f7c2f008e1e48",
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
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-oshawa-library-stem-games-caf-for-autistic-neurodivergent-adul-edadafe12027",
    "title": "Games Café for Autistic & Neurodivergent Adults Games Café for Autistic & Neurodivergent Adults, part of a series",
    "organization": "Oshawa Public Libraries",
    "description": "Games Café for Autistic & Neurodivergent Adults Games Café for Autistic & Neurodivergent Adults, part of a series from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68c8b8f4e5db3d00c4d26c",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "changeKind": "new"
  },
  {
    "id": "discovered-oshawa-library-stem-kinder-garden-d4175016ffab",
    "title": "Kinder-Garden",
    "organization": "Oshawa Public Libraries",
    "description": "Kinder-Garden from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68e0600e562e28009d0676",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oshawa-library-stem-steam-after-school-f7536e8f29f6",
    "title": "STEAM After School",
    "organization": "Oshawa Public Libraries",
    "description": "STEAM After School from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68e515f4e5db3d00c4db7d",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "firstSeen": "2026-11-17",
    "lastChanged": "2026-11-17",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oshawa-library-stem-family-maker-magic-87128b4828d0",
    "title": "Family Maker Magic",
    "organization": "Oshawa Public Libraries",
    "description": "Family Maker Magic from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Makerspace & Fabrication",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68dfb24523092f003324ce",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "firstSeen": "2026-11-18",
    "lastChanged": "2026-11-18",
    "changeKind": "new"
  },
  {
    "id": "discovered-oshawa-library-stem-tween-scene-a97c27899d63",
    "title": "Tween Scene",
    "organization": "Oshawa Public Libraries",
    "description": "Tween Scene from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68d71b4523092f003320fd",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-clarington-library-programs-news-and-press-releases-stay-updated-with--3e7082056896",
    "title": "News and Press Releases Stay updated with the latest news, events, and announcements through our informative press releases.",
    "organization": "Clarington Library, Museums & Archives",
    "description": "News and Press Releases Stay updated with the latest news, events, and announcements through our informative press releases. listed by Clarington Library programs.",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-clarington-library-programs-program-calendar-explore-our-dynamic-progr-3cf07599336d",
    "title": "Program Calendar Explore our dynamic program calendar, filled with a wide range of events and activities for all ages and interests.",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Program Calendar Explore our dynamic program calendar, filled with a wide range of events and activities for all ages and interests. listed by Clarington Library programs.",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-clarington-library-programs-battle-of-the-books-join-the-literary-comp-7639ffd0c4c1",
    "title": "Battle of the Books Join the literary competition in our exciting Battle of the Books, where teams test their knowledge and celebrate the joy of reading.",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Battle of the Books Join the literary competition in our exciting Battle of the Books, where teams test their knowledge and celebrate the joy of reading. listed by Clarington Library programs.",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-clarington-library-programs-good-neighbours-if-you-or-someone-you-know-2681c394c186",
    "title": "Good Neighbours If you or someone you know if physically unable to visit the Library, the Good Neighbours program can help!",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Good Neighbours If you or someone you know if physically unable to visit the Library, the Good Neighbours program can help! listed by Clarington Library programs.",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-clarington-library-programs-newsletters-subscribe-to-our-newsletters-f-0a83033fdd35",
    "title": "Newsletters Subscribe to our newsletters for a regular dose of highlights, upcoming events, and literary inspiration.",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Newsletters Subscribe to our newsletters for a regular dose of highlights, upcoming events, and literary inspiration. listed by Clarington Library programs.",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-clarington-library-programs-room-bookings-reserve-the-ideal-space-for--1bdb4af719d5",
    "title": "Room Bookings Reserve the ideal space for your needs with our room booking system, making event planning a breeze.",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Room Bookings Reserve the ideal space for your needs with our room booking system, making event planning a breeze. listed by Clarington Library programs.",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-clarington-library-programs-curious-communities-discount-program-0685c8dc984c",
    "title": "Curious Communities Discount Program",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Curious Communities Discount Program listed by Clarington Library programs.",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-clarington-library-programs-tours-and-group-visits-46d7e8c9e41b",
    "title": "Tours and Group Visits",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Tours and Group Visits listed by Clarington Library programs.",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "id": "discovered-oakville-library-programs-battle-of-the-books-f0d40007ec74",
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
    "sourceUrl": "https://opl.ca/Programs-and-Events/Battle-of-the-Books/Battle-of-the-Books",
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
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
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
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
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
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
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
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
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
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
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
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
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
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
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
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
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
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
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
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
    "lastChecked": "2026-11-17",
    "lastSeen": "2026-11-17",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
    "lastChecked": "2026-11-18",
    "lastSeen": "2026-11-18",
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
  }
] satisfies DiscoveredOpportunity[];
