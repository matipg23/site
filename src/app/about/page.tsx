import type { Metadata } from "next";
import Image from "next/image";
import Contact from "@/components/sections/Contact";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Lead product designer working across product design and design infrastructure at FanDuel, News UK and Nutmeg.",
};

const sidebar = [
  {
    title: "Focus Areas",
    items: ["Product Design", "Design Systems", "DesignOps", "Design Strategy", "Agentic Design", "Generative AI"],
  },
  {
    title: "Skills",
    items: [
      "Design-engineering collaboration",
      "DesignOps & governance",
      "Token architecture & theming",
      "Multi-brand systems",
      "Component library design",
      "Figma Variables & advanced features",
      "Interaction design & prototyping",
      "Workshop facilitation & enablement",
      "Documentation strategy",
      "MCP integrations & AI tooling",
    ],
  },
  { title: "Tools", items: ["Figma", "Cursor", "Claude Code", "Tokens Studio", "ZeroHeight", "GitHub"] },
  { title: "Location", items: ["Reading, United Kingdom", "Remote-first"] },
];

const chapters: { title: string; paragraphs: string[] }[] = [
  {
    title: "My career",
    paragraphs: [
      "Today, I lead the Formation Design System at FanDuel, splitting my time between hands-on design work and system leadership. That means shaping strategy and governance, but also working inside product squads, raising the quality bar through the work I produce, and shipping things that reach real users.",
      "Before that, at News UK, I helped build NewsKit, one of the more recognised multi-brand design systems in UK media. At Nutmeg, I was the dedicated mobile designer through a period of rapid growth, where I designed new investment journeys from concept to launch and laid the foundations for dark mode across iOS and Android.",
    ],
  },
  {
    title: "How I work",
    paragraphs: [
      "My strongest contribution tends to happen at the seams: where design meets engineering, where systems meet product teams, and where strategy needs to become something people can actually build from.",
      "I've designed operating models that changed how teams collaborate with design systems. I've embedded within product squads to close the gap between what a system offers and what teams actually need. And I've helped shape architectural decisions, making sure design had a voice in the room.",
      "That's not a specialism. It's where design systems succeed or fail.",
    ],
  },
  {
    title: "How I lead",
    paragraphs: [
      "I lead by example. The person in front sets the standard, not the rulebook.",
      "That lesson predates my design career. I spent years captaining American football teams, and the principle turned out to be just as relevant in product organisations. I don't micromanage. I give people space, support them when they're stuck, and fight for them when it matters.",
      "I care deeply about design quality, but culture is what sustains it. Through critiques, communities of practice, onboarding, and the small everyday conversations that shape expectations, I try to raise the bar around me.",
      "What I'm most proud of professionally has nothing to do with components. It's the people I've helped along the way.",
    ],
  },
  {
    title: "Thinking forwards",
    paragraphs: [
      "My work is shaped by a forward-looking vision: AI-native design systems as infrastructure.",
      "We're moving beyond component libraries that only serve humans. The next generation of design systems needs to support both people and machines. That means structured metadata that can be consumed programmatically, Model Context Protocol (MCP) infrastructure that allows AI tools to interact directly with design systems, documentation designed for LLM consumption, and prototyping tool integrations that scale without becoming a maintenance burden.",
      "The opportunity isn't just to make designers more efficient. It's to create systems where design intent can move further, faster, and with less degradation as it passes between teams, tools, and increasingly, intelligent agents.",
      "I'm actively exploring how agentic prototyping tools fit into the design workflow, how design systems can become reliable infrastructure for AI-assisted product development, and how design intent scales across large engineering organisations without being diluted.",
      "The design systems that succeed over the next decade won't just organise components. They'll become the connective tissue between people, products, and the tools helping us build them.",
    ],
  },
];

// Figma: latest iterations > About Me (258:4225)
export default function AboutPage() {
  return (
    <>
      <div className="container-page grid gap-64 pb-64 pt-64 md:pt-128 lg:grid-cols-[260px_1fr] lg:gap-96">
        <aside className="flex flex-col gap-32">
          <div>
            <Image
              src="/images/about/portrait.jpg"
              alt="Matias Peinado Greco"
              width={480}
              height={480}
              priority
              className="h-[160px] w-[160px] object-cover"
            />
            <p aria-hidden className="type-display-sm pt-24 text-muted">
              MPG
            </p>
            <ul className="type-body-2xs flex flex-col gap-8 pt-8 uppercase text-secondary">
              <li>Matias Peinado Greco</li>
              <li>Born and raised in South America</li>
              <li>Shaped across the world</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-32 lg:grid-cols-1">
            {sidebar.map((group) => (
              <div key={group.title}>
                <h2 className="type-mono-sm-bold text-primary">{group.title}</h2>
                <ul className="type-body-2xs flex flex-col gap-4 pt-8 text-secondary">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <article className="max-w-[716px]">
          <div className="border-b border-subtle pb-48">
            <h1 className="type-heading-xs text-primary">
              I design products and the systems behind them, from interface details to organisational strategy.
            </h1>
            <div className="type-body-sm flex flex-col gap-24 pt-24 text-primary">
              <p>
                With over six years across FanDuel, News UK, and Nutmeg, I work at the intersection of product design
                and design infrastructure. I&apos;ve come to think the two are the same practice viewed from different
                altitudes.
              </p>
              <p>
                I came to design through computer science rather than the other way around. My path moved through
                creative marketing and art direction before landing in digital products, which means I bring visual
                craft, systems logic, and engineering fluency to the same problem.
              </p>
              <p>
                I grew up across Argentina, Brazil, and the UK. Spanish, Portuguese, English... sometimes all three in
                the same week. That fluency across cultures and languages shapes how I work with distributed teams, how
                I communicate across disciplines, and how I approach collaboration that doesn&apos;t happen in the same
                room.
              </p>
            </div>
          </div>

          {chapters.map((c) => (
            <Reveal as="section" key={c.title} className="border-b border-subtle pb-48 pt-56">
              <h2 className="type-heading-xs text-primary">{c.title}</h2>
              <div className="type-body-sm flex flex-col gap-24 pt-24 text-primary">
                {c.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </article>
      </div>

      <Contact />
    </>
  );
}
