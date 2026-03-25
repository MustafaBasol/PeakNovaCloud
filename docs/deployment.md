# Deployment Runbook

## Hedef

Bu proje artik Prisma + PostgreSQL ile calisir ve Docker Compose kullanilarak tek host uzerinde deploy edilebilir.

## Dosyalar

- [Dockerfile](../Dockerfile)
- [compose.production.yml](../compose.production.yml)
- [Caddyfile](../Caddyfile)
- [.env.production.example](../.env.production.example)
- [scripts/prepare-deployment.sh](../scripts/prepare-deployment.sh)
- [scripts/start-production.sh](../scripts/start-production.sh)
- [app/api/health/route.js](../app/api/health/route.js)

## Gereken ortam degiskenleri

Zorunlu:

- `DOMAIN`
- `ACME_EMAIL`
- `POSTGRES_PASSWORD`
- `JWT_SECRET`
- `PASSWORD`
- `NEXT_PUBLIC_SITE_URL`

Opsiyonel:

- `MAIL_PASS`
- `EMAIL`
- `HTTP_PORT`
- `HTTPS_PORT`
- `POSTGRES_PORT`
- `POSTGRES_DB`
- `POSTGRES_USER`

## Ilk kurulum

1. Production env dosyasi olustur:

```bash
cp .env.production.example .env.production
```

2. Gizli degerleri duzenle.

Minimum ornek:

```dotenv
DOMAIN=www.peaknovas.com
ACME_EMAIL=ops@peaknovas.com
NEXT_PUBLIC_SITE_URL=https://www.peaknovas.com
POSTGRES_PASSWORD=guclu-bir-sifre
JWT_SECRET=uzun-ve-rastgele-bir-deger
PASSWORD=admin-panel-sifresi
```

`NEXT_PUBLIC_SITE_URL` degeri tam olarak `https://DOMAIN` olmalidir.

Bu projede eski canonical adres `https://www.peaknovas.com` oldugu icin production ayarinda da ayni format korunabilir.

3. DNS kayitlarini sunucuya yonlendir.

Gerekli minimum kayitlar:

```text
A     www.peaknovas.com   -> sunucu_ipv4
AAAA  www.peaknovas.com   -> sunucu_ipv6   # varsa
```

`peaknovas.com` kok domaini de kullanilacaksa onun icin ayri A/AAAA kaydi eklenmeli ve tercihen `www` adresine yonlendirilmelidir.

4. Production postgres servisini baslat ve build hazirla:

```bash
npm run deploy:prepare
```

5. Build ve deploy:

```bash
npm run deploy:up
```

6. Saglik kontrolu:

```bash
wget -qO- http://localhost/api/health
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

Sadece proxy loglari:

```bash
docker compose -f compose.production.yml --env-file .env.production logs -f caddy
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
- `caddy` servisi Let's Encrypt uzerinden TLS sertifikasi alir
- `caddy` public 80/443 trafigini `app:3000` servisine aktarir
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

## HTTPS ve proxy notlari

Bu stack artik Caddy ile birlikte gelir. Normal production akisi su sekildedir:

- `caddy` 80 portundan ACME dogrulamasini cevaplar
- sertifika olustuktan sonra 443 uzerinden HTTPS yayinlar
- gelen trafik internal Docker aginda `app:3000` servisine gider

Sunucuda su portlar disariya acik olmalidir:

- `80/tcp`
- `443/tcp`

Eger baska bir web sunucusu bu portlari kullaniyorsa once onu kaldirmaniz gerekir.

## Ariza notlari

`/api/health` 503 donuyorsa tipik nedenler:

- `DATABASE_URL` yanlis
- PostgreSQL container'i hazir degil
- `POSTGRES_PASSWORD` ile compose icindeki baglanti uyusmuyor

Uygulama acilmiyor ama db hazirsa su komut kontrol icin yeterli olur:

```bash
docker compose -f compose.production.yml --env-file .env.production logs app
```

HTTPS sertifikasi alinmiyorsa tipik nedenler:

- `DOMAIN` DNS kaydi bu sunucuya bakmiyor
- 80 veya 443 portu firewall tarafinda kapali
- baska bir servis ayni portlari kullaniyor

Caddy loglari icin:

```bash
docker compose -f compose.production.yml --env-file .env.production logs caddy
```