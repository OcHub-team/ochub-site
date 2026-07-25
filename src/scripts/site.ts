/**
 * Client-side behavior for the landing page. Bundled by Astro/Vite.
 * Everything here is progressive enhancement — the page renders and reads
 * fully without it.
 */

type ThemeMode = "auto" | "light" | "dark";

const root = document.documentElement;
const params = new URLSearchParams(location.search);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- theme: auto / light / dark ---------- */

function initTheme(): void {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;
  const icons = new Map<ThemeMode, HTMLElement>();
  document.querySelectorAll<HTMLElement>("[data-theme-icon]").forEach((el) => {
    icons.set(el.dataset.themeIcon as ThemeMode, el);
  });
  const order: ThemeMode[] = ["auto", "light", "dark"];
  let mode: ThemeMode = "auto";

  const apply = (next: ThemeMode): void => {
    mode = next;
    if (mode === "auto") {
      root.removeAttribute("data-theme");
      try { localStorage.removeItem("ochub-theme"); } catch { /* private mode */ }
    } else {
      root.setAttribute("data-theme", mode);
      try { localStorage.setItem("ochub-theme", mode); } catch { /* private mode */ }
    }
    icons.forEach((el, key) => {
      el.style.display = key === mode ? "block" : "none";
    });
    toggle.setAttribute("aria-label", `Theme: ${mode}`);
    toggle.setAttribute("title", `Theme: ${mode}`);
  };

  const param = params.get("theme");
  let stored: string | null = null;
  try { stored = localStorage.getItem("ochub-theme"); } catch { /* private mode */ }
  apply(
    param === "light" || param === "dark"
      ? param
      : stored === "light" || stored === "dark"
        ? stored
        : "auto",
  );

  toggle.addEventListener("click", () => {
    apply(order[(order.indexOf(mode) + 1) % order.length]);
  });
}

/* ---------- design-review helpers: ?only=<id> and ?debug=1 ---------- */

function isolateSection(): boolean {
  const only = params.get("only");
  if (!only) return false;
  document.querySelectorAll<HTMLElement>("main > section").forEach((s) => {
    if (s.id !== only) s.style.display = "none";
  });
  document
    .querySelectorAll<HTMLElement>(".nav-links, .hero .version-pill")
    .forEach((n) => {
      n.style.visibility = "hidden";
    });
  return true;
}

function initDebug(): void {
  if (!params.get("debug")) return;
  window.addEventListener("load", () => {
    const wide: string[] = [];
    document.querySelectorAll<HTMLElement>("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > window.innerWidth + 1) {
        const cls = el instanceof SVGElement ? "(svg)" : String(el.className).split(" ")[0];
        wide.push(`${el.tagName.toLowerCase()}.${cls}=${Math.round(r.width)}`);
      }
    });
    document.title = `vw=${window.innerWidth} WIDE: ${wide.slice(0, 10).join(" | ")}`;
  });
}

/* ---------- OS-aware primary CTA ---------- */

function initOsCta(): void {
  const label = document.getElementById("osCtaLabel");
  if (!label) return;
  const ua = navigator.userAgent || "";
  if (/Windows/i.test(ua)) label.textContent = "Download for Windows";
  else if (/Android|Linux/i.test(ua) && !/Mac/i.test(ua)) label.textContent = "Download for Linux";
}

/* ---------- copy buttons ---------- */

function initCopy(): void {
  document.querySelectorAll<HTMLElement>("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const done = (): void => {
        btn.style.color = "var(--teal-ink)";
        setTimeout(() => {
          btn.style.color = "";
        }, 1200);
      };
      const text = btn.dataset.copy ?? "";
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
      else done();
    });
  });
}

/* ---------- scroll reveals ---------- */

function initReveals(isolated: boolean): void {
  const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (isolated || reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- mascot pupils follow the cursor ---------- */

function initPupils(): void {
  const mascot = document.getElementById("mascot");
  const pupils = document.querySelector<SVGGElement>("[data-pupils]");
  if (!mascot || !pupils || reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

  let tx = 0, ty = 0, cx = 0, cy = 0, raf: number | null = null;
  const tick = (): void => {
    cx += (tx - cx) * 0.14;
    cy += (ty - cy) * 0.14;
    pupils.setAttribute("transform", `translate(${cx.toFixed(2)} ${cy.toFixed(2)})`);
    if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) raf = requestAnimationFrame(tick);
    else raf = null;
  };
  window.addEventListener(
    "pointermove",
    (e) => {
      const r = mascot.getBoundingClientRect();
      const mx = r.left + r.width / 2;
      const my = r.top + r.height / 2;
      const dx = e.clientX - mx;
      const dy = e.clientY - my;
      const len = Math.hypot(dx, dy) || 1;
      const max = 5.5;
      tx = Math.max(-max, Math.min(max, (dx / len) * Math.min(max, len / 60)));
      ty = Math.max(-max, Math.min(max, (dy / len) * Math.min(max, len / 60)));
      if (!raf) raf = requestAnimationFrame(tick);
    },
    { passive: true },
  );
}

initTheme();
const isolated = isolateSection();
initDebug();
initOsCta();
initCopy();
initReveals(isolated);
initPupils();
