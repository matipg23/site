# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## OPERATION RULES

Ask, do not assume. If something is unclear, ask before writing a single line. No silent guesses about intent, architecture, or requirements.

Simplest solution first. Implement the simplest thing that could work. No abstractions or flexibility you did not explicitly request.

Do not touch unrelated code. If a file or function is not part of the current task, do not modify it even if you think it could be improved.

Flag uncertainty explicitly. If you are not confident about an approach or technical detail, say so before proceeding. Confidence without certainty causes damage.

Prefer editing over writing: Edit existing files rather than creating new ones.

Always ask before destructive actions: git force push, deleting files, major refactors.

Don't default to agreement. When I ask "is this a good idea?" or end a statement with "right?", do not validate by default. Treat it as a request for honest evaluation, not confirmation.

Treat tentative phrasing as a request for evaluation. "I think this might be…", "could it be…", "not sure if…", "maybe too X" are expressions of doubt, not requests for validation. Evaluate the claim.

Agreement requires evidence, shown concisely. Never use "you're right", "good point", "exactly", or "fair" unless you can point to why in one short clause.

Negative prompts: Don't ever be sycophantic; do not flatter the user or gratuitously validate the user's ideas. Absolutely avoid dialectical hedging, No thesis—antithesis—synthesis, no "it's not just x, it's also y" or similar structures; NO EM DASHES, NO EM DASHES, NO EM DASHES; no staccato sentences; don't be too folksy; no both sidesing; do not ask gratuitous questions at the end.

## Commands

- `npm run dev`: local dev server at http://localhost:3000
- `npm run build`: static export to `/out` (run this to verify before committing)
- `npx tsc --noEmit`: type-check. `npm run lint` has no ESLint config yet and prompts to create one.

Node 20 is required. Switch via `nvm use 20` if needed.

## Architecture

Static site: `next.config.ts` sets `output: "export"`, so `npm run build` writes plain HTML/CSS/JS to `/out` for any host. No server features (API routes, middleware, image optimisation).

**Routes** (`src/app/`): `/` (Home), `/about`, and one folder per case study under `/work/<slug>/`. `/intro` is a standalone GSAP intro preview, not linked from the site. The case study list and order live in `src/content/cases.ts`.

**Design source:** the Figma file "Portfolio Redesign", page "latest iterations". `DESIGN.md` maps every Figma page, variable, text style and component to code. `docs/figma-workflow.md` describes how to apply Figma changes.

**Component locations:**
- `src/components/layout/`: Header, Footer, ThemeToggle
- `src/components/sections/`: Home sections (`home/`), shared Contact, the Intro
- `src/components/case/`: building blocks for case study pages (CaseHero, CaseSection, Stats, Steps, Story, Gallery, ...)
- `src/components/ui/`: primitives (Button, Tag, SectionLabel, ImageSlot, Reveal, CountUp, Arrow)

**Design tokens:** colours are CSS variables in `src/styles/tokens.css`, synced from the Figma variables (do not hand-edit). `tailwind.config.js` exposes them as semantic utilities (`bg-surface`, `text-accent`, `border-default`). Figma text styles are `.type-*` classes in `src/styles/themes/globals.css`. Spacing classes are literal pixels (`p-24` = 24px). Use these only; no inline styles or hardcoded values. Tailwind's default spacing keys that are not in the scale (for example `w-36`, `w-72`) still exist and mean rem values, so use `w-[36px]` style arbitrary values for off-scale sizes.

**Fonts:** Public Sans, Kode Mono and Barlow Semi Condensed load via `next/font/google` in `src/app/layout.tsx`. Zalando Sans Expanded is not in next/font's list, so it loads from a Google Fonts `<link>`.

**Themes:** Light and Dark, from the Figma Color collection modes. An inline script in `layout.tsx` sets `data-theme` on `<html>` before paint from localStorage, falling back to the system preference. The Figma `FD` mode is not shipped.

**Images:** exported from Figma into `public/images/<page>/`. Missing visuals render as `ImageSlot` placeholders. `TODO(content)` comments mark copy or media still pending.

## Project

Personal portfolio site for matipeinado.com, built with Next.js as a static export. The site doubles as a live demonstration of the owner's AI-native design systems thesis, so implementation quality and structure are part of the work, not just scaffolding.

The information architecture follows the Figma "latest iterations" page. Do not add pages or navigation that are not in Figma without asking.

## Context

The owner is a senior product designer specialising in design systems. He does not write or maintain code by hand -- implementation here is AI-assisted -- so favour simple, low-maintenance solutions over cleverness, and don't introduce abstractions or tooling beyond what the immediate task requires. He prefers commiting by hand even when changes are co-authored with Claude -- so do not initiate commits autonomously.

He is, however, architecture-literate: he reasons fluently about systems, data structures, pipelines, and API design, and he makes the structural decisions himself. Explain tradeoffs at that level rather than from first principles. Don't over-explain basics, but do surface structural choices and their consequences clearly so he can make the call.

