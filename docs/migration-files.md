# Migration file inventory

Paths are relative to the repository root. Moves include the uncommitted working-tree versions, not just HEAD. No existing source or image was intentionally deleted.

## Moved

- `app.json` → `apps/mobile/app.json`
- `assets/expo.icon/Assets/expo-symbol 2.svg` → `apps/mobile/assets/expo.icon/Assets/expo-symbol 2.svg`
- `assets/expo.icon/Assets/grid.png` → `apps/mobile/assets/expo.icon/Assets/grid.png`
- `assets/expo.icon/icon.json` → `apps/mobile/assets/expo.icon/icon.json`
- `assets/images/android-icon-background.png` → `apps/mobile/assets/images/android-icon-background.png`
- `assets/images/android-icon-foreground.png` → `apps/mobile/assets/images/android-icon-foreground.png`
- `assets/images/android-icon-monochrome.png` → `apps/mobile/assets/images/android-icon-monochrome.png`
- `assets/images/expo-badge-white.png` → `apps/mobile/assets/images/expo-badge-white.png`
- `assets/images/expo-badge.png` → `apps/mobile/assets/images/expo-badge.png`
- `assets/images/expo-logo.png` → `apps/mobile/assets/images/expo-logo.png`
- `assets/images/favicon.png` → `apps/mobile/assets/images/favicon.png`
- `assets/images/icon.png` → `apps/mobile/assets/images/icon.png`
- `assets/images/logo-glow.png` → `apps/mobile/assets/images/logo-glow.png`
- `assets/images/logo.png` → `apps/mobile/assets/images/logo.png`
- `assets/images/maa-care-icon.png` → `apps/mobile/assets/images/maa-care-icon.png`
- `assets/images/maa-care-mark.png` → `apps/mobile/assets/images/maa-care-mark.png`
- `assets/images/react-logo.png` → `apps/mobile/assets/images/react-logo.png`
- `assets/images/react-logo@2x.png` → `apps/mobile/assets/images/react-logo@2x.png`
- `assets/images/react-logo@3x.png` → `apps/mobile/assets/images/react-logo@3x.png`
- `assets/images/splash-icon.png` → `apps/mobile/assets/images/splash-icon.png`
- `assets/images/tabIcons/explore.png` → `apps/mobile/assets/images/tabIcons/explore.png`
- `assets/images/tabIcons/explore@2x.png` → `apps/mobile/assets/images/tabIcons/explore@2x.png`
- `assets/images/tabIcons/explore@3x.png` → `apps/mobile/assets/images/tabIcons/explore@3x.png`
- `assets/images/tabIcons/home.png` → `apps/mobile/assets/images/tabIcons/home.png`
- `assets/images/tabIcons/home@2x.png` → `apps/mobile/assets/images/tabIcons/home@2x.png`
- `assets/images/tabIcons/home@3x.png` → `apps/mobile/assets/images/tabIcons/home@3x.png`
- `assets/images/tutorial-web.png` → `apps/mobile/assets/images/tutorial-web.png`
- `eas.json` → `apps/mobile/eas.json`
- `package.json` → `apps/mobile/package.json` (workspace name, shared dependency and scripts adjusted; new root manifest).
- `src/.DS_Store` → `apps/mobile/src/.DS_Store`
- `src/app/_layout.tsx` → `apps/mobile/src/app/_layout.tsx`
- `src/app/about.tsx` → `apps/mobile/src/app/about.tsx`
- `src/app/assessment-detail.tsx` → `apps/mobile/src/app/assessment-detail.tsx`
- `src/app/assessment-info.tsx` → `apps/mobile/src/app/assessment-info.tsx`
- `src/app/assessment.tsx` → `apps/mobile/src/app/assessment.tsx`
- `src/app/assessmentDetail.tsx` → `apps/mobile/src/app/assessmentDetail.tsx`
- `src/app/history.tsx` → `apps/mobile/src/app/history.tsx`
- `src/app/index.tsx` → `apps/mobile/src/app/index.tsx`
- `src/app/result.tsx` → `apps/mobile/src/app/result.tsx`
- `src/app/results.tsx` → `apps/mobile/src/app/results.tsx`
- `src/app/settings.tsx` → `apps/mobile/src/app/settings.tsx`
- `src/assets/logo.png` → `apps/mobile/src/assets/logo.png`
- `src/components/AccordionCard.tsx` → `apps/mobile/src/components/AccordionCard.tsx`
- `src/components/AnswerOption.tsx` → `apps/mobile/src/components/AnswerOption.tsx`
- `src/components/AppHeader.tsx` → `apps/mobile/src/components/AppHeader.tsx`
- `src/components/AppIcon.tsx` → `apps/mobile/src/components/AppIcon.tsx`
- `src/components/AssessmentSummary.tsx` → `apps/mobile/src/components/AssessmentSummary.tsx`
- `src/components/HeroArtwork.tsx` → `apps/mobile/src/components/HeroArtwork.tsx`
- `src/components/ProgressIndicator.tsx` → `apps/mobile/src/components/ProgressIndicator.tsx`
- `src/components/SectionHeader.tsx` → `apps/mobile/src/components/SectionHeader.tsx`
- `src/components/StatusBadge.tsx` → `apps/mobile/src/components/StatusBadge.tsx`
- `src/components/YouTubeGuidanceCard.tsx` → `apps/mobile/src/components/YouTubeGuidanceCard.tsx`
- `src/components/animated-icon.module.css` → `apps/mobile/src/components/animated-icon.module.css`
- `src/components/animated-icon.tsx` → `apps/mobile/src/components/animated-icon.tsx`
- `src/components/animated-icon.web.tsx` → `apps/mobile/src/components/animated-icon.web.tsx`
- `src/components/external-link.tsx` → `apps/mobile/src/components/external-link.tsx`
- `src/components/hint-row.tsx` → `apps/mobile/src/components/hint-row.tsx`
- `src/components/themed-text.tsx` → `apps/mobile/src/components/themed-text.tsx`
- `src/components/themed-view.tsx` → `apps/mobile/src/components/themed-view.tsx`
- `src/components/ui/collapsible.tsx` → `apps/mobile/src/components/ui/collapsible.tsx`
- `src/components/web-badge.tsx` → `apps/mobile/src/components/web-badge.tsx`
- `src/constants/localization.ts` → `apps/mobile/src/constants/localization.ts`
- `src/constants/questions.ts` → `apps/mobile/src/constants/questions.ts`
- `src/constants/storageKeys.ts` → `apps/mobile/src/constants/storageKeys.ts`
- `src/constants/theme.ts` → `apps/mobile/src/constants/theme.ts`
- `src/constants/ui.ts` → `apps/mobile/src/constants/ui.ts`
- `src/global.css` → `apps/mobile/src/global.css`
- `src/hooks/use-color-scheme.ts` → `apps/mobile/src/hooks/use-color-scheme.ts`
- `src/hooks/use-color-scheme.web.ts` → `apps/mobile/src/hooks/use-color-scheme.web.ts`
- `src/hooks/use-theme.ts` → `apps/mobile/src/hooks/use-theme.ts`
- `src/hooks/useCalmMotion.ts` → `apps/mobile/src/hooks/useCalmMotion.ts`
- `src/services/storageService.ts` → `apps/mobile/src/services/storageService.ts`
- `tsconfig.json` → `apps/mobile/tsconfig.json`
- `scripts/reset-project.js` → `apps/mobile/scripts/reset-project.js`
- Ignored `expo-env.d.ts` moved to `apps/mobile/expo-env.d.ts` (Expo regenerates it).

