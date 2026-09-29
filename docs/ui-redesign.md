# Maa Care UI redesign review

## Scope and preserved behavior

This is an incremental redesign of the existing application, not a rebuild. The project was inspected before implementation, including all routes, active/shared components, legacy template components, tokens, question/localization constants, results calculation, storage service, assets, Expo/EAS config, and dependencies.

- `src/constants/questions.ts`, `localization.ts`, `storageKeys.ts`, and `src/services/storageService.ts` are unchanged.
- All ten questions, Tamil wording, options, order, scoring directions, total calculation, risk thresholds (0–9 / 10–12 / 13–30), independent question-ten safety test, result persistence, and previous/next validation are preserved.
- The `EPDS_HISTORY` storage key and record shape remain unchanged. Older stored records still load; missing answers still receive the existing fallback in Detail.
- Existing native deletion confirmation/cancellation handlers are unchanged.
- Existing medical notices, safety guidance, attribution, and YouTube URL/error handling remain.
- No dependencies, native package identifiers, EAS profiles, or production image paths changed. No EAS build was started.
- Required Expo v56 documentation was read. The installed project is SDK57; its working dependency versions were retained.

## Routes

Active navigation uses `/results` and `/assessment-detail`. `/result` and `/assessmentDetail` are compatibility re-exports; both remain and were exercised in browser verification. All original routes remain.

Home now exposes Settings and About in the header. Results additionally links directly to answer details using the existing record format. Settings was previously a placeholder; it now shows language, storage, and device-accessibility information and links to History/About. No nonfunctional switches were added.

## Visual changes

- Home: brand header, book/settings controls, original-logo abstract composition, concise chips, visible primary/history actions, calm notice, attribution.
- Guide: three accordions with only one expanded at a time; how-to-answer is initially open. Scoring explanation avoids answer-to-score mechanics. Safety text remains available in a distinct warm panel. The footer CTA occupies its own safe-area layout, not an overlay.
- Assessment: percentage and smooth progress indicator, readable question surface, large radio-style answers, 160 ms selection feedback, previous/next controls unchanged.
- Results: prominent score with subdued lavender summary, semantic risk badge, immediately visible independent safety panel, interpretation/next steps, metadata, answer details, resources, and navigation.
- History: compact timeline-style rows, wrapped score/status, visible safety indicator, small labelled trash actions, and a purposeful empty state.
- Detail: compact summary and safety notice, expandable question previews with full original wording/answer/score on expansion.
- About: open sections and functional icons instead of repeated cards; separate screening notice and external-resource treatment.
- Inner headers: consistent title styling and no header shadow. No floating grey gear exists in active application code; developer/emulator overlays were not modified.

Home uses a ScrollView as an accessibility fallback. At the four tested default-text browser sizes, both main actions are visible without scrolling. Smaller displays or increased text size may scroll so content is never intentionally clipped.

## Tokens and reusable components

`src/constants/ui.ts` centralizes semantic colors, typography, spacing, radii, and motion durations. Pink is reserved for actions; reading uses deep plum, surfaces use soft blush/white, secondary branding uses lavender. Success, attention, and safety colors have matching backgrounds/borders. Active screens do not contain scattered hexadecimal colors.

Typography: title 26/38, section 20/30, question 22/35, body 16/27, button 17/26, caption 14/23. Compact metadata and reference copy retain smaller styles. Main buttons remain at least 56 logical pixels tall; icon actions at least 48. System text scaling remains enabled.

New components:

- `AppIcon`: existing `expo-symbols` library; decorative symbols hidden from accessibility.
- `AccordionCard`: controlled expansion, explicit accessibility state, reduced-motion-aware content fade.
- `AnswerOption`: accessible radio state and animated selection surface.
- `ProgressIndicator`: progress semantics and reduced-motion-aware animation.
- `StatusBadge`: shared risk label and restrained semantic colors.
- `SectionHeader`: icon/heading hierarchy.
- `HeroArtwork`: local brand fallback with a ready-to-wire transparent image slot.
- `useCalmMotion`: starts with motion disabled, then follows the device preference and changes.

## File inventory

Created:

- `src/components/AccordionCard.tsx`
- `src/components/AnswerOption.tsx`
- `src/components/AppIcon.tsx`
- `src/components/HeroArtwork.tsx`
- `src/components/ProgressIndicator.tsx`
- `src/components/SectionHeader.tsx`
- `src/components/StatusBadge.tsx`
- `src/hooks/useCalmMotion.ts`
- `scripts/verify-screening.cjs`
- `docs/ui-redesign.md`

Modified:

- `src/constants/ui.ts`
- `src/app/_layout.tsx`
- `src/app/index.tsx`
- `src/app/assessment-info.tsx`
- `src/app/assessment.tsx`
- `src/app/results.tsx`
- `src/app/history.tsx`
- `src/app/assessment-detail.tsx`
- `src/app/about.tsx`
- `src/app/settings.tsx`
- `src/components/AppHeader.tsx`
- `src/components/AssessmentSummary.tsx`
- `src/components/YouTubeGuidanceCard.tsx`

Deleted: none. Existing working and legacy components/routes/assets were retained.

Review screenshots are under `output/ui-review/` (ignored generated output).

## Verification

