"use client";

import Image from "next/image";
import { useState } from "react";

// Figma: Case 03 > "A file organised for handoff": slide shown inside a laptop frame, round prev/next
// buttons with dots and a counter, then the thumbnail strip.
// `screenClass` positions the slide over the frame's screen (percentages of the frame image).
export default function Gallery({
  slides,
  width,
  height,
  frame,
}: {
  slides: { src: string; alt: string; caption?: string }[];
  width: number;
  height: number;
  frame: { src: string; width: number; height: number; screenClass: string };
}) {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const go = (i: number) => setIndex((i + total) % total);
  // Relative moves read the latest index, so fast repeated clicks all count
  const step = (delta: number) => setIndex((i) => (i + delta + total) % total);
  const pad = (n: number) => String(n).padStart(2, "0");
  const current = slides[index];
  const arrow =
    "type-mono-xs flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border border-default text-secondary transition-colors duration-150 hover:border-accent hover:text-accent active:scale-95";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Handoff file pages"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      className="flex flex-col gap-[14px] py-24 md:py-40"
    >
      <div className="relative mx-auto w-full max-w-[1042px]">
        <Image src={frame.src} alt="" width={frame.width} height={frame.height} priority={false} className="h-auto w-full" />
        <div className={`absolute overflow-hidden bg-white ${frame.screenClass}`}>
          {slides.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={s.alt}
              width={width}
              height={height}
              aria-hidden={i !== index}
              className={`h-full w-full object-contain transition-opacity duration-300 ease-out ${
                i === index ? "relative opacity-100" : "absolute inset-0 opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-12">
        <button type="button" aria-label="Previous page" onClick={() => step(-1)} className={arrow}>
          ←
        </button>
        <div className="flex items-center">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Show page ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className="flex h-24 w-[16px] items-center justify-center"
            >
              <span
                className={`h-8 w-8 rounded-full transition-colors duration-200 ${
                  i === index ? "bg-action-accent" : "bg-border-default"
                }`}
              />
            </button>
          ))}
        </div>
        <button type="button" aria-label="Next page" onClick={() => step(1)} className={arrow}>
          →
        </button>
        <p aria-live="polite" className="type-mono-xs w-full pt-8 text-secondary md:w-auto md:flex-1 md:pt-0 md:text-right">
          {pad(index + 1)} / {pad(total)}
          {current.caption && <>&nbsp;&nbsp; {current.caption}</>}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-12 md:auto-cols-fr md:grid-flow-col">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show page ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={`border transition-[opacity,border-color] duration-200 ${
              i === index ? "border-accent opacity-100" : "border-subtle opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={s.src} alt="" width={320} height={180} className="w-full" />
          </button>
        ))}
      </div>
    </div>
  );
}
