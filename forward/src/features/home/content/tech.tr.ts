/**
 * Turkish copy for "Teknoloji" (design U1 "Kalp ve yenilenen yörüngeler", approved 2026-10-13).
 * Message: PeakNova is the constant; tools are chosen per problem and keep changing.
 * Never write "we build everything on the same stack". Same shape for en/fr/de.
 */
export type TechContent = {
  kicker: string;
  titleStart: string;
  titleEmphasis: string;
  titleEnd: string;
  lead: string;
  /** Ticker under the orbit: "<in> yörüngeye girdi, <out> sırasını bekliyor." */
  tickerIdle: string;
  tickerIn: string;
  tickerOut: string;
  pauseLabel: string;
  playLabel: string;
  /** Accessible name of the full (visually hidden) list of tools. */
  listLabel: string;
  categories: Record<"ai" | "flow" | "biz" | "app" | "api" | "data" | "infra", string>;
  principles: { title: string; text: string }[];
  /**
   * Tool ids from data/techLogos.ts. The first 27 start in the orbit (5 + 9 + 13), the rest wait
   * and rotate in. OWNER: list only tools the team has really used or can deliver (AGENTS.md section 1).
   */
  pool: string[];
};

export const techTr: TechContent = {
  kicker: "Teknoloji",
  titleStart: "PeakNova kalp. ",
  titleEmphasis: "Gerisi",
  titleEnd: " probleme göre değişir.",
  lead: "Araç setimizin bir sınırı yok. Her problemde en doğru aracı seçiyor, hazırı yetmediğinde kendimiz yazıyoruz. Teknolojinin hem kullanıcısı hem üreticisiyiz.",
  tickerIdle: "Yörünge sürekli yenilenir.",
  tickerIn: " yörüngeye girdi, ",
  tickerOut: " sırasını bekliyor.",
  pauseLabel: "Hareketi durdur",
  playLabel: "Hareketi başlat",
  listLabel: "Kullandığımız teknolojilerden örnekler",
  categories: {
    ai: "Zeka",
    flow: "Akış ve mesajlaşma",
    biz: "İş uygulamaları",
    app: "Arayüz ve mobil",
    api: "Sunucu ve API",
    data: "Veri",
    infra: "Altyapı ve bulut",
  },
  principles: [
    { title: "Problem önce gelir", text: "Araç, sorunu anladıktan sonra seçilir. Elimizdeki çekiç yüzünden her şeyi çivi sanmayız." },
    { title: "Bağımlılık yok", text: "Bugün kullandığımızı yarın daha iyisiyle değiştirebiliriz. Mimariyi buna göre kurarız." },
    { title: "Kullanır ve üretiriz", text: "Hazırı yetmediğinde kendi aracımızı yazarız." },
  ],
  pool: [
    // inner ring (5)
    "anthropic", "nextdotjs", "postgresql", "n8n", "python",
    // middle ring (9)
    "openai", "nodedotjs", "docker", "salesforce", "react", "prisma", "langchain", "typescript", "whatsapp",
    // outer ring (13)
    "kubernetes", "googlegemini", "redis", "hubspot", "fastapi", "supabase", "tailwindcss", "cloudflare", "make", "graphql", "mistralai", "vercel", "go",
    // waiting (rotate in)
    "claude", "huggingface", "ollama", "meta", "pytorch", "zapier", "rabbitmq", "apachekafka", "stripe", "figma",
    "svelte", "vuedotjs", "flutter", "swift", "kotlin", "nestjs", "mongodb", "elasticsearch", "googlecloud", "terraform",
    "githubactions", "aws", "azure",
  ],
};
