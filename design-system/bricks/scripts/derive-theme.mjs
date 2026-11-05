#!/usr/bin/env node
// One-off helper: turns a source token file into your own "interpretation" theme.
// - renames the CSS variable prefix to the BRICKS prefix
// - nudges colours inside a hue range (default: the blue family) so the values are visibly yours
// - rewrites the theme metadata block (name, label, disclaimer)
// Run it once, commit ONLY the output. Never commit the source file.
//
// Usage:
//   node scripts/derive-theme.mjs <in.json> <out.json> --name bluefield --label "BlueField" \
//     --from-prefix --base- --hue 8 --sat 0 --range 190-260 --source "Interpretation of a sports-betting brand palette"

import fs from 'node:fs';

const [, , inFile, outFile, ...rest] = process.argv;
const opt = (k, d) => {
  const i = rest.indexOf(`--${k}`);
  return i === -1 ? d : rest[i + 1];
};
const name = opt('name');
const label = opt('label', name);
const fromPrefix = opt('from-prefix', '--base-');
const toPrefix = opt('to-prefix', '--bricks-');
const hueShift = Number(opt('hue', 0));
const satShift = Number(opt('sat', 0)); // percent, relative
const [lo, hi] = opt('range', '190-260').split('-').map(Number);
const source = opt('source', 'Independent interpretation');
if (!inFile || !outFile || !name) {
  console.error('Usage: derive-theme.mjs <in> <out> --name <slug> [--label L] [--hue N] [--sat N] [--range a-b] [--source S]');
  process.exit(1);
}

const toHsl = ([r, g, b]) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  return [h, s, l];
};
const toRgb = ([h, s, l]) => {
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [r + m, g + m, b + m].map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255));
};
const shiftHex = (hex) => {
  const body = hex.slice(1);
  const rgb = [0, 2, 4].map((i) => parseInt(body.slice(i, i + 2), 16));
  const [h, s, l] = toHsl(rgb);
  if (s < 0.08 || h < lo || h > hi) return hex; // leave greys and status colours alone
  const out = toRgb([(h + hueShift + 360) % 360, Math.min(1, s * (1 + satShift / 100)), l]);
  return '#' + out.map((v) => v.toString(16).padStart(2, '0')).join('') + body.slice(6);
};

let text = fs.readFileSync(inFile, 'utf8');
text = text.replaceAll(fromPrefix, toPrefix);
text = text.replace(/#[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?\b/g, (m) => shiftHex(m.toLowerCase()));
const json = JSON.parse(text);

json.theme = {
  name,
  label,
  cssVariablePrefix: toPrefix,
  modes: ['light', 'dark'],
  source,
  disclaimer:
    'An independent visual interpretation created by the author for portfolio purposes. Not an official source and not affiliated with or endorsed by any company. Values are adapted, not reproduced.',
  derivation: { hueShift, satShift, hueRange: [lo, hi] },
};
fs.writeFileSync(outFile, JSON.stringify(json, null, 2) + '\n');
console.log(`Wrote ${outFile} (hue ${hueShift >= 0 ? '+' : ''}${hueShift} on ${lo}-${hi} degrees, prefix ${toPrefix}).`);
