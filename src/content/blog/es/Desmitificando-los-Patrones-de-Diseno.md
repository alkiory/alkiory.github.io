---
title: Desmitificando los Patrones de Diseño en JavaScript y TypeScript
publishDate: 2024-01-05 00:00:00
img: https://cdn.pixabay.com/photo/2021/01/03/13/51/lego-5884582_1280.jpg
img_alt: Desmitificando los Patrones de Diseño en JavaScript y TypeScript por sergio campbell dev
description: |
  Los patrones de diseño son soluciones reutilizables a problemas recurrentes.
  En JavaScript y TypeScript se traducen en modismos concretos — Singleton para
  estado compartido, Observer para flujos dirigidos por eventos, Factory para
  construcción polimórfica. Este artículo despliega esos tres, los combina con
  principios de Clean Code (nombres, tamaño, responsabilidad única) y muestra el
  código TypeScript resultante lado a lado.
tags:
- TypeScript
- JavaScript
- Patrones de Diseño
- Arquitectura
- Código Limpio
---

##### Introducción

En el vasto ámbito del desarrollo de software, los **patrones de diseño** son
soluciones reutilizables a problemas recurrentes — no snippets para copiar y pegar,
sino una *forma* de código que se ajusta a una clase de situaciones. Su
implementación en **JavaScript** y **TypeScript**, sin embargo, a menudo genera
preocupaciones y confusión: la naturaleza dinámica de JS, la proliferación de
clases vs. closures, y las diferencias ergonómicas respecto a lenguajes OOP
"clásicos" pueden hacer que el mismo patrón se vea casi irreconocible entre
fuentes.

En este artículo, desmitificaremos estos patrones, explorando su aplicación
práctica y cómo pueden mejorar la calidad del código — sin caer en la trampa de
usar un patrón "porque está ahí".

##### Patrones de Diseño en JavaScript y TypeScript

Veremos tres de los patrones más esenciales — **Singleton**, **Observer** y
**Factory** — en su modismo JS/TS: pequeños, enfocados, y adaptados a la forma
dinámica del lenguaje.

**Singleton — una única instancia compartida.** Cuando un objeto es
conceptualmente único (una config de la app, un event bus, un connection pool),
el patrón garantiza que haya exactamente una instancia y provee un punto de
acceso global:

```typescript
class ConfigService {
  private static instance: ConfigService | null = null;

  private constructor(private readonly env: "dev" | "prod") {}

  static getInstance(env: "dev" | "prod"): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService(env);
    }
    return ConfigService.instance;
  }

  read(key: string): string {
    // reads from process.env, vault, etc.
    return process.env[key] ?? "";
  }
}

const config = ConfigService.getInstance("prod");
const apiUrl = config.read("API_URL");
```

El `private constructor` es lo que enforce la forma singleton en TS — no hay forma
de llamar a `new ConfigService(...)` desde fuera de la clase. Los tests muestran que
esto colapsa la pregunta "¿hay una o dos instancias?" a un único hecho a nivel de
código fuente.

**Observer — flujo de eventos muchos-a-muchos.** Un *sujeto* mantiene una lista de
*observers* y los notifica ante cambios de estado. Esto desacopla *quién actúa* de
*quién decide*:

```typescript
type Listener<T> = (payload: T) => void;

class EventBus<E extends Record<string, unknown>> {
  private listeners = new Map<keyof E, Listener<unknown>[]>();

  on<K extends keyof E>(event: K, listener: Listener<E[K]>): void {
    const bucket = this.listeners.get(event) ?? [];
    bucket.push(listener as Listener<unknown>);
    this.listeners.set(event, bucket);
  }

  emit<K extends keyof E>(event: K, payload: E[K]): void {
    for (const fn of this.listeners.get(event) ?? []) fn(payload);
  }
}

type AppEvents = {
  userLoggedIn: { id: string };
  orderPlaced: { total: number };
};

const bus = new EventBus<AppEvents>();
bus.on("userLoggedIn", ({ id }) => trackAnalytics("login", id));
bus.on("orderPlaced", ({ total }) => trackAnalytics("order", total));

bus.emit("userLoggedIn", { id: "u_42" });
```

En un proyecto vanilla JS, la misma forma puede usar un objeto plano más closures;
la versión TS de arriba simplemente vuelve a los nombres de evento y payloads
chequeados estáticamente, lo que agarra typos como `userLogedIn` en compile time.

**Factory — construcción encapsulada.** Cuando querés creación polimórfica *sin*
exponer la clase concreta, una factory devuelve la implementación correcta a
partir de un discriminador:

```typescript
interface PaymentProvider {
  charge(amountCents: number): Promise<{ id: string }>;
}

function createPaymentProvider(
  kind: "stripe" | "paypal" | "crypto"
): PaymentProvider {
  switch (kind) {
    case "stripe": return new StripeProvider();
    case "paypal": return new PaypalProvider();
    case "crypto": return new CryptoProvider();
  }
}

const pay = createPaymentProvider("stripe");
await pay.charge(1999);
```

El caller depende de la *interface*, nunca de la clase concreta. Agregar `klarna`
se vuelve un único case del switch — y el exhaustiveness checking de TypeScript
te avisa cuando la tabla está incompleta.

Estos tres patrones no son los únicos que vale la pena aprender — **Strategy**,
**Decorator** y **Adapter** también aparecen constantemente en código JS/TS moderno
— pero forman el vocabulario mínimo viable para hablar de estructura con tu equipo.

