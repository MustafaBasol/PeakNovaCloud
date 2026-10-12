import type { HomeContent } from "../content/home.tr";
import type { HeaderContent } from "../content/header.tr";
import type { NotFoundContent } from "../content/not-found.tr";
import { SiteHeader } from "./SiteHeader";
import { Ascii404, RequestedPath } from "./Ascii404";
import { MotionToggle } from "./MotionToggle";

type Props = {
  content: NotFoundContent;
  /** Header copy (nav, CTA, skip link): the same object the home page passes to SiteHeader. */
  headerContent: Pick<HomeContent, "skipLink" | "nav" | "menuLabel" | "contactLabel" | "contactHref">;
  header?: HeaderContent;
  homeHref: string;
  locale: string;
  logoSrc?: string;
  /** Set false if the locale layout already renders SiteHeader. */
  withHeader?: boolean;
};

/**
 * 404 page, design "404 C. ASCII" (approved 2026-10-12). Server Component; the canvas, the path line
 * and the pause button are the only client parts. Pattern P17 in docs/style/SIS-STYLE-GUIDE.md.
 * Render it from app/[locale]/not-found.tsx so the response keeps status 404 and Next adds noindex.
 */
export function NotFoundPage({ content, headerContent, header, homeHref, locale, logoSrc, withHeader = true }: Props) {
  return (
    <div className="pn-page">
      {withHeader && <SiteHeader content={headerContent} header={header} homeHref={homeHref} locale={locale} logoSrc={logoSrc} />}
      <main id="main" className="pn-nf">
        <div className="pn-nf__panel">
          <Ascii404 className="pn-nf__canvas" />
          <div className="pn-nf__term pn-mono" aria-hidden="true">
            <div>&gt; GET <RequestedPath fallback={content.terminal.pathFallback} /></div>
            <div>&gt; {content.terminal.statusLabel} <i>{content.terminal.status}</i></div>
            <div>&gt; {content.terminal.hintLabel} {content.terminal.hint} <span className="pn-nf__cursor" /></div>
          </div>
          <MotionToggle pauseLabel={content.pauseLabel} playLabel={content.playLabel} className="pn-motion-toggle--on-blue pn-mono" />
        </div>
        <div className="pn-nf__copy">
          <h1 className="pn-nf__title pn-serif">
            {content.titleStart}<em>{content.titleEmphasis}</em>{content.titleEnd}
          </h1>
          <div className="pn-nf__side">
            <p className="pn-nf__lead">{content.lead}</p>
            <div className="pn-nf__actions">
              <a className="pn-nf__btn" href={content.primary.href}>{content.primary.label}</a>
              <a className="pn-nf__link" href={content.secondary.href}>{content.secondary.label}<span className="pn-arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
