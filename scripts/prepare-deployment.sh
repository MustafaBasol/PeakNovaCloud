#!/bin/sh
set -eu

if [ ! -f .env.production ]; then
  echo ".env.production is required"
  exit 1
fi

set -a
. ./.env.production
set +a

POSTGRES_DB="${POSTGRES_DB:-peaknova}"
POSTGRES_USER="${POSTGRES_USER:-peaknova}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"

if [ -z "${POSTGRES_PASSWORD:-}" ]; then
  echo "POSTGRES_PASSWORD is required in .env.production"
  exit 1
fi

if [ -z "${JWT_SECRET:-}" ] || [ -z "${PASSWORD:-}" ] || [ -z "${NEXT_PUBLIC_SITE_URL:-}" ] || [ -z "${DOMAIN:-}" ] || [ -z "${ACME_EMAIL:-}" ]; then
  echo "DOMAIN, ACME_EMAIL, JWT_SECRET, PASSWORD and NEXT_PUBLIC_SITE_URL are required in .env.production"
  exit 1
fi

if [ "${NEXT_PUBLIC_SITE_URL}" != "https://${DOMAIN}" ]; then
  echo "NEXT_PUBLIC_SITE_URL must be exactly https://${DOMAIN}"
  exit 1
fi

echo "Starting production postgres service..."
docker compose -f compose.production.yml --env-file .env.production up -d postgres

export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@127.0.0.1:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"

echo "Generating Prisma client..."
npx prisma generate

echo "Applying Prisma schema..."
npx prisma db push

echo "Building application for production..."
npm run build

if [ ! -f .next/routes-manifest.json ] || [ ! -f .next/server/app-paths-manifest.json ]; then
  echo "Production build artifacts are incomplete under .next"
  exit 1
fi

echo "Deployment build artifacts are ready."