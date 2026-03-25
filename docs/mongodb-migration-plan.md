# MongoDB'den Cikis Plani

## Amac

Bu proje su anda Mongoose ve MongoDB'ye dogrudan bagli calisiyor. Amac, veri katmanini soyutlayip uygulamayi MongoDB bagimliligindan kurtarmak, ardindan yeni bir iliskisel veritabanina kontrollu sekilde gecmek.

Bu plan, kod tabanindaki mevcut bagimliliklari koruyarak asamali bir gecis tanimlar.

## Guncel Uygulama Durumu

Tamamlananlar:

- API route'lari dogrudan Mongoose model import etmek yerine repository katmanini kullaniyor.
- Prisma altyapisi eklendi: prisma/schema.prisma, prisma.config.ts, libs/prisma.js.
- About, Faq, Logos, Project, Blog, Page, Service ve Seo repository'leri Prisma-only calisiyor.
- Yerel self-hosted PostgreSQL kurulumu compose.yml ile repo icine alindi.
- API cevabinda `id` ve `_id` birlikte donmeye devam ediyor.

Hala kalanlar:

- Frontend write path'lerinde `_id` kullanimlarinin tamamen temizlenmesi
- Gerekirse mevcut Mongo verisinin PostgreSQL'e tek seferlik harici script ile tasinmasi
- Prisma tarafinda kalici migration gecmisi isteniyorsa `prisma migrate` akisinin eklenmesi

## Mevcut Durum Ozeti

MongoDB bagimliligi uc seviyede bulunuyor:

1. Baglanti katmani
   - libs/dbConnect.js

2. Mongoose model katmani
   - models/About.js
   - models/Blog.js
   - models/Faq.js
   - models/Logos.js
   - models/Page.js
   - models/Project.js
   - models/Seo.js
   - models/Service.js

3. API route katmani
   - app/api/getAbout/route.js
   - app/api/getBlogs/route.js
   - app/api/getBlogs/[slug]/route.js
   - app/api/getFaq/route.js
   - app/api/getLogos/route.js
   - app/api/getPage/route.js
   - app/api/getProjects/route.js
   - app/api/getProjects/[id]/route.js
   - app/api/getSeo/route.js
   - app/api/getSeos/route.js
   - app/api/getService/route.js
   - app/api/getService/[serviceName]/route.js
   - app/api/auth/route.js

Ek olarak dashboard ve bazi public ekranlar Mongo tipindeki `_id` alanina bagli.

## Onerilen Hedef Mimari

Oneri:

- Veritabani: PostgreSQL
- ORM / DB client: Prisma
- Veri erisim deseni: repository katmani

Neden bu yapi:

- Mevcut veri modeli buyuk oranda iliskisel ortama tasinabilir.
- `slug`, `language`, `section`, `service` gibi filtreler SQL tarafinda daha net indekslenir.
- Prisma ile type-safe sorgular ve migration yonetimi daha kontrollu olur.
- MongoDB'ye ozgu `_id`, `Schema`, `pre('save')`, `findOneAndUpdate` gibi kaliplardan kurtulmak kolaylasir.

## Hedef Klasor Yapisi

Asagidaki yapi onerilir:

```text
prisma/
  schema.prisma
src/
  data/
    repositories/
      aboutRepository.js
      blogRepository.js
      faqRepository.js
      logosRepository.js
      pageRepository.js
      projectRepository.js
      seoRepository.js
      serviceRepository.js
  lib/
    db.js
```

Mevcut projede alias yapisi `@/` oldugu icin pratikte su sekilde de uygulanabilir:

```text
libs/
  db.js
repositories/
  aboutRepository.js
  blogRepository.js
  faqRepository.js
  logosRepository.js
  pageRepository.js
  projectRepository.js
  seoRepository.js
  serviceRepository.js
```

## Faz 1: Veri Erisimini Soyutla

Ilk teknik hedef MongoDB'yi hemen cikarmak degil, API route'lari Mongoose'tan ayirmaktir.

Yapilacaklar:

1. Her entity icin repository dosyasi olustur.
2. Mongoose sorgularini repository icine tasi.
3. API route'lar sadece repository cagrisi yapsin.
4. Response contract degismesin.

Ornek hedef:

- app/api/getBlogs/route.js icinde `BLOG.find(...)` yerine `blogRepository.listByLanguage(...)`
- app/api/getProjects/[id]/route.js icinde `PROJECT.findById(...)` yerine `projectRepository.getById(...)`

