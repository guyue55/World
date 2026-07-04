# Legacy Route Runtime Boundary

## Scope

Continue public runtime boundary consolidation after homepage cleanup.

## Changed routes

```text
/world redirects to /atlas
/world-map redirects to /atlas
/time-river redirects to /timeline
/lighthouse redirects to /ask
```

## Guardrail

`check-public-app-r8-imports.mjs` now checks:

```text
src/app/page.tsx
src/app/world/page.tsx
src/app/world-map/page.tsx
src/app/time-river/page.tsx
src/app/lighthouse/page.tsx
```

## Remaining public-route follow-up

```text
/ask
/atlas
/timeline
/archive
/paths
/node/[slug]
/about
/manifesto
/status
```
