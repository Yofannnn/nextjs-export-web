import type { Locale } from "@/i18n/routing";

export type Localized = Record<Locale, string>;

export const same = (text: string): Localized => ({ en: text, id: text });

export const pick = (text: Localized, locale: Locale): string => text[locale] ?? text.en;
