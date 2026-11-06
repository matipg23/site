"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

type Mode = "human" | "ai";

const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// "Written for AI" content, as data. One string per line; the tokenizer below colours it.
const introCode = [
  "// context: read by people and agents",
  "{",
  '  "audience": ["people", "llms"],',
  '  "needs": [',
  '    "structured_metadata",',
  '    "mcp_infrastructure",',
  '    "docs_for_llms"',
  "  ],",
  '  "human_only_libraries": "dead_end"',
  "}",
];

const pillars: {
  title: string;
  body: string;
  code: string[];
  icon: (hovered: boolean) => ReactNode;
}[] = [
  {
    title: "Systems as infrastructure",
    body: "A design system isn’t a component library. It’s load-bearing infrastructure: tokens, semantics, and governance matter more than pixel pushing.",
    code: [
      "system:",
      "  role: infrastructure",
      "  layers:",
      "    - tokens",
      "    - semantics",
      "    - governance",
      "  pixel_pushing: low_priority",
    ],
    icon: () => <LayersIcon />,
  },
  {
    title: "AI-native documentation",
    body: "The new player is already in the room. Components carry structured metadata, so the system speaks to both humans and agents.",
    code: [
      "component: pill",
      "meta:",
      '  intent: "filter a list"',
      "  readers: [humans, agents]",
      "  status: stable",
    ],
    icon: (hovered) => <MetaIcon active={hovered} />,
  },
  {
    title: "Token-first design ops",
    body: "Tokens as the shared language across tools, brands and platforms, with MCP routing between design intent and engineering output.",
    code: [
      "token: color.action.primary",
      "scope: [tools, brands, platforms]",
      "route: mcp",
      "from: design_intent",
      "to: engineering_output",
    ],
    icon: (hovered) => <FanIcon active={hovered} />,
  },
];

