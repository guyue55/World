# WorldOS Phase 23 本地成熟度可观测化执行计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将本地/LAN RC、内容质量、审计、截图证据收束成可复核事实源，并在 `/status` 页面展示。  
**Architecture:** 先生成后端/构建期事实源 JSON，再由 `src/lib` 读取，最后由状态页组件展示；检查脚本验证事实源、UI、命令、边界和报告一致性。  
**Tech Stack:** Next.js App Router、TypeScript、JSON fact source、Lucide React、Node.js 检查脚本、现有 `release:local-rc` 证据报告。

## Global Constraints

- 暂时忽略上线，只支持本地和局域网访问。
- 中文优先、低门槛、高体验。
- 后端控制权限，前端只体现，不在前端硬编码权限。
- 高内聚、低耦合、模块化、页面化。
- 不新增真实 AI Provider，不读取 API key，不发起外部 AI 请求。
- UI 遵循现有 WorldOS 风格，并参考 `gsap-core`、`ui-ux-pro-max`：克制动效、尊重 reduced-motion、信息密度清晰。
- 每项完成后必须标记，提交格式为 `xxx(xxx): 中文xxx`。

---

## Task 1: 输出规划与执行计划文档

**Files:**
- Create: `docs/00-overview/worldos-future-master-plan-v3-after-research-2026-07-09.md`
- Create: `docs/00-overview/worldos-execution-plan-v3-local-maturity-2026-07-09.md`

**Interfaces:**
- Consumes: 当前项目状态、联网资料、Phase 19/20/21 结果。
- Produces: 本文件和 v3 全局规划，后续任务按本文件执行。

- [x] **Step 1: 完成全局规划文档**

写入 `worldos-future-master-plan-v3-after-research-2026-07-09.md`，包含背景、对标、目标、里程碑、阶段和成功指标。

- [x] **Step 2: 完成执行计划文档**

写入当前执行计划，覆盖所有本轮要执行的文件、接口、验证命令和勾选项。

- [x] **Step 3: 验证文档没有未定义内容**

使用全文扫描确认两份文档没有未定义项、临时描述或模糊空泛语。Expected: no output.

---

## Task 2: 建立本地成熟度事实源

**Files:**
- Create: `data/world-kernel/worldos-phase23-local-maturity-observability-contract-v1.json`
- Create: `data/domains/operations/local-maturity-ledger.json`
- Create: `scripts/write-worldos-local-maturity-ledger.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `docs/90-archive/reports/worldos-local-rc-summary-report.json`、`worldos-local-lan-rc-report.json`、`worldos-local-runtime-smoke-report.json`、`npm-audit-report.json`、`worldos-content-jaccard-report.json`、世界数据 JSON。
- Produces: `local-maturity-ledger.json`，供 `src/lib/local-maturity-ledger.ts` 读取。

- [x] **Step 1: 新增 Phase 23 合同**

合同要求：

- `localOnly=true`
- `externalPreviewConsidered=false`
- `productionConsidered=false`
- `productionLive/releaseReady/cleanProductionReady=false`
- 最低指标：200 节点、29 路径、398 关系、50 事件、20 runtime checks、22 LAN HTTP、20 browser checks、20 screenshots、0 high/critical audit。

- [x] **Step 2: 新增 ledger 生成脚本**

脚本读取本地报告和世界数据，写入 `data/domains/operations/local-maturity-ledger.json`。

- [x] **Step 3: 新增 npm 命令**

在 `package.json` 增加：

```json
"build:local-maturity-ledger": "node scripts/write-worldos-local-maturity-ledger.mjs"
```

- [x] **Step 4: 生成 ledger**

Run:

```bash
npm run build:local-maturity-ledger
```

Expected: writes `data/domains/operations/local-maturity-ledger.json`.

---

## Task 3: 在状态页展示本地成熟度

**Files:**
- Create: `src/lib/local-maturity-ledger.ts`
- Create: `src/components/status/LocalMaturityLedgerPanel.tsx`
- Modify: `src/app/status/page.tsx`

**Interfaces:**
- Consumes: `local-maturity-ledger.json`
- Produces: `/status` 页面上的“本地成熟度”面板。

- [x] **Step 1: 新增 lib 读取函数**

导出：

```ts
export type LocalMaturityLedger = typeof localMaturityLedger
export function getLocalMaturityLedger(): LocalMaturityLedger
```

- [x] **Step 2: 新增状态面板组件**

组件展示：

- 本地/LAN RC 状态。
- runtime、LAN、browser、screenshots。
- 内容规模。
- audit high/critical。
- 外部发布保持阻断。

- [x] **Step 3: 集成到 `/status`**

在 `src/app/status/page.tsx` 中读取 ledger 并渲染面板，位置放在 `AiLowLightStatusPanel` 之后。

---

## Task 4: 新增 Phase 23 检查并纳入主线

**Files:**
- Create: `scripts/check-worldos-phase23-local-maturity.mjs`
- Modify: `package.json`
- Modify: `data/world-kernel/worldos-script-legacy-registry-v1.json`

**Interfaces:**
- Consumes: Phase 23 合同、ledger、状态页源码、组件源码、报告和 package scripts。
- Produces: `check:phase23-local-maturity`，并纳入 `check:mainline`。

- [x] **Step 1: 新增检查脚本**

检查内容：

- 合同 local-only 和 release flags。
- ledger 指标达到合同最低值。
- runtime/LAN/browser/audit 报告没有失败。
- `/status` 引入 `getLocalMaturityLedger` 和 `LocalMaturityLedgerPanel`。
- 组件展示“本地成熟度”“LAN”“截图”“外部发布保持阻断”。
- 前端组件不得包含 API key、真实 Provider 调用或权限 token。

- [x] **Step 2: 新增 npm 命令**

在 `package.json` 增加：

```json
"check:phase23-local-maturity": "node scripts/check-worldos-phase23-local-maturity.mjs"
```

并将 `check:mainline` 纳入 `npm run check:phase23-local-maturity`。

- [x] **Step 3: 更新脚本注册表**

把 `check:phase23-local-maturity` 加入 active entrypoints，并更新脚本计数。

- [x] **Step 4: 运行检查**

Run:

```bash
npm run check:phase23-local-maturity
```

Expected: pass.

---

## Task 5: 文档勾选与多轮验证

**Files:**
- Modify: `docs/00-overview/worldos-execution-plan-v3-local-maturity-2026-07-09.md`
- Modify: `docs/00-overview/worldos-future-master-plan-v3-after-research-2026-07-09.md`

**Interfaces:**
- Consumes: 所有任务结果。
- Produces: 已勾选执行计划和最终验收记录。

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

---

## Final Acceptance

- [x] Phase 23 合同存在并通过检查。
- [x] 本地成熟度 ledger 已生成。
- [x] `/status` 展示本地成熟度事实源。
- [x] `check:mainline` 纳入 Phase 23 检查。
- [x] `check:daily` 通过。
- [x] `check:strict` 通过。
- [x] `release:local-rc` 通过。
- [x] 工作树只包含本轮预期变更。
- [x] 已按中文 conventional commit 提交。
