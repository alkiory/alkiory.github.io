---
title: El stack no es el corazón del proyecto. Las personas sí.
publishDate: 2025-07-20 00:00:00
img: https://cdn.pixabay.com/photo/2017/12/16/01/42/madrid-3021998_1280.jpg
img_alt: Una calle de Madrid, España — metáfora de cómo muchas personas y sistemas distintos se juntan para mantener vivo un proyecto.
description: Un stack no salva un proyecto cuyo equipo no se comunica. Esto es lo que dice la investigación sobre seguridad psicológica y topología de equipos sobre por qué las personas, no las herramientas, deciden el resultado del software.
tags:
- cultura de código
- seguridad psicológica
- topología de equipos
- ingeniería humana
---

Un stack no salva un proyecto. Muchísimos sistemas bien diseñados no llegaron a ningún lado porque el equipo detrás no se ponía de acuerdo. Como desarrolladores discutimos todo el tiempo sobre frameworks, bases de datos y patrones — pero la evidencia sobre qué predice realmente la entrega apunta a otro lado: las personas y cómo interactúan.

La frase que siempre me vuelve a la cabeza es la misma con la que abre este artículo: *"El stack no es el corazón del proyecto. Las personas sí."* Suena a frase motivacional. La investigación sugiere que está más cerca de un hecho medido.

### La tecnología es el medio, no el fin

El stack es el conjunto de herramientas y lenguajes con los que construyes. Importa — determina qué es fácil de construir, dónde están los cuellos de botella de rendimiento y lo difícil que es contratar. Pero una guitarra de alta gama no hace al músico.

El matiz importante: un stack es *autónomo* en el sentido de que no puede compensar un equipo que falla. Que dos equipos con stacks idénticos tengan resultados radicalmente distintos es una observación tan común que se volvió un lugar común. La diferencia normalmente no es el talento bruto; es cómo se toman las decisiones, si la gente se siente segura para discrepar y si el equipo comparte un modelo mental de lo que está construyendo.

### Qué dice realmente la investigación

La evidencia más fuerte a favor de "personas sobre stack" no es anécdota — son dos décadas de medición.

**La seguridad psicológica es el predictor más fuerte de equipos de alto rendimiento.** En el [Project Aristotle](https://rework.withgoogle.com/en/guides/understanding-team-effectiveness) de Google, un estudio de más de 180 equipos que duró años, la seguridad psicológica — la creencia compartida de que es seguro arriesgarse, preguntar y admitir errores — fue el predictor #1 de eficacia del equipo, por delante del talento individual y la antigüedad. Eso no es un eslogan motivacional; es un hallazgo empírico.

**La estructura del equipo impulsa la carga de comunicación.** _Team Topologies_ (Matthew Skelton y Manuel Pais) sostiene que cómo organizas los equipos — su tamaño, sus límites, sus modos de interacción — es en sí mismo una decisión de diseño. Un stack de alto rendimiento puede entregar mal si los equipos están formados de modo que cada cambio exige cadenas largas de coordinación. La premisa del libro es que **el diseño organizacional es una preocupación de ingeniería de primera clase**, no algo de recursos humanos.

**La cultura predice el rendimiento de entrega, no al revés.** Los [estudios DORA](https://dora.dev/research/) — la investigación longitudinal más grande sobre entrega de software, dirigida durante más de una década por investigadores como Nicole Forsgren, Jez Humble y Gene Kim — encuentran de forma consistente que una cultura organizacional "generativa" (confianza, intercambio de información, manejo sin culpas de los fallos) se correlaciona con mayor rendimiento de entrega y menor burnout. Que la cultura prediga el throughput más que las herramientas que elegiste es exactamente la tesis "personas sobre stack", pero en forma de datos.

En resumen: el stack es una restricción y un habilitador, pero es la **distribución de la atención, la confianza y la toma de decisiones** entre las personas lo que determina los resultados.

### Un proyecto real, una decisión real

En un proyecto reciente, nuestro equipo tuvo que resolver una decisión genuinamente técnica: migrar a microservicios o mantener un monolito limpio. El debate se presentó como técnico — acoplamiento, escalado, despliegue. Pero la resolución no tuvo casi nada que ver con el código.

Se redujo a:

- Si el equipo compartía suficiente contexto para hacer suyo el cambio.
- Cuál era el coste de mantenimiento realista dado *nuestro* personal, no uno hipotético.
- Si el equipo tenía el ancho de banda cognitivo y emocional para absorber esa complejidad justo ahora.

La decisión de arquitectura fue, en la práctica, una **decisión de capacidad de equipo y comunicación disfrazada de decisión técnica.** Esa es la verdadera lección. Las buenas decisiones técnicas respetan la forma real del equipo.

### El análisis crítico

Poner el foco en la parte humana de la ingeniería tiene beneficios reales y costes reales que conviene reconocer:

- **Beneficios:** equipos más resilientes, decisiones que se sostienen (porque todos las entienden) y conocimiento que se expande en vez de concentrarse en una sola persona.
- **Riesgos:** puede verse como "menos técnico" en organizaciones que premian el heroísmo individual; es más difícil de justificar ante un stakeholder que quiere una fecha, no un discurso sobre cultura; y exige esfuerzo deliberado y continuo — no hay un arreglo de una sola vez.

El riesgo que vale la pena nombrar: "personas" no es una excusa para evitar el rigor de ingeniería. El punto es que ambos importan, y la dimensión humana es la que se suele saltar.

### Qué hacer distinto

Puedes actuar hoy, sin una gran iniciativa:

- **Haz que sea seguro preguntar.** Cuenta cuántas veces alguien dijo "no sé" o "¿por qué hacemos esto?" en tu última sesión de planificación. Si es cercano a cero, es una señal, no una virtud.
- **Comprueba quién decide.** ¿La persona con la opinión más alta toma la decisión, o la que tiene mejor contexto?
- **Diseña el equipo, no solo la arquitectura.** Esboza quién habla con quién, no solo qué componente llama a cuál.
- **Redúcete a superficies de coordinación pequeñas.** Es el beneficio práctico de Team Topologies: menos gente sincronizando = entrega más rápida y menos frágil.

La próxima vez que empieces un proyecto, lleva a cabo las conversaciones del stack y la del *equipo* a la vez. La primera decide qué puedes construir; la segunda, si vas a terminarlo.

#### Fuentes y lecturas recomendadas

- [Google re:Work — Comprender la eficacia de los equipos (Project Aristotle)](https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness)
- [Team Topologies — estructura de equipo y carga cognitiva](https://teamtopologies.com/)
- [DORA — Investigación State of DevOps](https://dora.dev/research/)
- [Accelerate — The Science of Lean Software and DevOps (IT Revolution)](https://itrevolution.com/product/accelerate/)