// Simple syntax highlighting: comments, strings, keys, punctuation. Everything else is a plain value.
const TOKEN_RE =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*")(?=\s*:)|("(?:[^"\\]|\\.)*")|([A-Za-z_][\w.-]*)(?=\s*:)|([[\]{}:,-])|(\s+)|([^\s[\]{}:,"]+)/g;
// Muted = secondary text at half strength: --text-muted is a dark green in the default theme, unreadable on the band
const tokenClass = ["", "text-secondary opacity-50 italic", "text-accent", "text-secondary", "text-accent", "text-secondary opacity-50", "", ""];

function tokenize(line: string): [string, string][] {
  return [...line.matchAll(TOKEN_RE)].map((m) => {
    const group = m.findIndex((g, i) => i > 0 && g !== undefined);
    return [tokenClass[group] ?? "", m[0]];
  });
}

// Figma: Home > Thesis band, plus "Thinking forwards / Read it as" (437:585): the right column is right-aligned.
// The lead and the pillar bodies can be read as prose (Human) or as structured data (Written for AI).
// Both versions sit in the same grid cell and crossfade, so the section keeps the taller one's height.
// data-theme="dark" scopes the band to the real Dark tokens (lime accent, green text), the same in Light and Dark.
export default function ThinkingForwards() {
  const [mode, setMode] = useState<Mode>("human");
  const ai = mode === "ai";
  const chip = useRef<HTMLParagraphElement>(null);

  // Forward motion on the chip, once each time the cursor enters the section
  const onSectionEnter = () => {
    if (!prefersReducedMotion()) chip.current?.classList.add("is-moving");
  };

  return (
    <section id="thinking-forwards" className="container-page py-24" onPointerEnter={onSectionEnter}>
      <div className="rounded-2xl border border-default bg-fog p-8">
        <div
          data-theme="default"
          data-mode="dark"
          className="flex flex-col gap-48 rounded-xl bg-band px-24 pb-56 pt-48 text-primary md:gap-[72px] md:px-56 md:pt-80"
        >
          <div className="flex flex-col gap-[28px]">
            <p
              ref={chip}
              className="tf-chip type-mono-xs-med-upper inline-flex w-fit items-center gap-8 bg-fog px-12 py-[6px]"
            >
              <span aria-hidden className="tf-chip__dot h-[6px] w-[6px] rounded-full bg-action-accent" />
              <span className="block overflow-hidden">
                <span
                  className="tf-chip__track block"
                  onAnimationEnd={() => chip.current?.classList.remove("is-moving")}
                >
                  Thinking forwards
                </span>
              </span>
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
                  ai={<Code lines={introCode} active={ai} delay={220} keepCaret />}
                />
                <ReadItAs mode={mode} onChange={setMode} />
              </div>
            </div>
          </div>

          <ol className="grid gap-12 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i} className="flex">
                <Pillar index={i} ai={ai} {...p} />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// Cursor glow: store the pointer as a target, ease the light towards it each frame (factor 0.14) and write it
// to --mx / --my. The loop stops once it settles. Reduced motion jumps straight to the pointer.
function useGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const s = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });

  const paint = () => {
    ref.current?.style.setProperty("--mx", `${s.current.x}px`);
    ref.current?.style.setProperty("--my", `${s.current.y}px`);
  };
  const tick = () => {
    const p = s.current;
    const k = prefersReducedMotion() ? 1 : 0.14;
    p.x += (p.tx - p.x) * k;
    p.y += (p.ty - p.y) * k;
    paint();
    p.raf = Math.abs(p.tx - p.x) > 0.3 || Math.abs(p.ty - p.y) > 0.3 ? requestAnimationFrame(tick) : 0;
  };
  const follow = () => {
    if (!s.current.raf) s.current.raf = requestAnimationFrame(tick);
  };
  const local = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  useEffect(() => () => cancelAnimationFrame(s.current.raf), []);

  return {
    ref,
    // start the light where the cursor enters
    enter: (e: React.PointerEvent) => {
      const { x, y } = local(e);
      Object.assign(s.current, { x, y, tx: x, ty: y });
      paint();
    },
    move: (e: React.PointerEvent) => {
      const { x, y } = local(e);
      s.current.tx = x;
      s.current.ty = y;
      follow();
    },
    // keyboard focus: centre the light
    focus: () => {
      const r = ref.current!.getBoundingClientRect();
      s.current.tx = r.width / 2;
      s.current.ty = r.height / 2;
      follow();
    },
  };
}

function Pillar({
  index,
  ai,
  title,
  body,
  code,
  icon,
}: (typeof pillars)[number] & { index: number; ai: boolean }) {
  const glow = useGlow();
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full rounded-xl border border-glass bg-glass p-[6px]">
      <div
        ref={glow.ref}
        tabIndex={0}
        className="tf-card flex h-full flex-col gap-32 rounded-lg bg-glass p-[28px] shadow-glass"
        onPointerEnter={(e) => {
          glow.enter(e);
          setHovered(true);
        }}
        onPointerMove={glow.move}
        onPointerLeave={() => setHovered(false)}
        onFocus={glow.focus}
      >
        <div className="flex h-40 items-center justify-between gap-8">
          <span className="type-mono-xs-med text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden className="text-accent">
            {icon(hovered)}
          </span>
        </div>
        <div className="flex flex-col gap-12">
          <Title text={title} ai={ai} />
          <Swap
            mode={ai ? "ai" : "human"}
            human={<p className="type-body-md">{body}</p>}
            ai={<Code lines={code} active={ai} delay={220 + (index + 1) * 160} />}
          />
        </div>
      </div>
    </div>
  );
}

// Card title: the display font in Human, the mono font with an accent "# " in AI. On each switch the characters
// resolve left to right from random glyphs into the real title (about 520ms).
const GLYPHS = "abcdefghijklmnopqrstuvwxyz_/<>{}#";

function Title({ text, ai }: { text: string; ai: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const prev = useRef(ai);

  useEffect(() => {
    const el = ref.current;
    if (!el || prev.current === ai) return;
    prev.current = ai;
    if (prefersReducedMotion()) return;
    let raf = 0;
    const t0 = performance.now();
    const frame = (t: number) => {
      const p = Math.min(1, (t - t0) / 520);
      const n = Math.floor(p * text.length);
      el.textContent = text.slice(0, n) + text.slice(n).replace(/\S/g, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]);
      if (p < 1) raf = requestAnimationFrame(frame);
      else el.textContent = text;
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      el.textContent = text; // an interrupted scramble never leaves broken text
    };
  }, [ai, text]);

  // The display and mono versions wrap onto different numbers of lines. Both are laid out invisibly in the same
  // grid cell as the real title, so the title always takes the taller height and the card never changes size.
  // The cell is also never shorter than two lines, so a one-line title in either font leaves the body and the
  // code where they are, and the bodies line up across the three cards.
  return (
    <div className={`${titleBase} grid min-h-[2lh]`}>
      <span aria-hidden className={`${titleBase} ${titleHuman} invisible col-start-1 row-start-1`}>
        {text}
      </span>
      <span aria-hidden className={`${titleBase} ${titleAi} invisible col-start-1 row-start-1`}>
        {text}
      </span>
      <h3 ref={ref} className={`${titleBase} col-start-1 row-start-1 ${ai ? titleAi : titleHuman}`}>
        {text}
      </h3>
    </div>
  );
}

const titleBase = "type-title-md";
const titleHuman = "";
const titleAi = "font-mono font-semibold tracking-[-0.01em] before:text-accent before:content-['#_']";

// Two layers in one grid cell: the height is the taller of the two, so nothing jumps.
// The hidden layer is inert and aria-hidden, so keyboard and screen readers only meet the visible one.
function Swap({ mode, human, ai }: { mode: Mode; human: ReactNode; ai: ReactNode }) {
  const layer = "col-start-1 row-start-1 transition-[opacity,filter] duration-[350ms] ease-out";
  return (
    <div className="grid">
      <div
        className={`${layer} ${mode === "human" ? "opacity-100" : "pointer-events-none opacity-0 blur-[4px]"}`}
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

// Typewriter code block. A hidden "ghost" copy of the finished code reserves the final height in the same grid
// cell, and the live copy types over it. Each run is guarded by its effect: switching mode cancels every pending
// timer, so a half-typed block can never keep writing. Going back to Human clears the code once the fade has ended.
function Code({
  lines,
  active,
  delay,
  keepCaret = false,
}: {
  lines: string[];
  active: boolean;
  delay: number;
  keepCaret?: boolean;
}) {
  const live = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = live.current;
    if (!el) return;
    const timers = new Set<number>();
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => {
          timers.delete(id);
          resolve();
        }, ms);
        timers.add(id);
      });
    let cancelled = false;
    const stop = () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };

    if (!active) {
      const id = window.setTimeout(() => (el.textContent = ""), 400);
      return () => clearTimeout(id);
    }

    el.textContent = "";
    const write = (text: string, className: string) => {
      const span = document.createElement("span");
      span.className = className;
      span.textContent = text;
      el.append(span);
    };

    (async () => {
      await sleep(delay);
      if (cancelled) return;
      if (prefersReducedMotion()) {
        lines.forEach((line, i) => {
          tokenize(line).forEach(([cls, text]) => write(text, cls));
          if (i < lines.length - 1) el.append("\n");
        });
        return;
      }
      const caret = document.createElement("span");
      caret.className = "tf-caret";
      el.append(caret);
      for (let i = 0; i < lines.length; i++) {
        for (const [cls, text] of tokenize(lines[i])) {
          const span = document.createElement("span");
          span.className = cls;
          el.insertBefore(span, caret);
          if (/^\s+$/.test(text)) {
            span.textContent = text; // indentation lands instantly
            continue;
          }
          for (const ch of text) {
            span.textContent += ch;
            await sleep(6 + Math.random() * 14);
            if (cancelled) return;
          }
        }
        if (i < lines.length - 1) {
          el.insertBefore(document.createTextNode("\n"), caret);
          await sleep(70);
          if (cancelled) return;
        }
      }
      if (!keepCaret) caret.remove(); // only the intro keeps a blinking caret
    })();

    return stop;
  }, [active, lines, delay, keepCaret]);

  const pre = "type-mono-code whitespace-pre-wrap px-16 py-[14px] [overflow-wrap:anywhere]";
  return (
    <div className="relative rounded-md border border-glass bg-glass">
      <span className="sr-only">{lines.join("\n")}</span>
      <pre aria-hidden className={`${pre} invisible`}>
        <code>
          {lines.map((line, i) => (
            <span key={i}>
              {tokenize(line).map(([cls, text], j) => (
                <span key={j} className={cls}>
                  {text}
                </span>
              ))}
              {i < lines.length - 1 ? "\n" : ""}
            </span>
          ))}
        </code>
      </pre>
      <pre aria-hidden className={`${pre} absolute inset-0`}>
        <code ref={live} />
      </pre>
    </div>
  );
}

