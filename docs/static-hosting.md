# Static website hosting (not deployed)

## Vercel setup

The root `vercel.json` configures the Vite build, `apps/web/dist` output,
SPA fallback, and security/privacy headers. Keep Vercel's Root Directory
at the repository root (`./`) so npm can resolve the shared workspace.
The Netlify `_headers` and `_redirects` files are not used by Vercel.

1. In Vercel, import `Jeyamdev/maa-care-epds` from GitHub.
2. Select Vite, Root Directory `./`, and Node.js `22.x`. No environment variables
   are required. The configuration supplies install command `npm ci`, build
   command `npm run build:web`, and output directory `apps/web/dist`.
3. Set **Settings → Environments → Production → Branch Tracking** to `v2`.
   If the initial import attempts `main`, it may fail because `main` still has
   the original mobile-only layout. Set `v2` before the next deployment.
4. Deploy the latest `v2` commit. Confirm the deployment source is `v2` rather
   than retrying an old `main` deployment. Future pushes to `v2` trigger updates.
5. Verify direct links, refresh, response headers, and the privacy checks below
   on the resulting `.vercel.app` address. Leave tracking integrations disabled.

No Vercel account connection or project was available locally when this
configuration was prepared. Publishing and production-branch selection require
the repository owner's Vercel/GitHub connection. No mobile release is triggered.

Vercel manages static asset caching; the Netlify-specific cache rules below
do not apply automatically. Assessment data is never part of the static output.

## Build and output

From the repository root:

```sh
npm ci
npm run typecheck
npm test
npm run build:web
npm run test:web
```

Publish only **apps/web/dist/**. Do not publish the repository root, mobile export, source files, local audit output, or test screenshots. The site currently assumes an origin-root deployment (for example `https://your-domain/`), not a subdirectory. No runtime environment variables or secrets are needed. Build dependencies must be installed, not omitted as dev dependencies before the build.

## Routing

The lightweight client router uses only fixed paths: `/`, `/guide`, `/assessment`, `/results`, `/about`. It stores null history state. Question index, responses, scores and safety do not enter navigation URLs. Set the host to serve `index.html` for application routes while serving real asset files normally.

`public/_redirects` is copied into the build for hosts that support that format:

```text
/* /index.html 200
```

For Nginx, the equivalent route handling is:

```nginx
location / { try_files $uri $uri/ /index.html; }
```

On a host with a dashboard, set build command `npm run build:web`, build root to repository root, publish directory `apps/web/dist`, and a rewrite (not a redirect) from application routes to `/index.html`. Verify the selected host's actual behavior. Hosts without SPA rewrites need equivalent routing configuration before release.

Direct `/results` and reload show the Tamil missing-assessment screen. Direct `/assessment` starts blank. About and Guide support direct links. Unknown paths show a Tamil not-found screen. Refresh never restores an assessment. Browser Back to a result after returning Home/starting again also shows the missing-assessment screen.

## Privacy and headers

`public/_headers` provides an example for hosts supporting that format. For other hosts, configure response headers explicitly:

- Content-Security-Policy: `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'`
- Referrer-Policy: `no-referrer`
- X-Content-Type-Options: `nosniff`
- Permissions-Policy: `camera=(), microphone=(), geolocation=()`
- HTML and unversioned assets: `Cache-Control: no-store`; hashed `/assets/*` may use `public, max-age=31536000, immutable`.

These are production headers, not Vite development-server headers. CSP `connect-src 'none'` intentionally prevents runtime network calls; the normal external YouTube navigation is still allowed. Enable HTTPS. Do not enable hosting analytics, injected tracking, session replay, request-body collection, third-party forms or error payload collection. Configure access-log retention/access for the hosting environment and describe ordinary access logs accurately; do not claim absolute anonymity or encryption guarantees. Do not cache pages through a service worker. Static JS/CSS/image caching contains no assessment data.

Header examples must be applied by the host; a successful local Vite build does not prove a hosting provider applied them. Test the response headers, direct URLs, navigation, resource links and absence of unexpected scripts on the final host before release. If a previous site used service workers on the same origin, use a clean origin or explicitly remove that old deployment's worker before release.

## Deployment after approval

1. Review the generated website locally and the manual-review list in `website-migration.md`.
2. Select an existing static host/origin and approve publishing; no host/account/domain has been created here.
3. Run the commands above; upload only `apps/web/dist` or configure the build/publish settings above.
4. Apply and verify the route fallback and security headers. Verify that HTML is refreshed when new asset hashes are deployed.
5. Visit each route directly. Complete a disposable assessment including a low-score safety response; check refresh, reset and Home clearing. Inspect storage, URLs/history, network and console once more on the real host.
6. Review host access logs and disable any default tracking integrations. No EAS build is necessary for website deployment.
