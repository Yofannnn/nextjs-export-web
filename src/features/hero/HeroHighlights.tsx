import { useTranslations } from "next-intl";
import { Snowflake, Sprout } from "lucide-react";

const highlights = [
  { key: "coldChain", icon: Snowflake, iconClass: "text-gold-400" },
  { key: "fairTrade", icon: Sprout, iconClass: "text-emerald-400" },
] as const;

export function HeroHighlights() {
  const t = useTranslations("Hero.highlights");

  return (
    <div className="space-y-4">
      {highlights.map(({ key, icon: Icon, iconClass }) => (
        <article key={key} className="space-y-4 rounded-2xl border border-white/10 bg-navy-900/70 p-6 text-left backdrop-blur-md">
          <div className={`flex items-center gap-3 ${iconClass}`}>
            <Icon className="size-6 shrink-0" aria-hidden />
            <h3 className="text-lg font-bold text-white">{t(`${key}.title`)}</h3>
          </div>
          <p className="text-sm leading-relaxed text-slate-300">{t(`${key}.description`)}</p>
        </article>
      ))}
    </div>
  );
}
