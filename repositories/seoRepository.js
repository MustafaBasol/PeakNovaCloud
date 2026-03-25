import prisma from '@/libs/prisma'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'

function normalizeKeywords(keywords) {
  if (Array.isArray(keywords)) {
    return keywords.filter(Boolean)
  }

  if (typeof keywords === 'string') {
    return keywords
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

function mapSeoRecord(record) {
  if (!record) {
    return record
  }

  return {
    ...record,
    URL: record.URL ?? record.url ?? null,
  }
}

function buildSeoData(data) {
  return {
    page: data.page,
    title: data.title,
    description: data.description,
    language: data.language,
    keywords: normalizeKeywords(data.keywords),
    url: data.URL || data.url || null,
    slug: data.slug,
    ogTitle: data.ogTitle || null,
    ogDescription: data.ogDescription || null,
    ogImage: data.ogImage || null,
    robots: data.robots || 'index, follow',
  }
}

export async function listSeosByLanguage(language) {
  const records = await prisma.seo.findMany({
    where: { language },
    orderBy: { createdAt: 'asc' },
  })
  return normalizeDocuments(records.map(mapSeoRecord))
}

export async function listSeosByLanguageAndPage(language, page) {
  const records = await prisma.seo.findMany({
    where: {
      language,
      page: page ? { contains: page } : undefined,
    },
    orderBy: { createdAt: 'asc' },
  })
  return normalizeDocuments(records.map(mapSeoRecord))
}

export async function createSeo(data) {
  const record = await prisma.seo.create({
    data: buildSeoData(data),
  })
  return normalizeDocument(mapSeoRecord(record))
}

export async function deleteSeoById(id) {
  const record = await prisma.seo.delete({
    where: { id },
  })
  return normalizeDocument(mapSeoRecord(record))
}

export async function updateSeoById(id, data) {
  const record = await prisma.seo.update({
    where: { id },
    data: buildSeoData(data),
  })
  return normalizeDocument(mapSeoRecord(record))
}