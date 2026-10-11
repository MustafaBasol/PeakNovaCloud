import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageFrame } from "@/components/PageFrame";
import { localeParams } from "@/lib/pages";

export function generateStaticParams() {
  return localeParams();
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const pages = await getTranslations("pages");
  const shell = await getTranslations("shell");

  return <PageFrame title={pages("privacy")} note={shell("note")} />;
}
