"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const links = [
  ["services", "/services"],
  ["work", "/work"],
  ["blog", "/blog"],
  ["about", "/about"],
] as const;

export function MobileNav() {
  const t = useTranslations("nav");
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="h-11 rounded-[var(--radius-pill)] border border-[var(--line-strong)] px-4 text-[0.9375rem]"
        onClick={() => dialog.current?.showModal()}
      >
        {t("menu")}
      </button>
      <dialog ref={dialog} className="menu">
        <div className="flex h-[var(--nav-height)] items-center justify-end px-[clamp(16px,4vw,40px)]">
          <button
            type="button"
            className="h-11 rounded-[var(--radius-pill)] border border-[var(--line-strong)] px-4"
            onClick={() => dialog.current?.close()}
          >
            {t("close")}
          </button>
        </div>
        <nav className="flex flex-col gap-6 px-[clamp(16px,4vw,40px)] pt-8 text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
          {links.map(([key, href]) => (
            <Link
              key={key}
              href={href}
              className="no-underline"
              style={{ color: "var(--text)" }}
              onClick={() => dialog.current?.close()}
            >
              {t(key)}
            </Link>
          ))}
          <Link
            href="/contact"
            className="no-underline"
            style={{ color: "var(--text)" }}
            onClick={() => dialog.current?.close()}
          >
            {t("contact")}
          </Link>
        </nav>
      </dialog>
    </div>
  );
}
