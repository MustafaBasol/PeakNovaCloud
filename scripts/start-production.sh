#!/bin/sh
set -eu

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is required"
  exit 1
fi

if [ ! -f .next/BUILD_ID ]; then
  echo "Production build is missing. Building inside container..."
  npm run build
fi

echo "Applying Prisma schema..."
npx prisma generate
npx prisma db push

if [ -f .next/BUILD_ID ]; then
  echo "Starting Next.js production server..."
  exec npx next start -p "${PORT:-3000}" -H 0.0.0.0
fi

echo "Production build artifacts are still missing after build. Falling back to next dev runtime..."
exec npx next dev -p "${PORT:-3000}" -H 0.0.0.0
