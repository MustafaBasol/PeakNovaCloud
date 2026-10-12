"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { HomeContent } from "../content/home.tr";
import type { HeaderContent } from "../content/header.tr";

const LOCALES = [
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "tr", label: "Türkçe", short: "TR" },
] as const;

type Props = {
  /** Only skipLink, nav, contactLabel and contactHref are read. Same prop as before: drop-in. */
  content: Pick<HomeContent, "skipLink" | "nav" | "menuLabel" | "contactLabel" | "contactHref">;
  homeHref: string;
  locale: string;
  logoSrc?: string;
  /** Mega menus and mobile sheet copy. */
  header: HeaderContent;
};

type MenuKey = "solutions" | "products";

/**
 * Site header, design H1 "Cam kapsül" (approved 2026-10-12).
 *
 * Scope: this component replaces the old header and nothing else. It keeps the old row height
 * (76px desktop, 64px under 768px) and stays in normal flow, so no other element on any page moves.
 * Everything that floats (mega menus, scrolled capsule, mobile sheet) is positioned out of flow.
 *
 * - Desktop: logo, frosted nav pill, dark CTA pill. A white pill springs in behind the hovered item.
 *   "Çözümler" and "Ürünler" are real links (they work without JS) with a chevron button that opens
 *   a glass mega menu. Hover opens after 80ms intent, leaving the header closes after 160ms.
 *   Escape closes and returns focus, focus or a click outside closes. Disclosure pattern, not ARIA menu.
 * - Scrolled: once the header row leaves the viewport a compact glass capsule floats at the top.
 * - Under 900px: "Menü" opens a full-screen sheet (dialog). Without JS it still opens through
 *   :target (href="#pn-site-menu").
 * - No endless loop (it runs on pages without a pause control, WCAG 2.2.2): the CTA ring pulses twice
 *   and again on hover/focus, the capsule bobs once when it appears. Reduced motion removes both.
 */
function LangNav({ locale, label }: { locale: string; label: string }) {
  return (
    <nav className="pn-hdr__lang" aria-label={label}>
      {LOCALES.map((item) => (
        <a
          key={item.code}
          href={`/${item.code}/`}
          hrefLang={item.code}
          lang={item.code}
          aria-label={item.label}
          aria-current={item.code === locale ? "page" : undefined}
        >
          {item.short}
        </a>
      ))}
    </nav>
  );
}

