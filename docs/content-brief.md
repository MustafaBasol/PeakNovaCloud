# PeakNova Content Brief

Source copy for the site. TR and EN are the source languages; translate to FR and DE following `.cursor/rules/30-i18n-content.mdc` and the glossary in §7. Copy marked **[confirm]** contains a business commitment the owner must approve before launch; keep it, but list it in your phase summary.

This file intentionally contains no em dashes or en dashes. Keep it that way.

---

## 1. Positioning

**One sentence (internal, not for display):** PeakNova designs and builds AI agents, automations and custom software that fit how a company really operates, with the engineering discipline of a regulated-industry product team.

**Why us (proof points, all verified):**
- We build and run our own production SaaS: NoraMedi, a multi-tenant clinic platform with AI messaging on WhatsApp and Instagram.
- Background in CRM and Salesforce: we understand how sales, service and operations teams actually work, and how systems fail when they don't match reality.
- Engineering habits from healthcare software: tenant isolation, audit trails, data minimization, anonymization, idempotent integrations, API and worker separation.
- Process first: we start from how work flows, then choose the smallest system that solves it.

**Never claim:** team size, client names or logos without permission, numeric results, certifications (ISO, CMMI, Salesforce certifications, health ministry registration) unless the owner confirms in writing, "Autoviseo".

## 2. Voice

| Do | Don't |
|---|---|
| Concrete nouns and verbs: "answers WhatsApp messages", "updates the CRM record" | Hype: elevate, seamless, unleash, revolutionize, cutting-edge, empower, next-gen, game-changer |
| Calm confidence, like an engineer explaining a design | Salesy urgency, exclamation marks |
| Short sentences. One idea per sentence | Stacked adjectives |
| Second person ("your team", "ekibiniz") | "We are passionate about…" |
| Honest limits ("a person decides when a case is ambiguous") | Promises of full autonomy or guaranteed results |

The old site's best idea stays: **process first, then technology** ("Önce iş süreci, sonra yapılandırma").

## 3. Global UI labels

| Key | TR | EN | FR | DE |
|---|---|---|---|---|
| contact CTA (the only contact label, everywhere) | Proje başlatın | Start a project | Démarrer un projet | Projekt starten |
| nav.services | Hizmetler | Services | Services | Leistungen |
| nav.work | Çalışmalar | Work | Réalisations | Projekte |
| nav.blog | Blog | Blog | Blog | Blog |
| nav.about | Hakkımızda | About | À propos | Über uns |
| read case study | Vaka çalışmasını okuyun | Read the case study | Lire l'étude de cas | Fallstudie lesen |
| all posts | Tüm yazılar | All posts | Tous les articles | Alle Beiträge |
| skip link | İçeriğe geç | Skip to content | Aller au contenu | Zum Inhalt springen |

## 4. Home page copy

### hero
- **TR headline:** Gerçek iş yapan AI ajanları.
- **TR subtext:** Şirketinizin gerçekte nasıl çalıştığına uyan AI ajanları, otomasyonlar ve özel yazılımlar tasarlıyor ve geliştiriyoruz.
- **EN headline:** AI agents that do real work.
- **EN subtext:** We design and build AI agents, automations and custom software that fit how your company actually operates.
- **Primary CTA:** contact label (§3)
- **Secondary link:** TR "NoraMedi'yi inceleyin" / EN "See NoraMedi" → `/work/noramedi/`

### capabilities
- **TR headline:** Neler inşa ediyoruz
- **EN headline:** What we build

