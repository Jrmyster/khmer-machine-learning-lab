# Khmer Machine Learning Lab

A mobile-first, bilingual Khmer/English learning guide for the Khmer One ecosystem. Choose one of four depths, read short lessons, explore diagrams, and perform real numerical experiments directly in the browser. No account, backend, API key, or GPU is required.

## Curriculum

| Depth | Lessons | Topics |
|---|---:|---|
| Introductory | 3 | Rules versus learned models; supervised, unsupervised and reinforcement learning; uses and limitations |
| Medium | 4 | Data pipeline and leakage; regression, trees, forests, SVMs and MLPs; classification metrics; bias/variance and regularization |
| Graduate | 3 | ERM, MLE/MAP, PAC/VC and a finite-class generalization bound; chain-rule backpropagation and optimizers; CNNs and Transformer attention |
| Expert | 3 | DDP, tensor/pipeline parallelism and FSDP; precision, checkpointing, FlashAttention, MoE and quantization; evaluation, checkpoints and deployment |

## Interactive features

- Four keyboard-accessible depth tabs, lesson navigation, EN/KM toggle.
- 13 bilingual lessons with self-reported completion and knowledge checks.
- Gradient-descent line fitting with actual MSE and prediction updates.
- Threshold experiment with a confusion matrix, accuracy, precision, recall, F1 and fixed-score ROC-AUC.
- SGD, Momentum, RMSprop and Adam on a deterministic quadratic, including unstable-rate behavior.
- Scaled dot-product attention: change query vectors and magnitude, apply a causal mask, inspect weights and weighted values.
- Distributed strategy diagrams and an explicitly idealized FP32/Adam memory calculator.
- KaTeX formulas with MathML, syntax-colored Python/PyTorch/TypeScript examples and copy buttons.
- Selection, language, and completion restored from localStorage. Invalid saved data recovers safely; unavailable storage falls back to memory.
- Self-hosted Kantumruy Pro fonts; no third-party font request.

## Local setup

Use Node **22.12 or newer** and npm. The lockfile is committed.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Main component: `src/components/MachineLearningGuide.tsx`. Curriculum: `src/data/curriculum.ts`. Typed interface strings: `src/locales/ui.ts`.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

`dist/` contains the finished static website; `index.html` is at its root. Do not commit `dist/` or `node_modules/`. The CI workflow runs the same four verification commands on pushes and pull requests.

## Cloudflare deployment

**Pages:** connect this repository, choose `main`, build with `npm run build`, and use `dist` as the output directory. No environment variables are needed. The app has a single root route and does not need an `_redirects` rewrite. Security/cache headers are in `public/_headers`.

**Worker static assets:** authenticate Wrangler to the intended account, build, then:

```sh
npm run build
npm run deploy:cloudflare
```

`wrangler.json` specifies the existing `dist` directory and native SPA fallback. The pinned deploy script avoids auto-configuration of Vite or a second build. Do not add a `/* /index.html 200` redirect: native Worker fallback handles navigation without an HTML normalization redirect loop. See [deployment guide](docs/DEPLOYMENT.md).

This repository is deployment-ready but no live deployment is implied by the source push.

## Data and privacy

Only the language, selected tier/lesson, and completed lesson IDs are stored under `khmer-ml-lab-progress-v1`. No uploads, tracking, cloud synchronization or network requests from labs. Source links open external documentation in a new tab. Progress is tied to the browser/device and may be cleared by private mode or browser settings. There is no service worker; this version does not promise offline reopening.

## Code examples and limitations

The browser labs are small educational simulations, not a full ML training environment. Python and PyTorch snippets are for copying into your own environment, **not execution inside the app**. The applied Python example requires scikit-learn; PyTorch examples require PyTorch. The DDP snippet requires two supported CUDA GPUs and launches with `torchrun`. GPU code was not executed during browser-app testing.

The memory estimator counts FP32 parameters, gradients and two Adam moments (16 bytes/parameter), in decimal GB. It excludes activations, buffers, communication, allocator overhead and uneven layers; it is not a capacity guarantee. Simplified optimizer experiments use exact full-batch gradients rather than stochastic minibatches. Completion is a learner annotation, not certification. Khmer technical terminology is provided for review by educators; recognizable English acronyms are retained.

## Verification

See [verification record](docs/VERIFICATION.md) for executed tests and outstanding visual checks. Numerical behavior, translations, formula rendering, progress recovery and component navigation are covered by automated tests. Layout includes 44px controls and narrow-screen styles, but mobile browser visual review must be performed after a reachable deployment.

## Portal integration

The header returns to the supplied live Khmer One portal. [Registry metadata](docs/portal-entry.json) contains bilingual title, description and keywords. Its `url` is intentionally `null` until the actual deployment URL is known. Add that entry to the portal's own registry only after deployment, adapting its schema. The central portal repository was not modified.

## Architecture and roadmap

See [architecture](docs/ARCHITECTURE.md) for storage, formulas, simulation assumptions and extensibility. Future work: educator review of Khmer wording, more worked mathematical problems, optional offline shell, accessible dataset upload and sandboxed Python execution. None of these are presented as implemented.

MIT licensed. The bundled Kantumruy Pro font package carries its own SIL Open Font License; KaTeX and other dependencies retain their package licenses.