export function SiteHeader({ content, homeHref, locale, logoSrc = "/brand/logo-horizontal.png", header }: Props) {
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [path, setPath] = useState("");
  const rootRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLAnchorElement | null>(null);
  const timer = useRef(0);
  const uid = useId().replace(/:/g, "");

  const megaFor = (href: string): MenuKey | null =>
    href === header.solutions.navHref ? "solutions" : href === header.products.navHref ? "products" : null;
  const megaId = (k: MenuKey) => `pn-mega-${k}-${uid}`;

  const later = (fn: () => void, ms: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(fn, ms);
  };

  const close = useCallback((returnFocus = false) => {
    window.clearTimeout(timer.current);
    setOpen((cur) => {
      if (cur && returnFocus) rootRef.current?.querySelector<HTMLButtonElement>(`[data-mega-btn="${cur}"]`)?.focus();
      return null;
    });
  }, []);

  // Mark JS as present (switches the mobile sheet from :target to state), read the current path.
  useEffect(() => {
    rootRef.current?.setAttribute("data-js", "");
    setPath(window.location.pathname);
  }, []);

  // Scrolled capsule: shown once the in-flow header row is out of view.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(bar);
    return () => io.disconnect();
  }, []);

  // Mega menus: Escape, click outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(true); };
    const onDown = (e: PointerEvent) => { if (!rootRef.current?.contains(e.target as Node)) close(); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, [open, close]);

  // Mobile sheet: focus, Escape, focus trap, scroll lock, auto-close at desktop width.
  useEffect(() => {
    if (!sheet) return;
    const el = sheetRef.current;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    el?.querySelector<HTMLElement>("[data-sheet-first]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSheet(false); menuBtnRef.current?.focus(); return; }
      if (e.key !== "Tab" || !el) return;
      const f = Array.from(el.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const mq = window.matchMedia("(min-width: 900px)");
    const onMq = () => { if (mq.matches) setSheet(false); };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      html.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [sheet]);

  const openSheet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    menuBtnRef.current = e.currentTarget;
    close();
    setSheet(true);
  };
  const closeSheet = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setSheet(false);
    menuBtnRef.current?.focus();
  };

  // Keyboard: the mega menu sits after the nav in the DOM, so Tab is routed into it and back out.
  const megaLinks = (k: MenuKey) => Array.from(rootRef.current?.querySelectorAll<HTMLAnchorElement>(`#${megaId(k)} a`) ?? []);
  const onChevKey = (k: MenuKey, expanded: boolean) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === "Tab" && !e.shiftKey && expanded) || e.key === "ArrowDown") {
      e.preventDefault();
      if (!expanded) setOpen(k);
      requestAnimationFrame(() => megaLinks(k)[0]?.focus());
    }
  };
  const onMegaKey = (k: MenuKey) => (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const links = megaLinks(k);
    const btn = rootRef.current?.querySelector<HTMLButtonElement>(`[data-mega-btn="${k}"]`);
    if (e.shiftKey && document.activeElement === links[0]) { e.preventDefault(); btn?.focus(); }
    else if (!e.shiftKey && document.activeElement === links[links.length - 1]) {
      e.preventDefault();
      const next = btn?.closest("li")?.nextElementSibling?.querySelector<HTMLElement>("a, button");
      close();
      (next ?? rootRef.current?.querySelector<HTMLElement>(".pn-hdr__bar .pn-hdr__cta"))?.focus();
    }
  };

  const isCurrent = (href: string) => (path && path.startsWith(href) ? "page" : undefined);
  const counts: Record<MenuKey, number> = { solutions: header.solutions.items.length, products: header.products.items.length };
  const logo = (cls: string) => (
    <a className={cls} href={homeHref} aria-label={header.homeLabel}>
      {/* Horizontal lockup built from the original logo pieces. 950x200 source. Unchanged. */}
      <img src={logoSrc} alt="PeakNova" width={152} height={32} />
    </a>
  );
  const menuButton = (cls: string) => (
    <a className={cls} href="#pn-site-menu" aria-controls="pn-site-menu" aria-expanded={sheet} aria-haspopup="dialog" onClick={openSheet}>
      <span>{header.mobile.openLabel}</span>
      <span className="pn-hdr__burger" aria-hidden="true"><i /><i /></span>
    </a>
  );

  return (
    <header
      ref={rootRef}
      className="pn-hdr"
      data-open={open ?? undefined}
      onPointerLeave={(e) => { if (e.pointerType === "mouse" && open) later(() => close(), 160); }}
      onPointerEnter={() => window.clearTimeout(timer.current)}
      onBlur={(e) => { if (open && !e.currentTarget.contains(e.relatedTarget as Node | null)) close(); }}
    >
      <a className="pn-skip" href="#main">{content.skipLink}</a>

      <div className="pn-hdr__bar" ref={barRef}>
        {logo("pn-hdr__logo")}
        <nav className="pn-hdr__nav" aria-label={header.navLabel}>
          <ul className="pn-hdr__pill">
            {content.nav.map((item) => {
              const k = megaFor(item.href);
              const expanded = k !== null && open === k;
              return (
                <li
                  key={item.href}
                  className="pn-hdr__item"
                  data-active={expanded || undefined}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    if (k) later(() => setOpen(k), 80);
                    else if (open) later(() => close(), 80);
                  }}
                >
                  <a className="pn-hdr__link" href={item.href} aria-current={isCurrent(item.href)}>{item.label}</a>
                  {k && (
                    <button
                      type="button"
                      className="pn-hdr__chev"
                      data-mega-btn={k}
                      aria-expanded={expanded}
                      aria-controls={megaId(k)}
                      aria-label={`${item.label}${header.submenuSuffix}`}
                      onClick={() => { window.clearTimeout(timer.current); setOpen(expanded ? null : k); }}
                      onKeyDown={onChevKey(k, expanded)}
                    >
                      <i aria-hidden="true" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="pn-hdr__end">
          <LangNav locale={locale} label={header.localeLabel} />
          <a className="pn-hdr__cta" href={content.contactHref}>
            <span className="pn-hdr__dot" aria-hidden="true" />
            {content.contactLabel}
            <span className="pn-hdr__arr" aria-hidden="true">→</span>
          </a>
          {menuButton("pn-hdr__menu")}
        </div>

        <div className="pn-hdr__mega pn-hdr__glass" id={megaId("solutions")} data-show={open === "solutions" || undefined} onKeyDown={onMegaKey("solutions")}>
          <ul className="pn-hdr__tiles">
            {header.solutions.items.map((s) => (
              <li key={s.href}>
                <a className="pn-hdr__tile" href={s.href} aria-current={isCurrent(s.href)}>
                  <b className="pn-serif">{s.title}</b>
                  <span>{s.text}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="pn-hdr__foot">
            <span>{header.solutions.footText}</span>
            <a href={header.solutions.footLink.href}>{header.solutions.footLink.label}<span aria-hidden="true">  →</span></a>
          </div>
        </div>

        {header.products.items.length > 0 && (
          <div className="pn-hdr__mega pn-hdr__mega--narrow pn-hdr__glass" id={megaId("products")} data-show={open === "products" || undefined} onKeyDown={onMegaKey("products")}>
            <ul className="pn-hdr__prods">
              {header.products.items.map((p) => (
                <li key={p.href}>
                  <a className="pn-hdr__prod" href={p.href} aria-current={isCurrent(p.href)}>
                    <small>{p.status}</small>
                    <b className="pn-serif">{p.name}</b>
                    <span>{p.text}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="pn-hdr__foot">
              <span>{header.products.footText}</span>
              <a href={header.products.footLink.href}>{header.products.footLink.label}<span aria-hidden="true">  →</span></a>
            </div>
          </div>
        )}
      </div>

      {/* Scrolled state: out of flow, hidden from AT and focus until shown. */}
      <div className="pn-hdr__capsule pn-hdr__glass" data-show={scrolled || undefined} inert={!scrolled} aria-hidden={!scrolled}>
        {logo("pn-hdr__logo")}
        <LangNav locale={locale} label={header.localeLabel} />
        <nav className="pn-hdr__cnav" aria-label={header.navLabel}>
          {content.nav.map((item) => (
            <a key={item.href} href={item.href} aria-current={isCurrent(item.href)}>{item.label}</a>
          ))}
        </nav>
        <a className="pn-hdr__cta pn-hdr__cta--small" href={content.contactHref}>
          <span className="pn-hdr__dot" aria-hidden="true" />
          {content.contactLabel}
        </a>
        {menuButton("pn-hdr__menu pn-hdr__menu--capsule")}
      </div>

      {/* Mobile sheet. With JS: state + dialog semantics. Without JS: opened by :target. */}
      <div
        ref={sheetRef}
        id="pn-site-menu"
        className="pn-hdr__sheet"
        data-show={sheet || undefined}
        role="dialog"
        aria-modal={sheet || undefined}
        aria-label={header.mobile.dialogLabel}
      >
        <div className="pn-hdr__sheetbar">
          {logo("pn-hdr__logo")}
          <a className="pn-hdr__close" href="#" onClick={closeSheet} data-sheet-first>
            <span>{header.mobile.closeLabel}</span>
            <span className="pn-hdr__x" aria-hidden="true" />
          </a>
        </div>
        <nav className="pn-hdr__big" aria-label={header.navLabel}>
          {content.nav.map((item) => {
            const k = megaFor(item.href);
            return (
              <a key={item.href} className="pn-serif" href={item.href} aria-current={isCurrent(item.href)} onClick={() => setSheet(false)}>
                {item.label}
                {k && <sup aria-hidden="true">{counts[k]}</sup>}
              </a>
            );
          })}
        </nav>
        <ul className="pn-hdr__chips" aria-label={header.mobile.quickLabel}>
          {header.mobile.quick.map((q) => (
            <li key={q.href}><a href={q.href} onClick={() => setSheet(false)}>{q.label}</a></li>
          ))}
        </ul>
        <LangNav locale={locale} label={header.localeLabel} />
        <a className="pn-hdr__sheetcta" href={content.contactHref} onClick={() => setSheet(false)}>
          <span className="pn-hdr__dot" aria-hidden="true" />
          {content.contactLabel}
        </a>
      </div>
    </header>
  );
}
