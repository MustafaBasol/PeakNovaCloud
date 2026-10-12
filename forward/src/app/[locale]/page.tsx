import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HomePage } from "@/features/home/components/HomePage";
import { headerFor, localizeHeader } from "@/features/home/content/header";
import { homeFor, localizeHome } from "@/features/home/content/home";
import { localeParams } from "@/lib/pages";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = homeFor(locale);
  return {
    title: content.metaTitle,
    description: content.hero.lead,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePage content={localizeHome(homeFor(locale), locale)} header={localizeHeader(headerFor(locale), locale)} homeHref={`/${locale}/`} locale={locale} />;
}
