import type {
  Article,
  Goal,
  Product,
  Ritual,
  SubscriptionTier,
} from "./types";

/**
 * Placeholder content for v1 scaffolding. Once the Shopify Storefront API and
 * CMS (Sanity / metaobjects) are connected, these arrays are replaced by data
 * fetchers — components consume the same shapes either way.
 *
 * Imagery uses warm, botanical, shallow-depth references per designSystem.imagery.
 */

const IMG = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;

export const goals: Goal[] = [
  {
    name: "Skin",
    slug: "skin",
    heroImage: IMG("photo-1556228578-8c89e6adf883", 1800),
    tagline: "Clarity, from within.",
    intro:
      "A considered approach to skin that begins with what you take in. Time-honoured herbs, used daily, as part of a calm ritual.",
    herbs: ["Neem", "Turmeric"],
    matchedProductSlugs: ["neem-powder", "turmeric-powder"],
    recommendedRitualSlug: "morning-clarity",
  },
  {
    name: "Stress & Sleep",
    slug: "stress-sleep",
    heroImage: IMG("photo-1556228720-195a672e8a03", 1800),
    tagline: "Quiet the noise.",
    intro:
      "Adaptogens and gentle botanicals traditionally used to support a settled mind and restful evenings.",
    herbs: ["Ashwagandha", "Herbal teas"],
    matchedProductSlugs: ["ashwagandha", "immunity-tea"],
    recommendedRitualSlug: "evening-calm",
  },
  {
    name: "Digestion",
    slug: "digestion",
    heroImage: IMG("photo-1597318181409-cf64d0b5d8a2", 1800),
    tagline: "Balance, daily.",
    intro:
      "Triphala and supporting herbs, traditionally used to support everyday digestive balance.",
    herbs: ["Triphala"],
    matchedProductSlugs: ["triphala"],
    recommendedRitualSlug: "evening-calm",
  },
  {
    name: "Immunity",
    slug: "immunity",
    heroImage: IMG("photo-1543362906-acfc16c67564", 1800),
    tagline: "Everyday resilience.",
    intro:
      "Herbal blends and teas that fit into a daily routine of considered, natural support.",
    herbs: ["Herbal blends"],
    matchedProductSlugs: ["immunity-tea", "herbal-oil"],
    recommendedRitualSlug: "morning-clarity",
  },
];

