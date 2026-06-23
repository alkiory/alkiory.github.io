/**
 * Any Astro content entry variant that exposes an `id` and a
 * `data.publishDate: Date`. Lets `latest()` accept either `blog` or
 * `work` CollectionEntry arrays (and any future collection that has
 * the same shape) without re-declaring the generic parameter at
 * every call site.
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
    .slice(1, n);
}
