import type { StorageType } from "@/features/products/types";

export type ContainerId = "reefer-20ft" | "reefer-40ft" | "dry-20ft" | "dry-40ft";

export const MIN_VOLUME_MT = 1;
export const MAX_VOLUME_MT = 1000;

export const planningProfiles: Record<StorageType, { small: ContainerId; large: ContainerId; capacityMt: { small: number; large: number } }> = {
  frozen: { small: "reefer-20ft", large: "reefer-40ft", capacityMt: { small: 14, large: 26 } },
  chilled: { small: "reefer-20ft", large: "reefer-40ft", capacityMt: { small: 12, large: 20 } },
  ambient: { small: "dry-20ft", large: "dry-40ft", capacityMt: { small: 19.2, large: 26 } },
};
