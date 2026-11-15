import { useTranslations } from "next-intl";
import { siteConfig, whatsappUrl } from "@/config/site";
import { Mail, MapPin, MessageCircle, ShieldCheck } from "lucide-react";

const linkClass = "flex items-center gap-1.5 transition-colors hover:text-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400";

export function TopBar() {
  const t = useTranslations("TopBar");

  return (
    <div className="border-b border-navy-800 bg-navy-950 px-4 py-2 text-xs text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-gold-400" aria-hidden />
            {t("certified", { nib: siteConfig.nib })}
          </span>
          <span className="hidden items-center gap-1.5 text-slate-400 md:inline-flex">
            <MapPin className="size-3.5 text-emerald-400" aria-hidden />
            {t("gateway")}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href={`mailto:${siteConfig.email}`} className={linkClass}>
            <Mail className="size-3.5" aria-hidden />
            {siteConfig.email}
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <MessageCircle className="size-3.5 text-emerald-400" aria-hidden />
            {siteConfig.whatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}
