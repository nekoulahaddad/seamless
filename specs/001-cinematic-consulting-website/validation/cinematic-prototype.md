# Cinematic prototype review evidence

Measured on 2026-11-27 against the isolated Vite static build. The first chapter received prior visual approval. The complete prototype awaits final visual approval before integration.

## Results

| Check | Result |
| --- | --- |
| Strict TypeScript and static build | Passed |
| Full headless Chromium journey, desktop and 390 px touch emulation | Passed. Verified hero continuity, capsule scan, all six text-only service branches, path and stage reversal, menu, reload, resizing, and section/anchor order. |
| Firefox and WebKit smoke checks | Passed. Verified section order, stage tracking, keyboard market selection, contact reveal and clipboard denial fallback, and scroll reset. Chromium also passed the same smoke checks. |
| Accessibility and progressive enhancement | Zero axe violations in the tested Chromium desktop full-motion and reduced-motion states. Verified live system motion preference changes, keyboard operation of market and email controls, and script-free content and country details. Physical device and assistive technology checks remain open. |
| Protected preview contact | Static build contains no plaintext fixture address. Reveal uses the demonstration address, and copy failure provides selectable text. Native email-app handoff, real clipboard permissions, production alias and mandatory disclosures remain release checks. |
| Visual evidence | 22 desktop and phone screenshots and two overview sheets in the review bundle. |

## Local performance measurements

Measured against local HTTP in fresh Playwright Chromium contexts. Desktop ran at 1440 × 900 without CPU throttling. Phone emulation ran at 390 × 844 with 4× CPU throttling. The frame sample collected 160 requestAnimationFrame intervals per profile across eight scenes. Native Playwright input exercised market selection and consultation navigation and reveal.

| Metric | Desktop | Phone emulation |
| --- | ---: | ---: |
| p95 sampled frame interval | 16.7 ms | 16.8 ms |
| Initial LCP | 132 ms | 404 ms |
| CLS over the journey | 0.049 | 0.000 |
| Slowest observed Event Timing interaction, four observed per profile | 32 ms | 48 ms |

The total gzip JavaScript was **52.3 KiB**, down from about 169 KiB, with **1.8 KiB** for the entry and **1.1 KiB** for the isolated SVG capsule renderer. Both the 30 KiB entry and 100 KiB total limits are met in the local build. The Hero stills are 83 KiB for desktop and 54 KiB for phone. ScrollTrigger and GSAP remain in the motion chunk. The capsule uses the existing lift, rotation and scan curve with an SVG projection and gradients. Three.js and WebGL are absent from the prototype build.

These localhost samples do not establish representative-device or network performance, production p75 INP or other field Core Web Vitals. The release protocol still requires device and screen-reader validation, repeated cold and warm measurements, native contact checks and field data when available. The production release tasks and deployment controls remain open.
