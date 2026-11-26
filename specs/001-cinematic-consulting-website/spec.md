# Feature Specification: Immersive Pharmaceutical and International Business Consulting Website

**Feature Branch**: No branch created

**Created**: 2026-11-26

**Status**: Corrected static scope — awaiting explicit project owner approval

**Input**: Owner brief, “Immersive Pharmaceutical & International Business Consulting Website,” the company-provided clarification of positioning, services, markets and approach, and Seamless Constitution v2.0.0 (amendment pending approval).

## Clarifications

### Session 2026-11-26

- Q: Which of the seven proposed services are confirmed for publication at launch? → A: Adopt the six company-defined services in FR-006 as the specification baseline. Final publication approval is pending. The company clarification also supersedes the prior geography, regional network, approach stages, and credibility content.
- Q: Which cinematic sections must have final motion assets before the website can launch? → A: All core cinematic sections require approved final visuals and working browser-rendered animation. Use static or modeled visual assets as appropriate. Prohibit video assets and prerecorded frame sequences. Preserve responsive, static and reduced-motion alternatives.
- Q: What should the default scroll experience be on phones and tablets? → A: Desktop uses the full cinematic experience. Phones use a purpose-built vertical cinematic layout and may use short, justified pinned scenes. Tablets may use the desktop layout where viewport, orientation, input and performance support it. Otherwise, use the phone layout. Preserve content, functionality, reversible motion and accessible alternatives across modes.

**Owner-supplied scope correction:** The site is entirely static and frontend-only. Public contact uses standard mailto after explicit interaction, with a revealable, selectable and copyable official email address. The complete address is absent from pre-interaction public sources, subject to approved mandatory legal disclosures.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the company and find relevant information (Priority: P1)

As a pharmaceutical manufacturer, distributor, importer, exporter, or international business leader, I want to quickly understand Seamless Market Entry Advisory's pharmaceutical services and focus on emerging Arab markets so I can decide whether to explore a consultation.

**Why this priority**: Visitors must understand the offer before the website can generate qualified inquiries.

**Independent Test**: Start on the homepage with cinematic motion disabled. Identify the company's purpose, navigate to Expertise and Markets, and locate the consultation action.

**Acceptance Scenarios**:

1. **Given** a first-time visitor, **when** the opening content appears, **then** the business purpose and both hero actions are readable before any cinematic sequence completes.
2. **Given** a visitor on desktop or mobile, **when** they use navigation or Explore Our Expertise, **then** they reach the named section, can continue naturally, and can find Book a Consultation.

### User Story 2 - Contact the company about a consultation (Priority: P1)

As a prospective client, I want to open my email app or copy the official company address so I can contact Seamless Market Entry Advisory using my preferred email service.

**Why this priority**: Email contact is the primary conversion path.

**Independent Test**: Inspect Contact before interaction, activate Email Us on a device with a mail handler, and exercise Reveal Email Address and Copy Email Address on a device without one. Repeat with cinematic assets blocked, with clipboard access denied and with scripts disabled.

**Acceptance Scenarios**:

1. **Given** Contact is initially loaded, **when** the visitor activates Email Us by pointer, touch or keyboard, **then** the client reconstructs the verified address and invokes the standard mailto handler with the correct recipient.
2. **Given** scripts are available and no mail handler is configured, **when** the visitor activates Reveal Email Address or Copy Email Address, **then** they can read or copy the official address. If the clipboard cannot be written, the revealed text stays selectable and manual copying is explained.
3. **Given** a visitor follows a consultation CTA from navigation, hero, a service, a market or the closing scene, **when** they activate it, **then** it reaches the Contact section or invokes the same explicit Email Us action.
4. **Given** scripts are unavailable, **when** the visitor reaches Contact, **then** the section and its instructions remain available and explain that the protected actions require scripts. Any mandatory contact disclosure remains available as approved.

### User Story 3 - Follow the molecule-to-market journey (Priority: P1)

As a prospective client evaluating the firm's approach, I want the visuals to show how the company supports market entry from portfolio review through facilitation, at my own pace.

**Why this priority**: The five-stage journey is the defining experience and explains how the services work together.

