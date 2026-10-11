import { NOVA_ORBIT, NOVA_PARTICLES, NOVA_RAYS, SMALL_STAR_OFFSET } from "../data/novaStars";

type Props = {
  /** Centre of the large star, in the parent SVG's units. */
  x: number;
  y: number;
  /** on-light: blue rays and glow (white page). on-blue: white rays and glow (blue band). */
  tone: "on-light" | "on-blue";
  /** Unique per page; used for the glow gradient id. */
  id: string;
  className?: string;
};

/** Four-point sparkle centred at (cx, cy) with half-size s. Same shape as the logo stars. */
function sparkle(cx: number, cy: number, s: number) {
  return `M${cx} ${cy - s} Q${cx} ${cy} ${cx + s} ${cy} Q${cx} ${cy} ${cx} ${cy + s} Q${cx} ${cy} ${cx - s} ${cy} Q${cx} ${cy} ${cx} ${cy - s} Z`;
}

/**
 * The two-star "Nova" system (design direction G) rendered inside an existing <svg>.
 * Decorative: the parent SVG carries the accessible label or aria-hidden.
 */
export function NovaStars({ x, y, tone, id, className }: Props) {
  const glow = tone === "on-light"
    ? { inner: "#2A6FC2", innerOpacity: 0.5, mid: "#2A6FC2", midOpacity: 0.16 }
    : { inner: "#FFFFFF", innerOpacity: 0.7, mid: "#9CC3F5", midOpacity: 0.32 };
  const sx = SMALL_STAR_OFFSET.x;
  const sy = SMALL_STAR_OFFSET.y;

  return (
    <g className={`pn-nova pn-nova--${tone}${className ? ` ${className}` : ""}`} transform={`translate(${x} ${y})`}>
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor={glow.inner} stopOpacity={glow.innerOpacity} />
          <stop offset="0.35" stopColor={glow.mid} stopOpacity={glow.midOpacity} />
          <stop offset="1" stopColor={glow.mid} stopOpacity={0} />
        </radialGradient>
      </defs>
      <circle cx={0} cy={0} r={72} fill={`url(#${id}-glow)`} />
      <circle cx={sx} cy={sy} r={52} fill={`url(#${id}-glow)`} />
      <g className="pn-nova__rays">
        {NOVA_RAYS.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
      <g className="pn-nova__particles">
        {NOVA_PARTICLES.map(([cx, cy, r, o], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} opacity={o} />
        ))}
      </g>
      <g className="pn-nova__orbit">
        {NOVA_ORBIT.map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <circle className="pn-nova__core" cx={0} cy={0} r={12} />
      <circle className="pn-nova__core" cx={sx} cy={sy} r={8} />
      <path className="pn-nova__sparkle" d={sparkle(0, 0, 18)} />
      <path className="pn-nova__sparkle" d={sparkle(sx, sy, 12)} />
    </g>
  );
}
