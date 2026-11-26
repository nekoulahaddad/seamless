# Contact and Motion UI Contracts

## Protected contact

The initial HTML provides a Contact destination and instructions. Each protected control has an
accessible name and can be activated by keyboard, pointer or touch. Leave the full address out
of pre-interaction HTML, scripts, metadata, structured data, configuration, maps and downloaded
artifacts, except a narrowly approved mandatory disclosure. Do not export private evidence or
plain configuration in source maps.

| Action or condition | Result |
| --- | --- |
| Email Us | Reconstruct the verified address on activation and call standard `mailto` with the matching recipient. Keep the handoff in the user gesture. The email app owns composition and sending. |
| Reveal Email Address | Reveal one selectable, readable address and expose its availability to assistive technology while keeping focus predictable. |
| Copy Email Address | Attempt clipboard write on activation. Announce success only after it resolves. If unavailable or denied, reveal selectable text and provide manual-copy instructions. |
| No handler | Reveal and copy still function. Never claim a draft opened or a message was sent. |
| Scripts missing | Contact remains reachable and contains readable instructions. The protected actions require scripts. Preserve approved mandatory disclosures. |
| Motion, map or media fails | Contact controls remain functional independently of the cinematic code. |

Activation sends no site request, records no data and adds no analytics. Test the actual
OS handoff on approved representative devices. Client-side concealment does not stop a
determined scraper.

## Scene and device lifecycle

| Mode | Behaviour |
| --- | --- |
| Full | Desktop/laptop and qualified tablet layouts use native scroll, section-bounded visual pins and horizontal scene progression. A timeline maps section position to normalized progress and syncs camera, layers and stage indicator. |
| Vertical | Phones and other tablets preserve ordinary vertical reading and context-specific programmatic motion. A short visual pin needs a documented usability and performance benefit. Horizontal gestures are optional browser behaviour only. |
| Static | Reduced-motion, unsupported capability, failed dependencies or blocked assets leave normal document flow and each essential text section, stage, action and alternative intact. Motion may be disabled by an accessible control, independent of the contact feature. |

The hero, network map, Expertise, five Approach stages, Our Markets and closing scene each own
their scene range, required visual variants and readiness. Initialize motion only when
preferences and prerequisites allow, after static content is usable. Keep nearby assets only
and prefetch at bounded approach points. Scroll position is the input for both directions.
The viewport mode can change with orientation, available space or input. Fall to vertical
when tablet suitability is uncertain. No device telemetry is transmitted.

On leaving a scene or changing mode, stop work, release scene-specific resources and revert styles,
pins, observers and listeners that are no longer applicable. Resizing and preference changes
must preserve focus, the current reading section and anchor access. Keep the document order
independent of visual layering and ensure sticky navigation does not obscure focus. Programmatic
enhancement may never trap the scroll. No prerecorded video or frame sequences.
