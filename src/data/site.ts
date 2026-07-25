/**
 * Locale-independent data: links, release assets, platform matrix.
 * All user-facing copy lives in src/i18n/*.ts — one module per locale.
 */

interface ReleaseAsset {
  name: string;
  url: string;
}

interface ReleaseInfo {
  version: string;
  assets: ReleaseAsset[];
}

const FALLBACK_VERSION = "0.2.3";

/** Latest OcHub release, fetched from GitHub at build time. */
async function fetchRelease(): Promise<ReleaseInfo> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/OcHub-team/OcHub/releases/latest",
      {
        headers: { "User-Agent": "ochub-site build" },
        signal: AbortSignal.timeout(4000),
      },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as {
      tag_name?: unknown;
      assets?: { name?: unknown; browser_download_url?: unknown }[];
    };
    const version =
      typeof data.tag_name === "string"
        ? data.tag_name.replace(/^v/, "")
        : FALLBACK_VERSION;
    const assets = (data.assets ?? [])
      .map((a) => ({ name: String(a.name ?? ""), url: String(a.browser_download_url ?? "") }))
      .filter((a) => a.name && a.url);
    return { version, assets };
  } catch {
    // Offline or rate-limited build — pinned version, no direct asset URLs.
    return { version: FALLBACK_VERSION, assets: [] };
  }
}

const release = await fetchRelease();

export const VERSION = release.version;

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

/** Direct asset URL from the latest release; null when the fetch failed. */
function assetUrl(match: (name: string) => boolean): string | null {
  const hit = release.assets.find(
    (a) => match(a.name) && !a.name.endsWith(".sig"),
  );
  return hit ? hit.url : null;
}

export interface PlatformFile {
  label: string;
  /** Direct download URL, or null to fall back to the releases page. */
  url: string | null;
}

export interface Platform {
  os: string;
  arch: string;
  files: PlatformFile[];
}

export const PLATFORMS: Platform[] = [
  {
    os: "macOS",
    arch: "Apple Silicon",
    files: [
      { label: ".dmg · arm64", url: assetUrl((n) => n.endsWith(".dmg") && n.includes("aarch64")) },
    ],
  },
  {
    os: "macOS",
    arch: "Intel",
    files: [
      { label: ".dmg · x64", url: assetUrl((n) => n.endsWith(".dmg") && n.includes("x64")) },
    ],
  },
  {
    os: "Windows",
    arch: "10 / 11 · x64",
    files: [
      { label: ".exe · NSIS", url: assetUrl((n) => n.endsWith("-setup.exe")) },
      { label: ".zip · portable", url: assetUrl((n) => n.endsWith("_portable.zip")) },
    ],
  },
  {
    os: "Linux",
    arch: "x64",
    files: [
      { label: ".AppImage", url: assetUrl((n) => n.endsWith(".AppImage")) },
      { label: ".deb", url: assetUrl((n) => n.endsWith(".deb")) },
    ],
  },
];
