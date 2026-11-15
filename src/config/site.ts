import { envReader } from "@/lib/env-reader";

/**
 * TODO: when there is an admin dashboard, move this to a database "settings" table, so the owner can edit it without a redeploy.
 */
const whatsapp = envReader.string("CONTACT_WHATSAPP");

export const siteConfig = {
  name: envReader.string("SITE_NAME"),
  tagline: envReader.string("SITE_TAGLINE"),
  email: envReader.string("CONTACT_EMAIL"),
  whatsapp,
  nib: envReader.string("COMPANY_NIB"),
  kbli: envReader.string("COMPANY_KBLI"),
  address: envReader.string("COMPANY_ADDRESS"),
  rfqReplyHours: envReader.number("RFQ_REPLY_HOURS", 12),
} as const;

export const whatsappUrl = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