**Independent Test**: On desktop, scroll through and reverse the entire journey, then repeat with reduced motion or unavailable media and compare the business content.

**Acceptance Scenarios**:

1. **Given** standard motion on desktop, **when** the visitor scrolls forward or backward, **then** browser-rendered camera and scene movement, copy and progress track Understand, Evaluate, Prepare, Connect, and Facilitate in order or reverse order without forced scrolling.
2. **Given** keyboard navigation, reduced motion, or missing media, **when** the visitor enters the journey, **then** they can read each stage and continue to the next section with no trap or lost content.
3. **Given** the visitor saw the laboratory vial, **when** they reach The Result, **then** the vial is recognizably reprised in an international market context and the closing action leads to consultation.

### User Story 4 - Use the site comfortably on mobile or with assistive technology (Priority: P1)

As a visitor using touch, a keyboard, a screen reader, or reduced motion, I want to access the same essential content and actions without relying on cinematic effects.

**Why this priority**: Discovery and conversion must remain accessible across devices and preferences.

**Independent Test**: On a representative phone and tablet, and using keyboard and screen reader on desktop, find a service and use the email contact options with cinematic media blocked.

**Acceptance Scenarios**:

1. **Given** a phone in either orientation, **when** a visitor opens the menu or scrolls through Expertise and Our Approach, **then** all panels and stages are arranged vertically, motion follows scroll in both directions, and the visitor can continue without horizontal gestures or interrupted navigation.
2. **Given** keyboard or assistive technology use, **when** a visitor navigates to Contact or activates a contact control, **then** the controls have accessible names, focus stays visible, and the revealed address and copy result are announced or otherwise accessible.
3. **Given** a tablet changes orientation, viewport or input conditions during a scene, **when** the presentation mode changes, **then** the equivalent content and actions remain available, with no unintended horizontal overflow, loss of keyboard focus or navigation interruption.

### User Story 5 - Assess services, markets, and credibility (Priority: P2)

As a buyer or potential partner, I want to compare services and identify verified evidence so I can assess fit for my organization and target market.

**Why this priority**: Reliable information supports qualification and preserves business trust.

**Independent Test**: Review a content set with approved services and markets, then repeat with no authorized partner logos, no published cases, and withheld regulatory claims.

**Acceptance Scenarios**:

1. **Given** approved services and market content, **when** a visitor selects a target country by pointer, touch, or keyboard, **then** they can find its profile when approved, relevant services and a consultation action. The map and static alternative distinguish target countries from Dubai and Saudi Arabia as partnership locations.
2. **Given** no approved partner names, manufacturer entries, metrics, or cases, **when** visitors browse the site, **then** it shows approved general network information and hides unsupported entries and empty sections with no dead navigation links.

### User Story 6 - Maintain trustworthy content and measure engagement (Priority: P2)

As a company content owner, I want to maintain independently approved content and measure anonymous engagement so I can improve qualification and expand the site over time.

**Why this priority**: The website must support future markets and languages while keeping published evidence current and respecting visitor privacy.

**Independent Test**: Review an additional sample market, a withheld case, and all approved analytics signals without personal fields.

**Acceptance Scenarios**:

1. **Given** a newly approved market and an unpublished case, **when** content is reviewed for release, **then** the market can follow the existing market format and the case remains unpublished.
2. **Given** optional analytics is separately approved and enabled, **when** a visitor explores the storytelling sequence, **then** only approved anonymous site engagement may be counted. Contact and bot mitigation operate without tracking.

### Edge Cases

- Missing, late, corrupt, or blocked media leaves a poster or equivalent static composition and the full sequence of essential text and actions.
- Rapid reverse scrolling, viewport resize or rotation, input changes and returning to a deep link preserve readable content, the current section and a usable route out of the sequence. A tablet ineligible for desktop mode uses the optimized vertical experience.
- Motion preferences or persistent motion controls affect motion while preserving content order and access to actions.
- Mobile menus, direct links, and navigation never land on a hidden or obscured section.
- Missing profiles or permission-sensitive records leave approved geography and the consultation action available while withholding unsupported details. Empty manufacturer, track-record and case study sections and their links are hidden. Static geographic content preserves target-country and network labels.
- If no default email app opens, visitors can reveal and copy the address. If copying is blocked, the revealed address stays selectable and the site explains manual copying. If scripts are blocked, the initial Contact content explains how the protected controls work and preserves approved mandatory disclosures.
- If analytics is unavailable or disallowed, navigation and consultation continue to work.
- Long translated labels and right-to-left text are compatibility review cases for future locales. Translations are outside initial launch scope.

