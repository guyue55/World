# WorldOS 阶段 0 冻结与盘点结果

状态：已执行  
日期：2026-07-05  
对应任务板：`docs/00-overview/worldos-phase-0-taskboard.md`

> [!NOTE]
> 本盘点用于建立当前项目事实源。后续阶段必须先查本文件，再决定是否改页面、组件、数据或检查脚本。

## 1. 当前公开主线

| 路由 | 页面文件 | 角色 | 当前状态 |
| --- | --- | --- | --- |
| `/` | `src/app/page.tsx` | 公开世界入口 | 正式主线 |
| `/atlas` | `src/app/atlas/page.tsx` | 世界地图 | 正式主线 |
| `/timeline` | `src/app/timeline/page.tsx` | 时间河 | 正式主线 |
| `/archive` | `src/app/archive/page.tsx` | 公开档案馆 | 正式主线 |
| `/paths` | `src/app/paths/page.tsx` | 路径目录 | 正式主线 |
| `/paths/[id]` | `src/app/paths/[id]/page.tsx` | 路径旅程 | 正式主线 |
| `/node/[slug]` | `src/app/node/[slug]/page.tsx` | 节点阅读 | 正式主线 |
| `/ask` | `src/app/ask/page.tsx` | 公开 AI 灯塔 | 正式主线 |
| `/about` | `src/app/about/page.tsx` | 现实解释 | 正式主线 |
| `/manifesto` | `src/app/manifesto/page.tsx` | 世界宪章 | 正式主线 |
| `/status` | `src/app/status/page.tsx` | 世界状态 | 正式主线 |
| `/forbidden` | `src/app/forbidden/page.tsx` | 无权限解释 | 边界页 |

## 2. 当前内容密度

| 指标 | 数量 | 说明 |
| --- | ---: | --- |
| 一级区域 | 8 | 已覆盖公开世界主要空间 |
| 公开节点 | 52 | 全部为公开可见 |
| 有正文公开节点 | 52 | 已具备真实内容基础 |
| 路径 | 13 | 足够支持新手导览和主题游览 |
| 关系 | 82 | 可支撑节点关系和地图连接 |
| 世界事件 | 21 | 可支撑时间线和动态状态 |

## 3. 正式组件分层

| 层级 | 目录 | 用途 | 约束 |
| --- | --- | --- | --- |
| 产品壳层 | `src/components/product` | 首页、导航、边界、世界入口 | 可组合公开数据，不做权限事实判断 |
| 世界基础层 | `src/components/world` | Shell、地图基础、运行时、动效 hook | 不直接接入 legacy/R8 runtime |
| 页面特性层 | `src/components/atlas`、`timeline`、`archive`、`paths`、`node`、`ask`、`about`、`manifesto`、`status` | 各公开页面体验组件 | 客户端组件消费 public surface |
| 通用层 | `src/components/common`、`interaction`、`reading` | 面包屑、空状态、Markdown、可访问交互 | 保持低耦合，不嵌入业务权限 |

## 4. 数据与权限事实源

| 类型 | 文件 | 作用 |
| --- | --- | --- |
| 路由边界 | `src/lib/product-routes.ts` | 定义公开、私密、内部、legacy 路由 |
| World Kernel 判定 | `src/lib/world-kernel-boundary.ts` | 给 middleware / 检查脚本提供统一路由决策 |
| 可见性 | `src/lib/visibility.ts` | 公开内容过滤基础 |
| 权限模型 | `src/lib/permissions.ts` | 权限定义与判断 |
| Owner 鉴权 | `src/lib/owner-auth.ts` | API / owner 能力的后端边界 |
| 展示模型 | `src/lib/public-world-surfaces.ts` | 服务端构建公开 surface，前端只呈现 |
| 内容数据 | `data/domains/experience`、`data/core/relations.json`、`data/core/world-events.json` | 节点、区域、路径、关系、事件 |
| 治理数据 | `data/domains/governance/permissions.json` | 权限和治理事实源 |

## 5. Public surface 覆盖

| Surface 构建函数 | 对应体验 |
| --- | --- |
| `buildHomeDynamicWorldSurface` | 首页动态世界入口 |
| `buildAtlasConstellationSurface` | Atlas 星图 |
| `buildTimelineRiverSurface` | 时间河 |
| `buildLighthouseConsoleSurface` | AI 灯塔 |
| `buildNodeOpeningSurface` | 节点开启仪式 |
| `buildDynamicWorldStatusSurface` | 世界状态 |
| `buildArchiveDynamicSurface` | 档案馆导览 |
| `buildPathJourneySurface` | 路径详情旅程 |
| `buildPathsDirectorySurface` | 路径目录 |
| `buildAboutDynamicSurface` | 关于古月 |
| `buildManifestoDynamicSurface` | 世界宣言 |

## 6. Legacy 回流候选

| 候选方向 | 来源 | 可回流内容 | 回流规则 |
| --- | --- | --- | --- |
| 动态宇宙 | `src/components/_legacy/r8-*`、`src/components/r8-dynamic-world` | 场景概念、动态语法、世界感表达 | 只能重写为 public surface + 正式组件，不直接导入 |
| 世界入口 | `_legacy/r2-world-entry`、`worldification` | 到达仪式、区域护照、世界入口表达 | 优先用于首页和 Atlas，不新增阶段页 |
| 时间河 | `_legacy/*time*`、`time-river` | 时间流视觉、事件节奏 | 必须基于公开事件 |
| AI 灯塔 | `_legacy/r5-ai-lighthouse`、`lighthouse` | 问题引导、风险提示、推荐队列 | 公开只读；owner 能力必须后端审计 |
| 私密档案 | `_legacy/private-*`、`data/domains/archive` | 私密档案、时间胶囊、年度世界册概念 | 不进入公开 bundle，必须后端权限控制 |
| 发布运营 | `_legacy/production`、`release`、`acceptance` | 发布门禁、回滚、证据矩阵 | 用作阶段 6 检查和文档，不做公开入口 |

## 7. 禁止回流范围

- 禁止公开页面直接导入 `src/components/_legacy`。
- 禁止公开页面直接导入 `src/components/r8-*` 或 `src/features/r8-*`。
- 禁止把私密、vault、family、sealed、silent 内容交给前端隐藏。
- 禁止用 `invisible` 作为首屏 SSR 基础态，再等待 JS/GSAP 显示。
- 禁止在 `next dev` 运行时执行 `npm run build`。

## 8. 检查命令分层

### 日常检查

```bash
npm run lint
npm run typecheck
npm run check:dynamic-world
npm run check:boundary
```

### 主线检查

```bash
npm run check:mainline
npm run check:routes
npm run check:product-release
```

### 内容体验检查

```bash
npm run check:content
npm run check:experience:public
npm run check:homepage
npm run check:atlas
npm run check:path-guidance
npm run check:node-reading
npm run check:timeline
npm run check:content-archive
```

### 发布检查

```bash
npm run check:release:rc
npm run check:rc:full
```

## 9. 阶段 0 验收结果

已执行并通过：

```bash
npm run check:mainline
npm run check:boundary
npm run lint
npm run typecheck
npm run check:dynamic-world
```

阶段 0 完成标准：

- 主线资产表：已完成。
- legacy 回流候选表：已完成。
- 检查命令分层表：已完成。
- 后续开发入口：阶段 1 批次 1.1。

## 10. 下一步

从 `worldos-roadmap-execution-master-plan-2026-07-05.md` 的 **阶段 1 批次 1.1：首页入口收束** 开始执行。
