import "server-only";

const read = (key: string) => process.env[key]?.trim();

export const envReader = {
  string(key: string, fallback?: string): string {
    const value = read(key);
    if (value) return value;
    if (fallback !== undefined) return fallback;
    throw new Error(`${key} is required`);
  },

  number(key: string, fallback?: number): number {
    const value = read(key);
    if (!value) {
      if (fallback !== undefined) return fallback;
      throw new Error(`${key} is required`);
    }
    const parsed = Number(value);
    if (Number.isNaN(parsed)) throw new Error(`${key} must be a number`);
    return parsed;
  },

  boolean(key: string, fallback = false): boolean {
    const value = read(key);
    if (!value) return fallback;
    return value.toLowerCase() === "true";
  },

  array(key: string, fallback?: string[]): string[] {
    const value = read(key);
    if (!value) {
      if (fallback !== undefined) return fallback;
      throw new Error(`${key} is required`);
    }
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  },

  optionalString(key: string): string | undefined {
    return read(key) || undefined;
  },
};
