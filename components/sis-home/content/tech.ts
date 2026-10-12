import { techDe } from "./tech.de";
import { techEn } from "./tech.en";
import { techFr } from "./tech.fr";
import type { TechContent } from "./tech.tr";
import { techTr } from "./tech.tr";

const byLocale: Record<string, TechContent> = {
  tr: techTr,
  en: techEn,
  fr: techFr,
  de: techDe,
};

export function techFor(locale: string): TechContent {
  return byLocale[locale] ?? techEn;
}
