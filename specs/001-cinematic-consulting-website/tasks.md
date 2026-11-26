---
description: "Implementation tasks for the Seamless Cinematic Consulting Website"
---

# Tasks: Seamless Cinematic Consulting Website

**Input**: [Specification](spec.md), [plan](plan.md), [Constitution v2.0.0](../../.specify/memory/constitution.md), [research](research.md), [data model](data-model.md), [public page contract](contracts/public-pages.md), [contact and motion contract](contracts/contact-and-motion.md), and [quickstart](quickstart.md).

**Approval record**: The owner advanced the corrected specification at `9ffb668dc1570444dbddd7d01883b36fbeef54c3` via `$speckit-plan` and later called the specification and design at `5a4358e3839c66c197944137d362dae965225655` approved. The owner invoked `$speckit-tasks` on 2026-11-26 to authorize task generation against the synchronized `2da1d989fe3b7739aeda26e506f380f17167c598` baseline. The remediation request authorizes document edits and reanalysis only. Separate explicit approval of Constitution v2.0.0 and the remediated baseline, including this implementation checklist, is pending.

**Organization**: One independent story phase per priority-ordered story. Automated tests are included under NFR-008 and Constitution X.

## Format: `[ID] [P?] [Story] Description`

- Every item names repository-relative output files or evidence paths.
- `[P]` indicates disjoint work that can run alongside the tasks listed in its parallel wave once their gates pass.
- Story tests use approved or synthetic fixtures. Write contract tests before implementing their story, observe the intended failure, and then run them against the change.
- Field citations use the canonical entity and field names in [data-model.md](data-model.md).

## Path Conventions

Use the single static project from [plan.md](plan.md). Build utilities live in `build/`, site features in `src/features/`, pages in `src/pages/`, and fixtures and tests in `tests/`. Only approved files under `dist/` are deployable.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the approved static toolchain and repeatable local commands.

- [ ] T001 Initialize the compatible Node LTS and npm lockfile, Vite and TypeScript tooling, build-only Zod, Vitest, Playwright and axe. Install and lock GSAP in `package.json` and `package-lock.json` and use its bundled ScrollTrigger plugin via T025. Add the exact command names in [quickstart.md](quickstart.md) using `package.json`, `package-lock.json` and `.node-version`.
- [ ] T002 [P] Configure strict TypeScript for feature and build-time modules in `tsconfig.json`; document approved dependency boundaries and keep generated, local credential and QA artifacts out of publication with `.gitignore`.
- [ ] T003 [P] Define cross-browser runners, preview startup and synthetic fixture routing in `playwright.config.ts` and `vitest.config.ts`.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Make content, routes, publication rules and static output safe for every story.

- [ ] T004 [P] Validate site identity and required launch configuration in `build/site-profile-schema.ts` using `Site profile.display name`, `Site profile.approved mission and positioning`, `Site profile.logo asset`, `Site profile.canonical origin`, `Site profile.locale`, `Site profile.navigation`, `Site profile.legal page references` and `Site profile.contact configuration reference` from [data-model.md](data-model.md).
- [ ] T005 [P] Define locale and route validation in `build/page-schema.ts` using `Page and locale entry.stable ID`, `Page and locale entry.locale`, `Page and locale entry.direction`, `Page and locale entry.localized path`, `Page and locale entry.title`, `Page and locale entry.description`, `Page and locale entry.social image` and `Page and locale entry.ordered sections` from [data-model.md](data-model.md).
- [ ] T006 [P] Implement evidence validation and publication projection in `build/publication.ts` using `Claim evidence.private reference`, `Claim evidence.claim ID`, `Claim evidence.source`, `Claim evidence.geographic and factual scope`, `Claim evidence.verification date`, `Claim evidence.approval` and `Claim evidence.publication status` from [data-model.md](data-model.md); omit withdrawn data and never serialize private sources.
- [ ] T007 [P] Establish semantic page primitives, escaping and applicable shared styles in `src/shared/render/escape-html.ts`, `src/shared/render/page-shell.ts` and `src/shared/styles/base.css`; keep feature rules in their features.
- [ ] T008 Wire the schema results and route manifest into multi-page HTML assembly and Vite in `build/assemble-pages.ts`, `build/routes.ts` and `vite.config.ts`; emit only static files to `dist/` and prevent fixture output from qualifying as production.
- [ ] T009 Add fixture checks for invalid references, unique routes, missing launch inputs and private fields leaking into static output in `tests/unit/build/publication.test.ts` and `tests/unit/build/routes.test.ts`.

