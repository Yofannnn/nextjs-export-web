"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { navItems } from "./nav";
import { RfqLink } from "./RfqLink";

export function MobileMenu() {
  const t = useTranslations("Header");
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer rounded-lg p-2 text-slate-700 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-600 lg:hidden"
      >
        {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
      </button>

      <div id={panelId} hidden={!open} className="absolute inset-x-0 top-full space-y-1 border-b border-slate-200 bg-white px-4 pb-6 pt-2 shadow-lg lg:hidden">
        <nav aria-label={t("navLabel")}>
          {navItems.map(({ key, href }) => (
            <Link key={key} href={href} onClick={close} className="block py-2.5 text-sm font-semibold text-slate-700 hover:text-emerald-700">
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4 sm:hidden">
          <LanguageSwitcher />
          <div onClick={close}>
            <RfqLink />
          </div>
        </div>
      </div>
    </>
  );
}
