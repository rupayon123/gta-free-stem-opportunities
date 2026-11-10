import type { Metadata } from "next";
import { BetaParticipation } from "@/components/BetaParticipation";

export const metadata: Metadata = {
  title: "iPhone beta",
  description: "Help test GTA FREE STEM on iPhone. See how testing works and how to share feedback.",
  alternates: { canonical: "https://gta-free-stem.pages.dev/beta/" },
  robots: { index: false, follow: true }
};

export default function BetaPage() { return <BetaParticipation />; }
