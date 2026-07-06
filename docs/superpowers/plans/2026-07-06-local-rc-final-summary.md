# 2026-07-06 Local RC Final Summary Plan

## Goal

Close the local-only release candidate loop with one trustworthy summary artifact.

The project already produces separate reports:

- Local runtime smoke.
- Local LAN RC smoke and screenshots.
- npm audit report.
- External evidence template.
- Build artifacts and freshness checks.

This phase adds a single local RC summary report so a maintainer can answer: "Is the local LAN RC trustworthy right now, and what still blocks real release?"

## Scope

### 1. Add Summary Writer

Create:

- `scripts/write-worldos-local-rc-summary.mjs`

It should read:

- `docs/90-archive/reports/worldos-local-runtime-smoke-report.json`
- `docs/90-archive/reports/worldos-local-lan-rc-report.json`
- `docs/90-archive/reports/npm-audit-report.json`
- `docs/90-archive/reports/worldos-external-evidence-template.json`
- `.next/BUILD_ID`

It should write:

- `docs/90-archive/reports/worldos-local-rc-summary-report.json`

### 2. Add Summary Check

Create:

- `scripts/check-worldos-local-rc-summary.mjs`

It should fail when:

- Summary is missing.
- Runtime or LAN smoke did not pass.
- Build artifacts are missing.
- High or critical npm audit issues exist.
- Production/release flags are true without external evidence.

### 3. Wire Into Trusted RC Gate

Modify:

- `scripts/run-worldos-local-rc-trust-gate.mjs`

After `audit:report`, run:

- `node scripts/write-worldos-local-rc-summary.mjs`
- `node scripts/check-worldos-local-rc-summary.mjs`

## Verification

Run:

```bash
npm run release:local-rc
npm run check:boundary
npm run lint
npm run typecheck
```

## Commit

Use:

```text
chore(rc): 汇总本地验收证据
```
