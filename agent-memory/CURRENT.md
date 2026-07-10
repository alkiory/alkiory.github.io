# project state — alkiory.github.io

Static Astro/TS portfolio (es/en) for Alkiory (Sergio Campbell). SSG, deployed to Firebase Hosting + Docker/Nginx Proxy Manager.

Last full review: 2026-07-10.

---

## Tech stack (locked — change with care)

- **Astro 6** with `output: static` (no SSR runtime). Content Layer API with `glob()` loaders in `src/content.config.ts`.
- **TypeScript** strict (`tsconfig.json`).
- **Tailwind v4** (`@import "tailwindcss"` in `src/styles/global.css`).
- **pnpm** workspace. `pnpm-workspace.yaml` is mostly a stub today.
- **Firebase Hosting** (`firebase.json`) + **Docker/Nginx Proxy Manager** behind it.

Local commands:
- `pnpm exec astro check` — expected 0 errors / 0 warnings.
- `pnpm run build` — expected ~57 static pages emitted cleanly.
- `pnpm dev` — dev server (open `http://localhost:4321/es/` and `/en/`).
- `pnpm preview` — production preview.

---

## Architecture decisions — DO NOT "fix" without reading this

### 1. Locale + URL shape is contractually fixed

- Locales are `es` and `en`. Astro i18n config (`astro.config.mjs`) sets `prefixDefaultLocale: true`, so URLs look like `/es/about/` and `/en/about/`.
- `trailingSlash: 'always'` is **mandatory** — nginx Proxy Manager matches URLs against `dist/<lang>/<path>/index.html` (no extension, trailing slash). Changing this WILL break prod.
- Locale detection pattern, canonical: `Astro.currentLocale ?? Astro.url.pathname.split("/")[1]`. Bare `split("/")[1]` alone can mis-resolve when Astro's runtime hasn't classified the request yet.

### 2. Theme is class-based, not OS-based

- `<html class="theme-dark">` is toggled by `src/components/ThemeToggle.astro`; persisted via `localStorage("theme")` by the inline script in `MainHead.astro`.
- Tailwind `dark:bg-X` is wired to `.theme-dark` via `@custom-variant dark (&:where(.theme-dark, .theme-dark *))` in `global.css`. `dark:` follows the explicit toggle, **not** `prefers-color-scheme`.
- Inside components, prefer adding new theme-aware tokens to `:root` + `:root.theme-dark` over per-component overrides. When you need a one-off, use `:root.theme-dark .my-class {}` selectors.
- `box-shadow` colour stops do NOT compose with `var(...)` in raw RGBA. If you need a translucent theme-coloured glow, hardcode the hex into RGBA and add a comment (e.g. `var(--accent-regular)` = `#7611a6` → `rgba(118, 17, 166, …)`).

### 3. i18n strings live only in `src/data/i18n.ts`

- Sections: `navbar`, `footer`, `home`, `blog`, `about`, `contact`, `portfolio`, `notFound`. Add new strings here; never inline-rebuild.
- `type Lang = keyof typeof translations`. Use `getTranslations(lang)` for lookups.
- Per-locale **data shape must be literal** (`{ es: string; en: string }`), NOT `Record<Lang, …>`. The Record variant allows silently missing locale values; the literal variant forces both locales at compile time.

### 4. Content collections

- Defined in `src/content.config.ts` with `glob()` loaders. Collections: `blog`, `work`, `snippets` — each has its own Zod schema.
- ID format: `<lang>/<slug>.md` (or `.mdx`). Helpers in `src/lib/routes-names.ts`:
  - `slugFromId(id)` — strips `.md`/`.mdx`, returns last segment.
  - `splitContentId(id)` — returns `{ lang, slug }`.
- "Top N newest" sorts go through `latest(entries, n)` in `src/lib/content-helpers.ts`. Sort key is `publishDate` desc + `id.localeCompare(b.id, "en")` (explicit locale for cross-runtime stability). Returns a NEW array — input is never mutated.

### 5. Routes & helpers

- Stable route constants in `src/lib/routes-names.ts` enum: `WORK`, `BLOG`, `ABOUT`, `CONTACT`. Nav builds the home URL `/${lang}/` manually because `HOME = ''` is intentionally NOT in the enum — adding it would change existing call sites.
- `src/lib/static-paths.ts` exports `getLocalePaths()` for `getStaticPaths`. **Currently dead code** — every `pages/[lang]/*.astro` still inlines a `locales.map(...)`. Wire through or delete (don't leave both).

### 6. Component conventions (a11y, performance)

- All components are Astro (no React/Vue). `<script>` blocks are processed per-route by Astro — small ones inlined into the HTML, larger ones as separate JS chunks.
- Interactive components follow this a11y baseline:
  - Native `<details>`/`<summary>` accordion, NOT custom JS. Chevron is a pure-CSS `border-style` triangle (not a Unicode glyph) so metrics are stable across OS fonts.
  - `:focus-visible` uses `outline + outline-offset`. Color-only focus is NOT WCAG 2.4.7-compliant.
  - `prefers-reduced-motion: reduce` neutralises every transition/animation, **including pseudo-elements**. Pseudo-element transitions do NOT inherit from the parent `transition` — list `.card::before` etc. explicitly.
  - Decorative pseudo-layers (`.card::before/::after`, gradient overlays, glow halos) have `pointer-events: none` so card links remain clickable.

---

## What's CURRENTLY working (evidence, validated 2026-07-10)

| Surface | Evidence |
|---|---|
| Typecheck | `pnpm exec astro check` → 0 errors / 0 warnings. |
| Build | `pnpm run build` → 57 pages emitted in ~1.7 s, no build errors/warnings. `dist/es/index.html` 50,243 B, `dist/en/index.html` 49,803 B. |
| Timeline markup (es + en) | `grep -o` per locale: 9 `timeline-item`, 9 `<details`, 9 `timeline-details-summary`, 9 `data-timeline-item`, 9 timeline dots. |
| Dark-theme palette flip | `dist/_astro/index.*.css`: 2 `#22d3ee` (light kept), 2 `:root.theme-dark` rules, 10 `var(--accent-regular)`, 4 `var(--accent-light)` references. |
| IntersectionObserver hydration | `grep -o 'IntersectionObserver' dist/es/index.html dist/en/index.html` → 1 hit each. The Timeline script is inlined into the HTML, so the fill animation runs without an extra JS chunk. |
| Multi-language summaries in cards | All 9 Spanish + 9 English summary sentences render in their respective `dist/<lang>/index.html`. |

---

## Open work / known limitations

- `src/lib/static-paths.ts` is dead code. Wire through `getLocalePaths()` in every `pages/[lang]/*.astro`, or delete the file. Today the inline `locales.map(...)` is the de-facto source of truth.
- No automated tests anywhere in the project. `latest(entries, n)` in `src/lib/content-helpers.ts` is the most reasonable first unit-test target (add Vitest).
- `pnpm exec astro check` reports 18 hints, not warnings: deprecated `z` usage in `src/content.config.ts` and one unused `ROUTE_NAMES` import in `src/components/CardPreview.astro`. Clean up opportunistically.
- `ROUTE_NAMES` enum does not include `HOME = ''` — Nav hand-builds `/${lang}/`. The asymmetry is intentional but easy to mistake for a bug unless you know.
