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