"use client";

import {
  AlertTriangle,
  Building2,
  CalendarPlus,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Compass,
  Edit3,
  ExternalLink,
  Handshake,
  Languages,
  ListChecks,
  LocateFixed,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Moon,
  Megaphone,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  UserRound,
  UsersRound,
  X
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { categories, cityOptions, languagePreferenceOrder, opportunities, regions } from "@/lib/data";
import {
  betaBackendMode,
  createSupabaseAnnouncement,
  getCurrentSupabaseAccount,
  loadSupabaseAdminReviewBundle,
  loadSupabaseAnnouncements,
  loadSupabaseSavedOpportunityIds,
  saveSupabaseOpportunity,
  signInSupabaseAccount,
  signOutSupabaseAccount,
  startSupabaseAccountEmailVerification,
  submitSupabaseFeedback,
  submitSupabaseMissingOpportunity,
  unsaveSupabaseOpportunity,
  updateSupabaseFeedbackStatus,
  updateSupabaseMissingSubmissionStatus,
  updateSupabaseOpportunityStatus,
  verifySupabaseAccountEmailCode
} from "@/lib/betaBackend";
import { languageMeta, t, translatedSummary } from "@/lib/i18n";
import { adminReviewOpportunities, computedOpportunityStatus, publicOpportunities } from "@/lib/opportunityStatus";
import { warnAboutLocalFallback } from "@/lib/supabaseClient";
import type {
  AccountRole,
  AdminReviewBundle,
  Announcement,
  FeedbackStatus,
  Filters,
  LanguageCode,
  MissingOpportunityStatus,
  Opportunity,
  OpportunityStatus,
  VerifiedAccount
} from "@/lib/types";
import {
  coordinatesFromPostal,
  createCalendarFile,
  filterOpportunities,
  formatDateRange,
  formatDeadline,
  haversineKm,
  type Coordinates
} from "@/lib/utils";

type ThemePreference = "light" | "dark" | "system";
type ViewMode = "list" | "map";
type AuthMode = "signin" | "signup" | "verify";
type StoredAccount = VerifiedAccount & { passwordHash: string };
type BackendMode = "local" | "supabase";
type AdminAnnouncement = Announcement;
type AdminEventEdit = {
  id: string;
  opportunityId: string;
  titleOverride: string;
  summaryOverride: string;
  note: string;
  createdAt: string;
};
type PendingSignup = {
  email: string;
  name: string;
  role: AccountRole;
  grade?: string;
  password?: string;
  createdAt: string;
};

const STORAGE_PREFIX = "gta-stem-opportunities";
const THEME_KEY = `${STORAGE_PREFIX}-theme`;
const LANGUAGE_KEY = `${STORAGE_PREFIX}-language`;
const ACCOUNTS_KEY = `${STORAGE_PREFIX}-accounts`;
const CURRENT_USER_KEY = `${STORAGE_PREFIX}-current-user-id`;
const REVIEW_KEY = `${STORAGE_PREFIX}-community-submissions`;
const ADMIN_ANNOUNCEMENTS_KEY = `${STORAGE_PREFIX}-admin-announcements`;
const ADMIN_EVENT_EDITS_KEY = `${STORAGE_PREFIX}-admin-event-edits`;
const DEMO_PARENT_EMAIL = "kimchaewon@hybe.com";
const DEMO_PARENT_ID = `${STORAGE_PREFIX}-demo-parent`;
const DEMO_ADMIN_EMAIL = "kazuhanakumora@hybe.com";
const DEMO_ADMIN_ID = `${STORAGE_PREFIX}-demo-admin`;
const DEMO_ACCOUNT_PASSWORD = "password123";
const DEMO_PARENT_SAVED_IDS = ["cvc-conservation-youth-corps-2026", "oakville-youth-library-leaders-2026"];

const emptyAdminReviewBundle: AdminReviewBundle = {
  opportunities: [],
  feedback: [],
  missingSubmissions: [],
  announcements: []
};

const initialFilters: Filters = {
  query: "",
  region: "All",
  city: "",
  category: "All",
  age: "",
  language: "all",
  distanceKm: 25,
  postalCode: "",
  nearMe: false,
  blackFocused: false,
  girlsFocused: false,
  indigenousFocused: false,
  volunteerHours: false,
  coop: false,
  mentorship: false,
  leadership: false
};

function savedKey(userId: string) {
  return `${STORAGE_PREFIX}-saved-${userId}`;
}

function safeJson<T>(value: string | null, fallback: T) {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function readAccounts() {
  return safeJson<StoredAccount[]>(window.localStorage.getItem(ACCOUNTS_KEY), []);
}

function writeAccounts(accounts: StoredAccount[]) {
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function publicAccount(account: StoredAccount): VerifiedAccount {
  const { passwordHash: _passwordHash, ...safeAccount } = account;
  return safeAccount;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function clampDistance(value: number) {
  if (!Number.isFinite(value)) return 25;
  return Math.min(100, Math.max(5, Math.round(value / 5) * 5));
}

function directionsUrl(opportunity: Opportunity) {
  return `https://www.google.com/maps/dir/?api=1&destination=${opportunity.latitude},${opportunity.longitude}`;
}

async function hashPassword(email: string, password: string) {
  const normalized = `${email.trim().toLowerCase()}:${password}`;
  if (!window.crypto?.subtle) return btoa(normalized);
  const digest = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(normalized));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function roleLabel(role: AccountRole) {
  if (role === "admin") return "Admin";
  if (role === "parent") return "Parent or caregiver";
  return "Student";
}

async function ensureSeedAccounts() {
  const accounts = readAccounts();
  const seeded = [...accounts];
  const upsert = async ({
    id,
    email,
    name,
    role
  }: {
    id: string;
    email: string;
    name: string;
    role: AccountRole;
  }) => {
    const passwordHash = await hashPassword(email, DEMO_ACCOUNT_PASSWORD);
    const index = seeded.findIndex((candidate) => candidate.email === email);
    const account: StoredAccount = {
      ...(index >= 0 ? seeded[index] : {}),
      id: index >= 0 ? seeded[index].id : id,
      email,
      name,
      role,
      emailVerified: true,
      createdAt: index >= 0 ? seeded[index].createdAt : "2026-05-26T00:00:00-04:00",
      passwordHash
    };
    if (index >= 0) seeded[index] = account;
    else seeded.unshift(account);
    return account;
  };

  const parentAccount = await upsert({
    id: DEMO_PARENT_ID,
    email: DEMO_PARENT_EMAIL,
    name: "Kim Chaewon Demo Parent",
    role: "parent"
  });
  await upsert({
    id: DEMO_ADMIN_ID,
    email: DEMO_ADMIN_EMAIL,
    name: "Kazuha Nakamura Admin",
    role: "admin"
  });
  writeAccounts(seeded);

  const seededSaved = safeJson<string[]>(window.localStorage.getItem(savedKey(parentAccount.id)), []);
  const validSaved = seededSaved.filter((id) => opportunities.some((opportunity) => opportunity.id === id));
  window.localStorage.setItem(savedKey(parentAccount.id), JSON.stringify(Array.from(new Set([...DEMO_PARENT_SAVED_IDS, ...validSaved]))));
}

function latestEventOverrides(edits: AdminEventEdit[]) {
  const overrides = new Map<string, AdminEventEdit>();
  for (const edit of edits) {
    if (!overrides.has(edit.opportunityId)) overrides.set(edit.opportunityId, edit);
  }
  return overrides;
}

function applyEventEdits(sourceOpportunities: Opportunity[], edits: AdminEventEdit[]) {
  const overrides = latestEventOverrides(edits);
  return sourceOpportunities.map((opportunity) => {
    const edit = overrides.get(opportunity.id);
    if (!edit) return opportunity;
    return {
      ...opportunity,
      title: edit.titleOverride || opportunity.title,
      summary: edit.summaryOverride || opportunity.summary
    };
  });
}

export function HomePage() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [theme, setTheme] = useState<ThemePreference>("system");
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedId, setSelectedId] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [locationStatus, setLocationStatus] = useState("");
  const [localQueueCount, setLocalQueueCount] = useState(0);
  const [backendMode, setBackendMode] = useState<BackendMode>("local");
  const [backendStatus, setBackendStatus] = useState("");
  const [currentUser, setCurrentUser] = useState<VerifiedAccount | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [authError, setAuthError] = useState("");
  const [authNotice, setAuthNotice] = useState("");
  const [pendingSignup, setPendingSignup] = useState<PendingSignup | null>(null);
  const [saveGateMessage, setSaveGateMessage] = useState("");
  const [accountDashboardOpen, setAccountDashboardOpen] = useState(false);
  const [adminAnnouncements, setAdminAnnouncements] = useState<AdminAnnouncement[]>([]);
  const [adminEventEdits, setAdminEventEdits] = useState<AdminEventEdit[]>([]);
  const [adminReviewBundle, setAdminReviewBundle] = useState<AdminReviewBundle>(emptyAdminReviewBundle);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const selector = [
      ".opportunity-card",
      ".selected-details-card",
      ".filter-panel",
      ".results-panel",
      ".metric",
      ".pathway-card",
      ".mini-form",
      ".community-callout",
      ".announcement-strip",
      ".announcement-item",
      ".source-panel",
      ".detail-facts",
      ".map-shell",
      ".account-panel",
      ".admin-panel",
      ".saved-list a",
      ".source-list a",
      ".primary-button",
      ".soft-button",
      ".icon-text-button",
      ".account-button",
      ".theme-toggle button",
      ".segmented button"
    ].join(",");

    const handleMove = (event: Event) => {
      const pointerEvent = event as MouseEvent;
      const element = pointerEvent.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      element.classList.add("motion-active");
      const x = (pointerEvent.clientX - rect.left) / rect.width;
      const y = (pointerEvent.clientY - rect.top) / rect.height;
      element.style.setProperty("--glow-x", `${Math.round(x * 100)}%`);
      element.style.setProperty("--glow-y", `${Math.round(y * 100)}%`);
      element.style.setProperty("--tilt-x", `${((0.5 - y) * 2.6).toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${((x - 0.5) * 3.2).toFixed(2)}deg`);
    };

    const handleLeave = (event: Event) => {
      const element = event.currentTarget as HTMLElement;
      element.style.removeProperty("--glow-x");
      element.style.removeProperty("--glow-y");
      element.style.removeProperty("--tilt-x");
      element.style.removeProperty("--tilt-y");
      element.classList.remove("motion-active");
    };

    const bind = () => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        if (element.dataset.motionBound) return;
        element.dataset.motionBound = "true";
        element.addEventListener("mousemove", handleMove);
        element.addEventListener("mouseleave", handleLeave);
      });
    };

    bind();
    const observer = new MutationObserver(bind);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.querySelectorAll<HTMLElement>("[data-motion-bound]").forEach((element) => {
        element.removeEventListener("mousemove", handleMove);
        element.removeEventListener("mouseleave", handleLeave);
        element.classList.remove("motion-active");
        delete element.dataset.motionBound;
      });
    };
  }, []);

  useEffect(() => {
    let active = true;
    async function hydrateFromStorage() {
      const mode = betaBackendMode();
      setBackendMode(mode);
      warnAboutLocalFallback();

      if (mode === "supabase") {
        try {
          const [account, announcements] = await Promise.all([
            getCurrentSupabaseAccount(),
            loadSupabaseAnnouncements().catch(() => [])
          ]);
          if (!active) return;
          if (account) {
            setCurrentUser(account);
            setSavedIds(await loadSupabaseSavedOpportunityIds());
          }
          setAdminAnnouncements(announcements);
          setBackendStatus("Supabase is connected.");
        } catch (error) {
          if (!active) return;
          setBackendStatus(error instanceof Error ? error.message : "Supabase connection needs review.");
        }
        return;
      }

      await ensureSeedAccounts();
      if (!active) return;
      const storedTheme = window.localStorage.getItem(THEME_KEY) as ThemePreference | null;
      const storedLanguage = window.localStorage.getItem(LANGUAGE_KEY) as LanguageCode | null;
      const storedQueue = safeJson<unknown[]>(window.localStorage.getItem(REVIEW_KEY), []);
      const storedAnnouncements = safeJson<AdminAnnouncement[]>(window.localStorage.getItem(ADMIN_ANNOUNCEMENTS_KEY), []);
      const storedEventEdits = safeJson<AdminEventEdit[]>(window.localStorage.getItem(ADMIN_EVENT_EDITS_KEY), []);
      const accounts = readAccounts();
      const currentUserId = window.localStorage.getItem(CURRENT_USER_KEY);
      const storedAccount = accounts.find((account) => account.id === currentUserId && account.emailVerified);

      if (storedTheme) setTheme(storedTheme);
      if (storedLanguage && languageMeta[storedLanguage]) setLanguage(storedLanguage);
      if (storedAccount) {
        setCurrentUser(publicAccount(storedAccount));
        setSavedIds(safeJson<string[]>(window.localStorage.getItem(savedKey(storedAccount.id)), []));
      }
      setLocalQueueCount(storedQueue.length);
      setAdminAnnouncements(storedAnnouncements.map((announcement) => ({ ...announcement, status: announcement.status ?? "active" })));
      setAdminEventEdits(storedEventEdits);
    }
    hydrateFromStorage();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const applyTheme = () => {
      const resolved =
        theme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : theme;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.dataset.themePreference = theme;
      window.localStorage.setItem(THEME_KEY, theme);
    };
    applyTheme();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = languageMeta[language].dir;
  }, [language]);

  useEffect(() => {
    if (!currentUser || backendMode !== "local") return;
    window.localStorage.setItem(savedKey(currentUser.id), JSON.stringify(savedIds));
  }, [backendMode, currentUser, savedIds]);

  const postalLocation = useMemo(() => coordinatesFromPostal(filters.postalCode), [filters.postalCode]);
  const activeLocation = userLocation ?? postalLocation;
  const displayOpportunities = useMemo(() => applyEventEdits(opportunities, adminEventEdits), [adminEventEdits]);

  const visibleOpportunities = useMemo(
    () => filterOpportunities(displayOpportunities, filters, activeLocation),
    [filters, activeLocation, displayOpportunities]
  );
  const activeOpportunityCount = useMemo(() => publicOpportunities(displayOpportunities).length, [displayOpportunities]);

  const selectedOpportunity =
    visibleOpportunities.find((opportunity) => opportunity.id === selectedId) ??
    visibleOpportunities[0] ??
    publicOpportunities(displayOpportunities)[0];

  useEffect(() => {
    if (visibleOpportunities.length && (!selectedId || !visibleOpportunities.some((opportunity) => opportunity.id === selectedId))) {
      setSelectedId(visibleOpportunities[0].id);
    }
  }, [selectedId, visibleOpportunities]);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const updateLanguage = (nextLanguage: LanguageCode) => {
    setLanguage(nextLanguage);
  };

  const selectOpportunity = (id: string) => {
    setSelectedId(id);
    if (window.matchMedia("(max-width: 1200px)").matches) {
      window.requestAnimationFrame(() => {
        document.getElementById("selected-listing-details")?.scrollIntoView({ block: "start", behavior: "smooth" });
      });
    }
  };

  const openAuth = (mode: AuthMode = "signin", notice = "") => {
    setAuthMode(mode);
    setAuthError("");
    setAuthNotice(notice);
    setAuthOpen(true);
  };

  const refreshAdminReview = useCallback(async () => {
    if (backendMode !== "supabase" || currentUser?.role !== "admin") return;
    try {
      const bundle = await loadSupabaseAdminReviewBundle();
      setAdminReviewBundle(bundle);
      setAdminAnnouncements(bundle.announcements.filter((announcement) => announcement.status === "active"));
      setBackendStatus("Admin review data loaded.");
    } catch (error) {
      setBackendStatus(error instanceof Error ? error.message : "Admin review data could not be loaded.");
    }
  }, [backendMode, currentUser?.role]);

  useEffect(() => {
    if (accountDashboardOpen && currentUser?.role === "admin") {
      void refreshAdminReview();
    }
  }, [accountDashboardOpen, currentUser?.role, refreshAdminReview]);

  const signOut = async () => {
    if (backendMode === "supabase") {
      await signOutSupabaseAccount().catch((error) => {
        setBackendStatus(error instanceof Error ? error.message : "Could not sign out from Supabase.");
      });
    } else {
      window.localStorage.removeItem(CURRENT_USER_KEY);
    }
    setCurrentUser(null);
    setSavedIds([]);
    setSaveGateMessage("");
    setAccountDashboardOpen(false);
  };

  const handleSignup = async (formData: FormData) => {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const role = String(formData.get("role") ?? "parent") as AccountRole;
    const grade = String(formData.get("grade") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!name) {
      setAuthError("Please enter a name for the account.");
      return;
    }
    if (!isValidEmail(email)) {
      setAuthError("Please enter a valid email address before verification.");
      return;
    }
    if (password.length <= 8) {
      setAuthError("Password must be longer than 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }
    if (role === "admin") {
      setAuthError("Admin accounts are assigned by the owner after email verification.");
      return;
    }
    if (backendMode === "supabase") {
      try {
        await startSupabaseAccountEmailVerification({ name, email, role, grade: grade || undefined });
        setPendingSignup({
          email,
          name,
          role,
          grade: grade || undefined,
          password,
          createdAt: new Date().toISOString()
        });
        setAuthMode("verify");
        setAuthError("");
        setAuthNotice(`We sent a real verification code to ${email}. Enter the code from your email to finish the account.`);
        return;
      } catch (error) {
        setAuthError(error instanceof Error ? error.message : "Could not send the verification email.");
        return;
      }
    }
    setAuthError("Real email verification is not connected yet. Add Supabase URL and anon key before creating accounts.");
  };

  const handleVerify = async (formData: FormData) => {
    const code = String(formData.get("verificationCode") ?? "").trim();
    if (!pendingSignup) {
      setAuthError("Start sign-up first so we can verify your email.");
      setAuthMode("signup");
      return;
    }
    if (backendMode === "supabase") {
      if (!pendingSignup.password) {
        setAuthError("Start sign-up again so the verified account can set a password.");
        setAuthMode("signup");
        return;
      }
      try {
        const account = await verifySupabaseAccountEmailCode({
          email: pendingSignup.email,
          code,
          password: pendingSignup.password,
          name: pendingSignup.name,
          role: pendingSignup.role === "admin" ? "parent" : pendingSignup.role,
          grade: pendingSignup.grade
        });
        setCurrentUser(account);
        setSavedIds(await loadSupabaseSavedOpportunityIds());
        setPendingSignup(null);
        setAuthError("");
        setAuthNotice("Email verified. Your account is ready.");
        setAuthOpen(false);
        setAccountDashboardOpen(true);
      } catch (error) {
        setAuthError(error instanceof Error ? error.message : "That verification code did not work.");
      }
      return;
    }
    setAuthError("Real email verification is not connected yet. Add Supabase before creating accounts.");
  };

  const handleSignin = async (formData: FormData) => {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    if (backendMode === "supabase") {
      try {
        const account = await signInSupabaseAccount(email, password);
        setCurrentUser(account);
        setSavedIds(await loadSupabaseSavedOpportunityIds());
        setAuthError("");
        setAuthNotice("");
        setAuthOpen(false);
        setAccountDashboardOpen(true);
        if (account.role === "admin") void refreshAdminReview();
      } catch (error) {
        setAuthError(error instanceof Error ? error.message : "Email or password is incorrect.");
      }
      return;
    }

    await ensureSeedAccounts();
    const account = readAccounts().find((candidate) => candidate.email === email);

    if (!account || account.passwordHash !== (await hashPassword(email, password))) {
      setAuthError("Email or password is incorrect.");
      return;
    }
    if (!account.emailVerified) {
      setAuthError("Please verify your email before signing in.");
      return;
    }

    window.localStorage.setItem(CURRENT_USER_KEY, account.id);
    setCurrentUser(publicAccount(account));
    setSavedIds(safeJson<string[]>(window.localStorage.getItem(savedKey(account.id)), []));
    setAuthError("");
    setAuthNotice("");
    setAuthOpen(false);
    setAccountDashboardOpen(true);
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not available in this browser.");
      return;
    }
    setLocationStatus("Checking your browser location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          label: "Current location"
        });
        setLocationStatus("Using your location for this session only.");
        setFilters((current) => ({ ...current, nearMe: true }));
      },
      () => setLocationStatus("Location permission was not granted. Postal-code search still works."),
      { enableHighAccuracy: false, timeout: 7000 }
    );
  };

  const toggleSaved = async (id: string) => {
    if (!currentUser?.emailVerified) {
      const message = "Create or sign in with a verified account to save STEM opportunities.";
      setSaveGateMessage(message);
      openAuth("signin", message);
      return;
    }
    setSaveGateMessage("");
    const wasSaved = savedIds.includes(id);
    const nextSaved = wasSaved ? savedIds.filter((saved) => saved !== id) : [...savedIds, id];
    setSavedIds(nextSaved);

    if (backendMode === "supabase") {
      try {
        if (wasSaved) await unsaveSupabaseOpportunity(id);
        else await saveSupabaseOpportunity(id);
      } catch (error) {
        setSavedIds(savedIds);
        setSaveGateMessage(error instanceof Error ? error.message : "Save did not finish. Try signing in again.");
      }
    }
  };

  const downloadCalendar = (opportunity: Opportunity) => {
    const file = createCalendarFile(opportunity);
    const blob = new Blob([file], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${opportunity.id}.ics`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const submitReviewItem = async (kind: string, formData: FormData) => {
    const fields = Object.fromEntries(formData.entries());
    if (backendMode === "supabase") {
      try {
        if (kind === "report") {
          await submitSupabaseFeedback({
            opportunityId: String(fields["Listing title"] ?? "").trim() || undefined,
            email: String(fields["Contact email"] ?? "").trim() || undefined,
            message: [
              String(fields["Listing title"] ?? "").trim(),
              String(fields["What needs fixing"] ?? "").trim(),
              String(fields["Source link"] ?? "").trim()
            ]
              .filter(Boolean)
              .join("\n")
          });
        } else {
          await submitSupabaseMissingOpportunity({
            title:
              String(fields["Official opportunity link"] ?? "").trim() ||
              String(fields["Organization name"] ?? "").trim() ||
              "Community-submitted STEM opportunity",
            organization: String(fields["Organization name"] ?? "").trim() || undefined,
            city: String(fields["City or region"] ?? "").trim() || undefined,
            sourceUrl: String(fields["Official opportunity link"] ?? fields["Website"] ?? "").trim() || undefined,
            contactEmail: String(fields["Contact email"] ?? "").trim() || undefined,
            notes: [
              String(fields["Why it is free and useful"] ?? "").trim(),
              String(fields["STEM, co-op, SHSM, or volunteer-hours idea"] ?? "").trim()
            ]
              .filter(Boolean)
              .join("\n")
          });
        }
        setLocalQueueCount((current) => current + 1);
        setBackendStatus("Submission saved for admin review.");
        return;
      } catch (error) {
        setBackendStatus(error instanceof Error ? error.message : "Submission could not be saved.");
        return;
      }
    }

    const existing = safeJson<unknown[]>(window.localStorage.getItem(REVIEW_KEY), []);
    const payload = {
      id: `local-${Date.now()}`,
      kind,
      createdAt: new Date().toISOString(),
      fields
    };
    window.localStorage.setItem(REVIEW_KEY, JSON.stringify([payload, ...existing]));
    setLocalQueueCount(existing.length + 1);
  };

  const submitAdminEventEdit = (formData: FormData) => {
    const opportunityId = String(formData.get("opportunityId") ?? "");
    const titleOverride = String(formData.get("titleOverride") ?? "").trim();
    const summaryOverride = String(formData.get("summaryOverride") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();
    if (!opportunityId || (!titleOverride && !summaryOverride && !note)) return;

    const edit: AdminEventEdit = {
      id: `event-edit-${Date.now()}`,
      opportunityId,
      titleOverride,
      summaryOverride,
      note,
      createdAt: new Date().toISOString()
    };
    const nextEdits = [edit, ...adminEventEdits];
    window.localStorage.setItem(ADMIN_EVENT_EDITS_KEY, JSON.stringify(nextEdits));
    setAdminEventEdits(nextEdits);
    if (edit.opportunityId) setSelectedId(edit.opportunityId);
  };

  const submitAdminAnnouncement = async (formData: FormData) => {
    const title = String(formData.get("title") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    if (!title || !message) return;

    if (backendMode === "supabase") {
      try {
        const announcement = await createSupabaseAnnouncement(title, message);
        setAdminAnnouncements((current) => [announcement, ...current]);
        setAdminReviewBundle((current) => ({
          ...current,
          announcements: [announcement, ...current.announcements]
        }));
        setBackendStatus("Announcement published.");
      } catch (error) {
        setBackendStatus(error instanceof Error ? error.message : "Announcement could not be published.");
      }
      return;
    }

    const announcement: AdminAnnouncement = {
      id: `announcement-${Date.now()}`,
      title,
      message,
      status: "active",
      createdAt: new Date().toISOString()
    };
    const nextAnnouncements = [announcement, ...adminAnnouncements];
    window.localStorage.setItem(ADMIN_ANNOUNCEMENTS_KEY, JSON.stringify(nextAnnouncements));
    setAdminAnnouncements(nextAnnouncements);
  };

  const updateAdminOpportunityReviewStatus = async (id: string, status: OpportunityStatus) => {
    if (backendMode !== "supabase") {
      setBackendStatus("Connect Supabase to persist listing status changes.");
      return;
    }
    try {
      await updateSupabaseOpportunityStatus(id, status);
      await refreshAdminReview();
      setBackendStatus("Listing status updated.");
    } catch (error) {
      setBackendStatus(error instanceof Error ? error.message : "Listing status could not be updated.");
    }
  };

  const updateFeedbackReviewStatus = async (id: string, status: FeedbackStatus) => {
    if (backendMode !== "supabase") {
      setBackendStatus("Connect Supabase to persist feedback review changes.");
      return;
    }
    try {
      await updateSupabaseFeedbackStatus(id, status);
      await refreshAdminReview();
      setBackendStatus("Feedback status updated.");
    } catch (error) {
      setBackendStatus(error instanceof Error ? error.message : "Feedback status could not be updated.");
    }
  };

  const updateMissingReviewStatus = async (id: string, status: MissingOpportunityStatus) => {
    if (backendMode !== "supabase") {
      setBackendStatus("Connect Supabase to persist missing-opportunity review changes.");
      return;
    }
    try {
      await updateSupabaseMissingSubmissionStatus(id, status);
      await refreshAdminReview();
      setBackendStatus("Submission status updated.");
    } catch (error) {
      setBackendStatus(error instanceof Error ? error.message : "Submission status could not be updated.");
    }
  };

  const highSchoolCount = displayOpportunities.filter(
    (opportunity) =>
      opportunity.volunteerHoursEligible ||
      opportunity.coopEligible ||
      opportunity.categories.includes("Co-op & SHSM") ||
      opportunity.categories.includes("Youth Leadership")
  ).length;

  return (
    <main id="top" className="site-shell">
      <Header
        language={language}
        setLanguage={updateLanguage}
        theme={theme}
        setTheme={setTheme}
        currentUser={currentUser}
        onAuthClick={() => openAuth("signin")}
        onAccountClick={() => setAccountDashboardOpen(true)}
        onSignOut={signOut}
      />

      <section className="workspace-band hero-band">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="beta-pill">
              <Sparkles size={16} aria-hidden="true" />
              {t(language, "beta")}
            </span>
            <h1>{t(language, "brand")}</h1>
            <p>{t(language, "mission")}</p>
            {saveGateMessage ? (
              <p className="auth-inline-warning" role="alert">
                <AlertTriangle size={16} aria-hidden="true" />
                {saveGateMessage}
              </p>
            ) : null}
          </div>
          <div className="mission-strip" aria-label="Network snapshot">
            <Metric value={activeOpportunityCount.toString()} label={t(language, "verifiedListings")} />
            <Metric value={languagePreferenceOrder.length.toString()} label={t(language, "launchLanguages")} />
            <Metric value={highSchoolCount.toString()} label={t(language, "teenPathways")} />
          </div>
        </div>
      </section>
      <ActiveDiscoveryBadge language={language} count={activeOpportunityCount} />

      {adminAnnouncements.length ? <AnnouncementStrip announcements={adminAnnouncements.slice(0, 2)} /> : null}
      {backendStatus ? (
        <section className="workspace-band backend-status-band" aria-live="polite">
          <p className="status-line backend-status-line">
            {backendMode === "supabase" ? "Supabase" : "Static preview"}: {backendStatus}
          </p>
        </section>
      ) : null}

      <section className="workspace-band search-band" aria-label="Opportunity search">
        <div className="search-layout">
          <aside className={`filter-panel ${filtersOpen ? "open" : ""}`} aria-label={t(language, "filters")}>
            <button
              className="filter-toggle-button"
              type="button"
              onClick={() => setFiltersOpen((current) => !current)}
              aria-expanded={filtersOpen}
            >
              <span>
                <ListChecks size={18} aria-hidden="true" />
                {t(language, "filters")}
              </span>
              <strong>{filtersOpen ? t(language, "hideFilters") : t(language, "showFilters")}</strong>
            </button>
            <div className="filter-panel-body">
              <div className="panel-title desktop-panel-title">
                <ListChecks size={18} aria-hidden="true" />
                <span>{t(language, "filters")}</span>
              </div>

              <label className="field full">
                <span>{t(language, "search")}</span>
                <div className="input-icon">
                  <Search size={17} aria-hidden="true" />
                  <input
                    value={filters.query}
                    onChange={(event) => updateFilter("query", event.target.value)}
                    placeholder={t(language, "searchPlaceholder")}
                  />
                </div>
              </label>

              <div className="two-col">
                <label className="field">
                  <span>{t(language, "region")}</span>
                  <select
                    value={filters.region}
                    onChange={(event) => updateFilter("region", event.target.value as Filters["region"])}
                  >
                    <option value="All">{t(language, "allGta")}</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="field">
                  <span>{t(language, "city")}</span>
                  <select value={filters.city} onChange={(event) => updateFilter("city", event.target.value)}>
                    <option value="">{t(language, "allCities")}</option>
                    {cityOptions.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="field full">
                <span>{t(language, "category")}</span>
                <select
                  value={filters.category}
                  onChange={(event) => updateFilter("category", event.target.value as Filters["category"])}
                >
                  <option value="All">{t(language, "allCategories")}</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <div className="two-col">
                <label className="field">
                  <span>{t(language, "age")}</span>
                  <input
                    value={filters.age}
                    type="number"
                    min="0"
                    max="99"
                    onChange={(event) => updateFilter("age", event.target.value)}
                    placeholder={t(language, "any")}
                  />
                </label>
                <label className="field">
                  <span>{t(language, "programLanguage")}</span>
                  <select
                    value={filters.language}
                    onChange={(event) => updateFilter("language", event.target.value as Filters["language"])}
                  >
                    <option value="all">{t(language, "any")}</option>
                    {languagePreferenceOrder.map((code) => (
                      <option key={code} value={code}>
                        {languageMeta[code].label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="location-tools">
                <label className="field">
                  <span>{t(language, "postal")}</span>
                  <input
                    value={filters.postalCode}
                    onChange={(event) => updateFilter("postalCode", event.target.value.toUpperCase())}
                    placeholder="M5T"
                  />
                </label>
                <button className="icon-text-button" type="button" onClick={requestLocation}>
                  <LocateFixed size={17} aria-hidden="true" />
                  {t(language, "nearMe")}
                </button>
              </div>
              {locationStatus || postalLocation ? (
                <p className="status-line">
                  {locationStatus || `Approximate area: ${postalLocation?.label ?? "postal code"}`}
                </p>
              ) : null}

              <div className="field full distance-field">
                <span>
                  {t(language, "distance")}: {filters.distanceKm} km
                </span>
                <div className="distance-control">
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={filters.distanceKm}
                    onChange={(event) => updateFilter("distanceKm", clampDistance(Number(event.target.value)))}
                    aria-label={`${t(language, "distance")} radius`}
                  />
                  <label className="distance-number">
                    <span className="sr-only">{t(language, "distance")} in kilometres</span>
                    <input
                      type="number"
                      min="5"
                      max="100"
                      step="5"
                      value={filters.distanceKm}
                      onChange={(event) => updateFilter("distanceKm", clampDistance(Number(event.target.value)))}
                      aria-label={`${t(language, "distance")} in kilometres`}
                    />
                    <span>km</span>
                  </label>
                </div>
              </div>

              <FilterGroup title={t(language, "equity")}>
                <Toggle
                  checked={filters.blackFocused}
                  onChange={(value) => updateFilter("blackFocused", value)}
                  label={t(language, "black")}
                />
                <Toggle
                  checked={filters.girlsFocused}
                  onChange={(value) => updateFilter("girlsFocused", value)}
                  label={t(language, "girls")}
                />
                <Toggle
                  checked={filters.indigenousFocused}
                  onChange={(value) => updateFilter("indigenousFocused", value)}
                  label={t(language, "indigenous")}
                />
              </FilterGroup>

              <FilterGroup title={t(language, "highSchool")}>
                <Toggle
                  checked={filters.volunteerHours}
                  onChange={(value) => updateFilter("volunteerHours", value)}
                  label={t(language, "volunteerHours")}
                />
                <Toggle checked={filters.coop} onChange={(value) => updateFilter("coop", value)} label={t(language, "coop")} />
                <Toggle
                  checked={filters.mentorship}
                  onChange={(value) => updateFilter("mentorship", value)}
                  label={t(language, "mentorship")}
                />
                <Toggle
                  checked={filters.leadership}
                  onChange={(value) => updateFilter("leadership", value)}
                  label={t(language, "leadership")}
                />
              </FilterGroup>
            </div>
          </aside>

          <div className="results-panel">
            <div className="results-toolbar">
              <div>
                <p className="free-only-line">{t(language, "freeOnly")}</p>
                <h2>
                  {visibleOpportunities.length} {t(language, "results")}
                </h2>
              </div>
              <div className="segmented" aria-label="View mode">
                <button
                  className={viewMode === "list" ? "active" : ""}
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-pressed={viewMode === "list"}
                >
                  <ListChecks size={16} aria-hidden="true" />
                  {t(language, "list")}
                </button>
                <button
                  className={viewMode === "map" ? "active" : ""}
                  type="button"
                  onClick={() => setViewMode("map")}
                  aria-pressed={viewMode === "map"}
                >
                  <MapPin size={16} aria-hidden="true" />
                  {t(language, "map")}
                </button>
              </div>
            </div>

            <div className={viewMode === "map" ? "results-grid map-first" : "results-grid"}>
              <div className="cards-column">
                {visibleOpportunities.map((opportunity) => (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    language={language}
                    activeLocation={activeLocation}
                    selected={selectedOpportunity?.id === opportunity.id}
                    saved={savedIds.includes(opportunity.id)}
                    onSelect={() => selectOpportunity(opportunity.id)}
                    onSave={() => toggleSaved(opportunity.id)}
                    onCalendar={() => downloadCalendar(opportunity)}
                  />
                ))}
              </div>

              <aside className="selected-column" aria-label="Selected program information">
                {selectedOpportunity ? (
                  <div id="selected-listing-details" className="selected-details-card">
                    <OpportunityDetails
                      opportunity={selectedOpportunity}
                      language={language}
                      saved={savedIds.includes(selectedOpportunity.id)}
                      onSave={() => toggleSaved(selectedOpportunity.id)}
                      onCalendar={() => downloadCalendar(selectedOpportunity)}
                      compact
                    />
                  </div>
                ) : null}

                <div className="map-column">
                  <MapPanel
                    opportunities={visibleOpportunities}
                    selectedId={selectedOpportunity?.id}
                    onSelect={selectOpportunity}
                    activeLocation={activeLocation}
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <HighSchoolSection
        language={language}
        onVolunteerFilter={() => {
          setFilters((current) => ({ ...current, volunteerHours: true, coop: false }));
          window.scrollTo({ top: 360, behavior: "smooth" });
        }}
        onCoopFilter={() => {
          setFilters((current) => ({ ...current, volunteerHours: false, coop: true }));
          window.scrollTo({ top: 360, behavior: "smooth" });
        }}
      />

      <ContributeSection language={language} onSubmit={submitReviewItem} localQueueCount={localQueueCount} />

      {authOpen ? (
        <AuthModal
          mode={authMode}
          backendMode={backendMode}
          setMode={setAuthMode}
          error={authError}
          notice={authNotice}
          pendingSignup={pendingSignup}
          onClose={() => setAuthOpen(false)}
          onSignin={handleSignin}
          onSignup={handleSignup}
          onVerify={handleVerify}
        />
      ) : null}

      {accountDashboardOpen && currentUser?.role === "admin" ? (
        <AdminDashboard
          user={currentUser}
          backendMode={backendMode}
          backendStatus={backendStatus}
          opportunities={displayOpportunities}
          announcements={adminAnnouncements}
          eventEdits={adminEventEdits}
          reviewBundle={adminReviewBundle}
          reviewQueueCount={localQueueCount}
          onEventEdit={submitAdminEventEdit}
          onAnnouncement={submitAdminAnnouncement}
          onOpportunityStatus={updateAdminOpportunityReviewStatus}
          onFeedbackStatus={updateFeedbackReviewStatus}
          onMissingStatus={updateMissingReviewStatus}
          onClose={() => setAccountDashboardOpen(false)}
          onSignOut={signOut}
        />
      ) : accountDashboardOpen && currentUser ? (
        <AccountDashboard
          user={currentUser}
          savedOpportunities={displayOpportunities.filter((opportunity) => savedIds.includes(opportunity.id))}
          savedCount={savedIds.length}
          language={language}
          theme={theme}
          localQueueCount={localQueueCount}
          onClose={() => setAccountDashboardOpen(false)}
          onSignOut={signOut}
        />
      ) : null}
    </main>
  );
}

function Header({
  language,
  setLanguage,
  theme,
  setTheme,
  currentUser,
  onAuthClick,
  onAccountClick,
  onSignOut
}: {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  currentUser: VerifiedAccount | null;
  onAuthClick: () => void;
  onAccountClick: () => void;
  onSignOut: () => void;
}) {
  return (
    <header className="topbar">
      <a className="brand-mark" href="#top" aria-label="GTA FREE STEM Opportunities home">
        <span className="brand-icon">
          <img src="/scientist.png" alt="" width={48} height={48} aria-hidden="true" />
        </span>
        <span>
          <strong>GTA FREE STEM Opportunities</strong>
          <small>Verified free opportunities</small>
        </span>
      </a>

      <div className="header-actions">
        <label className="compact-select">
          <span className="control-label">
            <Languages size={16} aria-hidden="true" />
            {t(language, "siteLanguage")}
          </span>
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as LanguageCode)}
            aria-label={t(language, "siteLanguage")}
          >
            {languagePreferenceOrder.map((code) => (
              <option key={code} value={code}>
                {languageMeta[code].native} - {languageMeta[code].label}
              </option>
            ))}
          </select>
        </label>

        <div className="theme-toggle" role="group" aria-label={t(language, "theme")}>
          <button
            type="button"
            className={theme === "light" ? "active" : ""}
            onClick={() => setTheme("light")}
            aria-label={t(language, "light")}
            title={t(language, "light")}
          >
            <Sun size={16} aria-hidden="true" />
            <span>{t(language, "light")}</span>
          </button>
          <button
            type="button"
            className={theme === "dark" ? "active" : ""}
            onClick={() => setTheme("dark")}
            aria-label={t(language, "dark")}
            title={t(language, "dark")}
          >
            <Moon size={16} aria-hidden="true" />
            <span>{t(language, "dark")}</span>
          </button>
          <button
            type="button"
            className={theme === "system" ? "active" : ""}
            onClick={() => setTheme("system")}
            aria-label={t(language, "system")}
            title={t(language, "system")}
          >
            <Sparkles size={16} aria-hidden="true" />
            <span>{t(language, "auto")}</span>
          </button>
        </div>

        {currentUser ? (
          <div className="account-chip" aria-label="Signed-in account">
            <button type="button" className="account-chip-main" onClick={onAccountClick} aria-label="Open account dashboard">
              <UserRound size={16} aria-hidden="true" />
              <span>{currentUser.email}</span>
            </button>
            <button type="button" onClick={onSignOut} aria-label="Sign out" title="Sign out">
              <LogOut size={15} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button type="button" className="account-button" onClick={onAuthClick}>
            <UserRound size={16} aria-hidden="true" />
            Account / Admin
          </button>
        )}
      </div>
    </header>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function ActiveDiscoveryBadge({ language, count }: { language: LanguageCode; count: number }) {
  return (
    <aside className="source-scout-badge" aria-label={t(language, "sourceScout")}>
      <span className="source-scout-radar" aria-hidden="true">
        <span />
      </span>
      <span className="source-scout-copy">
        <strong>{t(language, "sourceScout")}</strong>
        <small>{t(language, "sourceScoutText").replace("{count}", count.toString())}</small>
      </span>
    </aside>
  );
}

function AnnouncementStrip({ announcements }: { announcements: AdminAnnouncement[] }) {
  return (
    <section className="workspace-band announcement-band" aria-label="Announcements">
      <div className="announcement-strip">
        <div className="panel-title">
          <Megaphone size={18} aria-hidden="true" />
          <span>Announcements</span>
        </div>
        <div className="announcement-list">
          {announcements.map((announcement) => (
            <article key={announcement.id} className="announcement-item">
              <strong>{announcement.title}</strong>
              <p>{announcement.message}</p>
              <span>{new Date(announcement.createdAt).toLocaleDateString("en-CA")}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return (
    <label className="toggle-row">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="filter-group">
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}

function OpportunityCard({
  opportunity,
  language,
  activeLocation,
  selected,
  saved,
  onSelect,
  onSave,
  onCalendar
}: {
  opportunity: Opportunity;
  language: LanguageCode;
  activeLocation: Coordinates | null;
  selected: boolean;
  saved: boolean;
  onSelect: () => void;
  onSave: () => void;
  onCalendar: () => void;
}) {
  const distance = activeLocation ? haversineKm(activeLocation, opportunity) : null;
  return (
    <article className={`opportunity-card ${selected ? "selected" : ""}`}>
      <button className="card-main" type="button" onClick={onSelect}>
        <span className="card-kicker">
          <ShieldCheck size={15} aria-hidden="true" />
          {opportunity.type}
        </span>
        <h3>{opportunity.title}</h3>
        <p>{translatedSummary(opportunity, language)}</p>
        <span className="meta-line">
          <MapPin size={15} aria-hidden="true" />
          {opportunity.city}, {opportunity.region}
          {distance ? ` - ${distance.toFixed(1)} km` : ""}
        </span>
      </button>
      <div className="chip-row">
        <span className="chip success">{t(language, "verifiedFree")}</span>
        {opportunity.volunteerHoursEligible ? <span className="chip">{t(language, "volunteerHours")}</span> : null}
        {opportunity.coopEligible ? <span className="chip">{t(language, "coop")}</span> : null}
        {opportunity.communityFocus.includes("Black-focused") ? <span className="chip berry">Black-focused</span> : null}
        {opportunity.communityFocus.includes("Girls/women-focused") ? <span className="chip lavender">Girls/women</span> : null}
        {opportunity.communityFocus.includes("Indigenous-focused") ? <span className="chip mint">Indigenous</span> : null}
      </div>
      <div className="card-actions">
        <button type="button" onClick={onSave} className={saved ? "soft-button saved" : "soft-button"}>
          <CheckCircle2 size={16} aria-hidden="true" />
          {saved ? t(language, "saved") : t(language, "save")}
        </button>
        <button type="button" onClick={onCalendar} className="soft-button">
          <CalendarPlus size={16} aria-hidden="true" />
          {t(language, "calendar")}
        </button>
        <a href={directionsUrl(opportunity)} target="_blank" rel="noreferrer" className="soft-button">
          <MapPin size={16} aria-hidden="true" />
          Directions
        </a>
      </div>
    </article>
  );
}

function MapPanel({
  opportunities,
  selectedId,
  onSelect,
  activeLocation
}: {
  opportunities: Opportunity[];
  selectedId?: string;
  onSelect: (id: string) => void;
  activeLocation: Coordinates | null;
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<import("maplibre-gl").Map | null>(null);
  const markersRef = useRef<import("maplibre-gl").Marker[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function initMap() {
      if (!mapContainer.current || mapRef.current) return;
      const maplibregl = await import("maplibre-gl");
      if (cancelled || !mapContainer.current) return;
      mapRef.current = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: [-79.39, 43.72],
        zoom: 8.6,
        attributionControl: { compact: true }
      });
      mapRef.current.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    }
    initMap();
    return () => {
      cancelled = true;
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    async function renderMarkers() {
      const map = mapRef.current;
      if (!map) return;
      const maplibregl = await import("maplibre-gl");
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      opportunities.forEach((opportunity) => {
        const markerElement = document.createElement("button");
        markerElement.type = "button";
        markerElement.className = opportunity.id === selectedId ? "map-marker selected" : "map-marker";
        markerElement.setAttribute("aria-label", opportunity.title);
        markerElement.addEventListener("click", () => onSelect(opportunity.id));

        const marker = new maplibregl.Marker({ element: markerElement, anchor: "bottom" })
          .setLngLat([opportunity.longitude, opportunity.latitude])
          .addTo(map);
        markersRef.current.push(marker);
      });

      if (activeLocation) {
        const markerElement = document.createElement("div");
        markerElement.className = "map-marker user-location";
        const marker = new maplibregl.Marker({ element: markerElement, anchor: "center" })
          .setLngLat([activeLocation.longitude, activeLocation.latitude])
          .addTo(map);
        markersRef.current.push(marker);
      }

      const selected = opportunities.find((opportunity) => opportunity.id === selectedId) ?? opportunities[0];
      if (selected) {
        map.flyTo({
          center: [selected.longitude, selected.latitude],
          zoom: Math.max(map.getZoom(), 9.6),
          essential: false
        });
      }
    }
    renderMarkers();
  }, [activeLocation, onSelect, opportunities, selectedId]);

  return (
    <div className="map-shell">
      <div ref={mapContainer} className="map-canvas" aria-label="Map of free GTA opportunities" />
      <div className="map-legend">
        <span>
          <span className="legend-dot" />
          Opportunity
        </span>
        <span>
          <span className="legend-dot current" />
          Your area
        </span>
      </div>
    </div>
  );
}

function OpportunityDetails({
  opportunity,
  language,
  saved,
  onSave,
  onCalendar,
  compact = false
}: {
  opportunity: Opportunity;
  language: LanguageCode;
  saved: boolean;
  onSave: () => void;
  onCalendar: () => void;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "details-layout compact-details" : "details-layout"}>
      <div className="detail-main">
        <p className="eyebrow">{opportunity.provider}</p>
        <h2>{opportunity.title}</h2>
        <p className="detail-summary">{translatedSummary(opportunity, language)}</p>
        <p className="translation-note">{t(language, "translationNote")}</p>
        <div className="detail-actions">
          <a href={opportunity.registrationUrl} target="_blank" rel="noreferrer" className="primary-button">
            {t(language, "registerApply")}
            <ChevronRight size={17} aria-hidden="true" />
          </a>
          <button type="button" className={saved ? "soft-button saved" : "soft-button"} onClick={onSave}>
            <CheckCircle2 size={16} aria-hidden="true" />
            {saved ? t(language, "saved") : t(language, "save")}
          </button>
          <button type="button" className="soft-button" onClick={onCalendar}>
            <CalendarPlus size={16} aria-hidden="true" />
            {t(language, "calendar")}
          </button>
          <a href={directionsUrl(opportunity)} target="_blank" rel="noreferrer" className="soft-button">
            <MapPin size={16} aria-hidden="true" />
            Directions
          </a>
        </div>
      </div>

      <div className="detail-facts">
        <Fact label={t(language, "date")} value={formatDateRange(opportunity.startDate, opportunity.endDate)} />
        <Fact label={t(language, "deadline")} value={formatDeadline(opportunity.deadline)} />
        <Fact label={t(language, "ages")} value={opportunity.ages.max ? `${opportunity.ages.min}-${opportunity.ages.max}` : `${opportunity.ages.min}+`} />
        <Fact label={t(language, "grades")} value={opportunity.grades.join(", ")} />
        <Fact label={t(language, "commitment")} value={opportunity.commitment} />
        <Fact label={t(language, "languages")} value={opportunity.languages.map((code) => languageMeta[code].label).join(", ")} />
        <Fact label={t(language, "access")} value={opportunity.accessibility.join(", ")} />
        <Fact label={t(language, "equipment")} value={opportunity.equipment} />
        <Fact label={t(language, "food")} value={opportunity.food} />
        <Fact label={t(language, "capacity")} value={opportunity.capacity} />
      </div>

      <div className="source-panel">
        <div className="panel-title">
          <ClipboardCheck size={18} aria-hidden="true" />
          <span>{t(language, "source")}</span>
        </div>
        <div className="trust-banner">
          <ShieldCheck size={18} aria-hidden="true" />
          <span>{opportunity.freeStatusProof}</span>
        </div>
        <p className="verified-line">
          {t(language, "lastVerified")}: {opportunity.lastVerified} - {opportunity.providerContact}
        </p>
        <div className="source-list">
          {opportunity.sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
              {source.label}
              <span>{source.confidence}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="fact">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function HighSchoolSection({
  language,
  onVolunteerFilter,
  onCoopFilter
}: {
  language: LanguageCode;
  onVolunteerFilter: () => void;
  onCoopFilter: () => void;
}) {
  const pathwayCards = [
    {
      icon: UsersRound,
      title: t(language, "volunteerHours"),
      text: t(language, "volunteerCardText"),
      action: onVolunteerFilter
    },
    {
      icon: Building2,
      title: t(language, "coop"),
      text: t(language, "coopCardText"),
      action: onCoopFilter
    },
    {
      icon: Compass,
      title: t(language, "trustChecks"),
      text: t(language, "trustCardText"),
      action: onVolunteerFilter
    }
  ];

  return (
    <section className="workspace-band highschool-band" aria-label="High school pathways">
      <div className="section-heading">
        <p className="eyebrow">{t(language, "highSchool")}</p>
        <h2>{t(language, "highSchoolHeading")}</h2>
      </div>
      <div className="pathway-grid">
        {pathwayCards.map((card) => {
          const Icon = card.icon;
          return (
            <button key={card.title} type="button" className="pathway-card" onClick={card.action}>
              <Icon size={22} aria-hidden="true" />
              <strong>{card.title}</strong>
              <span>{card.text}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ContributeSection({
  language,
  onSubmit,
  localQueueCount
}: {
  language: LanguageCode;
  onSubmit: (kind: string, formData: FormData) => void | Promise<void>;
  localQueueCount: number;
}) {
  return (
    <section className="workspace-band contribute-band" aria-label="Community participation">
      <div className="section-heading">
        <p className="eyebrow">{t(language, "communityNetwork")}</p>
        <h2>{t(language, "contributeHeading")}</h2>
      </div>
      <div className="contribute-grid community-grid">
        <MiniForm
          title={t(language, "partner")}
          icon={<Handshake size={18} aria-hidden="true" />}
          fields={["Organization name", "Website", "Contact email", "City or region", "STEM, co-op, SHSM, or volunteer-hours idea"]}
          submitLabel={t(language, "submit")}
          submittedLabel={t(language, "submitted")}
          onSubmit={(formData) => onSubmit("host", formData)}
        />
        <MiniForm
          title={t(language, "suggest")}
          icon={<Send size={18} aria-hidden="true" />}
          fields={["Official opportunity link", "Contact email", "City or region", "Why it is free and useful"]}
          submitLabel={t(language, "submit")}
          submittedLabel={t(language, "submitted")}
          onSubmit={(formData) => onSubmit("suggest", formData)}
        />
        <MiniForm
          title={t(language, "report")}
          icon={<AlertTriangle size={18} aria-hidden="true" />}
          fields={["Listing title", "Contact email", "What needs fixing", "Source link"]}
          submitLabel={t(language, "submit")}
          submittedLabel={t(language, "submitted")}
          onSubmit={(formData) => onSubmit("report", formData)}
        />
        <div className="community-callout">
          <div className="panel-title">
            <Building2 size={18} aria-hidden="true" />
            <span>Local hosts wanted</span>
          </div>
          <p>
            Be part of the community by hosting real STEM placements, high school co-op, SHSM-aligned career exploration, or
            volunteer-hour opportunities. Submissions are stored for review before anything is published.
          </p>
          <span className="chip success">{localQueueCount} local submissions in this browser</span>
        </div>
      </div>
    </section>
  );
}

function MiniForm({
  title,
  icon,
  fields,
  submitLabel,
  submittedLabel,
  onSubmit
}: {
  title: string;
  icon: ReactNode;
  fields: string[];
  submitLabel: string;
  submittedLabel: string;
  onSubmit: (formData: FormData) => void | Promise<void>;
}) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      void onSubmit(new FormData(event.currentTarget));
      event.currentTarget.reset();
      setSubmitted(true);
      window.setTimeout(() => setSubmitted(false), 2200);
    },
    [onSubmit]
  );

  return (
    <form className="mini-form" onSubmit={handleSubmit}>
      <div className="panel-title">
        {icon}
        <span>{title}</span>
      </div>
      {fields.map((field) => (
        <label className="field" key={field}>
          <span>{field}</span>
          <input name={field} required />
        </label>
      ))}
      <button type="submit" className="primary-button">
        {submitLabel}
        <ChevronRight size={17} aria-hidden="true" />
      </button>
      {submitted ? <p className="status-line">{submittedLabel}</p> : null}
    </form>
  );
}

function AccountDashboard({
  user,
  savedOpportunities,
  savedCount,
  language,
  theme,
  localQueueCount,
  onClose,
  onSignOut
}: {
  user: VerifiedAccount;
  savedOpportunities: Opportunity[];
  savedCount: number;
  language: LanguageCode;
  theme: ThemePreference;
  localQueueCount: number;
  onClose: () => void;
  onSignOut: () => void;
}) {
  return (
    <div className="auth-backdrop" role="presentation">
      <section className="account-dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="account-dashboard-title">
        <div className="auth-header">
          <div>
            <p className="eyebrow">Verified account</p>
            <h2 id="account-dashboard-title">Account dashboard</h2>
          </div>
          <button type="button" className="icon-only-button" onClick={onClose} aria-label="Close account dashboard">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="account-dashboard-hero">
          <div>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
          <span className="chip success">
            <ShieldCheck size={14} aria-hidden="true" />
            Email verified
          </span>
        </div>

        <div className="account-dashboard-grid">
          <section className="account-panel">
            <div className="panel-title">
              <UserRound size={18} aria-hidden="true" />
              <span>Family profile</span>
            </div>
            <Fact label="Account type" value={roleLabel(user.role)} />
            <Fact label="Grade" value={user.grade ?? "Not set"} />
            <Fact label="Language" value={languageMeta[language].label} />
            <Fact label="Theme" value={theme === "system" ? "System default" : theme} />
            <p className="account-note">Child names are not stored in this beta account area.</p>
          </section>

          <section className="account-panel">
            <div className="panel-title">
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>Saved opportunities</span>
            </div>
            <strong className="account-stat">{savedCount}</strong>
            <div className="saved-list">
              {savedOpportunities.length ? (
                savedOpportunities.map((opportunity) => (
                  <a key={opportunity.id} href={opportunity.registrationUrl} target="_blank" rel="noreferrer">
                    <span>{opportunity.title}</span>
                    <small>{opportunity.city}</small>
                  </a>
                ))
              ) : (
                <p className="account-note">Save an opportunity to keep it here.</p>
              )}
            </div>
          </section>

          <section className="account-panel">
            <div className="panel-title">
              <Building2 size={18} aria-hidden="true" />
              <span>Parent tools preview</span>
            </div>
            <Fact label="Reminder plan" value="Calendar exports now; email reminders later" />
            <Fact label="Submissions" value={`${localQueueCount} local community submissions in this browser`} />
            <Fact label="Privacy" value="Saved listings and preferences only" />
            <button type="button" className="soft-button" onClick={onSignOut}>
              <LogOut size={16} aria-hidden="true" />
              Sign out
            </button>
          </section>
        </div>
      </section>
    </div>
  );
}

function AdminDashboard({
  user,
  backendMode,
  backendStatus,
  opportunities,
  announcements,
  eventEdits,
  reviewBundle,
  reviewQueueCount,
  onEventEdit,
  onAnnouncement,
  onOpportunityStatus,
  onFeedbackStatus,
  onMissingStatus,
  onClose,
  onSignOut
}: {
  user: VerifiedAccount;
  backendMode: BackendMode;
  backendStatus: string;
  opportunities: Opportunity[];
  announcements: AdminAnnouncement[];
  eventEdits: AdminEventEdit[];
  reviewBundle: AdminReviewBundle;
  reviewQueueCount: number;
  onEventEdit: (formData: FormData) => void;
  onAnnouncement: (formData: FormData) => void | Promise<void>;
  onOpportunityStatus: (id: string, status: OpportunityStatus) => void | Promise<void>;
  onFeedbackStatus: (id: string, status: FeedbackStatus) => void | Promise<void>;
  onMissingStatus: (id: string, status: MissingOpportunityStatus) => void | Promise<void>;
  onClose: () => void;
  onSignOut: () => void | Promise<void>;
}) {
  const [eventStatus, setEventStatus] = useState("");
  const [announcementStatus, setAnnouncementStatus] = useState("");

  const handleEventEdit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onEventEdit(new FormData(event.currentTarget));
      event.currentTarget.reset();
      setEventStatus("Event edit saved for this beta browser.");
      window.setTimeout(() => setEventStatus(""), 2200);
    },
    [onEventEdit]
  );

  const handleAnnouncement = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      void onAnnouncement(new FormData(event.currentTarget));
      event.currentTarget.reset();
      setAnnouncementStatus(backendMode === "supabase" ? "Announcement published." : "Announcement saved for this beta browser.");
      window.setTimeout(() => setAnnouncementStatus(""), 2200);
    },
    [backendMode, onAnnouncement]
  );

  const opportunityById = new Map(opportunities.map((opportunity) => [opportunity.id, opportunity.title]));
  const staticReviewOpportunities = adminReviewOpportunities(opportunities);
  const reviewOpportunities = backendMode === "supabase" ? reviewBundle.opportunities : staticReviewOpportunities;
  const feedbackItems = reviewBundle.feedback;
  const missingItems = reviewBundle.missingSubmissions;

  return (
    <div className="auth-backdrop" role="presentation">
      <section className="account-dashboard-modal admin-dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="admin-dashboard-title">
        <div className="auth-header">
          <div>
            <p className="eyebrow">Admin access</p>
            <h2 id="admin-dashboard-title">Admin dashboard</h2>
          </div>
          <button type="button" className="icon-only-button" onClick={onClose} aria-label="Close admin dashboard">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="account-dashboard-hero admin-dashboard-hero">
          <div>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
          <span className="chip success">
            <ShieldCheck size={14} aria-hidden="true" />
            Admin verified
          </span>
        </div>

        <div className="admin-dashboard-grid">
          <section className="admin-panel">
            <div className="panel-title">
              <ShieldCheck size={18} aria-hidden="true" />
              <span>Admin permissions</span>
            </div>
            <div className="admin-permissions">
              <span>Edit verified listings</span>
              <span>Publish announcements</span>
              <span>Review public suggestions</span>
              <span>Approve hosts and partners</span>
              <span>Quarantine unclear listings</span>
            </div>
            <Fact label="Backend" value={backendMode === "supabase" ? "Supabase connected" : "Static preview fallback"} />
            {backendStatus ? <p className="status-line">{backendStatus}</p> : null}
            <Fact label="Review queue" value={`${reviewQueueCount} local submissions`} />
            <Fact label="Account type" value={roleLabel(user.role)} />
          </section>

          <section className="admin-panel">
            <div className="panel-title">
              <ClipboardCheck size={18} aria-hidden="true" />
              <span>Opportunity status review</span>
            </div>
            <div className="admin-review-list">
              {reviewOpportunities.length ? (
                reviewOpportunities.slice(0, 8).map((opportunity) => (
                  <article key={opportunity.id} className="admin-review-item">
                    <div>
                      <strong>{opportunity.title}</strong>
                      <span>
                        {opportunity.organization} - {opportunity.city}
                      </span>
                    </div>
                    <label className="compact-status-select">
                      <span className="sr-only">Status for {opportunity.title}</span>
                      <select
                        value={computedOpportunityStatus(opportunity)}
                        onChange={(event) => void onOpportunityStatus(opportunity.id, event.target.value as OpportunityStatus)}
                      >
                        <option value="active">Active</option>
                        <option value="expired">Expired</option>
                        <option value="needs_review">Needs Review</option>
                        <option value="hidden">Hidden</option>
                      </select>
                    </label>
                  </article>
                ))
              ) : (
                <p className="account-note">No expired or needs-review listings are loaded.</p>
              )}
            </div>
          </section>

          <section className="admin-panel">
            <div className="panel-title">
              <AlertTriangle size={18} aria-hidden="true" />
              <span>Feedback review</span>
            </div>
            <div className="admin-review-list">
              {feedbackItems.length ? (
                feedbackItems.slice(0, 6).map((item) => (
                  <article key={item.id} className="admin-review-item">
                    <div>
                      <strong>{item.opportunityId ?? "General feedback"}</strong>
                      <span>{item.message}</span>
                    </div>
                    <label className="compact-status-select">
                      <span className="sr-only">Feedback status</span>
                      <select
                        value={item.status}
                        onChange={(event) => void onFeedbackStatus(item.id, event.target.value as FeedbackStatus)}
                      >
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="resolved">Resolved</option>
                        <option value="archived">Archived</option>
                      </select>
                    </label>
                  </article>
                ))
              ) : (
                <p className="account-note">Feedback will appear here after Supabase is connected.</p>
              )}
            </div>
          </section>

          <section className="admin-panel">
            <div className="panel-title">
              <Send size={18} aria-hidden="true" />
              <span>Missing opportunities</span>
            </div>
            <div className="admin-review-list">
              {missingItems.length ? (
                missingItems.slice(0, 6).map((item) => (
                  <article key={item.id} className="admin-review-item">
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.organization ?? item.city ?? item.sourceUrl ?? item.notes}</span>
                    </div>
                    <label className="compact-status-select">
                      <span className="sr-only">Submission status</span>
                      <select
                        value={item.status}
                        onChange={(event) => void onMissingStatus(item.id, event.target.value as MissingOpportunityStatus)}
                      >
                        <option value="new">New</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="duplicate">Duplicate</option>
                      </select>
                    </label>
                  </article>
                ))
              ) : (
                <p className="account-note">Missing-program submissions will appear here after Supabase is connected.</p>
              )}
            </div>
          </section>

          <form className="admin-panel admin-tool-form" onSubmit={handleEventEdit}>
            <div className="panel-title">
              <Edit3 size={18} aria-hidden="true" />
              <span>Edit event</span>
            </div>
            <label className="field">
              <span>Listing</span>
              <select name="opportunityId" defaultValue={opportunities[0]?.id ?? ""} required>
                {opportunities.map((opportunity) => (
                  <option key={opportunity.id} value={opportunity.id}>
                    {opportunity.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Title override</span>
              <input name="titleOverride" placeholder="Leave blank to keep current title" />
            </label>
            <label className="field">
              <span>Summary override</span>
              <textarea name="summaryOverride" rows={4} placeholder="Leave blank to keep current summary" />
            </label>
            <label className="field">
              <span>Internal admin note</span>
              <input name="note" placeholder="Why this edit was made" />
            </label>
            <button type="submit" className="primary-button">
              Save event edit
              <ChevronRight size={17} aria-hidden="true" />
            </button>
            {eventStatus ? <p className="status-line">{eventStatus}</p> : null}
          </form>

          <form className="admin-panel admin-tool-form" onSubmit={handleAnnouncement}>
            <div className="panel-title">
              <Megaphone size={18} aria-hidden="true" />
              <span>Make announcement</span>
            </div>
            <label className="field">
              <span>Title</span>
              <input name="title" required />
            </label>
            <label className="field">
              <span>Message</span>
              <textarea name="message" rows={5} required />
            </label>
            <button type="submit" className="primary-button">
              Publish announcement
              <ChevronRight size={17} aria-hidden="true" />
            </button>
            {announcementStatus ? <p className="status-line">{announcementStatus}</p> : null}
          </form>

          <section className="admin-panel">
            <div className="panel-title">
              <Megaphone size={18} aria-hidden="true" />
              <span>Recent announcements</span>
            </div>
            <div className="admin-list">
              {announcements.length ? (
                announcements.slice(0, 4).map((announcement) => (
                  <article key={announcement.id}>
                    <strong>{announcement.title}</strong>
                    <p>{announcement.message}</p>
                    <span>{new Date(announcement.createdAt).toLocaleString("en-CA")}</span>
                  </article>
                ))
              ) : (
                <p className="account-note">No announcements published yet.</p>
              )}
            </div>
          </section>

          <section className="admin-panel">
            <div className="panel-title">
              <ClipboardCheck size={18} aria-hidden="true" />
              <span>Recent event edits</span>
            </div>
            <div className="admin-list">
              {eventEdits.length ? (
                eventEdits.slice(0, 4).map((edit) => (
                  <article key={edit.id}>
                    <strong>{opportunityById.get(edit.opportunityId) ?? "Listing"}</strong>
                    <p>{edit.titleOverride || edit.summaryOverride || edit.note}</p>
                    <span>{new Date(edit.createdAt).toLocaleString("en-CA")}</span>
                  </article>
                ))
              ) : (
                <p className="account-note">No listing edits saved yet.</p>
              )}
            </div>
            <button type="button" className="soft-button" onClick={onSignOut}>
              <LogOut size={16} aria-hidden="true" />
              Sign out
            </button>
          </section>
        </div>
      </section>
    </div>
  );
}

function AuthModal({
  mode,
  backendMode,
  setMode,
  error,
  notice,
  pendingSignup,
  onClose,
  onSignin,
  onSignup,
  onVerify
}: {
  mode: AuthMode;
  backendMode: BackendMode;
  setMode: (mode: AuthMode) => void;
  error: string;
  notice: string;
  pendingSignup: PendingSignup | null;
  onClose: () => void;
  onSignin: (formData: FormData) => Promise<void>;
  onSignup: (formData: FormData) => Promise<void>;
  onVerify: (formData: FormData) => Promise<void>;
}) {
  const handleSignin = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await onSignin(new FormData(event.currentTarget));
    },
    [onSignin]
  );

  const handleSignup = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await onSignup(new FormData(event.currentTarget));
    },
    [onSignup]
  );

  const handleVerify = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await onVerify(new FormData(event.currentTarget));
    },
    [onVerify]
  );

  return (
    <div className="auth-backdrop" role="presentation">
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <div className="auth-header">
          <div>
            <p className="eyebrow">Verified account required</p>
            <h2 id="auth-title">
              {mode === "signup" ? "Create parent or student account" : mode === "verify" ? "Verify email first" : "Sign in to save or manage"}
            </h2>
          </div>
          <button type="button" className="icon-only-button" onClick={onClose} aria-label="Close account dialog">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="auth-tabs" role="tablist" aria-label="Account options">
          <button type="button" className={mode === "signin" ? "active" : ""} onClick={() => setMode("signin")}>
            Sign in
          </button>
          <button type="button" className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>
            Create account
          </button>
          <button type="button" className={mode === "verify" ? "active" : ""} onClick={() => setMode("verify")} disabled={!pendingSignup}>
            Verify
          </button>
        </div>

        {notice ? (
          <p className="auth-notice">
            <ShieldCheck size={16} aria-hidden="true" />
            {notice}
          </p>
        ) : null}
        {error ? (
          <p className="auth-error" role="alert">
            <AlertTriangle size={16} aria-hidden="true" />
            {error}
          </p>
        ) : null}

        {mode === "signin" ? (
          <form className="auth-form" onSubmit={handleSignin}>
            <label className="field">
              <span>Email</span>
              <div className="input-icon">
                <Mail size={16} aria-hidden="true" />
                <input name="email" type="email" autoComplete="email" required />
              </div>
            </label>
            <label className="field">
              <span>Password</span>
              <div className="input-icon">
                <LockKeyhole size={16} aria-hidden="true" />
                <input name="password" type="password" autoComplete="current-password" required />
              </div>
            </label>
            <button type="submit" className="primary-button">
              Sign in
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </form>
        ) : null}

        {mode === "signup" ? (
          <form className="auth-form" onSubmit={handleSignup}>
            <label className="field">
              <span>Name</span>
              <input name="name" autoComplete="name" required />
            </label>
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <div className="two-col">
              <label className="field">
                <span>Account type</span>
                <select name="role" defaultValue="parent" required>
                  <option value="parent">Parent or caregiver</option>
                  <option value="student">Student</option>
                </select>
              </label>
              <label className="field">
                <span>Grade, optional</span>
                <input name="grade" placeholder="9, 10, 11, 12" />
              </label>
            </div>
            <label className="field">
              <span>Password, longer than 8 characters</span>
              <input name="password" type="password" autoComplete="new-password" minLength={9} required />
            </label>
            <label className="field">
              <span>Confirm password</span>
              <input name="confirmPassword" type="password" autoComplete="new-password" minLength={9} required />
            </label>
            <button type="submit" className="primary-button">
              {backendMode === "supabase" ? "Send real email code" : "Email verification not connected"}
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </form>
        ) : null}

        {mode === "verify" ? (
          <form className="auth-form" onSubmit={handleVerify}>
            <p className="verification-copy">
              {backendMode === "supabase"
                ? "A real one-time code was sent to your email. Enter that code here to verify and create the account."
                : "Real email verification is not connected yet. Account creation needs Supabase Auth before this can work."}
            </p>
            <label className="field">
              <span>Email verification code</span>
              <input name="verificationCode" inputMode="numeric" autoComplete="one-time-code" maxLength={6} required />
            </label>
            <button type="submit" className="primary-button" disabled={!pendingSignup}>
              Verify email and create account
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </form>
        ) : null}

        <a className="auth-secondary-link" href="https://supabase.com/docs/guides/auth/auth-email" target="_blank" rel="noreferrer">
          Real account emails use Supabase Auth
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}
