---
title: Internacionalización i18n en un proyecto de Next.js
publishDate: 2024-02-11 00:00:00
img: https://cdn.pixabay.com/photo/2018/07/08/08/45/abc-3523453_1280.jpg
img_alt: Internacionalización i18n en un proyecto de Next.js por sergio campbell dev
description: La internacionalización, también conocida como i18n (abreviatura de "internationalization"), es un aspecto crucial para alcanzar audiencias globales en el desarrollo de aplicaciones web. En este artículo, te guiaremos a través del proceso de integrar la internacionalización en tu proyecto de Next.js utilizando la librería next-intl.
tags:
- JavaScript
- i18n
- Nextjs
- next-intl
---

##### Integrando la Internacionalización (i18n) en tu Proyecto de Next.js con next-intl

La **internacionalización**, también conocida como **i18n** (abreviatura de "internationalization"), es un aspecto crucial para alcanzar audiencias globales en el desarrollo de aplicaciones web. En este artículo, te guiaremos a través del proceso de integrar la internacionalización en tu proyecto de **Next.js** utilizando la librería `next-intl`.

##### ¿Qué es next-intl?

`next-intl` es una librería que facilita la internacionalización en proyectos de Next.js. Permite la traducción de contenido y la gestión de formatos de fecha, hora y número en diferentes idiomas de una manera simple y eficiente.

##### Pasos para Integrar next-intl en tu Proyecto de Next.js

##### 1. Instalando Dependencias

Para empezar, instala las dependencias necesarias ejecutando el siguiente comando en tu terminal:

```bash
npm install next-intl
````

 y crea la siguiente estructura de archivos:

```bash
├── messages (1)
│   ├── en.json
│   └── ...
├── next.config.mjs (2)
└── src
    ├── i18n.ts (3)
    ├── middleware.ts (4)
    └── app
        └── [locale]
            ├── layout.tsx (5)
            └── page.tsx (6)
```

##### 2\. Configurando next-intl

En tu archivo `next.config.js`, añade la siguiente configuración para habilitar el soporte para `next-intl`:

```js
const { withIntl } = require('next-intl');
module.exports = withIntl();
```

##### 3\. Creando Archivos de Traducción

Crea archivos de traducción para cada idioma que desees admitir en tu aplicación. Por ejemplo, puedes tener archivos como `en.json` para inglés y `es.json` para español, ubicados en un directorio como `public/locales`.

Ejemplo:

```js
{
  "Index": {
    "title": "¡Hola mundo!"
  }
}
```

##### 4\. Configurando next.config.mjs

Ahora, configura el plugin que crea un alias para proporcionar tu configuración de i18n (especificada en el siguiente paso) a los **Componentes del Servidor**.

Si estás utilizando módulos de ECMAScript para tu configuración de Next.js, puedes usar el plugin de la siguiente manera:

\<code class="code"\>
/\*\* @type {import('next').NextConfig} \*/
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
const nextConfig = {};
export default withNextIntl(nextConfig);
\</code\>

Si estás utilizando CommonJS para tu configuración de Next.js, puedes usar el plugin de la siguiente manera:

\<code class="code"\>
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();
/\*\* @type {import('next').NextConfig} \*/
const nextConfig = {};
module.exports = withNextIntl(nextConfig);
\</code\>

##### 5\. Configurando i18n.js

next-intl crea una configuración una vez por solicitud. Aquí puedes proporcionar mensajes y otras opciones dependiendo del idioma del usuario.

\<code class="code"\>
// src/i18n.ts
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
// Se puede importar desde una configuración compartida
const locales = ['en', 'es'];
export default getRequestConfig(async ({locale}) =\> {
  // Valida que el parámetro `locale` entrante sea válido
  if (\!locales.includes(locale as any)) notFound();
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
\</code\>

**🚨 ¿Puedo mover este archivo a otro lugar?**

Este archivo es compatible de forma predeterminada tanto en la carpeta `src` como en la raíz del proyecto con las extensiones `.ts`, `.tsx`, `.js` y `.jsx`.

Si prefieres mover este archivo a otro lugar, puedes proporcionar una ruta opcional al plugin:

```js
const withNextIntl = createNextIntlPlugin(
  // Especifica una ruta personalizada aquí
  './somewhere/else/i18n.ts'
);
```

##### 6\. Configurando middleware.ts

El middleware coincide con un idioma para la solicitud y maneja las redirecciones y reescrituras en consecuencia.

```js
//src/middleware.ts
import createMiddleware 
from 'next-intl/middleware';
export default createMiddleware({
// Una lista de todos los idiomas admitidos
  locales: ['en', 'es'],

// Se utiliza cuando no coincide ningún idioma
  defaultLocale: 'en'
});
export const config = {
// Coincide solo con nombres de ruta internacionalizados
  matcher: ['/', '/(es|en)/:path*']
};
```

##### 7\. Configurando app/[locale]/layout.tsx

El `locale` que coincidió con el middleware está disponible a través del parámetro `locale` y se puede utilizar para configurar el idioma del documento.

```js
//app/[locale]/layout.tsx
export default function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
```

##### Usando Traducciones

¡Utiliza traducciones en los componentes de tu página o en cualquier otro lugar\!

```js
//app/[locale]/page.tsx
import {useTranslations} from 'next-intl';
export default function Index() {
  const t = useTranslations('Index');
  return < h1 >{t('title')}</ h1 >;
}
```

##### Comienza a Internacionalizar tu Aplicación Next.js Hoy Mismo

Con estos sencillos pasos, puedes añadir fácilmente soporte de internacionalización a tu proyecto de Next.js utilizando `next-intl`. Ahora, tu aplicación estará lista para alcanzar una audiencia global y proporcionar una experiencia localizada y personalizada.
¡No esperes más y comienza a internacionalizar tu aplicación hoy mismo\!

**Recuerda seguir la documentación para más detalles**

-----

*Fuentes:*

1. GitHub - Next.js: [https://github.com/vercel/next.js](https://github.com/vercel/next.js)
2. GitHub - next-intl: [https://github.com/amannn/next-intl](https://github.com/amannn/next-intl)
