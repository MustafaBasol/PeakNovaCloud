export function shouldUsePrisma() {
  return process.env.USE_PRISMA_REPOSITORIES === 'true' && Boolean(process.env.DATABASE_URL)
}