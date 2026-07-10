# WorldOS Reality-First 一次性 Goal 执行计划

> **For agentic workers:** REQUIRED SUB-SKILL: use `superpowers:executing-plans` for checkpoint execution; use fresh subagents where available for independent visual review. Every item uses checkbox state and must be reflected in the execution ledger.

**Goal:** 在一个持续 Goal 内，把当前博客式骨架重构为 localhost / LAN 上真实可进入、可探索、可迁移、可阅读、可导览和可回访的个人数字世界。

**Architecture:** 复用 World Kernel、公开事实源、Next.js、React、GSAP、SVG / Canvas、原生浏览器 API 和现有依赖；共享数据与运行时，分别实现七个高内聚场景主体；以生产态截图、录屏、浏览器矩阵和独立视觉审查作为终止条件。

**Tech Stack:** Next.js 15、React 19、TypeScript、Tailwind CSS、CSS Modules、GSAP、SVG / Canvas 2D、Web Audio、View Transition progressive enhancement、Zod、Playwright CLI / system Chrome、ffmpeg。

## Global Constraints

- 唯一控制：`AGENTS.md` 与 Reality-First 六份权威文档。
- 仅 localhost / LAN；不做外部 Preview / Production。
- 控制契约、体验验收和 Goal 提示词冻结，执行者不得修改。
- 中文优先；权限由服务端 / 数据契约控制，前端只体现。
- 新运行时依赖默认不允许；确需新增时必须先写 ADR 并证明体积、收益和降级。
- 新场景使用 GSAP + CSS，不允许 GSAP 与 Framer Motion 同时控制同一元素属性。
- 默认静音；不得把 AI Key、私密内容或 owner 能力送到客户端。
- 每项完成后更新复选框与执行账本；每个检查点中文提交并自动继续。
- 旧 M29 / M30 分数、报告状态和文件存在性不构成验收证据。

---

## 文件责任图

### 新增主线文件

| 文件 | 单一职责 |
| --- | --- |
| `src/lib/scenes/scene-context.ts` | 场景来源、聚焦对象和旅程上下文类型 |
| `src/lib/scenes/scene-destination.ts` | 可迁移目标与具名迁移对象 |
| `src/lib/scenes/build-*-model.ts` | 各场景从 public index 建立 view model |
| `src/components/world/primitives/*` | 无场景人格的可访问基础控件 |
| `src/components/world/migration/*` | 迁移状态机、Link、可取消动画层 |
| `src/components/product/WorldGatewayStage.tsx` | 首访 / 回访世界入口 |
| `src/components/atlas/AtlasExplorationStage.tsx` | Atlas 主空间 |
| `src/components/timeline/TimelineRiverStage.tsx` | Timeline 主空间 |
| `src/components/archive/ArchiveHallStage.tsx` | Archive 主空间 |
| `src/components/paths/JourneyRouteStage.tsx` | Paths 与 Path Detail 主空间 |
| `src/components/node/NodePlaceRoom.tsx` | Node 地点与阅读空间 |
| `src/components/ask/LighthouseGuideStage.tsx` | Lighthouse 观测与导览空间 |
| `src/server/ai/provider/*` | 服务端 Provider adapter，客户端不可导入 |
| `src/server/ai/lighthouse-service.ts` | 公开上下文、provider、fallback 的唯一编排入口 |
| `data/assets/world-scene-assets.json` | 场景视觉 / 音频资产来源和预算事实源 |
| `scripts/audit-worldos-reality-first.mjs` | 只报告当前真实缺陷，不打分 |
| `scripts/check-worldos-reality-first.mjs` | 客观 route / DOM / 边界 / 新鲜度门禁 |
| `scripts/evidence-worldos-reality-first.mjs` | 生产态截图、录屏、浏览器矩阵和 manifest |

### 退出公开主线的文件

| 文件 | 处理 |
| --- | --- |
| `src/components/world/SceneWorldPortal.tsx` | 所有核心 route 替换后移到 `_legacy` 或删除 |
| `src/components/world/SceneProductionFrame.tsx` | 移出公开主线；工程说明只留 `/status` |
| `src/components/world/SceneDeepInteractionPanel.tsx` | 交互进入真实场景对象后移除 |
| `src/components/product/ProductRouteGuide.tsx` | 核心 route 用空间出口替代 |
| `src/components/world/SceneIdentityBand.tsx` | 核心场景通过空间自身表达身份后从 shell 移除 |

---

## C0：废止假绿灯，建立真实基线

**用户可见结果：** 暂无视觉变化；项目不再把旧硬编码评分当作完成证明，Goal 从真实 `FOUNDATION_ONLY` 状态出发。

