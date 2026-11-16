/* Journal page — featured dispatch, filterable articles, long-form reader modal */
(function () {
  "use strict";
  const A = window.Aquatica;

  const ARTICLES = [
    {
      id: "raja-ampat-corals",
      cat: "field",
      catLabel: "Field Report",
      title: "Inside Raja Ampat's Heat-Tolerant Coral Nurseries",
      place: "Raja Ampat, Indonesia",
      date: "Oct 2026",
      readTime: "7 min read",
      author: "Dr. Amara Singh & Kai Nakoa",
      avatar: "assets/images/team/amara.webp",
      img: "assets/images/proj-reef.webp",
      featured: true,
      summary: "Two years of survival data show how selectively propagating naturally heat-resilient coral genotypes is helping outer-reef slopes recover faster after marine heatwaves.",
      pull: "When water temperatures spiked by 1.8 °C in February, colonies raised from lagoon-edge survivors retained 74% of their symbiotic algae.",
      body: [
        "Before sunrise in Dampier Strait, four dive boats anchor just outside a shallow reef flat. Underwater, rows of PVC ‘coral trees’ sway gently in the current, each holding dozens of staghorn and table coral fragments tagged with small aluminium codes.",
        "Over the past 24 months, Aquatica’s marine biology team and four local dive cooperatives have outplanted 11,500 fragments across 14 degraded reef patches. Rather than planting randomly, we map colonies that survived previous bleaching events in warm, shallow lagoons and propagate their fragments in mid-depth nurseries.",
        "Our latest quarterly survey recorded a 68% two-year survival rate — significantly higher than conventional restoration plots nearby. Crucially, parrotfish and damselfish grazing returned within four months of outplanting, keeping turf algae in check so young corals can calcify.",
        "Restoration is never a substitute for cutting global emissions, but buying reefs extra resilience at the local scale preserves genetic diversity while the world decarbonises."
      ],
      takeaways: ["68% two-year fragment survival across 14 sites", "Lagoon-edge parent colonies show stronger thermal tolerance", "4 local dive cooperatives trained in coral husbandry"]
    },
    {
      id: "river-interceptors-policy",
      cat: "freshwater",
      catLabel: "Freshwater",
      title: "Why River Interceptors Alone Aren't Enough — And What Comes Next",
      place: "Klang River & Mekong Delta",
      date: "Sep 2026",
      readTime: "6 min read",
      author: "Fatima El-Amin",
      avatar: "assets/images/team/fatima.webp",
      img: "assets/images/proj-river.webp",
      summary: "Solar-powered river booms have captured 310 tonnes of plastic waste — but the real breakthrough happens when we audit every kilogram and take the data upstream.",
      pull: "Capturing plastic in the river is triage; publishing who produced it is how we turn off the tap.",
      body: [
        "Every monsoon surge turns urban tributaries into conveyor belts for single-use packaging. Across 14 river interceptors in Southeast Asia, our crews haul out everything from beverage bottles to multi-layer snack sachets.",
        "For the first year, sorting and weighing every catch felt Sisyphean. Then we started publishing open brand audits alongside municipal waste-collection gaps. Three major beverage bottlers and two regional councils used those exact river-mouth datasets to fund deposit-return pilots and riverside bin infrastructure.",
        "Technology in the water buys time for wildlife downstream, while transparent data drives upstream accountability."
      ],
      takeaways: ["310 tonnes intercepted before reaching coastal waters", "Open brand audits shared with 12 municipal councils", "Deposit-return pilots launched in two partner districts"]
    },
    {
      id: "sundarbans-blue-carbon",
      cat: "science",
      catLabel: "Science & Data",
      title: "The Hidden Carbon Vaults of the Sundarbans",
      place: "Sundarbans Delta, Bangladesh",
      date: "Aug 2026",
      readTime: "8 min read",
      author: "Tomás Silva",
      avatar: "assets/images/team/tomas.webp",
      img: "assets/images/proj-mangrove.webp",
      summary: "Why restoring tidal hydrology before planting a single mangrove seedling triples survival rates and locks carbon deep into waterlogged delta mud.",
      pull: "Most failed mangrove projects plant into stagnant, diked ponds. Fix the tide first, and the forest plants itself.",
      body: [
        "Across the world’s largest tidal mangrove forest, rising salinity and cyclone surges threaten both biodiversity and coastal villages. Early replanting campaigns often failed because seedlings were pushed into compacted soil cut off from daily tides.",
        "Working alongside village forestry committees, our restoration team now spends the first three months reopening silted tidal channels. Once brackish water circulates naturally again, sediment settles, oxygenates, and nursery-raised Rhizophora seedlings take root rapidly.",
        "Soil core sampling across our 240 hectares of restored delta shows organic carbon accumulating four times faster than in adjacent upland plantations — while crab and juvenile fish catches have rebounded for local fishers."
      ],
      takeaways: ["240 hectares of mangrove hydrology restored", "380,000 community-nursery seedlings planted", "Measurable rebound in mud-crab and juvenile fish stocks"]
    },
    {
      id: "rajasthan-aquifer-watch",
      cat: "freshwater",
      catLabel: "Freshwater",
      title: "When Wells Run Dry: Acoustic Sensors in Rajasthan's Aquifers",
      place: "Rajasthan, India",
      date: "Jul 2026",
      readTime: "5 min read",
      author: "Dr. Jonas Weber",
      avatar: "assets/images/team/jonas.webp",
      img: "assets/images/proj-aquifer.webp",
      summary: "Combining traditional johad rainwater-harvesting ponds with low-cost acoustic depth sensors so farming villages can manage invisible groundwater together.",
      pull: "You cannot govern what you cannot see — putting water-table data on village noticeboards changed pumping habits in one season.",
      body: [
        "Groundwater is the world’s largest store of unfrozen freshwater, yet most communities only discover an aquifer is depleted when a borewell sucks air. In semi-arid Rajasthan, monsoon rain falls in just a few intense weeks.",
        "We partnered with local water committees to Pair 60 restored johad check-dams with solar-powered acoustic sensors in 120 observation wells. Every morning, village water stewards receive simple depth readings in centimetres.",
        "During the 2026 monsoon, villages with active recharge ponds saw water tables recover 2.4 metres higher than neighbouring catchments — enough to carry winter crops without deeper drilling."
      ],
      takeaways: ["120 live groundwater monitoring wells", "60 traditional rainwater recharge structures rebuilt", "2.4 m higher post-monsoon water table in pilot basins"]
    },
    {
      id: "indian-ocean-ghost-nets",
      cat: "field",
      catLabel: "Field Report",
      title: "Ghost Nets in the Indian Ocean: Tracking Abandoned Gear by Satellite",
      place: "Maldives & Indian Ocean",
      date: "Jun 2026",
      readTime: "6 min read",
      author: "Kai Nakoa",
      avatar: "assets/images/team/kai.webp",
      img: "assets/images/proj-nets.webp",
      summary: "How drift modelling, fisher radio reports, and side-scan sonar are helping dive teams intercept deadly ghost nets before they shred coral atolls.",
      pull: "A single drifting trawl net can entangle sea turtles, reef sharks, and manta rays for decades if left unchecked.",
      body: [
        "Abandoned, lost, or discarded fishing gear — known as ghost gear — makes up a disproportionate share of large ocean plastic by weight and is the deadliest form of marine debris for wildlife.",
        "By combining Indian Ocean current forecasts with sightings from 40 partner fishing boats, our retrieval vessels intercept drifting net bundles offshore before they snag on fragile atoll reefs. Recovered nylon is cleaned, baled, and sent to circular recycling partners.",
        "So far, 62 tonnes of gear have been lifted and more than 1,200 entangled animals have been freed and documented."
      ],
      takeaways: ["62 tonnes of ghost gear recovered", "40 partner fishing vessels reporting sightings", "1,200+ marine animals freed"]
    },
    {
      id: "lake-victoria-wetlands",
      cat: "science",
      catLabel: "Science & Data",
      title: "Lake Victoria's Algal Blooms: Farmers, Wetlands & Buffer Strips",
      place: "Lake Victoria, Kenya & Uganda",
      date: "May 2026",
      readTime: "6 min read",
      author: "Sofia Reyes",
      avatar: "assets/images/team/sofia.webp",
      img: "assets/images/proj-lake.webp",
      summary: "Restoring papyrus fringes and floating planted islands to strip excess phosphorus and nitrogen before runoff turns bays green.",
      pull: "Healthy lakeshore wetlands act as living kidneys, filtering agricultural nutrients before blooms can form.",
      body: [
        "Across East Africa, Lake Victoria supports tens of millions of people with drinking water and fisheries. Yet rising fertiliser runoff and untreated wastewater have fuelled recurring cyanobacterial blooms that deplete dissolved oxygen.",
        "Instead of expensive chemical dosing, our teams worked with 35 lakeside farms to plant deep-rooted vegetative buffer strips alongside 40 anchored floating wetland islands.",
        "Over 12 months of water-quality logging, pilot bays recorded a 30% drop in severe bloom days and measurably higher dissolved oxygen at dawn."
      ],
      takeaways: ["35 farms adopting vegetative buffer strips", "40 floating wetland islands deployed", "30% reduction in algal bloom days at pilot bay"]
    },
    {
      id: "costa-rica-turtle-beaches",
      cat: "people",
      catLabel: "People & Policy",
      title: "Dark Beaches for Olive Ridleys: How Light Ordinances Saved 210,000 Hatchlings",
      place: "Osa Peninsula, Costa Rica",
      date: "Apr 2026",
      readTime: "5 min read",
      author: "Grace Mensah",
      avatar: "assets/images/team/grace.webp",
      img: "assets/images/proj-turtle.webp",
      summary: "Switching coastal lodges to shielded amber lighting and employing local beach guardians transformed hatchling survival overnight.",
      pull: "Newly hatched turtles navigate by the brightest horizon — under natural skies, that's always the starlit ocean.",
      body: [
        "Artificial beachfront lighting disorients both nesting female sea turtles and emerging hatchlings, drawing them inland toward roads and predators instead of the surf.",
        "Through community workshops with coastal hotels and municipal councils on the Osa Peninsula, we helped replace bright white floodlights with downward-shielded amber LEDs — while funding 22 full-time local beach guardians.",
        "The result: 3,400 protected nests and more than 210,000 Olive Ridley and Green sea turtle hatchlings reaching the Pacific safely."
      ],
      takeaways: ["3,400 sea turtle nests protected", "210,000+ hatchlings safely reaching the ocean", "22 local guardians employed year-round"]
    },
    {
      id: "microfibres-laundry-science",
      cat: "science",
      catLabel: "Science & Data",
      title: "What Happens to Microfibres After One Laundry Cycle?",
      place: "Global Research Note",
      date: "Mar 2026",
      readTime: "5 min read",
      author: "Aiko Suzuki",
      avatar: "assets/images/team/aiko.webp",
      img: "assets/images/threat-plastic.webp",
      summary: "A single wash of synthetic fleece can shed hundreds of thousands of plastic fibres. Here is what wastewater filters catch — and what slips through.",
      pull: "Up to 35% of primary microplastics in the ocean originate from laundering synthetic textiles.",
      body: [
        "Every time polyester, nylon, or acrylic garments tumble in a washing machine, friction breaks off microscopic threads thinner than a human hair. Standard municipal treatment plants capture much of this sludge, yet millions of fibres still pass into rivers and coastal waters.",
        "Practical solutions already exist: washing at 30 °C on shorter cycles, filling machines completely to reduce fabric abrasion, and installing inline microfibre filters on washing-machine outlets can cut shedding by up to 80%.",
        "Longer term, mandatory washing-machine filtration standards and shifting toward durable natural fibres will close this invisible pipeline."
      ],
      takeaways: ["Cold, full-load washes reduce fibre shedding significantly", "Inline washing-machine filters capture up to 80% of fibres", "Natural fibres biodegrade far more readily than polyester"]
    },
    {
      id: "blue-classrooms-education",
      cat: "people",
      catLabel: "People & Policy",
      title: "Blue Classrooms: How 640 Schools Turn Stream Testing Into Local Policy",
      place: "Chesapeake Bay & 14 Countries",
      date: "Feb 2026",
      readTime: "6 min read",
      author: "Ethan Brooks",
      avatar: "assets/images/team/ethan.webp",
      img: "assets/images/proj-schools.webp",
      summary: "When students measure nitrate levels and macroinvertebrates in their own neighbourhood creeks, classroom science turns into civic action.",
      pull: "Students in three cities presented their stream-testing logs to local councils — and won storm-drain filter upgrades.",
      body: [
        "Abstract global statistics rarely inspire lifelong stewardship. Standing ankle-deep in a local stream with a kick-net and turbidity tube does.",
        "Aquatica’s Blue Classrooms curriculum equips teachers in 8 languages with simple, repeatable water-quality kits. Students log pH, dissolved oxygen, nitrates, and aquatic insect diversity onto an open map.",
        "Across 640 enrolled classrooms, student data has flagged leaking storm drains, sparked monthly neighbourhood clean-ups, and brought families directly into watershed conservation."
      ],
      takeaways: ["640 classrooms across 14 countries", "Free open curriculum in 8 languages", "Student citizen-science logs driving local drain repairs"]
    }
  ];

  const featuredSlot = document.getElementById("featured-slot");
  const grid = document.getElementById("article-grid");
  const empty = document.getElementById("article-empty");
  const search = document.getElementById("article-search");
  const filterBtns = document.querySelectorAll("#article-filters .chip");
  let filter = "all";

  function openArticle(a) {
    A.modal(`
      <img class="modal-photo" src="${a.img}" alt="${a.title}">
      <span class="tag">${a.catLabel}</span>
      <h2 style="margin-top:10px">${a.title}</h2>
      <div class="article-meta" style="margin-bottom:18px">
        <img src="${a.avatar}" alt="${a.author}">
        <strong>${a.author}</strong><span class="dot">•</span>
        <span>📍 ${a.place}</span><span class="dot">•</span>
        <span>${a.date} · ${a.readTime}</span>
      </div>
      <div class="article-reader">
        <blockquote class="article-pull">${a.pull}</blockquote>
        ${a.body.map((p) => `<p>${p}</p>`).join("")}
      </div>
      <h4>Key takeaways</h4>
      <ul class="check-list">${a.takeaways.map((t) => `<li>${t}</li>`).join("")}</ul>`);
  }

  const featured = ARTICLES.find((a) => a.featured);
  if (featured && featuredSlot) {
    featuredSlot.innerHTML = `
      <article class="card float featured-article reveal">
        <div class="featured-media">
          <img src="${featured.img}" alt="${featured.title}">
        </div>
        <div class="featured-body">
          <span class="tag" style="align-self:flex-start">Featured · ${featured.catLabel}</span>
          <h2>${featured.title}</h2>
          <div class="article-meta">
            <img src="${featured.avatar}" alt="${featured.author}">
            <strong>${featured.author}</strong><span class="dot">•</span>
            <span>📍 ${featured.place}</span><span class="dot">•</span>
            <span>${featured.readTime}</span>
          </div>
          <p>${featured.summary}</p>
          <button class="btn" type="button" data-read="${featured.id}" style="align-self:flex-start">Read full dispatch →</button>
        </div>
      </article>`;
    A.observe(featuredSlot.querySelector(".reveal"));
    featuredSlot.querySelector("[data-read]").addEventListener("click", () => openArticle(featured));
  }

  function render() {
    const q = search.value.trim().toLowerCase();
    const list = ARTICLES.filter((a) =>
      (filter === "all" || a.cat === filter) &&
      (!q || [a.title, a.place, a.author, a.summary, a.body.join(" ")].join(" ").toLowerCase().includes(q)));
    grid.innerHTML = list.map((a, i) => `
      <article class="card float article-card reveal" style="--delay:${(i % 3) * 0.08}s">
        <div class="article-media">
          <img src="${a.img}" alt="${a.title}" loading="lazy">
          <span class="tag">${a.catLabel}</span>
        </div>
        <div class="article-body">
          <div class="article-meta">
            <img src="${a.avatar}" alt="${a.author}">
            <span>${a.author}</span><span class="dot">•</span><span>${a.readTime}</span>
          </div>
          <h3>${a.title}</h3>
          <p class="place">📍 ${a.place} · ${a.date}</p>
          <p>${a.summary}</p>
          <button class="btn ghost small" type="button" data-read="${a.id}" style="align-self:flex-start">Read article →</button>
        </div>
      </article>`).join("");
    empty.hidden = list.length > 0;
    grid.querySelectorAll(".reveal").forEach((el) => A.observe(el));
  }

  filterBtns.forEach((b) => b.addEventListener("click", () => {
    filter = b.dataset.filter;
    filterBtns.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    render();
  }));
  search.addEventListener("input", render);
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-read]");
    if (!btn) return;
    const a = ARTICLES.find((x) => x.id === btn.dataset.read);
    if (a) openArticle(a);
  });

  render();
})();
