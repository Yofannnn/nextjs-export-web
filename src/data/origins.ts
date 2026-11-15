import { same, type Localized } from "@/lib/localized";

export type OriginTone = "emerald" | "blue" | "gold";
export type OriginIcon = "coffee" | "waves" | "fish";

export interface OriginHub {
  id: string;
  icon: OriginIcon;
  tone: OriginTone;
  zone: Localized;
  name: Localized;
  area: Localized;
  items: Localized[];
}

export const originHubs: OriginHub[] = [
  {
    id: "malang-lumajang",
    icon: "coffee",
    tone: "emerald",
    zone: { en: "Highland Zone", id: "Zona Dataran Tinggi" },
    name: same("Malang & Lumajang"),
    area: same("Ampelgading, Dampit & Mt. Semeru Slopes"),
    items: [
      {
        en: "Dampit Robusta & Wilis Arabica Coffee Beans",
        id: "Biji Kopi Robusta Dampit & Arabika Wilis",
      },
      { en: "Fresh Cavendish & Mas Bananas", id: "Pisang Cavendish & Mas Segar" },
      { en: "Hass & Aligator Avocados", id: "Alpukat Hass & Aligator" },
    ],
  },
  {
    id: "trenggalek-tulungagung",
    icon: "waves",
    tone: "blue",
    zone: { en: "Ocean & Agro", id: "Laut & Agro" },
    name: same("Trenggalek & Tulungagung"),
    area: same("Prigi Bay, Popoh & Southern Hills"),
    items: [
      {
        en: "Yellowfin Tuna, Skipjack & Spiny Lobster",
        id: "Tuna Sirip Kuning, Cakalang & Lobster Duri",
      },
      {
        en: "Organic Coconut Sugar & Virgin Coconut Oil (VCO)",
        id: "Gula Kelapa Organik & Virgin Coconut Oil (VCO)",
      },
      {
        en: "Essential Oils (Clove & Patchouli)",
        id: "Minyak Atsiri (Cengkih & Nilam)",
      },
    ],
  },
  {
    id: "blitar-pacitan-banyuwangi",
    icon: "fish",
    tone: "gold",
    zone: { en: "Aquaculture & Spice", id: "Tambak & Rempah" },
    name: same("Blitar, Pacitan & Banyuwangi"),
    area: { en: "Muncar Coast & Fertile Basins", id: "Pesisir Muncar & Lembah Subur" },
    items: [
      {
        en: "Frozen Vannamei Shrimp & Sardines",
        id: "Udang Vannamei Beku & Sarden",
      },
      {
        en: "Spices (Shallots, Nutmeg, Cinnamon)",
        id: "Rempah (Bawang Merah, Pala, Kayu Manis)",
      },
      { en: "Organic Red & Black Rice", id: "Beras Merah & Hitam Organik" },
    ],
  },
];