| Block | TR | EN |
|---|---|---|
| **AI Agents** title | AI ajanları | AI agents |
| sentence | Müşteriye yanıt veren, talepleri ayıklayan, sistemlerinizi güncelleyen ve gerektiğinde işi bir kişiye devreden ajanlar. | Agents that answer customers, qualify requests, update your systems and hand off to a person when it matters. |
| examples | WhatsApp, Instagram ve e-posta üzerinde çalışan mesajlaşma ajanları · Belge okuyup CRM veya ERP kayıtlarını güncelleyen operasyon ajanları · Kendi verinizle çalışan şirket içi asistanlar | Messaging agents on WhatsApp, Instagram and email · Back-office agents that read documents and update CRM or ERP records · Internal assistants grounded in your own data |
| **AI solutions** title | AI çözümleri | AI solutions |
| sentence | Ürününüze veya araçlarınıza eklenen AI özellikleri: belgeleriniz üzerinde arama, sınıflandırma, veri çıkarma ve özetleme. Değerlendirme ve güvenlik sınırlarıyla birlikte. | AI features inside your product or tools: search over your documents, classification, extraction and summarization, with evaluation and guardrails. |
| examples | Kurum içi bilgi üzerinde RAG · Belgelerden veri çıkarma ve sınıflandırma · Mevcut yazılıma eklenen LLM özellikleri | Retrieval (RAG) over internal knowledge · Document extraction and classification · LLM features inside existing software |
| **Automation** title | Otomasyon | Automation |
| sentence | Kopyala yapıştır olmadan işleyen süreçler: tetikleyiciler, entegrasyonlar ve zamanlanmış işler. Yeniden deneme, kayıt ve net sahiplikle. | Processes that run without copy and paste: triggers, integrations and scheduled jobs, with retries, logs and clear ownership. |
| examples | Lead yönlendirme ve takip · Hatırlatmalar, bildirimler, araçlar arası veri senkronizasyonu · Ölçeğe göre n8n veya özel worker'lar | Lead routing and follow-up · Reminders, notifications and data sync between tools · n8n or custom workers, depending on scale |
| **Full-stack** title | Özel yazılım | Custom software |
| sentence | Üretim için tasarlanmış web platformları ve SaaS ürünleri: çok kiracılı mimari, güvenli API'ler, arka plan işleri ve kullanması keyifli arayüzler. | Web platforms and SaaS products built for production: multi-tenant architecture, secure APIs, background workers and interfaces people enjoy using. |
| examples | SaaS platformları · Müşteri ve iş ortağı portalları · Şirket içi araçlar ve paneller | SaaS platforms · Customer and partner portals · Internal tools and dashboards |

(The "·" above only separates examples in this brief; render examples as a list, not a dotted line.)

### approach
- **TR headline:** Nasıl çalışıyoruz · **EN headline:** How we work

| Stage | TR | EN |
|---|---|---|
| Understand / Anlamak | İşin gerçekte nasıl aktığını çıkarıyoruz: kim karar veriyor, veri nerede duruyor, ne aksıyor. | We map how work actually flows: who decides, where data lives, what breaks. |
| Design / Tasarlamak | Sorunu çözen en küçük sistemi ve bir kişinin nerede devrede kalacağını belirliyoruz. | We choose the smallest system that solves the problem, and where a person stays in the loop. |
| Build / Geliştirmek | Kısa döngülerle gerçek bir ortama teslim ediyoruz. Testler, kayıtlar ve erişim kontrolü ilk günden var. | We ship in short iterations to a real environment, with tests, logging and access control from day one. |
| Run / Yürütmek | Yayından sonra izliyor, ölçüyor ve iyileştiriyoruz. Kodun ve verinin sahibi sizsiniz. **[confirm]** | We monitor, measure and improve after launch. You own the code and the data. **[confirm]** |

### product-noramedi
- **Eyebrow:** TR "Ürünümüz" / EN "Our product"
- **TR headline:** NoraMedi: klinikler için işletim platformu
- **TR text:** Diş klinikleri ve klinik grupları için çok kiracılı bir platform. Randevu, tedavi, finans ve hasta mesajlaşması tek yerde; WhatsApp ve Instagram'ı günün her saati yanıtlayan AI ile.
- **EN headline:** NoraMedi: the operating platform for clinics
- **EN text:** A multi-tenant platform for dental clinics and clinic groups. Appointments, treatment, finance and patient messaging in one place, with AI that answers WhatsApp and Instagram at any hour.
- **Link:** read case study label (§3)

### principles
- **TR headline:** Mühendislik ilkelerimiz · **EN headline:** How we engineer

