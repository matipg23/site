import Link from "next/link";
import Arrow from "@/components/ui/Arrow";
import Chip from "@/components/ui/Chip";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";
import { caseHref } from "@/content/cases";

// Figma: Home - Refined > Selected. A 1px hairline grid: one featured card, two stacked cards, two wide cards.
export default function SelectedWork() {
  return (
    <section id="work" className="container-page py-section">
      <div className="flex flex-col gap-24 lg:flex-row lg:items-end lg:justify-between lg:gap-40">
        <div className="flex flex-col gap-24">
          <Chip as="h2">Selected work</Chip>
          <p className="type-body-md max-w-[788px] text-secondary">
            Each piece opens into a full case study: the decisions, the trade-offs, and what I’d do differently.
          </p>
        </div>
        <Link
          href="/work/"
          className="type-mono-md group inline-flex shrink-0 items-center gap-8 text-action-accent underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:decoration-current"
        >
          All case studies
          <Arrow direction="up-right" size={12} />
        </Link>
      </div>

      <Reveal className="mt-56 flex flex-col gap-1 border border-default bg-border-default p-1">
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-[852fr_425fr]">
          <Featured />
          <div className="flex flex-col gap-1">
            <AiCard />
            <ColourCard />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
          <NewsUkCard />
          <NutmegCard />
        </div>
      </Reveal>
    </section>
  );
}

function Featured() {
  return (
    <Link
      href={caseHref("fd-alignment-program")}
      className="group flex min-w-0 flex-col justify-between gap-64 bg-action-accent p-24 text-inverse transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--action-accent),black_12%)] md:p-48"
    >
      <div className="flex flex-col gap-24">
        <p className="type-mono-xs-med-upper">FanDuel / 2024–25 / Systems, leadership</p>
        <h3 className="type-display-xs transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-[4px]">
          Design system alignment program
        </h3>
      </div>
      <div className="flex flex-col gap-40">
        <div className="grid grid-cols-2 gap-24 border-t border-current pt-24 xl:grid-cols-[2fr_2fr_2fr_auto] xl:gap-x-0">
          <Stat value="5" label="verticals aligned" />
          <Stat value="20+" label="CONSUMER designers" />
          <Stat value="3" label="embedded specialists" />
          <Stat value="1" label="DESIGN SYSTEM" />
        </div>
        <div className="flex flex-col gap-24 sm:flex-row sm:items-end sm:justify-between">
          <p className="type-body-sm max-w-[440px]">
            Scaling trust, not just components. Three embedded specialists, twenty-plus designers, and one adoption
            goal.
          </p>
          <span className="type-mono-md inline-flex shrink-0 items-center gap-8 whitespace-nowrap underline decoration-transparent underline-offset-4 transition-colors duration-150 group-hover:decoration-current">
            Read case study
            <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-8">
      <p className="type-heading-sm">{value}</p>
      <p className="type-mono-xs-med-upper xl:whitespace-nowrap">{label}</p>
    </div>
  );
}

// Compact card with a text-only face: meta, visual, title row with arrow
function SideCard({
  href,
  meta,
  title,
  wip,
  children,
}: {
  href?: string;
  meta: string;
  title: string;
  wip?: boolean;
  children: React.ReactNode;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-16">
        <p className="type-mono-xs-med-upper text-secondary">{meta}</p>
        {wip && <Tag>WIP</Tag>}
      </div>
      {children}
      <div className="flex items-end justify-between gap-16">
        <h3 className="type-label-md max-w-[300px] text-primary transition-colors duration-150 group-hover:text-accent">
          {title}
        </h3>
        {href && <Arrow className="mb-4 text-primary transition-colors duration-150 group-hover:text-accent" />}
      </div>
    </>
  );
  const cls = `flex min-h-[320px] min-w-0 flex-col justify-between gap-24 bg-page p-32${href ? " transition-colors duration-150 hover:bg-surface" : ""}`;
  return href ? (
    <Link href={href} className={`group ${cls}`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function AiCard() {
  return (
    <SideCard href={caseHref("fd-ai-readiness")} meta="FanDuel / 2026 / Systems, AI" title="The system becomes shared AI infrastructure">
      {/* Simple diagram: one parent node fanning out to four parts, text-free like the other card visuals */}
      <div aria-hidden>
        <div className="mx-auto flex w-[240px] max-w-full flex-col items-center gap-8 rounded-sm border border-subtle bg-surface px-12 py-12 shadow-1">
          <svg width="18" height="18" viewBox="0 0 18 18" className="text-action-accent" fill="currentColor">
            <rect x="1" y="1" width="7" height="9" />
            <rect x="10" y="1" width="7" height="5" />
            <rect x="10" y="8" width="7" height="9" />
            <rect x="1" y="12" width="7" height="5" />
          </svg>
          <span className="type-label-xs text-primary">AI-READY DESIGN SYSTEM</span>
        </div>
        <svg viewBox="0 0 296 20" preserveAspectRatio="none" className="mx-auto block h-[20px] w-[296px] max-w-full text-secondary" fill="none" stroke="currentColor">
          <path vectorEffect="non-scaling-stroke" d="M148 0V10M34 10H262M34 10V20M110 10V20M186 10V20M262 10V20" />
        </svg>
        <div className="mx-auto flex w-[296px] max-w-full gap-8">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-[24px] flex-1 border border-subtle bg-surface" />
          ))}
        </div>
      </div>
    </SideCard>
  );
}