// One switch, two states: the whole container is the click target and flips between Human and Written for AI.
// The accent indicator slides under the active label; its width and offset are measured from that label.
function ReadItAs({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  const ai = mode === "ai";
  const options: { value: Mode; label: string }[] = [
    { value: "human", label: "Human" },
    { value: "ai", label: "Written for AI" },
  ];
  const labels = useRef<Record<string, HTMLSpanElement | null>>({});
  const [box, setBox] = useState<{ w: number; x: number } | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const measure = () => {
      const l = labels.current[mode];
      if (l) setBox({ w: l.offsetWidth, x: l.offsetLeft });
    };
    measure();
    addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    const raf = requestAnimationFrame(() => setAnimate(true)); // no slide on the first placement
    return () => {
      removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  // Always right-aligned, so the control stays in the same place at every width.
  return (
    <div className="flex flex-col items-end gap-8 sm:flex-row sm:items-center sm:justify-end sm:gap-[14px]">
      <span aria-hidden className="type-mono-xs-upper shrink-0 whitespace-nowrap opacity-[0.55]">
        Read it as
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={ai}
        aria-label="Written for AI"
        onClick={() => onChange(ai ? "human" : "ai")}
        className="group relative flex shrink-0 cursor-pointer gap-2 rounded-md border border-fog bg-glass p-[3px]"
      >
        <span
          aria-hidden
          className={`absolute bottom-[3px] left-0 top-[3px] rounded-md bg-action-accent ${
            animate ? "transition-[transform,width] duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)]" : ""
          }`}
          style={{ width: box?.w ?? 0, transform: `translateX(${box?.x ?? 0}px)` }}
        />
        {options.map((o) => {
          const active = mode === o.value;
          return (
            <span
              key={o.value}
              ref={(el) => {
                labels.current[o.value] = el;
              }}
              aria-hidden
              className={`type-mono-xs-upper relative z-10 whitespace-nowrap rounded-md px-[14px] py-8 transition-[color,opacity] duration-200 ${
                active ? "text-action" : "opacity-70 group-hover:opacity-100"
              } ${active && !box ? "bg-action-accent" : ""}`}
            >
              {o.label}
            </span>
          );
        })}
      </button>
    </div>
  );
}

// Pillar illustrations, redrawn from the Figma diagrams. The "Signal" motion plays once per card hover (globals.css).
function LayersIcon() {
  return (
    <svg width="72" height="40" viewBox="0 0 72 40" fill="currentColor" className="tf-layers">
      <rect className="tf-bar" x="24" y="0" width="48" height="8" rx="4" opacity="0.4" />
      <rect className="tf-bar" x="12" y="16" width="60" height="8" rx="4" opacity="0.7" />
      <rect className="tf-bar" x="0" y="32" width="72" height="8" rx="4" />
    </svg>
  );
}

// While hovered: wait 900ms, backspace the word (45ms a character), type the next (70ms a character), and loop.
// Leaving the card resets it to "meta".
const META_WORDS = ["meta", "intent", "a11y", "tokens"];

function MetaIcon({ active }: { active: boolean }) {
  const [word, setWord] = useState(META_WORDS[0]);

  useEffect(() => {
    if (!active || prefersReducedMotion()) {
      setWord(META_WORDS[0]);
      return;
    }
    const timers = new Set<number>();
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => {
          timers.delete(id);
          resolve();
        }, ms);
        timers.add(id);
      });
    let cancelled = false;
    (async () => {
      let current = META_WORDS[0];
      let i = 0;
      while (!cancelled) {
        await sleep(900);
        while (current.length && !cancelled) {
          current = current.slice(0, -1);
          setWord(current);
          await sleep(45);
        }
        i = (i + 1) % META_WORDS.length;
        for (const ch of META_WORDS[i]) {
          if (cancelled) return;
          current += ch;
          setWord(current);
          await sleep(70);
        }
      }
    })();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [active]);

  return (
    <span className="type-caption-md flex h-40 w-[calc(8ch+24px)] items-center justify-center gap-4 rounded-md border border-accent px-8">
      <span>{"{"}</span>
      <span>{word}</span>
      <span>{"}"}</span>
    </span>
  );
}

