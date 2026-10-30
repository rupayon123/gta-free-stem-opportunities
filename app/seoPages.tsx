import type { Metadata } from "next";
import { StorybookMark } from "@/components/StorybookMark";

const siteUrl = "https://gta-free-stem.pages.dev";

const pages = {
  opportunities: {
    path: "/opportunities/",
    title: "Free STEM Opportunities in the Greater Toronto Area",
    description:
      "Search free and accessible STEM programs, library events, workshops, hackathons, and youth learning opportunities across Toronto, Peel, York, Durham, and Halton.",
    heading: "Free STEM opportunities across the GTA",
    intro:
      "GTA FREE STEM Opportunities helps students, parents, caregivers, educators, and community groups find free learning programs across the Greater Toronto Area.",
    points: [
      "Search Toronto, Peel, York, Durham, and Halton in one place.",
      "Browse library events, workshops, STEM clubs, hackathons, camps, and youth programs.",
      "Filter by city, age, category, language, community focus, and distance."
    ],
    keywords: "free STEM programs GTA, free STEM events Toronto, youth STEM opportunities Greater Toronto Area"
  },
  highSchool: {
    path: "/high-school/",
    title: "High School Programmes, Volunteering Guidance and Support",
    description: "Explore reviewed student programmes, provider directories, school-hours guidance and a personal hours notebook. Check each provider’s eligibility, costs and availability.",
    heading: "A student guide to your next step",
    intro: "Explore volunteering, learning, leadership, careers and funding guidance. A programme intake or directory is not a guaranteed role or placement.",
    points: ["Review exact age, grade, residency, costs and commitment requirements.", "Keep directories and unconfirmed intakes separate from confirmed openings.", "Record actual completed volunteering locally; school approval remains separate."],
    keywords: "high school programmes GTA, student volunteering guidance, teen learning and support"
  },
  highSchoolActivities: {
    path: "/high-school/activities/",
    title: "Browse Free Teen Activities in the GTA",
    description: "Browse free library events and learning activities with the existing teen activity search, map and named saved filters. Attendance is not automatically volunteering or school credit.",
    heading: "Free activities for teens",
    intro: "Keep using the teen activity search alongside the new student guide.",
    points: ["Search by topic, city, category and age.", "Use the existing map and local named saved filters.", "Check the provider’s original details before attending."],
    keywords: "free teen activities GTA, library activities teens Toronto"
  },
  volunteerHours: {
    path: "/volunteer-hours/",
    title: "Student Volunteering Guidance and Personal Hours Notebook",
    description: "Review volunteering programme requirements and places to look, read school-hours guidance, and record actual completed minutes in a personal local notebook. GTA does not approve school credit.",
    heading: "Plan and record your volunteering",
    intro: "Understand provider requirements and your school’s process. Programme applications and directories do not guarantee a placement.",
    points: ["Distinguish actual roles, programme intakes and provider directories.", "Confirm age, costs and commitment before agreeing.", "Record completed time and export a personal CSV, separate from school approval."],
    keywords: "student volunteer hours guidance GTA, personal volunteering notebook, high school community involvement"
  },
  coopShsm: {
    path: "/coop-shsm/",
    title: "Co-op and SHSM Planning, Mentorship and Career Guidance",
    description: "Explore related student leadership and career programmes. Ask your school coordinator about co-op placements, SHSM requirements and credit; listed programmes are not confirmed placements.",
    heading: "Plan your next school and career steps",
    intro: "Find related programmes and source information, then work with your school coordinator on eligible co-op and SHSM options.",
    points: ["Check each programme’s audience and current intake.", "Distinguish career learning from a school-approved placement.", "Use provider information and your school’s coordination process."],
    keywords: "co-op SHSM planning GTA, student mentorship guidance, teen career programmes"
  },
  accessibilitySupport: {
    path: "/accessibility-support/",
    title: "Accessible Free STEM Opportunities for GTA Families",
    description:
      "GTA FREE STEM Opportunities is built for accessible browsing, plain-language descriptions, list and map views, multilingual support, and free public search.",
    heading: "Accessible STEM discovery",
    intro:
      "The website is designed so families, newcomers, students, educators, and community groups can browse free STEM opportunities without needing an account.",
    points: [
      "Browse publicly without logging in.",
      "Use list view, map view, city filters, age filters, and plain-language summaries.",
      "Search in a multilingual interface built for GTA communities."
    ],
    keywords: "accessible STEM programs GTA, newcomer family STEM programs, free learning opportunities Toronto"
  },
  privacy: {
    path: "/privacy/",
    title: "Privacy Policy",
    description:
      "Privacy policy for GTA FREE STEM Opportunities, including public browsing, optional location use, local storage, website-only services, provider links, and the Apple app's local-only data flow.",
    heading: "Privacy policy",
    intro:
      "GTA FREE STEM Opportunities is designed for public browsing first. The website can offer optional services when its production backend is configured; Apple app build 1.0 (12) uses only on-device Profile, saved-item, hunt-state, and cache storage.",
    points: [
      "Browse public STEM opportunity listings without creating an account.",
      "Use optional location only when you choose nearby search.",
      "Manage local settings, saved searches, and cached public listings on your device."
    ],
    keywords: "GTA FREE STEM privacy policy, STEM opportunities privacy, Toronto education app privacy"
  },
  terms: {
    path: "/terms/",
    title: "Terms of Use",
    description:
      "Terms for the GTA FREE STEM public opportunity directory and Apple app, including provider links, listing accuracy, acceptable use, disclaimers, and the Apple Standard EULA.",
    heading: "Terms of Use",
    intro:
      "Clear rules for using the free GTA FREE STEM public directory, website, and Apple app.",
    points: [
      "The directory is informational and does not replace official provider details.",
      "Program providers and linked services apply their own terms and privacy practices.",
      "The Apple app licence is governed by Apple's Standard EULA."
    ],
    keywords: "GTA FREE STEM terms of use, STEM opportunities app terms, Apple app terms"
  },
  support: {
    path: "/support/",
    title: "Support",
    description:
      "Public support for the GTA FREE STEM Apple app and website, including app problems, listing corrections, accessibility concerns, and privacy questions.",
    heading: "GTA FREE STEM support",
    intro:
      "Get help with the Apple app or website, report a broken listing, or start a privacy request without a paid support service.",
    points: [
      "Open a public support ticket for an app or website problem.",
      "Report listing corrections with a public provider source.",
      "Keep passwords, precise location, child information, and other private facts out of public tickets."
    ],
    keywords: "GTA FREE STEM support, STEM opportunity app help, GTA FREE STEM privacy support"
  },
  communityHosts: {
    path: "/community-hosts/",
    title: "Host Free STEM, Volunteer Hour, Co-op, or SHSM Opportunities in the GTA",
    description:
      "Community organizations can share free STEM programs, volunteer-hour roles, co-op, SHSM, mentorship, and youth leadership opportunities for GTA students.",
    heading: "Community hosts and program partners",
    intro:
      "Libraries, nonprofits, schools, universities, community groups, and youth-serving organizations can help make free STEM opportunities easier to find.",
    points: [
      "Share free STEM programs and youth learning opportunities.",
      "Support volunteer-hour, mentorship, co-op, SHSM, and leadership pathways.",
      "Help reduce barriers for Black youth, Indigenous youth, girls and women in STEM, newcomers, and underserved communities."
    ],
    keywords: "host free STEM programs GTA, community STEM partners Toronto, youth volunteer hosts GTA"
  }
} as const;

