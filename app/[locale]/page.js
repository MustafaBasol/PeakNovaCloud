import { HomePage } from "@/components/sis-home/components/HomePage";
import { headerFor, localizeHeader } from "@/components/sis-home/content/header";
import { homeFor, localizeHome } from "@/components/sis-home/content/home";
import { fragmentMono, instrumentSans, newsreader } from "@/components/sis-home/components/fonts";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const content = homeFor(locale);
  return {
    title: content.metaTitle,
    description: content.hero.lead,
    alternates: {
      canonical: `https://www.peaknovas.com/${locale}`,
      languages: {
        en: "https://www.peaknovas.com/en",
        fr: "https://www.peaknovas.com/fr",
        de: "https://www.peaknovas.com/de",
        tr: "https://www.peaknovas.com/tr",
        "x-default": "https://www.peaknovas.com/en",
      },
    },
  };
}

export default async function Home({ params }) {
  const { locale } = await params;
  return (
    <div className={`${newsreader.variable} ${instrumentSans.variable} ${fragmentMono.variable}`}>
      <HomePage content={localizeHome(homeFor(locale), locale)} header={localizeHeader(headerFor(locale), locale)} homeHref={`/${locale}/`} locale={locale} />
    </div>
  );
}
