import connectDB from '@/libs/dbConnect'
import PAGE from '@/models/Page'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'

export async function listPagesByLanguageAndSection(language, section) {
  await connectDB()
  const records = await PAGE.find({ language, section: { $regex: section } }).sort({ createdAt: 1 })
  return normalizeDocuments(records)
}

export async function createPage(data) {
  await connectDB()
  const record = await PAGE.create({
    section: data.section,
    title: data.title,
    description: data.description,
    image: data.image,
    buttonText: data.buttonText,
    language: data.language,
    cards: data.cards,
  })
  return normalizeDocument(record)
}

export async function deletePageById(id) {
  await connectDB()
  const record = await PAGE.findOneAndDelete({ _id: id })
  return normalizeDocument(record)
}

export async function updatePageById(id, data) {
  await connectDB()
  const record = await PAGE.findOneAndUpdate(
    { _id: id },
    {
      section: data.section,
      title: data.title,
      description: data.description,
      image: data.image,
      buttonText: data.buttonText,
      language: data.language,
      cards: data.cards,
    },
    { new: true }
  )
  return normalizeDocument(record)
}