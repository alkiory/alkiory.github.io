# ============================================================
# Stage 1: deps - cache de dependencias con pnpm
# ============================================================
FROM node:22-alpine AS deps

WORKDIR /app

# Instala pnpm vía npm usando un ARG pinneado a 11.11.0 (latest estable de
# la línea 11 que satisface `engines.pnpm >=11.5.1` de package.json). Se
# usa npm en lugar de corepack porque la descarga automática de corepack
# está deshabilitada en imágenes alpine recientes de node.
#
# NOTA sobre reproducibilidad: el lockfile actual tiene lockfileVersion
# '9.0' (generado originalmente con pnpm 9). Si pnpm 11.11 decide migrar
# el formato al instalar, `pnpm install --frozen-lockfile` fallará y
# habrá que regenerar el lockfile localmente con la misma versión y
# commitearlo. Para sobreescribir desde el build:
#   docker build --build-arg PNPM_VER=X.Y.Z
ARG PNPM_VER=11.11.0
RUN npm install -g pnpm@$PNPM_VER && pnpm --version

# Copia solo los manifiestos primero para aprovechar la caché de Docker
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Descarga todos los paquetes al store + los enlaza en node_modules,
# respetando estrictamente el lockfile (reproducible)
RUN pnpm fetch && \
    pnpm install --offline --frozen-lockfile && \
    pnpm store prune

# ============================================================
# Stage 2: builder - build estático de Astro
# ============================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Reinstala pnpm en builder stage (capa cacheada si PNPM_VER no cambia
# — debe coincidir con la versión del stage deps para que el árbol de
# node_modules sea bit-idéntico)
ARG PNPM_VER=11.11.0
RUN npm install -g pnpm@$PNPM_VER && pnpm --version

# Reutiliza node_modules cacheado desde la stage anterior
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build

# ============================================================
# Stage 3: runner - servidor Nginx no-root
# ============================================================
FROM nginx:1.27-alpine AS runner

# Crea usuario no-root (uid/gid 1001) para Nginx
RUN addgroup -S -g 1001 appgroup && \
    adduser -S -u 1001 -G appgroup appuser

# Sustituye el nginx.conf del base image por el nuestro, optimizado para
# correr como no-root. Ver la cabecera de nginx.conf para el rationale
# completo (temp paths en /tmp, sin directiva `user`, PID en /tmp).
COPY nginx.conf /etc/nginx/nginx.conf

# Configuración del server block (SPA-aware) sobreescribiendo el
# default.conf del base image y apuntando listen al puerto interno.
COPY default.conf /etc/nginx/conf.d/default.conf

# Entry point mínimo: arranca Nginx como usuario no-root.
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Copia el build estático de Astro a la raíz de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Asigna permisos al usuario no-root. Los temp paths y el PID de nginx viven
# en /tmp (world-writable), por eso este RUN ya no pre-crea /var/*_temp.
RUN chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    chown -R appuser:appgroup /etc/nginx/conf.d

USER appuser

EXPOSE 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
