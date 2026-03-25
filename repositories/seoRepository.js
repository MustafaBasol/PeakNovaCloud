import connectDB from '@/libs/dbConnect'
import SEO from '@/models/Seo'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'

export async function listSeosByLanguage(language) {
  await connectDB()
  const records = await SEO.find({ language }).sort({ createdAt: 1 })
  return normalizeDocuments(records)
}

export async function listSeosByLanguageAndPage(language, page) {
  await connectDB()
  const records = await SEO.find({ language, page: { $regex: page } }).sort({ createdAt: 1 })
  return normalizeDocuments(records)
}

export async function createSeo(data) {
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
  await connectDB()
  const record = await SEO.findByIdAndDelete({ _id: id })
  return normalizeDocument(record)
}

export async function updateSeoById(id, data) {
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