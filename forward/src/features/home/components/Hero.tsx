import type { HomeContent } from "../content/home.tr";

type Props = { content: HomeContent };

/** Hero text block. The headline is the LCP element: keep it server-rendered and above any image. */
export function Hero({ content }: Props) {
  const { hero } = content;
  return (
    <section className="pn-hero" aria-labelledby="pn-hero-title">
      <h1 id="pn-hero-title" className="pn-hero__title pn-serif">
        {hero.titleStart}
        <em>{hero.titleEmphasis}</em>
      </h1>
      <p className="pn-hero__lead">{hero.lead}</p>
      <div className="pn-hero__actions">
        <a className="pn-btn" href={content.contactHref}>{content.contactLabel}</a>
        {hero.secondaryHref ? <a className="pn-link" href={hero.secondaryHref}>{hero.secondaryLabel}{"  →"}</a> : null}
      </div>
    </section>
  );
}
