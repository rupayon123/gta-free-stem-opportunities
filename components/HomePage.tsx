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
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  UserRound,
  UsersRound,
  X
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode
} from "react";
import { categories, cityOptions, languagePreferenceOrder, opportunities, regions } from "@/lib/data";
import { generatedDiscoveryReviewCandidates, generatedDiscoverySummary } from "@/lib/generatedDiscoveryReview";
import {
  betaBackendMode,
  createSupabaseAnnouncement,
  getCurrentSupabaseAccount,
  loadSupabaseAdminReviewBundle,
  loadSupabaseAnnouncements,
  loadSupabaseSavedOpportunityIds,
  saveSupabaseOpportunity,
  signInSupabaseAccount,
  signInSupabaseWithProvider,
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
import type { SupabaseOAuthProvider } from "@/lib/betaBackend";
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
type ActiveSurface = "home" | "opportunities" | "high-school" | "community-hosts" | "support";
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
type HeaderNavigation = {
  home: () => void;
  opportunities: () => void;
  highSchool: () => void;
  about: () => void;
  support: () => void;
  volunteerHours: () => void;
  coop: () => void;
  mentorship: () => void;
  communityHosts: () => void;
  feedback: () => void;
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

function isHighSchoolOpportunity(opportunity: Opportunity) {
  const haystack = [...opportunity.tags, opportunity.type, opportunity.category, ...opportunity.categories, ...opportunity.grades]
    .join(" ")
    .toLowerCase();
  return (
    opportunity.volunteerHoursEligible ||
    opportunity.coopEligible ||
    opportunity.categories.includes("Career & Mentorship") ||
    opportunity.categories.includes("Youth Leadership") ||
    haystack.includes("shsm") ||
    haystack.includes("high school") ||
    haystack.includes("grade 9") ||
    haystack.includes("grade 10") ||
    haystack.includes("grade 11") ||
    haystack.includes("grade 12")
  );
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
  const [theme, setTheme] = useState<ThemePreference>("light");
  const [activeSurface, setActiveSurface] = useState<ActiveSurface>("home");
  const [heroLogoGiggling, setHeroLogoGiggling] = useState(false);
  const [pendingScrollTarget, setPendingScrollTarget] = useState("");
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
  const [researchStatus, setResearchStatus] = useState("");
  const [researchRefreshing, setResearchRefreshing] = useState(false);
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
    if (!pendingScrollTarget) return;
    window.requestAnimationFrame(() => {
      if (pendingScrollTarget === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.getElementById(pendingScrollTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setPendingScrollTarget("");
    });
  }, [activeSurface, pendingScrollTarget]);

  useEffect(() => {
    if (!currentUser || backendMode !== "local") return;
    window.localStorage.setItem(savedKey(currentUser.id), JSON.stringify(savedIds));
  }, [backendMode, currentUser, savedIds]);

  useEffect(() => {
    if (!filtersOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFiltersOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [filtersOpen]);

  const postalLocation = useMemo(() => coordinatesFromPostal(filters.postalCode), [filters.postalCode]);
  const activeLocation = userLocation ?? postalLocation;
  const displayOpportunities = useMemo(() => applyEventEdits(opportunities, adminEventEdits), [adminEventEdits]);

  const filteredOpportunities = useMemo(
    () => filterOpportunities(displayOpportunities, filters, activeLocation),
    [filters, activeLocation, displayOpportunities]
  );
  const visibleOpportunities = useMemo(() => {
    if (activeSurface !== "high-school") return filteredOpportunities;
    return filteredOpportunities.filter(isHighSchoolOpportunity);
  }, [activeSurface, filteredOpportunities]);

  const savedIdSet = useMemo(() => new Set(savedIds), [savedIds]);

  const publicFallbackOpportunity = useMemo(() => publicOpportunities(displayOpportunities)[0], [displayOpportunities]);

  const selectedOpportunity = useMemo(
    () =>
      visibleOpportunities.find((opportunity) => opportunity.id === selectedId) ??
      visibleOpportunities[0] ??
      publicFallbackOpportunity,
    [publicFallbackOpportunity, selectedId, visibleOpportunities]
  );

  const availableProgramLanguages = useMemo(() => {
    const available = new Set(displayOpportunities.flatMap((opportunity) => opportunity.languages));
    return languagePreferenceOrder.filter((code) => available.has(code));
  }, [displayOpportunities]);

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

  const showHome = useCallback(() => {
    setActiveSurface("home");
    setPendingScrollTarget("top");
  }, []);

  const goToOpportunities = useCallback(
    (nextFilters?: Partial<Filters>) => {
      if (nextFilters) {
        setFilters((current) => ({ ...current, ...nextFilters }));
      }
      setActiveSurface("opportunities");
      setPendingScrollTarget("top");
    },
    []
  );

  const goToHighSchool = useCallback(
    (nextFilters?: Partial<Filters>) => {
      if (nextFilters) {
        setFilters((current) => ({ ...current, ...nextFilters }));
      }
      setActiveSurface("high-school");
      setPendingScrollTarget("top");
    },
    []
  );

  const showSurface = useCallback(
    (surface: ActiveSurface, _targetId: string) => {
      setActiveSurface(surface);
      setPendingScrollTarget("top");
    },
    []
  );

  const navigation = useMemo<HeaderNavigation>(
    () => ({
      home: showHome,
      opportunities: () => goToOpportunities(),
      highSchool: () => goToHighSchool(),
      about: () => showSurface("support", "accessibility-support"),
      support: () => showSurface("community-hosts", "feedback"),
      volunteerHours: () =>
        goToHighSchool({ volunteerHours: true, coop: false, mentorship: false, leadership: false }),
      coop: () => goToHighSchool({ volunteerHours: false, coop: true, mentorship: false, leadership: false }),
      mentorship: () => goToHighSchool({ volunteerHours: false, coop: false, mentorship: true, leadership: false }),
      communityHosts: () => showSurface("community-hosts", "community-hosts"),
      feedback: () => showSurface("community-hosts", "feedback")
    }),
    [goToHighSchool, goToOpportunities, showHome, showSurface]
  );

  const handleHeroSearch = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      goToOpportunities();
    },
    [goToOpportunities]
  );

  const triggerHeroLogoGiggle = useCallback(() => {
    setHeroLogoGiggling(false);
    window.requestAnimationFrame(() => setHeroLogoGiggling(true));
    window.setTimeout(() => setHeroLogoGiggling(false), 680);
  }, []);

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

  const refreshResearch = useCallback(async () => {
    setResearchRefreshing(true);
    setResearchStatus(t(language, "searchEngineAuto"));
    try {
      await fetch(`${window.location.origin}/?research-refresh=${Date.now()}`, { cache: "reload" });
      const scanLabel = t(language, "sourceScoutMiniText")
        .replace("{sources}", String(generatedDiscoverySummary.sourcesChecked))
        .replace("{review}", String(generatedDiscoverySummary.newCandidates));
      setResearchStatus(`${scanLabel}. ${t(language, "expiredHidden")}`);
    } catch {
      setResearchStatus(t(language, "searchEngineAuto"));
    } finally {
      setResearchRefreshing(false);
      window.setTimeout(() => setResearchStatus(""), 6200);
    }
  }, [language]);

  const handleSignup = async (formData: FormData) => {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const role = String(formData.get("role") ?? "parent") as AccountRole;
    const grade = String(formData.get("grade") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const termsAccepted = String(formData.get("termsAccepted") ?? "") === "yes";
    const humanCheck = String(formData.get("humanCheck") ?? "") === "yes";

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
    if (!termsAccepted) {
      setAuthError("Please agree to the Terms of Service and Privacy Notice before creating an account.");
      return;
    }
    if (!humanCheck) {
      setAuthError("Please complete the human check before creating an account.");
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
    setAuthError("");
    setAuthNotice("Real account creation is ready in the code. Connect Supabase Auth in the free hosting settings to send email codes.");
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
    setAuthError("");
    setAuthNotice("Real email verification turns on after Supabase Auth is connected.");
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

  const handleProviderSignin = async (provider: SupabaseOAuthProvider) => {
    const providerLabel = provider === "azure" ? "Microsoft" : provider === "google" ? "Google" : "Apple";
    if (backendMode !== "supabase") {
      setAuthError("");
      setAuthNotice(
        `${providerLabel} sign-in is ready in the website code. Connect Supabase Auth in the free hosting settings to turn on real accounts.`
      );
      return;
    }

    try {
      setAuthError("");
      setAuthNotice(`Opening secure ${providerLabel} sign-in...`);
      await signInSupabaseWithProvider(provider);
    } catch (error) {
      setAuthNotice("");
      setAuthError(error instanceof Error ? error.message : `${providerLabel} sign-in could not start.`);
    }
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

  const filterButton = (
    <button
      className="filter-toggle-button toolbar-filter-button"
      type="button"
      onClick={() => setFiltersOpen(true)}
      aria-haspopup="dialog"
      aria-expanded={filtersOpen}
    >
      <ListChecks size={18} aria-hidden="true" />
      {t(language, "filters")}
    </button>
  );

  const filterModal = filtersOpen ? (
    <div
      className="filter-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setFiltersOpen(false);
      }}
    >
      <section className="filter-modal" role="dialog" aria-modal="true" aria-labelledby="filter-modal-title">
        <div className="filter-modal-header">
          <div className="filter-modal-title">
            <ListChecks size={20} aria-hidden="true" />
            <h2 id="filter-modal-title">{t(language, "filters")}</h2>
          </div>
          <div className="filter-modal-actions">
            <button type="button" className="soft-button" onClick={() => setFiltersOpen(false)}>
              {t(language, "applyFilters")}
            </button>
            <button type="button" className="icon-only-button" onClick={() => setFiltersOpen(false)} aria-label={t(language, "closeFilters")}>
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="filter-panel-body modal-filter-body">

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
              {availableProgramLanguages.map((code) => (
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

        {activeSurface === "high-school" ? (
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
        ) : null}
      </div>
      </section>
    </div>
  ) : null;

  return (
    <main id="top" className={`site-shell ${activeSurface === "home" ? "home-shell" : "section-shell"}`}>
      <Header
        language={language}
        setLanguage={updateLanguage}
        theme={theme}
        setTheme={setTheme}
        currentUser={currentUser}
        onAuthClick={() => openAuth("signin")}
        onAccountClick={() => setAccountDashboardOpen(true)}
        onSignOut={signOut}
        navigation={navigation}
        isHome={activeSurface === "home"}
      />

      {activeSurface === "home" ? (
      <section className="workspace-band hero-band landing-hero" aria-labelledby="landing-title">
        <div className="hero-card-shell">
          <img
            className={`hero-logo ${heroLogoGiggling ? "is-giggling" : ""}`}
            src="/logo.png"
            alt=""
            width={176}
            height={176}
            aria-hidden="true"
            onPointerEnter={triggerHeroLogoGiggle}
            onPointerDown={triggerHeroLogoGiggle}
          />
          <span className="beta-pill">
            <Sparkles size={16} aria-hidden="true" />
            {t(language, "beta")}
          </span>
          <h1 id="landing-title">{t(language, "brand")}</h1>
          <p>{t(language, "mission")}</p>
          <form className="hero-search-form" onSubmit={handleHeroSearch}>
            <Search size={20} aria-hidden="true" />
            <input
              value={filters.query}
              onChange={(event) => updateFilter("query", event.target.value)}
              placeholder={t(language, "searchPlaceholder")}
              aria-label={t(language, "search")}
            />
            <button type="submit" className="primary-button">
              {t(language, "search")}
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </form>
          <div className="hero-actions" aria-label="Main actions">
            <button type="button" className="primary-button" onClick={() => goToOpportunities()}>
              {t(language, "navOpportunities")}
              <ChevronRight size={17} aria-hidden="true" />
            </button>
            <button type="button" className="soft-button" onClick={navigation.highSchool}>
              {t(language, "navHighSchoolOpportunities")}
            </button>
            <button type="button" className="soft-button" onClick={navigation.about}>
              {t(language, "navAbout")}
            </button>
            <button type="button" className="soft-button" onClick={navigation.support}>
              {t(language, "navSupport")}
            </button>
          </div>
          {saveGateMessage ? (
            <p className="auth-inline-warning" role="alert">
              <AlertTriangle size={16} aria-hidden="true" />
              {saveGateMessage}
            </p>
          ) : null}
        </div>
      </section>
      ) : null}

      {activeSurface !== "home" && adminAnnouncements.length ? <AnnouncementStrip announcements={adminAnnouncements.slice(0, 2)} /> : null}
      {activeSurface !== "home" && backendStatus ? (
        <section className="workspace-band backend-status-band" aria-live="polite">
          <p className="status-line backend-status-line">
            {backendMode === "supabase" ? "Supabase" : "Static preview"}: {backendStatus}
          </p>
        </section>
      ) : null}

      {activeSurface === "high-school" ? (
        <HighSchoolSection
          language={language}
          onVolunteerFilter={navigation.volunteerHours}
          onCoopFilter={navigation.coop}
          onMentorshipFilter={navigation.mentorship}
        />
      ) : null}

      {activeSurface === "opportunities" || activeSurface === "high-school" ? (
      <section
        id={activeSurface === "high-school" ? "high-school-results" : "opportunities"}
        className="workspace-band search-band surface-band"
        aria-label={activeSurface === "high-school" ? "High school opportunity search" : "Opportunity search"}
      >
        <div className="search-layout">
          <div className="results-panel">
            <div className="results-toolbar">
              <div>
                <p className="free-only-line">{t(language, "freeOnly")}</p>
                <h2>
                  {visibleOpportunities.length} {t(language, "results")}
                </h2>
              </div>
              <div className="results-actions">
                <SourceScoutMini
                  language={language}
                  reviewCount={generatedDiscoverySummary.newCandidates}
                  sourceCount={generatedDiscoverySummary.sourcesChecked}
                />
                {filterButton}
                <button type="button" className="soft-button research-refresh-button" onClick={refreshResearch} disabled={researchRefreshing}>
                  <RefreshCw size={16} aria-hidden="true" className={researchRefreshing ? "spinning" : ""} />
                  {t(language, "refreshResearch")}
                </button>
                <div className="segmented" aria-label={t(language, "viewMode")}>
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
            </div>
            {researchStatus ? <p className="research-status-line" role="status">{researchStatus}</p> : null}

            <div className="cards-column">
              {visibleOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  language={language}
                  activeLocation={activeLocation}
                  selected={selectedOpportunity?.id === opportunity.id}
                  saved={savedIdSet.has(opportunity.id)}
                  onSelect={() => selectOpportunity(opportunity.id)}
                  onSave={() => toggleSaved(opportunity.id)}
                  onCalendar={() => downloadCalendar(opportunity)}
                />
              ))}
            </div>
          </div>

          <aside className={`selected-column ${viewMode === "map" ? "map-priority" : ""}`} aria-label={t(language, "selectedListingInfo")}>
            {selectedOpportunity ? (
              <div id="selected-listing-details" className="selected-details-card">
                <OpportunityDetails
                  opportunity={selectedOpportunity}
                  language={language}
                  saved={savedIdSet.has(selectedOpportunity.id)}
                  onSave={() => toggleSaved(selectedOpportunity.id)}
                  onCalendar={() => downloadCalendar(selectedOpportunity)}
                  compact
                />
              </div>
            ) : null}

            <div className="map-column">
              <MapPanel
                language={language}
                opportunities={visibleOpportunities}
                selectedId={selectedOpportunity?.id}
                onSelect={selectOpportunity}
                activeLocation={activeLocation}
              />
            </div>
          </aside>
        </div>
      </section>
      ) : null}

      {activeSurface === "support" ? (
        <>
          <SupportSection language={language} />
          <ProjectBackgroundSection language={language} />
        </>
      ) : null}
      {activeSurface === "community-hosts" ? (
        <ContributeSection language={language} onSubmit={submitReviewItem} localQueueCount={localQueueCount} />
      ) : null}

      {filterModal}

      {authOpen ? (
        <AuthModal
          mode={authMode}
          backendMode={backendMode}
          language={language}
          setMode={setAuthMode}
          error={authError}
          notice={authNotice}
          pendingSignup={pendingSignup}
          onClose={() => setAuthOpen(false)}
          onSignin={handleSignin}
          onSignup={handleSignup}
          onVerify={handleVerify}
          onProviderSignin={handleProviderSignin}
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
          discoverySummary={generatedDiscoverySummary}
          discoveryCandidates={generatedDiscoveryReviewCandidates}
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
          savedOpportunities={displayOpportunities.filter((opportunity) => savedIdSet.has(opportunity.id))}
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
  onSignOut,
  navigation,
  isHome
}: {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  currentUser: VerifiedAccount | null;
  onAuthClick: () => void;
  onAccountClick: () => void;
  onSignOut: () => void;
  navigation: HeaderNavigation;
  isHome: boolean;
}) {
  const navItems = [
    [t(language, "navOpportunities"), navigation.opportunities],
    [t(language, "navHighSchoolOpportunities"), navigation.highSchool],
    [t(language, "navAbout"), navigation.about],
    [t(language, "navSupport"), navigation.support]
  ] as const;

  return (
    <header className={`topbar ${isHome ? "home-topbar" : "with-nav"}`}>
      <a
        className="brand-mark"
        href="#top"
        aria-label="GTA FREE STEM Opportunities home"
        onClick={(event) => {
          event.preventDefault();
          navigation.home();
        }}
      >
        <span className="brand-icon">
          <img src="/logo.png" alt="" width={72} height={72} aria-hidden="true" />
        </span>
        <span>
          <strong>GTA FREE STEM Opportunities</strong>
          <small>{t(language, "headerTagline")}</small>
        </span>
      </a>

      {!isHome ? (
        <nav className="primary-nav" aria-label="Primary navigation">
          {navItems.map(([label, action]) => (
            <button key={label} type="button" onClick={action}>
              {label}
            </button>
          ))}
        </nav>
      ) : null}

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
            {t(language, "accountAdmin")}
          </button>
        )}
      </div>
    </header>
  );
}

function SourceScoutMini({
  language,
  sourceCount,
  reviewCount
}: {
  language: LanguageCode;
  sourceCount: number;
  reviewCount: number;
}) {
  const label = t(language, "sourceScoutMiniText")
    .replace("{sources}", String(sourceCount))
    .replace("{review}", String(reviewCount));

  return (
    <div className="source-scout-mini" aria-label="Research refresh status">
      <span className="source-scout-radar" aria-hidden="true">
        <span />
      </span>
      <span>{label}</span>
    </div>
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

function offeredLanguageLabels(opportunity: Opportunity) {
  const uniqueLanguages = Array.from(new Set(opportunity.languages));
  if (uniqueLanguages.length <= 1) return [];
  if (uniqueLanguages.length >= languagePreferenceOrder.length) return [];
  return uniqueLanguages.map((code) => languageMeta[code].label);
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
        {opportunity.communityFocus.includes("Black-focused") ? <span className="chip berry">{t(language, "black")}</span> : null}
        {opportunity.communityFocus.includes("Girls/women-focused") ? <span className="chip lavender">{t(language, "girls")}</span> : null}
        {opportunity.communityFocus.includes("Indigenous-focused") ? <span className="chip mint">{t(language, "indigenous")}</span> : null}
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
          {t(language, "directions")}
        </a>
      </div>
    </article>
  );
}

function MapPanel({
  language,
  opportunities,
  selectedId,
  onSelect,
  activeLocation
}: {
  language: LanguageCode;
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
      <div ref={mapContainer} className="map-canvas" aria-label={t(language, "map")} />
      <div className="map-legend">
        <span>
          <span className="legend-dot" />
          {t(language, "opportunityPin")}
        </span>
        <span>
          <span className="legend-dot current" />
          {t(language, "yourArea")}
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
  const languageLabels = offeredLanguageLabels(opportunity);

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
            {t(language, "directions")}
          </a>
        </div>
      </div>

      <div className="detail-facts">
        <Fact label={t(language, "date")} value={formatDateRange(opportunity.startDate, opportunity.endDate)} />
        <Fact label={t(language, "deadline")} value={formatDeadline(opportunity.deadline)} />
        <Fact label={t(language, "ages")} value={opportunity.ages.max ? `${opportunity.ages.min}-${opportunity.ages.max}` : `${opportunity.ages.min}+`} />
        <Fact label={t(language, "grades")} value={opportunity.grades.join(", ")} />
        <Fact label={t(language, "commitment")} value={opportunity.commitment} />
        {languageLabels.length ? <Fact label={t(language, "languages")} value={languageLabels.join(", ")} /> : null}
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
  onCoopFilter,
  onMentorshipFilter
}: {
  language: LanguageCode;
  onVolunteerFilter: () => void;
  onCoopFilter: () => void;
  onMentorshipFilter: () => void;
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
      title: t(language, "mentorship"),
      text: t(language, "mentorshipCardText"),
      action: onMentorshipFilter
    }
  ];

  return (
    <section id="high-school" className="workspace-band highschool-band" aria-label="High school pathways">
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

function SupportSection({ language }: { language: LanguageCode }) {
  const cards = [
    {
      icon: UserRound,
      title: t(language, "supportBrowseTitle"),
      text: t(language, "supportBrowseText")
    },
    {
      icon: Search,
      title: t(language, "supportSearchTitle"),
      text: t(language, "supportSearchText")
    },
    {
      icon: ListChecks,
      title: t(language, "supportPlainTitle"),
      text: t(language, "supportPlainText")
    }
  ];

  return (
    <section id="accessibility-support" className="workspace-band support-band" aria-label="Accessibility and support">
      <div className="section-heading">
        <p className="eyebrow">{t(language, "supportEyebrow")}</p>
        <h2>{t(language, "supportHeading")}</h2>
      </div>
      <div className="support-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
          <article key={card.title} className="support-card">
            <Icon size={20} aria-hidden="true" />
            <strong>{card.title}</strong>
            <p>{card.text}</p>
          </article>
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
  const hostFields = [
    t(language, "hostOrgName"),
    t(language, "website"),
    t(language, "contactEmail"),
    t(language, "cityRegion"),
    t(language, "hostIdea")
  ];
  const suggestFields = [
    t(language, "officialOpportunityLink"),
    t(language, "contactEmail"),
    t(language, "cityRegion"),
    t(language, "whyFreeUseful")
  ];
  const reportFields = [
    t(language, "listingTitle"),
    t(language, "contactEmail"),
    t(language, "whatNeedsFixing"),
    t(language, "sourceLink")
  ];
  const localSubmissions = t(language, "localSubmissionsBrowser").replace("{count}", String(localQueueCount));

  return (
    <section id="community-hosts" className="workspace-band contribute-band" aria-label="Community participation">
      <div className="section-heading">
        <p className="eyebrow">{t(language, "communityNetwork")}</p>
        <h2>{t(language, "contributeHeading")}</h2>
      </div>
      <div className="contribute-grid community-grid">
        <MiniForm
          title={t(language, "partner")}
          icon={<Handshake size={18} aria-hidden="true" />}
          fields={hostFields}
          submitLabel={t(language, "submit")}
          submittedLabel={t(language, "submitted")}
          onSubmit={(formData) => onSubmit("host", formData)}
        />
        <MiniForm
          title={t(language, "suggest")}
          icon={<Send size={18} aria-hidden="true" />}
          fields={suggestFields}
          submitLabel={t(language, "submit")}
          submittedLabel={t(language, "submitted")}
          onSubmit={(formData) => onSubmit("suggest", formData)}
        />
        <MiniForm
          id="feedback"
          title={t(language, "report")}
          icon={<AlertTriangle size={18} aria-hidden="true" />}
          fields={reportFields}
          submitLabel={t(language, "submit")}
          submittedLabel={t(language, "submitted")}
          onSubmit={(formData) => onSubmit("report", formData)}
        />
        <div className="community-callout">
          <div className="panel-title">
            <Building2 size={18} aria-hidden="true" />
            <span>{t(language, "localHostsWanted")}</span>
          </div>
          <p>{t(language, "communityCalloutText")}</p>
          <span className="chip success">{localSubmissions}</span>
        </div>
      </div>
    </section>
  );
}

function ProjectBackgroundSection({ language }: { language: LanguageCode }) {
  return (
    <section id="project-background" className="workspace-band project-background-band" aria-label="Project background">
      <div className="project-background-card">
        <div className="section-heading">
          <p className="eyebrow">{t(language, "projectBackgroundEyebrow")}</p>
          <h2>{t(language, "projectBackgroundHeading")}</h2>
        </div>
        <p>{t(language, "projectBackgroundP1")}</p>
        <p>{t(language, "projectBackgroundP2")}</p>
        <p>{t(language, "projectBackgroundP3")}</p>
        <p>{t(language, "projectBackgroundP4")}</p>
      </div>
    </section>
  );
}

function MiniForm({
  id,
  title,
  icon,
  fields,
  submitLabel,
  submittedLabel,
  onSubmit
}: {
  id?: string;
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
    <form id={id} className="mini-form" onSubmit={handleSubmit}>
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
  discoverySummary,
  discoveryCandidates,
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
  discoverySummary: typeof generatedDiscoverySummary;
  discoveryCandidates: typeof generatedDiscoveryReviewCandidates;
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
              <RefreshCw size={18} aria-hidden="true" />
              <span>Search engine finds</span>
            </div>
            <Fact label="Sources scanned" value={discoverySummary.sourcesChecked.toString()} />
            <Fact label="Raw candidates" value={discoverySummary.candidatesFound.toString()} />
            <Fact label="Needs review" value={discoverySummary.newCandidates.toString()} />
            <div className="admin-review-list">
              {discoveryCandidates.length ? (
                discoveryCandidates.slice(0, 5).map((candidate) => (
                  <article key={candidate.id} className="admin-review-item discovery-review-item">
                    <div>
                      <strong>{candidate.title}</strong>
                      <span>
                        {candidate.organization} - {candidate.city} - {candidate.confidence}
                      </span>
                      {candidate.reviewReasons.length ? <span>{candidate.reviewReasons.join(" ")}</span> : null}
                    </div>
                    <a href={candidate.sourceUrl} target="_blank" rel="noreferrer" aria-label={`Open source for ${candidate.title}`}>
                      Source
                    </a>
                  </article>
                ))
              ) : (
                <p className="account-note">No new discovery candidates from the latest search run.</p>
              )}
            </div>
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
  language,
  setMode,
  error,
  notice,
  pendingSignup,
  onClose,
  onSignin,
  onSignup,
  onVerify,
  onProviderSignin
}: {
  mode: AuthMode;
  backendMode: BackendMode;
  language: LanguageCode;
  setMode: (mode: AuthMode) => void;
  error: string;
  notice: string;
  pendingSignup: PendingSignup | null;
  onClose: () => void;
  onSignin: (formData: FormData) => Promise<void>;
  onSignup: (formData: FormData) => Promise<void>;
  onVerify: (formData: FormData) => Promise<void>;
  onProviderSignin: (provider: SupabaseOAuthProvider) => Promise<void>;
}) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [humanConfirmed, setHumanConfirmed] = useState(false);
  const [consentMessage, setConsentMessage] = useState("");
  const canUseAccountActions = termsAccepted && humanConfirmed;

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

  const startProviderSignin = (provider: SupabaseOAuthProvider) => {
    if (!canUseAccountActions) {
      setConsentMessage(t(language, "consentRequired"));
      return;
    }
    setConsentMessage("");
    void onProviderSignin(provider);
  };

  return (
    <div className="auth-backdrop" role="presentation">
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <div className="auth-header">
          <div>
            <p className="eyebrow">{t(language, "verifiedAccountRequired")}</p>
            <h2 id="auth-title">
              {mode === "signup" ? t(language, "authSignupTitle") : mode === "verify" ? t(language, "authVerifyTitle") : t(language, "authSigninTitle")}
            </h2>
          </div>
          <button type="button" className="icon-only-button" onClick={onClose} aria-label="Close account dialog">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="auth-tabs" role="tablist" aria-label="Account options">
          <button type="button" className={mode === "signin" ? "active" : ""} onClick={() => setMode("signin")}>
            {t(language, "signIn")}
          </button>
          <button type="button" className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>
            {t(language, "createAccount")}
          </button>
          <button type="button" className={mode === "verify" ? "active" : ""} onClick={() => setMode("verify")} disabled={!pendingSignup}>
            {t(language, "verify")}
          </button>
        </div>

        <div className="account-consent-panel">
          <details>
            <summary>{t(language, "termsTitle")}</summary>
            <p>{t(language, "termsBody")}</p>
          </details>
          <label className="consent-row">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.currentTarget.checked)}
            />
            <span>{t(language, "termsAgree")}</span>
          </label>
          <label className="consent-row">
            <input
              type="checkbox"
              checked={humanConfirmed}
              onChange={(event) => setHumanConfirmed(event.currentTarget.checked)}
            />
            <span>{t(language, "humanCheck")}</span>
          </label>
          <p className="captcha-note">
            {t(language, "captchaNote")}
          </p>
        </div>

        <div className="oauth-panel" aria-label="Fast sign-in options">
          <button type="button" className="oauth-button" onClick={() => startProviderSignin("google")} disabled={!canUseAccountActions}>
            <span className="oauth-logo google-logo" aria-hidden="true">G</span>
            {t(language, "continueGoogle")}
          </button>
          <button type="button" className="oauth-button" onClick={() => startProviderSignin("azure")} disabled={!canUseAccountActions}>
            <span className="oauth-logo microsoft-logo" aria-hidden="true"><i /><i /><i /><i /></span>
            {t(language, "continueMicrosoft")}
          </button>
          <button type="button" className="oauth-button" onClick={() => startProviderSignin("apple")} disabled={!canUseAccountActions}>
            <span className="oauth-logo apple-logo" aria-hidden="true">A</span>
            {t(language, "continueApple")}
          </button>
        </div>

        {consentMessage ? (
          <p className="auth-error" role="alert">
            <AlertTriangle size={16} aria-hidden="true" />
            {consentMessage}
          </p>
        ) : null}

        {backendMode !== "supabase" && !notice ? (
          <p className="auth-notice">
            <ShieldCheck size={16} aria-hidden="true" />
            {t(language, "backendSetupNotice")}
          </p>
        ) : null}

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
              <span>{t(language, "email")}</span>
              <div className="input-icon">
                <Mail size={16} aria-hidden="true" />
                <input name="email" type="email" autoComplete="email" required />
              </div>
            </label>
            <label className="field">
              <span>{t(language, "password")}</span>
              <div className="input-icon">
                <LockKeyhole size={16} aria-hidden="true" />
                <input name="password" type="password" autoComplete="current-password" required />
              </div>
            </label>
            <button type="submit" className="primary-button">
              {t(language, "signIn")}
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </form>
        ) : null}

        {mode === "signup" ? (
          <form className="auth-form" onSubmit={handleSignup}>
            <input type="hidden" name="termsAccepted" value={termsAccepted ? "yes" : ""} />
            <input type="hidden" name="humanCheck" value={humanConfirmed ? "yes" : ""} />
            <label className="field">
              <span>{t(language, "name")}</span>
              <input name="name" autoComplete="name" required />
            </label>
            <label className="field">
              <span>{t(language, "email")}</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <div className="two-col">
              <label className="field">
                <span>{t(language, "accountType")}</span>
                <select name="role" defaultValue="parent" required>
                  <option value="parent">{t(language, "parentCaregiver")}</option>
                  <option value="student">{t(language, "student")}</option>
                </select>
              </label>
              <label className="field">
                <span>{t(language, "gradeOptional")}</span>
                <input name="grade" placeholder="9, 10, 11, 12" />
              </label>
            </div>
            <label className="field">
              <span>{t(language, "passwordLonger")}</span>
              <input name="password" type="password" autoComplete="new-password" minLength={9} required />
            </label>
            <label className="field">
              <span>{t(language, "confirmPassword")}</span>
              <input name="confirmPassword" type="password" autoComplete="new-password" minLength={9} required />
            </label>
            <button type="submit" className="primary-button">
              {t(language, "sendEmailCode")}
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </form>
        ) : null}

        {mode === "verify" ? (
          <form className="auth-form" onSubmit={handleVerify}>
            <p className="verification-copy">
              {backendMode === "supabase"
                ? t(language, "verificationCopySupabase")
                : t(language, "verificationCopyLocal")}
            </p>
            <label className="field">
              <span>{t(language, "emailVerificationCode")}</span>
              <input name="verificationCode" inputMode="numeric" autoComplete="one-time-code" maxLength={6} required />
            </label>
            <button type="submit" className="primary-button" disabled={!pendingSignup}>
              {t(language, "verifyEmailCreate")}
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          </form>
        ) : null}

        <p className="auth-secondary-link">{t(language, "authSecondary")}</p>
      </section>
    </div>
  );
}
