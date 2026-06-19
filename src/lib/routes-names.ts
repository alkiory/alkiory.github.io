enum ROUTE_NAMES {
  WORK = '/portfolio',
  BLOG = '/blog',
  ABOUT = '/about',
  CONTACT = '/contact'
}

export { ROUTE_NAMES }

/**
 * Helper para derivar el slug de URL a partir del `id` que produce el
 * Content Layer API de Astro con el loader `glob()`.
 *
 * El loader genera IDs con extensión (p. ej. `"en/post-name.md"`) y
 * mantiene el prefijo de idioma, por lo que aquí:
 *   1. Eliminamos extensiones de markdown soportadas (`.md`/`.mdx`).
 *   2. Devolvemos un array `[lang, slug]` listo para `getStaticPaths`.
 */
export function splitContentId(
  id: string
): { lang: string; slug: string } {
  const stripped = id.replace(/\.(md|mdx)$/i, '');
  const [lang, slug] = stripped.split('/');
  return { lang, slug };
}

/**
 * Variante que sólo devuelve el slug sin extensión (último segmento del
 * id ya saneado). Útil para componer URLs en componentes o tarjetas.
 */
export function slugFromId(id: string): string {
  return id.replace(/\.(md|mdx)$/i, '').split('/').pop() ?? '';
}