Bu asamada:

- `models/` klasoru durur
- `libs/dbConnect.js` durur
- ama route dosyalari veritabanindan habersiz hale gelir

Bu faz tamamlandiginda veritabani degisikligi route bazinda degil repository bazinda yapilabilir.

## Faz 2: Kimlik Alani Stratejisi

Su anda uygulama genelinde `_id` kullaniliyor. Bu dogrudan Mongo kalintisi.

Hedef:

- Tum yeni veri katmani `id` kullansin.
- Gecis suresince API cevabinda hem `id` hem `_id` donulebilsin.

Gecici adapter kuralı:

```text
id = record.id
_id = record.id
```

Bu sayede dashboard tarafi kirilmadan backend degistirilebilir.

Sonraki temizlik asamasinda:

1. frontend `item.id` kullanir
2. `_id` tamamen kaldirilir

## Faz 3: Hedef SQL Semasi

### about

- id
- title
- description
- language
- createdAt
- updatedAt

### faq

- id
- question
- answer
- language
- createdAt
- updatedAt

### logos

- id
- name
- description
- language
- icon
- color
- createdAt
- updatedAt

### projects

- id
- name
- title
- description
- image
- language
- createdAt
- updatedAt

### page_content

- id
- section
- title
- description
- image
- buttonText
- language
- cards JSON
- createdAt
- updatedAt

### service_page

- id
- service
- section
- title
- description
- image
- buttonText
- language
- cards JSON
- createdAt
- updatedAt

### blog

- id
- title
- slug
- content JSON
- coverImage
- language
- summary
- seo JSON
- createdAt
- updatedAt

### seo

- id
- page
- language
- title
- description
- keywords JSON veya text[]
- slug
- url
- ogTitle
- ogDescription
- ogImage
- robots
- createdAt
- updatedAt

## Faz 4: Indeks ve Constraint Kararlari

Minimum zorunlu constraint listesi:

1. `blog.slug` unique
2. `seo.slug` unique
3. `language` alanlari icin indeks
4. `page_content (language, section)` indeks
5. `service_page (language, service, section)` indeks
6. `projects.createdAt` ve `blog.createdAt` siralama icin indeks

Not:

- Eger ayni slug farkli dilde tekrar kullanilacaksa unique kuralini global degil birlesik anahtar olarak tasarlamak gerekir.
- Mevcut kod global unique varsayimina yakin duruyor. Bu karar gecis oncesi netlesmeli.

## Faz 5: Veri Tasima

Bir migrate script'i gerekir.

Script gorevleri:

1. MongoDB'den mevcut veriyi oku.
2. Her kaydi hedef semaya donustur.
3. `ObjectId` degerlerini yeni `id` alanina map et.
4. Nested alanlari JSON olarak tası.
5. Idempotent calissin.

Script ciktilari:

- tasinan kayit sayisi
- atlanan kayitlar
- duplicate slug raporu
- zorunlu alan hatalari

Onemli kontrol listesi:

- `Blog.content` JSON olarak korunmali
- `Blog.seo` JSON olarak korunmali
- `Page.cards` JSON olarak korunmali
- `Service.cards` JSON olarak korunmali
- `Seo.keywords` tip karari net olmali

## Faz 6: Endpoint Bazli Gecis Sirasi

En dusuk riskten en yuksege gecis sirasi:

### Grup A - Basit CRUD

- getAbout
- getFaq
- getLogos
- getProjects

Neden:

- Veri modelleri duz.
- Nested alan yok veya az.
- Query deseni basit.

### Grup B - Orta karmaşıklık

- getSeos
- getSeo
- getPage

Neden:

- Filtreleme daha karmasik.
- `page` icin regex benzeri arama var.
- `keywords` ve meta alanlari tip hassas.

### Grup C - Yuksek karmasiklik

- getService
- getService/[serviceName]
- getBlogs
- getBlogs/[slug]

Neden:

- Nested JSON alanlari var.
- Slug ve duplicate kontrolu var.
- `updateMany` gibi davranis farklari var.

## Faz 7: Frontend Uyum Katmani

Su dosyalarda `_id` bagimliligi var ve geciste etkilenir:

