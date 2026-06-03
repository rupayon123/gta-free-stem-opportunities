import type { Category, LanguageCode, OpportunityStatus, Region } from "./types";

export type DiscoverySource = {
  id: string;
  name: string;
  organization: string;
  url: string;
  city?: string;
  region?: Region;
  trusted: boolean;
  sourceType: "library" | "city" | "university" | "nonprofit" | "event-search" | "community";
  keywords: string[];
};

export type DiscoveredOpportunity = {
  id: string;
  title: string;
  organization: string;
  description: string;
  city: string;
  region: Region;
  ageMin: number;
  ageMax?: number;
  category: Category;
  cost: "Free to join";
  language: LanguageCode[];
  deadline?: string;
  startDate: string;
  endDate?: string;
  sourceUrl: string;
  lastChecked: string;
  lastSeen: string;
  status: OpportunityStatus;
  tags: string[];
  confidence: "high" | "medium" | "needs_review";
  reviewReasons: string[];
  sourceName: string;
};

export const discoverySources: DiscoverySource[] = [
  {
    id: "tpl-events-stem",
    name: "Toronto Public Library events",
    organization: "Toronto Public Library",
    url: "https://tpl.bibliocommons.com/v2/events?search=STEM",
    city: "Toronto",
    region: "Toronto",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "coding", "robotics", "python", "arduino", "science", "technology"]
  },
  {
    id: "tpl-events-coding",
    name: "Toronto Public Library coding events",
    organization: "Toronto Public Library",
    url: "https://tpl.bibliocommons.com/v2/events?search=coding",
    city: "Toronto",
    region: "Toronto",
    trusted: true,
    sourceType: "library",
    keywords: ["coding", "python", "robotics", "arduino", "technology"]
  },
  {
    id: "tpl-events-volunteer",
    name: "Toronto Public Library youth volunteer events",
    organization: "Toronto Public Library",
    url: "https://tpl.bibliocommons.com/v2/events?search=volunteer%20youth",
    city: "Toronto",
    region: "Toronto",
    trusted: true,
    sourceType: "library",
    keywords: ["volunteer", "youth", "teen", "leadership", "community service"]
  },
  {
    id: "brampton-library-stem",
    name: "Brampton Library STEM events",
    organization: "Brampton Library",
    url: "https://bramlib.libnet.info/events?term=STEM",
    city: "Brampton",
    region: "Peel",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "coding", "robotics", "science", "technology", "teen"]
  },
  {
    id: "brampton-library-teen-volunteer",
    name: "Brampton Library teen volunteer events",
    organization: "Brampton Library",
    url: "https://bramlib.libnet.info/events?term=volunteer",
    city: "Brampton",
    region: "Peel",
    trusted: true,
    sourceType: "library",
    keywords: ["volunteer", "teen", "youth", "leadership", "community service"]
  },
  {
    id: "markham-events-stem",
    name: "Markham Public Library events",
    organization: "Markham Public Library",
    url: "https://markham.bibliocommons.com/v2/events?search=STEM",
    city: "Markham",
    region: "York",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "steam", "makerspace", "robotics", "coding"]
  },
  {
    id: "markham-events-volunteer",
    name: "Markham Public Library youth volunteer events",
    organization: "Markham Public Library",
    url: "https://markham.bibliocommons.com/v2/events?search=volunteer%20youth",
    city: "Markham",
    region: "York",
    trusted: true,
    sourceType: "library",
    keywords: ["volunteer", "youth", "teen", "leadership", "community service"]
  },
  {
    id: "vaughan-library-programs",
    name: "Vaughan Public Libraries programs",
    organization: "Vaughan Public Libraries",
    url: "https://www.vaughanpl.info/programs/index",
    city: "Vaughan",
    region: "York",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "coding", "robotics", "maker", "technology", "volunteer"]
  },
  {
    id: "richmond-hill-library-programs",
    name: "Richmond Hill Public Library programs",
    organization: "Richmond Hill Public Library",
    url: "https://www.rhpl.ca/programs-and-events/program-guide",
    city: "Richmond Hill",
    region: "York",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "coding", "technology", "science", "maker", "teen"]
  },
  {
    id: "aurora-library-stem",
    name: "Aurora Public Library STEM events",
    organization: "Aurora Public Library",
    url: "https://aurora.bibliocommons.com/v2/events?search=STEM",
    city: "Aurora",
    region: "York",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "creative studio", "maker", "coding", "technology", "science"]
  },
  {
    id: "aurora-library-volunteers",
    name: "Aurora Public Library volunteer opportunities",
    organization: "Aurora Public Library",
    url: "https://aurorapl.ca/volunteers/",
    city: "Aurora",
    region: "York",
    trusted: true,
    sourceType: "library",
    keywords: ["volunteer", "teen", "youth", "hours", "service", "leadership"]
  },
  {
    id: "whitby-programs",
    name: "Whitby Public Library programs",
    organization: "Whitby Public Library",
    url: "https://www.whitbylibrary.ca/programs",
    city: "Whitby",
    region: "Durham",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "coding", "science", "technology", "girls in stem"]
  },
  {
    id: "ajax-library-stem",
    name: "Ajax Public Library STEM events",
    organization: "Ajax Public Library",
    url: "https://ajaxlibrary.libnet.info/events?term=STEM",
    city: "Ajax",
    region: "Durham",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "coding", "science", "engineering", "technology", "black youth"]
  },
  {
    id: "pickering-library-tech",
    name: "Pickering Public Library technology events",
    organization: "Pickering Public Library",
    url: "https://pickeringlibrary.ca/",
    city: "Pickering",
    region: "Durham",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "technology", "maker", "computers", "coding", "youth"]
  },
  {
    id: "oshawa-library-stem",
    name: "Oshawa Public Libraries STEM events",
    organization: "Oshawa Public Libraries",
    url: "https://oshlib.ca/events/?tribe-bar-search=STEM",
    city: "Oshawa",
    region: "Durham",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "coding", "science", "technology", "teen", "volunteer"]
  },
  {
    id: "clarington-library-programs",
    name: "Clarington Library programs",
    organization: "Clarington Library, Museums & Archives",
    url: "https://www.cplma.ca/services",
    city: "Clarington",
    region: "Durham",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "science", "technology", "programs", "museum", "youth"]
  },
  {
    id: "mississauga-library-events",
    name: "Mississauga Library events",
    organization: "Mississauga Library",
    url: "https://www.mississauga.ca/library/",
    city: "Mississauga",
    region: "Peel",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "coding", "robotics", "makerspace", "technology"]
  },
  {
    id: "mississauga-library-volunteers",
    name: "Mississauga Library volunteer opportunities",
    organization: "Mississauga Library",
    url: "https://www.mississauga.ca/library/library-jobs-and-volunteer/",
    city: "Mississauga",
    region: "Peel",
    trusted: true,
    sourceType: "library",
    keywords: ["volunteer", "teen", "youth", "hours", "community service"]
  },
  {
    id: "oakville-library-programs",
    name: "Oakville Public Library programs",
    organization: "Oakville Public Library",
    url: "https://opl.ca/Programs",
    city: "Oakville",
    region: "Halton",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "coding", "technology", "makerspace", "volunteer"]
  },
  {
    id: "burlington-library-stem",
    name: "Burlington Public Library STEM events",
    organization: "Burlington Public Library",
    url: "https://attend.bpl.on.ca/events?term=STEM",
    city: "Burlington",
    region: "Halton",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "coding", "science", "engineering", "technology", "programs"]
  },
  {
    id: "milton-library-programs",
    name: "Milton Public Library programs",
    organization: "Milton Public Library",
    url: "https://beinspired.ca/",
    city: "Milton",
    region: "Halton",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "coding", "maker", "technology", "volunteer", "programs"]
  },
  {
    id: "halton-hills-library-programs",
    name: "Halton Hills Public Library programs",
    organization: "Halton Hills Public Library",
    url: "https://www.hhpl.ca/",
    city: "Halton Hills",
    region: "Halton",
    trusted: true,
    sourceType: "library",
    keywords: ["stem", "coding", "technology", "lego", "maker", "programs"]
  },
  {
    id: "cvc-youth",
    name: "Credit Valley Conservation youth opportunities",
    organization: "Credit Valley Conservation",
    url: "https://cvc.ca/discover-our-parks/get-involved/conservation-youth-corps/",
    city: "Mississauga",
    region: "Peel",
    trusted: true,
    sourceType: "nonprofit",
    keywords: ["youth", "conservation", "volunteer", "environment", "science"]
  },
  {
    id: "trca-youth",
    name: "TRCA youth volunteer opportunities",
    organization: "Toronto and Region Conservation Authority",
    url: "https://trca.ca/get-involved/youth-opportunities/",
    city: "Toronto",
    region: "Toronto",
    trusted: true,
    sourceType: "nonprofit",
    keywords: ["youth", "volunteer", "conservation", "environment", "science"]
  },
  {
    id: "uhn-stem-pathways",
    name: "UHN STEM Pathways",
    organization: "UHN STEM Pathways",
    url: "https://uhnstempathways.ca/",
    city: "Toronto",
    region: "Toronto",
    trusted: true,
    sourceType: "nonprofit",
    keywords: ["stem", "science", "health", "workshop", "underserved", "youth"]
  },
  {
    id: "volunteer-mbc-youth",
    name: "Volunteer MBC youth opportunities",
    organization: "Volunteer MBC",
    url: "https://www.volunteermbc.org/",
    city: "Mississauga",
    region: "Peel",
    trusted: false,
    sourceType: "community",
    keywords: ["volunteer", "youth", "student", "hours", "science", "technology"]
  },
  {
    id: "uoft-engineering-outreach",
    name: "University of Toronto Engineering Outreach",
    organization: "University of Toronto Engineering Outreach",
    url: "https://outreach.engineering.utoronto.ca/",
    city: "Toronto",
    region: "Toronto",
    trusted: true,
    sourceType: "university",
    keywords: ["engineering", "stem", "science", "coding", "youth", "workshop"]
  },
  {
    id: "ontario-tech-engineering-outreach",
    name: "Ontario Tech Engineering Outreach",
    organization: "Ontario Tech University Engineering Outreach",
    url: "https://engineering.ontariotechu.ca/outreach/index.php",
    city: "Oshawa",
    region: "Durham",
    trusted: true,
    sourceType: "university",
    keywords: ["engineering", "stem", "science", "coding", "youth", "workshop"]
  },
  {
    id: "eventbrite-free-science-tech",
    name: "Eventbrite free science and technology events",
    organization: "Eventbrite public event search",
    url: "https://www.eventbrite.ca/d/canada--toronto/free--science-and-tech--events/",
    city: "Toronto",
    region: "Toronto",
    trusted: false,
    sourceType: "event-search",
    keywords: ["free", "science", "technology", "hackathon", "coding", "robotics"]
  },
  {
    id: "eventbrite-free-online-science-tech",
    name: "Eventbrite free online science and technology events",
    organization: "Eventbrite public event search",
    url: "https://www.eventbrite.ca/d/online/free--science-and-tech--events/",
    trusted: false,
    sourceType: "event-search",
    keywords: ["free", "online", "science", "technology", "hackathon", "coding", "robotics"]
  }
];
