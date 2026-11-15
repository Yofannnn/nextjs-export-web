import type { Localized } from "@/lib/localized";

/**
 * ONLY DUMMY DATA. The real product category catalog is in the database later.
 */
export const productCategories = [
  {
    id: "fisheries",
    name: { en: "Fisheries & Seafood", id: "Perikanan & Hasil Laut" },
  },
  {
    id: "plantation",
    name: { en: "Plantation & Coffee", id: "Perkebunan & Kopi" },
  },
  {
    id: "agriculture",
    name: { en: "Agriculture & Fruits", id: "Pertanian & Buah" },
  },
] as const satisfies readonly { id: string; name: Localized }[];

export type ProductCategoryId = (typeof productCategories)[number]["id"];
