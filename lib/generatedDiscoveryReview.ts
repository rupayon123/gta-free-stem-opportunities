import type { DiscoveredOpportunity } from "./discovery";

export const generatedDiscoverySummary = {
  "mode": "deterministic",
  "sourcesChecked": 30,
  "candidatesFound": 302,
  "newCandidates": 62,
  "duplicatesSkipped": 68,
  "warnings": [
    "Could not check Oakville Public Library programs: fetch failed.",
    "Could not check Credit Valley Conservation youth opportunities: 403 Forbidden.",
    "Could not check Volunteer MBC youth opportunities: 403 Forbidden."
  ]
} as const;

export const generatedDiscoveryReviewCandidates = [
  {
    "id": "discovered-vaughan-library-programs-volunteer-opportunities-e775e833a50b",
    "title": "Volunteer Opportunities",
    "organization": "Vaughan Public Libraries",
    "description": "Volunteer Opportunities listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/volunteer",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
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
    "id": "discovered-vaughan-library-programs-robotics-club-ae01ea3163b5",
    "title": "Robotics Club",
    "organization": "Vaughan Public Libraries",
    "description": "Robotics Club listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Coding & Robotics",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2494",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
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
    "id": "discovered-aurora-library-volunteers-volunteers-9a6997e9e36a",
    "title": "Volunteers",
    "organization": "Aurora Public Library",
    "description": "Volunteering at the Library Volunteering can be a great way to build experience, learn new skills, connect&hellip;",
    "city": "Aurora",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://aurorapl.ca/volunteers",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "volunteer",
      "teen",
      "youth",
      "hours",
      "service",
      "leadership"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Aurora Public Library volunteer opportunities"
  },
  {
    "id": "discovered-pickering-library-tech-science-and-technology-f36c250b8680",
    "title": "Science and Technology",
    "organization": "Pickering Public Library",
    "description": "Science and Technology listed by Pickering Public Library technology events.",
    "city": "Pickering",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/resources/science-technology",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "stem",
      "technology",
      "maker",
      "computers",
      "coding",
      "youth"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Pickering Public Library technology events"
  },
  {
    "id": "discovered-pickering-library-tech-technology-and-maker-space-9189ff2faf8e",
    "title": "Technology and Maker Space",
    "organization": "Pickering Public Library",
    "description": "Technology and Maker Space listed by Pickering Public Library technology events.",
    "city": "Pickering",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Makerspace & Fabrication",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/makerspace",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "makerspace & fabrication",
      "stem",
      "technology",
      "maker",
      "computers",
      "coding",
      "youth"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Pickering Public Library technology events"
  },
  {
    "id": "discovered-pickering-library-tech-ai-series-the-social-environmental-impacts-20f1925e2404",
    "title": "AI Series: The Social & Environmental Impacts of AI",
    "organization": "Pickering Public Library",
    "description": "AI Series: The Social & Environmental Impacts of AI listed by Pickering Public Library technology events.",
    "city": "Pickering",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://cal.pickeringlibrary.ca/event/ai-series-social-environmental-impacts-ai-45995",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "stem",
      "technology",
      "maker",
      "computers",
      "coding",
      "youth"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Pickering Public Library technology events"
  },
  {
    "id": "discovered-pickering-library-tech-computers-and-technology-99e4cbcf5f11",
    "title": "Computers and Technology",
    "organization": "Pickering Public Library",
    "description": "Computers and Technology listed by Pickering Public Library technology events.",
    "city": "Pickering",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/explore/?programs=computers-and-technology",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "technology",
      "maker",
      "computers",
      "coding",
      "youth"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Pickering Public Library technology events"
  },
  {
    "id": "discovered-pickering-library-tech-technology-for-health-fitness-c25f6de4b42e",
    "title": "Technology for Health & Fitness",
    "organization": "Pickering Public Library",
    "description": "Technology for Health & Fitness listed by Pickering Public Library technology events.",
    "city": "Pickering",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://pickering.bibliocommons.com/v2/list/display/1491301049/3037093477",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "technology",
      "maker",
      "computers",
      "coding",
      "youth"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Pickering Public Library technology events"
  },
  {
    "id": "discovered-oshawa-library-stem-teen-summer-reading-challenge-18e265e8adcb",
    "title": "Teen Summer Reading Challenge",
    "organization": "Oshawa Public Libraries",
    "description": "Teen Summer Reading Challenge from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 13,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd0b47b6c4ac1fedcc079e",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "coding",
      "science",
      "technology",
      "teen",
      "volunteer"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Oshawa Public Libraries STEM events"
  },
  {
    "id": "discovered-oshawa-library-stem-creation-station-dbb9b94afe09",
    "title": "Creation Station",
    "organization": "Oshawa Public Libraries",
    "description": "Creation Station from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd16d6e2a2952aed0e7346",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "coding",
      "science",
      "technology",
      "teen",
      "volunteer"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Oshawa Public Libraries STEM events"
  },
  {
    "id": "discovered-oshawa-library-stem-painting-paddles-workshop-db0aa8c3d082",
    "title": "Painting Paddles Workshop",
    "organization": "Oshawa Public Libraries",
    "description": "Painting Paddles Workshop from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd26bbc1cf6f9a7585107e",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "coding",
      "science",
      "technology",
      "teen",
      "volunteer"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Oshawa Public Libraries STEM events"
  },
  {
    "id": "discovered-oshawa-library-stem-childhood-unplugged-healthier-tech-habits--bd5ae849a520",
    "title": "Childhood Unplugged: Healthier Tech Habits for Kids",
    "organization": "Oshawa Public Libraries",
    "description": "Childhood Unplugged: Healthier Tech Habits for Kids from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 6,
    "ageMax": 12,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a04b179f6bd012f0067aa35",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "coding",
      "science",
      "technology",
      "teen",
      "volunteer"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Oshawa Public Libraries STEM events"
  },
  {
    "id": "discovered-oshawa-library-stem-durham-college-b164403a4c89",
    "title": "Durham College",
    "organization": "Oshawa Public Libraries",
    "description": "Durham College from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a15b57543b41b3d006925b8",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "coding",
      "science",
      "technology",
      "teen",
      "volunteer"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Oshawa Public Libraries STEM events"
  },
  {
    "id": "discovered-oshawa-library-stem-makerspace-6bb095888b6a",
    "title": "Makerspace",
    "organization": "Oshawa Public Libraries",
    "description": "Makerspace listed by Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Makerspace & Fabrication",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://oshawalibrary.ca/technology/makerspace",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "makerspace & fabrication",
      "stem",
      "coding",
      "science",
      "technology",
      "teen",
      "volunteer"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Oshawa Public Libraries STEM events"
  },
  {
    "id": "discovered-oshawa-library-stem-volunteer-at-opl-2fa4d7078a11",
    "title": "Volunteer at OPL",
    "organization": "Oshawa Public Libraries",
    "description": "Volunteer at OPL listed by Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://oshawalibrary.ca/volunteer",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "stem",
      "coding",
      "science",
      "technology",
      "teen",
      "volunteer"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Oshawa Public Libraries STEM events"
  },
  {
    "id": "discovered-clarington-library-programs-learning-technology-230c06781e35",
    "title": "Learning & Technology",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Learning & Technology listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "http://www.cplma.ca/learning-technology",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "science",
      "technology",
      "programs",
      "museum",
      "youth"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Clarington Library programs"
  },
  {
    "id": "discovered-clarington-library-programs-computers-internet-access-3cb588204464",
    "title": "Computers & Internet Access",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Computers & Internet Access listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "http://www.cplma.ca/learning-technology/computers-and-internet-access",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "science",
      "technology",
      "programs",
      "museum",
      "youth"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Clarington Library programs"
  },
  {
    "id": "discovered-clarington-library-programs-maker-s-space-2a794c50bde2",
    "title": "Maker's Space",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Maker's Space listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Makerspace & Fabrication",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "http://www.cplma.ca/learning-technology/makers-space-the-studio",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "makerspace & fabrication",
      "stem",
      "science",
      "technology",
      "programs",
      "museum",
      "youth"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Clarington Library programs"
  },
  {
    "id": "discovered-clarington-library-programs-jobs-volunteering-034bd1adb633",
    "title": "Jobs & Volunteering",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Jobs & Volunteering listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "http://www.cplma.ca/about-us/jobs-and-volunteering",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "stem",
      "science",
      "technology",
      "programs",
      "museum",
      "youth"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Clarington Library programs"
  },
  {
    "id": "discovered-clarington-library-programs-engineering-outreach-workshop-stem-gr-5-8-8d846548bd43",
    "title": "Engineering Outreach Workshop: STEM (Gr 5-8)",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Engineering Outreach Workshop: STEM (Gr 5-8) listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://events.cplma.ca/default/detail/2026-06-13-1400-Engineering-Outreach-Workshop-STEM-Gr-5-8",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "stem",
      "science",
      "technology",
      "programs",
      "museum",
      "youth"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Clarington Library programs"
  },
  {
    "id": "discovered-clarington-library-programs-reading-and-math-buddies-3e183b053cf3",
    "title": "Reading and Math Buddies",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Reading and Math Buddies listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.cplma.ca/programs-services/reading-and-math-buddies",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "science",
      "technology",
      "programs",
      "museum",
      "youth"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Clarington Library programs"
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
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca/volunteer-opportunities",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "stem",
      "coding",
      "maker",
      "technology",
      "volunteer",
      "programs"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Milton Public Library programs"
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
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "coding",
      "maker",
      "technology",
      "volunteer",
      "programs"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Milton Public Library programs"
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
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca/computer-services",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "coding",
      "maker",
      "technology",
      "volunteer",
      "programs"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Milton Public Library programs"
  },
  {
    "id": "discovered-halton-hills-library-programs-technology-resources-f6eda0d3bfa5",
    "title": "Technology Resources",
    "organization": "Halton Hills Public Library",
    "description": "Technology Resources listed by Halton Hills Public Library programs.",
    "city": "Halton Hills",
    "region": "Halton",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.hhpl.ca/services/technology-resources",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "coding",
      "technology",
      "lego",
      "maker",
      "programs"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Halton Hills Public Library programs"
  },
  {
    "id": "discovered-halton-hills-library-programs-computers-2d82aa6ec575",
    "title": "Computers",
    "organization": "Halton Hills Public Library",
    "description": "Computers listed by Halton Hills Public Library programs.",
    "city": "Halton Hills",
    "region": "Halton",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.hhpl.ca/computers",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "coding",
      "technology",
      "lego",
      "maker",
      "programs"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Halton Hills Public Library programs"
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
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://trca.ca/get-involved/youth-opportunities",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
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
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://trca.ca/get-involved/volunteer",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
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
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://trca.ca/learning/adult/young-conservation-professionals",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
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
    "id": "discovered-uhn-stem-pathways-uhn-stem-pathways-7847b49cfe74",
    "title": "UHN STEM Pathways",
    "organization": "UHN STEM Pathways",
    "description": "UHN STEM Pathways from UHN STEM Pathways.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "science",
      "health",
      "workshop",
      "underserved",
      "youth"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "UHN STEM Pathways"
  },
  {
    "id": "discovered-uhn-stem-pathways-volunteer-spotlight-ff9c6a9238e5",
    "title": "Volunteer Spotlight",
    "organization": "UHN STEM Pathways",
    "description": "Volunteer Spotlight listed by UHN STEM Pathways.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/volunteer-spotlight",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "stem",
      "science",
      "health",
      "workshop",
      "underserved",
      "youth"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "UHN STEM Pathways"
  },
  {
    "id": "discovered-uhn-stem-pathways-folder-volunteers-04eb7154ed70",
    "title": "Folder: Volunteers",
    "organization": "UHN STEM Pathways",
    "description": "Folder: Volunteers listed by UHN STEM Pathways.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/volunteers",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "stem",
      "science",
      "health",
      "workshop",
      "underserved",
      "youth"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "UHN STEM Pathways"
  },
  {
    "id": "discovered-uhn-stem-pathways-upcoming-stem-talks-2025-26-213b62cbcb46",
    "title": "Upcoming STEM Talks - 2025/26",
    "organization": "UHN STEM Pathways",
    "description": "Upcoming STEM Talks - 2025/26 listed by UHN STEM Pathways.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/upcoming/stem-talks-2025-overview",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "stem",
      "science",
      "health",
      "workshop",
      "underserved",
      "youth"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "UHN STEM Pathways"
  },
  {
    "id": "discovered-uoft-engineering-outreach-home-engineering-outreach-9f92ae9e4cb2",
    "title": "Home - Engineering Outreach",
    "organization": "University of Toronto Engineering Outreach",
    "description": "Explore our Pre-University Programs! Engineering Outreach is dedicated to inspiring bright young minds from grades 3-12 with a wide spectrum of pre-university STEM programs. Discover our offerings for elementary, high [&hellip;]",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 8,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering",
      "stem",
      "science",
      "coding",
      "youth",
      "workshop"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "University of Toronto Engineering Outreach"
  },
  {
    "id": "discovered-uoft-engineering-outreach-u-of-t-engineering-1da89280bbbd",
    "title": "U of T ENGINEERING",
    "organization": "University of Toronto Engineering Outreach",
    "description": "U of T ENGINEERING listed by University of Toronto Engineering Outreach.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.engineering.utoronto.ca",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering",
      "stem",
      "science",
      "coding",
      "youth",
      "workshop"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "University of Toronto Engineering Outreach"
  },
  {
    "id": "discovered-uoft-engineering-outreach-about-engineering-outreach-f1d9659ef0b8",
    "title": "About Engineering Outreach",
    "organization": "University of Toronto Engineering Outreach",
    "description": "About Engineering Outreach listed by University of Toronto Engineering Outreach.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/about-us",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering",
      "stem",
      "science",
      "coding",
      "youth",
      "workshop"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "University of Toronto Engineering Outreach"
  },
  {
    "id": "discovered-uoft-engineering-outreach-create-engineering-design-challenges-33057fc93678",
    "title": "CREATE: Engineering Design Challenges »",
    "organization": "University of Toronto Engineering Outreach",
    "description": "CREATE: Engineering Design Challenges » listed by University of Toronto Engineering Outreach.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/pre-university-programs/high-school-program/create",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering",
      "stem",
      "science",
      "coding",
      "youth",
      "workshop"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "University of Toronto Engineering Outreach"
  },
  {
    "id": "discovered-uoft-engineering-outreach-ready-set-code-5a16f2c8d362",
    "title": "Ready Set Code! »",
    "organization": "University of Toronto Engineering Outreach",
    "description": "Ready Set Code! » listed by University of Toronto Engineering Outreach.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/pre-university-programs/elementary/ready-set-code",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering",
      "stem",
      "science",
      "coding",
      "youth",
      "workshop"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "University of Toronto Engineering Outreach"
  },
  {
    "id": "discovered-uoft-engineering-outreach-engineering-discovery-day-77f23ff7203c",
    "title": "Engineering Discovery Day »",
    "organization": "University of Toronto Engineering Outreach",
    "description": "Engineering Discovery Day » listed by University of Toronto Engineering Outreach.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/pre-university-programs/elementary/engineering-discovery-day",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering",
      "stem",
      "science",
      "coding",
      "youth",
      "workshop"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "University of Toronto Engineering Outreach"
  },
  {
    "id": "discovered-uoft-engineering-outreach-volunteer-opportunities-0caedcfe66e2",
    "title": "Volunteer Opportunities",
    "organization": "University of Toronto Engineering Outreach",
    "description": "Volunteer Opportunities listed by University of Toronto Engineering Outreach.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/about-us/volunteer-opportunities",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "engineering",
      "stem",
      "science",
      "coding",
      "youth",
      "workshop"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "University of Toronto Engineering Outreach"
  },
  {
    "id": "discovered-uoft-engineering-outreach-student-data-practices-92ddd2c683bc",
    "title": "Student Data Practices",
    "organization": "University of Toronto Engineering Outreach",
    "description": "Student Data Practices listed by University of Toronto Engineering Outreach.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://data.viceprovoststudents.utoronto.ca",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering",
      "stem",
      "science",
      "coding",
      "youth",
      "workshop"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "University of Toronto Engineering Outreach"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-engineering-outreach-b8a6272b9876",
    "title": "Engineering Outreach",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Engineering Outreach from Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/index.php",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering",
      "stem",
      "science",
      "coding",
      "youth",
      "workshop"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Ontario Tech Engineering Outreach"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-engineering-outreach-supporters-182433c06ecc",
    "title": "Engineering Outreach Supporters",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Engineering Outreach Supporters listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/outreach-supporters.php",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering",
      "stem",
      "science",
      "coding",
      "youth",
      "workshop"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Ontario Tech Engineering Outreach"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-engineering-outreach-in-the-community-97cd2a77dd32",
    "title": "Engineering Outreach in the Community",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Engineering Outreach in the Community listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/in-the-community.php",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering",
      "stem",
      "science",
      "coding",
      "youth",
      "workshop"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Ontario Tech Engineering Outreach"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-stempreneur-ai-powered-business-challenge-e02f81471e05",
    "title": "STEMpreneur: AI-Powered Business Challenge",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "STEMpreneur: AI-Powered Business Challenge listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://forms.gle/gtQQfEqXXWraxP1B7",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering",
      "stem",
      "science",
      "coding",
      "youth",
      "workshop"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Ontario Tech Engineering Outreach"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-traditional-knowledge-and-stem-conference-08e0a500e84e",
    "title": "Traditional Knowledge and STEM Conference",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Traditional Knowledge and STEM Conference listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://docs.google.com/forms/d/e/1FAIpQLScCVdFb5HmbdhkEG1uIDjWOTByDFojpUGTY-bmAe6Y41gHbMg/viewform",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering",
      "stem",
      "science",
      "coding",
      "youth",
      "workshop"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Ontario Tech Engineering Outreach"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-volunteer-with-us-fd0687f56430",
    "title": "Volunteer With Us",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Volunteer With Us listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/volunteer.php",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "engineering",
      "stem",
      "science",
      "coding",
      "youth",
      "workshop"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Ontario Tech Engineering Outreach"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-science-campus-tour-8b1442f65029",
    "title": "Science Campus Tour",
    "organization": "Eventbrite public event search",
    "description": "Science Campus Tour listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/science-campus-tour-tickets-1988834450379?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "free",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-black-boys-code-toronto-idea-to-reality-pr-240f149b9456",
    "title": "Black Boys Code Toronto- Idea to Reality: Project Showcase Prep",
    "organization": "Eventbrite public event search",
    "description": "Black Boys Code Toronto- Idea to Reality: Project Showcase Prep listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/black-boys-code-toronto-idea-to-reality-project-showcase-prep-tickets-1991008138940?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "free",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-black-kids-code-girls-toronto-idea-to-real-957c4ab7382c",
    "title": "Black Kids Code(Girls) Toronto - Idea to Reality: Project Showcase Prep",
    "organization": "Eventbrite public event search",
    "description": "Black Kids Code(Girls) Toronto - Idea to Reality: Project Showcase Prep listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 6,
    "ageMax": 12,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/black-kids-codegirls-toronto-idea-to-reality-project-showcase-prep-tickets-1991387226802?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "free",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-designing-science-innovations-in-health-re-11496863ca9f",
    "title": "Designing Science - Innovations in Health Research Fall 2026",
    "organization": "Eventbrite public event search",
    "description": "Designing Science - Innovations in Health Research Fall 2026 listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/designing-science-innovations-in-health-research-fall-2026-tickets-1990783742765?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "free",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-a-breath-of-clean-air-building-climate-res-ad244f1bf502",
    "title": "A Breath of Clean Air: Building Climate Resilience by Improving IAQ",
    "organization": "Eventbrite public event search",
    "description": "A Breath of Clean Air: Building Climate Resilience by Improving IAQ listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/a-breath-of-clean-air-building-climate-resilience-by-improving-iaq-tickets-1991602472608?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "free",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-saugatech-defending-the-prompt-building-se-0cd365ced976",
    "title": "SaugaTech - Defending The Prompt - Building Secure Tech Products in AI Era",
    "organization": "Eventbrite public event search",
    "description": "SaugaTech - Defending The Prompt - Building Secure Tech Products in AI Era listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/saugatech-defending-the-prompt-building-secure-tech-products-in-ai-era-tickets-1991406004968?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "free",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-robotics-meetup-and-show-tell-8d8890960a5b",
    "title": "Robotics Meetup and Show & Tell",
    "organization": "Eventbrite public event search",
    "description": "Robotics Meetup and Show & Tell listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Coding & Robotics",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.com/e/robotics-meetup-and-show-tell-tickets-1988283546611?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "coding & robotics",
      "free",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-online-science-tech-trustworthy-ai-agents-a592e51aba88",
    "title": "Trustworthy AI Agents",
    "organization": "Eventbrite public event search",
    "description": "Trustworthy AI Agents listed by Eventbrite free online science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.com/e/trustworthy-ai-agents-registration-1989916014366?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "free",
      "online",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free online science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-online-science-tech-d-fendre-la-science-et-se-visibiliser-pour-df941cdaaaa6",
    "title": "Défendre la science et se visibiliser pour le bien commun",
    "organization": "Eventbrite public event search",
    "description": "Défendre la science et se visibiliser pour le bien commun listed by Eventbrite free online science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.fr/e/defendre-la-science-et-se-visibiliser-pour-le-bien-commun-tickets-1990918044465?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "free",
      "online",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free online science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-online-science-tech-unlocking-productivity-in-legacy-systems-a-3a664e99b569",
    "title": "Unlocking productivity in legacy systems: a safe path to AI adoption",
    "organization": "Eventbrite public event search",
    "description": "Unlocking productivity in legacy systems: a safe path to AI adoption listed by Eventbrite free online science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.co.uk/e/unlocking-productivity-in-legacy-systems-a-safe-path-to-ai-adoption-tickets-1990077566573?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "free",
      "online",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free online science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-online-science-tech-build-smarter-with-ai-workflows-chatbots-l-e4ca8887bf5b",
    "title": "Build Smarter with AI Workflows & Chatbots | Live Demo by Abacus.AI",
    "organization": "Eventbrite public event search",
    "description": "Build Smarter with AI Workflows & Chatbots | Live Demo by Abacus.AI listed by Eventbrite free online science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.com/e/build-smarter-with-ai-workflows-chatbots-live-demo-by-abacusai-tickets-1990615664037?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "free",
      "online",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free online science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-online-science-tech-design-for-trust-data-storytelling-in-the--dcfdadca00bd",
    "title": "Design for trust: Data storytelling in the age of AI",
    "organization": "Eventbrite public event search",
    "description": "Design for trust: Data storytelling in the age of AI listed by Eventbrite free online science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.co.uk/e/design-for-trust-data-storytelling-in-the-age-of-ai-tickets-1990978478224?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "free",
      "online",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free online science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-online-science-tech-the-culture-code-how-to-create-psychologic-7aaa9c19c94c",
    "title": "The Culture Code: How to Create Psychological Safety at Work",
    "organization": "Eventbrite public event search",
    "description": "The Culture Code: How to Create Psychological Safety at Work listed by Eventbrite free online science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.co.uk/e/the-culture-code-how-to-create-psychological-safety-at-work-tickets-1987390255754?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "free",
      "online",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free online science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-online-science-tech-creative-work-in-the-age-of-ai-tools-pract-3dd209b7e16b",
    "title": "Creative Work in the Age of AI: Tools, Practice and the Road Ahead",
    "organization": "Eventbrite public event search",
    "description": "Creative Work in the Age of AI: Tools, Practice and the Road Ahead listed by Eventbrite free online science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.co.uk/e/creative-work-in-the-age-of-ai-tools-practice-and-the-road-ahead-tickets-1988169897684?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "free",
      "online",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free online science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-online-science-tech-5-hackathon-9d09857cb031",
    "title": "5 . Hackathon",
    "organization": "Eventbrite public event search",
    "description": "5 . Hackathon listed by Eventbrite free online science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Hackathons & Competitions",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-13T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/d/online/hackathon",
    "lastChecked": "2026-06-13",
    "lastSeen": "2026-06-13",
    "status": "needs_review",
    "tags": [
      "hackathons & competitions",
      "free",
      "online",
      "science",
      "technology",
      "hackathon",
      "coding",
      "robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free online science and technology events"
  }
] satisfies DiscoveredOpportunity[];
