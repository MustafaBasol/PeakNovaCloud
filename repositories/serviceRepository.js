import connectDB from '@/libs/dbConnect'
import SERVICE from '@/models/Service'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'

export async function listServicesByLanguage(language) {
  await connectDB()
  const records = await SERVICE.find({ language }).sort({ createdAt: 1 })
  return normalizeDocuments(records)
}

export async function listServicePagesByNameAndLanguage(service, language) {
  await connectDB()
  const records = await SERVICE.find({ language, service }).sort({ createdAt: 1 })
  return normalizeDocuments(records)
}

export async function createServicePage(data) {
  await connectDB()
  const record = await SERVICE.create({
    service: data.service,
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

export async function deleteServicePageById(id) {
  await connectDB()
  const record = await SERVICE.findOneAndDelete({ _id: id })
  return normalizeDocument(record)
}

export async function updateServicePageById(id, data) {
  await connectDB()
  const record = await SERVICE.findOneAndUpdate(
    { _id: id },
    {
      service: data.service,
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

export async function updateServicePagesBySectionAndLanguage(section, language, data) {
  await connectDB()

  const updateData = {}

  if (data.description) updateData.description = data.description
  if (data.title) updateData.title = data.title
  if (data.image) updateData.image = data.image
  if (data.buttonText) updateData.buttonText = data.buttonText
  if (data.service) updateData.service = data.service
  if (data.section) updateData.section = data.section
  if (data.language) updateData.language = data.language
  if (data.cards) updateData.cards = data.cards

  return SERVICE.updateMany(
    { section, language },
    {
      $set: updateData,
    }
  )
}