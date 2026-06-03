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
    id: "eventbrite-free-science-tech",
    name: "Eventbrite free science and technology events",
    organization: "Eventbrite public event search",
    url: "https://www.eventbrite.ca/d/canada--toronto/free--science-and-tech--events/",
    city: "Toronto",
    region: "Toronto",
    trusted: false,
    sourceType: "event-search",
    keywords: ["free", "science", "technology", "hackathon", "coding", "robotics"]
  }
];
