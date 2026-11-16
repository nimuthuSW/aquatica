/* Projects page — water journey stepper, filterable project grid, detail modal */
(function () {
  "use strict";

  /* ---------- Journey of a drop ---------- */
  const STAGES = [
    { title: "Protecting the source", loc: "Patagonia, Chile", img: "assets/images/world-patagonia.webp", text: "Springs, glaciers and mountain catchments feed everything downstream. We map and protect watersheds, replant native forest on slopes, and monitor spring flow with local guardians.", facts: ["32 springs under monitoring", "18,000 native trees planted"] },
    { title: "Keeping rivers alive", loc: "Mekong Delta, Vietnam", img: "assets/images/world-mekong.webp", text: "Rivers carry sediment, nutrients and — too often — waste. Our trash booms and volunteer clean-ups intercept litter before it reaches the sea, while riparian planting stabilises banks.", facts: ["126 km of riverbank restored", "14 trash interceptors installed"] },
    { title: "Rebuilding wetlands", loc: "Okavango Delta, Botswana", img: "assets/images/world-okavango.webp", text: "Wetlands are nature's water filters, trapping pollutants and storing floodwater. We restore drained marshes and mangroves that shelter fish nurseries and store carbon.", facts: ["240 ha of wetland recovered", "3× more juvenile fish recorded"] },
    { title: "Cleaner cities", loc: "Klang River, Malaysia", img: "assets/images/proj-river.webp", text: "Urban runoff carries oil, microplastics and chemicals into storm drains. We build rain gardens, mark drains (\"Only rain down the drain!\") and work with councils on wastewater upgrades.", facts: ["2,300 storm drains marked", "9 rain gardens built"] },
    { title: "Defending the ocean", loc: "Raja Ampat, Indonesia", img: "assets/images/proj-reef.webp", text: "Where every river ends. We grow coral nurseries, retrieve ghost fishing nets, protect turtle nesting beaches and support community-run marine protected areas.", facts: ["11,500 coral fragments outplanted", "62 t of ghost nets removed"] },
  ];
  const panel = document.getElementById("journey-panel");
  const stops = document.querySelectorAll(".journey-stop");
  const drop = document.querySelector(".journey-drop");
  function showStage(i) {
    const s = STAGES[i];
    stops.forEach((b, j) => b.setAttribute("aria-selected", String(i === j)));
    const stop = stops[i];
    drop.style.left = stop.offsetLeft + stop.offsetWidth / 2 + "px";
    panel.classList.remove("swap");
    void panel.offsetWidth; // restart animation
    panel.classList.add("swap");
    panel.innerHTML = `<div class="journey-panel-grid"><div class="journey-photo"><img src="${s.img}" alt="${s.title} — ${s.loc}" loading="lazy"><span>📍 ${s.loc}</span></div><div><h3>${s.title}</h3><p>${s.text}</p><div class="fact-row">${s.facts.map((f) => `<span class="tag">${f}</span>`).join("")}</div></div></div>`;
  }
  stops.forEach((b, i) => {
    b.addEventListener("click", () => showStage(i));
    b.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const next = (i + (e.key === "ArrowRight" ? 1 : -1) + stops.length) % stops.length;
      stops[next].focus();
      showStage(next);
    });
  });
  showStage(0);
  window.addEventListener("resize", () => {
    const i = [...stops].findIndex((b) => b.getAttribute("aria-selected") === "true");
    showStage(Math.max(0, i));
  });

  /* ---------- Project data ---------- */
  const PROJECTS = [
    { id: "reef", cat: "ocean", icon: "🪸", img: "assets/images/proj-reef.webp", title: "Coral Reef Nurseries", place: "Raja Ampat, Indonesia", lat: -0.5, lon: 130.5, progress: 72, raised: 86000, goal: 120000,
      summary: "Growing heat-resistant coral fragments on underwater trees and replanting degraded reefs.",
      detail: "Divers collect naturally broken coral fragments, grow them on PVC ‘coral trees’ for 6–12 months and outplant them onto degraded reef. We prioritise heat-tolerant genotypes to help reefs survive marine heatwaves.",
      outcomes: ["11,500 fragments outplanted", "68% two-year survival rate", "4 local dive cooperatives trained"], perUnit: { cost: 25, unit: "coral fragment", units: "coral fragments" } },
    { id: "nets", cat: "ocean", icon: "🕸️", img: "assets/images/proj-nets.webp", title: "Ghost Net Retrieval", place: "Maldives & Indian Ocean", lat: 3.2, lon: 73.2, progress: 55, raised: 41000, goal: 75000,
      summary: "Locating and lifting abandoned fishing gear that keeps catching marine life for decades.",
      detail: "Lost and abandoned nets drift for years, entangling turtles, seals and whales. Using sonar surveys and fisher reports, our teams locate ghost gear, recover it safely and recycle the nylon into new products.",
      outcomes: ["62 t of ghost gear removed", "1,200+ animals freed", "Partner network of 40 fishing boats"], perUnit: { cost: 60, unit: "metre of net removed", units: "metres of net removed" } },
    { id: "turtle", cat: "ocean", icon: "🐢", img: "assets/images/proj-turtle.webp", title: "Turtle Beach Guardians", place: "Osa Peninsula, Costa Rica", lat: 8.5, lon: -83.5, progress: 88, raised: 52000, goal: 59000,
      summary: "Night patrols and hatcheries protecting sea turtle nests from poaching and erosion.",
      detail: "Local guardians patrol beaches during nesting season, relocate vulnerable nests to protected hatcheries and guide hatchlings to the sea. Light-pollution campaigns keep beaches dark for nesting females.",
      outcomes: ["3,400 nests protected", "210,000 hatchlings released", "22 guardians employed locally"], perUnit: { cost: 15, unit: "hatchling protected", units: "hatchlings protected" } },
    { id: "river", cat: "river", icon: "🏞️", img: "assets/images/proj-river.webp", title: "River Trash Interceptors", place: "Klang River, Malaysia", lat: 3.0, lon: 101.4, progress: 64, raised: 98000, goal: 150000,
      summary: "Floating barriers and solar-powered collectors stopping plastic before it reaches the sea.",
      detail: "Most ocean plastic travels via rivers. Our interceptors combine floating booms with conveyor collectors, and every catch is sorted and audited so we can push manufacturers on the brands we find most.",
      outcomes: ["14 interceptors installed", "310 t of waste captured", "Brand audit published annually"], perUnit: { cost: 40, unit: "kg of plastic intercepted", units: "kg of plastic intercepted" } },
    { id: "lake", cat: "river", icon: "🦆", img: "assets/images/proj-lake.webp", title: "Lakes Without Algae", place: "Lake Victoria, Kenya & Uganda", lat: -1.0, lon: 33.0, progress: 40, raised: 23000, goal: 60000,
      summary: "Cutting nutrient runoff that triggers toxic algal blooms and dead zones.",
      detail: "Fertiliser and sewage runoff overload lakes with nutrients, sparking algal blooms that starve water of oxygen. We work with farmers on buffer strips and precision fertilising, and float planted islands that absorb nutrients.",
      outcomes: ["35 farms using buffer strips", "40 floating wetland islands", "Bloom days down 30% at pilot lake"], perUnit: { cost: 30, unit: "m² of floating wetland", units: "m² of floating wetland" } },
    { id: "mangrove", cat: "river", icon: "🌿", img: "assets/images/proj-mangrove.webp", title: "Mangrove Recovery", place: "Sundarbans Delta, Bangladesh", lat: 21.9, lon: 89.2, progress: 70, raised: 44000, goal: 63000,
      summary: "Replanting mangrove forests that filter water, shelter fish nurseries and lock away carbon.",
      detail: "Mangroves protect coasts from storms, filter runoff and store several times more carbon per hectare than many land forests. We restore hydrology first, then replant with community nurseries.",
      outcomes: ["240 ha restored", "380,000 seedlings planted", "Fish catch up in pilot villages"], perUnit: { cost: 2, unit: "mangrove seedling", units: "mangrove seedlings" } },
    { id: "aquifer", cat: "ground", icon: "💧", img: "assets/images/proj-aquifer.webp", title: "Aquifer Watch", place: "Rajasthan, India", lat: 26.9, lon: 73.8, progress: 48, raised: 31000, goal: 65000,
      summary: "Monitoring groundwater levels and recharging aquifers with rainwater harvesting.",
      detail: "Groundwater supplies drinking water for billions but is invisible and easily overdrawn. Sensor wells report water levels in real time, while recharge ponds and check dams help rain soak back into the ground.",
      outcomes: ["120 monitoring wells live", "60 recharge structures built", "Open groundwater dashboard"], perUnit: { cost: 75, unit: "sensor-month of monitoring", units: "sensor-months of monitoring" } },
    { id: "wells", cat: "community", icon: "🚰", img: "assets/images/proj-wells.webp", title: "Safe Water for Schools", place: "Northern Region, Ghana", lat: 9.4, lon: -0.8, progress: 81, raised: 130000, goal: 160000,
      summary: "Wells, filters and hand-washing stations so children can learn without waterborne illness.",
      detail: "We install boreholes or rainwater systems with community-maintained filters, train local water committees and run hygiene lessons. Every system is tested quarterly for contamination.",
      outcomes: ["38 communities served", "21,000 students with safe water", "Quarterly water-quality testing"], perUnit: { cost: 20, unit: "child given safe water for a year", units: "children given safe water for a year" } },
    { id: "schools", cat: "community", icon: "🎒", img: "assets/images/proj-schools.webp", title: "Blue Classrooms", place: "Chesapeake Bay & 14 Countries", lat: 38.9, lon: -76.5, progress: 59, raised: 18000, goal: 30000,
      summary: "Hands-on water science lessons that turn students into local water guardians.",
      detail: "Students test their local streams, build mini filters and run clean-up days. Free curriculum packs are available in 8 languages, with teacher training online.",
      outcomes: ["640 classrooms enrolled", "Curriculum in 8 languages", "Student-led clean-ups monthly"], perUnit: { cost: 10, unit: "student water-testing kit", units: "student water-testing kits" } },
  ];
  const CAT_LABEL = { ocean: "Ocean", river: "Rivers & Lakes", ground: "Groundwater", community: "Community" };
  const SUPPORT_KEY = "aquatica-support-v1";
  const savedSupport = (() => { try { return JSON.parse(localStorage.getItem(SUPPORT_KEY) || "{}"); } catch { return {}; } })();
  PROJECTS.forEach((p) => {
    if (savedSupport[p.id]) {
      p.raised += savedSupport[p.id];
      p.progress = Math.min(100, Math.round((p.raised / p.goal) * 100));
    }
  });

  const grid = document.getElementById("project-grid");
  const empty = document.getElementById("project-empty");
  const search = document.getElementById("project-search");
  const filterBtns = document.querySelectorAll("#project-filters .chip");
  let filter = "all";

  function money(n) { return "$" + n.toLocaleString(); }

  function render() {
    const q = search.value.trim().toLowerCase();
    const list = PROJECTS.filter((p) =>
      (filter === "all" || p.cat === filter) &&
      (!q || [p.title, p.place, p.summary, p.detail].join(" ").toLowerCase().includes(q)));
    grid.innerHTML = list.map((p, i) => `
      <article class="card float project reveal" style="--delay:${(i % 3) * 0.08}s">
        <div class="project-media">
          <img src="${p.img}" alt="${p.title} in ${p.place}" loading="lazy">
          <span class="project-badge" aria-hidden="true">${p.icon}</span>
          <span class="tag">${CAT_LABEL[p.cat]}</span>
        </div>
        <div class="project-body">
          <h3>${p.title}</h3>
          <p class="place">📍 ${p.place}</p>
          <p>${p.summary}</p>
          <div class="progress" aria-label="${p.progress}% complete"><span data-value="${p.progress}"></span></div>
          <div class="progress-meta"><span>${p.progress}% complete</span><span>${money(p.raised)} of ${money(p.goal)}</span></div>
          <button class="btn ghost small" data-open="${p.id}">Learn more</button>
        </div>
      </article>`).join("");
    empty.hidden = list.length > 0;
    grid.querySelectorAll(".reveal").forEach((el) => window.Aquatica.observe(el));
  }

  filterBtns.forEach((b) => b.addEventListener("click", () => {
    filter = b.dataset.filter;
    filterBtns.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    render();
  }));
  search.addEventListener("input", render);

  function openModal(p) {
    window.Aquatica.modal(`
      <img class="modal-photo" src="${p.img}" alt="${p.title} in ${p.place}">
      <span class="tag">${CAT_LABEL[p.cat]}</span>
      <h2 style="margin-top:10px">${p.icon} ${p.title}</h2>
      <p class="place">📍 ${p.place}</p>
      <p>${p.detail}</p>
      <h4>Results so far</h4>
      <ul class="check-list">${p.outcomes.map((o) => `<li>${o}</li>`).join("")}</ul>
      <div class="impact-calc">
        <label for="support-range"><strong>See your impact:</strong> support with <output id="support-amt">$50</output></label>
        <input type="range" id="support-range" min="10" max="500" step="10" value="50">
        <p class="impact-out" id="support-out"></p>
        <button class="btn small" type="button" id="pledge-support-btn" style="margin-top:12px">💧 Pledge this support</button>
      </div>`);
    const range = document.getElementById("support-range");
    const amt = document.getElementById("support-amt");
    const out = document.getElementById("support-out");
    const update = () => {
      const v = Number(range.value);
      const units = Math.max(1, Math.floor(v / p.perUnit.cost));
      amt.textContent = money(v);
      out.innerHTML = `≈ <strong>${units.toLocaleString()}</strong> ${units === 1 ? p.perUnit.unit : p.perUnit.units} 🌊`;
    };
    range.addEventListener("input", update);
    update();
    document.getElementById("pledge-support-btn").addEventListener("click", () => {
      const v = Number(range.value);
      savedSupport[p.id] = (savedSupport[p.id] || 0) + v;
      try { localStorage.setItem(SUPPORT_KEY, JSON.stringify(savedSupport)); } catch {}
      p.raised += v;
      p.progress = Math.min(100, Math.round((p.raised / p.goal) * 100));
      render();
      showPin(p.id);
      window.Aquatica.toast(`Thank you! ${money(v)} pledged toward ${p.title} 🌊`);
    });
  }

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (!btn) return;
    const p = PROJECTS.find((x) => x.id === btn.dataset.open);
    if (p) openModal(p);
  });

  /* ---------- Interactive World Map ---------- */
  const mapEl = document.getElementById("world-map");
  const previewEl = document.getElementById("map-preview");
  function proj(lat, lon) {
    return [((lon + 180) * 1000 / 360).toFixed(1), ((90 - lat) * 500 / 180).toFixed(1)];
  }
  const CONTINENTS = [
    "M85,95 L180,70 L285,85 L270,135 L230,175 L200,210 L175,205 L145,175 L105,150 Z", // North America
    "M215,235 L270,245 L305,290 L285,365 L250,435 L235,430 L230,360 L205,295 Z", // South America
    "M440,85 L525,75 L560,115 L545,155 L485,165 L445,150 Z", // Europe
    "M450,180 L530,175 L590,225 L575,305 L535,380 L495,370 L470,295 L435,235 Z", // Africa
    "M565,75 L775,65 L895,105 L875,180 L815,215 L750,235 L685,220 L620,205 L565,160 Z", // Asia
    "M785,295 L875,290 L895,355 L845,385 L780,360 Z", // Australia
    "M310,35 L395,30 L385,75 L325,80 Z", // Greenland
  ];
  function showPin(id) {
    const p = PROJECTS.find((x) => x.id === id) || PROJECTS[0];
    if (!mapEl || !previewEl) return;
    mapEl.querySelectorAll(".map-pin").forEach((el) => el.classList.toggle("active", el.dataset.pin === p.id));
    previewEl.innerHTML = `
      <img class="map-preview-img" src="${p.img}" alt="${p.title} in ${p.place}">
      <span class="tag">${CAT_LABEL[p.cat]}</span>
      <h3 style="margin-top:8px">${p.icon} ${p.title}</h3>
      <p class="place">📍 ${p.place}</p>
      <p>${p.summary}</p>
      <div class="progress-meta"><span>${p.progress}% funded</span><span>${money(p.raised)} of ${money(p.goal)}</span></div>
      <button class="btn small" type="button" id="map-open-btn">Explore project →</button>`;
    document.getElementById("map-open-btn").addEventListener("click", () => openModal(p));
  }
  if (mapEl && previewEl) {
    const gridLines = [100, 200, 300, 400].map((y) => `<line class="map-grid-line" x1="0" y1="${y}" x2="1000" y2="${y}"/>`).join("") +
      [200, 400, 600, 800].map((x) => `<line class="map-grid-line" x1="${x}" y1="0" x2="${x}" y2="500"/>`).join("");
    const lands = CONTINENTS.map((d) => `<path class="map-land" d="${d}"/>`).join("");
    const pins = PROJECTS.map((p) => {
      const [x, y] = proj(p.lat, p.lon);
      return `<g class="map-pin" data-pin="${p.id}" tabindex="0" role="button" aria-label="${p.title} in ${p.place}">
        <circle class="pin-pulse" cx="${x}" cy="${y}" r="10"/>
        <circle class="pin-dot" cx="${x}" cy="${y}" r="6"/>
        <title>${p.title} — ${p.place}</title>
      </g>`;
    }).join("");
    mapEl.innerHTML = `<svg class="world-map-svg" viewBox="0 0 1000 500" role="img" aria-label="World map with Aquatica field project pins">${gridLines}${lands}${pins}</svg>`;
    mapEl.querySelectorAll(".map-pin").forEach((pin) => {
      pin.addEventListener("click", () => showPin(pin.dataset.pin));
      pin.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showPin(pin.dataset.pin); } });
    });
    showPin(PROJECTS[0].id);
  }

  render();
})();
