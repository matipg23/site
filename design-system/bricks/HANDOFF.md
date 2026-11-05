# HANDOFF: update the production site to the current BRICKS tokens

For: Claude Code agent working in the portfolio repo (Next.js on Vercel).
From: Mati. The design source of truth is the Figma file `sYjBBYITQFus5IGqB4jqur` (Portfolio-Redesign). This package is the export of it.

Writing rule for everything you produce (commits, comments, copy, docs): no em dashes.

## 0. What this is

The site already has an earlier BRICKS install (`--bricks-` variables, `data-theme` and `data-mode` on `<html>`, a theme picker, a `default` theme and a `bluefield` theme). This package replaces it. Colours were tuned in Figma across all four themes and both modes, typography was moved to per-theme font variables and text styles, and two new themes are present (`paperboy`, `rangergreen`).

This is an update of an existing install, not a fresh one. Inspect first, then change.

## 1. What changed

1. **Four themes**, each with light and dark: `default`, `paperboy`, `bluefield`, `rangergreen`. `themeNames` order is `default, bluefield, paperboy, rangergreen`.
2. **All colour values changed.** Every theme was re-tuned in Figma. BlueField was rebuilt: royal blue palette (`#031273 #0504AA #2337C6 #4169E1 #4CC9F0`), blue is the brand colour, light mode has a white base.
3. **Core palette naming changed (breaking).** Old: `--bricks-core-blue`, `--bricks-core-blue-l-1`, `--bricks-core-blue-d-2`. New: `--bricks-core-blue-050` to `-900` (BlueField blue also `-950`). Plain `--bricks-core-blue` no longer exists. Also new: `--bricks-core-white`, `-black`, `-transparent`, `--bricks-core-alpha-{black|white}-{050|100|200}`, and a few `--bricks-core-extra-*` one-offs.
4. **Semantic contract is unchanged:** the same 60 tokens, same CSS names. Only values changed.
5. **New extension tokens in every theme (12):** `--bricks-extension-accent-{text,fill,border}`, `--bricks-extension-content-{on-accent,inverse,muted,online}`, `--bricks-extension-background-{inverse,overlay-transparent,fog,shade}`, `--bricks-extension-border-strong`. RangerGreen also has `--bricks-extension-risk-01` to `-10`.
6. **Typography is new.** Per theme font variables `--bricks-font-{display,highlight,body,mono}`, `--bricks-font-weight-{display,highlight,heading,label,body}` and `--bricks-font-style-{...}`. A theme independent type scale as classes `.bricks-text-{group}-{step}` (49 styles, for example `.bricks-text-display-md`, `.bricks-text-body-sm-medium`). The TS file now exports `typography` and `typeScale`.
7. **Generator fix:** the banner comment in the generated TS contained `*/` and broke compilation. Fixed.
8. **Theme metadata:** `themeMeta[theme].disclaimer` and `.source` unchanged in shape. Disclaimer wording is neutral and does not name any company.

## 2. Files in this package

| Path | Role |
|---|---|
| `generated/bricks.tokens.css` | All themes, light and dark, core palette, font variables, type scale classes |
| `generated/bricks.tokens.ts` | `token`, `tokenValues`, `extensions`, `themeNames`, `modeNames`, `themeMeta`, `typography`, `typeScale` |
| `generated/bricks.tailwind.css` | Optional Tailwind v4 `@theme inline` mapping |
| `generated/contrast-report.md` | WCAG check per theme and mode (46 known flags, see section 7) |
| `themes/*/tokens.json`, `typography.json`, `contract.json` | Source for the generator |
| `scripts/*` | Pipeline, see `BUILD-SPEC.md` section 2 |
| `snapshot/*` | Last Figma export |
| `BUILD-SPEC.md` | Full spec and usage rules |

## 3. Steps

### Step 0. Inspect (report in 6 lines or fewer, then continue unless something conflicts)

