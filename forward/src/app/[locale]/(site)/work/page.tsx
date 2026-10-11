import { getTranslations, setRequestLocale } from "next-intl/server";
import { LinkList, PageFrame } from "@/components/PageFrame";
import { workSlugs } from "@/i18n/routing";
import { localeParams } from "@/lib/pages";

export function generateStaticParams() {
  return localeParams();
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pages = await getTranslations("pages");
  const work = await getTranslations("work");
  const shell = await getTranslations("shell");

  return (
    <PageFrame title={pages("work")} note={shell("note")}>
      <LinkList
        items={workSlugs.map((slug) => ({
          href: `/work/${slug}`,
          label: work(slug),
        }))}
      />
    </PageFrame>
  );
}
