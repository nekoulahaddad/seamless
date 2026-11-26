# Content Model: Seamless

These are validated build-time records and transient UI state. The public site has no database,
mutable content API, user records or inquiry records. Stable IDs and slugs are unique. Build-time
schemas verify references, approval rules, and expected launch taxonomy before rendering.
Public output contains approved fields only. Source evidence and contact configuration remain
outside the public artifact.

| Entity | Fields and relationships | Validation and publication |
| --- | --- | --- |
| Site profile | Display name, approved mission and positioning, logo asset, canonical origin, locale, navigation, legal page references, contact configuration reference | Require verified identity, approved legal pages and HTTPS canonical production origin. Default locale English pending owner confirmation. |
| Page and locale entry | Stable ID, locale, direction, localized path, title, description, social image, ordered sections | Unique path and canonical per published page. Verify navigation targets. Use logical CSS directions and stable translation keys. Arabic and Russian are future locales. |
| Service | ID, official name, summary, benefits, visual references, relevant market references, optional published detail link | Exactly the six FR-006 services for launch. Portfolio and facility assessment have dedicated visuals. Validate public text, URLs and linked IDs. |
| Market | Country ID, display name, approved region, optional profile and regulatory/commercial claims, service IDs, map target | Exactly Syria, Iraq, Yemen, Libya and Tunisia as target countries. Profile claims need evidence. Keep approved country labels and contact links available when detailed copy is withheld. |
| Network location and partner | Location ID, Dubai/UAE or Saudi Arabia label, optional partner name, role, cooperation scope, logo and permission | Distinct from target markets. Verify all named partners and logo permissions. Map connections indicate network relationships without implying shipments or offices. |
| Manufacturer, metric and case | Manufacturer and facility scope, imagery and evidence. Metric label, value and scope. Case title, market, services, approach, outcome and confidentiality approval | Each public item needs evidence and permission. Omit an empty optional section and corresponding links. Separate assessed work from certification or endorsement. |
| Claim evidence | Private reference, claim ID, source, geographic and factual scope, verification date, approval and publication status | Record review before publishing. Keep source artifacts and private notes out of emitted page data. |
| Scene and visual asset | Scene ID, section ID, goal and order, visual design, camera and object cue intent, start/end compositions, visual layers, responsive asset variants, dimensions, rights, fallback and load priority | Approach stages ordered Understand, Evaluate, Prepare, Connect, Facilitate. Require final approved assets and static fallbacks in a release build. Reject video and prerecorded frame sequences. |
| Protected contact | Approved alias, internally managed build input, applicable mandatory disclosure fields and approved static locations | Validate the alias and use it as the sole source for the three contact actions. Public normal builds contain obfuscated material only. Validate any legal disclosure exception, exact scope and static locations separately. Local tests use a synthetic alias. |
| Engagement event | Optional approved event name and allowed anonymous properties | Off by default. Allow approved content views or storytelling events only. Exclude personal data, contact interactions and email activity. |

Editorial review transitions: draft → verified → approved → published or withdrawn. Approval
requires supporting rights and authorization. Withdrawn items and incoming public links must
drop from generated output. Launch blockers for required entries are reported without
synthesizing company facts.

Client-only UI state is independent of content: selected market ID, active scene and
presentation mode, and transient contact reveal or copy status. Motion modes are static,
vertical and full. Contact starts unrevealed and reacts only to activation. No persistence,
network or tracking is attached to contact state. See the [UI contracts](contracts/contact-and-motion.md).
