import { getLocale } from "next-intl/server";
import { NotFoundPage } from "@/features/home/components/NotFoundPage";
import { headerFor, localizeHeader } from "@/features/home/content/header";
import { homeFor, localizeHome } from "@/features/home/content/home";
import { localizeNotFound, notFoundFor } from "@/features/home/content/not-found";

async function requestLocale() {
  return getLocale();
}

export async function generateMetadata() {
  const locale = await requestLocale();
  const content = localizeNotFound(notFoundFor(locale), locale);
  return {
    title: content.metaTitle,
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const locale = await requestLocale();
  const content = localizeNotFound(notFoundFor(locale), locale);
  return (
    <NotFoundPage
      content={content}
      headerContent={localizeHome(homeFor(locale), locale)}
      header={localizeHeader(headerFor(locale), locale)}
      homeHref={`/${locale}/`}
      locale={locale}
    />
  );
}
