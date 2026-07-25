import type { Strings } from "./index";

/** 日本語 — tone follows docs.ochub.org/ja. */
export default {
  meta: {
    title: "OcHub — すべての AI コーディングツールを、ひとつのハブに",
    description:
      "AI コーディングツールのためのネイティブデスクトップ管理センター。プロバイダーの切り替え、共有機能の管理、ローカルリレーの実行を一か所で。",
  },
  a11y: {
    skipToContent: "本文へスキップ",
    home: "OcHub ホーム",
    primaryNav: "メインナビゲーション",
    language: "言語",
    github: "GitHub リポジトリ",
    copyBrew: "Homebrew コマンドをコピー",
    appWindowAlt:
      "OcHub アプリのウィンドウ: リレーが有効な Claude Code の接続一覧",
    themeLabel: "テーマ",
    themeModes: { auto: "自動", light: "ライト", dark: "ダーク" },
  },
  nav: {
    capabilities: "機能",
    relay: "リレー",
    native: "ネイティブ",
    download: "ダウンロード",
    docs: "ドキュメント",
    cta: "ダウンロード",
  },
  hero: {
    versionSuffix: "プレリリース",
    h1Lead: "あらゆる",
    h1Em: "AI コーディングツール",
    h1Tail: "を、ひとつのハブに。",
    sub: "ワンクリックで API プロバイダーを切り替え、MCP サーバーとスキルをクライアント間で共有し、自分のローカルゲートウェイでトラフィックをリレー。ブラウザシェルも webview もない、高速なネイティブアプリです。",
    ctaMac: "macOS 版をダウンロード",
    ctaWindows: "Windows 版をダウンロード",
    ctaLinux: "Linux 版をダウンロード",
    note: "プレリリース版です — 初回実行前にツールの設定をバックアップしてください。",
  },
  tools: { label: "管理対象" },
  capabilities: {
    eyebrow: "機能",
    h2: "6 つの CLI とあなたの間の、すべて。",
    introHtml:
      "OcHub は各ツールの実設定ファイルを直接読み書きし、自身のデータはこのマシンの <code>~/.ochub/</code> に保存します。localhost の外に出るものはありません。",
    items: [
      {
        title: "プロバイダー、ワンクリックで切り替え",
        body: "ツールの設定にある接続は自動で検出されます。編集、テスト、ドラッグで並び替え、ワンクリックで切り替え — 変更はツール自身のファイルに即座に反映されます。",
        chips: ["auto-discover", "import", "latency test", "drag to reorder"],
      },
      {
        title: "localhost のリレーステーション",
        body: "対応クライアントを組み込みゲートウェイに向ければ、アプリの設定に再び触れることなく上流を切り替えられます。エイリアス、フェイルオーバー、ヘルスチェック内蔵。",
        chips: ["model aliases", "failover", "health checks", "usage accounting"],
      },
      {
        title: "MCP サーバーとスキル、一度書けばどこでも",
        body: "MCP サーバーと再利用可能なスキルを一元管理し、管理下のどのクライアントにも適用できます — 6 つの設定ファイル間で JSON をコピーする必要はもうありません。",
        chips: ["shared servers", "reusable skills", "per-tool apply"],
      },
      {
        title: "エージェントの動きを可視化",
        body: "ツール横断でセッションを閲覧し、プロバイダーごとの使用量とコストを確認。同期やテーマなど、運用もここに集約されています。",
        chips: ["sessions", "usage & cost", "sync", "themes"],
      },
    ],
  },
  relay: {
    eyebrow: "リレーステーション",
    h2: "クライアントとクラウドの間に、localhost を。",
    intro:
      "リレーの適用はクライアントごとに一度だけ。その後のモデルや上流の切り替えは OcHub 内で即時に行われ、クライアントの設定が書き換えられることは二度とありません。",
    feats: [
      {
        title: "モデルエイリアスと reasoning マッピング",
        body: "すべてのモデルをひとつの名前で呼び、上流の方言ごとに reasoning effort をマッピング。",
      },
      {
        title: "ヘルスチェック付きフェイルオーバー",
        body: "不健全な上流は自動的に退避し、トラフィックは流れ続けます。",
      },
      {
        title: "使用量計量を内蔵",
        body: "リレーされたすべてのリクエストが、プロバイダーとモデルごとに計量されます。",
      },
    ],
    diagramAria:
      "図: Claude Code、Codex、OpenCode が localhost 上の OcHub リレーに接続し、Anthropic、OpenAI、Gemini へ転送されます",
    diagramClients: "クライアント",
    diagramUpstreams: "上流",
    diagramApplyOnce: "適用は一度だけ",
    diagramOps: "エイリアス・フェイルオーバー・計量",
    captions: ["モデルエイリアス", "reasoning マッピング", "フェイルオーバー", "ヘルスチェック", "使用量計量"],
  },
  band: {
    eyebrow: "内部構造",
    h2A: "メタルまでネイティブ。",
    h2BLead: "webview は",
    h2BEm: "どこにも",
    h2BTail: "なし。",
    lede: "OcHub は、Zed を支える GPU 加速 UI フレームワーク GPUI の上に、Rust で書かれています。コントロール API とリレーは axum でプロセス内に動作し、状態は SQLite に。瞬時に起動し、アイドル時はほぼ無負荷です。",
    facts: [
      {
        k: "インターフェース",
        v: "GPUI",
        d: "macOS では Metal シェーダー、Linux では Wayland と X11。Zed が採用するのと同じツールキットです。",
      },
      {
        k: "サーバー",
        v: "axum",
        d: "ループバック制御 API とリレーゲートウェイを、アプリと同じプロセスで。",
      },
      {
        k: "ストレージ",
        v: "SQLite",
        d: "プロバイダー、リレー、セッション、使用量 — すべて ~/.ochub/ ひとつのディレクトリに。",
      },
      {
        k: "アップデート",
        v: "署名済み",
        d: "パッケージはバイナリにコンパイルされた鍵で検証され、ダウングレードは拒否されます。アテステーション付き。",
      },
    ],
    no: ["Electron なし", "webview なし", "ブラウザシェルなし", "GPL-3.0-or-later"],
  },
  download: {
    eyebrow: "ダウンロード",
    h2: "すべてのデスクトップに、ネイティブランナーから。",
    subHtml:
      "すべてのタグは対応する GitHub ホストランナーでビルドされ、<span class=\"mono\">SHA256SUMS</span> とアーティファクトアテステーションが付属します。",
    get: "ダウンロード",
    homebrewTitle: "Homebrew",
    homebrewComment: "# Apple Silicon / Intel ビルドを自動選択",
    verifyTitle: "ダウンロードを検証",
    noteHtml:
      "<b>macOS での初回起動:</b> このアプリはまだ公証されていないため、<b>システム設定 › プライバシーとセキュリティ › このまま開く</b> で一度だけ承認してください。アプリ内アップデートに隔離はかかりません — 一度きりの手順です。",
    updateLineHtml:
      "OcHub は起動後にアップデートを確認し、<b>設定 → このアプリについて</b> からその場でインストールできます。署名済みパッケージのみで、新しくないバージョンは拒否されます。<span class=\"mono\">.deb</span> とポータブル ZIP は確認のみ — <span class=\"mono\">apt</span> やファイル構成と競合しないためです。",
  },
  migrate: {
    title: "cc-switch からお乗り換えですか?",
    bodyHtml:
      "一度だけの読み取り専用インポートでプロバイダーを引き継げます。OcHub は <code>~/.ochub/</code> を管理し、<code>~/.cc-switch/</code> には一切書き戻しません — 初回の切り替え前に cc-switch を終了してください。",
    cta: "移行ノートを読む",
  },
  footer: {
    tagline:
      "AI コーディングツールのためのネイティブデスクトップ管理センター。プロバイダーの切り替え、共有機能の管理、ローカルリレーの実行を一か所で。",
    product: "製品",
    project: "プロジェクト",
    language: "言語",
    copyright: "© 2026 OcHub コントリビューター",
    creditLead: "cc-switch にインスパイアされた、GPUI + axum によるゼロからの書き直し。",
    stack: "rust · gpui · axum · sqlite",
  },
} satisfies Strings;
