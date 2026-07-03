import { HomePage } from "@/components/HomePage";
import { metadataForPage } from "../seoPages";

export const metadata = metadataForPage("highSchool");

export default function HighSchoolPage() {
  return <HomePage initialSurface="high-school" />;
}