| Principle | TR | EN |
|---|---|---|
| Privacy by design (large cell) | Kişisel veri en aza indirilir. Kayıt saklama zorunluluğu olan yerde silmek yerine anonimleştirilir ve her hassas işlem iz bırakır. KVKK ve GDPR gereklilikleri göz önünde tutularak tasarlanır. | Personal data is minimized. Where records must be kept, it is anonymized instead of deleted, and every sensitive action leaves an audit trail. Designed with GDPR and KVKK requirements in mind. |
| Tenant isolation | Her sorgu, kullanıcının erişebildiği kapsamla sınırlanır; varsayılan değerlerle değil. | Every query is scoped to what the user may access, not to a default value in a token. |
| Reliable automation | Webhook'lar idempotent, işler artan aralıklarla yeniden denenir, hatalar sessiz kalmaz. | Webhooks are idempotent, jobs retry with backoff, and failures are visible, never silent. |
| Human in the loop | Ajanlar net sınırlar içinde çalışır. Belirsiz veya acil bir durumda karar bir kişiye kalır. | Agents act within clear limits. When a case is ambiguous or urgent, a person decides. |

Visual for the large cell: a real architecture diagram (Organization → Clinic → domain records, API and worker split). The agent may draw it as a clean SVG diagram from `docs/` data (diagram, not decoration) or the owner supplies one.

### crm
- **TR:** Salesforce ve CRM platformlarını da tasarlıyor, düzeltiyor ve geliştirdiğimiz AI ve otomasyonlarla birbirine bağlıyoruz. → "CRM ve Salesforce"
- **EN:** We also design and fix Salesforce and CRM platforms, and connect them to the AI and automation we build. → "CRM & Salesforce"

### writing
- **TR headline:** Son yazılar · **EN headline:** Latest writing

### summit
- **TR headline:** Otomatikleştirmeye değer bir süreciniz mi var?
- **TR sentence:** Bugün nasıl işlediğini anlatın. Size net bir sonraki adımla dönelim.
- **EN headline:** Have a process worth automating?
- **EN sentence:** Tell us how it works today. We'll reply with a clear next step.
- **CTA:** contact label

## 5. Inner pages

### Services (lead sentences; agent expands per the service template in site-spec)
- **ai-agents:** EN "AI agents that take real work off your team's plate, inside the tools you already use, with a person in control where it counts." TR "Ekibinizin yükünü gerçekten azaltan, zaten kullandığınız araçların içinde çalışan ve önemli anlarda kontrolü bir kişiye bırakan AI ajanları."
- **ai-solutions:** EN "Practical AI features built into your product or internal tools, measured against real examples before they reach users." TR "Ürününüze veya iç araçlarınıza eklenen, kullanıcıya ulaşmadan önce gerçek örneklerle ölçülen pratik AI özellikleri."
- **automation:** EN "Reliable automations between the systems you already have, with logging, retries and an owner for every flow." TR "Mevcut sistemleriniz arasında güvenilir otomasyonlar. Her akışın kaydı, yeniden deneme mekanizması ve bir sahibi var."
- **full-stack:** EN "Production-grade web platforms and SaaS products, from data model to interface." TR "Veri modelinden arayüze, üretime hazır web platformları ve SaaS ürünleri."
- **crm-salesforce:** Hub page. EN "Salesforce implementations that match how your teams really sell and serve, and cleanups of setups that drifted." TR "Ekiplerinizin gerçekte nasıl satış ve destek yaptığına uyan Salesforce kurulumları ve zamanla dağılmış yapıların toparlanması." This page links to the existing offering pages. Those pages stay. Their copy stays. Only the interface is redesigned to this site. Offerings: Sales Cloud, Service Cloud, Marketing Cloud, Commerce Cloud, Tableau, Einstein AI, MuleSoft integration, Slack. Also reuse the strongest ideas from the old site (adoption, data quality, connected systems, controlled customization).

