# ============================================================
# Stage 1: deps - cache de dependencias pnpm
# ============================================================
FROM node:20-alpine AS deps

WORKDIR /app

# Activar pnpm vía corepack (gestor usado por el proyecto)
RUN corepack enable && corepack prepare pnpm@9 --activate

# Copiar solo manifests para aprovechar cache de capas
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --ignore-scripts

# ============================================================
# Stage 2: builder - build con placeholders embebidos
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Placeholders baked-in al bundle, sustituidos en runtime por docker-entrypoint.sh
ENV PUBLIC_FIREBASE_API_KEY=__PUBLIC_FIREBASE_API_KEY__
ENV PUBLIC_FIREBASE_AUTH_DOMAIN=__PUBLIC_FIREBASE_AUTH_DOMAIN__
ENV PUBLIC_FIREBASE_PROJECT_ID=__PUBLIC_FIREBASE_PROJECT_ID__
ENV PUBLIC_FIREBASE_STORAGE_BUCKET=__PUBLIC_FIREBASE_STORAGE_BUCKET__
ENV PUBLIC_FIREBASE_MESSAGING_SENDER_ID=__PUBLIC_FIREBASE_MESSAGING_SENDER_ID__
ENV PUBLIC_FIREBASE_APP_ID=__PUBLIC_FIREBASE_APP_ID__
ENV PUBLIC_FIREBASE_MEASUREMENT_ID=__PUBLIC_FIREBASE_MEASUREMENT_ID__

# Build de Astro (output en /app/dist)
RUN pnpm run build

# ============================================================
# Stage 3: runner - Nginx sirviendo el sitio estático
# ============================================================
FROM nginx:1.27-alpine AS runner

# bash es requerido por docker-entrypoint.sh (alpine sólo trae busybox sh);
# sin esto el kernel reporta ENOENT al hacer exec /docker-entrypoint.sh.
RUN apk add --no-cache bash

# Eliminar la config default para evitar conflictos
RUN rm -f /etc/nginx/conf.d/default.conf

# Crear usuario y grupo no-root con UID/GID 1001 (estándar en PaaS)
RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 --ingroup appgroup --no-create-home appuser

# Crear directorios temp necesarios para nginx non-root
RUN mkdir -p /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp && \
    chown -R appuser:appgroup /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp

# Copiar configs nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Copiar el build de Astro
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar entrypoint
COPY docker-entrypoint.sh /docker-entrypoint.sh

# Fase 1: defensivo contra CRLF introducido por git autocrlf. Sin este paso el
# kernel intenta ejecutar `/bin/bash\r` y reporta ENOENT al hacer exec.
# Fase 2: chmod + chown para usuario no-root.
RUN sed -i 's/\r$//' /docker-entrypoint.sh && \
    head -1 /docker-entrypoint.sh | grep -qE '^#!/bin/(bash|sh)' || \
      (echo "ERROR: shebang inválido en docker-entrypoint.sh" >&2; exit 1)

RUN chmod +x /docker-entrypoint.sh && \
    chown appuser:appgroup /docker-entrypoint.sh

# Ajustar permisos: nginx necesita leer configs y escribir en cache/log/pid
RUN chown -R appuser:appgroup /usr/share/nginx/html \
    /var/cache/nginx \
    /var/log/nginx \
    /etc/nginx \
    && touch /tmp/nginx.pid \
    && chown appuser:appgroup /tmp/nginx.pid

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/ || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
