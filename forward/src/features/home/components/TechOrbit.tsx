"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { TechContent } from "../content/tech.tr";
import { TECH_LOGOS, type TechLogo } from "../data/techLogos";
import { MotionToggle } from "./MotionToggle";

/**
 * "Teknoloji" section, design U1 "Kalp ve yenilenen yörüngeler" (approved 2026-10-13), pattern P18.
 *
 * Message: PeakNova is the heart and never changes; every tool around it is chosen per problem and
 * keeps changing. Three rings (5 + 9 + 13 = 27 slots) rotate around the heart; every 1.2 s one slot
 * flips and a tool from the waiting pool takes its place. Hovering a tool slows the rings to a stop
 * and shows its name and category.
 *
 * Motion rules: runs only while visible, stops on <html data-motion="paused"> (MotionToggle, WCAG
 * 2.2.2), static and without swaps under prefers-reduced-motion. Server render places the first 27
 * tools at their start angles, so the section is complete without JS. The orbit is decorative
 * (aria-hidden); a visually hidden list carries every tool for assistive technology.
 * All numbers are the approved design values. Do not tune them by eye.
 */
const RINGS = [
  { r: 0.2073, n: 5, w: 0.09 },
  { r: 0.3293, n: 9, w: -0.055 },
  { r: 0.4512, n: 13, w: 0.035 },
] as const;
const SLOT_COUNT = RINGS.reduce((s, r) => s + r.n, 0); // 27
const SWAP_MS = 1200;
const FLIP_MS = 260;

type Slot = { ring: number; a0: number };
const SLOTS: Slot[] = RINGS.flatMap((R, ri) =>
  Array.from({ length: R.n }, (_, i) => ({ ring: ri, a0: (i / R.n) * Math.PI * 2 + ri * 0.4 })),
);

const logo = (id: string): TechLogo => TECH_LOGOS[id] ?? { id, name: id, category: "infra", path: null, hex: null };

type Props = { content: TechContent; logoSrc?: string };

