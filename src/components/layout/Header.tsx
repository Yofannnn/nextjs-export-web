import { Anchor } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { navItems } from "./nav";
import { RfqLink } from "./RfqLink";

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-navy-900 to-emerald-700 text-gold-400 shadow-md transition-transform group-hover:scale-105 motion-reduce:transition-none">
            <Anchor className="size-6" aria-hidden />
          </span>
          <span>
            <span className="block text-xl font-extrabold leading-none tracking-tight text-navy-900">{siteConfig.name.toUpperCase()}</span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700">{siteConfig.tagline}</span>
          </span>
        </Link>

        <nav aria-label={t("navLabel")} className="hidden items-center gap-8 text-sm font-semibold text-slate-700 lg:flex">
          {navItems.map(({ key, href }) => (
            <Link key={key} href={href} className="transition-colors hover:text-emerald-700">
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 sm:flex">
            <LanguageSwitcher />
            <RfqLink />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
