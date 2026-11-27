# Implementation Plan: Seamless Cinematic Consulting Website

**Branch**: `main` (existing Git branch) | **Feature ID**: `001-cinematic-consulting-website` | **Date**: 2026-11-26 | **Spec**: [spec.md](spec.md)

**Input**: Corrected [specification](spec.md) at `9ffb668dc1570444dbddd7d01883b36fbeef54c3` and original design at `5a4358e3839c66c197944137d362dae965225655`. The owner invoked `$speckit-plan` to advance the corrected scope and later referred to both artifacts as approved. [Constitution v2.0.0](../../.specify/memory/constitution.md) and the design synchronization are in `2da1d989fe3b7739aeda26e506f380f17167c598`.

**Status**: Owner-approved for implementation on 2026-11-27 at baseline a6580e47fca4972d107c442e245f59ef5b8d87bf. The updated hero uses the owner-supplied vial and dome reference. The approved architecture and release gates apply.

## Summary

Ship a static English corporate site with a continuous “From Molecule to Market” narrative,
static regional discovery, and protected email contact. Prebuild semantic HTML for the homepage
and two legal pages. Enhance it with independent TypeScript features for navigation,
email controls, and programmatic motion. The public deployment consists of static files.

## Technical Context

| Area | Decision |
| --- | --- |
| Language | HTML5, CSS, strict TypeScript. Target modern evergreen browsers. Use ES modules and feature detection for optional capabilities. |
| Build | npm, current supported Node LTS compatible with the pinned Vite release, lockfile, and Vite multi-page build. Generate static HTML and validate content at build time. Pin and document exact package and Node versions when initializing the build. |
| Dependencies | TypeScript and Vite for tooling, Zod for external content validation at build time, GSAP and ScrollTrigger only in the motion chunk for scroll-linked pinning and timelines. CSS and SVG for the rest. |
| Storage | Source-controlled content and assets. Contact has transient page state only. No website storage for inquiries or contact feedback state. |
| Testing | Automated build checks and Vitest for behaviour that can be tested without a browser. Playwright and axe for browser checks. Manual device, screen reader, motion, mail app, and visual checks. Lighthouse and DevTools traces for performance. |
| Platform | HTTPS static host. Chromium, Firefox and WebKit browser checks. Physical phone and tablet checks for touch, motion and native email handoff. |
| Scope | Homepage and Privacy Policy and Terms pages. Six services, five target countries, five approach stages, and two regional network locations. Optional verified material ships only when approved. |
| Constraints | No backend, functions, database, contact form, account system, CMS, live map service, video or prerecorded image sequences. No default analytics or edge challenge. |
| Performance | Enforce the lab budgets below and preserve the production p75 Core Web Vitals targets in NFR-004 and SC-006. |

## Constitution Check

| Gate | Before research | After design |
| --- | --- | --- |
| I and XII. Traceability and approval | Pass for planning. The owner initiated planning from the corrected spec. | The owner explicitly approved the amendment and revised spec, plan and tasks before implementation. Release evidence and release approval remain required. |
| II and III. Editorial design and animation architecture | Pass. The approved creative direction requires programmatic enhancement. | Design defines scene boundaries, inputs, variants, assets, cleanup and fallback. Final approved visuals and device evidence are release gates. |
| IV and V. Performance and responsive design | Pass. Static delivery supports device-specific enhancement. | Budgets and the desktop, tablet and phone validation matrix are defined. |
| VI and XI. Accessibility and progressive enhancement | Pass. Static HTML is the starting point. | Contact discovery, instructions and any mandatory contact disclosure are script-independent. Interactive address reconstruction requires scripts per FR-014. Motion scripts are separate and optional. |
| VII. Maintainability | Pass. No app runtime framework is needed for current scope. | Feature composition, strict typed boundaries, immutable data, separate CSS, and the 150-line file and 30-line function limits apply. The design has no React components or shared application state. |
| VIII. Credibility | Pass. Claims require evidence and permission. | Build validation separates publication metadata from public output. Unsupported optional content and its links are omitted. |
| IX and X. Security, privacy and quality | Pass for protected static contact. | Verify mailto, clipboard feedback and plaintext exposure against the security and accessibility contracts. Contact sends no site requests or telemetry. Verify approved privacy practices and applicable UK disclosures before release. |

The v2.0.0 amendment aligns the constitution with the static design. The recorded implementation approval applies to local development. Release evidence remains required.

## Project Structure

### Documentation (this feature)

```text
specs/001-cinematic-consulting-website/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── contracts/
│   ├── public-pages.md
│   └── contact-and-motion.md
└── quickstart.md
```

### Source Code (repository root)

```text
src/pages/{home,privacy,terms}/
src/features/{navigation,hero,expertise,approach,markets,credibility,contact}/
src/shared/                  # Reused rendering, public types and styles
content/                     # Approved entries, scene briefs, private evidence references
assets/                      # Approved source visual variants
build/                       # Content validation and static document assembly
tests/{unit,e2e}/
dist/                        # Generated public artifact only
```

Within a feature, organize styles, view, and interaction modules locally as needed. Pages
compose features. A build-time page assembly step generates multi-page HTML entry points and
Vite bundles explicit feature entry points. Content is escaped at rendering boundaries.
Build tooling, tests, original asset files, and editorial evidence are outside public output.

## Design sequence and traceability

