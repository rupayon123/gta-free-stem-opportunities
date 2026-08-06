import type { DiscoveredOpportunity } from "./discovery";

export const generatedDiscoverySummary = {
  "mode": "deterministic",
  "sourcesChecked": 30,
  "candidatesFound": 335,
  "newCandidates": 75,
  "duplicatesSkipped": 57,
  "warnings": [],
  "sourceHealth": {
    "schemaVersion": 1,
    "generatedAt": "2026-08-06T16:54:27.231Z",
    "status": "healthy",
    "failureReasons": [],
    "sourcesChecked": 30,
    "successfulSources": 30,
    "failedSources": 0,
    "sourceSuccessRatio": 1,
    "minimumSourceSuccessRatio": 0.75
  }
} as const;

export const generatedDiscoveryReviewCandidates = [
  {
    "id": "discovered-tpl-events-volunteer-summer-camp-for-newcomer-youth-def034e694c9",
    "title": "Summer Camp for Newcomer Youth",
    "organization": "Toronto Public Library",
    "description": "Join our free Summer Camp for newcomer youth ages 14-18. Participants should expect: Art and creative activities, Employment workshops, Field trips and volunteer hours. Snacks, refreshments and Lunch are provided. Questions? Contact Nasim: 647-332-5711 or email nzand@nych.ca In partnership with Immigration, Refugees and Citizenship Canada, North York Community House & Toronto Public Library. North York Community House is solely responsible for the protection of personal information collected through the program registration process.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 14,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-07-13T09:30:00-04:00",
    "startDate": "2026-07-13T09:30:00-04:00",
    "endDate": "2026-08-21T15:00:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6a6e59f124cc9f017dda3d86",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "active",
    "tags": [
      "volunteer hours",
      "volunteer",
      "youth"
    ],
    "confidence": "high",
    "reviewReasons": [],
    "sourceName": "Toronto Public Library youth volunteer events"
  },
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/volunteer",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "volunteer"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Vaughan Public Libraries programs"
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
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/programs/category/40",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Vaughan Public Libraries programs"
  },
  {
    "id": "discovered-vaughan-library-programs-learn-to-code-with-codecombat-5ec0c998f6a7",
    "title": "Learn to Code With CodeCombat!",
    "organization": "Vaughan Public Libraries",
    "description": "Learn to Code With CodeCombat! listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3584",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "stem"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.rhpl.ca/working-with-the-library/volunteer-opportunities",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Richmond Hill Public Library programs"
  },
  {
    "id": "discovered-aurora-library-stem-intro-to-3d-sculpting-f9b61f9317dc",
    "title": "Intro to 3D Sculpting",
    "organization": "Aurora Public Library",
    "description": "Learn how to create basic 3D models with SculptGL, a free web-based 3D sculpting tool. Basic computer knowledge and skills are required for attendance. Please note that spots will be prioritized for first-time attendees. teen/adult program 13+",
    "city": "Aurora",
    "region": "York",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Makerspace & Fabrication",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-08-06T14:30:00-04:00",
    "startDate": "2026-08-06T14:30:00-04:00",
    "endDate": "2026-08-06T16:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/events/6a14888da99bdd027d42cf82",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "active",
    "tags": [
      "makerspace & fabrication"
    ],
    "confidence": "high",
    "reviewReasons": [],
    "sourceName": "Aurora Public Library STEM events"
  },
  {
    "id": "discovered-aurora-library-stem-stem-yarn-art-ages-4-7-presented-by-stem-m-3a5dc0ceb70c",
    "title": "STEM Yarn Art (ages 4-7) Presented by STEM Minds",
    "organization": "Aurora Public Library",
    "description": "STEM Yarn Art invites children to explore creativity, imagination, and hands-on learning through colourful yarn-based designs. In this engaging activity, the participants develop fine motor skills and hand–eye coordination while experimenting with patterns, textures, and shapes. They will take home their own unique yarn art creation, blending art and STEM in a fun and playful way. This program is for children ages 4-7.",
    "city": "Aurora",
    "region": "York",
    "ageMin": 4,
    "ageMax": 7,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-08-06T17:30:00-04:00",
    "startDate": "2026-08-06T17:30:00-04:00",
    "endDate": "2026-08-06T18:30:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/events/6a5a62f4daaaf4f51a20133d",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "active",
    "tags": [
      "science & engineering",
      "stem"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://aurorapl.ca/volunteers",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://ajaxlibrary.ca/Makerspace",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "makerspace & fabrication"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/resources/science-technology",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "technology"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/makerspace",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "makerspace & fabrication",
      "technology",
      "maker"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://pickering.bibliocommons.com/v2/list/display/1491301049/3037093477",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "stem",
      "technology"
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
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd02d3c1cf6f9a75850754",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering"
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
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/69dd0b47b6c4ac1fedcc079e",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "teen"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Oshawa Public Libraries STEM events"
  },
  {
    "id": "discovered-oshawa-library-stem-scientists-in-school-ewww-that-science-is--f90c808869c3",
    "title": "Scientists in School: Ewww...that Science is Gross!",
    "organization": "Oshawa Public Libraries",
    "description": "Scientists in School: Ewww...that Science is Gross! from Oshawa Public Libraries STEM events.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://oshlib.bibliocommons.com/events/6a1dd159bd892a0672e6f163",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "science"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://oshawalibrary.ca/technology/makerspace",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "makerspace & fabrication"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "http://www.cplma.ca/learning-technology",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "stem",
      "technology"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "http://www.cplma.ca/learning-technology/computers-and-internet-access",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "stem"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "http://www.cplma.ca/learning-technology/makers-space-the-studio",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "makerspace & fabrication"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "http://www.cplma.ca/about-us/jobs-and-volunteering",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
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
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.cplma.ca/programs-services/reading-and-math-buddies",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.mississauga.ca/library/library-jobs-and-volunteer",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "volunteer"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Mississauga Library volunteer opportunities"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://app.betterimpact.com/PublicEnterprise/EnterpriseSearch?EnterpriseGuid=e3200288-2b64-4ed8-a26d-5bd0f4c5170b&SearchType=OrganizationClassification&SearchId=9624",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
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
    "sourceName": "Mississauga Library volunteer opportunities"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca/volunteer-opportunities",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "volunteer"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "stem"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca/computer-services",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "stem"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.hhpl.ca/services/technology-resources",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "stem",
      "technology"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.hhpl.ca/computers",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "stem"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Halton Hills Public Library programs"
  },
  {
    "id": "discovered-cvc-youth-conservation-youth-corps-cyc-db9075c7642f",
    "title": "Conservation Youth Corps (CYC)",
    "organization": "Credit Valley Conservation",
    "description": "Conservation Youth Corps is an opportunity for teen volunteers to participate in environmental stewardship projects and earn volunteer hours.",
    "city": "Mississauga",
    "region": "Peel",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://cvc.ca/discover-our-parks/get-involved/conservation-youth-corps",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "youth",
      "conservation",
      "volunteer"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Credit Valley Conservation youth opportunities"
  },
  {
    "id": "discovered-cvc-youth-volunteer-with-us-82fdd6348cc9",
    "title": "Volunteer with Us",
    "organization": "Credit Valley Conservation",
    "description": "Volunteer with Us listed by Credit Valley Conservation youth opportunities.",
    "city": "Mississauga",
    "region": "Peel",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://cvc.ca/events",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "volunteer"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Credit Valley Conservation youth opportunities"
  },
  {
    "id": "discovered-cvc-youth-electrofishing-volunteer-day-registration--a665a21f453a",
    "title": "Electrofishing Volunteer Day – Registration Full Aug 13",
    "organization": "Credit Valley Conservation",
    "description": "Electrofishing Volunteer Day – Registration Full Aug 13 listed by Credit Valley Conservation youth opportunities.",
    "city": "Mississauga",
    "region": "Peel",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://cvc.ca/event/electrofishing-volunteer-day-32",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "volunteer"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Credit Valley Conservation youth opportunities"
  },
  {
    "id": "discovered-cvc-youth-credit-valley-conservation-and-the-greenbe-e9617e6953d9",
    "title": "Credit Valley Conservation and the Greenbelt Foundation Partner to Support Youth Environmental Action in the Greenbelt",
    "organization": "Credit Valley Conservation",
    "description": "Credit Valley Conservation and the Greenbelt Foundation Partner to Support Youth Environmental Action in the Greenbelt listed by Credit Valley Conservation youth opportunities.",
    "city": "Mississauga",
    "region": "Peel",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://cvc.ca/news/credit-valley-conservation-and-the-greenbelt-foundation-partner-to-support-youth-environmental-action-in-the-greenbelt",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "youth",
      "conservation"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Credit Valley Conservation youth opportunities"
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
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://trca.ca/get-involved/youth-opportunities",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "youth",
      "conservation"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://trca.ca/get-involved/volunteer",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "volunteer"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://trca.ca/learning/adult/young-conservation-professionals",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "conservation"
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
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "stem"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/volunteer-spotlight",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/volunteers",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
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
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/upcoming/stem-talks-2025-overview",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "stem"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "UHN STEM Pathways"
  },
  {
    "id": "discovered-volunteer-mbc-youth-learning-centre-3de7bf8325ab",
    "title": "Learning Centre",
    "organization": "Volunteer MBC",
    "description": "Learning Centre from Volunteer MBC youth opportunities.",
    "city": "Mississauga",
    "region": "Peel",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://volunteermbc.org/events/category/learning-centre",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Volunteer MBC youth opportunities"
  },
  {
    "id": "discovered-volunteer-mbc-youth-volunteer-mbc-care-community-connection-de9216e03693",
    "title": "Volunteer MBC – Care. Community. Connection.",
    "organization": "Volunteer MBC",
    "description": "Volunteer MBC – Care. Community. Connection. from Volunteer MBC youth opportunities.",
    "city": "Mississauga",
    "region": "Peel",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.volunteermbc.org",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours",
      "volunteer"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Volunteer MBC youth opportunities"
  },
  {
    "id": "discovered-volunteer-mbc-youth-volunteers-686021394b9a",
    "title": "Volunteers",
    "organization": "Volunteer MBC",
    "description": "Volunteers listed by Volunteer MBC youth opportunities.",
    "city": "Mississauga",
    "region": "Peel",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://volunteermbc.org/i-want-to-volunteer",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Volunteer MBC youth opportunities"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering",
      "stem"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.engineering.utoronto.ca",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/about-us",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/pre-university-programs/high-school-program/create",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/pre-university-programs/elementary/ready-set-code",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/pre-university-programs/elementary/engineering-discovery-day",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/about-us/volunteer-opportunities",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://data.viceprovoststudents.utoronto.ca",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/index.php",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/outreach-supporters.php",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/in-the-community.php",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Ontario Tech Engineering Outreach"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-junior-robotics-and-automation-lab-92a2a37ec79c",
    "title": "Junior Robotics and Automation Lab",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Junior Robotics and Automation Lab listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Coding & Robotics",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://form.jotform.com/262024827303248",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "coding & robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Ontario Tech Engineering Outreach"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-intermediate-robotics-and-automation-lab-447c6d6e191b",
    "title": "Intermediate Robotics and Automation Lab",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Intermediate Robotics and Automation Lab listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Coding & Robotics",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://form.jotform.com/262044502244244",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "coding & robotics"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Ontario Tech Engineering Outreach"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-code-your-canvas-a0d7b5deb938",
    "title": "Code Your Canvas",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Code Your Canvas listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://form.jotform.com/262024693453255",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Ontario Tech Engineering Outreach"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-inside-engineering-767d7b98d1cf",
    "title": "Inside Engineering",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Inside Engineering listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://form.jotform.com/262074762834260",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "engineering"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/volunteer.php",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "volunteer hours"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Ontario Tech Engineering Outreach"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-visions-of-science-2026-stem-futures-expo-57e2b5c381c6",
    "title": "Visions of Science: 2026 STEM Futures Expo",
    "organization": "Eventbrite public event search",
    "description": "Visions of Science: 2026 STEM Futures Expo listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/visions-of-science-2026-stem-futures-expo-registration-1993012567239?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "science"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-toronto-youth-stem-and-innovation-conferen-01b7759b0979",
    "title": "Toronto Youth STEM and Innovation Conference (TYSIC)",
    "organization": "Eventbrite public event search",
    "description": "Toronto Youth STEM and Innovation Conference (TYSIC) listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/toronto-youth-stem-and-innovation-conference-tysic-tickets-1981276214492?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/designing-science-innovations-in-health-research-fall-2026-tickets-1990783742765?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "science"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-learn-to-code-with-codecombat-365d8d90f25c",
    "title": "Learn to Code with CodeCombat!",
    "organization": "Eventbrite public event search",
    "description": "Learn to Code with CodeCombat! listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/learn-to-code-with-codecombat-registration-1992829862765?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-science-campus-tour-c58eb03fb619",
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/science-campus-tour-tickets-1989385702188?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "science"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-pump-student-stem-fair-50dfa77735c3",
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/pump-student-stem-fair-tickets-1996182983038?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-interpreting-pre-existing-sex-and-gender-d-c1b56b3f431f",
    "title": "Interpreting Pre-Existing Sex and Gender Data",
    "organization": "Eventbrite public event search",
    "description": "Interpreting Pre-Existing Sex and Gender Data listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.com/e/interpreting-pre-existing-sex-and-gender-data-tickets-1993461925281?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-ai-engineering-summit-toronto-2026-71a16dbeb045",
    "title": "AI Engineering Summit | Toronto | 2026",
    "organization": "Eventbrite public event search",
    "description": "AI Engineering Summit | Toronto | 2026 listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "AI & Digital Media",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.com/e/ai-engineering-summit-toronto-2026-tickets-1995176894801?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "ai & digital media"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-96-ai-6-12-a82868f8a507",
    "title": "#96：为什么 AI 的窗口期还有 6–12 个月？",
    "organization": "Eventbrite public event search",
    "description": "#96：为什么 AI 的窗口期还有 6–12 个月？ listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "AI & Digital Media",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/96-ai-612-tickets-1995547469199?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "ai & digital media"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-science-tech-in-person-intermediate-level-computer-prog-0b63077d0cf3",
    "title": "In Person Intermediate Level Computer Program Monday Afternoons",
    "organization": "Eventbrite public event search",
    "description": "In Person Intermediate Level Computer Program Monday Afternoons listed by Eventbrite free science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/e/in-person-intermediate-level-computer-program-monday-afternoons-tickets-1994870483316?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-online-science-tech-live-demo-meet-agent-swarms-a-team-of-ai-a-cff71c6945fb",
    "title": "Live Demo: Meet Agent Swarms, A Team of AI Agents Working Together",
    "organization": "Eventbrite public event search",
    "description": "Live Demo: Meet Agent Swarms, A Team of AI Agents Working Together listed by Eventbrite free online science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "AI & Digital Media",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.com/e/live-demo-meet-agent-swarms-a-team-of-ai-agents-working-together-tickets-1992778658612?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "ai & digital media"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free online science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-online-science-tech-ai-and-your-u3a-what-you-can-do-what-issue-6fbee0150369",
    "title": "AI and your u3a - what you can do, what issues AI raises",
    "organization": "Eventbrite public event search",
    "description": "AI and your u3a - what you can do, what issues AI raises listed by Eventbrite free online science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "AI & Digital Media",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.co.uk/e/ai-and-your-u3a-what-you-can-do-what-issues-ai-raises-tickets-1992121232232?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "ai & digital media"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free online science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-online-science-tech-free-ai-data-engineering-bootcamp-usa-only-bf05b5ddfcc3",
    "title": "FREE AI Data Engineering Bootcamp | USA Only | Join WhatsApp Group",
    "organization": "Eventbrite public event search",
    "description": "FREE AI Data Engineering Bootcamp | USA Only | Join WhatsApp Group listed by Eventbrite free online science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "AI & Digital Media",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.com/e/free-ai-data-engineering-bootcamp-usa-only-join-whatsapp-group-tickets-1992777462033?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "ai & digital media",
      "free"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free online science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-online-science-tech-social-media-seo-made-simple-reaching-audi-46af0702d7df",
    "title": "Social media SEO made simple: Reaching audiences, algorithms and AI",
    "organization": "Eventbrite public event search",
    "description": "Social media SEO made simple: Reaching audiences, algorithms and AI listed by Eventbrite free online science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "AI & Digital Media",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.co.uk/e/social-media-seo-made-simple-reaching-audiences-algorithms-and-ai-tickets-1993835435460?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "ai & digital media"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free online science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-online-science-tech-cutting-through-the-noise-nutrition-ai-and-126ed720b765",
    "title": "Cutting Through the Noise: Nutrition, AI and Credible Guidance",
    "organization": "Eventbrite public event search",
    "description": "Cutting Through the Noise: Nutrition, AI and Credible Guidance listed by Eventbrite free online science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "AI & Digital Media",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.com/e/cutting-through-the-noise-nutrition-ai-and-credible-guidance-registration-1993870968741?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "ai & digital media"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free online science and technology events"
  },
  {
    "id": "discovered-eventbrite-free-online-science-tech-ai-fundamentals-bootcamp-84714a5a27d4",
    "title": "AI Fundamentals Bootcamp",
    "organization": "Eventbrite public event search",
    "description": "AI Fundamentals Bootcamp listed by Eventbrite free online science and technology events.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "AI & Digital Media",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.com/e/ai-fundamentals-bootcamp-tickets-1991242689487?aff=ebdssbdestsearch",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "ai & digital media"
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
    "startDate": "2026-08-06T09:00:00-04:00",
    "sourceUrl": "https://www.eventbrite.ca/d/online/hackathon",
    "lastChecked": "2026-08-06",
    "lastSeen": "2026-08-06",
    "status": "needs_review",
    "tags": [
      "hackathons & competitions",
      "hackathon"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Source is a broad public event index, so official provider confirmation is needed."
    ],
    "sourceName": "Eventbrite free online science and technology events"
  }
] satisfies DiscoveredOpportunity[];
