import { techTr, type TechContent } from "./tech.tr";

export const techEn: TechContent = {
  ...techTr,
  kicker: "Technology",
  titleStart: "PeakNova is the heart. ",
  titleEmphasis: "The rest",
  titleEnd: " changes with the problem.",
  lead: "There is no limit to the tool set. We choose the right tool for each problem, and we write our own when a ready-made one is not enough. We use technology and we build it.",
  tickerIdle: "The orbit keeps renewing.",
  tickerIn: " entered the orbit, ",
  tickerOut: " is waiting its turn.",
  pauseLabel: "Pause motion",
  playLabel: "Play motion",
  listLabel: "Examples of technologies we use",
  categories: {
    ai: "Intelligence",
    flow: "Flow and messaging",
    biz: "Business apps",
    app: "Interface and mobile",
    api: "Server and API",
    data: "Data",
    infra: "Infrastructure and cloud",
  },
  principles: [
    { title: "The problem comes first", text: "The tool is chosen after the problem is understood. We do not treat everything as a nail because we are holding a hammer." },
    { title: "No lock-in", text: "What we use today can be replaced by something better tomorrow. We design the architecture for that." },
    { title: "We use it and we build it", text: "When a ready-made tool is not enough, we write our own." },
  ],
};
