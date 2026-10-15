# Aquatica 🌊

An interactive, animated, underwater-themed website about protecting water sources and the ocean.
Pure HTML, CSS and vanilla JavaScript — no build step, no dependencies.

## Pages

| Page | What's inside |
| --- | --- |
| `index.html` | Hero, impact counters, page navigator and the **Clean up the bay** mini-game |
| `projects.html` | "Journey of a drop" stepper (source → ocean), filterable/searchable project cards, detail modals with an impact slider |
| `statistics.html` | Animated counters, interactive donut (Earth's water), bar chart (freshwater use), line chart (plastic production) and a **water footprint calculator** |
| `awareness.html` | Threat explorer, myth-vs-fact flip cards, ocean quiz, action tips and a **water pledge** that fills your own reef |
| `team.html` | Filterable crew cards with "ocean spirit animals", values, volunteer sign-up form |
| `goals.html` | 2030 goals with progress rings and milestone modals, a scroll-driven submarine roadmap, UN SDG 6 & 14 alignment |

## Shared effects (`js/main.js`)

Canvas bubbles and marine snow (bubbles follow and avoid your cursor, burst on click), swimming SVG fish,
drifting jellyfish, light rays and caustics, swaying kelp, a scroll **depth gauge** that darkens the water as
you descend, scroll-reveal animations, animated counters and click ripples. `prefers-reduced-motion` is respected.

## Run locally

Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customising

- Team members in `js/team.js`, projects in `js/projects.js` and goals in `js/goals.js` are **placeholder content** — replace them with your organisation's real data.
- Impact numbers on the home page live in `index.html` (`data-count` attributes).
- Global statistics on `statistics.html` are rounded figures from the sources cited beneath each chart.
- Forms (pledge, volunteer) work client-side only; the pledge is saved in the visitor's browser. Connect the volunteer form to your backend or a form service to receive applications.
