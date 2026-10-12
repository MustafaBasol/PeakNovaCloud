import type { HomeContent } from "../content/home.tr";

type Props = { content: HomeContent; homeHref: string; locale: string };

const LOCALES = [
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "tr", label: "Türkçe", short: "TR" },
] as const;

/** Header from E. Sis. Desktop: logo, links, language, outlined contact pill. Under 900px: a no-JS disclosure menu. */
export function SiteHeader({ content, homeHref, locale }: Props) {
  return (
    <header className="pn-header">
      <a className="pn-skip" href="#main">{content.skipLink}</a>
      <div className="pn-header__inner">
        <a className="pn-header__logo" href={homeHref} aria-label="PeakNova">
          {/* Horizontal lockup built from the original logo pieces. 950x200 source. */}
          <img src="/brand/logo-horizontal.png" alt="PeakNova" width={114} height={24} />
        </a>
        <nav aria-label={content.navLabel}>
          <ul className="pn-header__links">
            {content.nav.map((item) => (
              <li key={item.href}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>
        </nav>
        <details className="pn-header__menu">
          <summary>{content.menuLabel}</summary>
          <ul>
            {content.nav.map((item) => (
              <li key={item.href}><a href={item.href}>{item.label}</a></li>
            ))}
            <li><a href={content.contactHref}>{content.contactLabel}</a></li>
          </ul>
        </details>
        <div className="pn-header__tools">
          <nav className="pn-header__lang" aria-label={content.localeLabel}>
            {LOCALES.map((item) => (
              <a
                key={item.code}
                href={`/${item.code}/`}
                hrefLang={item.code}
                lang={item.code}
                aria-label={item.label}
                aria-current={item.code === locale ? "page" : undefined}
              >
                {item.short}
              </a>
            ))}
          </nav>
          <a className="pn-header__cta" href={content.contactHref}>{content.contactLabel}</a>
        </div>
      </div>
    </header>
  );
}
