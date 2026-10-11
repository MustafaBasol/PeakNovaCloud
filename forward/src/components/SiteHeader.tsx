import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";

const links = [
  ["services", "/services"],
  ["work", "/work"],
  ["blog", "/blog"],
  ["about", "/about"],
] as const;

export function SiteHeader() {
  const t = useTranslations("nav");

  return (
    <header
      className="sticky top-0 z-20 border-b border-[var(--line)]"
      style={{
        height: "var(--nav-height)",
        background: "var(--nav-scrolled)",
        backdropFilter: "blur(20px) saturate(160%)",
      }}
    >
      <div
        className="mx-auto flex h-full items-center justify-between gap-6 px-[clamp(16px,4vw,40px)]"
        style={{ maxWidth: "var(--max-width)" }}
      >
        <Link href="/" className="no-underline" style={{ color: "var(--text)" }}>
          <img
            src="/brand/logo-full-transparent.png"
            alt="PeakNova"
            width={132}
            height={28}
          />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="PeakNova">
          {links.map(([key, href]) => (
            <Link
              key={key}
              href={href}
              className="text-[0.9375rem] no-underline"
              style={{ color: "var(--text)" }}
            >
              {t(key)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <Link href="/contact" className="btn-primary nav-cta">
            {t("contact")}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
