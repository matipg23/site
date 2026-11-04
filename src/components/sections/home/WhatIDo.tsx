import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

const expertise = [
  {
    title: ["Product", "design"],
    body: "End-to-end product thinking, from interaction design to the component-level craft that shapes how experiences feel. Embedded in product teams, shipping work that reaches real users: interactive journeys, mobile apps, web platforms.",
  },
  {
    title: ["Multi-brand", "systems"],
    body: "Design infrastructure that scales across brands, products, and organisations. Token architectures, theming strategies, component libraries, and the governance that keeps everything coherent as teams and complexity grow.",
  },
  {
    title: ["Engineering", "collaboration"],
    body: "Bridging design intent and engineering reality. Working directly with engineers on architecture decisions, implementation patterns, and system boundaries, ensuring what's designed survives into production without distortion.",
  },
  {
    title: ["Strategy", "& leadership"],
    body: "Operating models, adoption frameworks, and cross-functional alignment. Focused on how teams actually build together: designing not just systems, but the conditions that allow those systems to scale and succeed in practice.",
  },
];

const languages = [
  "EU passport → Spanish/Italian citizen",
  "United Kingdom → English fluent",
  "Brasil → Portuguese native",
  "Argentina → Spanish native",
];

const principles = [
  {
    title: "The system serves the product",
    body: "We weren't just solving system problems. We were supposed to be solving the problems of the people using it.",
  },
  {
    title: "Good systems get pulled into AI workflows",
    body: "A well-structured design system doesn't get forced into AI workflows. It gets pulled in.",
  },
  {
    title: "Smarter models are not the fix",
    body: "A more capable agent with no governed source doesn't get more careful. It produces wrong but confident output faster.",
  },
  {
    title: "Lead from the front",
    body: "The person in front sets the standard, not the rulebook. A lesson from years of captaining American football teams.",
  },
];

// Figma: Home - Revised > Section (surface): WHAT I DO, BACKGROUND, HOW I WORK
export default function WhatIDo() {
  return (
    <section className="border-y border-default bg-surface">
      <div className="container-page flex flex-col gap-64 py-64 md:gap-96 md:py-96">
        <div>
          <SectionLabel>What I do</SectionLabel>
          <h2 className="type-display-sm pt-40 text-primary">Expertise</h2>
          <ol className="grid gap-40 pt-64 sm:grid-cols-2 xl:grid-cols-4 xl:gap-48">
            {expertise.map((e, i) => (
              <Reveal as="li" key={e.title.join(" ")} delay={i}>
                <p className="type-mono-sm-bold text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="type-label-md pt-12 uppercase text-primary">
                  {e.title[0]}
                  <br />
                  {e.title[1]}
                </h3>
                <p className="type-body-sm pt-12 text-secondary">{e.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <div id="career" className="flex flex-col gap-32 border-t border-subtle pt-32 md:flex-row md:gap-16">
          <div className="md:flex-1">
            <h2 className="type-mono-sm-bold uppercase text-accent">Background</h2>
            <p className="type-body-sm pt-16 text-secondary">
              <span className="text-primary">Computer Science → Graphic Design → Art Direction → Product Design.</span>
              <br />
              Remote-first, human always.
              <br />
              The desk can be anywhere, but teamwork still makes the dream work.
            </p>
          </div>
          <div className="md:w-[280px]">
            <h2 className="type-mono-sm-bold uppercase text-accent">Around the world</h2>
            <ul>
              {languages.map((l) => (
                <li key={l} className="type-body-2xs pt-8 uppercase text-secondary">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id="how-i-work">
          <SectionLabel>How I work</SectionLabel>
          <div className="grid gap-40 pt-40 lg:grid-cols-[532fr_692fr] lg:gap-56">
            <div className="flex flex-col">
              <h2 className="type-display-xs text-primary">
                Systems work
                <br /> is people work
                <br /> <span className="text-accent">in disguise</span>
              </h2>
              <p className="type-body-md max-w-[440px] pt-32 text-secondary">
                My strongest contribution tends to happen at the seams: where design meets engineering, where systems
                meet product teams, and where strategy needs to become something people can actually build from.
              </p>
              <div className="pt-32 lg:mt-auto">
                <Button href="/about/" variant="link" arrow="right" className="type-mono-md-bold">
                  About Me
                </Button>
              </div>
            </div>
            <ol>
              {principles.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.title}
                  delay={i}
                  className="flex gap-24 border-b border-default py-24 last:border-b-0"
                >
                  <span className="type-heading-md w-64 shrink-0 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="type-body-sm-medium text-primary">{p.title}</h3>
                    <p className="type-body-sm pt-8 text-secondary">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
