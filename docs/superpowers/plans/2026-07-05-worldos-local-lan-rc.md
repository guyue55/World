# WorldOS Local LAN RC Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a repeatable local LAN release-candidate validation lane for WorldOS while keeping production flags false.

**Architecture:** Keep the existing local runtime smoke as the HTTP baseline, then add a LAN-specific RC layer that binds `next start` to `0.0.0.0`, detects a local IPv4 address, verifies pages through that LAN URL, and captures browser evidence. Static contracts live in `data/world-kernel`; executable behavior lives in focused scripts under `scripts`.

**Tech Stack:** Next.js App Router, Node.js scripts, Chrome DevTools Protocol through system Chrome, npm command gates, JSON evidence reports.

## Global Constraints

- 本地部署即可：使用 `npm run start` / `next start`，局域网 IP 访问即可。
- 默认中文、低门槛：报告与文档必须优先中文解释，避免内部工程词压过结论。
- 后端控制权限：LAN RC 只能验证服务端 guard 和 public surface 结果，不能把前端显隐当权限事实源。
- 动态是增强：HTML/CSS 基础态必须可读，JS/动效失败不能白屏。
- 生产状态诚实：没有真实外部 Preview / Production 前，`productionLive`、`releaseReady`、`cleanProductionReady` 必须保持 `false`。
- 生产状态明文：阶段 8 的计划、报告和文档必须保留 `productionLive: false`。
- 提交格式：`xxx(xxx): 中文xxx`。

---

### Task 1: LAN RC Contract

**Files:**
- Create: `data/world-kernel/worldos-local-lan-rc-v1.json`
- Create: `data/world-kernel/worldos-1-rc8-local-lan-rc-v1.json`
- Create: `docs/10-development-history/world-kernel/worldos-1-rc8-local-lan-rc.md`

**Interfaces:**
- Produces: LAN RC route matrix, browser viewport matrix, release state policy, evidence output paths.
- Consumes: Existing WorldOS public routes and guarded routes.

- [ ] **Step 1: Add LAN RC registry**

Create `data/world-kernel/worldos-local-lan-rc-v1.json` with server settings, route coverage, viewport coverage, evidence paths, and production flags set to false.

- [ ] **Step 2: Add RC8 completion record**

Create `data/world-kernel/worldos-1-rc8-local-lan-rc-v1.json` with scope, completed items, release state, and next recommended step.

- [ ] **Step 3: Add human-readable history**

Create `docs/10-development-history/world-kernel/worldos-1-rc8-local-lan-rc.md` explaining why LAN validation exists and what it does not prove.

- [ ] **Step 4: Verify JSON is parseable**

Run: `npm run check:json`

Expected: PASS.

### Task 2: LAN RC Runner

**Files:**
- Create: `scripts/run-worldos-local-lan-rc.mjs`

**Interfaces:**
- Consumes: `data/world-kernel/worldos-local-lan-rc-v1.json`.
- Produces: `docs/90-archive/reports/worldos-local-lan-rc-report.json`, screenshot files under `docs/90-archive/reports/worldos-local-lan-rc/`.

- [ ] **Step 1: Start production server**

Implement a runner that spawns `node_modules/.bin/next start -H 0.0.0.0 -p <port>`, detects a non-internal IPv4 address, and waits for `http://<lan-ip>:<port>/`.

- [ ] **Step 2: Run real HTTP checks**

Request public HTML, static assets, redirects, guarded routes, and a negative route through the LAN base URL.

- [ ] **Step 3: Run browser checks**

Launch system Chrome headless with remote debugging, navigate desktop and mobile reduced-motion viewports, capture page errors, console errors, network failures, text length, hidden body state, overflow, and screenshots.

- [ ] **Step 4: Write evidence report**

Write a JSON report with LAN IP, base URL, HTTP checks, browser checks, screenshot paths, failures, and production flags.

- [ ] **Step 5: Verify runner**

Run after build: `npm run smoke:lan-local`

Expected: PASS and report status `passed`.

### Task 3: LAN RC Static Gate

**Files:**
- Create: `scripts/check-worldos-local-lan-rc.mjs`
- Modify: `package.json`
- Modify: `data/world-kernel/worldos-maintenance-command-spine-v1.json`
- Modify: `data/world-kernel/worldos-script-taxonomy-v1.json`
- Modify: `scripts/check-worldos-maintenance-command-spine.mjs`

**Interfaces:**
- Produces: `check:lan-local` and `smoke:lan-local`.
- Consumes: LAN RC registry and package scripts.

- [ ] **Step 1: Add static checker**

Check that registry/report/docs/scripts exist, release flags remain false, route and viewport coverage are sufficient, runner contains LAN IP detection, `0.0.0.0`, DevTools browser checks, screenshots, and package scripts.

- [ ] **Step 2: Wire npm scripts**

Add `check:lan-local` and `smoke:lan-local`; include `check:lan-local` in `check:release:rc`; include `smoke:lan-local` in `check:rc:full`.

- [ ] **Step 3: Update command spine and taxonomy**

Add LAN RC commands to the long-term command spine and script taxonomy without changing production status.

- [ ] **Step 4: Verify static gate**

Run: `npm run check:lan-local`

Expected: PASS.

### Task 4: Documentation And Final Verification

**Files:**
- Modify: `README.md`
- Modify: `CONTRIBUTING.md`

**Interfaces:**
- Consumes: `check:lan-local`, `smoke:lan-local`, `check:rc:full`.
- Produces: operator-facing LAN RC instructions.

- [ ] **Step 1: Document LAN RC lane**

Add a concise Chinese section explaining when to run `npm run smoke:lan-local`, what evidence it writes, and why it does not mean production is live.

- [ ] **Step 2: Run verification commands**

Run:

```bash
npm run check:lan-local
npm run check:release:rc
npm run build
npm run smoke:lan-local
npm run lint
npm run typecheck
npm run check:boundary
```

Expected: all commands PASS.

- [ ] **Step 3: Clean generated timestamp noise**

If `public/world-index.json` or evidence templates only changed generated timestamps, restore them before commit unless the report is intentionally part of the deliverable.

- [ ] **Step 4: Commit**

```bash
git add data/world-kernel/worldos-local-lan-rc-v1.json data/world-kernel/worldos-1-rc8-local-lan-rc-v1.json docs/10-development-history/world-kernel/worldos-1-rc8-local-lan-rc.md docs/superpowers/plans/2026-07-05-worldos-local-lan-rc.md scripts/run-worldos-local-lan-rc.mjs scripts/check-worldos-local-lan-rc.mjs scripts/check-worldos-maintenance-command-spine.mjs data/world-kernel/worldos-maintenance-command-spine-v1.json data/world-kernel/worldos-script-taxonomy-v1.json README.md CONTRIBUTING.md package.json
git commit -m "chore(release): 完成本地局域网RC验收"
```
