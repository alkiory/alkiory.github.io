---
title: Optimizando el rendimiento de aplicaciones web con WebAssembly y TypeScript
publishDate: 2024-01-09 00:00:00
img: https://cdn.pixabay.com/photo/2017/08/25/19/11/tuning-world-2681096_1280.jpg
img_alt: Primer plano de un proceso de ajuste mecánico, metáfora visual de la optimización de rendimiento de una aplicación.
description: WebAssembly ejecuta código casi nativo en el navegador. Así funciona, cómo encaja con un codebase TypeScript y las formas realistas de usarlo — sin el error común de creer que TypeScript compila a wasm.
tags:
- WebAssembly
- TypeScript
- Rendimiento
- Rust
---

[WebAssembly](https://webassembly.org/) (normalmente `wasm`) es un formato de instrucciones binarias diseñado para ejecutar código casi a velocidad nativa en el navegador y, cada vez más, en servidores. Mientras que JavaScript se interpreta o compila con JIT en tiempo de ejecución, un módulo wasm se compila de antemano a un formato compacto que el motor puede validar e instanciar rápidamente.

La ventaja clave de rendimiento es predecible: wasm tiene un modelo tipado y fijo y opera sobre una memoria lineal que el motor puede optimizar de forma agresiva, por eso brilla en trabajo intensivo en cómputo como procesamiento de imágenes, criptografía, simulación y matemáticas.

### Una corrección primero: TypeScript no compila a WebAssembly

Hay un error muy extendido, y vale la pena aclararlo antes de seguir: **TypeScript no compila a WebAssembly.** TypeScript es un superconjunto de JavaScript, y se *borra* en tiempo de compilación — el resultado sigue siendo JavaScript. Si quieres escribir código que se convierta en wasm, necesitas un lenguaje que realmente apunte al backend de wasm.

Hay dos rutas realistas:

1. **Rust + wasm-bindgen / wasm-pack.** Con diferencia, el camino más maduro. Escribes la parte caliente en Rust, la compilas a wasm y la enlazas para que JavaScript (y TypeScript) pueda llamarla. [wasm-pack](https://rustwasm.github.io/docs/wasm-pack/) es el tooling que compila, empaqueta y genera el pegamento JS/TS.
2. **AssemblyScript.** Un lenguaje parecido a TypeScript que compila *directamente* a wasm. No es TypeScript — la sintaxis es cercana, pero tiene su propio subconjunto de características (no `any`, ni tipado estructural, ni reflexión) porque mapea limpiamente al modelo de wasm. Es una gran opción si quieres una sintaxis familiar sin aprender Rust.

Así que el planteamiento honesto es: mantienes tu *aplicación* en TypeScript, y compilas a wasm solo el **módulo crítico de rendimiento** desde Rust o AssemblyScript.

### Integrar un módulo Wasm en un proyecto TypeScript

Usando el camino Rust + wasm-pack, el flujo es:

```bash
# Añade los targets de Rust y el tooling
rustup target add wasm32-unknown-unknown
cargo install wasm-pack

# Compila un paquete que también emite bindings JS/TS
wasm-pack build --target web
```

El flag `--target web` produce un módulo que importas con un `import` de ES modules, lo que encaja naturalmente en una app TypeScript con bundler:

```typescript
import init, { add } from "./pkg/math_wrapper.js";

await init(); // compila + instancia (asíncrono)

const sum = add(40, 2);
```

Como la instanciación del módulo wasm es asíncrona, lo inicializas una vez al arrancar (normalmente con un `await` a nivel superior o en el bootstrap de la app) y guardas la referencia para el resto de la sesión.

### Dónde compensa de verdad Wasm

Wasm no es un interruptor genérico de "hazlo más rápido". Compensa cuando la parte caliente es:

- **De verdad intensiva en cómputo** (bucles pesados, matemáticas, simulación) — no de E/S (red, DOM, lectura de archivos), donde el cuello de botella está en otro lado.
- **Llamada muchas veces** en un bucle cerrado, para que el coste de no re-calentar el JIT se amortice.
- **Estable**, para que no pagues el coste de integración con una función que reescribirás la semana que viene.

Un ejemplo clásico es un Fibonacci o una transformación grande de arrays donde el coste funcional de la versión JS (que el JIT no siempre elimina) se acumula. La versión wasm ejecuta el mismo bucle sobre un modelo numérico fijo y evita ese coste.

### Consideraciones de seguridad

Wasm corre en un **sandbox** sin acceso directo a los recursos del host — no puede tocar el DOM, archivos o red sin pasar por una función importada. Eso es un beneficio real de seguridad. Pero las precauciones prácticas son:

- **Carga siempre wasm de una fuente confiable** por HTTPS; no hagas `WebAssembly.instantiateStreaming(fetch(...))` con un módulo que no controlas.
- **Define un `importObject` adecuado** — define qué funciones del host puede llamar el módulo, así que es tu frontera de seguridad.
- **Vigila el tamaño del módulo.** Un binario wasm ya está compilado, pero sigue viajando por la red, así que los bytes importan.

### Conclusión

WebAssembly es una herramienta real y bien soportada, pero *específica*. No lo añadas por defecto. Súmalo a las pocas funciones calientes, intensivas en cómputo y estables de tu app, deja el resto en TypeScript, y conseguirás la ganancia sin el coste.

#### Fuentes y lecturas recomendadas

- [WebAssembly — sitio oficial](https://webassembly.org/)
- [MDN Web Docs — WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [WebAssembly by Example](https://wasmbyexample.dev/)
- [W3C WebAssembly Core Specification](https://www.w3.org/TR/wasm-core-1/)
- [Documentación de wasm-pack](https://rustwasm.github.io/docs/wasm-pack/)
- [AssemblyScript — un lenguaje parecido a TypeScript que compila a WebAssembly](https://www.assemblyscript.org/)
