---
title: "Framework RPI: qué es y cómo programar con IA"
publishDate: 2026-09-08 00:00:00
img: https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Artificial_Intelligence_%28AI%29_and_Robotics_exhibition_at_the_Heinz_Nixdorf_MuseumsForum.jpg/1920px-Artificial_Intelligence_%28AI%29_and_Robotics_exhibition_at_the_Heinz_Nixdorf_MuseumsForum.jpg
img_alt: Vista de la exposición de inteligencia artificial y robótica del Heinz Nixdorf MuseumsForum.
description: "Aprende qué es el framework RPI (Research, Plan, Implement), cómo funcionan sus tres fases y cómo aplicar las escalas de validación FAR y FACTS para programar con IA de forma fiable."
tags:
- Framework RPI
- Programar con IA
- Ingeniería agéntica
- Desarrollo de software
- Inteligencia artificial
---

**RPI** — por sus siglas en inglés, **Research, Plan, Implement** (investigar, planificar, implementar) — es un framework de tres fases para trabajar con asistentes de programación por IA. En lugar de pedirle a la IA que "construya una funcionalidad" y cruzar los dedos, obligas al trabajo a pasar por dos puntos de control antes de escribir una sola línea de código. La idea es sencilla: darle a la IA una tarea estructurada, validar su resultado en cada etapa y solo entonces dejar que escriba código.

El resultado es un flujo que cambia un poco de velocidad por mucha más fiabilidad. Menos librerías alucinadas, menos "scope creep" y código que pasa sus propias pruebas a la primera — casi siempre.

### ¿Qué es el framework RPI?

