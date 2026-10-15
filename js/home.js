/* Home page — "Clean up the bay" mini-game */
(function () {
  "use strict";
  const water = document.getElementById("bay-water");
  if (!water) return;
  const startBtn = document.getElementById("bay-start");
  const countEl = document.getElementById("bay-count");
  const totalEl = document.getElementById("bay-total");
  const timeEl = document.getElementById("bay-time");
  const msg = document.getElementById("bay-msg");

  const TRASH = [
    { icon: "🥤", name: "plastic cup" },
    { icon: "🛍️", name: "plastic bag" },
    { icon: "🧴", name: "bottle" },
    { icon: "🥫", name: "can" },
    { icon: "🚬", name: "cigarette butt" },
    { icon: "👟", name: "old shoe" },
    { icon: "🎈", name: "balloon" },
    { icon: "🩴", name: "flip-flop" },
  ];
  const CREATURES = ["🐠", "🐟", "🐡", "🐢", "🦀", "🐙", "🦑", "🐬", "🪼", "🦐", "🐳", "🦈"];
  const TOTAL = 12;
  const SECONDS = 30;
  totalEl.textContent = TOTAL;

  let collected = 0, timeLeft = SECONDS, timer = null, running = false;

  function clearWater() {
    water.querySelectorAll(".trash, .critter").forEach((n) => n.remove());
  }

  function addTrash(i) {
    const t = TRASH[Math.floor(Math.random() * TRASH.length)];
    const b = document.createElement("button");
    b.className = "trash";
    b.type = "button";
    b.textContent = t.icon;
    b.setAttribute("aria-label", "Collect " + t.name);
    b.style.left = 4 + Math.random() * 86 + "%";
    b.style.top = 6 + Math.random() * 62 + "%";
    b.style.animationDelay = `-${Math.random() * 6}s, ${i * 0.08}s`;
    b.style.setProperty("--drift", (Math.random() * 60 - 30).toFixed(0) + "px");
    b.addEventListener("click", () => collect(b));
    water.append(b);
  }

  function addCritter() {
    const c = document.createElement("span");
    c.className = "critter";
    c.setAttribute("aria-hidden", "true");
    c.textContent = CREATURES[Math.floor(Math.random() * CREATURES.length)];
    c.style.top = 10 + Math.random() * 65 + "%";
    c.style.animationDuration = 6 + Math.random() * 6 + "s";
    water.append(c);
  }

  function collect(b) {
    if (!running || b.classList.contains("caught")) return;
    b.classList.add("caught");
    b.disabled = true;
    setTimeout(() => b.remove(), 500);
    collected++;
    countEl.textContent = collected;
    addCritter();
    if (collected === TOTAL) end(true);
  }

  function end(win) {
    running = false;
    clearInterval(timer);
    startBtn.disabled = false;
    startBtn.textContent = "Play again";
    water.querySelectorAll(".trash").forEach((t) => (t.disabled = true));
    if (win) {
      const used = SECONDS - timeLeft;
      const best = window.Aquatica.store.get("bayBest", null);
      const isBest = best === null || used < best;
      if (isBest) window.Aquatica.store.set("bayBest", used);
      msg.innerHTML = `🎉 Bay cleaned in <strong>${used}s</strong>! ${isBest ? "New personal best." : `Your best: ${best}s.`} Marine life is returning.`;
      for (let i = 0; i < 6; i++) setTimeout(addCritter, i * 250);
      window.Aquatica.toast("The reef thanks you! 🐢");
    } else {
      msg.innerHTML = `⏳ Time's up — you collected <strong>${collected}</strong> of ${TOTAL}. In the real ocean, trash keeps coming. Try again!`;
    }
    msg.hidden = false;
  }

  startBtn.addEventListener("click", () => {
    clearWater();
    collected = 0;
    timeLeft = SECONDS;
    countEl.textContent = 0;
    timeEl.textContent = SECONDS;
    msg.hidden = true;
    running = true;
    startBtn.disabled = true;
    startBtn.textContent = "Cleaning…";
    for (let i = 0; i < TOTAL; i++) addTrash(i);
    timer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) end(false);
    }, 1000);
  });
})();
