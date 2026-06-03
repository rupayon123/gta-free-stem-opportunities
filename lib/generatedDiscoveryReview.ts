import type { DiscoveredOpportunity } from "./discovery";

export const generatedDiscoverySummary = {
  "mode": "deterministic",
  "sourcesChecked": 9,
  "candidatesFound": 116,
  "newCandidates": 4,
  "duplicatesSkipped": 9,
  "warnings": [
    "Could not check Credit Valley Conservation youth opportunities: 403 Forbidden.",
    "Could not check Eventbrite free science and technology events: 405 Not Allowed."
  ]
} as const;

export const generatedDiscoveryReviewCandidates = [
  {
    "id": "discovered-markham-events-stem-stem-workshop-building-bridges-grades-4-6-8c77c448b69a",
    "title": "STEM Workshop: Building Bridges (Grades 4-6)",
    "organization": "Markham Public Library",
    "description": "In this workshop, participants will learn about energy transfer, friction, pressure and how geometric shapes contribute to structural strength. Using the engineering design process, participants will build their very own bridge! Discover the wonderful world of civil engineering through this hands-on and interactive workshop. This session will be led by a passionate high school student and is designed to explore exciting topics in structural design (civil engineering). This program is open to children in grades 4 to 6 on a first come, first serve basis.",
    "city": "Markham",
    "region": "York",
    "ageMin": 9,
    "ageMax": 12,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-06-03T17:00:00-04:00",
    "startDate": "2026-06-03T17:00:00-04:00",
    "endDate": "2026-06-03T18:15:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/events/69274b3f44d0e96d007b874d",
    "lastChecked": "2026-06-03",
    "lastSeen": "2026-06-03",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "stem",
      "steam",
      "makerspace",
      "robotics",
      "coding"
    ],
    "confidence": "high",
    "reviewReasons": [],
    "sourceName": "Markham Public Library events"
  },
  {
    "id": "discovered-trca-youth-youth-opportunities-at-trca-bd0e50237819",
    "title": "Youth Opportunities at TRCA",
    "organization": "Toronto and Region Conservation Authority",
    "description": "TRCA offers programs to support youth and young adults who are interested in getting involved in the conservation sector.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 13,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-03T09:00:00-04:00",
    "sourceUrl": "https://trca.ca/get-involved/youth-opportunities",
    "lastChecked": "2026-06-03",
    "lastSeen": "2026-06-03",
    "status": "needs_review",
    "tags": [
      "stem",
      "youth",
      "volunteer",
      "conservation",
      "environment",
      "science"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "TRCA youth volunteer opportunities"
  },
  {
    "id": "discovered-trca-youth-volunteer-with-trca-cdffdd979d6f",
    "title": "Volunteer with TRCA",
    "organization": "Toronto and Region Conservation Authority",
    "description": "Volunteer with TRCA listed by TRCA youth volunteer opportunities.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-03T09:00:00-04:00",
    "sourceUrl": "https://trca.ca/get-involved/volunteer",
    "lastChecked": "2026-06-03",
    "lastSeen": "2026-06-03",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "youth",
      "volunteer",
      "conservation",
      "environment",
      "science"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "TRCA youth volunteer opportunities"
  },
  {
    "id": "discovered-trca-youth-young-conservation-professionals-leadershi-275035142ede",
    "title": "Young Conservation Professionals Leadership Program",
    "organization": "Toronto and Region Conservation Authority",
    "description": "Young Conservation Professionals Leadership Program listed by TRCA youth volunteer opportunities.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-03T09:00:00-04:00",
    "sourceUrl": "https://trca.ca/learning/adult/young-conservation-professionals",
    "lastChecked": "2026-06-03",
    "lastSeen": "2026-06-03",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "youth",
      "volunteer",
      "conservation",
      "environment",
      "science"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "TRCA youth volunteer opportunities"
  }
] satisfies DiscoveredOpportunity[];