## Phase 3: User Story 1 - Understand the company and find relevant information (Priority: P1)

**Goal**: Show the approved positioning, service and market entry points, and a clear path to Contact in the initial HTML.

**Independent Test**: Disable cinematic motion. Identify the company's purpose, navigate to Expertise and Markets, and locate Book a Consultation without losing current reading position.

### Tests for User Story 1

- [ ] T010 [P] [US1] Write initial-HTML and navigation contract tests for launch routes, no-script essential content, headings, anchor validity and metadata in `tests/e2e/discovery.spec.ts`.

### Implementation for User Story 1

- [ ] T011 [P] [US1] Implement the static full-viewport hero and approved introduction, lab vial poster and both hero CTAs in `src/features/hero/render-hero.ts`, `src/features/hero/render-introduction.ts` and `src/features/hero/hero.css`.
- [ ] T012 [P] [US1] Implement primary navigation, skip link, responsive menu, readable scrolled header, and motion-safe anchor links in `src/features/navigation/render-navigation.ts`, `src/features/navigation/menu.ts` and `src/features/navigation/navigation.css`.
- [ ] T013 [P] [US1] Generate page-specific canonical, Open Graph, applicable verified structured data and crawl directives in `build/render-metadata.ts` and `build/render-discovery-files.ts` (FR-017, SC-010).
- [ ] T014 [US1] Compose the FR-001 homepage shell and static Expertise, Markets and Contact destinations and footer with approved legal and contact links in `src/pages/home/render-home.ts`, `src/pages/home/render-discovery.ts` and `src/shared/render/render-footer.ts`; source public text through the approved site profile and preserve stable section anchors for later enhancements.

## Phase 4: User Story 2 - Contact the company about a consultation (Priority: P1)

**Goal**: Provide a protected email handoff and accessible reveal/copy controls on the static site.

**Independent Test**: Use all three controls with motion unavailable. Verify a correctly addressed native draft, reveal and copy without a handler, the denied-clipboard fallback, and readable instructions with scripts disabled.

### Tests for User Story 2

- [ ] T015 [P] [US2] Write contact contract tests for explicit activation, keyboard and pointer, no-contact network traffic, reveal, denied clipboard, accessible feedback and no-script instructions in `tests/e2e/contact.spec.ts`.
- [ ] T016 [P] [US2] Write build tests with a synthetic alias for plaintext exposure and the exact allowlist, including approved multiple locations, unexpected paths and nodes, count drift, empty and pending decisions in `tests/unit/build/contact-output.test.ts`.

### Implementation for User Story 2

- [ ] T017 [US2] Validate and obfuscate the sole contact build input in `build/protected-contact.ts` using `Protected contact.approved alias`, `Protected contact.internally managed build input`, `Protected contact.applicable mandatory disclosure fields` and `Protected contact.approved static locations` from [data-model.md](data-model.md); keep source configuration out of public artifacts.
- [ ] T018 [P] [US2] Implement the Contact markup, accessible controls, status feedback, selectable fallback, and no-script instructions in `src/features/contact/render-contact.ts` and `src/features/contact/contact.css`; keep the protected recipient out of initial markup.
- [ ] T019 [US2] Implement independent email activation, reconstruction and clipboard handling in `src/features/contact/contact-controls.ts` and `src/features/contact/copy-address.ts`; no tracking, browser storage, or site network call (FR-013–015, FR-025).
- [ ] T020 [US2] Wire Contact, approved Privacy Policy and Terms, and required static UK disclosure placement in `src/pages/home/render-home.ts`, `src/pages/privacy/render-privacy.ts`, `src/pages/terms/render-terms.ts` and `src/features/contact/render-legal-disclosure.ts`; preserve the mandatory disclosure exception and keep the motion dependency out of Contact (FR-026).

