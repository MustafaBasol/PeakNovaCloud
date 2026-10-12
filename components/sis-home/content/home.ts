import type { HomeContent } from "./home.tr";
import { homeDe } from "./home.de";
import { homeEn } from "./home.en";
import { homeFr } from "./home.fr";
import { homeTr } from "./home.tr";
import { SHOW_OWN_PRODUCTS } from "./productVisibility";

const byLocale: Record<string, HomeContent> = {
  tr: homeTr,
  en: homeEn,
  fr: homeFr,
  de: homeDe,
};

export function homeFor(locale: string): HomeContent {
  return byLocale[locale] ?? homeEn;
}

function namesOwnProduct(value: string) {
  return /noramedi|yapifin/i.test(value);
}

/** Rewrite /tr/ prefixes. YapiFin stays hidden. NoraMedi stays hidden until SHOW_OWN_PRODUCTS. */
export function localizeHome(content: HomeContent, locale: string): HomeContent {
  const swap = (href: string) =>
    href.startsWith("https://") ? href : href.replace(/^\/tr(?=\/)/, `/${locale}`);
  const showSecondary = SHOW_OWN_PRODUCTS || !namesOwnProduct(content.hero.secondaryHref);
  const productItems = content.products.items
    .filter((item) => item.id !== "yapifin" && (SHOW_OWN_PRODUCTS || item.id !== "noramedi"))
    .map((item) => ({ ...item, href: swap(item.href) }));
  return {
    ...content,
    nav: content.nav
      .filter((item) => SHOW_OWN_PRODUCTS || !item.href.includes("/products"))
      .map((item) => ({ ...item, href: swap(item.href) })),
    contactHref: swap(content.contactHref),
    hero: {
      ...content.hero,
      secondaryLabel: showSecondary ? content.hero.secondaryLabel : "",
      secondaryHref: showSecondary ? swap(content.hero.secondaryHref) : "",
    },
    services: {
      ...content.services,
      items: content.services.items.map((item) => ({
        ...item,
        href: swap(item.href),
        proof: !SHOW_OWN_PRODUCTS && item.proof && namesOwnProduct(item.proof) ? undefined : item.proof,
      })),
    },
    products: productItems.length
      ? { ...content.products, items: productItems }
      : { titleStart: "", titleEmphasis: "", lead: "", items: [] },
  };
}
