"use client";

import { useEffect, useRef } from "react";
import { HERO_RIDGES, LOGO_MOUNTAIN_PATH } from "../data/landscape";

/**
 * Living ASCII render of the PeakNova logo mountain on the blue band (design W1 "ASCII Zirve").
 *
 * - The logo mountain is drawn with dense glyphs, its edges with 0/1. The hero haze ridges sit
 *   behind it as dots, dashes and binary. Two logo stars sparkle in the point colour.
 * - Motion: ~3% of glyphs re-pick per frame (24 fps), a scan band sweeps down every 6 s and turns
 *   what it touches into binary, and the pointer "decodes" the mountain within 90px.
 * - Runs only while visible (IntersectionObserver), stops when <html data-motion="paused"> (the
 *   page's MotionToggle) and draws a single static frame under prefers-reduced-motion.
 * - Purely decorative: the canvas is aria-hidden; the section heading carries the meaning.
 *
 * All numbers below are the approved design values. Do not tune them by eye.
 */
const CW = 8; // cell width, px
const CH = 13; // cell height, px
const DENSE = "@#%&8B$";
const EDGE = "01";
const SKY = ".:·";
const RIDGE_SETS = ["", ".", ":", "-=", "01"]; // index = ridge layer (1 far .. 4 base)
const RIDGE_ALPHA = [0, 0.2, 0.26, 0.32, 0.4];
const RIDGE_IDS = ["far", "mid", "near", "base"] as const;
const LOGO_STARS: [number, number, number][] = [[555, -3, 1.6], [624, 45, 1.2]];

type Cell = {
  x: number; y: number;
  type: "in" | "edge" | "sky";
  ridge: number; star: number; skyOn: boolean; seed: number;
  ch: string; al: number; gold: boolean;
};

const pickFrom = (set: string) => set[Math.floor(Math.random() * set.length)];

