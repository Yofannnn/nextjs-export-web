import type { StorageType } from "@/features/products/types";
import { MAX_VOLUME_MT, MIN_VOLUME_MT, planningProfiles, type ContainerId } from "./data";

export type ContainerLine = { container: ContainerId; count: number };
export type ContainerPlan = { lines: ContainerLine[]; totalContainers: number };

const round3 = (n: number) => Math.round(n * 1000) / 1000;

/**
 * Pure function: how many containers of which kind for a given volume.
 */
export function planContainers(volumeMt: number, storage: StorageType): ContainerPlan | null {
  if (!Number.isFinite(volumeMt) || volumeMt < MIN_VOLUME_MT || volumeMt > MAX_VOLUME_MT) {
    return null;
  }

  const { small, large, capacityMt } = planningProfiles[storage];

  let largeCount = Math.floor(round3(volumeMt / capacityMt.large));
  const remainder = round3(volumeMt - largeCount * capacityMt.large);

  let smallCount = 0;
  if (remainder > 0) {
    if (remainder <= capacityMt.small) smallCount = 1;
    else largeCount += 1;
  }

  const lines: ContainerLine[] = [];
  if (largeCount > 0) lines.push({ container: large, count: largeCount });
  if (smallCount > 0) lines.push({ container: small, count: smallCount });

  return { lines, totalContainers: largeCount + smallCount };
}
