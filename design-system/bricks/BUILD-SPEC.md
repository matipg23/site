# BRICKS themes: package spec

BRICKS is the design system. It owns the token contract, the generator and the switching logic. Each look is a theme that plugs into it. The Figma file is the design source of truth; the JSON files in `themes/` are generated from a Figma snapshot, and everything in `generated/` is generated from the JSON.

Figma file: `https://www.figma.com/design/sYjBBYITQFus5IGqB4jqur/Portfolio-Redesign`

## 1. Decisions locked

| Decision | Value |
|---|---|
| System name | BRICKS |
| CSS variable prefix | `--bricks-` |
| Theme attribute | `data-theme` on `<html>` |
| Mode attribute | `data-mode` on `<html>`, `light` or `dark`, light is the default |
| Own theme | `default` (also applies when no `data-theme` is set) |
| News design system interpretation | `paperboy` |
| Sports betting interpretation | `bluefield` |
| Digital investing interpretation | `rangergreen` |
| Stack | Next.js on Vercel |

```html
<html data-theme="paperboy" data-mode="dark">
```

## 2. Pipeline

```
Figma (Primitives + BRICKS DS variables, local text styles)
  | scripts/figma-export.js        run in Figma via figma_execute, returns one object
  v
snapshot/*                         figma-primitives.json, figma-semantic.json, figma-text-styles.txt, contract-meta.json
  | scripts/import-figma-snapshot.mjs
  v
themes/<name>/tokens.json + typography.json
  | scripts/build-tokens.mjs
  v
generated/bricks.tokens.css, bricks.tokens.ts, bricks.tailwind.css, contrast-report.md
```

To refresh after a Figma change:

1. Run `scripts/figma-export.js` in the Figma file. Save `result.primitives` as `snapshot/figma-primitives.json`, `result.semantic` as `snapshot/figma-semantic.json`, and `result.textStyles` joined by newlines as `snapshot/figma-text-styles.txt`.
2. `node scripts/import-figma-snapshot.mjs .`
3. `node scripts/build-tokens.mjs .`
4. Read `generated/contrast-report.md`.

Never hand-edit `themes/*/tokens.json` or `generated/`. The importer overwrites them.

## 3. Package layout

```
bricks-themes/
  BUILD-SPEC.md                 this file
  HANDOFF.md                    migration instructions for the production site
  contract.json                 the 60 semantic tokens every theme must define
  typography.json               theme independent type scale (49 styles), generated
  snapshot/                     last export from Figma
  themes/{default,paperboy,bluefield,rangergreen}/tokens.json
  scripts/
    figma-export.js             runs inside Figma
    import-figma-snapshot.mjs   snapshot to theme JSON and typography.json
    build-tokens.mjs            validator and generator
    derive-theme.mjs            legacy, used once to derive the first BlueField. Not part of the pipeline
  generated/                    never hand-edited
```

## 4. Token model

Three layers, all mirrored in Figma.

1. Core palette, mode independent. `--bricks-core-{hue}-{step}`, steps `050` to `900` (BlueField blue also has `950`). Also `core-white`, `core-black`, `core-transparent`, `core-alpha-{black|white}-{050|100|200}` and a few `core-extra-*` one-offs. Emitted in each theme's own block, so `--bricks-core-blue-500` is a different blue per theme.
2. Semantic tokens, 60 in `contract.json`, light and dark values that alias the core palette with `var()`. Components use only these. Categories: background, content, brand, status, border, link. Status groups: positive, critical, warning, alert, info, neutral.
3. Extension tokens, outside the contract, defined by every theme: `extension.accent.{text,fill,border}`, `extension.content.{onAccent,inverse,muted,online}`, `extension.background.{inverse,overlayTransparent,fog,shade}`, `extension.border.strong`, `extension.accent.{highlightFill,highlightText}`, `extension.data.{primary,secondary}`. RangerGreen also has `extension.risk.01` to `10`. CSS names are `--bricks-extension-...`. Shared components may use the 16 common extensions. `build-tokens.mjs` fails if any theme lacks an extension the default theme defines, so a new shared extension must be added to every theme in Figma. Risk tokens are RangerGreen only.

`brand.gradient` is derived by the importer: `linear-gradient(125deg, core-{primaryHue}-600, core-{primaryHue}-800)`. It is not a Figma variable.

