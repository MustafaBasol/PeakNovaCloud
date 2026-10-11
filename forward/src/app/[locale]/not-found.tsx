import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("pages");
  return (
    <main id="main" className="mx-auto px-[clamp(16px,4vw,40px)] py-24" style={{ maxWidth: "var(--max-width)" }}>
      <h1 className="text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-semibold tracking-[-0.03em]">
        {t("missing")}
      </h1>
    </main>
  );
}
