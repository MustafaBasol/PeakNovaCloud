# Kıdemli değerlendirme brifi (bağlayıcı)

Kaynak: `PeakNova_Kurumsal_Web_Sitesi_Degerlendirme_ve_Gelistirme_Brifi.pdf`, 11 Ekim 2026.
Hedef site: peaknovas.com. Production sürümü o tarihte `a5cf60f`, Next.js 16.3.4, React 19.2.8.

Bu dosya yönergenin parçasıdır. Bundan sonraki geliştirme ve içerik iyileştirmesi buna göre yapılır.
Çakışmada sıra: sohbetteki sahip talimatı, onaylı ana sayfa handoff'u, bu brif, sonra bu klasördeki eski el kitabı.

Eski el kitabındaki şu varsayımlar geçersizdir: Hostinger'a statik export, PHP iletişim formu, koyu tema, Geist, kaydırmayla 3D dağ hikâyesi, sitenin kimliğinin Salesforce olması.

## Başarı ölçütü

Siteyi ilk kez açan kişi 30 saniye içinde şunu anlamalı: PeakNova ne yapar, hangi gerçek ürünleri geliştirir, nasıl iletişime geçilir.

## Karar

Ana sayfa doğru yöne evrildi ama şirketin tamamını temsil etmiyor. Ana sayfa AI ve otomasyon ağırlıklı. İç sayfalar büyük ölçüde Salesforce danışmanlığı. NoraMedi ve YapiFin görünürlüğü zayıf. Site, hizmet sayfası koleksiyonu değil, tek bir kurumsal anlatı ve gerçek portföy olmalı.

Hedef konum: PeakNova; özel yazılım ve SaaS platformları geliştiren, yapay zekâ destekli otomasyon tasarlayan, Salesforce/CRM ve kurumsal entegrasyon uzmanlığı sunan bir teknoloji şirketidir.

Önerilen cümle: “PeakNova, işletmelerin gerçek iş problemlerini özel yazılım, yapay zekâ, otomasyon ve kurumsal sistem entegrasyonlarıyla çözen bir teknoloji ve ürün mühendisliği şirketidir.”

Ana mesaj önerisi:

- TR: Gerçek iş sorunlarına akıllı dijital çözümler geliştiriyoruz.
- EN: We Build Intelligent Digital Solutions for Real Business Challenges.

Destekleyici metin: Kurumsal yazılımlardan yapay zekâ destekli otomasyonlara, Salesforce çözümlerinden sektöre özel SaaS platformlarına kadar işletmelerin daha verimli çalışmasını ve ölçeklenmesini sağlayan teknolojiler tasarlıyoruz.

Bu hero metni, onaylı “Gerçek iş yapan AI ajanları.” cümlesinin yerini kendiliğinden almaz. Sahip seçene kadar onaylı cümle durur.

## Hedef kitle

- Sektörel SaaS, operasyon ve müşteri yönetimi ihtiyacı olan işletmeler.
- CRM dönüşümü, Salesforce geliştirme ve entegrasyon ihtiyacı olan ekipler.
- Manuel süreçlerini AI ajanları ve otomasyonlarla iyileştirmek isteyen şirketler.
- Mevcut uygulamalarını API, veri akışları ve altyapı düzeyinde birleştirmek isteyen kurumlar.

## Bulgular

| Alan | Bulgu | Öncelik |
|---|---|---|
| Ana sayfa | AI ajanları, otomasyon ve özel yazılım odağı olumlu. Bütün uzmanlık alanlarını eşit temsil etmiyor. | Yüksek |
| Hizmetler | Salesforce ağırlığı sürüyor. Yazılım, SaaS, AI ve entegrasyonlar sistematik değil. | Kritik |
| Hakkımızda | Hikâye ve teknik yetkinlik Salesforce ekseninde. | Yüksek |
| Portföy | Gerçek ürün vitrini zayıf. Temsili senaryo ile gerçek müşteri işi ayrılmalı. | Kritik |
| NoraMedi | Ana sayfa bağlantısı ürünü anlatmıyorsa fırsat kaçar. | Kritik |
| Dil | EN/FR rotalarında Türkçe metin görülmesi çeviri boşluğudur. | Kritik |
| İletişim ve blog | Dil ve yayın içeriği Salesforce merkezli kalmış. | Orta |

