import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { CookieNotice } from "@/components/layout/CookieNotice";

// Display: high-contrast editorial serif (Canela/Reckless substitute).
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

// Body / UI: clean neutral grotesk (Neue Haas substitute).
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rudransh Wellness — Ancient herbs. Modern life.",
    template: "%s · Rudransh Wellness",
  },
  description:
    "A premium herbal wellness lifestyle brand. Shop by goal — skin, stress & sleep, digestion, immunity. Pure herbs, guided rituals, considered care.",
  openGraph: {
    title: "Rudransh Wellness",
    description: "Ancient herbs. Modern life.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <CookieNotice />
        </CartProvider>
      </body>
    </html>
  );
}
