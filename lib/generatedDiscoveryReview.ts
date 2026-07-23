import type { DiscoveredOpportunity } from "./discovery";

export const generatedDiscoverySummary = {
  "mode": "deterministic",
  "sourcesChecked": 30,
  "candidatesFound": 229,
  "newCandidates": 18,
  "duplicatesSkipped": 61,
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
    "id": "discovered-vaughan-library-programs-steam-camps-a329039c210e",
    "title": "STEAM Camps",
    "organization": "Vaughan Public Libraries",
    "description": "STEAM Camps listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-07-23T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/programs/category/40",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
    "startDate": "2026-07-23T09:00:00-04:00",
    "sourceUrl": "https://www.rhpl.ca/working-with-the-library/volunteer-opportunities",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
    "id": "discovered-aurora-library-stem-teen-summer-reading-challenge-2026-b391a8b5138e",
    "title": "Teen Summer Reading Challenge 2026",
    "organization": "Aurora Public Library",
    "description": "Books + Activities + New Friends + Prizes = Your Best Summer Yet! Join the Teen Summer Reading Challenge 2026 and unlock awesome activities, cool vibes, and real rewards. Activities include: Guess the Number – Weekly Candy Jar Challenge Each week, a new candy-filled jar will be on display at the library. Think you can guess how many are inside? Submit your name, contact info, and your best guess for a chance to win the special prizes! Closest guess wins - and yes, there’s a new chance to play every week. Raffle Contest – Read More, Win More! For every YA book you check out, you'll receive a raffle ticket. The more you read, the more entries you collect, and the better your chances of winning amazing prizes! Winners will be announced on September 1 st 2026. Beanstack Reading Challenge – Log",
    "city": "Aurora",
    "region": "York",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-06-29T08:00:00-04:00",
    "startDate": "2026-06-29T08:00:00-04:00",
    "endDate": "2026-08-31T09:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/events/6a1488fba99bdd027d42cf84",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "stem",
      "creative studio",
      "maker",
      "coding",
      "technology",
      "science"
    ],
    "confidence": "high",
    "reviewReasons": [
      "Cost-related words appeared near the listing."
    ],
    "sourceName": "Aurora Public Library STEM events"
  },
  {
    "id": "discovered-aurora-library-stem-math-mingle-81b7ed4c3b0d",
    "title": "Math & Mingle",
    "organization": "Aurora Public Library",
    "description": "Need a hand with homework or just want to brush up on your math skills? Drop in for a relaxed, supportive space to work through tricky problems, get help from, and connect with other teens. No pressure - all skills are welcome!",
    "city": "Aurora",
    "region": "York",
    "ageMin": 13,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-07-25T14:00:00-04:00",
    "startDate": "2026-07-25T14:00:00-04:00",
    "endDate": "2026-07-25T16:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/events/6a0c8164278f7c2f008e1e37",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
    "status": "active",
    "tags": [
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
    "id": "discovered-aurora-library-stem-maker-workshop-custom-hat-2039c4a1ceaa",
    "title": "Maker Workshop: Custom Hat",
    "organization": "Aurora Public Library",
    "description": "Learn how to design and make a custom hat using a sublimation printer and the Cricut Hat Press. All required materials will be provided. Please note that spots will be prioritized for first-time attendees. teen/adult program 13+",
    "city": "Aurora",
    "region": "York",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Makerspace & Fabrication",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-07-23T10:30:00-04:00",
    "startDate": "2026-07-23T10:30:00-04:00",
    "endDate": "2026-07-23T12:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/events/69fe1645055b429f3b3aa24e",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
  },
  {
    "id": "discovered-aurora-library-stem-marble-mazes-ages-8-14-presented-by-stem-m-f3353c069187",
    "title": "Marble Mazes (ages 8-14) Presented by STEM Minds",
    "organization": "Aurora Public Library",
    "description": "Imagine, design and build your own marble maze! In this hands-on STEM workshop, the participants will explore creativity, planning, and problem-solving as they construct pathways, test ideas, and refine their designs. Each participant will bring their imagination to life while developing design and engineering skills through playful experimentation—and take home a marble maze they designed This program is for children ages 8-14.",
    "city": "Aurora",
    "region": "York",
    "ageMin": 8,
    "ageMax": 14,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-07-23T17:30:00-04:00",
    "startDate": "2026-07-23T17:30:00-04:00",
    "endDate": "2026-07-23T18:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/events/6a1487b4e13d3b4603b55d40",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
    "startDate": "2026-07-23T09:00:00-04:00",
    "sourceUrl": "https://aurorapl.ca/volunteers",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
    "startDate": "2026-07-23T09:00:00-04:00",
    "sourceUrl": "https://ajaxlibrary.ca/Makerspace",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
    "startDate": "2026-07-23T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd02d3c1cf6f9a75850754",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
    "startDate": "2026-07-23T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd0b47b6c4ac1fedcc079e",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
    "startDate": "2026-07-23T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd1476e2a2952aed0e7278",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
    "id": "discovered-oshawa-library-stem-ontario-tech-coding-workshop-grades-1-4-7fee8835a624",
    "title": "Ontario Tech Coding Workshop, Grades 1-4",
    "organization": "Oshawa Public Libraries",
    "description": "Ontario Tech Coding Workshop, Grades 1-4 from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 6,
    "ageMax": 10,
    "category": "Coding & Robotics",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-07-23T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd24a9c1cf6f9a7585104c",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
    "status": "needs_review",
    "tags": [
      "coding & robotics",
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
    "id": "discovered-oshawa-library-stem-little-mariners-7ef53c38fe15",
    "title": "Little Mariners",
    "organization": "Oshawa Public Libraries",
    "description": "Little Mariners from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-07-23T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd2d71c1cf6f9a75851293",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
    "id": "discovered-oshawa-library-stem-durham-college-e69028991740",
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
    "startDate": "2026-07-23T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a15b5f143b41b3d006925d7",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
    "startDate": "2026-07-23T09:00:00-04:00",
    "sourceUrl": "https://oshawalibrary.ca/technology/makerspace",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
    "startDate": "2026-07-23T09:00:00-04:00",
    "sourceUrl": "https://oshawalibrary.ca/volunteer",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
    "startDate": "2026-07-23T09:00:00-04:00",
    "sourceUrl": "https://www.mississauga.ca/library/library-jobs-and-volunteer",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
    "startDate": "2026-07-23T09:00:00-04:00",
    "sourceUrl": "https://app.betterimpact.com/PublicEnterprise/e3200288-2b64-4ed8-a26d-5bd0f4c5170b",
    "lastChecked": "2026-07-23",
    "lastSeen": "2026-07-23",
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
  }
] satisfies DiscoveredOpportunity[];
