import { HomePage } from "@/components/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTA FREE STEM Opportunities | Free activities for every age in the GTA",
  description:
    "Find free activities for babies, children, teens, adults and older adults in the GTA. Filter library events and STEM programs by city, age and interest.",
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
      "Explore free library events and STEM activities for every age. Search by interest, age and location without an account.",
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
