import type { DiscoveredOpportunity } from "./discovery";

export const generatedDiscoverySummary = {
  "mode": "deterministic",
  "sourcesChecked": 30,
  "candidatesFound": 230,
  "newCandidates": 5,
  "duplicatesSkipped": 97,
  "warnings": [
    "Could not check Credit Valley Conservation youth opportunities: 403 Forbidden.",
    "Could not check TRCA youth volunteer opportunities: fetch failed.",
    "Could not check Volunteer MBC youth opportunities: 403 Forbidden.",
    "Could not check Eventbrite free science and technology events: 405 Not Allowed.",
    "Could not check Eventbrite free online science and technology events: 405 Not Allowed."
  ]
} as const;

export const generatedDiscoveryReviewCandidates = [
  {
    "id": "discovered-tpl-events-stem-metrolinx-community-tree-giveaway-7675ec736883",
    "title": "Metrolinx Community Tree Giveaway",
    "organization": "Toronto Public Library",
    "description": "Metrolinx is partnering with the Toronto and Region Conservation Authority and Kayanase Greenhouse from Six Nations of the Grand River to give away native trees and shrubs to the communities around the future Scarborough Subway Extension. Drop-in. Adult/Senior This event is not part of the Toronto Public Library. Please visit the Metrolinx website for more information metrolinx.com/scarboroughsubway",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-06-06T09:00:00-04:00",
    "startDate": "2026-06-06T09:00:00-04:00",
    "endDate": "2026-06-06T12:00:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6a21fddec7d3cd58005e2a7d",
    "lastChecked": "2026-06-06",
    "lastSeen": "2026-06-06",
    "status": "active",
    "tags": [
      "stem",
      "coding",
      "robotics",
      "python",
      "arduino",
      "science",
      "technology"
    ],
    "confidence": "high",
    "reviewReasons": [],
    "sourceName": "Toronto Public Library events"
  },
  {
    "id": "discovered-vaughan-library-programs-coding-ollie-6c5f9b820acc",
    "title": "Coding Ollie",
    "organization": "Vaughan Public Libraries",
    "description": "Coding Ollie listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Coding & Robotics",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-06T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3319",
    "lastChecked": "2026-06-06",
    "lastSeen": "2026-06-06",
    "status": "needs_review",
    "tags": [
      "coding & robotics",
      "stem",
      "coding",
      "robotics",
      "maker",
      "technology",
      "volunteer"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Vaughan Public Libraries programs"
  },
  {
    "id": "discovered-vaughan-library-programs-kitchen-steam-for-homeschoolers-1ec8d98d6cfe",
    "title": "Kitchen STEAM for Homeschoolers",
    "organization": "Vaughan Public Libraries",
    "description": "Kitchen STEAM for Homeschoolers listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-06T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3598",
    "lastChecked": "2026-06-06",
    "lastSeen": "2026-06-06",
    "status": "needs_review",
    "tags": [
      "stem",
      "coding",
      "robotics",
      "maker",
      "technology",
      "volunteer"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Vaughan Public Libraries programs"
  },
  {
    "id": "discovered-aurora-library-stem-monday-movie-nights-14b3b499f0bc",
    "title": "Monday Movie Nights",
    "organization": "Aurora Public Library",
    "description": "Join us every second Monday of the month from 6–8 PM, beginning January 12, for a themed film night celebrating culture, creativity, and community. Each month highlights a different genre, from inspiring personal stories to thought-provoking documentaries and festive adventures. Films are curated for a variety of age groups, so there’s something for everyone! April 13 - Butterfly Tales for earth day Earth Day is celebrated annually on April 22 to promote environmental protection and raise awareness about ecological issues. Earth Day serves as a reminder of the importance of protecting our planet and addressing issues such as climate change, pollution, and biodiversity loss. It encourages individuals, communities, and organizations to take action for a sustainable future. The Movie: Is a he",
    "city": "Aurora",
    "region": "York",
    "ageMin": 6,
    "ageMax": 12,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-06-08T18:00:00-04:00",
    "startDate": "2026-06-08T18:00:00-04:00",
    "endDate": "2026-06-08T20:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/events/699ca1061c129a205bcce3a4",
    "lastChecked": "2026-06-06",
    "lastSeen": "2026-06-06",
    "status": "active",
    "tags": [
      "science & engineering",
      "stem",
      "creative studio",
      "maker",
      "coding",
      "technology",
      "science"
    ],
    "confidence": "high",
    "reviewReasons": [],
    "sourceName": "Aurora Public Library STEM events"
  },
  {
    "id": "discovered-aurora-library-stem-maker-workshop-custom-mug-a805608eb663",
    "title": "Maker Workshop: Custom Mug",
    "organization": "Aurora Public Library",
    "description": "Learn how to design and make a custom mug with a sublimation printer and Cricut Mug Press. All required materials will be provided. Please note that spots will be prioritized for first-time attendees. Ages 13+",
    "city": "Aurora",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Makerspace & Fabrication",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-06-08T18:30:00-04:00",
    "startDate": "2026-06-08T18:30:00-04:00",
    "endDate": "2026-06-08T20:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/events/68d69c416df9ca153ebcf67c",
    "lastChecked": "2026-06-06",
    "lastSeen": "2026-06-06",
    "status": "active",
    "tags": [
      "makerspace & fabrication",
      "stem",
      "creative studio",
      "maker",
      "coding",
      "technology",
      "science"
    ],
    "confidence": "high",
    "reviewReasons": [],
    "sourceName": "Aurora Public Library STEM events"
  }
] satisfies DiscoveredOpportunity[];
