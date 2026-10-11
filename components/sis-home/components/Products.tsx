import type { CSSProperties } from "react";
import type { HomeContent } from "../content/home.tr";

type Props = { content: HomeContent };
type ProductId = HomeContent["products"]["items"][number]["id"];

const d = (delay: number) => ({ animationDelay: `${delay}s` }) as CSSProperties;

/**
 * Abstract, data-free product screens. They hint at what the product does with slow looping motion
 * (calendar slots fill, messages arrive; bars grow, a trend line draws). Replace with real
 * screenshots (anonymised or synthetic data only, style guide P12) when the owner provides them.
 */
function ProductScreen({ id }: { id: ProductId }) {
  if (id === "noramedi") {
    const filled: Record<number, { tone: string; delay: number }> = {
      1: { tone: "soft", delay: 0 }, 6: { tone: "blue", delay: 0.4 }, 8: { tone: "mid", delay: 0.8 }, 11: { tone: "soft", delay: 1.2 },
    };
    return (
      <div className="pn-screen pn-screen--split">
        <div className="pn-screen__calendar">
          <div className="pn-screen__bar" />
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="pn-screen__cell">
              {filled[i] ? <div className={`pn-screen__slot pn-screen__slot--${filled[i].tone}`} style={d(filled[i].delay)} /> : null}
            </div>
          ))}
        </div>
        <div className="pn-screen__chat">
          <div className="pn-screen__bar pn-screen__bar--short" />
          <div className="pn-screen__bubble pn-screen__bubble--in"><span /><span /></div>
          <div className="pn-screen__bubble pn-screen__bubble--out" style={d(0.7)}><span /><span /></div>
          <div className="pn-screen__label" style={d(1.3)}><span className="pn-screen__dot" />Randevu talebi</div>
        </div>
      </div>
    );
  }
  const bars = [[18, 80, 100], [82, 60, 120], [146, 96, 84], [210, 40, 140], [274, 70, 110], [338, 50, 130]];
  return (
    <div className="pn-screen">
      <div className="pn-screen__bar" />
      <svg className="pn-screen__chart" viewBox="0 0 400 200" focusable="false">
        <line x1="0" y1="180" x2="400" y2="180" className="pn-screen__axis" />
        {bars.map(([x, y, h], i) => (
          <rect key={x} className="pn-screen__col" x={x} y={y} width={34} height={h} rx={5} style={d(i * 0.12)} />
        ))}
        <path className="pn-screen__trend" pathLength={1} d="M35 110 C 80 96, 110 70, 163 104 S 240 50, 291 84 S 340 60, 365 58" />
      </svg>
    </div>
  );
}

/** "Kendi ürünlerimiz": NoraMedi and YapiFin as two equal cards (mist surface). */
export function Products({ content }: Props) {
  const p = content.products;
  return (
    <section className="pn-products" aria-labelledby="pn-products-title">
      <div className="pn-products__inner">
        <div className="pn-products__head">
          <h2 id="pn-products-title" className="pn-products__title pn-serif">{p.titleStart}<em>{p.titleEmphasis}</em></h2>
          <p className="pn-products__lead">{p.lead}</p>
        </div>
        <div className="pn-products__grid">
          {p.items.map((item) => (
            <a
              key={item.id}
              className="pn-product"
              href={item.href}
              {...(item.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <div className="pn-product__media" aria-hidden="true">
                <ProductScreen id={item.id} />
              </div>
              <div className="pn-product__body">
                <div className="pn-product__tags">
                  {item.tags.map((t, i) => (
                    <span key={t} className={i === 0 ? "pn-tag" : "pn-tag pn-tag--status"}>{t}</span>
                  ))}
                </div>
                <h3 className="pn-product__name pn-serif">{item.name}</h3>
                <p className="pn-product__text">{item.text}</p>
                <span className="pn-product__link">{item.linkLabel}<span className="pn-arrow" aria-hidden="true">→</span></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
