#!/usr/bin/env node
// BRICKS: Figma snapshot -> themes/<theme>/tokens.json + typography.json
// Zero dependencies. The snapshot is produced by scripts/figma-export.js (run inside Figma via figma-console-mcp).
//
//   snapshot/figma-primitives.json   every variable in the "Primitives" collection (name -> hex | string | number)
//   snapshot/figma-semantic.json     every variable in "BRICKS DS": per mode, the alias target (primitive path without
//                                    the color/<brand>/ prefix) or "=#hex8" for direct values
//   snapshot/figma-text-styles.txt   one local text style per line: name|role|weight|size|lineHeight|letterSpacing|case|decoration
//   snapshot/contract-meta.json      css variable names and descriptions for the 60 contract tokens
//
// Usage: node scripts/import-figma-snapshot.mjs [packageRoot]

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? '.');
const snap = (f) => path.join(root, 'snapshot', f);
const prims = JSON.parse(fs.readFileSync(snap('figma-primitives.json'), 'utf8'));
const sem = JSON.parse(fs.readFileSync(snap('figma-semantic.json'), 'utf8'));
const meta = JSON.parse(fs.readFileSync(snap('contract-meta.json'), 'utf8'));
const styleLines = fs.readFileSync(snap('figma-text-styles.txt'), 'utf8').split('\n').filter(Boolean);
const contract = JSON.parse(fs.readFileSync(path.join(root, 'contract.json'), 'utf8'));
const P = '--bricks-';

const THEMES = {
  default: {
    label: 'Default',
    source: "The author's own theme for the BRICKS design system",
    disclaimer: 'The default BRICKS theme, created by the author. Other themes in this package are independent visual interpretations and are not official sources.',
    primaryHue: 'teal',
  },
  paperboy: {
    label: 'Paperboy',
    source: 'Interpretation of an open-source news design system: blue, teal and amber on neutral greys',
    disclaimer: 'An independent visual interpretation created by the author for portfolio purposes. Not an official source and not affiliated with or endorsed by any company. Values are adapted, not reproduced.',
    primaryHue: 'blue',
  },
  bluefield: {
    label: 'BlueField',
    source: 'Interpretation of a sports-betting product palette: royal blue, navy, green and yellow',
    disclaimer: 'An independent visual interpretation created by the author for portfolio purposes. Not an official source and not affiliated with or endorsed by any company. Values are adapted, not reproduced.',
    primaryHue: 'blue',
  },
  rangergreen: {
    label: 'RangerGreen',
    source: 'Interpretation of a digital investing brand: mint green, charcoal and a serif display face',
    disclaimer: 'An independent visual interpretation created by the author for portfolio purposes. Not an official source and not affiliated with or endorsed by any company. Values are adapted, not reproduced.',
    primaryHue: 'mint',
  },
};

// Descriptions that were written for a blue theme and need to be theme-neutral.
const DESC = {
  'background.primary': 'Solid primary brand background for emphasis areas.',
  'background.secondary': 'Secondary brand background for supporting emphasis areas.',
  'background.promotional': 'Deepest brand background for banners and promotional areas.',
  'content.onLight': 'Text on light or pale-tinted backgrounds, including light solid status fills.',
  'brand.primary': 'Primary brand colour. Used for links, active borders, and emphasis.',
  'brand.secondary': 'Secondary brand colour.',
  'brand.tertiary': 'Tertiary brand colour (highlight).',
  'brand.tertiaryTint': 'Very light tint of the tertiary colour for highlight backgrounds.',
  'brand.tertiaryShade': 'Darker shade of the tertiary colour.',
};

const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const LINK = { default: 'defaultBase', 'default-hover': 'defaultHover', destructive: 'destructiveBase', inverse: 'inverseDefault', 'inverse-hover': 'inverseHover' };
const toContractPath = (figmaName) => {
  const seg = figmaName.split('/');
  if (seg[0] === 'link') return ['link', LINK[seg[1]]];
  return seg.map(camel);
};

const WEIGHTS = { Thin: 100, ExtraLight: 200, Light: 300, Regular: 400, Medium: 500, SemiBold: 600, Bold: 700, ExtraBold: 800, Black: 900 };
const parseStyle = (name) => {
  const italic = /Italic$/.test(name);
  const base = name.replace(/\s*Italic$/, '').trim() || 'Regular';
  if (!(base in WEIGHTS)) throw new Error(`Unknown font style "${name}"`);
  return { weight: WEIGHTS[base], style: italic ? 'italic' : 'normal', figmaStyle: name };
};
const SERIF = new Set(['Bitter', 'Noto Serif']);
const MONO = new Set(['DM Mono', 'Kode Mono', 'IBM Plex Mono', 'ui-monospace']);
const stackFor = (family) => {
  if (family === 'system-ui') return 'system-ui, -apple-system, "Segoe UI", sans-serif';
  if (family === 'ui-monospace') return 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
  const q = family.includes(' ') ? `"${family}"` : family;
  return `${q}, ${SERIF.has(family) ? 'Georgia, serif' : MONO.has(family) ? 'ui-monospace, Menlo, monospace' : 'system-ui, sans-serif'}`;
};

