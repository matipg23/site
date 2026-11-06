import Button from "@/components/ui/Button";
import SocialLinks from "@/components/ui/SocialLinks";
import NowCard from "./NowCard";

// Figma: Home - Refined > Hero (eyebrow + social icons, H1 Display/LG, lead, then CTAs and the "Now" card)
export default function Hero() {
  return (
    <section className="border-b border-default">
      <div className="container-page flex flex-col gap-40 py-section md:gap-56">
        <div className="flex flex-wrap items-center justify-between gap-x-24 gap-y-16">
          <p className="type-mono-lg text-secondary">Staff-level Product Designer · Design Systems</p>
          <SocialLinks only={["LinkedIn", "Medium"]} />
        </div>

        <h1 className="type-display-lg text-primary">
          I design products
          <br /> and the <span className="text-accent">systems</span>
          <br /> behind them
        </h1>

        <div className="flex flex-col gap-40 lg:gap-0">
          <div className="type-body-lg flex max-w-[693px] flex-col gap-paragraph text-primary lg:gap-[36px]">
            <p>
              I help product organisations ship consistent, scalable, multi-brand experiences faster, without losing
              quality or autonomy, by building the systems and working models teams actually adopt.
            </p>
            <p>Now making those systems readable by AI agents as well as people.</p>
          </div>

          {/* Figma: buttons bottom-left, Now card bottom-right */}
          <div className="flex flex-col gap-40 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-wrap items-center gap-32">
              <Button href="/#work" variant="cta">
                See selected work
              </Button>
              <Button href="/#how-i-work" variant="text" arrow="down">
                How I work
              </Button>
            </div>
            <NowCard />
          </div>
        </div>
      </div>
    </section>
  );
}
