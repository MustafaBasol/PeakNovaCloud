import { listAboutByLanguage } from '@/repositories/aboutRepository'
import { getBlogBySlugAndLanguage, listBlogsByLanguage } from '@/repositories/blogRepository'
import { listFaqByLanguage } from '@/repositories/faqRepository'
import { listLogosByLanguage } from '@/repositories/logosRepository'
import { listPagesByLanguageAndSection } from '@/repositories/pageRepository'
import { getProjectById, listProjectsByLanguage } from '@/repositories/projectRepository'
import { listSeosByLanguage, listSeosByLanguageAndPage } from '@/repositories/seoRepository'
import { listServicePagesByNameAndLanguage, listServicesByLanguage } from '@/repositories/serviceRepository'

export async function getAboutData(locale) {
  return { data: await listAboutByLanguage(locale) }
}

export async function getProjects(locale) {
  return { data: await listProjectsByLanguage(locale) }
}

export async function getFaq(locale) {
  return { data: await listFaqByLanguage(locale) }
}

export async function getProject(id) {
  return { data: await getProjectById(id) }
}

export async function getService(servicename, locale) {
  return { data: await listServicePagesByNameAndLanguage(servicename, locale) }
}

export async function getServices(locale) {
  return { data: await listServicesByLanguage(locale) }
}

export async function getLogos(locale) {
  return { data: await listLogosByLanguage(locale) }
}

export async function getPage(locale, page) {
  return { data: await listPagesByLanguageAndSection(locale, page) }
}

export async function getBlogs(locale) {
  return { data: await listBlogsByLanguage(locale) }
}

export async function getBlog(locale, slug) {
  return { data: await getBlogBySlugAndLanguage(slug, locale) }
}

export async function getSeo(locale, page) {
  return { data: await listSeosByLanguageAndPage(locale, page) }
}

export async function getSeos(locale) {
  return { data: await listSeosByLanguage(locale) }
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