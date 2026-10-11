import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { offeringSlugs } from "@/i18n/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return offeringSlugs.map((offering) => ({ offering }));
}

export default async function OfferingPage({
  params,
}: {
  params: Promise<{ locale: string; offering: string }>;
}) {
  const { locale, offering } = await params;
  if (!(offeringSlugs as readonly string[]).includes(offering)) notFound();
  setRequestLocale(locale);
  const offerings = await getTranslations("offerings");
  const shell = await getTranslations("shell");

  return <PageFrame title={offerings(offering)} note={shell("note")} />;
}
