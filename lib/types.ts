export type Region = "Toronto" | "Peel" | "York" | "Durham" | "Halton";

export type Category =
  | "STEM"
  | "Coding & Robotics"
  | "Science & Engineering"
  | "AI & Digital Media"
  | "Makerspace & Fabrication"
  | "Camps"
  | "Hackathons & Competitions"
  | "Career & Mentorship"
  | "Scholarships"
  | "Newcomer & Settlement"
  | "Family Learning"
  | "Arts & Media"
  | "Family STEM"
  | "Volunteer Hours"
  | "Co-op & SHSM"
  | "Youth Leadership";

export type OpportunityType =
  | "One-time event"
  | "Multi-week program"
  | "Camp"
  | "Drop-in"
  | "Competition or hackathon"
  | "Application deadline"
  | "Scholarship"
  | "Volunteer role"
  | "Co-op opportunity"
  | "Internship"
  | "Mentorship"
  | "Youth leadership";

export type CommunityFocus =
  | "Open to all"
  | "Black-focused"
  | "Girls/women-focused"
  | "Indigenous-focused"
  | "Newcomer-friendly"
  | "Low-income priority"
  | "Disability-inclusive"
  | "2SLGBTQ+ inclusive";

export type LanguageCode =
  | "en"
  | "fr"
  | "zh"
  | "yue"
  | "pa"
  | "ur"
  | "ta"
  | "tl"
  | "es"
  | "ar"
  | "fa"
  | "hi"
  | "gu"
  | "bn"
  | "ja"
  | "ko";

export type AuditEvent = {
  label: string;
  at: string;
  actor: string;
  detail: string;
};

export type SourceEvidence = {
  label: string;
  url: string;
  capturedAt: string;
  confidence: "high" | "medium" | "needs-review";
};

export type AccountRole = "parent" | "student" | "admin";
export type OpportunityStatus = "active" | "expired" | "needs_review" | "hidden";
export type FeedbackStatus = "new" | "reviewed" | "resolved" | "archived";
export type MissingOpportunityStatus = "new" | "reviewing" | "approved" | "rejected" | "duplicate";
export type AnnouncementStatus = "active" | "archived";

export type VerifiedAccount = {
  id: string;
  email: string;
  name: string;
  role: AccountRole;
  grade?: string;
  emailVerified: boolean;
  createdAt: string;
};

export type Opportunity = {
  id: string;
  title: string;
  organization: string;
  provider: string;
  description: string;
  summary: string;
  type: OpportunityType;
  category: Category;
  categories: Category[];
  communityFocus: CommunityFocus[];
  city: string;
  region: Region;
  address: string;
  latitude: number;
  longitude: number;
  virtual: boolean;
  startDate: string;
  endDate?: string;
  deadline?: string;
  ageMin: number;
  ageMax?: number;
  ages: {
    min: number;
    max?: number;
  };
  grades: string[];
  language: LanguageCode[];
  languages: LanguageCode[];
  cost: "Free to join";
  sourceUrl: string;
  lastChecked: string;
  lastSeen: string;
  status: OpportunityStatus;
  accessibility: string[];
  equipment: string;
  food: string;
  capacity: string;
  commitment: string;
  registrationUrl: string;
  providerContact: string;
  freeStatusProof: string;
  lastVerified: string;
  trustedSource: boolean;
  volunteerHoursEligible: boolean;
  coopEligible: boolean;
  paidPosition: boolean;
  tags: string[];
  sources: SourceEvidence[];
  adminAuditTrail?: AuditEvent[];
};

export type Feedback = {
  id: string;
  opportunityId?: string;
  name?: string;
  email?: string;
  message: string;
  status: FeedbackStatus;
  userId?: string;
  createdAt: string;
};

export type MissingOpportunitySubmission = {
  id: string;
  title: string;
  organization?: string;
  city?: string;
  region?: Region;
  sourceUrl?: string;
  contactEmail?: string;
  notes: string;
  status: MissingOpportunityStatus;
  userId?: string;
  createdAt: string;
};

export type Announcement = {
  id: string;
  title: string;
  message: string;
  status: AnnouncementStatus;
  createdAt: string;
};

export type AdminReviewBundle = {
  opportunities: Opportunity[];
  feedback: Feedback[];
  missingSubmissions: MissingOpportunitySubmission[];
  announcements: Announcement[];
};

export type ReviewItem = {
  id: string;
  title: string;
  source: string;
  reason: string;
  recommendedAction: "quarantine" | "merge" | "verify-cost" | "translate" | "approve";
  createdAt: string;
};

export type Filters = {
  query: string;
  region: "All" | Region;
  city: string;
  category: "All" | Category;
  age: string;
  language: "all" | LanguageCode;
  distanceKm: number;
  postalCode: string;
  nearMe: boolean;
  blackFocused: boolean;
  girlsFocused: boolean;
  indigenousFocused: boolean;
  volunteerHours: boolean;
  coop: boolean;
  mentorship: boolean;
  leadership: boolean;
};
