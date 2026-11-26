# Public Pages and Static Output Contract

| URL or interface | Expected behaviour |
| --- | --- |
| `/` | Initial HTML supplies the approved narrative, status-independent reading order, landmarks, native section links, market summaries and Contact instructions. |
| `/privacy/`, `/terms/` | Static approved policy documents with canonical URLs and navigation back to the site. Any mandatory plaintext contact disclosure is restricted to the location specifically approved by the company. |
| `/robots.txt`, `/sitemap.xml` | Published from the site origin and route manifest. Include canonical launch routes in the sitemap and allow discovery of public pages and assets. Staging is kept out of the production versions. |
| Market navigation | Native links target stable country IDs within the homepage. An enhanced SVG map can activate the same targets and reflect selection. Region, country and partnership location remain understandable independently of colour and motion. |
| Page metadata | Unique title, description, canonical and Open Graph fields. Add accurate applicable structured data based on approved content. Never inject the protected email address into hidden structured metadata as a fallback. |

For each public HTML route verify status, content type, canonical, links and essential visible
content with scripts disabled. Use semantic headings, skip navigation, a reserved layout for key
visuals and a static alternative adjacent to any visual-only enhancement. Ship no runtime route
handlers or app shell fallback. Invalid paths return a genuine 404. Assets and documents use
HTTPS, with cache policies appropriate for hashed assets and updateable HTML. The deployment
contains only the approved static artifact.

Navigation and service links that point to unpublished content must be absent. Release builds
must use a verified production origin. Local or staging fixture builds must never be published
as production.
