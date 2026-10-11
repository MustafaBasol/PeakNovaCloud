/**
 * Turkish source copy for the home page, exactly as approved on the design canvas.
 * When wiring next-intl, move these strings to messages/tr.json under the "home" namespace
 * and create en/fr/de translations following docs/content-brief.md. Keep the shape identical.
 */
export type ServiceItem = { id: string; title: string; text: string; examples: string };

export type HomeContent = {
  skipLink: string;
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
    titleStart: string;
    titleEmphasis: string;
    titleEnd: string;
    prevLabel: string;
    nextLabel: string;
    tablistLabel: string;
    /** Screen-reader description of where the stone is; index = step. */
    climbLabels: [string, string, string, string];
    items: [ServiceItem, ServiceItem, ServiceItem, ServiceItem];
  };
  cta: { titleStart: string; titleEmphasis: string; titleEnd: string; lead: string };
};

export const homeTr: HomeContent = {
  skipLink: "İçeriğe geç",
  nav: [
    { label: "Hizmetler", href: "/tr/services/" },
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
    secondaryHref: "/tr/work/noramedi/",
  },
  services: {
    titleStart: "Neler ",
    titleEmphasis: "inşa",
    titleEnd: " ediyoruz",
    prevLabel: "Önceki hizmet",
    nextLabel: "Sonraki hizmet",
    tablistLabel: "Hizmetler",
    climbLabels: ["Taş etekte", "Taş omuzda", "Taş yamaçta", "Taş zirvede, yıldızlar yandı"],
    items: [
      {
        id: "ai-agents",
        title: "AI ajanları",
        text: "Müşteriye yanıt veren, talepleri ayıklayan, sistemlerinizi güncelleyen ve gerektiğinde işi bir kişiye devreden ajanlar.",
        examples: "WhatsApp, Instagram ve e-posta. CRM ve ERP. Kendi verinizle çalışan asistanlar.",
      },
      {
        id: "ai-solutions",
        title: "AI çözümleri",
        text: "Ürününüze eklenen AI özellikleri: belgeleriniz üzerinde arama, sınıflandırma, veri çıkarma ve özetleme.",
        examples: "RAG, belge işleme, mevcut yazılıma eklenen LLM özellikleri.",
      },
      {
        id: "automation",
        title: "Otomasyon",
        text: "Kopyala yapıştır olmadan işleyen süreçler. Yeniden deneme, kayıt ve net sahiplikle.",
        examples: "Lead takibi, hatırlatmalar, araçlar arası senkronizasyon.",
      },
      {
        id: "full-stack",
        title: "Özel yazılım",
        text: "Veri modelinden arayüze, üretime hazır web platformları ve SaaS ürünleri.",
        examples: "SaaS, müşteri portalları, şirket içi araçlar.",
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
