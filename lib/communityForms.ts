import { t } from "./i18n";
import type { LanguageCode } from "./types";

export const communityFormKinds = ["host", "suggest", "report"] as const;

export type CommunityFormKind = (typeof communityFormKinds)[number];

export const communityFormFieldNames = [
  "organizationName",
  "website",
  "contactEmail",
  "cityRegion",
  "hostIdea",
  "officialOpportunityLink",
  "whyFreeUseful",
  "listingTitle",
  "whatNeedsFixing",
  "sourceLink"
] as const;

export type CommunityFormFieldName = (typeof communityFormFieldNames)[number];

export type CommunityFormField = {
  name: CommunityFormFieldName;
  label: string;
  type?: "email" | "url";
  autoComplete?: string;
};

export type CommunityFormFields = Record<CommunityFormKind, CommunityFormField[]>;

export function communityFormFields(language: LanguageCode): CommunityFormFields {
  return {
    host: [
      { name: "organizationName", label: t(language, "hostOrgName") },
      { name: "website", label: t(language, "website"), type: "url" },
      { name: "contactEmail", label: t(language, "contactEmail"), type: "email", autoComplete: "email" },
      { name: "cityRegion", label: t(language, "cityRegion") },
      { name: "hostIdea", label: t(language, "hostIdea") }
    ],
    suggest: [
      { name: "officialOpportunityLink", label: t(language, "officialOpportunityLink"), type: "url" },
      { name: "contactEmail", label: t(language, "contactEmail"), type: "email", autoComplete: "email" },
      { name: "cityRegion", label: t(language, "cityRegion") },
      { name: "whyFreeUseful", label: t(language, "whyFreeUseful") }
    ],
    report: [
      { name: "listingTitle", label: t(language, "listingTitle") },
      { name: "contactEmail", label: t(language, "contactEmail"), type: "email", autoComplete: "email" },
      { name: "whatNeedsFixing", label: t(language, "whatNeedsFixing") },
      { name: "sourceLink", label: t(language, "sourceLink"), type: "url" }
    ]
  };
}
