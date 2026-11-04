"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Content. Every line is taken from the About page and case studies in Figma.
const ROUTE = [
  { code: "AR", word: "Hola." },
  { code: "BR", word: "Olá." },
  { code: "UK", word: "Hello." },
];
const PATH = ["computer_science", "art_direction", "product_"];
const WORK = [
  { n: "01", title: "Scaling trust, not just components", client: "FanDuel" },
  { n: "02", title: "Formation: multi-brand tokens at scale", client: "FanDuel" },
  { n: "03", title: "NewsKit for The Times and The Sun", client: "News UK" },
  { n: "04", title: "Investing for 150K+ customers", client: "Nutmeg" },
];
const YARDS = [10, 20, 30, 40, 50, 40, 30, 20, 10, 0, 10, 20, 30, 40, 50, 40, 30, 20];
const STREAKS = [34, 38, 41, 45, 47, 52, 55, 58, 61, 66];

// One span per character so lines can be "typed" by revealing spans in sequence.
function Chars({ text, hook }: { text: string; hook: string }) {
  return (
    <>
      {text.split("").map((c, i) => (
        <span key={i} data-char={hook} className="hidden">
          {c}
        </span>
      ))}
    </>
  );
}

// Offset that makes `el` sit exactly over `from`, used to morph one element into another.
function offsetTo(el: Element, from: Element) {
  const a = from.getBoundingClientRect();
  const b = el.getBoundingClientRect();
  return { x: a.left - b.left, y: a.top - b.top, scale: a.height / b.height };
}

