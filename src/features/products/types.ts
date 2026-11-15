import type { ProductCategoryId } from "@/data/productCategories";
import type { CertificationId, ExportDocumentId } from "@/data/compliance";
import type { Localized } from "@/lib/localized";

export type StorageType = "frozen" | "chilled" | "ambient";

export type ShippingOption = "dry-20ft" | "dry-40ft" | "reefer-20ft" | "reefer-40ft" | "flexibag" | "air-freight";

export type ProductStatus = "active" | "coming-soon" | "draft";

export interface ProductImage {
  url: string;
  alt: Localized;
}

export interface SpecItem {
  label: Localized;
  value: Localized;
}

export interface Product {
  id: string;
  slug: string;
  status: ProductStatus;
  sortOrder: number;
  categoryId: ProductCategoryId;
  name: Localized;
  summary: Localized;
  images: ProductImage[];
  origin: {
    regions: string[];
    note?: Localized;
  };
  moq: {
    value: number;
    unit: "MT";
    note?: Localized;
  };
  shipping: {
    storage: StorageType;
    temperatureC?: number;
    options: ShippingOption[];
  };
  certifications: CertificationId[];
  documents: ExportDocumentId[];
  specs: SpecItem[];
  availability: {
    yearRound: boolean;
    months?: number[];
    note?: Localized;
  };
}
