import { useTranslations } from "next-intl";

type Option = { id: string; label: string };

export function CategoryFilter({ options, active, onChange }: { options: Option[]; active: string; onChange: (id: string) => void }) {
  const t = useTranslations("Products");
  const all: Option[] = [{ id: "all", label: t("filterAll") }, ...options];

  return (
    <div role="group" aria-label={t("filterLabel")} className="flex flex-wrap gap-2">
      {all.map(({ id, label }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(id)}
            className={`cursor-pointer rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
              isActive ? "bg-navy-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
