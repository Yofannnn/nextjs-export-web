"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { Locale } from "@/i18n/routing";
import { pick, type Localized } from "@/lib/localized";
import { submitRfq } from "./actions";
import { Field, inputClass } from "./Field";
import { frequencies, incoterms, paymentTerms, rfqFieldsSchema, type RfqFields } from "./schema";
import { useRfqSelection } from "./selection";
import { CheckCircle2, Loader2, Send } from "lucide-react";

interface RfqFormProps {
  products: readonly { slug: string; name: Localized }[];
  contactEmail: string;
  replyHours: number;
}

type Status = "idle" | "sending" | "success" | "error";
type ErrorKey = "invalid" | "server";

const EMPTY: RfqFields = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  product: "",
  volume: "",
  incoterm: "FOB",
  country: "",
  frequency: "one-time",
  paymentTerms: "tbd",
  message: "",
};

export function RfqForm({ products, contactEmail, replyHours }: RfqFormProps) {
  const t = useTranslations("Rfq");
  const locale = useLocale() as Locale;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RfqFields>({
    resolver: zodResolver(rfqFieldsSchema),
    defaultValues: EMPTY,
  });

  const [status, setStatus] = useState<Status>("idle");
  const [errorKey, setErrorKey] = useState<ErrorKey | null>(null);
  const [reference, setReference] = useState("");

  const mountedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const selection = useRfqSelection();

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  useEffect(() => {
    if (selection) setValue("product", selection.slug, { shouldValidate: true });
  }, [selection, setValue]);

  useEffect(() => {
    if (status === "success") successHeading.current?.focus();
  }, [status]);

  const message = (name: keyof RfqFields) => {
    const code = errors[name]?.message;
    if (!code) return undefined;
    return t.has(`validation.${code}`) ? t(`validation.${code}`) : t("validation.invalid");
  };

  const control = (name: keyof RfqFields) => ({
    id: `rfq-${name}`,
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `rfq-${name}-error` : undefined,
    className: inputClass(!!errors[name]),
  });

  const onSubmit = async (values: RfqFields, metadata: { website: string; elapsedMs: number }) => {
    setStatus("sending");
    setErrorKey(null);

    try {
      const result = await submitRfq({
        ...values,
        website: metadata.website,
        elapsedMs: metadata.elapsedMs,
        locale,
      });

      if (result.ok) {
        setReference(result.reference);
        setStatus("success");
        reset(EMPTY);
        return;
      }

      setErrorKey(result.code === "invalid" ? "invalid" : "server");
    } catch {
      setErrorKey("server");
    }

    setStatus("error");
  };

  const handleFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    const metadata = {
      website: honeypot.current?.value ?? "",
      elapsedMs: Math.round(performance.now() - mountedAt.current),
    };

    void handleSubmit((values) => onSubmit(values, metadata))(event);
  };

  if (status === "success") {
    return (
      <div role="status" className="space-y-4 py-4 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="size-8" aria-hidden />
        </div>
        <h3 ref={successHeading} tabIndex={-1} className="text-2xl font-extrabold text-navy-900 outline-none">
          {t("success.title")}
        </h3>
        <p className="mx-auto max-w-md text-sm text-slate-600">{t("success.body", { hours: replyHours })}</p>
        <p className="text-sm font-bold text-navy-900">{t("success.reference", { reference })}</p>
        <button type="button" onClick={() => setStatus("idle")} className="cursor-pointer rounded-xl bg-navy-900 px-6 py-3 text-xs font-bold text-white transition-colors hover:bg-navy-800">
          {t("success.again")}
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form noValidate onSubmit={handleFormSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field name="fullName" label={t("fields.fullName.label")} required error={message("fullName")}>
          <input {...register("fullName")} {...control("fullName")} type="text" autoComplete="name" placeholder={t("fields.fullName.placeholder")} />
        </Field>
        <Field name="company" label={t("fields.company.label")} required error={message("company")}>
          <input {...register("company")} {...control("company")} type="text" autoComplete="organization" placeholder={t("fields.company.placeholder")} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field name="email" label={t("fields.email.label")} required error={message("email")}>
          <input {...register("email")} {...control("email")} type="email" autoComplete="email" placeholder={t("fields.email.placeholder")} />
        </Field>
        <Field name="phone" label={t("fields.phone.label")} required error={message("phone")}>
          <input {...register("phone")} {...control("phone")} type="tel" autoComplete="tel" placeholder={t("fields.phone.placeholder")} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Field name="product" label={t("fields.product.label")} required error={message("product")}>
          <select {...register("product")} {...control("product")}>
            <option value="">{t("fields.product.placeholder")}</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {pick(p.name, locale)}
              </option>
            ))}
          </select>
        </Field>
        <Field name="volume" label={t("fields.volume.label")} optionalLabel={t("optional")} error={message("volume")}>
          <input {...register("volume")} {...control("volume")} type="text" placeholder={t("fields.volume.placeholder")} />
        </Field>
        <Field name="incoterm" label={t("fields.incoterm.label")} error={message("incoterm")}>
          <select {...register("incoterm")} {...control("incoterm")}>
            {incoterms.map((v) => (
              <option key={v} value={v}>
                {t(`options.incoterm.${v}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Field name="country" label={t("fields.country.label")} required error={message("country")}>
          <input {...register("country")} {...control("country")} type="text" autoComplete="country-name" placeholder={t("fields.country.placeholder")} />
        </Field>
        <Field name="frequency" label={t("fields.frequency.label")} error={message("frequency")}>
          <select {...register("frequency")} {...control("frequency")}>
            {frequencies.map((v) => (
              <option key={v} value={v}>
                {t(`options.frequency.${v}`)}
              </option>
            ))}
          </select>
        </Field>
        <Field name="paymentTerms" label={t("fields.paymentTerms.label")} optionalLabel={t("optional")} error={message("paymentTerms")}>
          <select {...register("paymentTerms")} {...control("paymentTerms")}>
            {paymentTerms.map((v) => (
              <option key={v} value={v}>
                {t(`options.payment.${v}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field name="message" label={t("fields.message.label")} optionalLabel={t("optional")} error={message("message")}>
        <textarea {...register("message")} {...control("message")} rows={3} placeholder={t("fields.message.placeholder")} className={`${inputClass(!!errors.message)} resize-none`} />
      </Field>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {errorKey && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {t(`errors.${errorKey}`, { email: contactEmail })}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-sm font-extrabold text-white shadow-lg transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? <Loader2 className="size-5 animate-spin motion-reduce:animate-none" aria-hidden /> : <Send className="size-5" aria-hidden />}
        {sending ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
