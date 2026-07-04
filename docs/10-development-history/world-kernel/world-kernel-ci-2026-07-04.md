# World Kernel CI｜2026-07-04

## Purpose

Add a small, repeatable CI gate for the current World Kernel consolidation line.

The CI intentionally avoids the historical long `check:world-core` chain and currently runs only the dependency-free static boundary job:

```text
static-boundary：无依赖静态边界检查，优先验证公开首页入口不再直连 R8 runtime。
```

A dependency-based quality job was attempted first, but GitHub runner installation stayed in dependency install for too long. It is therefore not included in this first stable CI PR. It should be reintroduced in a later hardening PR after dependency install behavior is made reliable.

## Workflow

```text
.github/workflows/ci.yml
```

## Command

```bash
node scripts/check-public-app-r8-imports.mjs
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

## Follow-up hardening

Later CI hardening should restore dependency-based gates after installation is stabilized:

```bash
npm ci --ignore-scripts --no-audit --no-fund --progress=false --loglevel=error
npm run check
npm run check:routes
npm run typecheck
npm run lint
```

## Boundary

This workflow is not a production deployment gate. It does not prove Preview URL, Production URL, smoke test, HTTPS, Web Vitals, manual signoff, or rollback rehearsal.

Those remain external release evidence.