- Where the old package lives (for example `design-system/bricks/`) and whether `tokens:build` exists.
- Whether the old generated CSS is imported once in global styles.
- Whether Tailwind is present and which major version.
- How fonts are loaded today (`next/font`, `<link>`, local files).
- Run: `grep -rnE "core-[a-z]+-(l|d)-[0-9]|--bricks-core-(blue|green|navy|teal|lime|mint|red|yellow|orange|amber|purple|neutral)([^-]|$)" app src components styles 2>/dev/null` (adjust paths). Every hit is a breaking rename and goes in your report.
- Anywhere text colour or font is hard-coded instead of tokens.

### Step 1. Replace the package

Replace the old package directory with this one, keeping the repo's location convention. Keep the existing `tokens:build` script path. Then:

```
npm run tokens:build
```

It must report 4 themes, 60 contract tokens, 2 modes, no errors, and 46 contrast flags (the known count). If the count differs, stop and say why. Then run it a second time and confirm no diff. Commit `generated/`.

To pick up future Figma changes the order is: re-export, `node scripts/import-figma-snapshot.mjs .`, `npm run tokens:build`. Do not hand-edit `themes/*/tokens.json` or `generated/`.

### Step 2. Fix breaking core references

For each hit from step 0, prefer replacing the core variable with the semantic token that expresses the intent (see `BUILD-SPEC.md` section 7). Only if no semantic or extension token fits, map to the new numbered core step. Core mapping is by lightness, not by name: old `l-N` was lighter than base, `d-N` darker, base sat near step 500. List each remap in the commit message.

### Step 3. Load the CSS

The generated CSS must be imported once, at the top of global styles. On Tailwind v4 also import `bricks.tailwind.css` after it. Do not duplicate imports.

### Step 4. Fonts

Load the fonts below with `next/font/google`, and expose each as a CSS variable. The generated CSS references fonts by family name through `--bricks-font-*`, so the cleanest wiring is to load all of them and let the family names resolve. If `next/font` generates hashed family names, set `--bricks-font-*` fallbacks accordingly in one small override file, not in `generated/`.

| Family | Used by | Weights and styles needed |
|---|---|---|
| Zalando Sans Expanded | default display | 900 normal and italic, 700 |
| Barlow Semi Condensed | default highlight | 900 italic |
| Public Sans | default body | 300, 400, 500 |
| Kode Mono | default mono | 400, 500, 700 |
| Poppins | paperboy display | 600, 700 |
| Bitter | paperboy highlight | 700 |
| DM Sans | paperboy body | 400, 500 |
| DM Mono | paperboy mono | 400, 500 |
| Oswald | bluefield display | 700 |
| Archivo | bluefield highlight | 900 italic |
| Figtree | bluefield body | 300, 400, 500 |
| IBM Plex Mono | bluefield mono | 400, 500, 700 |
| Noto Serif | rangergreen display | 900 italic, 900 normal |
| Montserrat | rangergreen highlight | 900 italic |
| system-ui, ui-monospace | rangergreen body and mono | none |

Notes:
- All are Google Fonts. Some families do not ship a 900 italic. Check what each one offers; if an italic is missing, the browser will synthesise one. That is acceptable, but list which faces were synthesised in your report.
- Only request the weights above, and preload nothing that the active theme does not need. Prefer `display: 'swap'`.
- BlueField, Paperboy and RangerGreen fonts are free approximations of the styles those themes interpret. They are not the original brand typefaces and must not be described as such.
- Loading every family on every page is heavy. If total font weight is a concern, load the guest theme fonts lazily when a guest theme is first selected, and keep `default` fonts eager. Report the approach you chose.

### Step 5. Use the type scale

Replace hard-coded font family, size, weight and line height in shared components with the `.bricks-text-*` classes or the `typeScale` export. Style name to class: `Display/MD` is `.bricks-text-display-md`, `Body/SM-Medium` is `.bricks-text-body-sm-medium`, `Mono/XS-Med-Upper` is `.bricks-text-mono-xs-med-upper`. Do not set `font-weight` or `font-style` on top of these classes. Text case is part of the style: display styles are uppercase in every theme.

