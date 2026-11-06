"use client";

import { useEffect, useRef } from "react";

// Figma: "Now card": a glass shell around a raised core.
// Hover or keyboard focus lights it: a spotlight and edge light follow the cursor (styles: .now-card in globals.css).
export default function NowCard() {
  const card = useRef<HTMLElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });

  const paint = () => {
    card.current?.style.setProperty("--mx", `${pos.current.x}px`);
    card.current?.style.setProperty("--my", `${pos.current.y}px`);
  };

  // Ease the light toward the pointer so it trails slightly. Reduced motion jumps straight to it.
  const tick = () => {
    const p = pos.current;
    const k = matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 0.14;
    p.x += (p.tx - p.x) * k;
    p.y += (p.ty - p.y) * k;
    paint();
    p.raf = Math.abs(p.tx - p.x) > 0.3 || Math.abs(p.ty - p.y) > 0.3 ? requestAnimationFrame(tick) : 0;
  };

  const follow = () => {
    if (!pos.current.raf) pos.current.raf = requestAnimationFrame(tick);
  };

  const local = (e: React.PointerEvent) => {
    const r = card.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  useEffect(() => () => cancelAnimationFrame(pos.current.raf), []);

  return (
    <aside
      ref={card}
      tabIndex={0}
      aria-label="Current role"
      className="now-card w-full shrink-0 rounded-xl border border-default bg-overlay-transparent p-[6px] sm:max-w-[314px]"
      onPointerEnter={(e) => {
        // start the light where the cursor enters
        const p = pos.current;
        const { x, y } = local(e);
        p.x = p.tx = x;
        p.y = p.ty = y;
        paint();
      }}
      onPointerMove={(e) => {
        const { x, y } = local(e);
        pos.current.tx = x;
        pos.current.ty = y;
        follow();
      }}
      onFocus={() => {
        // keyboard focus: centre the light
        const r = card.current!.getBoundingClientRect();
        pos.current.tx = r.width / 2;
        pos.current.ty = r.height / 2;
        follow();
      }}
    >
      <div className="now-card__core flex flex-col gap-20 rounded-lg bg-page p-24 shadow-2">
        <div className="flex items-center justify-between gap-8">
          <p className="type-mono-xs-med-upper inline-flex items-center gap-8 bg-overlay px-12 py-[6px] text-primary">
            <span aria-hidden className="now-card__dot h-[6px] w-[6px] rounded-full bg-online" />
            Now
          </p>
          <p className="type-mono-xs-upper text-secondary">FanDuel · Remote UK</p>
        </div>
        <p className="type-body-md text-primary">
          Leading Formation, FanDuel’s multi-brand design system, across five product verticals.
        </p>
      </div>
    </aside>
  );
}
