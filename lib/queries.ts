import "server-only";
import { prisma } from "./db";
import type {
  Article,
  Goal,
  GoalSlug,
  Product,
  Ritual,
} from "./types";

/**
 * Read layer between Prisma and the UI. Json columns come back as parsed
 * values; we coerce them into the typed content-model shapes the components
 * already consume, so nothing downstream changes.
 */

type Raw = Record<string, unknown>;

// Array/object columns are stored as JSON strings on SQLite; parse defensively.
function json<T>(v: unknown, fallback: T): T {
  if (typeof v !== "string") return fallback;
  try {
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}
const arr = (v: unknown): string[] => json<string[]>(v, []);

function toProduct(p: Raw): Product {
  return {
    name: p.name as string,
    slug: p.slug as string,
    goalTags: arr(p.goalTags) as GoalSlug[],
    shortDescription: p.shortDescription as string,
    price: p.price as number,
    currency: p.currency as string,
    images: arr(p.images),
    benefits: arr(p.benefits),
    usage: p.usage as string,
    warnings: p.warnings as string,
    dailyRoutine: arr(p.dailyRoutine),
    ingredients: arr(p.ingredients),
    subscribable: p.subscribable as boolean,
  };
}

function toGoal(g: Raw): Goal {
  return {
    name: g.name as string,
    slug: g.slug as GoalSlug,
    heroImage: g.heroImage as string,
    tagline: g.tagline as string,
    intro: g.intro as string,
    herbs: arr(g.herbs),
    matchedProductSlugs: arr(g.matchedProductSlugs),
    recommendedRitualSlug: g.recommendedRitualSlug as string,
  };
}

function toRitual(r: Raw): Ritual {
  return {
    name: r.name as string,
    slug: r.slug as string,
    goal: r.goal as GoalSlug,
    timeOfDay: r.timeOfDay as Ritual["timeOfDay"],
    intro: r.intro as string,
    steps: json<Ritual["steps"]>(r.steps, []),
    productSlugs: arr(r.productSlugs),
  };
}

function toArticle(a: Raw): Article {
  return {
    title: a.title as string,
    slug: a.slug as string,
    hero: a.hero as string,
    excerpt: a.excerpt as string,
    body: arr(a.body),
    relatedGoals: arr(a.relatedGoals) as GoalSlug[],
    publishedAt: (a.publishedAt as Date).toISOString(),
  };
}

/* ── products ─────────────────────────────────────────────────────────────── */

export async function getProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(toProduct);
}

export async function getFeaturedProduct(): Promise<Product | null> {
  const row =
    (await prisma.product.findFirst({ where: { featured: true, active: true } })) ??
    (await prisma.product.findFirst({ where: { active: true } }));
  return row ? toProduct(row) : null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? toProduct(row) : null;
}

export async function getProductsByGoal(goal: string): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.goalTags.includes(goal as never));
}

/* ── goals ────────────────────────────────────────────────────────────────── */

export async function getGoals(): Promise<Goal[]> {
  const rows = await prisma.goal.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map(toGoal);
}

export async function getGoalBySlug(slug: string): Promise<Goal | null> {
  const row = await prisma.goal.findUnique({ where: { slug } });
  return row ? toGoal(row) : null;
}

/* ── rituals ──────────────────────────────────────────────────────────────── */

export async function getRituals(): Promise<Ritual[]> {
  const rows = await prisma.ritual.findMany();
  return rows.map(toRitual);
}

export async function getRitualBySlug(slug: string): Promise<Ritual | null> {
  const row = await prisma.ritual.findUnique({ where: { slug } });
  return row ? toRitual(row) : null;
}

/* ── articles ─────────────────────────────────────────────────────────────── */

export async function getArticles(): Promise<Article[]> {
  const rows = await prisma.article.findMany({ orderBy: { publishedAt: "desc" } });
  return rows.map(toArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const row = await prisma.article.findUnique({ where: { slug } });
  return row ? toArticle(row) : null;
}
