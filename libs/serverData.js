import { listAboutByLanguage } from '@/repositories/aboutRepository'
import { getBlogBySlugAndLanguage, listBlogsByLanguage } from '@/repositories/blogRepository'
import { listFaqByLanguage } from '@/repositories/faqRepository'
import { listLogosByLanguage } from '@/repositories/logosRepository'
import { listPagesByLanguageAndSection } from '@/repositories/pageRepository'
import { getProjectById, listProjectsByLanguage } from '@/repositories/projectRepository'
import { listSeosByLanguage, listSeosByLanguageAndPage } from '@/repositories/seoRepository'
import { listServicePagesByNameAndLanguage, listServicesByLanguage } from '@/repositories/serviceRepository'

/** German content rows do not exist until the Language enum migration is applied. */
async function rows(locale, load, fallback = []) {
  try {
    return await load()
  } catch (error) {
    const message = String(error?.message || '')
    const germanNotReady = locale === 'de' && (
      message.includes('Invalid value for argument') ||
      message.includes('invalid input value for enum')
    )
    if (germanNotReady) return fallback
    throw error
  }
}

export async function getAboutData(locale) {
  return { data: await rows(locale, () => listAboutByLanguage(locale)) }
}

export async function getProjects(locale) {
  return { data: await rows(locale, () => listProjectsByLanguage(locale)) }
}

export async function getFaq(locale) {
  return { data: await rows(locale, () => listFaqByLanguage(locale)) }
}

export async function getProject(id) {
  return { data: await getProjectById(id) }
}

export async function getService(servicename, locale) {
  return { data: await rows(locale, () => listServicePagesByNameAndLanguage(servicename, locale)) }
}

export async function getServices(locale) {
  return { data: await rows(locale, () => listServicesByLanguage(locale)) }
}

export async function getLogos(locale) {
  return { data: await rows(locale, () => listLogosByLanguage(locale)) }
}

export async function getPage(locale, page) {
  return { data: await rows(locale, () => listPagesByLanguageAndSection(locale, page)) }
}

export async function getBlogs(locale) {
  return { data: await rows(locale, () => listBlogsByLanguage(locale)) }
}

export async function getBlog(locale, slug) {
  return { data: await rows(locale, () => getBlogBySlugAndLanguage(slug, locale), null) }
}

export async function getSeo(locale, page) {
  return { data: await rows(locale, () => listSeosByLanguageAndPage(locale, page)) }
}

export async function getSeos(locale) {
  return { data: await rows(locale, () => listSeosByLanguage(locale)) }
}

const DEFAULT_SITE_URL = 'https://www.peaknovas.com/'
const DEFAULT_TITLE = 'PeakNova | Salesforce Consulting, Implementation and Integration'
const DEFAULT_DESCRIPTION = 'PeakNova helps companies implement, improve and support Salesforce through process design, automation, integration and ongoing CRM expertise.'

export async function getPageMetadata(locale, page) {
  const seo = (await getSeo(locale, page))?.data?.[0]

  if (!seo) {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      openGraph: {
        type: 'website',
        url: DEFAULT_SITE_URL,
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        image: '',
      },
    }
  }

  return {
    title: seo.title || DEFAULT_TITLE,
    description: seo.description || seo.title || DEFAULT_DESCRIPTION,
    keywords: seo.keywords,
    openGraph: {
      type: 'website',
      url: seo.URL || DEFAULT_SITE_URL,
      title: seo.ogTitle || DEFAULT_TITLE,
      description: seo.ogDescription || seo.description || DEFAULT_DESCRIPTION,
      image: seo.ogImage || '',
    },
  }
}