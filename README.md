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

## Mongo -> PostgreSQL Gecisi

Yeni kurulum akisi soyledir:

```bash
npm run db:up
npm run prisma:push:local
npm run dev
```