## Modified after moving

- `apps/mobile/src/app/assessment.tsx`: use shared answer validation.
- `apps/mobile/src/app/results.tsx`: use shared validation, total, classification, interpretation and safety.
- `apps/mobile/src/app/assessment-detail.tsx`: use shared individual answer validation/scoring.
- `apps/mobile/src/constants/questions.ts` and `localization.ts`: compatibility re-exports from epds-core.
- Root `package.json`, `package-lock.json`, `.gitignore`, `README.md`.
- `scripts/verify-screening.cjs`: relocated storage path and frozen pre-extraction scoring fixture.

## Created

- `apps/web/index.html`
- `apps/web/package.json`
- `apps/web/playwright.config.ts`
- `apps/web/public/_headers`
- `apps/web/public/_redirects`
- `apps/web/public/images/maa-care-icon.png`
- `apps/web/public/images/maa-care-mark.png`
- `apps/web/src/App.tsx`
- `apps/web/src/components/Content.tsx`
- `apps/web/src/context/AssessmentContext.tsx`
- `apps/web/src/main.tsx`
- `apps/web/src/pages/About.tsx`
- `apps/web/src/pages/Assessment.tsx`
- `apps/web/src/pages/Guide.tsx`
- `apps/web/src/pages/Home.tsx`
- `apps/web/src/pages/Results.tsx`
- `apps/web/src/styles/global.css`
- `apps/web/tests/website.spec.ts`
- `apps/web/tsconfig.json`
- `packages/epds-core/package.json`
- `packages/epds-core/src/index.ts`
- `packages/epds-core/src/localization.ts`
- `packages/epds-core/src/questions.ts`
- `packages/epds-core/src/safety.ts`
- `packages/epds-core/src/scoring.ts`
- `packages/epds-core/src/types.ts`
- `packages/epds-core/tests/core.cjs`
- `packages/epds-core/tests/original-questions.txt`
- `packages/epds-core/tests/original-results.txt`
- `packages/epds-core/tsconfig.json`
- `scripts/verify-migration.cjs`
- `scripts/verify-mobile-navigation.cjs`
- `scripts/serve-mobile-review.py`
- `docs/migration-baseline.md`
- `docs/website-migration.md`
- `docs/static-hosting.md`
- `docs/migration-files.md`

## Deleted

None beyond removal of old paths by the moves above. Existing unused template files and `src/assets/logo.png` were retained under the mobile workspace. No production image was moved into src/assets.

## Preserved documentation

`docs/ui-redesign.md` was already untracked user work and remains unchanged. `docs/branding.md`, AGENTS.md, CLAUDE.md and LICENSE remain unchanged. Generated review files, audits, bundles and the local snapshot are ignored under output/.
