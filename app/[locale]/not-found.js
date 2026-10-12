import { headers } from 'next/headers'
import { NotFoundPage } from '@/components/sis-home/components/NotFoundPage'
import { fragmentMono, instrumentSans, newsreader } from '@/components/sis-home/components/fonts'
import { headerFor, localizeHeader } from '@/components/sis-home/content/header'
import { homeFor, localizeHome } from '@/components/sis-home/content/home'
import { localizeNotFound, notFoundFor } from '@/components/sis-home/content/not-found'
import { routing } from '@/i18n/routing'

async function requestLocale() {
  const path = (await headers()).get('x-pn-path') || ''
  const first = path.split('/').filter(Boolean)[0]
  return routing.locales.includes(first) ? first : routing.defaultLocale
}

export async function generateMetadata() {
  const locale = await requestLocale()
  const content = localizeNotFound(notFoundFor(locale), locale)
  return {
    title: content.metaTitle,
    robots: { index: false, follow: true },
  }
}

export default async function NotFound() {
  const locale = await requestLocale()
  const content = localizeNotFound(notFoundFor(locale), locale)
  return (
    <div className={`${newsreader.variable} ${instrumentSans.variable} ${fragmentMono.variable}`}>
      <NotFoundPage
        content={content}
        headerContent={localizeHome(homeFor(locale), locale)}
        header={localizeHeader(headerFor(locale), locale)}
        homeHref={`/${locale}/`}
        locale={locale}
      />
    </div>
  )
}
