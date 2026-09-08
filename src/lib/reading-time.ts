/**
 * Estimate reading time (in whole minutes) for a Markdown blog post body.
 *
 * Designed to be computed once at build time — no runtime JS required.
 * It strips the parts of a Markdown body that inflate a naive word count
 * (fenced code blocks, HTML/Astro tags and markdown symbols), counts the
 * remaining words and converts at a conservative ~200 words per minute,
 * which suits technical prose. It always returns at least 1 minute.
 *
 * The value is a rough signal, not a guarantee: it ignores how much code
 * the reader skims vs. reads, and it applies the same rate to English and
 * Spanish content for now.
 *
 * @param markdown - the raw Markdown body of a post (frontmatter already
 *   stripped by the Content Layer API, i.e. `entry.body`).
 * @returns estimated reading time in whole minutes, clamped to a minimum of 1.
 */
const WORDS_PER_MINUTE = 200;
const MIN_READING_TIME = 1;

export function readingTime(markdown: string): number {
  const words = wordsInMarkdown(markdown);
  const minutes = Math.round(words / WORDS_PER_MINUTE);
  return Math.max(MIN_READING_TIME, minutes);
}

function wordsInMarkdown(markdown: string): number {
  const plain = markdown
    // Drop fenced code blocks (```...```) — code is skimmed, not read.
    .replace(/```[\s\S]*?```/g, " ")
    // Drop inline code spans (`code`).
    .replace(/`[^`]*`/g, " ")
    // Drop HTML / Astro tags (<Component ... />, <div>...</div>).
    .replace(/<[^>]+>/g, " ")
    // Images: ![alt](src) -> keep the alt text, drop the rest.
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    // Links: [label](href) -> keep only the label.
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    // Strip markdown symbols: headings, emphasis, lists, quotes, pipes.
    .replace(/[#>*_~|]/g, " ")
    // Collapse whitespace to single spaces for a clean word split.
    .replace(/\s+/g, " ")
    .trim();

  if (!plain) return 0;
  return plain.split(" ").length;
}
