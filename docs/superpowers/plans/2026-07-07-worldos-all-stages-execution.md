# WorldOS All Stages Execution Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按路线图把阶段 0 到阶段 7 推进为可验证、可复跑、中文优先、权限可信的本地 LAN RC 状态。

**Architecture:** 阶段执行以数据契约和检查脚本为事实源，页面只消费公开 surface，权限由服务端/路由/API 守门。每个阶段必须有对应命令、报告或 JSON 契约，最后由 `npm run release:local-rc` 证明本地局域网可访问。

**Tech Stack:** Next.js App Router, TypeScript, Node.js 检查脚本, JSON contracts, local `next start`, Chrome/CDP LAN RC smoke.

## Global Constraints

- 本地部署优先：当前只要求局域网 IP 访问，外部 Preview / Production 仍保持 blocked。
- 降低门槛、提高体验、优先中文。
- 后端控制权限，前端只体现结果，不在前端硬编码权限事实。
- 每批必须运行对应 `check:*`、`lint`、`typecheck`、必要时 `release:local-rc`。
- 提交格式：`type(scope): 中文说明`。

---

### Task 0: 冻结与盘点

**Files:**
- Existing: `docs/00-overview/worldos-phase0-inventory-2026-07-05.md`
- Existing: `data/world-kernel/worldos-maintenance-command-spine-v1.json`
- Existing: `scripts/check-worldos-maintenance-command-spine.mjs`

**Interfaces:**
- Consumes: roadmap stage 0 requirements.
- Produces: stable command spine and mainline inventory evidence.

- [x] **Step 1: Verify mainline inventory exists**

Run: `test -f docs/00-overview/worldos-phase0-inventory-2026-07-05.md`
Expected: exit code 0.

- [x] **Step 2: Verify command spine**

Run: `npm run check:maintenance-command-spine`
Expected: `WorldOS maintenance command spine check passed`.

- [x] **Step 3: Verify stage 0 gates**

Run: `npm run check:mainline && npm run check:boundary`
Expected: both commands pass.

### Task 1: 公开世界主线闭环

**Files:**
- Existing: `src/app/page.tsx`
- Existing: `src/app/atlas/page.tsx`
- Existing: `src/app/paths/page.tsx`
- Existing: `src/app/node/[slug]/page.tsx`
- Existing: `src/app/archive/page.tsx`
- Existing: `src/app/timeline/page.tsx`

**Interfaces:**
- Consumes: public world object index and product routes.
- Produces: low-threshold public navigation and route closure.

- [x] **Step 1: Verify homepage and public experience**

Run: `npm run check:homepage && npm run check:experience:public`
Expected: both commands pass.

- [x] **Step 2: Verify map, path, node closure**

Run: `npm run check:atlas && npm run check:path-guidance && npm run check:node-reading`
Expected: all commands pass.

- [x] **Step 3: Verify timeline and archive closure**

Run: `npm run check:timeline && npm run check:content-archive`
Expected: both commands pass.

### Task 2: 动态宇宙体验系统

**Files:**
- Existing: `src/lib/public-world-surfaces.ts`
- Existing: `src/components/world/WorldPulseConstellation.tsx`
- Existing: `src/components/atlas/AtlasLiveConstellation.tsx`
- Existing: `src/components/timeline/*`
- Existing: `scripts/check-public-dynamic-world-surfaces.mjs`

**Interfaces:**
- Consumes: public surface builders and runtime provider.
- Produces: reduced-motion-safe dynamic public world.

- [x] **Step 1: Verify dynamic surface boundary**

Run: `npm run check:dynamic-world`
Expected: public dynamic world surface, public object index, and Chinese copy checks pass.

- [x] **Step 2: Verify reading and performance fallback**

Run: `npm run check:reading-comfort && npm run check:performance && npm run check:preview-performance`
Expected: all commands pass or existing project gates report pass.

### Task 3: 内容生命系统

**Files:**
- Created: `data/world-kernel/worldos-content-life-contract-v1.json`
- Created: `scripts/check-worldos-content-life.mjs`
- Modified: `data/domains/experience/paths.json`
- Modified: `src/components/node/NodeRelationRail.tsx`
- Modified: `src/lib/node-reading.ts`

**Interfaces:**
- Consumes: nodes, paths, relations, events.
- Produces: `check:content-life` and zero public nodes without a path.

- [x] **Step 1: Verify content density**

Run: `npm run check:worldos-content-density`
Expected: 52 public nodes, 52 content nodes, 82 relations, 13 paths.

- [x] **Step 2: Verify content life**

Run: `npm run check:content-life`
Expected: `WorldOS content life check passed`.

