import { useSyncExternalStore } from "react";

type Selection = { slug: string } | null;

let current: Selection = null;
const listeners = new Set<() => void>();

export function selectProductForRfq(slug: string) {
  current = { slug };
  listeners.forEach((l) => l());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const useRfqSelection = () =>
  useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
