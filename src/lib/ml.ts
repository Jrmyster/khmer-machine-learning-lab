export const trainingData = [
  { x: 0, y: 12 },
  { x: 1, y: 19 },
  { x: 2, y: 25 },
  { x: 3, y: 34 },
  { x: 4, y: 41 },
  { x: 5, y: 48 },
];
export const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
export function regressionLoss(w: number, b: number) {
  return (
    trainingData.reduce((s, p) => s + (w * p.x + b - p.y) ** 2, 0) /
    trainingData.length
  );
}
export function trainLine(w: number, b: number, steps = 1) {
  for (let i = 0; i < steps; i++) {
    const dw =
      (2 * trainingData.reduce((s, p) => s + (w * p.x + b - p.y) * p.x, 0)) /
      trainingData.length;
    const db =
      (2 * trainingData.reduce((s, p) => s + w * p.x + b - p.y, 0)) /
      trainingData.length;
    w -= 0.03 * dw;
    b -= 0.03 * db;
  }
  return { w, b };
}
export const scoredExamples = [
  { score: 0.95, actual: 1 },
  { score: 0.8, actual: 1 },
  { score: 0.7, actual: 0 },
  { score: 0.6, actual: 1 },
  { score: 0.5, actual: 0 },
  { score: 0.4, actual: 1 },
  { score: 0.25, actual: 0 },
  { score: 0.1, actual: 0 },
];
export function classificationMetrics(threshold: number) {
  let tp = 0,
    tn = 0,
    fp = 0,
    fn = 0;
  for (const e of scoredExamples) {
    if (e.score >= threshold) {
      if (e.actual) tp++;
      else fp++;
    } else if (e.actual) fn++;
    else tn++;
  }
  const precision = tp + fp ? tp / (tp + fp) : 0,
    recall = tp + fn ? tp / (tp + fn) : 0;
  return {
    tp,
    tn,
    fp,
    fn,
    accuracy: (tp + tn) / scoredExamples.length,
    precision,
    recall,
    f1:
      precision + recall ? (2 * precision * recall) / (precision + recall) : 0,
  };
}
export function rocAuc() {
  const pos = scoredExamples.filter((e) => e.actual),
    neg = scoredExamples.filter((e) => !e.actual);
  return (
    pos.reduce(
      (sum, p) =>
        sum +
        neg.reduce(
          (s, n) => s + (p.score > n.score ? 1 : p.score === n.score ? 0.5 : 0),
          0,
        ),
      0,
    ) /
    (pos.length * neg.length)
  );
}
export function softmax(values: number[]) {
  const max = Math.max(...values);
  const e = values.map((v) => Math.exp(v - max));
  const sum = e.reduce((a, b) => a + b, 0);
  return e.map((v) => v / sum);
}
export function attention(
  query: number[],
  keys: number[][],
  values: number[][],
  lastVisibleKey = keys.length - 1,
) {
  const weights = softmax(
    keys.map((k, index) =>
      index > lastVisibleKey
        ? -Infinity
        : k.reduce((s, v, i) => s + v * query[i], 0) / Math.sqrt(query.length),
    ),
  );
  return {
    weights,
    output: values[0].map((_, j) =>
      values.reduce((s, v, i) => s + weights[i] * v[j], 0),
    ),
  };
}
export type Optimiser = "sgd" | "momentum" | "rmsprop" | "adam";
export function optimise(
  kind: Optimiser,
  initial: number,
  rate: number,
  count: number,
) {
  let w = initial,
    m = 0,
    v = 0;
  const points = [{ w, loss: (w - 3) ** 2 }];
  for (let t = 1; t <= count; t++) {
    const g = 2 * (w - 3);
    if (kind === "sgd") w -= rate * g;
    else if (kind === "momentum") {
      m = 0.9 * m + g;
      w -= rate * m;
    } else if (kind === "rmsprop") {
      v = 0.9 * v + 0.1 * g ** 2;
      w -= (rate * g) / (Math.sqrt(v) + 1e-8);
    } else {
      m = 0.9 * m + 0.1 * g;
      v = 0.999 * v + 0.001 * g ** 2;
      w -=
        (rate * (m / (1 - 0.9 ** t))) /
        (Math.sqrt(v / (1 - 0.999 ** t)) + 1e-8);
    }
    points.push({ w, loss: (w - 3) ** 2 });
  }
  return points;
}
export function memoryEstimate(
  parametersB: number,
  devices: number,
  mode: "ddp" | "tensor" | "pipeline",
) {
  const totalGB = parametersB * 16; // FP32 params + gradients + Adam first/second moments; excludes activations.
  return mode === "ddp" ? totalGB : totalGB / devices;
}
