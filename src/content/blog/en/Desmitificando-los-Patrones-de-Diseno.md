---
title: Demystifying Design Patterns in JavaScript and TypeScript
publishDate: 2024-01-05 00:00:00
img: https://cdn.pixabay.com/photo/2021/01/03/13/51/lego-5884582_1280.jpg
img_alt: Design Patterns with code samples by sergio campbell dev
description: |
  Design patterns are reusable solutions to recurring problems. In JavaScript and
  TypeScript, they translate into concrete idioms — Singleton for shared state,
  Observer for event-driven flows, Factory for polymorphic construction. This article
  unpacks those three, pairs them with Clean Code principles (naming, size, single
  responsibility), and shows the resulting TypeScript code side-by-side.
tags:
- TypeScript
- JavaScript
- Design Patterns
- Architecture
- Clean Code
---

##### Introduction

In the vast realm of software development, **design patterns** are reusable solutions
to recurring problems — not copy-paste snippets, but a *shape* of code that fits a
class of situations. Their implementation in **JavaScript** and **TypeScript**,
however, often raises concerns and confusion: the dynamic nature of JS, the
proliferation of classes vs. closures, and the ergonomic differences from "classical"
OOP languages can make the same pattern look almost unrecognizable between sources.

In this article, we will demystify these patterns, exploring their practical
application and how they improve code quality — without falling into the trap of
using a pattern "because it's there".

##### Design Patterns in JavaScript and TypeScript

We will look at three of the most essential patterns — **Singleton**, **Observer**,
and **Factory** — in their JS/TS idiom: small, focused, and adapted to the language's
dynamic shape.

**Singleton — one shared instance.** When an object is conceptually unique (one app
config, one event bus, one connection pool), the pattern ensures there is exactly one
instance and provides a global access point:

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

The `private constructor` is what enforces the singleton shape in TS — there is no
way to call `new ConfigService(...)` from outside the class. Internally, this
collapses the "is there one or two instances?" question to a single source-level
fact.

**Observer — many-to-many event flow.** A *subject* keeps a list of *observers* and
notifies them on state change. This decouples *who acts* from *who decides*:

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

In a vanilla JS project, the same shape can use a plain object plus closures; the TS
version above simply makes event names and payloads statically type-checked, which
catches typos like `userLogedIn` at compile time.

**Factory — encapsulated construction.** When you want polymorphic creation *without*
exposing the concrete class, a factory returns the right implementation based on a
discriminator:

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

The caller depends on the *interface*, never the concrete class. Adding `klarna`
becomes a single switch case — and TypeScript's exhaustiveness checking will tell
you when the table is incomplete.

These three patterns are not the only ones worth learning — **Strategy**, **Decorator**,
and **Adapter** also come up constantly in modern JS/TS code — but they form the
minimum viable vocabulary for talking about structure with your team.

##### Clean Code in Action

Writing clean code is a fundamental skill for any developer. Throughout this article,
we will share practical tips on how to apply Robert C. Martin's "Clean Code"
principles in JavaScript and TypeScript projects. From variable management to
function structure, we will guide you to achieve more comprehensible and
maintainable code.

The most concrete impact comes from three habits: **naming**, **size**, and
**responsibility**. Compare the same arithmetic written two ways:

```typescript
// Before — vague names, mixed responsibilities, easy to misorder
function proc(d, t, p, f) {
  const x = d * p;
  const y = t - f;
  return x + y;
}

// After — intention-revealing names, single responsibility
function computeOrderTotal(
  itemSubtotal: number,
  promoDiscount: number,
  shippingFee: number
): number {
  const discountedSubtotal = itemSubtotal - promoDiscount;
  return discountedSubtotal + shippingFee;
}
```

The "after" version does exactly the same arithmetic, but the function name encodes
the *intent*, and the parameter names make it impossible to swap them by accident
(swap `itemSubtotal` with `shippingFee` in the "before" version and you get
silently wrong totals in production).

The same habit shows up at type level: a function that takes `User | null` is
telling the reader, at the call site, that it handles the missing case. A function
that takes `any` is telling the reader nothing — and it is the single most common
source of "the test passed locally but the prod runtime crashed" bugs in TS
codebases we have audited.

##### Efficient Data Architecture

The efficiency of an application largely depends on its **data architecture**. We
will explore how to design efficient data structures in the context of JavaScript and
TypeScript, highlighting key differences and providing examples that improve
performance and scalability.

The single highest-leverage shift in modern TS codebases is moving from *mutable* to
*readonly + spread* data. It costs one extra line per update and avoids a whole
class of "why did my array change" bugs — and it lets the type system tell you when
you accidentally mutated shared state:

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

Once `CartState` is `Readonly`, TypeScript will refuse any `state.items.push(...)`
call at compile time. The function `addItem` is the *only* way the data shape
evolves — which means there is exactly one place to log, audit, or memoize a cart
update.

For larger collections (lists, caches), prefer `Map<K, V>` over plain objects when
the keys come from user input or from external systems: it preserves insertion
order, handles non-string keys, and avoids the inherited-property trap where
`obj["toString"]` mysteriously returns the function source.

##### Creating Content for Everyone

Besides addressing technical aspects, we will dedicate a segment to the creation of
**inclusive content**. How do we explain complex concepts to non-programmer
colleagues? We will share strategies to communicate technical ideas effectively to
diverse audiences, improving collaboration in multidisciplinary teams.

The best lever is **deliberate analogy**: pick a non-technical domain the audience
already understands (logistics for state machines, cooking for build pipelines,
taxi dispatch for event loops) and map the technical concept onto it *one piece at
a time*. A diagram beats a paragraph; a worked example beats an abstract rule.

Pair the analogy with a **concrete next step** — a one-line change the reader can
make before finishing the article. Technical content without a "what do I try now"
landing is read once and forgotten.

##### In summary

This article aims to unravel the mysteries of design patterns, promote the writing
of clean and efficient code, and encourage the creation of accessible content. By
implementing these concepts, we not only improve our skills as developers but also
contribute to a more collaborative and efficient development environment.

The recurring theme across all three patterns and all three clean-code habits is the
same: **make the structure of code match the structure of the problem it is
solving**. Singleton, Observer, and Factory are not "advanced" because they use
clever tricks — they are advanced because they line the *shape* of the code up with
three of the most common shapes in the problem itself.

##### Share Your Experience

Have you faced challenges when applying design patterns in your projects? Do you
have any advice on writing clean code? Share your experience in the comments and
join the conversation. Share this article on your networks to help other
developers reach their full potential!

*Together, we build better code!*