**Files:**

- Modify: `package.json`
- Modify: `data/world-kernel/worldos-script-legacy-registry-v1.json`
- Modify: `src/app/status/page.tsx`
- Modify / retire: `src/components/status/UltimateCandidatePanel.tsx`
- Create: `data/domains/experience/reality-first-route-contract.json`
- Create: `scripts/audit-worldos-reality-first.mjs`
- Create: `docs/90-archive/reports/worldos-reality-first/baseline-2026-07-10/manifest.json`
- Modify: `docs/00-overview/worldos-reality-first-execution-ledger-2026-07-10.md`

**Interfaces:**

- Consumes: existing M30 screenshots, package scripts, public route registry.
- Produces: `npm run audit:world-experience` and a truthful baseline report with `status: FOUNDATION_ONLY`.

- [ ] **C0.1** 从 `check:mainline` 移除 `check:m29-high-fidelity-polish` 与 `check:m30-ultimate-candidate`；保留命令供历史复查，但不得再参与发布判定。
- [ ] **C0.2** 在 script registry 中把旧 M29 / M30 命令登记为 `historicalInvalidatedEntrypoints`，并从 daily / RC active entrypoints 移除。
- [ ] **C0.3** 从 `/status` 移除“9/10 候选”当前态展示，改为历史结论已失效和 `FOUNDATION_ONLY` 真实基线；不得继续读取旧分数作为当前摘要。
- [ ] **C0.4** 新建 route contract，固定七类空间、动态 route 样本、desktop / mobile / reduced-motion / reduced-sensory 模式、禁用公开文案和必需流程。
- [ ] **C0.5** 新建 audit script：扫描核心 route imports、公开源码禁用文案、旧共享 portal 使用、旧报告新鲜度；输出 findings，禁止生成分数。
- [ ] **C0.6** 把现有五组 M30 画面登记为 anti-baseline；manifest 记录 commit、证据路径与已确认缺陷，不复制图片。
- [ ] **C0.7** 运行 audit，确认结果明确为未达标而命令本身可正常完成；不得把 findings 清零。
- [ ] **C0.8** 运行 `npm run typecheck`、`npm run lint`、`npm run check:scripts`、`git diff --check`。
- [ ] **C0.9** 更新 ledger，提交 `test(world): 废止终局自评分并建立真实基线`。

**Expected audit facts:**

```text
status=FOUNDATION_ONLY
oldSelfScoringInvalidated=true
coreRoutesUsingSceneWorldPortal>0
publicEngineeringCopyFindings>0
visualAcceptance=not-run
```

---

## C1：锁定视觉方向、资产和场景基础能力

**用户可见结果：** 七个空间拥有真实主视觉资产与各自构图，不再依赖渐变和线框作为唯一世界形象。

**Files:**

- Create: `data/assets/world-scene-assets.json`
- Create: `src/lib/world-scene-assets.ts`
- Create: `src/styles/world-scene-tokens.css`
- Modify: `src/app/globals.css`
- Create: `src/components/world/primitives/WorldViewport.tsx`
- Create: `src/components/world/primitives/SceneObjectButton.tsx`
- Create: `src/components/world/primitives/SceneInspector.tsx`
- Create: `src/components/world/primitives/WorldExitRail.tsx`
- Create: `src/components/world/primitives/AccessibleSceneList.tsx`
- Create: `public/world/scenes/**`

**Interfaces:**

```ts
export type WorldSceneAsset = {
  sceneId: 'gateway' | 'atlas' | 'timeline' | 'archive' | 'paths' | 'node' | 'lighthouse'
  desktop: { src: string; width: number; height: number; bytes: number }
  mobile: { src: string; width: number; height: number; bytes: number }
  source: 'generated' | 'owned' | 'licensed'
  licenseId: string
  promptSummary?: string
}
```