Pick styles by role:
- Hero and section titles: `Display/*` or `Highlight/*`.
- Page and card headings: `Heading/*`, or `Title/*`, `Label/*` for UI headings.
- Running text: `Body/*`.
- Code, data, small UI labels, tags: `Mono/*`, `Caption/*`, `Tag/MD`.

### Step 6. Verify theme switching and disclaimers

- The inline `<head>` script sets `data-theme` and `data-mode` before first paint, with `suppressHydrationWarning` on `<html>`. Validate stored values against `themeNames` and `modeNames`, fall back to `default` and system mode.
- The picker now lists four themes, built from `themeNames` and `themeMeta[...].label`. Nothing hard-coded to the old two.
- `themeMeta[theme].disclaimer` is visible as text wherever a guest theme is active or selectable.

### Step 7. Case study banner mocks and themed previews

Any place that shows a banner or component mock in a specific theme (for example in case studies) must read from `tokenValues[theme][mode]` or force `data-theme` and `data-mode` on the wrapper element, not read the page's active theme. Banner mocks previously rendered wrong colours in dark mode; verify them in all four themes in both modes.

### Step 8. Sweep for hard-coded values

No hard-coded hex colours, font families or `font-weight` numbers in app code outside `generated/`, `themes/` and `snapshot/`. List intentional exceptions.

## 4. Do not do

- Do not hand-edit generated files or theme JSON.
- Do not commit source files from the original design systems, only this package.
- Do not name real brands in code, UI copy or comments. The codenames are `paperboy`, `bluefield`, `rangergreen`.
- Do not fix contrast flags in CSS. They need design decisions in Figma.
- Do not change `contract.json` without a matching Figma change.

## 5. Verification checklist

All must be true before you stop.

- [ ] `npm run tokens:build` passes and a second run produces no diff.
- [ ] The generated TS type-checks (`tsc --noEmit`) and the site builds and lints.
- [ ] The picker offers `default`, `bluefield`, `paperboy`, `rangergreen`. Switching theme keeps mode, switching mode keeps theme.
- [ ] Hard reload in dark mode shows no flash of the wrong theme or mode.
- [ ] Each of the 8 theme and mode combinations: page background, surface, text, link, primary button, a status banner of each kind, and focus ring all render, with no unstyled or transparent areas.
- [ ] Fonts: in each theme, `getComputedStyle` on a display heading, a body paragraph and a mono label shows that theme's families, and Paperboy titles are upright, not italic.
- [ ] No console errors for missing font files or unresolved CSS variables. Search the built CSS for `var(--bricks-` names that are not defined anywhere.
- [ ] Case study banner mocks render correctly in dark mode in all four themes.
- [ ] Disclaimer text is visible for each guest theme.
- [ ] Screenshots of the home page and one case study in all 8 combinations are saved for review (do not commit them).

## 6. Report back

Files added, files changed, every core variable remap (old to new), fonts loaded and any faces synthesised, anything you skipped and why, and the verification checklist with each item marked.

## 7. Known caveats (do not silently fix)

- 46 contrast pairs flagged in `generated/contrast-report.md`. The main patterns:
  - `content-on-dark` fails on solid warning, alert and neutral fills in light modes, and on several Paperboy and RangerGreen dark fills. Use `content-on-light` on those fills.
  - `border-default` on `background-surface` is 1.3 to 2.0 in every theme. Fine for decorative card borders, too low for input boundaries. Use `border-active` or `extension-border-strong` for inputs.
  - `content-subtle` is marginal in default light, BlueField light on layer, and RangerGreen light.
  - Paperboy dark: `link-default-base` is 3.4 on the page background.
  - BlueField dark: `background-secondary` is almost the same colour as `background-base`.
- Uppercase text is not themable. Display styles are uppercase in all themes, including the serif RangerGreen and the Paperboy set. Sentence-case variants of the styles are a possible follow-up in Figma.
- BlueField's blue sits close to Paperboy's blue in hue (about 265 versus 266 degrees). They differ in lightness, neutrals, fonts and the yellow tertiary, but they can look alike on blue-heavy screens.
- Not done yet in Figma: older Figma pages still carry static values from the removed `Color` and `Fonts` collections. They are not part of this export.
