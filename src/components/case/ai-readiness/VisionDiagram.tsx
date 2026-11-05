// Figma: Case 02 > The vision diagram. Inline SVG, coloured only through theme tokens.

const logos = [
  { name: "Claude", src: "claude.svg", x: 630, y: 9, bg: "#171409" },
  { name: "ChatGPT", src: "chatgpt.svg", x: 555, y: 52, bg: "#ffffff" },
  { name: "Gemini", src: "gemini.jpg", x: 705, y: 51, bg: "#ffffff" },
  { name: "Figma", src: "figma.png", x: 559, y: 135, bg: "#14120b" },
  { name: "Cursor", src: "cursor.png", x: 701, y: 135, bg: "#14120b" },
  { name: "Lovable", src: "lovable.png", x: 633, y: 172, bg: "#f7f4ed" },
];

const tags = [
  { label: "foundations", x: 377, w: 132 },
  { label: "guidelines", x: 534, w: 122 },
  { label: "components", x: 681, w: 121 },
  { label: "tokens", x: 827, w: 78 },
];

const base = "/images/fd-ai-readiness/logos/";

export default function VisionDiagram({ alt }: { alt: string }) {
  return (
    <svg viewBox="0 0 1280 473" role="img" aria-label={alt} className="h-auto w-full">
      <defs>
        <marker id="vision-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M1 1l8 4-8 4" fill="none" className="[stroke:var(--border-accent)]" strokeWidth="1.4" />
        </marker>
        {logos.map((l) => (
          <clipPath key={l.name} id={`vision-clip-${l.name}`}>
            <rect x={l.x} y={l.y} width="23" height="23" rx="5.7" />
          </clipPath>
        ))}
      </defs>

      {/* Entry and output boxes */}
      {[66, 918].map((x) => (
        <rect
          key={x}
          x={x}
          y="66"
          width="296"
          height="110"
          rx="12"
          className="[fill:var(--background-surface)] [stroke:var(--border-default)]"
          strokeWidth="2"
        />
      ))}
      <g className="[fill:var(--text-accent)]">
        {/* upload icon */}
        <path d="M206 94h16v3h-16zM214 99l7 8h-4.5v8h-5v-8H207z" />
        {/* dashboard icon */}
        <path d="M1056 92h10v14h-10zM1068 92h10v6h-10zM1068 100h10v14h-10zM1056 108h10v6h-10z" />
      </g>
      <g className="[fill:var(--text-primary)] font-display text-[22px] font-bold" textAnchor="middle">
        <text x="214" y="146">User Prompt</text>
        <text x="1066" y="146">DS-Driven Output</text>
      </g>
      <g className="font-mono text-[14px] [fill:var(--text-primary)]" textAnchor="middle">
        <text x="214" y="212">ENTRY POINT</text>
        <text x="1066" y="212">RELIABLE, PREDICTABLE OUTPUT</text>
      </g>

      {/* Flow arrows */}
      <g fill="none" className="[stroke:var(--border-accent)]" strokeWidth="1.6" markerEnd="url(#vision-arrow)">
        <path d="M362 116C440 116 470 92 538 95" markerEnd="url(#vision-arrow)" />
        <path d="M744 95C820 92 850 118 918 117" markerEnd="url(#vision-arrow)" />
      </g>
      <path
        d="M641 208V284"
        fill="none"
        className="[stroke:var(--border-accent)]"
        strokeWidth="1.6"
        strokeDasharray="2 4"
        markerStart="url(#vision-arrow)"
        markerEnd="url(#vision-arrow)"
      />

      {/* Agent ring */}
      <circle cx="641" cy="102" r="102" className="[fill:var(--background-surface)] [stroke:var(--border-accent)]" />
      <circle cx="641" cy="102" r="64" className="[fill:var(--background-page)] [stroke:var(--border-accent)]" />
      <text
        x="641"
        y="109"
        textAnchor="middle"
        className="font-display text-[17px] font-bold [fill:var(--text-accent)]"
      >
        AI AGENT
      </text>
      {logos.map((l) => (
        <g key={l.name}>
          <rect x={l.x} y={l.y} width="23" height="23" rx="5.7" fill={l.bg} />
          <image
            href={`${base}${l.src}`}
            x={l.x + 2.4}
            y={l.y + 2.4}
            width="18.2"
            height="18.2"
            clipPath={`url(#vision-clip-${l.name})`}
            preserveAspectRatio="xMidYMid slice"
          >
            <title>{l.name}</title>
          </image>
        </g>
      ))}

      {/* Design system */}
      <rect
        x="430"
        y="286"
        width="422"
        height="82"
        rx="12"
        className="[fill:var(--background-surface)] [stroke:var(--border-subtle)]"
        strokeWidth="2"
      />
      <path d="M631 303h8v10h-8zM641 303h8v5h-8zM641 310h8v10h-8zM631 315h8v5h-8z" className="[fill:var(--text-accent)]" />
      <text
        x="641"
        y="346"
        textAnchor="middle"
        className="font-display text-[22px] font-bold [fill:var(--text-primary)]"
      >
        AI-READY DESIGN SYSTEM
      </text>

      {/* Sources feeding the design system */}
      <g fill="none" className="[stroke:var(--text-secondary)]" strokeWidth="1" strokeDasharray="2 3">
        {tags.map((t) => (
          <path key={t.label} d={`M${t.x + t.w / 2} 440C${t.x + t.w / 2} 400 641 410 641 372`} />
        ))}
      </g>
      {tags.map((t) => (
        <g key={t.label}>
          <rect
            x={t.x}
            y="440"
            width={t.w}
            height="32"
            rx="3"
            className="[fill:var(--background-surface)] [stroke:var(--border-subtle)]"
            strokeWidth="1.5"
          />
          <text
            x={t.x + t.w / 2}
            y="462"
            textAnchor="middle"
            className="font-mono text-[18px] font-bold [fill:var(--text-secondary)]"
          >
            {t.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
