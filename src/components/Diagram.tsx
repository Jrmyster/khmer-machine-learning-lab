import { useState } from "react";
import { ArrowRight, Cpu, Network } from "lucide-react";
import { en, km } from "../locales/ui";
import type { DiagramId, Lang } from "../types";
export type ParallelMode = "ddp" | "tensor" | "pipeline";
export function ParallelDiagram({
  mode,
  lang,
  devices = 4,
}: {
  mode: ParallelMode;
  lang: Lang;
  devices?: number;
}) {
  const t = lang === "en" ? en : km;
  return (
    <div className="parallel-diagram">
      <div className="gpu-grid">
        {Array.from({ length: devices }, (_, i) => (
          <div className="gpu" key={i}>
            <Cpu size={24} aria-hidden="true" />
            <b>GPU {i + 1}</b>
            <span>
              {mode === "ddp"
                ? t.replica
                : mode === "tensor"
                  ? `${t.shard} ${i + 1}`
                  : `${t.stage} ${i + 1}`}
            </span>
            <div className="gpu-bars">
              {Array.from({ length: mode === "ddp" ? 4 : 1 }, (_, j) => (
                <i key={j} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="diagram-caption">
        <Network size={18} aria-hidden="true" />
        {mode === "ddp"
          ? t.ddpExplain
          : mode === "tensor"
            ? t.tensorExplain
            : t.pipelineExplain}
      </p>
    </div>
  );
}
function Flow({ nodes }: { nodes: string[] }) {
  return (
    <ol className="flow">
      {nodes.map((n, i) => (
        <li key={i}>
          <span>{n}</span>
          {i < nodes.length - 1 && <ArrowRight aria-hidden="true" size={18} />}
        </li>
      ))}
    </ol>
  );
}
export function Diagram({ id, lang }: { id: DiagramId; lang: Lang }) {
  const t = lang === "en" ? en : km;
  const [architecture, setArchitecture] = useState<"cnn" | "attention">(
    id === "cnn" ? "cnn" : "attention",
  );
  const [mode, setMode] = useState<ParallelMode>("ddp");
  if (id === "rules")
    return (
      <div className="diagram">
        <h4>{t.traditional}</h4>
        <Flow nodes={[`${t.rules} + ${t.data}`, t.answers]} />
        <h4>{t.supervised}</h4>
        <Flow nodes={[`${t.data} + ${t.answers}`, t.learned]} />
        <Flow nodes={[`${t.learned} + ${t.newData}`, t.prediction]} />
      </div>
    );
  if (id === "pipeline")
    return (
      <div className="diagram">
        <Flow nodes={[t.collect, t.clean, t.split, t.fit, t.evaluate]} />
        <p className="diagram-caption">{t.pipelineNote}</p>
      </div>
    );
  if (id === "parallel")
    return (
      <div className="diagram">
        <div className="segmented" aria-label={t.mode}>
          {(["ddp", "tensor", "pipeline"] as const).map((m) => (
            <button
              key={m}
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
            >
              {t[m]}
            </button>
          ))}
        </div>
        <ParallelDiagram mode={mode} lang={lang} />
      </div>
    );
  return (
    <div className="diagram">
      <div className="segmented" aria-label={t.architecture}>
        {(["cnn", "attention"] as const).map((a) => (
          <button
            key={a}
            aria-pressed={architecture === a}
            onClick={() => setArchitecture(a)}
          >
            {t[a]}
          </button>
        ))}
      </div>
      {architecture === "cnn" ? (
        <>
          <Flow nodes={[t.image, t.kernel, t.features, t.pooling, t.result]} />
          <p className="diagram-caption">{t.cnnNote}</p>
        </>
      ) : (
        <>
          <Flow nodes={[t.positions, "Q · Kᵀ / √dₖ", t.mix, t.result]} />
          <div className="qkv">
            <span>Q · {t.query}</span>
            <span>K · {t.keys}</span>
            <span>V · {t.values}</span>
          </div>
          <p className="diagram-caption">{t.attentionNote}</p>
        </>
      )}
    </div>
  );
}
