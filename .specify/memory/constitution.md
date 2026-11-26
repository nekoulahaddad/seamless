<!--
Sync Impact Report
Version change: 1.0.0 to 2.0.0 (incompatible change to website architecture and contact rules).
Modified principles: V. Responsive Experience; VI. Accessibility; IX. Security and Privacy;
X. Quality Assurance; XI. Progressive Enhancement. No principle headings renamed or removed.
Updated sections: Engineering Constraints; Review and Release Gates. No sections added or removed.
Removed obligations: website intake, server validation and rate limiting for inquiries,
provider delivery, database-backed storage, retries, and delivery status tracking.
Synchronized: feature spec, implementation plan, content model, public page and contact contracts,
and quickstart validation guide. Templates unchanged.
Follow-up: Owner approval of this amendment and synchronization. Before release confirm the legal
entity, jurisdiction, mandatory disclosure fields and placement, and the official email alias.
No placeholder TODOs. Remove this report before committing the approved amendment.
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
content readability, navigation, and the protected email controls across approved device modes.

### VI. Accessibility

The website MUST target WCAG 2.2 AA. Reviews MUST cover semantic structure, keyboard access,
visible focus, contrast, and the email controls' accessible names, status feedback, and selectable
address fallback. Honor
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

Keep credentials outside source control and public artifacts. Use HTTPS, minimize data processing,
and keep secrets and visitor personal data out of public output, logs, analytics, and error reports.
The website MUST NOT collect, store, send, or track inquiries. The visitor's own email app handles
direct correspondence. The Privacy Policy MUST reflect actual site practices and applicable
handling of direct correspondence. Verify any applicable UK data protection and storage or access
obligations before enabling optional analytics.

Use a verified company email address. Provide Email Us via standard `mailto`, Reveal Email
Address with selectable text, and Copy Email Address with accessible feedback and manual fallback.
Reconstruct the address after explicit activation. Keep the full address out of initial HTML,
public scripts, configuration, metadata and other downloadable artifacts except where an approved
mandatory disclosure requires publication. Obfuscation reduces basic harvesting. It cannot stop
bots that can reconstruct the address. Contact and bot protections MUST avoid tracking,
fingerprinting and unnecessary CAPTCHA and preserve legitimate crawler access.

Before release, verify and publish all applicable UK company, service-provider, contact and
privacy disclosures. Confirm the legal entity, registration jurisdiction and exact required fields.
Where disclosure applies, make required information easy to find and accessible in static HTML
without interaction, scripts or motion. A mandatory disclosure takes precedence over obfuscation.
Verify scope against [UK company website guidance](https://www.gov.uk/running-a-limited-company/signs-stationery-and-promotional-material),
[regulation 6 of the Electronic Commerce Regulations](https://www.legislation.gov.uk/uksi/2002/2013/regulation/6),
and applicable [ICO privacy](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/)
and [storage and access guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/).

### X. Quality Assurance

Each change MUST define testable acceptance criteria before implementation. Release review MUST
require passing relevant automated tests and TypeScript checks, visual verification of
representative desktop and mobile views, accessibility checks, and recorded performance
measurements. Verify navigation, protected email activation, reveal, clipboard fallback, and
mandatory disclosures. Audit public output for address exposure outside approved disclosure
locations. Link the results to the approved acceptance criteria.

### XI. Progressive Enhancement

Place essential company and service information, navigation, Contact instructions and required
disclosures in the initial semantic HTML. Verify that visitors and legitimate crawlers can reach
this content and its links without client scripts or cinematic assets. Preserve approved page
metadata and crawl directives. Supply a static equivalent when a scene carries essential meaning.
Protected email controls may require scripts. They MUST work independently of motion and the
static instructions MUST explain their availability when scripts are disabled.

### XII. Approval Gates

Stop after each Spec Kit phase and present its deliverables for explicit project owner
approval before starting the next phase. Apply this gate to the constitution, specification,
technical plan, implementation tasks, and any optional phase used. Record the approved artifact
and revision so changes can be traced. Production implementation MUST wait for approval of
the constitution, specification, plan, and tasks.

## Engineering Constraints

- Production MUST serve static frontend files only. Build-time tools MAY generate HTML and assets.
  The site MUST exclude contact forms, a backend, databases, serverless functions, email delivery
  APIs and form providers, inquiry storage, retries, and delivery tracking.
- Code files MUST contain at most 150 lines per file, with one entity per file. Functions MUST
  contain at most 30 lines and perform one action. Markdown is exempt from the file length cap.
- Use immutable data, explicit async error handling, and domain errors. Use `unknown` for
  untrusted values, validate external data, and prohibit `any`. Simplify existing logic before
  adding complexity.
- Frontend pages MUST compose features. React components MUST have named props types, with
  business rules outside components and styling in separate files. Effects MUST synchronize
  with external systems. Keep local UI state local. Use Redux Toolkit for shared client state
  through selectors when shared client state is required.
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
  protected contact behaviour, public artifact exposure, and applicable UK disclosures and privacy
  requirements. Correct failed criteria before release and obtain approval
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

**Version**: 2.0.0 | **Ratified**: 2026-11-26 | **Last Amended**: 2026-11-26
