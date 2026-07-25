# ochub-site

The marketing landing page for [OcHub](https://github.com/OcHub-team/OcHub) —
a native desktop control center for AI coding tools.

Built with **Astro 7 + Vite 8** (the current major — Astro 8 does not exist
yet), TypeScript strict mode, and hand-rolled modern CSS
(`light-dark()`, OKLCH, `color-mix()`). Documentation lives at
[docs.ochub.org](https://docs.ochub.org) (separate Astro site); this page is
the future front door.

## Develop

```sh
pnpm install
pnpm dev        # local dev server
pnpm build      # static output in dist/
pnpm check      # astro check (types) + build
```

pnpm 11 note: `pnpm-workspace.yaml` carries `allowBuilds` for `esbuild` —
without it, install aborts on esbuild's postinstall script.

## Structure

```
src/
├── data/site.ts          # all copy + links + build-time release version fetch
├── styles/global.css     # design tokens (light/dark via color-scheme + light-dark())
├── layouts/BaseLayout.astro  # head, fonts, no-FOUC theme bootstrap
├── components/           # Nav, Hero, AppWindow, Mascot, ToolsStrip,
│                         # Capabilities, Relay, RelayDiagram, NativeBand,
│                         # Download, Migrate, Footer
├── scripts/site.ts       # theme tri-state, reveals, copy, pupils, QA params
└── pages/index.astro
prototype/index.html      # the original single-file design draft (frozen)
```

Conventions:

- **Copy lives in `src/data/site.ts`**, not in markup — a future ja/zh-Hans
  pass swaps one module per locale.
- The release version pill is fetched from the GitHub Releases API at build
  time, with a pinned fallback when offline.
- Fonts are self-hosted via fontsource packages (Space Grotesk, IBM Plex
  Sans, JetBrains Mono); no CDN dependency.
- Scoped component styles are the default; reach into child components with
  `:global()` (see the Mascot styling in Nav/Footer).

## Design system in one paragraph

"Engineered calm": the light theme reuses the app's own warm-sand surface
tokens, the dark theme is a teal-tinted charcoal, and the brand teal
(`#31b8b5`) is reserved as a sharp accent. The hero shows a pure-CSS replica
of the shipped GPUI app window with the robot mascot perched on it — its
pupils follow the cursor (disabled under `prefers-reduced-motion`). Theming
uses `color-scheme` + `light-dark()` with a `data-theme` override; the nav
toggle cycles auto → light → dark and persists to localStorage.

## QA URL parameters

| Parameter | Effect |
| --- | --- |
| `?theme=light\|dark` | Force a theme (default: follow the system). |
| `?only=<section-id>` | Render one section in isolation (`relay`, `native`, `download`, …) — screenshots and design review. |
| `?debug=1` | Write horizontally overflowing elements into `<title>`. |

## Roadmap

- [ ] Trilingual copy (en / ja / zh-Hans) — currently English only
- [ ] Real platform download URLs per release artifact
- [ ] Deploy (GitHub Pages or Cloudflare, next to docs.ochub.org)
