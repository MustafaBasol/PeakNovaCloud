import type { NotFoundContent } from "./not-found.tr";
import { notFoundDe } from "./not-found.de";
import { notFoundEn } from "./not-found.en";
import { notFoundFr } from "./not-found.fr";
import { notFoundTr } from "./not-found.tr";

const byLocale: Record<string, NotFoundContent> = {
  tr: notFoundTr,
  en: notFoundEn,
  fr: notFoundFr,
  de: notFoundDe,
};

export function notFoundFor(locale: string): NotFoundContent {
  return byLocale[locale] ?? notFoundEn;
}

export function localizeNotFound(content: NotFoundContent, locale: string): NotFoundContent {
  const swap = (href: string) => href.replace(/^\/tr(?=\/)/, `/${locale}`);
  return {
    ...content,
    primary: { ...content.primary, href: swap(content.primary.href) },
    secondary: { ...content.secondary, href: swap(content.secondary.href) },
    terminal: { ...content.terminal, pathFallback: `/${locale}/` },
  };
}
