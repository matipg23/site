"use client";

import { useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

type Mode = "human" | "ai";
// Code colours: k = key (accent), v = value, d = dimmed (comments, list dashes, arrows)
type Seg = readonly ["k" | "v" | "d", string];

const segClass = { k: "text-accent", v: "text-primary", d: "text-primary opacity-[0.45]" } as const;

const thesisCode: Seg[] = [
  ["d", "# the thesis, as structure\n"],
  ["k", "claim: "],
  ["v", '"human-only is a dead end"\n'],
  ["k", "needs:\n"],
  ["d", "  - "],
  ["v", "structured_metadata\n"],
  ["d", "  - "],
  ["v", "mcp_infrastructure\n"],
  ["d", "  - "],
  ["v", "docs_written_for_llms"],
];

const pillars: { title: string; body: string; code: Seg[]; icon: ReactNode }[] = [
  {
    title: "Systems as infrastructure",
    body: "A design system isn’t a component library. It’s load-bearing infrastructure: tokens, semantics, and governance matter more than pixel pushing.",
    code: [
      ["k", "role: "],
      ["v", "infrastructure\n"],
      ["k", "layers: "],
      ["v", "[tokens, semantics, ui]\n"],
      ["k", "governance: "],
      ["v", "required\n"],
      ["d", "# not pixel pushing"],
    ],
    icon: <LayersIcon />,
  },
  {
    title: "AI-native documentation",
    body: "The new player is already in the room. Components carry structured metadata, so the system speaks to both humans and agents.",
    code: [
      ["k", "component: "],
      ["v", '"Button"\n'],
      ["k", "intent: "],
      ["v", '"primary action"\n'],
      ["k", "usage: "],
      ["v", "{ use_when, avoid_when }\n"],
      ["k", "tokens: "],
      ["v", '["action/primary"]'],
    ],
    icon: <MetaIcon />,
  },
  {
    title: "Token-first design ops",
    body: "Tokens as the single source of truth across tools, brands, and platforms, with MCP as the routing layer between design intent and engineering output.",
    code: [
      ["v", "mcp.get_token("],
      ["k", '"action/primary"'],
      ["v", ")\n"],
      ["d", "  -> "],
      ["v", "brand: bluefield\n"],
      ["d", "  -> "],
      ["v", "color/bluefield/blue/600\n"],
      ["d", "  -> "],
      ["v", "#1F5FD1"],
    ],
    icon: <FanIcon />,
  },
];

// Figma: Home > Thesis band, plus "Thinking forwards / Read it as" (437:585): the right column is right-aligned.
// The lead and the pillar bodies
// can be read as prose (Human) or as structured data (Written for AI).
// Both versions sit in the same grid cell and crossfade, so the section keeps the taller one's height.
// data-theme="dark" scopes the band to the real Dark tokens (lime accent, green text), the same in Light and Dark.
export default function ThinkingForwards() {
  const [mode, setMode] = useState<Mode>("human");

  return (
    <section id="thinking-forwards" className="container-page py-24">
      <div className="rounded-2xl border border-default bg-fog p-8">
        <div
          data-theme="dark"
          className="flex flex-col gap-48 rounded-xl bg-band px-24 pb-56 pt-48 text-primary md:gap-[72px] md:px-56 md:pt-80"
        >
          <div className="flex flex-col gap-[28px]">
            <p className="type-mono-xs-med-upper inline-flex w-fit items-center gap-8 bg-fog px-12 py-[6px]">
              <span aria-hidden className="h-[6px] w-[6px] rounded-full bg-action-accent" />
              Thinking forwards
            </p>
            <div className="flex flex-col gap-40 lg:grid lg:grid-cols-[minmax(0,700fr)_minmax(0,440fr)] lg:gap-64">
              <h2 className="type-display-md">
                Design systems for people <span className="text-accent">and machines</span>
              </h2>
              <div className="flex flex-col gap-24 lg:justify-between">
                <Swap
                  mode={mode}
                  human={
                    <p className="type-body-lg lg:text-right">
                      Component libraries that only serve humans are a dead end. The next generation needs structured
                      metadata, MCP infrastructure and documentation written for LLMs as much as for people.
                    </p>
                  }
                  ai={<Code segs={thesisCode} />}
                />
                <ReadItAs mode={mode} onChange={setMode} />
              </div>
            </div>
          </div>

          <ol className="grid gap-12 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i} className="flex">
                <div className="w-full rounded-xl border border-glass bg-glass p-[6px] backdrop-blur-[12px]">
                  <div className="flex h-full flex-col gap-32 rounded-lg bg-glass p-[28px] shadow-glass">
                    <div className="flex h-40 items-center justify-between gap-8">
                      <span className="type-mono-xs-med text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span aria-hidden className="text-accent">
                        {p.icon}
                      </span>
                    </div>
                    <div className="flex flex-col gap-12">
                      <h3 className="type-title-md">{p.title}</h3>
                      <Swap mode={mode} human={<p className="type-body-md">{p.body}</p>} ai={<Code segs={p.code} />} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// Two layers in one grid cell: the height is the taller of the two, so nothing jumps.
// The hidden layer is inert, so keyboard and screen readers only meet the visible one.
function Swap({ mode, human, ai }: { mode: Mode; human: ReactNode; ai: ReactNode }) {
  const layer = "col-start-1 row-start-1 transition-opacity duration-200 ease-out";
  return (
    <div className="grid">
      <div
        className={`${layer} ${mode === "human" ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={mode !== "human"}
        inert={mode !== "human"}
      >
        {human}
      </div>
      <div
        className={`${layer} ${mode === "ai" ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={mode !== "ai"}
        inert={mode !== "ai"}
      >
        {ai}
      </div>
    </div>
  );
}

function Code({ segs }: { segs: Seg[] }) {
  return (
    <pre className="type-mono-code whitespace-pre-wrap rounded-md [overflow-wrap:anywhere] border border-glass bg-glass px-16 py-[14px]">
      <code>
        {segs.map(([kind, text], i) => (
          <span key={i} className={segClass[kind]}>
            {text}
          </span>
        ))}
      </code>
    </pre>
  );
}

// A pair of toggle buttons (aria-pressed), not a switch: two named views of the same content.
function ReadItAs({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  const options: { value: Mode; label: string }[] = [
    { value: "human", label: "Human" },
    { value: "ai", label: "Written for AI" },
  ];
  return (
    <div role="group" aria-label="Read it as" className="flex items-center gap-[14px] lg:justify-end">
      <span aria-hidden className="type-mono-xs-upper opacity-[0.55]">
        Read it as
      </span>
      <div className="flex gap-2 rounded-md border border-fog bg-glass p-[3px]">
        {options.map((o) => {
          const pressed = mode === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={pressed}
              onClick={() => onChange(o.value)}
              className={`type-mono-xs-upper rounded-md px-[14px] py-8 transition-colors duration-200 ${
                pressed ? "bg-action-accent text-action" : "opacity-70 hover:opacity-100"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Pillar illustrations, redrawn from the Figma diagrams
function LayersIcon() {
  return (
    <svg width="72" height="40" viewBox="0 0 72 40" fill="currentColor">
      <rect x="24" y="0" width="48" height="8" rx="4" opacity="0.4" />
      <rect x="12" y="16" width="60" height="8" rx="4" opacity="0.7" />
      <rect x="0" y="32" width="72" height="8" rx="4" />
    </svg>
  );
}

function MetaIcon() {
  return <span className="type-caption-md flex h-40 w-[84px] items-center justify-center rounded-md border border-accent">{"{ meta }"}</span>;
}

function FanIcon() {
  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="currentColor" stroke="currentColor" strokeWidth="1" opacity="1">
      <path d="M7 14 65 3M7 14h58M7 14l58 11" fill="none" opacity="0.6" />
      <circle cx="7" cy="14" r="7" stroke="none" />
      <circle cx="65" cy="3" r="3.5" stroke="none" />
      <circle cx="65" cy="14" r="3.5" stroke="none" />
      <circle cx="65" cy="25" r="3.5" stroke="none" />
    </svg>
  );
}
