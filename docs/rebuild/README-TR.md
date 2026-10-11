# PeakNova Cursor Kiti: Kullanım

Bu klasörün içeriğini yeni repo'nun **köküne** kopyala. Cursor `AGENTS.md` dosyasını ve `.cursor/rules/` altındaki kuralları otomatik okur.

## İçerik

| Dosya | Ne işe yarar |
|---|---|
| `AGENTS.md` | Ana el kitabı: hedef, kararlar, stack, klasör yapısı, Hostinger dağıtımı, 6 faz ve Gherkin kabul kriterleri, Definition of Done |
| `DESIGN.md` | Tasarım sistemi (awesome-design-md formatında): renk, tipografi, boşluk, radius, hareket token'ları ve kurallar. Renkler logodan ölçüldü, kontrastlar hesaplandı |
| `.cursor/rules/00-core.mdc` | Her zaman uygulanan mühendislik kuralları |
| `.cursor/rules/10-design-taste.mdc` | taste-skill + Apple + Vercel kurallarından damıtılmış tasarım disiplini |
| `.cursor/rules/20-scene.mdc` | 3D dağ tırmanışı sahnesinin tam teknik spesifikasyonu |
| `.cursor/rules/30-i18n-content.mdc` | 4 dil, MDX içerik ve SEO kuralları |
| `docs/site-spec.json` | Tüm sayfalar, bölümler, eski URL yönlendirmeleri, form şeması |
| `docs/content-brief.md` | Konumlanma, ses tonu, TR+EN kaynak metinler, sözlük |
| `docs/reference/` | Apple ve Linear DESIGN.md, Vercel Web Interface Guidelines |
| `public/brand/` | Logo dosyaları |

## Cursor'a ilk mesaj (kopyala yapıştır)

```
AGENTS.md dosyasını baştan sona oku, ardından DESIGN.md, docs/site-spec.json ve docs/content-brief.md dosyalarını oku. AGENTS.md §3'teki skill kurulumlarını yap. Sonra sadece Phase 0'ı uygula. Bitince Phase 0 kabul kriterlerinin ve Pre-Flight Check'in sonucunu madde madde raporla, 1440 ve 390 genişlikte ekran görüntüsü al. Phase 1'e ben onay vermeden geçme. Eksik bilgi olursa uydurma, bana sor.
```

Her fazdan sonra aynı kalıbı kullan: "Phase N'i uygula, raporla, onayımı bekle."

## Senin vermen gereken bilgiler (AGENTS.md §9)

1. Tema onayı (varsayılan: koyu) ve Hostinger plan tipi (varsayılan: statik export, her planda çalışır)
2. Yasal bilgiler: şirket unvanı, adres, sicil/vergi no. Almanya ve Fransa'dan gelen ziyaretçiler için Impressum / mentions légales gerekli
3. İletişim formunun gideceği e-posta ve SMTP kutusu
4. NoraMedi ekran görüntüleri (**yalnızca demo veriyle**, gerçek hasta verisi olmadan)
5. Eski 3 blog yazısının metni
6. İzinli müşteri adları ve logolar (yoksa o bölüm hiç gösterilmez)
7. Sosyal medya linkleri
8. FR ve DE metinleri için anadil kontrolü
9. Content brief içinde **[confirm]** ile işaretli taahhütler (yanıt süresi, kod ve veri sahipliği vb.)
