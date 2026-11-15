import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig, whatsappUrl } from "@/config/site";
import { getProducts } from "@/features/products/repository";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/localized";
import { originHubs } from "@/data/origins";
import { Anchor, Mail, MapPin, MessageCircle } from "lucide-react";

const linkClass = "transition-colors hover:text-emerald-400";

async function getCopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const t = await getTranslations("Footer");
  const locale = (await getLocale()) as Locale;
  const products = await getProducts();
  const year = await getCopyrightYear();

  return (
    <footer className="border-t border-navy-800 bg-navy-950 py-16 text-sm text-slate-400">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Anchor className="size-5" aria-hidden />
            </span>
            <span className="text-lg font-extrabold text-white">{siteConfig.name.toUpperCase()}</span>
          </div>
          <p className="text-xs leading-relaxed">{t("description")}</p>
          <div className="space-y-1 text-xs text-slate-500">
            <p>{t("nib", { nib: siteConfig.nib })}</p>
            <p>{t("kbli", { kbli: siteConfig.kbli })}</p>
          </div>
        </div>

        <nav aria-label={t("commoditiesTitle")}>
          <h2 className="mb-4 text-sm font-bold text-white">{t("commoditiesTitle")}</h2>
          <ul className="space-y-2 text-xs">
            {products.map((p) => (
              <li key={p.id}>
                <a href="#products" className={linkClass}>
                  {pick(p.name, locale)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-bold text-white">{t("originsTitle")}</h2>
          <ul className="space-y-2 text-xs">
            {originHubs.map((hub) => (
              <li key={hub.id}>{pick(hub.name, locale)}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="mb-4 text-sm font-bold text-white">{t("officeTitle")}</h2>
          <p className="flex items-start gap-2 text-xs">
            <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden />
            <span>{siteConfig.address}</span>
          </p>
          <p className="text-xs">
            <a href={`mailto:${siteConfig.email}`} className={`flex items-center gap-2 ${linkClass}`}>
              <Mail className="size-4 shrink-0 text-emerald-500" aria-hidden />
              {siteConfig.email}
            </a>
          </p>
          <p className="text-xs">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 ${linkClass}`}>
              <MessageCircle className="size-4 shrink-0 text-emerald-500" aria-hidden />
              {siteConfig.whatsapp}
            </a>
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-navy-900 px-4 pt-6 text-xs text-slate-500 sm:px-6 lg:px-8">
        <p>
          {t("copyright", {
            year: String(year),
            company: siteConfig.name.toUpperCase(),
            tagline: siteConfig.tagline,
          })}
        </p>
      </div>
    </footer>
  );
}
