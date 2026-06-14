import type { DiscoveredOpportunity } from "./discovery";

export const generatedDiscoverySummary = {
  "mode": "deterministic",
  "sourcesChecked": 30,
  "candidatesFound": 305,
  "newCandidates": 36,
  "duplicatesSkipped": 95,
  "warnings": [
    "Could not check Oakville Public Library programs: fetch failed.",
    "Could not check Credit Valley Conservation youth opportunities: 403 Forbidden.",
    "Could not check Volunteer MBC youth opportunities: 403 Forbidden."
  ]
} as const;

export const generatedDiscoveryReviewCandidates = [
  {
    "id": "discovered-vaughan-library-programs-steam-club-for-homeschoolers-b635f95e3074",
    "title": "STEAM Club for Homeschoolers",
    "organization": "Vaughan Public Libraries",
    "description": "STEAM Club for Homeschoolers listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2484",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "id": "discovered-richmond-hill-library-programs-volunteer-at-rhpl-e9cf3759163d",
    "title": "Volunteer at RHPL",
    "organization": "Richmond Hill Public Library",
    "description": "Volunteer at RHPL listed by Richmond Hill Public Library programs.",
    "city": "Richmond Hill",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.rhpl.ca/working-with-the-library/volunteer-opportunities",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "stem",
      "coding",
      "technology",
      "science",
      "maker",
      "teen"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Richmond Hill Public Library programs"
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://aurorapl.ca/volunteers",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "id": "discovered-ajax-library-stem-makerspace-mclean-79e320ceb204",
    "title": "Makerspace @ McLean",
    "organization": "Ajax Public Library",
    "description": "Makerspace @ McLean listed by Ajax Public Library STEM events.",
    "city": "Ajax",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Makerspace & Fabrication",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://ajaxlibrary.ca/Makerspace",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
    "status": "needs_review",
    "tags": [
      "makerspace & fabrication",
      "stem",
      "coding",
      "science",
      "engineering",
      "technology",
      "black youth"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Ajax Public Library STEM events"
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/resources/science-technology",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/makerspace",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://cal.pickeringlibrary.ca/event/ai-series-social-environmental-impacts-ai-45995",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/explore/?programs=computers-and-technology",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://pickering.bibliocommons.com/v2/list/display/1491301049/3037093477",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "id": "discovered-oshawa-library-stem-adult-summer-reading-challenge-f4980264b496",
    "title": "Adult Summer Reading Challenge",
    "organization": "Oshawa Public Libraries",
    "description": "Adult Summer Reading Challenge from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd02d3c1cf6f9a75850754",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd0b47b6c4ac1fedcc079e",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "id": "discovered-oshawa-library-stem-td-summer-reading-club-8c963ca1c97f",
    "title": "TD Summer Reading Club",
    "organization": "Oshawa Public Libraries",
    "description": "TD Summer Reading Club from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd1476e2a2952aed0e7278",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd16d6e2a2952aed0e7346",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd26bbc1cf6f9a7585107e",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a04b179f6bd012f0067aa35",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a15b57543b41b3d006925b8",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://oshawalibrary.ca/technology/makerspace",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://oshawalibrary.ca/volunteer",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.mississauga.ca/library/library-jobs-and-volunteer",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "volunteer",
      "teen",
      "youth",
      "hours",
      "community service"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Mississauga Library volunteer opportunities"
  },
  {
    "id": "discovered-mississauga-library-volunteers-volunteer-at-the-library-teens-can-join-a--8e063ada33da",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://app.betterimpact.com/PublicEnterprise/e3200288-2b64-4ed8-a26d-5bd0f4c5170b",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "volunteer",
      "teen",
      "youth",
      "hours",
      "community service"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Mississauga Library volunteer opportunities"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-science-campus-tour-f5729274897e",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/science-campus-tour-tickets-1989102076857?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/black-boys-code-toronto-idea-to-reality-project-showcase-prep-tickets-1991008138940?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/black-kids-codegirls-toronto-idea-to-reality-project-showcase-prep-tickets-1991387226802?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/a-breath-of-clean-air-building-climate-resilience-by-improving-iaq-tickets-1991602472608?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/designing-science-innovations-in-health-research-fall-2026-tickets-1990783742765?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/saugatech-defending-the-prompt-building-secure-tech-products-in-ai-era-tickets-1991406004968?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "id": "discovered-eventbrite-free-science-tech-pump-student-stem-fair-ce4424e576ca",
    "title": "PuMP+ Student STEM Fair",
    "organization": "Eventbrite public event search",
    "description": "PuMP+ Student STEM Fair listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/pump-student-stem-fair-tickets-1991121512042?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.com/e/robotics-meetup-and-show-tell-tickets-1988283546611?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.com/e/trustworthy-ai-agents-registration-1989916014366?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.fr/e/defendre-la-science-et-se-visibiliser-pour-le-bien-commun-tickets-1990918044465?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.co.uk/e/unlocking-productivity-in-legacy-systems-a-safe-path-to-ai-adoption-tickets-1990077566573?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.co.uk/e/design-for-trust-data-storytelling-in-the-age-of-ai-tickets-1990978478224?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.com/e/build-smarter-with-ai-workflows-chatbots-live-demo-by-abacusai-tickets-1990615664037?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.co.uk/e/the-culture-code-how-to-create-psychological-safety-at-work-tickets-1987390255754?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.co.uk/e/creative-work-in-the-age-of-ai-tools-practice-and-the-road-ahead-tickets-1988169897684?aff=ebdssbdestsearch",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
    "startDate": "2026-06-14T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/d/online/hackathon",
    "lastChecked": "2026-06-14",
    "lastSeen": "2026-06-14",
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
