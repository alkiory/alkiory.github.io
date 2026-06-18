#!/bin/sh
# docker-entrypoint.sh
# Reemplaza los placeholders __PUBLIC_FIREBASE_*__ en los archivos
# estáticos de Astro (/usr/share/nginx/html) con los valores reales
# de las variables de entorno definidas en tiempo de ejecución
# (provenientes del env_file .env o del entorno del contenedor).
#
# Importante: Vite (motor de Astro) inlinea los valores de
# import.meta.env.PUBLIC_* como literales durante el build, por lo
# que las cadenas __PUBLIC_FIREBASE_*__ quedan embebidas en los
# bundles finales.
set -eu

WEB_ROOT="${WEB_ROOT:-/usr/share/nginx/html}"

if [ -d "$WEB_ROOT" ]; then
    # Busca placeholders solo en archivos que pueden contenerlos
    find "$WEB_ROOT" -type f \
        \( -name '*.js' -o -name '*.mjs' -o -name '*.css' \
        -o -name '*.html' -o -name '*.json' \) \
        -exec sed -i \
            -e "s|__PUBLIC_FIREBASE_API_KEY__|${PUBLIC_FIREBASE_API_KEY:-}|g" \
            -e "s|__PUBLIC_FIREBASE_AUTH_DOMAIN__|${PUBLIC_FIREBASE_AUTH_DOMAIN:-}|g" \
            -e "s|__PUBLIC_FIREBASE_PROJECT_ID__|${PUBLIC_FIREBASE_PROJECT_ID:-}|g" \
            -e "s|__PUBLIC_FIREBASE_STORAGE_BUCKET__|${PUBLIC_FIREBASE_STORAGE_BUCKET:-}|g" \
            -e "s|__PUBLIC_FIREBASE_MESSAGING_SENDER_ID__|${PUBLIC_FIREBASE_MESSAGING_SENDER_ID:-}|g" \
            -e "s|__PUBLIC_FIREBASE_APP_ID__|${PUBLIC_FIREBASE_APP_ID:-}|g" \
            -e "s|__PUBLIC_FIREBASE_MEASUREMENT_ID__|${PUBLIC_FIREBASE_MEASUREMENT_ID:-}|g" \
            {} +
fi

# Ejecuta el comando original (por defecto: nginx -g 'daemon off;')
exec "$@"