const hex6 = (h) => h.toLowerCase();
const coreVar = (hue, step) => (step ? `${P}core-${hue}-${step}` : `${P}core-${hue}`);

const out = {};
for (const [name, info] of Object.entries(THEMES)) {
  // ---- core palette (mode independent) ----
  const core = {};
  const coreLookup = new Map(); // "blue/500" -> {cssVariable, value}
  const add = (hue, step, value) => {
    const key = step ? `${hue}/${step}` : hue;
    const cssVariable = coreVar(hue, step);
    (core[hue] ??= {})[step ?? 'base'] = { cssVariable, value: hex6(value) };
    coreLookup.set(key, { cssVariable, value: hex6(value) });
  };
  for (const [k, v] of Object.entries(prims)) {
    const m = k.match(new RegExp(`^color/${name}/(.+)$`));
    if (!m) continue;
    const seg = m[1].split('/');
    if (seg.length === 2 && /^\d{3}$/.test(seg[1])) add(seg[0], seg[1], v);
    else if (seg.length === 1) add(seg[0], null, v);
    else if (seg[0] === 'alpha') add('alpha', seg[1], v);
    else if (seg[0] === 'extra') add('extra', seg[1], v);
  }

  // ---- semantic tokens for this theme ----
  const modeIdx = { light: sem.modes.indexOf(`${name}-light`), dark: sem.modes.indexOf(`${name}-dark`) };
  if (modeIdx.light < 0 || modeIdx.dark < 0) throw new Error(`Snapshot has no modes for ${name}`);
  const resolveEntry = (entry) => {
    if (entry.startsWith('=')) return { value: hex6(entry.slice(1)), resolved: hex6(entry.slice(1)) };
    const c = coreLookup.get(entry);
    if (!c) throw new Error(`[${name}] unresolved alias "${entry}"`);
    return { value: `var(${c.cssVariable})`, resolved: c.value };
  };

  const categories = {};
  const catDesc = (c) => meta.categories[c] ?? '';
  const put = (pathArr, t) => {
    const [cat, ...rest] = pathArr;
    categories[cat] ??= { description: catDesc(cat) };
    let target = categories[cat];
    if (cat === 'status') {
      const [g, key] = rest;
      target.groups ??= {};
      target.groups[g] ??= { description: meta.categories[`status.${g}`] ?? '', tokens: {} };
      target.groups[g].tokens[key] = t;
    } else if (cat === 'extension') {
      const [g, key] = rest;
      target.groups ??= {};
      target.groups[g] ??= { description: EXT_GROUP_DESC[g] ?? '', tokens: {} };
      target.groups[g].tokens[key] = t;
    } else {
      target.tokens ??= {};
      target.tokens[rest[0]] = t;
    }
  };
  const EXT_GROUP_DESC = {
    accent: 'Accent role used for emphasis text, fills and borders. Falls back to the brand colour in themes that have no separate accent.',
    content: 'Extra foreground roles that sit outside the 60-token contract.',
    background: 'Extra background roles that sit outside the 60-token contract.',
    border: 'Extra border roles that sit outside the 60-token contract.',
    risk: 'Ten-step risk scale used by the RangerGreen theme (low to high).',
  };
  const EXT_DESC = {
    'extension.accent.text': 'Accent-coloured text.',
    'extension.accent.fill': 'Accent solid fill (buttons, chips, highlights).',
    'extension.accent.border': 'Accent border.',
    'extension.content.onAccent': 'Text and icons on an accent fill.',
    'extension.content.inverse': 'Text on an inverse background.',
    'extension.content.muted': 'Muted, low-emphasis foreground.',
    'extension.content.online': 'Online or live indicator colour.',
    'extension.background.inverse': 'Inverse page background (dark on light themes, light on dark).',
    'extension.background.overlayTransparent': 'Translucent overlay behind modals and sheets.',
    'extension.background.fog': 'Translucent white wash.',
    'extension.background.shade': 'Translucent dark wash.',
    'extension.border.strong': 'High-emphasis border.',
  };

  const seen = new Set();
  for (const [figmaName, row] of Object.entries(sem.rows)) {
    const entries = row.split(',');
    const cp = toContractPath(figmaName);
    const key = cp.join('.');
    const light = resolveEntry(entries[modeIdx.light]);
    const dark = resolveEntry(entries[modeIdx.dark]);
    const isExt = cp[0] === 'extension';
    const m = meta.tokens[key];
    if (!isExt && !m) throw new Error(`No contract meta for ${key}`);
    const cssVariable = isExt ? `${P}${cp.map((s) => s.replace(/([A-Z])/g, '-$1').toLowerCase()).join('-')}` : m.css;
    put(cp, { cssVariable, description: isExt ? EXT_DESC[key] ?? '' : DESC[key] ?? m.desc, light, dark });
    seen.add(key);
  }
  // brand.gradient is not a Figma variable: derive it from the theme's primary hue.
  const h = info.primaryHue;
  const grad = (resolved) => ({ value: `linear-gradient(125deg, var(${P}core-${h}-600) 0%, var(${P}core-${h}-800) 100%)`, resolved });
  const g1 = coreLookup.get(`${h}/600`).value;
  const g2 = coreLookup.get(`${h}/800`).value;
  const gr = grad(`linear-gradient(125deg, ${g1} 0%, ${g2} 100%)`);
  put(['brand', 'gradient'], { cssVariable: `${P}brand-gradient`, description: `Brand gradient from ${h} 600 to ${h} 800.`, light: gr, dark: gr });
  seen.add('brand.gradient');
  for (const p of contract.tokens) if (!seen.has(p)) throw new Error(`[${name}] contract token missing from Figma: ${p}`);

  // theme-only extension: RangerGreen risk scale
  for (const [k, v] of Object.entries(prims)) {
    const m = k.match(new RegExp(`^extension/${name}/risk/(\\d+)$`));
    if (m) put(['extension', 'risk', m[1]], { cssVariable: `${P}extension-risk-${m[1]}`, description: `Risk level ${Number(m[1])} of 10.`, light: { value: hex6(v), resolved: hex6(v) }, dark: { value: hex6(v), resolved: hex6(v) } });
  }

  // order categories as in the contract
  const order = ['background', 'content', 'brand', 'status', 'border', 'link', 'extension'];
  const ordered = {};
  for (const c of order) if (categories[c]) ordered[c] = categories[c];
  ordered.corePalette = {
    description: 'Raw colour scale for this theme, named {hue}-{step} (050 to 900, optional 950). Values do not change between modes. Semantic tokens reference these.',
    modeIndependent: true,
    tokens: core,
  };

  // ---- typography ----
  const fam = (r) => prims[`font/${name}/family/${r}`];
  const sty = (r) => parseStyle(prims[`font/${name}/style/${r}`]);
  const families = Object.fromEntries(['display', 'highlight', 'body', 'mono'].map((r) => [r, { family: fam(r), stack: stackFor(fam(r)) }]));
  const weights = Object.fromEntries(['display', 'highlight', 'heading', 'label', 'body'].map((r) => [r, sty(r)]));

  out[name] = {
    theme: {
      name,
      label: info.label,
      cssVariablePrefix: P,
      modes: ['light', 'dark'],
      source: info.source,
      disclaimer: info.disclaimer,
      typography: { families, weights, note: 'heading and label use the display family. weights[role] drives font-weight and font-style for that role.' },
    },
    categories: ordered,
  };
}

