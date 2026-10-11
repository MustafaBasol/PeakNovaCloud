import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomePage } from "@/features/home/components/HomePage";
import { homeTr } from "@/features/home/content/home.tr";
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
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("metaTitle"),
    description: t("hero.subtext"),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = {
    ...homeTr,
    products: {
      ...homeTr.products,
      items: homeTr.products.items.filter((item) => item.id !== "yapifin"),
    },
  };
  return <HomePage content={content} homeHref={`/${locale}/`} />;
}
