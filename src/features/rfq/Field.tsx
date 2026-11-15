import { cn } from "cn";

export const inputClass = (hasError: boolean) =>
  cn(
    "w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/30",
    hasError ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-emerald-600",
  );

export function Field({
  name,
  label,
  required,
  optionalLabel,
  error,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`rfq-${name}`} className="mb-2 block text-xs font-bold uppercase text-slate-700">
        {label}
        {required && (
          <span aria-hidden className="text-emerald-700">
            {" "}
            *
          </span>
        )}
        {optionalLabel && <span className="font-medium normal-case text-slate-400"> ({optionalLabel})</span>}
      </label>
      {children}
      {error && (
        <p id={`rfq-${name}-error`} className="mt-1.5 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
