#!/bin/sh
# docker-entrypoint.sh
# Hook de arranque para el runner de Nginx. Se mantiene como entrypoint
# para permitir, en el futuro, pre-procesar el bundle estático de Astro
# antes de levantar el servidor (p. ej. para inyectar configuración).
#
# Por ahora simplemente delega el control al comando principal
# (por defecto: `nginx -g 'daemon off;'`).
set -eu

exec "$@"
