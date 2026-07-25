# ochub-site

The marketing landing page for [OcHub](https://github.com/OcHub-team/OcHub) —
a native desktop control center for AI coding tools.

Built with **Astro 7 + Vite 8** (the current major — Astro 8 does not exist
yet), TypeScript strict mode, and hand-rolled modern CSS
(`light-dark()`, OKLCH, `color-mix()`). Documentation lives at
[docs.ochub.org](https://docs.ochub.org) (separate Astro site); this page is
the front door.

**Live: https://ochub-team.github.io/ochub-site/** (GitHub Pages, from `main`)

## Develop

```sh
pnpm install
pnpm dev        # local dev server (serves under /ochub-site/, like Pages)
pnpm build      # static output in dist/
pnpm check      # astro check (types) + build
```

Notes:

- pnpm 11: `pnpm-workspace.yaml` carries `allowBuilds` for `esbuild` —
  without it, install aborts on esbuild's postinstall script.
- `astro.config.mjs` sets `base: "/ochub-site"` because the repo deploys as a
  GitHub Pages *project* site. Drop it and update `site` when a custom
  domain gets bound.

## Structure

```
src/
├── i18n/                 # en.ts (canonical shape) + ja.ts + zh.ts,
│                         # index.ts = locale registry & Strings contract
├── data/site.ts          # links, platform matrix, build-time release fetch
├── styles/global.css     # design tokens (light/dark via color-scheme + light-dark())
├── layouts/BaseLayout.astro  # head, fonts, hreflang, no-FOUC theme bootstrap
├── components/           # Landing (shared page body), Nav, Hero, AppWindow,
│                         # Mascot, ToolsStrip, Capabilities, Relay,
│                         # RelayDiagram, NativeBand, Download, Migrate, Footer
├── scripts/site.ts       # theme tri-state, reveals, copy, pupils, locale
│                         # menu, OS-aware CTA, QA params
└── pages/                # index.astro (en) + ja/ + zh/ — thin locale shells
prototype/index.html      # the original single-file design draft (frozen)
```

Conventions:

- **Copy lives in `src/i18n/*.ts`**, one module per locale. `ja.ts`/`zh.ts`
  `satisfy` the English shape — a missing translation is a compile error.
- Routes are thin shells over `Landing.astro`; locale codes match the app
  (`crates/app/i18n`) and docs.ochub.org.
- The release version and the platform download buttons come from the
  GitHub Releases API **at build time** (asset names matched to
  `browser_download_url`s); when the fetch fails, the version falls back to
  a pinned value and buttons fall back to the releases page.
- Fonts are self-hosted via fontsource packages (Space Grotesk, IBM Plex
  Sans, JetBrains Mono); CJK falls back to system Noto Sans.
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

## Deploy

`.github/workflows/deploy.yml` builds `dist/` with pnpm and deploys it to
GitHub Pages (source: GitHub Actions — branch serving can't work here
because `dist/` is gitignored). Redeploy = push to `main`; rebuild to pick
up a new OcHub release = **Actions → Deploy to GitHub Pages → Run
workflow**. Move to Cloudflare next to docs.ochub.org when the apex domain
is ready.
