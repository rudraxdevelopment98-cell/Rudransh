/** Content model — mirrors contentModel in the build spec. */

export type GoalSlug = "skin" | "stress-sleep" | "digestion" | "immunity";

export interface Goal {
  name: string;
  slug: GoalSlug;
  heroImage: string;
  tagline: string;
  intro: string;
  herbs: string[];
  matchedProductSlugs: string[];
  recommendedRitualSlug: string;
}

export interface Product {
  name: string;
  slug: string;
  goalTags: GoalSlug[];
  shortDescription: string;
  price: number; // minor unit handled by formatPrice
  currency: string;
  images: string[];
  benefits: string[];
  usage: string;
  warnings: string;
  dailyRoutine: string[];
  ingredients: string[];
  subscribable: boolean;
  /** Shopify variant id, wired once Storefront API is connected. */
  shopifyVariantId?: string;
}

export interface Ritual {
  name: string;
  slug: string;
  goal: GoalSlug;
  timeOfDay: "Morning" | "Evening" | "All day";
  intro: string;
  steps: { title: string; detail: string }[];
  productSlugs: string[];
}

export interface Article {
  title: string;
  slug: string;
  hero: string;
  excerpt: string;
  body: string[];
  relatedGoals: GoalSlug[];
  publishedAt: string;
}

export interface SubscriptionTier {
  name: string;
  slug: string;
  description: string;
  pricePerMonth: number;
  currency: string;
  includes: string[];
  cadenceOptions: string[];
  featured?: boolean;
}

export interface CartLine {
  productSlug: string;
  name: string;
  price: number; // snapshot at add-time; re-validated server-side at checkout
  currency: string;
  image: string;
  quantity: number;
  subscription?: boolean;
}
