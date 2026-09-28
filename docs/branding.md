# Maa Care app branding

- Launcher label: Maa Care.
- Opaque iOS/legacy Android icon and web favicon: `assets/images/maa-care-icon.png`, a white-backed version of the existing logo.
- Transparent Android adaptive foreground, themed icon alpha mask, and splash mark: `assets/images/maa-care-mark.png`.
- Launcher background: white. Splash and root background: `#FFF5F8`.
- Splash fades out over 250 ms when Expo considers the app ready; no extra timer or loading page.
- Keep the existing slug, Android package, scheme, and EAS project ID to preserve project identity.

## Build verification

Native icon, launcher-name and splash changes require a new binary. For the existing Android preview APK profile:

```sh
npx eas-cli build --platform android --profile preview
```

Install the resulting APK over the existing app, then cold-launch it. Verify the launcher label, round/squircle/themed icons, splash background and transition. Expo Go/development splash appearances can differ from standalone builds.

## Opaque launcher icon prompt

Edit target: existing Maa Care purple mother-and-baby logo. Produce the opaque launcher icon version of this exact image. Preserve the exact logo shapes, profiles, proportions, purple color, position and existing margins. Composite the image on a completely solid pure white (#FFFFFF) square background. ALL formerly transparent pixels, including internal cutouts, must be opaque white. Entire PNG must be fully opaque (alpha 255 everywhere). Flat clean image with no extra text, no outline, no shadows, no gradients, no rounded corner mask. Square 1024x1024 PNG.

## Asset preparation

The original `logo.png` is unchanged. The transparent mark and opaque launcher icon were prepared with the built-in imagegen tool, then copied into this repository. No fallback CLI was used.

Initial prompt:

Use case: background-extraction. Edit target: supplied existing Maa Care purple mother-and-baby logo. Prepare a production Android adaptive icon foreground and native splash logo. Preserve the exact existing logo geometry, mother and baby profiles, Tamil letter form and purple color (#704C98 approximately), without redesigning anything. Output a square 1024x1024 PNG with a genuinely transparent alpha background. Remove ALL white background and white negative-space areas to transparency. Center the complete unchanged purple mark inside the central 56% of the square width, approximately 574px wide and 390px tall, leaving generous transparent margins on all sides for adaptive icon masks. Crisp flat edges, uniform purple, no text, no shadow, no outline, no gradients, no checkerboard baked into the image.

Final cleanup prompt:

Edit this transparent logo asset only to clean it for production: every visible pixel should be the same purple #704C98, with smooth antialiased alpha edges. Remove all stray blue pixels and edge noise. Preserve the exact logo silhouette and mother-and-baby negative-space shapes. Center the mark and scale it down so its bounding box is at most 56% of the square canvas width, with equal transparent margins. Transparent background and transparent internal cutouts; absolutely no black, white, blue, shadows, textures or gradients. Output a square transparent PNG.
