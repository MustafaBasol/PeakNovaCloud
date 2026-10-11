import type { HomeContent } from "../content/home.tr";
import { ClosingCta } from "./ClosingCta";
import { Hero } from "./Hero";
import { HeroLandscape } from "./HeroLandscape";
import { ServicesClimb } from "./ServicesClimb";
import { SiteHeader } from "./SiteHeader";

type Props = { content: HomeContent; homeHref: string };

/** The full E. Sis home page, top to bottom, exactly as on the approved canvas. */
export function HomePage({ content, homeHref }: Props) {
  return (
    <div className="pn-page">
      <SiteHeader content={content} homeHref={homeHref} />
      <main id="main">
        <Hero content={content} />
        <HeroLandscape />
        <ServicesClimb content={content} />
        <ClosingCta content={content} />
      </main>
    </div>
  );
}
