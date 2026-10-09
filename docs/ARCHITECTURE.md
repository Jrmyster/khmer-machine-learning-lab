# Architecture

## Composition

`MachineLearningGuide` owns a single persisted progress object. Its tier and lesson determine the rendered `LessonContent`; a stable lesson key resets quiz/diagram state when changing lessons. Language changes preserve the current lab experiment. Depth navigation supports ArrowLeft, ArrowRight, Home and End, with a roving tab stop and corresponding tab panel.

`curriculum.ts` uses typed `Tier`, `Lesson` and `Bilingual` records. `ui.ts` requires identical interface keys in both languages. Add translations before introducing another UI label. Technical source titles and common programming identifiers retain their original names.

`Lab` selects a small locally calculated experiment. All mathematics lives in `lib/ml.ts`, separately tested. Charts use SVG; conceptual diagrams use responsive HTML with descriptive text. No Three.js, model downloads, remote inference, or timed animation loops are necessary.

## Computation assumptions

- Regression: six fixed synthetic points, mean squared error, simultaneous weight/bias updates at learning rate .03. The example is illustrative and makes no causal claim about practice.
- Metrics: eight fixed labeled scores; inclusive threshold (`score >= threshold`); undefined precision/F1 return zero, as the curriculum states. ROC-AUC is calculated as pairwise ranking, including half credit for ties.
- Optimization: scalar quadratic `(w - 3)^2`, initial `w=-2`; Momentum beta=.9, RMSprop beta=.9, Adam betas=.9/.999 with bias correction and epsilon=1e-8. Logarithmic display prevents large unstable losses from appearing as a flat chart.
- Attention: three fixed 2D Q/K/V vectors; stable softmax of scaled dot products; optional future keys set to negative infinity. At least the query's own position remains visible.
- Parallelism: DDP replicates all modeled state; tensor/pipeline estimates divide evenly by GPU count. Real implementations communicate and may distribute layers unevenly. The displayed GPU boxes describe roles, not observed hardware.

## Rendering and storage

The formula component and KaTeX CSS/renderer load lazily when a lesson contains formulas, keeping them off the introductory startup path. KaTeX receives only trusted authored curriculum strings, with `trust:false`; it emits HTML and MathML. Invalid syntax falls back to the original formula. Code highlighting creates React text nodes, not user-supplied HTML. Clipboard failure yields a manual-copy instruction.

`parseProgress` validates the schema version, known tier/lesson IDs, locale and completion IDs, removes duplicates, and restores defaults on malformed JSON. Save failures leave working in-memory progress and display a notice. No secrets, accounts, cookies, cross-device state, or database are needed.

Vite emits a static build. Fonts and icons are bundled locally. Cloudflare Pages or Worker Static Assets serve the same `dist` folder. There is no server application and no backend configuration. Core UI uses no runtime API; reference links require internet access. Offline reload is not guaranteed without a future service worker.

## Integration boundary

This standalone guide can also be integrated as a React component. Import its styles, font CSS and KaTeX CSS, mount `MachineLearningGuide`, and adjust its portal link and page metadata. Keep its storage namespace distinct. It currently controls document language/title because it is the application root; move that responsibility to the host when embedding.
