import type { NotFoundContent } from "./not-found.tr";

export const notFoundFr: NotFoundContent = {
  metaTitle: "Page introuvable | PeakNova",
  titleStart: "À cette adresse, ",
  titleEmphasis: "rien",
  titleEnd: " n'est encore construit.",
  lead: "Le lien est peut-être ancien, ou l'adresse a été mal saisie. Cherchons ensemble ce que vous vouliez.",
  primary: { label: "Retour à l'accueil", href: "/tr/" },
  secondary: { label: "Voir les solutions", href: "/tr/solutions/" },
  terminal: {
    pathFallback: "/fr/",
    statusLabel: "état\u00a0:",
    status: "404 not_found",
    hintLabel: "piste\u00a0:",
    hint: "retour à l'accueil",
  },
  pauseLabel: "pause",
  playLabel: "lecture",
};
