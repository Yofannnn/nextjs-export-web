import { envReader } from "@/lib/env-reader";

export const siteImages = {
  heroBg: envReader.string("HERO_BG_URL"),
  about: envReader.string("ABOUT_IMAGE_URL"),
} as const;
