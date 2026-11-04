"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

// Sun / switch / moon control from the Figma Home header.
// The initial theme is set before paint by the inline script in layout.tsx.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark theme"
      onClick={toggle}
      className="group flex items-center gap-8 text-secondary"
    >
      <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="3" />
        <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1 1M12 12l1 1M3 13l1-1M12 4l1-1" />
      </svg>
      <span className="relative h-20 w-[36px] rounded-full border border-default bg-surface">
        <span
          className={`absolute left-2 top-2 h-[14px] w-[14px] rounded-full bg-action-accent transition-transform duration-200 ease-out ${
            isDark ? "translate-x-16" : "translate-x-0"
          }`}
        />
      </span>
      <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" />
      </svg>
    </button>
  );
}
