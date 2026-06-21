# Rudransh Wellness

Ultra-luxury herbal wellness storefront — _"Ancient herbs. Modern life."_

A premium, editorial commerce experience built around **Shop by Goal**: customers
choose by how they want to feel (Skin, Stress & Sleep, Digestion, Immunity)
rather than browsing SKUs. Built from `rudransh-wellness-build-spec/v1`.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — design tokens mapped from the spec in `tailwind.config.ts`
- **Framer Motion** — shared quiet-motion variants in `lib/motion.ts`
- **Shopify Storefront API** (headless) — client in `lib/shopify.ts`

## Getting started

```bash
npm install
cp .env.example .env.local   # add Shopify token when ready
npm run dev                  # http://localhost:3000
```

The storefront is **fully navigable without a Shopify connection** — it runs on
placeholder content in `lib/data.ts` and a local client-side cart. Wire the
Storefront API to enable live products and checkout.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

## Project structure

```
app/                     Routes (App Router)
  page.tsx               Home — hero, shop-by-goal, story, featured, journal, trust
  goals/[goal]/          Goal landing — herbs → matched products → ritual
  products/              Editorial grid (filter by goal)
  products/[slug]/       Product detail — education tabs, add to cart, ritual
  subscriptions/         Kit tiers + how it works
  rituals/               Guided daily routines
  journal/ + [slug]/     Education content
  about/                 Vision, mission, sourcing
  cart/  account/        Cart + account management
  legal/[slug]/          Terms, Privacy, Shipping, Disclaimer, Cookies
components/
  layout/                Nav, Footer, CartDrawer, Newsletter, CookieNotice
  commerce/              ProductCard, GoalTile, ProductGrid, EducationModule,
                         AddToCart, RitualCard, SubscriptionTierCard
  sections/              Hero
  cart/                  CartProvider (client cart context)
  ui/                    Button, Reveal (motion), SectionHeading
lib/
  data.ts                Placeholder content (goals, products, rituals, articles)
  types.ts               Content model
  shopify.ts             Storefront API client (env-driven)
  motion.ts              Shared Framer Motion variants
  format.ts              Price & date formatting
```

## Design system

Palette, typography scale, and spacing rhythm live in `tailwind.config.ts`:

- **Grounds** default to warm white / bone — never pure white.
- **Deep forest** for footer, immersive sections, primary buttons.
- **Gold** is a jewellery accent only — hairlines, icons, hover, key CTAs.
- **Display** serif (Cormorant Garamond → Canela/Reckless in production) for
  headlines; **Inter** (→ Neue Haas) for body/UI.
- Motion is quiet: fade + rise, slow image zoom, soft cross-fades. No bounce.

## Connecting Shopify

1. Create a Storefront API access token in your Shopify admin.
2. Set in `.env.local`:
   ```
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=...
   ```
3. Replace the `lib/data.ts` reads with Storefront queries and swap the
   `CartProvider` actions / `cart` page checkout for `cartCreate` →
   `cart.checkoutUrl` (scaffolded in `lib/shopify.ts`).

## Compliance

No medical, curative, or disease-treatment claims anywhere. Copy uses
wellness framing ("traditionally used to support…"). Per-product warnings and a
global disclaimer are surfaced; herbal regulations vary by country, so
availability and shipping may be restricted by region.

## Roadmap

- **v1 (this scaffold):** Home, Shop by Goal, Product detail, Cart, core brand pages
- **v2:** Live Shopify checkout, subscription engine, CMS-backed Journal, Klaviyo
- **v3:** Personal wellness plans, accounts, global expansion
