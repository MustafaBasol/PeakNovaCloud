import { HomePage } from "@/components/sis-home/components/HomePage";
import { homeTr } from "@/components/sis-home/content/home.tr";
import { fragmentMono, instrumentSans, newsreader } from "@/components/sis-home/components/fonts";

function withLocale(content, locale) {
  const swap = (href) => href.replace(/^\/tr(?=\/)/, `/${locale}`);
  return {
    ...content,
    nav: content.nav.map((item) => ({ ...item, href: swap(item.href) })),
    contactHref: swap(content.contactHref),
    hero: { ...content.hero, secondaryHref: swap(content.hero.secondaryHref) },
    services: {
      ...content.services,
      items: content.services.items.map((item) => ({ ...item, href: swap(item.href) })),
    },
    products: {
      ...content.products,
      items: content.products.items
        .filter((item) => item.id !== "yapifin")
        .map((item) => ({ ...item, href: swap(item.href) })),
    },
  };
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: "PeakNova | AI Ajanları, Otomasyon ve Özel Yazılım",
    description: homeTr.hero.lead,
    alternates: {
      canonical: `https://www.peaknovas.com/${locale}`,
    },
  };
}

export default async function Home({ params }) {
  const { locale } = await params;
  return (
    <div className={`${newsreader.variable} ${instrumentSans.variable} ${fragmentMono.variable}`}>
      <HomePage content={withLocale(homeTr, locale)} homeHref={`/${locale}/`} />
    </div>
  );
}