export const products: Product[] = [
  {
    name: "Neem",
    slug: "neem-powder",
    goalTags: ["skin"],
    shortDescription:
      "Single-origin neem leaf, finely milled. Traditionally used as part of a daily skin ritual.",
    price: 1800,
    currency: "GBP",
    images: [IMG("photo-1610970881699-44a5587cabec"), IMG("photo-1556228578-8c89e6adf883")],
    benefits: [
      "Traditionally used to support clear, balanced skin",
      "Pure, single-ingredient leaf powder",
      "Slow-dried to preserve character",
    ],
    usage: "Half a teaspoon mixed into water or a smoothie, once daily.",
    warnings:
      "Not intended to diagnose, treat, cure, or prevent any condition. Consult a healthcare professional if pregnant, nursing, or taking medication.",
    dailyRoutine: [
      "Morning — stir into warm water before breakfast",
      "Pair with the Morning Clarity ritual",
    ],
    ingredients: ["100% Azadirachta indica (neem) leaf powder"],
    subscribable: true,
  },
  {
    name: "Turmeric",
    slug: "turmeric-powder",
    goalTags: ["skin", "immunity"],
    shortDescription:
      "High-curcumin root, sun-dried and stone-milled. A warm, grounding daily staple.",
    price: 1600,
    currency: "GBP",
    images: [IMG("photo-1615485290382-441e4d049cb5"), IMG("photo-1597318181409-cf64d0b5d8a2")],
    benefits: [
      "Traditionally used to support skin and everyday wellbeing",
      "Naturally high in curcumin",
      "Single-origin root",
    ],
    usage: "Quarter to half a teaspoon in warm milk or water, once daily.",
    warnings:
      "Not intended to diagnose, treat, cure, or prevent any condition. May stain. Consult a professional if pregnant, nursing, or on medication.",
    dailyRoutine: ["Evening — whisk into warm milk before rest"],
    ingredients: ["100% Curcuma longa (turmeric) root powder"],
    subscribable: true,
  },
  {
    name: "Ashwagandha",
    slug: "ashwagandha",
    goalTags: ["stress-sleep"],
    shortDescription:
      "Root adaptogen, traditionally used to support a settled mind and restful evenings.",
    price: 2400,
    currency: "GBP",
    images: [IMG("photo-1611072172377-0cabc3addb30"), IMG("photo-1512069772995-ec65ed45afd6")],
    benefits: [
      "Adaptogen traditionally used to support calm",
      "KSM-style full-spectrum root",
      "Part of an evening wind-down ritual",
    ],
    usage: "One teaspoon in warm milk in the evening.",
    warnings:
      "Not intended to diagnose, treat, cure, or prevent any condition. Avoid if pregnant. Consult a professional if on medication.",
    dailyRoutine: ["Evening — blend into warm milk one hour before sleep"],
    ingredients: ["100% Withania somnifera (ashwagandha) root powder"],
    subscribable: true,
  },
  {
    name: "Triphala",
    slug: "triphala",
    goalTags: ["digestion"],
    shortDescription:
      "The classic three-fruit blend, traditionally used to support daily digestive balance.",
    price: 2000,
    currency: "GBP",
    images: [IMG("photo-1582719478250-c89cae4dc85b"), IMG("photo-1597318181409-cf64d0b5d8a2")],
    benefits: [
      "Traditional three-fruit Ayurvedic blend",
      "Used daily to support digestive balance",
      "Gentle, food-based formulation",
    ],
    usage: "Half a teaspoon in warm water before bed.",
    warnings:
      "Not intended to diagnose, treat, cure, or prevent any condition. Consult a professional if pregnant, nursing, or on medication.",
    dailyRoutine: ["Evening — dissolve in warm water before rest"],
    ingredients: ["Amalaki", "Bibhitaki", "Haritaki"],
    subscribable: true,
  },
  {
    name: "Herbal Oil",
    slug: "herbal-oil",
    goalTags: ["immunity", "skin"],
    shortDescription:
      "A warming botanical body oil for daily self-massage and grounding ritual.",
    price: 2800,
    currency: "GBP",
    images: [IMG("photo-1608571423902-eed4a5ad8108"), IMG("photo-1556228578-8c89e6adf883")],
    benefits: [
      "Cold-pressed botanical base",
      "For daily abhyanga-style self-massage",
      "Warm, earthy aromatic profile",
    ],
    usage: "Warm a small amount and massage into skin before bathing.",
    warnings:
      "For external use only. Patch test before first use. Avoid broken skin.",
    dailyRoutine: ["Morning — massage before a warm shower"],
    ingredients: ["Sesame oil", "Botanical infusion blend"],
    subscribable: false,
  },
  {
    name: "Immunity Tea",
    slug: "immunity-tea",
    goalTags: ["immunity", "stress-sleep"],
    shortDescription:
      "A loose-leaf herbal blend for a considered daily cup. Caffeine-free.",
    price: 1400,
    currency: "GBP",
    images: [IMG("photo-1576092768241-dec231879fc3"), IMG("photo-1597481499750-3e6b22637e12")],
    benefits: [
      "Caffeine-free daily ritual",
      "Warming, aromatic botanical blend",
      "A gentle moment of pause",
    ],
    usage: "Steep one teaspoon in hot water for five minutes.",
    warnings:
      "Not intended to diagnose, treat, cure, or prevent any condition. Check ingredients for allergens.",
    dailyRoutine: ["All day — a warm cup whenever you pause"],
    ingredients: ["Tulsi", "Ginger", "Cardamom", "Liquorice root"],
    subscribable: true,
  },
];

