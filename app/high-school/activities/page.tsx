import { HomePage } from "@/components/HomePage";
import { metadataForPage } from "../../seoPages";

export const metadata = metadataForPage("highSchoolActivities");

export default function TeenActivitiesPage() {
  return <HomePage initialSurface="high-school" highSchoolMode="activities" />;
}
