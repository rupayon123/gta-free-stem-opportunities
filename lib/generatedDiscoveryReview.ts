import type { DiscoveredOpportunity } from "./discovery";

export const generatedDiscoverySummary = {
  "mode": "deterministic",
  "sourcesChecked": 30,
  "candidatesFound": 273,
  "newCandidates": 29,
  "duplicatesSkipped": 75,
  "warnings": [
    "Could not check Credit Valley Conservation youth opportunities: 403 Forbidden.",
    "Could not check Volunteer MBC youth opportunities: 403 Forbidden.",
    "Could not check Eventbrite free science and technology events: 405 Not Allowed.",
    "Could not check Eventbrite free online science and technology events: 405 Not Allowed."
  ]
} as const;

export const generatedDiscoveryReviewCandidates = [
  {
    "id": "discovered-tpl-events-stem-logics-academy-stem-camp-52b0bec496ea",
    "title": "Logics Academy STEM Camp",
    "organization": "Toronto Public Library",
    "description": "Spark creativity, critical thinking, and problem-solving skills through interactive activities in robotics, coding, and STEM challenges. Explore STEM concepts through real-world challenges, develop coding skills using block-based and text-based programming, and collaborate to solve problems and think like engineers. No prior experience is needed—just curiosity and a love for discovery! This program will run for four days from July 27th to July 30th, from 1pm - 3pm. Children must be available to attend all four days. Program is suitable for ages 6 to 8 years old.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 6,
    "ageMax": 8,
    "category": "Coding & Robotics",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-07-27T13:00:00-04:00",
    "startDate": "2026-07-27T13:00:00-04:00",
    "endDate": "2026-07-30T15:00:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6a3acf1b3efcc843503590a1",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
    "status": "active",
    "tags": [
      "coding & robotics",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/programs/category/40",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://www.rhpl.ca/working-with-the-library/volunteer-opportunities",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "id": "discovered-aurora-library-stem-teen-summer-reading-challenge-2026-09e2060f3588",
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
    "sourceUrl": "https://aurora.bibliocommons.com/events/6933515b94297d36009e7d53",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "id": "discovered-aurora-library-volunteers-volunteers-9a6997e9e36a",
    "title": "Volunteers",
    "organization": "Aurora Public Library",
    "description": "Volunteering at the Library Volunteering can be a great way to build experience, learn new skills, connect with others and give&hellip;",
    "city": "Aurora",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://aurorapl.ca/volunteers",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "id": "discovered-whitby-programs-ontario-tech-stem-workshop-f2115d8bbfe8",
    "title": "Ontario Tech STEM Workshop",
    "organization": "Whitby Public Library",
    "description": "Ontario Tech STEM Workshop listed by Whitby Public Library programs.",
    "city": "Whitby",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://whitbylibrary.libcal.com/event/4014091",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
    "status": "needs_review",
    "tags": [
      "stem",
      "coding",
      "science",
      "technology",
      "girls in stem"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Whitby Public Library programs"
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://ajaxlibrary.ca/Makerspace",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "id": "discovered-pickering-library-tech-ai-series-prompt-engineering-77c16b9c99b0",
    "title": "AI Series: Prompt Engineering",
    "organization": "Pickering Public Library",
    "description": "AI Series: Prompt Engineering listed by Pickering Public Library technology events.",
    "city": "Pickering",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://cal.pickeringlibrary.ca/event/ai-series-prompt-engineering-how-construct-perfect-prompt-get-most-out-ai-49319",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/explore/?programs=computers-and-technology",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd02d3c1cf6f9a75850754",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd0b47b6c4ac1fedcc079e",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd1476e2a2952aed0e7278",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "id": "discovered-oshawa-library-stem-ocean-sensory-playtime-7bca49410939",
    "title": "Ocean Sensory Playtime",
    "organization": "Oshawa Public Libraries",
    "description": "Ocean Sensory Playtime from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd31a0c1cf6f9a75851461",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "id": "discovered-oshawa-library-stem-the-reading-reef-ca8ca32fbfc0",
    "title": "The Reading Reef",
    "organization": "Oshawa Public Libraries",
    "description": "The Reading Reef from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd2f60c1cf6f9a7585137a",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "id": "discovered-oshawa-library-stem-hands-on-exotics-giant-snake-friends-6df3914d39c2",
    "title": "Hands-On Exotics: Giant Snake & Friends",
    "organization": "Oshawa Public Libraries",
    "description": "Hands-On Exotics: Giant Snake & Friends from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd31e3b6c4ac1fedcc15be",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "id": "discovered-oshawa-library-stem-creative-writing-circle-97d10304b0ee",
    "title": "Creative Writing Circle",
    "organization": "Oshawa Public Libraries",
    "description": "Creative Writing Circle from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd0a8ab6c4ac1fedcc078b",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://oshawalibrary.ca/technology/makerspace",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://oshawalibrary.ca/volunteer",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "id": "discovered-clarington-library-programs-engineering-outreach-workshops-stem-c528556581d1",
    "title": "Engineering Outreach Workshops: STEM",
    "organization": "Clarington Library, Museums & Archives",
    "description": "Engineering Outreach Workshops: STEM listed by Clarington Library programs.",
    "city": "Clarington",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://events.cplma.ca/default/detail/2026-07-29-1000-Engineering-Outreach-Workshops-STEM",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://www.mississauga.ca/library/library-jobs-and-volunteer",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://app.betterimpact.com/PublicEnterprise/e3200288-2b64-4ed8-a26d-5bd0f4c5170b",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://www.engineering.utoronto.ca",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/about-us",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/pre-university-programs/high-school-program/create",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/pre-university-programs/elementary/ready-set-code",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/pre-university-programs/elementary/engineering-discovery-day",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/about-us/volunteer-opportunities",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
    "startDate": "2026-07-29T09:00:00-04:00",
    "sourceUrl": "https://data.viceprovoststudents.utoronto.ca",
    "lastChecked": "2026-07-29",
    "lastSeen": "2026-07-29",
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
  }
] satisfies DiscoveredOpportunity[];