export const rituals: Ritual[] = [
  {
    name: "Morning Clarity",
    slug: "morning-clarity",
    goal: "skin",
    timeOfDay: "Morning",
    intro:
      "A short, grounding sequence to begin the day with intention — for skin and everyday resilience.",
    steps: [
      { title: "Cleanse from within", detail: "Neem stirred into warm water before breakfast." },
      { title: "Warm the body", detail: "Herbal oil self-massage before a warm shower." },
      { title: "Steep & pause", detail: "A cup of immunity tea as the day begins." },
    ],
    productSlugs: ["neem-powder", "herbal-oil", "immunity-tea"],
  },
  {
    name: "Evening Calm",
    slug: "evening-calm",
    goal: "stress-sleep",
    timeOfDay: "Evening",
    intro:
      "Wind the day down with adaptogens and warmth, traditionally used to support rest.",
    steps: [
      { title: "Settle the mind", detail: "Ashwagandha blended into warm milk." },
      { title: "Support balance", detail: "Triphala dissolved in warm water before bed." },
      { title: "Warm comfort", detail: "Turmeric milk to close the evening." },
    ],
    productSlugs: ["ashwagandha", "triphala", "turmeric-powder"],
  },
];

export const subscriptionTiers: SubscriptionTier[] = [
  {
    name: "The Essentials Kit",
    slug: "essentials",
    description: "A curated monthly trio to anchor a single wellness goal.",
    pricePerMonth: 4200,
    currency: "GBP",
    includes: ["Three core herbs", "Printed ritual card", "Free delivery"],
    cadenceOptions: ["Monthly", "Every 2 months"],
  },
  {
    name: "The Ritual Kit",
    slug: "ritual",
    description: "Everything for a complete daily ritual, refreshed each month.",
    pricePerMonth: 6800,
    currency: "GBP",
    includes: [
      "Five herbs & blends",
      "Seasonal botanical addition",
      "Ritual card & journal",
      "Free priority delivery",
    ],
    cadenceOptions: ["Monthly", "Every 2 months"],
    featured: true,
  },
  {
    name: "The House Kit",
    slug: "house",
    description: "Our complete selection for the whole household, every month.",
    pricePerMonth: 9600,
    currency: "GBP",
    includes: [
      "Full core range",
      "Two seasonal additions",
      "Concierge wellness note",
      "Free priority delivery",
    ],
    cadenceOptions: ["Monthly", "Every 2 months"],
  },
];

export const articles: Article[] = [
  {
    title: "Why we shop by goal, not by shelf",
    slug: "shop-by-goal",
    hero: IMG("photo-1542601906990-b4d3fb778b09", 1800),
    excerpt:
      "Most herbal stores ask you to already know the answer. We start with the question instead.",
    body: [
      "The traditional herbal aisle assumes expertise most of us don't have. Rows of jars, Latin names, and no thread connecting them to how we actually live.",
      "We built Rudransh around a single question: what are you hoping to support? From there, the herbs, the rituals, and the routine follow naturally.",
      "This is wellness framed as a practice, not a purchase — considered, daily, and quietly effective.",
    ],
    relatedGoals: ["skin", "immunity"],
    publishedAt: "2026-05-12",
  },
  {
    title: "Adaptogens, gently explained",
    slug: "adaptogens-explained",
    hero: IMG("photo-1611072172377-0cabc3addb30", 1800),
    excerpt:
      "A calm primer on the herbs traditionally used to support a settled mind.",
    body: [
      "Adaptogen is a word that gets used a great deal and explained very little.",
      "Traditionally, these are botanicals used to support the body's everyday equilibrium — ashwagandha among the most well known.",
      "As with everything here: a small amount, taken daily, as part of a ritual you can keep.",
    ],
    relatedGoals: ["stress-sleep"],
    publishedAt: "2026-04-28",
  },
  {
    title: "The case for the evening ritual",
    slug: "evening-ritual",
    hero: IMG("photo-1512069772995-ec65ed45afd6", 1800),
    excerpt: "How a few quiet minutes can reframe the close of a day.",
    body: [
      "Rest is not only about sleep. It is about the hour before it.",
      "A warm cup, a slow massage, a moment without a screen — small rituals that signal the day is done.",
      "Our Evening Calm ritual brings together the herbs traditionally used to support this transition.",
    ],
    relatedGoals: ["stress-sleep", "digestion"],
    publishedAt: "2026-04-10",
  },
];

/* ── lookup helpers ──────────────────────────────────────────────────────── */

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getGoal = (slug: string) => goals.find((g) => g.slug === slug);

export const getRitual = (slug: string) =>
  rituals.find((r) => r.slug === slug);

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const getProductsByGoal = (slug: string) =>
  products.filter((p) => p.goalTags.includes(slug as never));
