/* Awareness page — threats explorer, myth/fact flip cards, quiz, pledge reef */
(function () {
  "use strict";
  const A = window.Aquatica;

  /* ---------- Threats ---------- */
  const THREATS = [
    { icon: "🛍️", name: "Plastic pollution", severity: 90,
      text: "Around 11 million tonnes of plastic enter the ocean each year. It breaks into microplastics that are now found from Arctic ice to the deepest trenches — and inside fish, birds and people.",
      impacts: ["Entanglement and ingestion by wildlife", "Microplastics in the food chain", "Toxic additives leach into water"] },
    { icon: "🧪", name: "Chemical & nutrient runoff", severity: 80,
      text: "Fertilisers, pesticides, sewage and industrial waste wash into rivers and coasts. Excess nutrients trigger algal blooms that strip oxygen from water, creating ‘dead zones’ where little can survive.",
      impacts: ["Hundreds of coastal dead zones worldwide", "Toxic algae poison drinking water", "Fish kills and lost livelihoods"] },
    { icon: "🎣", name: "Overfishing", severity: 75,
      text: "More than a third of assessed fish stocks are fished faster than they can recover. Destructive methods like bottom trawling also damage the seafloor, and bycatch kills turtles, dolphins and sharks.",
      impacts: ["Collapsing fish populations", "Food insecurity for coastal communities", "Disrupted marine food webs"] },
    { icon: "🌡️", name: "Warming & acidification", severity: 95,
      text: "The ocean absorbs about a quarter of our CO₂ emissions and most of the extra heat. Warmer water bleaches coral, while CO₂ makes seawater more acidic, making it harder for shellfish and coral to build skeletons.",
      impacts: ["Mass coral bleaching events", "Sea-level rise and stronger storms", "Species shifting toward the poles"] },
    { icon: "🛢️", name: "Oil spills", severity: 60,
      text: "Large tanker spills make headlines, but most oil reaches the sea from everyday sources: land runoff, shipping and leaking infrastructure. Oil smothers wildlife and lingers in sediments for decades.",
      impacts: ["Coated birds and marine mammals", "Contaminated beaches and fisheries", "Long-term damage to mangroves and marshes"] },
    { icon: "🏜️", name: "Over-extraction", severity: 70,
      text: "We pump groundwater faster than rain refills it in many regions. Rivers run dry before reaching the sea, wetlands vanish and coastal aquifers turn salty as seawater seeps in.",
      impacts: ["Falling water tables and dry wells", "Land subsidence", "Saltwater intrusion into drinking water"] },
  ];
  const tabs = document.getElementById("threat-tabs");
  const panel = document.getElementById("threat-panel");
  tabs.innerHTML = THREATS.map((t, i) => `<button class="chip" role="tab" id="threat-tab-${i}" aria-controls="threat-panel" aria-selected="${i === 0}">${t.icon} ${t.name}</button>`).join("");
  const tabBtns = tabs.querySelectorAll("button");
  function showThreat(i) {
    const t = THREATS[i];
    tabBtns.forEach((b, j) => { b.setAttribute("aria-selected", String(i === j)); b.tabIndex = i === j ? 0 : -1; });
    panel.setAttribute("aria-labelledby", "threat-tab-" + i);
    panel.classList.remove("swap");
    void panel.offsetWidth;
    panel.classList.add("swap");
    panel.innerHTML = `
      <div class="threat-body">
        <div class="threat-icon">${t.icon}</div>
        <div>
          <h3>${t.name}</h3>
          <p>${t.text}</p>
          <ul class="check-list warn">${t.impacts.map((x) => `<li>${x}</li>`).join("")}</ul>
          <div class="severity"><span>Threat level</span><div class="progress"><span class="danger" style="width:0"></span></div></div>
        </div>
      </div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => { panel.querySelector(".danger").style.width = t.severity + "%"; }));
  }
  tabBtns.forEach((b, i) => {
    b.addEventListener("click", () => showThreat(i));
    b.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const n = (i + (e.key === "ArrowRight" ? 1 : -1) + tabBtns.length) % tabBtns.length;
      tabBtns[n].focus();
      showThreat(n);
    });
  });
  showThreat(0);

  /* ---------- Myths ---------- */
  const MYTHS = [
    { myth: "The ocean is too big to be polluted.", fact: "Plastic, noise and chemicals have reached every part of the ocean — including the Mariana Trench, nearly 11 km down." },
    { myth: "Biodegradable plastic breaks down fast in the sea.", fact: "Many ‘biodegradable’ plastics need industrial composting heat. In cold seawater they can last for years." },
    { myth: "Freshwater is unlimited because it rains.", fact: "Only about 1% of Earth's water is easily accessible freshwater, and many aquifers are drained faster than they recharge." },
    { myth: "Recycling solves the plastic problem.", fact: "Less than 10% of all plastic ever made has been recycled. Reducing and reusing come first." },
    { myth: "Coral reefs are rocks.", fact: "Corals are living animals — colonies of tiny polyps that partner with algae. They can starve and bleach when water overheats." },
    { myth: "What goes down the drain is cleaned anyway.", fact: "Many treatment plants can't remove microplastics, medicines or chemicals — and globally a large share of wastewater is released untreated." },
  ];
  const mythGrid = document.getElementById("myth-grid");
  mythGrid.innerHTML = MYTHS.map((m, i) => `
    <button class="flip reveal" style="--delay:${(i % 3) * 0.08}s" aria-pressed="false" aria-label="Myth: ${m.myth} Press to reveal the fact.">
      <span class="flip-inner">
        <span class="flip-front card"><span class="tag myth">Myth</span><span class="flip-text">${m.myth}</span><span class="flip-hint">Tap to flip ↻</span></span>
        <span class="flip-back card"><span class="tag">Fact</span><span class="flip-text">${m.fact}</span></span>
      </span>
    </button>`).join("");
  mythGrid.querySelectorAll(".flip").forEach((f) => {
    A.observe(f);
    f.addEventListener("click", () => {
      const on = f.getAttribute("aria-pressed") !== "true";
      f.setAttribute("aria-pressed", String(on));
      f.classList.toggle("flipped", on);
    });
  });

  /* ---------- Quiz ---------- */
  const QUIZ = [
    { q: "Roughly how much of Earth's water is fresh?", a: ["About 2.5%", "About 25%", "About 50%", "About 10%"], correct: 0, why: "Around 97.5% is salty — and most freshwater is locked in ice." },
    { q: "Which sector uses the most freshwater worldwide?", a: ["Households", "Industry", "Agriculture", "Tourism"], correct: 2, why: "Agriculture accounts for about 70% of freshwater withdrawals." },
    { q: "How much of the extra heat from global warming has the ocean absorbed?", a: ["About 10%", "About 40%", "About 65%", "About 90%"], correct: 3, why: "The ocean has absorbed around 90% of excess heat — protecting land, but at a cost to marine life." },
    { q: "What causes coral bleaching?", a: ["Too much sunlight on sand", "Corals expelling their algae under heat stress", "Bleach from cleaning products", "Old age"], correct: 1, why: "Stressed by hot water, corals expel the algae that feed and colour them." },
    { q: "Which everyday item sheds microplastics into waterways?", a: ["Cotton T-shirts", "Synthetic fleece jackets", "Wool socks", "Linen sheets"], correct: 1, why: "Synthetic fabrics like polyester fleece shed tiny fibres every wash." },
    { q: "What is a marine ‘dead zone’?", a: ["A shipwreck site", "An area too deep for light", "Water so low in oxygen most life can't survive", "A no-fishing area"], correct: 2, why: "Nutrient runoff feeds algal blooms, whose decay strips oxygen from the water." },
  ];
  const quizBox = document.getElementById("quiz-box");
  let qi = 0, score = 0;
  function renderQuestion() {
    const item = QUIZ[qi];
    quizBox.innerHTML = `
      <div class="quiz-top"><span class="tag">Question ${qi + 1} of ${QUIZ.length}</span><span class="quiz-score">Score: ${score}</span></div>
      <div class="progress quiz-progress"><span style="width:${(qi / QUIZ.length) * 100}%"></span></div>
      <h3 class="quiz-q">${item.q}</h3>
      <div class="quiz-answers">${item.a.map((a, i) => `<button class="quiz-a" data-i="${i}">${a}</button>`).join("")}</div>
      <p class="quiz-why" aria-live="polite"></p>
      <button class="btn quiz-next" hidden>${qi === QUIZ.length - 1 ? "See results" : "Next question →"}</button>`;
    quizBox.querySelectorAll(".quiz-a").forEach((b) => b.addEventListener("click", () => answer(Number(b.dataset.i))));
    quizBox.querySelector(".quiz-next").addEventListener("click", () => {
      qi++;
      if (qi < QUIZ.length) renderQuestion(); else renderResult();
    });
  }
  function answer(i) {
    const item = QUIZ[qi];
    const btns = quizBox.querySelectorAll(".quiz-a");
    btns.forEach((b, j) => {
      b.disabled = true;
      if (j === item.correct) b.classList.add("right");
      else if (j === i) b.classList.add("wrong");
    });
    if (i === item.correct) score++;
    quizBox.querySelector(".quiz-score").textContent = "Score: " + score;
    quizBox.querySelector(".quiz-why").innerHTML = (i === item.correct ? "✅ Correct! " : "❌ Not quite. ") + item.why;
    const next = quizBox.querySelector(".quiz-next");
    next.hidden = false;
    next.focus();
  }
  function renderResult() {
    const pct = score / QUIZ.length;
    const rank = pct === 1 ? ["🐋", "Blue Whale", "Perfect score — you're a true ocean guardian!"]
      : pct >= 0.66 ? ["🐬", "Dolphin", "Great knowledge — share it with your pod!"]
      : pct >= 0.33 ? ["🐢", "Sea Turtle", "Steady progress — keep exploring the depths."]
      : ["🦐", "Plankton", "Everyone starts small. Read the threats above and try again!"];
    const best = A.store.get("quizBest", 0);
    if (score > best) A.store.set("quizBest", score);
    quizBox.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-rank">${rank[0]}</div>
        <h3>You scored ${score} / ${QUIZ.length} — ${rank[1]}</h3>
        <p>${rank[2]}</p>
        <p class="source">Best score on this device: ${Math.max(best, score)} / ${QUIZ.length}</p>
        <button class="btn" id="quiz-restart">Try again ↻</button>
      </div>`;
    document.getElementById("quiz-restart").addEventListener("click", () => { qi = 0; score = 0; renderQuestion(); });
  }
  renderQuestion();

  /* ---------- Pledge ---------- */
  const PLEDGES = [
    { id: "bottle", text: "Carry a reusable water bottle", fish: "🐠" },
    { id: "shower", text: "Take showers under 5 minutes", fish: "🐟" },
    { id: "drain", text: "Keep chemicals and oil out of drains", fish: "🐡" },
    { id: "seafood", text: "Choose sustainable seafood", fish: "🐙" },
    { id: "cleanup", text: "Join a beach or river clean-up", fish: "🐢" },
    { id: "share", text: "Share what I've learned with 3 people", fish: "🐬" },
  ];
  const optWrap = document.querySelector(".pledge-options");
  optWrap.insertAdjacentHTML("beforeend", PLEDGES.map((p) => `<label class="pledge-opt"><input type="checkbox" value="${p.id}"><span>${p.fish} ${p.text}</span></label>`).join(""));
  const form = document.getElementById("pledge-form");
  const tank = document.getElementById("pledge-tank");
  const summary = document.getElementById("pledge-summary");
  const reset = document.getElementById("pledge-reset");

  function renderReef(state) {
    tank.innerHTML = `<div class="tank-sand">🪸 🐚 🌿 🪸 🌿 🐚 🪸</div>`;
    const ids = state ? state.pledges : [];
    ids.forEach((id, i) => {
      const p = PLEDGES.find((x) => x.id === id);
      if (!p) return;
      const f = document.createElement("span");
      f.className = "tank-fish";
      f.textContent = p.fish;
      f.style.top = 10 + ((i * 13) % 60) + "%";
      f.style.animationDuration = 7 + (i % 3) * 2 + "s";
      f.style.animationDelay = `-${i * 1.3}s`;
      tank.append(f);
    });
    if (state && ids.length) {
      const name = (state.name || "").replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
      summary.innerHTML = `<strong>${name ? name + ", you" : "You"} made ${ids.length} promise${ids.length > 1 ? "s" : ""} to the water.</strong> Thank you! 💙`;
      reset.hidden = false;
      optWrap.querySelectorAll("input").forEach((c) => { c.checked = ids.includes(c.value); });
      document.getElementById("pledge-name").value = state.name || "";
    } else {
      summary.textContent = "Your reef is waiting for its first fish…";
      reset.hidden = true;
    }
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const pledges = [...optWrap.querySelectorAll("input:checked")].map((c) => c.value);
    if (!pledges.length) { A.toast("Pick at least one promise 🐟"); return; }
    const state = { name: document.getElementById("pledge-name").value.trim().slice(0, 30), pledges };
    A.store.set("pledge", state);
    renderReef(state);
    A.toast("Pledge made! Your fish are swimming 🐠");
  });
  reset.addEventListener("click", () => {
    A.store.set("pledge", null);
    form.reset();
    renderReef(null);
  });
  renderReef(A.store.get("pledge", null));
})();
