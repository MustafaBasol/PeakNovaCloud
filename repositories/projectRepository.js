import prisma from '@/libs/prisma'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'

export async function listProjectsByLanguage(language) {
  const records = await prisma.project.findMany({
    where: { language },
    orderBy: { createdAt: 'desc' },
  })
  return normalizeDocuments(records)
}

export async function getProjectById(id) {
  const record = await prisma.project.findUnique({
    where: { id },
  })
  return normalizeDocument(record)
}

export async function createProject(data) {
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

export async function deleteProjectById(id) {
  const record = await prisma.project.delete({
    where: { id },
  })
  return normalizeDocument(record)
}

export async function updateProjectById(id, data) {
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