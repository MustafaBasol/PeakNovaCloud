"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { HomeContent } from "../content/home.tr";
import { AsciiMountain } from "./AsciiMountain";
import { MotionToggle } from "./MotionToggle";

type Props = { content: HomeContent };

/**
 * "Neler inşa ediyoruz", design W1 "ASCII Zirve" (approved 2026-10-11).
 *
 * Blue band. Heading row, then the living ASCII logo mountain (AsciiMountain, full bleed), then an
 * index: a vertical tablist of the areas on the left, the selected area in full on the right
 * (problem, solution, three deliverables, building blocks, verified proof, link).
 *
 * Keyboard: ArrowUp/ArrowDown move between areas (roving tabindex), Home/End jump; selection
 * follows focus. All panels are in the DOM for SEO and no-JS; only the active one is shown.
 */
export function WhatWeBuild({ content }: Props) {
  const s = content.services;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = s.items.length - 1;

  const go = (i: number) => {
    const k = Math.max(0, Math.min(last, i));
    setActive(k);
    tabs.current[k]?.focus();
  };
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const map: Record<string, number> = { ArrowDown: active + 1, ArrowUp: active - 1, Home: 0, End: last };
    if (e.key in map) { e.preventDefault(); go(map[e.key]); }
  };

  return (
    <section className="pn-build" aria-labelledby="pn-build-title">
      <div className="pn-build__inner">
        <div className="pn-build__head">
          <p className="pn-build__kicker pn-mono">{s.kicker}</p>
          <h2 id="pn-build-title" className="pn-build__title pn-serif">
            {s.titleStart}<em>{s.titleEmphasis}</em>{s.titleEnd}
          </h2>
          <p className="pn-build__lead">{s.lead}</p>
        </div>

        <div className="pn-build__art">
          <AsciiMountain className="pn-build__canvas" />
          <span className="pn-build__caption pn-mono" aria-hidden="true">{s.artCaption}</span>
          <MotionToggle className="pn-motion-toggle--on-blue pn-mono" pauseLabel={s.pauseLabel} playLabel={s.playLabel} />
        </div>

        <div className="pn-build__index">
          <div className="pn-build__list" role="tablist" aria-label={s.tablistLabel} aria-orientation="vertical">
            {s.items.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => { tabs.current[i] = el; }}
                id={`pn-build-tab-${item.id}`}
                type="button"
                role="tab"
                className="pn-build__row"
                aria-selected={i === active}
                aria-controls={`pn-build-panel-${item.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onKey}
              >
                <span className="pn-build__code pn-mono">{item.code}</span>
                <span className="pn-build__name pn-serif">{item.title}</span>
                <span className="pn-build__point" aria-hidden="true" />
              </button>
            ))}
          </div>

          {s.items.map((item, i) => (
            <div
              key={item.id}
              id={`pn-build-panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`pn-build-tab-${item.id}`}
              className="pn-build__panel"
              hidden={i !== active}
            >
              <div className="pn-build__meta">
                <span className="pn-mono">{item.code}</span>
                {item.proof ? <span className="pn-build__proof">{item.proof}</span> : null}
              </div>
              <p className="pn-build__problem pn-serif">{s.quoteOpen}{item.problem}{s.quoteClose}</p>
              <p className="pn-build__solution">{item.solution}</p>
              <ul className="pn-build__deliverables">
                {item.deliverables.map((d) => <li key={d}>{d}</li>)}
              </ul>
              <ul className="pn-build__blocks pn-mono" aria-label={s.blocksLabel}>
                {item.blocks.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <a className="pn-build__link" href={item.href}>{s.linkBefore}{item.title}{s.linkAfter}<span className="pn-arrow" aria-hidden="true">→</span></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
