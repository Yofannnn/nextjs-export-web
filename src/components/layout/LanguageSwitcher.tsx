"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Globe } from "lucide-react";

const labels: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  id: { short: "ID", name: "Bahasa Indonesia" },
};

export function LanguageSwitcher() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div role="group" aria-label={t("language")} className="flex items-center gap-0.5 rounded-lg border border-slate-300 p-0.5">
      <Globe className="mx-1.5 size-4 text-emerald-600" aria-hidden />
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={active}
            aria-label={labels[l].name}
            onClick={() => {
              if (!active) router.replace(pathname, { locale: l, scroll: false });
            }}
            className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
              active ? "bg-emerald-600 text-white" : "text-slate-600 hover:text-emerald-700"
            }`}
          >
            {labels[l].short}
          </button>
        );
      })}
    </div>
  );
}
