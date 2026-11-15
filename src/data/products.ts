import type { Product } from "@/features/products/types";
import { same, type Localized } from "@/lib/localized";

const label = {
  forms: { en: "Product forms", id: "Bentuk produk" },
  grade: { en: "Grade", id: "Grade" },
  packaging: { en: "Packaging", id: "Kemasan" },
  moisture: { en: "Moisture", id: "Kadar air" },
  sugar: { en: "Coconut sugar", id: "Gula kelapa" },
  vco: { en: "Virgin coconut oil (VCO)", id: "Virgin coconut oil (VCO)" },
} satisfies Record<string, Localized>;

/**
 * ONLY DUMMY DATA. The real product catalog is in the database later.
 */
export const products: Product[] = [
  {
    id: "prd_tuna",
    slug: "frozen-yellowfin-tuna",
    status: "active",
    sortOrder: 1,
    categoryId: "fisheries",
    name: {
      en: "Frozen Yellowfin Tuna (Loin & Whole)",
      id: "Tuna Sirip Kuning Beku (Loin & Utuh)",
    },
    summary: {
      en: "Wild-caught from Prigi Bay & Popoh southern coast waters. Grade A sashimi quality or cooked loins.",
      id: "Hasil tangkapan alam dari Teluk Prigi dan perairan pantai selatan Popoh. Kualitas sashimi Grade A atau loin matang.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
        alt: { en: "Frozen yellowfin tuna", id: "Tuna sirip kuning beku" },
      },
    ],
    origin: {
      regions: ["Trenggalek", "Malang"],
      note: { en: "Prigi Bay coast", id: "Pesisir Teluk Prigi" },
    },
    moq: { value: 10, unit: "MT", note: { en: "1×20' FCL", id: "1×20' FCL" } },
    shipping: { storage: "frozen", options: ["reefer-20ft", "reefer-40ft"] },
    certifications: ["haccp"],
    documents: ["health-certificate", "catch-certificate"],
    specs: [
      {
        label: label.forms,
        value: {
          en: "IQF frozen loin, GGT whole, steak",
          id: "Loin beku IQF, GGT utuh, steak",
        },
      },
    ],
    availability: { yearRound: true, months: [5, 6, 7, 8, 9, 10, 11] },
  },
  {
    id: "prd_coffee",
    slug: "dampit-robusta-green-coffee",
    status: "active",
    sortOrder: 2,
    categoryId: "plantation",
    name: {
      en: "Dampit Robusta Green Coffee Beans",
      id: "Biji Kopi Robusta Hijau Dampit",
    },
    summary: {
      en: "Renowned full-bodied Robusta with chocolatey notes, cultivated on the fertile slopes of Mt. Semeru, Malang.",
      id: "Robusta bertubuh penuh dengan aroma cokelat, ditanam di lereng subur Gunung Semeru, Malang.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800",
        alt: { en: "Dampit Robusta green coffee", id: "Kopi robusta hijau Dampit" },
      },
    ],
    origin: {
      regions: ["Malang"],
      note: { en: "Dampit district", id: "Kecamatan Dampit" },
    },
    moq: {
      value: 19.2,
      unit: "MT",
      note: { en: "1×20' FCL (320 jute bags)", id: "1×20' FCL (320 karung goni)" },
    },
    shipping: { storage: "ambient", options: ["dry-20ft"] },
    certifications: [],
    documents: ["phytosanitary", "certificate-of-origin-ico"],
    specs: [
      {
        label: label.grade,
        value: {
          en: "Grade 1 (defects < 11), screen 16–18",
          id: "Grade 1 (cacat < 11), screen 16–18",
        },
      },
      {
        label: label.packaging,
        value: { en: "Jute bags", id: "Karung goni" },
      },
    ],
    availability: { yearRound: false, months: [6, 7, 8, 9] },
  },
  {
    id: "prd_coconut",
    slug: "organic-coconut-sugar-vco",
    status: "active",
    sortOrder: 3,
    categoryId: "plantation",
    name: { en: "Organic Coconut Sugar & VCO", id: "Gula Kelapa Organik & VCO" },
    summary: {
      en: "Low-glycemic granulated coconut palm sugar and cold-pressed Virgin Coconut Oil, processed in Blitar & Trenggalek.",
      id: "Gula semut kelapa berindeks glikemik rendah dan Virgin Coconut Oil cold-pressed, diolah di Blitar & Trenggalek.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=800",
        alt: { en: "Coconut sugar", id: "Gula kelapa" },
      },
    ],
    origin: { regions: ["Blitar", "Trenggalek"] },
    moq: { value: 5, unit: "MT" },
    shipping: { storage: "ambient", options: ["dry-20ft", "flexibag"] },
    certifications: ["usda-organic", "eu-organic", "halal"],
    documents: ["phytosanitary"],
    specs: [
      { label: label.sugar, value: same("Granulated, mesh 16–18") },
      {
        label: label.vco,
        value: { en: "Lauric acid > 50%", id: "Asam laurat > 50%" },
      },
    ],
    availability: {
      yearRound: true,
      note: { en: "Continuous supply", id: "Pasokan berkelanjutan" },
    },
  },
  {
    id: "prd_shrimp",
    slug: "frozen-vannamei-shrimp",
    status: "active",
    sortOrder: 4,
    categoryId: "fisheries",
    name: {
      en: "Frozen Vannamei Shrimp (HLSO/PDTO)",
      id: "Udang Vannamei Beku (HLSO/PDTO)",
    },
    summary: {
      en: "Sustainably farmed white leg shrimp from Banyuwangi and Tulungagung coastal aquaculture centers.",
      id: "Udang vannamei hasil budidaya berkelanjutan dari sentra tambak pesisir Banyuwangi dan Tulungagung.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800",
        alt: { en: "Frozen vannamei shrimp", id: "Udang vannamei beku" },
      },
    ],
    origin: { regions: ["Banyuwangi", "Tulungagung"] },
    moq: {
      value: 12,
      unit: "MT",
      note: { en: "40ft reefer recommended", id: "Disarankan reefer 40ft" },
    },
    shipping: { storage: "frozen", temperatureC: -18, options: ["reefer-40ft"] },
    certifications: ["haccp", "bap"],
    documents: ["health-certificate"],
    specs: [{ label: label.forms, value: same("HLSO, PDTO, block frozen / IQF") }],
    availability: {
      yearRound: true,
    },
  },
  {
    id: "prd_banana",
    slug: "fresh-cavendish-mas-bananas",
    status: "active",
    sortOrder: 5,
    categoryId: "agriculture",
    name: {
      en: "Fresh Cavendish & Mas Bananas",
      id: "Pisang Cavendish & Mas Segar",
    },
    summary: {
      en: "Export-grade fresh green bananas grown in the volcanic soil of the Lumajang & Malang foothills.",
      id: "Pisang hijau segar kualitas ekspor yang tumbuh di tanah vulkanik kaki gunung Lumajang & Malang.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&q=80&w=800",
        alt: { en: "Fresh Cavendish bananas", id: "Pisang Cavendish segar" },
      },
    ],
    origin: { regions: ["Lumajang", "Malang"] },
    moq: {
      value: 14,
      unit: "MT",
      note: { en: "40ft reefer", id: "Reefer 40ft" },
    },
    shipping: { storage: "chilled", temperatureC: 13, options: ["reefer-40ft"] },
    certifications: ["gap"],
    documents: ["phytosanitary"],
    specs: [
      {
        label: label.grade,
        value: { en: "Class A green, calibration 39–46", id: "Kelas A hijau, kalibrasi 39–46" },
      },
      {
        label: label.packaging,
        value: { en: "13.5 kg carton", id: "Karton 13,5 kg" },
      },
    ],
    availability: {
      yearRound: true,
      note: { en: "Weekly shipments", id: "Pengiriman mingguan" },
    },
  },
  {
    id: "prd_spices",
    slug: "red-shallots-java-spices",
    status: "active",
    sortOrder: 6,
    categoryId: "agriculture",
    name: { en: "Red Shallots & Java Spices", id: "Bawang Merah & Rempah Jawa" },
    summary: {
      en: "Pungent red shallots, cloves and whole nutmeg harvested from the agrarian regions of the Nganjuk & Blitar border.",
      id: "Bawang merah, cengkih, dan pala utuh yang dipanen dari wilayah agraris perbatasan Nganjuk & Blitar.",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
        alt: { en: "Indonesian spices", id: "Rempah Indonesia" },
      },
    ],
    origin: { regions: ["Blitar", "Nganjuk"] },
    moq: { value: 3, unit: "MT" },
    shipping: { storage: "ambient", options: ["dry-20ft", "air-freight"] },
    certifications: [],
    documents: ["phytosanitary", "fumigation"],
    specs: [
      {
        label: label.packaging,
        value: { en: "Mesh bag 10 kg / 20 kg", id: "Karung jaring 10 kg / 20 kg" },
      },
      {
        label: label.moisture,
        value: { en: "Sun-dried, < 12%", id: "Dijemur, < 12%" },
      },
    ],
    availability: { yearRound: false, months: [7, 8, 9, 10] },
  },
];
