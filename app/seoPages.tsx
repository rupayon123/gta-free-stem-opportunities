import type { Metadata } from "next";

const siteUrl = "https://gta-free-stem.vercel.app";

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
    title: "High School STEM Opportunities, Co-op, SHSM, Mentorship, and Volunteer Hours",
    description:
      "Find free high school STEM opportunities across the GTA, including volunteer hours, co-op, SHSM, mentorship, leadership, and career exploration.",
    heading: "High school STEM pathways",
    intro:
      "The high school section focuses on practical opportunities that can support volunteer hours, SHSM exploration, co-op conversations, mentorship, and youth leadership.",
    points: [
      "Find STEM and learning volunteer-hour opportunities.",
      "Explore co-op, SHSM, mentorship, leadership, and career exposure options.",
      "Use focused filters for high school students across the GTA."
    ],
    keywords: "high school STEM opportunities GTA, SHSM opportunities Toronto, co-op STEM opportunities Ontario"
  },
  volunteerHours: {
    path: "/volunteer-hours/",
    title: "Free Volunteer Hour Opportunities for GTA Students",
    description:
      "Find free STEM, learning, library, conservation, and youth leadership volunteer-hour opportunities for high school students across the GTA.",
    heading: "Volunteer hours for students",
    intro:
      "Students can search for free community opportunities that may support school volunteer-hour requirements and build real experience.",
    points: [
      "Discover library, conservation, STEM, and youth leadership roles.",
      "Find opportunities connected to learning, community service, and local organizations.",
      "Browse without creating an account."
    ],
    keywords: "student volunteer hours GTA, high school volunteer hours Toronto, STEM volunteering GTA"
  },
  coopShsm: {
    path: "/coop-shsm/",
    title: "Free Co-op and SHSM STEM Opportunities in the GTA",
    description:
      "Explore free-to-access co-op, SHSM, placement, mentorship, and career exploration opportunities connected to STEM and youth learning across the GTA.",
    heading: "Co-op and SHSM discovery",
    intro:
      "The platform helps students and educators discover local organizations that may support STEM co-op, SHSM, mentorship, and career exploration pathways.",
    points: [
      "Search for free-to-access STEM career exploration opportunities.",
      "Find community hosts and organizations open to youth learning pathways.",
      "Use source links to connect directly with the provider."
    ],
    keywords: "free co-op opportunities GTA, SHSM STEM placements, youth career exploration Toronto"
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
    title: `${page.title} | GTA FREE STEM Opportunities`,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: `${siteUrl}${page.path}`
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
      images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "GTA FREE STEM Opportunities logo" }]
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/logo.png"]
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
          <img src="/logo.png" width="132" height="132" alt="GTA FREE STEM Opportunities logo" />
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
