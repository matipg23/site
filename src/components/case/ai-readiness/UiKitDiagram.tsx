// Case 02 > The product application. Inline SVG, coloured only through theme tokens.
// Stands in for the UI kit screen capture: Figma and Lovable kits fed by one governed design system.

const logos = [
  { name: "Figma", src: "figma.png", bg: "#14120b" },
  { name: "Lovable", src: "lovable.png", bg: "#f7f4ed" },
];

const tags = [
  { label: "tokens", x: 360 },
  { label: "components", x: 510 },
  { label: "themes", x: 660 },
  { label: "guidelines", x: 810 },
];

const base = "/images/fd-ai-readiness/logos/";

// A glassy card: translucent fill over the page, accent hairline
const glass = "[fill:var(--background-surface)] [stroke:var(--border-accent)]";

function Kit({ x, name, logo, bg }: { x: number; name: string; logo: string; bg: string }) {
  return (
    <g>
      <clipPath id={`kit-clip-${name}`}>
        <rect x={x + 28} y="298" width="36" height="36" rx="9" />
      </clipPath>
      <rect x={x} y="270" width="380" height="250" rx="20" className={glass} fillOpacity="0.55" strokeWidth="1.5" />
      <rect x={x + 28} y="298" width="36" height="36" rx="9" fill={bg} />
      <image
        href={`${base}${logo}`}
        x={x + 33}
        y="303"
        width="26"
        height="26"
        clipPath={`url(#kit-clip-${name})`}
        preserveAspectRatio="xMidYMid slice"
      >
        <title>{name}</title>
      </image>
      <text x={x + 78} y="323" className="font-display text-[24px] font-bold [fill:var(--text-primary)]">
        {name} UI kit
      </text>

      {/* Mock interface: card, text lines, primary action, themed swatches */}
      <rect x={x + 28} y="358" width="324" height="142" rx="12" className="[fill:var(--background-page)] [stroke:var(--border-subtle)]" strokeWidth="1.5" />
      <rect x={x + 48} y="378" width="96" height="62" rx="8" className="[fill:var(--background-shade)] [stroke:var(--border-subtle)]" strokeWidth="1.5" />
      <rect x={x + 160} y="380" width="168" height="10" rx="5" className="[fill:var(--text-muted)]" />
      <rect x={x + 160} y="402" width="120" height="10" rx="5" className="[fill:var(--text-muted)]" />
      <rect x={x + 160} y="428" width="88" height="28" rx="8" className="[fill:var(--background-action)]" />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={x + 60 + i * 28}
          cy="472"
          r="9"
          className={
            i === 0
              ? "[fill:var(--background-action)]"
              : i === 1
                ? "[fill:var(--text-accent)]"
                : "[fill:var(--text-secondary)]"
          }
        />
      ))}
      <text x={x + 160} y="482" className="font-mono text-[14px] [fill:var(--text-secondary)]">
        Aa
      </text>
    </g>
  );
}

export default function UiKitDiagram({ alt }: { alt: string }) {
  return (
    <svg viewBox="0 0 1280 560" role="img" aria-label={alt} className="h-auto w-full">
      {/* Sources, floating above the design system */}
      {tags.map((t) => (
        <g key={t.label}>
          <path
            d={`M${t.x + 55} 66C${t.x + 55} 110 640 100 640 150`}
            fill="none"
            className="[stroke:var(--border-accent)]"
            strokeWidth="1.2"
            strokeDasharray="2 4"
          />
          <rect
            x={t.x}
            y="22"
            width="110"
            height="44"
            rx="10"
            className={glass}
            fillOpacity={0.55}
            strokeWidth="1.5"
          />
          <text x={t.x + 55} y="50" textAnchor="middle" className="font-mono text-[15px] font-bold [fill:var(--text-primary)]">
            {t.label}
          </text>
        </g>
      ))}

      {/* Design system plate: three stacked layers */}
      <rect x="470" y="190" width="340" height="62" rx="14" className="[fill:var(--background-surface)] [stroke:var(--border-subtle)]" strokeWidth="1.5" />
      <rect x="470" y="172" width="340" height="62" rx="14" className="[fill:var(--background-surface)] [stroke:var(--border-subtle)]" strokeWidth="1.5" />
      <rect x="470" y="150" width="340" height="62" rx="14" className="[fill:var(--background-action)] [stroke:var(--border-accent)]" strokeWidth="2" />
      <text x="640" y="188" textAnchor="middle" className="font-display text-[22px] font-bold [fill:var(--text-inverse)]">
        DESIGN SYSTEM
      </text>

      {/* Feeds into each kit */}
      <g fill="none" className="[stroke:var(--border-accent)]" strokeWidth="1.6">
        <path d="M470 232C380 232 330 250 280 268" />
        <path d="M810 232C900 232 950 250 1000 268" />
      </g>

      <Kit x={90} name="Figma" logo={logos[0].src} bg={logos[0].bg} />
      <Kit x={810} name="Lovable" logo={logos[1].src} bg={logos[1].bg} />

      {/* Theme chip between the kits */}
      <g>
        <rect x="560" y="360" width="160" height="44" rx="22" className={glass} fillOpacity="0.55" strokeWidth="1.5" />
        <text x="640" y="388" textAnchor="middle" className="font-mono text-[15px] font-bold [fill:var(--text-accent)]">
          THEMES + MODES
        </text>
        <path d="M470 382H556M724 382H810" fill="none" className="[stroke:var(--border-accent)]" strokeWidth="1.4" strokeDasharray="2 4" />
      </g>
    </svg>
  );
}
