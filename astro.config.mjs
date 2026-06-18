import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://alkiory.web.app',

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

  // Configuración para Content Collections
  collections: ['blog', 'work'],

  vite: {
    plugins: [tailwindcss()],
  },

});
