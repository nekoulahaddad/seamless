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
or links to omitted publication content. Audit the actual response as well if a CDN is enabled.

## Website validation

| Scenario | Steps and expected result |
| --- | --- |
| Static shell | Disable JavaScript. Open the homepage and both legal pages. Find the approved headings, service and country text, contact instructions and legal links in initial HTML. Verify sitemap, robots, canonical and page metadata. |
| Full motion | Use desktop and qualifying tablet. Scroll through all six service panels and five approach stages in both directions. Verify progress, coherent transitions, scene return, keyboard exit and no trap. Check all required assets against approved scene briefs. |
| Vertical and static | Use physical phone and tablet with rotation and changed input or viewport, block media, then toggle reduced motion. Check semantic order, selectable country information, focus, stable layout and all actions. |
| Contact | With cinematic assets blocked, use each protected control. Check native mailto on desktop and phone with configured handlers, no-handler fallback, clipboard denial, manual copying and accessible result feedback. Verify no contact network requests and scan final responses for plaintext alias exposure before activation. |
| Accessibility | Run automated axe checks and manually exercise keyboard, zoom/reflow, contrast, visible focus and representative screen reader paths. Check no obscured focus under sticky navigation and no forced animations when reduced motion is enabled. |
| Privacy and editorial | Review site output and deployed policies against approvals. Fixtures without partners, manufacturers, metrics or cases must omit the relevant links and unapproved claims. Verify optional analytics is off unless approved and never measures contact. |
| Performance | Run three cold Lighthouse passes on recorded mobile and desktop profiles. Capture real-device interaction and scene traces, repeated transition memory evidence, and network waterfalls. Compare with [plan budgets](plan.md#proposed-release-budgets). Record missing field data explicitly. |

Use [public page](contracts/public-pages.md) and [contact and motion](contracts/contact-and-motion.md)
contracts for exact behaviour. Capture report links and describe device, OS, browser,
viewport, network, tool versions and configuration. If an edge rule is proposed, compare
with it disabled and verify real crawler access after deployment on the approved origin.
