import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { certifications, exportDocuments } from "@/data/compliance";
import { selectProductForRfq } from "@/features/rfq/selection";
import { pick } from "@/lib/localized";
import type { Product } from "./types";
import { useProductFormat } from "./useProductFormat";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-3 text-sm">
      <dt className="shrink-0 text-slate-500">{label}</dt>
      <dd className="text-right font-bold text-navy-900">{children}</dd>
    </div>
  );
}

function Chips({ items, empty }: { items: string[]; empty: string }) {
  if (items.length === 0) return <>{empty}</>;
  return (
    <ul className="flex flex-wrap justify-end gap-1.5">
      {items.map((item) => (
        <li key={item} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProductDialog({ product, categoryName, open, onOpenChange }: { product: Product | null; categoryName: string; open: boolean; onOpenChange: (open: boolean) => void }) {
  const t = useTranslations("Products");
  const f = useProductFormat();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {product && (
        <DialogContent className="max-h-[90vh] gap-6 overflow-y-auto rounded-2xl p-8 sm:max-w-lg">
          <DialogHeader className="text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">{categoryName}</span>
            <DialogTitle className="text-2xl font-extrabold text-navy-900">{f.name(product)}</DialogTitle>
            <DialogDescription>{f.summary(product)}</DialogDescription>
          </DialogHeader>

          <dl className="divide-y divide-slate-100 rounded-xl border border-slate-200 px-4">
            <Row label={t("labels.origin")}>{f.origin(product)}</Row>
            <Row label={t("labels.moq")}>
              <span className="text-emerald-700">{f.moq(product)}</span>
            </Row>
            <Row label={t("labels.shipping")}>
              {f.storage(product)} · {f.shippingOptions(product)}
            </Row>
            <Row label={t("labels.availability")}>{f.availability(product)}</Row>
            <Row label={t("labels.certifications")}>
              <Chips empty={t("labels.none")} items={product.certifications.map((id) => pick(certifications[id].name, f.locale))} />
            </Row>
            <Row label={t("labels.documents")}>
              <Chips empty={t("labels.none")} items={product.documents.map((id) => pick(exportDocuments[id].name, f.locale))} />
            </Row>
          </dl>

          {product.specs.length > 0 && (
            <section className="rounded-xl bg-slate-50 p-4">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">{t("labels.specs")}</h4>
              <ul className="space-y-1 text-xs leading-relaxed text-slate-600">
                {product.specs.map((spec, i) => (
                  <li key={i}>
                    <span className="font-bold text-navy-900">{pick(spec.label, f.locale)}:</span> {pick(spec.value, f.locale)}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="w-1/2 cursor-pointer rounded-xl bg-slate-100 py-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200"
            >
              {t("dialog.close")}
            </button>

            {product.status === "active" ? (
              <a
                href="#rfq"
                onClick={() => {
                  selectProductForRfq(product.slug);
                  onOpenChange(false);
                }}
                className="w-1/2 rounded-xl bg-emerald-600 py-3 text-center text-xs font-bold text-white transition-colors hover:bg-emerald-700"
              >
                {t("dialog.requestRfq")}
              </a>
            ) : (
              <p className="flex w-1/2 items-center text-xs text-slate-500">{t("dialog.comingSoonNote")}</p>
            )}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
