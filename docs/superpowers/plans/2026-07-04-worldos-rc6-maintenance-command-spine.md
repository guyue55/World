# WorldOS RC6 Maintenance Command Spine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the post-RC5 maintainability gap by adding a stable command spine, a repeatable maintenance contract, and a gate that prevents default development commands from drifting back into legacy stage chains.

**Architecture:** Keep all public product behavior unchanged. Add a small governance layer under `data/world-kernel/`, one focused check script under `scripts/`, and wire it into `check:mainline`; update documentation so future work starts from short, stable aliases rather than 700+ historical scripts.

**Tech Stack:** Next.js App Router project, Node.js ESM scripts, JSON governance registries, npm scripts, Markdown documentation.

## Global Constraints

- 不新增公开功能，不改变公开路由，不引入真实后端写入。
- 中文优先，降低门槛，提高体验。
- 后端 / 服务端控制权限，前端只控制体现。
- productionLive / releaseReady / cleanProductionReady 在没有真实外部证据前必须保持 false。
- 使用 Superpowers 工作流：计划、执行、验证、提交、打包。
- Commit 格式：`xxx(xxx): 中文xxx`。

---

### Task 1: Add RC6 maintenance command spine contract

**Files:**
- Create: `data/world-kernel/worldos-maintenance-command-spine-v1.json`
- Create: `data/world-kernel/worldos-1-rc6-maintenance-command-spine-v1.json`

**Interfaces:**
- Consumes: `package.json` scripts and existing RC5 registries.
- Produces: stable aliases consumed by `scripts/check-worldos-maintenance-command-spine.mjs`.

- [ ] Create a JSON contract defining `check:daily`, `check:boundary`, `check:rc`, `check:rc:fast`, `check:rc:full`, and required release state flags.
- [ ] Create an RC6 report JSON with metrics, status, and closed follow-up description.

### Task 2: Add maintenance command spine checker

**Files:**
- Create: `scripts/check-worldos-maintenance-command-spine.mjs`

**Interfaces:**
- Consumes: `data/world-kernel/worldos-maintenance-command-spine-v1.json`, `package.json`, `README.md`, `CONTRIBUTING.md`.
- Produces: exit code `0` only if aliases, docs, and production honesty are aligned.

- [ ] Implement exact alias verification.
- [ ] Verify alias commands do not call new stage-like check chains.
- [ ] Verify README / CONTRIBUTING mention RC6 and the stable aliases.
- [ ] Verify production state flags remain false.

### Task 3: Wire package scripts and registries

**Files:**
- Modify: `package.json`
- Modify: `data/world-kernel/worldos-script-taxonomy-v1.json`
- Modify: `data/world-kernel/worldos-script-legacy-registry-v1.json`
- Modify: `scripts/audit-worldos-project.mjs`

**Interfaces:**
- Consumes: existing `check:mainline`, `check:scripts`, `audit:project`.
- Produces: `check:maintenance-command-spine` and short aliases used by humans and gates.

- [ ] Add `check:daily`, `check:boundary`, `check:rc`, `check:rc:fast`, `check:rc:full`, `check:maintenance-command-spine`.
- [ ] Add maintenance check to `check:mainline`.
- [ ] Refresh script registry counts to account for new aliases.
- [ ] Add maintenance-contract check to `audit:project`.

### Task 4: Update docs and release notes

**Files:**
- Modify: `README.md`
- Modify: `CONTRIBUTING.md`
- Create: `docs/10-development-history/world-kernel/worldos-1-rc6-maintenance-command-spine.md`

**Interfaces:**
- Consumes: RC6 contract and package aliases.
- Produces: operator-facing instructions for daily, boundary, RC, and full local release checks.

- [ ] Document the new stable command spine.
- [ ] Document what remains blocked by external evidence.
- [ ] Keep production state honest.

### Task 5: Verify, commit, and package

**Files:**
- Generated package artifacts under `/mnt/data`.

**Interfaces:**
- Consumes: all previous tasks.
- Produces: clean git commit and full/changed packages.

- [ ] Run `npm ci --ignore-scripts --prefer-offline --no-audit --no-fund --progress=false`.
- [ ] Run `npm run check:maintenance-command-spine`.
- [ ] Run `npm run check:daily`.
- [ ] Run `npm run check:boundary`.
- [ ] Run `npm run audit:project`.
- [ ] Run `npm run check:rc:fast`.
- [ ] Run `npm run lint`, `npm run typecheck`, `npm run check`, `npm run check:routes`.
- [ ] Run `npm run check:rc:full` and artifact verification commands as needed.
- [ ] Commit with `chore(maintenance): 收束长期维护命令脊柱`.
- [ ] Package changed files, full package, manifest, and notes.
