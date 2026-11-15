import { useTranslations } from "next-intl";
import { heroStatValues } from "@/config/stats";

const stats = [
  { key: "countries", valueClass: "text-gold-400" },
  { key: "volume", valueClass: "text-emerald-400" },
  { key: "compliance", valueClass: "text-white" },
] as const;

export function HeroStats() {
  const t = useTranslations("Hero.stats");

  const visible = stats.filter(({ key }) => heroStatValues[key]);
  if (visible.length === 0) return null;

  return (
    <dl className="flex flex-wrap justify-center gap-x-10 gap-y-4 border-t border-slate-700/60 pt-8 lg:justify-start">
      {visible.map(({ key, valueClass }) => (
        <div key={key} className="flex flex-col">
          <dd className={`order-1 text-2xl font-extrabold sm:text-3xl ${valueClass}`}>{heroStatValues[key]}</dd>
          <dt className="order-2 mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{t(key)}</dt>
        </div>
      ))}
    </dl>
  );
}
