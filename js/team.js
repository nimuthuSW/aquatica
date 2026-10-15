/* Team page — crew cards with filter, volunteer form */
(function () {
  "use strict";
  const A = window.Aquatica;

  // Placeholder crew — replace with your real team members.
  const TEAM = [
    { name: "Marina Okafor", role: "Founder & Director", group: "lead", animal: "🐋", animalName: "Blue whale", bio: "Former marine policy advisor who started Aquatica after a reef dive changed her life.", colors: ["#6ee7f9", "#2a5bd7"] },
    { name: "Leo Tanaka", role: "Operations Lead", group: "lead", animal: "🐙", animalName: "Octopus", bio: "Keeps eight projects moving at once — fittingly.", colors: ["#f7a8ff", "#7b5cff"] },
    { name: "Dr. Amara Singh", role: "Marine Biologist", group: "science", animal: "🪸", animalName: "Brain coral", bio: "Leads our coral nursery research on heat-tolerant reefs.", colors: ["#ff9f80", "#ff5e7e"] },
    { name: "Dr. Jonas Weber", role: "Hydrologist", group: "science", animal: "🦦", animalName: "River otter", bio: "Maps groundwater and designs aquifer recharge systems.", colors: ["#9ef0c4", "#2ec4b6"] },
    { name: "Sofia Reyes", role: "Data Scientist", group: "science", animal: "🐬", animalName: "Dolphin", bio: "Turns sensor streams and survey logs into open dashboards.", colors: ["#6ee7f9", "#2ec4b6"] },
    { name: "Kai Nakoa", role: "Dive Team Lead", group: "field", animal: "🦈", animalName: "Reef shark", bio: "2,000+ dives retrieving ghost nets and planting coral.", colors: ["#a8c8ff", "#3a6df0"] },
    { name: "Fatima El-Amin", role: "Water Engineer", group: "field", animal: "🦫", animalName: "Beaver", bio: "Builds wells, filters and trash interceptors that last.", colors: ["#f6d68f", "#e29b3b"] },
    { name: "Tomás Silva", role: "Restoration Coordinator", group: "field", animal: "🦀", animalName: "Mangrove crab", bio: "Plants mangroves by the hundred-thousand with coastal villages.", colors: ["#ff7b6b", "#c13b5b"] },
    { name: "Grace Mensah", role: "Community Organiser", group: "community", animal: "🐢", animalName: "Sea turtle", bio: "Runs our beach guardian network and volunteer days.", colors: ["#9ef0c4", "#3fa66b"] },
    { name: "Ethan Brooks", role: "Education Manager", group: "community", animal: "🐠", animalName: "Clownfish", bio: "Brings Blue Classrooms to schools in 8 languages.", colors: ["#ffd166", "#ff7b3b"] },
    { name: "Aiko Suzuki", role: "Storyteller & Media", group: "community", animal: "🪼", animalName: "Jellyfish", bio: "Underwater photographer sharing the ocean's stories.", colors: ["#ffc6e0", "#b05cff"] },
    { name: "Noah Fischer", role: "Partnerships", group: "lead", animal: "🐳", animalName: "Humpback", bio: "Connects funders, councils and businesses to the cause.", colors: ["#6ee7f9", "#5b7cff"] },
  ];
  const grid = document.getElementById("team-grid");
  const initials = (n) => n.replace("Dr. ", "").split(" ").map((p) => p[0]).join("").slice(0, 2);
  function avatar(m, i) {
    return `<svg class="avatar" viewBox="0 0 120 120" aria-hidden="true">
      <defs><linearGradient id="av${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${m.colors[0]}"/><stop offset="1" stop-color="${m.colors[1]}"/></linearGradient></defs>
      <circle cx="60" cy="60" r="56" fill="url(#av${i})"/>
      <circle cx="40" cy="36" r="10" fill="rgba(255,255,255,.35)"/>
      <circle cx="30" cy="52" r="4" fill="rgba(255,255,255,.3)"/>
      <text x="60" y="74" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="40" font-weight="700" fill="#02223f">${initials(m.name)}</text>
    </svg>`;
  }
  function render(filter) {
    const list = TEAM.filter((m) => filter === "all" || m.group === filter);
    grid.innerHTML = list.map((m, i) => `
      <article class="card float member reveal" tabindex="0" style="--delay:${(i % 4) * 0.06}s">
        <div class="member-avatar">${avatar(m, i)}<span class="spirit" title="${m.animalName}">${m.animal}</span></div>
        <h3>${m.name}</h3>
        <p class="role">${m.role}</p>
        <p class="bio">${m.bio}</p>
        <p class="spirit-label">Ocean spirit: ${m.animalName}</p>
      </article>`).join("");
    grid.querySelectorAll(".reveal").forEach((el) => A.observe(el));
  }
  document.querySelectorAll("#team-filters .chip").forEach((b, _, all) => b.addEventListener("click", () => {
    all.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    render(b.dataset.filter);
  }));
  render("all");

  /* ---------- Volunteer form ---------- */
  const form = document.getElementById("join-form");
  const error = document.getElementById("join-error");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#j-name");
    const email = form.querySelector("#j-email");
    if (!name.value.trim()) { error.textContent = "Please tell us your name."; name.focus(); return; }
    if (!email.validity.valid || !email.value) { error.textContent = "Please enter a valid email address."; email.focus(); return; }
    error.textContent = "";
    form.innerHTML = `<div class="join-done"><div class="big-emoji">🐬</div><h3>Welcome aboard!</h3><p>Thanks for volunteering. Our community team will be in touch soon about upcoming ${form.querySelector("#j-role").value.toLowerCase()} opportunities.</p></div>`;
    A.toast("Application received — welcome to the crew! 🌊");
  });
})();
