/**
 * Turkish copy for the site header (design H1 "Cam kapsül", approved 2026-10-12).
 * Paths stay on /tr/ and localizeHeader rewrites the prefix. YapiFin stays in the
 * source and is hidden until that product is live.
 */
export type HeaderContent = {
  homeLabel: string;
  navLabel: string;
  localeLabel: string;
  /** Suffix for the chevron buttons: "Çözümler" + " alt menüsü". */
  submenuSuffix: string;
  solutions: {
    navHref: string;
    items: { title: string; text: string; href: string }[];
    footText: string;
    footLink: { label: string; href: string };
  };
  products: {
    navHref: string;
    items: { name: string; status: string; text: string; href: string }[];
    footText: string;
    footLink: { label: string; href: string };
  };
  mobile: {
    openLabel: string;
    closeLabel: string;
    dialogLabel: string;
    quickLabel: string;
    quick: { label: string; href: string }[];
  };
};

export const headerTr: HeaderContent = {
  homeLabel: "PeakNova ana sayfa",
  navLabel: "Ana menü",
  localeLabel: "Dil",
  submenuSuffix: " alt menüsü",
  solutions: {
    navHref: "/tr/solutions/",
    items: [
      { title: "AI ajanları", text: "Yanıt veren, ayıklayan ve gerektiğinde işi bir kişiye devreden ajanlar.", href: "/tr/solutions/ai-agents/" },
      { title: "AI çözümleri", text: "Belgeleriniz üzerinde arama, veri çıkarma ve özetleme.", href: "/tr/solutions/ai-solutions/" },
      { title: "Otomasyon", text: "Kaydı, yeniden denemesi ve sahibi olan akışlar.", href: "/tr/solutions/automation/" },
      { title: "Özel yazılım ve SaaS", text: "Veri modelinden arayüze üretime hazır platformlar.", href: "/tr/solutions/custom-software/" },
      { title: "Salesforce ve CRM", text: "Ekiplerin gerçekten kullandığı kurulum ve toparlama.", href: "/tr/solutions/salesforce-crm/" },
      { title: "Entegrasyon ve veri", text: "Sistemlerinizi tek bir bütün gibi çalıştıran akışlar.", href: "/tr/solutions/integrations/" },
    ],
    footText: "Her çözüm gerçek bir iş sorunuyla başlar.",
    footLink: { label: "Tüm çözümler", href: "/tr/solutions/" },
  },
  products: {
    navHref: "/tr/products/",
    items: [
      { name: "NoraMedi", status: "Yayında", text: "Diş klinikleri ve klinik grupları için işletim platformu.", href: "https://noramedi.com/" },
      { name: "YapiFin", status: "Kendi ürünümüz", text: "İnşaat şirketleri için proje bazlı gelir, gider ve bütçe takibi.", href: "/tr/products/yapifin/" },
    ],
    footText: "Önerdiğimiz mimariyi önce kendi ürünlerimizde çalıştırıyoruz.",
    footLink: { label: "Ürünler", href: "/tr/products/" },
  },
  mobile: {
    openLabel: "Menü",
    closeLabel: "Kapat",
    dialogLabel: "Site menüsü",
    quickLabel: "Kısayollar",
    quick: [
      { label: "AI ajanları", href: "/tr/solutions/ai-agents/" },
      { label: "Otomasyon", href: "/tr/solutions/automation/" },
      { label: "NoraMedi", href: "https://noramedi.com/" },
      { label: "Salesforce", href: "/tr/solutions/salesforce-crm/" },
    ],
  },
};
