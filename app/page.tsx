import { HomePage } from "@/components/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "GTA Free STEM Opportunities | Free Activities for Every Age" },
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
    canonical: "https://gta-free-stem.pages.dev/",
    languages: {
      en: "https://gta-free-stem.pages.dev/",
      "en-CA": "https://gta-free-stem.pages.dev/",
      "x-default": "https://gta-free-stem.pages.dev/"
    }
  },
  openGraph: {
    title: "GTA Free STEM Opportunities | Free Activities for Every Age",
    description:
      "Explore free library events and STEM activities for every age. Search by interest, age and location without an account.",
    url: "https://gta-free-stem.pages.dev/",
    siteName: "GTA Free STEM Opportunities",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
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
