# DESIGN.md

The design system behind matipeinado.com. The source of truth is the Figma file
**Portfolio Redesign** (`sYjBBYITQFus5IGqB4jqur`). This file describes how it maps to code.
When Figma and this file disagree, Figma wins and this file gets updated.

## Where the design lives in Figma

| What | Figma location |
|---|---|
| Canonical pages | Page **latest iterations** (`257:3112`) |
| Home | `HOME` section, frame `Home - Revised` (`338:5670`); dark variant in `HOME - dark` (`338:6000`) |
| About | `About Me` (`258:4225`) |
| Case studies | `Case 01` (`257:3113`), `Case 02` (`257:3377`), `Case 03` (`321:177`), `Case 04` (`285:837`) |
| Components | Page **components** (`62:821`): `button`, `tag`, cards, metric card |
| Colour tokens | Variable collection **Color**, modes `Light`, `Dark` (shipped) and `FD` (not shipped) |
| Fonts | Variable collection **Fonts**, mode `Zalando` (shipped) |
| Type | Local text styles (Highlight, Display, Heading, Label, Body, Mono, Caption, Tag) |

## Colour

Two layers, as in Figma.

- **Primitives** (`primitive/*`): raw hex values. Neutrals, teal, green, lime, plus red, yellow, blue
  and purple that only the unshipped FD mode uses.
- **Semantics** (`semantic/*`): what components use. Each points at a primitive per mode.

Code: `src/styles/tokens.css` holds both layers as CSS variables. Names mirror the Figma path with
`semantic/` dropped (`semantic/text/accent` becomes `--text-accent`). Light is `:root`; Dark is
`[data-theme="dark"]`. `tailwind.config.js` exposes the semantics as utilities:

| Figma variable | Tailwind class |
|---|---|
| `background/page`, `surface`, `overlay`, `action`, `inverse` | `bg-page`, `bg-surface`, `bg-overlay`, `bg-action`, `bg-inverse` |
| `text/primary`, `secondary`, `muted`, `inverse`, `action`, `accent` | `text-primary`, `text-secondary`, `text-muted`, `text-inverse`, `text-action`, `text-accent` |
| `border/default`, `subtle`, `strong`, `accent` | `border-default`, `border-subtle`, `border-strong`, `border-accent` |
| `action/accent` (fill), `action/accent` (text), `action/primary-text` | `bg-action-accent`, `text-action-accent`, `text-action-primary-text` |
| `nav/background`, `nav/text`, `nav/text-active` | `bg-nav`, `text-nav`, `text-nav-active` |

Rules:
- Components use semantic classes only, never primitives or hex values.
- Accent words in display headings (the teal or lime word in "I design products and the **systems**")
  use `text-accent`, wrapped in `<Accent>` on case pages.
- Known contrast gap: Light `text/secondary` on `background/surface` is 4.45:1, just under WCAG AA
  (4.5:1) for body text. Fix it in Figma (darken `neutral-500` or point `text/secondary` at
  `neutral-600`), then sync tokens.

## Type

Every Figma text style is one CSS class in `src/styles/themes/globals.css`, named after the style
path: `Display/MD` becomes `.type-display-md`, `Mono/SM-Bold` becomes `.type-mono-sm-bold`.
Each class sets family, weight, style, case, size, line height and tracking, so one class reproduces
one Figma style.

| Family | Font | Styles |
|---|---|---|
| Display, Heading | Zalando Sans Expanded, Black Italic | `display-2xl` to `display-xs` (uppercase), `heading-xl` to `heading-xs` |
| Label | Zalando Sans Expanded, Bold | `label-lg` to `label-xs` |
| Title | Zalando Sans Expanded, Bold, -2% tracking | `title-lg`, `title-md` |
| Highlight | Barlow Semi Condensed, Black Italic | `highlight-2xl` to `highlight-md` (uppercase, stat numerals) |
| Body | Public Sans, Light / Medium | `body-lg` to `body-2xs`, `body-sm-medium`, `body-xs-medium` |
| Mono, Caption, Tag | Kode Mono | `mono-*` (incl. `mono-xs-upper`, `mono-xs-med-upper`, uppercase), `caption-*`, `tag-md` |

Display, heading and highlight sizes scale with the viewport using `clamp()`. The maximum is the
Figma value at 1440px. The minimum is chosen so the longest single word in the copy fits a phone.

Some Figma text in the case studies is not attached to a style (for example 64px step numerals,
18px step titles). In code those snap to the nearest style: numerals to `highlight-md`, step titles
to `label-sm`, learning titles to `body-sm-medium`. Attaching them to styles in Figma would make the
two match exactly.

## Spacing and layout

- Spacing classes are literal pixels: `p-24` is 24px. The scale is 1, 2, 4, 8, 12, 16, 20, 24, 32,
  40, 48, 56, 64, 80, 96, 112, 128. Values outside it in Figma snap to the nearest step.
- Page container (`.container-page`): 1344px max, 32px side padding (16px on phones). This is the
  Figma content frame.
- Sections open with `SectionLabel`: a Mono/SM-Bold accent eyebrow over a `border-default` rule.
- Section rhythm: 96px top and bottom on Home, 64px top and 128px bottom on case studies.
- Corners: 2px everywhere. No shadows, blur or gradients; rules and surfaces do the separating.

## Motion

- Scroll reveal (`Reveal`): opacity plus a 12px lift, 500ms, `ease-out`, once per element, staggered
  in rows with `delay={0..4}`. Elements already on screen at load are left alone.
- Stat numbers (`CountUp`): count up once over 900ms when they enter view.
- Hover and press: 150 to 200ms colour, border and arrow-nudge changes; buttons scale to 0.98 when
  pressed. Theme switch is a 200ms colour crossfade.
- `prefers-reduced-motion`: all of the above are switched off and content renders in its final state.

## Components

| Code | Figma |
|---|---|
| `ui/Button` (`solid`, `outline`, `link`) | components > `button` (Solid, Outline, Link) |
| `ui/Tag` | components > `tag` |
| `ui/SectionLabel` | Section eyebrow + rule |
| `ui/ImageSlot` | Image, or the bracket-caption placeholder Figma uses for unfilled slots |
| `ui/SocialLinks` | Home hero > Menu (Behance, Medium, LinkedIn; paths copied from the Figma vectors) |
| `ui/TokenInspector` | HOME > "Sidebar - Token proof", opened from the hero "/>" button; values read live from `tokens.css` |
| `layout/Header`, `layout/Footer`, `layout/ThemeToggle` | Home - Revised > Header / Footer |
| `case/CaseHero` | Case > Hero (eyebrow, title, tags, facts row) |
| `case/CaseSection`, `Split`, `Prose`, `Accent` | Case > Section, "Frame 15" two-column layout |
| `case/Stats` | Case > stats row |
| `case/Interlude` | Case > Interlude band |
| `case/Steps` | Case > Track > Steps (with owner tags; muted = someone else's work) |
| `case/PhaseTimeline` | Case 01 > timeline |
| `case/Story` | Case 02/04 > "01 / The first run" blocks |
| `case/Numbered` | Case > Learnings |
| `case/Figure`, `case/Panel` | Captioned and labelled images |
| `case/Gallery` | Case 03 > handoff file carousel |
| `case/CaseNav` | Case > next case study row |
