"use client";

import { useEffect, useState } from "react";
import Arrow from "@/components/ui/Arrow";

// Floating "back to top" button for case studies. Appears once the page has scrolled past the first screen.
// Styled like the Button outline variant. Smooth scrolling (and its reduced-motion override) comes from globals.css.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0 })}
      className={`group fixed bottom-16 right-16 z-30 flex h-[44px] w-[44px] items-center justify-center border border-subtle bg-surface text-primary shadow-2 transition-[opacity,border-color,transform] duration-150 ease-out hover:border-accent active:scale-[0.98] md:bottom-24 md:right-24 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <Arrow direction="up" />
    </button>
  );
}
