import { defineRouting } from "next-intl/routing";

export const locales = ["tr", "en", "fr", "de"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});

export const serviceSlugs = [
  "ai-agents",
  "ai-solutions",
  "automation",
  "full-stack",
] as const;

export const offeringSlugs = [
  "sales-cloud",
  "service-cloud",
  "marketing-cloud",
  "commerce-cloud",
  "tableau-analytics",
  "einstein-ai",
  "mulesoft-integration",
  "slack",
] as const;

export const workSlugs = ["noramedi"] as const;
