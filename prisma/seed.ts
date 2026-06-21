import { PrismaClient } from "@prisma/client";
import { randomBytes, scryptSync } from "node:crypto";
import { goals, products, rituals, articles } from "../lib/data";

const prisma = new PrismaClient();

// Inline scrypt hash so the seed has no dependency on server-only modules.
function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  console.log("Seeding Rudransh Wellness…");

  // Products
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        shortDescription: p.shortDescription,
        price: p.price,
        currency: p.currency,
        images: JSON.stringify(p.images),
        goalTags: JSON.stringify(p.goalTags),
        benefits: JSON.stringify(p.benefits),
        usage: p.usage,
        warnings: p.warnings,
        dailyRoutine: JSON.stringify(p.dailyRoutine),
        ingredients: JSON.stringify(p.ingredients),
        subscribable: p.subscribable,
        featured: p.slug === "ashwagandha",
      },
    });
  }

  // Goals
  let order = 0;
  for (const g of goals) {
    await prisma.goal.upsert({
      where: { slug: g.slug },
      update: {},
      create: {
        slug: g.slug,
        name: g.name,
        tagline: g.tagline,
        intro: g.intro,
        heroImage: g.heroImage,
        herbs: JSON.stringify(g.herbs),
        matchedProductSlugs: JSON.stringify(g.matchedProductSlugs),
        recommendedRitualSlug: g.recommendedRitualSlug,
        sortOrder: order++,
      },
    });
  }

  // Rituals
  for (const r of rituals) {
    await prisma.ritual.upsert({
      where: { slug: r.slug },
      update: {},
      create: {
        slug: r.slug,
        name: r.name,
        goal: r.goal,
        timeOfDay: r.timeOfDay,
        intro: r.intro,
        steps: JSON.stringify(r.steps),
        productSlugs: JSON.stringify(r.productSlugs),
      },
    });
  }

  // Articles
  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {},
      create: {
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        hero: a.hero,
        body: JSON.stringify(a.body),
        relatedGoals: JSON.stringify(a.relatedGoals),
        publishedAt: new Date(a.publishedAt),
      },
    });
  }

  // Admin user
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "rudransh123";
  await prisma.adminUser.upsert({
    where: { username },
    update: {},
    create: { username, passwordHash: hashPassword(password) },
  });

  console.log(`Done. Admin login → ${username} / ${password}`);
  console.log("Change ADMIN_PASSWORD in .env before deploying.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