export type SeoPageKey = keyof typeof pages;

export function metadataForPage(key: SeoPageKey): Metadata {
  const page = pages[key];
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: `${siteUrl}${page.path}`,
      languages: {
        "en": `${siteUrl}${page.path}`,
        "en-CA": `${siteUrl}${page.path}`,
        "x-default": `${siteUrl}${page.path}`
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}${page.path}`,
      title: `${page.title} | GTA FREE STEM Opportunities`,
      description: page.description,
      siteName: "GTA FREE STEM Opportunities",
      locale: "en_CA",
      images: [{ url: "/icon.png", width: 512, height: 512, alt: "GTA FREE STEM Opportunities brand mark" }]
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/icon.png"]
    }
  };
}

export function SeoLandingPage({ pageKey }: { pageKey: SeoPageKey }) {
  const page = pages[pageKey];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    url: `${siteUrl}${page.path}`,
    description: page.description,
    isPartOf: {
      "@type": "WebSite",
      name: "GTA FREE STEM Opportunities",
      url: siteUrl
    },
    about: page.points,
    areaServed: ["Toronto", "Peel Region", "York Region", "Durham Region", "Halton Region", "Greater Toronto Area"]
  };

  return (
    <main className="seo-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <section className="seo-hero" aria-labelledby="seo-page-title">
        <a className="seo-logo-link" href="/" aria-label="Open GTA FREE STEM Opportunities">
          <StorybookMark className="seo-storybook-mark" compact ariaHidden />
        </a>
        <p className="beta-pill">GTA FREE STEM Opportunities</p>
        <h1 id="seo-page-title">{page.heading}</h1>
        <p>{page.intro}</p>
        <div className="hero-actions">
          <a className="primary-button" href="/">
            Open the live search
          </a>
          <a className="soft-button" href="/high-school/">
            High school pathways
          </a>
        </div>
      </section>
      <section className="seo-content" aria-label="What people can find here">
        {page.points.map((point) => (
          <article key={point}>
            <strong>{point}</strong>
          </article>
        ))}
      </section>
    </main>
  );
}
