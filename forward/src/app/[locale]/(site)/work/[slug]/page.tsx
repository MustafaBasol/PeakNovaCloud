import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/PageFrame";
import { workSlugs } from "@/i18n/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return workSlugs.map((slug) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!(workSlugs as readonly string[]).includes(slug)) notFound();
  setRequestLocale(locale);
  const work = await getTranslations("work");
  const shell = await getTranslations("shell");

  return <PageFrame title={work(slug)} note={shell("note")} />;
}