## Requirements *(mandatory)*

### Functional Requirements

#### Homepage, navigation, and storytelling

- **FR-001**: The proposed homepage order is Navigation, Cinematic Hero, Global Market Connections, About Seamless Market Entry Advisory, Our Expertise, Our Approach, Our Markets, Why Work With Us, Our Partners & Network, Verified Pharmaceutical Manufacturers when approved entries exist, Our Track Record when verified metrics exist, Case Studies when approved cases exist, Final Cinematic Scene, Contact and Consultation, and Footer.
- **FR-002**: Navigation MUST link to About, Expertise, Our Approach, Our Markets, Why Work With Us, Our Partners & Network, Case Studies when present, and Contact. Include a persistent route to Book a Consultation, a responsive menu, smooth anchor travel when motion is allowed, transparent navigation over the hero with readable controls, and a readable background when scrolled. Service links MUST follow the six company-defined services and resolve to available content.
- **FR-003**: The full-viewport laboratory hero MUST introduce the recurring pharmaceutical vial and camera approach, use programmatic camera movement, scroll-synchronized transitions and progressive typography reveals with motion enabled, and offer a responsive composition and static poster. Show the company-supplied headline “Connecting Pharmaceutical Innovation with Emerging Arab Markets.” with Book a Consultation and Explore Our Expertise. The purpose and actions MUST remain readable and immediately available.
- **FR-004**: Global Market Connections MUST transition from the laboratory into an interactive cinematic globe or map. Scroll MUST progressively highlight the five target countries and reveal illustrative strategic network connections involving Dubai, United Arab Emirates, and Saudi Arabia. Visually distinguish target countries from network locations. The visual MUST avoid implying trade routes, specific agreements, shipments, transactions, company offices, or unverified target markets. Provide a responsive, accessible non-animated equivalent.
- **FR-005**: About MUST identify Seamless Market Entry Advisory as a pharmaceutical market entry and international business development consultancy. Describe its mission to simplify entry into emerging Arab markets by connecting international pharmaceutical manufacturers with the right markets, regulatory pathways, and trusted regional business partners. Use approved copy on strategic guidance, regulatory support, market intelligence and business development.
- **FR-006**: Expertise MUST have six numbered cinematic panels using the company-defined taxonomy below. Each panel includes title, concise description, relevant visual and business benefits, with an optional valid detail link and consultation action where appropriate. Give portfolio and facility assessment dedicated visuals. Desktop scroll MUST expose panels horizontally in both directions with progress cues and image transitions. Phones and tablets in vertical mode MUST use vertically arranged cinematic panels. Static alternatives MUST preserve every service in accessible reading order. Public display is subject to approval.

  1. **Pharmaceutical Product Portfolio Assessment** — Assess portfolios, therapeutic needs, demand, competition, commercial potential and suitability for individual markets.
  2. **Market Selection and Entry Strategy** — Identify suitable Arab markets for products and portfolios and tailor country entry strategies to regulatory environments, commercial conditions and market requirements.
  3. **Regulatory and Registration Support** — Review documentation, assess readiness, identify country requirements, prepare and coordinate registration activities, and liaise with local partners and regulatory stakeholders. Avoid claims of guaranteed approval or authority to issue registrations.
  4. **Importer and Distributor Identification** — Identify and recommend importers and distributors after assessing capabilities, market presence, networks and relevant experience.
  5. **Pharmaceutical Market Access and Business Development** — Connect manufacturers with qualified regional partners, facilitate relationships and negotiations, support entry and agreements, and coordinate with importers and distributors to support long-term relationships.
  6. **Pharmaceutical Manufacturing Facility Assessment** — Identify potential manufacturing partners and support preliminary reviews of capabilities, operational fit and partnership opportunities. Claims of certification, regulatory inspection or accredited auditing require independent confirmation.
