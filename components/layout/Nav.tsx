"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";

const NAV_LINKS = [
  { label: "Shop by Goal", href: "/#goals" },
  { label: "Products", href: "/products" },
  { label: "Rituals", href: "/rituals" },
  { label: "Subscriptions", href: "/subscriptions" },
  { label: "Journal", href: "/journal" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open } = useCart();
  const pathname = usePathname();

  // Transparent over hero only on home; solid elsewhere.
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-editorial ${
        solid ? "bg-bone/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="container-luxe flex h-20 items-center justify-between">
        {/* left: nav links (desktop) */}
        <div className="hidden flex-1 items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-caption uppercase tracking-button transition-colors hover:text-gold ${
                solid ? "text-ink" : "text-bone"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* center: wordmark */}
        <Link
          href="/"
          className={`font-display text-2xl tracking-wide transition-colors md:flex-1 md:text-center ${
            solid ? "text-forest-deep" : "text-bone"
          }`}
        >
          Rudransh
        </Link>

        {/* right: cart + mobile toggle */}
        <div className="flex flex-1 items-center justify-end gap-5">
          <button
            onClick={open}
            aria-label="Open cart"
            className={`text-caption uppercase tracking-button transition-colors hover:text-gold ${
              solid ? "text-ink" : "text-bone"
            }`}
          >
            Cart ({count})
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className={`md:hidden ${solid ? "text-ink" : "text-bone"}`}
          >
            <span className="text-caption uppercase tracking-button">
              {menuOpen ? "Close" : "Menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {menuOpen && (
        <div className="border-t border-ink/10 bg-bone md:hidden">
          <div className="container-luxe flex flex-col gap-4 py-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-caption uppercase tracking-button text-ink hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
