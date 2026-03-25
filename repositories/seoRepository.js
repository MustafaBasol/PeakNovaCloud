import connectDB from '@/libs/dbConnect'
import prisma from '@/libs/prisma'
import SEO from '@/models/Seo'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'
import { shouldUsePrisma } from '@/repositories/repositoryRuntime'

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
  if (shouldUsePrisma()) {
    const records = await prisma.seo.findMany({
      where: { language },
      orderBy: { createdAt: 'asc' },
    })
    return normalizeDocuments(records.map(mapSeoRecord))
  }

  await connectDB()
  const records = await SEO.find({ language }).sort({ createdAt: 1 })
  return normalizeDocuments(records)
}

export async function listSeosByLanguageAndPage(language, page) {
  if (shouldUsePrisma()) {
    const records = await prisma.seo.findMany({
      where: {
        language,
        page: page ? { contains: page } : undefined,
      },
      orderBy: { createdAt: 'asc' },
    })
    return normalizeDocuments(records.map(mapSeoRecord))
  }

  await connectDB()
  const records = await SEO.find({ language, page: { $regex: page } }).sort({ createdAt: 1 })
  return normalizeDocuments(records)
}

export async function createSeo(data) {
  if (shouldUsePrisma()) {
    const record = await prisma.seo.create({
      data: buildSeoData(data),
    })
    return normalizeDocument(mapSeoRecord(record))
  }

  await connectDB()
  const record = await SEO.create({
    page: data.page,
    title: data.title,
    description: data.description,
    language: data.language,
    keywords: data.keywords,
    URL: data.URL,
    slug: data.slug,
    ogTitle: data.ogTitle,
    ogDescription: data.ogDescription,
    ogImage: data.ogImage,
    robots: data.robots,
  })
  return normalizeDocument(record)
}

export async function deleteSeoById(id) {
  if (shouldUsePrisma()) {
    const record = await prisma.seo.delete({
      where: { id },
    })
    return normalizeDocument(mapSeoRecord(record))
  }

  await connectDB()
  const record = await SEO.findByIdAndDelete({ _id: id })
  return normalizeDocument(record)
}

export async function updateSeoById(id, data) {
  if (shouldUsePrisma()) {
    const record = await prisma.seo.update({
      where: { id },
      data: buildSeoData(data),
    })
    return normalizeDocument(mapSeoRecord(record))
  }

  await connectDB()
  const record = await SEO.findOneAndUpdate(
    { _id: id },
    {
      page: data.page,
      title: data.title,
      description: data.description,
      language: data.language,
      keywords: data.keywords,
      URL: data.URL,
      slug: data.slug,
      ogTitle: data.ogTitle,
      ogDescription: data.ogDescription,
      ogImage: data.ogImage,
      robots: data.robots,
    },
    { new: true }
  )
  return normalizeDocument(record)
}