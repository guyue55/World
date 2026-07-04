# Public Runtime Boundary Follow-up｜2026-07-04

## Scope

This follow-up continues the World Kernel consolidation work by removing the homepage's direct dependency on R8 runtime presentation components.

## Changed

- `src/app/page.tsx` no longer imports `@/components/r8-*` directly.
- The homepage is reduced to the product-facing R2 / R3 / R5 projection path:
  - world entrance
  - gateway panel
  - real content constellation
  - selected paths
  - lighthouse recommendations
  - deep entrance cards

## Why

The homepage is a public product route and should not be the integration point for every historical dynamic universe layer.

R8 dynamic layers may remain as legacy/reference or internal WorldRuntimeStack implementation details, but public app routes should use stable product/world abstractions.

## Verification note

This branch is created through the GitHub connector. Code has been updated and files have been inspected, but local commands were not executed here. Required follow-up checks:

```bash
node scripts/check-public-app-r8-imports.mjs
npm run lint
npm run typecheck
npm run check:routes
```

This change does not imply production readiness.
