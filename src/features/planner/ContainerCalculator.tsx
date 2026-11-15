"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import type { StorageType } from "@/features/products/types";
import { planContainers } from "./plan";
import { MAX_VOLUME_MT } from "./data";
import { Calculator } from "lucide-react";

const SECTORS: StorageType[] = ["frozen", "chilled", "ambient"];

const controlClass =
  "w-full rounded-xl border border-slate-700 bg-navy-900 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30";

export function ContainerCalculator() {
  const t = useTranslations("Planner");
  const sectorId = useId();
  const volumeId = useId();

  const [storage, setStorage] = useState<StorageType>("frozen");
  const [volume, setVolume] = useState("18");

  const plan = planContainers(Number(volume.replace(",", ".")), storage);

  return (
    <div className="space-y-6 rounded-2xl border border-slate-700 bg-navy-800 p-8 shadow-2xl lg:col-span-7">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={sectorId} className="mb-2 block text-xs font-bold uppercase text-slate-300">
            {t("sectorLabel")}
          </label>
          <select id={sectorId} value={storage} onChange={(e) => setStorage(e.target.value as StorageType)} className={controlClass}>
            {SECTORS.map((s) => (
              <option key={s} value={s}>
                {t(`sectors.${s}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={volumeId} className="mb-2 block text-xs font-bold uppercase text-slate-300">
            {t("volumeLabel")}
          </label>
          <input
            id={volumeId}
            type="number"
            inputMode="decimal"
            step="any"
            min={1}
            max={MAX_VOLUME_MT}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            aria-invalid={!plan}
            className={controlClass}
          />
        </div>
      </div>

      <div aria-live="polite" className="space-y-4 rounded-xl border border-slate-700 bg-navy-950 p-6">
        {plan ? (
          <>
            <div className="flex flex-col gap-1 border-b border-slate-800 pb-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs font-semibold uppercase text-slate-400">{t("resultTitle")}</span>
              <span className="text-base font-extrabold text-gold-400 sm:text-right">
                {plan.lines.map((l) => t("containerLine", { count: l.count, name: t(`containers.${l.container}`) })).join(" + ")}
              </span>
            </div>

            <dl className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
              <div>
                <dt className="block text-slate-400">{t("temperatureLabel")}</dt>
                <dd className="text-sm font-bold text-white">{t(`temperature.${storage}`)}</dd>
              </div>
              <div>
                <dt className="block text-slate-400">{t("leadLabel")}</dt>
                <dd className="text-sm font-bold text-emerald-400">{t(`lead.${storage}`)}</dd>
              </div>
            </dl>

            <p className="border-t border-slate-800 pt-3 text-[11px] leading-relaxed text-slate-500">{t("disclaimer")}</p>
            <a href="#rfq" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300">
              <Calculator className="size-4" aria-hidden />
              {t("cta")}
            </a>
          </>
        ) : (
          <p className="text-sm font-semibold text-gold-400">{t("invalid", { max: MAX_VOLUME_MT })}</p>
        )}
      </div>
    </div>
  );
}
