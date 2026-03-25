# PeakNovaCloud

Bu proje Next.js tabanli calisir ve artik dis servis gerektirmeden yerel PostgreSQL ile baslatilabilir.

## Yerel PostgreSQL

Repo icinde self-hosted PostgreSQL kurulumunu Docker Compose ile yapiyoruz.

1. Veritabanini baslat:

```bash
npm run db:up
```

2. Prisma semasini yerel veritabanina uygula:

```bash
npm run prisma:push:local
```

3. Prisma client'i uret:

```bash
npm run prisma:generate:local
```

Yerel veritabani baglantisi:

```bash
postgresql://postgres:postgres@localhost:5432/peaknova?schema=public
```

Faydali komutlar:

```bash
npm run db:logs
npm run db:down
npm run db:reset
```

## Gelistirme Ortami

1. `.env` dosyasi olustur ve `.env.example` icerigini kullan.
2. Veritabani baglantisini tanimla:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/peaknova?schema=public"
```

3. Uygulamayi baslat:

```bash
npm run dev
```

Uygulama varsayilan olarak [http://localhost:3000](http://localhost:3000) uzerinde calisir.

## Deploy

Production deploy icin repo icinde dogrudan kullanilabilecek dosyalar eklendi:

- [Dockerfile](Dockerfile)
- [compose.production.yml](compose.production.yml)
- [.env.production.example](.env.production.example)
- [scripts/prepare-deployment.sh](scripts/prepare-deployment.sh)
- [scripts/start-production.sh](scripts/start-production.sh)
- [app/api/health/route.js](app/api/health/route.js)

Hizli deploy akisi:

1. Production env dosyasini hazirla:

```bash
cp .env.production.example .env.production
```

2. Gizli degerleri doldur:

```bash
POSTGRES_PASSWORD=...
JWT_SECRET=...
PASSWORD=...
NEXT_PUBLIC_SITE_URL=https://alanadiniz.com
```

3. Production build hazirla:

```bash
npm run deploy:prepare
```

4. Servisleri ayağa kaldir:

```bash
npm run deploy:up
```

5. Loglari izle:

```bash
npm run deploy:logs
```

6. Servisleri durdur:

```bash
npm run deploy:down
```

PostgreSQL sifresini veya db/user adini degistirdiysen ve eski volume duruyorsa once tam reset gerekir:

```bash
npm run deploy:reset
```

Production stack su sekilde calisir:

- `postgres` container'i kalici volume ile veriyi tutar
- `deploy:prepare` host uzerinde production `.next` build ciktisini uretir
- Docker image bu hazir build ciktisini icine alir
- `app` container'i acilista yalnizca Prisma schema senkronizasyonu yapar ve hazir build ile `next start` calistirir
- healthcheck olarak `/api/health` kullanilir

Not:

- Eger production build artefact'i olusmazsa container servis kesilmesin diye `next dev` fallback ile ayaga kalkar.
- Bu fallback acil durum icindir; normal hedef her zaman `next start` ile calismaktir.

Detayli operasyon notlari icin [docs/deployment.md](docs/deployment.md) dosyasina bakin.

## PostgreSQL Gecisi

Yeni kurulum akisi soyledir:

```bash
npm run db:up
npm run prisma:push:local
npm run dev
```

