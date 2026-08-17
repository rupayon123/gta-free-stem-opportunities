import type {
  AccountRole,
  AdminReviewBundle,
  Announcement,
  AnnouncementStatus,
  Feedback,
  FeedbackStatus,
  MissingOpportunityStatus,
  MissingOpportunitySubmission,
  Opportunity,
  OpportunityStatus,
  Region,
  VerifiedAccount
} from "./types";
import { getSupabaseClient, hasSupabaseConfig } from "./supabaseClient";

export type SupabaseOAuthProvider = "google" | "azure" | "apple";

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  account_type: AccountRole | null;
  optional_grade: string | null;
  created_at: string;
};

type FeedbackRow = {
  id: string;
  opportunity_id: string | null;
  name: string | null;
  email: string | null;
  message: string;
  status: FeedbackStatus;
  user_id: string | null;
  created_at: string;
};

type MissingSubmissionRow = {
  id: string;
  title: string;
  organization: string | null;
  city: string | null;
  region: Region | null;
  source_url: string | null;
  contact_email: string | null;
  notes: string;
  status: MissingOpportunityStatus;
  user_id: string | null;
  created_at: string;
};

type AnnouncementRow = {
  id: string;
  title: string;
  message: string;
  status: AnnouncementStatus;
  created_at: string;
};

type OpportunityRow = {
  id: string;
  title: string;
  organization: string;
  description: string;
  city: string;
  region: Region;
  age_min: number;
  age_max: number | null;
  category: Opportunity["category"];
  cost: "Free to join";
  language: Opportunity["language"];
  deadline: string | null;
  start_date: string;
  end_date: string | null;
  source_url: string;
  last_checked: string;
  last_seen: string;
  status: OpportunityStatus;
  tags: string[];
};

export function betaBackendMode() {
  return hasSupabaseConfig() ? "supabase" : "local";
}

function requireSupabase() {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

function profileToAccount(profile: ProfileRow, emailVerified: boolean): VerifiedAccount {
  return {
    id: profile.id,
    email: profile.email ?? "",
    name: profile.full_name ?? "GTA STEM user",
    role: profile.account_type ?? "parent",
    grade: profile.optional_grade ?? undefined,
    emailVerified,
    createdAt: profile.created_at
  };
}

function feedbackFromRow(row: FeedbackRow): Feedback {
  return {
    id: row.id,
    opportunityId: row.opportunity_id ?? undefined,
    name: row.name ?? undefined,
    email: row.email ?? undefined,
    message: row.message,
    status: row.status,
    userId: row.user_id ?? undefined,
    createdAt: row.created_at
  };
}

function missingFromRow(row: MissingSubmissionRow): MissingOpportunitySubmission {
  return {
    id: row.id,
    title: row.title,
    organization: row.organization ?? undefined,
    city: row.city ?? undefined,
    region: row.region ?? undefined,
    sourceUrl: row.source_url ?? undefined,
    contactEmail: row.contact_email ?? undefined,
    notes: row.notes,
    status: row.status,
    userId: row.user_id ?? undefined,
    createdAt: row.created_at
  };
}

function announcementFromRow(row: AnnouncementRow): Announcement {
  return {
    id: row.id,
    title: row.title,
    message: row.message,
    status: row.status,
    createdAt: row.created_at
  };
}

function opportunityFromRow(row: OpportunityRow): Opportunity {
  return {
    id: row.id,
    title: row.title,
    organization: row.organization,
    provider: row.organization,
    description: row.description,
    summary: row.description,
    type: "One-time event",
    category: row.category,
    categories: [row.category],
    communityFocus: ["Open to all"],
    city: row.city,
    region: row.region,
    address: row.city,
    latitude: 43.6532,
    longitude: -79.3832,
    virtual: false,
    startDate: row.start_date,
    endDate: row.end_date ?? undefined,
    deadline: row.deadline ?? undefined,
    ageMin: row.age_min,
    ageMax: row.age_max ?? undefined,
    ages: { min: row.age_min, max: row.age_max ?? undefined },
    grades: [],
    language: row.language,
    languages: row.language,
    cost: row.cost,
    sourceUrl: row.source_url,
    lastChecked: row.last_checked,
    lastSeen: row.last_seen,
    status: row.status,
    accessibility: [],
    equipment: "Check the source page.",
    food: "Check the source page.",
    capacity: "Check the source page.",
    commitment: "Check the source page.",
    registrationUrl: row.source_url,
    providerContact: row.source_url,
    freeStatusProof: row.cost,
    lastVerified: row.last_checked,
    trustedSource: row.status === "active",
    volunteerHoursEligible: row.tags.includes("volunteer-hours"),
    coopEligible: row.tags.includes("co-op") || row.tags.includes("shsm"),
    paidPosition: false,
    tags: row.tags,
    sources: [
      {
        label: "Submitted source",
        url: row.source_url,
        capturedAt: row.last_checked,
        confidence: row.status === "active" ? "high" : "needs-review"
      }
    ]
  };
}

export async function getCurrentSupabaseAccount() {
  const supabase = requireSupabase();
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  const user = sessionData.session?.user;
  if (!user) return null;

  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (error) throw error;
  if (!data) return null;

  return profileToAccount(data as ProfileRow, Boolean(user.email_confirmed_at || user.confirmed_at));
}

export async function startSupabaseAccountEmailVerification({
  name,
  email,
  role,
  grade
}: {
  name: string;
  email: string;
  role: Exclude<AccountRole, "admin">;
  grade?: string;
}) {
  const supabase = requireSupabase();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
      data: {
        full_name: name,
        account_type: role,
        optional_grade: grade ?? null
      }
    }
  });
  if (error) throw error;
}