export function AsciiMountain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rootStyle = getComputedStyle(document.documentElement);
    const monoVar = getComputedStyle(canvas).getPropertyValue("--pn-font-mono").trim()
      || rootStyle.getPropertyValue("--pn-font-mono").trim();
    const font = `13px ${monoVar ? `${monoVar}, ` : ""}'Fragment Mono', ui-monospace, monospace`;
    const point = getComputedStyle(canvas).getPropertyValue("--pn-point").trim() || "#bba43f";
    const logo = new Path2D(LOGO_MOUNTAIN_PATH);
    const ridges = RIDGE_IDS.map((id) => new Path2D(HERO_RIDGES.find((r) => r.id === id)!.d));

    let W = 0, H = 0, dpr = 1;
    let cells: Cell[] = [];
    const mouse = { x: -999, y: -999 };

    const pick = (c: Cell) => {
      c.gold = false;
      if (c.star > 0) { c.ch = c.star > 0.45 ? "*" : "+"; c.al = 0.5 + c.star * 0.5; c.gold = c.star > 0.45; return; }
      if (c.type === "in") { c.ch = pickFrom(DENSE); c.al = 0.42 + c.seed * 0.38; return; }
      if (c.type === "edge") { c.ch = pickFrom(EDGE); c.al = 0.95; return; }
      if (c.ridge) {
        const set = RIDGE_SETS[c.ridge];
        c.ch = c.ridge > 2 || c.seed < 0.75 ? pickFrom(set) : "";
        c.al = RIDGE_ALPHA[c.ridge];
        return;
      }
      c.ch = c.skyOn ? pickFrom(SKY) : "";
      c.al = 0.14 + (c.y / H) * 0.12;
    };

    const build = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = canvas.clientWidth; H = canvas.clientHeight;
      if (!W || !H) return;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      const cols = Math.ceil(W / CW), rows = Math.ceil(H / CH);
      const off = document.createElement("canvas"); off.width = W; off.height = H;
      const o = off.getContext("2d", { willReadFrequently: true })!;

      // Ridge layers: the hero ridges, stretched to the canvas.
      const layer = new Uint8Array(cols * rows);
      ridges.forEach((path, i) => {
        o.setTransform(1, 0, 0, 1, 0, 0); o.clearRect(0, 0, W, H);
        o.setTransform(W / 1440, 0, 0, H / 520, 0, (-H * 40) / 520); o.fill(path);
        const im = o.getImageData(0, 0, W, H).data;
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          const x = Math.min(W - 1, c * CW + CW / 2), y = Math.min(H - 1, r * CH + CH / 2);
          if (im[(Math.floor(y) * W + Math.floor(x)) * 4 + 3] > 128) layer[r * cols + c] = i + 1;
        }
      });

      // Logo mountain, centred, standing on the bottom edge.
      o.setTransform(1, 0, 0, 1, 0, 0); o.clearRect(0, 0, W, H);
      const s = Math.min((W * (W < 700 ? 0.96 : 0.7)) / 1000, (H * 0.86) / 371);
      const ox = (W - 1000 * s) / 2, oy = H - 8 - 371 * s;
      o.setTransform(s, 0, 0, s, ox, oy); o.fill(logo);
      const img = o.getImageData(0, 0, W, H).data;
      const a = (x: number, y: number) => (x < 0 || y < 0 || x >= W || y >= H ? 0 : img[(Math.floor(y) * W + Math.floor(x)) * 4 + 3] / 255);
      const stars = LOGO_STARS.map(([x, y, r]) => [ox + x * s, oy + y * s, r] as const);

      cells = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const x = c * CW + CW / 2, y = r * CH + CH / 2;
        const cov = (a(x, y) + a(x, y - 5) + a(x, y + 5) + a(x - 3, y) + a(x + 3, y)) / 5;
        let star = 0;
        for (const [sx, sy, sr] of stars) {
          const d = Math.hypot((x - sx) / CW, (y - sy) / CH);
          if (d < sr) star = Math.max(star, 1 - d / sr);
        }
        const cell: Cell = {
          x: c * CW, y: r * CH + CH - 3,
          type: cov > 0.95 ? "in" : cov > 0.05 ? "edge" : "sky",
          ridge: layer[r * cols + c], star, skyOn: Math.random() < 0.05 + (y / H) * 0.22, seed: Math.random(),
          ch: "", al: 0, gold: false,
        };
        pick(cell);
        cells.push(cell);
      }
    };

    const t0 = performance.now();
    const draw = (now: number, animate: boolean) => {
      const t = (now - t0) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.font = font;
      const scanY = animate ? ((t % 6) / 6) * (H + 120) - 60 : -999;
      for (const c of cells) {
        if (animate && (c.type !== "sky" || c.ridge) && Math.random() < 0.03) pick(c);
        let ch = c.ch, al = c.al;
        const inScan = Math.abs(c.y - scanY) < 22;
        const near = Math.hypot(c.x - mouse.x, c.y - mouse.y) < 90;
        if (c.type !== "sky" && (inScan || near)) { ch = c.seed > 0.5 ? "1" : "0"; al = 1; }
        else if (c.type === "sky" && inScan && c.skyOn) { ch = "-"; al = 0.45; }
        if (!ch) continue;
        ctx.globalAlpha = al;
        ctx.fillStyle = c.gold ? point : "#ffffff";
        ctx.fillText(ch, c.x, c.y);
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0, last = 0, visible = false;
    const paused = () => document.documentElement.dataset.motion === "paused";
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 42) return;
      last = now;
      draw(now, true);
    };
    const sync = () => {
      cancelAnimationFrame(raf); raf = 0;
      if (!reduce && visible && !paused()) raf = requestAnimationFrame(loop);
    };

    const start = () => { build(); draw(performance.now(), false); sync(); };
    const fontsReady = document.fonts?.load ? document.fonts.load(font).catch(() => undefined) : Promise.resolve();
    let alive = true;
    fontsReady.then(() => { if (alive) start(); });

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { rootMargin: "100px" });
    io.observe(canvas);
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { build(); draw(performance.now(), false); }, 120);
    });
    ro.observe(canvas);
    const onMove = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = -999; mouse.y = -999; };
    if (!reduce) { host.addEventListener("pointermove", onMove); host.addEventListener("pointerleave", onLeave); }

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect(); mo.disconnect(); ro.disconnect();
      window.clearTimeout(resizeTimer);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
