import Reveal from "@/components/ui/Reveal";

const pillars = [
  {
    title: "Systems as infrastructure",
    body: "A design system isn’t a component library. It’s load-bearing infrastructure: tokens, semantics, and governance matter more than pixel pushing.",
    icon: <LayersIcon />,
  },
  {
    title: "AI-native documentation",
    body: "The new player is already in the room. Components carry structured metadata, so the system speaks to both humans and agents.",
    icon: <MetaIcon />,
  },
  {
    title: "Token-first design ops",
    body: "Tokens as the single source of truth across tools, brands, and platforms, with MCP as the routing layer between design intent and engineering output.",
    icon: <FanIcon />,
  },
];

// Figma: Home - Refined > Thesis band. A fixed dark glass panel, the same in Light and Dark:
// data-mode="dark" scopes it to the real Dark tokens (lime accent, green text).
export default function ThinkingForwards() {
  return (
    <section id="thinking-forwards" className="px-16 py-24 md:px-24">
      <div className="rounded-2xl border border-default bg-fog p-8">
        <div
          data-theme="default"
          data-mode="dark"
          className="flex flex-col gap-48 rounded-xl bg-band px-24 pb-56 pt-48 text-primary md:gap-[72px] md:px-56 md:pt-80"
        >
          <div className="flex flex-col gap-[28px]">
            <p className="type-mono-xs-med-upper inline-flex w-fit items-center gap-8 bg-fog px-12 py-[6px]">
              <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-action-accent" />
              Thinking forwards
            </p>
            <div className="flex flex-col gap-40 lg:flex-row lg:justify-between lg:gap-80">
              <h2 className="type-display-md max-w-[700px]">
                Design systems for people <span className="text-accent">and machines</span>
              </h2>
              <p className="type-body-lg max-w-[440px] shrink-0">
                Component libraries that only serve humans are a dead end. The next generation needs structured
                metadata, MCP infrastructure and documentation written for LLMs as much as for people.
              </p>
            </div>
          </div>

          <ol className="grid gap-12 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i} className="flex">
                <div className="w-full rounded-xl border border-glass bg-glass p-[6px] backdrop-blur-[12px]">
                  <div className="flex h-full flex-col gap-32 rounded-lg bg-glass p-[28px] shadow-glass">
                    <div className="flex h-40 items-center justify-between gap-8">
                      <span className="type-mono-xs-med text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span aria-hidden className="text-accent">
                        {p.icon}
                      </span>
                    </div>
                    <div className="flex flex-col gap-12">
                      <h3 className="type-title-md">{p.title}</h3>
                      <p className="type-body-md">{p.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// Pillar illustrations, redrawn from the Figma diagrams
function LayersIcon() {
  return (
    <svg width="72" height="40" viewBox="0 0 72 40" fill="currentColor">
      <rect x="24" y="0" width="48" height="8" rx="4" opacity="0.4" />
      <rect x="12" y="16" width="60" height="8" rx="4" opacity="0.7" />
      <rect x="0" y="32" width="72" height="8" rx="4" />
    </svg>
  );
}

function MetaIcon() {
  return <span className="type-caption-md flex h-40 w-[84px] items-center justify-center rounded-md border border-accent">{"{ meta }"}</span>;
}

function FanIcon() {
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="currentColor" stroke="currentColor" strokeWidth="1" opacity="1">
      <path d="M7 14 65 3M7 14h58M7 14l58 11" fill="none" opacity="0.6" />
      <circle cx="7" cy="14" r="7" stroke="none" />
      <circle cx="65" cy="3" r="3.5" stroke="none" />
      <circle cx="65" cy="14" r="3.5" stroke="none" />
      <circle cx="65" cy="25" r="3.5" stroke="none" />
    </svg>
  );
}
