import { getProductCategories, getProducts } from "./repository";
import { ProductCatalog } from "./ProductCatalog";

/**
 * Server component: fetches data (dummy now, DB later) and hands it to the interactive catalog.
 */
export async function Products() {
  const [products, categories] = await Promise.all([getProducts(), getProductCategories()]);

  return (
    <section id="products" aria-labelledby="products-title" className="bg-white py-20">
      <ProductCatalog products={products} categories={categories} />
    </section>
  );
}