## Phase 5: User Story 3 - Follow the molecule-to-market journey (Priority: P1)

**Goal**: Deliver the approved programmatic narrative with normal scrolling and usable static alternatives.

**Independent Test**: Traverse all five stages forward and backward. Check the vial reprise and consultation path, then disable motion or block an asset and verify stage order, access and escape.

### Tests for User Story 3

- [ ] T021 [P] [US3] Write the motion contract tests for forward/reverse stages, truthful progress, section exit, anchor access and static fallback in `tests/e2e/approach-motion.spec.ts`.

### Implementation for User Story 3

- [ ] T022 [P] [US3] Create scene brief and asset validation in `build/scene-schema.ts` using `Scene and visual asset.scene ID`, `Scene and visual asset.section ID`, `Scene and visual asset.goal and order`, `Scene and visual asset.visual design`, `Scene and visual asset.camera and object cue intent`, `Scene and visual asset.start/end compositions`, `Scene and visual asset.visual layers`, `Scene and visual asset.responsive asset variants`, `Scene and visual asset.dimensions`, `Scene and visual asset.rights`, `Scene and visual asset.fallback` and `Scene and visual asset.load priority` from [data-model.md](data-model.md).
- [ ] T023 [US3] Author Hero, Global Market Connections, Expertise, five Approach stages, Our Markets and Final Cinematic Scene briefs in `content/scenes/hero.md`, `content/scenes/global-market-connections.md`, `content/scenes/expertise.md`, `content/scenes/approach.md`, `content/scenes/our-markets.md` and `content/scenes/final-scene.md` using FR-020. Keep fixture and approved final asset states distinct. Record licensed responsive still variants, dimensions, posters, fallbacks and load priorities in `content/scenes/asset-manifest.ts`; optimize and place approved files under `assets/scenes/` as they become available.
- [ ] T024 [P] [US3] Render the five ordered approach stages and recurring vial finale, including static alternatives and Contact anchor, in `src/features/approach/render-approach.ts` and `src/features/approach/render-finale.ts`.
- [ ] T025 [US3] Import GSAP and its bundled ScrollTrigger only through the isolated lazy motion entry, keeping both out of startup, legal and Contact chunks. Implement native-scroll scene progress, entry/exit cleanup, pin scope and reversible timelines in `src/features/approach/load-motion.ts`, `src/features/approach/create-timeline.ts` and `src/features/approach/scene-lifecycle.ts`.
- [ ] T026 [US3] Drive the visual sequence, hero transition, expertise progression, both geographic scenes and vial reprise from explicit feature cues in `src/features/hero/hero-motion.ts`, `src/features/expertise/expertise-motion.ts`, `src/features/approach/approach-motion.ts`, `src/features/approach/finale-motion.ts` and `src/features/markets/market-motion.ts`. Pin visuals only and keep narrative in document order; verify FR-024 media exclusions.

## Phase 6: User Story 4 - Use the site comfortably on mobile or with assistive technology (Priority: P1)

**Goal**: Keep equivalent content and actions across devices, motion modes and assistive technologies.

**Independent Test**: On phone and tablet rotate, change mode and switch reduced motion while navigating. On keyboard and screen reader, find a service and use Contact with cinematic media blocked.

### Tests for User Story 4

- [ ] T027 [P] [US4] Write device-mode, keyboard and axe checks for phone, tablet, reduced motion, focus visibility, responsive overflow and session navigation in `tests/e2e/responsive-accessibility.spec.ts`.

### Implementation for User Story 4

