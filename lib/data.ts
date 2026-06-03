import type { Category, LanguageCode, Opportunity, Region, ReviewItem } from "./types";

export const regions: Region[] = ["Toronto", "Peel", "York", "Durham", "Halton"];

type SeedOpportunity = Omit<
  Opportunity,
  | "organization"
  | "description"
  | "category"
  | "ageMin"
  | "ageMax"
  | "language"
  | "cost"
  | "sourceUrl"
  | "lastChecked"
  | "lastSeen"
  | "status"
> & {
  status?: Opportunity["status"];
};

export const categories: Category[] = [
  "STEM",
  "Coding & Robotics",
  "Science & Engineering",
  "AI & Digital Media",
  "Makerspace & Fabrication",
  "Camps",
  "Hackathons & Competitions",
  "Career & Mentorship",
  "Scholarships",
  "Newcomer & Settlement",
  "Family STEM",
  "Volunteer Hours",
  "Co-op & SHSM",
  "Youth Leadership"
];

export const cityOptions = [
  "Ajax",
  "Brampton",
  "Burlington",
  "Markham",
  "Mississauga",
  "Oakville",
  "Oshawa",
  "Pickering",
  "Richmond Hill",
  "Toronto",
  "Vaughan",
  "Whitby"
];

export const gtaFsaCentres: Record<string, { label: string; latitude: number; longitude: number }> = {
  M1B: { label: "Scarborough", latitude: 43.8067, longitude: -79.1944 },
  M2N: { label: "North York", latitude: 43.7615, longitude: -79.4111 },
  M4B: { label: "East York", latitude: 43.7064, longitude: -79.3099 },
  M5T: { label: "Downtown Toronto", latitude: 43.6532, longitude: -79.3972 },
  M6H: { label: "West Toronto", latitude: 43.669, longitude: -79.4423 },
  M9W: { label: "North Etobicoke", latitude: 43.7284, longitude: -79.5797 },
  L3R: { label: "Markham", latitude: 43.8561, longitude: -79.337 },
  L3T: { label: "Thornhill", latitude: 43.8167, longitude: -79.4244 },
  L4B: { label: "Richmond Hill", latitude: 43.8414, longitude: -79.3991 },
  L4K: { label: "Vaughan", latitude: 43.827, longitude: -79.536 },
  L5B: { label: "Mississauga", latitude: 43.589, longitude: -79.6441 },
  L5N: { label: "Meadowvale", latitude: 43.5904, longitude: -79.7283 },
  L6P: { label: "Brampton", latitude: 43.7735, longitude: -79.6534 },
  L1S: { label: "Ajax", latitude: 43.8509, longitude: -79.0204 },
  L1T: { label: "Ajax North", latitude: 43.8769, longitude: -79.043 },
  L1V: { label: "Pickering", latitude: 43.839, longitude: -79.087 },
  L1G: { label: "Oshawa", latitude: 43.8971, longitude: -78.8658 },
  L1N: { label: "Whitby", latitude: 43.8975, longitude: -78.9429 },
  L6H: { label: "Oakville", latitude: 43.4675, longitude: -79.6877 },
  L7L: { label: "Burlington", latitude: 43.3795, longitude: -79.7626 }
};

