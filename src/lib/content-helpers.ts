/**
 * Any Astro content entry variant that exposes an `id` and a
 * `data.publishDate: Date`. Lets `latest()` and `entriesForLang()`
 * accept either `blog` or `work` CollectionEntry arrays (and any
 * future collection that has the same shape) without re-declaring
 * the generic parameter at every call site.
 */
type DatedEntry = {
  id: string;
  data: { publishDate: Date };
};

/**
 * Sort + slice an Astro content collection entries newest-first,
 * with `id` as a secondary tiebreaker so same-day posts render in a
 * deterministic order regardless of the glob loader's entry order.
 *
 * Behavior:
 *   - Primary key: `publishDate` descending (newest first).
 *   - Secondary key: `id` lexicographic ascending, pinned to the
 *     `"en"` locale so the comparison is stable across runtimes.
 *     Without an explicit locale, `localeCompare` would resolve to
 *     the runtime default and could flip the order between
 *     Node/Browser/Workers builds.
 *
 * Default `n` is the full input length, so `latest(entries)` returns
 * every entry sorted. Pass an explicit `n` for "top N" previews on
 * landing pages.
 *
 * Pure: returns a new array via spread + `slice()` so the caller's
 * array is never mutated even though the spec would let us sort in
 * place.
 */
export function latest<T extends DatedEntry>(
  entries: readonly T[],
  n: number = entries.length,
): T[] {
  return [...entries]
    .sort(
      (a, b) =>
        b.data.publishDate.getTime() - a.data.publishDate.getTime() ||
        a.id.localeCompare(b.id, "en"),
    )
    .slice(0, n);
}

/**
 * Central "scope to current lang + sort newest-first + optional slice"
 * used by the home, portfolio and blog index routes. Single source of
 * truth for filtering Astro content collections by language.
 *
 * Why this lives here instead of inline at each call site:
 *   The Content Layer loader (`src/content.config.ts`) globs every
 *   `*.md` under `src/content/{blog|work}`, producing one entry per
 *   file with the id pattern `<lang>/<file>` (e.g.
 *   `es/face-recognition`, `en/face-recognition`). Without filtering
 *   by lang the collection returns both language variants of the
 *   same content and `latest()`'s top slice would surface the same
 *   project twice instead of two distinct ones — a bug we already
 *   tripped on in `pages/[lang]/index.astro`. Centralizing the
 *   filter here means the home, portfolio and blog previews can't
 *   drift.
 *
 * Behavior:
 *   - Filter entries whose `id` starts with `lang`. The filter is
 *     intentionally string-prefix rather than `id === lang` because
 *     the loader always appends `/` after the lang segment.
 *   - Delegate sorting and slicing to `latest()`. If `n` is omitted
 *     `latest()`'s default returns every matching entry in date
 *     order.
 *
 * Pure: returns a new array via `Array.prototype.filter` and
 * `latest()`'s spread+slice so the caller's collection is never
 * mutated.
 */
export function entriesForLang<T extends DatedEntry>(
  entries: readonly T[],
  lang: string,
  n?: number,
): T[] {
  return latest(entries.filter(({ id }) => id.startsWith(lang)), n);
}
