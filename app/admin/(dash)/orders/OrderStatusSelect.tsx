"use client";

import { updateOrderStatus } from "@/app/admin/actions";

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  return (
    <select
      defaultValue={status}
      onChange={(e) => updateOrderStatus(orderId, e.target.value)}
      className="border border-ink/20 bg-warmwhite px-2 py-1 text-xs uppercase tracking-button focus:border-gold focus:outline-none"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