- [ ] T028 [P] [US4] Implement normal vertical phone flow, responsive compositions and accessible focus offsets in `src/features/approach/approach.css`, `src/features/expertise/expertise.css` and `src/features/navigation/focus-offset.css`.
- [ ] T029 [P] [US4] Implement full, vertical and static selection and teardown on preference, viewport, orientation and input changes in `src/features/approach/presentation-mode.ts` and `src/features/approach/motion-preferences.ts`; use vertical on unqualified tablets and preserve current reading section and focus.
- [ ] T030 [US4] Apply the mode to the story timelines, reduced-motion control and selective resource loading in `src/features/approach/activate-motion.ts` and `src/features/approach/scene-assets.ts`; default phones to vertical, require evidence before adding a short phone pin, and keep contact and market content available without motion.

## Phase 7: User Story 5 - Assess services, markets, and credibility (Priority: P2)

**Goal**: Make services, target countries and verified company evidence discoverable without unsupported claims.

**Independent Test**: Select all five countries by pointer, touch and keyboard, then repeat with an unapproved content fixture. Dubai and Saudi Arabia stay distinct from target markets and unpublished sections leave no dead links.

### Tests for User Story 5

- [ ] T031 [P] [US5] Write service, map and publication contract tests for five selectable markets, partner distinctions, withheld claims and omitted section anchors in `tests/e2e/markets-credibility.spec.ts`.

### Implementation for User Story 5

- [ ] T032 [P] [US5] Implement six service records and static panel rendering in `build/service-schema.ts`, `content/services/catalog.ts` and `src/features/expertise/render-expertise.ts` using `Service.ID`, `Service.official name`, `Service.summary`, `Service.benefits`, `Service.visual references`, `Service.relevant market references` and `Service.optional published detail link` from [data-model.md](data-model.md).
- [ ] T033 [P] [US5] Validate geographic and network records in `build/geography-schema.ts`, `content/markets/catalog.ts` and `content/network/locations.ts` using `Market.country ID`, `Market.display name`, `Market.approved region`, `Market.optional profile and regulatory/commercial claims`, `Market.service IDs`, `Market.map target`, `Network location and partner.location ID`, `Network location and partner.Dubai/UAE or Saudi Arabia label`, `Network location and partner.optional partner name`, `Network location and partner.role`, `Network location and partner.cooperation scope` and `Network location and partner.logo and permission` from [data-model.md](data-model.md).
- [ ] T034 [P] [US5] Validate optional approved credibility records in `build/credibility-schema.ts` and `content/credibility/catalog.ts` using `Manufacturer, metric and case.manufacturer and facility scope`, `Manufacturer, metric and case.imagery and evidence`, `Manufacturer, metric and case.metric label`, `Manufacturer, metric and case.value`, `Manufacturer, metric and case.scope`, `Manufacturer, metric and case.case title`, `Manufacturer, metric and case.market`, `Manufacturer, metric and case.services`, `Manufacturer, metric and case.approach`, `Manufacturer, metric and case.outcome` and `Manufacturer, metric and case.confidentiality approval` from [data-model.md](data-model.md).
- [ ] T035 [US5] Render a distinct Global Market Connections section with a static text/map alternative and the separate Our Markets selection view. Integrate approved SVG geography, country links, optional profiles, selected-country feedback and no-motion alternative in `src/features/markets/render-market-map.ts`, `src/features/markets/render-market-profiles.ts` and `src/features/markets/select-market.ts` (FR-004, FR-009).
- [ ] T036 [US5] Render approved differentiators, partner network and conditional manufacturer, metrics and case sections in `src/features/credibility/render-differentiators.ts`, `src/features/credibility/render-network.ts` and `src/features/credibility/render-evidence.ts`. Add the restrained scroll reveal in `src/features/credibility/differentiators-motion.ts`; keep the copy visible without scripts, with reduced motion, and if assets fail (FR-021).

## Phase 8: User Story 6 - Maintain trustworthy content and measure engagement (Priority: P2)

**Goal**: Support independently maintained content, future locales and optional privacy-preserving engagement.

**Independent Test**: Build with a test-only market or locale fixture and a withheld case. Check route/localization consistency, fixture isolation and an empty default analytics surface.

### Tests for User Story 6

