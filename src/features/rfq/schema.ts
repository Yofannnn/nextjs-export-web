import { z } from "zod";

export const incoterms = ["FOB", "CIF", "CFR"] as const;
export const frequencies = ["one-time", "recurring"] as const;
export const paymentTerms = ["tt", "lc", "tbd"] as const;

const text = (min: number, max: number) => z.string().trim().min(min, { message: "required" }).max(max, { message: "tooLong" });

export const rfqFieldsSchema = z.object({
  fullName: text(2, 100),
  company: text(2, 150),
  email: z.string().trim().min(1, { message: "required" }).max(200, { message: "tooLong" }).email({ message: "email" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "required" })
    .regex(/^[+()\d\s.-]{6,30}$/, { message: "phone" }),
  product: z.string().min(1, { message: "required" }),
  volume: z.string().trim().max(100, { message: "tooLong" }),
  incoterm: z.enum(incoterms, { message: "invalid" }),
  country: text(2, 80),
  frequency: z.enum(frequencies, { message: "invalid" }),
  paymentTerms: z.enum(paymentTerms, { message: "invalid" }),
  message: z.string().trim().max(2000, { message: "tooLong" }),
});

export const rfqSubmissionSchema = rfqFieldsSchema.extend({
  website: z.string().max(500).optional(),
  elapsedMs: z
    .number()
    .min(0)
    .max(1000 * 60 * 60 * 24),
  locale: z.enum(["en", "id"]),
});

export type RfqFields = z.infer<typeof rfqFieldsSchema>;
export type RfqSubmission = z.infer<typeof rfqSubmissionSchema>;
export type RfqResult = { ok: true; reference: string } | { ok: false; code: "invalid" | "server" };
