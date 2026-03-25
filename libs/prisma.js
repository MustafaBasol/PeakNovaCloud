import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required to initialize PrismaClient')
}

const adapter = globalForPrisma.prismaAdapter || new PrismaPg({ connectionString: process.env.DATABASE_URL })

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaAdapter = adapter
  globalForPrisma.prisma = prisma
}

export default prisma