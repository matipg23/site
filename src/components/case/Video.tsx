"use client";

import { useEffect, useRef, useState } from "react";

// Silent looping screen recording with a visible pause/play button (WCAG 2.2.2).
// Autoplays, except for visitors who ask for reduced motion: they get the poster and a play button.
export default function Video({
  src,
  poster,
  label,
  width,
  height,
  className = "",
}: {
  src: string;
  poster?: string;
  label: string;
  width: number;
  height: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      setPlaying(false);
    } else {
      // If the browser blocks autoplay, the button falls back to "Play"
      v.play().catch(() => setPlaying(false));
    }
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => setPlaying(false));
    else v.pause();
  }

  return (
    <div className="relative">
      <video
        ref={ref}
        src={src}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={`h-auto w-full border border-default bg-surface ${className}`}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause video: ${label}` : `Play video: ${label}`}
        className="absolute bottom-12 right-12 flex h-[36px] w-[36px] items-center justify-center rounded-full border border-default bg-page text-primary shadow-1 transition-colors duration-150 hover:border-accent hover:text-accent active:scale-95"
      >
        <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          {playing ? (
            <>
              <rect x="2.5" y="2" width="3" height="10" />
              <rect x="8.5" y="2" width="3" height="10" />
            </>
          ) : (
            <path d="M3.5 1.8v10.4L12 7z" />
          )}
        </svg>
      </button>
    </div>
  );
}
