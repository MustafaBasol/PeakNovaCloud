import { techTr, type TechContent } from "./tech.tr";

export const techFr: TechContent = {
  ...techTr,
  kicker: "Technologie",
  titleStart: "PeakNova est le cœur. ",
  titleEmphasis: "Le reste",
  titleEnd: " change selon le problème.",
  lead: "L'ensemble d'outils n'a pas de limite. Nous choisissons le bon outil pour chaque problème, et nous écrivons le nôtre quand l'existant ne suffit pas. Nous utilisons la technologie et nous la produisons.",
  tickerIdle: "L'orbite se renouvelle en continu.",
  tickerIn: " est entré en orbite, ",
  tickerOut: " attend son tour.",
  pauseLabel: "Arrêter le mouvement",
  playLabel: "Lancer le mouvement",
  listLabel: "Exemples de technologies que nous utilisons",
  categories: {
    ai: "Intelligence",
    flow: "Flux et messagerie",
    biz: "Applications métier",
    app: "Interface et mobile",
    api: "Serveur et API",
    data: "Données",
    infra: "Infrastructure et cloud",
  },
  principles: [
    { title: "Le problème d'abord", text: "L'outil se choisit une fois le problème compris. Nous ne voyons pas des clous partout parce que nous tenons un marteau." },
    { title: "Aucune dépendance", text: "Ce que nous utilisons aujourd'hui peut être remplacé demain par mieux. L'architecture est faite pour cela." },
    { title: "Nous utilisons et nous produisons", text: "Quand l'outil existant ne suffit pas, nous écrivons le nôtre." },
  ],
};
