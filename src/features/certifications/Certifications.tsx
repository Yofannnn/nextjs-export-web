import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/localized";
import { featuredCertifications, featuredDocuments, type ComplianceEntry, type ComplianceIcon } from "@/data/compliance";
import { Anchor, BadgeCheck, Leaf, ShieldCheck, Sprout, Stethoscope } from "lucide-react";

const icons = {
  shield: { Icon: ShieldCheck, className: "text-emerald-600" },
  leaf: { Icon: Leaf, className: "text-emerald-600" },
  sprout: { Icon: Sprout, className: "text-emerald-600" },
  health: { Icon: Stethoscope, className: "text-blue-600" },
  anchor: { Icon: Anchor, className: "text-navy-800" },
  badge: { Icon: BadgeCheck, className: "text-gold-500" },
} satisfies Record<ComplianceIcon, { Icon: unknown; className: string }>;

type Item = ComplianceEntry & { id: string };

function Group({ title, items, locale }: { title: string; items: Item[]; locale: Locale }) {
  return (
    <div className="space-y-4">
      <h3 className="text-center text-sm font-bold uppercase tracking-wider text-slate-500">{title}</h3>
      <ul className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
        {items.map((item) => {
          const icon = item.icon ? icons[item.icon] : null;
          return (
            <li key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-colors hover:border-emerald-500 motion-reduce:transition-none">
              {icon && <icon.Icon className={`mx-auto mb-2 size-10 ${icon.className}`} aria-hidden />}
              <h4 className="text-sm font-extrabold text-navy-900">{pick(item.name, locale)}</h4>
              {item.description && <p className="mt-1 text-[11px] text-slate-500">{pick(item.description, locale)}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function Certifications() {
  const t = await getTranslations("Certifications");
  const locale = (await getLocale()) as Locale;

  return (
    <section id="certifications" aria-labelledby="certifications-title" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-16 max-w-3xl space-y-3 text-center">
          <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">{t("eyebrow")}</p>
          <h2 id="certifications-title" className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
            {t("title")}
          </h2>
          <p className="text-sm text-slate-600 sm:text-base">{t("subtitle")}</p>
        </header>

        <div className="space-y-12">
          <Group title={t("groups.certifications")} items={featuredCertifications} locale={locale} />
          <Group title={t("groups.documents")} items={featuredDocuments} locale={locale} />
        </div>
      </div>
    </section>
  );
}
