# Static regional scene, contact and mobile About validation

Verified on 2026-11-27 against the isolated prototype. Production integration still requires final visual approval.

## Regional Connectivity

The page renders one lazy responsive picture and the real HTML heading, description and legend. There are no map controls, focus targets, SVG elements or canvas in the region section. Chromium, Firefox and WebKit decoded the photo. Chromium verified 360, 390, 768, 1024, 1440 and 1920 px layout widths, the responsive asset aspect ratios, and forward and reverse path progress with the same photo in place. The top and bottom pixels of all variants match the `#061623` background within three 8-bit levels per color channel.

| Variant | Pixels | WebP size |
| --- | --- | ---: |
| Compact | 1,280 × 1,000 | 130 KiB |
| Desktop | 1,920 × 930 | 157 KiB |
| Wide | 3,840 × 1,860 | 410 KiB |

The offline compositor projects Natural Earth shapes and markers with NASA Blue Marble terrain and Black Marble city lights. Each target and hub coordinate was verified within its corresponding country outline. Country labels and conceptual gold connections are baked into the artwork.

## Contact

The unavailable controls in the previous preview were disabled because no alias was configured. The new preview has no permanent availability status. Decorative art ignores pointer input, while the anchor and button accept pointer input throughout the icon and label.

The desktop and touch-emulated mobile tests supplied a reserved test fixture. Playwright captured the emitted `mailto:` destination before an OS handoff and read the actual Chromium clipboard via `navigator.clipboard.readText()`. Both matched the fixture exactly. The tests verified clipboard permission denial feedback and confirmed success text cleared after its two-second display. Native mail-client startup and the official recipient remain unverified. The preview contains no fixture alias.

## Mobile About

At 390 px the old cascade computed the sticky About shot as a two-row grid. It narrowed the image wrapper and produced about 176 px of space between the copy and artwork at the sampled position. The mobile-only override uses a non-growing flex column and the 820:630 source ratio.

| Viewport | Image width | Left edge | Gap after copy |
| --- | ---: | ---: | ---: |
| 360 px | 360 px | 0 px | 12 px |
| 390 px | 390 px | 0 px | 12 px |
| 430 px | 430 px | 0 px | 12 px |

Each case preserved horizontal text padding, the left path anchor and active scan, with zero horizontal overflow. The desktop declarations remain in place.

## Build and outstanding items

Prototype TypeScript, Vite build, full Chromium journey with axe, responsive checks and browser smoke checks passed. Total JavaScript is 52.2 KiB gzip. Local p95 frame intervals were 16.8 ms on desktop and 16.8 ms on phone emulation at 4× CPU throttling. These local samples do not establish production or physical-device performance.

The approved company email and legal PDFs remain publication blockers. Native OS email behavior and physical-device accessibility and performance remain to be tested before release.