- [x] **Step 3: Verify content gate is in mainline**

Run: `npm run check:mainline`
Expected: output includes `check:content-life`.

### Task 4: 权限与私密边界

**Files:**
- Created: `data/world-kernel/worldos-permission-boundary-contract-v1.json`
- Created: `scripts/check-worldos-permission-boundary.mjs`
- Modified: `data/world-kernel/worldos-maintenance-command-spine-v1.json`
- Modified: `docs/00-overview/worldos-phase-4-taskboard.md`

**Interfaces:**
- Consumes: permissions matrix, visibility helper, owner auth, product routes, public JSON.
- Produces: `check:permission-boundary` and stronger `check:boundary`.

- [x] **Step 1: Verify API boundary**

Run: `npm run check:api-boundary`
Expected: all API routes registered and guarded.

- [x] **Step 2: Verify permission facts**

Run: `npm run check:permission-boundary`
Expected: `WorldOS permission boundary check passed`.

- [x] **Step 3: Verify full boundary**

Run: `npm run check:boundary && npm run check:routes`
Expected: both commands pass.

### Task 5: AI 灯塔与辅助系统

**Files:**
- Existing: `src/app/ask/page.tsx`
- Existing: `src/lib/lighthouse.ts`
- Existing: `data/domains/ai/ai-boundary-policy.json`
- Existing: `scripts/check-lighthouse-productization.ts`
- Created: `data/world-kernel/worldos-lighthouse-readonly-contract-v1.json`
- Created: `scripts/check-worldos-lighthouse-readonly.mjs`
- Modified: `docs/00-overview/worldos-phase-5-taskboard.md`

**Interfaces:**
- Consumes: public nodes, public paths, AI boundary policy.
- Produces: `check:lighthouse-readonly`, read-only public lighthouse, and audited owner-mode planning.

- [x] **Step 1: Verify public lighthouse**

Run: `npm run check:ai-boundary && npm run check:lighthouse`
Expected: both commands pass.

- [x] **Step 2: Verify AI suggestion audit planning**

Run: `npm run check:ai-suggestion-audit && npm run check:ai-world-companion`
Expected: both commands pass.

- [x] **Step 3: Harden lighthouse only-read evidence**

If any command is weak, add a `worldos-lighthouse-readonly-contract-v1.json` and checker requiring public-only recommendations, forbidden mutation actions, and no private/vault indexing.

### Task 6: 工程治理与发布

**Files:**
- Existing: `scripts/run-worldos-local-rc-trust-gate.mjs`
- Existing: `data/world-kernel/worldos-local-rc-evidence-policy-v1.json`
- Existing: `docs/90-archive/reports/worldos-local-rc-summary-report.json`

**Interfaces:**
- Consumes: all previous checks.
- Produces: trusted local LAN RC evidence.

- [x] **Step 1: Verify release local RC**

Run: `npm run release:local-rc`
Expected: fresh build, production CI build, artifact verification, runtime smoke, LAN smoke, audit, summary, and evidence policy pass.

- [x] **Step 2: Verify production remains blocked**

Run: `node scripts/check-worldos-local-rc-summary.mjs`
Expected: `local-rc-passed-external-release-blocked`.

### Task 7: 运营与长期演化

**Files:**
- Existing: `src/lib/content-growth.ts`
- Existing: `src/lib/theme-exhibitions.ts`
- Existing: `src/lib/export-center.ts`
- Existing: `src/lib/operations-export-planning.ts`

**Interfaces:**
- Consumes: content growth plans, theme exhibitions, export center and operations export planning.
- Produces: long-term maintenance evidence without claiming external production.

- [x] **Step 1: Verify content operations**

Run: `npm run check:content-growth && npm run check:theme-exhibitions`
Expected: both commands pass.

- [x] **Step 2: Verify export and operations planning**

Run: `npm run check:export-center && npm run check:operations-export-planning`
Expected: both commands pass.

### Task 8: Final Full-Stage Verification

**Files:**
- Existing: `package.json`
- Existing: `docs/90-archive/reports/*`

**Interfaces:**
- Consumes: all previous stage gates.
- Produces: final local LAN RC evidence.

- [x] **Step 1: Run daily, boundary, and content gates**

Run: `npm run check:daily && npm run check:boundary && npm run check:content`
Expected: all commands pass.

- [x] **Step 2: Run full local RC**

Run: `npm run release:local-rc`
Expected: LAN URL prints and summary status remains `local-rc-passed-external-release-blocked`.

- [x] **Step 3: Commit**

Commit format: `chore(stage): 中文说明` or the most specific scope for the completed batch.
