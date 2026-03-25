import connectDB from '@/libs/dbConnect'
import BLOG from '@/models/Blog'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'

export async function listBlogsByLanguage(language) {
  await connectDB()
  const records = await BLOG.find({ language }).sort({ createdAt: -1 })
  return normalizeDocuments(records)
}

export async function getBlogBySlugAndLanguage(slug, language) {
  await connectDB()
  const record = await BLOG.findOne({ slug, language }).sort({ createdAt: -1 })
  return normalizeDocument(record)
}

export async function findBlogBySlug(slug) {
  await connectDB()
  const record = await BLOG.findOne({ slug })
  return normalizeDocument(record)
}

export async function createBlog(data) {
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
  await connectDB()
  const record = await BLOG.findOneAndDelete({ _id: id })
  return normalizeDocument(record)
}

export async function updateBlogById(id, data) {
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