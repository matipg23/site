import Button from "@/components/ui/Button";
import SocialLinks from "@/components/ui/SocialLinks";
import TokenInspector from "@/components/ui/TokenInspector";

// Figma: Home - Revised > Section (hero): fixed 900px tall, py-96, button row pinned to the bottom
export default function Hero() {
  return (
    <section className="container-page flex flex-col pb-64 pt-64 md:pb-96 md:pt-96 lg:min-h-[900px]">
      <p className="type-mono-sm-bold pb-12 text-accent">Matias Peinado Greco</p>

      <h1 className="type-display-md max-w-[1024px] pt-40 text-primary">
        I design products
        <br /> and the <span className="text-accent">systems</span>
        <br /> behind them
      </h1>

      <div className="max-w-[600px] pt-32">
        <p className="type-body-md text-primary">
          6+ years working at the intersection of craft and strategy, building design infrastructure that scales and
          product experiences used by millions.
        </p>
        <p className="type-body-md max-w-[540px] pt-24 text-secondary">
          Building toward AI-native design systems and exploring what that future looks like in practice.
        </p>
      </div>

      <div className="flex flex-col gap-32 pt-40 sm:flex-row sm:items-center sm:justify-between lg:mt-auto">
        <div className="flex flex-wrap items-center gap-32">
          <Button href="/#how-i-work" className="type-mono-md-bold">
            How I Work
          </Button>
          <Button href="/about/" variant="link" arrow="right" className="type-mono-md-bold">
            About Me
          </Button>
        </div>
        <div className="relative flex items-center gap-[28px]">
          <SocialLinks />
          <TokenInspector />
        </div>
      </div>
    </section>
  );
}
