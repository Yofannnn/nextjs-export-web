import { same, type Localized } from "@/lib/localized";

export type ComplianceIcon = "shield" | "badge" | "leaf" | "sprout" | "health" | "anchor";

export interface ComplianceEntry {
  name: Localized;
  description?: Localized;
  icon?: ComplianceIcon;
  featured?: boolean;
}

export const certifications = {
  haccp: {
    name: same("HACCP"),
    description: {
      en: "Hazard Analysis Critical Control Point",
      id: "Analisis Bahaya dan Titik Kendali Kritis",
    },
    icon: "shield",
    featured: true,
  },
  bap: { name: same("BAP (Best Aquaculture Practices)") },
  gap: {
    name: {
      en: "GAP (Good Agricultural Practices)",
      id: "GAP (Praktik Pertanian yang Baik)",
    },
  },
  "usda-organic": {
    name: same("USDA Organic"),
    description: {
      en: "Compliant with USDA organic standards",
      id: "Memenuhi standar organik USDA",
    },
    icon: "leaf",
    featured: true,
  },
  "eu-organic": { name: same("EU Organic") },
  halal: {
    name: same("Halal"),
    description: {
      en: "Indonesian Halal Product Assurance Agency (BPJPH)",
      id: "Badan Penyelenggara Jaminan Produk Halal (BPJPH)",
    },
    icon: "badge",
    featured: true,
  },
} as const satisfies Record<string, ComplianceEntry>;

export const exportDocuments = {
  "health-certificate": {
    name: { en: "Health Certificate", id: "Sertifikat Kesehatan" },
    description: {
      en: "Fish quality control by the Indonesian Quarantine Authority",
      id: "Pengendalian mutu ikan oleh Badan Karantina Indonesia",
    },
    icon: "health",
    featured: true,
  },
  "catch-certificate": {
    name: {
      en: "Catch Certificate (SHTI)",
      id: "Sertifikat Hasil Tangkapan Ikan (SHTI)",
    },
    description: {
      en: "Legal proof of non-IUU fishing",
      id: "Bukti legalitas penangkapan ikan non-IUU",
    },
    icon: "anchor",
    featured: true,
  },
  phytosanitary: {
    name: { en: "Phytosanitary Certificate", id: "Sertifikat Fitosanitari" },
    description: {
      en: "Plant health certificate from the Indonesian Quarantine Authority",
      id: "Sertifikat kesehatan tumbuhan dari Badan Karantina Indonesia",
    },
    icon: "sprout",
    featured: true,
  },
  "certificate-of-origin-ico": {
    name: {
      en: "Certificate of Origin (Form ICO)",
      id: "Surat Keterangan Asal (Form ICO)",
    },
  },
  fumigation: {
    name: { en: "Fumigation Certificate", id: "Sertifikat Fumigasi" },
  },
} as const satisfies Record<string, ComplianceEntry>;

export type CertificationId = keyof typeof certifications;
export type ExportDocumentId = keyof typeof exportDocuments;

function featured(catalog: Record<string, ComplianceEntry>) {
  return Object.entries(catalog)
    .filter(([, entry]) => entry.featured)
    .map(([id, entry]) => ({ id, ...entry }));
}

export const featuredCertifications = featured(certifications);
export const featuredDocuments = featured(exportDocuments);
