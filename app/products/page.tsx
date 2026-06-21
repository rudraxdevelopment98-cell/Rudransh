import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description: "Single-origin herbs and blends, filterable by wellness goal.",
};

export default function ProductsPage() {
  return (
    <div className="section pt-40 bg-warmwhite">
      <div className="container-luxe">
        <SectionHeading
          label="The collection"
          title="Every herb, considered."
          intro="Pure, single-origin formulations. Filter by the goal you're supporting."
        />
        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
