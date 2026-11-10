import type { Metadata } from "next";
import { BetaInstallation } from "@/components/BetaParticipation";

export const metadata: Metadata = {
  title: "Install the iPhone beta",
  description: "A few simple steps to install GTA FREE STEM through Apple’s TestFlight app.",
  alternates: { canonical: "https://gta-free-stem.pages.dev/beta/ios/" },
  robots: { index: false, follow: true }
};

export default function BetaInstallationPage() { return <BetaInstallation />; }
