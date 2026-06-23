<!-- snippet: cold-start-es | bloque canónico para ../work/es/home-lab-dashboard.md -->

```mermaid
graph LR
  A["main: config.FromEnv"] --> B["init snapshot.Store"]
  B --> C["launch poller.Run"]
  C --> D["tick #1: prime snapshot"]
  D --> E["/readyz 503 priming"]
  E --> F["tick termina"]
  F --> G["/readyz 200 ready"]
```
