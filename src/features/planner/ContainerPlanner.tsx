import { useTranslations } from "next-intl";
import { ContainerCalculator } from "./ContainerCalculator";
import { Truck } from "lucide-react";

export function ContainerPlanner() {
  const t = useTranslations("Planner");

  return (
    <section id="calculator" aria-labelledby="planner-title" className="bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-gold-400">{t("eyebrow")}</p>
            <h2 id="planner-title" className="text-3xl font-extrabold leading-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">{t("description")}</p>

            <div className="space-y-2 rounded-xl border border-slate-700 bg-navy-800 p-4 text-xs text-slate-300">
              <p className="flex items-center gap-2 font-bold text-emerald-400">
                <Truck className="size-4" aria-hidden />
                {t("routeTitle")}
              </p>
              <p>{t("route")}</p>
            </div>
          </div>

          <ContainerCalculator />
        </div>
      </div>
    </section>
  );
}
