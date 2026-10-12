import { techTr, type TechContent } from "./tech.tr";

export const techDe: TechContent = {
  ...techTr,
  kicker: "Technologie",
  titleStart: "PeakNova ist das Herz. ",
  titleEmphasis: "Der Rest",
  titleEnd: " richtet sich nach dem Problem.",
  lead: "Der Werkzeugkasten hat keine Grenze. Wir wählen für jedes Problem das passende Werkzeug und schreiben ein eigenes, wenn das fertige nicht reicht. Wir nutzen Technologie und wir bauen sie.",
  tickerIdle: "Die Umlaufbahn erneuert sich laufend.",
  tickerIn: " ist in die Umlaufbahn eingetreten, ",
  tickerOut: " wartet auf seinen Einsatz.",
  pauseLabel: "Bewegung anhalten",
  playLabel: "Bewegung starten",
  listLabel: "Beispiele der Technologien, die wir nutzen",
  categories: {
    ai: "Intelligenz",
    flow: "Ablauf und Nachrichten",
    biz: "Geschäftsanwendungen",
    app: "Oberfläche und Mobil",
    api: "Server und API",
    data: "Daten",
    infra: "Infrastruktur und Cloud",
  },
  principles: [
    { title: "Zuerst das Problem", text: "Das Werkzeug wird gewählt, nachdem das Problem verstanden ist. Wir sehen nicht überall Nägel, nur weil wir einen Hammer halten." },
    { title: "Keine Abhängigkeit", text: "Was wir heute nutzen, können wir morgen durch etwas Besseres ersetzen. Die Architektur ist darauf ausgelegt." },
    { title: "Wir nutzen und wir bauen", text: "Wenn ein fertiges Werkzeug nicht reicht, schreiben wir ein eigenes." },
  ],
};
