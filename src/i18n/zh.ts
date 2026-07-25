import type { Strings } from "./index";

/** 简体中文 — tone follows the app's zh-Hans strings. */
export default {
  meta: {
    title: "OcHub — 你的每一款 AI 编程工具,汇聚于一个枢纽",
    description:
      "面向 AI 编程工具的原生桌面控制中心。切换服务商、管理共享能力、运行本地中转,都在一个地方完成。",
  },
  a11y: {
    skipToContent: "跳到正文",
    home: "OcHub 首页",
    primaryNav: "主导航",
    language: "语言",
    github: "GitHub 仓库",
    copyBrew: "复制 Homebrew 命令",
    appWindowAlt: "OcHub 应用窗口:Claude Code 的连接列表,当前使用中转",
    themeLabel: "主题",
    themeModes: { auto: "自动", light: "浅色", dark: "深色" },
  },
  nav: {
    capabilities: "能力",
    relay: "中转",
    native: "原生",
    download: "下载",
    docs: "文档",
    cta: "下载",
  },
  hero: {
    versionSuffix: "预发布",
    h1Lead: "你的每一款",
    h1Em: "AI 编程工具",
    h1Tail: ",汇聚于一个枢纽。",
    sub: "一键切换 API 服务商,跨客户端共享 MCP 服务器和 Skills,流量经由你自己的本地网关中转——来自一个快速的原生应用。没有浏览器壳,没有 webview。",
    ctaMac: "下载 macOS 版",
    ctaWindows: "下载 Windows 版",
    ctaLinux: "下载 Linux 版",
    note: "预发布软件——首次运行前请备份你的工具配置。",
  },
  tools: { label: "可管理" },
  capabilities: {
    eyebrow: "能力",
    h2: "你与六个 CLI 之间的一切。",
    introHtml:
      "OcHub 直接读写每个工具的实际配置,并把自己的数据保存在本机 <code>~/.ochub/</code>。没有任何东西离开 localhost。",
    items: [
      {
        title: "服务商,一键切换",
        body: "工具配置里已有的连接会被自动识别。编辑、测试、拖拽排序,然后一键切换——变更立即写入工具自己的文件。",
        chips: ["auto-discover", "import", "latency test", "drag to reorder"],
      },
      {
        title: "localhost 上的中转站",
        body: "把支持的客户端指向内置网关,之后更换上游无需再动应用配置。别名、故障转移、健康检查一应俱全。",
        chips: ["model aliases", "failover", "health checks", "usage accounting"],
      },
      {
        title: "MCP 服务器与 Skills,一次编写",
        body: "集中管理 MCP 服务器和可复用的 Skills,应用到任意受管客户端——不必再在六个配置文件之间复制 JSON。",
        chips: ["shared servers", "reusable skills", "per-tool apply"],
      },
      {
        title: "看清 Agent 的一举一动",
        body: "跨工具浏览会话,按服务商检查用量与成本,同步设置、更换主题——运维也在这里。",
        chips: ["sessions", "usage & cost", "sync", "themes"],
      },
    ],
  },
  relay: {
    eyebrow: "中转站",
    h2: "把 localhost 放在客户端与云端之间。",
    intro:
      "中转只需对每个客户端应用一次。此后切换模型或上游都在 OcHub 内立即生效——客户端配置再也不会被改写。",
    feats: [
      {
        title: "模型别名与推理映射",
        body: "用一个名字调用所有模型;按上游方言映射推理强度。",
      },
      {
        title: "带健康检查的故障转移",
        body: "不健康的上游自动让位,流量持续不断。",
      },
      {
        title: "内置用量统计",
        body: "每一个中转请求都按服务商和模型计量。",
      },
    ],
    diagramAria:
      "示意图:Claude Code、Codex、OpenCode 连接到 localhost 上的 OcHub 中转,再转发到 Anthropic、OpenAI 和 Gemini",
    diagramClients: "你的客户端",
    diagramUpstreams: "上游",
    diagramApplyOnce: "只需应用一次",
    diagramOps: "别名·故障转移·计量",
    captions: ["模型别名", "推理映射", "故障转移", "健康检查", "用量统计"],
  },
  band: {
    eyebrow: "底层",
    h2A: "原生到底层。",
    h2BLead: "哪里都没有",
    h2BEm: "webview",
    h2BTail: "。",
    lede: "OcHub 用 Rust 编写,基于 GPUI——Zed 背后的 GPU 加速 UI 框架。控制 API 与中转在进程内运行于 axum 之上,状态存于 SQLite。瞬时启动,空闲几乎零占用。",
    facts: [
      {
        k: "界面",
        v: "GPUI",
        d: "macOS 上的 Metal 着色器;Linux 上的 Wayland 与 X11。与 Zed 同款工具包。",
      },
      {
        k: "服务器",
        v: "axum",
        d: "回环控制 API 与中转网关,与应用同进程。",
      },
      {
        k: "存储",
        v: "SQLite",
        d: "服务商、中转、会话与用量——都在 ~/.ochub/ 一个目录。",
      },
      {
        k: "更新",
        v: "签名",
        d: "安装包依据编译进二进制的密钥校验,拒绝降级。附带来源证明(attestation)。",
      },
    ],
    no: ["无 Electron", "无 webview", "无浏览器壳", "GPL-3.0-or-later"],
  },
  download: {
    eyebrow: "下载",
    h2: "原生 Runner 构建,覆盖每个桌面平台。",
    subHtml:
      "每个版本标签都在对应的 GitHub 托管 Runner 上构建,并附带 <span class=\"mono\">SHA256SUMS</span> 与工件来源证明。",
    get: "下载",
    homebrewTitle: "Homebrew",
    homebrewComment: "# 自动选择 Apple Silicon 或 Intel 构建",
    verifyTitle: "验证下载",
    noteHtml:
      "<b>macOS 首次启动:</b>应用尚未经过 Apple 公证,请在<b>系统设置 › 隐私与安全性 › 仍要打开</b>中批准一次。应用内更新不会被隔离——这只是一次性步骤。",
    updateLineHtml:
      "OcHub 启动后会检查更新,并可在<b>设置 → 关于</b>中就地安装。仅接受签名包;不比当前新的版本会被拒绝。<span class=\"mono\">.deb</span> 与便携 ZIP 仅检查不安装,以免与 <span class=\"mono\">apt</span> 或你的文件布局冲突。",
  },
  migrate: {
    title: "从 cc-switch 迁移?",
    bodyHtml:
      "一次性只读导入即可迁来你的服务商。OcHub 拥有 <code>~/.ochub/</code>,绝不回写 <code>~/.cc-switch/</code>——首次切换前请先退出 cc-switch。",
    cta: "阅读迁移说明",
  },
  footer: {
    tagline:
      "面向 AI 编程工具的原生桌面控制中心。切换服务商、管理共享能力、运行本地中转,都在一个地方完成。",
    product: "产品",
    project: "项目",
    language: "语言",
    copyright: "© 2026 OcHub 贡献者",
    creditLead: "受 cc-switch 启发,使用 GPUI + axum 从零重写。",
    stack: "rust · gpui · axum · sqlite",
  },
} satisfies Strings;
