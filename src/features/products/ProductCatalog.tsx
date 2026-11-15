"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { pick, type Localized } from "@/lib/localized";
import { CategoryFilter } from "./CategoryFilter";
import { ProductCard } from "./ProductCard";
import { ProductDialog } from "./ProductDialog";
import type { Product } from "./types";

type CategoryOption = { id: string; name: Localized };

export function ProductCatalog({ products, categories }: { products: Product[]; categories: readonly CategoryOption[] }) {
  const t = useTranslations("Products");
  const locale = useLocale() as Locale;

  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filterOptions = categories.filter((c) => products.some((p) => p.categoryId === c.id)).map((c) => ({ id: c.id, label: pick(c.name, locale) }));

  const categoryName = (id: string) => filterOptions.find((c) => c.id === id)?.label ?? "";

  const visible = activeCategory === "all" ? products : products.filter((p) => p.categoryId === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">{t("eyebrow")}</p>
          <h2 id="products-title" className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        <CategoryFilter options={filterOptions} active={activeCategory} onChange={setActiveCategory} />
      </div>

      {visible.length === 0 ? (
        <p className="py-12 text-center text-slate-500">{t("empty")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryName={categoryName(product.categoryId)}
              onViewSpecs={(p) => {
                setSelected(p);
                setDialogOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <ProductDialog product={selected} categoryName={selected ? categoryName(selected.categoryId) : ""} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
