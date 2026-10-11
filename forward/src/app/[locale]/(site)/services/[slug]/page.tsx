import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { serviceSlugs } from "@/i18n/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!(serviceSlugs as readonly string[]).includes(slug)) notFound();
  setRequestLocale(locale);
  const services = await getTranslations("services");
  const shell = await getTranslations("shell");

  return <PageFrame title={services(slug)} note={shell("note")} />;
}
