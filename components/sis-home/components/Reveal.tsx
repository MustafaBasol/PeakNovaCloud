"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  className: string;
  labelledBy?: string;
  children: ReactNode;
};

/**
 * A <section> whose entrance animation plays once, when it first scrolls into view.
 *
 * Server markup has no `data-reveal`, so without JavaScript (and before hydration) the section is
 * shown in its final state. After hydration it is "armed" (initial state, see sis-motion.css) and
 * switches to "play" as soon as the section enters the viewport. A tall section can never
 * reach a 25% intersection, so the threshold stays small. Reduced motion skips straight to the final state.
 */
export function Reveal({ className, labelledBy, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"armed" | "play" | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("play");
          io.disconnect();
        }
      },
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={className} aria-labelledby={labelledBy} data-reveal={state}>
      {children}
    </section>
  );
}