## 5. Typography

Per theme, set in the `BRICKS DS` collection and in `theme.typography` of each tokens.json:

| Theme | display | highlight | body | mono |
|---|---|---|---|---|
| default | Zalando Sans Expanded | Barlow Semi Condensed | Public Sans | Kode Mono |
| paperboy | Poppins | Bitter | DM Sans | DM Mono |
| bluefield | Anton | Anton | Figtree | IBM Plex Mono |
| rangergreen | Noto Serif | Montserrat | system-ui | ui-monospace |

Each theme also sets a weight and italic per role (`display`, `highlight`, `heading`, `label`, `body`), emitted as `--bricks-font-weight-{role}` and `--bricks-font-style-{role}`. Font families are emitted as `--bricks-font-{display|highlight|body|mono}` with a fallback stack.

The type scale is theme independent, in `typography.json`, emitted as `.bricks-text-{group}-{step}` classes (for example `.bricks-text-display-md`) and as `typeScale` in the TS file. Each class reads the font and weight variables, so the active theme changes the face without touching the class. Styles with a fixed weight (the `Mono/*`, `Caption/*`, `Tag/*` families and the two `Body/*-Medium` styles) carry their own weight.

Limit: text case (uppercase) is part of the style, not the theme. Paperboy and RangerGreen display styles are uppercase because the scale is shared.

## 6. Naming rules

- Figma path `status/positive/background-default` becomes contract path `status.positive.backgroundDefault` and CSS `--bricks-status-positive-background-default`.
- `link/default` is `link.defaultBase` and CSS `--bricks-link-default-base`. `link/inverse` is `link.inverseDefault`.
- Core variables: `color/{theme}/{hue}/{step}` in Figma, `--bricks-core-{hue}-{step}` in CSS.

## 7. Token usage rules

| Need | Token |
|---|---|
| Page background | `background-base` |
| Card, raised container | `background-surface` |
| Secondary area inside a card | `background-layer` |
| Hover, pressed or selected | `background-hover`, `background-active` (pair active with `content-on-dark`) |
| Disabled control | `background-disabled`, `content-disabled`, `border-disabled` |
| Primary CTA fill | `background-primary` with `content-on-dark` |
| Hero or promo banner | `background-promotional` or `brand-gradient`, text `content-on-dark` |
| Body, headings, metadata | `content-default`, `content-strong`, `content-subtle` |
| Links | `link-default-base`, hover `link-default-hover` |
| Input and card borders | `border-default`, dividers `border-subtle`, focus `border-active` |
| Status banner | `status-<x>-background-subtle`, `status-<x>-border-default`, `status-<x>-content-accent` |

- Components use contract tokens only. A component never branches on theme or mode to pick a colour.
- `status.neutral` has no `content-accent`, use `content-subtle`.
- Alpha tokens (`background-accent`, `content-disabled`, `border-disabled`, some extensions) are 8-digit hex. Do not pass them through Sass colour functions.
- Use `content-on-light` on light solid fills (warning, alert, neutral in light themes). `content-on-dark` fails there.

## 8. Rules for guest themes

1. Each non-default theme carries `theme.disclaimer` and `theme.source`. The build fails if the disclaimer is missing.
2. Show the disclaimer wherever a guest theme is selectable or active, as visible text.
3. No logos, wordmarks or real brand names in the repo, the CSS or the UI. Theme labels are the codenames.
4. Do not commit the original source token files, Sketch files or screenshots.

## 9. Known contrast flags (46 pairs, see generated/contrast-report.md)

Most are structural, not mistakes in one theme:

- `content-on-dark` on solid warning, alert and neutral fills in light modes (and several dark fills in Paperboy and RangerGreen). Use `content-on-light` there.
- `border-default` on `background-surface` is 1.3 to 2.0 in every theme. Fine for decorative card borders, too low for input boundaries. Use `border-active` or `extension-border-strong` for inputs.
- `content-subtle` is marginal on surface or layer in default light (4.45, 3.95), BlueField light (4.37 on layer) and RangerGreen light (3.90 to 4.17).
- Paperboy dark: `link-default-base` is 3.41 on base, and three status `content-accent` pairs are 3.5 to 4.2.
- BlueField dark: `background-secondary` and `background-base` are nearly identical (1.01).

These need design decisions in Figma, then a re-export. Do not patch them in code.
