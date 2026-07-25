import { defineConfig } from "astro/config";

// Canonical origin — drives canonical URLs, hreflang, and absolute OG URLs.
// Currently the GitHub Pages host; flip both fields when a custom domain
// (e.g. ochub.org, next to docs.ochub.org) gets bound.
export default defineConfig({
  site: "https://ochub-team.github.io",
  // The repo deploys as a GitHub Pages *project* site under this subpath.
  base: "/ochub-site",
  output: "static",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
});
