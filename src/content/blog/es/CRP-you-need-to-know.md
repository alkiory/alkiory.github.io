---
title: CRP (Critical Rendering Path) que necesitas saber
publishDate: 2024-12-20 00:00:00
img: https://cdn.pixabay.com/photo/2023/11/29/14/15/forest-8419725_1280.jpg
img_alt: CRP (Critical Rendering Path) por sergio campbell dev
description: CRP que solemos usar y no sabemos que lo usamos 🧐.
tags:
- TypeScript
- JavaScript
- HTML
- CSS
- DOM
---

### Entendiendo la Ruta Crítica de Renderizado (CRP) en el Desarrollo Web

---

La **Ruta Crítica de Renderizado (CRP)** es un concepto clave en la optimización del rendimiento web, que se centra en cómo los navegadores convierten HTML, CSS y JavaScript en píxeles en una pantalla. Comprender la CRP ayuda a los desarrolladores a optimizar sus sitios web para tiempos de carga más rápidos y mejores experiencias de usuario. En este artículo, exploraremos la CRP en detalle, explicaremos sus componentes y proporcionaremos consejos prácticos y recursos para la optimización.

### ¿Qué es la Ruta Crítica de Renderizado?

La Ruta Crítica de Renderizado se refiere a la secuencia de pasos que el navegador sigue para renderizar una página web. Este proceso implica:

1. **Parsear HTML para crear el Modelo de Objeto de Documento (DOM).**
2. **Parsear CSS para crear el Modelo de Objeto CSS (CSSOM).**
3. **Combinar el DOM y el CSSOM para crear el Árbol de Renderizado.**
4. **Calcular el diseño de los elementos en la página.**
5. **Pintar los píxeles en la pantalla.**

### Pasos de la Ruta Crítica de Renderizado

#### 1. Parseo de HTML y Construcción del DOM

El navegador comienza parseando el documento HTML para construir el **DOM**. El DOM es una estructura similar a un árbol que representa el contenido y la estructura de la página web.

- **Ejemplo:**

  ```html
  <html>
    <head>
      <title>My Page</title>
    </head>
    <body>
      <h1>Hello, World!</h1>
      <p>Welcome to my website.</p>
    </body>
  </html>
  ```

- **Árbol DOM:**

  ```sheet
  Document
  ├── html
      ├── head
      │   └── title
      │       └── My Page
      └── body
          ├── h1
          │   └── Hello, World!
          └── p
              └── Welcome to my website.
  ```

#### 2. Parseo de CSS y Construcción del CSSOM

Simultáneamente, el navegador parsea los archivos CSS para construir el **CSSOM**, que representa los estilos aplicados a los elementos del DOM.

- **Ejemplo:**

  ```css
  body {
    font-family: Arial, sans-serif;
  }
  h1 {
    color: blue;
  }
  ```

- **CSSOM:**

  ```sheet
  Stylesheet
  ├── body
  │   └── font-family: Arial, sans-serif
  └── h1
      └── color: blue
  ```

#### 3. Creación del Árbol de Renderizado

El navegador combina el DOM y el CSSOM para crear el **Árbol de Renderizado**, que representa los elementos visuales en la pantalla.

- **Árbol de Renderizado:**

  ```sheet
  RenderRoot
  ├── RenderBody (font-family: Arial, sans-serif)
      ├── RenderH1 (color: blue)
      └── RenderP
  ```

#### 4. Diseño (Layout)

El navegador calcula el diseño de cada elemento en el Árbol de Renderizado, determinando su tamaño y posición en la pantalla.

- **Ejemplo:**
  - El navegador determina la posición y el tamaño de los elementos `<h1>` y `<p>` basándose en los estilos aplicados.

#### 5. Pintado (Painting)

Finalmente, el navegador pinta los píxeles en la pantalla, renderizando la representación visual de la página web.

### Optimizando la Ruta Crítica de Renderizado

Optimizar la CRP implica minimizar el tiempo que le toma a un navegador renderizar la página. Aquí tienes algunos consejos prácticos:

#### 1. Minimizar Recursos Críticos

- **CSS Crítico en Línea:** Coloca el CSS crítico directamente en la etiqueta `<head>` del HTML para reducir los recursos que bloquean el renderizado.

  ```html
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    h1 {
      color: blue;
    }
  </style>
  ```

#### 2. Aplazar JavaScript No Esencial

- **Atributos Async y Defer:** Usa los atributos `async` y `defer` para cargar archivos JavaScript sin bloquear el renderizado.

  ```html
  <script src="script.js" defer></script>
  ```

#### 3. Optimizar la Entrega de CSS

- **CSS Crítico:** Extrae e inyecta solo el CSS crítico necesario para el contenido "above-the-fold" (lo que se ve sin hacer scroll).
  - Herramientas como [Critical](https://github.com/addyosmani/critical) pueden automatizar este proceso.

#### 4. Minimizar Recursos que Bloquean el Renderizado

- **Cargar CSS Primero:** Asegúrate de que los archivos CSS se carguen antes de renderizar el contenido. Usa la etiqueta `<link>` con el atributo `rel="stylesheet"` en el `<head>`.

  ```html
  <link rel="stylesheet" href="styles.css">
  ```

### Herramientas y Recursos para la Optimización de la CRP

- **Lighthouse:** La herramienta Lighthouse de Google proporciona auditorías de rendimiento y sugiere optimizaciones, incluidas mejoras en la CRP.
  - [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)

- **PageSpeed Insights:** PageSpeed Insights de Google analiza el contenido de una página web y genera sugerencias para hacerla más rápida.
  - [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

- **WebPageTest:** Una herramienta de código abierto que proporciona análisis de rendimiento detallados, incluyendo información sobre la CRP.
  - [WebPageTest](https://www.webpagetest.org/)

- **Critical:** Un módulo de Node.js para extraer e inyectar CSS de la ruta crítica.
  - [Critical en GitHub](https://github.com/addyosmani/critical)

### En Resumen

Comprender y optimizar la **Ruta Crítica de Renderizado** es esencial para mejorar el rendimiento web. Al enfocarse en una entrega eficiente de HTML, CSS y JavaScript, puedes asegurar tiempos de carga más rápidos y una mejor experiencia de usuario. Utiliza las herramientas y técnicas discutidas para analizar y optimizar tus páginas web, haciéndolas más responsivas y fáciles de usar.

---

*Fuentes:*

1. [Google Developers: Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)
2. [MDN Web Docs: CSS Object Model (CSSOM)](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model)
3. [Google Developers: Optimize CSS Delivery](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery)
4. [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
5. [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
6. [WebPageTest](https://www.webpagetest.org/)
7. [Critical GitHub Repository](https://github.com/addyosmani/critical)

Estos recursos proporcionan información detallada sobre la CRP y herramientas para optimizar el rendimiento web.

*¡Juntos, construimos mejor código!*
