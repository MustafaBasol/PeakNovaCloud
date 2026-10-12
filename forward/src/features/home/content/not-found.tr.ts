export type NotFoundContent = {
  metaTitle: string;
  titleStart: string;
  titleEmphasis: string;
  titleEnd: string;
  lead: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  terminal: {
    pathFallback: string;
    statusLabel: string;
    status: string;
    hintLabel: string;
    hint: string;
  };
  pauseLabel: string;
  playLabel: string;
};

export const notFoundTr: NotFoundContent = {
  metaTitle: "Sayfa bulunamadı | PeakNova",
  titleStart: "Bu adreste ",
  titleEmphasis: "henüz",
  titleEnd: " bir şey inşa etmedik.",
  lead: "Bağlantı eski olabilir ya da adres yanlış yazılmış olabilir. Aradığınızı birlikte bulalım.",
  primary: { label: "Ana sayfaya dönün", href: "/tr/" },
  secondary: { label: "Çözümlere göz atın", href: "/tr/solutions/" },
  terminal: {
    pathFallback: "/tr/",
    statusLabel: "durum:",
    status: "404 not_found",
    hintLabel: "öneri:",
    hint: "ana sayfaya dön",
  },
  pauseLabel: "durdur",
  playLabel: "başlat",
};
