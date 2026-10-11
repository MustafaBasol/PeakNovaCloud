import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { serviceSlugs } from "@/i18n/routing";

export function SiteFooter() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)]">
      <div
        className="mx-auto grid gap-10 px-[clamp(16px,4vw,40px)] py-16 sm:grid-cols-3"
        style={{ maxWidth: "var(--max-width)" }}
      >
        <div>
          <p className="font-medium" style={{ color: "var(--text)" }}>
            PeakNova
          </p>
          <p className="mt-3 max-w-[36ch] text-[0.9375rem] text-[var(--text-muted)]">
            {t("footer.note")}
          </p>
        </div>
        <div>
          <p className="text-[0.8125rem] font-medium text-[var(--text-subtle)]">
            {t("footer.services")}
          </p>
          <ul className="mt-3 space-y-2">
            {serviceSlugs.map((slug) => (
              <li key={slug}>
                <Link href={`/services/${slug}`}>{t(`services.${slug}`)}</Link>
              </li>
            ))}
            <li>
              <Link href="/services/crm-salesforce">
                {t("services.crm-salesforce")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[0.8125rem] font-medium text-[var(--text-subtle)]">
            {t("footer.studio")}
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/work">{t("nav.work")}</Link>
            </li>
            <li>
              <Link href="/blog">{t("nav.blog")}</Link>
            </li>
            <li>
              <Link href="/about">{t("nav.about")}</Link>
            </li>
            <li>
              <Link href="/contact">{t("nav.contact")}</Link>
            </li>
            <li>
              <Link href="/privacy">{t("pages.privacy")}</Link>
            </li>
            <li>
              <Link href="/legal">{t("pages.legal")}</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="px-[clamp(16px,4vw,40px)] pb-8 text-[0.8125rem] text-[var(--text-subtle)]">
        {year} PeakNova
      </p>
    </footer>
  );
}