- [ ] **C1.1** 使用 `ui-ux-pro-max` 复核构图、色彩、字体、触控与导航；使用 `gsap-core` 复核可动对象和 reduced-motion 策略。
- [ ] **C1.2** 按架构文档的七份冻结 brief 制作 desktop / mobile bitmap；有图像生成能力时使用 `imagegen-frontend-web` / `imagegen` 工作流，逐张用图像查看工具检查对象清晰、没有烘焙文字、没有统一科技模板。
- [ ] **C1.3** 转为 WebP / AVIF，写入精确尺寸和字节；mobile 单张不超过 350 KB，desktop 单张不超过 700 KB。
- [ ] **C1.4** 建立资产 registry，记录工具 / 来源、日期、提示摘要、用途、许可与预算；没有许可状态的资产不得被 route 引用。
- [ ] **C1.5** 抽离世界级 token：scene foreground、overlay、fog、accent、surface、focus、transition duration、中文 serif / sans fallback；清理负 letter-spacing，并把普通 UI 圆角控制在 8px 内。
- [ ] **C1.6** 实现五个无人格 primitive，并写键盘、focus、drawer、fallback 的组件测试或静态检查。
- [ ] **C1.7** 建立 `WorldViewport` 稳定尺寸：desktop 至少 `min(100svh - chrome, 900px)`，mobile 首屏不被固定控件遮挡。
- [ ] **C1.8** 运行 `npm run typecheck`、`npm run lint`、资产预算检查、`git diff --check`。
- [ ] **C1.9** 保存资产 contact sheet 和逐图审查记录，更新 ledger，提交 `feat(world): 建立七类场景视觉资产与基础控件`。

**Gate:** 七组 desktop / mobile 资产全部可见且各自空间对象不同；任何纯氛围、模糊或无法承载交互的图必须重做。

---

## C2：重做全局世界壳与 Gateway

**用户可见结果：** 打开 `/` 后首先进入世界，而不是阅读产品介绍；首访与回访明显不同。

**Files:**

