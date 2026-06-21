import Link from "next/link";
import { Newsletter } from "./Newsletter";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Shop by Goal", href: "/#goals" },
      { label: "Rituals", href: "/rituals" },
      { label: "Subscriptions", href: "/subscriptions" },
    ],
  },
  {
    title: "Brand",
    links: [
      { label: "About", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Account", href: "/account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Shipping & Returns", href: "/legal/shipping-returns" },
      { label: "Disclaimer", href: "/legal/disclaimer" },
      { label: "Cookie Policy", href: "/legal/cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-forest-deep text-bone">
      <div className="container-luxe py-section">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* newsletter */}
          <div className="max-w-md">
            <p className="font-display text-h2">Rudransh</p>
            <p className="mt-4 text-bone/70">
              Ancient herbs. Modern life. Quiet, considered wellness — delivered
              as a ritual, not a transaction.
            </p>
            <Newsletter />
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-caption uppercase tracking-label text-gold">
                  {col.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-bone/80 transition-colors hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-bone/15 pt-8 text-xs text-bone/50">
          <p className="max-w-3xl">
            These statements have not been evaluated by any medical authority.
            Our products are not intended to diagnose, treat, cure, or prevent
            any disease. Herbal regulations vary by country — availability and
            shipping may be restricted in your region.
          </p>
          <p className="mt-4">
            © {new Date().getFullYear()} Rudransh Wellness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
