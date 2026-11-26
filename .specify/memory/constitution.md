<!--
Sync Impact Report
Version change: unversioned scaffold to 1.0.0
Principles added: I. Spec-Driven Development, II. Design Excellence,
III. Animation Architecture, IV. Performance First, V. Responsive Experience,
VI. Accessibility, VII. Maintainability, VIII. Business Credibility,
IX. Security and Privacy, X. Quality Assurance, XI. Progressive Enhancement,
XII. Approval Gates
Principles modified or removed: none
Sections added: Engineering Constraints, Review and Release Gates
Sections removed: none
Ratification evidence: The project owner directed use of the approved constitution in the website specification brief on 2026-11-26.
Remove this report before committing the ratified constitution.
-->

# Seamless Constitution

## Core Principles

### I. Spec-Driven Development

Every implementation change MUST trace to an approved requirement and its acceptance criteria,
an approved technical plan, and an approved implementation task. When scope or design changes,
update the affected artifacts and obtain approval before implementing the change. Reviewers
MUST be able to follow that chain from the change to the approved requirement.

### II. Design Excellence

The website MUST present pharmaceutical and international business consulting through a
coherent editorial design with clear typography, pacing, and visual hierarchy. Each scene
MUST support an approved message or user action. Design review MUST verify a distinctive
visual identity, readable content, and an obvious path to consultation. Generic template
sections and visual complexity without a defined purpose MUST be removed.

### III. Animation Architecture

Technical plans MUST define scroll-driven storytelling as a first-class capability, including
scene boundaries, scroll inputs, media dependencies, lifecycle cleanup, and fallback behavior.
Animations MUST be modular and separate from business content and presentation. They MUST
preserve normal scrolling and keyboard navigation, clean up resources when scenes exit or
unmount, and keep content available if a scene or media asset fails.

### IV. Performance First

Plans MUST set measurable budgets for Core Web Vitals, media transfer, JavaScript execution and
payload, rendering, and memory use. Prioritize visible content, defer nonessential assets and work,
and size media for the device. Before release, measure LCP, INP, and CLS and verify the approved
budgets on representative desktop and mobile conditions. Profile scene rendering and check
memory behavior across repeated scene entry and exit. Use field data when available and record
the measurement conditions.

### V. Responsive Experience

Desktop MUST provide the approved immersive storytelling experience. Mobile MUST have its own
layout, pacing, media strategy, and motion treatment suited to touch, smaller screens, and
limited device resources. Verify both experiences against explicit acceptance criteria, including
content readability, navigation, and completion of the consultation flow.

### VI. Accessibility

The website MUST target WCAG 2.2 AA. Reviews MUST cover semantic structure, keyboard access,
visible focus, contrast, and the consultation form's labels, errors, and status messages. Honor
reduced-motion preferences and provide accessible static alternatives for information conveyed
through motion. Verify with automated checks and manual keyboard, assistive technology, and
reduced-motion checks on critical journeys.

### VII. Maintainability

Use strict TypeScript, explicit public types, and modular feature boundaries. Separate business
content, rendering, animation orchestration, and external effects. Keep feature code local.
Place components and utilities in shared code only when they are reused and independent of
any feature. Prefer the simplest design that meets approved needs and justify each new
dependency against the build, runtime, and maintenance cost it introduces.

### VIII. Business Credibility

Publish partners, clients, regulatory approvals, case studies, statistics, and commercial
outcomes only when supported by a verifiable source and approved for publication. Never
fabricate these items or imply an unverified endorsement or outcome. Record the supporting
source, scope, and verification date for each material claim. Omit claims without sufficient
evidence or permission to publish.

### IX. Security and Privacy

Collect only information needed to respond to consultation requests. Validate submissions at
the server boundary, apply rate limits, encrypt personal data in transit and at rest, and
restrict access to authorized recipients. The plan MUST specify the data purpose, retention,
and deletion controls. Credentials MUST remain outside source control, client bundles, and
public configuration. Personal data and secrets MUST stay out of logs, analytics, and errors
returned to users.

### X. Quality Assurance

Each change MUST define testable acceptance criteria before implementation. Release review MUST
require passing relevant automated tests and TypeScript checks, visual verification of
representative desktop and mobile views, accessibility checks, and recorded performance
measurements. Verify critical journeys including navigation and consultation submission,
validation errors, and failure recovery. Link the results to the approved acceptance criteria.

### XI. Progressive Enhancement

Deliver essential company and service information, navigation, and access to consultation
independently of the cinematic layer. Keep essential content in accessible markup and verify
that it remains readable and navigable with animations disabled, animation scripts unavailable,
or cinematic media failing. Supply a static equivalent when a scene carries essential meaning.

### XII. Approval Gates

Stop after each Spec Kit phase and present its deliverables for explicit project owner
approval before starting the next phase. Apply this gate to the constitution, specification,
technical plan, implementation tasks, and any optional phase used. Record the approved artifact
and revision so changes can be traced. Production implementation MUST wait for approval of
the constitution, specification, plan, and tasks.

## Engineering Constraints

- Code files MUST contain at most 150 lines per file, with one entity per file. Functions MUST
  contain at most 30 lines and perform one action. Markdown is exempt from the file length cap.
- Use immutable data, explicit async error handling, and domain errors. Use `unknown` for
  untrusted values, validate external data, and prohibit `any`. Simplify existing logic before
  adding complexity.
- Frontend pages MUST compose features. React components MUST have named props types, with
  business rules outside components and styling in separate files. Effects MUST synchronize
  with external systems. Keep local UI state local. Use Redux Toolkit for shared client state
  through selectors and RTK Query for server data and caching.
- Any NestJS backend MUST validate inputs at its boundaries, including body, query, params,
  and headers. Use the global ValidationPipe and exception filter, separate DTOs from domain
  entities, authorize every protected action, limit sensitive endpoints, and isolate external
  calls with timeouts and explicit error handling. Use allowlisted filters and sorting,
  pagination for list endpoints, and parameterized queries.
- Technical plans MUST document significant architectural decisions and trade-offs, including
  alternatives considered and the effect on accessibility, performance, and maintenance.
  Dependencies and architecture MUST address an approved need.

## Review and Release Gates

- For every phase, present the artifact, open decisions, and applicable verification evidence
  before requesting approval. Record approval with that artifact or in its review record.
- Before implementation, confirm traceability and define representative devices, fallback
  scenarios, performance budgets, and the evidence needed to accept the work.
- Before release, record test results, visual and accessibility evidence, and measured
  performance against budgets. Review the publication evidence for business claims and verify
  consultation data protections. Correct failed criteria before release and obtain approval
  for the completed phase.

## Governance

This constitution governs project specifications, technical plans, implementation tasks, and
release reviews. Reviewers MUST verify compliance at each phase and identify the governing
principle for any finding. Resolve violations before requesting phase approval.

Amendments MUST document the rationale, affected principles and artifacts, and any migration
or remediation needed. The project owner MUST explicitly approve the amendment before it
takes effect. Record the approval, update affected artifacts, preserve the original ratification
date, and record the amendment date. Use a major version for incompatible changes or removals,
a minor version for new principles or materially expanded guidance, and a patch version for
clarifications and editorial corrections.

**Version**: 1.0.0 | **Ratified**: 2026-11-26 | **Last Amended**: 2026-11-26
