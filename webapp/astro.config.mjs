import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://alkiory.web.app',
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
