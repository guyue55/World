# WorldOS Local RC Trust Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立可信的本地局域网 RC 入口，确保每次验收都基于新鲜 production build、可验证产物、局域网 IP 浏览器巡检和权限边界。

**Architecture:** 继续沿用现有 npm scripts 和 Node 脚本，不引入新依赖。构建脚本负责 fresh build，产物验证脚本负责存在性与时效性，RC 编排脚本负责顺序执行并在失败时停止。

**Tech Stack:** Node.js ESM scripts、Next.js production build、npm scripts、现有 LAN RC Chrome/CDP 巡检。

## Global Constraints

- 目前还是本地部署，局域网 IP 访问即可，使用 `npm run start`/现有 `smoke:lan-local` 验证。
- Playwright CLI 已安装，但本阶段优先复用现有 LAN RC 的 Chrome/CDP 证据。
- 遵守高内聚、低耦合、模块化、页面化。
- 降低门槛、提高体验、优先中文。
- 后端控制权限，前端控制体现；不得在前端硬编码权限事实。
- 检查和控制边界：必须覆盖 build、lint、typecheck、boundary、local runtime smoke、LAN smoke、audit。
- 提交格式：`xxx(xxx): 中文xxx`。

---

## File Structure

- Modify: `scripts/run-world-kernel-release-build.mjs`
  - 增加 `WORLD_KERNEL_FORCE_REBUILD=1` 支持，允许可信 RC 强制删除 `.next` 并重建。
- Modify: `scripts/verify-artifacts.mjs`
  - 增加 stale artifact 检查，确认 `.next/BUILD_ID` 不早于关键源码、数据、配置和脚本。
- Create: `scripts/run-worldos-local-rc-trust-gate.mjs`
  - 编排可信本地 RC：基础静态门禁、lint/typecheck、强制 build、产物验证、runtime smoke、LAN smoke、audit。
- Modify: `package.json`
  - 新增 `release:local-rc`。
  - 将 `check:rc:full` 指向可信入口，保留旧使用习惯。
- Evidence updated by verification:
  - `docs/90-archive/reports/*.json`
  - `docs/90-archive/reports/worldos-local-lan-rc/*.png`
  - `public/world-index.json`

## Task 1: 强制 fresh build 开关

**Files:**
- Modify: `scripts/run-world-kernel-release-build.mjs`

**Interfaces:**
- Consumes: environment variable `WORLD_KERNEL_FORCE_REBUILD`.
- Produces: existing `build:kernel-release` behavior remains compatible; when force is enabled, `.next` is removed and rebuilt.

- [ ] **Step 1: Add force rebuild flag**

Add:

```js
const forceRebuild = process.env.WORLD_KERNEL_FORCE_REBUILD === '1'
```

Change the existing skip condition to:

```js
if (!forceRebuild && missingArtifacts().length === 0) {
  console.log('World Kernel release build artifacts already exist; skipping rebuild.')
  console.log(`World Kernel release build log: ${logPath}`)
  process.exit(0)
}
```

- [ ] **Step 2: Emit force rebuild evidence**

Before removing `.next`, log:

```js
if (forceRebuild) console.log('World Kernel release build force rebuild enabled.')
```

- [ ] **Step 3: Verify forced build**

Run:

```bash
WORLD_KERNEL_FORCE_REBUILD=1 npm run build:kernel-release
```

Expected: exit code 0 and log output does not say `skipping rebuild`.

## Task 2: 产物时效验证

**Files:**
- Modify: `scripts/verify-artifacts.mjs`

**Interfaces:**
- Consumes: required artifacts and file mtimes under project root.
- Produces: `build:verify-artifacts` fails when `.next/BUILD_ID` is older than tracked source/config/data/script inputs unless `WORLDOS_SKIP_ARTIFACT_FRESHNESS=1`.

- [ ] **Step 1: Add source freshness scan**

Scan these paths recursively when they exist:

```js
const freshnessRoots = ['src', 'data', 'content', 'scripts']
const freshnessFiles = ['package.json', 'package-lock.json', 'next.config.ts', 'tailwind.config.ts', 'tsconfig.json']
```

Ignore `node_modules`, `.next`, `reports`, `docs/90-archive/reports`.

- [ ] **Step 2: Compare against BUILD_ID mtime**

Use `.next/BUILD_ID` as build timestamp. If any freshness input has `mtimeMs > buildMtimeMs + 1000`, print the newest stale inputs and exit 1.

- [ ] **Step 3: Verify stale check on current fresh build**

Run:

```bash
npm run build:verify-artifacts
```

Expected: exit code 0.

## Task 3: 本地 RC 可信编排入口

**Files:**
- Create: `scripts/run-worldos-local-rc-trust-gate.mjs`

**Interfaces:**
- Consumes: existing npm scripts.
- Produces: one command that proves local RC from fresh build to LAN browser evidence.

- [ ] **Step 1: Implement command runner**

Create an ESM script that runs commands in this order:

```text
npm run check:release:rc
npm run lint
npm run typecheck
WORLD_KERNEL_FORCE_REBUILD=1 npm run build:kernel-release
npm run build:verify-artifacts
npm run smoke:runtime-local
npm run smoke:lan-local
npm run audit:report
```

Each step prints `[WorldOS local RC trust gate] start/pass` and exits on first failure.

- [ ] **Step 2: Verify script directly**

Run:

```bash
node scripts/run-worldos-local-rc-trust-gate.mjs
```

Expected: exit code 0.

## Task 4: npm scripts 接入

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces:
  - `release:local-rc = node scripts/run-worldos-local-rc-trust-gate.mjs`
  - `check:rc:full = npm run release:local-rc`

- [ ] **Step 1: Update scripts**

Edit `package.json` scripts so the trusted command is discoverable and existing `check:rc:full` users get the fresh path.

- [ ] **Step 2: Verify npm entry**

Run:

```bash
npm run release:local-rc
```

Expected: exit code 0.

## Task 5: Full verification and commit

**Files:**
- Modified scripts and generated evidence.

**Interfaces:**
- Consumes: all prior tasks.
- Produces: one Chinese conventional commit.

- [ ] **Step 1: Run final gates**

Run:

```bash
npm run lint
npm run typecheck
npm run check:boundary
npm run release:local-rc
```

Expected: all exit code 0. Audit may still report 2 moderate vulnerabilities.

- [ ] **Step 2: Inspect status**

Run:

```bash
git diff --stat
git status --short
```

Expected: only planned scripts, plan, package file, generated reports/screenshots, and `public/world-index.json` changed.

- [ ] **Step 3: Commit**

Run:

```bash
git add package.json scripts/run-world-kernel-release-build.mjs scripts/verify-artifacts.mjs scripts/run-worldos-local-rc-trust-gate.mjs docs/superpowers/plans/2026-07-06-local-rc-trust-gate.md docs/90-archive/reports public/world-index.json
git commit -m "chore(rc): 固化本地可信验收"
```

Expected: commit succeeds.

## Self-Review

- Spec coverage: 覆盖本地部署、局域网 IP、fresh build、lint/typecheck/boundary、LAN smoke、权限边界和中文提交。
- Placeholder scan: 无 TBD/TODO/implement later。
- Interface consistency: 现有命令可继续使用；新增 `release:local-rc` 是唯一推荐可信入口。
