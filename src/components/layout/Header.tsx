"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

// Figma: Home - Refined > Nav (64px, surface, bottom border, Shadow 2, Label/XS links centred)
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Figma nav variants: the Home page has three links, every other page adds "Home" first.
  // Every page renders the Contact section, so the link is always an in-page anchor.
  const path = pathname.replace(/\/$/, "") || "/";
  const showHome = path !== "/";
  const links = [
    ...(showHome ? [{ href: "/", label: "Home" }] : []),
    { href: "/work/", label: "Work" },
    { href: "/about/", label: "About me" },
    { href: "#contact", label: "Contact" },
  ];
  const isCurrent = (href: string) => pathname.replace(/\/$/, "") === href.replace(/\/$/, "");

  return (
    <header className="sticky top-0 z-40 border-b border-default bg-surface shadow-2">
      <div className="grid h-64 grid-cols-[1fr_auto_1fr] items-center px-16 md:px-24">
        <Link href="/" className="type-display-xs justify-self-start text-accent text-[14px] leading-[20px]">
          MPG
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-24">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  aria-current={isCurrent(l.href) ? "page" : undefined}
                  className="type-label-xs text-secondary transition-colors duration-150 hover:text-primary aria-[current=page]:text-nav-active"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-start-3 flex items-center gap-24 justify-self-end">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="type-label-xs text-primary md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Primary" id="mobile-nav" className="border-t border-default px-16 pb-24 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.label} className="border-b border-default">
                <Link
                  href={l.href}
                  aria-current={isCurrent(l.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="type-label-md block py-16 text-primary aria-[current=page]:text-nav-active"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
