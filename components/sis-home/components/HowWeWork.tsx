"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { HomeContent } from "../content/home.tr";
import {
  ASCENT_RIDGE_PATH,
  ASCENT_STOPS,
  BLUEPRINT_STARS,
  BLUEPRINT_VIEWBOX,
  LOGO_MOUNTAIN_PATH,
  ascentPoint,
} from "../data/landscape";

type Props = { content: HomeContent };

const STEP_COUNT = 6;
const LAST = STEP_COUNT - 1;

function sparkle(cx: number, cy: number, s: number) {
  return `M${cx} ${cy - s} Q${cx} ${cy} ${cx + s} ${cy} Q${cx} ${cy} ${cx} ${cy + s} Q${cx} ${cy} ${cx - s} ${cy} Q${cx} ${cy} ${cx} ${cy - s} Z`;
}

/** One segment of the progress meter under the mountain. Fills while its step is being climbed. */
function MeterSegment({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const scaleX = useTransform(progress, (p) => Math.max(0, Math.min(1, p * LAST - index + 1)));
  return (
    <span className="pn-ascent__meter-seg">
      <motion.span className="pn-ascent__meter-fill" style={{ scaleX }} />
    </span>
  );
}

/**
 * "Nasıl çalışıyoruz", design K2 "Tırmanış" (approved 2026-10-11).
 *
 * Desktop: the logo mountain is pinned on the left. As the six steps scroll past on the right,
 * the stone climbs the ridge, a gold trail is drawn behind it, the meter fills, and at the last
 * step the Nova stars appear at the summit.
 * Phone: the mountain becomes a sticky band; the steps scroll under it.
 *
 * Progress is scroll-linked. 0 = first step centred, 1 = last step centred.
 * Without JavaScript every step is fully visible and the mountain shows the start position.
 * With reduced motion the scroll link stays; fades are removed.
 */
export function HowWeWork({ content }: Props) {
  const p = content.process;
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => setReady(true), []);

  const { scrollYProgress: raw } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] });
  const progress = useTransform(raw, [0.5 / STEP_COUNT, (STEP_COUNT - 0.5) / STEP_COUNT], [0, 1], { clamp: true });

  const stoneX = useTransform(progress, (t) => ascentPoint(t)[0]);
  const stoneY = useTransform(progress, (t) => ascentPoint(t)[1]);
  const guidesOpacity = useTransform(progress, [0, 1], [0.55, 0.2]);

  useMotionValueEvent(progress, "change", (t) => {
    const k = Math.round(t * LAST);
    setActive((prev) => (prev === k ? prev : k));
  });

  const summit = active === LAST;

  return (
    <section
      className="pn-ascent"
      aria-labelledby="pn-ascent-title"
      data-ready={ready ? "true" : undefined}
      data-reduce={reduce ? "true" : undefined}
    >
      <div className="pn-ascent__intro">
        <h2 id="pn-ascent-title" className="pn-ascent__title pn-serif">
          {p.titleStart}<em>{p.titleEmphasis}</em>
        </h2>
        <p className="pn-ascent__lead">{p.lead}</p>
      </div>

      <div className="pn-ascent__grid">
        <div className="pn-ascent__stage">
          <svg className="pn-ascent__mountain" viewBox={BLUEPRINT_VIEWBOX} role="img" aria-label={p.figureLabel} focusable="false">
            <defs>
              <radialGradient id="pn-ascent-halo">
                <stop offset="0" stopColor="#2A6FC2" stopOpacity={0.45} />
                <stop offset="0.4" stopColor="#2A6FC2" stopOpacity={0.12} />
                <stop offset="1" stopColor="#2A6FC2" stopOpacity={0} />
              </radialGradient>
            </defs>
            <motion.g className="pn-ascent__guides" style={{ opacity: guidesOpacity }}>
              <circle cx={442} cy={186} r={186} />
              <circle cx={693} cy={240} r={132} />
              <path d="M-40 371 L1040 371 M-40 0 L1040 0 M442 -80 L442 400 M693 -80 L693 400" />
            </motion.g>
            <path className="pn-ascent__outline" d={LOGO_MOUNTAIN_PATH} />
            <path className="pn-ascent__route" d={ASCENT_RIDGE_PATH} />
            <motion.path className="pn-ascent__trail" d={ASCENT_RIDGE_PATH} style={{ pathLength: progress }} />
            {ASCENT_STOPS.map(([x, y], k) => (
              <circle key={k} className="pn-ascent__stop" cx={x} cy={y} r={7} data-reached={k <= active ? "true" : undefined} />
            ))}
            <g className="pn-ascent__stars" data-on={summit ? "true" : undefined}>
              {BLUEPRINT_STARS.map((s) => (
                <circle key={`h${s.cx}`} cx={s.cx} cy={s.cy} r={s.halo} fill="url(#pn-ascent-halo)" />
              ))}
              {BLUEPRINT_STARS.map((s) => (
                <g key={`s${s.cx}`}>
                  <circle cx={s.cx} cy={s.cy} r={s.core} fill="#FFFFFF" />
                  <path className="pn-ascent__sparkle" d={sparkle(s.cx, s.cy, s.size)} />
                </g>
              ))}
            </g>
            <motion.g style={{ x: stoneX, y: stoneY }}>
              <circle className="pn-ascent__stone" r={20} />
            </motion.g>
          </svg>
          <div className="pn-ascent__status" aria-hidden="true">
            <span className="pn-ascent__dot" />
            <span>{p.steps[active]?.altitude}</span>
          </div>
          <div className="pn-ascent__meter" aria-hidden="true">
            {p.steps.map((s, k) => <MeterSegment key={s.verb} progress={progress} index={k} />)}
          </div>
        </div>

        <ol ref={listRef} className="pn-ascent__steps">
          {p.steps.map((s, k) => (
            <li key={s.verb} className="pn-ascent__step" data-active={k === active ? "true" : undefined} aria-current={k === active ? "step" : undefined}>
              <div className="pn-ascent__altitude"><span aria-hidden="true" />{s.altitude}</div>
              <h3 className="pn-ascent__verb pn-serif">{s.verb}</h3>
              <p className="pn-ascent__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
