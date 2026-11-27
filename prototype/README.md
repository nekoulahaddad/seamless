# Seamless cinematic review prototype

The prototype is a standalone static Vite build. It uses the approved company content and a demonstration email address. The main website and its publication gates are independent of this build.

## Open the prototype

From the repository root with Node 22 and the root dependencies installed:

```powershell
npm.cmd --prefix prototype ci
npm.cmd --prefix prototype run build
npm.cmd --prefix prototype run preview
```

Open http://127.0.0.1:4181/. To run the packaged build, serve its `site/` directory as the root of any local HTTP server and open that server's URL. Opening the HTML with the `file:` protocol prevents the browser from loading its absolute asset URLs.

## Acceptance criteria

- Desktop Hero wraps to four or five lines at the reference viewport. At 1440 px wide the font is 48.24 px instead of 66.24 px, a 27% reduction. The original art, copy, gold phrase and CTA buttons remain in the composition.
- Expertise contains six service titles and descriptions with no service icons or decorative markers beside entries. The branches illuminate in sequence forward and retract in reverse.
- The original responsive Hero still supplies the vial and cap pixels. The cap lifts from the neck, and reverse scroll removes the moving overlay and restores the original composition. The original capsule and scan timing drive a lightweight SVG projection.
- A single illuminated path progresses through the ten homepage sections. Our Approach tracks five stages with a desktop rail and vertical story. Phones retain vertical scrolling and access to each stage.
- The five markets are operable via the map and the native directory, including keyboard selection and a no-script directory. Regional network locations are presented separately. Why Work With Us uses a restrained reveal and the finale reprises the vial with a consultation CTA.
- Motion is active by default when allowed by the system. There is no manual motion setting. Automatic reduced motion and JavaScript-disabled views retain essential copy, navigation and the static market directory.
- Consultation uses the existing reveal, copy and mailto controls with a demonstration alias. Contact instructions and preview legal text are available in static HTML.

## Visual sources

The approved hero and expert photographs remain. The four additional responsive ImageGen stills are illustrative. `approach` uses laboratory glass and documents, `markets` depicts a satellite-style regional landscape, `network` uses a fictional waterfront, and `finale` reprises the vial and glass dome. The scenes depict no actual company people, facilities, products or named partners.

## Repeat validation

With the preview running:

```powershell
npm.cmd --prefix prototype run typecheck
node prototype/review.mjs
node prototype/review-engines.mjs
node prototype/measure.mjs
```

The Chromium review writes 22 screenshots to `.generated/prototype-review/`. See the [prototype evidence](../specs/001-cinematic-consulting-website/validation/cinematic-prototype.md) for the measured build and validation limits. Final approval is needed before integrating into the main website.