- Create: `src/components/world/WorldChrome.tsx`
- Create: `src/components/product/WorldGatewayStage.tsx`
- Create: `src/components/product/WorldGatewayStage.module.css`
- Create: `src/lib/scenes/scene-context.ts`
- Create: `src/lib/scenes/scene-destination.ts`
- Create: `src/lib/scenes/build-gateway-model.ts`
- Create: `data/domains/content/world-public-curation.json`
- Create: `src/lib/public-world-curation.ts`
- Modify: `src/components/world/WorldShell.tsx`
- Modify: `src/components/world/WorldRuntimeProvider.tsx`
- Modify: `src/components/product/ProductHome.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**

- Consumes: public areas / nodes / paths, journey memory, scene assets.
- Produces: `GatewayViewModel`, `SceneDestination`, first-visit and returning-visit entry states.

- [ ] **C2.1** 把 `SceneContext`、`SceneDestination` 与 schema 版本写成单一类型入口；不得复制 Node / Area 类型。
- [ ] **C2.2** 建立公开策展 registry：至少 24 个来源可追溯的代表节点覆盖项目、记忆、片段、规则和主要区域；把 RC、QA、script、evidence 类节点降为 Archive-only，不改变 visibility。
- [ ] **C2.3** 拆分 `WorldRuntimeProvider` 的纯函数和 storage 逻辑，保持外部 context API 向后兼容。
- [ ] **C2.4** 新建 route-aware `WorldChrome`：desktop 使用轻量空间罗盘，mobile 使用底部 / 顶部紧凑导航；隐藏无关全局 footer 和身份条。
- [ ] **C2.5** 实现 Gateway first-visit：世界远景、一个进入动作、入口开启、三个可感知方向；场景主体首屏占比达标。
- [ ] **C2.6** 实现 returning visit：显示上次公开地点、未完成路径、继续与清除；不展示敏感历史。
- [ ] **C2.7** 从首页移除 `SceneWorldPortal`、统计卡、运行模式说明、Evidence / Fallback 文案和重复 CTA。
- [ ] **C2.8** 为 JS / storage / image 失败提供静态 Gateway，仍可进入 Atlas、Paths 与 Archive。
- [ ] **C2.9** 使用 GSAP 编排入口开启与对象响应；通过 `matchMedia()` 提供 mobile / reduced-motion 分支并清理 timeline。
- [ ] **C2.10** 生产构建并截图 `home-desktop-first`、`home-mobile-first`、`home-desktop-returning`、`home-text-hidden`；逐张视觉审查。
- [ ] **C2.11** 运行定向测试、策展 schema / 引用检查、`typecheck`、`lint`、`build:production-ci`、`git diff --check`。
- [ ] **C2.12** 更新 ledger，提交 `feat(world): 重塑世界入口与回访抵达体验`。

**Gate:** 隐藏文字后仍能看出“入口 / 门厅 / 浮屿方向”；首屏不得再具有旧双栏 hero 轮廓。

---

## C3：把 Atlas 做成可探索世界地图

**用户可见结果：** `/atlas` 首屏就是可操作星图；区域、节点和关系在空间中可被聚焦与进入。

**Files:**

- Create: `src/lib/scenes/build-atlas-model.ts`
- Create: `src/components/atlas/AtlasExplorationStage.tsx`
- Create: `src/components/atlas/AtlasExplorationStage.module.css`
- Create: `src/components/atlas/AtlasSceneCanvas.tsx` or `src/components/atlas/AtlasSceneSvg.tsx` after measured choice
- Create: `src/components/atlas/AtlasInspector.tsx`
- Modify: `src/app/atlas/page.tsx`
- Modify / retire from route: `src/components/atlas/AtlasHero.tsx`, `AtlasLiveConstellation.tsx`, `AtlasFallbackList.tsx`, `AtlasStats.tsx`

**Interfaces:**

```ts
export type AtlasViewModel = {
  areas: Array<{ id: string; title: string; x: number; y: number; radius: number; color: string; representativeNodeIds: string[] }>
  nodes: Array<{ id: string; slug: string; title: string; areaId: string; x: number; y: number; importance: number }>
  links: Array<{ id: string; from: string; to: string; reason: string }>
}
```

- [ ] **C3.1** 用确定性纯函数从区域、节点和关系生成布局；同一数据和 viewport 产生稳定位置，避免 hydration 抖动。
- [ ] **C3.2** 根据实际节点密度选择 SVG 或 Canvas；无性能证据不得引入第三方图形依赖。
- [ ] **C3.3** 实现全图、区域聚焦、节点聚焦、关系理由和返回全图；聚焦对象成为迁移锚点。
- [ ] **C3.4** desktop inspector 不超过 32% 宽；mobile 使用可关闭 drawer，地图仍保留可见上下文。
- [ ] **C3.5** 建立键盘方向 / Tab 操作和 DOM 等价列表；Canvas 不得成为唯一导航。
- [ ] **C3.6** 从 `/atlas` 移除卡片网格、统计区、`ProductRouteGuide`、`SceneDeepInteractionPanel` 和共享 hero。
- [ ] **C3.7** 对 200 节点采用层级 / viewport / focus 渲染，不把全部标签常驻首屏。
- [ ] **C3.8** 验证区域 -> 节点 -> Node、区域 -> Timeline、返回全图和浏览器后退。
- [ ] **C3.9** 生产截图 arrival / area-focused / node-focused / mobile / text-hidden，录制 Atlas 探索流程并逐帧审查。
- [ ] **C3.10** 运行定向测试、`typecheck`、`lint`、生产 build 和资源 / long-task 预算。
- [ ] **C3.11** 更新 ledger，提交 `feat(world): 将星图重构为可探索世界地图`。

**Gate:** 没有页面说明文字时，用户仍能通过浮屿、节点层级、星线和聚焦行为理解地图；普通区域卡片不得先于地图出现。

---

## C4：把 Timeline 与 Archive 做成两种独立空间

**用户可见结果：** 时间河承载事件；档案馆的搜索和筛选直接改变馆内空间。两者隐藏文字后也不相似。

### Task C4-A：Timeline

**Files:**

- Create: `src/lib/scenes/build-timeline-model.ts`
- Create: `src/components/timeline/TimelineRiverStage.tsx`
- Create: `src/components/timeline/TimelineRiverStage.module.css`
- Create: `src/components/timeline/TimelineRiverPath.tsx`
- Modify: `src/app/timeline/page.tsx`
- Retire from route: `TimelineHero.tsx`, `TimelineStats.tsx`, `SceneDeepInteractionPanel`, `ProductRouteGuide`

- [ ] **C4.1** 建立稳定时间锚、河段、事件 marker 和相关节点 view model。
- [ ] **C4.2** 实现沿河浏览、时间锚跳转、事件聚焦、前后事件和返回位置。
- [ ] **C4.3** 把事件直接放入河道，不再先渲染 stats / cards；长列表移入可访问 fallback。
- [ ] **C4.4** 保存 scroll / anchor 到公开 journey memory；后退或回访恢复同一河段。
- [ ] **C4.5** reduced-motion 使用静态河道和即时锚点切换，不做视差与长距离滑动。
- [ ] **C4.6** 截图 arrival / event-focused / mobile / text-hidden，录制 timeline-review。

### Task C4-B：Archive

**Files:**

- Create: `src/lib/scenes/build-archive-model.ts`
- Create: `src/components/archive/ArchiveHallStage.tsx`
- Create: `src/components/archive/ArchiveHallStage.module.css`
- Create: `src/components/archive/ArchiveShelf.tsx`
- Modify: `src/components/archive/ArchiveFilters.tsx`
- Modify: `src/components/archive/ArchiveView.tsx`
- Modify: `src/app/archive/page.tsx`

- [ ] **C4.7** 把公开节点映射为馆内分区、书架 / 抽屉位置和卷宗摘要；布局确定且可筛选。
- [ ] **C4.8** 搜索按需加载 Fuse.js；输入前不加载；匹配结果在馆内点亮 / 聚拢。
- [ ] **C4.9** 筛选变化真实改变显示集合、分区数量和可访问结果，不只是更新标签。
- [ ] **C4.10** 实现无结果、清除筛选、卷宗预览、进入 Node 和返回搜索上下文。
- [ ] **C4.11** 从 `/archive` 移除共享 portal、动态说明卡、route guide 和普通卡片瀑布主体。
- [ ] **C4.12** 截图 arrival / search / filtered / empty / mobile / text-hidden，录制 archive-search。

### C4 共同门禁

- [ ] **C4.13** 并排查看 Timeline / Archive 的 arrival 与 text-hidden 图，确认河道和馆藏空间无需标题即可区分。
- [ ] **C4.14** 运行定向测试、`typecheck`、`lint`、生产 build、搜索与 keyboard smoke。
- [ ] **C4.15** 更新 ledger，提交 `feat(world): 落地时间河与档案馆独立空间`。

---

## C5：把 Paths 与 Node 连成可行走、可停留的旅程

**用户可见结果：** 用户在路线中移动并抵达内容地点；正文、关系与下一站形成连续探索，而不是列表跳详情。

### Task C5-A：Paths

**Files:**

- Create: `src/lib/scenes/build-path-model.ts`
- Create: `src/components/paths/JourneyRouteStage.tsx`
- Create: `src/components/paths/JourneyRouteStage.module.css`
- Create: `src/components/paths/JourneyWaypoint.tsx`
- Modify: `src/app/paths/page.tsx`
- Modify: `src/app/paths/[id]/page.tsx`

- [ ] **C5.1** 建立路径几何、站点状态、当前 / 已走 / 可达 / 未达、估时和区域穿越 view model。
- [ ] **C5.2** Paths overview 以多条路线在世界中的形状和主题为主体，不以卡片网格为主体。
- [ ] **C5.3** Path Detail 在首屏呈现完整路线的可读部分、当前位置、下一站和终点；mobile 使用纵向路线。
- [ ] **C5.4** 实现继续、回到已走站、返回 Atlas、重置和完成抵达；所有状态本地保存并可清除。
- [ ] **C5.5** 完成态显示世界变化和相关路线，不只显示数字进度。

### Task C5-B：Node

**Files:**

- Create: `src/lib/scenes/build-node-model.ts`
- Create: `src/components/node/NodePlaceRoom.tsx`
- Create: `src/components/node/NodePlaceRoom.module.css`
- Modify: `src/app/node/[slug]/page.tsx`
- Modify: `NodePassport.tsx`, `NodeRelationRail.tsx`, `NodeNextStepPanel.tsx`, `NodeReadingBody.tsx`
- Retire from route: `NodeOpeningRitual.tsx` if it remains a generic panel stack

- [ ] **C5.6** 把地点护照压缩为场景内标签 / 物件，不再与正文并列占据大侧栏。
- [ ] **C5.7** 以场景视觉、区域对象和正文入口建立抵达；长文正文仍保持 60-72ch 阅读宽度。
- [ ] **C5.8** 关系门逐条显示“为什么相关”，并携带 source context 进入目标。
- [ ] **C5.9** 提供回所在 Atlas 区域、回当前 Path、看 Timeline、入 Archive、问 Lighthouse 的自然出口。
- [ ] **C5.10** 删除公开 Motion Layer / Fallback / Evidence / QA 文案和开发解释卡。
- [ ] **C5.11** 抽样 12 个代表节点，验证多场景吸收、关系、路径、时间、Lighthouse 和至少两个出口。

### C5 共同门禁

- [ ] **C5.12** 截图 paths overview / path start / path progress / path complete / node arrival / node reading / node relations / mobile / text-hidden。
- [ ] **C5.13** 录制 path-journey 与 node-explore；验证路径 -> Node -> 下一站 -> 返回路径位置。
- [ ] **C5.14** 运行定向测试、内容 schema、`typecheck`、`lint`、生产 build 和浏览器 smoke。
- [ ] **C5.15** 更新 ledger，提交 `feat(world): 连通可行走路径与内容地点`。

---

## C6：把页面切换升级为可取消、可延续的场景迁移

**用户可见结果：** 从一个场景对象出发，经过短暂空间变化抵达目标；后退、快速切换和 reduced-motion 均稳定。

**Files:**

- Create: `src/components/world/migration/SceneTransitionLink.tsx`
- Create: `src/components/world/migration/SceneMigrationLayer.tsx`
- Create: `src/lib/runtime/scene-migration.ts`
- Modify: `src/components/world/SceneTransitionShell.tsx`
- Modify: `src/lib/scene-transition.ts`
- Modify: all stage links created in C2-C5

**Interfaces:** Uses the `MigrationState` union and `SceneDestination` from the architecture document.

- [ ] **C6.1** 写纯状态机测试：idle -> leaving -> inTransit -> arriving -> settled；覆盖 cancel、route error、reduced 和 unmount。
- [ ] **C6.2** 实现 `SceneTransitionLink`，点击时记录 source object、target、focus return 和 destination context。
- [ ] **C6.3** 重写 migration layer：使用真实场景对象的快照 / 几何 / 色彩过渡，不展示步骤条、说明卡或工程标签。
- [ ] **C6.4** 在支持环境试点 View Transition；不支持或 reduced-motion 时走 GSAP / CSS fallback。
- [ ] **C6.5** 每个核心迁移至少定义一个共享对象：Gateway->Atlas 岛屿、Atlas->Node 星点、Timeline->Node 涟漪、Archive->Node 卷宗、Path->Node 站点、Node->Lighthouse 光束。
- [ ] **C6.6** 处理快速连点、浏览器 back / forward、目标 404、图片未加载、focus 恢复和 scroll / map position。
- [ ] **C6.7** 录制至少六种迁移的 source / transit / arrival；逐段确认不是普通 fade。
- [ ] **C6.8** 运行状态机测试、browser navigation smoke、`typecheck`、`lint`、生产 build。
- [ ] **C6.9** 更新 ledger，提交 `feat(world): 将路由切换升级为连续场景迁移`。

**Gate:** 任一迁移若只能通过屏幕文字知道“正在穿梭”，判失败。

---

## C7：让 Lighthouse 和声景真正属于世界

**用户可见结果：** 灯塔理解当前位置并给出有依据的下一站；用户主动开启后，不同场景拥有克制声景和迁移 crossfade。

### Task C7-A：Lighthouse

**Files:**

- Create: `src/lib/scenes/build-lighthouse-model.ts`
- Create: `src/components/ask/LighthouseGuideStage.tsx`
- Create: `src/components/ask/LighthouseGuideStage.module.css`
- Create: `src/server/ai/provider/types.ts`
- Create: `src/server/ai/provider/openai.ts`
- Create: `src/server/ai/provider/disabled.ts`
- Create: `src/server/ai/lighthouse-service.ts`
- Create: `src/server/ai/lighthouse-rate-limit.ts`
- Create: `src/server/ai/lighthouse-audit.ts`
- Modify: `src/app/api/lighthouse/ask/route.ts`
- Modify: `src/app/ask/page.tsx`
- Modify: `src/components/ask/PublicLighthouseConsole.tsx`

- [ ] **C7.1** 先写服务测试：公开问题 grounded、未知问题 no-evidence、私密问题 refusal、provider timeout fallback、schema invalid fallback、rate limit。
- [ ] **C7.2** 实现 provider-neutral adapter；OpenAI 使用 server-only 环境变量与 native fetch，disabled adapter 明确返回低光模式。
- [ ] **C7.3** 把 ask API 改为 POST；验证问题长度、Zod body、超时、取消、cache、LAN 单进程限流和审计摘要。
- [ ] **C7.4** 确保 `buildAIContextSlice()` 是唯一上下文入口；private / family / partner / vault / sealed / silent 不进入 provider request。
- [ ] **C7.5** Lighthouse 场景消费 current SceneContext，回答“在哪里 / 为什么相关 / 下一步 / 回去”，来源链接进入真实场景。
- [ ] **C7.6** 无 Key 时完整演练 low-light；有 Key 时额外验证真实 usage、model、latency、grounding 和成本，不伪造元数据。
- [ ] **C7.7** 从 `/ask` 移除共享 portal、三 CTA hero 和工程状态卡；塔体、光束和当前来路成为首屏主体。

### Task C7-B：声景

**Files:**

- Create: `src/lib/runtime/soundscape-engine.ts`
- Modify: `src/lib/sensory-audio.ts`
- Modify: `src/components/world/RuntimeSoundscapeControl.tsx`
- Modify: `data/assets/world-scene-assets.json`
- Create: `public/world/audio/**` only for licensed or generated assets

- [ ] **C7.8** 实现用户手势后加载、单主 loop、单 cue、crossfade、page hidden pause、volume、mute、dispose；让 dayPeriod / season 通过各场景光线与至少一项氛围对象真实变化，而非只显示文本标签。
- [ ] **C7.9** 为七个场景配置可区分但克制的 ambience，并为 Gateway / Lighthouse 制作一个经变奏的短音乐动机；可使用已授权文件或登记过的程序化 patch，没有合法来源时不得下载来源不明音乐凑验收。
- [ ] **C7.10** 验证首次加载没有音频请求、默认静音、开启后才下载、关闭 / reduced-sensory 后停止。
- [ ] **C7.11** 截图 Lighthouse arrival / grounded / refusal / low-light / mobile / text-hidden；录制 lighthouse-guide。
- [ ] **C7.12** 运行 AI / permission / audio 测试、`typecheck`、`lint`、生产 build、client bundle Key scan 和资产预算。
- [ ] **C7.13** 更新 ledger；按实际模式提交 `feat(world): 落地灯塔导览与可选场景声景`。

---

## C8：作者维护、统一清理、性能、权限和可信证据入口

**用户可见结果：** 作者可以在本机用一个中文 draft 命令真实预览、写入和回滚；七类空间在桌面、手机、减少动效、无声音、存储失败下都可靠；工程说明只留在 `/status`。

**Files:**

- Create: `scripts/world-author.mjs`
- Create: `src/server/authoring/author-draft-schema.ts`
- Create: `src/server/authoring/author-impact-preview.ts`
- Create: `src/server/authoring/author-transaction.ts`
- Create: `src/server/authoring/author-rollback.ts`
- Create: `data/fixtures/authoring/valid-node-draft.json`
- Create: `data/fixtures/authoring/invalid-private-leak-draft.json`
- Create: `scripts/check-worldos-reality-first.mjs`
- Create: `scripts/evidence-worldos-reality-first.mjs`
- Create: `scripts/lib/reality-first-browser.mjs`
- Modify: `package.json`
- Modify: `data/world-kernel/worldos-script-legacy-registry-v1.json`
- Modify: `src/app/status/page.tsx` only to link current evidence without score
- Modify / move: old shared portal and production-frame files after import scan

- [ ] **C8.1** 先写 authoring 测试：valid preview、invalid visibility、duplicate slug、missing relation target、apply to temp workspace、checksum rollback、真实 workspace 零改动。
- [ ] **C8.2** 实现 Zod draft schema 与影响预览，复用现有 Node / Relation / Path / Event 事实模型，不定义第二套业务字段。
- [ ] **C8.3** 实现本机事务写入：backup manifest、checksum、temp file、完整校验、atomic rename；任一步失败自动恢复。
- [ ] **C8.4** 实现受限 rollback，只接受本工具生成且 checksum 匹配的 backup-id；拒绝任意路径覆盖。
- [ ] **C8.5** 用临时 workspace 演练 preview -> apply -> 内容 / public index 检查 -> rollback -> checksum 一致；不向真实内容写入样例。
- [ ] **C8.6** 删除核心 route 对 `SceneWorldPortal`、`SceneProductionFrame`、`SceneDeepInteractionPanel`、`ProductRouteGuide` 的 import；无其他 active use 时移入 `_legacy` 或删除。
- [ ] **C8.7** 清扫公开文案：禁止词、调试状态、验收说明、内部权限实现、score / P0/P1 只允许在 `/status`。
- [ ] **C8.8** 新建客观 gate：route import、禁用文案、首屏主体 bounding box、可见主交互、无 overflow / overlay、控制台错误、资源失败、证据 freshness、权限 scan。
- [ ] **C8.9** 新建 evidence runner：真实 `next build` -> `next start -H 0.0.0.0` -> localhost / LAN -> 固定视口 / 模式 -> 截图 / 录屏 -> manifest；不得复用已启动旧 server。
- [ ] **C8.10** package 只新增 `world:author`、`audit:world-experience`、`check:world-experience`、`evidence:world-experience` 四个入口；把 `check:world-experience` 接入 `check:mainline`。
- [ ] **C8.11** 统计并限制 shared / route JS、bitmap、audio、LCP / CLS / TBT / long task；失败时优化或延迟加载，不调高冻结预算。
- [ ] **C8.12** 对 Atlas / Timeline 的动画和绘制做 visibility pause、viewport culling、DPR cap、resize cleanup。
- [ ] **C8.13** 验证 keyboard、200% zoom、focus restore、aria-live、Canvas DOM 等价、颜色非唯一表达，以及 JavaScript 关闭时七类 route 的静态内容和链接可读可走。
- [ ] **C8.14** 验证公开 HTML / RSC / JSON / search / AI / sitemap / manifest / bundle 不含私密数据与 Key。
- [ ] **C8.15** 运行 authoring tests、`typecheck`、`lint`、`check:scripts`、`check:world-experience`、`build:production-ci`、`check:mainline`。
- [ ] **C8.16** 更新 ledger，分别提交 `feat(world): 落地本地作者原子维护流程` 与 `test(world): 建立真实世界体验与边界门禁`。

---

## C9：多轮真实验收、缺陷修复和 Goal 终止

**用户可见结果：** 得到一个有完整证据、没有自评造分、可以通过 localhost / LAN 直接体验的世界候选。

**Files:**

- Generate: `docs/90-archive/reports/worldos-reality-first/<run-id>/**`
- Update: `docs/00-overview/worldos-reality-first-execution-plan-2026-07-10.md` checkboxes only
- Update: `docs/00-overview/worldos-reality-first-execution-ledger-2026-07-10.md`
- Create: `docs/90-archive/reports/worldos-reality-first/<run-id>/audits/final-reality-matrix.md`

### Round A：工程与浏览器事实

- [ ] **C9.1** 确认工作树范围和最后提交；运行真实 fresh `npm run build:production-ci`。
- [ ] **C9.2** 运行 `npm run check:world-experience`、`npm run check:mainline`、`npm run release:local-rc`、`git diff --check`。
- [ ] **C9.3** 运行 `npm run evidence:world-experience`，确认 manifest 中 source < build < server < evidence。
- [ ] **C9.4** 手动 / 自动点击九条连续流程，检查控制台、网络、焦点、滚动、后退、错误和空状态。

### Round B：主视觉逐页审查

- [ ] **C9.5** 真实打开所有 desktop / mobile / reduced-motion / text-hidden 截图，按验收标准逐项写 primary review。
- [ ] **C9.6** 逐段观看九条录屏，确认场景主体、迁移和上下文连续性；仅录屏存在或字节足够不能通过。
- [ ] **C9.7** 将新 arrival 截图与 M30 anti-baseline 并排比较；若仍是大标题 + 卡片 + 同模板，登记 P0 并返回对应检查点修复。

### Round C：独立 Reality Audit

- [ ] **C9.8** 调用 `reality-auditor` 或 fresh independent reviewer；审查者先看图 / 录屏，再读报告和源码。
- [ ] **C9.9** 独立审查逐行填写 Reality Matrix；不得给数字分，不得平均抵消失败。
- [ ] **C9.10** 对所有 `fail / blocked` 建立缺陷，回到对应代码修复，重新构建并重生成全部受影响证据。

### Round D：回归和终止

- [ ] **C9.11** 至少完成两次“修复后全量截图审查”；第二次必须使用最新 build 和新 run-id。
- [ ] **C9.12** 确认 Reality Matrix 九行全部 pass，P0/P1=0，冻结否决项=0。
- [ ] **C9.13** 确认最终状态只可能是 `LOCAL_WORLD_COMPLETE_AI_FALLBACK` 或 `LOCAL_WORLD_COMPLETE_LIVE_AI`，并说明实际 AI 模式。
- [ ] **C9.14** 把所有检查点、命令、证据、提交和残余 P2 写入 ledger；不使用 9/10 或完美表述。
- [ ] **C9.15** 提交 `docs(world): 完成真实世界体验终局验收`；再次确认工作树干净或仅有明确用户改动。
- [ ] **C9.16** 只有此时才允许 Goal complete；否则继续执行，不新建 C10 / M31 或“下一轮”。

---

## 每个检查点的固定小循环

```text
读取冻结文档和 ledger
  -> 查看 git status 与上一证据
  -> 截当前生产 baseline
  -> 写失败测试 / 客观断言
  -> 最小完整实现
  -> 定向检查
  -> 生产构建与浏览器实测
  -> 逐图 / 逐录屏审查
  -> 修复失败
  -> 更新 checkbox 与 ledger
  -> 中文提交
  -> 自动进入下一检查点
```

## 计划自检

- 需求覆盖：Gateway、Atlas、Timeline、Archive、Paths、Node、Lighthouse、迁移、音频、AI、回访、权限、性能、无障碍、资产、证据全部有对应检查点。
- 架构覆盖：事实源复用、场景高内聚、共享 primitive、provider 后端边界、运行时拆分和 dependency gate 均有任务。
- 反假完成：旧分数失效、冻结标准、anti-baseline、text-hidden、逐图逐录屏、独立 reviewer、无平均分均已规定。
- 长线恢复：每个检查点有文件、接口、命令、证据、提交和 ledger 入口；上下文压缩后可从第一项未勾选任务继续。
- 外部边界：没有 Key 时不伪造实时 AI；外部部署不在范围；不要求用户逐阶段批准。
