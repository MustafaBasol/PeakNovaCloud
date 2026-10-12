import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { fragmentMono, instrumentSans, newsreader } from "@/features/home/components/fonts";
import { routing } from "@/i18n/routing";
import { localeParams } from "@/lib/pages";
import "@/styles/globals.css";
import "@/styles/sis.css";
import "@/styles/sis-header.css";
import "@/styles/sis-404.css";
import "@/styles/sis-patterns.css";
import "@/styles/sis-motion.css";
import "@/styles/sis-tech.css";

export function generateStaticParams() {
  return localeParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("site"),
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${newsreader.variable} ${instrumentSans.variable} ${fragmentMono.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
