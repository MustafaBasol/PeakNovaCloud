import type { HeaderContent } from "./header.tr";
import { headerDe } from "./header.de";
import { headerEn } from "./header.en";
import { headerFr } from "./header.fr";
import { headerTr } from "./header.tr";
import { SHOW_OWN_PRODUCTS } from "./productVisibility";

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

/** Rewrite /tr/ prefixes. YapiFin stays hidden. NoraMedi stays hidden until SHOW_OWN_PRODUCTS. */
export function localizeHeader(header: HeaderContent, locale: string): HeaderContent {
  const swap = (href: string) => swapHref(href, locale);
  const live = (href: string) =>
    !href.includes("yapifin") && (SHOW_OWN_PRODUCTS || !/noramedi|\/products/i.test(href));
  const products = header.products.items
    .filter((item) => live(item.href))
    .map((item) => ({ ...item, href: swap(item.href) }));
  return {
    ...header,
    solutions: {
      ...header.solutions,
      navHref: swap(header.solutions.navHref),
      items: header.solutions.items.map((item) => ({ ...item, href: swap(item.href) })),
      footLink: { ...header.solutions.footLink, href: swap(header.solutions.footLink.href) },
    },
    products: products.length
      ? {
          ...header.products,
          navHref: swap(header.products.navHref),
          items: products,
          footLink: { ...header.products.footLink, href: swap(header.products.footLink.href) },
        }
      : {
          navHref: "",
          items: [],
          footText: "",
          footLink: { label: "", href: "" },
        },
    mobile: {
      ...header.mobile,
      quick: header.mobile.quick.filter((item) => live(item.href)).map((item) => ({ ...item, href: swap(item.href) })),
    },
  };
}
