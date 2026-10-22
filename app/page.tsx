import { HomePage } from "@/components/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTA FREE STEM Opportunities | Free STEM programs in GTA",
  description:
    "Find source-backed free STEM programs for students and families. Browse current Toronto and Markham library events, save favourites, and register with the provider.",
  keywords: [
    "free STEM programs GTA",
    "GTA youth opportunities",
    "volunteer hours Toronto",
    "school co-op opportunities",
    "SHSM and mentorship programs GTA"
  ],
  alternates: {
    canonical: "https://gta-free-stem.vercel.app/",
    languages: {
      en: "https://gta-free-stem.vercel.app/",
      "en-CA": "https://gta-free-stem.vercel.app/",
      "x-default": "https://gta-free-stem.vercel.app/"
    }
  },
  openGraph: {
    title: "GTA FREE STEM Opportunities | Free STEM programs in the Greater Toronto Area",
    description:
      "Explore current free STEM library programs in Toronto and Markham. Search by interest, age, and location without an account.",
    url: "https://gta-free-stem.vercel.app/",
    siteName: "GTA FREE STEM Opportunities",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "GTA FREE STEM Opportunities cover"
      }
    ]
  }
};

export default function Page() {
  return (
    <>
      <HomePage />
    </>
  );
}
