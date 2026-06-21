import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatPrice, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-sand text-umber",
  confirmed: "bg-forest-moss/20 text-ink",
  shipped: "bg-forest-moss/20 text-ink",
  delivered: "bg-forest-deep text-paper",
  cancelled: "bg-ink/10 text-ink/50",
};

export default async function AdminDashboard() {
  const [productCount, orderCount, subscriberCount, pendingCount, revenue, recent] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.subscriber.count(),
      prisma.order.count({ where: { status: "pending" } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { not: "cancelled" } },
      }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        include: { items: true },
      }),
    ]);

  const stats = [
    { label: "Revenue", value: formatPrice(revenue._sum.total ?? 0) },
    { label: "Orders", value: String(orderCount) },
    { label: "Pending", value: String(pendingCount) },
    { label: "Products", value: String(productCount) },
    { label: "Subscribers", value: String(subscriberCount) },
  ];

  return (
    <div>
      <h1 className="font-display text-h2 text-ink">Dashboard</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="border border-ink/10 bg-bone p-6">
            <p className="label">{s.label}</p>
            <p className="mt-2 font-display text-3xl text-ink">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-between">
        <h2 className="font-display text-2xl text-ink">Recent orders</h2>
        <Link
          href="/admin/orders"
          className="text-caption uppercase tracking-button text-clay hover:text-gold"
        >
          All orders →
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className="mt-6 text-ink/50">No orders yet.</p>
      ) : (
        <div className="mt-6 overflow-x-auto border border-ink/10 bg-bone">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink/10 text-ink/50">
              <tr>
                <th className="px-5 py-3 font-normal">Order</th>
                <th className="px-5 py-3 font-normal">Customer</th>
                <th className="px-5 py-3 font-normal">Items</th>
                <th className="px-5 py-3 font-normal">Total</th>
                <th className="px-5 py-3 font-normal">Status</th>
                <th className="px-5 py-3 font-normal">Date</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((order) => (
                <tr key={order.id} className="border-b border-ink/5">
                  <td className="px-5 py-3 font-medium text-ink">
                    {order.orderNumber}
                  </td>
                  <td className="px-5 py-3">{order.customerName}</td>
                  <td className="px-5 py-3">{order.items.length}</td>
                  <td className="px-5 py-3">
                    {formatPrice(order.total, order.currency)}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block px-2 py-1 text-xs uppercase tracking-button ${
                        STATUS_STYLES[order.status] ?? "bg-ink/10"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-ink/50">
                    {formatDate(order.createdAt.toISOString())}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
