"use client";

import { useEffect, useRef, useState } from "react";

// Figma: Case 01 > Outcomes > Results chart (387:20678).
// Bars grow from the baseline score to the result, scores count up, then NPS and the summary cards
// fade in. Plays once when scrolled into view. Shows the final state without JS or with reduced motion.

type Team = { name: string; sus: [number, number]; cov: [number, number]; nps: string; note?: string };

const teams: Team[] = [
  { name: "Team 01", sus: [55, 73], cov: [35, 72], nps: "83" },
  { name: "Team 02", sus: [57, 80], cov: [24, 60], nps: "71" },
  { name: "Team 03", sus: [62, 83], cov: [31, 85], nps: "25", note: "lowest" },
  { name: "Team 04", sus: [63, 87], cov: [13, 100], nps: "100" },
  { name: "Team 05", sus: [54, 70], cov: [13, 100], nps: "67" },
];

const START = 100;
const STAGGER = 140;
const DUR = 1700;
const END = START + 4 * STAGGER + DUR + 900;

const clamp = (x: number) => Math.max(0, Math.min(1, x));
const ease = (x: number) => 1 - Math.pow(1 - x, 3);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

// Below md each team stacks: name and NPS on one line, then the two bars. From md up it is the Figma table.
const cols = "grid grid-cols-2 gap-x-16 gap-y-12 md:grid-cols-[56px_1fr_1fr_64px]";

export default function ResultsChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(END);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setT(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const elapsed = Math.min(now - t0, END);
          setT(elapsed);
          if (elapsed < END) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const prog = (start: number, dur: number) => ease(clamp((t - start) / dur));

  const cardP = prog(START + 100, DUR + 300);
  const overall = Math.round(lerp(56, 73, cardP));
  const acceptP = overall >= 68 ? prog(START + 100 + 0.34 * (DUR + 300), 450) : 0;
  const npsCardP = prog(START + 4 * STAGGER + DUR * 0.6, 600);
  const npsSubP = prog(START + 4 * STAGGER + DUR * 0.6 + 250, 500);

  return (
    <div ref={ref}>
      <div className="flex flex-col gap-32">
        <div className="border-t border-default md:border-t-0">
          <div className="hidden border-b border-default pb-12 md:grid md:grid-cols-[56px_1fr_1fr_64px] md:gap-x-16">
            <span />
            <span className="type-mono-xs-bold text-primary">System Usability Score</span>
            <span className="type-mono-xs-bold text-primary">Component Coverage</span>
            <span className="type-mono-xs-bold text-right text-primary">NPS</span>
          </div>
          {teams.map((team, i) => {
            const start = START + i * STAGGER;
            const p = prog(start, DUR);
            const q = prog(start + DUR * 0.65, 500);
            const sus = lerp(team.sus[0], team.sus[1], p);
            const cov = lerp(team.cov[0], team.cov[1], p);
            return (
              <div key={team.name} className={`${cols} border-b border-subtle py-16`}>
                <span className="type-mono-xs-bold order-1 text-primary md:order-none">{team.name}</span>
                <Metric
                  value={sus}
                  base={team.sus[0]}
                  title="System Usability Score"
                  label={String(Math.round(sus))}
                  from={`from ${team.sus[0]}`}
                />
                <Metric
                  value={cov}
                  base={team.cov[0]}
                  title="Component Coverage"
                  label={`${Math.round(cov)}%`}
                  from={`from ${team.cov[0]}%`}
                  muted
                />
                <div
                  className="order-2 flex flex-col items-end gap-[2px] md:order-none"
                  style={{ opacity: q, transform: `translateY(${(1 - q) * 8}px)` }}
                >
                  <span className="type-label-md text-primary">{team.nps}</span>
                  {team.note && <span className="type-mono-xs text-secondary">{team.note}</span>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="type-mono-xs flex flex-wrap items-center gap-20 text-secondary">
          <span className="flex items-center gap-8">
            <span className="h-[6px] w-[16px] bg-action-accent" />
            Usability (after)
          </span>
          <span className="flex items-center gap-8">
            <span className="h-[6px] w-[16px] bg-action-accent opacity-60" />
            Coverage (after)
          </span>
          <span className="flex items-center gap-8">
            <span className="h-[12px] w-[1.5px] bg-inverse" />
            Baseline
          </span>
        </div>

        <div className="grid gap-24 sm:grid-cols-2">
          <div className="flex min-h-[200px] flex-col justify-between border border-default bg-surface p-24">
            <p className="type-mono-xs text-primary">Overall System Usability Score</p>
            <div className="flex items-baseline gap-12 text-accent">
              <span className="type-highlight-md tabular-nums">{overall}</span>
              <span className="type-mono-sm">↑ from 56</span>
            </div>
            <p
              className="type-body-xs text-secondary"
              style={{ opacity: acceptP, transform: `translateY(${(1 - acceptP) * 6}px)` }}
            >
              Crossed into acceptable range in the first program run
            </p>
          </div>
          <div className="flex min-h-[200px] flex-col justify-between border border-default bg-surface p-24">
            <p className="type-mono-xs text-primary">Program Net Promoter Score</p>
            <p
              className="type-highlight-md text-accent"
              style={{ opacity: npsCardP, transform: `translateY(${(1 - npsCardP) * 10}px)` }}
            >
              64.3
            </p>
            <div className="flex gap-24 text-secondary" style={{ opacity: npsSubP }}>
              {[
                ["18", "promoters"],
                ["10", "passives"],
                ["0", "detractors"],
              ].map(([n, label]) => (
                <div key={label} className="flex flex-col gap-[2px]">
                  <span className="type-label-xs">{n}</span>
                  <span className="type-body-2xs">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Figma: Metric (14px bar over a track, baseline tick, value and "from" row)
function Metric({
  title,
  value,
  base,
  label,
  from,
  muted = false,
}: {
  title: string;
  value: number;
  base: number;
  label: string;
  from: string;
  muted?: boolean;
}) {
  return (
    <div className="order-3 col-span-2 flex flex-col gap-[6px] md:order-none md:col-span-1">
      <span className="type-mono-xs text-secondary md:hidden">{title}</span>
      <div className="relative h-[14px]">
        <div className="absolute left-0 top-[4px] h-[6px] w-full bg-overlay" />
        <div
          className={`absolute left-0 top-[4px] h-[6px] bg-action-accent ${muted ? "opacity-60" : ""}`}
          style={{ width: `${value}%` }}
        />
        <div className="absolute top-0 h-[14px] w-[1.5px] bg-inverse" style={{ left: `calc(${base}% - 0.75px)` }} />
      </div>
      <div className="flex items-baseline justify-between whitespace-nowrap">
        <span className="type-mono-sm-bold text-accent tabular-nums">{label}</span>
        <span className="type-mono-xs text-secondary">{from}</span>
      </div>
    </div>
  );
}
