<!-- snippet: user-navigation-es | bloque canónico para ../work/es/home-lab-dashboard.md -->

```mermaid
graph LR
  GET_ROOT["GET /"] --> LAYOUT["layout.html<br/>render completo"]
  GET_HW["GET /api/cards/hardware"] --> PARTIAL["parcial tarjeta"]
  GET_NW["GET /api/cards/network"] --> PARTIAL
  GET_CT["GET /api/cards/containers"] --> PARTIAL
  GET_SV["GET /api/cards/services"] --> PARTIAL
  GET_HEALTH["GET /healthz"] --> OK["ok"]
  GET_READY["GET /readyz"] --> READY["ready / 503 priming"]
```
