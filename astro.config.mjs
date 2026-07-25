import { defineConfig } from "astro/config";

// Canonical origin for the future production home of this page. Drives
// canonical URLs and absolute OG URLs. The docs site owns docs.ochub.org;
// this landing page is meant to answer at the apex domain eventually.
export default defineConfig({
  site: "https://ochub.org",
  output: "static",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
});