- **FR-007**: Our Approach MUST use the documented five stages below as a continuous visual journey. Scroll position MUST drive synchronized camera and scene progression, text reveals and stage indicators in both directions. Render the sequence in the browser using virtual camera zoom in and out, panning and perspective changes, layered parallax and depth, scroll-controlled object movement and rotation, dynamic lighting and visual effects, and coherent transitions between pharmaceutical and market-entry scenes. Use full-screen scenes where appropriate, horizontal and vertical storytelling in desktop mode, and vertically arranged cinematic scenes in phone mode. Apply the pinning and input rules in NFR-002. Provide a static equivalent for every stage and never trap visitors. The narrative illustrates support without implying guaranteed entry, successful registration, or completed transactions.
- **FR-008**: The Final Cinematic Scene MUST reprise the hero vial as a symbol of a potential market opportunity, retain the closing consultation action, and preserve consistent lighting, camera language, grading and composition.
- **FR-009**: Our Markets MUST enable interactive selection of Syria and Iraq (Levant), Yemen (Arabian Peninsula), and Libya and Tunisia (North Africa) with pointer, touch and keyboard. Offer a responsive non-animated alternative with equivalent country access. For each country show its name and region with relevant approved services and a consultation action. Add a country profile when its content is approved. Display only verified country-specific claims, regulatory information and statistics. Dubai and Saudi Arabia are regional partnership locations and MUST remain separate from the five target countries.
- **FR-010**: Our Partners & Network MUST describe the regional network involving companies based in Dubai and Saudi Arabia. Allow named strategic partner entries with roles and cooperation areas only when verified and authorized. If names or logos cannot be published, use approved general network information.
- **FR-011**: Retain the extensible case study capability and publish only verified content with confidentiality and publication approval. Hide the entire section and related navigation when no approved cases exist.
- **FR-012**: The footer MUST offer company logo and description, navigation and service links, access to the official email contact, approved social profiles where available, Privacy Policy, Terms of Use and copyright. Approved legal pages and verified company identity are launch dependencies.

| Stage | Headline | Business meaning and visual setting |
| --- | --- | --- |
| Understand | Understand the Opportunity. | Review the manufacturer's product portfolio and objectives in a pharmaceutical lab or consulting workspace with products and analytical materials. |
| Evaluate | Identify the Right Markets. | Identify suitable markets and commercial potential through a visualization of the five target countries supported by market intelligence. |
| Prepare | Navigate Regulatory Complexity. | Review registration requirements and documentation readiness through regulatory dossiers, samples and a professional regulatory workspace. |
| Connect | Connect with the Right Partners. | Identify and recommend suitable importers and distributors through meetings, commercial discussions and distribution settings. |
| Facilitate | Turn Opportunities Into Action. | Support negotiations, partnerships and market entry through commercial, manufacturing and distribution scenes. Reprise the recurring vial in the conclusion. |

#### Contact, content, and discovery

