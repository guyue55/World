# 2026-07-06 Public World Object Index Plan

## Goal

Unify the public world object layer behind Atlas, Timeline, Archive, Paths, and Node pages.

The current surfaces already filter public data, but each page still assembles its own public objects. This phase creates one server-side public object index and a repeatable check so dynamic world pages stay consistent.

## Scope

### 1. Add Public World Object Index

Create:

- `src/lib/public-world-objects.ts`

It should expose:

- `getPublicWorldObjectIndex()`
- `getPublicWorldObjectConsistencyIssues()`

The index should include public:

- Areas.
- Nodes.
- Paths.
- Events.
- Area links.
- Node references.
- Path references.
- Timeline references.

### 2. Add Object Consistency Check

Create:

- `scripts/check-public-world-object-index.ts`

The check should fail if:

- Public node slugs duplicate.
- Public nodes point to missing or non-public areas.
- Public paths point to missing or non-public nodes.
- Public events point to missing or non-public nodes/areas.
- Object references produce malformed href/title values.

### 3. Wire Into Dynamic World Gate

Modify:

- `package.json`

`check:dynamic-world` should run both:

- Existing dynamic surface contract check.
- New public world object index check.

### 4. Keep Script Governance Honest

Because one npm script command changes but no new script name is added, script count should remain unchanged. If a new script name is added later, update the legacy registry.

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
feat(world): 统一公开世界对象索引
```
