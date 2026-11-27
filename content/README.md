# Content and release inputs

The application uses the approved cinematic sources and keeps local builds non-indexable. Set `SEAMLESS_CONTACT_ALIAS` in the repository-root `.env.local` to enable contact in local builds. Release contact reads the verified alias in the private release configuration.
Record approval and source evidence before publishing claims. Withdrawn entries must disappear
with dependent navigation links. Do not add real client or facility claims to demo artwork.

For an approved release, supply a private JSON file through SEAMLESS_RELEASE_CONFIG. It contains
profile (name, mission, positioning, logo, HTTPS origin, locale, navigation, privacy, terms,
contactRef set to official-alias, and isPublicationApproved), alias, disclosure (status and
locations), and isArtworkApproved. Where mandatory plaintext disclosure is approved, each
location includes path, elementId, count (1), rationale, approvalReference, and text. A pending
disclosure decision or fixture origin blocks release. Verify all visual rights and explicit
publication approval before setting either approval property.

Analytics is disabled. Never add contact events, fingerprints, tracking pixels or hooks to
the email controls. Any anonymous event consumer requires independent approval.

Browser branding assets live in `assets/brand/` and `assets/favicon.ico`. The card dimensions and alt text live in `content/seo.ts`. Set `profile.origin` to the confirmed public HTTPS origin in private release inputs. The generated `/brand/icon-512.png` can be used for `profile.logo` once approved.