- **FR-013**: The Contact section uses the company-proposed heading “Let's Explore New Pharmaceutical Markets Together.” Provide accessible controls named Email Us, Reveal Email Address and Copy Email Address. Email Us MUST use standard mailto. Reveal MUST make the verified official company email address visible, readable and selectable. Copy MUST use that same verified address and provide accessible success or failure feedback. If clipboard access fails, reveal the selectable address with manual copying instructions.
- **FR-014**: The initial HTML MUST contain the Contact section, discoverable links to it and instructions that the protected email controls use browser scripting. Reveal, copy and mailto handoff MUST work when scripts are available even if animation is disabled or cinematic assets fail. With scripts unavailable, keep Contact text and approved mandatory disclosures accessible and explain why the protected controls are unavailable.
- **FR-015**: Consultation and contact CTAs MUST link to Contact or explicitly invoke Email Us. Reconstruct the official address in the browser only after a visitor activates an email control. Prefer lightweight client-side obfuscation and preserve ordinary mailto behavior. Do not publish a prebuilt mailto link containing the complete address before interaction. Apply the disclosure rules in FR-026.
- **FR-016**: Business content, navigation, translations, legal copy, contacts and search metadata MUST be independently maintainable. Support future dedicated service, market, manufacturer, partner and case study pages and future editorial management. Launch focuses on the homepage and required legal pages.
- **FR-017**: All essential public content and navigation links MUST be present in each page's initial HTML response. Search engines and visitors MUST be able to discover essential content without JavaScript execution or cinematic assets. Use semantic HTML5, logical headings, meaningful image alternatives, descriptive page metadata, canonical URLs and Open Graph metadata. Publish sitemap.xml and robots.txt and use accurate structured data where applicable. Use the approved company positioning, six-service taxonomy and five-country scope while distinguishing the partnership network. Animation MUST preserve the indexable content and its accessible reading order. Contact itself is indexable. The protected recipient follows FR-014 and FR-026.
- **FR-018**: Use English for launch as a project design assumption pending company confirmation. Organize content and metadata for future Arabic and Russian localization, longer translations and right-to-left Arabic reading order.
- **FR-019**: Where separately approved and permitted, anonymous analytics may measure service and market views, published case study views and storytelling completion. Exclude contact interactions, personal data and email activity. Analytics MUST be independent of contact controls and bot mitigation.
- **FR-020**: Every cinematic scene MUST have a production brief specifying identifier, business purpose, visual concept, asset list and still-image prompts where applicable, planned camera and object movement, scroll progression, start and end compositions, lighting, perspective, colour grading, recurring objects, aspect ratio, desktop and mobile variants, static fallback and loading priority. Cover the six services, five countries, Dubai and Saudi network, and five approach stages, including portfolio assessment, registration documents, importer and distributor identification, facility assessment and negotiations. Use high-quality pharmaceutical stills, AI-generated static imagery where appropriate, transparent foreground assets, SVG illustrations, layered compositions and optional 3D models. Maintain consistent visual identity, lighting, perspective and colour grading. Keep visual asset production independent of website development and identify temporary assets. Generated visuals MUST NOT misrepresent actual company facilities, assessed sites, partners, employees or pharmaceutical products.

- **FR-021**: Why Work With Us MUST use an editorial layout and restrained scroll reveals. Present approved differentiators covering pharmaceutical specialization, Arab market understanding, regional networks, registration knowledge, tailored entry strategies, access to potential importers, distributors and manufacturers, and sustainable relationship development. Exclude unsupported superiority and achievement claims.
- **FR-022**: Verified Pharmaceutical Manufacturers MUST support approved entries for businesses whose facilities or operations the company previously assessed or audited. Include manufacturer, country, logo, facility details, actual scope of work, imagery and publication permission. Hide the section if no entries qualify. Avoid implying certification, endorsement or regulatory approval.
- **FR-023**: Our Track Record MUST support verified metrics for markets researched, products assessed and partnerships facilitated. Suppress unavailable metrics and hide the section if no metrics qualify.

- **FR-024**: All cinematic motion MUST be rendered programmatically in the browser. Prohibit prerecorded video, background video, AI-generated video, video-based scroll scrubbing and prerecorded image sequences used to simulate playback. The hero, Global Market Connections, Our Expertise, all five Our Approach stages, Our Markets geographic experience and Final Cinematic Scene are core cinematic sections. Each requires final approved visuals and functional programmatic motion in its applicable motion-enabled presentation before launch. Static and reduced-motion alternatives MUST preserve essential content and actions.

- **FR-025**: The site MUST NOT collect or store inquiry contents, visitor email addresses or inquiry records. Email controls MUST NOT send tracking requests or monitor whether visitors compose, send or receive messages.
- **FR-026**: Publish an approved Privacy Policy and Terms of Use. The Privacy Policy MUST accurately cover the static site's applicable data practices, approved analytics and consent where applicable, the email handoff, and company handling of direct correspondence as applicable. Confirm applicable legal, privacy, security and data protection requirements with the company before launch. Preserve all applicable UK company, service-provider, contact and privacy disclosures. Before launch, confirm the legal entity, jurisdiction, required fields and compliant placement. Make mandatory disclosures easy to find and available in static HTML without interaction. Approve a narrowly scoped exception to obfuscation when plaintext publication is mandatory. The required disclosure takes precedence.

### Non-Functional Requirements