- app/[locale]/blogs/page.js
- app/[locale]/blogs/[slug]/page.js
- app/[locale]/dashboard/about/page.js
- app/[locale]/dashboard/blogs/page.js
- app/[locale]/dashboard/faq/page.js
- app/[locale]/dashboard/logos/page.js
- app/[locale]/dashboard/pages/[pageName]/page.js
- app/[locale]/dashboard/projects/page.js
- app/[locale]/dashboard/seo/page.js
- app/[locale]/dashboard/services/page.js
- app/[locale]/dashboard/services/[serviceName]/page.js
- components/blog/BlogHolder.js
- components/projects-page/ProjectItem.js
- components/dashboard/BlogPopUp.js
- components/dashboard/PopUp.js

Gecis kurali:

1. Once backend `id` ve `_id` birlikte donsun.
2. Sonra frontend `item.id || item._id` kullansin.
3. En son `_id` tamamen kaldirilsin.

Bu sira tersine cevrilmemeli.

## Faz 8: Auth Route Temizligi

app/api/auth/route.js su anda gereksiz sekilde `connectDB()` cagiriyor.

Bu route veritabani kullanmiyor. Repository katmani gecisinden once bile bu bagimlilik kaldirilabilir.

Bu, MongoDB'den cikis icin iyi bir ilk temizlik adimidir.

## Tespit Edilen Teknik Borclar

Migration oncesi bilinmesi gereken mevcut kusurlar:

1. Bazi PATCH alanlarinda typo var
   - `decription`
   - `ogDesription`

2. getBlogs PATCH icinde `res.status(...)` kullaniliyor ama `res` yok

3. Page ve Service modellerinde timestamp secenegi yok, ama route'lar `createdAt` ile sort ediyor

4. `getProjects/[id]` route'u diger route'lar gibi ortak veri katmani kullanmiyor

Bu sorunlar migration sirasinda birebir kopyalanmamali.

## Kabul Kriterleri

MongoDB bagimliliginin kalkmis sayilmasi icin su kosullar saglanmali:

1. package.json icinde `mongoose` kalmamis olmali
2. `libs/dbConnect.js` silinmis olmali
3. `models/` klasoru silinmis olmali
4. tum `app/api/**` route'lari repository katmani kullaniyor olmali
5. `.env` icinde `MONGO_URI` gerekmemeli
6. dashboard ve public sayfalar `id` ile calisiyor olmali
7. veri tasima script'i tekrar calistirilabilir olmali

## Ilk 3 Uygulama Paketi

### Paket 1

Hedef:

- repository katmani altyapisini ekle
- getAbout ve getFaq route'larini repository kullanir hale getir

Cikti:

- repository klasoru
- 2 endpoint Mongoose'tan dolayli bagimli hale gelir

### Paket 2

Hedef:

- Prisma kur
- schema.prisma olustur
- PostgreSQL baglantisini ekle

Cikti:

- yeni DB calisir durumda olur
- kod tarafinda henuz tam gecis yapilmamis olur

### Paket 3

Hedef:

- Mongo -> SQL migrate script'i yaz
- about, faq, logos, projects verilerini tasi

Cikti:

- ilk veri tasima proven hale gelir

## Onerilen Sonraki Teknik Adim

En mantikli bir sonraki adim su:

1. repository katmanini eklemek
2. auth route icindeki gereksiz `connectDB()` cagrısını silmek
3. getAbout ve getFaq endpoint'lerini repository pattern'e tasimak

Bu adimlar, henuz veritabanini degistirmeden MongoDB bagimliligini gevsetir ve esas migration isini daha guvenli hale getirir.

## Mevcut Uygulama Durumu

Bu dokuman hazirlandiktan sonra su altyapi adimlari uygulanmistir:

1. `app/api/**` route'lari repository katmanini kullanir hale getirildi.
2. `app/api/auth/route.js` icindeki gereksiz Mongo baglantisi kaldirildi.
3. `prisma/schema.prisma` ve `prisma.config.ts` eklendi.
4. Repository katmani artik response verilerinde hem `id` hem `_id` donuyor.
5. About, Faq, Logos ve Project repository'leri icin opsiyonel Prisma backend destegi eklendi.
6. Ilk veri tasima script'i `scripts/migrate-mongo-to-prisma.mjs` olarak eklendi.

Bu noktada MongoDB tam olarak kaldirilmadi, ancak bagimlilik route katmanindan repository katmanina indirildi ve SQL gecisi icin altyapi hazirlandi.