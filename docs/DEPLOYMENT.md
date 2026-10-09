# Static deployment

## Cloudflare Pages

1. Connect `Jrmyster/khmer-machine-learning-lab` through the owner's existing GitHub integration.
2. Production branch: `main`.
3. Build command: `npm run build`.
4. Build output directory: `dist`.
5. Use Node 22.12+ (Node 24 is also suitable).
6. No API keys or environment variables are required.

After deployment, verify the root page, load each tier, switch EN/KM, complete a lesson and refresh, and check the browser console. Verify formulas and self-hosted font files respond correctly and that the `_headers` security/cache policy is applied. A newly deployed origin has separate localStorage from another preview origin.

## Cloudflare Worker Static Assets

The committed `wrangler.json` includes an assets directory and `not_found_handling: single-page-application`; no Worker entry point or Vite Cloudflare plugin is required.

```sh
npm ci
npm run build
npx --yes wrangler@4.148.0 login
npm run deploy:cloudflare
```

Use the deployment URL returned by Wrangler. Authentication belongs to the owner's Cloudflare account; never commit tokens. Git-connected Workers can use `npm run build` and `npm run deploy:cloudflare` as separate build and deploy commands.

Do not combine native SPA fallback with a blanket rewrite to `/index.html`. The module only has a root route; no server routes, SSR endpoints or Python jobs must be migrated.

## GitHub Pages

This repository is configured for hosting at an origin root. GitHub Pages repository subpaths require a Vite `base` value matching the repository path before rebuilding. No Pages deployment is enabled automatically.
