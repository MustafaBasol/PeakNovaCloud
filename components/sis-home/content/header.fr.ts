import type { HeaderContent } from "./header.tr";

export const headerFr: HeaderContent = {
  homeLabel: "Accueil PeakNova",
  navLabel: "Menu principal",
  localeLabel: "Langue",
  submenuSuffix: " sous-menu",
  solutions: {
    navHref: "/tr/solutions/",
    items: [
      { title: "Agents IA", text: "Des agents qui répondent, trient et passent la main à une personne quand il le faut.", href: "/tr/solutions/ai-agents/" },
      { title: "Solutions IA", text: "Recherche, extraction et résumé sur vos documents.", href: "/tr/solutions/ai-solutions/" },
      { title: "Automatisation", text: "Des flux avec un journal, une nouvelle tentative et un responsable.", href: "/tr/solutions/automation/" },
      { title: "Logiciel sur mesure et SaaS", text: "Des plateformes prêtes pour la production, du modèle de données à l'interface.", href: "/tr/solutions/custom-software/" },
      { title: "Salesforce et CRM", text: "Une mise en place et une remise en ordre que les équipes utilisent vraiment.", href: "/tr/solutions/salesforce-crm/" },
      { title: "Intégration et données", text: "Des flux qui font travailler vos systèmes comme un seul ensemble.", href: "/tr/solutions/integrations/" },
    ],
    footText: "Chaque solution part d'un vrai problème de travail.",
    footLink: { label: "Toutes les solutions", href: "/tr/solutions/" },
  },
  products: {
    navHref: "/tr/products/",
    items: [
      { name: "NoraMedi", status: "En ligne", text: "La plateforme d'exploitation pour les cabinets dentaires et les groupes de cliniques.", href: "https://noramedi.com/" },
      { name: "YapiFin", status: "Notre produit", text: "Suivi des recettes, des dépenses et du budget par projet, pour les entreprises de construction.", href: "/tr/products/yapifin/" },
    ],
    footText: "Nous faisons d'abord tourner l'architecture que nous recommandons sur nos propres produits.",
    footLink: { label: "Produits", href: "/tr/products/" },
  },
  mobile: {
    openLabel: "Menu",
    closeLabel: "Fermer",
    dialogLabel: "Menu du site",
    quickLabel: "Raccourcis",
    quick: [
      { label: "Agents IA", href: "/tr/solutions/ai-agents/" },
      { label: "Automatisation", href: "/tr/solutions/automation/" },
      { label: "NoraMedi", href: "https://noramedi.com/" },
      { label: "Salesforce", href: "/tr/solutions/salesforce-crm/" },
    ],
  },
};
