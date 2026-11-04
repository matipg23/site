"use client";

import { useEffect, useRef, useState } from "react";

// Stagger steps for items in a row: delay={0..4}
const delays = ["", "delay-75", "delay-150", "delay-200", "delay-300"];

// Fades and lifts its children in once, the first time they enter the viewport.
// Content is visible without JS and under prefers-reduced-motion.
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at load: leave it alone rather than flash it out and back in
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const motion =
    state === "hidden"
      ? "translate-y-12 opacity-0"
      : state === "shown"
        ? `translate-y-0 opacity-100 transition-[opacity,transform] duration-500 ease-out ${delays[delay] ?? ""}`
        : "";

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`${motion} ${className}`}
    >
      {children}
    </Tag>
  );
}