- **NFR-001 — Visual quality**: Design review MUST verify the “From Molecule to Market” visual arc, editorial typography, negative space, readable hierarchy, photoreal imagery, and coherent transition design. Full-screen scenes, masks, clipping and subtle parallax MUST support a scene's purpose. Generic repeated card layouts, excessive gradients and glass effects, cartoon illustrations, and purposeless motion fail review.
- **NFR-002 — Responsive experience**: Verify these modes on representative desktop, laptop, tablet and phone configurations:
  - **Desktop and laptop**: Deliver the full cinematic experience, including pinned scenes, horizontal storytelling, layered animations and scroll-synchronized virtual camera movement.
  - **Phone**: Use natural vertical scrolling and purpose-built scenes with responsive zoom, parallax, layered imagery, object movement and transitions. Replace horizontal storytelling sequences with vertically arranged scenes. Allow short pins only when review demonstrates a specific benefit and tests show natural scroll, reliable exit, usable controls and compliance with performance targets. Never require horizontal gestures or take control of scrolling. Size visual assets and motion complexity for mobile memory and transfer constraints.
  - **Tablet**: Consider usable viewport, orientation, available input and performance together. Use desktop-style sequences only where the resulting presentation passes usability and performance checks. Use the optimized vertical phone mode otherwise.
  - **All modes**: Keep content and functions equivalent, provide smooth and reversible scroll-linked motion when enabled, and support static and reduced-motion paths. Prevent unintended horizontal overflow, animation-induced layout shifts and navigation interruptions. Apply FR-024 on every device.
- **NFR-003 — Accessibility**: Target WCAG 2.2 AA. Verify keyboard and screen-reader use, visible focus, contrast, accessible email controls and readable, selectable revealed text, semantic reading order, motion preferences, and pause or stop controls for persistent motion where required. All essential information and consultation access MUST remain available with motion disabled or cinematic assets unavailable.
- **NFR-004 — Performance**: Target production LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 at the 75th percentile. Prioritize essential content and the opening poster, and stage delivery of cinematic media. Technical planning MUST set measurable media, execution, rendering and memory budgets. Validate representative desktop and mid-range mobile conditions and record measurement methods and limitations.
- **NFR-005 — Credibility**: Every material company, market, partnership, regulatory, or commercial claim MUST have traceable evidence and permission to publish. Verify company identity and contact details. Images and sample journeys MUST avoid implying a real office, client, approval, or outcome.
- **NFR-006 — Security and privacy**: Serve the site over a secure connection. Keep secrets and personal information out of public assets and operational output, apart from approved public company information. Exclude visitor personal data and correspondence from application logs, analytics, error reports and monitoring. Verify applicable browser security protections and review analytics and consent behaviour against the approved Privacy Policy. Email address publication MUST comply with NFR-010.
- **NFR-007 — Maintainability**: Keep editorial content and motion direction independently reviewable and replaceable. Verify that another market, service, or scene can follow existing conventions without rewriting unrelated content.
- **NFR-008 — Release evidence**: Require relevant automated tests, manual desktop and mobile visual verification, accessibility checks, documented performance measurements, acceptance results and explicit phase approvals as established in the constitution.

- **NFR-009 — Architecture constraints**: The production site MUST be entirely static and frontend-only. Use static output and static hosting. Choose the simplest architecture that meets cinematic, performance, security, privacy, accessibility and SEO requirements. Exclude contact forms, a backend, database, serverless functions, email delivery APIs, external form submission providers, inquiry storage, retries, delivery tracking, ORM, CMS, authentication, user accounts, administrative dashboards and CRM integration.

- **NFR-010 — Email harvesting and bot protection**: Keep the complete official email address out of initial HTML, downloadable JavaScript source, metadata, structured data and publicly accessible configuration and build artifacts, except a mandatory approved disclosure under FR-026. Use no tracking, fingerprinting or unnecessary CAPTCHA challenges for contact or bot mitigation. Any mitigation MUST preserve legitimate crawler access, indexing, accessibility and performance. Client-side obfuscation reduces basic automated harvesting. Sophisticated bots can inspect client assets or simulate interaction, so it cannot guarantee protection.

### Key Entities *(include if feature involves data)*

