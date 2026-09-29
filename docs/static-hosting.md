# Static website hosting (not deployed)

## Vercel setup — Maa Care V2

- Repository: `Jeyamdev/maa-care-V2`; production branch: `main`.
- Framework: Vite; Root Directory: `apps/web`; Node.js: `22.x`.
- Keep **Include files outside the root directory in the Build Step** enabled
  so `packages/epds-core` and the root npm workspace/lockfile are available.
- Configuration lives in `apps/web/vercel.json`, relative to the Vercel project root.
- Install command: `cd ../.. && npm ci` (installs the locked monorepo dependencies).
- Build command: `npm run build` (runs in `apps/web`).
- Output directory: `dist` (repository path `apps/web/dist`).
- No environment variables are required. Existing SPA fallback and security
  headers are retained. Netlify `_headers`/`_redirects` are not used by Vercel.

The old repository-root `vercel.json` explicitly set `buildCommand` to
`npm run build:web` and `outputDirectory` to `apps/web/dist`. Those settings were
for a repository-root build and conflicted with the selected `apps/web` root.
Vercel's file-based buildCommand overrides the dashboard setting. The root file
has been removed and replaced by the web-local configuration; the legitimate
repository-root `npm run build:web` convenience script remains unchanged.
No fake `build:web` script was added to the web package.

Local equivalent (start at repository root):

```sh
cd apps/web
(cd ../.. && npm ci)
npm run build
```

Deploy the latest `main` commit, not a retry of an old commit containing the stale
configuration. The build log should show `npm run build` and the web package's
`tsc --noEmit && vite build`. Verify direct routes, refresh, and security headers
on the deployed URL. Keep analytics and tracking integrations disabled.

Git deployments also require Vercel to identify the commit author. This repository
uses GitHub's `186163689+Jeyamdev@users.noreply.github.com` commit address for new
deployment commits so GitHub can attribute them to `Jeyamdev`. The Vercel account
must have its GitHub login connected. Earlier commits used a local Mac address;
redeploy the latest commit instead of retrying one of those earlier commits.

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

For repository-root hosting setups (not the Vercel apps/web setup above), set build command `npm run build:web`, build root to repository root, publish directory `apps/web/dist`, and a rewrite (not a redirect) from application routes to `/index.html`. Verify the selected host's actual behavior. Hosts without SPA rewrites need equivalent routing configuration before release.

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