export async function verifySupabaseAccountEmailCode({
  email,
  code,
  password,
  name,
  role,
  grade
}: {
  email: string;
  code: string;
  password: string;
  name: string;
  role: Exclude<AccountRole, "admin">;
  grade?: string;
}) {
  const supabase = requireSupabase();
  const { error: verifyError } = await supabase.auth.verifyOtp({
    email,
    token: code,
    type: "email"
  });
  if (verifyError) throw verifyError;

  const { error: updateError } = await supabase.auth.updateUser({
    password,
    data: {
      full_name: name,
      account_type: role,
      optional_grade: grade ?? null
    }
  });
  if (updateError) throw updateError;

  const account = await getCurrentSupabaseAccount();
  if (!account) throw new Error("Account verified, but the profile was not created. Ask an admin to review Supabase setup.");
  return account;
}

export async function signInSupabaseAccount(email: string, password: string) {
  const supabase = requireSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (!data.user?.email_confirmed_at && !data.user?.confirmed_at) {
    await supabase.auth.signOut();
    throw new Error("Please verify your email before signing in.");
  }

  const account = await getCurrentSupabaseAccount();
  if (!account) throw new Error("Account profile is missing. Ask an admin to review this account.");
  return account;
}

export async function signInSupabaseWithProvider(provider: SupabaseOAuthProvider) {
  const supabase = requireSupabase();
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: typeof window !== "undefined" ? window.location.origin : undefined
    }
  });
  if (error) throw error;
}

export async function signOutSupabaseAccount() {
  const supabase = requireSupabase();
  await supabase.auth.signOut();
}

export async function loadSupabaseSavedOpportunityIds() {
  const supabase = requireSupabase();
  const { data, error } = await supabase.from("saved_opportunities").select("opportunity_id");
  if (error) throw error;
  return (data ?? []).map((row) => String(row.opportunity_id));
}

export async function saveSupabaseOpportunity(opportunityId: string) {
  const supabase = requireSupabase();
  const account = await getCurrentSupabaseAccount();
  if (!account) throw new Error("Sign in before saving.");
  const { error } = await supabase.from("saved_opportunities").upsert({
    user_id: account.id,
    opportunity_id: opportunityId
  });
  if (error) throw error;
}

