# WorldOS Phase 26 Scene Runtime Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立当前公开主线的 Scene Registry、Scene Runtime 读取层、状态页可观测面板和可复跑门禁，让 WorldOS 页面先拥有统一“场景身份”。

**Architecture:** 以 JSON 事实源定义公开场景与转场语义，用 `src/lib/scene-runtime.ts` 提供纯函数读取与匹配；`/status` 只展示公开 scene 摘要，不引入权限判断。检查脚本验证 scene 覆盖、降级策略、转场定义、状态页接入和脚本注册。

**Tech Stack:** Next.js App Router、TypeScript、JSON fact source、Node.js check script、Lucide React、现有 WorldOS status panel 风格。

## Global Constraints

- 暂时忽略上线，只支持本地和局域网访问。
- 中文优先、低门槛、高体验。
- 后端控制权限，前端只体现，不在前端硬编码权限。
- 高内聚、低耦合、模块化、页面化。
- 不新增真实 AI Provider，不读取 API key，不发起外部 AI 请求。
- 不做写入、发布、删除、改权限、自动归档。
- 前端和 UI 遵守 `gsap-core` 与 `ui-ux-pro-max`，但 Phase 26 只建立场景事实源与可观测层，不堆动画。
- 提交格式为 `xxx(xxx): 中文xxx`。

---

## Task 1: 建立公开 Scene Registry 事实源

**Files:**
- Create: `data/domains/experience/scene-registry.json`

**Interfaces:**
- Produces: scene registry with `version`、`scope`、`scenes`、`transitions`、`acceptance`

- [x] **Step 1: 新增 Scene Registry**

必须包含以下公开主线场景：

- `/`：创世原点 / gateway
- `/atlas`：星图穹顶 / atlas
- `/timeline`：时间河 / timeline
- `/archive`：档案馆 / archive
- `/paths`：星路入口 / paths
- `/paths/[id]`：旅程路线 / path-detail
- `/node/[slug]`：节点展开室 / node
- `/ask`：AI 灯塔 / lighthouse
- `/status`：维护舱 / status

每个 scene 必须声明：

- `id`
- `match`
- `title`
- `realName`
- `sceneType`
- `motionGrammar`
- `entryTransition`
- `exitTransition`
- `ambientLayer`
- `primaryAction`
- `href`
- `objects`
- `reducedMotionFallback`
- `publicOnly=true`
- `requiresOwner=false`
- `requiresRealAI=false`

- [x] **Step 2: 新增转场语义**

必须包含：

- `gateway-to-atlas`
- `atlas-to-node`
- `timeline-to-node`
- `archive-to-node`
- `default-scene-shift`

每个 transition 必须声明 `from`、`to`、`motion`、`intent`、`reducedMotionFallback`。

## Task 2: 新增 Scene Runtime 读取层

**Files:**
- Create: `src/lib/scene-runtime.ts`

**Interfaces:**
- Consumes: `data/domains/experience/scene-registry.json`
- Produces:
  - `getSceneRegistry()`
  - `getAllScenes()`
  - `getPublicSceneSummary()`
  - `getSceneForPathname(pathname: string)`
  - `getSceneTransition(fromPathname: string, toPathname: string)`

- [x] **Step 1: 新增类型和读取函数**

导出 `SceneRegistry`、`SceneDefinition`、`SceneTransitionDefinition` 类型。

- [x] **Step 2: 实现场景匹配**

匹配规则：

- 精确匹配优先。
- `/node/*` 使用 `/node/[slug]` 场景。
- `/paths/*` 且不是 `/paths` 使用 `/paths/[id]` 场景。
- 未匹配时返回 fallback。

- [x] **Step 3: 实现转场匹配**

匹配规则：

- scene type 完全匹配 `from` / `to` 时返回该 transition。
- 未匹配时返回 `default-scene-shift`。

## Task 3: 在状态页展示 Scene Runtime

**Files:**
- Create: `src/components/status/SceneRuntimeStatusPanel.tsx`
- Modify: `src/app/status/page.tsx`

**Interfaces:**
- Consumes: `getPublicSceneSummary()`
- Produces: `/status` 上的 Scene Runtime 可观测面板