function buildTimeline(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const one = (s: string) => q(s)[0] as HTMLElement;
  const chars = (hook: string) => q(`[data-char="${hook}"]`);
  const type = (tl: gsap.core.Timeline, hook: string, at: number, speed = 0.03) =>
    tl.to(chars(hook), { display: "inline", duration: 0, stagger: speed }, at);

  // Measure resting positions before any initial state is applied.
  const ukTick = q("[data-tick]")[2];
  const caret1 = q("[data-caret]")[0];
  const t = ukTick.getBoundingClientRect();
  const c = caret1.getBoundingClientRect();
  const caretFrom = {
    x: t.left + t.width / 2 - (c.left + c.width / 2),
    y: t.top + t.height / 2 - (c.top + c.height / 2),
  };
  // The mono word only has a size once typed, so reveal it briefly to measure it.
  const typed = [...chars("path2"), ...chars("design")] as HTMLElement[];
  typed.forEach((s) => (s.style.display = "inline"));
  const designFrom = offsetTo(one("[data-h2-design]"), one("[data-mono-design]"));
  typed.forEach((s) => (s.style.display = ""));
  const systemsFrom = offsetTo(one("[data-s5-systems]"), one("[data-s4-systems]"));
  const list = one("[data-list]").getBoundingClientRect();
  const listMid = list.top + list.height / 2;
  const ruleShift = q("[data-row-rule]").map((r) => listMid - r.getBoundingClientRect().top);

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Scene 1 · Roots · HOLA. OLÁ. HELLO.
  const rule = one("[data-rule]");
  const ticks = q("[data-tick]");
  const tickLabels = q("[data-tick-label]");
  const greets = q("[data-greet]");
  tl.set(one("[data-s1]"), { autoAlpha: 1 }, 0);
  tl.set(rule, { scaleX: 0, transformOrigin: "0 50%" }, 0);
  tl.set(greets, { yPercent: 115 }, 0);
  tl.set([...ticks, ...tickLabels], { autoAlpha: 0 }, 0);

  const stops = [0.15, 1.05, 1.95];
  stops.forEach((at, i) => {
    if (i > 0) tl.to(rule, { scaleX: i / 2, duration: 0.6, ease: "power2.inOut" }, at - 0.6);
    tl.fromTo(ticks[i], { autoAlpha: 1, scaleY: 0 }, { scaleY: 1, duration: 0.3 }, at);
    tl.fromTo(tickLabels[i], { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3 }, at + 0.05);
    if (i > 0) tl.to(greets[i - 1], { yPercent: -115, skewX: 10, duration: 0.32, ease: "power3.in" }, at - 0.08);
    tl.fromTo(
      greets[i],
      { yPercent: 115, skewX: -14 },
      { yPercent: 0, skewX: 0, duration: 0.55, ease: "expo.out" },
      at + 0.12,
    );
  });

  // 1 → 2: the route collapses into the UK tick, which becomes the typing caret.
  tl.to(greets[2], { yPercent: -115, skewX: 10, duration: 0.35, ease: "power3.in" }, 2.4);
  tl.set(rule, { transformOrigin: "100% 50%" }, 2.4);
  tl.to(rule, { scaleX: 0, duration: 0.45, ease: "power3.inOut" }, 2.4);
  tl.to([ticks[0], ticks[1], ...tickLabels], { autoAlpha: 0, duration: 0.25 }, 2.4);
  tl.set(one("[data-s2]"), { autoAlpha: 1 }, 2.5);
  tl.set(ticks[2], { autoAlpha: 0 }, 2.55);
  tl.fromTo(caret1, { ...caretFrom }, { x: 0, y: 0, duration: 0.45, ease: "power3.inOut" }, 2.55);
  tl.set(one("[data-s1]"), { autoAlpha: 0 }, 2.9);

  // Scene 2 · Path · I CAME TO DESIGN THROUGH CODE.
  const carets = q("[data-caret]");
  const lines = q("[data-code-line]");
  const strikes = q("[data-strike]");
  tl.set(carets.slice(1), { autoAlpha: 0 }, 0);
  tl.set(strikes, { scaleX: 0, transformOrigin: "0 50%" }, 0);
  type(tl, "path0", 2.95);
  tl.to(strikes[0], { scaleX: 1, duration: 0.25 }, 3.5);
  tl.to(lines[0], { opacity: 0.3, duration: 0.25 }, 3.5);
  tl.set(carets[0], { autoAlpha: 0 }, 3.55);
  tl.set(carets[1], { autoAlpha: 1 }, 3.55);
  type(tl, "path1", 3.6);
  tl.to(strikes[1], { scaleX: 1, duration: 0.25 }, 4.05);
  tl.to(lines[1], { opacity: 0.3, duration: 0.25 }, 4.05);
  tl.set(carets[1], { autoAlpha: 0 }, 4.1);
  tl.set(carets[2], { autoAlpha: 1 }, 4.1);
  type(tl, "path2", 4.15);
  type(tl, "design", 4.4);

  // Mono "design" swells into the display word.
  const h2Design = one("[data-h2-design]");
  tl.fromTo(
    h2Design,
    { ...designFrom, transformOrigin: "0 0", autoAlpha: 0 },
    { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.75, ease: "expo.inOut" },
    4.75,
  );
  tl.to([one("[data-mono-design]"), carets[2]], { autoAlpha: 0, duration: 0.15 }, 4.78);
  tl.to(one("[data-code]"), { autoAlpha: 0, y: -24, duration: 0.4, ease: "power2.in" }, 4.85);
  tl.fromTo(q("[data-h2-line]"), { yPercent: 115 }, { yPercent: 0, duration: 0.6, ease: "expo.out", stagger: 0.08 }, 5.15);

  // 2 → 3: the headline whips out and leaves streaks on a black field.
  tl.to(one("[data-h2]"), { x: "-115vw", skewX: 28, filter: "blur(10px)", duration: 0.45, ease: "power3.in" }, 5.6);
  tl.set(one("[data-s3bg]"), { autoAlpha: 1, clipPath: "inset(0 0 0 100%)" }, 0);
  tl.to(one("[data-s3bg]"), { clipPath: "inset(0 0 0 0%)", duration: 0.5, ease: "power3.inOut" }, 5.6);
  tl.fromTo(
    q("[data-streak]"),
    { scaleX: 0, transformOrigin: "100% 50%", autoAlpha: 1 },
    { scaleX: 1, duration: 0.4, stagger: 0.015 },
    5.62,
  );
  tl.set(one("[data-s2]"), { autoAlpha: 0 }, 6.1);

  // Scene 3 · Character · I LEAD FROM THE FRONT.
  const field = one("[data-field]");
  tl.set(one("[data-s3]"), { autoAlpha: 1 }, 5.85);
  tl.fromTo(field, { rotateX: 66, yPercent: 0, autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "none" }, 5.85);
  tl.to(field, { yPercent: 22, duration: 3.1, ease: "power1.inOut" }, 5.85);
  tl.to(q("[data-streak]"), { autoAlpha: 0, duration: 0.4, stagger: 0.01 }, 6.0);
  tl.fromTo(
    q("[data-s3-line]"),
    { x: "45vw", skewX: -22, autoAlpha: 0 },
    { x: 0, skewX: 0, autoAlpha: 1, duration: 0.85, ease: "back.out(1.15)", stagger: 0.1 },
    6.15,
  );
  type(tl, "captain", 6.95, 0.025);

  // 3 → 4: the field flattens and the yard lines become the case-study rules.
  tl.to(q("[data-s3-line]"), { yPercent: -120, autoAlpha: 0, duration: 0.4, ease: "power3.in", stagger: 0.05 }, 8.15);
  tl.to(one("[data-captain]"), { autoAlpha: 0, duration: 0.25 }, 8.15);
  tl.to(field, { rotateX: 0, autoAlpha: 0, duration: 0.6, ease: "power3.inOut" }, 8.2);
  tl.set(one("[data-s4]"), { autoAlpha: 1, clipPath: "inset(0 0 100% 0)" }, 8.3);
  tl.to(one("[data-s4]"), { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.inOut" }, 8.3);
  tl.set([one("[data-s3]"), one("[data-s3bg]")], { autoAlpha: 0 }, 8.9);

  // Scene 4 · Work · SYSTEMS FOR FANDUEL, NEWS UK AND NUTMEG.
  const rowRules = q("[data-row-rule]");
  tl.fromTo(rowRules, { scaleX: 0, transformOrigin: "0 50%" }, { scaleX: 1, duration: 0.7, ease: "expo.out", stagger: 0.08 }, 8.65);
  tl.fromTo(q("[data-s4-line]"), { yPercent: 115 }, { yPercent: 0, duration: 0.6, ease: "expo.out", stagger: 0.08 }, 8.75);
  const years = { v: 0 };
  const yearsEl = one("[data-years]");
  tl.fromTo(
    years,
    { v: 0 },
    { v: 6, duration: 1.6, ease: "power2.out", onUpdate: () => { yearsEl.textContent = String(Math.round(years.v)); } },
    8.9,
  );
  tl.fromTo(q("[data-row-num]"), { yPercent: 115 }, { yPercent: 0, duration: 0.5, ease: "expo.out", stagger: 0.42 }, 9.1);
  tl.fromTo(q("[data-row-title]"), { yPercent: 115 }, { yPercent: 0, duration: 0.55, ease: "expo.out", stagger: 0.42 }, 9.16);
  tl.fromTo(q("[data-row-client]"), { autoAlpha: 0, x: 12 }, { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.42 }, 9.3);

  // 4 → 5: rows slide into one rule, and SYSTEMS carries over to the next line.
  tl.to(q("[data-row-num], [data-row-title], [data-row-client]"), { autoAlpha: 0, y: -10, duration: 0.3, stagger: 0.02 }, 11.5);
  tl.to(q("[data-s4-fade]"), { autoAlpha: 0, duration: 0.3 }, 11.5);
  rowRules.forEach((r, i) => tl.to(r, { y: ruleShift[i], duration: 0.5, ease: "power3.inOut" }, 11.6));
  tl.set(rowRules, { transformOrigin: "50% 50%" }, 12.1);
  tl.to(rowRules, { scaleX: 0, duration: 0.35, ease: "power3.in" }, 12.1);

  // Scene 5 · Belief · SYSTEMS WORK IS PEOPLE WORK.
  tl.set(one("[data-s5]"), { autoAlpha: 1 }, 11.85);
  tl.set(one("[data-s4-systems]"), { autoAlpha: 0 }, 11.85);
  tl.fromTo(
    one("[data-s5-systems]"),
    { ...systemsFrom, transformOrigin: "0 0" },
    { x: 0, y: 0, scale: 1, duration: 0.75, ease: "expo.inOut" },
    11.85,
  );
  tl.set(one("[data-s4]"), { autoAlpha: 0 }, 12.5);
  tl.fromTo(q("[data-s5-line]"), { yPercent: 115 }, { yPercent: 0, duration: 0.6, ease: "expo.out", stagger: 0.1 }, 12.45);
  tl.fromTo(
    one("[data-people]"),
    { clipPath: "inset(0 100% 0 0)" },
    { clipPath: "inset(0 0% 0 0)", duration: 0.65, ease: "power4.inOut" },
    13.3,
  );
  type(tl, "agents", 13.95, 0.022);

  // 5 → 6: the MPG monogram rises and the sentence drains into it.
  tl.fromTo(one("[data-mpg]"), { autoAlpha: 0, scale: 1.12 }, { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power2.out" }, 14.55);
  tl.to(one("[data-s5]"), { autoAlpha: 0, scale: 0.96, filter: "blur(6px)", duration: 0.45, ease: "power2.in" }, 14.7);

  // Scene 6 · Lockup · the redesigned Hero.
  tl.set(one("[data-s6]"), { autoAlpha: 1 }, 15.1);
  type(tl, "label", 15.1, 0.018);
  tl.fromTo(q("[data-s6-line]"), { yPercent: 115 }, { yPercent: 0, duration: 0.85, ease: "expo.out", stagger: 0.1 }, 15.3);
  tl.to(one("[data-mpg]"), { autoAlpha: 0, duration: 0.9, ease: "power2.inOut" }, 15.8);
  tl.fromTo(q("[data-s6-fade]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12 }, 16.05);
  tl.to(one("[data-skip]"), { autoAlpha: 0, duration: 0.3 }, 16.9);
  tl.set({}, {}, 17.5);

  return tl;
}

export default function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [run, setRun] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let ctx: gsap.Context | undefined;
    let cancelled = false;
    setDone(false);

    // Layout is measured at build time, so wait for the display face first.
    Promise.all([
      document.fonts.load('italic 900 64px "Zalando Sans Expanded"'),
      document.fonts.ready,
    ]).then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const tl = buildTimeline(root);
        tl.eventCallback("onComplete", () => setDone(true));
        tlRef.current = tl;        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) tl.progress(1);
      }, root);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [run]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 overflow-hidden bg-white font-sans text-neutral-900"
      aria-label="Intro: Matias Peinado Greco"
    >
      {/* Scene 3 background, revealed by the whip */}
      <div data-s3bg className="invisible absolute inset-0 bg-black" />

      {/* Scene 1 · Roots */}
      <div data-s1 className="invisible absolute inset-0">
        <div className="absolute left-gutter right-gutter top-[60%]">
          <div className="absolute bottom-48 left-0 h-[1.25em] w-full overflow-hidden font-expanded text-intro-giant uppercase">
            {ROUTE.map((r) => (
              <div key={r.code} data-greet className="absolute bottom-0 left-0 whitespace-nowrap">
                {r.word}
              </div>
            ))}
          </div>
          <div data-rule className="h-1 w-full bg-teal" />
          {ROUTE.map((r, i) => (
            <div
              key={r.code}
              className={`absolute top-0 ${i === 0 ? "left-0" : i === 1 ? "left-1/2" : "right-0"}`}
            >
              <div data-tick className="h-24 w-1 -translate-y-1/2 bg-teal" />
              <div
                data-tick-label
                className={`absolute top-16 font-kode text-caption-sm uppercase text-teal ${i === 2 ? "right-0" : "left-0"}`}
              >
                {r.code}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scene 2 · Path */}
      <div data-s2 className="invisible absolute inset-0">
        <div data-code className="absolute left-gutter top-[28%] font-kode text-intro-code">
          {PATH.map((p, i) => (
            <div key={p} data-code-line className="relative w-fit whitespace-pre">
              <span className="text-teal">{"> "}</span>
              <Chars text={p} hook={`path${i}`} />
              {i === 2 && (
                <span data-mono-design className="inline-block">
                  <Chars text="design" hook="design" />
                </span>
              )}
              <span data-caret className="ml-4 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-teal" />
              {i < 2 && <span data-strike className="absolute left-0 right-0 top-1/2 h-1 bg-neutral-900" />}
            </div>
          ))}
        </div>
        <div data-h2 className="absolute left-gutter top-[46%] font-expanded text-intro-xl uppercase">
          <div className="overflow-hidden pb-[0.06em]">
            <div data-h2-line>I came to</div>
          </div>
          <div className="pb-[0.06em]">
            <span data-h2-design className="inline-block">
              Design
            </span>
          </div>
          <div className="overflow-hidden pb-[0.06em]">
            <div data-h2-line>through code.</div>
          </div>
        </div>
      </div>

      {/* Streaks left by the whip */}
      <div className="pointer-events-none absolute inset-0">
        {STREAKS.map((top) => (
          <div key={top} data-streak className="invisible absolute left-0 right-0 h-1 bg-white" style={{ top: `${top}%` }} />
        ))}
      </div>

      {/* Scene 3 · Character */}
      <div data-s3 className="invisible absolute inset-0 text-white">
        <div className="absolute inset-0 overflow-hidden [perspective:700px]">
          <div data-field className="absolute -left-1/2 -right-1/2 bottom-0 h-[320%] origin-bottom">
            {YARDS.map((y, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-1 bg-white/40"
                style={{ top: `${(i / YARDS.length) * 100}%` }}
              >
                <span className="absolute left-[30%] top-8 font-kode text-intro-md text-white/40">{y}</span>
                <span className="absolute right-[30%] top-8 font-kode text-intro-md text-white/40">{y}</span>
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black via-black/90 to-black/0" />
        </div>
        <div className="absolute bottom-[16%] left-gutter font-expanded text-intro-xl uppercase">
          <div data-s3-line>I lead from</div>
          <div data-s3-line>the front.</div>
          <div data-captain className="mt-24 font-kode text-caption-sm uppercase tracking-widest text-white/60">
            <Chars text="Captain · American football" hook="captain" />
          </div>
        </div>
      </div>

      {/* Scene 4 · Work */}
      <div data-s4 className="invisible absolute inset-0 bg-white px-gutter pt-[12vh]">
        <div className="flex items-end justify-between gap-24">
          <div className="font-expanded text-intro-lg uppercase">
            <div className="overflow-hidden pb-[0.06em]">
              <div data-s4-line>
                <span data-s4-systems className="inline-block">
                  Systems
                </span>{" "}
                <span data-s4-fade>for FanDuel,</span>
              </div>
            </div>
            <div className="overflow-hidden pb-[0.06em]" data-s4-fade>
              <div data-s4-line>News UK and Nutmeg.</div>
            </div>
          </div>
          <div data-s4-fade className="shrink-0 font-kode text-caption-sm uppercase tracking-widest text-teal">
            <span data-years>0</span>+ years
          </div>
        </div>
        <div data-list className="mt-[6vh]">
          {WORK.map((w) => (
            <div key={w.n} className="relative flex items-center gap-24 py-[1.4vh]">
              <div data-row-rule className="absolute left-0 right-0 top-0 h-1 bg-neutral-300" />
              <div className="w-[1.5em] shrink-0 overflow-hidden font-expanded text-intro-ghost">
                <div data-row-num className="text-neutral-200">
                  {w.n}
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div data-row-title className="font-expanded text-intro-md uppercase">
                  {w.title}
                </div>
              </div>
              <div data-row-client className="font-kode text-caption-sm uppercase tracking-widest text-teal max-md:hidden">
                {w.client}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MPG monogram, behind scenes 5 and 6 */}
      <div
        data-mpg
        className="invisible pointer-events-none absolute inset-0 flex select-none items-center justify-center font-expanded text-intro-monogram text-neutral-200"
        aria-hidden
      >
        MPG
      </div>

      {/* Scene 5 · Belief */}
      <div data-s5 className="invisible absolute inset-0 flex flex-col justify-center px-gutter">
        <div className="font-expanded text-intro-xl uppercase">
          <div className="pb-[0.06em]">
            <span data-s5-systems className="inline-block">
              Systems
            </span>{" "}
            <span className="inline-block overflow-hidden align-bottom">
              <span data-s5-line className="inline-block">
                work
              </span>
            </span>
          </div>
          <div className="overflow-hidden pb-[0.06em]">
            <div data-s5-line>
              is{" "}
              <span className="relative inline-block">
                Systems
                <span data-people className="absolute inset-0 bg-teal text-center text-white">
                  People
                </span>
              </span>
            </div>
          </div>
          <div className="overflow-hidden pb-[0.06em]">
            <div data-s5-line>work.</div>
          </div>
        </div>
        <div className="mt-32 font-kode text-intro-mono text-neutral-500">
          <Chars text="// and, increasingly, agents." hook="agents" />
        </div>
      </div>

      {/* Scene 6 · Lockup (redesigned Hero) */}
      <div data-s6 className="invisible absolute inset-0 flex flex-col justify-center px-gutter">
        <div className="mb-24 h-[17px] font-kode text-caption-sm uppercase tracking-widest text-teal">
          <Chars text="Product Design / Design Systems" hook="label" />
        </div>
        <h1 className="font-expanded text-intro-hero uppercase">
          <div className="overflow-hidden pb-[0.06em]">
            <div data-s6-line>Matias</div>
          </div>
          <div className="overflow-hidden pb-[0.06em]">
            <div data-s6-line>Peinado Greco</div>
          </div>
        </h1>
        <p data-s6-fade className="mt-32 max-w-lg text-body-lg font-light text-neutral-600">
          I design products and the systems behind them, working at the intersection of craft and strategy. 6+ years
          building design infrastructure that scales and product experiences used by millions.
        </p>
        <div data-s6-fade className="mt-40 flex items-center gap-24">
          <a href="#work" className="rounded bg-teal px-24 py-12 font-kode text-caption-sm uppercase tracking-widest text-white">
            View work
          </a>
          <a href="#about" className="font-kode text-caption-sm uppercase tracking-widest text-teal">
            About me →
          </a>
        </div>
      </div>

      {/* Grain sits over everything */}
      <div className="intro-grain pointer-events-none absolute inset-0" />

      {/* Controls */}
      <div className="absolute bottom-24 right-gutter flex gap-24 font-kode text-caption-sm uppercase tracking-widest">
        {done ? (
          <button key="replay" type="button" onClick={() => setRun((r) => r + 1)} className="text-neutral-500 hover:text-teal">
            Replay ↺
          </button>
        ) : (
          <button
            key="skip"
            type="button"
            data-skip
            onClick={() => tlRef.current?.progress(1)}
            className="text-neutral-500 hover:text-teal"
          >
            Skip →
          </button>
        )}
      </div>
    </div>
  );
}
