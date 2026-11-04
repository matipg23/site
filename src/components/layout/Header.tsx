"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/#work", label: "My Work" },
  { href: "/about/", label: "About Me" },
];

// Figma: Home - Revised > Header (80px, bottom border, Mono/SM links)
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-default bg-nav">
      <div className="container-page flex h-[79px] items-center justify-between">
        <nav aria-label="Primary" className="flex items-center gap-32">
          <Link href="/" className="type-mono-sm-bold text-accent">
            MPG
          </Link>
          <ul className="hidden items-center gap-32 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={pathname.replace(/\/$/, "") === l.href.replace(/\/$/, "") ? "page" : undefined}
                  className="type-mono-sm text-secondary transition-colors duration-150 hover:text-primary aria-[current=page]:text-nav-active"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-24">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="type-mono-sm-bold text-primary md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <ul id="mobile-nav" className="container-page flex flex-col border-t border-default pb-24 md:hidden">
          {links.map((l) => (
            <li key={l.href} className="border-b border-default">
              <Link href={l.href} onClick={() => setOpen(false)} className="type-label-md block py-16 text-primary">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
