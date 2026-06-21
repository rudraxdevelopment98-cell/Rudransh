import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatPrice, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

export default async function OrderPage({
  params,
}: {
  params: { orderNumber: string };
}) {
  const order = await prisma.order.findUnique({
    where: { orderNumber: params.orderNumber },
    include: { items: true },
  });
  if (!order) notFound();

  return (
    <div className="section pt-40 bg-warmwhite min-h-screen">
      <div className="container-luxe max-w-2xl">
        <p className="label">Thank you</p>
        <h1 className="mt-4 font-display text-h1 text-ink">
          Your order is confirmed.
        </h1>
        <p className="mt-4 text-ink/70">
          We&apos;ve received order{" "}
          <span className="font-medium text-ink">
            {order.orderNumber}
          </span>{" "}
          placed on {formatDate(order.createdAt.toISOString())}. Payment is{" "}
          cash on delivery. A confirmation will be sent to {order.email}.
        </p>

        <div className="mt-12 border border-ink/10 bg-bone p-8">
          <h2 className="font-display text-2xl text-ink">Summary</h2>
          <ul className="mt-6 divide-y divide-ink/10">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between py-4">
                <span>
                  <span className="block font-display text-lg text-ink">
                    {item.productName}
                  </span>
                  <span className="text-sm text-ink/50">
                    Qty {item.quantity}
                    {item.subscription ? " · subscription" : ""}
                  </span>
                </span>
                <span>
                  {formatPrice(
                    item.unitPrice * item.quantity,
                    order.currency
                  )}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 border-t border-ink/10 pt-6">
            <div className="flex justify-between text-ink/60">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal, order.currency)}</span>
            </div>
            <div className="flex justify-between text-ink/60">
              <span>Shipping</span>
              <span>
                {order.shipping === 0
                  ? "Free"
                  : formatPrice(order.shipping, order.currency)}
              </span>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-2 font-display text-xl text-ink">
              <span>Total</span>
              <span>{formatPrice(order.total, order.currency)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="label">Delivering to</p>
          <p className="mt-2 text-ink/70">
            {order.customerName}
            <br />
            {order.address1}
            {order.address2 ? `, ${order.address2}` : ""}
            <br />
            {order.city}, {order.postcode}
            <br />
            {order.country}
          </p>
        </div>

        <Link href="/products" className="btn-primary mt-12 inline-flex">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
