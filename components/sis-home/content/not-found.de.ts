import type { NotFoundContent } from "./not-found.tr";

export const notFoundDe: NotFoundContent = {
  metaTitle: "Seite nicht gefunden | PeakNova",
  titleStart: "An dieser Adresse haben wir ",
  titleEmphasis: "noch nichts",
  titleEnd: " gebaut.",
  lead: "Der Link kann alt sein, oder die Adresse wurde falsch geschrieben. Wir finden gemeinsam, was Sie gesucht haben.",
  primary: { label: "Zur Startseite", href: "/tr/" },
  secondary: { label: "Lösungen ansehen", href: "/tr/solutions/" },
  terminal: {
    pathFallback: "/de/",
    statusLabel: "status:",
    status: "404 not_found",
    hintLabel: "hinweis:",
    hint: "zur startseite",
  },
  pauseLabel: "Pause",
  playLabel: "Start",
};