### FAQ pool (pick 4 to 6 per service, unique wording, no duplicates across a page)
How do you start a project? · How long does a first version take? **[confirm ranges]** · Do you work with our existing systems? · Who owns the code and data? **[confirm]** · How do you handle personal data and GDPR/KVKK? · What happens after launch? · Can our team maintain it? · Do you work with companies outside Turkey? (yes: EU and TR) · Which languages do you work in? (TR, EN, FR, DE **[confirm]**)

### NoraMedi case study (facts you may use)
- Product of PeakNova. Live at noramedi.com.
- Multi-tenant, multi-branch: Organization → Clinic → domain records. Access scope computed from accessible clinics, not from the default clinic in the token.
- Domains: patients, appointments and appointment requests, contact requests, treatment cases and procedures, tooth chart history (FDI), payments and installment plans, inventory with immutable transactions, lab work orders, file attachments (metadata in DB, files in object storage), WhatsApp and Instagram messaging, message templates, post-treatment message queue, audit and activity logs, privacy requests.
- Messaging: provider-independent domain model (Meta WhatsApp Cloud API or Evolution API), conversation state that keeps details a patient gives in one message, idempotent webhook processing, families sharing one phone number handled explicitly (no auto-pick of the first patient).
- AI: classifies incoming intent into appointment requests vs contact requests; never auto-matches ambiguous identities.
- Privacy: export, anonymization instead of hard delete, deletion review workflow, retention jobs that never touch core clinical and financial records, two-level kill switch for cleanup. Role-based data minimization (billing role sees financial summary only).
- Architecture: PostgreSQL + Prisma, API and worker processes separated, plan-based feature limits.
- **Do not** state customer counts, metrics, ministry registration or certifications.

### About
- Name story: "Peak" is the summit a team works toward; "Nova" is a new star. The logo is a mountain with two stars above it.
- Origin: started in CRM and Salesforce consulting (since 2024), now an AI-native engineering studio with its own product. **[confirm wording and year]**
- Where we work: EU and Türkiye. **[confirm]**
- No team size, no team grid unless the owner supplies photos and names.

### Contact page
- **EN header:** "Start a project" / sentence: "Tell us what you want to improve. We read every message and reply within two business days. **[confirm]**"
- **TR header:** "Proje başlatın" / sentence: "Neyi iyileştirmek istediğinizi anlatın. Her mesajı okuyor, iki iş günü içinde dönüyoruz. **[confirm]**"
- Success state EN: "Thanks, your message is on its way. We'll get back to you soon." TR: "Teşekkürler, mesajınız bize ulaştı. En kısa sürede dönüş yapacağız."

## 6. Verified facts vs. must-confirm

| Verified (may be used) | Must confirm before use |
|---|---|
| PeakNova builds AI agents, AI solutions, automation, full-stack software | Reply time on contact page |
| Salesforce/CRM is a secondary expertise | Code and data ownership statement |
| NoraMedi is PeakNova's product, details in §5 | Founding year wording, working languages, regions |
| Site languages: TR, EN, FR, DE | Any client name, logo, testimonial, metric |

## 7. Glossary

| Concept | TR | EN | FR | DE |
|---|---|---|---|---|
| AI agent | AI ajanı | AI agent | agent IA | KI-Agent |
| automation | otomasyon | automation | automatisation | Automatisierung |
| custom software | özel yazılım | custom software | logiciel sur mesure | Individualsoftware |
| multi-tenant | çok kiracılı | multi-tenant | multi-locataire | mandantenfähig |
| human in the loop | insan denetimi | human in the loop | supervision humaine | menschliche Kontrolle |
| case study | vaka çalışması | case study | étude de cas | Fallstudie |
| privacy by design | tasarımdan itibaren gizlilik | privacy by design | protection des données dès la conception | Datenschutz durch Technikgestaltung |
| GDPR | GDPR / KVKK (Türkiye) | GDPR | RGPD | DSGVO |
| legal notice | Yasal bilgiler | Legal notice | Mentions légales | Impressum |
| privacy policy | Gizlilik politikası | Privacy policy | Politique de confidentialité | Datenschutzerklärung |
| clinic group | klinik grubu | clinic group | groupe de cliniques | Klinikgruppe |
