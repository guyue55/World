# WorldOS RC5 Boundary Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the two RC4 review follow-ups by adding API boundary governance and script legacy governance without expanding public product functionality.

**Architecture:** Keep public pages and product routes unchanged. Add data registries under `data/world-kernel/`, focused validation scripts under `scripts/`, and connect them to short daily gates through `package.json` and `src/lib/worldos-mainline.ts`.

**Tech Stack:** Next.js App Router, TypeScript, Node.js ESM audit/check scripts, JSON governance ledgers, npm scripts, Git.

## Global Constraints

- 中文优先，报告、说明和默认 UI/文档口径使用中文。
- 不新增 R/V/R8 功能线，不新增公开产品功能。
- 权限边界必须服务端可验证；前端显隐不能作为权限依据。
- 本轮不声明 `productionLive`、`releaseReady`、`cleanProductionReady`。
- 每项完成后必须有可复跑脚本或明确证据。
- 提交格式使用中文 Conventional Commit：`xxx(xxx): 中文xxx`。

---

### Task 1: API Boundary Registry

**Files:**
- Create: `data/world-kernel/worldos-api-boundary-registry-v1.json`
- Create: `scripts/check-worldos-api-boundary.mjs`
- Modify: `package.json`
- Modify: `src/lib/worldos-mainline.ts`

**Interfaces:**
- Consumes: `src/app/api/**/route.ts`
- Produces: `npm run check:api-boundary`

- [x] **Step 1:** Enumerate all App Router API route files and classify each as `public-read`, `static-safe-public`, `permission-guarded`, or `owner-only`.
- [x] **Step 2:** Write registry with exact path, file, methods, guard type, mutability, production write status, cache policy, and no-AI/database expectations.
- [x] **Step 3:** Add a checker that fails if any API route is missing from the registry, has mismatched methods, has a missing guard, or exposes a mutating public route.
- [x] **Step 4:** Add `check:api-boundary` and include it in `check:mainline`.

### Task 2: Script Legacy Governance

**Files:**
- Create: `data/world-kernel/worldos-script-legacy-registry-v1.json`
- Create: `scripts/check-worldos-script-legacy-registry.mjs`
- Modify: `data/world-kernel/worldos-script-taxonomy-v1.json`
- Modify: `scripts/check-worldos-script-taxonomy.mjs`
- Modify: `package.json`
- Modify: `src/lib/worldos-mainline.ts`

**Interfaces:**
- Consumes: `package.json.scripts`
- Produces: `npm run check:scripts`

- [x] **Step 1:** Snapshot current stage-like scripts and long scripts into a legacy registry.
- [x] **Step 2:** Keep short active entrypoints explicit: `check:mainline`, `check:content`, `check:experience:public`, `check:api-boundary`, `check:scripts`, `check:release:rc`.
- [x] **Step 3:** Add a checker that confirms default entrypoints exist, RC gate uses mainline, stage-like scripts remain tracked, and no script governance file drifts.
- [x] **Step 4:** Make `check:scripts` run taxonomy and legacy registry checks.

### Task 3: Project Audit RC5 Follow-up Closure

**Files:**
- Modify: `scripts/audit-worldos-project.mjs`
- Create: `data/world-kernel/worldos-1-rc5-boundary-hardening-v1.json`
- Create: `docs/10-development-history/world-kernel/worldos-1-rc5-boundary-hardening.md`
- Modify: `README.md`
- Modify: `CONTRIBUTING.md`

**Interfaces:**
- Consumes: Task 1 and Task 2 outputs.
- Produces: `npm run audit:project` with no important follow-ups for the two RC4 items.

- [x] **Step 1:** Update project audit to read API and script registries.
- [x] **Step 2:** Convert RC4 API/script findings from open important follow-ups to tracked governance checks.
- [x] **Step 3:** Write RC5 report and docs explaining actual state and remaining external production blockers.

### Task 4: Verification, Commit, Package

**Files:**
- Generated: `reports/npm-audit-report.json`
- Generated package files in `/mnt/data`.

**Commands:**
- `npm ci --ignore-scripts --prefer-offline --no-audit --no-fund --progress=false`
- `npm run check:api-boundary`
- `npm run check:scripts`
- `npm run audit:project`
- `npm run check:mainline`
- `npm run lint`
- `npm run typecheck`
- `npm run check`
- `npm run check:routes`
- `npm run check:release:rc`
- `npm run build:kernel-release`
- `npm run build:verify-artifacts`
- `npm run audit:report`

- [x] **Step 1:** Run all verification commands and read outputs.
- [x] **Step 2:** Commit with `chore(boundary): 补齐接口与脚本治理`.
- [x] **Step 3:** Package full and changed artifacts with manifest and notes.
