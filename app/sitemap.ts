import type { MetadataRoute } from "next";
import { programLastModified, programUrl, publicProgramPages } from "@/lib/programPages";

export const dynamic = "force-static";
const siteUrl = "https://gta-free-stem.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastUpdated = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: lastUpdated,
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${siteUrl}/opportunities/`,
      lastModified: lastUpdated,
      changeFrequency: "daily",
      priority: 0.95
    },
    {
      url: `${siteUrl}/high-school/`,
      lastModified: lastUpdated,
      changeFrequency: "daily",
      priority: 0.93
    },
    {
      url: `${siteUrl}/volunteer-hours/`,
      lastModified: lastUpdated,
      changeFrequency: "daily",
      priority: 0.92
    },
    {
      url: `${siteUrl}/coop-shsm/`,
      lastModified: lastUpdated,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${siteUrl}/accessibility-support/`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.82
    },
    {
      url: `${siteUrl}/privacy/`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${siteUrl}/terms/`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${siteUrl}/support/`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.75
    },
    {
      url: `${siteUrl}/community-hosts/`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.75
    },
    {
      url: `${siteUrl}/programs/`,
      lastModified: lastUpdated,
      changeFrequency: "daily",
      priority: 0.9
    },
    ...publicProgramPages.map((program) => ({
      url: programUrl(program),
      lastModified: programLastModified(program),
      changeFrequency: "daily" as const,
      priority: 0.8
    }))
  ];
}
