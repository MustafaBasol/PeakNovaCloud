import { Link } from "@/i18n/navigation";
import { offeringSlugs, serviceSlugs } from "@/i18n/routing";

export function PageFrame({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children?: React.ReactNode;
}) {
  return (
    <main
      id="main"
      className="mx-auto w-full px-[clamp(16px,4vw,40px)] py-24"
      style={{ maxWidth: "var(--max-width)" }}
    >
      <h1 className="max-w-[18ch] text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
        {title}
      </h1>
      <p className="mt-6 max-w-[64ch] text-[var(--text-muted)]">{note}</p>
      {children ? <div className="mt-12">{children}</div> : null}
    </main>
  );
}

export function LinkList({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="block rounded-[var(--radius-container)] border border-[var(--line)] bg-[var(--surface)] px-6 py-5 no-underline hover:bg-[var(--surface-2)]"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function serviceLinks(
  t: (key: string) => string,
): { href: string; label: string }[] {
  return [
    ...serviceSlugs.map((slug) => ({
      href: `/services/${slug}`,
      label: t(slug),
    })),
    {
      href: "/services/crm-salesforce",
      label: t("crm-salesforce"),
    },
  ];
}

export function offeringLinks(
  t: (key: string) => string,
): { href: string; label: string }[] {
  return offeringSlugs.map((slug) => ({
    href: `/services/crm-salesforce/${slug}`,
    label: t(slug),
  }));
}
