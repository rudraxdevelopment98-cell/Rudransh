import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { DeleteProductButton } from "./DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-h2 text-ink">Products</h1>
        <Link href="/admin/products/new" className="btn-primary">
          New product
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-ink/10 bg-bone">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10 text-ink/50">
            <tr>
              <th className="px-5 py-3 font-normal">Name</th>
              <th className="px-5 py-3 font-normal">Slug</th>
              <th className="px-5 py-3 font-normal">Price</th>
              <th className="px-5 py-3 font-normal">Stock</th>
              <th className="px-5 py-3 font-normal">Status</th>
              <th className="px-5 py-3 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-ink/5">
                <td className="px-5 py-3 font-medium text-ink">
                  {p.name}
                  {p.featured && (
                    <span className="ml-2 text-xs text-gold">★ featured</span>
                  )}
                </td>
                <td className="px-5 py-3 text-ink/50">{p.slug}</td>
                <td className="px-5 py-3">{formatPrice(p.price, p.currency)}</td>
                <td className="px-5 py-3">{p.stock}</td>
                <td className="px-5 py-3">
                  {p.active ? (
                    <span className="text-ink">Active</span>
                  ) : (
                    <span className="text-ink/40">Hidden</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-caption uppercase tracking-button text-clay hover:text-gold"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton id={p.id} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
