import Link from "next/link";
import Arrow from "@/components/ui/Arrow";
import Chip from "@/components/ui/Chip";
import Reveal from "@/components/ui/Reveal";
import { caseHref } from "@/content/cases";

// Figma: Home - Refined > Selected. A 1px hairline grid: one featured card, two stacked cards, two wide cards.
// TODO(content): Figma has an "All case studies" link here. There is no case study index route yet, so it is left out.
export default function SelectedWork() {
  return (
    <section id="work" className="container-page py-section">
      <div className="flex flex-col gap-24">
        <Chip as="h2">Selected work</Chip>
        <p className="type-body-md max-w-[788px] text-secondary">
          Each piece opens into a full case study: the decisions, the trade-offs, and what I’d do differently.
        </p>
      </div>

      <Reveal className="mt-56 flex flex-col gap-1 border border-default bg-border-default p-1">
        <div className="grid gap-1 lg:grid-cols-[852fr_425fr]">
          <Featured />
          <div className="flex flex-col gap-1">
            <AiCard />
            <ColourCard />
          </div>
        </div>
        <div className="grid gap-1 md:grid-cols-2">
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
      className="group flex min-w-0 flex-col justify-between gap-64 bg-action-accent p-24 text-inverse md:p-48"
    >
      <div className="flex flex-col gap-24">
        <p className="type-mono-xs-med-upper">FanDuel / 2024–25 / Systems, leadership</p>
        <h3 className="type-display-xs">Design system alignment program</h3>
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
          <span className="type-mono-md inline-flex items-center gap-8">
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
  children,
}: {
  href?: string;
  meta: string;
  title: string;
  children: React.ReactNode;
}) {
  const body = (
    <>
      <p className="type-mono-xs-med-upper text-secondary">{meta}</p>
      {children}
      <div className="flex items-end justify-between gap-16">
        <h3 className="type-label-md max-w-[300px] text-primary transition-colors duration-150 group-hover:text-accent">
          {title}
        </h3>
        {href && <Arrow className="mb-4 text-primary" />}
      </div>
    </>
  );
  const cls = "flex min-h-[320px] min-w-0 flex-col justify-between gap-24 bg-page p-32";
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
      {/* Diagram: one parent node fanning out to four parts, as in Figma */}
      <div aria-hidden className="relative">
        <div className="mx-auto flex w-[291px] max-w-full flex-col items-center gap-8 rounded-sm border border-subtle bg-surface px-12 py-8 shadow-1">
          <svg width="18" height="18" viewBox="0 0 18 18" className="text-action-accent" fill="currentColor">
            <rect x="1" y="1" width="7" height="9" />
            <rect x="10" y="1" width="7" height="5" />
            <rect x="10" y="8" width="7" height="9" />
            <rect x="1" y="12" width="7" height="5" />
          </svg>
          <span className="type-label-xs text-primary">AI-READY DESIGN SYSTEM</span>
        </div>
        <svg viewBox="0 0 296 45" className="mx-auto block h-[45px] w-[296px] max-w-full text-secondary" fill="none" stroke="currentColor" strokeDasharray="1.5 2.5">
          <path d="M148 0C148 22 33 20 33 45M148 0C148 22 105 20 105 45M148 0C148 22 188 20 188 45M148 0C148 22 270 20 270 45" />
        </svg>
        <div className="flex flex-wrap justify-between gap-y-8">
          {["foundations", "guidelines", "components", "tokens"].map((t) => (
            <span key={t} className="type-mono-xs-bold border border-subtle bg-surface px-4 py-2 text-primary">
              {t}
            </span>
          ))}
        </div>
      </div>
    </SideCard>
  );
}

function ColourCard() {
  return (
    <SideCard meta="FanDuel / 2022 / Systems" title="Token-powered colour system">
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
      <div className={`flex h-[320px] items-center justify-center overflow-hidden ${visualClass}`}>{visual}</div>
      <div className="flex flex-1 flex-col gap-[10px] px-32 pb-32 pt-[28px]">
        <p className="type-mono-xs-med-upper text-secondary">{meta}</p>
        <h3 className="type-label-lg max-w-[420px] text-primary transition-colors duration-150 group-hover:text-accent">
          {title}
        </h3>
        <div className="flex items-end justify-between gap-16">
          <p className="type-body-sm max-w-[480px] text-secondary">{body}</p>
          <Arrow className="mb-4 shrink-0 text-primary" />
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
      className={`flex h-[90px] w-[182px] min-w-0 shrink flex-col justify-center gap-8 border-[1.5px] border-strong py-20 pl-12 pr-8 sm:pl-24 sm:pr-[44px] ${className}`}
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
      visual={
        // TODO(content): device recording not exported from Figma yet
        <div
          role="img"
          aria-label="Device recording placeholder"
          className="flex h-[235px] w-[170px] rotate-[4deg] items-center justify-center border-[1.5px] border-default bg-page"
        >
          <span className="type-caption-xs text-secondary">[device recording]</span>
        </div>
      }
    />
  );
}
