import { HomePage } from "@/components/HomePage";
import { metadataForPage } from "../seoPages";

export const metadata = metadataForPage("accessibilitySupport");

export default function AccessibilitySupportPage() {
  return <HomePage initialSurface="support" />;
}
