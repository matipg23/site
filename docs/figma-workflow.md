# Figma to code workflow

How to change the site by designing in Figma and asking Claude Code to apply it.
Claude reads Figma through the **figma-console** MCP, which talks to Figma Desktop through the
Desktop Bridge plugin. Keep Figma Desktop open on "Portfolio Redesign" with the plugin running.

## 1. Change a colour or token

1. Edit the variable in Figma (collection **Color**, mode Light or Dark).
2. Ask Claude: **"sync tokens"**.
3. Claude reads every variable in the Color collection and rewrites `src/styles/tokens.css`. Names
   follow the Figma path, so nothing else in the code changes.
4. Claude rebuilds and screenshots a page in both themes.

New semantic variables also need a line in `tailwind.config.js` to become a class. Claude adds it
during the sync and tells you the new class name.

The Variables REST API is Enterprise-only, so this sync runs on demand through the plugin. It is
not part of the build.

## 2. Change a text style

1. Edit the style in Figma.
2. Ask Claude to "sync text styles". It updates the matching `.type-*` class in
   `src/styles/themes/globals.css`.

## 3. Change a layout or section

1. Edit the frame on the **latest iterations** page.
2. Share the node link (right-click > Copy link to selection) and say what changed.
3. Claude screenshots the Figma node and the live page side by side, edits the component, and
   compares again.

Code names follow Figma section labels: the "SELECTED WORK" section is
`src/components/sections/home/SelectedWork.tsx`, a case study "THE APPROACH" section is the
`<CaseSection label="The approach">` block in that case's `page.tsx`.

## 4. Change copy

Copy lives in the page and section files, not in a CMS. Change it in Figma and ask Claude to update
the page, or tell Claude the new wording directly.

## 5. Add or replace images

- From Figma: give Claude the node link. It exports at 2x into `public/images/<page>/`.
- From your files: drop them into `public/images/<page>/` and tell Claude where they go.
- Videos (the Figma plugin can't export video): drop `.mp4` files into `public/videos/` and ask
  Claude to wire them up.

## 6. Add a case study

1. Design it as a new frame on **latest iterations**.
2. Share the link and give it a slug (for example `acme-checkout`).
3. Claude adds it to `src/content/cases.ts`, creates `src/app/work/<slug>/page.tsx` from the existing
   case building blocks, exports its images, and adds a Home card if you want one.

## 7. Publish

```bash
npm run build
```

Upload the contents of `/out` to your host. Every page is a folder with an `index.html`
(`/about/index.html`), so any static host works without rewrite rules.
