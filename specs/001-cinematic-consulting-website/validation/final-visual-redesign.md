# Standalone cinematic redesign evidence

Verified on 2026-11-27. The standalone preview awaits final approval before integration.

| Verification | Result |
| --- | --- |
| TypeScript and production-mode Vite build | Passed for the prototype and main site. The main site still uses its existing source. |
| Existing automated suite | 8 unit tests and 27 Playwright tests passed. |
| Redesigned prototype | Chromium journey and Chromium, Firefox and WebKit smoke checks passed. Covered vial continuity, capsule scan, Expertise branch order, reversible shared path, Approach stage arrivals, keyboard and touch map selection, contact, and automatic reduced motion. |
| Responsive and visual | Validated 360, 390, 768, 1024, 1440 and 1920 CSS px. Captured 24 full redesigned-section screenshots and 14 journey screenshots. The footer credit follows copyright on desktop and stacks below it on mobile. |
| Accessibility | Zero axe violations in the tested Chromium motion and reduced-motion states. Static content and map target panels remained available with JavaScript disabled. Real-device and assistive-technology checks are pending. |
| Geography | Sourced country outlines and verified the target marker positions within each corresponding boundary. Verified Dubai inside the UAE and Riyadh inside Saudi Arabia. Gold connections are conceptual. |
| Contact and legal | Verified mailto URL generation, clipboard success and denial feedback using a reserved test alias and intercepted platform APIs. The built preview contains no test or sample alias. Missing PDF filenames produce no dead links. |

## Local performance

Fresh localhost Chromium contexts sampled 140 frame intervals per profile across the seven sections. Phone used 4× CPU emulation. Event Timing used four map and contact-navigation interactions per profile.

| Metric | Desktop, 1440 × 900 | Phone emulation, 390 × 844 |
| --- | ---: | ---: |
| p95 frame interval | 16.7 ms | 16.7 ms |
| Initial LCP | 124 ms | 396 ms |
| CLS | 0.049 | 0.000 |
| Slowest sampled interaction | 40 ms | 56 ms |

The complete build has **52.7 KiB gzipped JavaScript** against a 100 KiB budget. The entry is **1.9 KiB** against a 30 KiB budget. These local samples do not establish production p75 or physical-device results.

## Open items

- Obtain the confirmed company alias and the approved Privacy Policy and Terms & Conditions PDFs. Until they are supplied, contact controls are disabled and the footer omits the two links.
- Validate native mail-app handoff, real clipboard permissions, physical-device performance, and assistive technology in the release environment. The local contact test intercepted platform APIs.
- Obtain final approval before integrating the prototype into the main site. Existing production publication and legal disclosure gates still apply.
