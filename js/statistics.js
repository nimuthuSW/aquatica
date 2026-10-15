/* Statistics page — donut, bar and line charts + water footprint calculator */
(function () {
  "use strict";
  const SVGNS = "http://www.w3.org/2000/svg";
  const tooltip = document.getElementById("tooltip");
  const svgEl = (tag, attrs) => {
    const el = document.createElementNS(SVGNS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  };
  function showTip(html, x, y) {
    tooltip.innerHTML = html;
    tooltip.hidden = false;
    const r = tooltip.getBoundingClientRect();
    const left = Math.min(window.innerWidth - r.width - 8, Math.max(8, x - r.width / 2));
    tooltip.style.left = left + "px";
    tooltip.style.top = Math.max(8, y - r.height - 14) + "px";
  }
  const hideTip = () => { tooltip.hidden = true; };

  function whenRevealed(id, fn) {
    const el = document.getElementById(id);
    let done = false;
    const run = () => { if (!done) { done = true; fn(); } };
    el.addEventListener("revealed", run);
    if (el.classList.contains("visible")) run();
  }

  /* ---------- Donut ---------- */
  const DONUT = {
    all: { center: ["2.5%", "is freshwater"], parts: [
      { label: "Saltwater (oceans & seas)", value: 97.5, color: "#1f6fb8" },
      { label: "Freshwater", value: 2.5, color: "#6ee7f9" } ] },
    fresh: { center: ["~1%", "is easily accessible"], parts: [
      { label: "Glaciers & ice caps", value: 68.7, color: "#c9f1ff" },
      { label: "Groundwater", value: 30.1, color: "#2ec4b6" },
      { label: "Lakes, rivers, soil & air", value: 1.2, color: "#f6d68f" } ] },
  };
  const donut = document.getElementById("donut");
  const center = document.getElementById("donut-center");
  const legend = document.getElementById("donut-legend");
  function drawDonut(view) {
    const data = DONUT[view];
    donut.querySelectorAll("circle").forEach((c) => c.remove());
    const r = 80, C = 2 * Math.PI * r;
    donut.append(svgEl("circle", { cx: 110, cy: 110, r, fill: "none", stroke: "rgba(255,255,255,.07)", "stroke-width": 30 }));
    let offset = 0;
    data.parts.forEach((p, i) => {
      // tiny slices get a minimum visible size
      const len = Math.max(C * (p.value / 100), 4);
      const c = svgEl("circle", {
        cx: 110, cy: 110, r, fill: "none", stroke: p.color, "stroke-width": 30,
        "stroke-dasharray": `0 ${C}`, "stroke-dashoffset": -offset,
        transform: "rotate(-90 110 110)", class: "donut-seg", tabindex: 0,
        "aria-label": `${p.label}: ${p.value}%`,
      });
      c.style.transition = `stroke-dasharray 1.2s cubic-bezier(.2,.8,.2,1) ${i * 0.15}s, stroke-width .2s`;
      const tip = (e) => {
        const rect = (e.target).getBoundingClientRect();
        showTip(`<strong>${p.label}</strong><br>${p.value}%`, e.clientX ?? rect.left + rect.width / 2, e.clientY ?? rect.top);
      };
      c.addEventListener("pointermove", tip);
      c.addEventListener("focus", tip);
      c.addEventListener("pointerleave", hideTip);
      c.addEventListener("blur", hideTip);
      donut.append(c);
      requestAnimationFrame(() => requestAnimationFrame(() => c.setAttribute("stroke-dasharray", `${len} ${C - len}`)));
      offset += len;
    });
    center.innerHTML = `<strong>${data.center[0]}</strong><span>${data.center[1]}</span>`;
    legend.innerHTML = data.parts.map((p) => `<li><i style="background:${p.color}"></i>${p.label} <strong>${p.value}%</strong></li>`).join("");
  }
  document.querySelectorAll("[data-view]").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll("[data-view]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    drawDonut(b.dataset.view);
  }));
  whenRevealed("donut-card", () => drawDonut("all"));

  /* ---------- Horizontal bars ---------- */
  const BARS = [
    { label: "Agriculture", icon: "🌾", value: 70, note: "Irrigation for crops and livestock" },
    { label: "Industry", icon: "🏭", value: 19, note: "Energy, manufacturing and cooling" },
    { label: "Municipal", icon: "🏠", value: 11, note: "Homes, schools, businesses" },
  ];
  const hbars = document.getElementById("hbars");
  hbars.innerHTML = BARS.map((b) => `
    <div class="hbar" tabindex="0" data-note="${b.note}">
      <div class="hbar-label"><span>${b.icon} ${b.label}</span><strong>${b.value}%</strong></div>
      <div class="hbar-track"><div class="hbar-fill" data-value="${b.value}"><span class="hbar-bubbles"></span></div></div>
      <p class="hbar-note">${b.note}</p>
    </div>`).join("");
  whenRevealed("bars-card", () => {
    hbars.querySelectorAll(".hbar-fill").forEach((f, i) => setTimeout(() => { f.style.width = f.dataset.value + "%"; }, i * 200));
  });

  /* ---------- Line chart ---------- */
  const LINE = [
    [1950, 2], [1960, 8], [1970, 35], [1980, 70], [1990, 120], [2000, 234], [2010, 313], [2015, 381], [2019, 460],
  ];
  const line = document.getElementById("line");
  function drawLine() {
    const W = 800, H = 340, pad = { l: 56, r: 24, t: 20, b: 40 };
    const x = (yr) => pad.l + ((yr - 1950) / (2019 - 1950)) * (W - pad.l - pad.r);
    const y = (v) => H - pad.b - (v / 500) * (H - pad.t - pad.b);
    const defs = svgEl("defs", {});
    defs.innerHTML = `<linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ee7f9" stop-opacity=".45"/><stop offset="1" stop-color="#6ee7f9" stop-opacity="0"/></linearGradient>`;
    line.append(defs);
    for (let v = 0; v <= 500; v += 100) {
      line.append(svgEl("line", { x1: pad.l, x2: W - pad.r, y1: y(v), y2: y(v), stroke: "rgba(255,255,255,.08)" }));
      const t = svgEl("text", { x: pad.l - 10, y: y(v) + 4, "text-anchor": "end", class: "axis" });
      t.textContent = v;
      line.append(t);
    }
    [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2019].forEach((yr) => {
      const t = svgEl("text", { x: x(yr), y: H - pad.b + 24, "text-anchor": "middle", class: "axis" });
      t.textContent = yr;
      line.append(t);
    });
    const pts = LINE.map(([yr, v]) => [x(yr), y(v)]);
    const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    const area = svgEl("path", { d: `${d} L ${pts[pts.length - 1][0]} ${y(0)} L ${pts[0][0]} ${y(0)} Z`, fill: "url(#area)", class: "line-area" });
    const path = svgEl("path", { d, fill: "none", stroke: "#6ee7f9", "stroke-width": 3.5, "stroke-linejoin": "round", "stroke-linecap": "round", class: "line-path" });
    line.append(area, path);
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    requestAnimationFrame(() => {
      path.style.transition = "stroke-dashoffset 2.4s ease-out";
      path.style.strokeDashoffset = 0;
      area.classList.add("show");
    });
    pts.forEach((p, i) => {
      const dot = svgEl("circle", { cx: p[0], cy: p[1], r: 6, class: "line-dot", tabindex: 0, "aria-label": `${LINE[i][0]}: ${LINE[i][1]} million tonnes` });
      dot.style.animationDelay = 0.25 * i + "s";
      line.append(dot);
    });
    // Guide that follows the pointer and snaps to nearest point
    const guide = svgEl("line", { y1: pad.t, y2: H - pad.b, stroke: "rgba(246,214,143,.6)", "stroke-dasharray": "4 4", visibility: "hidden" });
    line.append(guide);
    function nearest(clientX) {
      const r = line.getBoundingClientRect();
      const sx = ((clientX - r.left) / r.width) * W;
      let best = 0;
      pts.forEach((p, i) => { if (Math.abs(p[0] - sx) < Math.abs(pts[best][0] - sx)) best = i; });
      return best;
    }
    function point(i) {
      const r = line.getBoundingClientRect();
      guide.setAttribute("x1", pts[i][0]);
      guide.setAttribute("x2", pts[i][0]);
      guide.setAttribute("visibility", "visible");
      line.querySelectorAll(".line-dot").forEach((d, j) => d.classList.toggle("active", j === i));
      const growth = i ? ` <br><em>×${(LINE[i][1] / LINE[0][1]).toFixed(0)} vs 1950</em>` : "";
      showTip(`<strong>${LINE[i][0]}</strong><br>${LINE[i][1]} Mt produced${growth}`, r.left + (pts[i][0] / W) * r.width, r.top + (pts[i][1] / H) * r.height);
    }
    line.addEventListener("pointermove", (e) => point(nearest(e.clientX)));
    line.addEventListener("pointerleave", () => { guide.setAttribute("visibility", "hidden"); hideTip(); });
    line.querySelectorAll(".line-dot").forEach((dot, i) => {
      dot.addEventListener("focus", () => point(i));
      dot.addEventListener("blur", hideTip);
    });
  }
  whenRevealed("line-card", drawLine);

  /* ---------- Water footprint calculator ---------- */
  const form = document.getElementById("calc-form");
  const totalEl = document.getElementById("calc-total");
  const directEl = document.getElementById("calc-direct");
  const virtualEl = document.getElementById("calc-virtual");
  const tank = document.getElementById("tank-water");
  const tipEl = document.getElementById("calc-tip");
  let shown = 0;
  function calc() {
    const v = (id) => Number(document.getElementById(id).value);
    form.querySelectorAll("output[data-for]").forEach((o) => { o.textContent = document.getElementById(o.dataset.for).value; });
    const direct = Math.round(v("c-shower") * 9 + v("c-flush") * 6 + (v("c-laundry") * 60) / 7 + v("c-dishes"));
    const virtual = v("c-diet");
    const total = direct + virtual;
    directEl.textContent = direct.toLocaleString();
    virtualEl.textContent = virtual.toLocaleString();
    tank.style.height = Math.min(100, (total / 6000) * 100) + "%";
    const from = shown, start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / 600);
      totalEl.textContent = Math.round(from + (total - from) * t).toLocaleString();
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    shown = total;
    const tips = [];
    if (v("c-shower") > 8) tips.push(`Cutting your shower to 5 minutes saves ~${(v("c-shower") - 5) * 9} L a day.`);
    if (v("c-dishes") === 100) tips.push("Using a basin or full dishwasher saves up to 60 L a day.");
    if (virtual >= 3600) tips.push("Swapping a few meat meals a week for plants is the biggest water saver of all.");
    tipEl.textContent = tips.length ? "💡 " + tips[0] : "🌟 You're a water champion — share your tips with friends!";
  }
  form.addEventListener("input", calc);
  calc();
})();
