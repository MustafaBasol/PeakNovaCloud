import connectDB from '@/libs/dbConnect'
import prisma from '@/libs/prisma'
import PROJECT from '@/models/Project'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'
import { shouldUsePrisma } from '@/repositories/repositoryRuntime'

export async function listProjectsByLanguage(language) {
  if (shouldUsePrisma()) {
    const records = await prisma.project.findMany({
      where: { language },
      orderBy: { createdAt: 'desc' },
    })
    return normalizeDocuments(records)
  }

  await connectDB()
  const records = await PROJECT.find({ language }).sort({ createdAt: -1 })
  return normalizeDocuments(records)
}

export async function getProjectById(id) {
  if (shouldUsePrisma()) {
    const record = await prisma.project.findUnique({
      where: { id },
    })
    return normalizeDocument(record)
  }

  await connectDB()
  const record = await PROJECT.findById(id)
  return normalizeDocument(record)
}

export async function createProject(data) {
  if (shouldUsePrisma()) {
    const record = await prisma.project.create({
      data: {
        name: data.name,
        title: data.title,
        language: data.language,
        image: data.image,
        description: data.description,
      },
    })
    return normalizeDocument(record)
  }

  await connectDB()
  const record = await PROJECT.create({
    name: data.name,
    title: data.title,
    language: data.language,
    image: data.image,
    description: data.description,
  })
  return normalizeDocument(record)
}

export async function deleteProjectById(id) {
  if (shouldUsePrisma()) {
    const record = await prisma.project.delete({
      where: { id },
    })
    return normalizeDocument(record)
  }

  await connectDB()
  const record = await PROJECT.findOneAndDelete({ _id: id })
  return normalizeDocument(record)
}

export async function updateProjectById(id, data) {
  if (shouldUsePrisma()) {
    const record = await prisma.project.update({
      where: { id },
      data: {
        name: data.name,
        title: data.title,
        language: data.language,
        image: data.image,
        description: data.description,
      },
    })
    return normalizeDocument(record)
  }

  await connectDB()
  const record = await PROJECT.findOneAndUpdate(
    { _id: id },
    {
      name: data.name,
      title: data.title,
      language: data.language,
      image: data.image,
      description: data.description,
    },
    { new: true }
  )
  return normalizeDocument(record)
}