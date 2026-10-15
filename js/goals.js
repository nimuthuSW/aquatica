/* Goals page — progress rings, milestone modal, scroll-driven submarine timeline */
(function () {
  "use strict";
  const A = window.Aquatica;

  const GOALS = [
    { icon: "🗑️", title: "Stop 1,000 t of waste", current: 482, target: 1000, unit: "t", color: "#6ee7f9",
      milestones: [["250 t intercepted", true], ["500 t intercepted", false], ["750 t intercepted", false], ["1,000 t intercepted", false]] },
    { icon: "🚰", title: "Safe water for 50 communities", current: 38, target: 50, unit: "", color: "#2ec4b6",
      milestones: [["First 10 wells", true], ["25 communities", true], ["Local water committees in all sites", false], ["50 communities", false]] },
    { icon: "🪸", title: "Plant 25,000 coral fragments", current: 11500, target: 25000, unit: "", color: "#ff9f80",
      milestones: [["3 nursery sites", true], ["10,000 fragments", true], ["Heat-tolerant genotype bank", false], ["25,000 fragments", false]] },
    { icon: "🌿", title: "Restore 500 ha of wetland", current: 240, target: 500, unit: " ha", color: "#9ef0c4",
      milestones: [["100 ha", true], ["Community nurseries running", true], ["300 ha", false], ["500 ha", false]] },
    { icon: "🤿", title: "Mobilise 25,000 volunteers", current: 15400, target: 25000, unit: "", color: "#f6d68f",
      milestones: [["1,000 volunteers", true], ["10,000 volunteers", true], ["Volunteer hubs on every continent", false], ["25,000 volunteers", false]] },
    { icon: "🛡️", title: "10 community marine reserves", current: 3, target: 10, unit: "", color: "#b8a7ff",
      milestones: [["First reserve designated", true], ["3 reserves", true], ["Fisher co-management model", false], ["10 reserves", false]] },
  ];

  const grid = document.getElementById("goal-grid");
  const R = 52, C = 2 * Math.PI * R;
  grid.innerHTML = GOALS.map((g, i) => {
    const pct = Math.round((g.current / g.target) * 100);
    return `
    <button class="card float goal reveal" style="--delay:${(i % 3) * 0.08}s" data-i="${i}">
      <span class="ring">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="${R}" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="10"/>
          <circle class="ring-fill" cx="60" cy="60" r="${R}" fill="none" stroke="${g.color}" stroke-width="10" stroke-linecap="round"
            stroke-dasharray="${C}" stroke-dashoffset="${C}" data-offset="${C * (1 - pct / 100)}" transform="rotate(-90 60 60)"/>
        </svg>
        <span class="ring-label"><span class="ring-icon">${g.icon}</span><strong data-count="${pct}" data-suffix="%">0%</strong></span>
      </span>
      <h3>${g.title}</h3>
      <span class="goal-meta">${g.current.toLocaleString()}${g.unit} of ${g.target.toLocaleString()}${g.unit}</span>
    </button>`;
  }).join("");
  grid.querySelectorAll(".goal").forEach((card) => {
    card.addEventListener("revealed", () => {
      const ring = card.querySelector(".ring-fill");
      ring.style.strokeDashoffset = ring.dataset.offset;
    });
    A.observe(card);
    card.addEventListener("click", () => {
      const g = GOALS[card.dataset.i];
      const pct = Math.round((g.current / g.target) * 100);
      A.modal(`
        <div class="modal-hero">${g.icon}</div>
        <h2>${g.title}</h2>
        <p><strong>${g.current.toLocaleString()}${g.unit}</strong> achieved of <strong>${g.target.toLocaleString()}${g.unit}</strong> — ${pct}% of the way there.</p>
        <div class="progress"><span style="width:${pct}%;background:${g.color}"></span></div>
        <h4 style="margin-top:24px">Milestones</h4>
        <ol class="milestones">${g.milestones.map(([m, done]) => `<li class="${done ? "done" : ""}"><span>${done ? "✅" : "⏳"}</span>${m}</li>`).join("")}</ol>`);
    });
  });

  /* ---------- Submarine timeline ---------- */
  const timeline = document.getElementById("timeline");
  const fill = document.getElementById("timeline-fill");
  const sub = document.getElementById("sub");
  let ticking = false;
  function update() {
    const r = timeline.getBoundingClientRect();
    const mid = window.innerHeight * 0.55;
    const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
    fill.style.height = p * 100 + "%";
    sub.style.top = p * 100 + "%";
    timeline.querySelectorAll(".tl").forEach((li) => {
      const lr = li.getBoundingClientRect();
      li.classList.toggle("passed", lr.top + lr.height / 2 < mid);
    });
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
