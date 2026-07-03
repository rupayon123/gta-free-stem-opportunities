import { HomePage } from "@/components/HomePage";
import { metadataForPage } from "../seoPages";

export const metadata = metadataForPage("opportunities");

export default function OpportunitiesPage() {
  return <HomePage initialSurface="opportunities" />;
}
