import { useState } from "react";
import { Play, RotateCcw, FlaskConical } from "lucide-react";
import { en, km } from "../locales/ui";
import type { LabId, Lang } from "../types";
import {
  attention,
  classificationMetrics,
  memoryEstimate,
  optimise,
  regressionLoss,
  rocAuc,
  scoredExamples,
  trainingData,
  trainLine,
  type Optimiser,
} from "../lib/ml";
import { ParallelDiagram, type ParallelMode } from "./Diagram";
function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="slider">
      <span>
        {label}
        <output>{value}</output>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
function Regression({ lang }: { lang: Lang }) {
  const t = lang === "en" ? en : km;
  const [model, setModel] = useState({ w: 0, b: 0, steps: 0 });
  const [hours, setHours] = useState(2);
  const y = (score: number) => 170 - (score / 60) * 150;
  return (
    <>
      <svg
        viewBox="0 0 340 195"
        role="img"
        aria-label={`${t.prediction}: y = ${model.w.toFixed(2)}x + ${model.b.toFixed(2)}`}
        className="chart"
      >
        <defs>
          <clipPath id="regression-area">
            <rect x="30" y="15" width="290" height="160" />
          </clipPath>
        </defs>
        {[0, 20, 40, 60].map((v) => (
          <g key={v}>
            <line x1="30" x2="320" y1={y(v)} y2={y(v)} className="grid-line" />
            <text x="22" y={y(v) + 4} textAnchor="end">
              {v}
            </text>
          </g>
        ))}
        <g clipPath="url(#regression-area)">
          <line
            x1="35"
            x2="310"
            y1={y(model.b)}
            y2={y(5 * model.w + model.b)}
            className="plot-line"
          />
          {trainingData.map((p) => (
            <circle
              key={p.x}
              cx={35 + p.x * 55}
              cy={y(p.y)}
              r="5"
              className="data-point"
            />
          ))}
          <circle
            cx={35 + hours * 55}
            cy={y(hours * model.w + model.b)}
            r="6"
            className="prediction-point"
          />
        </g>
        {[0, 1, 2, 3, 4, 5].map((v) => (
          <text key={v} x={35 + v * 55} y="190" textAnchor="middle">
            {v} h
          </text>
        ))}
      </svg>
      <div className="lab-actions">
        <button
          className="primary"
          onClick={() =>
            setModel((m) => ({
              ...trainLine(m.w, m.b, 20),
              steps: m.steps + 20,
            }))
          }
        >
          <Play size={16} aria-hidden="true" />
          {t.train}
        </button>
        <button onClick={() => setModel({ w: 0, b: 0, steps: 0 })}>
          <RotateCcw size={16} aria-hidden="true" />
          {t.reset}
        </button>
      </div>
      <Slider
        label={t.hours}
        value={hours}
        min={0}
        max={5}
        step={0.1}
        onChange={setHours}
      />
      <div className="stats">
        <Stat
          label={t.mse}
          value={regressionLoss(model.w, model.b).toFixed(2)}
        />
        <Stat
          label={t.prediction}
          value={(model.w * hours + model.b).toFixed(1)}
        />
        <Stat label={t.steps} value={String(model.steps)} />
      </div>
      <p className="lab-note">
        y = {model.w.toFixed(2)}x + {model.b.toFixed(2)}
      </p>
    </>
  );
}
function Metrics({ lang }: { lang: Lang }) {
  const t = lang === "en" ? en : km;
  const [threshold, setThreshold] = useState(0.5);
  const m = classificationMetrics(threshold);
  return (
    <>
      <Slider
        label={t.threshold}
        value={threshold}
        min={0}
        max={1}
        step={0.05}
        onChange={setThreshold}
      />
      <div className="stats">
        {(["accuracy", "precision", "recall", "f1"] as const).map((k) => (
          <Stat key={k} label={t[k]} value={`${(m[k] * 100).toFixed(1)}%`} />
        ))}
      </div>
      <div className="confusion">
        {(["tp", "fp", "fn", "tn"] as const).map((k) => (
          <Stat key={k} label={t[k]} value={String(m[k])} />
        ))}
      </div>
      <div className="table-scroll">
        <table>
          <caption>
            {t.roc}: {rocAuc().toFixed(4)}
          </caption>
          <thead>
            <tr>
              <th>{t.example}</th>
              <th>{t.probability}</th>
              <th>{t.actual}</th>
              <th>{t.predicted}</th>
            </tr>
          </thead>
          <tbody>
            {scoredExamples.map((e, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.score.toFixed(2)}</td>
                <td>{e.actual}</td>
                <td>
                  <span
                    className={
                      e.actual === Number(e.score >= threshold)
                        ? "positive"
                        : "negative"
                    }
                  >
                    {Number(e.score >= threshold)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
function Optimisation({ lang }: { lang: Lang }) {
  const t = lang === "en" ? en : km;
  const [kind, setKind] = useState<Optimiser>("sgd"),
    [rate, setRate] = useState(0.1),
    [count, setCount] = useState(30);
  const points = optimise(kind, -2, rate, count),
    last = points.at(-1)!;
  const max = Math.max(...points.map((p) => Math.log1p(p.loss)), 0.001);
  const path = points
    .map(
      (p, i) =>
        `${i ? "L" : "M"} ${25 + (i / count) * 285} ${165 - (Math.log1p(p.loss) / max) * 140}`,
    )
    .join(" ");
  return (
    <>
      <p>{t.quadratic}</p>
      <label className="field">
        {t.optimiser}
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value as Optimiser)}
        >
          <option value="sgd">SGD</option>
          <option value="momentum">Momentum</option>
          <option value="rmsprop">RMSprop</option>
          <option value="adam">Adam</option>
        </select>
      </label>
      <Slider
        label={t.rate}
        value={rate}
        min={0.01}
        max={1.1}
        step={0.01}
        onChange={setRate}
      />
      <Slider
        label={t.iterations}
        value={count}
        min={1}
        max={60}
        onChange={setCount}
      />
      <svg
        viewBox="0 0 340 190"
        role="img"
        aria-label={`${t.loss}: ${last.loss.toFixed(4)}`}
        className="chart"
      >
        <line x1="25" y1="165" x2="310" y2="165" className="grid-line" />
        <path d={path} className="plot-line" />
        <text x="25" y="185">
          0
        </text>
        <text x="310" y="185" textAnchor="end">
          {count}
        </text>
        <text x="25" y="16">
          log(1 + {t.loss})
        </text>
      </svg>
      <div className="stats">
        <Stat label={t.parameter} value={last.w.toPrecision(5)} />
        <Stat label={t.loss} value={last.loss.toPrecision(5)} />
      </div>
      <p className="lab-note">{t.optimisationNote}</p>
    </>
  );
}
const vectors = [
  [1, 0],
  [0, 1],
  [1, 1],
];
function Attention({ lang }: { lang: Lang }) {
  const t = lang === "en" ? en : km;
  const [query, setQuery] = useState(0),
    [scale, setScale] = useState(1),
    [causal, setCausal] = useState(false);
  const result = attention(
    vectors[query].map((v) => v * scale),
    vectors,
    vectors,
    causal ? query : 2,
  );
  return (
    <>
      <p className="lab-note">{t.attentionNote}</p>
      <label className="field">
        {t.query}
        <select
          value={query}
          onChange={(e) => setQuery(Number(e.target.value))}
        >
          {vectors.map((v, i) => (
            <option key={i} value={i}>
              Token {i + 1} · [{v.join(", ")}]
            </option>
          ))}
        </select>
      </label>
      <Slider
        label={t.scale}
        value={scale}
        min={0.1}
        max={5}
        step={0.1}
        onChange={setScale}
      />
      <label className="checkbox">
        <input
          type="checkbox"
          checked={causal}
          onChange={(e) => setCausal(e.target.checked)}
        />
        {t.causal}
      </label>
      <h4>{t.weights}</h4>
      {result.weights.map((w, i) => (
        <div className="weight" key={i}>
          <span>Token {i + 1}</span>
          <div className="weight-track">
            <div style={{ width: `${w * 100}%` }} />
          </div>
          <output>{(w * 100).toFixed(1)}%</output>
        </div>
      ))}
      <Stat
        label={t.output}
        value={`[${result.output.map((v) => v.toFixed(3)).join(", ")}]`}
      />
    </>
  );
}
function Parallel({ lang }: { lang: Lang }) {
  const t = lang === "en" ? en : km;
  const [devices, setDevices] = useState(4),
    [params, setParams] = useState(2),
    [mode, setMode] = useState<ParallelMode>("ddp");
  return (
    <>
      <label className="field">
        {t.mode}
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as ParallelMode)}
        >
          {(["ddp", "tensor", "pipeline"] as const).map((k) => (
            <option key={k} value={k}>
              {t[k]}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        {t.devices}
        <select
          value={devices}
          onChange={(e) => setDevices(Number(e.target.value))}
        >
          {[1, 2, 4, 8].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </label>
      <Slider
        label={t.params}
        value={params}
        min={1}
        max={20}
        step={0.5}
        onChange={setParams}
      />
      <ParallelDiagram mode={mode} devices={devices} lang={lang} />
      <Stat
        label={t.memory}
        value={`${memoryEstimate(params, devices, mode).toFixed(1)} GB`}
      />
      <p className="lab-note">{t.memoryNote}</p>
    </>
  );
}
export function Lab({ id, lang }: { id: LabId; lang: Lang }) {
  const t = lang === "en" ? en : km;
  const components = {
    regression: Regression,
    metrics: Metrics,
    optimisation: Optimisation,
    attention: Attention,
    parallel: Parallel,
  };
  const Component = components[id];
  return (
    <section className="lab">
      <header>
        <FlaskConical size={20} aria-hidden="true" />
        <div>
          <h3>{t.lab}</h3>
          <span>{t.labNote}</span>
        </div>
      </header>
      <Component lang={lang} />
    </section>
  );
}
