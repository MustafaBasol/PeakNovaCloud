import type { HeaderContent } from "./header.tr";

export const headerDe: HeaderContent = {
  homeLabel: "PeakNova Startseite",
  navLabel: "Hauptmenü",
  localeLabel: "Sprache",
  submenuSuffix: "-Untermenü",
  solutions: {
    navHref: "/tr/solutions/",
    items: [
      { title: "KI-Agenten", text: "Agenten, die antworten, qualifizieren und die Aufgabe einer Person übergeben, wenn es darauf ankommt.", href: "/tr/solutions/ai-agents/" },
      { title: "KI-Lösungen", text: "Suche, Extraktion und Zusammenfassung über Ihre Dokumente.", href: "/tr/solutions/ai-solutions/" },
      { title: "Automatisierung", text: "Abläufe mit Protokoll, Wiederholung und einer verantwortlichen Person.", href: "/tr/solutions/automation/" },
      { title: "Individualsoftware und SaaS", text: "Betriebsbereite Plattformen, vom Datenmodell bis zur Oberfläche.", href: "/tr/solutions/custom-software/" },
      { title: "Salesforce und CRM", text: "Einrichtung und Bereinigung, die Teams wirklich nutzen.", href: "/tr/solutions/salesforce-crm/" },
      { title: "Integration und Daten", text: "Flüsse, die Ihre Systeme als ein Ganzes arbeiten lassen.", href: "/tr/solutions/integrations/" },
    ],
    footText: "Jede Lösung beginnt mit einem echten Arbeitsproblem.",
    footLink: { label: "Alle Lösungen", href: "/tr/solutions/" },
  },
  products: {
    navHref: "/tr/products/",
    items: [
      { name: "NoraMedi", status: "Live", text: "Die Betriebsplattform für Zahnkliniken und Klinikgruppen.", href: "https://noramedi.com/" },
      { name: "YapiFin", status: "Unser Produkt", text: "Projektbezogene Erfassung von Einnahmen, Ausgaben und Budget für Bauunternehmen.", href: "/tr/products/yapifin/" },
    ],
    footText: "Die Architektur, die wir empfehlen, betreiben wir zuerst auf unseren eigenen Produkten.",
    footLink: { label: "Produkte", href: "/tr/products/" },
  },
  mobile: {
    openLabel: "Menü",
    closeLabel: "Schließen",
    dialogLabel: "Seitenmenü",
    quickLabel: "Kurzbefehle",
    quick: [
      { label: "KI-Agenten", href: "/tr/solutions/ai-agents/" },
      { label: "Automatisierung", href: "/tr/solutions/automation/" },
      { label: "NoraMedi", href: "https://noramedi.com/" },
      { label: "Salesforce", href: "/tr/solutions/salesforce-crm/" },
    ],
  },
};
