# World Kernel CI｜2026-07-04

## Purpose

Add a small, repeatable CI gate for the current World Kernel consolidation line.

The CI intentionally avoids the historical long `check:world-core` chain. It focuses on the checks that should remain stable for daily development:

```text
1. dependency install
2. public runtime boundary
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
npm ci
node scripts/check-public-app-r8-imports.mjs
npm run check
npm run check:routes
npm run typecheck
npm run lint
```

## Boundary

This workflow is not a production deployment gate. It does not prove Preview URL, Production URL, smoke test, HTTPS, Web Vitals, manual signoff, or rollback rehearsal.

Those remain external release evidence.
