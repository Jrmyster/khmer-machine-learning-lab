# Verification record

Verified on 2026-10-09 with Node 24: clean `npm ci`, TypeScript, ESLint, **22 tests**, and production build passed. Initial JavaScript is 283.15 kB (89.15 kB gzip); the 265.53 kB KaTeX module loads separately only for formula lessons. Structural axe checks cover all four tiers in both languages; color contrast/layout were not checked by jsdom.

Automated coverage:

- Real gradient-descent loss reduction and reset behavior.
- Confusion counts, precision/recall/F1, undefined metric convention, and fixed-score ROC-AUC.
- Stable attention normalization, weighted output, and exact causal masking.
- Four optimizer updates and unstable SGD behavior.
- Replicated versus idealized sharded memory estimates.
- All 13 lessons and four tiers, EN/KM coverage and UI key agreement.
- Every authored LaTeX formula parses with KaTeX.
- Invalid stored JSON, wrong schema, unknown IDs and duplicate completion recovery.
- Language/tier/completion persistence across component remount.
- Arrow-key tab focus, diagrams, regression controls, every lesson in Khmer, and storage denial.

The cloud preview browser could not connect to the workspace localhost server (`ERR_CONNECTION_REFUSED`). This is not evidence of an application rendering error. Consequently, do not treat component tests as proof of visual fit on a real phone.

Post-deployment manual checks still required:

- 320px and 390px phone widths, then tablet and desktop.
- Long Khmer headings, caption line height, and formulas/code scrolling inside their own containers.
- All touch controls, keyboard focus and screen-reader navigation.
- Clipboard success/denial and private-browser progress behavior.
- Real HTTP security/cache headers and no console errors.

Python snippets are teaching examples. CPU/GPU execution, distributed training and hardware capacity were not verified by this front-end build.
