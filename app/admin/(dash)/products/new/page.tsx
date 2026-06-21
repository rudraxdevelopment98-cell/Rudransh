import { createProduct } from "@/app/admin/actions";
import { ProductForm } from "../ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-h2 text-forest-deep">New product</h1>
      <div className="mt-8">
        <ProductForm action={createProduct} submitLabel="Create product" />
      </div>
    </div>
  );
}
