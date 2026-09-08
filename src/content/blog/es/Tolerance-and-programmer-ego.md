---
title: Tolerancia en el trabajo y el ego del programador
publishDate: 2024-07-04 00:00:00
img: https://cdn.pixabay.com/photo/2020/04/16/09/30/shield-5049877_1280.jpg
img_alt: Un escudo sobre un fondo neutro — metáfora de la seguridad psicológica y de las defensas que construimos alrededor de nuestro trabajo.
description: La tolerancia y el ego en los equipos de software no son temas blandos — son factores de rendimiento medibles. Qué dice la investigación sobre seguridad psicológica, culpa y aprendizaje sobre cómo mantener ambos a raya.
tags:
- Comunicación
- Seguridad psicológica
- Cultura de equipo
- Liderazgo
---

La colaboración es esencial en los equipos de software, pero dos fuerzas deciden en silencio si esa colaboración funciona de verdad: cuánta tolerancia soporta el entorno ante la diferencia — de opinión, de origen, de estilo de trabajo — y cómo se comporta el ego del programador cuando lo cuestionan. Ninguna es un tema "blando". Las dos aparecen en las métricas de entrega.

### Qué significa realmente tolerancia aquí

Tolerancia, en este contexto, no es cortesía. Es la capacidad del entorno de trabajo de absorber el desacuerdo sin castigarlo: que un junior diga "creo que este diseño está mal", que un reviewer rechace el PR de un senior, que alguien admita que rompió el build.

La investigación sobre esto es inusualmente consistente. El [Project Aristotle](https://rework.withgoogle.com/en/guides/understanding-team-effectiveness) de Google encontró que la **seguridad psicológica** — la creencia compartida de que el equipo es un espacio seguro para arriesgarse interpersonalmente — era el predictor más fuerte de la eficacia del equipo, por delante del talento individual o la antigüedad. Amy Edmondson, sobre cuyo trabajo se apoyó el estudio, la define igual en [The Fearless Organization](https://amycedmondson.com/the-fearless-organization/): no va de ser amable; va de poder decir lo que hay que decir.

Donde la tolerancia es baja, el modo de fallo es predecible: las malas noticias viajan despacio. Los bugs se esconden, los diseños no se cuestionan y el mismo error se comete dos veces.

### El ego del programador: un arma de doble filo

El ego en programación se suele tratar como un defecto de personalidad. Es más útil verlo como un *recurso con un modo de fallo*.

**El lado productivo** es real: la confianza es lo que permite proponer un diseño sin probar, defender una decisión técnicamente correcta pero impopular, o ofrecerse para el refactor feo que nadie quiere. Un equipo con cero ego produce cero convicción.

**El modo de fallo** llega cuando la identidad se ata al código. Entonces el feedback deja de ser información y se vuelve una amenaza. Los síntomas clásicos:

- Tratar un comentario de code review como un ataque personal en lugar de un dato.
- Defender un diseño porque *lo escribiste tú*, no porque sea la mejor opción.
- Optimizar por parecer inteligente en vez de por ser útil — el patrón que lleva a evitar las preguntas "tontas", que es exactamente cómo sobreviven los huecos de conocimiento.

No es una patología exclusiva de programadores, pero el software la amplifica: el trabajo es profundamente individual y a la vez profundamente revisable, así que cada commit es una declaración pública sobre tu competencia.

### Qué ayuda de verdad

La evidencia apunta a arreglos estructurales por encima de arreglos de personalidad:

- **Separa el código del codificador en el lenguaje.** "Esta función tiene un bug" se recibe distinto a "tú rompiste esto". Suena trivial; cambia lo que la otra persona puede escuchar.
- **Haz explícitas las normas de review.** Los equipos que acuerdan para *qué* sirve un review (el código, no la persona) gastan menos energía litigando el tono en cada comentario.
- **Premia la admisión, no solo el arreglo.** Si el único reconocimiento visible va al heroísmo, la gente aprende a esconder problemas. Una cultura de postmortems sin culpa — la práctica popularizada en [la literatura de DevOps](https://itrevolution.com/product/accelerate/) — funciona porque hace que la honestidad cueste menos que el ocultamiento.
- **Los líderes van primero.** Un lead que dice "me equivoqué" en público hace más por la seguridad psicológica que cualquier póster. El comportamiento que se modela es el que se repite.

### Dónde se pone difícil

Hay una tensión genuina que vale la pena nombrar: la tolerancia sin estándares se vuelve mediocridad, y la confianza sin humildad se vuelve arrogancia. La meta no es eliminar el ego ni el desacuerdo — es mantener ambos apuntando al *problema* en lugar de a la *persona*. Un equipo que discute duro sobre diseños y luego entrega sin rencores es exactamente el equilibrio del que hablamos.

#### Fuentes y lecturas recomendadas

- [Google re:Work — Comprender la eficacia de los equipos (Project Aristotle)](https://rework.withgoogle.com/en/guides/understanding-team-effectiveness)
- [Amy Edmondson — The Fearless Organization](https://amycedmondson.com/the-fearless-organization/)
- [DORA — Investigación State of DevOps](https://dora.dev/research/)
- [Accelerate — The Science of Lean Software and DevOps (IT Revolution)](https://itrevolution.com/product/accelerate/)