HTTP 200, metnin doğru olduğu anlamına gelmez. Puanlar öznel kurumsal değerlendirmedir. Lighthouse veya kullanıcı araştırması skoru değildir.

## Yetkinlikler ve ürünler

Yalnızca doğrulanmış ve yayın izni olan kabiliyet “mevcut” diye yazılır. Kanıtsız kapasite, sertifika, mevzuat uyumu, müşteri adı, logo, başarı oranı ve performans sayısı yazılmaz. Temsili senaryo açıkça “örnek senaryo”dır. Hasta veya müşteri verisi içeren ekran yayımlanmaz. Görsel anonim veya sentetik olur.

**NoraMedi.** Amiral gemisi. Diş klinikleri için SaaS. Hasta, randevu, tedavi, finans, stok, iletişim, otomasyon ve AI destekli iş akışları modül bazında anlatılır. Ürün sayfasında gerçek veya anonim ekran, sektör sorunu, çözüm yaklaşımı ve demo ya da iletişim yönlendirmesi olur. Sahip, kartın şimdilik `https://noramedi.com/` adresine gitmesini söyledi. Ürün sayfası onaylanınca kart oraya döner.

**YapiFin.** İnşaat şirketleri için proje bazlı gelir, gider, bütçe, tahmin ve finansal takip. Yayında olmayan yetenek açıkça ayrılır. Sahip, kartı şimdilik gizletti. Sayfa ve kart, olgular onaylanmadan yayınlanmaz.

**Salesforce ve CRM.** Mimari, Flow/Apex, süreç otomasyonu, veri, raporlama, entegrasyon ve CRM iyileştirme korunur. Üst marka kimliği yalnızca Salesforce değildir.

**AI ajanları ve otomasyon.** WhatsApp, Instagram, e-posta, insan devri, belge işleme, bilgiye dayalı yanıt ve insan onayı somut örneklerle anlatılır. “AI her şeyi yapar” yazılmaz.

## Bilgi mimarisi

| Menü | Görev |
|---|---|
| Ana sayfa | Değer önerisi, yetkinlikler, öne çıkan ürünler, iletişim çağrısı |
| Çözümler | AI ve otomasyon, özel yazılım ve SaaS, Salesforce ve CRM, kurumsal entegrasyonlar, bulut ve veri |
| Ürünler | NoraMedi, YapiFin ve doğrulanmış diğer ürünlerin kendi sayfaları |
| Çalışmalar | Gerçek müşteri işi, kendi ürünü ve örnek senaryo ayrımı |
| Hakkımızda | Kimlik, yaklaşım, mühendislik, güven, çalışma modeli |
| Blog | AI, yazılım, SaaS, CRM, entegrasyon |
| İletişim | Hizmetten bağımsız proje talebi |

Çözüm sayfası şablonu: iş sorunu ve hedef müşteri, kapsam ve teslimatlar, tipik entegrasyonlar, varsa doğrulanmış örnek, teknoloji yaklaşımı, CTA “Projeni anlatalım” veya “Görüşme planlayalım”.

Brifin önerdiği ana sayfa akışı:

1. Hero. Kapsayıcı değer önerisi. Birincil CTA “Çözümlerimizi keşfedin”. İkincil CTA “Çalışmalarımız”.
2. Neler yapıyoruz. AI, özel yazılım, Salesforce/CRM, entegrasyonlar, bulut ve veri.
3. Geliştirdiğimiz ürünler. NoraMedi ve YapiFin. Kısa değer, gerçek ekran, ayrı sayfa.
4. Seçilmiş çalışmalar. Yalnızca kanıtlanmış vaka. Ürün işi ile müşteri işi ayrı.
5. Nasıl çalışıyoruz. Keşif, mimari, geliştirme, test, devreye alma, iyileştirme.
6. Teknoloji ve güven. Dürüst yetkinlik, entegrasyon, veri güvenliği. Kanıtsız sayı ve sertifika yok.
7. Kapanış CTA. Projenin anlatılacağı basit iletişim.

