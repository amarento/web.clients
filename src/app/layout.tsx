import type { Metadata } from "next";
import {
  Beau_Rivage,
  Bellefair,
  Bodoni_Moda,
  Cormorant_Garamond,
  Inter,
  Beth_Ellen,
  Homemade_Apple,
  Schoolbell,
  Hanken_Grotesk,
} from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "~/components/ui/sonner";
import "~/styles/globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Amarento",
  description: "WhatsApp RSVP",
  icons: [{ rel: "icon", url: "/logo-white.svg" }],
};

const inter = Inter({
  variable: "--font-inter",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const beau = Beau_Rivage({
  variable: "--font-beau",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const bellefair = Bellefair({
  variable: "--font-bellefair",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const beth = Beth_Ellen({
  variable: "--font-beth",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const apple = Homemade_Apple({
  variable: "--font-apple",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const schoolbell = Schoolbell({
  variable: "--font-schoolbell",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  weight: ["300", "400"],
  subsets: ["latin"],
  display: "swap",
});

const marjorie = localFont({
  src: "./_assets/fonts/Marjorie-Regular.woff2",
  variable: "--font-marjorie",
  weight: "400",
  display: "swap",
});

const marjorieSemiBold = localFont({
  src: "./_assets/fonts/Marjorie-SemiBold.woff2",
  variable: "--font-marjorie-semibold",
  weight: "500",
  display: "swap",
});

const lastik = localFont({
  src: "./_assets/fonts/Lastik-Regular.woff2",
  variable: "--font-lastik",
  weight: "400",
  display: "swap",
});

const melodrame = localFont({
  src: "./_assets/fonts/Melodrame.woff2",
  variable: "--font-melodrame",
  weight: "400",
  display: "swap",
});

const retrofans = localFont({
  src: "./_assets/fonts/Retrofans-Oblique.woff2",
  variable: "--font-retrofans",
  weight: "400",
  display: "swap",
});

const queensila = localFont({
  src: "./_assets/fonts/Queensila.woff2",
  variable: "--font-queensila",
  weight: "400",
  display: "swap",
});

const snell = localFont({
  src: "./_assets/fonts/Snell-BT-Regular.woff2",
  variable: "--font-snell",
  weight: "400",
  display: "swap",
});

const freight = localFont({
  src: "./_assets/fonts/FreightBigProLight-Italic.woff2",
  variable: "--font-freight",
  weight: "400",
  display: "swap",
});

const foret = localFont({
  src: "./_assets/fonts/Foret.woff2",
  variable: "--font-foret",
  weight: "400",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${inter.variable} ${cormorant.variable} ${beau.variable} ${bellefair.variable} ${bodoni.variable} ${beth.variable} ${apple.variable} ${schoolbell.variable} ${hanken.variable} ${marjorie.variable} ${marjorieSemiBold.variable} ${lastik.variable} ${melodrame.variable} ${retrofans.variable} ${queensila.variable} ${snell.variable} ${freight.variable} ${foret.variable}`}
      lang="en"
    >
      <body className="overflow-hidden bg-white">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
