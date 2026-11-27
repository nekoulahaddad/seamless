# Local build and content evidence

**Date:** 2026-11-27  
**Candidate:** local static fixture in this checkout

- TypeScript strict check passed.
- Vitest passed 8 tests. Playwright passed 27 checks across Chromium, Firefox and WebKit.
- Vite emitted the homepage, Privacy Policy and Terms of Use, robots.txt, sitemap.xml,
  styles, scripts and still assets. Site and app functionality are frontend-only.
- Static artifact audit passed with the synthetic alias. Contact reveal and the clipboard
  fallback were verified locally. No contact telemetry or submission service is present.
- Loopback preview returned HTTP 200 for all three pages and HTTP 404 for a missing page
  and asset. This does not establish the public HTTPS or caching contract.
- Desktop and mobile Chromium captures verified the reference-based hero poster,
  centered vial and dome, and no text over the focal object. The lens scene reuses the
  same lighting and colour grade. See the [hero](../../../content/scenes/hero.md)
  and [approach](../../../content/scenes/approach.md) briefs for image prompts and provenance.
- Bundle observation: startup JS 1.79 kB gzip, isolated GSAP motion chunk 47.03 kB gzip.
  Hero stills are 40,268 bytes desktop and 17,188 bytes mobile. These figures are
  build measurements. Physical-device timing and production field data remain pending.
- Fixture output uses noindex, blocks crawling, and uses a non-routable address.
  The release build requires company-approved configuration and does not accept fixtures.
