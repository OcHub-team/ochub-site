# ochub-site

The marketing landing page for [OcHub](https://github.com/OcHub-team/OcHub) —
a native desktop control center for AI coding tools.

Current state: **design prototype**, under review before production rollout.
Documentation lives at [docs.ochub.org](https://docs.ochub.org) (separate
Astro site); this page is the future front door.

## View it

The page is a single self-contained `index.html` — no build step, no
dependencies to install (webfonts load from jsDelivr):

```sh
open index.html
```

| URL parameter | Effect |
| --- | --- |
| `?theme=light\|dark` | Force a theme (default: follow the system). The nav toggle still cycles auto → light → dark. |
| `?only=<section-id>` | Render one section in isolation (`relay`, `native`, `download`, …) — handy for screenshots and design review. |
| `?debug=1` | Write horizontally overflowing elements into `<title>` for layout debugging. |

## Design system in one paragraph

"Engineered calm": the light theme reuses the app's own warm-sand surface
tokens, the dark theme is a teal-tinted charcoal, and the brand teal
(`#31b8b5`) is reserved as a sharp accent. Space Grotesk for display, IBM
Plex Sans for body, JetBrains Mono for code. The hero shows a pure-CSS
replica of the shipped GPUI app window with the robot mascot perched on it —
its pupils follow the cursor (disabled under `prefers-reduced-motion`).
Theming uses `color-scheme` + `light-dark()` with a `data-theme` override.

## Roadmap

- [ ] Design review of the prototype
- [ ] Trilingual copy (en / ja / zh-Hans) — currently English only
- [ ] Wire download buttons to GitHub Releases (build-time version fetch)
- [ ] Decide: keep as a static page and deploy (GitHub Pages / Cloudflare),
      or port the design into the Astro docs site as its new home page
