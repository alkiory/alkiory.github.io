# Content Refit — Status

The blog content-refit work described in the original plan (`rpi/content-refit/plan.md`, since deleted) is **COMPLETE** as of 2026-09-08. This doc records what was done and the conventions to keep. Validation gates for every change: `pnpm exec astro check` → 0 errors, `pnpm run build` → 60 pages.

## Final state (validated 2026-09-08)

| Gate | Result |
|---|---|
| `pnpm exec astro check` | 0 errors / 0 warnings / 3 hints (pre-existing, unrelated to content) |
| `pnpm run build` | 60 pages in ~2.1 s, clean |
| Emoji-template headings | 0 left in `src/content/blog/` |
| `#####` section headings | 0 left (all converted to `###`) |
| `<code class="code">` pseudo-blocks | 0 left (all converted to fenced code) |
| Google search-result citation URLs | 0 left in blog content |
| Hotlinked postimg/cloudinary images | Only the card `img` in override-debugging-devtool remains (resolves 200; inline step screenshots replaced by a pointer to the official docs) |
| ```sheet``` fences | 0 left (converted to ```text```) |

## What was done, by workstream

### W1 — Structural normalization (DONE)
- All `#####` → `###` in design-patterns (EN `design-patterns-javascript-typescript` + ES `Desmitificando-los-Patrones-de-Diseno`) and Internationalization-next (EN+ES).
- `<code class="code">` blocks → proper fenced code in Internationalization-next (EN+ES). NOTE: the ES file had the whole blocks backslash-escaped (`\<code\>`, `\*`, `\!`); a Python regex pass unescaped them — check `git diff` if something looks off.
- Stray backtick in `npm install next-intl\`` fixed (EN).
- Emoji headings removed everywhere (take-a-rest, software-engineer-vs-operator, override-debugging-devtool, microfrontends conclusions/resources).
- `date:` keys removed, `tags:` YAML-normalized, `img_alt` fixed (done in the earlier 2026-09-08 pass).
- EN design-patterns post renamed (slug change, no redirect — see CURRENT.md §4).

### W2 — Citations & facts (DONE)
- **elections-who-is-affected (EN+ES)**: all 5 Google-search-wrapped citations replaced with direct URLs (La Silla Vacía, Agencia Pública, Semana, Infobae, Invías/X — all verified HTTP 200). Evaluative claims (media bias, "in reality the forum was an attack") softened to attributed/first-person language ("media watchdogs have criticized…", "in my view…"). Ownership claims reduced to public-record facts (Gilinski owns Semana since 2023, etc.). Sources list now links every named outlet. Dropped the unverifiable "Al Punto" and "Canal Uno" paragraphs; Colombiacheck added as the fact-checking reference.
- **How-to-avoid-burnout (ES)**: Google-wrapped WHO URL replaced with the direct `who.int/es/...` URL; heading-level + sources-section normalized (EN+ES).
- **Exploring-variety-js-frameworks (EN+ES)**: stale docs URLs (`reactjs.org`, `angular.io`, `vuejs.org/v2`) replaced with current ones (`react.dev`, `angular.dev`, current Vue/Node docs).

### W3 — Content deepening (DONE)
Full rewrites with named, verifiable sources (EN+ES, written natively per locale):
- **take-a-rest**: unnamed "neuroscience studies" → Dewar 2014 (wakeful rest consolidation), Parra 2026 meta-analysis, Ariga & Lleras 2011 (vigilance breaks), Albulescu 2022 (micro-breaks PLOS ONE), Baird 2012 (mind-wandering incubation), Van Dongen 2003 (chronic sleep restriction), Sonnentag 2014 (psychological detachment), Pang's *Rest*. Each micro-strategy item is now mapped to the mechanism it exercises.
- **multitasking**: zero-citation post → Monsell 2003 (task-switching costs), APA multitasking summary, Ophir/Nass/Wagner 2009 PNAS (heavy media multitaskers have worse attentional control). Narrative voice kept; emoji bullets cleaned.
- **software-engineer-vs-operator**: emoji/table template → plain prose; unverifiable corporate sources (Grupo Alisios, Ag-RobotX, IAT, UFV, SPC) → BCG 2015 Industry 4.0 report + Deloitte/Manufacturing Institute 2024 workforce study + Deloitte Industry 4.0 overview + Liker's *The Toyota Way*. Hotlinked postimg Venn diagram removed (content carried by prose).
- Earlier pass (same day): Optimizing-WASM, people-over-stack, Tolerance-and-programmer-ego — see git history.

### W4 — Work collection (DONE)
- All 8 work entries per locale verified: front matter matches schema; every repo/live URL HTTP-checked (all 200 except one).
- **`chat-react-c9d77.web.app` returns 404** (Firebase project expired). EN+ES entries updated: demo marked as "was live / currently offline, run locally from the repo", dead "Live demo" link removed from both link lists. If the project is re-deployed, restore the link.

## Editorial conventions now in force (keep for future posts)

- Sections use `###`; the title is the rendered H1. Never `#####`.
- Plain prose; no emoji-templated headings, no benefits/risks tables-as-structure.
- Every external claim carries an inline `[source](url)` near the claim; posts end with `#### Sources & Further Reading` (ES: `#### Fuentes y lecturas adicionales`).
- Original URLs only — never Google search-result URLs.
- Evaluative/contested claims get attributed language ("X critics argue…") or first-person framing ("in my view…").
- No hotlinked third-party screenshots; point to the official docs instead, or host assets in `public/`.
- EN and ES are separate files with parallel (not identical) content; slugs are independent per locale.
- Validate every change with `astro check` + `astro build` (60 pages).
