import type { DiscoveredOpportunity } from "./discovery";

export const generatedDiscoverySummary = {
  "mode": "deterministic",
  "sourcesChecked": 30,
  "candidatesFound": 277,
  "newCandidates": 53,
  "duplicatesSkipped": 36,
  "warnings": [
    "Could not check Credit Valley Conservation youth opportunities: 403 Forbidden.",
    "Could not check Volunteer MBC youth opportunities: 403 Forbidden.",
    "Could not check Eventbrite free science and technology events: 405 Not Allowed.",
    "Could not check Eventbrite free online science and technology events: 405 Not Allowed."
  ],
  "sourceHealth": {
    "schemaVersion": 1,
    "generatedAt": "2026-09-20T20:51:54.195Z",
    "status": "healthy",
    "failureReasons": [],
    "sourcesChecked": 30,
    "successfulSources": 26,
    "failedSources": 4,
    "sourceSuccessRatio": 0.8667,
    "minimumSourceSuccessRatio": 0.75
  }
} as const;

export const generatedDiscoveryReviewCandidates = [
  {
    "id": "discovered-tpl-events-volunteer-set-phasers-to-celebrate-60-years-of-star--4ed8324a47c8",
    "title": "Set Phasers to Celebrate! 60 Years of Star Trek: A Merril Collection Exhibit",
    "organization": "Toronto Public Library",
    "description": "Beam yourself up to the Merril Collection of Science Fiction, Speculation and Fantasy and boldly embark on a 60-year journey that celebrates all things Star Trek! For decades, the original television series turned global franchise has inspired generations of fans, artists, and scientists alike. Visitors can explore voyages, characters, and new frontiers through our collection highlights such as novels, RPGs, fanzines, original artwork and more! This exhibit can be viewed during the Merril Collection's regular open hours.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-08-17T09:00:00-04:00",
    "startDate": "2026-08-17T09:00:00-04:00",
    "endDate": "2026-11-01T09:00:00-04:00",
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6a875a463b6c71003e5a39be",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
    "status": "active",
    "tags": [
      "science & engineering"
    ],
    "confidence": "high",
    "reviewReasons": [],
    "sourceName": "Toronto Public Library youth volunteer events"
  },
  {
    "id": "discovered-markham-events-volunteer-reading-to-success-5d5f0aa61d2d",
    "title": "Reading to Success",
    "organization": "Markham Public Library",
    "description": "Read a story with us! Reading to Success is a volunteer facilitated reading program established to motivate children to read regularly. YPAM in partnership with the Markham Public Library provides this weekly literacy program, where volunteers read grade specific books for children in Junior Kindergarten, Senior Kindergarten, Grade 1, Grade 2 and IEP kids. Make Reading to Success part of your child's reading habit and build a love of reading together. To register, please visit: https://www.ypam.ca/reading *Please note that through registering, you are giving YPAM your information.",
    "city": "Markham",
    "region": "York",
    "ageMin": 6,
    "ageMax": 12,
    "category": "Volunteer Hours",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-09-21T18:00:00-04:00",
    "startDate": "2026-09-21T18:00:00-04:00",
    "endDate": "2026-09-21T19:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/events/6a061c0e0c0f2c4503fa23fa",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
    "status": "active",
    "tags": [
      "volunteer hours",
      "volunteer"
    ],
    "confidence": "high",
    "reviewReasons": [],
    "sourceName": "Markham Public Library youth volunteer events"
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/volunteer",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "id": "discovered-vaughan-library-programs-steam-club-for-homeschoolers-b635f95e3074",
    "title": "STEAM Club for Homeschoolers",
    "organization": "Vaughan Public Libraries",
    "description": "STEAM Club for Homeschoolers listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/programs/view/2484",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "id": "discovered-vaughan-library-programs-mini-robotics-club-4b63efc79fb0",
    "title": "Mini Robotics Club",
    "organization": "Vaughan Public Libraries",
    "description": "Mini Robotics Club listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Coding & Robotics",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3971",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
    "status": "needs_review",
    "tags": [
      "coding & robotics",
      "robotics"
    ],
    "confidence": "high",
    "reviewReasons": [
      "No clear future date found on the crawled page."
    ],
    "sourceName": "Vaughan Public Libraries programs"
  },
  {
    "id": "discovered-vaughan-library-programs-kitchen-steam-club-d71a1b111f79",
    "title": "Kitchen STEAM Club",
    "organization": "Vaughan Public Libraries",
    "description": "Kitchen STEAM Club listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/programs/view/4049",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "id": "discovered-vaughan-library-programs-coding-buddies-5aee8640a30f",
    "title": "Coding Buddies",
    "organization": "Vaughan Public Libraries",
    "description": "Coding Buddies listed by Vaughan Public Libraries programs.",
    "city": "Vaughan",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Coding & Robotics",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/programs/view/3085",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
    "status": "needs_review",
    "tags": [
      "coding & robotics",
      "coding"
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://www.rhpl.ca/working-with-the-library/volunteer-opportunities",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "id": "discovered-aurora-library-stem-maker-workshop-layered-art-1432ede1dfd4",
    "title": "Maker Workshop: Layered Art",
    "organization": "Aurora Public Library",
    "description": "Learn how to create multi-layered artwork using Adobe Illustrator and a laser cutter. All materials will be provided. Basic computer knowledge and skills are required for attendance. Please note that spots will be prioritized for first-time attendees. teen/adult program 13+",
    "city": "Aurora",
    "region": "York",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Makerspace & Fabrication",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-09-21T18:00:00-04:00",
    "startDate": "2026-09-21T18:00:00-04:00",
    "endDate": "2026-09-21T20:00:00-04:00",
    "sourceUrl": "https://aurora.bibliocommons.com/events/6a563acefb418a28009ad5b6",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
    "status": "active",
    "tags": [
      "makerspace & fabrication",
      "maker"
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://aurorapl.ca/volunteers",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://ajaxlibrary.ca/Makerspace",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/resources/science-technology",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/makerspace",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "id": "discovered-pickering-library-tech-developing-responsible-technology-4c170fc272c9",
    "title": "Developing Responsible Technology",
    "organization": "Pickering Public Library",
    "description": "Developing Responsible Technology listed by Pickering Public Library technology events.",
    "city": "Pickering",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "STEM",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://pickering.bibliocommons.com/v2/list/display/1491301049/3106000637",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/explore/?programs=computers-and-technology",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
    "status": "needs_review",
    "tags": [
      "stem",
      "technology",
      "computers"
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://pickering.bibliocommons.com/v2/list/display/1491301049/3037093477",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://oshawalibrary.ca/technology/makerspace",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "http://www.cplma.ca/learning-technology",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "http://www.cplma.ca/learning-technology/computers-and-internet-access",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "http://www.cplma.ca/learning-technology/makers-space-the-studio",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "http://www.cplma.ca/about-us/jobs-and-volunteering",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://www.cplma.ca/programs-services/reading-and-math-buddies",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://www.mississauga.ca/library/library-jobs-and-volunteer",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://app.betterimpact.com/PublicEnterprise/EnterpriseSearch?EnterpriseGuid=e3200288-2b64-4ed8-a26d-5bd0f4c5170b&SearchType=OrganizationClassification&SearchId=9624",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca/volunteer-opportunities",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca/computer-services",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://www.hhpl.ca/services/technology-resources",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://www.hhpl.ca/computers",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://trca.ca/get-involved/youth-opportunities",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://trca.ca/get-involved/volunteer",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://trca.ca/learning/adult/young-conservation-professionals",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/volunteer-spotlight",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/volunteers",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "id": "discovered-uhn-stem-pathways-stem-talks-world-heart-day-sep-28-5-6pm-f0c3a4c8f723",
    "title": "STEM Talks - World Heart Day - Sep 28, 5-6pm",
    "organization": "UHN STEM Pathways",
    "description": "STEM Talks - World Heart Day - Sep 28, 5-6pm listed by UHN STEM Pathways.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/upcoming/world-heart-day-2026",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "id": "discovered-uhn-stem-pathways-upcoming-stem-talks-2026-27-0c5834151a27",
    "title": "Upcoming STEM Talks - 2026/27",
    "organization": "UHN STEM Pathways",
    "description": "Upcoming STEM Talks - 2026/27 listed by UHN STEM Pathways.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/upcoming",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://www.engineering.utoronto.ca",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/about-us",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/pre-university-programs/high-school-program/create",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/pre-university-programs/elementary/ready-set-code",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/pre-university-programs/elementary/engineering-discovery-day",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/about-us/volunteer-opportunities",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://data.viceprovoststudents.utoronto.ca",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/index.php",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/outreach-supporters.php",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/in-the-community.php",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "id": "discovered-ontario-tech-engineering-outreach-black-youth-coding-club-5623ef1ddc63",
    "title": "Black Youth Coding Club",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Black Youth Coding Club listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Coding & Robotics",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://forms.gle/5Y7pZiQ7tZEa1vnQ6",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
    "status": "needs_review",
    "tags": [
      "coding & robotics",
      "coding",
      "youth"
    ],
    "confidence": "medium",
    "reviewReasons": [
      "No clear future date found on the crawled page.",
      "Free access wording needs human confirmation."
    ],
    "sourceName": "Ontario Tech Engineering Outreach"
  },
  {
    "id": "discovered-ontario-tech-engineering-outreach-black-youth-stem-club-a9b4220dac73",
    "title": "Black Youth STEM Club",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Black Youth STEM Club listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 13,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://forms.gle/wXnD2K9nVE3wvLvN9",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "stem",
      "youth"
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://form.jotform.com/262074762834260",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "id": "discovered-ontario-tech-engineering-outreach-traditional-medicines-and-stem-day-80f0e9b82418",
    "title": "Traditional Medicines and STEM Day",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Traditional Medicines and STEM Day listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://forms.gle/bDWdmyHJ4pVqsxpy5",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
    "startDate": "2026-09-20T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/volunteer.php",
    "lastChecked": "2026-09-20",
    "lastSeen": "2026-09-20",
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
  }
] satisfies DiscoveredOpportunity[];
