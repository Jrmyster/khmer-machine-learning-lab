import { tiers } from "../data/curriculum";
import type { Lang, TierId } from "../types";
export const STORAGE_KEY = "khmer-ml-lab-progress-v1";
export interface Progress {
  version: 1;
  lang: Lang;
  tier: TierId;
  lesson: string;
  done: string[];
}
export const defaultProgress: Progress = {
  version: 1,
  lang: "en",
  tier: "intro",
  lesson: "patterns",
  done: [],
};
export function parseProgress(raw: string | null): Progress {
  if (!raw) return { ...defaultProgress, done: [] };
  try {
    const p = JSON.parse(raw);
    if (p.version !== 1) return { ...defaultProgress, done: [] };
    const tier = tiers.find((t) => t.id === p.tier) ?? tiers[0];
    const valid = new Set(tiers.flatMap((t) => t.lessons.map((l) => l.id)));
    return {
      version: 1,
      lang: p.lang === "km" ? "km" : "en",
      tier: tier.id,
      lesson: tier.lessons.some((l) => l.id === p.lesson)
        ? p.lesson
        : tier.lessons[0].id,
      done: Array.isArray(p.done)
        ? ([
            ...new Set(
              p.done.filter(
                (id: unknown): id is string =>
                  typeof id === "string" && valid.has(id),
              ),
            ),
          ] as string[])
        : [],
    };
  } catch {
    return { ...defaultProgress, done: [] };
  }
}
