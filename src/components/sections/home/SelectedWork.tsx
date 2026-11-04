import Link from "next/link";
import ImageSlot from "@/components/ui/ImageSlot";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { caseHref } from "@/content/cases";

// Figma: Home - Revised > Section "SELECTED WORK"
export default function SelectedWork() {
  return (
    <section id="work" className="container-page py-64 md:py-96">
      <SectionLabel as="h2">Selected work</SectionLabel>
      <p className="type-body-md max-w-[520px] pt-40 text-secondary">
        Each piece opens into a full case study: the decisions, the trade-offs, and what I&apos;d do differently.
      </p>

      {/* Row 1: two feature cards, 770 / 486 at desktop */}
      <div className="grid gap-48 pt-64 md:grid-cols-[770fr_486fr] md:gap-24">
        <Reveal>
          <FeatureCard
            href={caseHref("nutmeg")}
            meta="Case Study / Nutmeg · 2019–20"
            title="Mobile onboarding and native investing"
            body="The dedicated mobile designer through a period of rapid growth. New investment journeys from concept to launch, and the foundations for dark mode across iOS and Android."
            visual={<ImageSlot caption="Nutmeg onboarding, device recording" className="aspect-[770/522]" />}
          />
        </Reveal>
        <Reveal delay={1}>
          <FeatureCard
            href={caseHref("fd-ai-readiness")}
            meta="Case Study / FanDuel · 2026"
            title="The system becomes shared AI infrastructure"
            body="AI agents were already building with the design system before anyone had decided what good looks like. Proven, not shipped. Yet."
            visual={
              <div className="flex aspect-[486/522] flex-col justify-between bg-action-accent p-24 text-action-primary-text">
                <p className="type-mono-xs uppercase">Pass rate with governed schema</p>
                <p className="type-display-lg">
                  0 →<br />
                  87%
                </p>
                <p className="type-mono-xs uppercase">11x cheaper per correct output · 4 components</p>
              </div>
            }
          />
        </Reveal>
      </div>

      {/* Row 2: three compact cards */}
      <div className="grid gap-24 pt-64 md:grid-cols-3">
        <Reveal>
          <CompactCard
            href={caseHref("newskit-account")}
            meta="News UK · 2021–22 · Product"
            title="One account, many mastheads"
            body="Settings, subscriptions and notifications designed once and served across the News UK mastheads, built on NewsKit."
            visual={<ImageSlot caption="Account settings across brands" className="h-full border-0" />}
          />
        </Reveal>
        <Reveal delay={1}>
          <CompactCard
            href={caseHref("fd-alignment-program")}
            meta="FanDuel · 2024–25 · Systems"
            title="Design system alignment program"
            body="Scaling trust, not just components. Three embedded specialists, twenty-plus designers, and zero detractors at the end."
            visual={
              <div className="flex h-full flex-col justify-between p-24">
                <p className="type-mono-xs uppercase text-secondary">Product verticals, 12 months</p>
                <p className="type-display-md text-accent">5</p>
              </div>
            }
          />
        </Reveal>
        <Reveal delay={2}>
          <CompactCard
            meta="FanDuel · 2022 · Systems"
            title="Token-powered colour system"
            body="Hardcoded colour was blocking dark mode and a rebrand. The architecture became the backbone of the multi-brand system."
            visual={
              <div className="flex h-full flex-col justify-between p-24">
                <p className="type-mono-xs uppercase text-secondary">Reference → Semantic → Component</p>
                {/* Live swatches: these follow the active theme, as in Figma */}
                <div className="grid h-[84px] grid-cols-5 gap-4">
                  <span className="bg-inverse" />
                  <span className="bg-text-secondary" />
                  <span className="bg-border-subtle" />
                  <span className="bg-action-accent" />
                  <span className="border border-default bg-page" />
                </div>
              </div>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}

function FeatureCard({
  href,
  meta,
  title,
  body,
  visual,
}: {
  href: string;
  meta: string;
  title: string;
  body: string;
  visual: React.ReactNode;
}) {
  return (
    <Link href={href} className="group flex flex-col gap-12">
      <div className="overflow-hidden">
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.015]">{visual}</div>
      </div>
      <p className="type-mono-sm-bold pt-4 text-accent">{meta}</p>
      <h3 className="type-heading-xs uppercase text-primary">{title}</h3>
      <p className="type-body-sm max-w-prose text-secondary">{body}</p>
    </Link>
  );
}

function CompactCard({
  href,
  meta,
  title,
  body,
  visual,
}: {
  href?: string;
  meta: string;
  title: string;
  body: string;
  visual: React.ReactNode;
}) {
  const inner = (
    <>
      <div className="h-[200px] border-b border-default bg-surface">{visual}</div>
      <div className="flex flex-col gap-12 p-24">
        <p className="type-mono-xs-bold text-accent">{meta}</p>
        <h3 className="type-label-md uppercase text-primary">{title}</h3>
        <p className="type-body-xs text-secondary">{body}</p>
      </div>
    </>
  );
  const cls = "flex h-full flex-col border border-default";
  return href ? (
    <Link href={href} className={`${cls} group transition-colors duration-200 hover:border-accent`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
