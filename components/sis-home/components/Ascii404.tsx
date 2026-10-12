"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_RIDGES, LOGO_MOUNTAIN_PATH } from "../data/landscape";

/**
 * Living ASCII "404" on the blue panel (design "404 C. ASCII", approved 2026-10-12).
 * Same engine and rules as AsciiMountain (W1):
 * - A big "404" in the brand serif is drawn with dense glyphs, its edges with 0/1; the logo mountain
 *   stands small on its right shoulder; the hero base ridge becomes a binary ground line.
 * - Motion: ~3% of glyphs re-pick per frame (24 fps); every 5 s a vertical sweep turns what it touches
 *   into binary from left to right; the pointer "decodes" within 80px.
 * - Runs only while visible, stops on <html data-motion="paused">, one static frame under reduced motion.
 * - Decorative: aria-hidden. The page heading carries the meaning.
 * All numbers are the approved design values. Do not tune them by eye.
 */
const CW = 8;
const CH = 13;
const DENSE = "@#%&8B$";
const EDGE = "01";
const SKY = ".:·";

type Kind = "num" | "numEdge" | "mtn" | "mtnEdge" | "ground" | "sky";
type Cell = { x: number; y: number; type: Kind; seed: number; on: boolean; ch: string; al: number };

const pickFrom = (set: string) => set[Math.floor(Math.random() * set.length)];

export function Ascii404({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rootStyle = getComputedStyle(document.documentElement);
    const monoVar = rootStyle.getPropertyValue("--pn-font-mono").trim();
    const serifVar = rootStyle.getPropertyValue("--pn-font-serif").trim();
    const mono = `13px ${monoVar ? `${monoVar}, ` : ""}'Fragment Mono', ui-monospace, monospace`;
    const serifFamily = `${serifVar ? `${serifVar}, ` : ""}Newsreader, Georgia, serif`;
    const logo = new Path2D(LOGO_MOUNTAIN_PATH);
    const base = new Path2D(HERO_RIDGES.find((r) => r.id === "base")!.d);

    let W = 0, H = 0, dpr = 1;
    let cells: Cell[] = [];
    const mouse = { x: -999, y: -999 };

    const pick = (c: Cell) => {
      if (c.type === "num") { c.ch = pickFrom(DENSE); c.al = 0.55 + c.seed * 0.35; }
      else if (c.type === "numEdge" || c.type === "mtnEdge") { c.ch = pickFrom(EDGE); c.al = 0.95; }
      else if (c.type === "mtn") { c.ch = pickFrom(":-="); c.al = 0.5; }
      else if (c.type === "ground") { c.ch = pickFrom(EDGE); c.al = 0.32; }
      else { c.ch = c.on ? pickFrom(SKY) : ""; c.al = 0.16; }
    };

    const build = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = canvas.clientWidth; H = canvas.clientHeight;
      if (!W || !H) return;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      const off = document.createElement("canvas"); off.width = W; off.height = H;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      const narrow = W < 700;

      o.fillStyle = "#000";
      o.font = `400 ${Math.round(narrow ? W * 0.5 : Math.min(H * 0.78, W * 0.42))}px ${serifFamily}`;
      o.textAlign = "center"; o.textBaseline = "alphabetic";
      o.fillText("404", W * 0.5, H * (narrow ? 0.66 : 0.8));
      const numData = o.getImageData(0, 0, W, H).data;

      o.clearRect(0, 0, W, H);
      const s = (H * (narrow ? 0.2 : 0.32)) / 371;
      o.setTransform(s, 0, 0, s, W * (narrow ? 0.6 : 0.74), H - 18 - 371 * s); o.fill(logo);
      o.setTransform(1, 0, 0, 1, 0, 0);
      const mtn = o.getImageData(0, 0, W, H).data;

      o.clearRect(0, 0, W, H);
      o.setTransform(W / 1440, 0, 0, H / 300, 0, (-H * 260) / 300); o.fill(base);
      o.setTransform(1, 0, 0, 1, 0, 0);
      const ground = o.getImageData(0, 0, W, H).data;

      const A = (d: Uint8ClampedArray, x: number, y: number) =>
        x < 0 || y < 0 || x >= W || y >= H ? 0 : d[(Math.floor(y) * W + Math.floor(x)) * 4 + 3] / 255;
      const cov = (d: Uint8ClampedArray, x: number, y: number) =>
        (A(d, x, y) + A(d, x, y - 5) + A(d, x, y + 5) + A(d, x - 3, y) + A(d, x + 3, y)) / 5;

      cells = [];
      const rows = Math.ceil(H / CH), cols = Math.ceil(W / CW);
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const x = c * CW + CW / 2, y = r * CH + CH / 2;
        const n = cov(numData, x, y), m = cov(mtn, x, y), g = cov(ground, x, y);
        let type: Kind = "sky";
        if (n > 0.9) type = "num"; else if (n > 0.05) type = "numEdge";
        else if (m > 0.9) type = "mtn"; else if (m > 0.05) type = "mtnEdge";
        else if (g > 0.5) type = "ground";
        const cell: Cell = { x: c * CW, y: r * CH + CH - 3, type, seed: Math.random(), on: Math.random() < 0.12, ch: "", al: 0 };
        pick(cell);
        cells.push(cell);
      }
    };

    const t0 = performance.now();
    const draw = (now: number, animate: boolean) => {
      const t = (now - t0) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.font = mono;
      ctx.fillStyle = "#ffffff";
      const sweepX = animate ? ((t % 5) / 5) * (W + 200) - 100 : -999;
      for (const c of cells) {
        if (animate && c.type !== "sky" && Math.random() < 0.03) pick(c);
        let ch = c.ch, al = c.al;
        const hit = Math.abs(c.x - sweepX) < 26 || Math.hypot(c.x - mouse.x, c.y - mouse.y) < 80;
        if (hit && c.type !== "sky") { ch = c.seed > 0.5 ? "1" : "0"; al = 1; }
        if (!ch) continue;
        ctx.globalAlpha = al;
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
    const ready = document.fonts?.load
      ? Promise.all([document.fonts.load(mono), document.fonts.load(`400 100px ${serifFamily}`)]).catch(() => undefined)
      : Promise.resolve();
    let alive = true;
    ready.then(() => { if (alive) start(); });

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

/** The path the visitor asked for, read on the client (the 404 render has no params). Text only, max 48 chars. */
export function RequestedPath({ fallback }: { fallback: string }) {
  const [path, setPath] = useState(fallback);
  useEffect(() => {
    if (!window.location.protocol.startsWith("http")) return; // local reference file: keep the fallback
    let p = window.location.pathname;
    try { p = decodeURIComponent(p); } catch { /* keep encoded */ }
    setPath(p.length > 48 ? `${p.slice(0, 47)}…` : p);
  }, []);
  return <b>{path}</b>;
}
