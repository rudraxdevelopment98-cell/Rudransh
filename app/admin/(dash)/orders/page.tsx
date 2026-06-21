import { prisma } from "@/lib/db";
import { formatPrice, formatDate } from "@/lib/format";
import { OrderStatusSelect } from "./OrderStatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="font-display text-h2 text-ink">Orders</h1>

      {orders.length === 0 ? (
        <p className="mt-8 text-ink/50">No orders yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-ink/10 bg-bone p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl text-ink">
                    {order.orderNumber}
                  </p>
                  <p className="mt-1 text-sm text-ink/60">
                    {order.customerName} · {order.email} · {order.phone}
                  </p>
                  <p className="mt-1 text-sm text-ink/50">
                    {order.address1}
                    {order.address2 ? `, ${order.address2}` : ""}, {order.city},{" "}
                    {order.postcode}, {order.country}
                  </p>
                  {order.notes && (
                    <p className="mt-1 text-sm italic text-ink/50">
                      Note: {order.notes}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-display text-xl text-ink">
                    {formatPrice(order.total, order.currency)}
                  </p>
                  <p className="text-xs text-ink/50">
                    {formatDate(order.createdAt.toISOString())}
                  </p>
                  <div className="mt-2">
                    <OrderStatusSelect orderId={order.id} status={order.status} />
                  </div>
                </div>
              </div>

              <ul className="mt-4 divide-y divide-ink/10 border-t border-ink/10">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between py-2 text-sm"
                  >
                    <span>
                      {item.productName} × {item.quantity}
                      {item.subscription ? " · subscription" : ""}
                    </span>
                    <span>
                      {formatPrice(item.unitPrice * item.quantity, order.currency)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
