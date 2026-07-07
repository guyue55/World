# WorldOS Local Maturity Stages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不考虑外部 Preview / Production 的前提下，把 WorldOS 打磨为 localhost / LAN IP 下成熟可用的本地产品。

**Architecture:** 以本地产品成熟度契约作为事实源，检查脚本验证公开路径闭环、内容密度、动态体验、低动效 LAN 证据和权限边界。后续阶段只在本地受控环境推进 Owner 工作台和 AI Provider，所有权限继续由后端/API 守门，前端只展示结果。

**Tech Stack:** Next.js App Router, TypeScript, Node.js check scripts, JSON contracts, local `next start`, LAN RC browser smoke.

## Global Constraints

- 目前还是本地部署，localhost / LAN IP 访问即可。
- 外部 Preview / Production 暂不考虑，不作为近期计划或验收入口。
- 降低门槛、提高体验、优先中文。
- 后端控制权限，前端控制体现；根据权限控制显隐，不在前端硬编码权限事实。
- 检查和控制边界必须覆盖 build、lint、typecheck、LAN RC。
- 提交格式：`xxx(xxx): 中文xxx`。

---

### Task 9: 本地产品成熟度门禁

**Files:**
- Create: `data/world-kernel/worldos-local-product-maturity-contract-v1.json`
- Create: `scripts/check-worldos-local-product-maturity.mjs`
- Create: `docs/00-overview/worldos-phase-9-local-maturity-taskboard.md`
- Modify: `package.json`
- Modify: `data/world-kernel/worldos-script-legacy-registry-v1.json`
- Modify: `data/world-kernel/worldos-maintenance-command-spine-v1.json`

**Interfaces:**
- Consumes: public nodes, paths, relations, current LAN RC report, local route components.
- Produces: `check:local-product-maturity`, and a stronger `check:mainline`.

- [x] **Step 1: Add local maturity contract**

Run: `test -f data/world-kernel/worldos-local-product-maturity-contract-v1.json`
Expected: exit code 0.

- [x] **Step 2: Add local maturity checker**

Run: `node --check scripts/check-worldos-local-product-maturity.mjs`
Expected: exit code 0.

- [x] **Step 3: Verify local maturity**

Run: `npm run check:local-product-maturity`
Expected: `WorldOS local product maturity check passed`.

- [x] **Step 4: Verify mainline includes maturity**

Run: `npm run check:mainline`
Expected: mainline passes and includes `check:local-product-maturity`.

### Task 10: 内容增长系统本地化

**Files:**
- Existing: `data/domains/experience/nodes.json`
- Existing: `data/domains/experience/paths.json`
- Existing: `data/core/relations.json`
- Existing: `content/**`
- Created: `data/world-kernel/worldos-local-content-growth-contract-v1.json`
- Created: `scripts/check-worldos-local-content-growth.mjs`
- Created: `docs/00-overview/worldos-phase-10-local-content-growth-taskboard.md`

**Interfaces:**
- Consumes: local maturity gates.
- Produces: richer real content, fewer thin nodes, and `check:local-content-growth`.

- [x] **Step 1: Audit thin content nodes**

Run: `npm run check:content`
Expected: content density and life gates pass before adding stricter local quality thresholds.

- [x] **Step 2: Expand representative nodes**

Add real content only after choosing a batch topic. Each added public node must have title, summary, area, relation, lifecycle, content path and at least one path.

- [x] **Step 3: Verify absorption**

Run: `npm run check:content && npm run check:local-product-maturity`
Expected: new content appears through paths, archive, atlas and node relation rail.

### Task 11: 本地 Owner 工作台

**Files:**
- Existing: `src/lib/owner-auth.ts`
- Existing: `src/app/api/**`
- Existing: `src/app/_legacy/ai-workbench-v2/page.tsx`
- Created: `data/world-kernel/worldos-local-owner-workbench-contract-v1.json`
- Created: `scripts/check-worldos-local-owner-workbench.mjs`
- Created: `docs/00-overview/worldos-phase-11-local-owner-workbench-taskboard.md`

**Interfaces:**
- Consumes: permission boundary and AI suggestion audit.
- Produces: locally usable owner review workflow without public exposure, verified by `check:local-owner-workbench`.

- [x] **Step 1: Re-audit owner-only routes**

Run: `npm run check:api-boundary && npm run check:permission-boundary`
Expected: owner routes remain guarded by server-side token/session checks.

- [x] **Step 2: Define local owner workflow**

Add or update a contract describing inbox, review queue, export, maintenance and audit actions. It must state that LAN use does not weaken server guards.

- [x] **Step 3: Verify owner workflow**

Run: `npm run check:boundary`
Expected: public pages do not import private/owner modules and guarded routes stay blocked without credentials.

### Task 12: AI 灯塔真实 Provider 接入准备

**Files:**
- Existing: `data/world-kernel/worldos-lighthouse-readonly-contract-v1.json`
- Existing: `scripts/check-worldos-lighthouse-readonly.mjs`
- Existing: `src/app/ask/page.tsx`
- Created: `data/world-kernel/worldos-ai-provider-boundary-contract-v1.json`
- Created: `scripts/check-worldos-ai-provider-boundary.mjs`
- Created: `docs/00-overview/worldos-phase-12-ai-provider-boundary-taskboard.md`

**Interfaces:**
- Consumes: AI boundary policy and public-only lighthouse surface.
- Produces: provider-ready backend boundary without enabling remote AI by default, verified by `check:ai-provider-boundary`.

- [x] **Step 1: Keep low-light mode as default**

Run: `npm run check:lighthouse`
Expected: low-light readonly gates pass.

- [x] **Step 2: Draft provider adapter boundary**

Create a backend-only provider contract. It must forbid client-side API keys, direct private indexing, automatic publishing, deletion and visibility changes.

- [x] **Step 3: Verify provider remains disabled**

Run: `npm run check:lighthouse-readonly`
Expected: `realTimeAIProviderEnabled` remains false until backend guard and review flow exist.

### Task 13: 本地产品化验收节奏

**Files:**
- Existing: `scripts/run-worldos-local-rc-trust-gate.mjs`
- Existing: `docs/90-archive/reports/worldos-local-rc-summary-report.json`
- Existing: `docs/90-archive/reports/worldos-local-lan-rc-report.json`

**Interfaces:**
- Consumes: all local gates.
- Produces: repeatable local release rhythm.

- [x] **Step 1: Run daily maturity gate**

Run: `npm run check:daily && npm run check:boundary && npm run check:local-product-maturity`
Expected: all commands pass locally.

- [x] **Step 2: Run full local RC**

Run: `npm run release:local-rc`
Expected: fresh build, LAN smoke, browser screenshots, audit and summary pass.

- [x] **Step 3: Commit verified local maturity batch**

Commit format: `feat(local): 中文说明` or more specific scope.
