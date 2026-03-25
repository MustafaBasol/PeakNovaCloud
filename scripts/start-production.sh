#!/bin/sh
set -eu

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is required"
  exit 1
fi

if [ ! -f .next/routes-manifest.json ] || [ ! -f .next/server/app-paths-manifest.json ]; then
  echo "Production build artifacts are missing. Run 'npm run deploy:prepare' before starting production containers."
  exit 1
fi

echo "Applying Prisma schema..."
npx prisma db push

echo "Starting Next.js..."
exec npx next start -p "${PORT:-3000}"
