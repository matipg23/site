"use client";

import { useEffect, useState } from "react";
import TokenInspector from "@/components/ui/TokenInspector";

type Guest = "bluefield" | "paperboy" | "rangergreen";

// Figma: components > theme-bar (state off / on, theme bluefield / paperboy / rangergreen).
// A sticky sub-bar for case studies: section anchors on the left, a switch that applies the case's own theme on the
// right. It is zero height in flow (absolute inside a sticky wrapper), so it never shifts the hero.
// The theme goes on <html> so the whole page, header and footer included, follows it. It is not stored and is
// reset to "default" when the page is left. The mode (light or dark) is never touched here.
export default function ThemeBar({
  theme,
  anchors,
}: {
  theme: Guest;
  anchors: { id: string; label: string }[];
}) {
  const [on, setOn] = useState(false);
  const [active, setActive] = useState(anchors[0]?.id);

  useEffect(() => {
    if (!on) return;
    document.documentElement.dataset.theme = theme;
    return () => {
      document.documentElement.dataset.theme = "default";
    };
  }, [on, theme]);

  // Highlight the last anchor whose section has reached the bottom of the header and bar
  useEffect(() => {
    const update = () => {
      let current = anchors[0]?.id;
      for (const a of anchors) {
        const el = document.getElementById(a.id);
        if (el && el.getBoundingClientRect().top <= 160) current = a.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [anchors]);

  const chip = (
    // The chip carries its own data-theme, so it shows that brand's real primary whatever the page is using
    <span
      aria-hidden
      data-theme={theme}
      className="h-[14px] w-[14px] shrink-0 border border-default bg-[var(--bricks-brand-primary)]"
    />
  );

  return (
    <div className="sticky top-64 z-30 h-0">
      <div className="absolute inset-x-0 top-0 bg-page">
        <div className="border-b border-default">
          <div className="container-page relative flex h-56 items-center justify-between">
            <nav aria-label="On this page" className="hidden md:block">
              <ul className="type-mono-xs-upper flex items-center gap-32">
                {anchors.map((a) => (
                  <li key={a.id}>
                    <a
                      href={`#${a.id}`}
                      aria-current={active === a.id ? "location" : undefined}
                      className="text-secondary transition-colors duration-150 hover:text-primary aria-[current=location]:type-mono-xs-med-upper aria-[current=location]:text-accent"
                    >
                      {a.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-20">
              {on && (
                // The panel trigger underlines on hover in the footer; here it is always underlined, as in Figma
                <span className="type-mono-xs-med-upper text-accent [&_button]:decoration-current">
                  <TokenInspector label="Inspect tokens ↗" down />
                </span>
              )}
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setOn((v) => !v)}
                className={`type-mono-xs-med-upper flex items-center gap-[10px] border border-default px-[14px] py-8 text-primary transition-colors duration-150 hover:border-accent ${
                  on ? "bg-surface" : ""
                }`}
              >
                {chip}
                {on ? "Reset theme" : "Apply product theme"}
              </button>
            </div>
          </div>
        </div>

        {on && (
          <div className="bg-surface">
            <p className="type-mono-xs-upper container-page py-8 text-secondary">
              Product theme reference applied. Unofficial recreation, built from
              tokens. This page only.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
