import { HomePage } from "@/components/HomePage";
import { metadataForPage } from "../seoPages";

export const metadata = metadataForPage("communityHosts");

export default function CommunityHostsPage() {
  return <HomePage initialSurface="community-hosts" />;
}
