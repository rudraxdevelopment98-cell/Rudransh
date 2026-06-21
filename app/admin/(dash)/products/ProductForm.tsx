"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";

export interface ProductDefaults {
  slug: string;
  name: string;
  shortDescription: string;
  price: number;
  currency: string;
  stock: number;
  usage: string;
  warnings: string;
  images: string; // newline-joined
  goalTags: string; // newline-joined
  benefits: string; // newline-joined
  dailyRoutine: string; // newline-joined
  ingredients: string; // newline-joined
  subscribable: boolean;
  featured: boolean;
  active: boolean;
}

const EMPTY: ProductDefaults = {
  slug: "",
  name: "",
  shortDescription: "",
  price: 0,
  currency: "GBP",
  stock: 100,
  usage: "",
  warnings: "",
  images: "",
  goalTags: "",
  benefits: "",
  dailyRoutine: "",
  ingredients: "",
  subscribable: false,
  featured: false,
  active: true,
};

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary disabled:opacity-50"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}

const inputCls =
  "mt-2 w-full border border-ink/20 bg-warmwhite px-4 py-2.5 focus:border-gold focus:outline-none";

export function ProductForm({
  action,
  defaults = EMPTY,
  submitLabel = "Save product",
}: {
  action: (formData: FormData) => void;
  defaults?: ProductDefaults;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="max-w-3xl">
      <div className="grid gap-6 sm:grid-cols-2">
        <label>
          <span className="label">Name</span>
          <input name="name" defaultValue={defaults.name} required className={inputCls} />
        </label>
        <label>
          <span className="label">Slug</span>
          <input name="slug" defaultValue={defaults.slug} required className={inputCls} />
        </label>
        <label className="sm:col-span-2">
          <span className="label">Short description</span>
          <input
            name="shortDescription"
            defaultValue={defaults.shortDescription}
            className={inputCls}
          />
        </label>
        <label>
          <span className="label">Price (pence, e.g. 1800 = £18.00)</span>
          <input
            name="price"
            type="number"
            min={0}
            defaultValue={defaults.price}
            required
            className={inputCls}
          />
        </label>
        <label>
          <span className="label">Currency</span>
          <input name="currency" defaultValue={defaults.currency} className={inputCls} />
        </label>
        <label>
          <span className="label">Stock</span>
          <input
            name="stock"
            type="number"
            min={0}
            defaultValue={defaults.stock}
            className={inputCls}
          />
        </label>
        <label>
          <span className="label">Goal tags (one per line)</span>
          <textarea
            name="goalTags"
            rows={4}
            defaultValue={defaults.goalTags}
            placeholder="skin&#10;immunity"
            className={inputCls}
          />
        </label>
        <label className="sm:col-span-2">
          <span className="label">Image URLs (one per line)</span>
          <textarea
            name="images"
            rows={3}
            defaultValue={defaults.images}
            className={inputCls}
          />
        </label>
        <label className="sm:col-span-2">
          <span className="label">Benefits (one per line)</span>
          <textarea
            name="benefits"
            rows={4}
            defaultValue={defaults.benefits}
            className={inputCls}
          />
        </label>
        <label className="sm:col-span-2">
          <span className="label">Usage</span>
          <textarea
            name="usage"
            rows={2}
            defaultValue={defaults.usage}
            className={inputCls}
          />
        </label>
        <label className="sm:col-span-2">
          <span className="label">Warnings</span>
          <textarea
            name="warnings"
            rows={2}
            defaultValue={defaults.warnings}
            className={inputCls}
          />
        </label>
        <label className="sm:col-span-2">
          <span className="label">Daily routine (one per line)</span>
          <textarea
            name="dailyRoutine"
            rows={3}
            defaultValue={defaults.dailyRoutine}
            className={inputCls}
          />
        </label>
        <label className="sm:col-span-2">
          <span className="label">Ingredients (one per line)</span>
          <textarea
            name="ingredients"
            rows={3}
            defaultValue={defaults.ingredients}
            className={inputCls}
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-8">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="subscribable"
            defaultChecked={defaults.subscribable}
          />
          <span className="text-sm">Subscribable</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" defaultChecked={defaults.featured} />
          <span className="text-sm">Featured</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="active"
            defaultChecked={defaults.active}
            value="on"
          />
          <span className="text-sm">Active (visible on site)</span>
        </label>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <Submit label={submitLabel} />
        <Link
          href="/admin/products"
          className="text-caption uppercase tracking-button text-ink/50 hover:text-gold"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
