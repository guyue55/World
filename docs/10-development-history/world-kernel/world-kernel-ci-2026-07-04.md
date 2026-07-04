# World Kernel CI｜2026-07-04

## Purpose

Add a small, repeatable CI gate for the current World Kernel consolidation line.

The CI intentionally avoids the historical long `check:world-core` chain. It currently has two jobs:

```text
static-boundary：无依赖静态边界检查，优先验证公开首页入口不再直连 R8 runtime。
quality：依赖安装后运行 repository checks、routes、typecheck、lint。
```

The static job is the fast guardrail. The quality job is restored as a separate hardening step so dependency installation can be observed independently.

## Workflow

```text
.github/workflows/ci.yml
```

## Commands

Static boundary:

```bash
node scripts/check-public-app-r8-imports.mjs
```

Quality:

```bash
npm ci --ignore-scripts --no-audit --no-fund --omit=optional --prefer-offline --progress=false
npm run check
npm run check:routes
npm run typecheck
npm run lint
```

The quality install omits optional dependencies because this gate does not run a production build.

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
