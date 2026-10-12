import type { HomeContent } from "../content/home.tr";

type Props = { content: HomeContent };

export function ClosingCta({ content }: Props) {
  const { cta } = content;
  return (
    <section className="pn-cta" aria-labelledby="pn-cta-title">
      <svg width={20} height={20} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        <circle className="pn-cta__dot" cx={10} cy={10} r={8} />
      </svg>
      <h2 id="pn-cta-title" className="pn-cta__title pn-serif">
        {cta.titleStart}<em>{cta.titleEmphasis}</em>{cta.titleEnd}
      </h2>
      <p className="pn-cta__lead">{cta.lead}</p>
      <a className="pn-btn" href={content.contactHref}>{content.contactLabel}</a>
    </section>
  );
}
