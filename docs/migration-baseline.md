# Baseline before workspace migration

Inspected September 29, 2026. Existing package manager: npm 10.9.8, Node 22.23.2. Installed app: Expo ~57.0.25, React 19.2.3, React Native 0.86.3, TypeScript ~6.0.3. Required Expo v56 docs and installed-version reference were read, plus Expo's monorepo guidance. SDK versions are retained; no custom Metro configuration is needed.

## Preserved working tree

Before editing, modified files were src/app/{_layout,about,assessment-detail,assessment-info,assessment,history,index,results,settings}.tsx, src/components/{AppHeader,AssessmentSummary,YouTubeGuidanceCard}.tsx and src/constants/ui.ts. Untracked user work included docs/ui-redesign.md, scripts/verify-screening.cjs, AccordionCard, AnswerOption, AppIcon, HeroArtwork, ProgressIndicator, SectionHeader, StatusBadge and useCalmMotion. These were retained, including the existing design document. A local ignored source/asset snapshot and SHA-256 manifest are in output/migration-baseline.

## Existing behavior

- Routes: /, /about, /assessment-info, /assessment, /results, /result, /history, /assessment-detail, /assessmentDetail, /settings. The two aliases re-export their canonical screens.
- Ten questions, four options each. Original Tamil wording/order frozen in packages/epds-core/tests/original-questions.txt.
- Questions 1, 2, 4 score by option index (0–3); all others score 3 minus option index. The original `reverseScore` name is counterintuitive: true means index scoring. Retained without clinical reinterpretation.
- Integer answers 0–3 required; all ten required at Results. Previous preserves selected answers; final Next replaces the assessment route and prevents duplicate submission.
- Total 0–30; Low Risk 0–9, Moderate Risk 10–12, High Risk 13–30. Existing Tamil labels and interpretations retained.
- Question ten option indices 0, 1, 2 trigger safety independently of score, including totals 1–3 with Low Risk. No total can suppress safety.
- Mobile Results auto-saves with retry, saving/saved refs and navigation disabled while saving. Records: id, createdAt, score, riskLevel, safetyAlert, answers. AsyncStorage key EPDS_HISTORY. Existing records are loaded as-is; missing legacy answers get Detail fallback. Storage deduplicates by id. Native delete/clear actions require confirmation; cancellation does not delete.
- YouTube: https://youtube.com/@maacareapp?si=YayFCeB1kEKiP-lo; existing medical notices and English attribution retained.
- Identity: Maa Care; epds-app; 1.0.0; epdsapp; com.jeyashankarj.epdsapp; EAS 21f0413d-ccf0-4c79-bb12-16cc633c9d80. app.json and eas.json moved byte-for-byte.
- Mobile production assets remain in assets/images relative to its project. Existing unused src/assets/logo.png retained to avoid deleting user files; no production references point there.
- Design tokens and shared native components inspected. No approved hero illustration exists: retain brand-mark fallback, see docs/ui-redesign.md for future hero requirements.

## Baseline checks

- TypeScript: passed.
- Existing verify-screening.cjs: passed all totals, answer contributions, safety and disposable in-memory storage tests.
- Android export: passed (1275 modules, Hermes bundle). This does not run Gradle/AAPT.
- Initial Expo Doctor attempt: registry DNS blocked by sandbox; retried after migration with registry access.

No clinical rule was changed. Clinical validation of thresholds/translation is outside this structural migration; the unusual reverseScore naming is documented rather than silently changed.
