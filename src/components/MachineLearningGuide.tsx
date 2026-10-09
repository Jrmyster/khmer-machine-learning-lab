import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GraduationCap,
  Network,
  Sparkles,
} from "lucide-react";
import { tiers, sources } from "../data/curriculum";
import { en, km } from "../locales/ui";
import {
  defaultProgress,
  parseProgress,
  STORAGE_KEY,
  type Progress,
} from "../lib/progress";
import type { Lang, Lesson } from "../types";
import { CodeBlock } from "./CodeBlock";
const Formula = lazy(() =>
  import("./Formula").then((module) => ({ default: module.Formula })),
);
import { Diagram } from "./Diagram";
import { Lab } from "./Labs";
const allLessons = tiers.flatMap((t) =>
  t.lessons.map((l) => ({ tier: t.id, lesson: l.id })),
);
function readSaved() {
  try {
    return {
      progress: parseProgress(localStorage.getItem(STORAGE_KEY)),
      blocked: false,
    };
  } catch {
    return { progress: { ...defaultProgress, done: [] }, blocked: true };
  }
}
function LessonContent({ lesson, lang }: { lesson: Lesson; lang: Lang }) {
  const t = lang === "en" ? en : km;
  const [diagram, setDiagram] = useState(false),
    [answer, setAnswer] = useState<number | null>(null);
  // Alternate display order, while retaining the answer's original index.
  const choices = lesson.id.length % 2 ? [1, 0] : [0, 1];
  return (
    <>
      <div className="lesson-text">
        {lesson.paragraphs.map((p, i) => (
          <p key={i}>{p[lang]}</p>
        ))}
        {lesson.bullets && (
          <ul>
            {lesson.bullets.map((b, i) => (
              <li key={i}>{b[lang]}</li>
            ))}
          </ul>
        )}
      </div>
      {lesson.formulas?.map((f, i) => (
        <Suspense
          key={i}
          fallback={
            <div className="formula">
              <code>{f}</code>
            </div>
          }
        >
          <Formula source={f} lang={lang} />
        </Suspense>
      ))}
      {lesson.diagram && (
        <section className="diagram-section">
          <button
            aria-expanded={diagram}
            aria-controls="lesson-diagram"
            onClick={() => setDiagram(!diagram)}
          >
            <Network size={18} aria-hidden="true" />
            {diagram ? t.hideDiagram : t.showDiagram}
            {diagram ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {diagram && (
            <div id="lesson-diagram">
              <Diagram id={lesson.diagram} lang={lang} />
            </div>
          )}
        </section>
      )}
      {lesson.lab && <Lab id={lesson.lab} lang={lang} />}{" "}
      {lesson.code && <CodeBlock code={lesson.code} lang={lang} />}
      <section className="knowledge-check">
        <span className="eyebrow">
          <Sparkles size={16} aria-hidden="true" />
          {t.check}
        </span>
        <h3>{lesson.question.prompt[lang]}</h3>
        <div className="answer-options">
          {choices.map((i) => (
            <button
              key={i}
              aria-pressed={answer === i}
              onClick={() => setAnswer(i)}
            >
              {lesson.question.choices[i][lang]}
            </button>
          ))}
        </div>
        {answer !== null && (
          <p
            className={
              answer === lesson.question.answer
                ? "feedback positive"
                : "feedback negative"
            }
            role="status"
          >
            <b>{answer === lesson.question.answer ? t.correct : t.retry}</b>{" "}
            {lesson.question.explanation[lang]}
          </p>
        )}
      </section>
    </>
  );
}
export function MachineLearningGuide() {
  const [initial] = useState(readSaved),
    [progress, setProgress] = useState<Progress>(initial.progress),
    [blocked, setBlocked] = useState(initial.blocked);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = progress.lang === "en" ? en : km,
    lang = progress.lang;
  const tier = tiers.find((v) => v.id === progress.tier)!,
    lesson = tier.lessons.find((v) => v.id === progress.lesson)!;
  const index = allLessons.findIndex((v) => v.lesson === lesson.id),
    done = progress.done.includes(lesson.id);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${t.app} · Khmer One`;
  }, [lang, t.app]);
  function update(next: Progress) {
    setProgress(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setBlocked(false);
    } catch {
      setBlocked(true);
    }
  }
  function selectTier(i: number) {
    const next = tiers[i];
    update({ ...progress, tier: next.id, lesson: next.lessons[0].id });
  }
  function tabKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % tiers.length;
    else if (e.key === "ArrowLeft")
      next = (i + tiers.length - 1) % tiers.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tiers.length - 1;
    else return;
    e.preventDefault();
    selectTier(next);
    tabRefs.current[next]?.focus();
  }
  function move(offset: number) {
    const next = allLessons[index + offset];
    if (next) update({ ...progress, ...next });
  }
  return (
    <>
      <a className="skip-link" href="#lesson-content">
        {t.skip}
      </a>
      <header className="topbar">
        <a
          href="https://khmerone.jaredrobertw.workers.dev/"
          className="brand"
          aria-label={t.portal}
        >
          <span className="brand-icon">
            <Network size={23} />
          </span>
          <span>
            <small>{t.network}</small>
            <b>{t.app}</b>
          </span>
        </a>
        <div className="top-actions">
          <a
            className="portal-link"
            href="https://khmerone.jaredrobertw.workers.dev/"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>{t.portal}</span>
          </a>
          <div className="language-toggle" role="group" aria-label={t.language}>
            {(["en", "km"] as const).map((l) => (
              <button
                key={l}
                aria-pressed={lang === l}
                onClick={() => update({ ...progress, lang: l })}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <GraduationCap size={18} aria-hidden="true" />
              {t.subject}
            </span>
            <h1>{t.title}</h1>
            <p>{t.intro}</p>
          </div>
          <div className="hero-network" aria-hidden="true">
            <svg viewBox="0 0 320 180">
              <defs>
                <linearGradient id="network-gradient">
                  <stop stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#ffb703" />
                </linearGradient>
              </defs>
              {[45, 90, 135].flatMap((y, i) =>
                [35, 75, 115, 155].map((z, j) => (
                  <line key={`${i}-${j}`} x1="45" y1={y} x2="155" y2={z} />
                )),
              )}
              {[35, 75, 115, 155].flatMap((y, i) =>
                [65, 115].map((z, j) => (
                  <line key={`r${i}-${j}`} x1="155" y1={y} x2="265" y2={z} />
                )),
              )}
              {[
                [45, 45],
                [45, 90],
                [45, 135],
                [155, 35],
                [155, 75],
                [155, 115],
                [155, 155],
                [265, 65],
                [265, 115],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="9" />
              ))}
            </svg>
            <span>{t.horizon}</span>
          </div>
        </section>
        <section className="depth-section" aria-label={t.depth}>
          <div className="section-top">
            <h2>{t.depth}</h2>
            <span
              className="local-status"
              role={blocked ? "status" : undefined}
            >
              {blocked ? t.storageBlocked : t.saved}
            </span>
          </div>
          <div className="depth-tabs" role="tablist" aria-label={t.depth}>
            {tiers.map((v, i) => (
              <button
                key={v.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${v.id}`}
                aria-controls={`panel-${v.id}`}
                aria-selected={tier.id === v.id}
                tabIndex={tier.id === v.id ? 0 : -1}
                onKeyDown={(e) => tabKey(e, i)}
                onClick={() => selectTier(i)}
              >
                <span className="tier-number">0{i + 1}</span>
                <span>
                  <b>{v.title[lang]}</b>
                  <small>{v.subtitle[lang]}</small>
                </span>
                <span className="tier-count">
                  {v.lessons.filter((l) => progress.done.includes(l.id)).length}
                  /{v.lessons.length}
                </span>
              </button>
            ))}
          </div>
        </section>
        <div
          className="learning-layout"
          role="tabpanel"
          id={`panel-${tier.id}`}
          aria-labelledby={`tab-${tier.id}`}
        >
          <aside className="lesson-sidebar">
            <div className="progress-card">
              <span className="eyebrow">{t.progress}</span>
              <strong>
                {progress.done.length}
                <small> / {allLessons.length}</small>
              </strong>
              <div
                className="progress-track"
                role="progressbar"
                aria-label={t.progress}
                aria-valuemin={0}
                aria-valuemax={allLessons.length}
                aria-valuenow={progress.done.length}
              >
                <div
                  style={{
                    width: `${(progress.done.length / allLessons.length) * 100}%`,
                  }}
                />
              </div>
              <span>{t.completed}</span>
            </div>
            <nav aria-label={t.lessons}>
              <h2>
                <BookOpen size={17} aria-hidden="true" />
                {t.lessons}
              </h2>
              {tier.lessons.map((l) => (
                <button
                  key={l.id}
                  className="lesson-link"
                  aria-current={l.id === lesson.id ? "step" : undefined}
                  onClick={() => update({ ...progress, lesson: l.id })}
                >
                  <span>{l.title[lang]}</span>
                  {progress.done.includes(l.id) ? (
                    <CheckCircle2 size={17} aria-label={t.completed} />
                  ) : (
                    <span className="lesson-dot" />
                  )}
                </button>
              ))}
            </nav>
            <div className="prerequisite">
              <strong>{t.prerequisite}</strong>
              <p>{tier.prerequisite[lang]}</p>
            </div>
          </aside>
          <article id="lesson-content" className="lesson-card" tabIndex={-1}>
            <div className="lesson-heading">
              <span className="eyebrow">
                {tier.title[lang]} · {t.section} {index + 1}/{allLessons.length}
              </span>
              <h2>{lesson.title[lang]}</h2>
            </div>
            <LessonContent key={lesson.id} lesson={lesson} lang={lang} />
            <div className="lesson-finish">
              <button
                className={done ? "completed-button" : "primary"}
                onClick={() =>
                  update({
                    ...progress,
                    done: done
                      ? progress.done.filter((id) => id !== lesson.id)
                      : [...progress.done, lesson.id],
                  })
                }
              >
                <Check size={18} aria-hidden="true" />
                {done ? t.undo : t.complete}
              </button>
              <div className="lesson-pagination">
                <button disabled={index === 0} onClick={() => move(-1)}>
                  <ArrowLeft size={17} aria-hidden="true" />
                  {t.previous}
                </button>
                <button
                  disabled={index === allLessons.length - 1}
                  onClick={() => move(1)}
                >
                  {t.next}
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        </div>
        <details className="sources">
          <summary>{t.sources}</summary>
          <p>{t.sourceNote}</p>
          <ul>
            {sources.map((s) => (
              <li key={s.url}>
                <a target="_blank" rel="noopener noreferrer" href={s.url}>
                  {s.label}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </details>
      </main>
      <footer>
        <span>{t.footer}</span>
        <span>KHMER ONE · 2026</span>
      </footer>
    </>
  );
}
