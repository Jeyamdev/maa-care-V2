# Maa Care website and workspace implementation report

## Delivered structure

```text
maa-care/
├── apps/
│   ├── mobile/
│   │   ├── src/                 All original screens/components/hooks/storage
│   │   ├── assets/images/       Production mobile images
│   │   ├── scripts/
│   │   ├── app.json
│   │   ├── eas.json
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── web/
│       ├── public/images/
│       ├── public/_headers
│       ├── public/_redirects
│       ├── src/
│       │   ├── pages/           Home, Guide, Assessment, Results, About
│       │   ├── components/
│       │   ├── context/
│       │   ├── styles/
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── tests/
│       ├── index.html
│       ├── playwright.config.ts
│       ├── tsconfig.json
│       └── package.json
├── packages/epds-core/
│   ├── src/                     questions/scoring/safety/localization/types/index
│   ├── tests/
│   ├── tsconfig.json
│   └── package.json
├── scripts/
├── docs/
├── package-lock.json
└── package.json
```

See [the complete moved/created/modified file inventory](migration-files.md). No working source/assets were deleted; old paths disappear because their files moved. Unrelated uncommitted UI work was preserved. No commit, deployment, external account, domain purchase or EAS build was made.

## Mobile preservation and shared implementation

The existing working-tree app was moved rather than reconstructed. A pre-migration source/asset snapshot confirms **67 files are byte-identical**, including app/EAS config, history/storage, dialogs, aliases, UI components and production assets. All original dependency ranges and every previously locked package version were retained. Expo's native workspace support is used without custom Metro configuration. The original TypeScript aliases still resolve relative to apps/mobile.

Only three native screens and two constant modules changed after moving: Assessment consumes shared answer validation; Results consumes shared validation/scoring/risk/interpretation/safety; Detail consumes shared per-answer validation/scoring; question/localization modules re-export core for existing imports. Native save/retry/navigation logic remains unchanged. AsyncStorage key `EPDS_HISTORY`, record fields, stored English risk values, legacy-record handling, duplicate suppression, delete/clear confirmations and offline history remain unchanged. Application IDs, scheme, version and EAS project ID remain byte-identical in the moved configs. Compatibility routes `result`/`results` and `assessmentDetail`/`assessment-detail` remain.

`epds-core` has no UI, browser, React, React Native, Expo or storage imports. It exports original Tamil questions/options/order/directions; question/result/risk types; individual/complete answer validation; per-answer/total scoring; risk classification; independent safety handling; original Tamil risk labels and interpretations. Both applications consume it; frozen `.txt` files under tests are baseline oracles and are not imported by either application.

No clinical interpretation was changed. The original `reverseScore: true` means option-index scoring for questions 1, 2 and 4; this naming is counterintuitive but retained. Thresholds and Tamil text are inherited rather than independently clinically revalidated. Valid JSON input behavior is unchanged; shared validation also rejects sparse arrays supplied programmatically.

## Website

Home → Guide → ten questions → Results, plus About and a Tamil missing-route screen. Responsive desktop composition, calm brand mark fallback, plum reading text, restrained pink actions, blush/lavender surfaces and semantic risk/safety colors follow the supplied direction. No new illustration was invented/downloaded. Future hero requirements remain in `ui-redesign.md`; a web version can use the same approved transparent 1536×1024 artwork under `apps/web/public/images`, while mobile production art stays in `apps/mobile/assets/images`.

Native radio controls, fieldset/legend, required-answer message, question/validation focus, Previous/Next, answer editing, completion guard, progress, native details/summary, keyboard focus, reduced-motion preference and large actions are implemented. Results include total, original Tamil risk label/interpretation, independent prominent safety guidance, next steps, expandable answers, screening notice, fixed external YouTube link, Start Again and Home. No history, save/delete controls, Settings placeholders, account or backend exists on the website.

Assessment data stays in context/reducer memory. Public routes are fixed strings and history state is null. Home/Start Again clear data; reload/direct Results cannot restore it. Page-hide/back-forward-cache restoration also clears data. The build has no storage API, analytics, error reporting, service worker, remote fonts, YouTube embed, or assessment request. The external resource has no dynamic query data and suppresses referrer. Privacy copy explains ordinary host access logs and the need to load static assets before offline calculation. It makes no absolute anonymity/encryption claim.

## Exact commands

Run at the repository root unless noted:

```sh
npm ci
npm run dev:web
npm start
npm run android
npm run ios
npm run typecheck
npm test
npm run build:web
npx playwright install chromium
npm run test:web
npm run preview:web
npm run export:android
(cd apps/mobile && npx expo-doctor)
```

`npm start`, `npm run android` and `npm run ios` are alternative ways to start mobile. `npm run dev:web` starts only Vite. Production web output is `apps/web/dist`. Run the web build before browser tests or preview. See README for optional mobile browser-export navigation checks. No domain package compilation step is required: Vite and Metro consume its TypeScript source.

## Verification completed

