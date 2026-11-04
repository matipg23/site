"use client";

import Image from "next/image";
import { useState } from "react";

// Figma: Case 03 > "A file organised for handoff": main image, prev/next, counter, thumbnail strip
export default function Gallery({
  slides,
  width,
  height,
}: {
  slides: { src: string; alt: string; caption?: string }[];
  width: number;
  height: number;
}) {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const go = (i: number) => setIndex((i + total) % total);
  // Relative moves read the latest index, so fast repeated clicks all count
  const step = (delta: number) => setIndex((i) => (i + delta + total) % total);
  const pad = (n: number) => String(n).padStart(2, "0");
  const current = slides[index];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Handoff file pages"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      className="flex flex-col gap-16"
    >
      <div className="relative overflow-hidden border border-subtle bg-surface">
        {slides.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={width}
            height={height}
            aria-hidden={i !== index}
            className={`w-full transition-opacity duration-300 ease-out ${
              i === index ? "relative opacity-100" : "absolute inset-0 opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="flex items-center gap-12">
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => step(-1)}
          className="type-mono-xs flex h-[36px] w-[36px] items-center justify-center border border-default text-secondary transition-colors duration-150 hover:border-accent hover:text-accent active:scale-95"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next page"
          onClick={() => step(1)}
          className="type-mono-xs flex h-[36px] w-[36px] items-center justify-center border border-default text-secondary transition-colors duration-150 hover:border-accent hover:text-accent active:scale-95"
        >
          →
        </button>
        <p aria-live="polite" className="type-mono-xs pl-8 text-secondary">
          {pad(index + 1)} / {pad(total)}
          {current.caption && <>&nbsp;&nbsp; {current.caption}</>}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-12 md:grid-cols-8">
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
