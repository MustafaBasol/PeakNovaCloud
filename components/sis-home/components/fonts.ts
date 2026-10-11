import { Instrument_Sans, Newsreader } from "next/font/google";

/**
 * E. Sis typography. Both are variable fonts with latin-ext (Turkish ğ ş ı İ, German, French).
 * Add `${newsreader.variable} ${instrumentSans.variable}` to <html className> in app/[locale]/layout.tsx.
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