| Slice | Specification | Design and validation |
| --- | --- | --- |
| Site shell, editorial content, legal, discoverability | FR-001–005, 008, 010–012, 016–018, 021–023, 026 | [Public pages contract](contracts/public-pages.md), [content model](data-model.md), SC-001, SC-002, SC-007, SC-010 |
| Motion and market discovery | FR-003–004, 006–009, 020, 024, NFR-001–004 | [Motion contract](contracts/contact-and-motion.md), SC-003, SC-004, SC-006, SC-008 |
| Protected email and privacy | FR-013–015, 019, 025–026, NFR-006, 009–010 | [Contact contract](contracts/contact-and-motion.md), SC-005, SC-009, SC-011 |

1. Establish content validation, approved static page rendering, asset manifests, and source audits.
2. Add navigation, approved market profiles, and the protected contact surface independently of motion.
3. Add scene orchestration for Hero, Expertise, Our Approach and the closing scene. Integrate the static Regional Connectivity artwork. Add the restrained Why Work With Us reveal. Keep text in
   normal DOM order. Pin only visual compositions. Test the whole homepage order with scripts on and off.
4. Measure and iterate on final visuals, device modes and fallbacks. Apply the
   [quickstart validation guide](quickstart.md) to the built and staged site.

## Proposed release budgets

Measure compressed transfer on a cold cache. Pin the audit tooling and record device, browser,
network and CPU configuration with the result.

| Metric | Initial gate |
| --- | --- |
| Production Core Web Vitals | p75 LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 by mobile and desktop when field data is sufficient. |
| Lab starting route | Median of 3 cold runs on recorded mobile and desktop profiles. LCP ≤ 2.5 s, CLS ≤ 0.1, mobile TBT ≤ 150 ms. Lab TBT is a diagnostic and does not establish INP. |
| Critical transfer | ≤ 500 KiB phone / ≤ 800 KiB desktop by LCP. Phone hero asset ≤ 250 KiB and desktop hero ≤ 450 KiB. Start with ≤ 100 KiB compressed fonts total. |
| JavaScript | ≤ 30 KiB compressed initial JS before optional motion. ≤ 100 KiB compressed total first-party JS with motion. |
| Scene transfer | ≤ 450 KiB per mobile scene and ≤ 800 KiB per desktop scene for its selected variants. No eager download of distant scene assets. |
| Render and memory | On representative 60 Hz devices, aim at 60 fps. Gate a repeatable interaction trace at p95 frame interval ≤ 33 ms, with zero motion-attributed main-thread tasks over 50 ms during steady scroll. After 3 repeat passes and collection on a reproducible Chromium profile, retained JS heap growth ≤ 10 MiB versus settled baseline. Record image/GPU observations separately. |

### Pre-release interaction responsiveness

Use the same approved release candidate on a representative desktop or laptop and a physical
mid-range Android phone with Chromium Event Timing. Record hardware, OS, browser, viewport,
refresh rate, network, CPU settings, cache state and build revision. Check Safari/iOS and
other supported engines separately for functionality and capture trace timing where supported.

Run five cold and five warm journeys per device. Clear the cache for each cold run and reuse
warmed static assets for warm runs. In each journey, use native taps, clicks and keys to open
navigation, follow an anchor, reach Regional Connectivity and activate Copy Email Address. Include keyboard activation where supported and follow the consultation anchor while motion assets are being initialized.
Capture input-to-next-paint from Event Timing or the DevTools interaction trace, grouping events
by interaction ID and using the longest duration for the interaction. Record a local journey
INP using the browser's DevTools live metric or equivalent local-only collection. Measure the
site response to clipboard activation and separately verify async copy feedback and external
email app handoff. External app startup and scroll-only frames are not part of lab INP.

For each device and cache state, the nearest-rank p75 across the five valid repetitions MUST
be ≤ 200 ms for each action and for local journey INP. Retain the samples and trace, identify
missing measurements, and rerun invalid samples with reasons recorded. Hold the gate if the
required measurements cannot be obtained or exceed budget. Also retain lab LCP and CLS, and
Lighthouse TBT as a separate diagnostic. Run production mobile and desktop p75 Core Web
Vitals separately when sufficient field data exists. Local samples do not establish field INP.
See [measuring lab interactions](https://web.dev/articles/manually-diagnose-slow-interactions-in-the-lab)
and [field INP](https://web.dev/articles/inp). No visitor telemetry is needed for lab testing.

Release decisions requiring owner input include the official email alias, legal entity, UK disclosure applicability, fields and placement,
canonical origin, approved legal and brand content, final visuals and rights, and publication
authorization. These are release inputs. Use fictitious fixtures only in validation builds.
Default to disabled analytics. Confirm any analytics and hosting decisions before enabling them.

## Complexity Tracking

No constitution exceptions. GSAP/ScrollTrigger is bounded to the motion enhancement and must fit
the JavaScript budget. The build should accept the simpler layered composition whenever a visual
prototype meets the scene goal. Revisit dependency selection only if measured evidence warrants it.

## Prototype redesign decision

Use the existing standalone Vite build. Keep one shared reversible SVG path, with a horizontal series of measured stage anchors on desktop and a vertical series on mobile. Use local, build-time projected Natural Earth vectors and native controls for map selection. Routes are conceptual overlays. Composite a responsive photographic closing still with live HTML controls, and blend the shared path into a gold finish. Read the approved alias and PDF filenames from build configuration. Keep this work separate from the production homepage and its legal publication process.

## Static Regional Connectivity and mobile corrections

The approved Regional Connectivity implementation serves responsive, offline-composited WebPs from a 3,840 px master. Natural Earth boundaries and places share an orthographic projection with the NASA images, and the baked navy feather matches the surrounding section background. The global SVG journey stays independent of the image. Remove the prototype map runtime. Use the existing single email alias build input for both native contact actions. The About media query sets the sticky shot to a full-width non-growing column flow and preserves the source aspect ratio.
