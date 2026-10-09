import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MachineLearningGuide } from "../src/components/MachineLearningGuide";
import { STORAGE_KEY } from "../src/lib/progress";
import { tiers } from "../src/data/curriculum";
describe("bilingual guide interactions", () => {
  it("saves language, selected tier and completed section across remount", async () => {
    const user = userEvent.setup();
    const first = render(<MachineLearningGuide />);
    await user.click(screen.getByRole("button", { name: "KM" }));
    await user.click(screen.getByRole("tab", { name: /កម្រិតឧត្ដម/ }));
    await user.click(
      screen.getByRole("button", { name: "សម្គាល់ថាបានបញ្ចប់ផ្នែក" }),
    );
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(saved.lang).toBe("km");
    expect(saved.tier).toBe("graduate");
    expect(saved.done).toContain(tiers[2].lessons[0].id);
    first.unmount();
    render(<MachineLearningGuide />);
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "កម្រិតឧត្ដម",
    );
    expect(
      screen.getByRole("button", { name: "សម្គាល់ថាមិនទាន់បញ្ចប់" }),
    ).toBeInTheDocument();
  });
  it("supports arrow-key tab navigation and an interactive diagram", async () => {
    const user = userEvent.setup();
    render(<MachineLearningGuide />);
    await user.click(screen.getByRole("button", { name: "Show diagram" }));
    expect(screen.getByText("Traditional program")).toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: /Introductory/ }));
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent(
      "Medium",
    );
    expect(screen.getByRole("tab", { selected: true })).toHaveFocus();
  });
  it("trains the model and updates live numerical feedback", async () => {
    const user = userEvent.setup();
    render(<MachineLearningGuide />);
    expect(screen.getByText("0.0")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Train 20 steps" }));
    expect(screen.queryByText("0.0")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reset model" }));
    expect(screen.getByText("0.0")).toBeInTheDocument();
  });
  it("renders every lesson in Khmer without formula fallback", () => {
    for (const tier of tiers) {
      for (const lesson of tier.lessons) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            version: 1,
            lang: "km",
            tier: tier.id,
            lesson: lesson.id,
            done: [],
          }),
        );
        const { unmount } = render(<MachineLearningGuide />);
        expect(
          screen.getByRole("heading", { name: lesson.title.km }),
        ).toBeInTheDocument();
        expect(
          screen.queryByText("រូបមន្តមិនអាចបង្ហាញបាន។ បង្ហាញកូដ LaTeX។"),
        ).not.toBeInTheDocument();
        unmount();
      }
    }
  });
  it("keeps working when browser storage is blocked", async () => {
    const spy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("blocked");
      });
    try {
      const user = userEvent.setup();
      render(<MachineLearningGuide />);
      await user.click(
        screen.getByRole("button", { name: "Mark section complete" }),
      );
      expect(
        screen.getByText(
          "Browser storage is unavailable. Progress will last only for this visit.",
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Mark as incomplete" }),
      ).toBeInTheDocument();
    } finally {
      spy.mockRestore();
    }
  });
});
