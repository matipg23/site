import type { CaseStudy } from "./types";

// Order sets the "Next case study" link at the foot of each case study (wraps round).
// Titles are the case hero titles from Figma.
export const cases: CaseStudy[] = [
  { slug: "fd-alignment-program", title: "Design System Alignment Program", meta: "FanDuel · 2024–25 · Systems" },
  { slug: "fd-ai-readiness", title: "The System Becomes Shared AI Infrastructure", meta: "FanDuel · 2026" },
  { slug: "newskit-account", title: "One Account, Three Brands", meta: "News UK · 2021–22 · Product" },
  { slug: "nutmeg", title: "Improving the Mobile Onboarding Journey", meta: "Nutmeg · 2019–20" },
];

// Rows on the case studies index (/work/). Copy is from Figma: Case studies (index).
// No slug means work in progress: listed, but not linked.
export type CaseIndexItem = {
  slug?: string;
  title: string;
  description: string;
  company: string;
  tags: string;
};

export const caseIndex: CaseIndexItem[] = [
  {
    slug: "fd-alignment-program",
    title: "Design System Alignment Program",
    description:
      "Scaling trust, not just components. Three embedded specialists, twenty-plus designers, and one adoption goal.",
    company: "FanDuel / 2024-25",
    tags: "Systems, Leadership",
  },
  {
    slug: "fd-ai-readiness",
    title: "The system becomes shared AI infrastructure",
    description:
      "A proof of concept showing that a governed source helps AI agents build accurately with the design system.",
    company: "FanDuel / 2026",
    tags: "Systems, AI",
  },
  {
    title: "Token-powered colour system",
    description: "The first colour system powered by tokens, giving teams customisable themes and display modes.",
    company: "FanDuel / 2022",
    tags: "Systems",
  },
  {
    slug: "newskit-account",
    title: "One account, multiple brands",
    description: "Settings, subscriptions and notifications designed once, served across every masthead on NewsKit.",
    company: "News UK / 2021-22",
    tags: "Product",
  },
  {
    slug: "nutmeg",
    title: "Mobile onboarding and native investing",
    description: "New investment journeys from concept to launch, and dark mode foundations across iOS and Android.",
    company: "Nutmeg / 2019-20",
    tags: "Product",
  },
];

export function caseHref(slug: string) {
  return `/work/${slug}/`;
}
