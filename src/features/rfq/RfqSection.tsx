import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { getRfqProductOptions } from "@/features/products/repository";
import { RfqForm } from "./RfqForm";

export async function RfqSection() {
  const t = await getTranslations("Rfq");
  const products = await getRfqProductOptions();

  return (
    <section id="rfq" aria-labelledby="rfq-title" className="border-t border-slate-200 bg-slate-100 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-12">
          <header className="space-y-2 text-center">
            <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">{t("eyebrow")}</p>
            <h2 id="rfq-title" className="text-3xl font-extrabold text-navy-900">
              {t("title")}
            </h2>
            <p className="text-sm text-slate-500">{t("subtitle", { hours: siteConfig.rfqReplyHours })}</p>
          </header>

          <RfqForm products={products} contactEmail={siteConfig.email} replyHours={siteConfig.rfqReplyHours} />
        </div>
      </div>
    </section>
  );
}
