# 2026-07-06 Public Chinese-First Copy Plan

## Goal

Keep the public WorldOS experience Chinese-first and low-friction.

This phase focuses on visible public UI copy, especially mainline routes and shared public surfaces. Technical English labels can remain in code, but should not leak into the public first-run experience as default user-facing copy.

## Scope

### 1. Replace Remaining Public English Eyebrows

Update visible public copy:

- Dynamic world status.
- Archive dynamic guide.
- Path dynamic guide.
- About and Manifesto surfaces.
- Error repair pages.
- Runtime map footer.

### 2. Add Repeatable Copy Check

Create:

- `scripts/check-public-chinese-copy.mjs`

The check should inspect selected mainline public files and fail on known English/technical visible labels:

- `DYNAMIC WORLD STATUS`
- `LIVE ARCHIVE`
- `LIVE PATH`
- `GUIDED PATHS`
- `WORLD REPAIR`
- `runtime://public-world`

### 3. Wire Into Dynamic World Gate

Update:

- `check:dynamic-world`

It should run the copy check together with dynamic surface and public object index checks.

## Verification

Run:

```bash
npm run check:dynamic-world
npm run check:boundary
npm run lint
npm run typecheck
WORLD_KERNEL_FORCE_REBUILD=1 npm run build:kernel-release
npm run build:verify-artifacts
```

## Commit

Use:

```text
fix(copy): 强化公开中文体验
```
