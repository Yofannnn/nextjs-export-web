import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteImages } from "@/config/image";
import { HeroHighlights } from "./HeroHighlights";
import { HeroStats } from "./HeroStats";
import { FileText, Search, Sparkles } from "lucide-react";

export function Hero() {
  const t = useTranslations("Hero");
  const bg = siteImages.heroBg;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28">
      <Image src={bg} alt="" fill priority sizes="100vw" className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-linear-to-br from-navy-950/95 to-navy-900/90" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
              <Sparkles className="size-3.5" aria-hidden />
              {t("badge")}
            </p>

            <h1 id="hero-title" className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0">{t("description")}</p>

            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row lg:justify-start">
              <a
                href="#products"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-base font-bold shadow-lg transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:w-auto"
              >
                <Search className="size-5" aria-hidden />
                {t("ctaExplore")}
              </a>
              <a
                href="#rfq"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-base font-bold backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                <FileText className="size-5" aria-hidden />
                {t("ctaQuote")}
              </a>
            </div>

            <HeroStats />
          </div>

          <div className="lg:col-span-5">
            <HeroHighlights />
          </div>
        </div>
      </div>
    </section>
  );
}
