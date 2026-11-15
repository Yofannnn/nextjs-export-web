import { envReader } from "@/lib/env-reader";

export const heroStatValues = {
  countries: envReader.optionalString("STAT_COUNTRIES"),
  volume: envReader.optionalString("STAT_VOLUME"),
  compliance: envReader.optionalString("STAT_COMPLIANCE"),
} as const;
