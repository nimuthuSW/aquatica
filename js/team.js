/* Team page — crew cards with filter, volunteer form */
(function () {
  "use strict";
  const A = window.Aquatica;

  const TEAM = [
    { name: "Marina Okafor", role: "Founder & Director", location: "Lagos, Nigeria", img: "assets/images/team/marina.jpg", group: "lead", animal: "🐋", animalName: "Blue whale", bio: "Former marine policy advisor who started Aquatica after a reef dive changed her life." },
    { name: "Leo Tanaka", role: "Operations Lead", location: "Tokyo, Japan", img: "assets/images/team/leo.jpg", group: "lead", animal: "🐙", animalName: "Octopus", bio: "Keeps eight projects moving at once — fittingly." },
    { name: "Dr. Amara Singh", role: "Marine Biologist", location: "Chennai, India", img: "assets/images/team/amara.jpg", group: "science", animal: "🪸", animalName: "Brain coral", bio: "Leads our coral nursery research on heat-tolerant reefs." },
    { name: "Dr. Jonas Weber", role: "Hydrologist", location: "Zurich, Switzerland", img: "assets/images/team/jonas.jpg", group: "science", animal: "🦦", animalName: "River otter", bio: "Maps groundwater and designs aquifer recharge systems." },
    { name: "Sofia Reyes", role: "Data Scientist", location: "Bogotá, Colombia", img: "assets/images/team/sofia.jpg", group: "science", animal: "🐬", animalName: "Dolphin", bio: "Turns sensor streams and survey logs into open dashboards." },
    { name: "Kai Nakoa", role: "Dive Team Lead", location: "Honolulu, USA", img: "assets/images/team/kai.jpg", group: "field", animal: "🦈", animalName: "Reef shark", bio: "2,000+ dives retrieving ghost nets and planting coral." },
    { name: "Fatima El-Amin", role: "Water Engineer", location: "Alexandria, Egypt", img: "assets/images/team/fatima.jpg", group: "field", animal: "🦫", animalName: "Beaver", bio: "Builds wells, filters and trash interceptors that last." },
    { name: "Tomás Silva", role: "Restoration Coordinator", location: "Belém, Brazil", img: "assets/images/team/tomas.jpg", group: "field", animal: "🦀", animalName: "Mangrove crab", bio: "Plants mangroves by the hundred-thousand with coastal villages." },
    { name: "Grace Mensah", role: "Community Organiser", location: "Accra, Ghana", img: "assets/images/team/grace.jpg", group: "community", animal: "🐢", animalName: "Sea turtle", bio: "Runs our beach guardian network and volunteer days." },
    { name: "Ethan Brooks", role: "Education Manager", location: "Bristol, UK", img: "assets/images/team/ethan.jpg", group: "community", animal: "🐠", animalName: "Clownfish", bio: "Brings Blue Classrooms to schools in 8 languages." },
    { name: "Aiko Suzuki", role: "Storyteller & Media", location: "Okinawa, Japan", img: "assets/images/team/aiko.jpg", group: "community", animal: "🪼", animalName: "Jellyfish", bio: "Underwater photographer sharing the ocean's stories." },
    { name: "Noah Fischer", role: "Partnerships", location: "Hamburg, Germany", img: "assets/images/team/noah.jpg", group: "lead", animal: "🐳", animalName: "Humpback", bio: "Connects funders, councils and businesses to the cause." },
  ];
  const grid = document.getElementById("team-grid");
  function avatar(m) {
    return `<img class="avatar" src="${m.img}" alt="${m.name}, ${m.role}" loading="lazy">`;
  }
  function render(filter) {
    const list = TEAM.filter((m) => filter === "all" || m.group === filter);
    grid.innerHTML = list.map((m, i) => `
      <article class="card float member reveal" tabindex="0" style="--delay:${(i % 4) * 0.06}s">
        <div class="member-avatar">${avatar(m)}<span class="spirit" title="${m.animalName}">${m.animal}</span></div>
        <h3>${m.name}</h3>
        <p class="role">${m.role}</p>
        <p class="location">📍 ${m.location}</p>
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
