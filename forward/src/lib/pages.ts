import { locales, type Locale } from "@/i18n/routing";

export function localeParams() {
  return locales.map((locale) => ({ locale }));
}

export function withLocale<T extends Record<string, string>>(
  items: readonly T[],
) {
  return locales.flatMap((locale) => items.map((item) => ({ locale, ...item })));
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
