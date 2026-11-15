import "server-only";
import type { RfqFields } from "../schema";

function makeReference(): string {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const rand = crypto.randomUUID().replace(/-/g, "").slice(0, 4).toUpperCase();
  return `RFQ-${ymd}-${rand}`;
}

export async function createRfqRecord(_data: RfqFields, _locale: string): Promise<{ reference: string }> {
  // TODO(db): insert a row here (data + locale + reference) and return its reference.
  return { reference: makeReference() };
}