const seedOpportunities: SeedOpportunity[] = [
  {
    id: "tpl-stem-programming-forest-hill-2026-06-04",
    title: "STEM Programming For Children",
    provider: "Toronto Public Library",
    summary: "After-school robotics and snap circuit activities for school-age children at Forest Hill Branch.",
    type: "One-time event",
    categories: ["STEM", "Coding & Robotics", "Science & Engineering"],
    communityFocus: ["Open to all", "Newcomer-friendly", "Disability-inclusive"],
    city: "Toronto",
    region: "Toronto",
    address: "Forest Hill Branch, 700 Eglinton Avenue West, Toronto, ON M5N 1B9",
    latitude: 43.7042,
    longitude: -79.4215,
    virtual: false,
    startDate: "2026-06-04T15:45:00-04:00",
    endDate: "2026-06-04T16:45:00-04:00",
    deadline: "2026-06-04T15:45:00-04:00",
    ages: { min: 6, max: 12 },
    grades: ["1", "2", "3", "4", "5", "6", "7"],
    languages: ["en", "fr", "zh", "yue", "pa", "ur", "ta", "tl", "es", "ar", "fa", "hi", "gu", "bn", "ja", "ko"],
    accessibility: ["Accessibility services available on request", "Transit nearby"],
    equipment: "Library robotics and circuit materials provided.",
    food: "No food listed.",
    capacity: "Registration required; source page listed remaining seats when verified.",
    commitment: "One hour.",
    registrationUrl: "https://tpl.bibliocommons.com/v2/events/69d825bf4dacf581ff87bc0b",
    providerContact: "416-397-5981",
    freeStatusProof: "Official Toronto Public Library event page with registration and no fee listed.",
    lastVerified: "2026-05-26",
    trustedSource: true,
    volunteerHoursEligible: false,
    coopEligible: false,
    paidPosition: false,
    tags: ["robotics", "snap circuits", "library", "children"],
    sources: [
      {
        label: "Official Toronto Public Library event page",
        url: "https://tpl.bibliocommons.com/v2/events/69d825bf4dacf581ff87bc0b",
        capturedAt: "2026-05-26T12:00:00-04:00",
        confidence: "high"
      }
    ],
    adminAuditTrail: [
      {
        label: "Verified source",
        at: "2026-05-26T12:00:00-04:00",
        actor: "Reviewer",
        detail: "Official library event page includes date, age group, location, accessibility note, and registration status."
      }
    ]
  },
  {
    id: "tpl-coding-python-online-2026-06-02",
    title: "Coding with Python I",
    provider: "Toronto Public Library",
    summary: "Online beginner Python class for teens and adults covering variables, loops, conditionals, and setup instructions.",
    type: "One-time event",
    categories: ["STEM", "Coding & Robotics", "Career & Mentorship"],
    communityFocus: ["Open to all", "Newcomer-friendly", "Disability-inclusive"],
    city: "Toronto",
    region: "Toronto",
    address: "Online event hosted by Toronto Public Library",
    latitude: 43.6532,
    longitude: -79.3832,
    virtual: true,
    startDate: "2026-06-02T18:00:00-04:00",
    endDate: "2026-06-02T20:00:00-04:00",
    deadline: "2026-06-02T18:00:00-04:00",
    ages: { min: 13 },
    grades: ["8", "9", "10", "11", "12", "18+"],
    languages: ["en", "fr", "zh", "yue", "pa", "ur", "ta", "tl", "es", "ar", "fa", "hi", "gu", "bn", "ja", "ko"],
    accessibility: ["Online event", "Accessibility services available on request"],
    equipment: "Personal computer required; source says Python and VS Code installation guides are provided after registration.",
    food: "Not applicable.",
    capacity: "Registration required.",
    commitment: "Two hours.",
    registrationUrl: "https://tpl.bibliocommons.com/v2/events/69fa1734e8af4a2f0070505b",
    providerContact: "dihonline@tpl.ca",
    freeStatusProof: "Official Toronto Public Library online event page with no fee listed.",
    lastVerified: "2026-05-26",
    trustedSource: true,
    volunteerHoursEligible: false,
    coopEligible: false,
    paidPosition: false,
    tags: ["python", "online", "teens", "adults", "coding"],
    sources: [
      {
        label: "Official Toronto Public Library event page",
        url: "https://tpl.bibliocommons.com/v2/events/69fa1734e8af4a2f0070505b",
        capturedAt: "2026-05-26T12:10:00-04:00",
        confidence: "high"
      }
    ],
    adminAuditTrail: [
      {
        label: "Verified source",
        at: "2026-05-26T12:10:00-04:00",
        actor: "Reviewer",
        detail: "Official source confirms online format, registration, teen/adult audience, and program description."
      }
    ]
  },
  {
    id: "tpl-animation-piskel-kids-2026-06-03",
    title: "Animation with Piskel for Kids",
    provider: "Toronto Public Library",
    summary: "Kids ages 9 to 12 learn pixel art and game-sprite animation using Piskel at Armour Heights Branch.",
    type: "One-time event",
    categories: ["AI & Digital Media", "Makerspace & Fabrication", "STEM"],
    communityFocus: ["Open to all", "Disability-inclusive"],
    city: "Toronto",
    region: "Toronto",
    address: "Armour Heights Branch, 2140 Avenue Road, Toronto, ON M5M 4M7",
    latitude: 43.7389,
    longitude: -79.4216,
    virtual: false,
    startDate: "2026-06-03T16:00:00-04:00",
    endDate: "2026-06-03T17:00:00-04:00",
    deadline: "2026-06-03T16:00:00-04:00",
    ages: { min: 9, max: 12 },
    grades: ["4", "5", "6", "7"],
    languages: ["en", "fr", "zh", "yue", "pa", "ur", "ta", "tl", "es", "ar", "fa", "hi", "gu", "bn", "ja", "ko"],
    accessibility: ["Accessibility services available on request", "Transit nearby"],
    equipment: "Library computers and Piskel access provided.",
    food: "No food listed.",
    capacity: "Registration required; source page listed remaining seats when verified.",
    commitment: "One hour.",
    registrationUrl: "https://tpl.bibliocommons.com/v2/events/69f6057c2866a5b4884c34ee",
    providerContact: "416-395-5430",
    freeStatusProof: "Official Toronto Public Library event page with registration and no fee listed.",
    lastVerified: "2026-05-26",
    trustedSource: true,
    volunteerHoursEligible: false,
    coopEligible: false,
    paidPosition: false,
    tags: ["animation", "pixel art", "game sprites", "digital media"],
    sources: [
      {
        label: "Official Toronto Public Library event page",
        url: "https://tpl.bibliocommons.com/v2/events/69f6057c2866a5b4884c34ee",
        capturedAt: "2026-05-26T12:15:00-04:00",
        confidence: "high"
      }
    ],
    adminAuditTrail: [
      {
        label: "Verified source",
        at: "2026-05-26T12:15:00-04:00",
        actor: "Reviewer",
        detail: "Official source confirms date, age range, branch address, and activity description."
      }
    ]
  },
  {
    id: "tpl-introduction-arduino-2026-06-04",
    title: "Introduction to Arduino",
    provider: "Toronto Public Library",
    summary: "Teens and adults learn how an Arduino microcontroller can be coded to interact with electronics and circuits.",
    type: "One-time event",
    categories: ["STEM", "Coding & Robotics", "Science & Engineering"],
    communityFocus: ["Open to all", "Disability-inclusive"],
    city: "Toronto",
    region: "Toronto",
    address: "Jane/Sheppard Branch, 1906 Sheppard Avenue West, Toronto, ON M3L 1Y7",
    latitude: 43.739,
    longitude: -79.5128,
    virtual: false,
    startDate: "2026-06-04T13:00:00-04:00",
    endDate: "2026-06-04T15:00:00-04:00",
    deadline: "2026-06-04T13:00:00-04:00",
    ages: { min: 13 },
    grades: ["8", "9", "10", "11", "12", "18+"],
    languages: ["en", "fr", "zh", "yue", "pa", "ur", "ta", "tl", "es", "ar", "fa", "hi", "gu", "bn", "ja", "ko"],
    accessibility: ["Accessibility services available on request", "Transit nearby"],
    equipment: "Arduino and electronics materials provided by the library.",
    food: "No food listed.",
    capacity: "Registration required; source page listed remaining seats when verified.",
    commitment: "Two hours.",
    registrationUrl: "https://tpl.bibliocommons.com/v2/events/69fb7806177319280017d91b",
    providerContact: "416-395-5966",
    freeStatusProof: "Official Toronto Public Library event page with registration and no fee listed.",
    lastVerified: "2026-05-26",
    trustedSource: true,
    volunteerHoursEligible: false,
    coopEligible: false,
    paidPosition: false,
    tags: ["arduino", "circuits", "electronics", "microcontroller"],
    sources: [
      {
        label: "Official Toronto Public Library event page",
        url: "https://tpl.bibliocommons.com/v2/events/69fb7806177319280017d91b",
        capturedAt: "2026-05-26T12:20:00-04:00",
        confidence: "high"
      }
    ],
    adminAuditTrail: [
      {
        label: "Verified source",
        at: "2026-05-26T12:20:00-04:00",
        actor: "Reviewer",
        detail: "Official source confirms teen/adult audience, date, branch address, and electronics description."
      }
    ]
  },
  {
    id: "markham-mini-makers-thornhill-village-2026-05-31",
    title: "Mini-Makers",
    provider: "Markham Public Library",
    summary: "Drop-in STEAM hour with hands-on activities and creative LEGO builds for children and families.",
    type: "Drop-in",
    categories: ["STEM", "Family STEM", "Makerspace & Fabrication"],
    communityFocus: ["Open to all", "Newcomer-friendly"],
    city: "Markham",
    region: "York",
    address: "Thornhill Village Branch, 10 Colborne Street, Thornhill, ON L3T 1Z6",
    latitude: 43.8167,
    longitude: -79.4244,
    virtual: false,
    startDate: "2026-05-31T14:00:00-04:00",
    endDate: "2026-05-31T15:00:00-04:00",
    ages: { min: 4, max: 12 },
    grades: ["JK", "SK", "1", "2", "3", "4", "5", "6", "7"],
    languages: ["en", "fr", "zh", "yue", "pa", "ur", "ta", "tl", "es", "ar", "fa", "hi", "gu", "bn", "ja", "ko"],
    accessibility: ["Library branch access", "Caregivers welcome"],
    equipment: "Materials available while supplies last.",
    food: "No food listed.",
    capacity: "Drop in; materials available while supplies last.",
    commitment: "One hour.",
    registrationUrl: "https://markham.bibliocommons.com/events/68fbe1952edc686d00f5c968",
    providerContact: "905-513-7977",
    freeStatusProof: "Official Markham Public Library event page and calendar with no fee listed.",
    lastVerified: "2026-05-26",
    trustedSource: true,
    volunteerHoursEligible: false,
    coopEligible: false,
    paidPosition: false,
    tags: ["steam", "lego", "families", "drop-in", "library"],
    sources: [
      {
        label: "Official Markham Public Library event page",
        url: "https://markham.bibliocommons.com/events/68fbe1952edc686d00f5c968",
        capturedAt: "2026-05-26T12:30:00-04:00",
        confidence: "high"
      },
      {
        label: "Official Markham Public Library event series calendar",
        url: "https://markham.bibliocommons.com/v2/events?series=68fbe194e59a13000d3e1ec3",
        capturedAt: "2026-05-26T12:30:00-04:00",
        confidence: "high"
      }
    ],
    adminAuditTrail: [
      {
        label: "Verified source",
        at: "2026-05-26T12:30:00-04:00",
        actor: "Reviewer",
        detail: "Official event page confirms description, branch, children audience, STEAM type, and language."
      }
    ]
  },
  {
    id: "whitby-girls-in-stem-2026-05-27",
    title: "Girls in STEM",
    provider: "Whitby Public Library",
    summary:
      "Girls and non-binary students in grades 4 to 6 explore how electricity moves from a nuclear power plant into homes.",
    type: "One-time event",
    categories: ["STEM", "Science & Engineering", "Career & Mentorship"],
    communityFocus: ["Girls/women-focused", "Open to all"],
    city: "Whitby",
    region: "Durham",
    address: "Central Library, 405 Dundas Street West, Whitby, ON L1N 6A1",
    latitude: 43.8791,
    longitude: -78.9444,
    virtual: false,
    startDate: "2026-05-27T18:30:00-04:00",
    endDate: "2026-05-27T19:30:00-04:00",
    ages: { min: 9, max: 12 },
    grades: ["4", "5", "6"],
    languages: ["en", "fr", "zh", "yue", "pa", "ur", "ta", "tl", "es", "ar", "fa", "hi", "gu", "bn", "ja", "ko"],
    accessibility: ["Library branch access", "Registration required"],
    equipment: "Hands-on program materials provided.",
    food: "No food listed.",
    capacity: "Registration required.",
    commitment: "One hour.",
    registrationUrl: "https://whitbylibrary.ca/sites/default/files/images/WPL-PG-Spring-2026_FINAL.pdf",
    providerContact: "905-668-6531",
    freeStatusProof: "Official Whitby Public Library Spring 2026 program guide lists this library program with registration required and no fee shown.",
    lastVerified: "2026-05-26",
    trustedSource: true,
    volunteerHoursEligible: false,
    coopEligible: false,
    paidPosition: false,
    tags: ["girls in STEM", "engineering", "electricity", "nuclear", "library"],
    sources: [
      {
        label: "Official Whitby Public Library Spring 2026 program guide",
        url: "https://whitbylibrary.ca/sites/default/files/images/WPL-PG-Spring-2026_FINAL.pdf",
        capturedAt: "2026-05-26T12:40:00-04:00",
        confidence: "high"
      },
      {
        label: "Whitby Public Library programs page",
        url: "https://whitbylibrary.ca/programs",
        capturedAt: "2026-05-26T12:40:00-04:00",
        confidence: "high"
      }
    ],
    adminAuditTrail: [
      {
        label: "Verified source",
        at: "2026-05-26T12:40:00-04:00",
        actor: "Reviewer",
        detail: "Official program guide confirms grades, topic, date, location, and registration requirement."
      }
    ]
  },
  {
    id: "cvc-conservation-youth-corps-2026",
    title: "Conservation Youth Corps",
    provider: "Credit Valley Conservation",
    summary:
      "Five-day outdoor environmental stewardship program where teens work with CVC staff and can earn up to 35 volunteer hours.",
    type: "Volunteer role",
    categories: ["Volunteer Hours", "Science & Engineering", "Youth Leadership"],
    communityFocus: ["Open to all", "Newcomer-friendly"],
    city: "Mississauga",
    region: "Peel",
    address: "CVC watershed pickup/drop-off locations selected during registration, Mississauga, ON",
    latitude: 43.5904,
    longitude: -79.7283,
    virtual: false,
    startDate: "2026-07-06T08:00:00-04:00",
    endDate: "2026-08-28T15:00:00-04:00",
    deadline: "2026-07-01T23:59:00-04:00",
    ages: { min: 14, max: 18 },
    grades: ["9", "10", "11", "12"],
    languages: ["en", "fr", "zh", "yue", "pa", "ur", "ta", "tl", "es", "ar", "fa", "hi", "gu", "bn", "ja", "ko"],
    accessibility: ["Outdoor stewardship sites", "Supervised by CVC staff", "Pickup/drop-off selected during registration"],
    equipment: "Outdoor clothing and closed-toe shoes likely needed; check CVC instructions after registration.",
    food: "Bring lunch and water unless CVC instructions say otherwise.",
    capacity: "First come basis according to official source.",
    commitment: "Five weekdays plus online AODA training.",
    registrationUrl: "https://cvc.ca/for-teens/conservation-youth-corps-cyc/",
    providerContact: "https://cvc.ca/contact/",
    freeStatusProof: "Official CVC youth program page describes volunteering and earning hours; no application or participation fee shown.",
    lastVerified: "2026-05-26",
    trustedSource: true,
    volunteerHoursEligible: true,
    coopEligible: false,
    paidPosition: false,
    tags: ["volunteer hours", "environment", "stewardship", "data collection", "field work"],
    sources: [
      {
        label: "Official Credit Valley Conservation CYC page",
        url: "https://cvc.ca/for-teens/conservation-youth-corps-cyc/",
        capturedAt: "2026-05-26T12:50:00-04:00",
        confidence: "high"
      }
    ],
    adminAuditTrail: [
      {
        label: "Verified source",
        at: "2026-05-26T12:50:00-04:00",
        actor: "Reviewer",
        detail: "Official source confirms ages 14 to 18, completed grade 8, returning to high school, and up to 35 volunteer hours."
      }
    ]
  },
  {
    id: "trca-conservation-youth-corps-peel-2026",
    title: "TRCA Conservation Youth Corps - Peel Region",
    provider: "Toronto and Region Conservation Authority",
    summary:
      "Peel Region high school students volunteer for a July or August conservation project week and can earn community service hours.",
    type: "Volunteer role",
    categories: ["Volunteer Hours", "Science & Engineering", "Youth Leadership"],
    communityFocus: ["Open to all", "Newcomer-friendly"],
    city: "Brampton",
    region: "Peel",
    address: "Peel Region pickup/drop-off locations selected through TRCA registration",
    latitude: 43.7315,
    longitude: -79.7624,
    virtual: false,
    startDate: "2026-07-06T08:00:00-04:00",
    endDate: "2026-08-28T15:00:00-04:00",
    deadline: "2026-07-01T23:59:00-04:00",
    ages: { min: 14, max: 18 },
    grades: ["9", "10", "11", "12"],
    languages: ["en", "fr", "zh", "yue", "pa", "ur", "ta", "tl", "es", "ar", "fa", "hi", "gu", "bn", "ja", "ko"],
    accessibility: ["Outdoor stewardship sites", "High-school return requirement", "Peel Region program"],
    equipment: "Outdoor clothing likely needed; confirm with TRCA registration instructions.",
    food: "Bring lunch and water unless TRCA instructions say otherwise.",
    capacity: "Program slots vary by selected week and site.",
    commitment: "One week in July or August.",
    registrationUrl: "https://trca.ca/get-involved/conservation-youth-corps/",
    providerContact: "https://trca.ca/about/contact-us/",
    freeStatusProof: "Official TRCA page describes a volunteer program to earn community service hours; no fee shown.",
    lastVerified: "2026-05-26",
    trustedSource: true,
    volunteerHoursEligible: true,
    coopEligible: false,
    paidPosition: false,
    tags: ["volunteer hours", "conservation", "Peel", "restoration", "field work"],
    sources: [
      {
        label: "Official TRCA Conservation Youth Corps page",
        url: "https://trca.ca/get-involved/conservation-youth-corps/",
        capturedAt: "2026-05-26T13:00:00-04:00",
        confidence: "high"
      }
    ],
    adminAuditTrail: [
      {
        label: "Verified source",
        at: "2026-05-26T13:00:00-04:00",
        actor: "Reviewer",
        detail: "Official source confirms Peel Region high school eligibility and up to 30 community service hours."
      }
    ]
  },
  {
    id: "pact-grow-to-learn-volunteer-hours-2026",
    title: "Grow-to-Learn Garden Student Volunteer Hours",
    provider: "PACT Urban Peace Program",
    summary:
      "High school students can volunteer in school gardens, support urban agriculture, and earn student volunteer hours.",
    type: "Volunteer role",
    categories: ["Volunteer Hours", "Science & Engineering", "Co-op & SHSM", "Youth Leadership"],
    communityFocus: ["Open to all", "Low-income priority", "Newcomer-friendly"],
    city: "Toronto",
    region: "Toronto",
    address: "John Polanyi CI and Thistletown Collegiate Institute garden sites, Toronto, ON",
    latitude: 43.7166,
    longitude: -79.4438,
    virtual: false,
    startDate: "2026-05-28T15:30:00-04:00",
    endDate: "2026-08-27T16:30:00-04:00",
    ages: { min: 14, max: 18 },
    grades: ["9", "10", "11", "12"],
    languages: ["en", "fr", "zh", "yue", "pa", "ur", "ta", "tl", "es", "ar", "fa", "hi", "gu", "bn", "ja", "ko"],
    accessibility: ["Outdoor school garden sites", "Student volunteer hours listed by provider"],
    equipment: "Outdoor clothing and garden-safe shoes recommended.",
    food: "No food listed.",
    capacity: "Contact PACT for availability and sign-up.",
    commitment: "Tuesdays and Thursdays, 3:30pm to 4:30pm at listed student volunteer sites.",
    registrationUrl: "https://www.pactprogram.ca/volunteer-opportunities",
    providerContact: "madison@pactprogram.ca or tcigarden@pactprogram.ca",
    freeStatusProof: "Official PACT volunteer page lists student volunteer hours and sign-up contact; no fee shown.",
    lastVerified: "2026-05-26",
    trustedSource: true,
    volunteerHoursEligible: true,
    coopEligible: true,
    paidPosition: false,
    tags: ["volunteer hours", "co-op", "shsm", "urban agriculture", "sustainability"],
    sources: [
      {
        label: "Official PACT volunteer opportunities page",
        url: "https://www.pactprogram.ca/volunteer-opportunities",
        capturedAt: "2026-05-26T13:10:00-04:00",
        confidence: "high"
      },
      {
        label: "Official PACT Grow-to-Learn page",
        url: "https://www.pactprogram.ca/about-gtl",
        capturedAt: "2026-05-26T13:10:00-04:00",
        confidence: "high"
      }
    ],
    adminAuditTrail: [
      {
        label: "Verified source",
        at: "2026-05-26T13:10:00-04:00",
        actor: "Reviewer",
        detail: "Official source confirms student volunteer hours, garden locations, recurring time, and contact emails."
      }
    ]
  },
  {
    id: "oakville-youth-library-leaders-2026",
    title: "Youth Library Leaders",
    provider: "Oakville Public Library",
    summary:
      "Teen volunteer leadership program where high school students help shape library services, plan events, and earn volunteer hours.",
    type: "Youth leadership",
    categories: ["Volunteer Hours", "Youth Leadership", "Career & Mentorship"],
    communityFocus: ["Open to all", "Newcomer-friendly"],
    city: "Oakville",
    region: "Halton",
    address: "Various Oakville Public Library branches, Oakville, ON",
    latitude: 43.4675,
    longitude: -79.6877,
    virtual: false,
    startDate: "2026-08-01T09:00:00-04:00",
    endDate: "2027-05-31T20:00:00-04:00",
    deadline: "2026-08-31T23:59:00-04:00",
    ages: { min: 14, max: 18 },
    grades: ["9", "10", "11", "12"],
    languages: ["en", "fr", "zh", "yue", "pa", "ur", "ta", "tl", "es", "ar", "fa", "hi", "gu", "bn", "ja", "ko"],
    accessibility: ["Various library branches", "Monthly meetings", "Applications reopen once a year"],
    equipment: "No special equipment listed.",
    food: "No food listed.",
    capacity: "Official source lists 30 spots for the annual program.",
    commitment: "Monthly two-hour meetings from September to May plus project time.",
    registrationUrl: "https://opl.ca/About-OPL/Volunteer/Youth-Library-Leaders",
    providerContact: "https://opl.ca/Contact-Us",
    freeStatusProof: "Official Oakville Public Library volunteer page describes volunteer hours and no fee shown.",
    lastVerified: "2026-05-26",
    trustedSource: true,
    volunteerHoursEligible: true,
    coopEligible: false,
    paidPosition: false,
    tags: ["volunteer hours", "library", "leadership", "digital literacy", "events"],
    sources: [
      {
        label: "Official Oakville Public Library Youth Library Leaders page",
        url: "https://opl.ca/About-OPL/Volunteer/Youth-Library-Leaders",
        capturedAt: "2026-05-26T13:20:00-04:00",
        confidence: "high"
      },
      {
        label: "Official Oakville Public Library volunteer page",
        url: "https://opl.ca/about/oplvolunteering",
        capturedAt: "2026-05-26T13:20:00-04:00",
        confidence: "high"
      }
    ],
    adminAuditTrail: [
      {
        label: "Verified source",
        at: "2026-05-26T13:20:00-04:00",
        actor: "Reviewer",
        detail: "Official source confirms ages 14 to 18, secondary school enrollment, volunteer hours, and August application window."
      }
    ]
  },
  {
    id: "afro-canadian-applied-stem-beyond-barriers-2026",
    title: "Applied STEM Beyond Barriers",
    provider: "Afro Canadian Development Inc.",
    summary:
      "Free applied STEM program for children and youth from underserved communities, with coding, robotics, 3D printing, animation, microcontrollers, and related technologies.",
    type: "Multi-week program",
    categories: ["STEM", "Coding & Robotics", "Makerspace & Fabrication", "AI & Digital Media"],
    communityFocus: ["Black-focused", "Open to all", "Low-income priority"],
    city: "Toronto",
    region: "Toronto",
    address: "Toronto, ON - registration details provided by Afro Canadian Development Inc.",
    latitude: 43.6532,
    longitude: -79.3832,
    virtual: false,
    startDate: "2026-06-01T17:00:00-04:00",
    endDate: "2026-12-31T17:00:00-05:00",
    ages: { min: 6, max: 13 },
    grades: ["1", "2", "3", "4", "5", "6", "7", "8"],
    languages: ["en", "fr", "zh", "yue", "pa", "ur", "ta", "tl", "es", "ar", "fa", "hi", "gu", "bn", "ja", "ko"],
    accessibility: ["Registration now open according to official provider announcement", "Cost-barrier removal stated by provider"],
    equipment: "Program materials are part of the applied STEM sessions.",
    food: "No food listed.",
    capacity: "Registration open; capacity not listed.",
    commitment: "Weekly cohort schedule to be confirmed by provider after registration.",
    registrationUrl:
      "https://afrocanadiandevelopment.org/2026/01/09/afro-canadian-development-inc-announces-2026-cohort-of-applied-stem-beyond-barriers-empowering-children-and-youth-from-underserved-communities/",
    providerContact: "info@afrocanadiandevelopment.org, 416-638-8525",
    freeStatusProof:
      "Official provider announcement calls it a free STEM program and says cost is never a barrier to participation.",
    lastVerified: "2026-05-26",
    trustedSource: true,
    volunteerHoursEligible: false,
    coopEligible: false,
    paidPosition: false,
    tags: ["Black youth", "coding", "robotics", "3D printing", "microcontrollers"],
    sources: [
      {
        label: "Official Afro Canadian Development announcement",
        url:
          "https://afrocanadiandevelopment.org/2026/01/09/afro-canadian-development-inc-announces-2026-cohort-of-applied-stem-beyond-barriers-empowering-children-and-youth-from-underserved-communities/",
        capturedAt: "2026-05-26T13:30:00-04:00",
        confidence: "high"
      }
    ],
    adminAuditTrail: [
      {
        label: "Verified source",
        at: "2026-05-26T13:30:00-04:00",
        actor: "Reviewer",
        detail: "Official source confirms free STEM program, registration open, ages 6 to 13, and applied technologies covered."
      }
    ]
  },
  {
    id: "ontario-science-centre-indigenous-celebration-2026",
    title: "Indigenous Celebration 2026",
    provider: "Ontario Science Centre",
    summary:
      "Free family-friendly event celebrating Indigenous ways of knowing through interactive workshops, performances, and activities at Evergreen Brick Works.",
    type: "One-time event",
    categories: ["STEM", "Family STEM", "Science & Engineering"],
    communityFocus: ["Indigenous-focused", "Open to all"],
    city: "Toronto",
    region: "Toronto",
    address: "Evergreen Brick Works, 550 Bayview Avenue, Toronto, ON M4W 3X8",
    latitude: 43.6845,
    longitude: -79.3655,
    virtual: false,
    startDate: "2026-06-06T09:00:00-04:00",
    endDate: "2026-06-06T16:00:00-04:00",
    ages: { min: 0 },
    grades: ["Family", "All ages"],
    languages: ["en", "fr", "zh", "yue", "pa", "ur", "ta", "tl", "es", "ar", "fa", "hi", "gu", "bn", "ja", "ko"],
    accessibility: ["Wheelchair accessible venue", "Transit accessible", "Free shuttle from Broadview Station"],
    equipment: "No equipment required.",
    food: "No food listed.",
    capacity: "Registration encouraged but not required for entry.",
    commitment: "Drop in during the 9am to 4pm event window.",
    registrationUrl: "https://www.ontariosciencecentre.ca/whats-on/pop-ups-plus-events/indigenous-celebration-2026",
    providerContact: "https://www.ontariosciencecentre.ca/contact-us",
    freeStatusProof: "Official Ontario Science Centre event page calls it a free, family-friendly event.",
    lastVerified: "2026-05-26",
    trustedSource: true,
    volunteerHoursEligible: false,
    coopEligible: false,
    paidPosition: false,
    tags: ["Indigenous ways of knowing", "science centre", "workshops", "family"],
    sources: [
      {
        label: "Official Ontario Science Centre event page",
        url: "https://www.ontariosciencecentre.ca/whats-on/pop-ups-plus-events/indigenous-celebration-2026",
        capturedAt: "2026-05-26T13:40:00-04:00",
        confidence: "high"
      }
    ],
    adminAuditTrail: [
      {
        label: "Verified source",
        at: "2026-05-26T13:40:00-04:00",
        actor: "Reviewer",
        detail: "Official source confirms free event, Indigenous focus, venue, date, time, and accessibility notes."
      }
    ]
  }
];

