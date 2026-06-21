# Rudransh Wellness

Ultra-luxury herbal wellness storefront — _"Ancient herbs. Modern life."_

A premium, editorial commerce experience built around **Shop by Goal**: customers
choose by how they want to feel (Skin, Stress & Sleep, Digestion, Immunity)
rather than browsing SKUs. Built from `rudransh-wellness-build-spec/v1`.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — design tokens mapped from the spec in `tailwind.config.ts`
- **Framer Motion** — shared quiet-motion variants in `lib/motion.ts`
- **Prisma + SQLite** — self-owned database, no third-party commerce platform
- Self-built **admin panel** at `/admin` (scrypt-hashed password, signed session
  cookie) to manage products, order status, and view subscribers
- **Cash on delivery** checkout — orders are placed and stored directly,
  re-priced server-side from the database

## Getting started

```bash
npm install
cp .env.example .env       # DATABASE_URL, SESSION_SECRET, ADMIN_USERNAME/PASSWORD
npm run db:setup           # prisma db push + seed (creates the admin user)
npm run dev                # http://localhost:3000
```

Visit `/admin` and sign in with `ADMIN_USERNAME` / `ADMIN_PASSWORD` (defaults:
`admin` / `rudransh123`) to manage products and orders.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run db:push` | Push the Prisma schema to the database |
| `npm run db:seed` | Seed products/content + create the admin user |
| `npm run db:setup` | `db:push` + `db:seed` |
| `npm run db:studio` | Open Prisma Studio (browse/edit DB directly) |

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
  cart/                  Cart
  checkout/              Cash-on-delivery checkout (server action: placeOrder)
  order/[orderNumber]/   Order confirmation / status lookup
  account/               Order-number tracking (full accounts: phase 2)
  admin/                 Password-protected admin panel (products, orders,
                         subscribers, dashboard)
  legal/[slug]/          Terms, Privacy, Shipping, Disclaimer, Cookies
components/
  layout/                Nav, Footer, CartDrawer, Newsletter, CookieNotice
  commerce/              ProductCard, GoalTile, ProductGrid, EducationModule,
                         AddToCart, RitualCard, SubscriptionTierCard
  checkout/              CheckoutForm
  sections/              Hero
  cart/                  CartProvider (client cart context, snapshot-based lines)
  ui/                    Button, Reveal (motion), SectionHeading
lib/
  data.ts                Seed content (goals, products, rituals, articles)
  queries.ts             Reads DB rows into the typed content model
  db.ts                  Prisma client singleton
  auth.ts                Admin auth: scrypt password hashing, signed sessions
  types.ts               Content model
  motion.ts              Shared Framer Motion variants
  format.ts              Price & date formatting
prisma/
  schema.prisma          Product/Goal/Ritual/Article/Order/Subscriber/AdminUser
  seed.ts                Seeds content + creates the default admin user
```

## Design system

Palette, typography scale, and spacing rhythm live in `tailwind.config.ts`:

- **Grounds** default to warm white / bone — never pure white.
- **Deep forest** for footer, immersive sections, primary buttons.
- **Gold** is a jewellery accent only — hairlines, icons, hover, key CTAs.
- **Display** serif (Cormorant Garamond → Canela/Reckless in production) for
  headlines; **Inter** (→ Neue Haas) for body/UI.
- Motion is quiet: fade + rise, slow image zoom, soft cross-fades. No bounce.

## Database & admin

Everything runs on a self-owned Prisma/SQLite database — no third-party
commerce platform. To scale beyond SQLite, change `provider` in
`prisma/schema.prisma` to `"postgresql"` and point `DATABASE_URL` at a
Postgres instance; the rest of the app is unaffected.

Admin panel (`/admin`):
- Sign in with `ADMIN_USERNAME` / `ADMIN_PASSWORD`.
- **Products** — create, edit, delete; array fields (images, benefits,
  ingredients, etc.) are edited as newline-separated text.
- **Orders** — view full order/customer detail, update status.
- **Subscribers** — view newsletter signups.

Checkout is cash-on-delivery: `app/checkout/actions.ts` re-validates and
re-prices every line against the database (never trusts client totals)
before creating the order.

## Compliance

No medical, curative, or disease-treatment claims anywhere. Copy uses
wellness framing ("traditionally used to support…"). Per-product warnings and a
global disclaimer are surfaced; herbal regulations vary by country, so
availability and shipping may be restricted by region.

## Roadmap

- **v1 (this scaffold):** Home, Shop by Goal, Product detail, Cart, core brand pages
- **v2 (current):** Self-owned Prisma/SQLite backend, admin panel, COD checkout
- **v3:** Card payments, customer accounts, subscription billing engine, global expansion
