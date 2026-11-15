import type { OriginHub, OriginIcon, OriginTone } from "@/data/origins";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/localized";
import { ChevronRight, Coffee, Fish, Waves } from "lucide-react";

const tones = {
  emerald: { chip: "bg-emerald-100 text-emerald-700", area: "text-emerald-700", caret: "text-emerald-600" },
  blue: { chip: "bg-blue-100 text-blue-700", area: "text-blue-700", caret: "text-blue-600" },
  gold: { chip: "bg-gold-100 text-gold-600", area: "text-gold-600", caret: "text-gold-600" },
} satisfies Record<OriginTone, { chip: string; area: string; caret: string }>;

const icons = { coffee: Coffee, waves: Waves, fish: Fish } satisfies Record<OriginIcon, unknown>;

export function OriginCard({ hub, locale }: { hub: OriginHub; locale: Locale }) {
  const tone = tones[hub.tone];
  const Icon = icons[hub.icon];

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md motion-reduce:transition-none">
      <div className="mb-4 flex items-start justify-between">
        <div className={`flex size-10 items-center justify-center rounded-lg ${tone.chip}`}>
          <Icon className="size-5" aria-hidden />
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-600">{pick(hub.zone, locale)}</span>
      </div>

      <h3 className="text-xl font-bold text-navy-900">{pick(hub.name, locale)}</h3>
      <p className={`mb-3 text-xs font-semibold ${tone.area}`}>{pick(hub.area, locale)}</p>

      <ul className="space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
        {hub.items.map((item) => (
          <li key={item.en} className="flex items-center gap-2">
            <ChevronRight className={`size-3.5 shrink-0 ${tone.caret}`} aria-hidden />
            {pick(item, locale)}
          </li>
        ))}
      </ul>
    </article>
  );
}
