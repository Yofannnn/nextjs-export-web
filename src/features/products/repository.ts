import { productCategories } from "@/data/productCategories";
import { products } from "@/data/products";
import type { Product } from "./types";

/**
 * TODO: move this to a database and rewrite these functions. Components should not import `data/products` directly.
 */

type ProductQuery = {
  categoryId?: string;
  includeDrafts?: boolean;
};

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  return products
    .filter((p) => query.includeDrafts || p.status !== "draft")
    .filter((p) => !query.categoryId || p.categoryId === query.categoryId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug && p.status !== "draft") ?? null;
}

export async function getProductCategories() {
  return productCategories;
}

/**
 * For the RFQ dropdown: only products a buyer can actually request.
 */
export async function getRfqProductOptions() {
  const list = await getProducts();
  return list.filter((p) => p.status === "active").map(({ slug, name }) => ({ slug, name }));
}
