import { describe, expect, it } from "vitest";
import {
  attention,
  classificationMetrics,
  memoryEstimate,
  optimise,
  regressionLoss,
  rocAuc,
  sigmoid,
  softmax,
  trainLine,
} from "../src/lib/ml";
describe("actual educational computations", () => {
  it("gradient descent improves the fitted line without changing the examples", () => {
    const initial = regressionLoss(0, 0);
    const model = trainLine(0, 0, 200);
    expect(regressionLoss(model.w, model.b)).toBeLessThan(initial / 100);
    expect(model.w).toBeCloseTo(7.3, 0);
    expect(model.b).toBeCloseTo(11, 0);
  });
  it("classification counts and metrics agree at the inclusive .5 cutoff", () => {
    const m = classificationMetrics(0.5);
    expect(m).toMatchObject({ tp: 3, fp: 2, fn: 1, tn: 2 });
    expect(m.accuracy).toBe(0.625);
    expect(m.precision).toBe(0.6);
    expect(m.recall).toBe(0.75);
    expect(m.f1).toBeCloseTo(2 / 3);
    expect(rocAuc()).toBe(0.8125);
  });
  it("returns defined metrics with no predicted positives", () => {
    const m = classificationMetrics(1);
    expect(m.precision).toBe(0);
    expect(m.recall).toBe(0);
    expect(m.f1).toBe(0);
    expect(classificationMetrics(0).recall).toBe(1);
  });
  it("normalizes stable attention scores and masks future tokens exactly", () => {
    expect(softmax([1000, 1000])).toEqual([0.5, 0.5]);
    const vectors = [
      [1, 0],
      [0, 1],
      [1, 1],
    ];
    const result = attention([1, 0], vectors, vectors, 0);
    expect(result.weights).toEqual([1, 0, 0]);
    expect(result.output).toEqual([1, 0]);
    const unmasked = attention([1, 0], vectors, vectors);
    expect(unmasked.weights.reduce((a, b) => a + b, 0)).toBeCloseTo(1);
    expect(unmasked.weights[0]).toBeCloseTo(unmasked.weights[2]);
    expect(unmasked.weights[0]).toBeGreaterThan(unmasked.weights[1]);
  });
  it.each(["sgd", "momentum", "rmsprop", "adam"] as const)(
    "%s makes progress on a safe quadratic setting",
    (kind) => {
      const points = optimise(kind, -2, 0.1, 60);
      expect(points).toHaveLength(61);
      expect(points.at(-1)!.loss).toBeLessThan(points[0].loss);
      expect(points.every((p) => Number.isFinite(p.loss))).toBe(true);
    },
  );
  it("shows SGD divergence at an unstable learning rate", () => {
    const points = optimise("sgd", -2, 1.1, 20);
    expect(points.at(-1)!.loss).toBeGreaterThan(points[0].loss);
  });
  it("does not shard replicated DDP model memory", () => {
    expect(memoryEstimate(2, 4, "ddp")).toBe(32);
    expect(memoryEstimate(2, 4, "tensor")).toBe(8);
    expect(memoryEstimate(2, 4, "pipeline")).toBe(8);
    expect(sigmoid(0)).toBe(0.5);
  });
});
