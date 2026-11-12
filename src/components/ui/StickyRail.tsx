"use client";

import { useEffect, useRef, type ReactNode } from "react";

const TOP = 96; // gap below the header when the whole rail fits on screen
const BOTTOM = 32;
const CAP_GAP = 4; // space between the header and the top of the anchor's capital letters

/** Distance from the top of an element's line box to the top of its capital letters. */
function capTopOffset(el: HTMLElement) {
  const cs = getComputedStyle(el);
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return 0;
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const m = ctx.measureText("M");
  const lineHeight = parseFloat(cs.lineHeight) || m.fontBoundingBoxAscent + m.fontBoundingBoxDescent;
  const halfLeading = (lineHeight - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2;
  return halfLeading + (m.fontBoundingBoxAscent - m.actualBoundingBoxAscent);
}

/**
 * Sticky side rail that never gets cut off. If the rail fits the viewport it pins below the
 * header. If not, it scrolls with the page until its last item reaches the bottom of the
 * screen, then stays pinned there. The pin point is capped so the element marked
 * `data-rail-anchor` (the MPG wordmark) never sits lower than just under the header. Everything
 * above it (the portrait) is fully scrolled out instead of cropped.
 */
export default function StickyRail({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const fit = window.innerHeight - el.offsetHeight - BOTTOM;
      let top = TOP;
      if (fit < TOP) {
        const anchor = el.querySelector<HTMLElement>("[data-rail-anchor]");
        const header = document.querySelector("header");
        let anchorTop = -Infinity;
        if (anchor) {
          const anchorOffset = anchor.getBoundingClientRect().top - el.getBoundingClientRect().top;
          anchorTop = (header?.offsetHeight ?? 0) + CAP_GAP - capTopOffset(anchor) - anchorOffset;
        }
        top = Math.min(fit, anchorTop);
      }
      el.style.setProperty("--rail-top", `${top}px`);
    };
    update();
    document.fonts.ready.then(update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <aside ref={ref} className={`lg:sticky lg:top-[var(--rail-top,96px)] lg:self-start ${className}`}>
      {children}
    </aside>
  );
}
