# SEO, browser branding and sharing audit

Audited on 27 November 2026 against the three-route site and the standalone cinematic prototype. The prototype and the main site remain separate. Both development previews remain non-indexable.

## Findings and results

| Area | Before | Implemented or verified |
| --- | --- | --- |
| Search metadata | The homepage title used only the company name. Privacy and Terms shared the same description as the homepage. | Search-oriented homepage title and three distinct descriptions. Each route has one title, description, canonical and robots directive in its initial HTML. |
| Structure and crawlability | Static HTML already contained the essential text, one H1 on each route, a logical heading order and working navigation. | Retained static generation and all approved body copy, theatrical visuals and anchors. The audit checked 20 homepage links and five on each legal route, with zero broken links or targets. |
| Production discovery | Release was already configured to use an approved HTTPS origin. Local previews had a non-indexable robots policy. | The configured origin produces matching absolute canonical URLs, card URLs and sitemap locations on release. The canonical production origin remains unconfirmed. |
| Browser branding | One small SVG mark was linked. | Generated a gold-on-navy monogram for tabs and shortcuts. Added multi-resolution ICO, 16/32/48 PNGs, Apple Touch 180, and Android 192/512 icons. A browser-mode manifest introduces no service worker or offline installation behaviour. |
| Social sharing | Basic Open Graph tags pointed at a hero still. X cards, dimensions, site name, locale and alt text were missing. | The initial HTML now contains complete Open Graph and X metadata, using a branded 1200 × 630 JPEG. |
| Structured data | One organization object on the release homepage. | Release-only Organization, WebSite, WebPage, ContactPoint and six Service entries tied to visible service anchors. Legal pages emit their WebPage metadata and reference the homepage entities. The ContactPoint identifies the public Contact section and keeps the protected email out of JSON-LD. BreadcrumbList is omitted because no actual breadcrumbs are present. |
| Mobile and accessibility | No horizontal overflow or axe violations on the three checked routes at 390 px. | Rechecked all three routes and the cinematic prototype. Automatic checks passed. Native assistive-technology testing remains a release check. |

Static rendering and clear, unique metadata follow [Google Search Central](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). The social image format follows the [Open Graph protocol](https://ogp.me/). The favicon selection includes a larger square PNG for [search favicon eligibility](https://developers.google.com/search/docs/appearance/favicon-in-search). The [organization markup guidance](https://developers.google.com/search/docs/appearance/structured-data/organization) supports placement on the homepage.

## Keyword strategy

The strategy maps search intent to approved content. No search volumes or rankings were inferred.

| Search intent | Recommended treatment |
| --- | --- |
| Pharmaceutical market entry consulting, international pharmaceutical consulting, pharmaceutical market entry in Arab countries | Primary homepage intent. The title emphasizes Pharmaceutical Market Entry Advisory, and the description names pharmaceutical manufacturers and Arab markets. |
| Pharmaceutical market access and pharmaceutical business development | Secondary terms for the existing market access and business-development service. |
| Pharmaceutical regulatory affairs and product registration | Use the approved service wording “Regulatory and Registration Support.” Discuss registration pathways without implying regulatory authority, local representation or guaranteed approval. |
| Pharmaceutical distribution partnerships | Associate with the existing importer and distributor identification service. Keep partnership claims tied to confirmed evidence. |
| Middle East and North Africa pharmaceutical markets | Use where geographic context makes it relevant. The five target markets are the approved scope. Dubai and Saudi Arabia are strategic network locations. |
| Pharmaceutical market entry in Syria, Iraq, Yemen, Libya or Tunisia | Potential country-specific informational intent. The current site lists the approved countries. Dedicated pages require original, verified country content and separate approval. |

The homepage description is the only new corporate positioning copy. The existing service text and accessibility alternatives remain in place.

## Local performance evidence

Across three fresh localhost Chromium runs per profile, the main homepage median LCP was 108 ms on desktop and 352 ms on 390 px phone emulation with 4? CPU throttling. No initial load layout shifts were observed. The application and motion bundle bytes are unchanged by the metadata change. The brand image is consumed by social scrapers and the icon candidates are small, locally hosted files. The current cinematic prototype shipped about 52.7 KiB of compressed JavaScript. One localhost Chromium journey measured the following figures.

| Metric | Desktop | 390 px phone emulation, 4× CPU |
| --- | ---: | ---: |
| Initial LCP estimate | 160 ms | 408 ms |
| Journey CLS | 0.049 | 0.000 |
| Worst observed Event Timing interaction | 40 ms | 56 ms |
| p95 sampled animation frame interval | 16.8 ms | 16.7 ms |

The lab run uses a single machine and local delivery. Event Timing observations cannot establish production INP. Measure p75 LCP, INP and CLS after release using field data when available. [Google Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals)

TypeScript checks, static builds, the output privacy audit, 12 unit tests and 27 browser tests passed. Both preview servers returned every icon, manifest and card asset. The ICO frame sizes and all PNG and JPEG dimensions were verified.

## Release verification

Confirm the public HTTPS origin and approve the generated monogram for publication. The existing release gate also requires approved legal and publication inputs. Set the origin through the private release profile, build the release artifact, and verify the card, favicon and sitemap paths on the domain. Then test actual sharing in LinkedIn, WhatsApp, Telegram, Facebook, X and iMessage, validate the production URLs and markup, and check bookmarks and shortcuts on physical devices. Local verification covers the emitted markup and underlying assets.
