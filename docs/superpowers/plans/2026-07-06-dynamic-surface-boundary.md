# 2026-07-06 Dynamic Surface Boundary Plan

## Goal

Make the dynamic world permission/data boundary explicit and repeatable:

- Server builds public dynamic surfaces.
- Frontend components only render surface results.
- Frontend visibility is not permission control.
- Dynamic routes do not import R8 or legacy universe components.
- Public surfaces do not expose private/family/vault/internal content.

## Scope

### 1. Register Dynamic Surface Boundary

Create:

- `data/world-kernel/worldos-dynamic-surface-boundary-v1.json`

The registry describes:

- Route.
- Builder function.
- Page file.
- Data sources.
- Whether public filtering is required.
- Whether the surface is server-built.
- Whether frontend permission control is allowed.

### 2. Extend Existing Dynamic Check

Modify:

- `scripts/check-public-dynamic-world-surfaces.mjs`

The check should validate:

- Registry file exists.
- Policies remain explicit.
- Each registered surface has a page file and builder function.
- Public-data surfaces use public filtering helpers in `public-world-surfaces`.
- Frontend permission control remains false.

### 3. Verify

Run:

```bash
npm run check:dynamic-world
npm run check:api-boundary
npm run check:boundary
npm run lint
npm run typecheck
```

## Commit

Use:

```text
chore(boundary): 固化动态世界边界
```
