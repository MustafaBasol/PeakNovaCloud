import prisma from '@/libs/prisma'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'

export async function listLogosByLanguage(language) {
  const records = await prisma.logos.findMany({
    where: { language },
    orderBy: { createdAt: 'asc' },
  })
  return normalizeDocuments(records.map((record) => ({ ...record, Icon: record.icon })))
}

export async function createLogos(data) {
  const record = await prisma.logos.create({
    data: {
      name: data.name,
      icon: data.Icon,
      language: data.language,
      color: data.color,
      description: data.description,
    },
  })
  return normalizeDocument({ ...record, Icon: record.icon })
}

export async function deleteLogosById(id) {
  const record = await prisma.logos.delete({
    where: { id },
  })
  return normalizeDocument({ ...record, Icon: record.icon })
}

export async function updateLogosById(id, data) {
  const record = await prisma.logos.update({
    where: { id },
    data: {
      name: data.name,
      icon: data.Icon,
      language: data.language,
      color: data.color,
      description: data.description,
    },
  })
  return normalizeDocument({ ...record, Icon: record.icon })
}