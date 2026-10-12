/**
 * Turkish source copy for the home page, exactly as approved on the design canvas.
 * When wiring next-intl, move these strings to messages/tr.json under the "home" namespace
 * and create en/fr/de translations following docs/content-brief.md. Keep the shape identical.
 */
export type ServiceItem = {
  id: string;
  /** Short code-style label, shown in Fragment Mono. Lowercase ASCII, dots allowed. */
  code: string;
  title: string;
  /** The pain in the client's words, one sentence. */
  problem: string;
  solution: string;
  /** Exactly 3. */
  deliverables: [string, string, string];
  /** Building blocks, shown as mono tokens. */
  blocks: string[];
  proof?: string;
  href: string;
};

export type HomeContent = {
  metaTitle: string;
  skipLink: string;
  navLabel: string;
  localeLabel: string;
  nav: { label: string; href: string }[];
  menuLabel: string;
  contactLabel: string;
  contactHref: string;
  hero: {
    titleStart: string;
    titleEmphasis: string;
    lead: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  services: {
    kicker: string;
    titleStart: string;
    titleEmphasis: string;
    titleEnd: string;
    lead: string;
    tablistLabel: string;
    artCaption: string;
    pauseLabel: string;
    playLabel: string;
    /** Wrapped around the problem sentence. French uses guillemets. */
    quoteOpen: string;
    quoteClose: string;
    /** Placed around the area title to form the panel link. */
    linkBefore: string;
    linkAfter: string;
    /** Accessible name of the building-blocks list. */
    blocksLabel: string;
    /** 3 to 6 areas (decision O2). */
    items: ServiceItem[];
  };
  /** Glass panel in the hero: a looping sample conversation. Always labelled as a sample scenario. */
  agentDemo: {
    ariaLabel: string;
    title: string;
    scenarioTag: string;
    channels: [string, string, string];
    incomingMeta: string;
    incoming: string;
    steps: [string, string];
    replyMeta: string;
    reply: string;
    handoff: string;
    handoffAction: string;
    pauseLabel: string;
    playLabel: string;
  };
  process: {
    titleStart: string;
    titleEmphasis: string;
    lead: string;
    figureLabel: string;
    /** Exactly 6 verb-led steps (style guide P4). No numbers. altitude is the stone's place on the ridge. */
    steps: { verb: string; text: string; altitude: string }[];
  };
  products: {
    titleStart: string;
    titleEmphasis: string;
    lead: string;
    items: {
      id: "noramedi" | "yapifin";
      name: string;
      text: string;
      tags: string[];
      href: string;
      linkLabel: string;
    }[];
  };
  cta: { titleStart: string; titleEmphasis: string; titleEnd: string; lead: string };
};

export const homeTr: HomeContent = {
  metaTitle: "PeakNova | AI Ajanları, Otomasyon ve Özel Yazılım",
  skipLink: "İçeriğe geç",
  navLabel: "Ana menü",
  localeLabel: "Dil",
  // Information architecture from the senior review brief (2026-10-11), section 5.
  nav: [
    { label: "Çözümler", href: "/tr/solutions/" },
    { label: "Ürünler", href: "/tr/products/" },
    { label: "Çalışmalar", href: "/tr/work/" },
    { label: "Blog", href: "/tr/blog/" },
    { label: "Hakkımızda", href: "/tr/about/" },
  ],
  menuLabel: "Menü",
  contactLabel: "Proje başlatın",
  contactHref: "/tr/contact/",
  hero: {
    titleStart: "Gerçek iş yapan ",
    titleEmphasis: "AI ajanları.",
    lead: "Şirketinizin gerçekte nasıl çalıştığına uyan AI ajanları, otomasyonlar ve özel yazılımlar tasarlıyor ve geliştiriyoruz.",
    secondaryLabel: "NoraMedi'yi inceleyin",
    secondaryHref: "/tr/products/noramedi/",
  },
  services: {
    kicker: "/ hizmetler",
    titleStart: "Neler ",
    titleEmphasis: "inşa",
    titleEnd: " ediyoruz",
    lead: "Altı alanda, fikirden üretime kadar uçtan uca inşa ediyoruz. Her biri gerçek bir iş sorunuyla başlar.",
    tablistLabel: "Hizmet alanları",
    artCaption: "peaknova.mountain / ascii",
    pauseLabel: "durdur",
    playLabel: "başlat",
    quoteOpen: "“",
    quoteClose: "”",
    linkBefore: "",
    linkAfter: " çözümünü inceleyin",
    blocksLabel: "Yapı taşları",
    items: [
      {
        id: "ai-agents",
        code: "ai.agents",
        title: "AI ajanları",
        problem: "Ekip gününün yarısını aynı soruları yanıtlamaya ve kayıt girmeye harcıyor.",
        solution: "Müşteriye yanıt veren, talepleri ayıklayan, sistemlerinizi güncelleyen ve gerektiğinde işi bir kişiye devreden ajanlar.",
        deliverables: [
          "WhatsApp, Instagram ve e-posta ajanları",
          "Belge okuyup CRM veya ERP kaydını güncelleyen operasyon ajanları",
          "Kendi verinizle çalışan iç asistanlar",
        ],
        blocks: ["llm api", "araç çağırma", "insan onayı", "kayıt ve izleme"],
        proof: "NoraMedi'de çalışıyor",
        href: "/tr/solutions/ai-agents/",
      },
      {
        id: "ai-solutions",
        code: "ai.features",
        title: "AI çözümleri",
        problem: "Bilgi belgelerin içinde kaybolmuş, doğru cevabı bulmak dakikalar alıyor.",
        solution: "Ürününüze veya iç araçlarınıza eklenen, gerçek örneklerle ölçülen AI özellikleri.",
        deliverables: [
          "Kurum içi bilgi üzerinde arama (RAG)",
          "Belgelerden veri çıkarma ve sınıflandırma",
          "Mevcut yazılıma eklenen LLM özellikleri",
        ],
        blocks: ["vektör arama", "değerlendirme setleri", "güvenlik sınırları"],
        href: "/tr/solutions/ai-solutions/",
      },
      {
        id: "automation",
        code: "automation",
        title: "Otomasyon",
        problem: "Aynı veri üç ayrı araca elle giriliyor ve bir adım unutulunca süreç duruyor.",
        solution: "Kopyala yapıştır olmadan işleyen süreçler. Her akışın kaydı, yeniden denemesi ve bir sahibi var.",
        deliverables: [
          "Lead yönlendirme ve takip",
          "Hatırlatma, bildirim ve araçlar arası senkronizasyon",
          "Zamanlanmış işler",
        ],
        blocks: ["n8n / worker", "kuyruk", "yeniden deneme", "kayıt"],
        href: "/tr/solutions/automation/",
      },
      {
        id: "custom-software",
        code: "software.saas",
        title: "Özel yazılım ve SaaS",
        problem: "Hazır yazılım işin yarısını karşılıyor, diğer yarısı tablolarda yürüyor.",
        solution: "Veri modelinden arayüze, üretime hazır web platformları ve SaaS ürünleri.",
        deliverables: [
          "Çok kiracılı SaaS platformları",
          "Müşteri ve iş ortağı portalları",
          "İç araçlar ve paneller",
        ],
        blocks: ["next.js", "node.js", "postgresql", "prisma", "arka plan işleri"],
        proof: "NoraMedi ve YapiFin",
        href: "/tr/solutions/custom-software/",
      },
      {
        id: "salesforce-crm",
        code: "crm.salesforce",
        title: "Salesforce ve CRM",
        problem: "CRM kuruldu ama ekip kullanmıyor, veri dağınık ve raporlara güvenilmiyor.",
        solution: "Ekiplerinizin gerçekte nasıl satış ve destek yaptığına uyan kurulumlar ve zamanla dağılmış yapıların toparlanması.",
        deliverables: [
          "Satış ve servis süreçlerine uyan kurulum",
          "Veri temizliği ve göç",
          "Flow otomasyonu ve AI ile bağlantı",
        ],
        blocks: ["sales cloud", "service cloud", "marketing cloud", "flow", "mulesoft"],
        href: "/tr/solutions/salesforce-crm/",
      },
      {
        id: "integrations",
        code: "integration.data",
        title: "Entegrasyon ve veri",
        problem: "Sistemler birbirini görmüyor, raporlar elle birleştiriliyor.",
        solution: "Uygulamalarınızı API'ler ve güvenilir veri akışlarıyla tek bir bütün gibi çalıştırıyoruz.",
        deliverables: [
          "API ve webhook entegrasyonları",
          "ERP, muhasebe ve CRM arası veri akışı",
          "Raporlama için temiz veri katmanı",
        ],
        blocks: ["rest / graphql", "webhook", "etl", "idempotent işleme"],
        href: "/tr/solutions/integrations/",
      },
    ],
  },
  agentDemo: {
    ariaLabel: "Örnek senaryo: bir AI ajanı WhatsApp'tan gelen randevu talebini karşılıyor ve son kararı kliniğe bırakıyor",
    title: "Klinik asistanı",
    scenarioTag: "Örnek senaryo",
    channels: ["WhatsApp", "Instagram", "E-posta"],
    incomingMeta: "Hasta · WhatsApp",
    incoming: "Merhaba, yarın öğleden sonra dolgu için yeriniz var mı?",
    steps: ["Niyet: randevu talebi", "Takvim kontrol edildi, iki uygun saat"],
    replyMeta: "Ajan",
    reply: "Yarın 14.30 ve 16.00 uygun. Hangisini ayırayım?",
    handoff: "Seçilen saat kliniğin onayına düşer",
    handoffAction: "Kişiye devir",
    pauseLabel: "Hareketi durdur",
    playLabel: "Hareketi başlat",
  },
  process: {
    titleStart: "Nasıl ",
    titleEmphasis: "çalışıyoruz",
    lead: "Her proje, logomuzdaki dağ gibi önce ölçülür, sonra çizilir, sonra inşa edilir.",
    figureLabel: "PeakNova dağı yardımcı çizgilerden başlayarak çiziliyor",
    steps: [
      { verb: "Keşfediyoruz", altitude: "Taş etekte", text: "İşin gerçekte nasıl aktığını, kimin karar verdiğini ve verinin nerede durduğunu çıkarıyoruz." },
      { verb: "Tasarlıyoruz", altitude: "Taş yamaçta", text: "Sorunu çözen en küçük mimariyi ve bir kişinin nerede devrede kalacağını belirliyoruz." },
      { verb: "Geliştiriyoruz", altitude: "Taş sırtta", text: "Kısa döngülerle, erişim kontrolü ve kayıtla birlikte gerçek bir ortama teslim ediyoruz." },
      { verb: "Test ediyoruz", altitude: "Taş omuzda", text: "Gerçek örneklerle ve otomatik testlerle, yayından önce ölçüyoruz." },
      { verb: "Devreye alıyoruz", altitude: "Taş boğazda", text: "Geri dönüş planıyla, kontrollü ve izlenebilir şekilde yayına çıkıyoruz." },
      { verb: "İyileştiriyoruz", altitude: "Taş zirvede", text: "Yayından sonra izliyor, ölçüyor ve sistemi birlikte geliştiriyoruz." },
    ],
  },
  products: {
    titleStart: "Kendi ",
    titleEmphasis: "ürünlerimiz",
    lead: "Müşterilerimize önerdiğimiz mimariyi önce kendi platformlarımızda çalıştırıyoruz.",
    items: [
      {
        id: "noramedi",
        name: "NoraMedi",
        text: "Diş klinikleri ve klinik grupları için işletim platformu. Hasta, randevu, tedavi ve finans tek yerde.",
        tags: ["Kendi ürünümüz", "Yayında"],
        href: "https://noramedi.com/",
        linkLabel: "Ürünü inceleyin",
      },
      {
        id: "yapifin",
        name: "YapiFin",
        text: "İnşaat şirketleri için proje bazlı gelir, gider ve bütçe takibi.",
        // Release status is pending owner confirmation (AGENTS.md O4). Add "Yayında" only when confirmed.
        tags: ["Kendi ürünümüz"],
        href: "/tr/products/yapifin/",
        linkLabel: "Ürünü inceleyin",
      },
    ],
  },
  cta: {
    titleStart: "Otomatikleştirmeye değer bir ",
    titleEmphasis: "süreciniz",
    titleEnd: " mi var?",
    lead: "Bugün nasıl işlediğini anlatın. Size net bir sonraki adımla dönelim.",
  },
};
