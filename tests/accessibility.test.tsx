import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import axe from "axe-core";
import { MachineLearningGuide } from "../src/components/MachineLearningGuide";
import { tiers } from "../src/data/curriculum";
import { STORAGE_KEY } from "../src/lib/progress";
describe("structural accessibility", () => {
  it.each(["en", "km"] as const)(
    "has no detected structural axe violations in %s across all tiers",
    async (lang) => {
      for (const tier of tiers) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            version: 1,
            lang,
            tier: tier.id,
            lesson: tier.lessons[0].id,
            done: [],
          }),
        );
        const { container, unmount } = render(<MachineLearningGuide />);
        if (tier.lessons[0].formulas?.length)
          await waitFor(() =>
            expect(container.querySelector(".katex")).not.toBeNull(),
          );
        const result = await axe.run(container, {
          rules: { "color-contrast": { enabled: false } },
        });
        expect(
          result.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        ).toEqual([]);
        unmount();
      }
    },
  );
});
