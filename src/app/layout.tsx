import type { Metadata } from "next";
import {
  Anton,
  Barlow_Semi_Condensed,
  Bitter,
  DM_Mono,
  DM_Sans,
  Figtree,
  IBM_Plex_Mono,
  Kode_Mono,
  Montserrat,
  Noto_Serif,
  Poppins,
  Public_Sans,
} from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { modeNames } from "../../design-system/bricks/generated/bricks.tokens";
import "../../design-system/bricks/generated/bricks.tokens.css";
import "@/styles/bricks-fonts.css";
import "@/styles/tokens.css";
import "@/styles/themes/globals.css";

// Font families mirror the Figma "Fonts" collection, mode "Zalando"
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-public-sans",
});

const kodeMono = Kode_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-kode-mono",
});

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["900"],
  style: ["italic"],
  variable: "--font-barlow",
});

// Guest theme fonts (free approximations, not the original typefaces). Options are written out per call because next/font needs literals. preload is off, so the browser only
// downloads a face once a guest theme is active and text actually uses it. Wired to --bricks-font-* in bricks-fonts.css.
const poppins = Poppins({ preload: false, display: "swap", subsets: ["latin"], weight: ["600", "700"], variable: "--font-poppins" });
const bitter = Bitter({ preload: false, display: "swap", subsets: ["latin"], weight: ["700"], variable: "--font-bitter" });
const dmSans = DM_Sans({ preload: false, display: "swap", subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-sans" });
const dmMono = DM_Mono({ preload: false, display: "swap", subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono" });
const anton = Anton({ preload: false, display: "swap", subsets: ["latin"], weight: ["400"], variable: "--font-anton" });
const figtree = Figtree({ preload: false, display: "swap", subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-figtree" });
const plexMono = IBM_Plex_Mono({ preload: false, display: "swap", subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-plex-mono" });
const notoSerif = Noto_Serif({ preload: false, display: "swap", subsets: ["latin"], weight: ["900"], style: ["normal", "italic"], variable: "--font-noto-serif" });
const montserrat = Montserrat({ preload: false, display: "swap", subsets: ["latin"], weight: ["900"], style: ["italic"], variable: "--font-montserrat" });

const fontVariables = [
  publicSans, kodeMono, barlowSemiCondensed,
  poppins, bitter, dmSans, dmMono, anton, figtree, plexMono, notoSerif, montserrat,
].map((f) => f.variable).join(" ");

export const metadata: Metadata = {
  metadataBase: new URL("https://matipeinado.com"),
  title: {
    default: "Matias Peinado Greco · Product Design & Design Systems",
    template: "%s · Matias Peinado Greco",
  },
  description:
    "Lead product designer building products and the design systems behind them, across FanDuel, News UK and Nutmeg.",
  openGraph: {
    type: "website",
    siteName: "Matias Peinado Greco",
  },
};

// Runs before paint so the saved or system mode applies without a flash. The theme is always "default" on load:
// a case study can switch to its own theme for that page only (ThemeBar). "theme" is the old single-key mode
// setting, read once so returning visitors keep their mode.
const themeScript = `(function(){try{var d=document.documentElement,M=${JSON.stringify(modeNames)};var m=localStorage.getItem('bricks-mode')||localStorage.getItem('theme');if(M.indexOf(m)<0)m=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme='default';d.dataset.mode=m}catch(e){d.dataset.theme='default'}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Zalando Sans Expanded is not in next/font's list yet, so it loads from Google Fonts directly */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Zalando+Sans+Expanded:ital,wght@0,700;0,900;1,900&display=swap"
        />
      </head>
      <body>
        <a
          href="#main"
          className="type-mono-sm-bold sr-only focus:not-sr-only focus:fixed focus:left-16 focus:top-16 focus:z-50 focus:bg-action-accent focus:px-16 focus:py-12 focus:text-action-primary-text"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