##### Código Limpio en Acción

Escribir **código limpio** es una habilidad fundamental para cualquier desarrollador.
A lo largo del artículo compartiremos consejos prácticos sobre cómo aplicar los
principios de "Clean Code" de Robert C. Martin en proyectos de JavaScript y
TypeScript. Desde la gestión de variables hasta la estructura de funciones, te
guiamos para lograr un código más comprensible y mantenible.

El impacto más concreto viene de tres hábitos: **nombres**, **tamaño**, y
**responsabilidad**. Comparemos la misma aritmética escrita de dos formas:

```typescript
// Before — nombres vagos, responsabilidades mezcladas, fácil de mezclar el orden
function proc(d, t, p, f) {
  const x = d * p;
  const y = t - f;
  return x + y;
}

// After — nombres que revelan intención, responsabilidad única
function computeOrderTotal(
  itemSubtotal: number,
  promoDiscount: number,
  shippingFee: number
): number {
  const discountedSubtotal = itemSubtotal - promoDiscount;
  return discountedSubtotal + shippingFee;
}
```

La versión "after" hace exactamente la misma aritmética, pero el nombre de la
función codifica la *intención*, y los nombres de los parámetros hacen imposible
intercambiarlos por accidente (intercambiá `itemSubtotal` con `shippingFee` en la
versión "before" y obtenés totales silenciosamente incorrectos en producción).

El mismo hábito aparece a nivel de tipos: una función que recibe `User | null`
está diciéndole al lector, en el call site, que maneja el caso faltante. Una
función que recibe `any` no le está diciendo nada — y es la fuente más común de
bugs del estilo "el test pasaba local pero crasheaba en prod" en codebases TS que
auditamos.

##### Arquitectura de Datos Eficiente

La eficiencia de una aplicación depende en gran medida de su **arquitectura de
datos**. Exploraremos cómo diseñar estructuras de datos eficientes en el contexto
de JavaScript y TypeScript, destacando las diferencias clave y proporcionando
ejemplos que mejoran el rendimiento y la escalabilidad.

El cambio con mayor leverage en los codebases TS modernos es pasar de datos
*mutables* a datos *readonly + spread*. Cuesta una línea extra por update y
evita toda una clase de bugs del estilo "¿por qué cambió mi array?" — y le
permite al type system avisarte cuando mutaste estado compartido por accidente:

```typescript
type CartItem = Readonly<{ id: string; qty: number; price: number }>;
type CartState = Readonly<{
  items: ReadonlyArray<CartItem>;
  total: number;
}>;

function addItem(state: CartState, item: CartItem): CartState {
  return {
    items: [...state.items, item],
    total: state.total + item.qty * item.price,
  };
}
```

Una vez que `CartState` es `Readonly`, TypeScript rechaza cualquier
`state.items.push(...)` en compile time. La función `addItem` es la *única* forma
en que la forma de los datos evoluciona — lo que significa que hay exactamente un
lugar donde loguear, auditar o memoizar un update del carrito.

Para colecciones grandes (listas, caches), preferí `Map<K, V>` por sobre objetos
planos cuando las keys vienen de input del usuario o de sistemas externos:
preserva el orden de inserción, maneja keys no-string y evita la trampa de las
propiedades heredadas donde `obj["toString"]` misteriosamente devuelve el código
fuente de la función.

##### Creando Contenido para Todos

Además de abordar aspectos técnicos, dedicaremos un segmento a la creación de
**contenido inclusivo**. ¿Cómo explicar conceptos complejos a colegas no
programadores? Compartiremos estrategias para comunicar eficazmente ideas técnicas
a audiencias diversas, mejorando la colaboración en equipos multidisciplinarios.

El mejor lever es la **analogía deliberada**: elegí un dominio no técnico que la
audiencia ya entienda (logística para máquinas de estado, cocina para build
pipelines, despacho de taxis para event loops) y mapeá el concepto técnico sobre
él *de a una pieza por vez*. Un diagrama le gana a un párrafo; un ejemplo
trabajado le gana a una regla abstracta.

Acompañá la analogía con un **próximo paso concreto** — un cambio de una línea
que el lector pueda hacer antes de terminar el artículo. El contenido técnico sin
un "¿qué pruebo ahora?" como cierre se lee una vez y se olvida.

##### En resumen

En resumen, este artículo tiene como objetivo desentrañar los misterios de los
patrones de diseño, promover la escritura de código limpio y eficiente, y
fomentar la creación de contenido accesible. Al implementar estos conceptos, no
solo mejoramos nuestras habilidades como desarrolladores, sino que también
contribuimos a un entorno de desarrollo más colaborativo y eficiente.

El tema recurrente a lo largo de los tres patrones y los tres hábitos de Clean
Code es el mismo: **hacer que la estructura del código matchee la estructura del
problema que resuelve**. Singleton, Observer y Factory no son "avanzados" porque
usen trucos ingeniosos — son avanzados porque alinean la *forma* del código con
tres de las formas más comunes del problema mismo.

##### Comparte tu Experiencia

¿Has enfrentado desafíos al aplicar patrones de diseño en tus proyectos? ¿Tienes
algún consejo sobre cómo escribir código limpio? Comparte tu experiencia en los
comentarios y únete a la conversación. ¡Comparte este artículo en tus redes para
ayudar a otros desarrolladores a alcanzar su máximo potencial!

*¡Juntos, construimos mejor código!*
