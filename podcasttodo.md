# Podcast Integration TODO

**Decision:** Conditional — add only as an idle-time/learning drawer, not a permanent operational player.  
**Status:** ✅ Core one-click bank added to the dedicated Onboarding Guide only, 13 September 2026.
**Topic bank:** school IT, edtech, Microsoft 365, library technology, support practice, cybersecurity.

## TODO
- [x] Use the shared 25-episode IT-support Spotify bank for school IT/edtech learning.
- [x] Add a **Learn while idle** dock outside urgent support flows.
- [x] One tap selects/loads another episode; persist recent choices and avoid immediate repeats.
- [x] Use Spotify embed/deep links without assuming autoplay.
- [x] Hide it completely from operational KB, directory, maps/tasks/support and live troubleshooting by restricting it to `/onboarding-guide`.
- [x] Never mix podcast content with internal/private school data; the public catalogue is loaded separately from JoshHub.
- [x] Keep episode data separate from KB content and easy to refresh.
- [x] Shared dock provides mobile/a11y, reduced-motion and persistence behaviour; route-filter regression tests can be added later.

## Implementation
`index.html` loads `podcast-dock-universal.js` with `data-bank="it"` and `data-only-paths="/onboarding-guide"`, so no podcast control appears in operational screens.
