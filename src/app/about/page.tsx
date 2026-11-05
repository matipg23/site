import type { Metadata } from "next";
import Image from "next/image";
import Contact from "@/components/sections/Contact";
import Chip from "@/components/ui/Chip";
import Reveal from "@/components/ui/Reveal";
import SocialLinks from "@/components/ui/SocialLinks";

export const metadata: Metadata = {
  title: "About",
  description: "Lead product designer working across product design and design infrastructure at FanDuel, News UK and Nutmeg.",
};

const rail = [
  {
    title: "Focus areas",
    items: ["Product Design", "Design Systems", "DesignOps", "Design Strategy", "Agentic Design"],
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
      "Interface design",
      "Interaction design & prototyping",
      "User research & usability testing",
      "Workshop facilitation & enablement",
      "Documentation strategy",
      "MCP integrations & AI tooling",
    ],
  },
  { title: "Tools", items: ["Figma", "Cursor", "Claude Code", "Tokens Studio", "ZeroHeight", "GitHub", "Adobe CC"] },
  { title: "Location", items: ["Reading, United Kingdom", "Remote-first"] },
];

const intro = [
  "With over six years across FanDuel, News UK, and Nutmeg, I work where product design and design infrastructure meet. I’ve come to think the two are the same practice viewed from different altitudes.",
  "I came to design through computer science rather than the other way around. My path moved through creative marketing and art direction before landing in digital products, so I bring visual craft, systems logic, and engineering fluency to the same problem.",
  "I was born in Argentina, raised in Brazil, and now live in the UK. Spanish, Portuguese, English... sometimes all three in the same week. This cultural mix shapes how I work with distributed teams and how I communicate across disciplines.",
];

const chapters: { title: string; paragraphs: string[] }[] = [
  {
    title: "My career",
    paragraphs: [
      "Today I lead the Formation Design System at FanDuel, splitting my time between hands-on design and system leadership. That means shaping strategy and governance, but also working inside product squads, raising the quality bar through the work I produce, and shipping things people actually use.",
      "Before that, at News UK, I helped build NewsKit, one of the more recognised multi-brand design systems in UK media, and designed account, subscription and notification settings that worked across every news brand. At Nutmeg, I was the dedicated mobile designer. I led the research, user testing and prototyping for new user onboarding, took new investment journeys from concept to launch, and laid the foundations for dark mode across iOS and Android.",
      "Before any of that, I spent years in print and agency work, delivering to clients’ taste on tight deadlines. Product design was the first time the work felt like it was solving real problems for someone.",
    ],
  },
  {
    title: "How I work",
    paragraphs: [
      "I do my best work where design meets engineering, and where a system meets the product teams using it. That’s where design systems succeed or fail.",
      "I’ve worked in a central design system team, I’ve been embedded in product squads, and at FanDuel I designed the hybrid model between the two. Central works when the foundations are still moving. Embedding works when adoption is the problem. I pick the model to fit the problem, not the other way round.",
      "From the central side, I’ve also helped shape architectural decisions in partnership with Engineering so design had a say.",
    ],
  },
  {
    title: "How I lead",
    paragraphs: [
      "I lead by example. The person in front sets the standard, not the rulebook.",
      "That lesson predates my design career, and it turned out to be just as true in product organisations. I spent years captaining American football teams. I was first at training and last to pick up the cones, and my old coach still calls me captain.",
      "I’ve managed a team, and I still lead best from inside the work, making things next to the people I’m helping grow. I give people space, support them when they’re stuck, and fight for them when it matters.",
      "I care deeply about design quality, and I try to raise the bar around me through critiques, onboarding, and the small everyday conversations that shape expectations.",
      "What I’m most proud of professionally has nothing to do with components. It’s the people I’ve helped along the way, with career advice, through a hard week, or with an introduction to the right person.",
    ],
  },
  {
    title: "Thinking forwards",
    paragraphs: [
      "My work is being shaped by one idea: AI-native design systems as infrastructure.",
      "That means design systems that serve people and machines. Structured metadata AI tools can read, MCP so they can work with the system directly, and documentation written for LLMs as well as humans. It also means creating prototyping integrations that don’t turn into a maintenance job.",
      // TODO(content): Figma has no full stop after "components" here. Kept as written, confirm with Mati.
      "Design systems that will succeed over the next years won’t just organise components. The goal is design intent that survives the trip between teams, tools and agents, instead of getting a little worse at every handover.",
    ],
  },
];

