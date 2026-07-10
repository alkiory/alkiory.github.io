import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://alkiory.com',

  // Forzar output deterministico: cada pagina se emite como
  // dist/<lang>/<path>/index.html (terminado en /). Esto es crítico
  // porque nginx decide qué servir segun la URL exacta y sin
  // trailingSlash el output puede variar entre builds.
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
      strategy: 'pathname',
    },
  },

  // Las colecciones (blog, work) se declaran en
  // `src/content.config.ts` con el Content Layer API (loaders).
  // En Astro 6 ya no se usa la opción `collections` en astro.config.

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
