"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

type Row = {
  name: string; // CSS variable, e.g. --background-page
  maps: string; // what it points at, e.g. "white" or "white 15%" or "10px"
  value: string; // resolved value, e.g. #ffffff
  kind: "colour" | "radius" | "plain";
};
// both: Maps to + Value. value: Value only. maps: Maps to only.
type Group = { title: string; cols: "both" | "value" | "maps"; rows: Row[] };

// Groups are read from tokens.css by prefix, so new semantic tokens (and, later, brand themes) appear without edits here.
const groups: { title: string; prefix: string; kind: Row["kind"]; cols: Group["cols"] }[] = [
  { title: "Background", prefix: "--background-", kind: "colour", cols: "both" },
  { title: "Text", prefix: "--text-", kind: "colour", cols: "both" },
  { title: "Border", prefix: "--border-", kind: "colour", cols: "both" },
  { title: "Action", prefix: "--action-", kind: "colour", cols: "both" },
  { title: "Nav", prefix: "--nav-", kind: "colour", cols: "both" },
  { title: "Radius", prefix: "--radius-", kind: "radius", cols: "value" },
  { title: "Spacing", prefix: "--space-", kind: "plain", cols: "value" },
];

// Font families follow the active BRICKS theme (--bricks-font-*), shown as the first family in the stack
function fontRows(): Row[] {
  const cs = getComputedStyle(document.documentElement);
  return ["display", "highlight", "body", "mono"].map((n) => ({
    name: `--font-${n}`,
    maps: cs.getPropertyValue(`--bricks-font-${n}`).split(",")[0].replace(/["']/g, "").trim(),
    value: "",
    kind: "plain" as const,
  }));
}

// Declared (unresolved) value of a custom property for the active theme and mode.
// BRICKS variables live in per-theme blocks (light, then a dark override); site aliases live on :root.
function declared(name: string, theme: string, dark: boolean): string {
  let light = "";
  let darkValue = "";
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule)) continue;
      const v = rule.style.getPropertyValue(name).trim();
      if (!v) continue;
      const sel = rule.selectorText;
      if (name.startsWith("--bricks-")) {
        if (!sel.includes(`[data-theme="${theme}"]`)) continue;
        if (sel.includes('[data-mode="dark"]')) darkValue = v;
        else light = v;
      } else if (sel.startsWith(":root")) {
        light = v;
      }
    }
  }
  return dark && darkValue ? darkValue : light;
}

// Follow var() aliases down to a core palette step: "var(--nav-text)" -> bricks-content-subtle -> core-neutral-500
function describe(name: string, theme: string, dark: boolean): string {
  let v = declared(name, theme, dark);
  for (let hops = 0; hops < 6; hops++) {
    const mix = v.match(/^color-mix\(.*var\((--[\w-]+)\)\s+(\d+)%/);
    if (mix) return `${mix[1].replace("--primitive-", "")} ${mix[2]}%`;
    const alias = v.match(/^var\((--[\w-]+)\)$/);
    if (!alias) return v;
    if (alias[1].startsWith("--primitive-")) return alias[1].replace("--primitive-", "");
    if (alias[1].startsWith("--bricks-core-")) return alias[1].replace("--bricks-", "");
    v = declared(alias[1], theme, dark);
  }
  return v;
}

// Solid tokens show their hex; translucent ones (color-mix) show the base hex and opacity
function shown(v: string): string {
  const s = v.trim().toLowerCase();
  const mix = s.match(/^color-mix\(.*?,\s*(#[0-9a-f]{3,8})\s+(\d+)%/);
  return mix ? `${mix[1]} ${mix[2]}%` : s;
}

function readGroups(): Group[] {
  const theme = document.documentElement.dataset.theme ?? "default";
  const dark = document.documentElement.dataset.mode === "dark";
  const computed = getComputedStyle(document.documentElement);
  const names = new Set<string>();
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule)) continue;
      if (!rule.selectorText.startsWith(":root")) continue;
      for (const prop of Array.from(rule.style)) if (prop.startsWith("--") && !prop.startsWith("--primitive-")) names.add(prop);
    }
  }
  const out: Group[] = groups.map((g) => ({
    title: g.title,
    cols: g.cols,
    rows: [...names]
      .filter((n) => n.startsWith(g.prefix))
      .map((name) => ({
        name,
        maps: g.cols === "both" ? describe(name, theme, dark) : "",
        value: g.cols === "both" ? shown(computed.getPropertyValue(name)) : describe(name, theme, dark),
        kind: g.kind,
      })),
  }));
  out.push({ title: "Type", cols: "maps", rows: fontRows() });
  return out.filter((g) => g.rows.length > 0);
}

