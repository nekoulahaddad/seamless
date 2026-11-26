# Quickstart Validation Guide

Run this guide after the implementation phase produces the build and test scripts. This plan
does not create application files. The commands below define the expected project entry points.
Use a supported Node LTS meeting the pinned build-tool requirement, npm, a browser with dev
tools, and a representative phone/tablet. Use a synthetic address and fixture content during
local QA. Use the company-approved alias, origin, disclosures and final assets for production QA.

## Build and serve

```powershell
npm ci
npx playwright install chromium firefox webkit
npm run typecheck
npm run test:unit
npm run build
npm run audit:dist
npm run test:e2e
npm run preview -- --host 127.0.0.1
```

Use the preview URL printed by the script. Run the e2e runner against the preview of the built
artifact. For production parity repeat relevant checks on approved HTTPS staging. Expected:
all commands pass, build emits only static files into `dist/`, and the output audit reports
no unapproved source disclosures, exposed credentials, video assets, runtime route handlers,
or links to omitted publication content. Audit the actual served responses for every release candidate, including the CDN-disabled baseline.

## Website validation

| Scenario | Steps and expected result |
| --- | --- |
| Static shell | Disable JavaScript. Open the homepage and both legal pages. Find the approved headings, service and country text, contact instructions and legal links in initial HTML. Verify sitemap, robots, canonical and page metadata. |
| Homepage integration | With JavaScript enabled and disabled, verify FR-001 section order, all required sections, and the Global Market Connections fallback. In enabled motion modes verify each entry point activates and reverses. Check that Why Work With Us remains readable with motion disabled. |
| Full motion | Use desktop and qualifying tablet. Scroll through all six service panels and five approach stages in both directions. Verify progress, coherent transitions, scene return, keyboard exit and no trap. Check all required assets against approved scene briefs. |
| Vertical and static | Use physical phone and tablet with rotation and changed input or viewport, block media, then toggle reduced motion. Check semantic order, selectable country information, focus, stable layout and all actions. |
| Contact | With cinematic assets blocked, use each protected control. Check native mailto on desktop and phone with configured handlers, no-handler fallback, clipboard denial, manual copying and accessible result feedback. Verify no contact network requests and scan final responses for plaintext alias exposure before activation. |
| Accessibility | Run automated axe checks and manually exercise keyboard, zoom/reflow, contrast, visible focus and representative screen reader paths. Check no obscured focus under sticky navigation and no forced animations when reduced motion is enabled. |
| Privacy and editorial | Review site output and deployed policies against approvals. With scripts disabled, locate and read all approved UK disclosures at the required locations. Fixtures without partners, manufacturers, metrics or cases must omit the relevant links and unapproved claims. Verify optional analytics is off unless approved and never measures contact. |
| Performance | Run three cold Lighthouse passes on each recorded profile plus the five cold and five warm interaction journeys per device in the [plan protocol](plan.md#pre-release-interaction-responsiveness). Record action latency and local journey INP, field data availability, trace and memory evidence, and Lighthouse TBT separately. Use `validation/performance.md` for results. |

## Served release verification

- Audit deployed HTML, JavaScript (including lazy chunks), metadata, structured data, public
  configuration, source maps and downloadable assets. Inventory the deployed artifact and fetch
  corresponding responses before any contact interaction. Compare them with the [exact disclosure
  allowlist](contracts/contact-and-motion.md#mandatory-disclosure-allowlist). Test on an authorized
  release-candidate deployment with mitigation off even when no CDN is planned. If approved
  mitigation is enabled on the public path, repeat there. Record inventory, configuration,
  masked findings and evidence in `validation/served-output-security.md`.
- Validate approved HTTPS public routes and assets, HTTP redirect where applicable, HTML
  revalidation or no-store, hashed asset cache headers, actual missing-route and missing-asset
  404s, and public response content types. Record URLs, status, headers and configuration in
  `validation/hosting.md`. See [public page contract](contracts/public-pages.md).

## Five-participant acceptance checks

Recruit five representative first-time visitors. Give neutral prompts and no assistance before
scoring. Record pseudonymous participant IDs, device, timing, pass/fail and short observations in
`validation/participant-acceptance.md`. Use desktop and phone for SC-002 and SC-005, and give
all five the desktop motion journey for the SC-003 narrative check.

| Criterion | Pass rule per participant | Group threshold |
| --- | --- | --- |
| SC-001 | Within 15 seconds of viewing the homepage, identify that the firm helps international pharmaceutical manufacturers enter emerging Arab markets. | At least 4 of 5 |
| SC-002 | Within 60 seconds, find a service, select a target country and locate the consultation action. | At least 4 of 5 |
| SC-003 | After the five-stage experience, explain the journey from portfolio review to facilitating market entry and recognize the opening/closing vial connection. Both elements are required. | At least 4 of 5 |
| SC-005 | Within 60 seconds, find Contact and copy the correct address or open a correctly addressed draft without sending it. | At least 4 of 5 |

Start timing when the page is usable for the first check or when the task prompt ends for later
checks. Score before prompting or debriefing. Record all five results for each criterion and retain
separate technical checks for motion, devices and accessibility. Pending or fewer than five results
do not qualify as a pass. Rerun failed criteria on a corrected candidate with first-time participants.

Use [public page](contracts/public-pages.md) and [contact and motion](contracts/contact-and-motion.md)
contracts for exact behaviour. Capture report links and describe device, OS, browser,
viewport, network, tool versions and configuration. If an edge rule is proposed, compare
with it disabled and verify real crawler access after deployment on the approved origin.
