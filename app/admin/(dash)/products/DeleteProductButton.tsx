"use client";

import { deleteProduct } from "@/app/admin/actions";

export function DeleteProductButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <form
      action={deleteProduct.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button className="text-caption uppercase tracking-button text-ink/40 hover:text-clay">
        Delete
      </button>
    </form>
  );
}
