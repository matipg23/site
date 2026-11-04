import Arrow from "@/components/ui/Arrow";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

const theses = [
  {
    title: "Systems as infrastructure",
    body: "A design system isn't a component library — it's load-bearing infrastructure. Tokens, semantics, and governance matter more than pixel polish. That's where strategic impact lives.",
  },
  {
    title: "AI-native documentation",
    body: "Documentation structured for LLM consumption is the next evolution of design systems. When components carry structured metadata, the system speaks to both humans and AI agents.",
  },
  {
    title: "Token-first DesignOps",
    body: "Design tokens as the single source of truth — federated across tools, brands, and platforms. MCP as intelligent routing layer between design intent and engineering output.",
  },
];

// Figma: Home - Revised > Section "THINKING FORWARDS"
export default function ThinkingForwards() {
  return (
    <section className="container-page py-64 md:py-96">
      <SectionLabel>Thinking forwards</SectionLabel>
      <div className="grid gap-40 pt-40 lg:grid-cols-[532fr_692fr] lg:gap-56">
        <h2 className="type-display-xs text-primary">
          Design systems
          <br /> for people
          <br /> <span className="text-accent">and machines</span>
        </h2>
        <div>
          <p className="type-body-md text-primary">
            We&apos;re moving beyond component libraries that only serve humans. The next generation needs structured
            metadata, MCP infrastructure that lets AI tools work directly with the system, and documentation designed
            for LLMs as much as for people.
          </p>
          <p className="type-body-md pt-24 text-secondary">
            The opportunity isn&apos;t just making designers more efficient. It&apos;s letting design intent move further
            and faster, with less degradation, as it passes between teams, tools and, increasingly, intelligent agents.
          </p>
        </div>
      </div>

      <ul className="grid gap-24 pt-64 lg:grid-cols-3">
        {theses.map((t, i) => (
          <Reveal as="li" key={t.title} delay={i} className="flex flex-col gap-12 border border-subtle p-24">
            <h3 className="type-mono-lg-bold flex items-center gap-8 uppercase text-primary">
              <Arrow size={24} className="text-accent" />
              {t.title}
            </h3>
            <p className="type-body-md text-secondary">{t.body}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
