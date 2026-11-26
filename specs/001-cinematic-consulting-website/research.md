# Phase 0 Research: Seamless

The corrected specification is the baseline. The design decisions below resolve implementation
choices for planning. Company facts, content rights, legal decisions and the final email alias
remain release inputs and require owner approval.

## Static build and SEO

**Decision**: Generate the homepage, Privacy Policy and Terms as multi-page HTML, then bundle
standalone CSS and strict TypeScript with Vite. Validate externally supplied content with Zod at
build time. Generate canonical links, metadata, sitemap and robots from a single route manifest.

**Rationale**: Static HTML supports discovery before scripts. Vite supplies a modest build and
preview path for multiple documents. Independent feature entry points avoid loading motion on
legal pages. Build-time validation keeps evidence and unpublished data out of published output.
[Vite production build](https://vite.dev/guide/build.html) · [Google Search JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

**Alternatives considered**: Next.js static export is viable but adds framework and routing
conventions with little benefit for three pages. Hand-maintained standalone HTML is viable but
duplicates service, market, metadata and navigation values. A hosted CMS, server rendering and a
client-rendered shell conflict with the approved scope.
[Next.js static export](https://nextjs.org/docs/app/guides/static-exports)

## Motion and geographic discovery

**Decision**: Keep native scrolling and a continuous static reading order. Use CSS transforms
and opacity for visual layers and isolate GSAP/ScrollTrigger in the optional motion chunk for
reversible timelines and pins. Use an original or licensed SVG map and ordinary HTML country
links, with script-enabled in-place highlighting.

**Rationale**: One timeline per active scene keeps progression reversible. A lifecycle tied to
viewport, input, preferences and section visibility enables mode changes and cleanup. HTML
country profiles stay searchable and usable if the map or motion fails.
[ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) · [Responsive GSAP cleanup](https://www.gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/) · [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

**Alternatives considered**: Native CSS and sticky positioning are sufficient for simple effects,
but a pin and timeline library avoids a custom scroll engine for multi-scene coordination.
Canvas, WebGL and Three.js add complexity and are deferred unless a specific approved scene
cannot be achieved within budget with layered assets. Embedded maps and video were excluded.

## Contact, clipboard and edge protection

**Decision**: Obfuscate the email recipient at build time, reconstruct it in the browser only on
activation, and use one source for mailto, reveal and copy. Use clipboard writing on HTTPS and
provide a selectable fallback with accessible status. Start with static edge caching only.
Recommend an owner-approved dedicated public alias and mailbox-level spam filtering.

**Rationale**: No contact network request or website inquiry storage is required. Deployed
responses and artifacts can be scanned for the full plaintext address before interaction.
Obfuscation reduces basic scraping and cannot keep the address secret from a bot that runs the
client. Email drafting and sending are controlled by the visitor's email app. Required legal
disclosure takes precedence.
[RFC 6068](https://www.rfc-editor.org/rfc/rfc6068) · [W3C Clipboard API](https://www.w3.org/TR/clipboard-apis/) · [ARIA status](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22.html)

**Alternatives considered**: Plaintext mailto exposes the recipient in source. CDN HTML rewriting
alone cannot enforce all artifact and interaction requirements. An optional edge rule needs a
specific measured problem and tests for verified crawler access, accessible use, and
performance without tracking, fingerprinting or challenges.
[Cloudflare email obfuscation behaviour](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/) · [Google crawler verification](https://developers.google.com/crawling/docs/crawlers-fetchers/verify-google-requests)

## Media, accessibility and verification

**Decision**: Reserve explicit visual dimensions. Fetch a responsive hero poster early and
load nearby scene assets on demand. Apply local device and motion preferences, isolate decorative
layers from assistive technology, and use a static alternative for each scene. Use Playwright and
axe alongside manual screen reader and physical device checks. Record lab performance and
production field data separately.

**Rationale**: Offscreen assets and cinematic JavaScript should stay off the critical path.
Manual testing covers focus, actual mail app handoff and motion quality that automation alone
cannot establish. Lighthouse TBT is a lab responsiveness diagnostic. Field INP and other production
75th-percentile metrics require sufficient field data.
[Optimize LCP](https://web.dev/articles/optimize-lcp) · [Core Web Vitals](https://web.dev/articles/vitals) · [Playwright accessibility checks](https://playwright.dev/docs/accessibility-testing) · [CrUX methodology](https://developer.chrome.com/docs/crux/methodology)

**Alternatives considered**: Loading all visuals upfront costs transfer and decoded memory.
Emulation only misses physical-device and assistive-technology behavior. Keep field telemetry
off unless explicitly approved and use public field data where available.
