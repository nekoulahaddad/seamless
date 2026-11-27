# Seamless cinematic review prototype

This standalone static Vite build runs the revised cinematic journey. The approved hero, expert capsule and six-service sequence lead to the redesigned Approach timeline, unified regional map, differentiators and final contact scene.

## Open locally

From the repository root with Node 22 and the root dependencies installed:

```powershell
npm.cmd --prefix prototype ci
npm.cmd --prefix prototype run build
npm.cmd --prefix prototype run preview
```

Open http://127.0.0.1:4181/. To run the review archive, extract it and serve its `site/` directory as the local HTTP root.

## Contact and legal configuration

The preview uses no demonstration address. Set `SEAMLESS_CONTACT_ALIAS` in the repository-root `.env.local` or the build environment to the confirmed company address before building. The setting is loaded by the prototype build. The Email Us and Copy Email Address controls reconstruct it on activation. The address can be recovered by a determined scraper. With the alias missing, the controls are disabled without a persistent message.

The build displays links to existing approved PDFs only. See [footer document setup](legal/README.md). The approved Privacy Policy and Terms & Conditions PDFs are outstanding publication inputs.

## Visual and geographic sources

The supplied reference layouts determine the responsive compositions. The approved hero and expert photographs remain. The closing ImageGen still reprises the vial with an Earth horizon. The phone crop emphasizes the horizon.

The shared SVG tracks the five Approach stages horizontally on desktop and vertically on mobile. Regional Connectivity displays one static image using [Natural Earth boundaries](https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/) and [populated places](https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-populated-places/), NASA [Blue Marble terrain](https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-topography/) and [Black Marble night lights](https://science.nasa.gov/earth/earth-observatory/earth-at-night/maps/). Natural Earth supplies de facto boundaries. The gold curves are illustrative. The 3,840 px master and dedicated compact WebP use a navy feather to blend into the page. The generation tools run offline with PyShp, Shapely, NumPy and Pillow, using imagery downloaded once from the cited sources.

## Repeat validation

```powershell
node prototype/review.mjs
node prototype/review-engines.mjs
node prototype/review-layouts.mjs
node prototype/review-about.mjs
node prototype/review-mobile-menu.mjs
node prototype/review-contact-path.mjs
node prototype/measure.mjs
```

The checks cover the existing animations, reverse path, responsive stage placement, static regional image sizes, contact with a test-only alias, automatic reduced motion, and six reference widths. The [redesign evidence](../specs/001-cinematic-consulting-website/validation/static-connectivity-contact-about.md) records results and outstanding release inputs. The owner approved integration on 27 November 2026. The standalone preview now renders the same homepage and motion source as the application.
