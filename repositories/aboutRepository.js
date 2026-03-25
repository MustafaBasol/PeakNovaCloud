import connectDB from '@/libs/dbConnect'
import prisma from '@/libs/prisma'
import ABOUT from '@/models/About'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'
import { shouldUsePrisma } from '@/repositories/repositoryRuntime'

export async function listAboutByLanguage(language) {
  if (shouldUsePrisma()) {
    const records = await prisma.about.findMany({
      where: { language },
      orderBy: { createdAt: 'asc' },
    })
    return normalizeDocuments(records)
  }

  await connectDB()
  const records = await ABOUT.find({ language }).sort({ createdAt: 1 })
  return normalizeDocuments(records)
}

export async function createAbout(data) {
  if (shouldUsePrisma()) {
    const record = await prisma.about.create({
      data: {
        title: data.title,
        description: data.description,
        language: data.language,
      },
    })
    return normalizeDocument(record)
  }

  await connectDB()
  const record = await ABOUT.create({
    title: data.title,
    description: data.description,
    language: data.language,
  })
  return normalizeDocument(record)
}

export async function deleteAboutById(id) {
  if (shouldUsePrisma()) {
    const record = await prisma.about.delete({
      where: { id },
    })
    return normalizeDocument(record)
  }

  await connectDB()
  const record = await ABOUT.findByIdAndDelete({ _id: id })
  return normalizeDocument(record)
}

export async function updateAboutById(id, data) {
  if (shouldUsePrisma()) {
    const record = await prisma.about.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        language: data.language,
      },
    })
    return normalizeDocument(record)
  }

  await connectDB()
  const record = await ABOUT.findOneAndUpdate(
    { _id: id },
    {
      title: data.title,
      description: data.description,
      language: data.language,
    },
    { new: true }
  )
  return normalizeDocument(record)
}