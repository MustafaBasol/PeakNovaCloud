import prisma from '@/libs/prisma'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'

export async function listBlogsByLanguage(language) {
  const records = await prisma.blog.findMany({
    where: { language },
    orderBy: { createdAt: 'desc' },
  })
  return normalizeDocuments(records)
}

export async function getBlogBySlugAndLanguage(slug, language) {
  const record = await prisma.blog.findFirst({
    where: { slug, language },
    orderBy: { createdAt: 'desc' },
  })
  return normalizeDocument(record)
}

export async function findBlogBySlug(slug) {
  const record = await prisma.blog.findUnique({
    where: { slug },
  })
  return normalizeDocument(record)
}

export async function createBlog(data) {
  const record = await prisma.blog.create({
    data: {
      title: data.title,
      slug: data.slug,
      language: data.language,
      content: data.content ?? [],
      coverImage: data.coverImage || null,
      seo: data.seo ?? null,
      summary: data.summary,
    },
  })
  return normalizeDocument(record)
}

export async function deleteBlogById(id) {
  const record = await prisma.blog.delete({
    where: { id },
  })
  return normalizeDocument(record)
}

export async function updateBlogById(id, data) {
  const record = await prisma.blog.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      language: data.language,
      content: data.content,
      coverImage: data.coverImage || null,
      seo: data.seo ?? null,
      summary: data.summary,
    },
  })
  return normalizeDocument(record)
}

export async function updateBlogBySlug(slug, data) {
  const record = await prisma.blog.update({
    where: { slug },
    data: {
      title: data.title,
      slug: data.slug,
      language: data.language,
      content: data.content,
      coverImage: data.coverImage || null,
      seo: data.seo ?? null,
      summary: data.summary,
    },
  })
  return normalizeDocument(record)
}