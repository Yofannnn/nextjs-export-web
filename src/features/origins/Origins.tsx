import { getLocale, getTranslations } from "next-intl/server";
import { originHubs } from "@/data/origins";
import type { Locale } from "@/i18n/routing";
import { OriginCard } from "./OriginCard";

export async function Origins() {
  const t = await getTranslations("Origins");
  const locale = (await getLocale()) as Locale;

  return (
    <section id="origins" aria-labelledby="origins-title" className="border-y border-slate-200 bg-slate-100 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-16 max-w-3xl space-y-3 text-center">
          <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">{t("eyebrow")}</p>
          <h2 id="origins-title" className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="text-sm text-slate-600 sm:text-base">{t("subtitle")}</p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {originHubs.map((hub) => (
            <OriginCard key={hub.id} hub={hub} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
