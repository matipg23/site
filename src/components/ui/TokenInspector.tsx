"use client";

import { useEffect, useRef, useState } from "react";

// Semantic tokens shown in the panel, by CSS variable (Figma path minus "semantic/")
const shown = ["background-page", "text-primary", "action-accent"];

type Row = { token: string; primitive: string; hex: string };

// Reads the live values from tokens.css, so the panel follows the active theme
function readTokens(): Row[] {
  const root = getComputedStyle(document.documentElement);
  const primitives: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule)) continue;
      for (const prop of Array.from(rule.style)) {
        if (prop.startsWith("--primitive-") && !primitives.includes(prop)) primitives.push(prop);
      }
    }
  }
  const value = (name: string) => root.getPropertyValue(name).trim().toLowerCase();
  return shown.map((t) => {
    const hex = value(`--${t}`);
    const primitive = primitives.find((p) => value(p) === hex);
    return {
      token: t.replace("-", "/"),
      primitive: primitive ? primitive.replace("--primitive-", "") : "",
      hex: hex.toUpperCase(),
    };
  });
}

// Figma: HOME > "Sidebar - Token proof", opened from the "/>" button in the hero
export default function TokenInspector() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setRows(readTokens());
    const themeWatch = new MutationObserver(() => setRows(readTokens()));
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      themeWatch.disconnect();
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    // Static on phones so the panel anchors to the parent row and stays on screen
    <div ref={ref} className="sm:relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="token-inspector"
        aria-label="Inspect design tokens"
        onClick={() => setOpen((o) => !o)}
        className={`type-body-md flex h-[33px] w-32 items-center justify-center rounded border bg-page transition-colors duration-150 ${
          open
            ? "border-accent text-action-accent"
            : "border-default text-secondary hover:border-accent hover:text-action-accent"
        }`}
      >
        /&gt;
      </button>

      <div
        id="token-inspector"
        role="region"
        aria-label="Design tokens"
        hidden={!open}
        className="absolute left-0 top-[calc(100%+12px)] sm:left-auto sm:right-0 z-30 w-[min(607px,calc(100vw-32px))] origin-top-right border border-default bg-surface p-24"
      >
        <p className="type-mono-sm-bold uppercase text-accent">This page runs on tokens</p>
        <p className="type-body-sm pt-8 text-secondary">
          Switch the theme above. Every element points at a semantic token, so a new theme is one mapping, not a
          redesign.
        </p>
        <ul className="pt-20">
          {rows.map((r) => (
            <li key={r.token} className="flex items-center gap-12 border-t border-default py-12">
              <span className={`h-[22px] w-[22px] shrink-0 border border-default ${swatch[r.token]}`} />
              <span className="type-mono-xs flex-1 text-primary">{r.token}</span>
              <span className="type-mono-xs hidden text-secondary sm:inline">→ {r.primitive}</span>
              <span className="type-mono-xs w-[72px] text-right text-secondary">{r.hex}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Static class names so Tailwind generates them
const swatch: Record<string, string> = {
  "background/page": "bg-page",
  "text/primary": "bg-inverse",
  "action/accent": "bg-action-accent",
};
