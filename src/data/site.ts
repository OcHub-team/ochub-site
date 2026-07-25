/**
 * Single source of truth for page content. Copy lives here (not scattered
 * across components) so a future ja/zh-Hans pass swaps one module per locale
 * instead of touching markup.
 */

/** Latest OcHub release tag, fetched from GitHub at build time. */
const FALLBACK_VERSION = "0.2.3";

async function fetchLatestVersion(): Promise<string> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/OcHub-team/OcHub/releases/latest",
      {
        headers: { "User-Agent": "ochub-site build" },
        signal: AbortSignal.timeout(4000),
      },
    );
    if (!res.ok) return FALLBACK_VERSION;
    const data = (await res.json()) as { tag_name?: unknown };
    return typeof data.tag_name === "string"
      ? data.tag_name.replace(/^v/, "")
      : FALLBACK_VERSION;
  } catch {
    // Offline or rate-limited build — ship the pinned fallback.
    return FALLBACK_VERSION;
  }
}

export const VERSION = await fetchLatestVersion();

export const LINKS = {
  repo: "https://github.com/OcHub-team/OcHub",
  releases: "https://github.com/OcHub-team/OcHub/releases/latest",
  allReleases: "https://github.com/OcHub-team/OcHub/releases",
  license: "https://github.com/OcHub-team/OcHub/blob/main/LICENSE",
  brewTap: "https://github.com/OcHub-team/homebrew-tap",
  ccSwitch: "https://github.com/farion1231/cc-switch",
  docs: {
    overview: "https://docs.ochub.org/overview",
    install: "https://docs.ochub.org/install",
    architecture: "https://docs.ochub.org/architecture",
    buildFromSource: "https://docs.ochub.org/build-from-source",
  },
} as const;

export const BREW_COMMAND = "brew install --cask ochub-team/tap/ochub";

export const MANAGED_TOOLS = [
  "Claude Code",
  "Claude Desktop",
  "Codex",
  "OpenCode",
  "OpenClaw",
  "Hermes",
] as const;

export interface Capability {
  num: string;
  title: string;
  body: string;
  chips: string[];
}

export const CAPABILITIES: Capability[] = [
  {
    num: "01",
    title: "Providers, one switch away",
    body: "Connections already in a tool's config are picked up automatically. Edit, test, drag to reorder, then switch with one click — the change lands in the tool's own files, immediately.",
    chips: ["auto-discover", "import", "latency test", "drag to reorder"],
  },
  {
    num: "02",
    title: "A relay station on localhost",
    body: "Point supported clients at the built-in gateway and swap upstreams without touching app configs again. Aliases, failover, and health checks included.",
    chips: ["model aliases", "failover", "health checks", "usage accounting"],
  },
  {
    num: "03",
    title: "MCP servers & skills, written once",
    body: "Manage MCP servers and reusable skills centrally, then apply them to any managed client — no more copying JSON between six config files.",
    chips: ["shared servers", "reusable skills", "per-tool apply"],
  },
  {
    num: "04",
    title: "See what your agents did",
    body: "Browse sessions across tools, inspect usage and cost per provider, sync settings, and theme the app itself — operations live here too.",
    chips: ["sessions", "usage & cost", "sync", "themes"],
  },
];

export const RELAY_FEATURES = [
  {
    title: "Model aliases & reasoning mapping",
    body: "Call every model by one name; map reasoning effort per upstream dialect.",
    icon: "swap",
  },
  {
    title: "Failover with health checks",
    body: "Unhealthy upstreams step aside automatically; traffic keeps flowing.",
    icon: "shield",
  },
  {
    title: "Usage accounting built in",
    body: "Every relayed request is metered, per provider and per model.",
    icon: "chart",
  },
] as const;

export const DIAGRAM_CAPTIONS = [
  "model aliases",
  "reasoning mapping",
  "failover",
  "health checks",
  "usage accounting",
] as const;

export interface Platform {
  os: string;
  arch: string;
  files: string[];
}

export const PLATFORMS: Platform[] = [
  { os: "macOS", arch: "Apple Silicon", files: [".dmg · arm64"] },
  { os: "macOS", arch: "Intel", files: [".dmg · x64"] },
  { os: "Windows", arch: "10 / 11 · x64", files: [".exe · NSIS", ".zip · portable"] },
  { os: "Linux", arch: "x64", files: [".AppImage", ".deb"] },
];

export const BAND_FACTS = [
  {
    k: "Interface",
    v: "GPUI",
    d: "Metal shaders on macOS; Wayland and X11 on Linux. The same toolkit Zed ships.",
  },
  {
    k: "Server",
    v: "axum",
    d: "A loopback control API and the relay gateway, in the same process as the app.",
  },
  {
    k: "Storage",
    v: "SQLite",
    d: "Providers, relays, sessions and usage — one directory, ~/.ochub/.",
  },
  {
    k: "Updates",
    v: "Signed",
    d: "Packages verify against a compiled-in key; downgrades are refused. Attestation included.",
  },
] as const;
