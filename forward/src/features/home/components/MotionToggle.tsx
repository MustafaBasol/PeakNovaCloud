"use client";

import { useEffect, useState } from "react";

type Props = { pauseLabel: string; playLabel: string; className?: string };

const STORAGE_KEY = "pn-motion";

/**
 * Pauses every looping animation on the page (WCAG 2.2.2: anything that moves on its own for more
 * than 5 seconds needs a pause control). It sets `data-motion="paused"` on <html>; styles/sis-motion.css
 * turns that into `animation-play-state: paused` and canvas art (AsciiMountain) stops its loop.
 *
 * Several toggles may exist on one page (hero panel, services band). They all read and write the
 * same <html> attribute, so they always agree. The choice is remembered for the session.
 */
export function MotionToggle({ pauseLabel, playLabel, className }: Props) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    let stored: string | null = null;
    try { stored = sessionStorage.getItem(STORAGE_KEY); } catch { /* storage blocked */ }
    if (stored === "paused") root.dataset.motion = "paused";
    const read = () => setPaused(root.dataset.motion === "paused");
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ["data-motion"] });
    return () => mo.disconnect();
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.motion !== "paused";
    if (next) root.dataset.motion = "paused";
    else delete root.dataset.motion;
    try { sessionStorage.setItem(STORAGE_KEY, next ? "paused" : "running"); } catch { /* storage blocked */ }
  };

  return (
    <button
      type="button"
      className={`pn-motion-toggle${className ? ` ${className}` : ""}`}
      aria-pressed={paused}
      onClick={toggle}
    >
      <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
      {paused ? playLabel : pauseLabel}
    </button>
  );
}
