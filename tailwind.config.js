/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      // Semantic colour tokens. Values live in src/styles/tokens.css (synced from Figma).
      // Components use these only, never primitives.
      backgroundColor: {
        page: "var(--background-page)",
        surface: "var(--background-surface)",
        overlay: "var(--background-overlay)",
        "overlay-transparent": "var(--background-overlay-transparent)",
        fog: "var(--background-fog)",
        shade: "var(--background-shade)",
        action: "var(--background-action)",
        inverse: "var(--background-inverse)",
        online: "var(--text-online)",
        glass: "var(--glass-fill)",
        "action-primary": "var(--action-primary)",
        "action-accent": "var(--action-accent)",
        // Swatch strip on the token card uses these as fills, as in Figma
        "text-secondary": "var(--text-secondary)",
        "border-default": "var(--border-default)",
        "border-subtle": "var(--border-subtle)",
        "border-accent": "var(--border-accent)",
        nav: "var(--nav-background)",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        inverse: "var(--text-inverse)",
        action: "var(--text-action)",
        accent: "var(--text-accent)",
        online: "var(--text-online)",
        "action-accent": "var(--action-accent)",
        "action-primary-text": "var(--action-primary-text)",
        nav: "var(--nav-text)",
        "nav-active": "var(--nav-text-active)",
      },
      borderColor: {
        default: "var(--border-default)",
        subtle: "var(--border-subtle)",
        strong: "var(--border-strong)",
        accent: "var(--border-accent)",
        glass: "var(--glass-stroke)",
        fog: "var(--background-fog)",
      },
      outlineColor: {
        accent: "var(--border-accent)",
      },
      // Thesis band: radial glow from Figma (centre 67% / 87.5%, radii 42% x 31%)
      backgroundImage: {
        band: "radial-gradient(ellipse 41.7% 31.3% at 66.7% 87.5%, var(--band-from) 0%, var(--band-to) 100%)",
      },
      // Primitives kept only for the Intro motion piece (src/components/sections/Intro.tsx)
      colors: {
        white: "#ffffff",
        black: "#0a0a0a",
        neutral: {
          200: "#e9ecef",
          300: "#ced4da",
          500: "#6c757d",
          600: "#495057",
          900: "#1c1c1c",
        },
        teal: {
          DEFAULT: "#005047",
        },
      },
      fontFamily: {
        // CSS variables injected in layout.tsx; names mirror the Figma "Fonts" collection
        display: ["var(--font-display)", "sans-serif"],
        highlight: ["var(--font-highlight)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        // Aliases used by the Intro
        expanded: ["var(--font-display)", "sans-serif"],
        kode: ["var(--font-mono)", "monospace"],
      },
      // Figma text styles are the .type-* classes in globals.css.
      // These sizes remain only for the Intro.
      fontSize: {
        "body-lg":    ["17px", { lineHeight: "32px" }],
        "caption-sm": ["11px", { lineHeight: "17px", letterSpacing: "1.54px" }],
        "intro-giant":    ["clamp(56px, 13vw, 240px)", { lineHeight: "1",    letterSpacing: "-0.02em" }],
        "intro-xl":       ["clamp(30px, 6.2vw, 116px)", { lineHeight: "1",    letterSpacing: "-0.02em" }],
        "intro-hero":     ["clamp(30px, 6vw, 112px)",  { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "intro-lg":       ["clamp(22px, 3.4vw, 64px)", { lineHeight: "1",    letterSpacing: "-0.01em" }],
        "intro-md":       ["clamp(13px, 1.6vw, 30px)", { lineHeight: "1.1",  letterSpacing: "0" }],
        "intro-ghost":    ["clamp(36px, 5.6vw, 104px)", { lineHeight: "1",   letterSpacing: "-0.02em" }],
        "intro-mono":     ["clamp(14px, 1.5vw, 26px)", { lineHeight: "1.6",  letterSpacing: "0" }],
        "intro-code":     ["clamp(16px, 2.4vw, 44px)", { lineHeight: "1.5",  letterSpacing: "0" }],
        "intro-monogram": ["34vw",                     { lineHeight: "1",    letterSpacing: "-0.03em" }],
      },
      // Literal pixel scale: p-24 means 24px
      spacing: {
        1:   "1px",
        2:   "2px",
        4:   "4px",
        8:   "8px",
        12:  "12px",
        16:  "16px",
        20:  "20px",
        24:  "24px",
        32:  "32px",
        40:  "40px",
        48:  "48px",
        56:  "56px",
        64:  "64px",
        80:  "80px",
        96:  "96px",
        112: "112px",
        128: "128px",
        gutter: "clamp(16px, 7vw, 128px)",
        // Semantic spacing, values in tokens.css (defined in code, not yet in Figma)
        section: "var(--space-section)",
        eyebrow: "var(--space-eyebrow)",
        title: "var(--space-title)",
        lead: "var(--space-lead)",
        block: "var(--space-block)",
        paragraph: "var(--space-paragraph)",
        action: "var(--space-action)",
        card: "var(--space-card)",
        "card-stack": "var(--space-card-stack)",
      },
      maxWidth: {
        // Figma content frame: 1344 wide with 32px side padding (1280 of content)
        content: "1344px",
        prose: "640px",
      },
      // Radius scale, values in tokens.css (defined in code, not yet in Figma)
      borderRadius: {
        DEFAULT: "var(--radius-xs)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      // Figma effect styles "Shadow" and "Shadow 2"
      boxShadow: {
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
        glass: "inset 0 1px 0 0 var(--glass-highlight)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    },
  },
  plugins: [],
};
