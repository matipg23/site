import type { CaseStudy } from "./types";

// Order sets the "Next case study" link at the foot of each case study (wraps round).
// Titles are the case hero titles from Figma.
export const cases: CaseStudy[] = [
  { slug: "fd-alignment-program", title: "Design System Alignment Program", meta: "FanDuel · 2024–25 · Systems" },
  { slug: "fd-ai-readiness", title: "The System Becomes Shared AI Infrastructure", meta: "FanDuel · 2026" },
  { slug: "newskit-account", title: "One Account, Three Brands", meta: "News UK · 2021–22 · Product" },
  { slug: "nutmeg", title: "Improving the Mobile Onboarding Journey", meta: "Nutmeg · 2019–20" },
];

export function caseHref(slug: string) {
  return `/work/${slug}/`;
}
