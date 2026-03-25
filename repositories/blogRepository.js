import connectDB from '@/libs/dbConnect'
import prisma from '@/libs/prisma'
import BLOG from '@/models/Blog'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'
import { shouldUsePrisma } from '@/repositories/repositoryRuntime'

export async function listBlogsByLanguage(language) {
  if (shouldUsePrisma()) {
    const records = await prisma.blog.findMany({
      where: { language },
      orderBy: { createdAt: 'desc' },
    })
    return normalizeDocuments(records)
  }

  await connectDB()
  const records = await BLOG.find({ language }).sort({ createdAt: -1 })
  return normalizeDocuments(records)
}

export async function getBlogBySlugAndLanguage(slug, language) {
  if (shouldUsePrisma()) {
    const record = await prisma.blog.findFirst({
      where: { slug, language },
      orderBy: { createdAt: 'desc' },
    })
    return normalizeDocument(record)
  }

  await connectDB()
  const record = await BLOG.findOne({ slug, language }).sort({ createdAt: -1 })
  return normalizeDocument(record)
}

export async function findBlogBySlug(slug) {
  if (shouldUsePrisma()) {
    const record = await prisma.blog.findUnique({
      where: { slug },
    })
    return normalizeDocument(record)
  }

  await connectDB()
  const record = await BLOG.findOne({ slug })
  return normalizeDocument(record)
}

export async function createBlog(data) {
  if (shouldUsePrisma()) {
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

  await connectDB()
  const record = await BLOG.create({
    title: data.title,
    slug: data.slug,
    language: data.language,
    content: data.content,
    coverImage: data.coverImage,
    seo: data.seo,
    summary: data.summary,
  })
  return normalizeDocument(record)
}

export async function deleteBlogById(id) {
  if (shouldUsePrisma()) {
    const record = await prisma.blog.delete({
      where: { id },
    })
    return normalizeDocument(record)
  }

  await connectDB()
  const record = await BLOG.findOneAndDelete({ _id: id })
  return normalizeDocument(record)
}

export async function updateBlogById(id, data) {
  if (shouldUsePrisma()) {
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

  await connectDB()
  const record = await BLOG.findOneAndUpdate(
    { _id: id },
    {
      title: data.title,
      slug: data.slug,
      language: data.language,
      content: data.content,
      coverImage: data.coverImage,
      seo: data.seo,
      summary: data.summary,
    },
    { new: true, runValidators: true }
  )
  return normalizeDocument(record)
}

export async function updateBlogBySlug(slug, data) {
  if (shouldUsePrisma()) {
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

  await connectDB()
  const record = await BLOG.findOneAndUpdate(
    { slug },
    {
      title: data.title,
      slug: data.slug,
      language: data.language,
      content: data.content,
      coverImage: data.coverImage,
      seo: data.seo,
      summary: data.summary,
    },
    { new: true, runValidators: true }
  )
  return normalizeDocument(record)
}