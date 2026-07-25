/**
 * English strings — the canonical shape every other locale must satisfy.
 * Fields suffixed with `Html` contain trusted inline markup and are rendered
 * with set:html.
 */
export default {
  meta: {
    title: "OcHub — One hub for every AI coding tool",
    description:
      "A native desktop control center for AI coding tools. Switch providers, manage shared capabilities, and run a local relay from one place.",
  },
  a11y: {
    skipToContent: "Skip to content",
    home: "OcHub home",
    primaryNav: "Primary",
    language: "Language",
    github: "GitHub repository",
    copyBrew: "Copy Homebrew command",
    appWindowAlt:
      "The OcHub app window: Claude Code's connection list with an active relay",
    themeLabel: "Theme",
    themeModes: { auto: "auto", light: "light", dark: "dark" },
  },
  nav: {
    capabilities: "Capabilities",
    relay: "Relay",
    native: "Native",
    download: "Download",
    docs: "Docs",
    cta: "Download",
  },
  hero: {
    versionSuffix: "pre-release",
    h1Lead: "One hub for every",
    h1Em: "AI coding tool",
    h1Tail: " you run.",
    sub: "Switch API providers in one click, share MCP servers and skills across clients, and relay traffic through your own local gateway — from a fast native app. No browser shell, no webview.",
    ctaMac: "Download for macOS",
    ctaWindows: "Download for Windows",
    ctaLinux: "Download for Linux",
    note: "Pre-release software — back up your tool configs before the first run.",
  },
  tools: { label: "Manages" },
  capabilities: {
    eyebrow: "Capabilities",
    h2: "Everything between you and six CLIs.",
    introHtml:
      "OcHub reads and writes each tool's live config directly, and keeps its own data in <code>~/.ochub/</code> on this machine. Nothing leaves localhost.",
    items: [
      {
        title: "Providers, one switch away",
        body: "Connections already in a tool's config are picked up automatically. Edit, test, drag to reorder, then switch with one click — the change lands in the tool's own files, immediately.",
        chips: ["auto-discover", "import", "latency test", "drag to reorder"],
      },
      {
        title: "A relay station on localhost",
        body: "Point supported clients at the built-in gateway and swap upstreams without touching app configs again. Aliases, failover, and health checks included.",
        chips: ["model aliases", "failover", "health checks", "usage accounting"],
      },
      {
        title: "MCP servers & skills, written once",
        body: "Manage MCP servers and reusable skills centrally, then apply them to any managed client — no more copying JSON between six config files.",
        chips: ["shared servers", "reusable skills", "per-tool apply"],
      },
      {
        title: "See what your agents did",
        body: "Browse sessions across tools, inspect usage and cost per provider, sync settings, and theme the app itself — operations live here too.",
        chips: ["sessions", "usage & cost", "sync", "themes"],
      },
    ],
  },
  relay: {
    eyebrow: "Relay station",
    h2: "Put localhost between your clients and the clouds.",
    intro:
      "A relay applies once per client. After that, switching models or upstreams happens inside OcHub and takes effect immediately — the client config is never rewritten again.",
    feats: [
      {
        title: "Model aliases & reasoning mapping",
        body: "Call every model by one name; map reasoning effort per upstream dialect.",
      },
      {
        title: "Failover with health checks",
        body: "Unhealthy upstreams step aside automatically; traffic keeps flowing.",
      },
      {
        title: "Usage accounting built in",
        body: "Every relayed request is metered, per provider and per model.",
      },
    ],
    diagramAria:
      "Diagram: Claude Code, Codex and OpenCode connect to the OcHub relay on localhost, which forwards to Anthropic, OpenAI and Gemini",
    diagramClients: "your clients",
    diagramUpstreams: "upstreams",
    diagramApplyOnce: "apply once",
    diagramOps: "alias · failover · meter",
    captions: ["model aliases", "reasoning mapping", "failover", "health checks", "usage accounting"],
  },
  band: {
    eyebrow: "Under the hood",
    h2A: "Native to the metal.",
    h2BLead: "No",
    h2BEm: "webview",
    h2BTail: " anywhere.",
    lede: "OcHub is written in Rust on GPUI, the GPU-accelerated UI framework behind Zed. The control API and relay run in-process on axum; state lives in SQLite. It starts instantly and idles at almost nothing.",
    facts: [
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
    ],
    no: ["No Electron", "No webview", "No browser shell", "GPL-3.0-or-later"],
  },
  download: {
    eyebrow: "Download",
    h2: "Built on native runners, for every desktop.",
    subHtml:
      "Every tag builds on the matching GitHub-hosted runner and ships with <span class=\"mono\">SHA256SUMS</span> and an artifact attestation.",
    get: "Download",
    homebrewTitle: "Homebrew",
    homebrewComment: "# picks the Apple Silicon or Intel build for you",
    verifyTitle: "Verify a download",
    noteHtml:
      "<b>First launch on macOS:</b> the app isn't notarized yet, so approve it once under <b>System Settings › Privacy &amp; Security › Open Anyway</b>. In-app updates are never quarantined — it's a one-time step.",
    updateLineHtml:
      "OcHub checks for updates after launch and can install them in place from <b>Settings → About</b>. Signed packages only; a version that isn't newer is refused. The <span class=\"mono\">.deb</span> and portable ZIP stay check-only, so they never fight <span class=\"mono\">apt</span> or your file layout.",
  },
  migrate: {
    title: "Coming from cc-switch?",
    bodyHtml:
      "A one-time, read-only import brings your providers over. OcHub owns <code>~/.ochub/</code> and never writes back to <code>~/.cc-switch/</code> — quit cc-switch before your first switch.",
    cta: "Read the migration notes",
  },
  footer: {
    tagline:
      "A native desktop control center for AI coding tools. Switch providers, manage shared capabilities, and run a local relay from one place.",
    product: "Product",
    project: "Project",
    language: "Language",
    copyright: "© 2026 OcHub contributors",
    creditLead: "A from-scratch GPUI + axum rewrite inspired by",
    stack: "rust · gpui · axum · sqlite",
  },
};