for (const [name, json] of Object.entries(out)) {
  const dir = path.join(root, 'themes', name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'tokens.json'), JSON.stringify(json, null, 2) + '\n');
}

// ---- type scale (theme independent) ----
const num = (s) => Number(s);
const scale = {};
for (const line of styleLines) {
  const [styleName, role, weight, size, lh, ls, tcase, deco] = line.split('|');
  const [group, step] = styleName.split('/');
  const lhVal = lh.endsWith('%') ? { unit: 'em', value: Math.round(parseFloat(lh)) / 100 } : { unit: 'px', value: num(lh) };
  const lsVal = ls.endsWith('%') ? { unit: 'em', value: parseFloat(ls) / 100 } : { unit: 'px', value: num(ls) };
  const entry = {
    figmaName: styleName,
    group,
    step,
    family: role,
    weightSource: weight.startsWith('@') ? weight.slice(1) : 'fixed',
    ...(weight.startsWith('@') ? {} : parseStyle(weight)),
    fontSize: num(size),
    lineHeight: lhVal,
    letterSpacing: lsVal,
    ...(tcase ? { textTransform: tcase === 'UPPER' ? 'uppercase' : tcase.toLowerCase() } : {}),
    ...(deco ? { textDecoration: deco.toLowerCase() } : {}),
  };
  scale[styleName] = entry;
}
fs.writeFileSync(
  path.join(root, 'typography.json'),
  JSON.stringify(
    {
      note: 'Theme-independent type scale, mirrored from the Figma text styles. family is a role (display, highlight, body, mono). weightSource names a theme weight role (display, highlight, heading, label, body); "fixed" means the style carries its own weight and italic.',
      styles: scale,
    },
    null,
    2,
  ) + '\n',
);

console.log(`Imported ${Object.keys(out).length} themes (${Object.keys(out).join(', ')}) and ${Object.keys(scale).length} text styles.`);
