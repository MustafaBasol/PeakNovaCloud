"use client";

import { useCallback, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { HomeContent } from "../content/home.tr";
import {
  CLIMB_BASELINE_Y,
  CLIMB_MOUNTAIN_TRANSFORM,
  CLIMB_STARS_ORIGIN,
  CLIMB_STOPS,
  CLIMB_VIEWBOX,
  LOGO_MOUNTAIN_PATH,
} from "../data/landscape";
import { NovaStars } from "./NovaStars";

type Props = { content: HomeContent };

const LAST = 3;

/**
 * "Neler inşa ediyoruz": a 4-step services carousel on the brand-blue band.
 * Each step moves the stone one stop up the logo mountain; on the last step it reaches the
 * summit and the Nova stars appear.
 *
 * All visual state is driven by CSS from two things only: `data-step` on the section and
 * `data-active` / `data-reached` / `aria-selected` on children (see styles/sis.css).
 * Keep it that way: the static reference (reference/sis-reference.html) relies on the same contract.
 */
export function ServicesClimb({ content }: Props) {
  const { services } = content;
  const [step, setStep] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = useCallback((next: number, focusTab = false) => {
    const clamped = Math.max(0, Math.min(LAST, next));
    setStep(clamped);
    if (focusTab) tabRefs.current[clamped]?.focus();
  }, []);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = { ArrowRight: step + 1, ArrowLeft: step - 1, Home: 0, End: LAST };
    if (event.key in keys) {
      event.preventDefault();
      go(keys[event.key], true);
    }
  };

  const stone = CLIMB_STOPS[step];
  const sectionStyle = { "--pn-step": step } as CSSProperties;

  return (
    <section
      className="pn-climb"
      data-step={step}
      style={sectionStyle}
      aria-roledescription="carousel"
      aria-labelledby="pn-climb-title"
    >
      <div className="pn-climb__inner">
        <div className="pn-climb__head">
          <h2 id="pn-climb-title" className="pn-climb__title pn-serif">
            {services.titleStart}
            <em>{services.titleEmphasis}</em>
            {services.titleEnd}
          </h2>
          <div className="pn-climb__arrows">
            <button type="button" className="pn-climb__arrow" aria-label={services.prevLabel} disabled={step === 0} onClick={() => go(step - 1)}>
              ←
            </button>
            <button type="button" className="pn-climb__arrow" aria-label={services.nextLabel} disabled={step === LAST} onClick={() => go(step + 1)}>
              →
            </button>
          </div>
        </div>

        <svg
          className="pn-climb__map"
          viewBox={CLIMB_VIEWBOX}
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label={services.climbLabels[step]}
        >
          <line className="pn-climb__baseline" x1={0} y1={CLIMB_BASELINE_Y} x2={1200} y2={CLIMB_BASELINE_Y} />
          <g transform={CLIMB_MOUNTAIN_TRANSFORM}>
            <path className="pn-climb__mountain" d={LOGO_MOUNTAIN_PATH} />
          </g>
          <NovaStars id="pn-climb-nova" tone="on-blue" className="pn-climb__stars" x={CLIMB_STARS_ORIGIN.x} y={CLIMB_STARS_ORIGIN.y} />
          {CLIMB_STOPS.map((stop, i) => (
            <circle key={i} className="pn-climb__stop" data-reached={i <= step} cx={stop.x} cy={stop.y} r={4} />
          ))}
          <g className="pn-climb__stone" style={{ transform: `translate(${stone.sx}px, ${stone.sy}px)` }}>
            <circle cx={0} cy={0} r={13} />
          </g>
        </svg>

        <div className="pn-climb__viewport" aria-live="polite">
          <div className="pn-climb__track">
            {services.items.map((item, i) => (
              <article
                key={item.id}
                id={`pn-climb-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`pn-climb-tab-${i}`}
                aria-hidden={i !== step}
                className="pn-climb__card"
                data-active={i === step}
              >
                <h3 className="pn-climb__card-title pn-serif">{item.title}</h3>
                <p className="pn-climb__card-text">{item.text}</p>
                <p className="pn-climb__card-examples">{item.examples}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="pn-climb__tabs" role="tablist" aria-label={services.tablistLabel}>
          {services.items.map((item, i) => (
            <button
              key={item.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              id={`pn-climb-tab-${i}`}
              type="button"
              role="tab"
              className="pn-climb__tab"
              aria-selected={i === step}
              aria-controls={`pn-climb-panel-${i}`}
              tabIndex={i === step ? 0 : -1}
              onClick={() => go(i)}
              onKeyDown={onTabKeyDown}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
