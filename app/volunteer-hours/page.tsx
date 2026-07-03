import { HomePage } from "@/components/HomePage";
import { metadataForPage } from "../seoPages";

export const metadata = metadataForPage("volunteerHours");

export default function VolunteerHoursPage() {
  return <HomePage initialSurface="high-school" initialFilterOverrides={{ volunteerHours: true }} />;
}
