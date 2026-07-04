# WorldOS Project Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** 按 Superpowers 工作流完成 WorldOS RC3 全项目工程审查，并输出可复跑证据、报告、风险清单和后续收束建议。

**Architecture:** 本轮只新增审查资产，不扩展产品功能。通过一个独立 Node 审查脚本采集项目结构、路由边界、权限/API 风险、内容密度、脚本治理、legacy 足迹与发布阻断；报告写入 `data/world-kernel` 与 `docs/10-development-history/world-kernel`，并以 package script 提供复跑入口。

**Tech Stack:** Next.js / TypeScript / Node.js ESM script / JSON data / Markdown docs / npm scripts / Git.

## Global Constraints

- 中文优先，报告和说明用中文。
- 不新增公开功能，不改变公开路由体验。
- 后端/服务端控制权限，前端只能做显隐体现。
- 不伪造 productionLive、releaseReady、cleanProductionReady。
- 所有审查结论必须基于实际扫描和命令输出。
- 提交格式使用 `xxx(xxx): 中文xxx`。

---

### Task 1: 建立全项目审查脚本

**Files:**
- Create: `scripts/audit-worldos-project.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `package.json`, `src/app`, `src/components`, `src/features`, `src/lib/product-routes.ts`, `middleware.ts`, `data/domains/experience/*.json`, `data/core/*.json`, `data/world-kernel/*.json`
- Produces: CLI command `npm run audit:project` and JSON summary `data/world-kernel/worldos-1-rc4-project-review-v1.json`

- [x] **Step 1: Implement scanner**

Create a Node ESM script that scans counts, boundaries, mainline imports, API routes, scripts, content density, public data, and release state.

- [x] **Step 2: Wire npm script**

Add `"audit:project": "node scripts/audit-worldos-project.mjs"` to `package.json`.

- [x] **Step 3: Run audit**

Run: `npm run audit:project`
Expected: exits 0 and writes JSON report.

### Task 2: 输出人工可读审查报告

**Files:**
- Create: `docs/10-development-history/world-kernel/worldos-1-rc4-project-review.md`

**Interfaces:**
- Consumes: `data/world-kernel/worldos-1-rc4-project-review-v1.json`
- Produces: Markdown report with findings, risks, recommendations, and progress status.

- [x] **Step 1: Write report from audit evidence**

Summarize code, function, project, security/permission, content, UX, scripts, build/release, and Superpowers compliance.

- [x] **Step 2: Mark actual progress**

Use exact statuses: audit completed, review completed, production external evidence still blocked.

### Task 3: 复跑门禁并提交

**Files:**
- Modified audit/report/package files only.

**Interfaces:**
- Consumes: new audit script and existing project scripts.
- Produces: Git commit and package artifacts.

- [x] **Step 1: Run verification**

Run at minimum: `npm run audit:project`, `npm run check:mainline`, `npm run lint`, `npm run typecheck`, `npm run check`.

- [x] **Step 2: Commit**

Run: `git add ... && git commit -m "chore(audit): 完成全项目审查"`.

- [x] **Step 3: Package artifacts**

Create full package, changed files package, manifest, and notes in `/mnt/data`.
