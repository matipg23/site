import type { Metadata } from "next";
import { Barlow_Semi_Condensed, Kode_Mono, Public_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/tokens.css";
import "@/styles/themes/globals.css";

// Font families mirror the Figma "Fonts" collection, mode "Zalando"
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "500"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

const kodeMono = Kode_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["900"],
  style: ["italic"],
  variable: "--font-highlight",
});

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

// Runs before paint so the saved or system theme applies without a flash
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${publicSans.variable} ${kodeMono.variable} ${barlowSemiCondensed.variable}`}
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
