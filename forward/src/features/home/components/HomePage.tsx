import type { HeaderContent } from "../content/header.tr";
import type { HomeContent } from "../content/home.tr";
import { ClosingCta } from "./ClosingCta";
import { Hero } from "./Hero";
import { HeroStage } from "./HeroStage";
import { HowWeWork } from "./HowWeWork";
import { Products } from "./Products";
import { SiteHeader } from "./SiteHeader";
import { techFor } from "../content/tech";
import { TechOrbit } from "./TechOrbit";
import { WhatWeBuild } from "./WhatWeBuild";

type Props = { content: HomeContent; header: HeaderContent; homeHref: string; locale: string };

/**
 * The approved home page, top to bottom, exactly as the "Seçilen ana sayfa" artboard:
 * E. Sis + glass agent panel (E3) + what we build (W1 "ASCII Zirve") + how we work (K2) + products (E2) + technology orbit (U1) + closing CTA.
 */
export function HomePage({ content, header, homeHref, locale }: Props) {
  return (
    <div className="pn-page">
      <SiteHeader content={content} header={header} homeHref={homeHref} locale={locale} />
      <main id="main">
        <Hero content={content} />
        <HeroStage content={content} />
        <WhatWeBuild content={content} />
        <HowWeWork content={content} />
        {content.products.items.length > 0 && <Products content={content} />}
        <TechOrbit content={techFor(locale)} />
        <ClosingCta content={content} />
      </main>
    </div>
  );
}