Onaylı handoff hâlâ duruyor: cam panel, hizmet tırmanışı, nasıl çalışıyoruz, ürünler, kapanış. Hero cümlesi, CTA ve çözüm alanı sayısı sahip seçene kadar değişmez. Sahip, “Nasıl çalışıyoruz” bölümünü şöyle kilitledi: başlık ve dağ çizimi üstte, altı adım kart olarak altta.

## Görsel kurallar

- Premium ve anlaşılır. Tutarlı renk, kuvvetli tipografi, beyaz alan, okunur kontrast.
- Ana sayfa ve iç sayfalar aynı bileşen ve tasarım sistemini kullanır.
- Gerçek ürün ekranı önceliklidir. Dekoratif görsel mesajı destekler, ürünün yerini almaz.
- Animasyon performansı ve erişilebilirliği bozmaz. `prefers-reduced-motion` desteklenir.
- Mobil menü, kart ızgarası, CTA ve form gerçek cihaz genişliğinde test edilir.
- Açık ve koyu tema varsa ikisi de okunur. Sahip açık temayı kilitledi.
- Metin sırası: problem, çözüm, kanıt, aksiyon. Boş vaat yok.

## Dil ve SEO

- TR, EN, FR başlık, CTA, kart, ürün metni, form, doğrulama ve hata mesajı kendi dilinde tamdır. Sahip DE dilini de istiyor. DE, anadil kontrolü olmadan yayına girmez.
- Ana sayfadaki Türkçe metin EN, FR ve DE rotalarında görünmez. Tarayıcıda ve kodda test edilir.
- Metinlerin tek kaynağı vardır. Çeviri dosyası ve veritabanı içeriği ayrı ayrı büyümez.
- URL, dil değiştirici, locale yönlendirmesi, metadata, canonical ve hreflang tutarlıdır.
- Her ürün ve çözüm sayfasının benzersiz başlığı, açıklaması, başlık hiyerarşisi ve iç bağlantısı vardır.

## Yayın gerçeği

11 Ekim 2026 kaydına göre canlı uygulama VPS üzerinde PM2 ile `127.0.0.1:3000` portunda çalışır. Cloudflare öndedir. Repoda `forward/` altında ikinci bir Next.js uygulaması vardır. İkisinin görevi Faz 0'da netleşmeden aynı içerik iki yerde ayrışmaz.

| Bulgu | Yapılacak |
|---|---|
| React 19 ve `html-react-parser` peer uyuşmazlığı | Uyumlu sürüme geç veya güvenli alternatif kullan. Temiz `npm ci` geçer. |
| `/api/sendMail` | Hız sınırı, bot koruması, şema doğrulaması, HTML kaçışı, SMTP ortam değişkeni, kişisel veri içermeyen hata kaydı. |
| JWT reddi 400 dönüyor | Eksik veya bozuk belirteç 401, yetkisiz rol 403, bozuk girdi 400. Yazma rotalarında rol kontrolü. Yetkisiz istek veritabanına yazmaz. |
| İki Next.js router-state hatası | Playwright ile istemci gezinmesi, geri, ileri, yenileme ve dil değişimi. Kök neden bulunmadan yama yok. |
| Başlangıç betiğinde `prisma db push` | Şema değişikliği başlangıçtan ayrılır. Kontrollü migration ve geri alma. |
| Kök uygulama ve `forward/` | Tek kaynaklı yayın mimarisi belgelenir. |

