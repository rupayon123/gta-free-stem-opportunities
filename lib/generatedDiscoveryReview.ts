import type { DiscoveredOpportunity } from "./discovery";

export const generatedDiscoverySummary = {
  "mode": "deterministic",
  "sourcesChecked": 30,
  "candidatesFound": 231,
  "newCandidates": 21,
  "duplicatesSkipped": 62,
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://www.rhpl.ca/working-with-the-library/volunteer-opportunities",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "id": "discovered-aurora-library-stem-steam-for-homeschoolers-3695718a162e",
    "title": "STEAM for Homeschoolers",
    "organization": "Aurora Public Library",
    "description": "Explore science, technology, engineering, art, and math in the company of other homeschoolers. For kids ages 6-12.",
    "city": "Aurora",
    "region": "York",
    "ageMin": 6,
    "ageMax": 12,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-06-25T14:30:00-04:00",
    "startDate": "2026-06-25T14:30:00-04:00",
    "endDate": "2026-06-25T16:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/events/6998badb6724c63d00f40ca0",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://aurorapl.ca/volunteers",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://ajaxlibrary.ca/Makerspace",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/resources/science-technology",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/makerspace",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://pickering.bibliocommons.com/v2/list/display/1491301049/3037093477",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd02d3c1cf6f9a75850754",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd0b47b6c4ac1fedcc079e",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd1476e2a2952aed0e7278",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "id": "discovered-oshawa-library-stem-creation-station-0e19cebac1b2",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd1710e2a2952aed0e734d",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "id": "discovered-oshawa-library-stem-strawberries-stories-80726db3e0c2",
    "title": "Strawberries & Stories",
    "organization": "Oshawa Public Libraries",
    "description": "Strawberries & Stories from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd271ee2a2952aed0e785e",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://oshawalibrary.ca/technology/makerspace",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://oshawalibrary.ca/volunteer",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://www.mississauga.ca/library/library-jobs-and-volunteer",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://app.betterimpact.com/PublicEnterprise/e3200288-2b64-4ed8-a26d-5bd0f4c5170b",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/index.php",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/outreach-supporters.php",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/in-the-community.php",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://docs.google.com/forms/d/e/1FAIpQLScCVdFb5HmbdhkEG1uIDjWOTByDFojpUGTY-bmAe6Y41gHbMg/viewform",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
    "startDate": "2026-06-25T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/volunteer.php",
    "lastChecked": "2026-06-25",
    "lastSeen": "2026-06-25",
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
  }
] satisfies DiscoveredOpportunity[];
