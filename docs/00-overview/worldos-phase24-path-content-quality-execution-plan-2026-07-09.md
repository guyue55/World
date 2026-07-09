# WorldOS Phase 24 路径与内容质量精修执行计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将公开路径从“节点列表”升级为可被验证、可被状态页理解、可继续探索的阅读旅程。

**Architecture:** 先建立 Phase 24 合同和路径质量账本，再由 `src/lib` 读取质量事实源，最后把路径详情 surface 与 `/status` 状态页接入同一份事实。检查脚本验证合同、账本、UI、命令入口和权限边界一致。

**Tech Stack:** Next.js App Router、TypeScript、JSON fact source、Node.js 检查脚本、Lucide React、现有 GSAP entrance hook、现有 WorldOS public surface builders。

## Global Constraints

- 暂时忽略上线，只支持本地和局域网访问。
- 中文优先、低门槛、高体验。
- 后端控制权限，前端只体现，不在前端硬编码权限。
- 高内聚、低耦合、模块化、页面化。
- 不新增真实 AI Provider，不读取 API key，不发起外部 AI 请求。
- UI 遵循现有 WorldOS 风格，动效只复用现有 `useGsapEntrance`，继续尊重 reduced-motion。
- 每项完成后必须标记。
- 提交格式为 `xxx(xxx): 中文xxx`。

---

## Task 1: 建立 Phase 24 路径质量合同与账本生成

