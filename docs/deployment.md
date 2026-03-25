# Deployment Runbook

## Hedef

Bu proje artik Prisma + PostgreSQL ile calisir ve Docker Compose kullanilarak tek host uzerinde deploy edilebilir.

## Dosyalar

- [Dockerfile](../Dockerfile)
- [compose.production.yml](../compose.production.yml)
- [.env.production.example](../.env.production.example)
- [scripts/prepare-deployment.sh](../scripts/prepare-deployment.sh)
- [scripts/start-production.sh](../scripts/start-production.sh)
- [app/api/health/route.js](../app/api/health/route.js)

## Gereken ortam degiskenleri

Zorunlu:

- `POSTGRES_PASSWORD`
- `JWT_SECRET`
- `PASSWORD`
- `NEXT_PUBLIC_SITE_URL`

Opsiyonel:

- `MAIL_PASS`
- `EMAIL`
- `APP_PORT`
- `POSTGRES_PORT`
- `POSTGRES_DB`
- `POSTGRES_USER`

## Ilk kurulum

1. Production env dosyasi olustur:

```bash
cp .env.production.example .env.production
```

2. Gizli degerleri duzenle.

3. Production postgres servisini baslat ve build hazirla:

```bash
npm run deploy:prepare
```

4. Build ve deploy:

```bash
npm run deploy:up
```

5. Saglik kontrolu:

```bash
wget -qO- http://localhost:${APP_PORT:-3000}/api/health
```

Beklenen cevap:

```json
{"ok":true}
```

## Operasyon komutlari

Loglar:

```bash
npm run deploy:logs
```

Servisleri durdur:

```bash
npm run deploy:down
```

Veritabani volume'unu da sifirla:

```bash
npm run deploy:reset
```

Belirli container durumu:

```bash
docker compose -f compose.production.yml --env-file .env.production ps
```

## Guncelleme akisi

Yeni kod deploy etmek icin:

```bash
git pull
npm run deploy:prepare
npm run deploy:up
```

Compose `--build` kullandigi icin uygulama image'i yeniden olusturulur.

## Calisma modeli

- `deploy:prepare` once production postgres servisini ayaga kaldirir
- host makinede `.env.production` degerleri ile `next build` calistirir
- Docker image hazir `.next` ciktisini kullanir
- `app` servisi acilista `prisma generate` ve `prisma db push` calistirir
- hazir build ciktisi varsa `next start` ile baslar
- build artefact'i eksikse once container icinde `next build` dener

Normal akista production container'i baslamadan once `deploy:prepare` calismis olmalidir.

Uygulama build artefact'i yine de eksikse container servis devam etsin diye `next dev` fallback moduna gecer. Bu durum gecici uyumluluk modudur; ideal olan `next start` ile calismasidir.

`deploy:prepare` komutu `POSTGRES_PORT` uzerinden host makineden veritabanina baglanir.

## Veri kaliciligi

PostgreSQL verisi `postgres_prod_data` volume icinde tutulur. `docker compose down` bu volume'u silmez.

Volume'u da silmek isterseniz:

```bash
npm run deploy:reset
```

Not: `POSTGRES_PASSWORD`, `POSTGRES_DB` veya `POSTGRES_USER` degerlerini degistirip ayni volume'u kullanirsaniz auth hatasi alirsiniz. Bu durumda once volume reset gerekir.

## Ters proxy notu

Bu stack dogrudan `APP_PORT` uzerinden yayin yapar. Gercek production ortaminda Nginx, Caddy veya Traefik arkasina almak daha dogrudur.

Minimum oneriler:

- TLS terminasyonu ters proxy'de olsun
- `NEXT_PUBLIC_SITE_URL` public alan adi ile ayni olsun
- 80 ve 443 proxy tarafinda acik olsun
- app container'i dogrudan internete degil proxy uzerinden yayinlansin

## Ariza notlari

`/api/health` 503 donuyorsa tipik nedenler:

- `DATABASE_URL` yanlis
- PostgreSQL container'i hazir degil
- `POSTGRES_PASSWORD` ile compose icindeki baglanti uyusmuyor

Uygulama acilmiyor ama db hazirsa su komut kontrol icin yeterli olur:

```bash
docker compose -f compose.production.yml --env-file .env.production logs app
```