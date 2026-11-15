import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/config/image";
import { Anchor, Award, CheckCircle2, Quote } from "lucide-react";

export function About() {
  const t = useTranslations("About");
  const src = siteImages.about;
  const company = siteConfig.name.toUpperCase();

  const features = [
    { key: "traceability", icon: CheckCircle2 },
    { key: "quality", icon: Award },
  ] as const;

  return (
    <section id="about" aria-labelledby="about-title" className="overflow-x-clip bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative h-105 overflow-hidden rounded-2xl bg-linear-to-br from-navy-900 to-emerald-800 shadow-xl">
              {src ? (
                <Image src={src} alt={t("imageAlt")} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-white/20">
                  <Anchor className="size-24" aria-hidden />
                </div>
              )}
            </div>

            <figure className="absolute -bottom-6 -right-6 hidden max-w-xs rounded-xl border border-navy-800 bg-navy-900 p-6 text-white shadow-xl sm:block">
              <Quote className="size-8 text-gold-400" aria-hidden />
              <blockquote className="mt-2 text-xs font-medium text-slate-300">“{t("quote")}”</blockquote>
            </figure>
          </div>

          <div className="space-y-6">
            <p className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-emerald-700">
              {t("eyebrow", { company: siteConfig.name })}
            </p>
            <h2 id="about-title" className="text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">
              {t("title")}
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              {t.rich("description", {
                company,
                strong: (chunks) => <strong className="font-bold text-navy-900">{chunks}</strong>,
              })}
            </p>

            <ul className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              {features.map(({ key, icon: Icon }) => (
                <li key={key} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <Icon className="mb-1 size-6 text-emerald-600" aria-hidden />
                  <h3 className="text-sm font-bold text-navy-900">{t(`${key}.title`)}</h3>
                  <p className="text-xs text-slate-500">{t(`${key}.text`)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
