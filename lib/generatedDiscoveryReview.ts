import type { DiscoveredOpportunity } from "./discovery";

export const generatedDiscoverySummary = {
  "mode": "deterministic",
  "sourcesChecked": 30,
  "candidatesFound": 232,
  "newCandidates": 44,
  "duplicatesSkipped": 23,
  "warnings": [
    "Could not check Credit Valley Conservation youth opportunities: 403 Forbidden.",
    "Could not check TRCA youth volunteer opportunities: fetch failed.",
    "Could not check Volunteer MBC youth opportunities: 403 Forbidden.",
    "Could not check Eventbrite free science and technology events: 405 Not Allowed.",
    "Could not check Eventbrite free online science and technology events: 405 Not Allowed."
  ],
  "sourceHealth": {
    "schemaVersion": 1,
    "generatedAt": "2026-10-27T22:18:53.365Z",
    "status": "healthy",
    "failureReasons": [],
    "sourcesChecked": 30,
    "successfulSources": 25,
    "failedSources": 5,
    "sourceSuccessRatio": 0.8333,
    "minimumSourceSuccessRatio": 0.75
  }
} as const;

export const generatedDiscoveryReviewCandidates = [
  {
    "id": "discovered-tpl-events-volunteer-set-phasers-to-celebrate-60-years-of-star--b066b1fadb45",
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
    "sourceUrl": "https://tpl.bibliocommons.com/v2/events/6abef55ac6cddb0045955ec1",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
    "status": "needs_review",
    "tags": [
      "science & engineering"
    ],
    "confidence": "high",
    "reviewReasons": [],
    "sourceName": "Toronto Public Library youth volunteer events"
  },
  {
    "id": "discovered-markham-events-stem-steam-drop-in-2070122b48d1",
    "title": "STEAM Drop-In",
    "organization": "Markham Public Library",
    "description": "Join us anytime between 6:30 - 7:30 PM to explore all things STEAM (Science, Technology, Engineering, Arts, and Math). This drop-in program is designed for families to get curious and creative together!",
    "city": "Markham",
    "region": "York",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "deadline": "2026-10-28T18:30:00-04:00",
    "startDate": "2026-10-28T18:30:00-04:00",
    "endDate": "2026-10-28T19:30:00-04:00",
    "sourceUrl": "https://markham.bibliocommons.com/v2/events/6a72559f88e9bf2800358304",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
    "status": "needs_review",
    "tags": [
      "science & engineering",
      "steam"
    ],
    "confidence": "high",
    "reviewReasons": [],
    "sourceName": "Markham Public Library events"
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://www.vaughanpl.info/volunteer",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://www.rhpl.ca/working-with-the-library/volunteer-opportunities",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://aurorapl.ca/volunteers",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "id": "discovered-ajax-library-stem-makerspace-33a7bf527381",
    "title": "Makerspace",
    "organization": "Ajax Public Library",
    "description": "Makerspace listed by Ajax Public Library STEM events.",
    "city": "Ajax",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Makerspace & Fabrication",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://ajaxlibrary.ca/Makerspace",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/resources/science-technology",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/makerspace",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://pickering.bibliocommons.com/v2/list/display/1491301049/3106000637",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://pickeringlibrary.ca/explore/?programs=computers-and-technology",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://pickering.bibliocommons.com/v2/list/display/1491301049/3037093477",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://oshawalibrary.ca/technology/makerspace",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "id": "discovered-clarington-library-programs-learning-technology-ef1f52444b44",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://www.cplma.ca/learning-technology",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "id": "discovered-clarington-library-programs-computers-internet-access-541dee3079cc",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://www.cplma.ca/learning-technology/computers-and-internet-access",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "id": "discovered-clarington-library-programs-maker-s-space-73692ec01a1b",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://www.cplma.ca/learning-technology/makers-space-the-studio",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "id": "discovered-clarington-library-programs-jobs-volunteering-812e9b03cdd9",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://www.cplma.ca/about-us/jobs-and-volunteering",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://www.cplma.ca/programs-services/reading-and-math-buddies",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://www.mississauga.ca/library/library-jobs-and-volunteer",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://app.betterimpact.com/PublicEnterprise/EnterpriseSearch?EnterpriseGuid=e3200288-2b64-4ed8-a26d-5bd0f4c5170b&SearchType=OrganizationClassification&SearchId=9624",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca/volunteer-opportunities",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://beinspired.ca/computer-services",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://www.hhpl.ca/services/technology-resources",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://www.hhpl.ca/computers",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/volunteer-spotlight",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/volunteers",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "id": "discovered-uhn-stem-pathways-stem-talks-stem-cells-oct-28-6-7pm-8e5c1e8b5bbd",
    "title": "STEM Talks - Stem Cells - Oct 28, 6-7pm",
    "organization": "UHN STEM Pathways",
    "description": "STEM Talks - Stem Cells - Oct 28, 6-7pm listed by UHN STEM Pathways.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/upcoming/stemcells-2026",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "id": "discovered-uhn-stem-pathways-stem-talks-healthcare-technology-nov-10-5--b204073882ee",
    "title": "STEM Talks - Healthcare Technology - Nov 10, 5-6pm",
    "organization": "UHN STEM Pathways",
    "description": "STEM Talks - Healthcare Technology - Nov 10, 5-6pm listed by UHN STEM Pathways.",
    "city": "Toronto",
    "region": "Toronto",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/upcoming/healthcare-tech",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "id": "discovered-uhn-stem-pathways-upcoming-stem-talks-2026-27-795e0fafab6e",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://uhnstempathways.ca/upcoming/stem-talks-2026-overview",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://www.engineering.utoronto.ca",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/about-us",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/pre-university-programs/high-school-program/create",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/pre-university-programs/elementary/engineering-discovery-day",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://outreach.engineering.utoronto.ca/about-us/volunteer-opportunities",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://data.viceprovoststudents.utoronto.ca",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/index.php",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/outreach-supporters.php",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/in-the-community.php",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "id": "discovered-ontario-tech-engineering-outreach-black-legacy-in-stem-conference-2abd2e1ecf68",
    "title": "Black Legacy in STEM Conference",
    "organization": "Ontario Tech University Engineering Outreach",
    "description": "Black Legacy in STEM Conference listed by Ontario Tech Engineering Outreach.",
    "city": "Oshawa",
    "region": "Durham",
    "ageMin": 1,
    "ageMax": 18,
    "category": "Science & Engineering",
    "cost": "Free to join",
    "language": [
      "en"
    ],
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://forms.gle/WzJdksThPduKpCvJ6",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://form.jotform.com/262074762834260",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://forms.gle/bDWdmyHJ4pVqsxpy5",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
    "startDate": "2026-10-27T09:00:00-04:00",
    "sourceUrl": "https://engineering.ontariotechu.ca/outreach/about-us/volunteer.php",
    "lastChecked": "2026-10-27",
    "lastSeen": "2026-10-27",
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