- [ ] T037 [P] [US6] Write locale, fixture isolation and permitted engagement tests in `tests/unit/build/editorial-workflow.test.ts` and `tests/e2e/engagement.spec.ts`; cover withdrawal, no opt-in, blocked personal fields and no contact events.

### Implementation for User Story 6

- [ ] T038 [P] [US6] Implement localized content lookup and logical direction handling in `build/localized-content.ts`, `content/locales/en.ts` and `src/shared/styles/direction.css`; exercise a future-locale fixture without publishing an unapproved launch locale (FR-016, FR-018).
- [ ] T039 [P] [US6] Implement approval-gated event validation and optional client event boundaries in `build/engagement-schema.ts` and `src/features/credibility/content-engagement.ts` using `Engagement event.optional approved event name` and `Engagement event.allowed anonymous properties` from [data-model.md](data-model.md); keep analytics disabled by default and leave provider selection out unless separately approved (FR-019).
- [ ] T040 [US6] Document content updates, evidence and withdrawal checks, and the privacy/approval gate in `content/README.md`; connect the publication projection and event gate in `build/assemble-pages.ts` only after earlier page integrations are stable.

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Gather end-to-end release evidence against the approved constraints and budget.

- [ ] T041 Write and run the full-homepage acceptance check in `tests/e2e/homepage-integration.spec.ts`. Mount the required sections and optional approved sections in FR-001 order in `src/pages/home/render-home.ts`, and activate each eligible programmatic scene and Why Work With Us through the standalone `src/pages/home/enhance-home.ts` entry. Preserve Contact independence and remove dead navigation links in `src/features/navigation/render-navigation.ts`. Check order, anchors and readable content with scripts on and off. Verify scene activation and reversal, Global Market Connections fallback, and restrained reveal fallback (FR-001, FR-004, FR-007, FR-008, FR-021, FR-024, SC-003, SC-004, SC-008).
- [ ] T042 Implement the static artifact and disclosure allowlist audit in `build/audit-dist.ts` and its command in `package.json` using `Protected contact.approved static locations` from [data-model.md](data-model.md). Reject unexpected paths, elements and counts, forbidden media, runtime handlers, exposed secrets, private evidence and stale links (SC-011).
- [ ] T043 Run fixture and, when owner inputs are available, approved-input build, type, unit and three-engine browser validation from `quickstart.md`; record automated checks and owner-controlled inputs in `specs/001-cinematic-consulting-website/validation/build-and-content.md`.
- [ ] T044 [P] Verify real-device motion, keyboard, screen reader, no traps, actual mailto and clipboard fallback, required UK disclosures with scripts off, and no contact telemetry; record evidence in `specs/001-cinematic-consulting-website/validation/accessibility-and-contact.md`.
- [ ] T045 [P] Run the pre-release lab interaction and local journey INP protocol on representative desktop and physical mid-range mobile, recording cold and warm results, Lighthouse LCP/CLS and diagnostic TBT, transfer, motion, heap and distinct production field-data availability in `specs/001-cinematic-consulting-website/validation/performance.md` (NFR-004, SC-006).
- [ ] T046 [P] Audit deployed HTML, JavaScript and lazy chunks, metadata, structured data, public configuration, source maps and downloadable assets on the authorized release candidate with CDN mitigation disabled and on the public delivery path. Match only the exact allowlist and verify required visible static disclosures. Record masked results in `specs/001-cinematic-consulting-website/validation/served-output-security.md` (NFR-006, NFR-010, SC-011).
- [ ] T047 [P] Verify deployed HTTPS and HTTP redirects if applicable, HTML and crawl metadata cache behaviour, hashed-asset headers, genuine missing-page and missing-asset HTTP 404 responses, and MIME types per the public-pages contract. Record observations in `specs/001-cinematic-consulting-website/validation/hosting.md` (FR-017, NFR-006, NFR-009, SC-010, SC-011).
- [ ] T048 [P] Run the five-participant protocol in `quickstart.md` on the release candidate and record all criteria, scores, timings and anonymized evidence in `specs/001-cinematic-consulting-website/validation/participant-acceptance.md`. Hold acceptance until the 4-of-5 thresholds pass (SC-001–003, SC-005).
- [ ] T049 Review final scenes and rights, legal entity and approved disclosure allowlist, verified alias, policies, domain, required content and acceptance evidence in `specs/001-cinematic-consulting-website/validation/release-gate.md`. If edge mitigation is separately approved, verify legitimate crawler access and compare SEO, accessibility and performance before enabling it. Hold production approval while required inputs or evidence are missing.