Yetkisiz blog POST isteğinin 400 ve “Unauthorized” dönmesi, yazmadan önce `authenticate()` çalıştığını gösterir. Bu, bütün uçların denetlendiği anlamına gelmez. Gerçek SMTP, panel düzenleme ve tarayıcı gezinmesi o deployment'ta doğrulanmamıştır.

## Fazlar

Kod yazmadan önce Faz 0 ve Faz 1 biter. İstenecek üç çıktı: kök ve `forward/` yayın mimarisi raporu, TR/EN/FR/DE sayfa ağacı ve içerik taslakları, NoraMedi ve YapiFin için teyit isteyen iddia listesi ve kullanılabilir görseller. Onaydan sonra tasarım ve uygulama PR'ı açılır.

| Faz | Teslim | Kabul |
|---|---|---|
| 0 İnceleme | Ana uygulama ve `forward/` ilişkisi, içerik kaynakları, rota envanteri, mevcut ekranlar | Kapsam ve mimari onaylı |
| 1 Konumlandırma | Marka mesajı, sayfa ağacı, metinler, ürün olgu kontrolü | Metin ve akış koddan önce onaylı |
| 2 Tasarım | Ortak sistem, ana sayfa, üst ve alt bilgi, mobil | TR/EN/FR/DE ve responsive test |
| 3 Ürünler ve çözümler | NoraMedi, YapiFin, Salesforce, AI, entegrasyon, portföy | Her sayfada özgün değer ve doğru CTA |
| 4 Teknik ve SEO | i18n, metadata, güvenlik, bağımlılık, deploy | Temiz `npm ci`, build, regresyon |
| 5 Yayına hazırlık | Playwright, erişilebilirlik, form, API, deployment raporu | Onaydan sonra PR, merge, deploy. Geri alma belgesi var |

## Çalışma kuralları

- Güncel `main` üzerinden ayrı feature branch. `main` üzerinde ve VPS üzerinde doğrudan kod değişmez.
- Mimari, yeni içerik ve sayfa taslağı önce onaya gider.
- Değişiklikler ayrı PR'lara bölünür. İlgisiz refactor yok.
- Production veritabanı, gerçek müşteri verisi ve sırlar korunur. Gerçek müşteriye test e-postası yok. Onaysız production yazması yok.
- Onay olmadan PR açılmaz, merge edilmez, production'a alınmaz.
- Her faz sonunda yapılanlar, testler, riskler, migration ihtiyacı ve sonraki adım raporlanır.

Nihai rapor başlıkları:

- Değişiklik özeti ve karşılanan kabul kriterleri
- Değiştirilen dosyalar, bileşenler ve rotalar
- TR/EN/FR/DE kapsamı ve eksik çeviriler
- Otomatik testler, Playwright, başarısız veya zaman aşımına uğrayan testler
- Güvenlik ve bağımlılık bulguları, açık riskler
- Veritabanı migration ihtiyacı ve production etkisi
- Geri alma planı, deploy adımları, sahipten beklenen sonraki karar

## Minimum kabul

- TR, EN, FR, DE ana sayfa ve menü rotaları 200 döner. İçerik o dilde. Bağlantılar doğru.
- NoraMedi ve YapiFin sayfaları doğru bilgi ve uygun görselle açılır. YapiFin, onaydan önce yayınlanmaz.
- Salesforce ve AI sayfaları şirket konumlandırmasıyla uyumludur.
- Mobil menü, dil değiştirme, geri, ileri, yenileme ve reduced-motion geçer.
- Ana CTA'lar çalışır. Form doğrulaması, spam koruması ve gönderim sonucu mock SMTP ile test edilir.
- Yetkisiz POST, PATCH ve DELETE reddedilir. Veritabanına yazılmaz.
- Temiz `npm ci` ve `npm run build` başarılıdır. Testler raporlanır.
- Title, description, hreflang, canonical, Open Graph, başlık hiyerarşisi ve sitemap doğrulanır.
- Console, ağ, RSC ve PM2 hata kayıtları incelenir. Bilinen router hatası yeniden test edilir.
