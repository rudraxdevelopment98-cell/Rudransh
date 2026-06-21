import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updateProduct } from "@/app/admin/actions";
import { ProductForm, type ProductDefaults } from "../ProductForm";

function toLines(json: string): string {
  try {
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr.join("\n") : "";
  } catch {
    return "";
  }
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) notFound();

  const defaults: ProductDefaults = {
    slug: product.slug,
    name: product.name,
    shortDescription: product.shortDescription,
    price: product.price,
    currency: product.currency,
    stock: product.stock,
    usage: product.usage,
    warnings: product.warnings,
    images: toLines(product.images),
    goalTags: toLines(product.goalTags),
    benefits: toLines(product.benefits),
    dailyRoutine: toLines(product.dailyRoutine),
    ingredients: toLines(product.ingredients),
    subscribable: product.subscribable,
    featured: product.featured,
    active: product.active,
  };

  return (
    <div>
      <h1 className="font-display text-h2 text-forest-deep">
        Edit {product.name}
      </h1>
      <div className="mt-8">
        <ProductForm
          action={updateProduct.bind(null, product.id)}
          defaults={defaults}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
