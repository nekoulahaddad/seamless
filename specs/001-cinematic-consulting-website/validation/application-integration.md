# Cinematic application integration

The owner approved integration on 27 November 2026. The main Vite build renders the approved homepage at `/` from `src/pages/home/cinematic.html` and its build-time renderer. Application and standalone preview share `src/features/cinematic/` and `assets/art/`. The approved alias for the local build is read from the ignored repository-root environment file. Release uses the existing private input and disclosure rules.

Privacy and Terms remain at their existing HTML routes. The main footer links to those routes when approved PDF files have not been configured. Browser branding, static metadata, non-indexable preview policy, and release discovery generation remain wired through the main build.

## Verification

- TypeScript, the main and standalone static builds, the output privacy audit, and 12 unit tests passed.
- 27 Playwright tests passed in Chromium, Firefox and WebKit. Coverage includes the homepage without scripts, section order, the static regional image, menu focus return, reduced motion, stage reversal, legal routes, protected mailto and clipboard feedback.
- The full visual review ran against the main preview. It passed at 360, 390, 768, 1024, 1440 and 1920 pixels. Contact path clearance and the full-screen phone menu passed separate checks. A direct screenshot comparison found the application and standalone Hero pixel-identical at 390 and 1440 pixels with reduced motion.
- The visual review used Chromium’s real clipboard with the configured local alias. Native mail-client launch and physical-device checks remain release verification items.

The integration does not publish the site. The confirmed production origin and the legal and publication approvals in the [release gate](release-gate.md) remain required.
