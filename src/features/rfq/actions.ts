"use server";

import type { RfqResult } from "./schema";
import { processRfq } from "./server/service";

export async function submitRfq(input: unknown): Promise<RfqResult> {
  return processRfq(input);
}