- [x] **Step 1: 新增状态页组件**

组件必须展示：

- “场景运行时”
- “Scene Registry”
- “本地 / 局域网”
- “不读取私密层”
- scene 总数
- transition 总数
- reduced-motion 策略
- 下一阶段建议

- [x] **Step 2: 集成 `/status`**

在 `OwnerReadonlyConsolePanel` 之后展示 `SceneRuntimeStatusPanel`。

## Task 4: 新增 Phase 26 检查并纳入主线

**Files:**
- Create: `scripts/check-worldos-scene-runtime.mjs`
- Modify: `package.json`
- Modify: `data/world-kernel/worldos-script-legacy-registry-v1.json`

**Interfaces:**
- Consumes: Scene Registry、Scene Runtime lib、状态页源码、package scripts、script registry
- Produces: `check:scene-runtime`

- [x] **Step 1: 新增检查脚本**

检查必须覆盖：

- registry 存在且 `localOnly=true`
- 必需 9 个公开场景齐全
- 每个 scene 都是 `publicOnly=true`
- 每个 scene 都是 `requiresOwner=false`
- 每个 scene 都是 `requiresRealAI=false`
- 每个 scene 有 reduced-motion fallback
- 必需 5 个 transition 齐全
- `src/lib/scene-runtime.ts` 导出必需函数
- `/status` 接入 `SceneRuntimeStatusPanel`
- 前端组件不包含 owner token、API key、真实 Provider 调用或 localStorage 权限逻辑

- [x] **Step 2: 新增 npm 命令**

在 `package.json` 增加：

```json
"check:scene-runtime": "node scripts/check-worldos-scene-runtime.mjs"
```

并把 `check:scene-runtime` 纳入 `check:mainline`，位置在 `check:phase25-owner-console` 之后。

- [x] **Step 3: 更新脚本注册表**

将 `check:scene-runtime` 加入 active entrypoints 和 recommendedDailyCommands，更新脚本计数与 notes。

## Task 5: 文档勾选、验收与提交

**Files:**
- Modify: `docs/00-overview/worldos-phase26-scene-runtime-execution-plan-2026-07-09.md`

**Interfaces:**
- Consumes: 所有任务结果
- Produces: 已勾选执行计划、验收结果和 git commit

- [x] **Step 1: 运行 Phase 26 检查**

Run:

```bash
npm run check:scene-runtime
```

Expected: pass.

- [x] **Step 2: 运行主线检查**

Run:

```bash
npm run check:mainline
```

Expected: pass.

- [x] **Step 3: 运行日常门禁**

Run:

```bash
npm run check:daily
```

Expected: pass.

- [x] **Step 4: 运行严格门禁**

Run:

```bash
npm run check:strict
```

Expected: pass.

- [x] **Step 5: 运行本地/LAN RC**

Run:

```bash
npm run release:local-rc
```

Expected: pass.

- [x] **Step 6: 深度异常扫描**

Run:

```bash
rg -n "TODO|FIXME|HACK|@ts-ignore|@ts-expect-error|as any|: any\\b|as unknown as|console\\.(log|warn|error)" src/app src/components src/lib --glob '!**/_legacy/**'
rg -n "OPENAI_API_KEY|ANTHROPIC_API_KEY|new OpenAI|responses\\.create|chat\\.completions|GUYUE_OWNER_TOKEN|R8_OWNER_TOKEN|localStorage.*(owner|permission|auth)" src/app src/components --glob '!src/app/api/**' --glob '!**/_legacy/**'
```

Expected: no output.

- [x] **Step 7: 提交**

Commit:

```bash
git commit -m "feat(scene): 建立场景运行时事实源"
```

## Final Acceptance

- [x] Scene Registry 主线事实源存在。
- [x] 9 个公开主线场景齐全。
- [x] 5 个场景转场语义齐全。
- [x] `src/lib/scene-runtime.ts` 提供纯读取函数。
- [x] `/status` 展示 Scene Runtime 状态。
- [x] `check:scene-runtime` 通过。
- [x] `check:mainline` 通过。
- [x] `check:daily` 通过。
- [x] `check:strict` 通过。
- [x] `release:local-rc` 通过。
- [x] 工作树最终干净。
