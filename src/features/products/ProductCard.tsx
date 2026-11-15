import Image from "next/image";
import { useTranslations } from "next-intl";
import { pick } from "@/lib/localized";
import type { Product } from "./types";
import { useProductFormat } from "./useProductFormat";
import { Eye, Package, Snowflake } from "lucide-react";

const tones: Record<string, string> = {
  fisheries: "bg-blue-600",
  plantation: "bg-amber-700",
  agriculture: "bg-emerald-700",
};

const categoryTone = (id: string) => tones[id] ?? "bg-slate-700";

export function ProductCard({ product, categoryName, onViewSpecs }: { product: Product; categoryName: string; onViewSpecs: (product: Product) => void }) {
  const t = useTranslations("Products");
  const f = useProductFormat();

  const cover = product.images[0];
  const src = cover?.url ?? null;
  const StorageIcon = product.shipping.storage === "ambient" ? Package : Snowflake;

  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl motion-reduce:transition-none">
      <div>
        <div className="relative h-52 overflow-hidden bg-slate-100">
          {src ? (
            <Image src={src} alt={pick(cover.alt, f.locale)} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-300">
              <Package className="size-12" aria-hidden />
            </div>
          )}

          <span className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-extrabold uppercase text-white ${categoryTone(product.categoryId)}`}>{categoryName}</span>

          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded bg-navy-950/80 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
            <StorageIcon className="size-3" aria-hidden />
            {f.badge(product)}
          </span>

          {product.status === "coming-soon" && <span className="absolute right-3 top-3 rounded-md bg-gold-500 px-2.5 py-1 text-[10px] font-extrabold uppercase text-navy-950">{t("comingSoon")}</span>}
        </div>

        <div className="space-y-3 p-6">
          <h3 className="text-xl font-bold text-navy-900">{f.name(product)}</h3>
          <p className="line-clamp-2 text-xs text-slate-500">{f.summary(product)}</p>

          <dl className="space-y-1.5 pt-2 text-xs">
            <div className="flex justify-between gap-4 text-slate-600">
              <dt>{t("labels.origin")}:</dt>
              <dd className="text-right font-bold text-navy-900">{f.origin(product)}</dd>
            </div>
            <div className="flex justify-between gap-4 text-slate-600">
              <dt>{t("labels.moq")}:</dt>
              <dd className="text-right font-bold text-emerald-700">{f.moq(product)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="p-6 pt-0">
        <button
          type="button"
          onClick={() => onViewSpecs(product)}
          className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-100 py-2.5 text-xs font-bold text-navy-900 transition-colors hover:bg-emerald-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <Eye className="size-4" aria-hidden />
          {t("viewSpecs")}
        </button>
      </div>
    </article>
  );
}
