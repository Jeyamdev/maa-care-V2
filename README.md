# Maa Care

Tamil EPDS screening and education, with an existing Expo mobile app and a separate memory-only website. This is not a medical diagnosis.

```text
apps/
  mobile/                  Existing Expo Router application
    src/                   Screens, native UI, AsyncStorage service
    assets/images/         Production mobile images (keep here)
    app.json               Unchanged app identity
    eas.json               Unchanged EAS identity/profiles
  web/                     Independent React + TypeScript + Vite website
    public/images/         Local Maa Care brand assets
    src/{pages,components,context,styles}/
    tests/                 Browser/privacy/accessibility checks
packages/
  epds-core/
    src/                   Pure TypeScript questions/scoring/safety/localization/types
    tests/                 Frozen baseline and regression tests
docs/                      Design, migration and hosting notes
scripts/                   Storage and migration/navigation checks
package.json               npm workspaces and root commands
package-lock.json          One lockfile; original locked versions retained
```

## Install and run

Use Node 22.23.2 (or compatible Node 22.12+) and npm 10.9.8. Install from the repository root:

```sh
npm ci
npm run dev:web
```

Website: http://127.0.0.1:5173. In another terminal, independently:

```sh
npm start
npm run android
npm run ios
```

These three mobile commands are alternatives; `npm start` lets you select a target. Expo starts from `apps/mobile`. Run any EAS commands from that directory, only when a build is explicitly authorized. No custom Metro configuration is required. For a stale pre-migration Metro cache, run `npm start -- --clear` (or `npm run start -w @maa-care/mobile -- --clear`).

## Checks and builds

```sh
npm run typecheck
npm test
npm run build:web
npx playwright install chromium
npm run test:web
npm run export:android
(cd apps/mobile && npx expo-doctor)
```

- `npm test`: frozen original scoring/storage checks plus shared core tests; storage uses disposable in-memory data.
- `npm run test:web`: runs Chromium against the production website, so run `npm run build:web` first. Screenshots: `output/web-review/`.
- Website output: `apps/web/dist`. Preview: `npm run preview:web` (http://127.0.0.1:4173).
- Android export output: `output/mobile-android`; export is not a Gradle/AAPT release build.
- Optional local snapshot comparison: `node scripts/verify-migration.cjs`.

For the Expo app's optional browser navigation check:

```sh
(cd apps/mobile && npx expo export --platform web --output-dir ../../output/mobile-web)
python3 scripts/serve-mobile-review.py
# In another terminal:
node scripts/verify-mobile-navigation.cjs
```

This uses a fresh browser context, never device records. The public website is the Vite app, not this Expo export.

## Behavior and privacy

Both apps consume `@maa-care/epds-core`. Original Tamil questions/options, scoring directions, 0–9/10–12/13–30 risk thresholds and independent question-ten safety handling are unchanged. Mobile retains all routes, aliases, automatic save/retry, confirmations, offline storage and `EPDS_HISTORY` records.

The website has Home → Guide → ten questions → Results, plus About. Answers/results exist only in React memory. Returning Home or starting again clears them. Reload/direct Results displays a Tamil explanation. No assessment data enters storage, URLs, history state, analytics, logs or network requests. No backend, accounts, saved history, service worker, remote fonts or embedded YouTube player. YouTube opens only after the user follows the existing fixed external link, with no referrer or assessment data.

The host may retain ordinary access logs. Assets must load before offline scoring works; first-visit offline access is not promised.

See [migration baseline](docs/migration-baseline.md), [implementation report](docs/website-migration.md), and [static hosting instructions](docs/static-hosting.md). Existing design notes remain in [ui-redesign.md](docs/ui-redesign.md); their original mobile-relative paths now start at `apps/mobile`.
