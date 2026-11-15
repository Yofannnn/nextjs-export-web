export function formatMonths(months: readonly number[], locale: string): string {
  if (months.length === 0) return "";
  const fmt = new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" });
  const name = (m: number) => fmt.format(new Date(Date.UTC(2024, m - 1, 1)));

  const sorted = [...months].sort((a, b) => a - b);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const contiguous = last - first + 1 === sorted.length;

  if (contiguous) return first === last ? name(first) : `${name(first)}–${name(last)}`;
  return sorted.map(name).join(", ");
}

export function formatList(items: readonly string[], locale: string): string {
  return new Intl.ListFormat(locale, { style: "long", type: "conjunction" }).format(items);
}
