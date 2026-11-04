import Button from "@/components/ui/Button";
import SocialLinks from "@/components/ui/SocialLinks";

// Figma: Home - Refined > Hero (eyebrow, H1 Display/LG, lead + "Now" card, CTAs + social icons)
export default function Hero() {
  return (
    <section className="border-b border-default">
      <div className="container-page flex flex-col gap-40 py-section md:gap-56">
        <p className="type-mono-lg text-secondary">Staff-level Product Designer · Design Systems</p>

        <h1 className="type-display-lg text-primary">
          I design products
          <br /> and the <span className="text-accent">systems</span>
          <br /> behind them
        </h1>

        <div className="flex flex-col gap-40 lg:flex-row lg:items-end lg:justify-between lg:gap-80 lg:pb-40">
          <div className="type-body-lg flex max-w-[693px] flex-col gap-paragraph text-primary lg:gap-[36px]">
            <p>
              I help product organisations ship consistent, scalable, multi-brand experiences faster, without losing
              quality or autonomy, by building the systems and working models teams actually adopt.
            </p>
            <p>Now making those systems readable by AI agents as well as people.</p>
          </div>

          <NowCard />
        </div>

        <div className="flex flex-col gap-32 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-32">
            <Button href="/#work" variant="cta">
              See selected work
            </Button>
            <Button href="/#how-i-work" variant="text" arrow="down">
              How I work
            </Button>
          </div>
          <SocialLinks only={["LinkedIn", "Medium"]} />
        </div>
      </div>
    </section>
  );
}

// Figma: "Now card": a glass shell around a raised core
function NowCard() {
  return (
    <aside
      aria-label="Current role"
      className="w-full shrink-0 rounded-xl border border-default bg-overlay-transparent p-[6px] sm:max-w-[314px]"
    >
      <div className="flex flex-col gap-20 rounded-lg bg-page p-24 shadow-2">
        <div className="flex items-center justify-between gap-8">
          <p className="type-mono-xs-med-upper inline-flex items-center gap-8 bg-overlay px-12 py-[6px] text-primary">
            <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-online" />
            Now
          </p>
          <p className="type-mono-xs-upper text-secondary">FanDuel · Remote UK</p>
        </div>
        <p className="type-body-md text-primary">
          Leading Formation, FanDuel’s multi-brand design system, across five product verticals.
        </p>
      </div>
    </aside>
  );
}
