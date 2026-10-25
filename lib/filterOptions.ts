import type { Category, LanguageCode } from "./types";

// Lightweight navigation/form choices. Importing these must not load the catalogue.
export const categories: Category[] = [
  "STEM",
  "Library & Community",
  "Coding & Robotics",
  "Science & Engineering",
  "AI & Digital Media",
  "Makerspace & Fabrication",
  "Camps",
  "Hackathons & Competitions",
  "Career & Mentorship",
  "Scholarships",
  "Newcomer & Settlement",
  "Family Learning",
  "Arts & Media",
  "Family STEM",
  "Volunteer Hours",
  "Co-op & SHSM",
  "Youth Leadership"
];

export const cityOptions = [
  "Ajax",
  "Aurora",
  "Brampton",
  "Burlington",
  "Clarington",
  "Halton Hills",
  "Markham",
  "Milton",
  "Mississauga",
  "Newmarket",
  "Oakville",
  "Oshawa",
  "Pickering",
  "Richmond Hill",
  "Thornhill",
  "Toronto",
  "Unionville",
  "Vaughan",
  "Whitby"
];

export const languagePreferenceOrder: LanguageCode[] = [
  "en",
  "fr",
  "zh",
  "yue",
  "pa",
  "ur",
  "ta",
  "tl",
  "es",
  "ar",
  "fa",
  "hi",
  "pt",
  "gu",
  "bn",
  "ja",
  "ko",
  "hu"
];
