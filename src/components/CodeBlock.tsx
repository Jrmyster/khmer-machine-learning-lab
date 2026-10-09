import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { Lesson, Lang } from "../types";
import { en, km } from "../locales/ui";
function highlight(source: string) {
  const tokens = source.split(
    /(#[^\n]*|\/\/[^\n]*|"[^"\n]*"|'[^'\n]*'|\b(?:import|from|const|let|return|if|else|try|finally|as|print|True|False|None)\b|\b\d+(?:\.\d+)?\b)/g,
  );
  return tokens.map((v, i) => (
    <span
      key={i}
      className={
        /^(#|\/\/)/.test(v)
          ? "token-comment"
          : /^["']/.test(v)
            ? "token-string"
            : /^(import|from|const|let|return|if|else|try|finally|as|print|True|False|None)$/.test(
                  v,
                )
              ? "token-key"
              : /^\d/.test(v)
                ? "token-number"
                : undefined
      }
    >
      {v}
    </span>
  ));
}
export function CodeBlock({
  code,
  lang,
}: {
  code: NonNullable<Lesson["code"]>;
  lang: Lang;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const t = lang === "en" ? en : km;
  async function copy() {
    try {
      await navigator.clipboard.writeText(code.source);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }
  return (
    <section className="code-block">
      <div className="code-header">
        <span>
          {code.language} · {t.code}
        </span>
        <button onClick={() => void copy()}>
          <span aria-hidden="true">
            {status === "copied" ? <Check size={16} /> : <Copy size={16} />}
          </span>
          {status === "copied" ? t.copied : t.copy}
        </button>
      </div>
      <pre tabIndex={0} aria-label={t.code}>
        <code>{highlight(code.source)}</code>
      </pre>
      <p
        className="code-note"
        role={status === "failed" ? "status" : undefined}
      >
        {status === "failed" ? t.copyFailed : t.codeNote}
      </p>
    </section>
  );
}