RPI es un modelo mental y un conjunto de prácticas para programar software en pareja con un modelo de lenguaje. Lo formalizó por escrito **Patrick Robinson**, ingeniero y coach técnico de IA, en su artículo [Introducing the RPI Strategy](https://patrickarobinson.com/blog/introducing-rpi-strategy/), y está publicado como un [repositorio abierto](https://github.com/patrob/rpi-strategy) en GitHub.

Robinson señala como chispa del framework una charla sobre ingeniería de contexto — [Advanced Context Engineering for Agents](https://www.youtube.com/watch?v=IS_y40zY-hc), de YC Root Access. Trabajos relacionados apuntan en la misma dirección: la charla [12-Factor Agents](https://www.youtube.com/watch?v=8kMaTybvDUw) de HumanLayer (Dex Horthy) cataloga patrones para aplicaciones LLM fiables, la [documentación de Agentic Engineering](https://path.kilo.ai/introduction/patterns/rpi/) describe la misma secuencia Research → Plan → Implement con un ejemplo muy parecido, y el [HVE Core de Microsoft](https://microsoft.github.io/hve-core/docs/rpi/) documenta una variante de RPI que añade una fase final de *Review*. En español también se habla de estos patrones: el canal de [Codely](https://www.youtube.com/watch?v=treFZTL2wyk) presenta RPI como una forma sencilla de hacer desarrollo dirigido por especificaciones (SDD) con IA, y [Betta Tech](https://www.youtube.com/watch?v=RBzGXBYa0Lg) repasa patrones agénticos útiles para trabajar con modelos de lenguaje.

Como varias comunidades formalizaron la idea casi al mismo tiempo, preguntar "quién inventó RPI" tiene varias respuestas razonables. Lo que se repite en todas las versiones es la disciplina de fondo: **separar la comprensión de la toma de decisiones y de la ejecución**, validando entre cada una.

### Cómo funciona: tres fases, dos puertas

El framework divide una tarea de programación en tres fases, cada una con un estado de salida definido. No deberías entrar a medias en la siguiente fase hasta que la anterior esté realmente completa.

#### Fase 1 — Research: construir contexto y comprensión

El objetivo es convertir una petición inicial en una comprensión estructurada del problema: a quién afecta, qué código está implicado y qué opciones existen. Documentas lo que ya existe hoy — no sugieres cambios, ni criticas, ni planificas.

- **"Reverse prompting":** en lugar de volcar tú todos los requisitos, dejas que la IA haga preguntas de clarificación de una en una ("¿debería funcionar desde el gestor de archivos o desde el panel?" "¿hay restricciones de tipo de archivo?"). Esto saca a la luz supuestos que no habías considerado.
- **Documentar lo que existe:** mapea los archivos afectados, describe cómo funciona hoy la funcionalidad y anota las dudas abiertas, todo en un único documento markdown (normalmente `rpi/[problema]/research.md`).
- **Validar con la escala FAR:** puntúa el documento según sea **Factual** (basado en código real, no en suposiciones), **Actionable** (sabes exactamente qué construir) y **Relevant** (resuelve la necesidad real). El umbral de aprobación es **Factual ≥ 4, Actionable ≥ 3, Relevant ≥ 3, media ≥ 4.00**, según la [rúbrica de la escala FAR](https://github.com/patrob/rpi-strategy/blob/main/docs/scales/far-scale.md).

Una persona revisa el documento de investigación antes de continuar. Esta decisión — cuál es el problema *de verdad* — es demasiado importante para delegarla.

#### Fase 2 — Plan: decidir qué hacer y cómo

Ahora conviertes la investigación en un camino ejecutable: una secuencia por fases de **tareas atómicas**, cada una lo bastante simple para ser una llamada de comando o una edición de un archivo. Las tareas atómicas son el corazón del plan: mantienen a la IA en el buen camino, hacen fácil verificar el progreso y evitan que se desborde el contexto.

- **Dividir en fases y checkboxes:** p. ej. Fase 1 "añadir UI de selección múltiple", Fase 2 "crear el modal de confirmación", Fase 3 "implementar la API del backend".
- **Validar con la escala FACTS:** cada tarea debe ser **Feasible** (realizable con las herramientas disponibles), **Atomic** (una sola responsabilidad), **Clear** (sin ambigüedad), **Testable** (con criterios de éxito) y **Scoped** (bien acotada). El umbral de aprobación es **media ≥ 3.00** en las cinco dimensiones, según la [rúbrica de la escala FACTS](https://github.com/patrob/rpi-strategy/blob/main/docs/scales/facts-scale.md).

El plan debe ser lo bastante explícito como para que una sesión de IA nueva — o un desarrollador junior — pueda ejecutarlo sin contexto adicional.

#### Fase 3 — Implement: entregar y aprender

Con un plan validado, la implementación se vuelve deliberadamente aburrida y mecánica. La IA lee el plan, ejecuta tarea por tarea, y tú validas después de cada una.

- **Compuertas de calidad:** tras cada tarea, el *build* debe compilar, el *linter* debe pasar y las pruebas deben pasar. Si falla alguna compuerta, te detienes y arreglas antes de seguir.
- **Checkboxes como puntos de control:** las tareas de `plan.md` van marcándose al completarse. Si el contexto se llena a mitad de camino, los checkboxes permiten a la IA compactar y retomar exactamente donde se quedó.
- **Elegir tu bucle de retroalimentación:** *tarea a tarea* para máximo control, *fase a fase* para equilibrar velocidad y control, o *plan completo* cuando confías en el plan.

### Por qué importan las escalas de validación

Las escalas FAR y FACTS son los guardarraíles del framework. Sin ellas, las tres fases son solo buenos consejos. Con ellas, los fallos se detectan antes de que te cuesten horas:

| Fallo habitual de la IA | Cómo lo previene RPI |
|---|---|
| Desbordamiento de contexto | Las tareas atómicas mantienen el trabajo acotado |
| Alucinación | FAR exige evidencia factual, no suposiciones |
| Problema mal entendido | Research valida la relevancia antes de planificar |
| Código imposible de probar | FACTS exige criterios de éxito claros |
| Scope creep | Las tareas atómicas y las compuertas mantienen los límites |

El framework aprovecha lo que la IA hace bien — encontrar patrones, generar código repetitivo, seguir listas de comprobación — mientras los humanos conservan las decisiones estratégicas y la validación.

### Cómo aplicar RPI en el trabajo real

La receta práctica es lo bastante corta para empezar hoy:

1. **Elige un ticket real.** RPI es para trabajo de varios archivos y de alto impacto: refactorizaciones, migraciones, nuevas funcionalidades, actualizaciones grandes, limpieza tras incidentes. Sáltatelo para un arreglo de una línea o un prototipo rápido — allí la validación no compensa.
2. **Investiga.** En una sesión nueva, pide a la IA que investigue el problema y te vaya haciendo preguntas de una en una. Termina con un `research.md` que mapee los archivos afectados y puntúalo contra FAR.
3. **Revisa tú la investigación.** Confirma el planteamiento del problema antes de que nadie planifique una solución.
4. **Planifica.** En una sesión nueva, entrega el documento de investigación. Pide un plan por fases de tareas atómicas con checkboxes y criterios de éxito. Puntúalo contra FACTS.
5. **Implementa.** En otra sesión nueva, ejecuta el plan tarea a tarea, corriendo build → lint → test después de cada una. Marca las casillas a medida que avanzas.
6. **Elige tu bucle.** Tarea a tarea si quieres control estricto, fase a fase para un ritmo más rápido.

**Una comprobación rápida del coste.** Un [caso de estudio de la documentación de Agentic Engineering](https://path.kilo.ai/introduction/patterns/rpi/) muestra bien la balanza: eliminar una funcionalidad que tocaba 32 archivos llevó unos 9 minutos de investigación, 4 de planificación y 39 de implementación — unos 52 minutos en total — con un *build* que pasó a la primera y sin comentarios de revisión. Es más lento que "hazlo ya", pero también *predecible y correcto*, que es lo que suele importar.

### Un ejemplo concreto

El artículo de Patrick Robinson usa el ticket *"Añadir a los usuarios la posibilidad de borrar sus archivos subidos de forma masiva."*

- **Research:** el *reverse prompting* destapa preguntas que quizá se te escaparon (¿dónde vive la acción? ¿hay restricciones de tipo de archivo? ¿qué pasa con los archivos compartidos?), y luego la IA mapea el código relevante y redacta un documento de investigación que aprueba FAR.
- **Plan:** la IA produce una lista de tareas atómicas por fases con checkboxes — añadir la UI de selección múltiple, construir el modal de confirmación con el número de archivos, implementar la API de borrado — y cada fase aprueba FACTS.
- **Implement:** la IA recorre las tareas, validando *build*, pruebas y *lint* tras cada una, manteniéndote a ti en el control de las decisiones mientras ella se encarga de la mecánica.

### Una ejecución real: añadir tiempo de lectura a este blog

Para que quede claro, hagamos el ciclo sobre una tarea real en la base de código de este mismo blog — un sitio Astro con contenido bilingüe (`en`/`es`). La tarea: **mostrar un tiempo de lectura estimado en cada artículo.**

**Research (investigar).** Enmarcamos el problema y dejamos que el asistente lo sondeara. Surgieron algunas preguntas de *reverse prompting* que no había pensado del todo: ¿debe calcularse el estimado desde el Markdown fuente o desde el HTML renderizado? ¿Debe ser sensible al idioma? ¿Y los artículos llenos de bloques de código — un recuento ingenuo de palabras inflaría el número? Mapeé los archivos relevantes y los anoté en un documento de investigación:

```
F: 4  A: 4  R: 4  Mean: 4.00  --> PASS
```

El hallazgo factual clave: la Content Layer API ya expone el cuerpo Markdown de cada artículo (`entry.body`) y el diccionario i18n ya tiene un namespace `blog` para ambos idiomas. Eso significa que la función es puramente un cálculo en tiempo de compilación — sin JavaScript en tiempo de ejecución. Saber qué existía ya me evitó sobre-construir.

**Plan (planificar).** Convertí la investigación en tareas atómicas con checkboxes, cada una con una sola responsabilidad:

```
## Fase 1: helper de tiempo de lectura
- [x] Crear src/lib/reading-time.ts (quita código, cuenta palabras, ~200 ppm)

## Fase 2: strings de i18n
- [x] Añadir readingTime a los namespaces blog de es y en

## Fase 3: renderizar en el hero del artículo
- [x] Importar helper + traducciones en [slug].astro
- [x] Renderizar la línea de tiempo de lectura
- [x] Añadir el estilo .reading-time

F: 5  A: 4  C: 4  T: 4  S: 4  Mean: 4.20  --> PASS
```

Fíjate en la decisión de alcance en la fase Plan: marqué deliberadamente mostrar el tiempo en las **tarjetas** del índice del blog como *fuera de alcance*. Eso mantuvo el cambio pequeño y comprobable en lugar de convertirlo en un rediseño de tarjetas.

**Implement (implementar).** Ejecuté las tareas en orden, pasando las puertas de calidad del repo tras cada una. Aquí no hay un runner de tests unitarios configurado, así que la puerta es `astro check` (TypeScript estricto) más un `astro build` completo. Ambas pasaron — 60 páginas construidas — y el estimado se renderizó en ambas variantes de idioma:

- `/en/blog/...` → **7 min read**
- `/es/blog/...` → **8 min de lectura**

Esa es la ganancia de las tareas atómicas: el propio archivo de plan se convirtió en el rastreador de progreso, y la puerta de build no detectó nada porque cada cambio era lo bastante pequeño para razonar sobre él. Toda la función fueron tres archivos y un módulo nuevo.

### Dónde encaja en el panorama general

RPI forma parte de un cambio más amplio en cómo los equipos usan la IA. La pregunta ya no es "¿puede la IA escribir código?" sino "¿cómo la dirigimos hacia resultados fiables?". Frameworks como este responden haciendo auditable el trabajo de la IA: cada fase produce un artefacto, cada artefacto se puntúa y la persona revisa las decisiones importantes.

No es una bala de plata, y no es la herramienta adecuada para todas las tareas. Pero para el trabajo complejo de varios archivos donde los asistentes de programación son más útiles — y más propensos a descarrilarse — poner un poco de estructura delante del modelo se paga rápido.

#### Fuentes y lecturas recomendadas

- [Patrick Robinson — Introducing the RPI Strategy](https://patrickarobinson.com/blog/introducing-rpi-strategy/)
- [patrob/rpi-strategy — RPI Strategy for Agentic Engineering](https://github.com/patrob/rpi-strategy)
- [Agentic Engineering — Research, Plan, Implement (RPI)](https://path.kilo.ai/introduction/patterns/rpi/)
- [Codely — Programar con IA así sí: Qué es RPI (Research, Plan, Implement)](https://www.youtube.com/watch?v=treFZTL2wyk)
- [Betta Tech — 4 Patrones Agénticos que deberías conocer](https://www.youtube.com/watch?v=RBzGXBYa0Lg)
- [HumanLayer — 12-Factor Agents (Dex Horthy)](https://www.youtube.com/watch?v=8kMaTybvDUw)
- [YC Root Access — Advanced Context Engineering for Agents](https://www.youtube.com/watch?v=IS_y40zY-hc)
