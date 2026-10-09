import katex from "katex";
import "katex/dist/katex.min.css";
import type { Lang } from "../types";
import { en, km } from "../locales/ui";
export function Formula({ source, lang }: { source: string; lang: Lang }) {
  const t = lang === "en" ? en : km;
  let html: string | null = null;
  try {
    html = katex.renderToString(source, {
      displayMode: true,
      throwOnError: true,
      trust: false,
      output: "htmlAndMathml",
    });
  } catch {
    /* Curriculum error: retain a readable source fallback. */
  }
  return html ? (
    <div className="formula" dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <div className="formula">
      <p>{t.formulaFailed}</p>
      <code>{source}</code>
    </div>
  );
}
