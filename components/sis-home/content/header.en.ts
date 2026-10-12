import type { HeaderContent } from "./header.tr";

export const headerEn: HeaderContent = {
  homeLabel: "PeakNova home",
  navLabel: "Main menu",
  localeLabel: "Language",
  submenuSuffix: " submenu",
  solutions: {
    navHref: "/tr/solutions/",
    items: [
      { title: "AI agents", text: "Agents that answer, qualify, and hand the work to a person when it matters.", href: "/tr/solutions/ai-agents/" },
      { title: "AI solutions", text: "Search, extraction and summarization over your documents.", href: "/tr/solutions/ai-solutions/" },
      { title: "Automation", text: "Flows with a log, a retry and an owner.", href: "/tr/solutions/automation/" },
      { title: "Custom software and SaaS", text: "Production-ready platforms, from the data model to the interface.", href: "/tr/solutions/custom-software/" },
      { title: "Salesforce and CRM", text: "Setup and cleanup that teams actually use.", href: "/tr/solutions/salesforce-crm/" },
      { title: "Integration and data", text: "Flows that make your systems work as one.", href: "/tr/solutions/integrations/" },
    ],
    footText: "Every solution starts from a real operational problem.",
    footLink: { label: "All solutions", href: "/tr/solutions/" },
  },
  products: {
    navHref: "/tr/products/",
    items: [
      { name: "NoraMedi", status: "Live", text: "The operating platform for dental clinics and clinic groups.", href: "https://noramedi.com/" },
      { name: "YapiFin", status: "Our product", text: "Project-based income, expense and budget tracking for construction companies.", href: "/tr/products/yapifin/" },
    ],
    footText: "We run the architecture we recommend on our own products first.",
    footLink: { label: "Products", href: "/tr/products/" },
  },
  mobile: {
    openLabel: "Menu",
    closeLabel: "Close",
    dialogLabel: "Site menu",
    quickLabel: "Shortcuts",
    quick: [
      { label: "AI agents", href: "/tr/solutions/ai-agents/" },
      { label: "Automation", href: "/tr/solutions/automation/" },
      { label: "NoraMedi", href: "https://noramedi.com/" },
      { label: "Salesforce", href: "/tr/solutions/salesforce-crm/" },
    ],
  },
};
