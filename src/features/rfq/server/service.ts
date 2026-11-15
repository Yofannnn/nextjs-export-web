import "server-only";
import { getRfqProductOptions } from "@/features/products/repository";
import { rfqSubmissionSchema, type RfqResult } from "../schema";
import { createRfqRecord } from "./repository";

const MIN_FILL_MS = 2000;

export async function processRfq(raw: unknown): Promise<RfqResult> {
  const parsed = rfqSubmissionSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, code: "invalid" };
  const { website, elapsedMs, locale, ...data } = parsed.data;

  if (website || elapsedMs < MIN_FILL_MS) {
    return { ok: true, reference: "RFQ-RECEIVED" };
  }

  const options = await getRfqProductOptions();
  const product = options.find((o) => o.slug === data.product);
  if (!product) return { ok: false, code: "invalid" };

  try {
    const { reference } = await createRfqRecord(data, locale);
    return { ok: true, reference };
  } catch (error) {
    console.error("[RFQ] failed to process inquiry", error);
    return { ok: false, code: "server" };
  }
}
