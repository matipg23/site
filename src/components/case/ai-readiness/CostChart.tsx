// Figma: Case 02 > Cost Chart. Inline SVG, coloured only through theme tokens.

const yTicks = [
  { label: "XL", y: 40 },
  { label: "LG", y: 167 },
  { label: "MD", y: 247 },
  { label: "SM", y: 327 },
];

const xTicks = [
  { label: "(1st)", x: 48 },
  { label: "(2nd)", x: 85 },
  { label: "(3rd)", x: 120 },
  { label: ".......", x: 358 },
  { label: "(40th)", x: 497 },
];

const points = [
  { x: 41, y: 40 },
  { x: 82, y: 164 },
  { x: 118, y: 243 },
];

export default function CostChart({ alt }: { alt: string }) {
  return (
    <svg
      viewBox="0 0 535 352"
      role="img"
      aria-label={alt}
      className="h-auto w-full border border-subtle bg-page font-mono text-[10px] [fill:var(--text-secondary)]"
    >
      <text x="20" y="16" letterSpacing="1">
        RELATIVE EFFORT TO ADD COMPONENT TO SCHEMA (INDEXED)
      </text>
      <path d="M41 40V322H515" fill="none" className="[stroke:var(--border-subtle)]" />
      {yTicks.map((t) => (
        <text key={t.label} x="22" y={t.y + 3}>
          {t.label}
        </text>
      ))}
      {xTicks.map((t) => (
        <text key={t.label} x={t.x} y="332" textAnchor="middle">
          {t.label}
        </text>
      ))}
      <text transform="translate(14 180) rotate(-90)" textAnchor="middle" letterSpacing="1">
        TIME/ENGINEERING COST
      </text>
      <text x="265" y="345" textAnchor="middle" letterSpacing="1">
        COMPONENTS ONBOARDED
      </text>

      <path
        d="M41 40C58 110 82 190 118 243C150 290 210 318 515 318"
        fill="none"
        className="[stroke:var(--border-accent)]"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {points.map((p) => (
        <circle key={p.x} cx={p.x} cy={p.y} r="3.5" className="[fill:var(--border-accent)]" />
      ))}
      <g className="font-bold [fill:var(--text-accent)]" letterSpacing="1">
        <text x="50" y="44">DAYS</text>
        <text x="316" y="302">MINUTES</text>
      </g>
    </svg>
  );
}