## Dependencies & Execution Order

| Phase or story | Required dependencies | Completion signal |
| --- | --- | --- |
| Setup, T001–T003 | Start only after approval. T002 and T003 follow T001. | Repeatable toolchain and test runner configuration. |
| Foundation, T004–T009 | Setup. T008 integrates T004–T007, then T009 verifies the foundation. | Validated build fixtures and a static page pipeline. |
| US1, T010–T014 | Foundation. T014 composes T011–T013. | An independently testable, motion-free discovery journey. |
| US2, T015–T020 | Foundation for tests and contact module. T019 consumes T017 and T018. T020 follows T019 and the homepage shell in T014. | Contact works with no motion or remote submission service. |
| US3, T021–T026 | Foundation plus the stable section shell from T014 for page integration. T023 and T024 follow scene schema T022. T025 needs the static scene contracts before T026. | Programmatic narrative works against scene fixtures, with reversible progress and static fallback. The combined experience later receives complete service and market markup from US5. |
| US4, T027–T030 | Foundation for tests and style work. T028 and T029 follow T027, and T029 needs the US3 lifecycle. T030 follows T028 and T029. Full contact checks use US2. | Device modes preserve navigation and contact independently of cinematic assets. |
| US5, T031–T036 | Foundation. T035 uses T032 and T033. T036 uses T032–T035 and the motion interface from T025. T041 mounts its outputs after US6. | Market interactions, restrained reveal and optional evidence render with and without approved entries. |
| US6, T037–T040 | Foundation for fixture tests and modules. Final assembly in T040 follows T036, T038 and T039. | Editorial updates, withdrawal and optional engagement satisfy publication and privacy rules. |
| Polish, T041–T049 | All stories. T041 assembles the homepage. T042 uses the finalized output contract and T043 qualifies the artifact after T041 and T042. T044–T048 use that qualified candidate and the approved deployment when needed. T049 follows all checks. | Integration and release evidence are reviewable against every gate. |

### Parallel Opportunities by Story

| Story | Example wave on separate files |
| --- | --- |
| US1 | T011 hero, T012 navigation and T013 metadata once T010 is in place. |
| US2 | T015 browser contract and T016 output contract can be drafted together. T018 markup can run alongside T017 build config. |
| US3 | T021 browser contract and T022 scene schema. After T022, T024 static stage rendering can run while scene briefs and assets are prepared in T023. |
| US4 | After T027 establishes the contract and the US3 lifecycle is ready, run T028 CSS alongside T029 mode selection. |
| US5 | After T031 establishes the contract, T032 services, T033 geography and T034 credibility schemas are independent. |
| US6 | After T037 establishes the contract, T038 locale work and T039 eligibility rules are independent. |
| Polish | T044–T048 can run against the same qualified candidate after T043. Perform deployed checks after approved staging is available. |

Serialize any tasks that touch the same homepage, navigation, or page assembly file. Asset and company approvals may proceed independently of local work using fixture content.

## Implementation Strategy

1. **Discovery MVP**: After approval, implement Setup, Foundation and US1. Use synthetic inputs and verify the static discovery path independently. The MVP is an internal demo increment.
2. **Incremental delivery**: Add US2 for direct email, US3 for the narrative and US4 for responsive and accessible motion. Add US5 and US6 for complete market discovery and publication controls. Verify each increment against its independent test.
3. **Production readiness**: Complete the polish phase, final visual asset and publication checks, applicable UK disclosures, and contact alias approval. Keep optional analytics and edge controls disabled unless separately approved. The checklist does not authorize implementation or deployment.
