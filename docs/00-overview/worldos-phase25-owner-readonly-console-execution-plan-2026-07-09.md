# WorldOS Phase 25 本地 Owner 只读指挥台执行计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立本地/LAN 范围内的 Owner 只读指挥台事实源、owner-only summary API、状态页面板和可复跑门禁。

**Architecture:** 先用 JSON 合同定义 Phase 25 边界，再由构建脚本聚合本地成熟度、路径质量、API 边界和 AI 低光事实，生成只读账本。服务端 `/api/owner/summary` 通过 `requireOwner` 返回账本；公开 `/status` 只展示安全摘要和边界，不暴露 token 或私密数据。

**Tech Stack:** Next.js App Router、TypeScript、JSON fact source、Node.js 检查脚本、Lucide React、现有 WorldOS status panels。

## Global Constraints

- 暂时忽略上线，只支持本地和局域网访问。
- 中文优先、低门槛、高体验。
- 后端控制权限，前端只体现，不在前端硬编码权限。
- 高内聚、低耦合、模块化、页面化。
- 不新增真实 AI Provider，不读取 API key，不发起外部 AI 请求。
- 不做写入、发布、删除、改权限、自动归档。
- UI 遵循现有 WorldOS 风格，动效仅复用既有 reduced-motion 友好模式。
- 每项完成后必须标记。
- 提交格式为 `xxx(xxx): 中文xxx`。

---

## Task 1: 建立 Phase 25 合同与 Owner 账本