// Figma: "Sidebar - Token proof", opened from "Inspect" in the footer ("Themed by its own tokens · Inspect").
// Lists every semantic token with what it points at, read live from tokens.css for the active theme.
// label and down let a second trigger reuse the panel: the case study sub-bar opens it downwards.
export default function TokenInspector({ label = "Inspect", down = false }: { label?: string; down?: boolean }) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Group[]>([]);
  const ref = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    setData(readGroups());
    const themeWatch = new MutationObserver(() => setData(readGroups()));
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-mode"] });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
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
  }, [open, close]);

  return (
    // Not positioned: the panel anchors to the footer container so it stays on screen at every width
    <span ref={ref}>
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={label === "Inspect" ? "Inspect design tokens" : undefined}
        onClick={() => setOpen((o) => !o)}
        className={`lg:uppercase underline decoration-transparent underline-offset-4 transition-colors duration-150 hover:text-accent hover:decoration-current ${
          open ? "text-accent decoration-current" : ""
        }`}
      >
        {label}
      </button>

      {/* Opens upwards by default (the trigger sits in the footer); down opens it below a sticky bar */}
      <div
        id={panelId}
        role="region"
        aria-label="Design tokens"
        className={`${open ? "flex" : "hidden"} absolute ${down ? "top-[calc(100%+12px)]" : "bottom-[calc(100%+12px)]"} right-16 z-30 max-h-[min(calc(100svh-240px),720px)] w-[min(607px,calc(100vw-32px))] flex-col border border-default bg-surface normal-case tracking-normal text-primary shadow-2 md:right-32`}
      >
        <div className="flex items-start justify-between gap-16 p-24 pb-16">
          <div>
            <p className="type-mono-sm-bold uppercase text-accent">This page runs on tokens</p>
            <p className="type-body-sm pt-8 text-primary">
              Switch the theme in the nav. Every element points at a semantic token, so a new theme is one mapping, not
              a redesign.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close token inspector"
            className="type-body-md -mr-4 -mt-4 p-4 text-primary transition-colors duration-150 hover:text-accent"
          >
            ✕
          </button>
        </div>

        <details open className="min-h-0 overflow-y-auto overflow-x-hidden px-24 pb-24">
          <summary className="type-mono-sm cursor-pointer select-none text-primary">See the mapping</summary>
          <div className="type-mono-xs pt-16 tracking-normal">
            {data.map((g) => {
              // One data column (value or maps): right-aligned. Colour groups: Maps to + Value, Value hidden on phones.
              const grid =
                g.cols === "both"
                  ? "grid-cols-[minmax(0,1fr)_minmax(0,136px)] sm:grid-cols-[minmax(0,1fr)_136px_100px]"
                  : "grid-cols-[minmax(0,1fr)_auto]";
              return (
              <section key={g.title} className="pb-16">
                <div className={`grid ${grid} gap-x-16 border-b border-default pb-8 text-primary`}>
                  <h3 className="type-mono-xs-bold uppercase">{g.title}</h3>
                  {g.cols === "both" && <span>Maps to</span>}
                  <span className={g.cols === "both" ? "hidden text-right sm:block" : "text-right"}>
                    {g.cols === "maps" ? "Maps to" : "Value"}
                  </span>
                </div>
                <ul>
                  {g.rows.map((r) => (
                    <li
                      key={r.name}
                      className={`grid ${grid} items-center gap-x-16 border-b border-default py-8`}
                    >
                      <span className="flex min-w-0 items-center gap-8">
                        {r.kind === "colour" && (
                          // Live swatch: the colour comes from the token itself, so it follows the active theme
                          <span
                            aria-hidden
                            className="h-[14px] w-[14px] shrink-0 rounded-xs border border-default"
                            style={{ background: `var(${r.name})` }}
                          />
                        )}
                        {r.kind === "radius" && (
                          <span
                            aria-hidden
                            className="h-[14px] w-[14px] shrink-0 border border-strong"
                            style={{ borderRadius: `var(${r.name})` }}
                          />
                        )}
                        <span className="truncate">{r.name}</span>
                      </span>
                      {g.cols === "both" && <span className="truncate">{r.maps}</span>}
                      <span className={g.cols === "both" ? "hidden text-right sm:block" : "text-right"}>
                        {g.cols === "maps" ? r.maps : r.value.startsWith("#") ? r.value.toUpperCase() : r.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
              );
            })}
          </div>
        </details>
      </div>
    </span>
  );
}
