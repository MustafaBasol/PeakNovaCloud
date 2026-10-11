import { HERO_RIDGES, HERO_STARS_ORIGIN, HERO_VIEWBOX } from "../data/landscape";
import { NovaStars } from "./NovaStars";

/**
 * The hazy layered ridges under the hero, with the Nova star pair above the main peak.
 * The stars are drawn first so the ridges cover the lower rays (they sit "behind" the mountain).
 * Static SVG on purpose: this is also the no-WebGL / reduced-motion fallback for any future 3D scene.
 */
export function HeroLandscape() {
  return (
    <div className="pn-landscape" aria-hidden="true">
      <svg viewBox={HERO_VIEWBOX} preserveAspectRatio="xMidYMax slice" focusable="false">
        <NovaStars id="pn-hero-nova" tone="on-light" x={HERO_STARS_ORIGIN.x} y={HERO_STARS_ORIGIN.y} />
        {HERO_RIDGES.map((ridge) => (
          <path key={ridge.id} fill={ridge.fill} d={ridge.d} />
        ))}
      </svg>
    </div>
  );
}
