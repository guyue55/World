# World Kernel CI｜2026-07-04

## Purpose

Add a small, repeatable CI gate for the current World Kernel consolidation line.

The CI intentionally avoids the historical long `check:world-core` chain. It focuses on checks that should remain stable for daily development:

```text
1. dependency install
2. critical public entry runtime boundary
3. repository checks
4. route checks
5. typecheck
6. lint
```

## Workflow

```text
.github/workflows/ci.yml
```

## Commands

```bash
npm ci --ignore-scripts --no-audit --no-fund --prefer-offline --progress=false
node scripts/check-public-app-r8-imports.mjs
npm run check
npm run check:routes
npm run typecheck
npm run lint
```

## Runtime boundary scope

`check-public-app-r8-imports.mjs` is intentionally staged. It hard-gates only the critical public entry route first:

```text
src/app/page.tsx
```

Other public routes still have known legacy R8 presentation imports and must be migrated by later small PRs. The known follow-up surface includes routes such as:

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

This keeps the first CI gate useful without pretending that the full public runtime migration has already been completed.

## Boundary

This workflow is not a production deployment gate. It does not prove Preview URL, Production URL, smoke test, HTTPS, Web Vitals, manual signoff, or rollback rehearsal.

Those remain external release evidence.
