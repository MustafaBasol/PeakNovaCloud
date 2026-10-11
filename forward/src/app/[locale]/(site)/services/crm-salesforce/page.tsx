import { getTranslations, setRequestLocale } from "next-intl/server";
import { LinkList, PageFrame, offeringLinks } from "@/components/PageFrame";
import { localeParams } from "@/lib/pages";

export function generateStaticParams() {
  return localeParams();
}

export default async function SalesforceHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const services = await getTranslations("services");
  const offerings = await getTranslations("offerings");
  const shell = await getTranslations("shell");

  return (
    <PageFrame title={services("crm-salesforce")} note={shell("note")}>
      <LinkList items={offeringLinks((key) => offerings(key))} />
    </PageFrame>
  );
}
