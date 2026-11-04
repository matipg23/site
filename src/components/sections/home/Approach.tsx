import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import Reveal from "@/components/ui/Reveal";

const principles = [
  {
    title: "I’m the first to step in, and stay until it’s done",
    body: "I captained American football teams for years and the habit stuck. I’d rather be in the files with you than drawing arrows in the air from above.",
  },
  {
    title: "I learn by making things",
    body: "I’m curious and restless. I build a rough answer, put it in front of people, and keep going until it’s actually better, not just new. I’m happy to be told when it isn’t.",
  },
  {
    title: "I’ll do the dishes",
    body: "Making things simple is complicated. I take on the complexity so the people using the work don’t have to.",
  },
  {
    title: "I own the miss, and keep my head up",
    body: "When something doesn’t land, I say so and learn what to do differently next time. When the miss is my team’s, I take my part and own that too.",
  },
];

// Figma: Home - Refined > Approach (left: chip, Display/XS title, lead, link. right: four principles)
export default function Approach() {
  return (
    <section id="how-i-work" className="container-page py-section">
      <div className="grid gap-48 lg:grid-cols-[500fr_700fr] lg:gap-80">
        <div className="flex flex-col items-start gap-[28px]">
          <Chip>How I work</Chip>
          <h2 className="type-display-xs text-primary">Systems work is people work in disguise</h2>
          <p className="type-body-md max-w-[440px] text-primary">
            I’ve managed a team, and I still do my best work in the weeds, next to the people I’m building with.
          </p>
          <Button href="/about/" variant="text" arrow="right">
            About Me
          </Button>
        </div>

        <ol>
          {principles.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i}
              className="flex gap-24 border-t border-subtle py-[36px] last:pb-0 md:gap-40"
            >
              <span className="type-caption-md w-[17px] shrink-0 text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-12">
                <h3 className="type-title-lg text-primary">{p.title}</h3>
                <p className="type-body-md text-secondary">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
