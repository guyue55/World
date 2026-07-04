# Public Runtime Boundary

## Purpose

Public product routes should not import R8 runtime components directly.

The stable direction is:

```text
WorldShell
  -> WorldRuntimeProvider
  -> WorldRuntimeStack
  -> projection groups
```

R8 components may still exist as implementation details or legacy reference code, but public app routes should depend on product or world abstractions instead of importing R8 packages directly.

## Local check

```bash
node scripts/check-public-app-r8-imports.mjs
```

The check currently scans `src/app` and reports public route files that import `@/components/r8-*` directly. Legacy route prefixes are allowed temporarily.

## Current status

This is a boundary gate, not a production-ready claim. Some public pages still need follow-up refactoring before the check can become a required release gate.