export function TechOrbit({ content, logoSrc = "/brand/logo-horizontal.png" }: Props) {
  const pool = content.pool.filter((id) => TECH_LOGOS[id]);
  const [ids, setIds] = useState<string[]>(() => pool.slice(0, SLOT_COUNT));
  const [flip, setFlip] = useState(-1);
  const [fresh, setFresh] = useState(-1);
  const [ticker, setTicker] = useState<{ inId: string; outId: string } | null>(null);
  const [hover, setHover] = useState(-1);

  const stageRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tipRef = useRef<HTMLDivElement>(null);
  const waiting = useRef<string[]>(pool.slice(SLOT_COUNT));
  const idsRef = useRef(ids);
  const hoverRef = useRef(-1);
  const live = useRef({ visible: false, reduce: false });

  // Rotation: rAF on refs, no React render per frame.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    live.current.reduce = reduce;
    let size = stage.clientWidth, t = 0, speed = 1, last = performance.now(), raf = 0;
    const paused = () => document.documentElement.dataset.motion === "paused";

    const place = () => {
      const c = size / 2;
      SLOTS.forEach((s, i) => {
        const el = slotRefs.current[i];
        if (!el) return;
        const R = RINGS[s.ring], a = s.a0 + t * R.w;
        const x = c + R.r * size * Math.cos(a), y = c + R.r * size * Math.sin(a);
        const k = i === hoverRef.current ? 1.12 : 1;
        el.style.left = "0"; el.style.top = "0";
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${k})`;
        if (i === hoverRef.current && tipRef.current) {
          tipRef.current.style.transform = `translate3d(${x + el.offsetWidth * 0.62}px, ${y - el.offsetHeight * 0.45}px, 0)`;
        }
      });
    };
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = hoverRef.current >= 0 || paused() ? 0 : 1;
      speed += (target - speed) * Math.min(1, dt * 3);
      if (target === 0 && speed < 0.01) speed = 0;
      t += dt * speed;
      place();
    };
    const sync = () => {
      cancelAnimationFrame(raf); raf = 0;
      last = performance.now();
      if (!reduce && live.current.visible) raf = requestAnimationFrame(loop);
    };
    place();

    const io = new IntersectionObserver(([e]) => { live.current.visible = e.isIntersecting; sync(); }, { rootMargin: "120px" });
    io.observe(stage);
    const ro = new ResizeObserver(() => { size = stage.clientWidth; place(); });
    ro.observe(stage);
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); };
  }, []);

  // Renewal: one slot flips and a waiting tool takes its place.
  useEffect(() => {
    const timers: number[] = [];
    const iv = window.setInterval(() => {
      if (live.current.reduce || !live.current.visible || hoverRef.current >= 0) return;
      if (document.documentElement.dataset.motion === "paused" || !waiting.current.length) return;
      const i = Math.floor(Math.random() * SLOT_COUNT);
      setFlip(i);
      timers.push(window.setTimeout(() => {
        const inId = waiting.current.shift()!;
        const next = idsRef.current.slice();
        const outId = next[i];
        next[i] = inId;
        waiting.current.push(outId);
        idsRef.current = next;
        setIds(next);
        setTicker({ inId, outId });
        setFlip(-1);
        setFresh(i);
        timers.push(window.setTimeout(() => setFresh((f) => (f === i ? -1 : f)), 1400));
      }, FLIP_MS));
    }, SWAP_MS);
    return () => { window.clearInterval(iv); timers.forEach((x) => window.clearTimeout(x)); };
  }, []);

  const enter = (i: number) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    hoverRef.current = i;
    setHover(i);
  };
  const leave = () => { hoverRef.current = -1; setHover(-1); };

  const hovered = hover >= 0 ? logo(ids[hover]) : null;
  const byCategory = Object.entries(content.categories).map(([key, label]) => ({
    label,
    names: pool.map(logo).filter((l) => l.category === key).map((l) => l.name),
  })).filter((g) => g.names.length);

  return (
    <section className="pn-tech" aria-labelledby="pn-tech-title">
      <div className="pn-tech__head">
        <p className="pn-tech__kicker"><span aria-hidden="true" />{content.kicker}</p>
        <h2 id="pn-tech-title" className="pn-tech__title pn-serif">
          {content.titleStart}<em>{content.titleEmphasis}</em>{content.titleEnd}
        </h2>
        <p className="pn-tech__lead">{content.lead}</p>
      </div>

      <div className="pn-tech__stage" ref={stageRef} aria-hidden="true">
        <svg className="pn-tech__rings" viewBox="0 0 100 100" focusable="false">
          <circle cx="50" cy="50" r="20.73" />
          <circle cx="50" cy="50" r="32.93" />
          <circle cx="50" cy="50" r="45.12" />
          <circle className="pn-tech__ring--dash" cx="50" cy="50" r="49.39" />
        </svg>
        <div className="pn-tech__glow" />
        <div className="pn-tech__beat" />
        <div className="pn-tech__beat pn-tech__beat--late" />
        <div className="pn-tech__heart">
          <img src={logoSrc} alt="" width={132} height={28} />
        </div>
        {SLOTS.map((s, i) => {
          const L = logo(ids[i]);
          const R = RINGS[s.ring];
          const style = {
            left: `${50 + R.r * 100 * Math.cos(s.a0)}%`,
            top: `${50 + R.r * 100 * Math.sin(s.a0)}%`,
            transform: "translate(-50%, -50%)",
            "--brand": L.hex ?? "var(--pn-ink)",
          } as CSSProperties;
          return (
            <div
              key={i}
              ref={(el) => { slotRefs.current[i] = el; }}
              className="pn-tech__slot"
              style={style}
              data-flip={flip === i || undefined}
              data-fresh={fresh === i || undefined}
              data-hot={hover === i || undefined}
              onPointerEnter={enter(i)}
              onPointerLeave={leave}
            >
              <span className="pn-tech__face">
                {L.path ? (
                  <svg viewBox="0 0 24 24" focusable="false"><path d={L.path} /></svg>
                ) : (
                  <span className="pn-tech__txt">{L.name}</span>
                )}
              </span>
            </div>
          );
        })}
        <div className="pn-tech__tip" ref={tipRef} data-show={hovered ? true : undefined}>
          {hovered && <>{hovered.name}<small>{content.categories[hovered.category]}</small></>}
        </div>
      </div>

      <div className="pn-tech__bar">
        <p className="pn-tech__ticker" aria-hidden="true">
          <span className="pn-tech__pulse" />
          {ticker ? (
            <span><strong>{logo(ticker.inId).name}</strong>{content.tickerIn}<strong>{logo(ticker.outId).name}</strong>{content.tickerOut}</span>
          ) : (
            <span>{content.tickerIdle}</span>
          )}
        </p>
        <MotionToggle pauseLabel={content.pauseLabel} playLabel={content.playLabel} />
      </div>

      <ul className="pn-tech__sr" aria-label={content.listLabel}>
        {byCategory.map((g) => (
          <li key={g.label}>{g.label}: {g.names.join(", ")}</li>
        ))}
      </ul>

      <ol className="pn-tech__principles">
        {content.principles.map((p, i) => (
          <li key={p.title}>
            <span className="pn-tech__num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="pn-serif">{p.title}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
