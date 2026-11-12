import type { DiscoveredOpportunity } from "./discovery";

export const generatedDiscoverySummary = {
  "mode": "deterministic",
  "sourcesChecked": 34,
  "candidatesFound": 395,
  "newCandidates": 182,
  "duplicatesSkipped": 198,
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
    "generatedAt": "2026-11-12T07:16:09.849Z",
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
        "candidates": 13,
        "accepted": 7,
        "retained": 1
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
        "accepted": 18,
        "retained": 0
      },
      {
        "sourceId": "markham-events-volunteer",
        "status": "ok",
        "candidates": 21,
        "accepted": 18,
        "retained": 0
      },
      {
        "sourceId": "vaughan-library-programs",
        "status": "ok",
        "candidates": 72,
        "accepted": 71,
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
        "candidates": 17,
        "accepted": 16,
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
        "candidates": 24,
        "accepted": 22,
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
        "accepted": 3,
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
    "id": "discovered-autism-ontario-index-central-east-richmond-hill-cfbfc47268f5",
    "title": "Central East – Richmond Hill –…",
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
    "deadline": "2026-11-25",
    "startDate": "2026-11-25",
    "sourceUrl": "https://www.autismontario.com/civicrm/event/info?id=13307",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-tpl-events-stem-needleworx-d5d1bbeeb39e",
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
    "deadline": "2026-11-12T10:00:00-04:00",
    "startDate": "2026-11-12T10:00:00-04:00",
    "endDate": "2026-11-12T11:30:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6a89c44b29a7dd0d6745c19b",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-dancing-flowers-58f80d51481c",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ae89bf09d27a00045550e59",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-11",
    "lastChanged": "2026-11-11",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-tpl-events-stem-maison-des-b-b-s-22a8495823b7",
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
    "deadline": "2026-11-12T10:00:00-04:00",
    "startDate": "2026-11-12T10:00:00-04:00",
    "endDate": "2026-11-12T11:30:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6abfe43a9dbc2b002c8bcccd",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-baby-time-66b536733356",
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
    "deadline": "2026-11-12T10:00:00-04:00",
    "startDate": "2026-11-12T10:00:00-04:00",
    "endDate": "2026-11-12T11:00:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ac7c2bfa85a2c00337e0e97",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-saving-the-moment-by-jo-e6f8b39fd2c2",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6adf51d39dbc2b002c910d86",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-10",
    "lastChanged": "2026-11-10",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-tpl-events-stem-sanko-speaks-b05d2d757b9d",
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
    "deadline": "2026-11-12T10:00:00-04:00",
    "startDate": "2026-11-12T10:00:00-04:00",
    "endDate": "2026-11-12T14:00:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ae91f5ef9d28050ccb0bd0d",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-nocturnal-animals-scavenger-hunt-cd96d5da7eb4",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ae8f7bbad4027659155ee38",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-works-by-camila-mia-2329db97bf40",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/696a8e2c6724c63d00ec90d7",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-storytelling-works-by-a-04913cbe4d2a",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6a7e3916452bb101b5750a23",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-branch-art-exhibit-my-red-is-not-your-red--963007d25fc3",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6aa9fcd23dd190003e724a07",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-celebrate-60-years-of-mimico-centennial-li-21dedec46606",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6aad8ae0129d8e0031f35893",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-knit-wits-knitting-and-crochet-club-28cd655128c7",
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
    "deadline": "2026-11-12T09:30:00-04:00",
    "startDate": "2026-11-12T09:30:00-04:00",
    "endDate": "2026-11-12T11:30:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ab554d5c9d1b8187a993478",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-video-editing-with-da-vinci-resolve-parts--1bd6a80d3ef0",
    "title": "Video Editing with Da Vinci Resolve Parts I and II",
    "organization": "Toronto Public Library",
    "description": "This two part introductory series will cover the layout, tools and workflow used for video editing in DaVinci Resolve. Part I, which will take place on November 10th , will cover basic video editing techniques such as inserting and trimming media, transitions, titles, adding audio, and using flags and markers. Part II will be held on November 17th , where participants will become familiar with some of the more advanced tools in DaVinci’s Editing page such as key framing transform effects, cropping, adjusting clip speed, normalizing audio, and simple compositing. Computers will be provided for this program. Information Collection Notice: The personal information on this form is collected by the Toronto Public Library under the Public Libraries Act, sections 20(a), 20(c), and 20(d). The info",
    "city": "Toronto",
    "region": "Toronto",
    "category": "STEM",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-10T18:30:00-04:00",
    "startDate": "2026-11-10T18:30:00-04:00",
    "endDate": "2026-11-17T20:00:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6aa1a68d65abe8002a77dd11",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
    "status": "needs_review",
    "tags": [
      "stem"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "Cost is unknown; check the official listing.",
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "Toronto Public Library events",
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-tpl-events-stem-human-connection-101-workshop-for-seniors-0c64beae0006",
    "title": "Human Connection 101 Workshop for Seniors",
    "organization": "Toronto Public Library",
    "description": "Human connection has a profound impact on our health and happiness, especially in our increasingly disconnected world. Join GenWell in an interactive workshop to learn practical ways to enhance social health, understand the adverse effects of loneliness, and discover the benefits of building more meaningful connections. Receive a free social health workbook, spend time with other participants after the workshop, and enjoy some light refreshments* provided. About GenWell: Founded in 2016, GenWell is a registered charity whose mission is to make the world a happier and healthier place by educating, empowering, and catalyzing forty million Canadians about the importance of their social health. *Food allergy notice: Snacks and refreshments are provided for all participants. Ingredient lists wi",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-12T09:30:00-04:00",
    "startDate": "2026-11-12T09:30:00-04:00",
    "endDate": "2026-11-12T11:00:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6ae35682198b996a80a9527a",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-markham-events-stem-protalks-meet-the-experts-855d99adf216",
    "title": "ProTalks: Meet the Experts",
    "organization": "Markham Public Library",
    "description": "Join MPL and TCCSA for this 7-week series which gives newcomers the opportunity to meet and connect with local professionals from a variety of fields and sectors! Learning Outcomes: Participants will learn from professionals’ experiences and insights, including: Information on career pathways, required education or credentials and practical work experience. Professionals will also share their daily work routines and provide time for Q&A, allowing newcomers to ask questions about different careers. This program is designed for newcomers who want to explore various career options in Canada and expand their professional networks. Professions discussed will include: IT Professional, Social Worker, ECE, Teacher, Accountant, Administrative Assistant, Banker, Dental Hygienist, and Carpenter.",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-12T18:00:00-04:00",
    "startDate": "2026-11-12T18:00:00-04:00",
    "endDate": "2026-11-12T19:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6aa707fe65abe8002a78ed61",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-11",
    "lastChanged": "2026-11-11",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-markham-events-stem-finding-your-memoir-which-story-do-i-tell-62bdc8d46ce3",
    "title": "Finding Your Memoir: Which Story Do I Tell?",
    "organization": "Markham Public Library",
    "description": "This workshop will start with a brief review of the difference between memoir, biography and autobiography. We’ll discuss types of memoirs and where they are found on shelves in libraries and bookstores. The workshop will focus on key elements of memoir writing such as defining the point, theme, and time-frame. It will include how to engage the reader, and decide what to include and what to leave out. We will spend time on writing exercises during the workshop to elicit topics for personal memoir explorations, then dive deeper to focus on specific time frames or themes for development of each person’s memoir possibilities. As we are the protagonist in our own memoir, we will explore the arc of change the protagonist experienced. We will attempt to write an elevator pitch that encompasses t",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-12T19:00:00-04:00",
    "startDate": "2026-11-12T19:00:00-04:00",
    "endDate": "2026-11-12T21:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/68fbde1fe59a13000d3e1d1d",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-cornell-library-community-social-explore-m-c91cd8c2e984",
    "title": "Cornell Library Community Social: Explore More, Travel Less",
    "organization": "Markham Public Library",
    "description": "Come and join the Cornell Library Community Social! Connect with your community through engaging and interactive conversation - from sharing garden stories and exploring Markham's parks and trails, to swapping staycation ideas and rediscovering the joy of the Holidays. Each gathering offers a warm and welcoming space to share, learn and be inspired. Light snack will be provided. Putting Your Garden to Bed (Thursday, October 8) Share your favourite garden photos and helpful tips for fall gardening. Discover ideas on getting your garden ready for the winter. Explore More, Travel Less (Thursday, November 12) Explore the beauty of Markham's outdoor spaces! Discover staycation ideas and nearby day trip destinations that offer adventure, relaxation and everything in between. Making Spirits Brigh",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-12T10:30:00-04:00",
    "startDate": "2026-11-12T10:30:00-04:00",
    "endDate": "2026-11-12T11:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a6a17e5f4e5db3d00c511b4",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-11",
    "lastChanged": "2026-11-11",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-markham-events-stem-storytime-25fed67cd1ec",
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
    "deadline": "2026-11-12T10:30:00-04:00",
    "startDate": "2026-11-12T10:30:00-04:00",
    "endDate": "2026-11-12T11:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a7b2678cca66c2f00a9c4ed",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-11",
    "lastChanged": "2026-11-11",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-markham-events-stem-successful-interview-practices-and-job-fai-fe9c6715f757",
    "title": "Successful Interview Practices and Job Fair Prep",
    "organization": "Markham Public Library",
    "description": "Let's build confidences in any interviews! Hosted by RNC Employment Service, this session will teach you how to build your interviewing confidence, grasp how to answer common and challenging questions, and ultimately negotiate the job offer. Beat your competition at any job fair and interview! Learning Outcomes: - Learn how to build confidence in any interview sittings - Understand what employers might be looking for - Learn how to negotiate your job offers Presenter bio: Canadian owned and operated since 1990, RNC has been providing excellence in employment, vocational and rehabilitation services and programs for over 30 years. We take a customized approach that supports organizational and individual objectives. RNC nurtures an individualized customer centric and integrated approach to pr",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-12T11:00:00-04:00",
    "startDate": "2026-11-12T11:00:00-04:00",
    "endDate": "2026-11-12T12:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a849189bcc061078b99fb0a",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-11",
    "lastChanged": "2026-11-11",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-markham-events-stem-science-program-for-grades-4-6-c3241e86dd36",
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
    "deadline": "2026-11-12T18:00:00-04:00",
    "startDate": "2026-11-12T18:00:00-04:00",
    "endDate": "2026-11-12T19:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a4e9b3df69a18370052d248",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-english-conversation-circle-coffee-chat-ea4adb5fc574",
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
    "deadline": "2026-11-13T10:30:00-04:00",
    "startDate": "2026-11-13T10:30:00-04:00",
    "endDate": "2026-11-13T12:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6ad6513b11bbf300684c8eef",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-earlyon-drop-in-a0a569ca403b",
    "title": "EarlyON drop-in",
    "organization": "Markham Public Library",
    "description": "In partnership with Family Day Care Services, drop-in for welcoming, supportive and accessible EarlyOn program where children (birth to six years old) and their parents, grandparents, or caregivers can play and learn together. EarlyON Child and Family Centres (familydaycare.com)",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-13T09:30:00-04:00",
    "startDate": "2026-11-13T09:30:00-04:00",
    "endDate": "2026-11-13T11:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a738410e30fe48459672c57",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-o2o-orientation-to-ontario-two-day-informa-54ae09b95e5e",
    "title": "安大略省歡迎您（O2O）— 兩天新移民廣東話資訊講座 (Orientation to Ontario – Two-Day Information Session in Cantonese)",
    "organization": "Markham Public Library",
    "description": "初到安省？歡迎參加免費的兩天廣東話資訊講座，了解在安省生活及安居所需的實用資訊。經驗豐富的專業講師將為您提供指導、解答疑問，並介紹本地社區資源及服務。 內容包括 ： 醫療服務及尋找家庭醫生 報稅及政府福利 子女教育及成人英語學習 租屋及置業資訊 社區資源及新移民服務 其他在安省生活的重要資訊 歡迎所有 18 歲以上人士參加，費用全免 ！ New to Ontario? Join this free two-day Cantonese information session to learn practical information about living and settling in Ontario. Experienced Settlement Workers will provide guidance, answer your questions, and connect you with helpful community resources. Topics include: Healthcare and finding a family doctor Government benefits & Taxation Education and English-language learning Renting and buying a home Community resources and newcomer services Other important information about living in Ontario Open to adults aged 18+. Everyone is welcome — join us for free! This program is facilitated in partnership with CICS -",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en",
      "yue"
    ],
    "deadline": "2026-11-12T10:30:00-04:00",
    "startDate": "2026-11-12T10:30:00-04:00",
    "endDate": "2026-11-13T13:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/68fbdf2de59a13000d3e1def",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-baby-books-80bdd5015165",
    "title": "Baby & Books",
    "organization": "Markham Public Library",
    "description": "Enjoy early literacy fun that focuses on sharing stories, rhymes, lap play, and songs with your baby. Please bring a blanket or mat for your baby. We will provide simple sensory toys for you to explore with your child, but feel free to bring your own! Drop-in program.",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-13T10:30:00-04:00",
    "startDate": "2026-11-13T10:30:00-04:00",
    "endDate": "2026-11-13T11:00:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a7b227dc7e02e3d006f6e92",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-alzheimers-society-york-region-active-livi-c648cfe7033d",
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
    "deadline": "2026-11-13T10:30:00-04:00",
    "startDate": "2026-11-13T10:30:00-04:00",
    "endDate": "2026-11-13T11:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a7c8de69d8416003f693f0a",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-a-garden-for-every-season-da1fc93da834",
    "title": "A Garden for Every Season",
    "organization": "Markham Public Library",
    "description": "Discover how to create a garden that offers beauty, colour, texture, and interest throughout the entire year. Learn practical design principles, plant selections, and maintenance tips that keep your landscape attractive from spring blooms to winter silhouettes.",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-12T18:30:00-04:00",
    "startDate": "2026-11-12T18:30:00-04:00",
    "endDate": "2026-11-12T19:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6abad20f96ec3a003ad6d5bd",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-board-game-meetup-ec8afd980d51",
    "title": "Board Game Meetup",
    "organization": "Markham Public Library",
    "description": "Embrace your playful side at our casual board game meetup. Come and meet new people and play some board games. We have a wide collection of classics and more intermediate games for all types of players. If reading rulebooks isn't your thing, you're in luck! We will have an expert gamer from WoodForSheep Hobbies Ltd. onsite to recommend games, provide instructions and join in where necessary. This is a drop-in program and you can come and go as you please between 5:30-8:30 PM! Registration is not required but helpful for us to understand space requirements. Find a list of board games here . **Note: program is not taking place on Thursday November 19th",
    "city": "Markham",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-12T17:30:00-04:00",
    "startDate": "2026-11-12T17:30:00-04:00",
    "endDate": "2026-11-12T20:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/68fbdc50e59a13000d3e1cad",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-markham-events-stem-mpl-homepage-5cd6c839f91b",
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
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/69274b3f44d0e96d007b8764",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-vaughan-library-programs-paws-4-stories-5964b9ac367f",
    "title": "Paws 4 Stories",
    "organization": "Vaughan Public Libraries",
    "description": "Paws 4 Stories listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/1853",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-vaughan-library-programs-code-a-traffic-light-with-arduino-30ef538328b0",
    "title": "Code a Traffic Light with Arduino!",
    "organization": "Vaughan Public Libraries",
    "description": "Code a Traffic Light with Arduino! listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Coding & Robotics",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3917",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
    "status": "needs_review",
    "tags": [
      "coding & robotics"
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-vaughan-library-programs-home-energy-saving-workshop-140fed0019fe",
    "title": "Home Energy Saving Workshop",
    "organization": "Vaughan Public Libraries",
    "description": "Home Energy Saving Workshop listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/4094",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-vaughan-library-programs-pok-mon-league-529eb61f9e77",
    "title": "Pokémon League",
    "organization": "Vaughan Public Libraries",
    "description": "Pokémon League listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2279",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-vaughan-library-programs-anguish-of-liberation-as-reflected-in-art--e50d35272f9e",
    "title": "Anguish of Liberation as Reflected in Art Exhibit",
    "organization": "Vaughan Public Libraries",
    "description": "Anguish of Liberation as Reflected in Art Exhibit listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/4075",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-vaughan-library-programs-special-events-e7b3506893da",
    "title": "Special Events",
    "organization": "Vaughan Public Libraries",
    "description": "Special Events listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/category/36",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-vaughan-library-programs-cercle-de-discussion-french-meetup-for-adu-afa5268c10d5",
    "title": "Cercle de discussion / French Meetup for Adults",
    "organization": "Vaughan Public Libraries",
    "description": "Cercle de discussion / French Meetup for Adults listed by Vaughan Public Libraries programs.",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-vaughan-library-programs-babysitting-course-with-heart2heart-1c8645fd2dff",
    "title": "Babysitting Course with Heart2Heart",
    "organization": "Vaughan Public Libraries",
    "description": "Babysitting Course with Heart2Heart listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3228",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-vaughan-library-programs-cardboard-fort-fun-0c84bcf048ad",
    "title": "Cardboard Fort Fun",
    "organization": "Vaughan Public Libraries",
    "description": "Cardboard Fort Fun listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2320",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-vaughan-library-programs-bhajan-jamming-session-5d2d46f5b04a",
    "title": "Bhajan Jamming Session",
    "organization": "Vaughan Public Libraries",
    "description": "Bhajan Jamming Session listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/4095",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-vaughan-library-programs-l-heure-du-conte-french-storytime-3f675bcb1aff",
    "title": "L'Heure du conte / French Storytime",
    "organization": "Vaughan Public Libraries",
    "description": "L'Heure du conte / French Storytime listed by Vaughan Public Libraries programs.",
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
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2321",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-vaughan-library-programs-mini-makers-de6d1d8c0abc",
    "title": "Mini Makers",
    "organization": "Vaughan Public Libraries",
    "description": "Mini Makers listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3981",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-11",
    "lastChanged": "2026-11-11",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-sensory-social-a234261cbb87",
    "title": "Sensory Social",
    "organization": "Vaughan Public Libraries",
    "description": "Sensory Social listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2425",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-11",
    "lastChanged": "2026-11-11",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-vaughan-library-programs-reading-buddies-en-fran-ais-a06ff0f90223",
    "title": "Reading Buddies… en français",
    "organization": "Vaughan Public Libraries",
    "description": "Reading Buddies… en français listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/4062",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-vaughan-library-programs-recording-studio-101-d7006252efcc",
    "title": "Recording Studio 101",
    "organization": "Vaughan Public Libraries",
    "description": "Recording Studio 101 listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2639",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-vaughan-library-programs-sci-fi-book-club-f743cbc70b19",
    "title": "Sci-Fi Book Club",
    "organization": "Vaughan Public Libraries",
    "description": "Sci-Fi Book Club listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3258",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-vaughan-library-programs-hora-de-cuentos-spanish-storytime-32f8d2b88ce5",
    "title": "Hora de cuentos / Spanish Storytime",
    "organization": "Vaughan Public Libraries",
    "description": "Hora de cuentos / Spanish Storytime listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en",
      "es"
    ],
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2630",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-aurora-library-stem-crass-stitch-club-16d934e8acfc",
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
    "deadline": "2026-11-12T19:00:00-04:00",
    "startDate": "2026-11-12T19:00:00-04:00",
    "endDate": "2026-11-12T20:45:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a99d1e657c264087ad60b42",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-cs-intro-3d-printing-02ace5354952",
    "title": "CS Intro 3D Printing",
    "organization": "Aurora Public Library",
    "description": "Learn the basics of 3D printing in this introductory course. We will show you to find and prepare a 3D model for printing. This program is for ages 13+ . This is just a reminder that if you are unable to attend any of our programs at APL , to please unregister , or else you will be marked as a \"no-show\", and your ability to register for programs in the future may be impacted, due to high waitlists. Unregistering when you are unable to make it to a program, allows there to be space for others who are on the waitlist to attend. We appreciate your consideration. APL Creative Studio",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-12T19:00:00-04:00",
    "startDate": "2026-11-12T19:00:00-04:00",
    "endDate": "2026-11-12T20:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6af1e13496ec3a003ae05484",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-11",
    "lastChanged": "2026-11-11",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-fall-in-love-with-ya-reading-challenge-2d5bc88864b9",
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
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a563c6cfb418a28009ad684",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-11",
    "lastChanged": "2026-11-11",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-when-children-are-no-longer-happy-052697c5774a",
    "title": "When Children Are No Longer Happy 第⼀场主题：「当孩子不再快乐」",
    "organization": "Aurora Public Library",
    "description": "This session will focus on children's and teenagers' emotional well-being, changes in mood and behaviour, parent-child communication, and how parents can better understand and support their children. Community members are warmly invited to join the conversation, share experiences, and learn from one another Co-organized by (in no particular order): National Federation of Literati and Artists of Canada (NFLA) Echoes Art and Personal Growth Centre 108 Health Promotion Association Huayun (Aurora) Multicultural Association Vaughan Multicultural Community Centre Shasha Health and Art Sharing Guest Speaker: Sophie Guo Sophie Guo is the Executive Vice President of the National Federation of Literati and Artists of Canada and founder of the Echoes Art and Personal Growth Centre. A mental health ed",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-14T10:00:00-04:00",
    "startDate": "2026-11-14T10:00:00-04:00",
    "endDate": "2026-11-14T13:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a8c60aab204780029951604",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-ready-for-kindergarten-f1c82fc6657a",
    "title": "Ready for Kindergarten",
    "organization": "Aurora Public Library",
    "description": "Ready for Kindergarten is a program for children ages 3–5 who are entering school for the first time. Through engaging storytimes, creative crafts, and fun hands-on activities, children will develop important skills such as fine motor coordination, listening, following instructions, and socializing with peers. Register on Eventbrite: https://www.eventbrite.ca/e/re...",
    "city": "Aurora",
    "region": "York",
    "ageMin": 3,
    "ageMax": 5,
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "explicit-ages",
    "language": [
      "en"
    ],
    "deadline": "2026-11-13T12:00:00-04:00",
    "startDate": "2026-11-13T12:00:00-04:00",
    "endDate": "2026-11-13T12:45:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a563cf5aa34e23600ef0183",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "high",
    "reviewReasons": [
      "Cost is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-friday-family-storytime-503fb851ebd4",
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
    "deadline": "2026-11-13T10:30:00-04:00",
    "startDate": "2026-11-13T10:30:00-04:00",
    "endDate": "2026-11-13T11:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a7cc4e1386764026a16c263",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-dogs-for-seniors-3732cd5138d4",
    "title": "Dogs for Seniors",
    "organization": "Aurora Public Library",
    "description": "Who doesn't like dogs? In partnership with St. John Ambulance Therapy Dog Program, join us for a meeting of the minds with our furriest friends. Specifically for seniors, this program brings therapy dogs to the library like never before! Drop in or register with hslater@aurorapl.ca for more information.",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-12T10:00:00-04:00",
    "startDate": "2026-11-12T10:00:00-04:00",
    "endDate": "2026-11-12T11:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6933515b94297d36009e7d71",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-11",
    "lastChanged": "2026-11-11",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-teen-advisory-group-tag-c717e9b3227b",
    "title": "Teen Advisory Group (TAG)",
    "organization": "Aurora Public Library",
    "description": "Local teens wanted to contribute fresh ideas for our YA programs and collections. Tell us what you think while earning volunteer hours. Meetings will be in-person. To register, email ya@aurorapl.ca",
    "city": "Aurora",
    "region": "York",
    "category": "Volunteer Hours",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-12T16:00:00-04:00",
    "startDate": "2026-11-12T16:00:00-04:00",
    "endDate": "2026-11-12T17:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a5e2c6f7b79214226a9ceeb",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-mandarin-community-mom-baby-club-4fb3e4715a18",
    "title": "Mandarin Community Mom & Baby Club",
    "organization": "Aurora Public Library",
    "description": "Join us for a free Mandarin activity for children ages 5–8 who understand and speak some Mandarin and are new to reading and writing Chinese! Activities include playful Chinese character learning and Mandarin picture book reading. Children will explore simple characters, develop an interest in reading, and connect with other children their age to build friendships and a Mandarin-speaking community. 免费趣味中文启蒙活动 欢迎5–8岁、有一定中文听说能力、读写零基础的孩子，和我们一起感受中文的乐趣！ 活动包括趣味识字和中文绘本阅读，让孩子在轻松愉快的互动中认识简单汉字、培养阅读兴趣，同时用普通话交流、认识同龄新朋友，建立自己的中文小伙伴圈子。 时间 Time: 9:30–10:30 a.m. 免费，需提前报名 | Free. Registration required.",
    "city": "Aurora",
    "region": "York",
    "ageMin": 5,
    "ageMax": 8,
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "explicit-ages",
    "language": [
      "en",
      "zh"
    ],
    "deadline": "2026-11-14T09:30:00-04:00",
    "startDate": "2026-11-14T09:30:00-04:00",
    "endDate": "2026-11-14T11:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a14882a46d5f64f7dccd060",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "high",
    "reviewReasons": [
      "Cost is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-french-classes-for-beginners-2aad8d38176b",
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
    "deadline": "2026-11-12T19:00:00-04:00",
    "startDate": "2026-11-12T19:00:00-04:00",
    "endDate": "2026-11-12T20:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a0c8164278f7c2f008e1e47",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-improving-your-listening-and-speaking-dbd9699f6471",
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
    "deadline": "2026-11-12T13:30:00-04:00",
    "startDate": "2026-11-12T13:30:00-04:00",
    "endDate": "2026-11-12T15:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a3d8efde5f29d2667fe4331",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-steam-for-homeschoolers-10c1e6189312",
    "title": "STEAM for Homeschoolers",
    "organization": "Aurora Public Library",
    "description": "Explore science, technology, engineering, art, and math in the company of other homeschoolers. For kids ages 6-12. Register on Eventbrite: https://www.eventbrite.ca/e/st...",
    "city": "Aurora",
    "region": "York",
    "ageMin": 6,
    "ageMax": 12,
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "explicit-ages",
    "language": [
      "en"
    ],
    "deadline": "2026-11-12T14:30:00-04:00",
    "startDate": "2026-11-12T14:30:00-04:00",
    "endDate": "2026-11-12T16:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a7e20a34027d701ebc42dad",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "technology",
      "science"
    ],
    "confidence": "high",
    "reviewReasons": [
      "Cost is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-11",
    "lastChanged": "2026-11-11",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-aurora-library-stem-mini-makes-diy-bookmark-edfbe5b67d50",
    "title": "Mini Makes: DIY Bookmark",
    "organization": "Aurora Public Library",
    "description": "Find out what your kids can create, with Mini Makes! (Children are encouraged to create Mini Makes within the Creative Studio without adult's help) *Please note, Mini Makes are not suitable for children under 5 years of age. *Mini Makes have a limited supply and will only be available while supplies last for the duration of the week.",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-09",
    "startDate": "2026-11-09",
    "endDate": "2026-11-30",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a68d3f2d23de82955c95c50",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-apl-s-stuffed-animal-hospital-05ade5c0e4bb",
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
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6995dbea8b29ea2800d0c96b",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-song-and-dance-time-79ec626c9a3d",
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
    "deadline": "2026-11-12T11:00:00-04:00",
    "startDate": "2026-11-12T11:00:00-04:00",
    "endDate": "2026-11-12T11:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6ad2844b29c3d60033306dff",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "high",
    "reviewReasons": [
      "Cost is unknown; check the official listing."
    ],
    "sourceName": "Aurora Public Library STEM events",
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-iranian-gathering-c02dfb13df63",
    "title": "Iranian Gathering",
    "organization": "Aurora Public Library",
    "description": "Join this workshop that celebrates Iranian culture and brings community members together. Meets every other Friday. No registration required.",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-13T10:00:00-04:00",
    "startDate": "2026-11-13T10:00:00-04:00",
    "endDate": "2026-11-13T13:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a5923bc82c03c5c17d87abb",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-time-for-toddlers-05f8aec71363",
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
    "deadline": "2026-11-12T10:00:00-04:00",
    "startDate": "2026-11-12T10:00:00-04:00",
    "endDate": "2026-11-12T10:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6a676d83a41369ab2c690ed3",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-saturday-family-storytime-7e20c1186d57",
    "title": "Saturday Family Storytime",
    "organization": "Aurora Public Library",
    "description": "Join us for Saturday Family Storytime, where we have stories, rhymes, songs, and lots of fun! Best for ages 5 and younger with a parent, but everyone is welcome.",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-14T10:30:00-04:00",
    "startDate": "2026-11-14T10:30:00-04:00",
    "endDate": "2026-11-14T11:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6af4d33515292a005cfbae25",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-aurora-library-stem-diy-baby-onesie-144a6b5b389e",
    "title": "DIY Baby: Onesie",
    "organization": "Aurora Public Library",
    "description": "Create a custom baby onesie for a little one! Design and transfer a personalized design onto the onesie. All required materials will be provided. Please note that spots will be prioritized for first-time attendees. adult program 18+",
    "city": "Aurora",
    "region": "York",
    "category": "Family Learning",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-12T11:30:00-04:00",
    "startDate": "2026-11-12T11:30:00-04:00",
    "endDate": "2026-11-12T13:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/v2/events/6ac521f2de300e00451897a5",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-oshawa-library-stem-crafty-teens-crafty-teens-part-of-a-series-33057cb25000",
    "title": "Crafty Teens Crafty Teens, part of a series",
    "organization": "Oshawa Public Libraries",
    "description": "Crafty Teens Crafty Teens, part of a series from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68ce9e4523092f00331f06",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-oshawa-library-stem-local-history-speaker-series-32bde0ab7b65",
    "title": "Local History Speaker Series",
    "organization": "Oshawa Public Libraries",
    "description": "Local History Speaker Series from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/v2/events/6a68c006e9de6536001ec4b9",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-oshawa-library-stem-beyond-the-book-beyond-the-book-part-of-a--650fab5e6493",
    "title": "Beyond the Book Beyond the Book, part of a series",
    "organization": "Oshawa Public Libraries",
    "description": "Beyond the Book Beyond the Book, part of a series from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68f1b9f4e5db3d00c4df96",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-oshawa-library-stem-neighbourhood-play-date-29912f9ef4e6",
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
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68df564523092f00332445",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-11",
    "lastChanged": "2026-11-11",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oshawa-library-stem-creation-station-1e330c7d4632",
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
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68d928f4e5db3d00c4d751",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-11",
    "lastChanged": "2026-11-11",
    "changeKind": "unchanged"
  },
  {
    "id": "discovered-oshawa-library-stem-meditation-group-b867e5372371",
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
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68bceef4e5db3d00c4cf18",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-oshawa-library-stem-french-steam-story-time-f2eb099cf3a2",
    "title": "French STEAM Story Time",
    "organization": "Oshawa Public Libraries",
    "description": "French STEAM Story Time from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en",
      "fr"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68f1640e562e28009d0afc",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
    "changeKind": "new"
  },
  {
    "id": "discovered-oshawa-library-stem-little-paws-4b680022140a",
    "title": "Little Paws",
    "organization": "Oshawa Public Libraries",
    "description": "Little Paws from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "category": "Science & Engineering",
    "cost": "Unknown",
    "costEvidence": "unknown",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a68f634f4e5db3d00c4e0b1",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "firstSeen": "2026-11-12",
    "lastChanged": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-oakville-library-programs-summer-reading-club-943c16c793f1",
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
    "sourceUrl": "https://opl.ca/Programs-and-Events/Reading-Challenges/Summer-Reading-Challenge-2",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-11",
    "lastSeen": "2026-11-11",
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
    "lastChecked": "2026-11-11",
    "lastSeen": "2026-11-11",
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
    "lastChecked": "2026-11-11",
    "lastSeen": "2026-11-11",
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
    "lastChecked": "2026-11-11",
    "lastSeen": "2026-11-11",
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
    "lastChecked": "2026-11-11",
    "lastSeen": "2026-11-11",
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
    "lastChecked": "2026-11-11",
    "lastSeen": "2026-11-11",
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
    "lastChecked": "2026-11-11",
    "lastSeen": "2026-11-11",
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
    "lastChecked": "2026-11-11",
    "lastSeen": "2026-11-11",
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
    "lastChecked": "2026-11-11",
    "lastSeen": "2026-11-11",
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
    "lastChecked": "2026-11-11",
    "lastSeen": "2026-11-11",
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
    "lastChecked": "2026-11-11",
    "lastSeen": "2026-11-11",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "id": "discovered-uoft-engineering-outreach-fall-campus-day-at-the-st-george-campus-2bba50c2dddd",
    "title": "Fall Campus Day at the St. George Campus",
    "organization": "University of Toronto Engineering Outreach",
    "description": "Fall Campus Day at the St. George Campus Saturday, November 14, 2026 10:00 AM – 4:00 PM University of Toronto – St. George Campus Fall Campus Day at U of T St. George is your best opportunity to explore our campus and see for yourself why U of T is a global leader in higher [&hellip;] Admission: Free.",
    "city": "Toronto",
    "region": "Toronto",
    "category": "Family Learning",
    "cost": "Free to join",
    "costEvidence": "source-stated-free",
    "eligibilityEvidence": "unknown",
    "language": [
      "en"
    ],
    "deadline": "2026-11-14T15:00:00.000Z",
    "startDate": "2026-11-14T15:00:00.000Z",
    "endDate": "2026-11-14T21:00:00.000Z",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/event/fall-campus-day-at-the-st-george-campus-2",
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
    "status": "needs_review",
    "tags": [
      "family learning"
    ],
    "confidence": "high",
    "reviewReasons": [
      "Numeric eligibility is unknown; check the official listing."
    ],
    "sourceName": "University of Toronto Engineering Outreach",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
    "lastChecked": "2026-11-12",
    "lastSeen": "2026-11-12",
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
