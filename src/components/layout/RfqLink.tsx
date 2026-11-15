import { useTranslations } from "next-intl";
import { Send } from "lucide-react";

export function RfqLink({ className = "" }: { className?: string }) {
  const t = useTranslations("Header");

  return (
    <a
      href="#rfq"
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${className}`}
    >
      <Send className="size-4" aria-hidden />
      {t("rfq")}
    </a>
  );
}