**Files:**
- Create: `data/world-kernel/worldos-phase24-path-content-quality-contract-v1.json`
- Create: `data/domains/experience/path-journey-quality-ledger.json`
- Create: `scripts/write-worldos-path-quality-ledger.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `data/domains/experience/paths.json`、`data/domains/experience/nodes.json`、`data/core/relations.json`
- Produces: `path-journey-quality-ledger.json`

- [x] **Step 1: 新增 Phase 24 合同**

合同必须声明：

```json
{
  "scope": {
    "localOnly": true,
    "externalPreviewConsidered": false,
    "productionConsidered": false,
    "frontendPermissionControl": false
  },
  "minimums": {
    "publicPaths": 29,
    "publicNodes": 200,
    "relations": 398,
    "pathsWithAtLeastFourNodes": 29,
    "pathsWithEstimatedMinutes": 29,
    "pathsWithNarrativeDescription": 29,
    "pathsWithExitOrNext": 29,
    "pathsWithMultipleAreas": 18,
    "averageNodesPerPath": 5
  }
}
```

- [x] **Step 2: 新增账本生成脚本**

脚本读取公开路径、公开节点和关系，计算：

- 公开路径数量
- 公开节点数量
- 关系数量
- 至少 4 节点路径数
- 有预计阅读时间路径数
- 描述长度不少于 18 字路径数
- 有下一条路径或退出动作保障路径数
- 跨多个区域路径数
- 平均每条路径节点数
- 每条路径的质量摘要与问题列表

- [x] **Step 3: 新增 npm 命令**

在 `package.json` 增加：

```json
"build:path-quality-ledger": "node scripts/write-worldos-path-quality-ledger.mjs"
```

- [x] **Step 4: 生成账本**

Run:

```bash
npm run build:path-quality-ledger
```

Expected: writes `data/domains/experience/path-journey-quality-ledger.json`.

## Task 2: 增强路径详情旅程 surface

**Files:**
- Modify: `src/lib/public-surfaces/types.ts`
- Modify: `src/lib/public-surfaces/archive-and-paths.ts`
- Modify: `src/components/paths/PathJourneyBoard.tsx`

**Interfaces:**
- Consumes: `PathJourneySurface`
- Produces: 更清晰的路径承诺、步骤理由、完成提示和质量信号

- [x] **Step 1: 扩展 PathJourney 类型**

给 `PathJourneyStepSignal` 增加：

```ts
whyThisStep: string
progressLabel: string
```

给 `PathJourneySurface` 增加：

```ts
promise: string
rhythmLabel: string
completionHint: string
qualitySignals: Array<{ label: string; value: string | number; note: string }>
```

- [x] **Step 2: 在 builder 中生成旅程语义**

`buildPathJourneySurface` 必须基于公开节点生成：

- `promise`: 说明这条路径会帮访问者完成什么
- `rhythmLabel`: 节点数与预计时间
- `completionHint`: 走完后的下一步
- `whyThisStep`: 每一步为什么放在这里
- `progressLabel`: `1/7` 这样的明确进度
- `qualitySignals`: 区域覆盖、生命阶段、后续出口、公开边界

- [x] **Step 3: 更新 `PathJourneyBoard` UI**

组件必须展示：

- “旅程承诺”
- “阅读节奏”
- “为什么这一步”
- “完成后”
- `surface.qualitySignals`

## Task 3: 状态页展示路径质量事实源

**Files:**
- Create: `src/lib/path-quality-ledger.ts`
- Create: `src/components/status/PathQualityLedgerPanel.tsx`
- Modify: `src/app/status/page.tsx`

**Interfaces:**
- Consumes: `path-journey-quality-ledger.json`
- Produces: `/status` 上的“路径质量”面板

- [x] **Step 1: 新增 lib 读取函数**

导出：

```ts
export type PathQualityLedger = typeof pathQualityLedger
export function getPathQualityLedger(): PathQualityLedger
```

- [x] **Step 2: 新增状态页组件**

组件展示：

- 公开路径数量
- 平均节点数
- 跨区域路径数量
- 有出口路径数量
- 质量门禁状态
- 当前仍保持 local-only，不涉及外部发布

- [x] **Step 3: 集成到 `/status`**

在 `src/app/status/page.tsx` 中读取 ledger，并在 `LocalMaturityLedgerPanel` 之后渲染 `PathQualityLedgerPanel`。

## Task 4: 新增 Phase 24 检查并纳入主线

**Files:**
- Create: `scripts/check-worldos-phase24-path-quality.mjs`
- Modify: `package.json`
- Modify: `data/world-kernel/worldos-script-legacy-registry-v1.json`

**Interfaces:**
- Consumes: Phase 24 合同、路径质量账本、状态页源码、路径 surface 源码、package scripts
- Produces: `check:phase24-path-quality`

- [x] **Step 1: 新增检查脚本**

检查必须覆盖：

- 合同 local-only 与 release scope
- 账本指标达到最低值
- 每条公开路径节点均存在且公开
- `/status` 引入 `getPathQualityLedger` 和 `PathQualityLedgerPanel`
- `PathJourneyBoard` 展示旅程承诺、阅读节奏、为什么这一步、完成后
- 前端组件不得包含 API key、真实 Provider 调用或权限 token

- [x] **Step 2: 新增 npm 命令并纳入 `check:mainline`**

在 `package.json` 增加：

```json
"check:phase24-path-quality": "node scripts/check-worldos-phase24-path-quality.mjs"
```

并将 `check:mainline` 纳入 `npm run check:phase24-path-quality`。

- [x] **Step 3: 更新脚本注册表**

把 `check:phase24-path-quality` 加入 active entrypoints，并更新脚本计数。

- [x] **Step 4: 运行 Phase 24 检查**

Run:

```bash
npm run check:phase24-path-quality
```

Expected: pass.

## Task 5: 文档勾选、构建与深度验收

**Files:**
- Modify: `docs/00-overview/worldos-phase24-path-content-quality-execution-plan-2026-07-09.md`

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

Expected: no output, except documented public sitemap visibility filtering if scanned outside these paths.

## Final Acceptance

- [x] Phase 24 合同存在并通过检查。
- [x] 路径质量账本已生成。
- [x] 路径详情展示旅程承诺、阅读节奏、为什么这一步和完成后。
- [x] `/status` 展示路径质量事实源。
- [x] `check:mainline` 纳入 Phase 24 检查。
- [x] `check:daily` 通过。
- [x] `check:strict` 通过。
- [x] `release:local-rc` 通过。
