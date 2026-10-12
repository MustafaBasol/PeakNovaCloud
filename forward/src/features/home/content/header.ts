import type { HeaderContent } from "./header.tr";
import { headerDe } from "./header.de";
import { headerEn } from "./header.en";
import { headerFr } from "./header.fr";
import { headerTr } from "./header.tr";

const byLocale: Record<string, HeaderContent> = {
  tr: headerTr,
  en: headerEn,
  fr: headerFr,
  de: headerDe,
};

export function headerFor(locale: string): HeaderContent {
  return byLocale[locale] ?? headerEn;
}

function swapHref(href: string, locale: string) {
  return href.startsWith("https://") ? href : href.replace(/^\/tr(?=\/)/, `/${locale}`);
}

/** Rewrite /tr/ prefixes and hide YapiFin until that product is live. */
export function localizeHeader(header: HeaderContent, locale: string): HeaderContent {
  const swap = (href: string) => swapHref(href, locale);
  const live = (href: string) => !href.includes("yapifin");
  return {
    ...header,
    solutions: {
      ...header.solutions,
      navHref: swap(header.solutions.navHref),
      items: header.solutions.items.map((item) => ({ ...item, href: swap(item.href) })),
      footLink: { ...header.solutions.footLink, href: swap(header.solutions.footLink.href) },
    },
    products: {
      ...header.products,
      navHref: swap(header.products.navHref),
      items: header.products.items.filter((item) => live(item.href)).map((item) => ({ ...item, href: swap(item.href) })),
      footLink: { ...header.products.footLink, href: swap(header.products.footLink.href) },
    },
    mobile: {
      ...header.mobile,
      quick: header.mobile.quick.filter((item) => live(item.href)).map((item) => ({ ...item, href: swap(item.href) })),
    },
  };
}
