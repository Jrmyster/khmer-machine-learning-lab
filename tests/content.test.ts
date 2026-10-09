import { describe, expect, it } from "vitest";
import katex from "katex";
import { tiers } from "../src/data/curriculum";
import { en, km } from "../src/locales/ui";
import { defaultProgress, parseProgress } from "../src/lib/progress";
describe("curriculum and safe recovery", () => {
  it("provides all four tiers and unique, fully bilingual lesson content", () => {
    expect(tiers.map((t) => t.id)).toEqual([
      "intro",
      "medium",
      "graduate",
      "expert",
    ]);
    const lessons = tiers.flatMap((t) => t.lessons);
    expect(lessons).toHaveLength(13);
    expect(new Set(lessons.map((l) => l.id)).size).toBe(13);
    for (const t of tiers) {
      expect(t.title.km).toMatch(/[\u1780-\u17ff]/);
      expect(t.prerequisite.en.length).toBeGreaterThan(10);
      for (const l of t.lessons) {
        for (const text of [
          l.title,
          ...l.paragraphs,
          ...(l.bullets ?? []),
          l.question.prompt,
          ...l.question.choices,
          l.question.explanation,
        ]) {
          expect(text.en.length).toBeGreaterThan(3);
          expect(text.km).toMatch(/[\u1780-\u17ff]/);
        }
        expect(l.question.answer).toBeLessThan(l.question.choices.length);
      }
    }
  });
  it("keeps locale keys synchronized", () => {
    expect(Object.keys(km).sort()).toEqual(Object.keys(en).sort());
    for (const value of Object.values(km))
      expect(value.length).toBeGreaterThan(0);
  });
  it("renders every curriculum formula without malformed LaTeX", () => {
    for (const l of tiers.flatMap((t) => t.lessons)) {
      for (const formula of l.formulas ?? [])
        expect(() =>
          katex.renderToString(formula, { throwOnError: true, trust: false }),
        ).not.toThrow();
    }
  });
  it("recovers selection and completion from saved JSON", () => {
    const saved = {
      ...defaultProgress,
      lang: "km",
      tier: "graduate",
      lesson: "risk",
      done: ["patterns", "metrics"],
    };
    expect(parseProgress(JSON.stringify(saved))).toEqual(saved);
  });
  it("rejects corrupt progress and removes unrecognized or duplicate IDs", () => {
    expect(parseProgress("{")).toEqual(defaultProgress);
    expect(parseProgress("null")).toEqual(defaultProgress);
    expect(parseProgress(JSON.stringify({ version: 99 }))).toEqual(
      defaultProgress,
    );
    const result = parseProgress(
      JSON.stringify({
        version: 1,
        lang: "xx",
        tier: "bad",
        lesson: "bad",
        done: ["patterns", "patterns", "bad", 12],
      }),
    );
    expect(result).toEqual({ ...defaultProgress, done: ["patterns"] });
  });
});
