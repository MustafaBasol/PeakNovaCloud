import type { HomeContent } from "../content/home.tr";

type Props = { content: HomeContent; homeHref: string };

/** Header from E. Sis. Desktop: logo, 4 links, outlined contact pill. Under 900px: a no-JS disclosure menu. */
export function SiteHeader({ content, homeHref }: Props) {
  return (
    <header className="pn-header">
      <a className="pn-skip" href="#main">{content.skipLink}</a>
      <div className="pn-header__inner">
        <a className="pn-header__logo" href={homeHref} aria-label="PeakNova">
          {/* Horizontal lockup built from the original logo pieces. 950x200 source. */}
          <img src="/brand/logo-horizontal.png" alt="PeakNova" width={114} height={24} />
        </a>
        <nav aria-label="Ana menü">
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
        <a className="pn-header__cta" href={content.contactHref}>{content.contactLabel}</a>
      </div>
    </header>
  );
}
