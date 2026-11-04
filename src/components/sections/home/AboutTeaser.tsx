import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

// Figma: Home - Revised > Section "ABOUT ME"
export default function AboutTeaser() {
  return (
    <section className="container-page py-64 md:py-96">
      <SectionLabel>About me</SectionLabel>
      <div className="grid gap-40 pt-40 lg:grid-cols-[548fr_600fr] lg:gap-56">
        <div className="flex flex-col">
          <p aria-hidden className="type-display-xl select-none text-muted">
            MPG
          </p>
          <ul className="type-mono-xs flex flex-col gap-8 pt-32 uppercase text-secondary">
            <li>Matias Peinado Greco</li>
            <li>Born and raised in South America</li>
            <li>Shaped across the world</li>
          </ul>
          <div className="pt-32 lg:mt-auto">
            <Button href="/about/" variant="link" arrow="right" className="type-mono-xs-bold uppercase">
              Get to know me better
            </Button>
          </div>
        </div>
        <div>
          <p className="type-body-sm pb-24 text-primary">
            Over six years across FanDuel, News UK, and Nutmeg, working across product design and design infrastructure.
            I treat both as a single practice operating at different altitudes: one focused on product outcomes, the
            other on the systems that make those outcomes repeatable.
          </p>
          <p className="type-body-sm border-t border-default py-24 text-primary">
            My work sits between craft and strategy, close enough to shape the details, and far enough out to decide
            which ones matter and why.
          </p>
          <p className="type-body-sm border-t border-default pt-24 text-primary">
            I&apos;m also exploring how design systems evolve when they become legible to both humans and machines,
            enabling design intent to scale more reliably across teams, tools, and increasingly AI-driven workflows.
          </p>
        </div>
      </div>
    </section>
  );
}
