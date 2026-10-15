/* ==========================================================
   Aquatica — shared behaviour for every page
   ========================================================== */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const PAGES = [
    { href: "index.html", label: "Home" },
    { href: "projects.html", label: "Projects" },
    { href: "statistics.html", label: "Statistics" },
    { href: "awareness.html", label: "Awareness" },
    { href: "team.html", label: "Team" },
    { href: "goals.html", label: "Goals" },
  ];

  const LOGO = `<svg viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6ee7f9"/><stop offset="1" stop-color="#2ec4b6"/></linearGradient></defs><path d="M24 3C24 3 9 20 9 30a15 15 0 0 0 30 0C39 20 24 3 24 3z" fill="url(#lg)"/><path d="M15 31c3 3 6 3 9 0s6-3 9 0" stroke="#02223f" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="19" cy="22" r="2.4" fill="#e6fbff" opacity=".8"/></svg>`;

  const FISH = `<svg viewBox="0 0 100 50" aria-hidden="true"><g class="tail"><path d="M18 25 L0 8 L4 25 L0 42 Z" fill="currentColor" opacity=".85"/></g><ellipse cx="55" cy="25" rx="40" ry="18" fill="currentColor"/><path d="M45 8 Q55 0 66 8" fill="currentColor" opacity=".7"/><path d="M38 14 Q42 25 38 36" stroke="rgba(0,0,0,.18)" stroke-width="3" fill="none"/><circle cx="80" cy="20" r="4.5" fill="#fff"/><circle cx="81.5" cy="20" r="2.3" fill="#012"/></svg>`;

  const JELLY = `<svg viewBox="0 0 60 90" aria-hidden="true"><g class="bell"><path d="M5 30 Q5 2 30 2 Q55 2 55 30 Q48 26 42 30 Q36 26 30 30 Q24 26 18 30 Q12 26 5 30Z" fill="currentColor" opacity=".8"/></g><g stroke="currentColor" stroke-width="2" fill="none" opacity=".7"><path d="M14 31 q-4 14 2 26 t-2 28"/><path d="M24 31 q4 14 -2 26 t2 26"/><path d="M36 31 q-4 14 2 26 t-2 24"/><path d="M46 31 q4 14 -2 26 t2 28"/></g></svg>`;

  /* ---------- Chrome: header, footer, ambient layers ---------- */
  function currentPage() {
    const file = location.pathname.split("/").pop() || "index.html";
    return file === "" ? "index.html" : file;
  }

  function buildHeader() {
    const header = document.getElementById("site-header");
    if (!header) return;
    const here = currentPage();
    header.className = "site-header";
    header.innerHTML = `
      <nav class="nav" aria-label="Main">
        <a class="brand" href="index.html">${LOGO}<span>Aquatica</span></a>
        <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span></button>
        <ul class="nav-links" id="nav-links">
          ${PAGES.map((p) => `<li><a href="${p.href}"${p.href === here ? ' aria-current="page"' : ""}>${p.label}</a></li>`).join("")}
        </ul>
      </nav>`;
    const toggle = header.querySelector(".nav-toggle");
    const links = header.querySelector(".nav-links");
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      links.classList.toggle("open", !open);
    });
  }

  function buildFooter() {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="footer-inner">
        <div>
          <a class="brand" href="index.html">${LOGO}<span>Aquatica</span></a>
          <p style="color:var(--text-dim);margin-top:12px;max-width:420px">Protecting rivers, lakes, aquifers and oceans — because every drop is connected. From the mountain spring to the deep sea.</p>
        </div>
        <div><h4>Explore</h4><ul>${PAGES.map((p) => `<li><a href="${p.href}">${p.label}</a></li>`).join("")}</ul></div>
        <div><h4>Take action</h4><ul>
          <li><a href="awareness.html#pledge">Take the pledge</a></li>
          <li><a href="awareness.html#quiz">Ocean quiz</a></li>
          <li><a href="statistics.html#calculator">Water footprint</a></li>
          <li><a href="team.html#join">Volunteer</a></li>
        </ul></div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} Aquatica. Every drop counts.</span><span>Aligned with UN SDG 6 (Clean Water) &amp; SDG 14 (Life Below Water)</span></div>`;
  }

  function buildOcean() {
    const ocean = document.createElement("div");
    ocean.className = "ocean";
    ocean.setAttribute("aria-hidden", "true");
    ocean.innerHTML = `<div class="rays"><span></span><span></span><span></span><span></span><span></span></div><div class="caustics"></div><div class="fish-school"></div>`;
    document.body.prepend(ocean);

    const canvas = document.createElement("canvas");
    canvas.id = "ocean-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);

    // Swaying kelp along the seabed
    const seabed = document.createElement("div");
    seabed.className = "seabed";
    seabed.setAttribute("aria-hidden", "true");
    const kelpColors = ["#2f8f5b", "#3fa66b", "#246b47", "#52b788"];
    let kelpHtml = "";
    const count = Math.max(6, Math.round(window.innerWidth / 110));
    for (let i = 0; i < count; i++) {
      const h = 80 + Math.random() * 90;
      const c = kelpColors[i % kelpColors.length];
      kelpHtml += `<svg class="kelp" style="left:${(i / count) * 100 + Math.random() * 4}%;height:${h}px;--dur:${4 + Math.random() * 4}s;animation-delay:-${Math.random() * 5}s" viewBox="0 0 40 160" preserveAspectRatio="none"><path d="M20 160 C 6 130, 34 110, 18 80 S 30 30, 20 0" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="27" cy="110" rx="8" ry="4" fill="${c}"/><ellipse cx="12" cy="60" rx="8" ry="4" fill="${c}"/><ellipse cx="26" cy="30" rx="7" ry="3.5" fill="${c}"/></svg>`;
    }
    seabed.innerHTML = kelpHtml;
    document.body.append(seabed);

    // Jellyfish drifting upward
    if (!reduceMotion) {
      for (let i = 0; i < 2; i++) {
        const j = document.createElement("div");
        j.className = "jelly";
        j.style.left = 10 + Math.random() * 80 + "%";
        j.style.setProperty("--dur", 38 + Math.random() * 20 + "s");
        j.style.animationDelay = `-${Math.random() * 40}s`;
        j.style.color = ["#f7a8ff", "#a8c8ff", "#ffc6e0"][i % 3];
        j.innerHTML = JELLY;
        ocean.append(j);
      }
    }
    return { canvas, school: ocean.querySelector(".fish-school") };
  }

  /* ---------- Swimming fish ---------- */
  const FISH_COLORS = ["#f6d68f", "#ff9f80", "#6ee7f9", "#ffd166", "#9ef0c4", "#ff7b6b", "#b8a7ff"];
  function spawnFish(school) {
    const fish = document.createElement("div");
    const leftward = Math.random() < 0.5;
    const size = 30 + Math.random() * 50;
    fish.className = "fish" + (leftward ? " left" : "");
    fish.style.top = 8 + Math.random() * 80 + "%";
    fish.style.setProperty("--size", size + "px");
    fish.style.setProperty("--c", FISH_COLORS[Math.floor(Math.random() * FISH_COLORS.length)]);
    fish.style.setProperty("--dur", 18 + Math.random() * 22 + "s");
    fish.style.setProperty("--bob", (Math.random() * 50 - 25).toFixed(0) + "px");
    fish.style.setProperty("--from", leftward ? "calc(100vw + 20px)" : `-${size + 20}px`);
    fish.style.setProperty("--to", leftward ? `-${size + 20}px` : "calc(100vw + 20px)");
    fish.style.opacity = (0.45 + Math.random() * 0.45).toFixed(2);
    fish.innerHTML = FISH;
    fish.addEventListener("animationend", (e) => {
      if (e.target !== fish) return;
      fish.remove();
      spawnFish(school);
    });
    school.append(fish);
  }

  /* ---------- Canvas: bubbles + marine snow ---------- */
  function startCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr;
    const bubbles = [];
    const snow = [];
    const pointer = { x: -999, y: -999, moved: 0 };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
    }
    resize();
    window.addEventListener("resize", resize);

    function makeBubble(x, y, r) {
      return {
        x: x ?? Math.random() * w,
        y: y ?? h + Math.random() * h * 0.5,
        r: (r ?? 2 + Math.random() * 7) * dpr,
        speed: (0.4 + Math.random() * 1.2) * dpr,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.01 + Math.random() * 0.03,
        life: 1,
      };
    }
    const area = (window.innerWidth * window.innerHeight) / 30000;
    for (let i = 0; i < Math.min(60, area * 1.2); i++) {
      const b = makeBubble();
      b.y = Math.random() * h;
      bubbles.push(b);
    }
    for (let i = 0; i < Math.min(90, area * 2); i++) {
      snow.push({ x: Math.random() * w, y: Math.random() * h, r: (0.5 + Math.random() * 1.5) * dpr, vx: (Math.random() - 0.5) * 0.2 * dpr, vy: (0.1 + Math.random() * 0.3) * dpr, a: 0.2 + Math.random() * 0.5 });
    }

    window.addEventListener("pointermove", (e) => {
      pointer.x = e.clientX * dpr;
      pointer.y = e.clientY * dpr;
      pointer.moved++;
      if (pointer.moved % 4 === 0 && bubbles.length < 160) {
        bubbles.push(makeBubble(pointer.x + (Math.random() - 0.5) * 10 * dpr, pointer.y, 1.5 + Math.random() * 4));
      }
    });
    window.addEventListener("pointerdown", (e) => {
      for (let i = 0; i < 10; i++) {
        bubbles.push(makeBubble(e.clientX * dpr + (Math.random() - 0.5) * 30 * dpr, e.clientY * dpr + (Math.random() - 0.5) * 20 * dpr, 2 + Math.random() * 6));
      }
    });

    function drawBubble(b) {
      const g = ctx.createRadialGradient(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.1, b.x, b.y, b.r);
      g.addColorStop(0, "rgba(255,255,255,0.55)");
      g.addColorStop(0.5, "rgba(170,240,255,0.12)");
      g.addColorStop(1, "rgba(170,240,255,0.35)");
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.globalAlpha = b.life;
      ctx.fill();
      ctx.lineWidth = 1 * dpr;
      ctx.strokeStyle = "rgba(200,250,255,0.45)";
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const s of snow) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.y > h) { s.y = -5; s.x = Math.random() * w; }
        if (s.x < 0) s.x = w; else if (s.x > w) s.x = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,245,255,${s.a})`;
        ctx.fill();
      }
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.wobble += b.wobbleSpeed;
        b.y -= b.speed;
        b.x += Math.sin(b.wobble) * 0.6 * dpr;
        // Bubbles drift away from the pointer
        const dx = b.x - pointer.x, dy = b.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 90 * dpr && dist > 0) {
          b.x += (dx / dist) * 1.5 * dpr;
        }
        if (b.y < -20 * dpr) {
          if (bubbles.length > 70) bubbles.splice(i, 1);
          else Object.assign(b, makeBubble());
          continue;
        }
        drawBubble(b);
      }
      requestAnimationFrame(frame);
    }
    if (reduceMotion) {
      bubbles.forEach(drawBubble);
    } else {
      requestAnimationFrame(frame);
    }
  }

  /* ---------- Scroll depth ---------- */
  function initDepth() {
    const gauge = document.createElement("div");
    gauge.className = "depth-gauge";
    gauge.setAttribute("aria-hidden", "true");
    gauge.innerHTML = `<span>0m</span><div class="track"><div class="fill"></div></div><span class="value">0m</span>`;
    document.body.append(gauge);
    const value = gauge.querySelector(".value");
    const maxDepth = Number(document.body.dataset.maxDepth || 4000);
    let ticking = false;
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const d = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      document.documentElement.style.setProperty("--depth", d.toFixed(3));
      value.textContent = Math.round(d * maxDepth).toLocaleString() + "m";
      ticking = false;
    }
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- Reveal + counters + progress bars ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 2000;
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + (target * eased).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    if (reduceMotion) el.textContent = prefix + target.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    else requestAnimationFrame(step);
  }

  function initObservers() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("visible");
        el.querySelectorAll("[data-count]").forEach(animateCount);
        if (el.matches("[data-count]")) animateCount(el);
        el.querySelectorAll(".progress > span[data-value]").forEach((bar) => { bar.style.width = bar.dataset.value + "%"; });
        el.dispatchEvent(new CustomEvent("revealed"));
        io.unobserve(el);
      });
    }, { threshold: 0.15 });
    window.Aquatica.observe = (el) => io.observe(el);
    document.querySelectorAll(".reveal, [data-count]:not(.reveal [data-count])").forEach((el) => io.observe(el));
  }

  /* ---------- Card spotlight following pointer ---------- */
  function initSpotlight() {
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest && e.target.closest(".card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  }

  function initRipples() {
    if (reduceMotion) return;
    document.addEventListener("pointerdown", (e) => {
      const r = document.createElement("span");
      r.className = "ripple";
      r.style.left = e.clientX + "px";
      r.style.top = e.clientY + "px";
      document.body.append(r);
      r.addEventListener("animationend", () => r.remove());
    });
  }

  /* ---------- Public helpers for page scripts ---------- */
  window.Aquatica = {
    reduceMotion,
    toast(msg) {
      let t = document.querySelector(".toast");
      if (!t) {
        t = document.createElement("div");
        t.className = "toast";
        t.setAttribute("role", "status");
        t.setAttribute("aria-live", "polite");
        document.body.append(t);
      }
      t.textContent = msg;
      t.classList.add("show");
      clearTimeout(t._timer);
      t._timer = setTimeout(() => t.classList.remove("show"), 3200);
    },
    store: {
      get(key, fallback) {
        try { const v = localStorage.getItem("aquatica:" + key); return v === null ? fallback : JSON.parse(v); } catch { return fallback; }
      },
      set(key, value) {
        try { localStorage.setItem("aquatica:" + key, JSON.stringify(value)); } catch { /* storage unavailable */ }
      },
    },
    modal(html) {
      let m = document.querySelector(".modal");
      if (!m) {
        m = document.createElement("div");
        m.className = "modal";
        m.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Close">×</button><div class="modal-content"></div></div>`;
        document.body.append(m);
        const close = () => { m.classList.remove("open"); m._opener && m._opener.focus(); };
        m.addEventListener("click", (e) => { if (e.target === m || e.target.closest(".modal-close")) close(); });
        document.addEventListener("keydown", (e) => { if (e.key === "Escape" && m.classList.contains("open")) close(); });
      }
      m._opener = document.activeElement;
      m.querySelector(".modal-content").innerHTML = html;
      m.classList.add("open");
      m.querySelector(".modal-close").focus();
    },
  };

  /* ---------- Boot ---------- */
  buildHeader();
  buildFooter();
  const { canvas, school } = buildOcean();
  startCanvas(canvas);
  if (!reduceMotion) {
    const fishCount = window.innerWidth < 700 ? 4 : 8;
    for (let i = 0; i < fishCount; i++) setTimeout(() => spawnFish(school), i * 1800);
  }
  initDepth();
  initObservers();
  initSpotlight();
  initRipples();
})();
