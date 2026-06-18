# ============================================================
# Stage 1: deps - cache de dependencias con pnpm
# ============================================================
FROM node:20-alpine AS deps

WORKDIR /app

# Instala pnpm vía npm usando un ARG pinneado a 9.15.4 (mismo major
# que el lockfile pnpm-lock.yaml, lockfileVersion: '9.0'). Se usa npm
# en lugar de corepack porque la descarga automática de corepack está
# deshabilitada en imágenes recientes de node:20-alpine. Para
# sobreescribir desde el build:   docker build --build-arg PNPM_VER=X.Y.Z
ARG PNPM_VER=9.15.4
RUN npm install -g pnpm@$PNPM_VER && pnpm --version

# Copia solo los manifiestos primero para aprovechar la caché de Docker
COPY package.json pnpm-lock.yaml ./

# Descarga todos los paquetes al store + los enlaza en node_modules,
# respetando estrictamente el lockfile (reproducible)
RUN pnpm fetch && \
    pnpm install --offline --frozen-lockfile && \
    pnpm store prune

# ============================================================
# Stage 2: builder - build con placeholders embebidos
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Reinstala pnpm en builder stage (capa cacheada si PNPM_VER no cambia)
ARG PNPM_VER=9.15.4
RUN npm install -g pnpm@$PNPM_VER && pnpm --version

# Reutiliza node_modules cacheado desde la stage anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Placeholders para PUBLIC_FIREBASE_*: se reemplazan en runtime
# mediante docker-entrypoint.sh con sed en /usr/share/nginx/html.
# Vite (motor de Astro) inlinea los valores de import.meta.env.PUBLIC_*
# como literales en el bundle, por lo que estas cadenas aparecen tal cual
# en los .js/.html/.css generados y son seguras de sustituir.
ENV PUBLIC_FIREBASE_API_KEY=__PUBLIC_FIREBASE_API_KEY__ \
    PUBLIC_FIREBASE_AUTH_DOMAIN=__PUBLIC_FIREBASE_AUTH_DOMAIN__ \
    PUBLIC_FIREBASE_PROJECT_ID=__PUBLIC_FIREBASE_PROJECT_ID__ \
    PUBLIC_FIREBASE_STORAGE_BUCKET=__PUBLIC_FIREBASE_STORAGE_BUCKET__ \
    PUBLIC_FIREBASE_MESSAGING_SENDER_ID=__PUBLIC_FIREBASE_MESSAGING_SENDER_ID__ \
    PUBLIC_FIREBASE_APP_ID=__PUBLIC_FIREBASE_APP_ID__ \
    PUBLIC_FIREBASE_MEASUREMENT_ID=__PUBLIC_FIREBASE_MEASUREMENT_ID__

RUN pnpm run build

# ============================================================
# Stage 3: runner - servidor Nginx no-root
# ============================================================
FROM nginx:1.27-alpine AS runner

# Crea usuario no-root (uid/gid 1001) para Nginx
RUN addgroup -S -g 1001 appgroup && \
    adduser -S -u 1001 -G appgroup appuser

# Configuración de Nginx con SPA fallback (override del default.conf)
COPY default.conf /etc/nginx/conf.d/default.conf

# Reescribe el user directive del /etc/nginx/nginx.conf base para que
# coincida con el UID no-root del contenedor (work explícito y a prueba
# de cambios futuros de puerto a 80/443).
RUN sed -i 's|^user .*;|user appuser;|' /etc/nginx/nginx.conf

# Pre-crea los directorios temp/work que nginx.conf referencia y asigna
# ownership al usuario no-root para evitar condiciones de carrera al
# primer arranque.
RUN mkdir -p /var/client_body /var/proxy_temp /var/fastcgi_temp \
            /var/uwsgi_temp /var/scgi_temp && \
    chown -R appuser:appgroup /var/client_body /var/proxy_temp \
                               /var/fastcgi_temp /var/uwsgi_temp /var/scgi_temp

# Entry point que reemplaza placeholders PUBLIC_FIREBASE_* en runtime
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Copia el build estático de Astro a la raíz de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Asigna permisos al usuario no-root
RUN chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    chown -R appuser:appgroup /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown appuser:appgroup /var/run/nginx.pid

# Inicia Nginx como usuario no-root (el entrypoint hace el sed replace
# de las variables de entorno antes de arrancar el proceso principal)
USER appuser

EXPOSE 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