- **Company profile and channel**: Approved identity, description, logo, contact details, social profiles, and rights or verification records.
- **Service and market**: Company-defined service names and approved descriptions, benefits and visuals. Each target country can have an approved profile, reviewed market statements, linked services and a consultation action.
- **Partner record**: Category or named organization, Dubai or Saudi Arabia network location where applicable, role, area of cooperation, relationship evidence, logo permissions and publication status.
- **Assessed manufacturer**: Manufacturer name, country, facility details, documented scope of assessment or audit, imagery, logo, and publication permission.
- **Track record metric**: Approved measure, verified value, scope, source, and publication approval.
- **Case study**: Title, industry, target market, client challenge, approach, services, approved outcome, imagery, verified metrics, confidentiality constraints and publication status.
- **Claim evidence**: Statement, source, applicable scope, verification date, permission and approval status.
- **Scene and asset brief**: A business message, visual concept, scroll progression, programmatic motion direction, visual asset provenance, device variants, static fallback and readiness.
- **Official contact address**: Company-approved public-facing email address used by all three protected controls. Maintain any legally required publication exception separately.
- **Published content and engagement**: Navigation, localized copy, legal pages, search metadata and approved anonymous event categories.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 4 of 5 representative first-time visitors identify the company as helping international pharmaceutical manufacturers enter emerging Arab markets within 15 seconds.
- **SC-002**: At least 4 of 5 representative visitors reach a service, select a target country and locate the consultation action within 60 seconds. Include desktop and phone. All five countries are selectable with keyboard and touch, and both geographic presentations distinguish Dubai and Saudi Arabia as network locations.
- **SC-003**: In every active motion mode, all five stages and associated text and progress remain synchronized in forward and reverse scrolling. Desktop verifies pinned and horizontal sequences. Phone verifies vertical cinematic scenes, and every optional short pin passes scroll, exit and performance tests. Tablet verifies both presentation modes in representative conditions. At least 4 of 5 reviewers can explain the journey from portfolio review to facilitating market entry and identify the opening and closing visual connection.
- **SC-004**: On desktop, laptop, tablet and phone, all critical navigation and email contact scenarios pass. Verify touch and keyboard where supported and tablet orientation and mode changes. Each mode keeps all services, country interactions, approach stages and consultation actions available. Record zero unintended horizontal overflow, navigation interruptions or animation-induced layout shifts in those scenarios. With motion disabled or media blocked, all five stage descriptions, essential service and market content, and consultation access remain available. No critical journey has a known, unresolved WCAG 2.2 AA failure.
- **SC-005**: At least 4 of 5 representative visitors locate the Contact section and copy the official address or open a correctly addressed draft within 60 seconds. Verify all three controls with pointer, touch and keyboard, and verify announcement and focus behavior with assistive technology. Test on representative desktop and phone configurations, including no mail handler, blocked clipboard access and unavailable cinematic assets. With scripts disabled, verify accessible Contact instructions and any required disclosures.
- **SC-006**: Verify production 75th-percentile LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1 when sufficient field data becomes available. Before launch, record representative desktop and mid-range mobile measurements and explicitly identify metrics awaiting field confirmation.
- **SC-007**: 100% of published claims, named third parties, manufacturer work scopes, track-record values and case studies have recorded verification and publication approval. A fixture with no approved records shows no related empty credibility sections, fabricated entries or dead links.
- **SC-008**: Every cinematic scene has an approved brief and a verified static fallback. Before release, all core cinematic sections in FR-024 have final approved visual assets and working browser-rendered motion in the applicable desktop, phone and tablet motion-enabled presentations. Review the release assets against the FR-024 exclusions and verify that reduced-motion and unavailable-asset states retain essential content and actions. All published pages pass the search and sharing metadata review, and every enabled engagement event is verified to exclude personal data and information about email activity.
- **SC-009**: Review the approved Privacy Policy and Terms of Use against the deployed static site. Verify that contact interactions neither capture visitor data nor expose personal information in enabled analytics, error reports or monitoring. Confirm that any analytics and consent behaviour match the approved policy.
- **SC-010**: Inspect the initial response for every public page with scripts disabled. Verify that essential text and navigation links, semantic headings, canonical and Open Graph metadata, and applicable structured data are present. Verify that sitemap.xml and robots.txt are available and approved public content remains visible without animation.
- **SC-011**: Verify production serves static files only, meets NFR-009 and exposes no credentials in public assets. Scan deployed HTML, JavaScript, metadata, structured data, public configuration and other downloadable build artifacts for the complete plaintext email address before interaction. Verify zero occurrences outside approved mandatory disclosure locations. Verify the approved UK disclosures are present and accessible with scripts disabled. Verify no contact tracking, fingerprinting or site-side data transfer during reveal, copy or mailto handoff. If edge mitigation is enabled, verify legitimate crawler access and validate indexing, accessibility and performance with it enabled.

