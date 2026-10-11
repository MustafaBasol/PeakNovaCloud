"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const current = useLocale();
  const t = useTranslations("locale");

  return (
    <nav aria-label={t("label")} className="flex items-center gap-2">
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className="text-[0.8125rem] font-medium no-underline"
            style={{ color: active ? "var(--text)" : "var(--text-subtle)" }}
          >
            {t(locale)}
          </Link>
        );
      })}
    </nav>
  );
}