function ColourCard() {
  return (
    <SideCard meta="FanDuel / 2022 / Systems" title="Token-powered colour system" wip>
      {/* Live swatches: these follow the active theme, as in Figma */}
      <div aria-hidden className="grid h-[64px] grid-cols-5">
        <span className="bg-inverse" />
        <span className="bg-text-secondary" />
        <span className="bg-border-subtle" />
        <span className="bg-action-accent" />
        <span className="border border-default bg-page" />
      </div>
    </SideCard>
  );
}

function WideCard({
  href,
  meta,
  title,
  body,
  visual,
  visualClass,
}: {
  href: string;
  meta: string;
  title: React.ReactNode;
  body: string;
  visual: React.ReactNode;
  visualClass: string;
}) {
  return (
    <Link href={href} className="group flex min-w-0 flex-col bg-page">
      <div className={`flex h-[320px] items-center justify-center overflow-hidden ${visualClass}`}>
        <div className="flex w-full items-center justify-center transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03]">
          {visual}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-[10px] px-32 pb-32 pt-[28px]">
        <p className="type-mono-xs-med-upper text-secondary">{meta}</p>
        <h3 className="type-label-lg max-w-[420px] text-primary transition-colors duration-150 group-hover:text-accent">
          {title}
        </h3>
        <div className="flex items-end justify-between gap-16">
          <p className="type-body-sm max-w-[480px] text-secondary">{body}</p>
          <Arrow className="mb-4 shrink-0 text-primary transition-colors duration-150 group-hover:text-accent" />
        </div>
      </div>
    </Link>
  );
}

function NewsUkCard() {
  return (
    <WideCard
      href={caseHref("newskit-account")}
      meta="News UK / 2021–22 / Product"
      title={
        <>
          One account,
          <br /> multiple brands
        </>
      }
      body="Settings, subscriptions and notifications designed once, served across every masthead on NewsKit."
      visualClass="bg-surface"
      visual={
        <div aria-hidden className="flex w-full items-center justify-center px-16 [&>*:not(:first-child)]:-ml-8">
          <Masthead label="Brand A" className="bg-inverse text-muted" />
          <Masthead label="Brand B" className="rotate-2 bg-page text-primary" />
          <Masthead label="Brand C" className="-rotate-2 bg-action-accent text-inverse" />
        </div>
      }
    />
  );
}

function Masthead({ label, className }: { label: string; className: string }) {
  return (
    <div
      className={`flex h-[90px] w-[182px] min-w-0 shrink flex-col justify-center gap-8 border-[1.5px] border-strong py-20 pl-12 pr-8 xl:pl-24 xl:pr-[44px] ${className}`}
    >
      <span className="type-label-md">{label}</span>
      <span className="h-[8px] w-full max-w-[110px] bg-current" />
    </div>
  );
}

function NutmegCard() {
  return (
    <WideCard
      href={caseHref("nutmeg")}
      meta="Nutmeg / 2019–20 / Product"
      title="Mobile onboarding and native investing"
      body="New investment journeys from concept to launch, and dark mode foundations across iOS and Android."
      visualClass="bg-overlay"
      visual={<OnboardingIllustration />}
    />
  );
}

// Two overlapping phones: onboarding form in front, investment growth chart behind. Theme tokens only.
function OnboardingIllustration() {
  const phone = "absolute h-[236px] w-[148px] overflow-hidden rounded-[20px] border-[1.5px] border-strong bg-page p-12";
  return (
    <div aria-hidden className="relative h-[260px] w-[290px]">
      <div className={`${phone} right-0 top-0 rotate-[5deg] shadow-1`}>
        <div className="h-[6px] w-[48px] bg-border-subtle" />
        <div className="mt-12 h-[14px] w-[84px] bg-inverse" />
        <div className="mt-4 h-[6px] w-[56px] bg-text-secondary" />
        <svg viewBox="0 0 120 80" className="mt-16 block h-[80px] w-full text-action-accent" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M0 74C24 70 36 60 54 46S92 14 120 4" />
          <path d="M0 78h120" className="text-border-subtle" />
        </svg>
        <div className="mt-16 flex items-end justify-between gap-4">
          {["h-[14px]", "h-[22px]", "h-[18px]", "h-[30px]", "h-[26px]", "h-[38px]"].map((h) => (
            <span key={h} className={`${h} w-[12px] bg-action-accent opacity-60`} />
          ))}
        </div>
      </div>
      <div className={`${phone} bottom-0 left-0 -rotate-[4deg] shadow-2`}>
        <div className="flex gap-4">
          <span className="h-[4px] flex-1 bg-action-accent" />
          <span className="h-[4px] flex-1 bg-action-accent" />
          <span className="h-[4px] flex-1 bg-border-subtle" />
        </div>
        <div className="mt-16 h-[12px] w-[90px] bg-inverse" />
        <div className="mt-4 h-[6px] w-[100px] bg-text-secondary" />
        <div className="mt-16 flex flex-col gap-8">
          <span className="h-[28px] w-full border border-default bg-surface" />
          <span className="h-[28px] w-full border border-default bg-surface" />
        </div>
        <span className="mt-16 flex h-[28px] w-full items-center justify-center rounded-full bg-action-accent">
          <span className="h-[5px] w-[40px] bg-page" />
        </span>
      </div>
    </div>
  );
}