## Assumptions

### Confirmed scope and exclusions

- The company-provided business baseline is Seamless Market Entry Advisory, serving international pharmaceutical manufacturers expanding into emerging Arab markets through the six company-defined services, five target countries, regional partnership network, and documented five-stage approach. Publication approval for individual public claims and services remains pending.
- The homepage and legal pages support discovery and contact by direct email. Book a Consultation leads to Contact or invokes the protected Email Us action. Dedicated service, market, manufacturer, partner and case study pages are potential future additions. The static architecture and exclusions in NFR-009 apply to the current scope.
- Initial usability thresholds in SC-001 through SC-005 are project acceptance targets.

### Proposed content and design assumptions

- Preserve From Molecule to Market, the recurring vial and the approved scroll-driven creative direction. Keep the proposed palette: Midnight Navy `#080F1C`, Deep Navy `#142B42`, Strategic Teal `#167D8D`, Champagne Gold `#C5A572`, Off White `#F4F6F8`. Use Manrope headlines and Inter body and UI as proposed, subject to brand guidance and contrast.
- The company's proposed hero support copy is “Strategic pharmaceutical market entry, regulatory support, and business development across emerging Arab markets.” The contact heading follows FR-013. Review the remaining editorial copy against the company positioning and evidence before publication.
- English at launch and future Arabic and Russian support are project assumptions pending final language confirmation.

### Technology preferences for planning

- Prefer semantic HTML5, modern CSS and vanilla JavaScript or TypeScript. Next.js with static export is an option only if planning demonstrates an architectural or maintainability advantage and the production deployment remains entirely static.
- Evaluate lightweight motion tools such as GSAP and ScrollTrigger where needed. Consider Three.js or WebGL only if simpler techniques cannot meet an approved cinematic requirement and the performance and accessibility budgets still hold. No framework, animation library, renderer or host is selected at this phase.

- Evaluate lightweight client-side email obfuscation and optional CDN-level bot mitigation or email obfuscation during planning. Compare crawler compatibility, accessibility and performance before selecting any CDN control. Recommend that the company provide a dedicated public-facing alias and apply appropriate mailbox-level spam filtering.

### Dependencies

- Obtain official brand assets, verified identity and contacts, approved legal text, final service publication approval, and evidence and authorization for market profiles and credibility content. Unavailable optional case studies, manufacturers and track-record metrics may be withheld.
- Asset production supplies approved final visuals and usage rights, desktop and mobile compositions, and static alternatives. Use clearly identified temporary material during development. Release requires final visuals and working programmatic motion in every core cinematic section.
- Before production launch, the company MUST provide and approve the official public email address. Verify the protected reveal, copy and mailto results against that address, confirm required disclosure placement and obtain approved Privacy Policy, Terms of Use, and any applicable analytics or consent approvals.

### Unresolved business questions

- What legal company name, jurisdiction, logo, brand guidelines, official contacts and social channels are approved for public use? Who owns content approval?
- Which of the six services have final publication approval? Which country profiles, partner roles and names, assessed manufacturers and actual scopes of work, track-record metrics, cases and testimonials are verified and authorized?
- Which official public email alias is approved, and does the company require a plaintext contact disclosure on any page? Which jurisdiction-specific legal, privacy and consent obligations apply to the static site, any approved analytics, and the company's handling of direct correspondence?
- Which static or modeled assets already exist with usage rights, and who signs off on remaining assets and final compositions?
- Are the assumed language scope and engagement events approved for launch?