export const opportunities: Opportunity[] = seedOpportunities.map((opportunity) => ({
  ...opportunity,
  organization: opportunity.provider,
  description: opportunity.summary,
  category: opportunity.categories[0],
  ageMin: opportunity.ages.min,
  ageMax: opportunity.ages.max,
  language: opportunity.languages,
  cost: "Free to join",
  sourceUrl: opportunity.sources[0]?.url ?? opportunity.registrationUrl,
  lastChecked: opportunity.lastVerified,
  lastSeen: opportunity.lastVerified,
  status: opportunity.status ?? "active"
}));

export const reviewQueue: ReviewItem[] = [
  {
    id: "queue-unclear-cost-camp",
    title: "Private summer robotics camp",
    source: "Public calendar suggestion",
    reason: "Looks STEM-related but has a tuition price, so it must stay out of public search.",
    recommendedAction: "quarantine",
    createdAt: "2026-05-26T10:10:00-04:00"
  },
  {
    id: "queue-duplicate-library",
    title: "TPL Arduino duplicate",
    source: "Library calendar plus newsletter",
    reason: "Likely duplicate of the official TPL Arduino listing. Needs merge review on the admin side.",
    recommendedAction: "merge",
    createdAt: "2026-05-26T11:35:00-04:00"
  },
  {
    id: "queue-translation-needed",
    title: "Girls in STEM translated summaries",
    source: "Official library program guide",
    reason: "Approved source, but community-reviewed Bengali, Japanese, and Korean summaries are pending.",
    recommendedAction: "translate",
    createdAt: "2026-05-26T12:00:00-04:00"
  }
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
  "gu",
  "bn",
  "ja",
  "ko"
];