// Phone-only facts (Figma: About Me - Mobile (Option A) > Facts). The desktop rail covers the same ground.
const facts = [
  ["Based in", "Reading, United Kingdom, remote-first"],
  ["Now", "Formation Design System, FanDuel"],
  ["Languages", "English, Spanish, Portuguese"],
  ["Open to", "Staff-level IC roles"],
];

// Figma: WIP > About Me - Revised (review) (375:89) at lg and up: left rail 260 + body 635, content column 1151.
// Below lg: About Me - Mobile (Option A) (392:421): profile strip, facts, body, then the lists as accordions.
export default function AboutPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-[1215px] px-16 pb-64 md:px-32 lg:pt-64">
        <div className="lg:hidden">
          <div className="flex items-center gap-16 py-24">
            <Image
              src="/images/about/portrait.jpg"
              alt="Matias Peinado Greco"
              width={144}
              height={144}
              priority
              className="h-[72px] w-[72px] shrink-0 object-cover"
            />
            <ul className="type-body-2xs flex flex-col text-secondary">
              <li className="text-primary">MATIAS PEINADO GRECO</li>
              <li>BORN AND RAISED IN SOUTH AMERICA</li>
              <li>SHAPED ACROSS THE WORLD</li>
            </ul>
          </div>
          <dl className="border-y border-subtle">
            {[facts.slice(0, 2), facts.slice(2)].map((row, i) => (
              <div key={i} className={`grid grid-cols-2 gap-16 py-16 ${i > 0 ? "border-t border-subtle" : ""}`}>
                {row.map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-4">
                    <dt className="type-mono-xs-upper text-secondary">{label}</dt>
                    <dd className="type-body-sm text-primary">{value}</dd>
                  </div>
                ))}
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-64 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-96">
          <aside className="hidden lg:block">
            <div className="flex flex-col gap-24 pb-48">
              <Image
                src="/images/about/portrait.jpg"
                alt="Matias Peinado Greco"
                width={480}
                height={480}
                priority
                className="h-[160px] w-[160px] object-cover"
              />
              <div className="flex flex-col gap-[10px]">
                <p aria-hidden className="type-display-sm text-accent">
                  MPG
                </p>
                <ul className="type-body-2xs flex flex-col gap-[6px] text-secondary">
                  <li className="text-primary">MATIAS PEINADO GRECO</li>
                  <li>BORN AND RAISED IN SOUTH AMERICA</li>
                  <li>SHAPED ACROSS THE WORLD</li>
                </ul>
              </div>
              <SocialLinks only={["LinkedIn", "Medium", "Behance"]} />
            </div>

            <div>
              {rail.map((group) => (
                <section key={group.title} className="pb-32">
                  <Chip as="h2">{group.title}</Chip>
                  <ul className="type-body-2xs flex flex-col gap-4 pt-4 text-secondary">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </aside>

          <article className="lg:max-w-[795px] lg:pr-160">
            <div className="pt-40 lg:border-b lg:border-subtle lg:pb-48 lg:pt-0">
              <h1 className="type-heading-xs text-primary max-lg:text-[28px]">
                I design products and the systems behind them, from interface details to organisational strategy.
              </h1>
              <div className="max-lg:pt-8">
                <Paragraphs items={intro} />
              </div>
            </div>

            {chapters.map((c) => (
              <Reveal as="section" key={c.title} className="pt-48 lg:border-b lg:border-subtle lg:pb-48 lg:pt-56">
                <h2 className="type-heading-xs text-primary max-lg:text-[28px]">{c.title}</h2>
                <Paragraphs items={c.paragraphs} />
              </Reveal>
            ))}
          </article>
        </div>

        {/* Phones: the rail lists become accordions, Focus areas open (Location is in the facts above) */}
        <div className="pt-48 lg:hidden">
          <div className="border-t border-subtle">
            {rail
              .filter((g) => g.title !== "Location")
              .map((group, i) => (
                <details key={group.title} open={i === 0} className="group border-b border-subtle">
                  <summary className="flex h-56 cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
                    <span className="type-mono-xs-med-upper text-primary">{group.title}</span>
                    <span aria-hidden className="type-mono-sm-bold text-accent">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">−</span>
                    </span>
                  </summary>
                  <ul className="type-body-sm flex flex-col gap-4 pb-20 text-secondary">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </details>
              ))}
          </div>
        </div>
      </div>

      <Contact />
    </>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="type-body-sm flex flex-col gap-[28px] pt-16 text-primary lg:pt-24">
      {items.map((p) => (
        <p key={p.slice(0, 24)}>{p}</p>
      ))}
    </div>
  );
}