- `npx tsc --noEmit`: passed.
- `npx expo-doctor`: 21/21 checks passed with registry access; the initial restricted-network attempt could not resolve the registry.
- Android, iOS, and web Expo exports: passed, including Hermes bundles and bundled Material Symbols font. Export is not equivalent to an Android Gradle/AAPT release build.
- `node scripts/verify-screening.cjs`: passed all 31 possible totals/risk classifications, all 40 individual answer contributions, low-total independent safety handling, legacy-record loading, duplicate prevention, deletion, and history clearing. Storage tests use an in-memory AsyncStorage substitute, not user data.
- Direct pre/post source comparisons: questions, localization, storage keys/service, scoring/risk/safety expressions, assessment next/validation handler, and deletion confirmation handler remained unchanged.
- Browser interaction: Home → Guide → all ten questions → Result → Detail → History → History Detail; previous-answer persistence and unanswered validation; Result → New Assessment/History; Home → Settings/About; aliases; empty state; offline client navigation all passed.
- Browser risk rendering: totals 0, 9, 10, 12, 13, 30 passed; score 1 with a safety answer displays BOTH low-risk status and the prominent safety panel.
- Browser sizes 320×568, 360×740, 390×844, 430×932: no horizontal page overflow, primary and history actions visible on Home. Screenshots visually inspected for Home, Guide, Results, History, About, Assessment, Detail, and empty state.
- Native deletion confirmation logic was preserved and storage behavior tested. The emulator eventually loaded successfully using IPv4 loopback and ADB forwarding. Single-delete and clear-history dialogs were opened and cancelled successfully; all existing device records were preserved. Actual delete/clear persistence was verified through the storage regression tests.

## Remaining limitations and warnings

- The static web export emits React #418 hydration warnings on certain direct query-parameter links (results/detail) and responsive initial rendering. Client navigation and assessment functionality passed. If static web hosting is a release target, resolve its server/client initial-render differences separately; do not interpret the Android export as a web hydration check.
- Native font scaling, TalkBack, gesture/navigation safe areas, actual confirmed deletion on disposable data, and external YouTube launch still require device review. Native Home, History, Guide, and confirmation/cancellation were inspected on the emulator. No app data was deleted during emulator attempts.
- Expo Go initially warned that custom splash options are unsupported. `_layout.tsx` now skips those options only in Expo Go, preserving the fade in app builds.
- Local iOS simulator tooling reported `simctl` unavailable; the iOS bundle export passed, but no iOS simulator run was performed.
- Metro emitted a nonfunctional NO_COLOR/FORCE_COLOR environment warning during exports.
- No release AAPT build was performed. Production assets stayed under `assets/images/`; no new image was added to `src/assets/`.

## Home illustration still required

The built-in imagegen tool was attempted using the imagegen skill, but the service connection failed. No image was generated or downloaded, and no API/CLI fallback was used. The current Home composition intentionally uses the existing Maa Care mark and soft abstract shapes; it is not the final mother-and-newborn artwork.

Recommended final asset:

- Filename: `assets/images/maa-care-home-hero.png`
- Format: PNG, 8-bit RGBA with genuine alpha, sRGB.
- Dimensions: **1536 × 1024 pixels** (3:2).
- Composition: centered, small safe margins, readable at about 170 logical pixels tall (110 on compact screens). Keep the mother/baby focal group within the central 80%; no baked-in text or background rectangle.
- Integration: set `heroSource` in `src/components/HeroArtwork.tsx` to `require("../../assets/images/maa-care-home-hero.png")`. The component already uses `contain` and flexible width. Keep the new asset in `assets/images/`.

Generation prompt used:

> Original Maa Care Protective Embrace illustration for a Tamil maternal mental-health screening app. Premium modern vector-style artwork: mature, elegant, soft rounded shapes, clean edges, minimal facial details. A South Asian/Sri Lankan-looking mother with dark hair and warm natural brown skin sits calmly holding her swaddled newborn; her arms/body form a protective curve. Culturally neutral comfortable lavender/plum clothing and cream swaddle. Calm connection and support; no sadness, distress, diagnosis, or celebration. Muted pink, blush, lavender, plum, cream, and warm natural skin tones. Subtle layered organic blush/lavender background shape and at most two minimal leaves. Spacious centered 3:2 composition, recognizable at 170 pixels high. Genuine transparent background outside the shapes. No text, logos, or watermark.

No other illustration assets are required: History uses a consistent functional icon composition, and assessment questions deliberately have no illustration.

## Manual review before EAS

1. Home at normal and large system text; Settings/About navigation; accept/replace the temporary brand composition.
2. Guide: all three accordions, readable safety text, reachable bottom CTA.
3. Assessment: selection animation, progress, previous/edit, last-question submit, unanswered validation, reduced-motion setting.
4. Results at low/moderate/high totals; especially low total plus a nonzero safety answer. Verify safety guidance remains immediately below the score.
5. Results → answers → history; retained older records; each detail accordion.
6. Delete one disposable test assessment, cancel another deletion, and cancel the clear-history dialog before intentionally testing clear on disposable data.
7. YouTube launch and failure message on a device with/without network; offline assessment/history.
8. TalkBack, large fonts, small Android display, bottom safe areas, and Android back navigation.

Do not create the next EAS build until this review is complete. No dependency upgrades or audit fixes are needed based on the passing Doctor check.
