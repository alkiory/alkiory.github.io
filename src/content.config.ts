import { defineCollection } from 'astro:content';
// Zod is no longer re-exported by `astro:content` in Astro 6; install
// it directly and import from the package. This silently removes the
// "deprecated z" hint flagged by `astro check` while keeping the same
// `z.*` schema calls (Zod 4 keeps `z.object/string/array/coerce.date`).
import { z } from 'zod';
import { glob } from 'astro/loaders';

// Content Layer API (Astro 5+). El layout de archivos sigue siendo
// src/content/{blog|work}/{lang}/*.md, por lo que el id que genera el
// loader conserva el patrón "<lang>/<archivo>". Esto preserva las
// URLs existentes y el patrón `id.split("/")` usado en las páginas.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()),
    img: z.string(),
    img_alt: z.string().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()),
    img: z.string(),
    img_alt: z.string().optional(),
  }),
});

export const collections = { blog, work };
