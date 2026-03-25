import prisma from '@/libs/prisma'
import { loadLogosModel } from '@/repositories/mongoRuntime'
import { normalizeDocument, normalizeDocuments } from '@/repositories/normalizeDocument'
import { shouldUsePrisma } from '@/repositories/repositoryRuntime'

export async function listLogosByLanguage(language) {
  if (shouldUsePrisma()) {
    const records = await prisma.logos.findMany({
      where: { language },
      orderBy: { createdAt: 'asc' },
    })
    return normalizeDocuments(records.map((record) => ({ ...record, Icon: record.icon })))
  }

  const LOGOS = await loadLogosModel()
  const records = await LOGOS.find({ language }).sort({ createdAt: 1 })
  return normalizeDocuments(records)
}

export async function createLogos(data) {
  if (shouldUsePrisma()) {
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

  const LOGOS = await loadLogosModel()
  const record = await LOGOS.create({
    name: data.name,
    Icon: data.Icon,
    language: data.language,
    color: data.color,
    description: data.description,
  })
  return normalizeDocument(record)
}

export async function deleteLogosById(id) {
  if (shouldUsePrisma()) {
    const record = await prisma.logos.delete({
      where: { id },
    })
    return normalizeDocument({ ...record, Icon: record.icon })
  }

  const LOGOS = await loadLogosModel()
  const record = await LOGOS.findOneAndDelete({ _id: id })
  return normalizeDocument(record)
}

export async function updateLogosById(id, data) {
  if (shouldUsePrisma()) {
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

  const LOGOS = await loadLogosModel()
  const record = await LOGOS.findOneAndUpdate(
    { _id: id },
    {
      name: data.name,
      Icon: data.Icon,
      language: data.language,
      color: data.color,
      description: data.description,
    },
    { new: true }
  )
  return normalizeDocument(record)
}