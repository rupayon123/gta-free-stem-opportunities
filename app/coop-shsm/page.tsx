import { HomePage } from "@/components/HomePage";
import { metadataForPage } from "../seoPages";

export const metadata = metadataForPage("coopShsm");

export default function CoopShsmPage() {
  return <HomePage initialSurface="high-school" initialFilterOverrides={{ coop: true }} />;
}
