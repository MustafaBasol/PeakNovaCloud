import { Fragment_Mono, Instrument_Sans, Newsreader } from "next/font/google";

/**
 * E. Sis typography. Both are variable fonts with latin-ext (Turkish ğ ş ı İ, German, French).
 * Add `${newsreader.variable} ${instrumentSans.variable} ${fragmentMono.variable}` to <html className> in app/[locale]/layout.tsx.
 * next/font self-hosts the files at build time, so this works with `output: "export"`.
 */
export const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--pn-font-serif",
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--pn-font-sans",
});

/**
 * Fragment Mono: ONLY for the ASCII/binary art and small code-style labels (style guide 3.3).
 * Never for sentences. Not a variable font, so the weight is fixed.
 */
export const fragmentMono = Fragment_Mono({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  variable: "--pn-font-mono",
});