**Files:**
- Create: `data/world-kernel/worldos-phase25-owner-readonly-console-contract-v1.json`
- Create: `data/domains/operations/owner-readonly-console-ledger.json`
- Create: `scripts/write-worldos-owner-readonly-console-ledger.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `local-maturity-ledger.json`、`path-journey-quality-ledger.json`、`worldos-api-boundary-registry-v1.json`、`lighthouse-local-status.json`
- Produces: `owner-readonly-console-ledger.json`

- [x] **Step 1: 新增 Phase 25 合同**

合同必须声明：

- `localOnly=true`
- `externalPreviewConsidered=false`
- `productionConsidered=false`
- `readonlyOnly=true`
- `serverGuardRequired=true`
- `frontendPermissionControl=false`
- `forbidWrites=true`
- `forbidRealAi=true`

- [x] **Step 2: 新增账本生成脚本**

脚本必须聚合：

- 本地 RC 状态、LAN 地址、runtime/LAN/browser 截图。
- 路径质量状态、公开路径、平均节点、跨区域路径。
- API 边界统计：owner-only、permission-guarded、mutatingRoutes。
- AI 低光/provider disabled 状态。
- 外部发布阻断状态。

- [x] **Step 3: 新增 npm 命令**

在 `package.json` 增加：

```json
"build:owner-readonly-console": "node scripts/write-worldos-owner-readonly-console-ledger.mjs"
```

- [x] **Step 4: 生成账本**

Run:

```bash
npm run build:owner-readonly-console
```

Expected: writes `data/domains/operations/owner-readonly-console-ledger.json`.

## Task 2: 新增 owner-only summary API 并注册边界

**Files:**
- Create: `src/app/api/owner/summary/route.ts`
- Modify: `data/world-kernel/worldos-api-boundary-registry-v1.json`

**Interfaces:**
- Consumes: `getOwnerReadonlyConsoleLedger()`
- Produces: `/api/owner/summary` owner-only read-only API

- [x] **Step 1: 新增 lib 读取函数**

在 Task 3 中创建 `src/lib/owner-readonly-console.ts`，供 API 和状态页复用。

- [x] **Step 2: 新增 API route**

API 必须：

- 使用 `requireOwner(request, 'owner-only-summary')`
- 未授权返回 403
- 授权后返回账本
- headers 设置 `cache-control: no-store`
- 只提供 GET

- [x] **Step 3: 更新 API 注册表**

新增 route：

- path: `/api/owner/summary`
- classification: `owner-only`
- guard: `requireOwner`
- mutability: `read-only`
- productionWrite: `false`
- requiresDatabase: `false`
- requiresRealAI: `false`

并更新 summary totalRoutes、ownerOnly、staticSafePublic 为真实值。

## Task 3: 状态页展示 Owner 只读边界

**Files:**
- Create: `src/lib/owner-readonly-console.ts`
- Create: `src/components/status/OwnerReadonlyConsolePanel.tsx`
- Modify: `src/app/status/page.tsx`

**Interfaces:**
- Consumes: `owner-readonly-console-ledger.json`
- Produces: `/status` 安全展示 Owner 只读指挥台摘要

- [x] **Step 1: 新增 lib 读取函数**

导出：

```ts
export type OwnerReadonlyConsoleLedger = typeof ownerReadonlyConsoleLedger
export function getOwnerReadonlyConsoleLedger(): OwnerReadonlyConsoleLedger
```

- [x] **Step 2: 新增状态页组件**

组件必须展示：

- “Owner 只读指挥台”
- “服务端守门”
- “只读 / no-store”
- “不写入、不发布、不调用真实 AI”
- owner-only API 数量
- local/LAN 范围

- [x] **Step 3: 集成到 `/status`**

在 `LocalMaturityLedgerPanel` 和 `PathQualityLedgerPanel` 之后展示 `OwnerReadonlyConsolePanel`。

## Task 4: 新增 Phase 25 检查并纳入主线

**Files:**
- Create: `scripts/check-worldos-phase25-owner-console.mjs`
- Modify: `package.json`
- Modify: `data/world-kernel/worldos-script-legacy-registry-v1.json`

**Interfaces:**
- Consumes: Phase 25 合同、Owner 账本、API route、API 注册表、状态页源码、package scripts
- Produces: `check:phase25-owner-console`

- [x] **Step 1: 新增检查脚本**

检查必须覆盖：

- 合同 local-only、readonly-only、release false。
- 账本状态 passed。
- API route 使用 `requireOwner`、`no-store`，只有 GET。
- API 注册表包含 `/api/owner/summary`。
- 未授权请求可由源码判断返回 403 guard。
- 状态页接入 `OwnerReadonlyConsolePanel`。
- 组件不包含 owner token、API key、真实 Provider 调用或 localStorage 权限逻辑。

- [x] **Step 2: 新增 npm 命令并纳入 `check:mainline`**

在 `package.json` 增加：

```json
"check:phase25-owner-console": "node scripts/check-worldos-phase25-owner-console.mjs"
```

并将 `check:mainline` 纳入 `npm run check:phase25-owner-console`。

- [x] **Step 3: 更新脚本注册表**

把 `check:phase25-owner-console` 加入 active entrypoints 和 recommendedDailyCommands，并更新脚本计数。

- [x] **Step 4: 运行 Phase 25 检查**

Run:

```bash
npm run check:phase25-owner-console
```

Expected: pass.

## Task 5: 文档勾选、构建与深度验收

**Files:**
- Modify: `docs/00-overview/worldos-phase25-owner-readonly-console-execution-plan-2026-07-09.md`

**Interfaces:**
- Consumes: 所有任务结果
- Produces: 已勾选执行计划和最终验收记录

- [x] **Step 1: 每完成一个 Task 后回写勾选**

将对应 `- [ ]` 改为 `- [x]`。

- [x] **Step 2: 运行日常门禁**

Run:

```bash
npm run check:daily
```

Expected: pass.

- [x] **Step 3: 运行严格门禁**

Run:

```bash
npm run check:strict
```

Expected: pass.

- [x] **Step 4: 运行本地/LAN RC**

Run:

```bash
npm run release:local-rc
```

Expected: pass.

- [x] **Step 5: 深度异常扫描**

Run:

```bash
rg -n "TODO|FIXME|HACK|@ts-ignore|@ts-expect-error|as any|: any\\b|as unknown as|console\\.(log|warn|error)" src/app src/components src/lib --glob '!**/_legacy/**'
rg -n "OPENAI_API_KEY|ANTHROPIC_API_KEY|new OpenAI|responses\\.create|chat\\.completions|GUYUE_OWNER_TOKEN|R8_OWNER_TOKEN|localStorage.*(owner|permission|auth)" src/app src/components --glob '!src/app/api/**' --glob '!**/_legacy/**'
```

Expected: no output.

## Final Acceptance

- [x] Phase 25 合同存在并通过检查。
- [x] Owner 只读账本已生成。
- [x] `/api/owner/summary` owner-only、read-only、no-store。
- [x] `/status` 展示 Owner 只读边界。
- [x] `check:mainline` 纳入 Phase 25 检查。
- [x] `check:daily` 通过。
- [x] `check:strict` 通过。
- [x] `release:local-rc` 通过。
