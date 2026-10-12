import type { HomeContent } from "./home.tr";
import { homeDe } from "./home.de";
import { homeEn } from "./home.en";
import { homeFr } from "./home.fr";
import { homeTr } from "./home.tr";

const byLocale: Record<string, HomeContent> = {
  tr: homeTr,
  en: homeEn,
  fr: homeFr,
  de: homeDe,
};

export function homeFor(locale: string): HomeContent {
  return byLocale[locale] ?? homeEn;
}

/** Rewrite /tr/ prefixes and hide YapiFin until that product is live. */
export function localizeHome(content: HomeContent, locale: string): HomeContent {
  const swap = (href: string) =>
    href.startsWith("https://") ? href : href.replace(/^\/tr(?=\/)/, `/${locale}`);
  return {
    ...content,
    nav: content.nav.map((item) => ({ ...item, href: swap(item.href) })),
    contactHref: swap(content.contactHref),
    hero: { ...content.hero, secondaryHref: swap(content.hero.secondaryHref) },
    services: {
      ...content.services,
      items: content.services.items.map((item) => ({ ...item, href: swap(item.href) })),
    },
    products: {
      ...content.products,
      items: content.products.items
        .filter((item) => item.id !== "yapifin")
        .map((item) => ({ ...item, href: swap(item.href) })),
    },
  };
}
