#!/bin/bash
set -euo pipefail

# Variables Firebase a sustituir. Mantener en sync con Dockerfile y src/lib/firebase.ts.
VARS=(
  PUBLIC_FIREBASE_API_KEY
  PUBLIC_FIREBASE_AUTH_DOMAIN
  PUBLIC_FIREBASE_PROJECT_ID
  PUBLIC_FIREBASE_STORAGE_BUCKET
  PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  PUBLIC_FIREBASE_APP_ID
  PUBLIC_FIREBASE_MEASUREMENT_ID
)

echo "[entrypoint] Sustituyendo placeholders de Firebase en /usr/share/nginx/html..."

for var in "${VARS[@]}"; do
  value="${!var:-}"

  if [ -z "$value" ]; then
    echo "[entrypoint] ADVERTENCIA: $var está vacía; el placeholder __${var}__ quedará tal cual"
    continue
  fi

  # Escapar caracteres especiales de sed en el reemplazo: & \ | / newline CR
  # (| se usa como delimitador en sed; & significa "match" en el replacement)
  escaped=$(printf '%s' "$value" | sed 's/[\\&|\/\n\r]/\\&/g')

  # Sustituir en todos los archivos relevantes servidos por nginx
  find /usr/share/nginx/html -type f \
    \( -name '*.js' -o -name '*.mjs' -o -name '*.css' -o -name '*.html' -o -name '*.json' \) \
    -exec sed -i "s|__${var}__|${escaped}|g" {} +

  echo "[entrypoint] $var => <set>"
done

echo "[entrypoint] Validando configuración de nginx..."
nginx -t

echo "[entrypoint] Arrancando: $*"
exec "$@"