| Check | Result |
| --- | --- |
| Baseline TypeScript and original regression script | Passed before edits |
| Baseline Android export | Passed |
| All three workspace TypeScript checks | Passed |
| Original scoring/storage regression checks | Passed; disposable in-memory storage only |
| Shared core | 40 contributions, all 31 totals/risk boundaries, original question wording/order/directions, invalid/incomplete/sparse answers, original Tamil interpretations |
| Independent safety | All 112 combinations of question-ten option and achievable other-question subtotal; low-score safety remains visible |
| Storage compatibility | Legacy record load, save/deduplication, single deletion, clear; original service with fake AsyncStorage |
| Snapshot preservation | 67 unchanged mobile files/assets/configs, unchanged dependency ranges and previous locked versions |
| Expo Doctor in apps/mobile | 21/21 passed with registry access |
| Migrated Android export | Passed; Hermes bundle, all required assets resolved |
| Migrated Expo web export | All 12 routes emitted including aliases |
| Mobile browser navigation | Home/Settings/About/Guide/ten questions/validation/previous/Results/auto-save/Detail/History/aliases/offline detail passed in isolated context |
| Android emulator | Migrated Expo Go app loaded; Home/History/Guide/Questions, validation, Next/Previous passed; no assessment saved or deleted |
| Vite production build | Passed; approximately 222 KB JS (67 KB gzip), 10 KB CSS plus local images |
| Browser functionality | Original boundary labels 0/9/10/12/13/30, answer editing, independent low-score safety, direct Results/reload, Home/Start Again clearing |
| Browser privacy | Intercepted storage writes/history APIs, checked cookies/IndexedDB/caches/service workers, monitored network/console; no data writes, requests, logs or history payload during tested flow |
| Offline website | Loaded assets first, disabled network, completed assessment and results successfully |
| Accessibility automation | Axe scans on Home/Guide/Question/Results/About/missing-result: no violations after semantic corrections |
| Keyboard | Radio focus/Space/arrow selection, Tab/Enter, question focus and validation focus passed |
| Responsive | Home/Guide/About/Questions/Results at 320/390/768/1440 CSS px, no horizontal page overflow; screenshots generated |
| Enlargement | 640px CSS viewport (200%-zoom-equivalent layout from 1280px) plus 200% root text sizing checked; native browser-menu zoom still merits manual review |
| Visual inspection | Desktop Home, small-phone Questions and phone safety Results screenshots reviewed for wrapping/layout/hierarchy |
| Website production dependency audit | Zero reported advisories |

Review artifacts are ignored under `output/web-review`, `output/native-review`, `output/mobile-android`, and `output/mobile-web`. Original snapshot: `output/migration-baseline`. These artifacts contain only disposable test data or non-assessment native review screens.

## Warnings and limits

- Workspace npm audit reports **21 advisories: 1 low, 15 moderate, 4 high, 1 critical**, including shell-quote, ws, xmldom, brace-expansion and browserslist in the preserved dependency tree. Existing locked packages were not upgraded. Review/fix these in a separate compatibility-tested dependency task. Website production-only audit reports zero; this is not a blanket security guarantee. Local JSON reports: output/workspace-audit.json and output/web-production-audit.json.
- Expo's optional static export still exhibits the baseline React #418 hydration warnings on some direct query routes. The mobile browser check observed two such warnings and no other page exceptions. The separate Vite website has no hydration and normal tested flow has no console errors.
- Initial restricted sandbox attempts could not access the registry or bind local ports. Authorized retries succeeded; these are not remaining build blockers.
- No Gradle/AAPT binary/release build was run. Android export and Expo Go smoke testing do not prove AAPT release compatibility. Production image paths are unchanged relative to mobile.
- Native History was empty during this turn, so native delete/clear dialogs were not opened. Handler source is unchanged and actual storage deletion is regression-tested only using disposable in-memory records.
- iOS simulator tooling reports `simctl` unavailable; no native iOS run occurred. No EAS build was started.
- Browser tests ran Chromium. Safari/Firefox, screen readers, true browser-menu zoom and physical-device large fonts/gesture behavior still require human review. Automated axe checks are not a complete accessibility certification.
- Expo/Playwright printed nonfunctional NO_COLOR/FORCE_COLOR warnings.
- Website host rewrites/headers and production access-log settings cannot be verified before a host is chosen; no deployment was attempted.

## Manual review before publication or a mobile release

1. Review the brand fallback, Tamil phrasing, wrapping, status/interpretation and attribution with the product owner; original clinical content remains unchanged.
2. Website: Home → Guide → each question → Results; previous edits, keyboard-only flow, answer details, every risk boundary and especially low total with safety guidance. Review 200% browser-menu zoom, reduced motion, screen readers and Safari/Firefox.
3. Website: reload/direct Results and browser Back after Home/Start Again; no previous result should return. Verify external YouTube launch and absence of assessment data in its URL/referrer.
4. Mobile: native saved legacy records, Result retry, Detail, both aliases, deletion/cancellation on explicitly disposable records, offline restart/history, YouTube launch/failure, TalkBack, device large fonts, safe areas and Android Back. Do not clear user records to test.
5. Review iOS behavior and an authorized Android binary build separately before a mobile release. No identity/assets should be changed as part of that check.
6. After explicit deployment approval, follow [static-hosting.md](static-hosting.md): upload only apps/web/dist, apply SPA fallback and headers, disable host-injected tracking, then verify direct links/privacy in the real hosted environment.

## References used for tooling

Required [Expo v56 reference](https://docs.expo.dev/versions/v56.0.0/), installed [Expo v57 reference](https://docs.expo.dev/versions/v57.0.0/) and [Expo monorepo guidance](https://docs.expo.dev/guides/monorepos/). The installed version was retained; the automatic Metro workspace support avoids custom resolver/watch-folder configuration.