export async function unsaveSupabaseOpportunity(opportunityId: string) {
  const supabase = requireSupabase();
  const { error } = await supabase.from("saved_opportunities").delete().eq("opportunity_id", opportunityId);
  if (error) throw error;
}

export async function submitSupabaseFeedback(payload: {
  opportunityId?: string;
  name?: string;
  email?: string;
  message: string;
}) {
  const supabase = requireSupabase();
  const account = await getCurrentSupabaseAccount().catch(() => null);
  const { error } = await supabase.from("feedback").insert({
    opportunity_id: payload.opportunityId ?? null,
    name: payload.name ?? null,
    email: payload.email ?? null,
    message: payload.message,
    user_id: account?.id ?? null
  });
  if (error) throw error;
}

export async function submitSupabaseMissingOpportunity(payload: {
  title: string;
  organization?: string;
  city?: string;
  region?: Region;
  sourceUrl?: string;
  contactEmail?: string;
  notes: string;
}) {
  const supabase = requireSupabase();
  const account = await getCurrentSupabaseAccount().catch(() => null);
  const { error } = await supabase.from("missing_opportunity_submissions").insert({
    title: payload.title,
    organization: payload.organization ?? null,
    city: payload.city ?? null,
    region: payload.region ?? null,
    source_url: payload.sourceUrl ?? null,
    contact_email: payload.contactEmail ?? null,
    notes: payload.notes,
    user_id: account?.id ?? null
  });
  if (error) throw error;
}

export async function loadSupabaseAnnouncements() {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => announcementFromRow(row as AnnouncementRow));
}

export async function createSupabaseAnnouncement(title: string, message: string) {
  const supabase = requireSupabase();
  const { data, error } = await supabase
    .from("announcements")
    .insert({ title, message, status: "active" })
    .select("*")
    .single();
  if (error) throw error;
  return announcementFromRow(data as AnnouncementRow);
}

export async function loadSupabaseAdminReviewBundle(): Promise<AdminReviewBundle> {
  const supabase = requireSupabase();
  const [opportunitiesResult, feedbackResult, missingResult, announcementsResult] = await Promise.all([
    supabase.from("opportunities").select("*").order("last_seen", { ascending: false }),
    supabase.from("feedback").select("*").order("created_at", { ascending: false }),
    supabase.from("missing_opportunity_submissions").select("*").order("created_at", { ascending: false }),
    supabase.from("announcements").select("*").order("created_at", { ascending: false })
  ]);

  if (opportunitiesResult.error) throw opportunitiesResult.error;
  if (feedbackResult.error) throw feedbackResult.error;
  if (missingResult.error) throw missingResult.error;
  if (announcementsResult.error) throw announcementsResult.error;

  return {
    opportunities: (opportunitiesResult.data ?? []).map((row) => opportunityFromRow(row as OpportunityRow)),
    feedback: (feedbackResult.data ?? []).map((row) => feedbackFromRow(row as FeedbackRow)),
    missingSubmissions: (missingResult.data ?? []).map((row) => missingFromRow(row as MissingSubmissionRow)),
    announcements: (announcementsResult.data ?? []).map((row) => announcementFromRow(row as AnnouncementRow))
  };
}

export async function updateSupabaseOpportunityStatus(id: string, status: OpportunityStatus) {
  const supabase = requireSupabase();
  const { error } = await supabase.from("opportunities").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function updateSupabaseFeedbackStatus(id: string, status: FeedbackStatus) {
  const supabase = requireSupabase();
  const { error } = await supabase.from("feedback").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function updateSupabaseMissingSubmissionStatus(id: string, status: MissingOpportunityStatus) {
  const supabase = requireSupabase();
  const { error } = await supabase.from("missing_opportunity_submissions").update({ status }).eq("id", id);
  if (error) throw error;
}
