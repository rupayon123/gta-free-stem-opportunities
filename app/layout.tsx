import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import type { Metadata } from "next";

const siteUrl = "https://gta-free-stem.vercel.app";
const siteTitle = "GTA FREE STEM Opportunities";
const siteDescription =
  "Find free and accessible STEM programs, library events, volunteer hours, co-op, SHSM, mentorship, and youth opportunities across the Greater Toronto Area.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteTitle,
  title: {
    default: `${siteTitle} | Free STEM programs in the Greater Toronto Area`,
    template: `%s | ${siteTitle}`
  },
  description: siteDescription,
  keywords: [
    "GTA free STEM opportunities",
    "Greater Toronto Area STEM programs",
    "free STEM programs Toronto",
    "free STEM programs Mississauga",
    "free STEM programs Brampton",
    "free STEM programs Markham",
    "free STEM programs Scarborough",
    "free STEM programs Vaughan",
    "free STEM programs Durham",
    "youth STEM programs GTA",
    "student volunteer hours GTA",
    "high school co-op SHSM opportunities",
    "free library STEM events",
    "accessible STEM programs",
    "Black youth STEM programs",
    "girls STEM programs",
    "Indigenous youth STEM programs",
    "newcomer family STEM programs"
  ],
  alternates: {
    canonical: siteUrl
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
    url: siteUrl,
    siteName: siteTitle,
    title: `${siteTitle} | Free STEM programs in the Greater Toronto Area`,
    description: siteDescription,
    locale: "en_CA",
    images: [
      {
        url: "/icon.png",
        width: 1024,
        height: 1024,
        alt: "GTA FREE STEM Opportunities brand mark"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteTitle} | Free STEM programs in the GTA`,
    description: siteDescription,
    images: ["/icon.png"]
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteTitle,
        url: siteUrl,
        inLanguage: "en-CA",
        description: siteDescription,
        audience: [
          {
            "@type": "Audience",
            audienceType: "students, parents, caregivers, educators, community groups, newcomer families"
          }
        ],
        about: [
          "Free STEM programs in the Greater Toronto Area",
          "Accessible youth learning opportunities",
          "Volunteer hours, co-op, SHSM, mentorship, and library STEM events"
        ],
        areaServed: [
          "Toronto",
          "Peel Region",
          "York Region",
          "Durham Region",
          "Halton Region",
          "Greater Toronto Area"
        ],
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/#app`,
        name: siteTitle,
        url: siteUrl,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "CAD"
        },
        featureList: [
          "Free and accessible STEM opportunity search",
          "Map and list discovery",
          "Filters for age, city, region, category, volunteer hours, co-op, SHSM, mentorship, and EDI-focused opportunities",
          "Multilingual interface for Greater Toronto Area communities",
          "Public browsing without an account"
        ]
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Greater Toronto Area" />
        <meta name="theme-color" content="#3b96d4" />
        <meta
          name="subject"
          content="Free and accessible STEM opportunities for students, parents, educators, and community groups across the Greater Toronto Area"
        />
        <link rel="canonical" href={siteUrl} />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const preference = localStorage.getItem("gta-stem-opportunities-theme") || "light";
                  const resolved = preference === "system"
                    ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
                    : preference;
                  document.documentElement.dataset.theme = resolved;
                  document.documentElement.dataset.themePreference = preference;
                } catch {
                  document.documentElement.dataset.theme = "light";
                  document.documentElement.dataset.themePreference = "light";
                }
              })();
            `
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
