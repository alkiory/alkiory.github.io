---
title: BudgetGenius arquitectura hexagonal y enfoque PWA
publishDate: 2025-05-28 00:00:00
img: https://private-user-images.githubusercontent.com/51247757/620083810-be56e660-951f-4049-86dd-edd547757f1b.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODM2OTU3NjQsIm5iZiI6MTc4MzY5NTQ2NCwicGF0aCI6Ii81MTI0Nzc1Ny82MjAwODM4MTAtYmU1NmU2NjAtOTUxZi00MDQ5LTg2ZGQtZWRkNTQ3NzU3ZjFiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjA3MTAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwNzEwVDE0NTc0NFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTk2ZWUzMWFkOTNlMjY3MTRlMjkwNjBmMmI2NWYyMzQwNjc3MGIwYjI2NWU3Yjc1NmFkYmVjZTRlZWI2MjVlMGYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnJlc3BvbnNlLWNvbnRlbnQtdHlwZT1pbWFnZSUyRnBuZyJ9.YmyzwPzEvyBrzdtjpIQ9MdyXDZZVlsnAKLDzjsZbknA
img_alt: App description image
description: BudgetGenius es una aplicación de finanzas personales construida desde cero como un MVP funcional, modular y escalable. En este post, te compartimos la arquitectura, decisiones técnicas clave, servicios construidos y el stack tecnológico usado, incluyendo soporte para PWA, autenticación OAuth2 y despliegue completo en la nube.
tags:
  - TypeScript
  - Dev
  - User Testing
  - Logic
  - Fintech
  - MVP
  - NestJS
  - React
  - PWA
  - ArquitecturaHexagonal
---

#### 🧠 Visión general del proyecto

Objetivo: Permitir que usuarios puedan gestionar sus finanzas personales fácilmente desde cualquier dispositivo, visualizando métricas clave y patrones de gasto.
Funcionalidades actuales:
Registro e inicio de sesión con Google (OAuth2).
Dashboard con resumen mensual.
Breakdown por categoría de gastos.
Gestión de transacciones (crear, editar, eliminar).
UX responsiva con soporte para instalación como app (PWA).
Gráficas interactivas para insights visuales.

#### 🏗️ Arquitectura: Hexagonal (Ports & Adapters)

Aplicamos el patrón de arquitectura hexagonal para desacoplar dominios de infraestructura y preparar el código para escalabilidad y pruebas.

graph LR
  A[Controllers (Adapters)] --> B[Application Services]
  B --> C[Domain (Entities, Use Cases)]
  B --> D[Ports (Interfaces)]
  D --> E[Repositories (Adapters)]
  D --> F[External APIs (Google, Redis)]
  E --> G[PostgreSQL]
  
Esta estructura nos permite:
Testear fácilmente reglas de negocio (dominio puro).
Cambiar proveedores sin alterar la lógica central.
Adaptar el backend a otros frontends (mobile, CLI, etc.).

#### 🧰 Tecnologías utilizadas

🔙 Backend (NestJS + TypeORM)
NestJS como framework escalable con soporte para testing e inyección de dependencias.
TypeORM + PostgreSQL para ORM y base de datos relacional.
Redis para caching (tokens, sesiones).
Passport.js + OAuth2 para autenticación con Google.
JWT para tokens de acceso y refresh.
Arquitectura hexagonal para separar dominio, aplicación e infraestructura.

#### 🎨 Frontend (React + TailwindCSS)

React con Hooks y Context para gestión de estado ligero.
TailwindCSS para UI moderna y responsiva.
Recharts para gráficas interactivas (pie, bar, etc.).
localStorage para persistencia de tokens (PWA-ready).
React Router DOM para navegación declarativa.

#### 📦 Infraestructura y despliegue

Firebase Hosting para el frontend + PWA + HTTPS automático.
Render.com para el backend con PostgreSQL y Redis conectados externamente.
Google Cloud Console para configurar OAuth2.
CORS, CSRF y seguridad por entorno controlada.

#### 🌐 Navegación de usuario y flujos

🧭 Flujo de navegación general

graph LR
  A[Login con Google] --> B[Callback Backend]
  B --> C[Generar Tokens]
  C --> D[Redirige al Front con tokens]
  D --> E[Guardar tokens en localStorage]
  E --> F[Dashboard]
  F --> G[Consulta de gastos]
  F --> H[Crear/editar transacción]
  F --> I[Ver breakdown de categorías]

🧪 Casos de uso principales

graph LR
  A[Usuario autenticado] --> B[GET /overview]
  A --> C[GET /categories]
  A --> D[POST /transaction]
  A --> E[PUT /transaction/:id]
  A --> F[DELETE /transaction/:id]

#### 🔐 Decisiones técnicas clave

✅ 1. OAuth sin contraseña
Usuarios creados vía Google no tienen password (null) y son autenticados solo vía OAuth.
Esto se maneja sin afectar flujos de autorización ni persistencia.
✅ 2. JWT + localStorage para PWA
Se migró de cookies httpOnly a localStorage para permitir el uso de BudgetGenius como Progressive Web App.
Esto también facilita el funcionamiento offline y reintentos en background.
✅ 3. Firebase Hosting para frontend
Permite aprovechar PWA, HTTPS, telemetría, redirects y más.
Reemplazamos Vercel para centralizar en una plataforma que ofrece mejor integración con el navegador.

#### 📊 Gráficas y visualización de datos

Se incluyó un componente ExpenseCategories con visualización en tiempo real de:
Total de gastos
Categoría más costosa
Distribución porcentual con colores y tooltips
Estas métricas vienen de un único servicio overviewService.getBreakdownByCategory() reutilizado en varias vistas, cumpliendo el principio DRY.

#### 📈 Resultado actual

✔️ MVP funcional desplegado

✔️ Usuarios pueden autenticarse y usar la app

✔️ Infraestructura completa: BD, backend, frontend y OAuth

✔️ Base sólida para continuar escalando a features premium

#### 📝 Próximos pasos

Soporte offline completo (transacciones en background)
Notificaciones push con Firebase
Subscripciones premium y pasarela de pagos
Exportación de datos financieros (CSV, PDF)

#### 📎 Entonces

BudgetGenius demuestra cómo es posible construir una app funcional, robusta y moderna con herramientas open-source, buenas prácticas y decisiones arquitectónicas pensadas a largo plazo.
Esperamos que esta experiencia te sirva como guía para tu próximo MVP, startup o proyecto de aprendizaje.
¿Quieres explorar el código o contribuir?

- 🌐  Demostración [Budget Genius IA](https://budgetgeniusia.web.app)

- 🔗 Repositorio Fullstack (NestJS) (private repo)

##### 🧠 ¿Te interesa construir algo similar?

Síguenos en LinkedIn o contáctanos para colaborar 🚀