// Lines draw themselves, the end nodes pop, then a small signal dot travels along each line (SVG animateMotion,
// started with beginElement, 90ms apart). The line and node motion is CSS, keyed off the card's :hover.
const FAN_ENDS = [3, 14, 25];

function FanIcon({ active }: { active: boolean }) {
  const signals = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    if (!active || prefersReducedMotion()) return;
    const timers: number[] = [];
    signals.current.forEach((s, i) => {
      if (!s) return;
      timers.push(
        window.setTimeout(() => {
          s.style.opacity = "1";
          (s.firstElementChild as SVGAnimationElement | null)?.beginElement();
          timers.push(window.setTimeout(() => (s.style.opacity = "0"), 600));
        }, 120 + i * 90),
      );
    });
    return () => {
      timers.forEach(clearTimeout);
      signals.current.forEach((s) => s && (s.style.opacity = "0"));
    };
  }, [active]);

  return (
    <svg width="72" height="28" viewBox="0 0 72 28" fill="currentColor" className="tf-net">
      {FAN_ENDS.map((y) => (
        <line key={y} x1="7" y1="14" x2="65" y2={y} stroke="currentColor" strokeWidth="1" opacity="0.6" />
      ))}
      <circle cx="7" cy="14" r="7" />
      {FAN_ENDS.map((y) => (
        <circle key={y} className="tf-node" cx="65" cy={y} r="3.5" />
      ))}
      {FAN_ENDS.map((y, i) => (
        <circle
          key={y}
          ref={(el) => {
            signals.current[i] = el;
          }}
          className="tf-signal"
          r="2"
          opacity="0"
        >
          <animateMotion dur="0.6s" begin="indefinite" fill="remove" path={`M7 14 L65 ${y}`} />
        </circle>
      ))}
    </svg>
  );
}
