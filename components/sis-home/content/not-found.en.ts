import type { NotFoundContent } from "./not-found.tr";

export const notFoundEn: NotFoundContent = {
  metaTitle: "Page not found | PeakNova",
  titleStart: "Nothing has been built ",
  titleEmphasis: "here",
  titleEnd: " yet.",
  lead: "The link may be old, or the address may have been typed wrong. Let us find what you were looking for.",
  primary: { label: "Back to the home page", href: "/tr/" },
  secondary: { label: "Browse solutions", href: "/tr/solutions/" },
  terminal: {
    pathFallback: "/en/",
    statusLabel: "status:",
    status: "404 not_found",
    hintLabel: "hint:",
    hint: "return home",
  },
  pauseLabel: "pause",
  playLabel: "play",
};
