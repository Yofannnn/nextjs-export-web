"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { formatList, formatMonths } from "@/lib/format";
import { pick, type Localized } from "@/lib/localized";
import type { Product } from "./types";

export function useProductFormat() {
  const t = useTranslations("Products");
  const locale = useLocale() as Locale;

  const withNote = (base: string, note?: Localized) => (note ? `${base} (${pick(note, locale)})` : base);

  const shippingOptions = (p: Product) => p.shipping.options.map((o) => t(`shipping.${o}`)).join(" / ");

  return {
    locale,
    name: (p: Product) => pick(p.name, locale),
    summary: (p: Product) => pick(p.summary, locale),
    origin: (p: Product) => withNote(formatList(p.origin.regions, locale), p.origin.note),
    moq: (p: Product) => withNote(`${new Intl.NumberFormat(locale).format(p.moq.value)} ${p.moq.unit}`, p.moq.note),
    shippingOptions,
    badge: (p: Product) => {
      const temp = p.shipping.temperatureC;
      return temp === undefined ? shippingOptions(p) : `${shippingOptions(p)} · ${temp}°C`;
    },
    storage: (p: Product) => {
      const base = t(`storage.${p.shipping.storage}`);
      const temp = p.shipping.temperatureC;
      return temp === undefined ? base : `${base} (${temp}°C)`;
    },
    availability: (p: Product) => {
      const a = p.availability;
      const months = a.months?.length ? formatMonths(a.months, locale) : "";
      const base = a.yearRound ? (months ? t("availability.yearRoundPeak", { months }) : t("availability.yearRound")) : months ? t("availability.seasonal", { months }) : "";
      const note = a.note ? pick(a.note, locale) : "";
      return [base, note].filter(Boolean).join(" · ") || t("labels.none");
    },
  };
}
